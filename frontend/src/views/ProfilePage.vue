<template>
    <div v-for="user in users " :key="user">
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
            users: {}
        }   
    },
    methods: {
        getUser() {
            const params = new URLSearchParams(window.location.search);
            const id = params.get('id'); 
            fetch("http://localhost:3000/api/auth/signup" + id)
                .then( response => response.json())
                .then( data => { this.users = data;
                     console.log(data);})
        },
        deleteUser() {
            fetch("http://localhost:3000/api/posts/", {
                method: "delete",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    content: this.users.email,
                    imgageUrl: this.users.password
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                localStorage.setItem("UserProfile", JSON.stringify(data));  
                this.$router.push({name: 'SignUp'}); //router to signup page
                console.log(data)});
        }
    }
}
</script>

<style scoped>

</style>