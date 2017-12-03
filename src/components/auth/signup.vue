<template>
  <form @submit.prevent="onSubmit" class="signup-form">
    <v-text-field
      label="Username"
      v-model="username"
      :counter="20"
      required
    ></v-text-field>
    <v-text-field
      label="Email"
      v-model="email"
      required
    ></v-text-field>
    <v-text-field
      v-validate="'required'"
      label="Password"
      type="password"
      placeholder="Passwords should be at least 6 characters long"
      v-model="password"
      :counter="10"
      required
    ></v-text-field>
      <v-text-field
      v-validate="'required|confirmed:password'"
      label="Confirm Password"
      type="password"
      v-model="confirmPassword"
      :counter="10"
      data-vv-as="password"
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
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      }
    },
    methods: {
      ...mapActions('auth', {
        signup: authActions.signup
      }),

      onSubmit () {
        const formData = {
          username: this.username,
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword,
        }
        this.signup(formData);
      }
    }
  }
</script>

<style lang="sass" scoped>
  .signup-form {
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
