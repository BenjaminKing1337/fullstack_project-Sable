<template>
  <q-page class="q-pa-xl page">
    <h5>Workspace</h5>
    <div class="flex no-wrap q-mb-md q-pb-md" style="overflow-x: auto">
      <!-- LIST LOOP  -->
       <q-card class="my-card" v-for="List in lState.Lists" :key="List._id">
          <q-card-section
            class="text-white title_sec"
            v-bind:style="{ backgroundColor: List.color }"
          >
            <div class="row no-wrap">
              <div class="col">
                <div class="text-h6 line-adjust ellipsis textShadow">
                  {{ List.title }}
                  <q-tooltip
                    class="bg-orange text-body2"
                    anchor="top middle"
                    self="bottom middle"
                    :offset="[10, 10]"
                  >
                    {{ List.title }}
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
                      <q-item clickable :to="`/list/${List._id}`">
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
                        @click="DeleteList(List._id)"
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
          </q-card-section>
          <q-card-section class="card_sec">
            <q-list class="list_sec">
              <!-- TASK LOOP -->
              <q-item
                clickable
                v-for="Task in filterTasks(tState.Tasks, List._id)" :key="Task._id"
              >
                <q-item-section>
                  <router-link :to="`/task/${Task._id}`" class="remove_linkStyle">
                    <q-item-label>{{ Task.task }}</q-item-label>
                    <q-item-label
                      class="status text-weight-bold"
                      caption
                      :class="{
                        'done': Task.status === 'done',
                        'pending': Task.status === 'pending',
                        'not-done': Task.status === 'not-done',
                      }"
                    >
                      {{ Task.status }}
                    </q-item-label>
                  </router-link>
                </q-item-section>
                <q-item-section side>
                  <q-btn @click="DeleteTask(Task._id)" class="gt-xs" size="12px" round icon="delete" />
                </q-item-section>
              </q-item>

              <div class="flex q-pb-sm q-pt-sm add_task">
                <q-input v-model="tState.NewTaskItem" debounce="1000000000" class="q-pl-none q-pr-none input_style" bg-color="transparent" color="orange" filled placeholder="Add task" />
                <q-btn class="btn_style" @click="NewTask(List._id)">
                  <q-icon color="orange" name="add" />
                </q-btn>
              </div>
            </q-list>
          </q-card-section>
       </q-card>  
    </div>
    <q-btn class="q-pr-lg q-pl-xs myOrange text-white" @click="prompt = true">
      <q-icon name="add" />
      Add List
    </q-btn>
    <!-- ADD NEW LIST -->
    <q-dialog
      v-model="prompt"
      persistent
      transition-show="rotate"
      transition-hide="rotate"
    >
      <q-card class="q-pa-md" style="min-width: 350px">
        <q-card-section class="q-pa-sm">
          <div class="text-h6">Create a List</div>
        </q-card-section>

        <q-card-section class="q-pt-none q-ml-md">
          <q-input
            class="q-mb-sm"
            v-model="lState.NewTitle"
            label="Name"
            filled
          />
          <div class="disable_scroll">
            <q-color
              v-model="lState.NewColor"
              no-header
              no-footer
              default-view="palette"
              class="my-picker scroll overflow-hidden"
            />
            <q-badge color="grey-3" text-color="black" class="q-mb-sm">
              {{ lState.NewColor }}
            </q-badge>
          </div>
          <q-checkbox v-model="lState.NewIs_Complete" label="Is completed?" />
        </q-card-section>

        <q-card-actions align="right" class="myOrange_color text-weight-bold">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn @click="NewList()" flat label="Create" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import Projectcrud from "../modules/projectcrud";
import Listcrud from "../modules/listcrud";
import Taskcrud from "../modules/taskcrud";
import { onMounted } from "vue";

export default {
  setup() {
    const { pState, GetAllProjects, NewProject, DeleteProject, EditProject } =
      Projectcrud();
    const {
      lState,
      GetAllLists,
      NewList,
      DeleteList,
      EditList,
      GetAllListsFromProject,
    } = Listcrud();
    const {
      tState,
      GetAllTasks,
      // GetAllTasksByListId,
      NewTask,
      DeleteTask,
      EditTask,
    } = Taskcrud();

    let filterTasks = (Tasks, listId) => {
      let tasksFiltered = [];
      for (var i = 0; i < Tasks.length; i++) {
        if (Tasks[i].ListId == listId) {
          tasksFiltered.push(Tasks[i]);
        }
      }
      return tasksFiltered;
    };

    onMounted(() => {
      GetAllProjects();
      GetAllListsFromProject();
      GetAllTasks();
    });

    return {
      pState,
      GetAllProjects,
      NewProject,
      DeleteProject,
      EditProject,
      lState,
      GetAllLists,
      NewList,
      DeleteList,
      EditList,
      GetAllListsFromProject,
      tState,
      GetAllTasks,
      NewTask,
      DeleteTask,
      EditTask,
      filterTasks,
    };
  },
  data() {
    return {
      prompt: false
    };
  },
};
</script>

<style lang="scss" scoped>
.my-card {
  width: 100%;
  min-width: 300px;
  max-width: 400px;
  box-shadow: none;
  margin: 20px 20px 0 0;
  background-color: #F5F5F5;

  .title_sec {
    height: 45px;
    border-bottom: none;
    border-radius: 3px;
    border: 1px solid rgb(138, 132, 132);
    .line-adjust {
      line-height: 1.6rem;
      padding: 10px 0 0 15px;
    }
  }
  .card_sec {
    height: auto;
    max-height: 600px;
    overflow-y: auto;
    overflow-x: hidden;
    .status {
      border-radius: 10px;
      text-align: center;
      width: 40%;
    }
    .done {
      background-color: limegreen;
    }
    .pending {
      background-color: orange;
    }
    .not-done {
      background-color: rgb(247, 112, 112);
    }
    .remove_linkStyle{
      text-decoration: none;
      color: black;
    }
    .add_task{
      width: 100%;
      .input_style{
        width: 85%;
        padding-left: 30px;
      }
      .btn_style{
        width: 20%;
        padding: 0;
        i{
          padding: 0;
        }
      }
    }
  }
}

.q-btn:before {
  box-shadow: none;
}
.q-card__section--vert {
  padding: 0px;
}
.q-item {
  margin: 0;
}
.my-picker {
  max-width: 280px;
}
</style>