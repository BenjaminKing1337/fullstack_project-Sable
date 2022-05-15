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

    <input type="text" placeholder="Author" v-model="tState.NewAuthor" />
    <span> Author : {{ tState.NewAuthor }} </span>
    <br />
    <input type="text" placeholder="Task" v-model="tState.NewTaskItem" />
    <span> Task : {{ tState.NewTaskItem }} </span>
    <br />
    <input type="text" placeholder="Description" v-model="tState.NewDescription" />
    <span> Description : {{ tState.NewDescription }} </span>
    <br />
    <input type="date" placeholder="Deadline" v-model="tState.NewDeadline" />
    <span> Deadline : {{ tState.NewDeadline }} </span>
    <br />
    <input type="number" placeholder="Status" v-model="tState.NewStatus" />
    <span> Status : {{ tState.NewStatus }} </span>
    <br /> Optional:
    <input type="checkbox" placeholder="Optional" v-model="tState.NewIs_Optional" />
    <span> Optional : {{ tState.NewIs_Optional }} </span>
    <br />
    <button @click="EditTask()">Update Task</button>

    <hr />
  </div>
</template>

<script>
import Taskcrud from "../modules/taskcrud";

export default {
  setup() {
    const { EditTask, tState, GetSpecificTask, Task, TaskId } = Taskcrud();

    GetSpecificTask();

    return { Task, TaskId, EditTask, tState };
  },
};
</script>

<style lang="scss" scoped>
</style>