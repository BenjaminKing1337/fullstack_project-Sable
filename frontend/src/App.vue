<template>
  <Nav /> <!-- Router View in the Nav component -->
</template>

<style lang="scss">  
</style>

<script>
import Nav from './components/NavComponent.vue'

export default {
  name: 'LayoutDefault',
  components: {
  Nav
  },

  setup () {
    return {
    }
    
  },

  /* userauth(){
    return{
      
    }
  } */
}
</script>
