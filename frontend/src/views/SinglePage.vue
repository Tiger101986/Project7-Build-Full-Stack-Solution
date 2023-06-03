<template>
    <div v-if="post">
        <p> {{ post.contents }} </p>
        <img :src="post.imageUrl" alt="" />
    </div>
    <div v-else>
        <p> Post is loading ...</p>
    </div>
</template>

<script>
export default {
    props: ["id"],
    data() {
        return {
            post: null
        }
    },
    mounted() {
        const { token } = JSON.parse(localStorage.getItem("users-info"));
        fetch(`http://localhost:3000/api/posts/${this.id}`, {
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
