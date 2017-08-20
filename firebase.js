
const fbURL = 'https://coolkidscode-27dac.firebaseio.com/';

const config = {
  apiKey: FbCreds.apiKey,
  authDomain: FbCreds.authDomain
};

firebase.initializeApp(config);
var provider = new firebase.auth.GoogleAuthProvider();

let currentUser = null;
// let username = null;
let userFBKey = null;
let userInfo = null;

function loginUser() {
  return new Promise( (resolve, reject) => {
      firebase.auth().signInWithPopup(provider)
      .then( (data) => {
        currentUser = data.user.uid;
        resolve(data);
      })
      .catch( (err) => {
        console.log("error loggin in", err.message);
      });
  });
}

function logoutUser() {
  return firebase.auth().signOut()
    .then( (data) => {
      currentUser = null;
      userFBKey = null;
    })
    .catch( (err) => {
      console.log("Error logging out", err.message);
  });
}

function getUserInfo(uid) {
  return new Promise( (resolve, reject) => {
    $.ajax({
      url: `${fbURL}user.json?orderBy="uid"&equalTo="${uid}"`
    }).done( (userData) => {
      // console.log('userData', userData);
      userInfo = userData;
      let userFBKey = Object.keys(userData)[0];
      // console.log('userFBKey', userFBKey);
      resolve(userData);
    }).fail((err)=>{
      console.log('error getting user FB info', err);
      reject(err);
    });
  });
}

function createUserInfo(username) {
  return new Promise( (resolve, reject) => {
    let userObject = {
      uid: currentUser,
      name: username
    };
    $.ajax({
      url: `${fbURL}user.json`,
      method: "POST",
      data: JSON.stringify(userObject)
    }).done( (userData) => {
      console.log('userData', userData);
      userFBKey = userData.name;
      resolve(userData);
    }).fail((err)=>{
      console.log('error getting user FB info', err);
      reject(err);
    });
  });
}

function updateUserInfo(userStatsObject) {
  return new Promise( (resolve, reject) => {
    $.ajax({
      url: `${fbURL}user/${userFBKey}.json`,
      method: "PATCH",
      data: JSON.stringify(userStatsObject)
    }).done( (userData) => {
      console.log('userData', userData);
      resolve(userData.data);
    }).fail((err)=>{
      console.log('error getting user FB info', err);
      reject(err);
    });
  });
}
