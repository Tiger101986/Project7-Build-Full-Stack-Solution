<template>
  <form method="post">
    <input id="email" name="email" type="email" placeholder="Enter Email" v-model="users.email" required />
    <input id="password" name="password" type="password" placeholder="Enter Password" v-model="users.password" require />
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
    }
  },
  methods: {
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
        });
    },
  }
}

</script>

<style scoped>
form {
  width: 100%;
  margin-top: 50px;
}

form input {
  display: block;
  width: 450px;
  padding-left: 15px;
  height: 45px;
  margin: 30px auto;
  border: 1px solid black;
}

form button {
  font-size: 15px;
  width: 450px;
  height: 45px;
  margin: auto;
  border: 1px solid black;
}
</style>