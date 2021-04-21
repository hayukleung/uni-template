<template>
  <view
    style="
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
    "
  >
    <view class="key">{{ busKey }}</view>
    <view class="value">{{ busValue }}</view>
  </view>
</template>

<script>
export default {
  props: ["busKey", "busValue"],
};
</script>

<style lang="scss" scoped>
@import "./bus-kv.css";
</style>