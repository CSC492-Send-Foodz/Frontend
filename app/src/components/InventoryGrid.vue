<template>
  <div>
    <v-container >
      <v-row justify="center" class="mx-auto" max-width="600">
        <v-card  v-for="(item, index) in getAllInventoryItems" :key="index" class="ma-2 pa-1">
          <InventoryItem :index="index"></InventoryItem>
        </v-card>
      </v-row>
    </v-container>
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
    ...mapGetters(["getAllInventoryItems", "getInventoryCount"])
  },
  methods: {
    ...mapMutations(["addInventoryItem"])
  },
  components: {
    InventoryItem
  }
};
</script>