<template>
  <q-page class="flex column flex-center q-py-lg">
    <div class="form">
      <q-card v-for="Item in Project" :key="Item._id">
        <q-card-section class="q-pa-none">
          <div
            class="coloredName"
            v-bind:style="{ backgroundColor: Item.color }"
          >
            <h4 class="textShadow text-white">{{ Item.name }}</h4>
          </div>
          <q-item>
            <h6>{{ Item.description }}</h6>
          </q-item>
          <q-item>
            <h5>{{ Item.deadline }}</h5>
          </q-item>
        </q-card-section>
      </q-card>

      <br />

      <q-card>
        <q-card-section>
          <q-form @submit.prevent="EditProject">
            <q-input
              style="padding: 10px"
              filled
              color="orange-5"
              class="q-mb-sm"
              type="text"
              placeholder="Title"
              v-model="pState.NewName"
              no-error-icon
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
              ]"
            />

            <q-input
              style="padding: 10px"
              filled
              color="orange-5"
              class="q-mb-sm"
              type="text"
              placeholder="Description"
              v-model="pState.NewDescription"
            />
            <q-input
              style="padding: 10px"
              filled
              color="orange-5"
              class="q-mb-sm"
              type="date"
              placeholder="Deadline"
              v-model="pState.NewDeadline"
            />
            <br />

            <q-color
              v-model="pState.NewColor"
              no-header
              no-footer
              default-view="palette"
              class="my-picker scroll overflow-hidden"
            />
            <q-badge color="grey-3" text-color="black" class="q-mb-sm">
              {{ pState.NewColor }}
            </q-badge>
            <div class="flex spaceb">
              <q-btn
                label="Update Project"
                type="submit"
                class="myOrange q-mt-lg text-white"
              />
              <q-btn
                label="Cancel"
                type="submit"
                @click="goBack()"
                class="myOrange q-mt-lg text-white"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import Projectcrud from "../modules/projectcrud";
import { useRouter } from "vue-router";

export default {
  setup() {
    const { EditProject, pState, GetSpecificProject, Project, ProjectId } =
      Projectcrud();

    const Router = useRouter();

    GetSpecificProject();

    return {
      Project,
      ProjectId,
      EditProject,
      pState,
      goBack() {
        return Router.go(-1);
      },
    };
  },
};
</script>

<style lang="scss" scoped>
</style>