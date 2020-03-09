
<template>
  <!-- <div>
    <div
      v-for="attribute in ['name','brand','quantity','expirationDate']"
      :key="attribute"
    >
      <div
        v-if="attribute === 'expirationDate'"
      >{{formatDate(getInventoryItem(index)[attribute])}}</div>
      <div v-else>{{getInventoryItem(index)[attribute]}}</div>
    </div>
  </div>-->
  <div>
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">{{getInventoryItem(index)['brand']}}</div>
        <v-list-item-title class="headline mb-1">{{getInventoryItem(index)['name']}}</v-list-item-title>
        <v-list-item-subtitle>Exp: {{formatDate(getInventoryItem(index)['expirationDate'])}}</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn
        @click="deleteInventoryItems({
        groceryStoreId : getInventoryItem(index)['groceryStoreId'],
        itemId: getInventoryItem(index)['id'] 
      })"
      >Remove</v-btn>
    </v-card-actions>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
export default {
  name: "InventoryItem",
  props: ["index"],
  computed: {
    ...mapGetters(["getInventoryCount", "getInventoryItem"])
  },
  methods: {
    formatDate(value) {
      if (value) {
        return moment(String(value)).format("MMM Do YYYY");
      }
    },
    ...mapActions(["deleteInventoryItems"])
  }
};
</script>

<style scoped>
</style>
