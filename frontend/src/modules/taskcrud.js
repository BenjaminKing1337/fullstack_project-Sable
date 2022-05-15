import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const GetTasks = () => {
  const Route = useRoute();
  const Router = useRouter();

  const TaskId = computed(() => Route.params.id);
  console.log("taskId: ", TaskId);

  const State = ref({
    NewAuthor: "",
    NewDescription: "",
    NewStatus: "",
    NewIs_Optional: "",
    NewDeadline: "",
    NewTaskItem: "",
    Tasks: {},
  });

  const GetAllTasks = async () => {
    try {
      await fetch("http://localhost:4000/tasks")
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
        author: State.value.NewAuthor,
        description: State.value.NewDescription,
        status: State.value.NewStatus,
        is_optional: State.value.NewIs_Optional,
        deadline: State.value.NewDeadline,
        task: State.value.NewTaskItem,
      }),
    };
    fetch("http://localhost:4000/tasks/new", RequestOptions).then(() => {
      GetAllTasks(); // Updates page
    });
  };

  const DeleteTask = (_id) => {
    fetch("http://localhost:4000/tasks/delete/" + _id, {
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
        author: State.value.NewAuthor,
        description: State.value.NewDescription,
        status: State.value.NewStatus,
        is_optional: State.value.NewIs_Optional,
        deadline: State.value.NewDeadline,
        task: State.value.NewTaskItem,
      }),
    };
    fetch("http://localhost:4000/tasks/update/" + TaskId.value, RequestOptions)
      .then((Res) => Res.body)
      .then((Res) => {
        console.log(Res);
      });
    Router.push("/tasks");
  };

  const Task = ref({});
  const GetSpecificTask = async () => {
    try {
      fetch("http://localhost:4000/tasks/")
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
