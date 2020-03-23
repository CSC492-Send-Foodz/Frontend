
<template>
  <div>
    <h1 class=".display-4">Available Stores</h1>
    <GroceryStoresGrid/>
  </div>
</template>

<script>
import GroceryStoresGrid from "../components/GroceryStoresGrid.vue";
import { mapActions } from "vuex";
export default {
  name: "GroceryStore",
  data: () => ({
    uploadedInventoryFile: null,
    dialog: false
  }),
  components: {
    GroceryStoresGrid
  },
  methods: {
    ...mapActions({
     bindGroceryStores: "bindGroceryStores"
    })
  },
  mounted () {
    this.bindGroceryStores();
  },
};
</script>
