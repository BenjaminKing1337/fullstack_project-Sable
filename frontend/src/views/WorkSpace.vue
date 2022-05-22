<template>
  <q-page class="q-pa-xl page">
    <h5>Here goes the project title</h5>

    <!-- Create New List in Project -->
    <div class="create">
      <div class="new">
        <h4>Create New List</h4>
        <br />
        <input type="text" placeholder="Title" v-model="lState.NewTitle" />
        <br />
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
        <br />
        Complete
        <input
          id="checkbox"
          type="checkbox"
          checked="true"
          placeholder="Complete"
          v-model="lState.NewIs_Complete"
        />
        <br />

        <button @click="NewList()">Create New List</button>
      </div>
    </div>

    <div class="flex no-wrap q-mb-xl q-pb-xl" style="overflow-x: auto">
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
                      <q-item clickable @click="edit_list = true">
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
            <q-list>
              <!-- TASK LOOP  -->
              <q-item
                clickable
                v-for="Task in filterTasks(tState.Tasks, List._id)" :key="Task._id"
                @click="open_task = true"
              >
                <q-item-section>
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
                </q-item-section>
              </q-item>
              <div class="createInList">
                <div class="create">
                  <div class="new">
                    <br />
                    <input
                      type="text"
                      placeholder="Task"
                      v-model="tState.NewTaskItem"
                      size="10"
                    />
                    <button @click="NewTask(List._id)">Create New Task</button>
                  </div>
                </div>
              </div>
              <!-- ADD CARD BUTTON  -->
              <q-btn
                class="full-width q-pr-lg q-pl-xs button_style"
                @click="add_card = true"
              >
                <q-icon name="add" />
                Add a card
              </q-btn>
            </q-list>
          </q-card-section>
        </q-card>  
    </div>
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
    return {};
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
  background-color: #dfe1e7;

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
    height: 200px;
    .status {
      border-radius: 10px;
      width: 28%;
      text-align: center;
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
  }
}
.textShadow {
  text-shadow: 1px 1px 3px rgb(43, 40, 40);
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