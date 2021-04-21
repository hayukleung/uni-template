<template>
  <div>
    
    <bus-kv-key :busKey="'KeyValueComponents'"></bus-kv-key>

    <bus-kv-input :busKey="'key'" :busValue="'value'" :busHint="'hint'" :busRequired="true"></bus-kv-input>
    
    <bus-kv-select :busKey="'key'" v-model="value" :busHint="'hint'" :busRequired="true" :busShowArrow="true" :busShowDelete="true"></bus-kv-select>
    
    <bus-kv-view :busKey="'key'" :busValue="'value'"></bus-kv-view>
  </div>
</template>

<script>
import busKvInput from "@/components/kv/bus-kv-input.vue";
import busKvKey from "@/components/kv/bus-kv-key.vue";
import busKvSelect from "@/components/kv/bus-kv-select.vue";
import busKvView from "@/components/kv/bus-kv-view.vue";
export default {
  components: {
    busKvInput, busKvKey, busKvSelect, busKvView
  },
  data() {
    return {
      value: "value"
    };
  }
}
</script>

<style lang="scss" scoped>
.main {
  color: $uni-color-primary;
}
</style>