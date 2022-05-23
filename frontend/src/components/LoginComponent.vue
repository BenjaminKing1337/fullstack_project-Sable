<template>
  <q-page class="flex column flex-center">
    <div class="form">
      <q-form @submit.prevent="onSubmit" @reset="onReset" class="q-gutter-md q-pa-md border rounded-borders">

        <q-input
          filled
          color="orange"
          bg-color="grey-4"
          type="email"
          v-model="email"
          label="Email"
          lazy-rules
          no-error-icon
          :rules="[
          (val) => (val && val.length > 0) || 'Please type something'
          ]"
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
          (val) => (val.length > 5) || 'Password must be at least 6 characters long',
          ]"
        />

        <div class="flex justify-between">
          <q-btn label="Log In" type="submit" class="myOrange" />
          <q-btn label="Reset" type="reset" color="orange" flat class="q-ml-sm">
            <q-tooltip class="bg-orange">Will reset input values</q-tooltip>
          </q-btn>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginComponent",
  data() {
    return {
      email: "",
      pass: "",
    };
  },
  methods: {
    async onSubmit() {
      const response = await axios.post("users/login", {
        email: this.email,
        pass: this.pass,
      });

      localStorage.setItem("Token", response.data.data.Token);
      localStorage.setItem("name", response.data.name);
      localStorage.setItem("level", response.data.level);
      localStorage.setItem("userid", response.data.id);
      this.$router.push("/");
    },
    onReset() {
        this.email = null;
        this.pass = null;
      },
  },
};
</script>

<style lang="scss" scoped>
.myOrange{
    background-color: map-get($cs, 4) !important;
    color:white;
  }
</style>