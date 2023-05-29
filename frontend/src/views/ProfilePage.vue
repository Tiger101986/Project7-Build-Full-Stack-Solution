<template>
    <div >
        <p> User Id : {{ userId }} </p>
        <button @click="deleteUser" type="submit"> Delete </button>
    </div>
</template>

<script>

export default {
    name: "ProfileUser",
    data() {
        return{
            userId: ''
        }   
    },
    methods: {
        getUser() {
            let userInfo = JSON.parse(localStorage.getItem("users-info")) || [];
            if ( userInfo.length !== 0) {
                    return this.userId = userInfo;
                }
            }
        },
        deleteUser() {
            const { token} = JSON.parse(localStorage.getItem("users-info"));
            fetch("http://localhost:3000/api/auth/", {
                method: "delete",
                headers: { 
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json" },
            })
                .then((response) => response.json())
                .then((data) => { console.log(data)
                this.$router.push({name: 'SignUp'}); //router to signup page
                })
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