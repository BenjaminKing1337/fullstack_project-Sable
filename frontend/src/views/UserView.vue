<template>
  <div>
    <h1>Editing a User</h1>

    <div v-for="Item in User" :key="Item._id">
      Username:
      <h4>{{ Item.name }}</h4>
      Password:
      <p>{{ Item.pass }}</p>
      Level:
      <p>{{ Item.userLevel }}</p>
      
    </div>

    <hr />

    <input type="text" placeholder="Name" v-model="uState.NewName" />
    <span> Author : {{ uState.NewName }} </span>
    <br />
    <input type="text" placeholder="Password" v-model="uState.NewPass" />
    <span> User : {{ uState.NewPass }} </span>
    <br />
    <input type="text" placeholder="Level" v-model="uState.NewUserLevel" />
    <span> Description : {{ uState.NewUserLevel }} </span>
    <br />
    <button @click="EditUser()">Update User</button>

    <hr />
  </div>
</template>

<script>
import Usercrud from "../modules/taskcrud";

export default {
  setup() {
    const { EditUser, uState, GetSpecificUser, User, UserId } = Usercrud();

    GetSpecificUser();

    return { User, UserId, EditUser, uState };
  },
};
</script>

<style lang="scss" scoped>
</style>