<template>
  <div>
    <v-container>
      <v-row justify="center" class="mx-auto" max-width="600">
        <v-card v-for="(item, index) in getAllInventoryItems" :key="index" class="ma-2 pa-1">
          <InventoryItem :item="item"></InventoryItem>
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>


<script>
import InventoryItem from "../components/InventoryGridItem.vue";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["getAllInventoryItems"])
  },
  components: {
    InventoryItem
  }
};
</script>