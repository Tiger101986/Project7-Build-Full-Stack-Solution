<template>
  <form>
    <h1> Login </h1>
    <label for="email"> Email </label>
    <input type="email" placeholder="Enter Email" v-model="email" required />
    <label for="password"> Password </label>
    <input
      type="password"
      placeholder="Enter Password"
      v-model="password"
      required
    />
    <button>Log In</button>
  </form>
</template>
<script>
export default {
  name: "LogIn",
  /* data() {
    return {
      user : {
        email: '',
        password: ''
      }  
    }
  }   */
};
</script>
