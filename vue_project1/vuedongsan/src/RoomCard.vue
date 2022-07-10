<template>
  <div v-for="room in rooms" :key="room">
    <img :src="room.image" class="room-img">
    <h4>{{room.title}}</h4>
    <p>{{room.price}}원</p>
  </div>
</template>

<script>
export default {
    props:{
        rooms:Array,
    }

}
</script>

<style>
.room-img{
  width: 100%;
  margin-top: 40px;
}
</style>