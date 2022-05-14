import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const GetUsers = () => {
  const Route = useRoute();
  const Router = useRouter();

  const UserId = computed(() => Route.params.id);
  // console.log("userId: ", UserId);

  const State = ref({
    newName: "",
    newPass: "",
    Users: {},
  });
  const GetAllUsers = async () => {
    try {
      await fetch("http://localhost:4000/users")
        .then((Res) => Res.json())
        .then((Data) => {
          State.value.Users = Data;
         
        });
    } catch (Error) {
      console.log(Error);
    }
  };

  // const NewTask = () => {
  //   const RequestOptions = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       // "auth-token": state.token
  //     },
  //     body: JSON.stringify({
  //       Author: State.value.NewAuthor,
  //       Task: State.value.NewTaskItem,
  //     }),
  //   };
  //   fetch("http://localhost:4000/tasks/new", RequestOptions).then(() => {
  //     GetAllTasks(); // Updates page
  //   });
  // };

  const DeleteUser = (_id) => {
    fetch("http://localhost:4000/users/delete/" + _id, {
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
        name: State.value.newName,
        pass: State.value.newPass,
      }),
    };
    fetch("http://localhost:4000/users/update/" + UserId.value, RequestOptions)
      .then((Res) => Res.body)
      .then((Res) => {
        console.log(Res);
      });
    Router.push("/users");
  };

  const User = ref({});
  const GetSpecificUser = async () => {
    try {
      fetch("http://localhost:4000/users/")
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
    State,
    GetAllUsers,
    // NewUser,
    DeleteUser,
    EditUser,
  };
};

export default GetUsers;
