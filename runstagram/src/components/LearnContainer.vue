<template>
  <div v-if="step==0||step==3">
  <LearnPost v-for="post in posts" :key="post" :post="post"/>
</div>
    <div v-if="step==2">
    <LearnPostAdd></LearnPostAdd>
    </div>
    <div v-if="step==4">
    <LearnLogin @login_done="$emit('login_done',$event)" @register="$emit('register')"></LearnLogin>
    </div>

    <div v-if="step==5">
    <LearnRegister @register_done="$emit('register_done')"></LearnRegister>
    </div>
</template>

<script>

import LearnPost from './LearnPost.vue'
import LearnLogin from './LearnLogin.vue'
import LearnRegister from './LearnRegister.vue'
import LearnPostAdd from './LearnPostAdd.vue'
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
    LearnPost: LearnPost,
    LearnLogin: LearnLogin,
    LearnRegister: LearnRegister,
    LearnPostAdd
}
}
</script>

<style>

</style>