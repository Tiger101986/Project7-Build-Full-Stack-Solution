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
