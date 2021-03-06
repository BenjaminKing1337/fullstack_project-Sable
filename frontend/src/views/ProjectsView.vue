<template>
  <q-page class="q-pa-xl">
    <h4>Welcome to Projects page</h4>
    <p class="text-subtitle1 q-mb-xl q-ml-md">
      Here you can create and manage your projects
    </p>

    <h6>My Projects</h6>
    <div class="flex q-mb-xl">
      <q-card
        class="my-card"
        v-for="Project in pState.Projects"
        :key="Project._id"
      >
        <q-card-section
          class="text-white card_sec"
          v-bind:style="{ backgroundColor: Project.color }"
        >
          <div class="row no-wrap">
            <div class="col">
              <div class="text-h6 line-adjust ellipsis-2-lines textShadow">
                {{ Project.name }}
                <q-tooltip
                  class="bg-orange text-body2"
                  anchor="top middle"
                  self="bottom middle"
                  :offset="[10, 10]"
                >
                  {{ Project.name }}
                </q-tooltip>
              </div>
              <div class="text-subtitle2 ellipsis-2-lines">
                {{ Project.description }}
                <q-tooltip
                  class="bg-orange text-body2"
                  anchor="top middle"
                  self="bottom middle"
                  :offset="[10, 10]"
                >
                  {{ Project.description }}
                </q-tooltip>
              </div>
            </div>

            <div class="col-auto">
              <q-btn color="white" round flat icon="more_vert">
                <q-menu
                  class="overflow-hidden"
                  anchor="center right"
                  self="center left"
                  auto-close
                  fit
                >
                  <q-list>
                    <q-item clickable :to="`/project/${Project._id}`">
                      <q-item-section class="flex text-weight-bold"
                        >Edit</q-item-section
                      >
                      <q-item-section class="flex">
                        <q-icon
                          class="myOrange_color"
                          size="1.5em"
                          name="edit"
                        />
                      </q-item-section>
                    </q-item>
                    <q-item
                      clickable
                      @click="DeleteProject(Project._id)"
                      class="bg-negative"
                    >
                      <q-item-section class="text-white text-weight-bold"
                        >Delete</q-item-section
                      >
                      <q-item-section class="flex">
                        <q-icon color="white" size="1.5em" name="delete" />
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </div>
          </div>
          <div class="text-subtitle2 text-weight-bold">
            {{ Project.deadline }}
          </div>
        </q-card-section>
        <router-link :to="`/workspace/${Project._id}`" class="remove_linkStyle">
          <q-btn class="full-width">
            <strong v-bind:style="{ color: Project.color }">Open</strong>
          </q-btn>
        </router-link>
      </q-card>
    </div>

    <q-btn class="q-pr-lg q-pl-xs myOrange text-white" @click="prompt = true">
      <q-icon name="add" />
      Create a new project
    </q-btn>

    <q-dialog
      v-model="prompt"
      persistent
      transition-show="rotate"
      transition-hide="rotate"
    >
      <q-card class="q-pa-md" style="min-width: 350px">
        <q-card-section class="q-pa-sm">
          <div class="text-h6">Create a project</div>
        </q-card-section>

        <q-card-section class="q-pt-none q-ml-md">
          <q-input
            class="q-mb-sm"
            v-model="pState.NewName"
            label="Name"
            filled
          />
          <q-input
            class="q-mb-sm"
            v-model="pState.NewDescription"
            label="Description"
            type="textarea"
            filled
          />
          <q-input
            class="q-mb-sm"
            v-model="pState.NewDeadline"
            type="date"
            filled
            hint="Pick a deadline"
          />
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
        </q-card-section>

        <q-card-actions align="right" class="myOrange_color text-weight-bold">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn @click="NewProject()" flat label="Create" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import Projectcrud from "../modules/projectcrud";
import { onMounted } from "vue";

export default {
  setup() {
    const { pState, GetUserProjects, NewProject, DeleteProject, EditProject } =
      Projectcrud();

    const userId = localStorage.getItem("userid");

    onMounted(() => {
      GetUserProjects();
    });

    return {
      pState,
      GetUserProjects,
      NewProject,
      DeleteProject,
      EditProject,
      userId,
    };
  },
  data() {
    return {
      prompt: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.my-card {
  width: 100%;
  max-width: 250px;
  box-shadow: none;
  margin: 0 20px 20px 0;
  .card_sec {
    height: 110px;
    border: 1px solid rgb(226, 220, 220);
    border-bottom: none;
    .line-adjust {
      line-height: 1.6rem;
    }
  }
}
.btn-fixed-width {
  width: 400px;
}
.remove_linkStyle {
  text-decoration: none;
  color: black;
}
</style>