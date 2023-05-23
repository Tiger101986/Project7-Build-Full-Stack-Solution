<template>
  <form method="post">
    <input
      type="email"
      placeholder="Enter Email"
      v-model="users.email"
      required
    />
    <input
      type="password"
      placeholder="Enter Password"
      v-model="users.password"
      require
    />
    <button @click="onSubmit" type="submit">SignUp</button>
  </form>
</template>

<script>
export default {
  name: "SignUp",
  data() {
    return {
      users: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    //use fetch() sending user signup data to server to save in database
    onSubmit() {
      fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: this.emial,
          password: this.password,
        }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    },
  },
};
</script>

<style>
form {
  width: 50%;
  margin-left: 25%;
}
form label {
  font-size: 20px;
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
  font-size: 18px;
  /* background-color: rgb(135, 235, 193); */
  width: 470px;
  height: 45px;
  margin: auto;
  border: 1px solid black;
}
</style>
