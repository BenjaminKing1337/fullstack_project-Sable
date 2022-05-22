<template>
 <q-page class="q-pa-xl page">
    
     <div>
      <q-card v-for="Item in Project" :key="Item._id">
      <q-card-section class="q-mb-md">
        <div class="coloredName" v-bind:style="{ backgroundColor: Item.color }">
          <h2 class="textShadow text-white">{{ Item.name }}</h2>
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
        <p>New Project Title</p>
        <q-input
          style="padding: 10px"
          filled
          color="orange-5"
          class="q-mb-sm"
          type="text"
          placeholder="Title"
          v-model="pState.NewName"
        />
        <p style="margin-top: -15px; font-size: 10px; color: red">Required!</p>
        
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
        <hr />
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
        <hr />
        <q-btn @click="EditProject()">Update Project</q-btn>
        <br />
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
</style>