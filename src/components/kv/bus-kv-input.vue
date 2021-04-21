<template>
  <view>
    <view
      style="
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
      "
    >
      <view class="key">{{ busKey }}</view>
      <view v-if="busRequired" class="required">*</view>
    </view>

    <!-- <p style="white-space: pre-line">{{ busValue }}</p> -->
    <!-- <br /> -->
    <view
      style="display: flex; flex-direction: row; justify-content: space-between; align-items: center"
    >
      <input
        class="value"
        v-model="content"
        :placeholder="busHint"
        @input="afterContentChanged"
      />
      <view v-if="busButton" class="button" @click="onButtonClicked">{{ busButton }}</view>
    </view>

    <view class="underline" />
  </view>
</template>

<script>
export default {
  props: ["busKey", "busValue", "busHint", "busRequired", "busButton"],
  data() {
    return {
      content: "",
    };
  },
  methods: {
    afterContentChanged() {
      // console.log("afterContentChanged()");
      // 通知父组件改变
      this.$emit("afterContentChanged", this.content);
    },
    onButtonClicked() {
      this.$emit("onButtonClicked");
    },
  },
  mounted() {
    this.content = this.busValue;
  },
};
</script>

<style lang="scss" scoped>
@import "./bus-kv.css";
.underline {
  height: 1rpx;
  margin-left: 20rpx;
  margin-right: 20rpx;
  background-color: $uni-border-color;
}
.button {
  background-color: $uni-color-primary;
  color: white;
  font-size: 14px;
  font-weight: bold;
  padding: 10rpx 20rpx 10rpx 20rpx;
  margin-right: 20rpx;
  border-radius: 8rpx;
}
</style>