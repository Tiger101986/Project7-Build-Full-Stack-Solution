<template>
  <img id="company-logo" alt="Groupomania-logo" src="/images/icon-left-font.png" />
  <nav>
    <router-link to="/"> Home </router-link> |
    <router-link to="/post"> Post </router-link> |
    <router-link to="/signup"> Signup </router-link> |
    <router-link to="/login"> Login </router-link> |
    <router-link to="/profile"> Profile </router-link>
    <router-link to="/:id"></router-link>
    <div class="userAccount">
      Hello {{ user }} !
      <button class="logOut-btn" @click.prevent="logOut" type="submit"> Log-out </button>
    </div>

  </nav>
  <router-view />
</template>

<script>
export default {
  name: "appPage",
  data() {
    return {
      user: ''
    }
  },
  mounted() {
    const { email } = JSON.parse(localStorage.getItem("users-info"));
    this.user = email;
  },
  methods: {
    logOut() {
      localStorage.removeItem("users-info")
      this.$router.push({ name: 'Login' });
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  position: relative;
  min-width: 375px;
  padding: 20px 0px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#company-logo {
  width: 300px;
  margin: -100px 0 -120px -38px;
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

.userAccount {
  padding: 5px;
  color: blue;
}

.logOut-btn {
  padding: 2px;
  margin-left: 5px;
  border: hidden;
  background-color: gray;
}

@media screen and (max-width: 425px) {
  .logOut-btn {
    margin-top: 5px;
  }
}
</style>
