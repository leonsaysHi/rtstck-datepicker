<template>
  <div id="app">
    <h2>Date range picker</h2>
    <RtstckDaterangepicker v-model="daterange" />
    <code>{{ daterange }}</code>
    <h2>Date picker</h2>
    <RtstckDatepicker v-model="date" />
    <code>{{ date }}</code>
  </div>
</template>

<script>
import RtstckDaterangepicker from './components/rtstck-datepicker/RtstckDaterangepicker.vue'
import RtstckDatepicker from './components/rtstck-datepicker/RtstckDatepicker.vue'

export default {
  name: 'App',
  components: {
    RtstckDaterangepicker,
    RtstckDatepicker
  },
  data() {
    return {
      daterange: null,
      date: null,
    }
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
