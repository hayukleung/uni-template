<template>
  <view
    class="off"
    hover-class="on"
    style="
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
    "
    @tap="onSelectClick"
  >
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
    <view style="display: flex; flex-direction: row; align-items: center">
      <view>
        <view :class="null == value || '' === value ? 'hint' : 'value'">{{
          null == value || "" === value ? busHint : value
        }}</view>
      </view>
      <image
        v-show="null != value && '' !== value && busShowDelete"
        src="../../static/common/delete.svg"
        mode="widthFix"
        :style="{ width: '36rpx', padding: '10rpx' }"
        @tap.stop="onDeleteClick"
      />
      <image
        v-show="busShowArrow"
        src="../../static/common/arrow_right.svg"
        mode="widthFix"
        class="arrow-right"
      />
    </view>
  </view>
</template>

<script>
export default {
  props: {
    busKey: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "",
    },
    busHint: {
      type: String,
      default: "",
    },
    busRequired: {
      type: Boolean,
      default: false,
    },
    busShowArrow: {
      type: Boolean,
      default: true,
    },
    busShowDelete: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    onDeleteClick() {
      console.log("onDeleteClick");
      this.$emit("input", "");
      this.$emit("onDeleteClick");
    },
    onSelectClick() {
      console.log("onSelectClick");
      this.$emit("onSelectClick");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./bus-kv.css";
</style>