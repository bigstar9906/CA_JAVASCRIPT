<template>

<transition name="fade">
<div class="black-bg" v-if="isDetailOpen">
  <div class="white-bg">
    <h4>{{rooms[clicked_room].title}}</h4>
    <img :src="rooms[clicked_room].image" class="room-img-detail">
    <p>{{rooms[clicked_room].content}}</p>
    <input v-model="month" id="month_input">
    <h5>선택 개월 수 : {{month}} 가격 : {{rooms[clicked_room].price*month}}원</h5>
    <button @click="isDetailOpen=false">닫기</button>
  </div>
</div>
</transition>
<div class="menu">
  <a v-for=" i in menu" :key="i">{{i}}</a>
  </div>

   

  <DiscountBanner :discount_ratio="discount_ratio" v-if="isDiscount"/>

  <button @click="priceSort">가격순 정렬</button>
  <button @click="sortBack">되돌리기</button>
  
  
  <RoomCard @openModal="isDetailOpen=true; clicked_room = $event" @closeModal="isDetailOpen = false" :rooms="rooms"></RoomCard>
</template>
  
<script>

import rooms_data from './assets/data.js';
import DiscountBanner from './DiscountBanner.vue';
import RoomCard from './RoomCard.vue';

export default {
  name: 'App',
  data(){
    return{
      rooms: rooms_data,
      rooms_origin:[...rooms_data],
      isDetailOpen:false,
      isDiscount:true,
      prices:[60,70,99],
      blue_style: 'color:blue',
      products:['역삼동원룸','천호동원룸','마포구원룸'],
      menu:['Home','Products','About'],
      reports:[0,0,0],
      clicked_room:0,
      month:1,
      discount_ratio : 30
    }
  },

  watch:{
    month(a){
      if(a!='')
      {
      if(a<1||a>12||!isFinite(a))
      {
        alert('1~12 사이의 수를 입력해 주세요.');
        this.month=1;
      }
      }
    }
  },
  methods : {
    priceSort(){
      this.rooms.sort(function(a,b){
        return a.price-b.price
      })
    },
    sortBack(){
      this.rooms = [...this.rooms_origin]
    }
  },

  mounted(){
    setInterval(()=>{
      this.discount_ratio-=1;
      if(this.discount_ratio==0) this.isDiscount=false;
    },1000)
  },

  components: {
    DiscountBanner : DiscountBanner,
    RoomCard : RoomCard,
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

.fade-enter-from {
  opacity: 0;
}

.fade-enter-active{
  transition:all 1s;
}

.fade-enter-to{
  opacity: 1;
}

.fade-leave-from {
  opacity: 1;
}

.fade-leave-active{
  transition:all 1s;
}

.fade-leave-to{
  opacity: 0;
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

.room-img-detail{
  width: 80%;
}
</style>
