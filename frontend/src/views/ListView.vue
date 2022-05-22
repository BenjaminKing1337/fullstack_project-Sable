<template>
  <div>
    <h1>Editing a List</h1>

    <div v-for="Item in List" :key="Item._id">
      Title:
      <h4>{{ Item.title }}</h4>
      Color:
      <p>{{ Item.color }}</p>
      Is Complete?:
      <p>{{ Item.is_Complete }}</p>
    </div>

    <hr />

    <input type="text" placeholder="Title" v-model="lState.NewTitle" />
    <span> Title : {{ lState.NewTitle }} </span>
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
    <input type="checkbox" placeholder="Is Complete?" v-model="lState.NewIs_Complete" />
    <span> Is Complete? : {{ lState.NewIs_Complete }} </span>
    <button @click="EditList()">Update List</button>

    <hr />
  </div>
</template>

<script>
import Listcrud from "../modules/listcrud";

export default {
  setup() {
    const { EditList, lState, GetSpecificList, List, ListId } = Listcrud();
    GetSpecificList();

    return { List, ListId, EditList, 
      lState
      };
  },
};
</script>

<style lang="scss" scoped>
</style>