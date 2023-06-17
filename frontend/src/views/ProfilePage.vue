<!-- Generate User profile page to be able delete user account -->
<template>
    <button @click.prevent="deleteUser" type="submit"> Delete </button>
</template>


<script>
export default {
    name: "ProfileUser",
    methods: {
        deleteUser() {
            const { userId, token } = JSON.parse(localStorage.getItem("users-info"));
            fetch(`http://localhost:3000/api/auth/${userId}`, {
                method: "delete",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then((response) => {
                    if (response.status !== 204) {
                        throw response.status;
                    } else {
                        return response.json()
                    }
                })
                .then(() => {
                    localStorage.removeItem("users-info")
                    this.$router.push({ name: 'SignUpPage' }); //router to signup page
                })
        }
    },

}
</script>

<!-- Styling delete button -->
<style scoped>
button {
    width: 100px;
    height: 30px;
    margin-top: 30px;
}
</style>