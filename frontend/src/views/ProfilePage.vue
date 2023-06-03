<template>
    <div>
        <p> User Id : {{ user.id }} </p>
        <button @submit.prevent="deleteUser" type="submit"> Delete </button>
    </div>
</template>

<script>

export default {
    name: "ProfileUser",
    data() {
        return {
            user: null
        }
    },
    methods: {
        deleteUser() {
            const { token } = JSON.parse(localStorage.getItem("users-info"));
            fetch("http://localhost:3000/api/auth/" + this.id, {
                method: "delete",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then((response) => response.json())
                .then((data) => {
                    this.user = data;
                    console.log(data);
                    this.$router.push({ name: 'SignUp' }); //router to signup page
                })
        }
    },
    mounted() {
        this.deleteUser;
    }
}
</script>

<style scoped>
button {
    width: 100px;
    height: 30px;
    margin-top: 30px;
}
</style>