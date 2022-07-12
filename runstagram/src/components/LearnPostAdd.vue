<template>
   <div class="post">      
    <div class="post-body">
        <input class="form-control mt-2" type="file" id="image" @input="image_input">
        <img class="post-image" :src="post_image" v-if="post_image!=''">
    </div>
    
    <div class="post-content">
      <input type="text" placeholder="내용" style="margin-bottom:5%; width:95%; height:200px">
    </div>
    </div>
    <button style="margin-top:5px" class="btn btn-primary">Post</button>
</template>

<script>
export default {
    data(){
        return{
            post_image: '',

        }
    },

    methods: {
        image_input:function(){
            var image = document.querySelector('#image').files[0];
            this.post_image = URL.createObjectURL(image);
            console.log(this.post_image);
        }
    },
}
</script>

<style>
.post {
  width: 100%;
  border: 0.5px solid grey;
  border-radius: 3%;
  margin-top: 10px;
}

.post-image{
    width: 90%;
    height: 90%;
    margin: 5%;
    border : 1px solid gainsboro;
}

.post-body {
  box-sizing: content-box;
  background-position: center;
  background-size: cover;
}
.post-content {
  padding-left: 15px;
  padding-right: 15px;
  font-size: 14px;
}
.date {
  font-size: 11px;
  color: grey;
  margin-top: -8px;
} 
</style>