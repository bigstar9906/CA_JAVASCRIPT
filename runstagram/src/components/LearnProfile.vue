<template>
    <div style="padding-bottom:200px">

        <div> <img class="profile_B" :src="page_user.photoURL">
            <h5 style="font-size:large; margin-left:50px;">{{ page_user.name }}</h5>
        </div>


    </div>
    <div>
        <div class="container_forpost">
            <a class="post_in" v-for="post in posts" :key="post"
                :style="{ backgroundImage: `url(${post.post_image})` }"></a>
        </div>
    </div>
</template>

<script>
import { collection, doc, getDoc, onSnapshot, query, where } from '@firebase/firestore'
import { db } from '../main'

export default {
    data() {
        return {
            page_user_id: this.$route.params.id,
            page_user: '',
            posts: [],
        }
    },
    mounted() {
        getDoc(doc(db, 'users', this.page_user_id)).then((result) => {
            this.page_user = result.data();
        })
        const q = query(collection(db, 'posts'), where('uid', "==", this.page_user_id))
        onSnapshot(q, (result) => {
            this.posts.splice(0, this.posts.length);
            result.docs.forEach((post) => {
                this.posts.push({
                    post_image: post.data().postImage,
                    post_id: post.id,
                })
            })
        })
    }
}
</script>

<style>
.profile_B {
    width: 150px;
    height: 150px;
    background-size: 100%;
    border-radius: 50%;
    float: left;
    margin-left: 30px;
}

.container_forpost {
    width: 90%;
    margin: 10px auto;
}

.post_in {
    margin-top: 3%;
    background-size: contain;
    float: left;
    margin-left: 3%;
    width: 30%;
    box-sizing: border-box;
    padding-bottom: 30%;
}
</style>