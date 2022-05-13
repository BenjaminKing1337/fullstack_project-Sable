import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const GetTasks = () => {
  const Route = useRoute();
  const Router = useRouter();

  const TaskId = computed(() => Route.params.id);
  console.log("taskId: ", TaskId);

  const State = ref({
    NewAuthor: "",
    NewTaskItem: "",
    Tasks: {},
  });

  const GetAllTasks = async () => {
    try {
      await fetch("https://sableplan.herokuapp.com/tasks")
        .then((Res) => Res.json())
        .then((Data) => {
          State.value.Tasks = Data;
        });
    } catch (Error) {
      console.log(Error);
    }
  };

  const NewTask = () => {
    const RequestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "auth-token": state.token
      },
      body: JSON.stringify({
        Author: State.value.NewAuthor,
        Task: State.value.NewTaskItem,
      }),
    };
    fetch("https://sableplan.herokuapp.com/tasks/new", RequestOptions).then(() => {
      GetAllTasks(); // Updates page
    });
  };

  const DeleteTask = (_id) => {
    fetch("https://sableplan.herokuapp.com/tasks/delete/" + _id, {
      method: "DELETE",
    }).then(() => {
      GetAllTasks(); // Updates page
    });
  };

  const EditTask = () => {
    const RequestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // "auth-token": state.token
      },
      body: JSON.stringify({
        Author: State.value.NewAuthor,
        Task: State.value.NewTaskItem,
      }),
    };
    fetch("https://sableplan.herokuapp.com/tasks/update/" + TaskId.value, RequestOptions)
      .then((Res) => Res.body)
      .then((Res) => {
        console.log(Res);
      });
    Router.push("/tasks");
  };

  const Task = ref({});
  const GetSpecificTask = async () => {
    try {
      fetch("https://sableplan.herokuapp.com/tasks/")
        .then((Res) => Res.json())
        .then((Data) => {
          Task.value = Data.filter((T) => T._id === TaskId.value);
        });
    } catch (Error) {
      console.log(Error);
    }
  };

  return {
    Task,
    TaskId,
    GetSpecificTask,
    State,
    GetAllTasks,
    NewTask,
    DeleteTask,
    EditTask,
  };
};

export default GetTasks;
