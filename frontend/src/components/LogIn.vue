<template>
  <form method="post">
    <input id="email" name="email" type="email" placeholder="Enter Email" v-model="users.email" @input="validateEmail" required />
    <p v-if="errors.email"> {{ errors.email }}</p>
    <input id="password" name="password" type="password" placeholder="Enter Password" v-model="users.password" @input="validatePassword" require />
    <p v-if="errors.password"> {{ errors.password }}</p>
    <button @click.prevent="onSubmit" type="submit">LogIn</button>
  </form>
</template>
<script>
export default {
  name: "LogIn",
  data() {
    return {
      users: {
        email: '',
        password: ''
      },
      errors: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    //login to home page
    validateEmail() {
      const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
      this.errors.email = regex.test(this.users.email) ? "" : "Invalid email address.";
    },
    validatePassword() {

    },
    onSubmit() {
      fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: this.users.email,
          password: this.users.password
        })
      })
        .then((response) => {
          if (response.status !== 200) {
            throw response.status;
          } else {
            return response.json();
          }
        })
        .then((data) => {
          localStorage.setItem("users-info", JSON.stringify(data));
          this.$router.push({ name: 'Home' });
          console.log(data)
        });
    },
  }
}

</script>
