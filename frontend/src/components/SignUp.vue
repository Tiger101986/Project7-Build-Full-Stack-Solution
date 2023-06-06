<!-- Create singup template -->
<template>
  <form method="post">
    <input id="email" name="email" type="email" placeholder="Enter Email" v-model="users.email" required />
    <input id="password" name="password" type="password" placeholder="Enter Password" v-model="users.password" require />
    <button @click.prevent="onSubmit" type="submit">SignUp</button>
  </form>
</template>

<!-- Create signup properties and send to database -->
<script>

export default {
  name: "SignUp",
  data() {
    return {
      users: {
        email: "",
        password: "",
      }
    }
  },
  methods: {
    //use fetch() sending user signup to home page and database to save data
    onSubmit() {
      fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: this.users.email,
          password: this.users.password
        }),
      })
        .then((response) => {
          if (response.status !== 201) {
            throw response.status;
          } else {
            return response.json()
          }
        })
        .then((data) => {
          this.$router.push({ name: 'Login' }); //router to home page
          console.log(data)
        });
    }

  },

};
</script>

<style>
form {
  width: 50%;
  margin-left: 25%;
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
  /* background-color: rgb(135, 235, 193); */
  width: 450px;
  height: 45px;
  margin: auto;
  border: 1px solid black;
}
</style>
