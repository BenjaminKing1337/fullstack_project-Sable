<template>
  <q-page class="flex column flex-center q-py-lg">
    <div class="form">
      <q-card v-for="Item in Task" :key="Item._id">
        <q-card-section class="q-mb-md">
          <h4>{{ Item.task }}</h4>
        </q-card-section>

        <q-card-section>
          <q-item>
            <q-item-section class="valuesBorder">
              <p>Owner: {{ Item.author }}</p>

              <p>Description: {{ Item.description }}</p>

              <p>Deadline: {{ Item.deadline }}</p>

              <p>Status: {{ Item.status }}</p>
            </q-item-section>
          </q-item>
        </q-card-section>

        <q-card-section class="flex q-mb-sm">
          <h6>Is Optional?:</h6>
          <h6>{{ Item.is_optional }}</h6>
        </q-card-section>
      </q-card>

      <br />

      <q-card>
        <q-card-section>
          <div v-if="adminAuth()">
            <p>New Task Owner</p>
            <select v-model="tState.NewAuthor">
              <option
                v-for="User in uState.Users"
                :key="User._id"
                :value="User.name"
              >
                {{ User.name }}
              </option>
            </select>
            <hr>
          </div>

          <q-form @submit.prevent="EditTask">
            <q-input
              style="padding: 10px"
              filled
              color="orange-5"
              class="q-mb-sm"
              type="text"
              placeholder="Name"
              v-model="tState.NewTaskItem"
              no-error-icon
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
              ]"
            />

            <q-input
              style="padding: 10px"
              filled
              color="orange-5"
              class="q-mb-sm"
              type="text"
              placeholder="Description"
              v-model="tState.NewDescription"
            />
            <q-input
              style="padding: 10px"
              filled
              color="orange-5"
              class="q-mb-sm"
              type="date"
              placeholder="Deadline"
              v-model="tState.NewDeadline"
            />
            <div class="column q-mb-lg">
              <q-radio v-model="tState.NewStatus" val="done" label="Done" />
              <q-radio v-model="tState.NewStatus" val="pending" label="Pending" />
              <q-radio v-model="tState.NewStatus" val="not-done" label="Not-done" />
            </div>
            <input
              type="checkbox"
              placeholder="Is Optional?"
              v-model="tState.NewIs_Optional"
            />
            <span> Is Optional?</span>
            <hr />
            <q-btn label="Update Task" type="submit" class="myOrange q-mt-lg text-white" />
            <br />
          </q-form>
        </q-card-section>
      </q-card>
    </div>
    <!--
    <div v-for="Item in Task" :key="Item._id">
      Author:
      <h4>{{ Item.author }}</h4>
      Task:
      <p>{{ Item.task }}</p>
      Description:
      <p>{{ Item.description }}</p>
      Deadline:
      <p>{{ Item.deadline }}</p>
      Status:
      <p>{{ Item.status }}</p>
      Optional:
      <p>{{ Item.is_optional }}</p>
    </div>

    <hr />

     <input type="text" placeholder="Author" v-model="tState.NewAuthor" />
    <span> Author : {{ tState.NewAuthor }} </span>
    <br />
    <input type="text" placeholder="Task" v-model="tState.NewTaskItem" />
    <span> Task : {{ tState.NewTaskItem }} </span>
    <br />
    <input
      type="text"
      placeholder="Description"
      v-model="tState.NewDescription"
    />
    <span> Description : {{ tState.NewDescription }} </span>
    <br />
    <input type="date" placeholder="Deadline" v-model="tState.NewDeadline" />
    <span> Deadline : {{ tState.NewDeadline }} </span>
    <br />
    <input type="number" placeholder="Status" v-model="tState.NewStatus" />
    <span> Status : {{ tState.NewStatus }} </span>
    <br />
    Optional:
    <input
      type="checkbox"
      placeholder="Optional"
      v-model="tState.NewIs_Optional"
    />
    <span> Optional : {{ tState.NewIs_Optional }} </span>
    <br />
    <button @click="EditTask()">Update Task</button>

    <hr /> -->
  </q-page>
</template>

<script>
import Taskcrud from "../modules/taskcrud";
import Usercrud from "../modules/usercrud";

export default {
  setup() {
    const { EditTask, tState, GetSpecificTask, Task, TaskId } = Taskcrud();
    const { EditUser, uState, GetAllUsers, GetSpecificUser, User, UserId } =
      Usercrud();

    GetSpecificTask();
    GetSpecificUser();
    GetAllUsers();

    return {
      Task,
      TaskId,
      EditTask,
      tState,
      adminAuth() {
        return localStorage.getItem("level") === "admin";
      },
      EditUser,
      uState,
      GetSpecificUser,
      User,
      UserId,
    };
  },
};
</script>

<style lang="scss" scoped>
.form {
  width: clamp(315px, 25vw, 600px);
}
</style>