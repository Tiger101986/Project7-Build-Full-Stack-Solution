<template>
    <div class="singleContent" v-if="post" :key="id">
        <img :src="post.imageUrl" alt="" />
        <p> {{ post.contents }} </p>   
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
    }
}
</script>

<style scoped>
    .singleContent {
        width: 50%;
        height: 50%;
        margin: 50px 25%;
        padding: 10px;
        border: 1px solid gainsboro;
        border-radius: 10px;
        display: flex;
       /*  background-color: lightcyan; */
        align-items: center;
        opacity: 5;
    }
    .singleContent p {
        width: 48%;
        margin-left: 15px;
        overflow-wrap: break-word;
        text-align: left;
    }
    .singleContent img {
        width: 50%;
        height: 350px;
        border-radius: 10px;
    }

</style>