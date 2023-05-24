<template>
  <form method="post">
    <input
      id="email"
      name="email"
      type="email"
      placeholder="Enter Email"
      v-model="users.email"
      required
    />
   <!--  <p style="{color: 'red'}"> {{ posts.errorMessage }}</p> -->
    <input
      id="password"
      name="password"
      type="password"
      placeholder="Enter Password"
      v-model="users.password"
      require
    />
    <button @click.prevent="onSubmit" type="submit">LogIn</button>
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
  },
  methods: {
    //login to home page
    onSubmit() {
      fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: this.users.email,
          password: this.users.password
        })
      })
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem("users-info", JSON.stringify(data));  
          this.$router.push({name: 'Home'});
          console.log(data)
        });       
    },
  }
}  

</script>
