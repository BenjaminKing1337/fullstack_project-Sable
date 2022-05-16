import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import baseUrl from './baseUrl';

const GetLists = () => {
  const Route = useRoute();
  const Router = useRouter();
  
  const ListId = computed(() => Route.params.id);
  console.log("listId: ", ListId);

  const lState = ref({
    NewTitle: "",
    NewIs_Complete: "",
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

  const NewList = () => {
    const RequestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "auth-token": state.token
      },
      body: JSON.stringify({
        title: lState.value.NewTitle,
        is_Complete: lState.value.NewIs_Complete,
      }),
    };
    fetch((baseUrl + "/lists/new"), RequestOptions).then(() => {
      GetAllLists(); // Updates page
    });
  };

  const DeleteList = (_id) => {
    fetch(baseUrl + "/lists/delete/" + _id, {
      method: "DELETE",
    }).then(() => {
      GetAllLists(); // Updates page
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
        is_Complete: lState.value.NewIs_Complete,
      }),
    };
    fetch(baseUrl + "/lists/update/" + ListId.value, RequestOptions)
      .then((Res) => Res.body)
      .then((Res) => {
        console.log(Res);
      });
    Router.push("/lists");
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
    GetSpecificList,
    lState,
    GetAllLists,
    NewList,
    DeleteList,
    EditList,
  };
};

export default GetLists;
