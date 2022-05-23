<template>
 <q-page class="flex column flex-center q-py-lg">
     <div class="form">
      <q-card v-for="Item in Project" :key="Item._id">
      <q-card-section class="q-pa-none">
        <div class="coloredName" v-bind:style="{ backgroundColor: Item.color }">
          <h4 class="textShadow text-white">{{ Item.name }}</h4>
        </div>
          <q-item>
            <h6>{{ Item.description }}</h6>
          </q-item>
          <q-item>
            <h5>{{ Item.deadline }}</h5>
          </q-item>
      </q-card-section>
    </q-card>

    <br />

    <q-card>
      <q-card-section>
        <q-form @submit.prevent="EditProject">
          <q-input
            style="padding: 10px"
            filled
            color="orange-5"
            class="q-mb-sm"
            type="text"
            placeholder="Title"
            v-model="pState.NewName"
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
            v-model="pState.NewDescription"
          />
          <q-input
            style="padding: 10px"
            filled
            color="orange-5"
            class="q-mb-sm"
            type="date"
            placeholder="Deadline"
            v-model="pState.NewDeadline"
          />
          <br />

          <q-color
            v-model="pState.NewColor"
            no-header
            no-footer
            default-view="palette"
            class="my-picker scroll overflow-hidden"
          />
          <q-badge color="grey-3" text-color="black" class="q-mb-sm">
            {{ pState.NewColor }}
          </q-badge>
          <q-btn label="Update Project" type="submit" class="myOrange q-mt-lg text-white" />
        </q-form>
      </q-card-section>
    </q-card>
    </div>
    

    <!-- Old 
    <div>
      <h1>Edit Project</h1>

    <div v-for="Item in Project" :key="Item._id">
      Name:
      <h4>{{ Item.name }}</h4>
      Description:
      <p>{{ Item.description }}</p>
      Color:
      <p>{{ Item.color }}</p>
    </div>

    <hr />

    <input type="text" placeholder="Name" v-model="pState.NewName" />
    <span> Name : {{ pState.NewName }} </span>
    <br />
    <input type="text" placeholder="Description" v-model="pState.NewDescription" />
    <span> Description : {{ pState.NewDescription }} </span>
    <br />
    <div class="disable_scroll">
            <q-color
              v-model="pState.NewColor"
              no-header
              no-footer
              default-view="palette"
              class="my-picker scroll overflow-hidden"
            />
            <q-badge color="grey-3" text-color="black" class="q-mb-sm">
              {{ pState.NewColor }}
            </q-badge>
          </div>
    <br />
    <input type="checkbox" placeholder="Is Complete?" v-model="pState.NewIs_Complete" />
    <span> Is Complete? : {{ pState.NewIs_Complete }} </span>
    <button @click="EditProject()">Update Project</button>

    <hr />
    </div>-->
  </q-page>
</template>

<script>
import Projectcrud from "../modules/projectcrud";

export default {
  setup() {
    const { EditProject, pState, GetSpecificProject, Project, ProjectId } = Projectcrud();
    GetSpecificProject();

    return { Project, ProjectId, EditProject, 
      pState
      };
  },
};
</script>

<style lang="scss" scoped>
.form {
  width: clamp(315px, 25vw, 600px);
}
</style>