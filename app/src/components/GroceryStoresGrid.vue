<template>
  <div>
    <v-container>
      <v-row justify="center" class="mx-auto" max-width="600">
        <v-card v-for="(store, index) in getAllGroceryStores" :key="index" class="ma-2 pa-1">
          <GroceryStoresGridItem :id="store.id" :address="store.address" :company="store.company"/>
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import GroceryStoresGridItem from "../components/GroceryStoresGridItem.vue";
export default {
  computed: {
    ...mapGetters(["getAllGroceryStores"])
  },
  components: {
    GroceryStoresGridItem
  }
};
</script>