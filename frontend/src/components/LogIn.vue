<template>
  <form>
    <input type="email" placeholder="Enter Email" v-model="users.email" required />
    <input type="password" placeholder="Enter Password" v-model="users.password" require />
    <button>Log In</button>
  </form>
</template>
<script>
export default {
  name: "LogIn",
  data() {
    return {
      users : {
        email: '',
        password: ''
      }  
    }
  }  
};
</script>
