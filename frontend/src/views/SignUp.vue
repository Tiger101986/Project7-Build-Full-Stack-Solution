<template>
  <div>
    <h1>Signup</h1>
    <SignUp />
  </div>
</template>

<script>
import SignUp from '@/components/SignUp.vue'
export default {
  name: "CreateAccount",
  component: {
      SignUp
  }
};
</script>
