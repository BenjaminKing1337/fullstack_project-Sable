<template>
  <q-page class="q-pa-xl">
    <h1>New List</h1>
    <div class="create">
      <div class="new">
        <h4>Create New List</h4>
        <input type="text" placeholder="Title" v-model="lState.NewTitle" />
        <br /> Complete
        <input type="checkbox" placeholder="Complete" v-model="lState.NewIs_Complete" />
        <br />
        <button @click="NewList()">Create New List</button>
      </div>

      <div class="preview">
        <h4>Preview</h4>
        <span> Title : {{ lState.NewTitle }} </span>
        <br />
        <span> Complete : {{ lState.NewIs_Complete }} </span>
        <br />
      </div>
    </div>


    <div v-for="List in lState.Lists" :key="List._id" class="listitem">
      <q-card flat bordered class="my-card bg-grey-1">
        <q-card-section>
          <div class="row items-center no-wrap">
            <div class="col">
              <div class="text-h6">
                <h4>
                  {{ List.title }}
                </h4>
              </div>
              <div class="text-subtitle2">
                <p>
                  {{ List.tasks }}
                </p>
                <p>
                  Completed: {{ List.is_Complete }}
                </p>
              </div>
            </div>

            <div class="col-auto">
              <q-btn color="grey-7" round flat icon="more_vert">
                <q-menu cover auto-close>
                  <q-list>
                    <router-link :to="`/list/${List._id}`">
                      <q-item clickable>
                        <q-item-section>
                          <button @click="EditList(List.value._id)">
                            Edit List
                          </button>
                        </q-item-section>
                      </q-item>
                    </router-link>
                    <q-item clickable>
                      <q-item-section>
                        <button @click="DeleteList(List._id)">
                          Delete List
                        </button>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </div>
          </div>
        </q-card-section>

        <q-card-section>
          {{ lorem }}
        </q-card-section>

        <q-separator />
      </q-card>
    </div>

    <!--  <q-card flat bordered class="my-card bg-grey-1">
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h6">Deploy</div>
            <div class="text-subtitle2">by Benjamin</div>
          </div>

          <div class="col-auto">
            <q-btn color="grey-7" round flat icon="more_vert">
              <q-menu cover auto-close>
                <q-list>
                  <q-item clickable>
                    <q-item-section>
                      <button @click="EditList(List.value._id)">
                        Edit List
                      </button>
                    </q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section>
                      <button @click="DeleteList(List._id)">Delete List</button>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        {{ lorem }}
      </q-card-section>

      <q-separator />
    </q-card> -->
  </q-page>
</template>

<script>
import Listcrud from "../modules/listcrud";
import { onMounted } from "vue";

export default {
  setup() {
    const { lState, GetAllLists, NewList, DeleteList, EditList } = Listcrud();

    onMounted(() => {
      GetAllLists();
    });

    // GetAll();
    return {
      lState,
      GetAllLists,
      NewList,
      DeleteList,
      EditList,
    };
  },
};
</script>


<style lang="sass" scoped>
</style>