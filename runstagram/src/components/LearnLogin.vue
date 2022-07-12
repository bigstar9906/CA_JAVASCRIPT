<template>
  <div class="container mt-3">
    <div class="mb-3">
      <input type="email" class="form-control" placeholder="email" id="email">
    </div>
    <div class="mb-3">
      <input type="password" class="form-control" placeholder="pw" id="pw">
    </div>
    <button type="submit" class="btn btn-primary" id="login" @click="login">로그인하기</button>
    <a style="float: right; cursor: pointer;" @click="$emit('register')">회원가입</a>
 </div>
</template>

<script>

import {getAuth,signInWithEmailAndPassword, browserSessionPersistence, setPersistence} from 'firebase/auth';
export default {
  methods:{
    login:function(){
      var email = document.querySelector('#email').value;
      var pw = document.querySelector('#pw').value;
      const auth = getAuth();
      setPersistence(auth, browserSessionPersistence);
      signInWithEmailAndPassword(auth,email,pw).then((userCredential)=>{
        const user = userCredential.user;
        this.$emit('login_done',user);
      }).catch((error)=>{
        alert(error);
      })
    }
  }
}
</script>

<style>

</style>