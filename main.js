'use strict';
console.log("writing to screen");

var config = {
    apiKey: FbCreds.apiKey,
    authDomain: FbCreds.authDomain
  };

firebase.initializeApp(config);
var provider = new firebase.auth.GoogleAuthProvider();

// console.log('hi');

/*Welcome page functions*/
function Authenticate(){
	//check firebase for credentials 
	//if user exists - bring back progress, scores, etc.
	//if not user - create new user
	//route to main app page
}

function LoadUserSettings(user){
	//take the object from firebase with user information load the correct level/progress
}

/*main page functions*/
function GetQuestions(level){
	//conect to the json file and grab the questions for the level 
	$.getJSON("questions.json", function(json) {
	    console.log(json); // this will show the info it in firebug console
	});
}
GetQuestions(1);

function RandomizeQuestionOrder(){
	//take the question and randomize the order of the options
	//choose an option to use for the goal display
	//render the options on the cards
}

function DisplayAnswer(){
	//take the option that was clicked on display it on the current box
}

function CheckAnswer(){
	//onclick of a card this function checks if the answer is correct
	//totalPoint starts at 25
	//if correct - then add  points to total and move to next question
	//if not correct - then subtract 5 points from the question score and mark the answer as unavailable
}

function ProgressBar() {
	//render the correct progress on the progress bar
}

function LevelTabs(leve){
	//load and render the level that was clicked
}

function NextQuestion(){
	//render the next question
}

function LevelUp() {
	//opens model with badge and congratse
	SaveProgress();
}
function SaveProgress(){
	//save the progress to firebase
}

function logout(){
	//log user out and show credits page
}

