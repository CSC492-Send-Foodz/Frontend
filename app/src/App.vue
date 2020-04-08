<template>
  <v-app>
    <NavBar/>
    <v-content>
     
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import NavBar from "./views/NavBar.vue";
export default {
  name: "App",
  components: {
    NavBar
  }
};
</script>