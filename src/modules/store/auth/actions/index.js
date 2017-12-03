import router from 'modules/router/router.js';

import * as a from './const';
import * as m from '../mutations/const';
import * as s from '../state/const';

import axios from '../../../../axios-auth.js';
import globalAxios from 'axios';

export default {

  // register new user

  [a.signup] ({commit, dispatch}, authData) {
    axios.post('/signupNewUser?key=AIzaSyAEJvu2s0oJqdRxq5GqQQu6_RcN9Rz92Bc', {
      // authData is form data passed from signup.vue
      username: authData.username,
      email: authData.email,
      password: authData.password,
      returnSecureToken: true
    })
      .then(res => {
        // the server responds back a data object with tokens
        commit(m.AUTH_USER, {
          token: res.data.idToken,
          userId: res.data.localId
        })
        commit(m.STORE_USER, authData.username);

        // remove . from string because firebase cannot have . in key
        const email = authData.email.split('.').join("");

        const userData = {};

        userData[email] = {localId: res.data.localId, username: authData.username}

        // to store user data in Firebase database in addition to the Auth database
        dispatch(a.storeUser, userData)
      })
      .then(res => {
        router.push('select');
      })
      .catch(error => console.log(error));
  },

  // login user

  [a.login] ({commit, state, rootState}, authData) {
    axios.post('/verifyPassword?key=AIzaSyAEJvu2s0oJqdRxq5GqQQu6_RcN9Rz92Bc', {
      email: authData.email,
      password: authData.password,
      returnSecureToken: true
    })
      .then(res => {
        // the server responds back a data object with tokens
        commit(m.AUTH_USER, {
          token: res.data.idToken,
          userId: res.data.localId
        })
      }).then( () => {
        // get request for emails to find username
        globalAxios.get('/users.json')
          .then(res => {
            const data = res.data;
            const users = [];

            for (let userId in data) {
              users.push(data[userId]);
            }

            const formatEmail = authData.email.split('.').join("");
            let username;

            for (let i = 0; i < users.length; i++) {
              if (users[i][formatEmail]) {
                username = users[i][formatEmail].username;
                break;
              }
            }
            commit(m.STORE_USER, username);
          })
          router.push('select');
      })
      .catch(error => console.log(error))
  },

  // to store user data in Firebase database in addition to the Auth database

  [a.storeUser] ({commit, state}, userData) {
    if (!state.idToken) {
      return;
    }

    globalAxios.post('/users.json' + '?auth=' + state.idToken, userData)
    .then(res => console.log(res))
    .catch(error => console.log(error))
  }
};
