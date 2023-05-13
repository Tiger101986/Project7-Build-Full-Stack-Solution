<template>
  <div>
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
  </div>
</template>

<script>
import SignUp from '@/components/SignUp.vue'
export default {
  name: "SignUp",
  component: {
      SignUp
  }
};//(await import('vue')).defineComponent();
</script>
