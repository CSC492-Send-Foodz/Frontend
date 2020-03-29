<template>
  <div class="justify-center">
    <div v-if="getShoppingCart.length == 0">Empty Cart</div>
    <div v-else>
      <v-list three-line>
        <template v-for="(item, index) in getShoppingCart">
          <v-list-item :key="item.title">
            <template v-slot:default="{}">
              <v-list-item-content>
                <v-list-item-title v-text="item.name"></v-list-item-title>
                <v-list-item-subtitle class="text--primary" v-text="item.brand"></v-list-item-subtitle>
                <v-list-item-subtitle v-text="item.quantity"></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn @click="removeInventoryItemFromCart(index)">
                  <v-icon>delete</v-icon>
                </v-btn>
              </v-list-item-action>
            </template>
          </v-list-item>

          <v-divider v-if="index + 1 < getShoppingCart.length" :key="index"></v-divider>
        </template>
      </v-list>
      <v-btn>
        <v-btn text @click="postOrder()">Checkout</v-btn>
      </v-btn>
    </div>
    <v-dialog v-model="checkoutError" max-width="400">
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
    </v-dialog>
  </div>
</template>


<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters(["getShoppingCart", "getShowCheckoutError", "getShowSuccessfullOrderPlace"]),
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
    ...mapMutations(["removeInventoryItemFromCart", "setShowCheckoutError", "setShowSuccessfullOrderPlace"]),
    ...mapActions(["postOrder"])
  }
};
</script>