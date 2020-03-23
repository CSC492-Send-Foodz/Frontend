
<template>
  <div>
    <v-list-item three-line :to="{name:'inventory',params: {id:this.id}}">
      <v-list-item-content>
        <div class="overline mb-4">{{address}}</div>
        <v-list-item-title class="headline mb-1">{{company}}</v-list-item-title>
      </v-list-item-content>

      <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
    </v-list-item>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "GroceryStore",
  props: ["id", "address", "company"],
  methods: {
    ...mapActions(["deleteInventoryItems"])
  }
};
</script>


<style scoped>
</style>
