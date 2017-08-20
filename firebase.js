
const fbURL = 'https://coolkidscode-27dac.firebaseio.com/';

firebase.initializeApp(config);
var provider = new firebase.auth.GoogleAuthProvider();

let currentUser = null;
let userFBKey = null;

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

function getUserInfo() {
  return new Promise( (resolve, reject) => {
    $.ajax({
      url: `${fbURL}user.json?orderBy="uid"&equalTo="${currentUser}"`
    }).done( (userData) => {
      console.log('userData', userData);
      userFBKey = userData.data.name;
      console.log('userFBKey', userFBKey);
      resolve(userData.data);
    }).fail((err)=>{
      console.log('error getting user FB info', err);
      reject(err);
    });
  });
}

function createUserInfo() {
  return new Promise( (resolve, reject) => {
    let userObject = {
      uid: currentUser
    };
    $.ajax({
      url: `${fbURL}user.json`,
      method: post,
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
      method: patch,
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
