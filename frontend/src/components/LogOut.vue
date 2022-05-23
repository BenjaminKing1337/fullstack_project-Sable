<template>
  <q-page class="flex column flex-center">
    <img alt="Quasar logo" src="../assets/logo.png" style="width: 200px; height: 200px">
    <h2 class="text-center">See ya later Alligator</h2>
    <div class="flex">
    <q-btn class="q-mr-xs q-px-xl" label="Log Out" @click="onLogout()" outline color="orange" />
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
 methods: {
     onLogout(){
        localStorage.clear();
        this.$router.push("/");
     }
 },
}
</script>