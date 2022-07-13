<template>
    <div v-if="step == 0 || step == 3">
        <LearnPost />
    </div>
    <div v-if="step == 1">
        <LearnChat :currentuser="currentuser"></LearnChat>
    </div>
    <div v-if="step == 2">
        <LearnPostAdd @upload_done="$emit('upload_done')" :currentuser="currentuser"></LearnPostAdd>
    </div>
    <div v-if="step == 4">
        <LearnLogin @login_done="$emit('login_done', $event)" @register="$emit('register')"></LearnLogin>
    </div>

    <div v-if="step == 5">
        <LearnRegister @register_done="$emit('register_done')"></LearnRegister>
    </div>
</template>

<script>

import LearnPost from './LearnPost.vue'
import LearnLogin from './LearnLogin.vue'
import LearnRegister from './LearnRegister.vue'
import LearnPostAdd from './LearnPostAdd.vue'
import LearnChat from './LearnChat.vue'
export default {

    data() {
        return {

        }
    },
    props: {
        step: Number,
        currentuser: Object,
    },
    components:
    {
        LearnPost: LearnPost,
        LearnLogin: LearnLogin,
        LearnRegister: LearnRegister,
        LearnPostAdd,
        LearnChat
    },

}
</script>

<style>
</style>