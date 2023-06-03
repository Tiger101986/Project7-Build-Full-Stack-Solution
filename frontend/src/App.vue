<template>
  <nav>
    <router-link to="/"> Home </router-link> |
    <router-link to="/post"> Post </router-link> |
    <router-link to="/signup"> Signup </router-link> |
    <router-link to="/login"> Login </router-link> |
    <router-link to="/profile"> Profile </router-link>
    <router-link to="/post/:id"></router-link> |
  </nav>
  <router-view/> 
</template>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body{
  background-image: url("../public/images/icon-above-font.png");
  background-repeat: no-repeat;
  background-position: fixed;
  background-position-x: center;
  position: relative;
  min-width: 315px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-size: 18px;
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
