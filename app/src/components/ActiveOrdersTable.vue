<template>
  <div>
    <v-data-table
      :headers="fields"
      :items="getActiveOrders"
      :single-expand="true"
      :expanded.sync="expanded"
      item-key="name"
      class="elevation-1"
      show-expand
      :hide-default-footer="true"
      :fixed-header="true"
    >
      <template v-slot:expanded-item="{ headers, item }">
        <td
          v-for="food in item.inventory"
          :colspan="headers.length-2"
          :key="food.id"
        >
        <strong>{{food.ediOrderNumber}} </strong><br/>
          {{ food.name }}: {{ food.quantity }}
        </td>
      </template>

      <template v-slot:item.response="row">
        <td>
          <v-btn
            icon
            id="response"
            :disabled="disablePickUpConfirmation(row.item)"
            @click="changeStatus(row.item, afterConfirmationStatus())"
          >
            <v-icon>mdi-check</v-icon>
          </v-btn>

        </td>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      expanded: [],
      fields: [
        { text: "Order ID", value: "id", align: "center" },
        { text: "Food Bank", value: "foodBankId", align: "center" },
        { text: "Time", value: "recieved", align: "center" },
        { text: "Order Status", value: "status", align: "center" },
        { text: "", value: "response", align: "center" },
        { text: "", value: "data-table-expand", align: "center" }
      ]
    };
  },
  computed: {
    ...mapGetters({
      getActiveOrders: "getActiveOrders",
      getUserType: "getUserType"
    })
  },
  methods: {
    ...mapActions({
      updateOrderStatus: "updateOrderStatus"
    }),
    changeStatus(item, status) {
      this.updateOrderStatus({ id: item.id, status: status });
    },

    disablePickUpConfirmation(item) {
      return (
        item.status !=
        "Driver on route for pick up"
      );
    },
    afterConfirmationStatus(){
      if (this.getUserType === 'Food Bank') return "Inventory picked up"
      else if (this.getUserType === 'Grocery Store') return "Inventory Delivered"
    }
  }
};
</script>
<style lang="scss" scoped>
#expand,
#response {
  background-color: white;
  color: #333;
  border: none;
  outline: none;
}
</style>
