<template>
  <div>
    <input v-model="searchInput" placeholder="tpye a coin symbol. Ex: BTC">
    <button @click="searchCoinPrice">SEARCH</button>
    <ul v-if="symbol">
      <li>Coin Symbol: {{ symbol }}</li>
      <li>Coin Price: {{ price + " $" }}</li>
    </ul>
    <ul v-else-if="error">
      <li>Cannot find the coin</li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CoinSearch",
  props: {
    msg: String
  },
  data() {
    return {
      searchInput: "",
      symbol: "",
      price: "",
      error: false
    };
  },
  methods: {
    searchCoinPrice() {
      // send request to api with user input
      const url = "http://localhost:3000/coin?search=" + this.searchInput;
      axios.get(url).then(response => {
        console.log(response);
        if (response.data.status === "success") {
          // if coin exist
          this.changeCoinData(response.data);
        } else {
          this.coinError();
        }
      });
    },
    changeCoinData(data) {
      this.symbol = data.symbol;
      this.price = data.price;
    },
    coinError() {
      this.symbol = "";
      this.price = "";
      this.error = true;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
