<template>
  <div>
    <h1>Editing a Project</h1>

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
  </div>
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