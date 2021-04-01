<template>
  <div id="top">
    <section>
      <h3>Enter your Spending Details</h3>
      <!-- the input fields and buttons -->
      Amount <input type="number" v-model.number="spendingAmount" /> <br />
    Date <input type="date" v-model="spendingDate" /><br />
    Where <input type="text" v-model="spendingPlace" /><br />
    Category
    <select v-model="spendingCategory">
      <option v-for="(c, pos) in allCategories" :value="c.name" :key="pos">{{
        c.name
      }}</option> </select
    ><br />
    <button v-on:click="addExpense">Save</button> <br />
    </section>
    <section>
      <h3>Expenses</h3>
      <!-- the 4-column expense details table goes here -->
      <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Category</th>
          <th>Place of Purchase</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(z, pos) in allExpenses" :key="pos">
          <td>{{ z.date }}</td>
          <td>{{ z.category }}</td>
          <td>{{ z.where }}</td>
          <td>${{ z.amount }}</td>
        </tr>
      </tbody>
    </table>
    </section>
    <section>
      <h3>Spending Summary>/h3>
      <!-- the 4-column expense summary table goes here -->
      <table>
      <thead>
        <tr>
          <th>Category</th>
          <th>Total Spending</th>
          <th>Budget Limit</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(e, pos) in expenseByCategory" :key="pos">
          <td>{{ e.category }}</td>
          <td>{{ e.amount }}</td>
          <td>{{ e.limit }}</td>
          <template v-if="e.limit >= e.amount"> <td>OK</td></template>
          <template v-else> <td>Over Budget</td></template>
        </tr>
      </tbody>
    </table>
    </section>
    <ApexChart
      width="260"
      type="donut"
      :options="{
        labels: expenseByCategory.map((forDonut) => forDonut.category),
        series: expenseByCategory.map((sweets) => sweets.amount),
      }"
    ></ApexChart>
  </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import BudgetCategory from './components/BudgetCategory.vue';
import MyExpense from './components/MyExpense.vue';
import {FirebaseFirestore} from "@firebase/firestore-types"


@Component({
  components: {
    BudgetCategory, MyExpense,
  },
})
export default class MyElement extends Vue {
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

<style scoped>
#top {
  display: grid;
  grid-template-columns: 2fr 3fr;
  grid-template-areas: "input summary" "donut expenses";
}
#top > section:nth-child(1) {
  grid-area: input;
}
#top > section:nth-child(2) {
  grid-area: expenses;
}
#top > section:nth-child(3) {
  grid-area: summary;
}
#top > :nth-child(4) {
  grid-area: donut;
}
</style>