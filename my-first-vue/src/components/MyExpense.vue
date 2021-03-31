<template>
  <div class="myExpense">
    <h2>Enter Your Spending Details</h2>
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
    <h2>Expenses</h2>
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
    <h2>Spending Summary</h2>
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
    <ApexChart
      width="360"
      type="donut"
      :options="{
        labels: ['One', 'Two', 'Three'],
        series: [10, 15, 90],
      }"
    ></ApexChart>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { FirebaseFirestore } from "@firebase/firestore-types";
import { QuerySnapshot } from "@firebase/firestore-types";
import { QueryDocumentSnapshot } from "@firebase/firestore-types";
import ApexChart from "vue-apexcharts";

@Component({components: {ApexChart}})
export default class MyExpense extends Vue {
  readonly $appDB!: FirebaseFirestore;
  private allCategories: any[] = [];
  private allExpenses: any[] = [];
  private spendingAmount = 50;
  private spendingDate = "";
  private spendingCategory = "";
  private spendingPlace = "";
  private expenseByCategory: any[] = [];

  mounted(): void {
    const groupedTotal = new Map<string, number>();
    this.$appDB
      .collection("users/me/categories")
      .orderBy("name") // Sort by category name
      .onSnapshot((qs: QuerySnapshot) => {
        this.allCategories.splice(0); // remove old data
        qs.forEach((qds: QueryDocumentSnapshot) => {
          if (qds.exists) {
            const catData = qds.data();
            this.allCategories.push({
              name: catData.name,
              limit: catData.monthlyLimit,
            });
          }
        });
      });
    this.$appDB
      .collection("users/me/expenses")
      .orderBy("date") // Sort by category name
      .onSnapshot((qs: QuerySnapshot) => {
        this.allExpenses.splice(0); // remove old data
        qs.forEach((qds: QueryDocumentSnapshot) => {
          if (qds.exists) {
            const catData = qds.data();
            this.allExpenses.push({
              category: catData.category,
              where: catData.where,
              amount: catData.amount,
              date: catData.date,
            });
          }
        });
        this.allExpenses.forEach((ex: any) => {
          const { category, amount } = ex;
          if (groupedTotal.has(category)) {
            // This category has been recorded earlier, get the old total
            const oldTotal = groupedTotal.get(category) as number;
            groupedTotal.set(category, oldTotal + amount);
          } else {
            // This is a new category
            groupedTotal.set(category, amount);
          }
        });

        this.expenseByCategory.splice(0); // remove old data
        groupedTotal.forEach((spTotal: number, spCat: string) => {
          // locate the this category within the `allCategories` array

          const pos = this.allCategories.findIndex(
            (d: any) => d.name === spCat
          );
          this.expenseByCategory.push({
            category: spCat,
            amount: spTotal,
            limit: this.allCategories[pos].limit,
          });
        });
      });
  }
  addExpense(): void {
    this.$appDB.collection("users/me/expenses").add({
      amount: this.spendingAmount,
      date: this.spendingDate,
      category: this.spendingCategory,
      where: this.spendingPlace,
    });
  }
}
</script>
<style scoped>
table,
th,
td {
  border: 1px solid black;
}
</style>
