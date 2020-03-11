<template>
  <div>
    <ActiveOrdersTable />
  </div>
</template>

<script>
import ActiveOrdersTable from "../components/ActiveOrdersTable.vue";
import { mapActions } from "vuex";

export default {
  name: "ActiveOrders",
  components: {
    ActiveOrdersTable
  },
  mounted() {
    this.bindActiveOrders();
  },
  methods: {
    ...mapActions({
      bindActiveOrders: "bindActiveOrders"
    })
  }
};
</script>
