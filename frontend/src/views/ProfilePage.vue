<template>
    <div v-for="user in users " :key="user.id">
        <p> emalil : {{ user.email }} </p>
        <p> password: {{ user.password }} </p>
        <button @click="deleteUser" type="submit"> Delete </button>
    </div>
</template>

<script>
export default {
    name: "ProfileUser",
    data() {
        return{
            users: []
        }   
    },
    methods: {
        getUser() {
            let userInfo = JSON.parse(localStorage.getItem("users-info")) || [];
            if ( userInfo.length !== 0) {
                    return this.users = userInfo;
                }
            }
        },
        deleteUser() {
            const token = JSON.parse(localStorage.getItem("users-info")).token;
            fetch("http://localhost:3000/api/posts/", {
                method: "delete",
                headers: { 
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: this.users.email,
                    password: this.users.password
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                localStorage.setItem("UserProfile", JSON.stringify(data));  
                this.$router.push({name: 'SignUp'}); //router to signup page
                console.log(data)});
        }
    }
</script>

<style scoped>

</style>