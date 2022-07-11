<template>
  <div class="discount">
    <h4>지금 결제하면 {{discount_ratio}}% 할인</h4>
</div>
</template>

<script>
export default {
    name: 'DiscountBanner',
    props:{
      discount_ratio : Number,
    }
}
</script>

<style>

</style>

