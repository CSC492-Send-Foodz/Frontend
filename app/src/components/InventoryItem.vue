
<template>
  <div>{{getInventoryItem(index).name}}</div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "InventoryItem",
  props: ['index'],

  computed: {
    ...mapGetters([
      "getInventoryCount",
      "getInventoryItem"
    ])
  },
  methods: {
    ...mapMutations(["addInventoryItem"])
  }
};
</script>

<style scoped>
</style>
