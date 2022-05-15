<template>
  <q-page class="q-pa-xl">
    <h1>New Task</h1>
    <div class="create">
      <div class="new">
        <h4>Create New Task</h4>
        <input type="text" placeholder="Author" v-model="State.NewAuthor" />
        <br />
        <input type="text" placeholder="Task" v-model="State.NewTaskItem" />
        <br />
        <input type="text" placeholder="Description" v-model="State.NewDescription" />
        <br />
        <input type="date" placeholder="Deadline" v-model="State.NewDeadline" />
        <br />
        <input type="number" placeholder="Status" v-model="State.NewStatus" />
        <br /> Optional: 
        <input type="checkbox" placeholder="Optional" v-model="State.NewIs_Optional" />
        <br />
        <button @click="NewTask()">Create New Task</button>
      </div>

      <div class="preview">
        <h4>Preview</h4>
        <span> Author : {{ State.NewAuthor }} </span>
        <br />
        <span> Task : {{ State.NewTaskItem }} </span>
        <br />
        <span> Description : {{ State.NewDescription }} </span>
        <br />
        <span> Deadline : {{ State.NewDeadline }} </span>
        <br />
        <span> Status : {{ State.NewStatus }} </span>
        <br />
        <span> Optional : {{ State.NewIs_Optional }} </span>
      </div>
    </div>

    <h1>All Tasks</h1>
    <div class="tasklist">
      <div v-for="Task in State.Tasks" :key="Task._id" class="taskitem">
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
import { onMounted } from "vue";

export default {
  setup() {
    const { State, GetAllTasks, NewTask, DeleteTask, EditTask } = Taskcrud();

    onMounted(() => {
      GetAllTasks();
    });

    // GetAll();
    return {
      State,
      GetAllTasks,
      NewTask,
      DeleteTask,
      EditTask,
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