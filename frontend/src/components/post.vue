<template>
  <div class="posts" method="post">
    <input type="text" name="contents" placeholder="Enter Contents" v-model="post.contents" />
    <div class="file">
      <input name="file" type="file" ref="fileInput" @change="onSelectFile">
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
      post: {
        userId: "",
        contents: "",
        media: null,
      },
    };
  },
  methods: {
    onSelectFile(e) {
      this.post.media = e.target.files[0];
    },
    // Create post 
    postContents() {
      const { userId, token } = JSON.parse(localStorage.getItem("users-info"));
      if (this.post.media) {
        const formData = new FormData();
        formData.append("post", JSON.stringify({ contents: this.post.contents, userId }));
        formData.append("image", this.post.media);
        fetch("http://localhost:3000/api/posts", {
          method: 'post',
          headers: {
            "Authorization": `Bearer ${token}`,
          },
          body: formData
        })
          .then((response) => {
            if (response.status !== 201) {
              throw response.status;
            } else {
              return response.json()
            }
          })
          .then((data) => {
            this.$router.push({ name: 'Home' }); //router to home page
            console.log(data);
          })
      } else {
        fetch("http://localhost:3000/api/posts", {
          method: 'post',
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userId,
            contents: this.post.contents,
          })
        })
          .then((response) => {
            if (response.status !== 201) {
              throw response.status;
            } else {
              return response.json()
            }
          })
          .then((data) => {
            this.$router.push({ name: 'Home' }); //router to home page
            console.log(data);
          }).catch(error => {
            console.log(error);
          })
      }
    },
  },
};
</script>

<style scoped>
.posts {
  display: flex;
  flex-direction: column;
  margin: auto 30px;
  padding: 30px;
}

div input {
  width: 100%;
  height: auto;
  padding: 20px;
}

::placeholder {
  font-size: 20px;
  text-align: center; 
}

.file input {
  display: none;
}

.file button {
  width: 150px;
  height: 30px;
  padding: 10px auto 20px;
  margin-top: 30px;
  position: absolute;
  /* bottom: 475px; */
  left: 68px;
}

div .btn {
  position: absolute;
  left: 250px;
  bottom: -31px;
  width: 150px;
  height: 30px;
  margin-top: 20px;
  color: blue;
}

/* @media (max-width: 991.98px) {
	.file button {
		left: 35px;
	}
} */
</style>
