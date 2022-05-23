<template>
  <q-page class="flex column flex-center">
    <div class="form">
      <q-card v-for="Item in List" :key="Item._id">
      <q-card-section class="q-pa-none">
        <div class="coloredName" v-bind:style="{ backgroundColor: Item.color }">
          <h4 class="textShadow text-white">{{ Item.title }}</h4>
        </div>
      </q-card-section>

      <q-card-section class="flex">
        <h6>Is Complete?:</h6>
        <h6>{{ Item.is_Complete }}</h6>
      </q-card-section>
    </q-card>

    <br />

    <q-card >
      <q-card-section>
        <q-form @submit.prevent="EditList" class="flex column center">
          <q-input
            style="padding: 10px"
            filled
            color="orange-5"
            class="q-mb-md"
            type="text"
            placeholder="Title"
            v-model="lState.NewTitle"
            no-error-icon
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />
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

          <q-btn label="Update List" type="submit" class="myOrange q-mt-lg text-white" />
        </q-form>
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
.my-picker {
  max-width: 280px;
}
.form {
  width: clamp(315px, 25vw, 600px);
}

</style>