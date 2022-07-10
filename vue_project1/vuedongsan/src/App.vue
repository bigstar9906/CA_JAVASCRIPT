<template>

<div class="black-bg" v-if="isDetailOpen">
  <div class="white-bg">
    <h4>{{rooms[clicked_room].title}}</h4>
    <img :src="rooms[clicked_room].image" class="room-img-detail">
    <p>{{rooms[clicked_room].content}}</p>
    <h2>{{rooms[clicked_room].price}}원</h2>     
    <button @click="isDetailOpen=false">닫기</button>
  </div>
</div>
<div class="menu">
  <a v-for=" i in menu" :key="i">{{i}}</a>
  </div>

  

  <DiscountBanner></DiscountBanner>
  
  
  <div>원룸샵</div>
  <div v-for="room in rooms" :key="room">
    <img :src="room.image" class="room-img" @click="isDetailOpen=true;clicked_room=room.id">
    <h4>{{room.title}}</h4>
    <p>{{room.price}}원</p>
  </div>
</template>
  
<script>

import rooms_data from './assets/data.js';
import DiscountBanner from './DiscountBanner.vue';

export default {
  name: 'App',
  data(){
    return{
      rooms: rooms_data,
      isDetailOpen:false,
      prices:[60,70,99],
      blue_style: 'color:blue',
      products:['역삼동원룸','천호동원룸','마포구원룸'],
      menu:['Home','Products','About'],
      reports:[0,0,0],
      clicked_room:0
    }
  },
  methods : {

  },
  components: {
    DiscountBanner : DiscountBanner,
  }
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

body {
  margin : 0;
}
div {
  box-sizing: border-box;
}

.discount{
  background: #eee;
  padding: 10px;
  margin:10px;
  border-radius: 5px;
}

.black-bg {
  width: 100%; height:100%;
  background: rgba(0,0,0,0.5);
  position: fixed; padding: 20px;
}
.white-bg {
  width: 100%; background: white;
  border-radius: 8px;
  padding: 20px;
} 

.menu{
  background: darkslateblue;
  padding:15px;
  border-radius: 5px;
}

.menu a {
  color: white;
  padding: 10px;
}

.room-img{
  width: 100%;
  margin-top: 40px;
}

.room-img-detail{
  width: 80%;
}
</style>
