
<template>
  <div>
    <h1 class="my-6 font-weight-regular">DONATION INVENTORY</h1>

    <div v-if="this.getUserType === 'Grocery Store'">
      <v-btn
        tile
        outlined
        x-large
        class="btn-outline"
        color="primary"
        :loading="isSelecting"
        @click="onButtonClick"
      >Make A Donation</v-btn>
      <input ref="uploader" class="d-none" type="file" accept=".csv" @change="handleFileUpload" />
    </div>

    <v-dialog persistent v-model="getShowPopupStartNewShoppingCart" max-width="400">
      <v-card>
        <v-card-title class="headline white">One At A Time</v-card-title>
        <v-divider></v-divider>

        <v-card-text></v-card-text>

        <v-card-subtitle
          class="text-left"
        >It seems you want to add this great item to the order. Unforunatly, we only support items from the same store within a single order.</v-card-subtitle>
        <v-card-text
          class="text-left"
        >Please complete the order in your cart before returning for this one or start a new cart for this store</v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="black" text @click="startNewShoppingCart(); closePopUp(false)">New Cart</v-btn>

          <v-btn color="black" text @click="closePopUp(false)">Go Back</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
      isSelecting: false
    };
  },
  computed: {
    ...mapGetters(["getUserType", "getShowPopupStartNewShoppingCart"])
  },
  components: {
    InventoryGrid
  },
  methods: {
    ...mapActions({
      postInventoryItems: "postInventoryItems",
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
    },
    handleFileUpload(e) {
      this.postInventoryItems(e.target.files[0]);
    },

    onButtonClick() {
      this.isSelecting = true;
      window.addEventListener(
        "focus",
        () => {
          this.isSelecting = false;
        },
        { once: true }
      );
      this.$refs.uploader.click();
    }
  },

  mounted() {
    this.bindInventoryItems(this.id);
  }
};
</script>
<style>
.btn-outline {
  border-color: #ebebeb;
}
</style>