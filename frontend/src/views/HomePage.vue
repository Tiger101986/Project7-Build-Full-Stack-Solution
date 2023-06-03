<template>
  <!-- <img alt="Groupomania-logo" src="/images/icon-left-font.png"/>  -->
  <!-- /images/icon-above-font.png -->

  <h1> Wellcome to Groupomania Teams! </h1>
  <div v-if="posts.length">
    <div class="home" v-for="post in posts" :key="post.id">
      <router-link :to="{
        name: 'SinglePost',
        params: { id: post.id }
      }">
        <p> {{ post.contents }} </p>
        <img :src="post.imageUrl" alt="" />
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
  }
}
</script>

<style scoped>
.home {
  position: relative;
  background-image: "/images/icon-left-font.png";
  width: 300px;
  height: 300px;
  border: 1px solid saddlebrown;
  margin-left: 30px;
  margin-top: 50px;
  display: flex;
  justify-content: center;
}

.home img {
  width: 200px;
  height: 200px;
  position: absolute;
  left: 30px;
  top: 70px;
}
</style>