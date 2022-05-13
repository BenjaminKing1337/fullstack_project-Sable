<template>
  <div class="page">
    <h1>New Task</h1>
    <div class="create">
      <div class="new">
        <h4>Create New Task</h4>
        <input type="text" placeholder="Author" v-model="State.NewAuthor" />
        <br />
        <input type="text" placeholder="Task" v-model="State.NewTaskItem" />
        <br />
        <button @click="NewTask()">New Task</button>
      </div>

      <div class="preview">
        <h4>Preview</h4>
        <span> Author : {{ State.NewAuthor }} </span>
        <br />
        <span> Task : {{ State.NewTaskItem }} </span>
      </div>
    </div>

    <h1>All Tasks</h1>
    <div class="tasklist">
      <div v-for="Task in State.Tasks" :key="Task._id" class="taskitem">
        <router-link :to="`/task/${Task._id}`">
          <h4>
            {{ Task.Author }}
          </h4>
          <p>
            {{ Task.Task }}
          </p>
          <button @click="EditTask(Task.value._id)">Edit Task</button>
        </router-link>
        <button @click="DeleteTask(Task._id)">Delete Task</button>
      </div>
    </div>
  </div>
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