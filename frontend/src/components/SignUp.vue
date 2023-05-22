<template>
  <form>
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
    <button @click.prevent="signUp" type="submit">SignUp</button>
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
    signUp() {
      console.log("Hello World");
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
  background-color: rgb(135, 235, 193);
  width: 470px;
  height: 45px;
  margin: auto;
  border: 1px solid black;
}
</style>