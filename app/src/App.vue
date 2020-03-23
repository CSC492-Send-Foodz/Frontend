<template>
  <v-app>
    <NavBar/>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import store from "../store/index.js";
export default {
  name: "App",
  store,
  components: {
    NavBar
  }
};
</script>