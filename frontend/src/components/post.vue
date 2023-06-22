<!-- Crate post card -->
<template>
  <div class="posts" method="post">
    <input type="text" name="contents" placeholder="Enter Contents" v-model="post.contents" />
    <div class="file">
      <input name="file" type="file" ref="fileInput" @change="onSelectFile">
      <button @click="$refs.fileInput.click()"> Choose Media </button>
    </div>
    <button class="btn" @click.prevent="postContents" type="submit">Post Content!</button>
  </div>
</template>

<!-- Generate Datas and methods to implement post -->
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
    // posts with media append to FormData()
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

<!-- Styling post card -->
<style scoped>
.posts {
  display: flex;
  flex-direction: column;
  margin: auto 30px;
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
  margin-top: 30px;
  position: absolute;
  top: 260px;
  left: 30px;
}

div .btn {
  width: 150px;
  height: 30px;
  margin-top: 60px;
  color: blue;
}
</style>
