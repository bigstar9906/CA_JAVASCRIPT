<template>

  <div v-for="doc in docs" :key="doc">
    <h4>{{doc.title}}</h4>
    <p>{{doc.date}}</p>
    <h5>{{doc.content}}</h5>
  </div>
</template>

<script>
export default {
    props:{
        docs:Array,
        menu_active:Number
    },
    mounted(){
        this.$emit('menu_select',2)
    }
}
</script>

<style>

</style>