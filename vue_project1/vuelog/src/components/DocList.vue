<template>
  <div v-for="doc in docs" :key="doc">
    <h5 @click="$router.push(`DocDetail/${doc.number}`)">{{doc.title}}</h5>
    <p>{{doc.date}}</p>
  </div>
  
</template>

<script>
export default {
    props:{
        docs:Array,
        menu_active:Number
    },
    mounted(){
      this.$emit('menu_select',1);
    }
}


</script>

<style>

</style>