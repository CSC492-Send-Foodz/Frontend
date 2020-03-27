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
  </div>
</template>


<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters(["getShoppingCart"])
  },
  methods: {
    ...mapMutations(["removeInventoryItemFromCart"]),
    ...mapActions(["postOrder"])
  }
};
</script>