<!-- Generate User profile page to be able delete user account -->
<template>
    <button @click.prevent="deleteUser" type="submit"> Delete </button>
    <div class="single">
        <div class="singleContent" v-for="post in posts" :key="post.id">
            <p class="singleContent-userId"> Created by: {{ getUser(post.userId) }} </p>
            <p class="singleContent-text"> {{ post.contents }} </p>
            <img class="singleContent-media"
                v-if="['png', 'jpg', 'jpeg', 'tiff', 'gif', 'jfif'].includes(getExtension(post.imageUrl))"
                :src="post.imageUrl" alt="" />
            <video class="singleContent-media" v-else-if="['mp4', 'ogg'].includes(getExtension(post.imageUrl))" controls
                autoplay muted>
                <source :src="post.imageUrl" type="">
            </video>
            <audio v-else-if="['mp3', 'ogg'].includes(getExtension(post.imageUrl))" controls autoplay muted>
                <source :src="post.imageUrl" type="">
            </audio>
        </div>
    </div>
</template>

<script>
export default {
    name: "ProfileUser",
    data() {
        return {
            users: [],
            userId: '',
            posts: '',
        }
    },
    methods: {
        deleteUser() {
            const { userId, token } = JSON.parse(localStorage.getItem("users-info"));
            fetch(`http://localhost:3000/api/auth/${userId}`, {
                method: "delete",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then((response) => {
                    if (response.status !== 204) {
                        throw response.status;
                    } else {
                        return response.json()
                    }
                })
                .then(() => {
                    localStorage.removeItem("users-info")
                    this.$router.push({ name: 'SignUpPage' }); //router to signup page
                })
        },
        getExtension(imageUrl) {
            return imageUrl?.split('.').pop();
        },
        getUser(userId) {
            return this.users.find(user => user.id === userId)?.email;
        },
    },
    mounted() {
        const { token, userId } = JSON.parse(localStorage.getItem("users-info"));
        this.userId = userId;
        fetch(`http://localhost:3000/api/posts/userId/${userId}`, {
            method: 'get',
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        })
            .then(response => response.json())
            .then(data => { this.posts = data; })
            .catch(error => { console.log(error.message); })

        fetch("http://localhost:3000/api/auth", {
            method: 'get',
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        })
            .then(response => response.json())
            .then(data => { this.users = data; })
            .catch(error => { console.log(error.message); })
    }
}
</script>

<!-- Styling delete button -->
<style scoped>
button {
    width: 65px;
    height: 25px;
    position: sticky;
}

div .single {
    display: flex;
    flex-direction: column;
    margin: 15px 25%;
}

.singleContent {
    width: 100%;
    height: auto;
    margin-top: 15px;
    border: 1px solid gainsboro;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    background-color: lightgray;
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
@media screen and (min-width: 991px) {
    div .single {
        margin: 0px 25%;
    }
}

@media screen and (min-width: 669px) and (max-width: 990px) {
    div .single {
        margin: 0px 20%;
    }
}

@media screen and (max-width: 668px) {
    div .single {
        margin: 0px 25px;
    }
}
</style>