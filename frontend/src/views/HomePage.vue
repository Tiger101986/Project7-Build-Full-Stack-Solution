<template>
  <div class="home">
    <img alt="Groupomania-logo" src="/images/icon-above-font.png">
    <HomeUp />
    
  </div>
</template>

<script>
import HomeUp from '../components/HomeIn.vue'

export default {
  name: 'HomeView',
  components: {
    HomeUp,
  }
}
</script>
