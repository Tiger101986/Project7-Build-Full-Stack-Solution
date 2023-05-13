<template>
  <div>
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
  </div>
</template>

<script>
import LogIn from '@/components/LogIn.vue'
export default {
  name: "SignIn",
  component: {
      LogIn
  }
};//(await import('vue')).defineComponent();
</script>
