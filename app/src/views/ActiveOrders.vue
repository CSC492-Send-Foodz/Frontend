<template>
  <div>
    <ActiveOrdersTable/>
  </div>

 
</template>

<script>
import ActiveOrdersTable from "../components/ActiveOrdersTable"
export default {
  name: "ActiveOrders",
  components: {
    ActiveOrdersTable
  }
};
</script>
