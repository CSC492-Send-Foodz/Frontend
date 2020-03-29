
<template>
  <div>
    <h1 class=".display-4">Donation Inventory</h1>
    <v-dialog v-if="this.getUserType === 'Grocery Store'" v-model="dialog" width="500">
      <template  v-slot:activator="{ on }">
        <v-btn color="white" v-on="on">Place Donation</v-btn>
      </template>

      <v-card>
        <v-card-title class="headline white" primary-title>Upload Donation</v-card-title>

        <v-card class="mx-auto" max-width="300">
          <v-file-input
            v-model="uploadedInventoryFile"
            prepend-icon="mdi-paperclip"
            :show-size="1000"
          ></v-file-input>
        </v-card>

        <v-card-text></v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="black"
            text
            @click="handleFileUpload(uploadedInventoryFile); dialog = false"
          >Confirm Donation</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog persistent v-model="getShowPopupStartNewShoppingCart" max-width="400">
      <v-card>
        <v-card-title class="headline white">One At A Time</v-card-title>
        <v-divider></v-divider>

        <v-card-text></v-card-text>

        <v-card-subtitle class=text-left>It seems you want to add this great item to the order. Unforunatly, we only support items from the same store within a single order.</v-card-subtitle>
        <v-card-text class=text-left>Please complete the order in your cart before returning for this one or start a new cart for this store</v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="black" text @click="startNewShoppingCart(); closePopUp(false)">New Cart</v-btn>

          <v-btn color="black" text @click="closePopUp(false)">Go Back</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- <v-btn v-if="this.getUserType === 'Food Bank'" text>
      <v-badge left color="black">
        <span slot="badge">{{getOrderFromGroceryStore.length}}</span>
        <v-icon>shopping_cart</v-icon>
      </v-badge>
    </v-btn> -->
    <InventoryGrid />
  </div>
</template>


<script>
import InventoryGrid from "../components/InventoryGrid.vue";
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: "InventoryPage",
  data() {
    return {
      id: this.$route.params.id,
      uploadedInventoryFile: null,
      dialog: false
    };
  },
  computed: {
    ...mapGetters([
      "getUserType",
      "getOrderFromGroceryStore",
      "getShowPopupStartNewShoppingCart"
    ])
  },
  components: {
    InventoryGrid
  },
  methods: {
    ...mapActions({
      handleFileUpload: "postInventoryItems",
      bindInventoryItems: "bindInventoryItems"
    }),
    ...mapMutations({
      closePopUp: "setShowPopupStartNewShoppingCart",
      setShoppingCartGroceryStoreId: "setShoppingCartGroceryStoreId",
      clearShoppingCart: "clearShoppingCart"
    }),
    startNewShoppingCart() {
      this.setShoppingCartGroceryStoreId(this.id);
      this.clearShoppingCart();
    }
  },

  mounted() {
    this.bindInventoryItems(this.id);
  }
};
</script>
