<template>
  <form>
    <h1>Signup</h1>
    <label for="email"> Email </label>
    <input type="email" placeholder="Enter Email" v-model="email" required />
    <label for="password"> Password </label>
    <input
      type="password"
      placeholder="Enter Password"
      v-model="password"
      required
    />
    <button>Submit</button>
  </form>
</template>
<script>
export default {
  name: "SignUp",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },
};
</script>

<style>
form input {
  display: block;
  width: 30px;
  height: 40px;
  margin-bottom: 30px;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid black;
}
</style>