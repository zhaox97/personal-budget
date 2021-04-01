<template>
  <div id="app">
    <h1>Personal Budget</h1>
    <img alt="Vue logo" src="./assets/personalbud.jpg" />
    <h3>Xianghe Zhao</h3>
    <button v-if="userLoggedIn()" v-on:click="doLogout" >Logout</button>
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BudgetCategory from "./components/BudgetCategory.vue";
import MyExpense from "./components/MyExpense.vue";
import AppLogin from "./components/AppLogin.vue";
import { FirebaseFirestore } from "@firebase/firestore-types";
import "firebase/auth";
import { FirebaseAuth } from "@firebase/auth-types";

@Component({
  components: {
    BudgetCategory,
    MyExpense,
    AppLogin,
  },
})
export default class App extends Vue {
  readonly $appDB!: FirebaseFirestore;
  readonly $appAuth!: FirebaseAuth;

  userLoggedIn(): boolean {
    return this.$appAuth.currentUser?.uid !== undefined;
  }
  doLogout(): void {
    this.$appAuth.signOut();
    this.$router.back(); // Go backward in the "history stack"
  }
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
