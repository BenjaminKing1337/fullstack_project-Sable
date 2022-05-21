<template>
  <div class="home">
    <SableWelcome />
  </div>
</template>

<script>
// import axios from "axios";
import SableWelcome from "@/components/SableWelcome.vue";


export default {
  name: "HomeView",
  components: {
    SableWelcome
},
  // async created() {
  //  /*  const response = */ await axios.get("users/user", {
  //     headers: { 'auth-token': localStorage.getItem("Token"),
  //     },
  //   });

  //   // console.log(response);
  // },
};
</script>
