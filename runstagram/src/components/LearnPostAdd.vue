<template>
  <div class="post">
    <div class="post-body">
      <img class="post-image" :src="post_image" v-if="post_image != ''">
      <input class="form-control mt-2" type="file" id="image" @input="image_input">
    </div>

    <div class="post-content">
      <input type="text" id="text_box" placeholder="내용" style="margin-bottom:5%; width:95%; height:200px"
        @input="update_content">
    </div>
  </div>
  <button style="margin-top:5px" class="btn btn-primary" v-if="post_image != '' && content != ''" @click="post">Post</button>
</template>

<script>
import { addDoc, collection } from '@firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes, } from 'firebase/storage'
import { db } from '../main.js';
export default {
  data() {
    return {
      post_image: '',
      content: '',

    }
  },

  props: {
    currentuser: Object
  },
  methods: {
    update_content: function () {
      this.content = document.querySelector('#text_box').value;
    },
    image_input: function () {
      var image = document.querySelector('#image').files[0];
      this.post_image = URL.createObjectURL(image);
    },
    post: function () {
      var image = document.querySelector('#image').files[0];
      const storage = getStorage();
      const uploadRef = ref(storage, 'postImages/' + image.name);
      uploadBytes(uploadRef, image).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          addDoc(collection(db, 'posts'), {
            uid: this.currentuser.uid,
            name: this.currentuser.displayName,
            userImage: this.currentuser.photoURL,
            postImage: downloadURL,
            likes: 0,
            date: new Date(),
            content: this.content,
          }).then(() => {
            document.querySelector('#image').value = ''
            document.querySelector('#text_box').value = ''
            this.$emit('upload_done');
          })
        })
      })

    }
  },
}
</script>

<style>
.post {
  width: 100%;
  border: 0.5px solid grey;
  border-radius: 3%;
  margin-top: 10px;
  text-align: center;
}

.post-image {
  height: 300px;
  margin: 5%;
  border: 1px solid gainsboro;
}

.post-body {
  margin-top: 15px;
  box-sizing: content-box;
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