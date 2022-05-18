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
              <div class="text-subtitle2">{{ Project.description }}</div>
              <div
                v-for="List in filterLists(lState.Lists, Project._id)"
                :key="List._id"
                class="listitem"
              >
               - {{ List.title }}
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
                    <q-item clickable>
                      <q-item-section class="flex text-weight-bold"
                        ><button @click="EditProject(Project.value._id)">
                          Edit Project
                        </button></q-item-section
                      >
                      <q-item-section class="flex">
                        <q-icon
                          class="myOrange_color"
                          size="1.5em"
                          name="edit"
                        />
                      </q-item-section>
                    </q-item>
                    <q-item clickable class="bg-negative">
                      <q-item-section class="text-white text-weight-bold"
                        ><button @click="DeleteProject(Project._id)">
                          Delete Project
                        </button></q-item-section
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
        </q-card-section>
        <q-btn class="full-width" label="Open"></q-btn>
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
import Listcrud from "../modules/listcrud";
import { onMounted } from "vue";

export default {
  setup() {
    const { pState, GetAllProjects, NewProject, DeleteProject, EditProject } =
      Projectcrud();
    const { lState, GetAllLists, NewList, DeleteList, EditList } = Listcrud();

    let filterLists = (Lists, projectId) => {
      let listsFiltered = [];
      for (var i = 0; i < Lists.length; i++) {
        if (Lists[i].ProjectId == projectId) {
          listsFiltered.push(Lists[i]);
        }
      }
      return listsFiltered;
    };

    onMounted(() => {
      GetAllProjects();
      GetAllLists();
    });

    // GetAll();
    return {
      lState,
      GetAllLists,
      NewList,
      DeleteList,
      EditList,
      pState,
      GetAllProjects,
      NewProject,
      DeleteProject,
      EditProject,
      filterLists,
    };
  },
  data() {
    return {
      projects: [
        {
          title: "My planet",
          description: "this a description",
          color: "purple",
        },
        { title: "My world", description: "this a description", color: "blue" },
        {
          title: "My plan",
          description: "this a description",
          color: "purple",
        },
        {
          title: "My vingardium leviosa",
          description: "this a description",
          color: "#ffff00",
        },
        {
          title: "Me running out of ideas",
          description: "this a description",
          color: "red",
        },
        {
          title: "Lorem Ipsum",
          description: "this a description",
          color: "purple",
        },
        {
          title: "My Ipsum Lorem beef patty with sauted onions yumm yumm",
          description: "this a description",
          color: "purple",
        },
      ],
      prompt: false,
      hex: "#FF00FF",
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
.textShadow {
  text-shadow: 1px 1px 4px rgb(43, 40, 40);
}
.btn-fixed-width {
  width: 400px;
}
.my-picker {
  max-width: 280px;
}
</style>