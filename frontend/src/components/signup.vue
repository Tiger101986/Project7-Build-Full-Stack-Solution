<template>
    <form @submit.prevent="handleSubmit">
        <h1> Sign-up Account </h1>
        <label for="email"> Email </label>
        <input type="email" v-model="email">
        <label for="password"> Password </label>
        <input type="password" v-model="password">
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
