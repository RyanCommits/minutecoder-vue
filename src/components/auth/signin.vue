<template>
  <form @submit.prevent="onSubmit" class="login-form">
    <v-text-field
      label="Email"
      v-model="email"
      required
    ></v-text-field>
    <v-text-field
      label="Password"
      v-model="password"
      type="password"
      :counter="10"
      required
    ></v-text-field>
    <button class="form-button" type="submit">SUBMIT</button>

  </form>
</template>

<script>
import store from 'store';
import * as authActions from 'store/auth/actions/const';
import { mapActions } from 'vuex';

  export default {
    data () {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      ...mapActions('auth', {
        login: authActions.login
      }),
      onSubmit () {
        const formData = {
          email: this.email,
          password: this.password,
        }
        this.login(formData);
      }
    }
  }
</script>

<style lang="sass" scoped>
  .login-form {
    width: 60%;
    margin: 10% auto;
    border: 1px solid #eee;
    padding: 20px;
    box-shadow: 0 2px 3px #ccc;
  }

  .primary--text {
    color: #fa923f !important;
  }

  .form-button {
    margin-top: 30px;
    border: 1px solid #cccccc;
    padding: 5px 15px;
    color: #606060;
    box-shadow: 1px 1px 3px #cccccc;
  }

    .form-button:hover,
    .form-button:active,
    .form-button:focus {
      background-color: #016dba;
      color: #fff;
      -moz-transition: all 0.3s ease-in;
      /* WebKit */
      -webkit-transition: all 0.3s ease-in;
      /* Opera */
      -o-transition: all 0.3s ease-in;
      /* Standard */
      transition: all 0.3s ease-in;
    }
</style>
