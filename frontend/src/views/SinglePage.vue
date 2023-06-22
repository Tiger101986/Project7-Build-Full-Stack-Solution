<!-- Generate Single page with one post -->
<template>
    <div class="singleContent" v-if="post" :key="id">
        <p class="singleContent-userId"> Created by: {{ getUser(post.userId) }} </p>
        <p class="singleContent-text"> {{ post.contents }} </p>
        <img class="singleContent-media"
            v-if="['png', 'jpg', 'jpeg', 'tiff', 'gif', 'jfif'].includes(getExtension(post.imageUrl))" :src="post.imageUrl"
            alt="" />
        <video class="singleContent-media" v-else-if="['mp4', 'ogg'].includes(getExtension(post.imageUrl))" controls
            autoplay muted>
            <source :src="post.imageUrl" type="">
        </video>
        <audio v-else-if="['mp3', 'ogg'].includes(getExtension(post.imageUrl))" controls autoplay muted>
            <source :src="post.imageUrl" type="">
        </audio>
    </div>
    <div v-else>
        <p> Post is loading ...</p>
    </div>
</template>

<!-- pull data from backend and push data to backend (storage Sequelize/Postgres)  -->
<script>
export default {
    data() {
        return {
            users: [],
            post: null,
            userId: '',
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
                "Content-Type": "application/json",
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
        getUser(userId) {
            return this.users.find(user => user.id === userId)?.email;
        }
    }
}
</script>

<!-- Styling post card in single page -->
<style scoped>
.singleContent {
    width: 50%;
    height: auto;
    margin: 50px 25%;
    border: 1px solid saddlebrown;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    background-color: peru;
    opacity: 5;
}

.singleContent-userId {
    padding: 20px 20px 0px;
    text-align: left;
}

.singleContent-text {
    margin: 20px;
    overflow-wrap: break-word;
    text-align: left;
}

.singleContent-media {
    width: 100%;
    height: auto;
    object-fit: contain;
    border-radius: 0 0px 10px 10px;
}

/* mobile responsive for single page */
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