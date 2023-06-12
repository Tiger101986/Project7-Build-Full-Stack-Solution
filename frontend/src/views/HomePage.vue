<template>
  <!-- <img alt="Groupomania-logo" src="/images/icon-left-font.png"/>  -->
  <!-- /images/icon-above-font.png -->

  <h1> Wellcome to Groupomania Teams! </h1>
  <div class="home-column" v-if="posts.length">
    <div class="homePost" v-for="post in posts" :key="post.id" @click="readPost">
      <router-link class="homePost-link" :to="{
        name: 'SinglePost',
        params: { id: post.id }
      }">
        <p class="homePost-content"> {{ post.contents }} </p>
        <img class="homePost-image" v-if="['png', 'jpg', 'jpeg', 'tiff', 'gif', 'jfif'].includes(getExtension(post.imageUrl))" :src="post.imageUrl" alt="" />
        <video v-else-if="['.mp4', '.ogg'].includes(getExtension(post.imageUrl))" controls autoplay muted>
          <source :src="post.imageUrl" type="">
        </video>
        <audio v-else-if="['.mpeg', '.ogg'].includes(getExtension(post.imageUrl))" controls autoplay muted>
          <source :src="post.imageUrl" type="">
        </audio>
      </router-link>
    </div>
  </div>
  <div v-else>
    <p> Loading Posts ...</p>
  </div>
</template>

<script>
/* import HomeUp from '../components/HomeIn.vue' */

export default {
  name: 'HomeView',
  data() {
    return {
      posts: []
    }
  },
  mounted() {
    const { token } = JSON.parse(localStorage.getItem("users-info"));
    fetch("http://localhost:3000/api/posts", {
      method: 'get',
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    })
      .then(response => response.json())
      .then(data => { this.posts = data; })
      .catch(error => { console.log(error.message); })
  },
  methods: {
    getExtension(imageUrl) {
      return imageUrl?.split('.').pop();
    },
  }
}
</script>

<style scoped>
div .home-column {
  display: flex;
  flex-direction: column;
  
}

.homePost {
  width: 100%;
  height: auto;
  border: 1px solid saddlebrown;
  border-radius: 10px;
  margin-top: 50px;
  box-shadow: 5px 5px 5px lightgray;
}

.homePost-content {
  padding: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
}

.homePost-image {
  width: 100%;
  height: auto;
  object-fit: co;
  border-radius: 0 0px 10px 10px;
  /* position: relative; */
}

.homePost-link {
  color: black;
  text-decoration: none;
}
.readPost {
  text-decoration: aliceblue;
}
@media screen and (max-width: 1053px) {
  h1 {
    font-size: 25px;
  }
}
@media screen and (max-width: 615px) {
  h1 {
    font-size: 22px;
  }
}
</style>