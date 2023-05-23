<template>
    <div @click="getPost"> 
        Home
    </div>
</template>

<script>
import { response } from 'express';

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
                    console.log(data);})
            }
        }
    }
</script>