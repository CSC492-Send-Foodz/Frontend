
<template>
  <div>
     <h1 class="my-6 font-weight-regular">AVAILABLE STORES</h1>
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
