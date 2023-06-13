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
            post: null,
            userId: null
        }
    },
    mounted() {
        const { token, userId } = JSON.parse(localStorage.getItem("users-info"));
        fetch(`http://localhost:3000/api/posts/${this.$route.params.id}`, {
            method: 'get',
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        })
            .then(response => response.json())
            .then(data => { this.post = data; })
            .catch(error => { console.log(error.message); })
        // Read Post by Users    
        fetch(`http://localhost:3000/api/posts/${this.$route.params.id}/read`, {
            method: 'post',
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({    
                userId,
            })
        })
            .then((response) => {
                if (response.status !== 201) {
                    throw response.status;
                } else {
                    return response.json()
                }
            })
            .then(data => console.log(data))
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

@media screen and (max-width: 600px) {
    .singleContent {
    width: 90%;
    margin-top: 35.5px;
    margin-left: 5%;
    margin-right: 5%;
  }
}

@media screen and (min-width: 601px) and (max-width: 821px) {
    .singleContent {
    width: 70%;
    margin-top: 35.5px;
    margin-left: 15%;
    margin-right: 15%;
  }
}
</style>