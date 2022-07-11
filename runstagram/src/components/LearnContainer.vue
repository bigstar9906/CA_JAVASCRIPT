<template>
  <div v-if="step==0||step==3">
  <LearnPost v-for="post in posts" :key="post" :post="post"/>
</div>
    <div v-if="step==4">
    <LearnLogin @register="$emit('register')"></LearnLogin>
    </div>

    <div v-if="step==5">
    <LearnRegister></LearnRegister>
    </div>
</template>

<script>

import LearnPost from './LearnPost.vue'
import LearnLogin from './LearnLogin.vue'
import LearnRegister from './LearnRegister.vue'
export default {

    data(){
        return{
            
        }
    },
    props:{
        posts:Array,
        step:Number,
    },
    components:
    {
    LearnPost:LearnPost,
    LearnLogin:LearnLogin,
    LearnRegister:LearnRegister,
    
    }
}
</script>

<style>

</style>