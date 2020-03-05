<template>
  <div id="app">
    <InventoryGrid/>
  </div>
</template>

<script>
import InventoryGrid from './components/InventoryGrid.vue'

export default {
  name: 'App',
  components: {
    InventoryGrid
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
