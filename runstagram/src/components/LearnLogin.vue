<template>
  <div class="container mt-3">
    <div class="mb-3">
      <input type="email" class="form-control" placeholder="email" id="email">
    </div>
    <div class="mb-3">
      <input type="password" class="form-control" placeholder="pw" id="pw">
    </div>
    <button type="submit" class="btn btn-primary" id="login">로그인하기</button>
    <a style="float: right; cursor: pointer;" @click="$emit('register')">회원가입</a>
 </div>
</template>

<script>
export default {

}
</script>

<style>

</style>