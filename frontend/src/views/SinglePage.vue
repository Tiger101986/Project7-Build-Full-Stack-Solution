<template>
    <div class="singleContent" v-if="post" :key="id">
        <p class="singleContent-text"> {{ post.contents }} </p>
        <img class="singleContent-image" :src="post.imageUrl" alt="" />
    </div>
    <div v-else>
        <p> Post is loading ...</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            post: null
        }
    },
    mounted() {
        const { token } = JSON.parse(localStorage.getItem("users-info"));
        fetch(`http://localhost:3000/api/posts/${this.$route.params.id}`, {
            method: 'get',
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        })
            .then(response => response.json())
            .then(data => { this.post = data; })
            .catch(error => { console.log(error.message); })
        fetch(`http://localhost:3000/api/posts/${this.$route.params.id}/read`, {
            method: 'get',
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        })
            .then(response => response.json())
            .then(data => { this.post = data; })
            .catch(error => { console.log(error.message); })
    }
}
</script>

<style scoped>
.singleContent {
    width: 50%;
    height: auto;
    margin: 50px 25%;
    border: 1px solid gainsboro;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    background-color: lightgray;
    /* align-items: center; */
    opacity: 5;
}

.singleContent-text {
    margin: 20px;
    overflow-wrap: break-word;
    text-align: left;
}

.singleContent-image {
    object-fit: contain;
    border-radius: 0 0px 10px 10px;
}
</style>