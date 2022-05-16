import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const GetUsers = () => {
  const Route = useRoute();
  const Router = useRouter();

  const UserId = computed(() => Route.params.id);
  // console.log("userId: ", UserId);

  const uState = ref({
    newName: "",
    newPass: "",
    Users: {},
  });
  const GetAllUsers = async () => {
    try {
      await fetch("${process.env.BASE_URL/users")
        .then((Res) => Res.json())
        .then((Data) => {
          uState.value.Users = Data;
         
        });
    } catch (Error) {
      console.log(Error);
    }
  };

  // const NewUser = () => {
  //   const RequestOptions = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       // "auth-token": state.token
  //     },
  //     body: JSON.stringify({
  //       author: uState.value.NewAuthor,
  //       Task: uState.value.NewTaskItem,
  //     }),
  //   };
  //   fetch("${process.env.BASE_URL/tasks/new", RequestOptions).then(() => {
  //     GetAllTasks(); // Updates page
  //   });
  // };

  const DeleteUser = (_id) => {
    fetch("${process.env.BASE_URL/users/delete/" + _id, {
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
      }),
    };
    fetch("${process.env.BASE_URL/users/update/" + UserId.value, RequestOptions)
      .then((Res) => Res.body)
      .then((Res) => {
        console.log(Res);
      });
    Router.push("/users");
  };

  const User = ref({});
  const GetSpecificUser = async () => {
    try {
      fetch("${process.env.BASE_URL/users/")
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
    // NewUser,
    DeleteUser,
    EditUser,
  };
};

export default GetUsers;
