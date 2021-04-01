import Vue from 'vue'
import App from './App.vue'
import firebase from "firebase/app"
import "firebase/firestore"
import 'firebase/storage'
import 'firebase/analytics'
import VueApexCharts from "vue-apexcharts";
import "firebase/auth"; 
import { AppRouter } from "./app-routing";
const firebaseConfig = {
  apiKey: "AIzaSyCATabdmIkNiPRhMR6DJypzKBAkTgLc6S8",
  authDomain: "personal-budget-9a006.firebaseapp.com",
  projectId: "personal-budget-9a006",
  storageBucket: "personal-budget-9a006.appspot.com",
  messagingSenderId: "240076350771",
  appId: "1:240076350771:web:895cdee5f7c938a0744a46",
  measurementId: "G-G5ZFK854SB"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
Vue.prototype.$appDB = firebase.firestore();
Vue.config.productionTip = false
Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)
// import "firebase/auth";    // This line may (not) be needed
Vue.prototype.$appAuth = firebase.auth();
new Vue({
  router: AppRouter, 
  render: (h) => h(App),
}).$mount('#app')

