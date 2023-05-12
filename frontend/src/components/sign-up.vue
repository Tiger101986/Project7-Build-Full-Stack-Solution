<template>
    <form @submit.prevent="handleSubmit">
        <label for="email"> Email </label>
        <input type="email" v-model="email" required>
        <label for="password"> Password </label>
        <input type="password" v-model="password" required>
        <button> Submit </button>
        
    </form>
</template>
<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
    setup() {
        
    },
})
</script>
