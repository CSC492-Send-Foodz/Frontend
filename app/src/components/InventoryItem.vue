
<template>
  <div>
    <div
      v-for="attribute in [['name','Name'],['quantity','Quantity'],['expirationDate','Expiration Date']]"
      :key="attribute[0]"
    >{{attribute[1]}}: {{getInventoryItem(index)[attribute[0]]}}</div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "InventoryItem",
  props: ["index"],

  computed: {
    ...mapGetters(["getInventoryCount", "getInventoryItem"])
  },
  methods: {
    ...mapMutations(["addInventoryItem"])
  }
};
</script>

<style scoped>
</style>
