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
 import db from '../main.js'
 import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth'
 import {collection, addDoc} from "firebase/firestore"
 export default {

    methods:{
        register: function(){
        var Email = document.querySelector('#email-new').value;
        var Password = document.querySelector('#pw-new').value;
        var Name = document.querySelector('#name-new').value;
        const auth = getAuth();
        createUserWithEmailAndPassword(auth,Email,Password).then((userCredential)=>{
            const user = userCredential.user;
            const docRef = addDoc(collection(db, "users"), {
         first: Name,
        last: user.uid,
         born: 1815
         });
  console.log("Document written with ID: ", docRef.id);

        })
        .catch((error)=>{
            const errorCode=error.code;
            alert(errorCode);            
        })
       
        }
    }

}
</script>

<style>

</style>