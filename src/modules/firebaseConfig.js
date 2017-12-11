import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyAEJvu2s0oJqdRxq5GqQQu6_RcN9Rz92Bc',
  authDomain: 'minute-coder.firebaseapp.com',
  databaseURL: 'https://minute-coder.firebaseio.com',
  projectId: 'minute-coder',
  storageBucket: 'minute-coder.appspot.com',
  messagingSenderId: '76588907852'
};

export const firebaseApp = firebase.initializeApp(config);
