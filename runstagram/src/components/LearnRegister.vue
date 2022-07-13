<template>
  <div class="container mt-3">
    <div class="mb-3">
      <input type="text" class="form-control" placeholder="name" id="name-new">
    </div>
    <div class="mb-3">
      <input type="email" class="form-control" placeholder="email" id="email-new">
    </div>
    <div class="mb-3">
      <input type="password" class="form-control" placeholder="pw" id="pw-new">
    </div>
    <button type="submit" class="btn btn-primary" id="register" @click="register">가입하기</button>
  </div>
</template>

<script>
import { db } from '../main.js'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, setDoc, signOut } from "firebase/firestore"
export default {

  methods: {
    register: function () {
      var Email = document.querySelector('#email-new').value;
      var Password = document.querySelector('#pw-new').value;
      var Name = document.querySelector('#name-new').value;
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, Email, Password).then((userCredential) => {
        const user = userCredential.user;
        setDoc(doc(db, "users", user.uid), { name: Name, email: Email, photoURL: "https://firebasestorage.googleapis.com/v0/b/runstagram-752e9.appspot.com/o/user.png?alt=media&token=5a0f5cfe-dcb7-42e7-9ab8-48a65e4ecb40" }).then(() => {
          this.$emit('register_done');
        });
        updateProfile(user, { displayName: Name, photoURL: "https://firebasestorage.googleapis.com/v0/b/runstagram-752e9.appspot.com/o/user.png?alt=media&token=5a0f5cfe-dcb7-42e7-9ab8-48a65e4ecb40" });
      })
        .catch((error) => {
          const errorCode = error.code;
          document.querySelector('#email-new').value = '';
          document.querySelector('#pw-new').value = '';
          document.querySelector('#name-new').value = '';
          alert(errorCode);
        })


    },

    logout: function () {
      const auth = getAuth();
      signOut(auth);
    }
  }

}
</script>

<style>
</style>