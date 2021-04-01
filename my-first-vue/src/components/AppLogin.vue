<template>
  <div class="AppLogin">
    <div>
      <label for="username">Username:</label>
      <input type="text" v-model="userEmail" />
    </div>
    <div>
      <label for="pass">Password:</label>
      <input type="password" v-model="userPassword" />
    </div>
    <button v-on:click="createAccount" :disabled="noInput">Signup</button>
    <button v-on:click="authenticate" :disabled="noInput">Signin</button>
    <div>{{ message }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { FirebaseAuth } from "@firebase/auth-types";
import {UserCredential} from "@firebase/auth-types"
@Component
export default class AppLogin extends Vue {
  readonly $appAuth!: FirebaseAuth;
  private message = "";
  userEmail = "";
  userPassword = "";
  get noInput(): boolean {
    return this.userEmail.length === 0 || this.userPassword.length === 0;
  }
  createAccount(): void {
    this.$appAuth
      .createUserWithEmailAndPassword(this.userEmail, this.userPassword)
      .then((u: UserCredential) => {
        this.showMessage(`User create UID ${u.user?.uid}`);
      })
      .catch((err: any) => {
        this.showMessage(`Unable to create account ${err}`);
      });
  }

  authenticate(): void {
    this.$appAuth
      .signInWithEmailAndPassword(this.userEmail, this.userPassword)
      .then((u: UserCredential) => {
        this.showMessage(`Login successful UID ${u.user?.uid}`);
      })
      .catch((err: any) => {
        this.showMessage(`Unable to login ${err}`);
      });
  }
  showMessage(m: string): void {
    this.message = m;
    setTimeout(() => {
      // Auto disappear after 5 seconds
      this.message = "";
    }, 5000);
  }
}
</script>
