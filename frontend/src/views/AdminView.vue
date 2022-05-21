<template>
  <q-page class="q-pa-xl">
    <h1>All Users</h1>
    <div class="tasklist">
      <div v-for="User in uState.Users" :key="User._id" class="Useritem">
        <h4>
          {{ User.name }}
        </h4>
        <p>
          {{ User.email }}
        </p>
        <p>
          {{ User.date }}
        </p>
        <p>
          {{ User.userLevel }}
        </p>
        <router-link :to="`/user/${User._id}`">
          <button @click="EditUser(User.value._id)">Edit User</button>
        </router-link>
        <button @click="DeleteUser(User._id)">Delete User</button>
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
</style>