<template>
  <q-page class="flex column flex-center">
    <div class="form">
      <q-form
        @submit.prevent="onSubmit"
        @reset="onReset"
        class="q-gutter-md q-pa-md border rounded-borders"
      >
        <q-input
          filled
          color="orange"
          bg-color="grey-4"
          v-model="name"
          label="Name"
          lazy-rules
          no-error-icon
          :rules="[
            (val) => (val && val.length > 0) || 'Please type something',
            (val) =>
              val.length >= 4 || 'Name must be at least 6 characters long',
          ]"
        />

        <q-input
          filled
          color="orange"
          bg-color="grey-4"
          type="email"
          v-model="email"
          label="Email"
          lazy-rules
          no-error-icon
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />

        <q-input
          filled
          color="orange"
          bg-color="grey-4"
          type="password"
          v-model="pass"
          label="Password"
          lazy-rules
          no-error-icon
          :rules="[
            (val) => (val && val.length > 0) || 'Please type something',
            (val) =>
              val.length > 5 || 'Password must be at least 6 characters long',
          ]"
        />

        <q-toggle v-model="accept" label="I accept the license and terms" />
        <q-item :to="`/terms`">Terms and License Agreement</q-item>
        <div class="flex justify-between">
          <q-btn label="Submit" type="submit" class="myOrange" />
          <q-btn label="Reset" type="reset" color="orange" flat class="q-ml-sm">
            <q-tooltip class="bg-orange">Will reset input values</q-tooltip>
          </q-btn>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { useQuasar } from "quasar";
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import Usercrud from "../modules/usercrud";


export default {
  name: "RegisterComponent",

  setup() {
    const $q = useQuasar();

    const name = ref(null);
    const email = ref(null);
    const pass = ref(null);
    const accept = ref(false);
    const router = useRouter();
    const { uState, GetAllUsers } =
      Usercrud();

    

    return {
      name,
      email,
      pass,
      accept,
      uState,
      GetAllUsers,

      async created() {
        try {
          const response = await axios.get(`users/`);
          this.posts = response.data;
        } catch (e) {
          this.errors.push(e);
        }
      },

      async onSubmit() {
        if (accept.value !== true) {
          $q.notify({
            color: "negative",
            textColor: "white",
            icon: "warning",
            message: "You need to accept the license and terms first",
          });
        } else {
          try {
            await axios.post("users/register", {
              name: name.value,
              email: email.value,
              pass: pass.value,
            });
            router.push("/login");
            $q.notify({
              color: "green-4",
              textColor: "white",
              icon: "cloud_done",
              message: "Submitted",
            });
          } catch (err) {
            let msg = err.response.data.error;
            $q.notify({
              color: "negative",
              textColor: "white",
              icon: "warning",
              message: msg,
            });
          }
        }
      },

      onReset() {
        name.value = null;
        email.value = null;
        pass.value = null;
        accept.value = false;
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.myOrange {
  background-color: map-get($cs, 4) !important;
  color: white;
}
</style>