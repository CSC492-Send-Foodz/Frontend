<template>
  <v-app>
    <ActiveOrdersTable />
  </v-app>
</template>

<script>
import ActiveOrdersTable from "./components/ActiveOrdersTable";

export default {
  name: "App",

  components: {
    ActiveOrdersTable
  },

  data: () => ({
    //
  })
};
</script>
