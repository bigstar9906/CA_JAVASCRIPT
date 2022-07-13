<template>
  <nav class="navbar navbar-expand-lg bg-light" id="runsta_nav">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">Learnstagram</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav" v-if="login">
          <li class="nav-item">
            <a class="nav-link" :class="{ 'active': step == 0 }" @click="step = 0" href="/">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" :class="{ 'active': step == 1 }" @click="step = 1">Msg</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" :class="{ 'active': step == 2 }" @click="step = 2">Post</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" :class="{ 'active': step == 3 }" @click="step = 3">Notice</a>
          </li>
        </ul>
        <div class="btn-group" v-if="login">
          <button type="button" class="btn" id="current_user" data-bs-toggle="dropdown" aria-expanded="false"
            :style="{ backgroundImage: `url(${currentuser.photoURL})` }">
          </button>
          <ul class="dropdown-menu">
            <li>
              <h6 style="text-align:center;">{{ currentuser.displayName }}</h6>
            </li>
            <li>
              <hr class="dropdown-divider">
            </li>
            <li><a class="dropdown-item" :href="'/profile/' + currentuser.uid">Profile</a></li>
            <li>
              <hr class="dropdown-divider">
            </li>
            <li><a class="dropdown-item" @click="logout" href="/">Logout</a></li>
          </ul>
        </div>
        <a v-if="!login"
          style="font-size:small; width:50px; cursor: pointer; color:black; text-decoration: none; margin-left: 80%;"
          @click="step = 4" href="/">Log in</a>
      </div>
    </div>
  </nav>
  <div style="height:66px"></div>

  <router-view @register="step = 5" @register_done="step = 4" @login_done="login = true; currentuser = $event; step = 0"
    @upload_done="step = 0" :step="step" :currentuser="currentuser"></router-view>



  <!-- <div class="footer" >
    <ul class="footer-button-plus">
      <input type="file" id="file" class="inputfile" />
      <label for="file" class="input-plus">+</label>
    </ul>
  </div> -->
</template>

<script>

import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'


export default {
  name: 'App',
  data() {
    return {
      step: 0,
      login: true,
      currentuser: '',
      user_menu: false,
    }
  },
  components: {
  },
  methods: {
    logout: function () {
      const auth = getAuth();
      signOut(auth);
    }
  },
  beforeCreate() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.step = 0;
        this.currentuser = user
        this.login = true;
      }
      else {
        this.login = false;
        this.step = 4;
      }
    })
  }
}
</script>

<style>
#runsta_nav {
  position: fixed;
  top: 0;
  width: 100%;
  max-width: 660px;
}


body {
  margin: 0;
  line-height: 1.2;
  box-sizing: initial;
}

ul {
  padding: 5px;
  list-style-type: none;
}

.navbar-brand {
  width: 60%
}

.nav-link {
  cursor: pointer;
}

#current_user {
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
