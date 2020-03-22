<template>
  <div>
    <FoodBankOrdersTable />
  </div>
</template>

<script>
import FoodBankOrdersTable from "../components/FoodBankOrdersTable.vue";
import { mapActions } from "vuex";

export default {
  name: "FoodBankOrders",
  components: {
    FoodBankOrdersTable
  },
  mounted() {
    this.bindFoodBankOrders();
  },
  methods: {
    ...mapActions({
      bindFoodBankOrders: "bindFoodBankOrders"
    })
  }
};
</script>