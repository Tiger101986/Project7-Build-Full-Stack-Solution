<template>
  <!-- <img alt="Groupomania-logo" src="/images/icon-left-font.png"/>  -->
  <!-- /images/icon-above-font.png -->
  <div class="home">
  <p> Hello Home Page! </p> 
  <img src="/images/icon-above-font.png" alt="Home post">
  </div>
</template>

<script>
/* import HomeUp from '../components/HomeIn.vue' */

export default {
  name: 'HomeView'
}
</script>

<style scoped>
  .home {
    position: relative;
    background-image: "/images/icon-left-font.png";
    width: 300px;
    height: 300px;
    border: 1px solid saddlebrown;
    margin-left: 30px;
    margin-top: 50px;
    display: flex;
    justify-content: center;
  }
  .home img {
  width: 200px;
  height: 200px;
  position: absolute;
  left: 30px;
  top: 70px;
  }
</style>