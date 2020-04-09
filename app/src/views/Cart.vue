<template>
  <div align="center">
    <h1 class="my-6 font-weight-regular">SHOPPING CART</h1>

    <v-list class="list">
      <v-list-item-group v-model="selected" active-class="highlighted">
        <template v-for="(item, index) in getShoppingCart">
          <v-list-item :key="item.title">
            <v-avatar color="primary" size="70">
              <span class="white--text">
                <div>{{expDateFormated(item.expirationDate, 0)}}</div>
                <div>{{expDateFormated(item.expirationDate, 1)}}</div>
                <div>{{expDateFormated(item.expirationDate, 2)}}</div>
              </span>
            </v-avatar>

            <v-container fluid>
              <v-row no-gutters>
                <v-col class="py-0 name h2">{{item.name}}</v-col>
              </v-row>
              <v-row no-gutters>
                <v-col class="h2 py-0 itemBrand">{{item.brand}}</v-col>
              </v-row>
            </v-container>
            <v-container fluid>
              <v-row no-gutters>
                <v-col class="py-0 quantity">Quantity: {{item.quantity}}</v-col>
              </v-row>
            </v-container>

            <v-btn icon color="primary" @click="removeInventoryItemFromCart(index)">
              <v-icon>clear</v-icon>
            </v-btn>
          </v-list-item>

          <v-divider v-if="index + 1 < getShoppingCart.length" :key="index"></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
    <v-btn tile outlined x-large class=" mb-12 btn-outline" color="primary" @click="postOrder()">Checkout</v-btn>

    <!-- <v-dialog v-model="checkoutError" max-width="400">
      <v-card>
        <v-card-title class="headline white">Sorry, They're Out of Stock</v-card-title>
        <v-divider></v-divider>

        <v-card-text></v-card-text>

        <v-card-subtitle
          class="text-left"
        >It appears the certian items in this order are currently out of stock</v-card-subtitle>
        <v-divider></v-divider>

        <v-card-actions>
          <v-btn color="black" text @click="setShowCheckoutError(false)">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="successfullOrderPlace" max-width="400">
      <v-card>
        <v-card-title class="headline white">Order Placed!</v-card-title>
        <v-divider></v-divider>

        <v-card-text></v-card-text>

        <v-card-subtitle
          class="text-left"
        >Go over to your active orders to track the status of the order.</v-card-subtitle>
        <v-divider></v-divider>

        <v-card-actions>
          <v-btn color="black" text @click="setShowSuccessfullOrderPlace(false)">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>-->
  </div>
</template>


<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import moment from "moment";
export default {
  computed: {
    ...mapGetters([
      "getShoppingCart",
      "getShowCheckoutError",
      "getShowSuccessfullOrderPlace"
    ]),
    checkoutError: {
      set(hasError) {
        this.setShowCheckoutError(hasError);
      },
      get() {
        return this.getShowCheckoutError;
      }
    },
    successfullOrderPlace: {
      set(isSuccess) {
        this.setShowSuccessfullOrderPlace(isSuccess);
      },
      get() {
        return this.getShowSuccessfullOrderPlace;
      }
    }
  },
  methods: {
    ...mapMutations([
      "removeInventoryItemFromCart",
      "setShowCheckoutError",
      "setShowSuccessfullOrderPlace"
    ]),
    ...mapActions(["postOrder"]),
    expDateFormated(date, index) {
      return moment(String(date))
        .format("MMM D YYYY")
        .toUpperCase()
        .split(" ")[index];
    }
  }
};
</script>
<style>
.list {
  max-width: 80vw;
}
.name {
  font-size: 2em;
}

.quantity {
  font-size: 1.5em;
  color: #747474;
}

.itemBrand {
  font-size: 1em;
  color: #747474;
}
.h2 {
  text-align: justify;
}
.btn-outline {
  border-color: #ebebeb;
}
</style>