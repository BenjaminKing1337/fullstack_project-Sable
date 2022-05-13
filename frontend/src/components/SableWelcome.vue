<template>
  <q-page class="flex column flex-center">
    <img alt="Quasar logo" src="../assets/logo.png" style="width: 200px; height: 200px">
    <h2 class="text-center">Welcome to Sable</h2>
    <div class="flex">
      
      <router-link class="router-link" to="/register">
        <q-btn class="q-mr-xs q-px-xl" label="Sign Up" outline color="orange" />
      </router-link>
      <router-link class="router-link" to="/login">
        <q-btn class="myOrange q-ml-xs q-px-xl" label="Log In"  glossy color="orange" />
      </router-link>
      
    </div>
  </q-page>
</template>

<style lang="scss">
  .router-link{
    text-decoration: none;
  }
  .myOrange{
    background-color: map-get($cs, 4);
  }
</style>

<script>
export default {
  name: 'HelloWorld'
}
</script>
