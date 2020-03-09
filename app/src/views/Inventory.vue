
<template>
  <div>
    <h1 class=".display-4">Donation Inventory</h1>
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn color="white" v-on="on">Place Donation</v-btn>
      </template>

      <v-card>
        <v-card-title class="headline white" primary-title>Upload Donation</v-card-title>

        <v-card class="mx-auto" max-width="300">
          <v-file-input
            v-model="uploadedInventoryFile"
            prepend-icon="mdi-paperclip"
            :show-size="1000"
          ></v-file-input>
        </v-card>

        <v-card-text></v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="black" text @click="handleFileUpload(uploadedInventoryFile); dialog = false">Confirm Donation</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <InventoryGrid />
  </div>
</template>

<script>
import InventoryGrid from "../components/InventoryGrid.vue";
import { mapActions } from "vuex";
export default {
  name: "InventoryPage",
  data: () => ({
    uploadedInventoryFile: null,
    dialog: false
  }),
  components: {
    InventoryGrid
  },
  methods: {
    ...mapActions({
      handleFileUpload: "postInventoryItems",
      setInventoryItem: "setInventoryItem",
      bindInventoryItems: "bindInventoryItems"
    })
  },
  mounted () {
    this.bindInventoryItems();
  },
};
</script>
