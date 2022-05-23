<template>
  <q-page class="flex column flex-center">
    <!-- Logo and welcome msg  -->
    <img
      alt="Quasar logo"
      src="../assets/logo.png"
      style="width: 200px; height: 200px"
    />
    <h2 class="text-center">Welcome to Sable</h2>
    <div class="flex">
      <!-- Not logged in routes -->
      <router-link v-if="!userAuth()" class="router-link" to="/register">
        <q-btn class="q-mr-xs q-px-xl" label="Sign Up" outline color="orange" />
      </router-link>
      <router-link v-if="!userAuth()" class="router-link" to="/login">
        <q-btn
          class="myOrange q-ml-xs q-px-xl"
          label="Log In"
          glossy
          color="orange"
        />
      </router-link>
      <!-- // Logged in user Display -->
      <div v-else class="flex alignc">
        <h5>You're logged in as</h5>
        &nbsp;&nbsp;
        <h4>
          <strong class="sablecolor">{{ name }}</strong>
        </h4>
      </div>
    </div>
  </q-page>
</template>

<style lang="scss">
.router-link {
  text-decoration: none;
}
.myOrange {
  background-color: map-get($cs, 4);
}
</style>

<script>
export default {
  data() {
    return {
      name: localStorage.getItem("name"),
    };
  },
  setup() {
    return {
      userAuth() {
        return (
          localStorage.getItem("Token") !== null &&
          localStorage.getItem("Token") !== undefined
        );
      },
    };
  },
};
</script>
