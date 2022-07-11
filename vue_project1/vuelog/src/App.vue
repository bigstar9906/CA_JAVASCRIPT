<template>
  <nav class="navbar navbar-expand-lg bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="/" style="width:70%; text-align: left;">Blog</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" :class="{'active': menu_active==0}" aria-current="page" href="/" >Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" :class="{'active': menu_active==1}" href="/DocList" >Doc</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" :class="{'active': menu_active==2}" href="/DocDetail">Details</a>
        </li>
      </ul>
    </div>
  </div>
</nav>



<router-view @menu_select="menu_active=$event" :docs="docs"></router-view>

<!-- <DocList :docs="docs"></DocList> -->

</template>



<script>

// import DocList from './components/DocList.vue';
import DocData from './assets/data.js';

export default {
  name: 'App',
  data(){
    return{
    docs : DocData,
    menu_active:1,
    }
  },
  components: {
  //  DocList:DocList,
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
