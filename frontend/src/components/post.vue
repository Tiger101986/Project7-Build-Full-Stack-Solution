<template>
  <div class="posts" method="post">
    <input
      type="text"
      name="contents"
      placeholder="Enter Contents"
      v-model="posts.content"
    />
    <div class="file">
      <input
        style="display: none"
        name="file" 
        type="file" 
        ref="fileInput" 
        @change="onSelectFile">
      <button @click="$refs.fileInput.click()"> Choose Image </button>
    </div>  
    <button class="btn" @click.prevent="postContents" type="submit">Post Content!</button>
  </div>
</template>

<script>
export default {
  name: "PostUp",
  data() {
    return {
      posts: {
        content: "",
        imageUrl: "",
      },
    };
  },
  methods: {
    onSelectFile(e) {
      this.posts.imageUrl = e.target.files[0];
    },
    // Create post 
    postContents() { 
      fetch("http://localhost:3000/api/posts", {
        method: "POST",
        headers: { 
          "Authorization": "Bearer" + this.token,
          "Content-Type": "application/json" },
        body: JSON.stringify({
          content: this.posts.content,
          imageUrl: this.posts.imageUrl
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem("users-info", JSON.stringify(data));  
          this.$router.push({name: 'Home'}); //router to home page
          console.log(data)});
    },
  },
};
</script>

<style scoped>
.posts {
  display: flex;
  flex-direction: column;
  /* border: 2px solid blue; */
  margin: auto 30px;
  padding: 30px;
}
div input {
  height: 300px;
  text-align: center;
  /* border: 1px solid blue; */
}
::placeholder {
  font-size: 20px;
}
.file button{
  width: 150px;
  height: 30px;
  padding: 10px auto 20px;
  margin-top: 30px;
  position: absolute;
  bottom: 550px;
  left: 70px;
}
div .btn {
  position: absolute;
  left: 250px;
  bottom: 550px;
  width: 150px;
  height: 30px;
  margin-top: 20px;
  /* background-color: white; */
 color: blue;
  /* border: 1px solid blue; */
}
</style>
