import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const GetTasks = () => {
  const Route = useRoute();
  const Router = useRouter();

  const TaskId = computed(() => Route.params.id);
  console.log("taskId: ", TaskId);

  const tState = ref({
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
      await fetch("baseUrl + /tasks")
        .then((Res) => Res.json())
        .then((Data) => {
          tState.value.Tasks = Data;
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
        author: tState.value.NewAuthor,
        description: tState.value.NewDescription,
        status: tState.value.NewStatus,
        is_optional: tState.value.NewIs_Optional,
        deadline: tState.value.NewDeadline,
        task: tState.value.NewTaskItem,
      }),
    };
    fetch("baseUrl + /tasks/new", RequestOptions).then(() => {
      GetAllTasks(); // Updates page
    });
  };

  const DeleteTask = (_id) => {
    fetch("baseUrl + /tasks/delete/" + _id, {
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
        author: tState.value.NewAuthor,
        description: tState.value.NewDescription,
        status: tState.value.NewStatus,
        is_optional: tState.value.NewIs_Optional,
        deadline: tState.value.NewDeadline,
        task: tState.value.NewTaskItem,
      }),
    };
    fetch("baseUrl + /tasks/update/" + TaskId.value, RequestOptions)
      .then((Res) => Res.body)
      .then((Res) => {
        console.log(Res);
      });
    Router.push("/tasks");
  };

  const Task = ref({});
  const GetSpecificTask = async () => {
    try {
      fetch("baseUrl + /tasks/")
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
    tState,
    GetAllTasks,
    NewTask,
    DeleteTask,
    EditTask,
  };
};

export default GetTasks;
