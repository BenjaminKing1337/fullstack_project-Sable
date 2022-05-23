import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import baseUrl from "./baseUrl";
import Projectcrud from "./projectcrud";

const GetLists = () => {
  const Route = useRoute();
  const Router = useRouter();
  const { pState, ProjectId } = Projectcrud;
  const ListId = computed(() => Route.params.id);
  // const ListTitle = computed(() => Route.params.id);
  // console.log("listId: ", ListId);

  var url = window.location.pathname.split("/");
  var url_id = url[2];

  const lState = ref({
    NewTitle: "",
    NewIs_Complete: false,
    NewColor: "#fd9f28",
    ProjectId: "",
    Lists: {},
  });
  const GetAllLists = async () => {
    try {
      await fetch(baseUrl + "/lists")
        .then((Res) => Res.json())
        .then((Data) => {
          lState.value.Lists = Data;
        });
    } catch (Error) {
      console.log(Error);
    }
  };
  const GetAllListsFromProject = async () => {
    try {
      await fetch(baseUrl + "/lists/get/" + url_id)
        .then((Res) => Res.json())
        .then((Data) => {
          lState.value.Lists = Data;
        });
    } catch (Error) {
      console.log(Error);
    }
  };

  const NewList = () => {
    const RequestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "auth-token": state.token
      },
      body: JSON.stringify({
        ProjectId: url_id,
        // ProjectId: lState.value.ProjectId,
        title: lState.value.NewTitle,
        color: lState.value.NewColor,
        is_Complete: lState.value.NewIs_Complete,
      }),
    };
    fetch(baseUrl + "/lists/new", RequestOptions).then(() => {
      GetAllListsFromProject(); // Updates page
    });
  };

  const DeleteList = (_id) => {
    fetch(baseUrl + "/lists/delete/" + _id, {
      method: "DELETE",
    }).then(() => {
      GetAllListsFromProject(); // Updates page
    });
  };

  const EditList = () => {
    const RequestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // "auth-token": state.token
      },
      body: JSON.stringify({
        title: lState.value.NewTitle,
        color: lState.value.NewColor,
        is_Complete: lState.value.NewIs_Complete,
      }),
    };
    fetch(baseUrl + "/lists/update/" + ListId.value, RequestOptions)
      .then((Res) => Res.body)
      // .then((Res) => {
      //   console.log(Res);
      // });
    Router.go(-1);
  };

  const List = ref({});
  const GetSpecificList = async () => {
    try {
      fetch(baseUrl + "/lists/")
        .then((Res) => Res.json())
        .then((Data) => {
          List.value = Data.filter((L) => L._id === ListId.value);
        });
    } catch (Error) {
      console.log(Error);
    }
  };

  return {
    List,
    ListId,
    ProjectId,
    GetSpecificList,
    lState,
    pState,
    GetAllLists,
    NewList,
    DeleteList,
    EditList,
    GetAllListsFromProject,
    url,
    url_id,
  };
};

export default GetLists;
