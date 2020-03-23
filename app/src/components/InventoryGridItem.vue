
<template>
  <div>
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">{{brand}}</div>
        <v-list-item-title class="headline mb-1">{{name}}</v-list-item-title>
        <v-list-item-subtitle>Exp: {{formatDate(expirationDate)}}</v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn
        v-if="this.getUserType === 'Grocery Store'"
        @click="deleteInventoryItems({groceryStoreId : groceryStoreId, id: id })"
      >Remove</v-btn>
      <v-btn
        v-else
        @click="addInventoryItemToCart({groceryStoreId: groceryStoreId, id: id})"
      >Add To Cart</v-btn>
    </v-card-actions>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
export default {
  name: "InventoryItem",
  props: ["id", "brand", "name", "expirationDate", "groceryStoreId"],
  computed: {
    ...mapGetters(["getUserType"])
  },
  methods: {
    formatDate(value) {
      if (value) {
        return moment(String(value)).format("MMM Do YYYY");
      }
    },
    ...mapActions(["deleteInventoryItems", "addInventoryItemToCart"])
  }
};
</script>

<style scoped>
</style>
