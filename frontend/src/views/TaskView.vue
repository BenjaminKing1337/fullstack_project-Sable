<template>
  <div>
    <h1>Editing a Task</h1>

    <div v-for="Item in Task" :key="Item._id">
      Author:
      <h4>{{ Item.author }}</h4>
      Task:
      <p>{{ Item.task }}</p>
      Description:
      <p>{{ Item.description }}</p>
      Deadline:
      <p>{{ Item.deadline }}</p>
      Status:
      <p>{{ Item.status }}</p>
      Optional:
      <p>{{ Item.is_optional }}</p>
    </div>

    <hr />

    <input type="text" placeholder="Author" v-model="State.NewAuthor" />
    <span> Author : {{ State.NewAuthor }} </span>
    <br />
    <input type="text" placeholder="Task" v-model="State.NewTaskItem" />
    <span> Task : {{ State.NewTaskItem }} </span>
    <br />
    <input type="text" placeholder="Description" v-model="State.NewDescription" />
    <span> Description : {{ State.NewDescription }} </span>
    <br />
    <input type="date" placeholder="Deadline" v-model="State.NewDeadline" />
    <span> Deadline : {{ State.NewDeadline }} </span>
    <br />
    <input type="number" placeholder="Status" v-model="State.NewStatus" />
    <span> Status : {{ State.NewStatus }} </span>
    <br /> Optional:
    <input type="checkbox" placeholder="Optional" v-model="State.NewIs_Optional" />
    <span> Optional : {{ State.NewIs_Optional }} </span>
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