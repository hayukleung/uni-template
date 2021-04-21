<template>
  <view
    style="
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
    "
  >
    <view class="key">{{ busKey }}</view>
    <view v-show="busRequired" class="required">*</view>
  </view>
</template>

<script>
export default {
  props: {
    busKey: {
      type: String,
      default: "",
    },
    busRequired: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./bus-kv.css";
</style>