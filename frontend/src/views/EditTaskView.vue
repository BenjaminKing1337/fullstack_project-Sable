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
          &nbsp;&nbsp;
          <div v-if="Item.is_optional === false">
            <h6 style="color: red">No</h6>
          </div>
          <div v-if="Item.is_optional === true">
            <h6 style="color: green">Yes</h6>
          </div>
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
            <hr />
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
              <q-radio
                v-model="tState.NewStatus"
                val="pending"
                label="Pending"
              />
              <q-radio
                v-model="tState.NewStatus"
                val="not-done"
                label="Not-done"
              />
            </div>
            <input
              style="width: 20px; height: 20px"
              type="checkbox"
              placeholder="Is Optional?"
              v-model="tState.NewIs_Optional"
            />
            <span> Is Optional?</span>
            <hr />
            <div class="flex spaceb">
              <q-btn
                label="Update Task"
                type="submit"
                class="myOrange q-mt-lg text-white"
              />
              <q-btn
                label="Cancel"
                type="submit"
                @click="goBack()"
                class="myOrange q-mt-lg text-white"
              />
            </div>
            <br />
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import Taskcrud from "../modules/taskcrud";
import Usercrud from "../modules/usercrud";
// import goBack from '../modules/goBack';
import { useRouter } from "vue-router";

export default {
  setup() {
    const { EditTask, tState, GetSpecificTask, Task, TaskId } = Taskcrud();
    const { EditUser, uState, GetAllUsers, GetSpecificUser, User, UserId } =
      Usercrud();

    const Router = useRouter();

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
      goBack() {
        return Router.go(-1);
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
</style>