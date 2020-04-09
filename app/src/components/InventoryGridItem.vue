
<template>
  <div class="py-12 px-5">
    <div class="profile-box">
      <v-avatar class="expireDate" py-12 color="primary" size="100">
        <span class="white--text">
          <div>{{expDateFormated[0]}}</div>
          <div>{{expDateFormated[2]}}</div>
          <div>{{expDateFormated[3]}}</div>
        </span>
      </v-avatar>
      <div class="pt-5 pb-2 name">{{name}}</div>
      <div class="pb-3 itemBrand">{{brand}}</div>

      <div v-if="this.getUserType === 'Food Bank'">
        <v-select class="inputBox" v-model="selectedQuantity" :items="numa" dark flat solo></v-select>
        <v-btn
          v-if="isInShoppingCart"
          tile
          outlined
          medium
          class="btn-outline buttonAdd"
          @click="selectedQuantity == 0 ? 
        removeInventoryItemFromCart(getShoppingCartIndex(id)) :
        updateInventoryItemInCart({index:getShoppingCartIndex(id), quantity: selectedQuantity})"
        >Update Cart</v-btn>

        <v-btn
          v-else
          tile
          outlined
          medium
          class="btn-outline buttonAdd"
          @click="handleAddToCart()"
        >Add To Cart</v-btn>
      </div>

      <div v-else-if="this.getUserType === 'Grocery Store'">
        <div class="py-2">Stock: {{totalQuantity}}</div>
        <v-btn
          v-if="this.getUserType === 'Grocery Store'"
          tile
          outlined
          medium
          class="btn-outline buttonRemove"
          @click="deleteInventoryItems({groceryStoreId : groceryStoreId, id: id })"
        >Remove</v-btn>
      </div>
    </div>
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
      selectedQuantity: 0,
      showPopupStartNewShoppingCart: false
    };
  },
  computed: {
    ...mapGetters([
      "getUserType",
      "getShoppingCartGroceryStoreId",
      "getShoppingCartIndex"
    ]),
    numa() {
      var list = [];
      for (var i = 0; i <= this.totalQuantity; i++) {
        list.push(i);
      }
      return list;
    },
    isInShoppingCart() {
      return this.getShoppingCartIndex(this.id) != -1;
    },
    expDateFormated() {
      return moment(String(this.expirationDate))
        .format("MMM  D YYYY")
        .toUpperCase()
        .split(" ");
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
.expireDate {
  box-shadow: 0 15px 15px 0 rgba(47, 83, 151, 0.1);
}

.inputBox {
  max-width: 70px;
  margin-left: 74px;
  border-radius: 0%;
}
.buttonRemove {
  padding: 10px 60px !important;
  margin-top: 65px;
  margin-bottom: 20px;
}
.buttonAdd {
  padding: 10px 40px !important;
  margin-top: 30px;
  margin-bottom: 20px;
}
.name {
  font-size: 2em;
}

.itemBrand {
  font-size: 1em;
  color: #747474;
}

.profile-box {
  box-shadow: 0 2px 6px 0 rgba(47, 83, 151, 0.1);
  width: 220px;
  height: 400px;
  transition: 300ms;
  flex-grow: 1;
  padding-top: 3vh;
}

.profile-box:hover {
  box-shadow: 0 0 20px 9px rgba(0, 0, 0, 0.03);
}
</style>

