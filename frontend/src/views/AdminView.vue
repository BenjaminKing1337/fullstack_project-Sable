<template>
  <q-page class="q-pa-xl">
    <h1>All Users</h1>
    <div class="tasklist">
      <div v-for="User in uState.Users" :key="User._id" class="Useritem">
        <h4>
          Name: <strong style="color: orange">{{ User.name }}</strong>
        </h4>
        <p>
          Email: <strong>{{ User.email }}</strong>
        </p>
        <p>
          Joined: <strong>{{ User.date }}</strong>
        </p>
        <p>
          Level: <strong>{{ User.userLevel }}</strong>
        </p>
      </div>
    </div>
  </q-page>
</template>

<script>
import Usercrud from "../modules/usercrud";
import { onMounted } from "vue";

export default {
  setup() {
    const { uState, GetAllUsers, NewUser, DeleteUser, EditUser } = Usercrud();

    onMounted(() => {
      GetAllUsers();
    });

    return {
      uState,
      GetAllUsers,
      NewUser,
      DeleteUser,
      EditUser,
    };
  },
};
</script>

<style lang="scss" scoped>
.Useritem {
  margin: 1%;
  padding: 2%;
  border: 0.2em map-get($cs, 4);
  border-radius: 5px;
  border-style: dotted;
}
</style>