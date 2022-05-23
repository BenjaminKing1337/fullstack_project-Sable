<template>
  <q-page class="q-pa-xl">
    <h1>New Task</h1>
    <div class="create">
      <div class="new">
        <h4>Create New Task</h4>
        Select List:
        <select v-model="tState.ListId" placeholder="List">
          <option
            v-for="List in lState.Lists"
            :key="List._id"
            :value="List._id"
          >
            {{ List.title }}
          </option>
        </select>
        <br />
        <input type="text" placeholder="Author" v-model="tState.NewAuthor" />
        <br />
        <input type="text" placeholder="Task" v-model="tState.NewTaskItem" />
        <br />
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
        />
        <br />
        <input type="number" placeholder="Status" v-model="tState.NewStatus" />
        <br />
        Optional:
        <input
          style="width: 20px; height: 20px"
          type="checkbox"
          placeholder="Optional"
          v-model="tState.NewIs_Optional"
        />
        <br />
        <button @click="NewTask()">Create New Task</button>
      </div>

      <div class="preview">
        <h4>Preview</h4>
        <span> List : {{ lState.ListId }} </span>
        <br />
        <span> Author : {{ tState.NewAuthor }} </span>
        <br />
        <span> Task : {{ tState.NewTaskItem }} </span>
        <br />
        <span> Description : {{ tState.NewDescription }} </span>
        <br />
        <span> Deadline : {{ tState.NewDeadline }} </span>
        <br />
        <span> Status : {{ tState.NewStatus }} </span>
        <br />
        <span> Optional : {{ tState.NewIs_Optional }} </span>
      </div>
    </div>

    <h1>All Tasks</h1>
    <div class="tasklist">
      <div v-for="Task in tState.Tasks" :key="Task._id" class="taskitem">
        <router-link :to="`/task/${Task._id}`">
          <h4>
            {{ Task.author }}
          </h4>
          <p>
            {{ Task.task }}
          </p>
          <p>
            {{ Task.description }}
          </p>
          <p>
            {{ Task.deadline }}
          </p>
          <p>
            {{ Task.status }}
          </p>
          <p>
            {{ Task.is_optional }}
          </p>
          <button @click="EditTask(Task.value._id)">Edit Task</button>
        </router-link>
        <button @click="DeleteTask(Task._id)">Delete Task</button>
      </div>
    </div>
  </q-page>
</template>


<script>
import Taskcrud from "../modules/taskcrud";
import Listcrud from "../modules/listcrud";
import { onMounted } from "vue";

export default {
  setup() {
    const { tState, GetAllTasks, NewTask, DeleteTask, EditTask } = Taskcrud();
    const { lState, GetAllLists, NewList, DeleteList, EditList } = Listcrud();

    onMounted(() => {
      GetAllTasks();
      GetAllLists();
    });

    // GetAll();
    return {
      tState,
      GetAllTasks,
      NewTask,
      DeleteTask,
      EditTask,
      lState,
      GetAllLists,
      NewList,
      DeleteList,
      EditList,
    };
  },
};
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  align-items: center;
  flex-direction: column;
  .create {
    width: 500px;
    margin: 60px;
    border: 2px solid black;
    display: flex;
    justify-content: space-between;
    // .new {float: left;}
    .preview {
      padding-right: 25%;
    }
  }
  .tasklist {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin: 50px;
    border: 1px solid black;
    .taskitem {
      grid-gap: 1em;
    }
  }
  button {
    background-color: map-get($cs, 3);
  }
  h4,
  p {
    color: map-get($cs, 4);
    text-decoration: underline;
  }
}
</style>