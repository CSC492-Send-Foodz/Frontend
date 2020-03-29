
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
      <v-text-field v-if="this.getUserType === 'Food Bank'"
        flat
        v-model="selectedQuantity"
        type="number"
        solo
        min="0"
        :max="totalQuantity"
        :suffix="outOf"
        oninput="if(Number(this.value) > Number(this.max)) this.value=this.max; if(Number(this.value) < Number(this.min)) this.value=this.min; "
       ></v-text-field>
      
      <v-btn
        text
        v-if="this.getUserType === 'Grocery Store'"
        @click="deleteInventoryItems({groceryStoreId : groceryStoreId, id: id })"
      >Remove</v-btn>
      <v-btn
        text
        v-else-if="isInShoppingCart"
        @click="selectedQuantity == 0 ? 
        removeInventoryItemFromCart(getShoppingCartIndex(id)) :
        updateInventoryItemInCart({index:getShoppingCartIndex(id), quantity: selectedQuantity})"
      >Update Cart</v-btn>
      <v-btn text v-else @click="handleAddToCart()">Add To Cart</v-btn>
    </v-card-actions>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import moment from "moment";
export default {
  name: "InventoryItem",
  props: ["item"],
  data() {
    return {
      id: this.item.id,
      brand: this.item.brand,
      name: this.item.name,
      groceryStoreId: this.item.groceryStoreId,
      expirationDate: this.item.expirationDate,
      totalQuantity: this.item.quantity,
      inProgress: false,
      selectedQuantity: null,
      showPopupStartNewShoppingCart: false
    };
  },
  computed: {
    ...mapGetters([
      "getUserType",
      "getShoppingCartGroceryStoreId",
      "getShoppingCartIndex"
    ]),
    outOf() {
      return "/" + this.totalQuantity;
    },
    isInShoppingCart() {
      return this.getShoppingCartIndex(this.id) != -1;
    }
  },
  methods: {
    ...mapActions(["deleteInventoryItems"]),
    ...mapMutations([
      "addInventoryItemToCart",
      "setShoppingCartGroceryStoreId",
      "setShowPopupStartNewShoppingCart",
      "updateInventoryItemInCart",
      "removeInventoryItemFromCart"
    ]),
    formatDate(value) {
      return moment(String(value)).format("YYYY-MM-DD");
    },

    handleAddToCart() {
      if (this.getShoppingCartGroceryStoreId == "") {
        this.setShoppingCartGroceryStoreId(this.groceryStoreId);
      }

      if (this.getShoppingCartGroceryStoreId == this.groceryStoreId) {
        this.addInventoryItemToCart({
          groceryStoreId: this.groceryStoreId,
          item: this.item,
          quantity: this.selectedQuantity
        });
      } else {
        this.setShowPopupStartNewShoppingCart(true);
      }
    }
  }
};
</script>

<style scoped>
</style>
