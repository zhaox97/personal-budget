<template>
    <div class = "budgetCategory">
        <h2>Add Expense Category</h2>
        Category <input type="text" v-model="budgetCategory"><br>
        Monthly Budget <input type="number" v-model.number="budgetLimit"> <br>
        <button v-on:click = "saveCategory">Add Category</button> <br>
        <table>
        <thead>
            <tr>
            <th>Category</th>
            <th>Monthly Budget</th>
            </tr>
        </thead>
        <tbody>
        <tr v-for="(z,pos) in allCategories" :key="pos">
            <td>{{z.name}}</td>
            <td>${{z.limit}}</td>
        </tr>
        </tbody>
        </table>
    </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import {FirebaseFirestore} from "@firebase/firestore-types"
import { QuerySnapshot } from '@firebase/firestore-types';
import { QueryDocumentSnapshot } from '@firebase/firestore-types';

@Component
export default class BudgetCategory extends Vue {
  readonly $appDB!: FirebaseFirestore;
  private budgetCategory = "";
  private budgetLimit = 50;
  private allCategories: any[] = [];
  mounted(): void {
    this.$appDB
    .collection("users/me/categories")
    .orderBy("name")       // Sort by category name
    .onSnapshot((qs: QuerySnapshot) => {
      this.allCategories.splice(0);  // remove old data
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
  }
  saveCategory(): void{
      this.$appDB
        .collection("users/me/categories")
        .add({name: this.budgetCategory, monthlyLimit: this.budgetLimit})
    }
}
</script>

<style scoped>
table, th {
  border: 1px solid black;
  border-collapse: collapse;
}
</style>