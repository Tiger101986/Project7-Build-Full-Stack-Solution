<template>
  <div class="posts" @submit="postContents" method="post">
    <input type="text" name="contents" placeholder="Enter Contents" v-model="posts.content"/>
    <p> <a> Image </a> </p>
    <button id="posts-button" type="submit"> Post Content! </button>
  </div>
</template>
<script>
import * as Vue from 'vue' // in Vue 3
import axios from 'axios'
import VueAxios from 'vue-axios'
//Vue.use(VueAxios, axios)
const app = Vue.createApp();
app.use(VueAxios, axios)

export default {
  name: "PostUp",
  data() {
    return {
      posts : {
        content: '',
        imgageUrl: ''
      }  
    }
  },
  methods:{
    postContents(e){
      axios.post("http://localhost:8080/api/posts/", this.posts)
      .then(response => {
        console.log(response)
      }).catch((e) => { this.error.push(e)})
      e.preventDefault();
    },
  }  
};
</script>

<style>
  .posts{
   display: flex;
   flex-direction: column;
   /* border: 2px solid blue; */
   margin: auto 30px;
   padding: 30px;
  }
  div input{
    height: 300px;
    text-align: center;
    border: 1px solid blue;
  }
  ::placeholder{
    font-size: 20px;
    color: blue;
  }
  div p{
    width: 70px;
    height: 30px;
    color: blue;
    border: 1px solid blue;
    padding-top: 7px;
  }
  div button{
    font-size: 16px;
    width:120px ;
    height: 50px;
    background-color: white;
    color: blue;
    border: 1px solid blue;
  }
</style>
