<template>
  <div id="app">
    <CoinSearch msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import CoinSearch from "./components/CoinSearch.vue";

export default {
  name: "app",
  components: {
    CoinSearch
  }
};
</script>
