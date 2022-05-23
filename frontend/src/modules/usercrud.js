import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import baseUrl from './baseUrl';

const GetUsers = () => {
  const Route = useRoute();
  const Router = useRouter();
  const UserId = computed(() => Route.params.id);

  const uState = ref({
    newName: "",
    newPass: "",
    Users: {},
  });
  
  const GetAllUsers = async () => {
    try {
      await fetch(baseUrl + "/users")
        .then((Res) => Res.json())
        .then((Data) => {
          uState.value.Users = Data;
         
        });
    } catch (Error) {
      console.log(Error);
    }
  };

  const NewUser = () => {
    const RequestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "auth-token": state.token
      },
      body: JSON.stringify({
        name: uState.value.newName,
        pass: uState.value.newPass,
        userLevel: uState.value.newUserLevel,
      }),
    };
    fetch(baseUrl + "/tasks/new", RequestOptions).then(() => {
      GetAllUsers(); // Updates page
    });
  };

  const DeleteUser = (_id) => {
    fetch(baseUrl + "/users/delete/" + _id, {
      method: "DELETE",
    }).then(() => {
      GetAllUsers(); // Updates page
    });
  };

  const EditUser = () => {
    const RequestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // "auth-token": state.token
      },
      body: JSON.stringify({
        name: uState.value.newName,
        pass: uState.value.newPass,
        userLevel: uState.value.newUserLevel,
      }),
    };
    fetch(baseUrl + "/users/update/" + UserId.value, RequestOptions)
      .then((Res) => Res.body)
      // .then((Res) => {
      //   console.log(Res);
      // });
    Router.push("/users");
  };

  const User = ref({});
  const GetSpecificUser = async () => {
    try {
      fetch(baseUrl + "/users/")
        .then((Res) => Res.json())
        .then((Data) => {
          User.value = Data.filter((U) => U._id === UserId.value);
        });
    } catch (Error) {
      console.log(Error);
    }
  };

  return {
    User,
    UserId,
    GetSpecificUser,
    uState,
    GetAllUsers,
    NewUser,
    DeleteUser,
    EditUser,
  };
};

export default GetUsers;
