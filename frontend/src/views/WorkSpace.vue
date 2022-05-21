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
      <div v-for="List in lState.Lists" :key="List._id" class="listitem">
       <q-card class="my-card">
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
              <!-- TASK LOOP  -->
              <div
                v-for="Task in filterTasks(tState.Tasks, List._id)"
                :key="Task._id"
                class="text-subtitle2 border"
              >
                <p>Name:{{ Task.task }}</p>
                <!-- <p>Decription: {{ Task.description }}</p>
                <p>Deadline: {{ Task.deadline }}</p>
                <p>Status: {{ Task.status }}</p>
                <p>Optional?: {{ Task.is_optional }}</p> -->
              </div>
              <!-- <q-item
                clickable
                v-for="task in tasks"
                v-bind:key="task"
                @click="open_task = true"
              >
                <q-item-section>
                  <q-item-label>{{ task.title }}</q-item-label>
                  <q-item-label
                    class="status text-weight-bold"
                    caption
                    :class="{
                      done: task.status === 'done',
                      pending: task.status === 'pending',
                      'not-done': task.status === 'not-done',
                    }"
                  >
                    {{ task.status }}
                  </q-item-label>
                </q-item-section>
              </q-item> -->
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
        
   
      <!-- Add card -->
    <q-dialog
      v-model="add_card"
      persistent
      transition-show="rotate"
      transition-hide="rotate"
    >

    
      <q-card class="q-pa-md overflow-hidden" style="min-width: 350px">
        <q-card-section class="q-pa-sm">
          <div class="text-h6">Add a card</div>
        </q-card-section>

        <q-card-section class="q-pt-none q-ml-md">
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
          <q-input class="q-mb-sm" v-model="title" label="Title" filled />
          <q-input
            class="q-mb-sm"
            v-model="description"
            type="textarea"
            label="Description"
            filled
          />
          <q-input
            class="q-mb-sm"
            v-model="date"
            type="date"
            filled
            hint="Pick a deadline"
          />
          <div class="column">
            <q-radio v-model="status" val="done" label="Done" />
            <q-radio v-model="status" val="pending" label="Pending" />
            <q-radio v-model="status" val="not-done" label="Not-done" />
          </div>
        </q-card-section>

        <q-card-actions align="right" class="myOrange_color text-weight-bold">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Add" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Edit List -->
    <q-dialog
      v-model="edit_list"
      persistent
      transition-show="rotate"
      transition-hide="rotate"
    >
      <q-card class="q-pa-md overflow-hidden" style="min-width: 350px">
        <q-card-section class="q-pa-sm">
          <div class="text-h6">Edit List</div>
        </q-card-section>

        <q-card-section class="q-pt-none q-ml-md">
          <q-input class="q-mb-sm" v-model="title" label="Title" filled />
          <div class="disable_scroll">
            <q-color
              v-model="hex"
              no-header
              no-footer
              default-view="palette"
              class="my-picker scroll overflow-hidden"
            />
            <q-badge color="grey-3" text-color="black" class="q-mb-sm">
              {{}}
            </q-badge>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="myOrange_color text-weight-bold">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Edit" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- Open Task -->
    <q-dialog
      v-model="open_task"
      persistent
      transition-show="rotate"
      transition-hide="rotate"
    >
      <q-card
        class="q-pa-md overflow-hidden"
        style="min-width: 350px; width: 60%"
      >
        <q-card-section class="q-pa-sm">
          <div class="text-h6">Task</div>
        </q-card-section>

        <q-card-section class="q-pt-none q-ml-md">
          <q-input class="q-mb-sm" v-model="title" label="Title" filled />
          <q-input
            class="q-mb-sm"
            v-model="description"
            type="textarea"
            label="Description"
            filled
          />
          <q-input
            class="q-mb-sm"
            v-model="date"
            type="date"
            filled
            hint="Pick a deadline"
          />
          <div class="column">
            <q-radio v-model="status" val="done" label="Done" />
            <q-radio v-model="status" val="pending" label="Pending" />
            <q-radio v-model="status" val="not-done" label="Not-done" />
          </div>
        </q-card-section>

        <q-card-actions align="right" class="myOrange_color text-weight-bold">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Edit" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    </div>
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
    return {
      lists: [
        { title: "My planet", color: "purple" },
        { title: "My world", color: "blue" },
        { title: "My plan", color: "green" },
        { title: "My vingardium leviosa", color: "#ffff00" },
        { title: "Me running out of ideas", color: "red" },
        { title: "Lorem Ipsum", color: "purple" },
        {
          title: "My Ipsum Lorem beef patty with sauted onions yumm yumm",
          color: "purple",
        },
        {
          title: "My Ipsum Lorem beef patty with sauted onions yumm yumm",
          color: "purple",
        },
        {
          title: "My Ipsum Lorem beef patty with sauted onions yumm yumm",
          color: "purple",
        },
        {
          title: "My Ipsum Lorem beef patty with sauted onions yumm yumm",
          color: "purple",
        },
        {
          title: "My Ipsum Lorem beef patty with sauted onions yumm yumm",
          color: "purple",
        },
        {
          title: "My Ipsum Lorem beef patty with sauted onions yumm yumm",
          color: "purple",
        },
      ],
      tasks: [
        {
          title: "A task",
          description: "description of a task",
          status: "done",
        },
        {
          title: "Another task",
          description: "description of a task",
          status: "pending",
        },
        {
          title: "One more task",
          description: "description of a task",
          status: "not-done",
        },
      ],
      add_card: false,
      edit_list: false,
      open_task: false,
      status: "",
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