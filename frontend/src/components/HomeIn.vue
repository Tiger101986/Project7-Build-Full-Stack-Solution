<template>
    <div @click="getPost"> 
        Home
    </div>
    <div v-for="post in posts" :key="post">
        <p> {{ post.contents }} </p>
        <img src={{ post.imageUrl }} alt="User Post Images">
    </div>
</template>

<script>
    export default{
        name: "HomeUp",
        data() {
            return {
                posts: []
            }
        },
        methods: {
            getPost(){
                fetch("http://localhost:3000/api/posts")
                .then( response => response.json())
                .then( data => { this.posts = data;
                     console.log(data);})
            }
        }
    }
</script>