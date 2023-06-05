<template>
    <button @click.prevent="deleteUser" type="submit"> Delete </button>
</template>

<script>

export default {
    name: "ProfileUser",
    methods: {
        deleteUser() {
            const { token } = JSON.parse(localStorage.getItem("users-info"));
            fetch(`http://localhost:3000/api/auth/${this.$route.params.id}`, {
                method: "delete",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then((response) => response.json())
                .then(() => {
                    this.$router.push({ name: 'SignUp' }); //router to signup page
                })
        }
    },

}
</script>

<style scoped>
button {
    width: 100px;
    height: 30px;
    margin-top: 30px;
}
</style>