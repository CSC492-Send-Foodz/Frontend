<template>
  <div @load="sendStoreId">
    <v-data-table
      :headers="fields"
      :items="activeOrders"
      class="elevation-1"
      hide actions
      :hide-default-footer="true"
    >
      <template v-slot:item="row">
        <tr>
          <td>{{ row.item.EDINumber }}</td>
          <td>{{ row.item.foodBank }}</td>
          <td>{{ row.item.time }}</td>
          <td>{{ row.item.orderStatus }}</td>
          <td>
            <v-btn icon id="response" @click="changeStatus(row.index)">
              <v-icon>mdi-check</v-icon>
            </v-btn>
            <v-btn
              icon
              id="response"
              :disabled="shouldDisable(row.index)"
              @click="removeOrder(row.index)"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import io from 'socket.io-client';

export default {
  data() {
    return {
      socket : io('localhost:3001'),
      activeOrders: [
        {
          EDINumber: 3232,
          foodBank: "Eden",
          time: Date(),
          orderStatus: "Searching for Driver",
          items: [
            {name: "apple", qty: 45}
          ]
        },
        {
          EDINumber: 4671,
          foodBank: "Seva",
          time: Date(),
          orderStatus: "Picked up",
          items: [
            {name: "pineapple", qty: 1000}
          ]
        }
      ],
      fields: [
        { text: "EDI Number", value: "EDINumber" },
        { text: "Food Bank", value: "foodBank" },
        { text: "Time", value: "time" },
        { text: "Order Status", value: "orderStatus" },
        { text: "", value: "response" }
      ]
    };
  },
  methods: {
    changeStatus(index) {
      this.activeOrders[index].orderStatus = "Picked up";
    },
    removeOrder(index) {
      this.activeOrders.splice(index, 1);
    },
    shouldDisable(index) {
      if (this.activeOrders[index].orderStatus == "Picked up") {
        return true;
      }
      return false;
    },
    getInventory() {
      this.activeOrders = [];
      this.socket.on("INVENTORY_DATA", items => {
        items.forEach(item => {
          this.activeOrders.push(item);
        });
      });
    },
    sendStoreId(event) {
      event.preventDefault();
      // send storeID to back end to get inventory
      this.socket.emit("STORE_ID", {
        param: this.$store.state.id
      });
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
