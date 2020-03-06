<template>
  <div>
    <button @click="addInventoryItem(item)">+</button>
    <div v-for="(item, index) in getAllInventoryItems" :key="index">
            <InventoryItem :index=index></InventoryItem>
    </div>
  </div>
</template>


<script>
import InventoryItem from "@/components/InventoryItem.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      item: {
        id: 1234,
        name: "apple",
        brand: "FruitCo",
        groceryStoreId: 6773,
        quantity: 15,
        expirationDate: "02-03-21",
        ediOrderNumber: "124AZ"
      }
    };
  },
  computed: {
    ...mapGetters([
      "getAllInventoryItems",
      "getInventoryCount"
    ])
  },
  methods: {
    ...mapMutations(["addInventoryItem"])
  }
    ,
    components: {
      InventoryItem
    }
};
</script>