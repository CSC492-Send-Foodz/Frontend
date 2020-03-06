<template>
  <div id="app">
    <!-- <Form/> -->
        <div class="container">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <Chat />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import Form from './components/Form.vue'
import Chat from './components/Chat.vue'

export default {
  name: 'App',
  components: {
    //Form,
    Chat
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
