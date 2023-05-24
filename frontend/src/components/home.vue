<template>
    <div @click="getPost"> 
        Home
    </div>
</template>

<script>
    export default{
        name: Home,
        data() {
            return {
                contents: '',
                imageUrl: ''
            }
        },
        methods: {
            getPost(){
                fetch("http://localhost:3000/api/posts")
                .then( response => response.json())
                .then( data => {
                    localStorage.setItem("users-info", JSON.stringify(data));  
                    this.$router.push({name: 'Home'}); //router to home page
                    console.log(data);})
            }
        }
    }
</script>