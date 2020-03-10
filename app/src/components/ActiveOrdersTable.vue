<template>
  <div>
    <v-data-table
      :headers="fields"
      :items="activeOrders"
      class="elevation-1"
      :single-expand="singleExpand"
      :expanded.sync="expanded"
      item-key="id"
      show-expand
      hide-actions
      :hide-default-footer="true"
      :fixed-header="true"
    >
      <template v-slot:item="row">
        <tr>
          <td>{{ row.item.id }}</td>
          <td>{{ row.item.foodBank }}</td>
          <td>{{ row.item.recieved }}</td>
          <td>{{ row.item.status }}</td>
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
      <template v-slot:expanded-item="{ fields }">
        <td :colspan="fields.length">Peek-a-boo!</td>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  mounted() {
    this.activeOrders = this.getActiveOrders;
  },
  data() {
    return {
      expanded: [],
      singleExpand: false,
      activeOrders: [],
      fields: [
        { text: "EDI Number", value: "id", align: 'center' },
        { text: "Food Bank", value: "foodBankId", align: 'center' },
        { text: "Time", value: "recieved", align: 'center' },
        { text: "Order Status", value: "status", align: 'center' },
        { text: "", value: "response", align: 'center' },
        { text: "", value: "data-table-expand", align: 'center' }
      ]
    };
  },
  computed: {
    ...mapGetters(["getActiveOrders"])
  },
  methods: {
    ...mapActions({
      postStatusUpdate: "postStatusUpdate"
    }),
    changeStatus(index) {
      this.activeOrders[index].status = "Picked up";
      this.postStatusUpdate(this.activeOrders[index].id);
    },
    removeOrder(index) {
      this.activeOrders.splice(index, 1);
    },
    shouldDisable(index) {
      if (this.activeOrders[index].status == "Picked up") {
        return true;
      }
      return false;
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
