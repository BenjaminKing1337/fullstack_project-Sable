<template>
  <q-page class="q-pa-xl">
    <h1>New List</h1>
    <div class="create">
      <div class="new">
        <h4>Create New List</h4>
        Select Project:
        <select v-model="lState.ProjectId" placeholder="Project">
          <option
            v-for="Project in pState.Projects"
            :key="Project._id"
            :value="Project._id"
          >
            {{ Project.name }}
          </option>
        </select>
        <br />
        <input type="text" placeholder="Title" v-model="lState.NewTitle" />
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

      <div class="preview">
        <h4>Preview</h4>
        <span> Title : {{ lState.NewTitle }} </span>
        <br />
        <span> Complete : {{ lState.NewIs_Complete }} </span>
        <br />
      </div>
    </div>

    <!-- List Loop -->
    <div v-for="List in lState.Lists" :key="List._id" class="listitem">
      <q-card flat bordered class="my-card bg-grey-1">
        <q-card-section>
          <div class="row items-center no-wrap">
            <div class="col">
              <div class="text-h6">
                <h4>
                  {{ List.title }}
                </h4>
                <div class="createInList">
                  <div class="create">
                    <div class="new">
                      <h6>Create New Task</h6>
                       <!--Select List:
                      <select v-model="tState.ListId" placeholder="List">
                        <option
                          :key="List._id"
                          :value="List._id"
                        >
                          {{ List.title }}
                        </option>
                      </select> -->
                      <!-- <span>List: {{ List.title }}</span> -->
                      <!-- <br />
                      <input
                        type="text"
                        placeholder="Author"
                        v-model="tState.NewAuthor"
                      size="10"
                      /> -->
                      <br />
                      <input
                        type="text"
                        placeholder="Task"
                        v-model="tState.NewTaskItem"
                        size="10"
                      />
                      <!-- <br />
                       <input
                        type="text"
                        placeholder="Description"
                        v-model="tState.NewDescription"
                      />
                      <br />
                      <input
                        type="date"
                        placeholder="Deadline"
                        v-model="tState.NewDeadline"
                        size="10"
                      />
                      
                      <br />
                      <input
                        type="number"
                        placeholder="Status"
                        v-model="tState.NewStatus"
                      size="10"
                      />
                      <br />
                      Optional:
                      <input
                        type="checkbox"
                        placeholder="Optional"
                        v-model="tState.NewIs_Optional"
                      size="10"
                      />
                      <br /> -->
                      <button @click="NewTask(List._id)">Create New Task</button>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <!-- {{ GetAllTasksByListId(List._id) }} -->
                <!-- {{ GetAllTasks() }} -->
              </div>
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
            </div>

            <div class="col-auto">
              <q-btn color="grey-7" round flat icon="more_vert">
                <q-menu cover auto-close>
                  <q-list>
                    <router-link :to="`/list/${List._id}`">
                      <q-item clickable>
                        <q-item-section>
                          <button @click="EditList(List.value._id)">
                            Edit List
                          </button>
                        </q-item-section>
                      </q-item>
                    </router-link>
                    <q-item clickable>
                      <q-item-section>
                        <button @click="DeleteList(List._id)">
                          Delete List
                        </button>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </div>
          </div>
        </q-card-section>

        <q-card-section>
          <p>Completed: {{ List.is_Complete }}</p>
        </q-card-section>

        <q-separator />
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
    const { lState, GetAllLists, NewList, DeleteList, EditList } = Listcrud();
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
      GetAllLists();
      GetAllTasks();
      // GetAllTasksByListId();
    });

    // GetAll();
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
      tState,
      GetAllTasks,
      // GetAllTasksByListId,
      NewTask,
      DeleteTask,
      EditTask,
      filterTasks,
    };
  },
};
</script>


<style lang="scss" scoped>
.new {
  margin: 1%;
  padding: 1%;
  border: 1px solid map-get($cs, 1);
}
.listitem {
  width: 100%;
}
</style>