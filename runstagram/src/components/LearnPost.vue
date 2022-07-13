<template>
  <div class="post" v-for="post in posts" :key="post">
    <div class="post-header">
      <div class="profile" :style="{ backgroundImage: `url(${post.data().userImage})` }"
        @click="user_click(post.data().uid)"></div>
      <span class="profile-name">{{ post.data().name }}</span>
    </div>
    <div class="post-body" :style="{ backgroundImage: `url(${post.data().postImage})` }"></div>
    <div class="post-content" style="text-align:left">
      <p>{{ post.data().likes }} Likes</p>
      <p><strong>{{ post.data().name }}</strong>ㅤ{{ post.data().content }}</p>
      <p class="date">{{ new Date(post.data().date.seconds * 1000 + post.data().date.nanoseconds / 10000) }}</p>
    </div>
  </div>
</template>

<script>
import { db } from '../main.js'
import { collection, onSnapshot, orderBy, query } from '@firebase/firestore'

export default {

  data() {
    return {
      posts: ''

    }
  },

  mounted() {
    const q = query(collection(db, 'posts'), orderBy('date', "desc"));
    onSnapshot(q, (result) => {
      this.posts = result.docs;
    })
  },

  methods: {
    user_click: function (uid) {
      console.log(uid);
      location.href = '/profile/' + uid;
    }
  }

}
</script>

<style>
.post {
  width: 100%;
  border: 0.5px solid grey;
  border-radius: 3%;
  margin-top: 10px;
}

.profile {
  width: 30px;
  height: 30px;
  background-size: 100%;
  border-radius: 50%;
  float: left;
}

.profile-name {
  display: block;
  float: left;
  padding-left: 10px;
  padding-top: 7px;
  font-size: 14px;
}

.post-header {
  height: 50px;
  padding: 10px;
}

.post-body {
  height: 450px;
  background-position: center;
  background-size: cover;
}

.post-content {
  padding-left: 15px;
  padding-right: 15px;
  font-size: 14px;
}

.date {
  font-size: 11px;
  color: grey;
  margin-top: -8px;
}
</style>