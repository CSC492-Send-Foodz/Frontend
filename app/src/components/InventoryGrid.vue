<template>
  <div id="InventoryGrid">
    <InventoryItem :itemIndex="2"></InventoryItem>
  </div>
</template>
<script>
import InventoryItem from "./InventoryItem.vue";
export default {
  name: "InventoryGrid",
  components: {
    InventoryItem
  }
};
</script>