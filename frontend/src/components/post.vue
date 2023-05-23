<template>
  <div class="posts" @submit="postContents" method="post">
    <input
      type="text"
      name="contents"
      placeholder="Enter Contents"
      v-model="posts.content"
    />
    <p><a> Image </a></p>
    <button type="submit">Post Content!</button>
  </div>
</template>

<script>
export default {
  name: "PostUp",
  data() {
    return {
      posts: {
        content: "",
        imgageUrl: "",
      },
    };
  },
  methods: {
    postContents(e) {
      e.preventDefault();
      fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: this.content,
          imgageUrl: this.imgageUrl
        }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    },
  },
};
</script>

<style>
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
div p {
  width: 70px;
  height: 30px;
  color: blue;
  border: 1px solid blue;
  padding-top: 7px;
}
div button {
  font-size: 16px;
  width: 120px;
  height: 50px;
  /*     background-color: white;
 */ /* color: blue; */
  /* border: 1px solid blue; */
}
</style>
