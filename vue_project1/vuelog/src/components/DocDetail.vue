<template>

  <div>
    <h4>{{docs[$route.params.id].title}}</h4>
    <p>{{docs[$route.params.id].date}}</p>
    <h5>{{docs[$route.params.id].content}}</h5>
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