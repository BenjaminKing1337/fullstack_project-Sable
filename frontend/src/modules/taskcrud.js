import { LocalStorage } from "quasar";
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import baseUrl from './baseUrl';
import Listcrud from './listcrud';

const GetTasks = () => {
  const Route = useRoute();
  const Router = useRouter();
  const { lState } = Listcrud;
  const TaskId = computed(() => Route.params.id);
  // console.log("taskId: ", TaskId);

  const tState = ref({
    NewAuthor: "",
    NewDescription: "",
    NewStatus: "not-done",
    NewIs_Optional: "",
    NewDeadline: "",
    NewTaskItem: "",
    ListId: "",
    UserId: localStorage.getItem("userid"),
    Tasks: {},
  });

  const GetAllTasks = async () => {
    try {
      await fetch(baseUrl + "/tasks")
        .then((Res) => Res.json())
        .then((Data) => {
          tState.value.Tasks = Data;
        });
    } catch (Error) {
      console.log(Error);
    }
  };

  const GetAllTasksByListId = async (listId) => {
    try {
      const test = await fetch(baseUrl + "/tasks/get/byList/" + listId)
        .then((Res) => Res.json())
        .then((Data) => {
          debugger
          tState.value.Tasks = Data;
        });
        return test;
    } catch (Error) {
      console.log(Error);
    }
  };

  const NewTask = (listId) => {
    const RequestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "auth-token": state.token
      },
      body: JSON.stringify({
        // ListId: tState.value.ListId,
        UserId: localStorage.getItem("userid"),
        ListId: listId,
        author: tState.value.NewAuthor ? tState.value.NewAuthor : LocalStorage.getItem("name"),
        task: tState.value.NewTaskItem,
        description: tState.value.NewDescription ? tState.value.NewDescription : '',
        status: tState.value.NewStatus ? tState.value.NewStatus : "not-done",
        is_optional: tState.value.NewIs_Optional ? tState.value.NewIs_Optional : false,
        deadline: tState.value.NewDeadline,
      }),
    };
    console.log(RequestOptions.body)
    tState.value.NewTaskItem = ""
    fetch(baseUrl + "/tasks/new", RequestOptions).then(() => {
      GetAllTasks(); // Updates page
    });
  };

  const DeleteTask = (_id) => {
    fetch(baseUrl + "/tasks/delete/" + _id, {
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
        UserId: localStorage.getItem("userid"),
        author: tState.value.NewAuthor ? tState.value.NewAuthor : '',
        task: tState.value.NewTaskItem,
        description: tState.value.NewDescription ? tState.value.NewDescription : '',
        status: tState.value.NewStatus ? tState.value.NewStatus : 1,
        is_optional: tState.value.NewIs_Optional ? tState.value.NewIs_Optional : false,
        deadline: tState.value.NewDeadline,
      }),
    };
    fetch(baseUrl + "/tasks/update/" + TaskId.value, RequestOptions)
      .then((Res) => Res.body)
      .then((Res) => {
        console.log(Res);
      });
    Router.go(-1);
  };

  const Task = ref({});
  const GetSpecificTask = async () => {
    try {
      fetch(baseUrl + "/tasks/")
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
    lState,
    GetAllTasks,
    GetAllTasksByListId,
    NewTask,
    DeleteTask,
    EditTask,
  };
};

export default GetTasks;
