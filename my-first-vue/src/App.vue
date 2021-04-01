<template>
  <div id="app">
    <h1>Personal Budget</h1>
    <img alt="Vue logo" src="./assets/personalbud.jpg">
    <h2>Xianghe Zhao</h2>
    <AppLogin/>
    <BudgetCategory/>
    <MyExpense/>
  </div>
</template>
<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import BudgetCategory from './components/BudgetCategory.vue';
import MyExpense from './components/MyExpense.vue';
import AppLogin from './components/AppLogin.vue';
import {FirebaseFirestore} from "@firebase/firestore-types";

@Component({
  components: {
    BudgetCategory, MyExpense, AppLogin,
  },
})
export default class App extends Vue {
  readonly $appDB!: FirebaseFirestore;

  // This function is automatically called when
  // the App component is added to the DOM tree
  mounted(): void {
    // Just for debugging, you may delete the following two
    // lines after it is confirmed that this.$appDB is
    // initialized correctly
    console.log("API Key", this.$appDB.app.options_.apiKey);
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
