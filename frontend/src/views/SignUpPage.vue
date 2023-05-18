<template>
  <SignUp />
</template>

<script>
import SignUp from "../components/SignUp.vue";
export default (await import('vue')).defineComponent({
  name: "SignUpPage",
  components: {
    SignUp,
  },
});
</script>


