<template>
  <div class="container mt-4">
  <h5>개발자의 블로그</h5>
  <p>Vue로 개발함</p>
</div>
</template>

<script>

export default {
    props:{
        menu_active:Number
    },
    mounted(){
        this.$emit('menu_select',0);
    }

}
</script>

<style>

</style>