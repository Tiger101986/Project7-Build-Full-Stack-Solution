<!-- Display all post in home page -->
<template>
  <div class="userAccount">
    Hello {{ user }} !
    <button class="logOut-btn" @click.prevent="logOut" type="submit"> Log-out </button>
  </div>
  <h1> Wellcome to Groupomania Teams! </h1>
  <div class="home-column" v-if="posts.length">
    <div class="homePost" v-for="post in posts" :key="post.id">
      <div class="homePost-isRead" v-if="isRead(post)">read</div>
      <router-link class="homePost-link" :to="{
        name: 'SinglePost',
        params: { id: post.id }
      }">
        <p class="homePost-userId"> Created by: {{ getUser(post.userId) }} </p>
        <p class="homePost-content"> {{ post.contents }} </p>
        <img class="homePost-image"
          v-if="['png', 'jpg', 'jpeg', 'tiff', 'gif', 'jfif'].includes(getExtension(post.imageUrl))" :src="post.imageUrl"
          alt="" />
        <video class="homePost-video" v-else-if="['mp4', 'ogg'].includes(getExtension(post.imageUrl))" controls autoplay
          muted>
          <source :src="post.imageUrl" type="">
        </video>
        <audio class="homePost-audio" v-else-if="['mp3', 'ogg'].includes(getExtension(post.imageUrl))" controls autoplay
          muted>
          <source :src="post.imageUrl" type="">
        </audio>
      </router-link>
    </div>
  </div>
  <div v-else>
    <p> Loading Posts ...</p>
  </div>
</template>

<!-- fetch all data from storage sequalize/postgres -->
<script>
export default {
  name: 'HomeView',
  data() {
    return {
      user: '',
      users: [],
      userId: '',
      posts: [],
    }
  },
  mounted() {
    const { token, userId, email } = JSON.parse(localStorage.getItem("users-info"));
    this.user = email;
    this.userId = userId;
    fetch("http://localhost:3000/api/posts", {
      method: 'get',
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    })
      .then(response => response.json())
      .then(data => { this.posts = data; })
      .catch(error => { console.log(error.message); })
    // fetch users data from database
    fetch("http://localhost:3000/api/auth", {
      method: 'get',
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    })
      .then(response => response.json())
      .then(data => { this.users = data; })
      .catch(error => { console.log(error.message); })
  },
  methods: {
    getExtension(imageUrl) {
      return imageUrl?.split('.').pop();
    },
    isRead(post) {
      return post.usersRead.includes(this.userId);
    },
    getUser(userId) {
      return this.users.find(user => user.id === userId)?.email;
    },
    logOut() {
      localStorage.removeItem("users-info")
      this.$router.push({ name: 'Login' });
    }
  }
}
</script>

<!-- Styling posted card -->
<style scoped>
.userAccount {
  padding: 5px;
  color: blue;
}

.logOut-btn {
  padding: 2px;
  margin-left: 5px;
  border: hidden;
  background-color: light gray;
}

div .home-column {
  display: flex;
  flex-direction: column;
}

.homePost {
  width: 100%;
  height: auto;
  border: 1px solid saddlebrown;
  border-radius: 10px;
  margin-top: 15px;
  box-shadow: 5px 5px 5px lightgray;
  background-color: whitesmoke;
  position: relative;
}

.homePost-isRead {
  /*  text-align: right;
  margin: 10px 10px 0px 0px; */
  position: absolute;
  top: 10px;
  right: 20px;
}

.homePost-userId {
  padding: 10px 20px 0px;
  text-align: left;
  color: blue;
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
  object-fit: contain;
  border-radius: 0 0px 10px 10px;
  margin-bottom: -3px;
}

.homePost-video {
  width: 100%;
  height: auto;
  object-fit: contain;
  border-radius: 0 0px 10px 10px;
  margin-bottom: -3px;
}

.homePost-link {
  color: black;
  text-decoration: none;
}

/* working with mobile responsive */
@media screen and (min-width: 991px) {
  div .home-column {
    margin: 0px 25%;
  }

  h1 {
    font-size: 25px;
  }
}

@media screen and (min-width: 669px) and (max-width: 990px) {
  div .home-column {
    margin: 0px 20%;
  }

  h1 {
    font-size: 22px;
  }
}

@media screen and (max-width: 668px) {
  div .home-column {
    margin: 0px 25px;
  }

  h1 {
    font-size: 19px;
  }
}
</style>