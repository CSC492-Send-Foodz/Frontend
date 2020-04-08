<template>
  <div>
    <v-container>
      <v-row mb-5 justify="center" justify-md="start" max-width="600">
        <GroceryStoresGridItem
          v-for="(store, index) in getAllGroceryStores"
          :key="index"
          class="ma-2 pa-1"
          :id="store.id"
          :address="store.address"
          :company="store.company"
        />
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