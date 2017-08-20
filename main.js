'use strict';

var config = {
    apiKey: FbCreds.apiKey,
    authDomain: FbCreds.authDomain
  };

firebase.initializeApp(config);
var provider = new firebase.auth.GoogleAuthProvider();

// console.log('hi');
