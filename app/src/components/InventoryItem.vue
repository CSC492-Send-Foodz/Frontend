
<template>
  <div id="InventoryItem">
    <div>{{getData}}</div>
    <button @click="addInventoryItems()">x</button>
  </div>
</template>
<script>
import store from "../../store/index.js";
export default {
  name: "InventoryItem",
  data() {
    return {
      itemIndex: "0"
    };
  },
  computed: {
    getData() {
      var idx = parseInt(this.itemIndex);
      console.log(idx);
      if (idx !== -1) {
        return store.state.inventoryItems[idx];
      } else {
        return "ERROR";
      }
    }
  },
  methods: {
    addInventoryItems() {
      store.commit("addInventoryItems", this.inventoryItem);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
