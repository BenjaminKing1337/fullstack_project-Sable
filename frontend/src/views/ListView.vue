<template>
  <q-page class="q-pa-xl page flex justifyc">
    <div>
      <q-card v-for="Item in List" :key="Item._id">
      <q-card-section class="q-mb-md">
        <div class="coloredName" v-bind:style="{ backgroundColor: Item.color }">
          <h2>{{ Item.title }}</h2>
        </div>
      </q-card-section>

      <q-card-section class="flex q-mb-sm">
        <h6>Is Complete?:</h6>
        <h6>{{ Item.is_Complete }}</h6>
      </q-card-section>
    </q-card>

    <br />

    <q-card>
      <q-card-section>
        <p>New List Title</p>
        <q-input
          style="padding: 10px"
          filled
          color="orange-5"
          class="q-mb-sm"
          type="text"
          placeholder="Title"
          v-model="lState.NewTitle"
        />
        <p style="margin-top: -15px; font-size: 10px; color: red">Required!</p>
        <hr />
        <input
          type="checkbox"
          placeholder="Is Complete?"
          v-model="lState.NewIs_Complete"
        />
        <span> Is Complete?</span>
        <br />
        <br />

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
        <hr />
        <q-btn @click="EditList()">Update List</q-btn>
        <br />
      </q-card-section>
    </q-card>
    </div>
  </q-page>
</template>

<script>
import Listcrud from "../modules/listcrud";

export default {
  setup() {
    const { EditList, lState, GetSpecificList, List, ListId } = Listcrud();
    GetSpecificList();

    return { List, ListId, EditList, lState };
  },
};
</script>

<style lang="scss" scoped>
.coloredName {
  border-radius: 5px;
  padding: 1%;
}
.my-picker {
  max-width: 280px;
}
</style>