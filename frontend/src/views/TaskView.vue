<template>
  <div>
    <h1>Editing a Task</h1>

    <div v-for="Item in Task" :key="Item._id">
      Author:
      <h4>{{ Item.author }}</h4>
      Task Item:
      <p>{{ Item.Task }}</p>
    </div>

    <hr />

    <input type="text" placeholder="Author" v-model="State.NewAuthor" />
    <span> Author : {{ State.NewAuthor }} </span>
    <br />
    <input type="text" placeholder="Task" v-model="State.NewTaskItem" />
    <span> Task : {{ State.NewTaskItem }} </span>
    <br />
    <button @click="EditTask()">Update Task</button>

    <hr />
  </div>
</template>

<script>
import Taskcrud from "../modules/taskcrud";

export default {
  setup() {
    const { EditTask, State, GetSpecificTask, Task, TaskId } = Taskcrud();

    GetSpecificTask();

    return { Task, TaskId, EditTask, State };
  },
};
</script>

<style lang="scss" scoped>
</style>