<template>
 <nav class="navbar navbar-expand-lg bg-light" id="runsta_nav">
  <div class="container-fluid">
    <a class="navbar-brand">Learnstagram</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" :class="{'active': step==0}" @click="step=0" aria-current="page">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" :class="{'active': step==1}" @click="step=1">Msg</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" :class="{'active': step==2}" @click="step=2">Post</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" :class="{'active': step==3}" @click="step=3">Notice</a>
        </li>
      </ul>
      <a class="current_user" v-if="login"></a>
      <a v-if="!login" style="font-size:small; width:50px; cursor: pointer; color:black; text-decoration: none;" @click="step=4" >Log in</a>
    </div>
  </div>
</nav>
<div style="height:100px"></div>

  <LearnContainer @register="step=5" :posts="posts" :step="step"/>

  <!-- <div class="footer" >
    <ul class="footer-button-plus">
      <input type="file" id="file" class="inputfile" />
      <label for="file" class="input-plus">+</label>
    </ul>
  </div> -->
</template>

<script>

import LearnContainer from './components/LearnContainer.vue'
import Posts from './assets/Posts.js'


export default {
  name: 'App',
  data(){
    return{
      step:0,
      posts:Posts,
      login:false,
    }
  },
  components: {
    LearnContainer:LearnContainer,
  }
}
</script>

<style>

#runsta_nav{
  position:fixed;
  top:0;
  width: 100%;
  max-width: 660px;
}


body {
  margin: 0;
  line-height: 1.2;
  box-sizing:initial;
}

ul {
  padding: 5px;
  list-style-type: none;
}

.navbar-brand{
  width:60%
}

.nav-link{
  cursor: pointer;
}

.current_user{
  background-image: url('./assets/logo.png');
  width: 30px;
  height: 30px;
  background-size: 100%;
  border-radius: 50%;
  border: 1px solid gray;
  margin-left: 10px;  
}


.footer {
  width: 100%;
  position: sticky;
  bottom: 0;
  padding-bottom: 10px;
  background-color: white;
}

.footer-button-plus {
  width: 80px;
  margin: auto;
  text-align: center;
  cursor: pointer;
  font-size: 24px;
  padding-top: 12px;
}

.sample-box {
  width: 100%;
  height: 600px;
  background-color: bisque;
}

.inputfile {
  display: none;
}

.input-plus {
  cursor: pointer;
}

#app {
  box-sizing: border-box;
  font-family: "consolas";
  margin-top: 60px;
  width: 100%;
  max-width: 660px;
  margin: auto;
  position: relative;
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
}
</style>
