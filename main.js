'use strict';
// console.log("writing to screen");


// var config = {
//     apiKey: FbCreds.apiKey,
//     authDomain: FbCreds.authDomain
//   };

// firebase.initializeApp(config);
// var provider = new firebase.auth.GoogleAuthProvider();



/*Welcome page functions*/
function Authenticate(){
  loginUser()
  .then( (data) => {
  	//check firebase for credentials
    getUserInfo(data.user.uid)
    .then( (userData) => {
      console.log('userData', userData);
      let FBKey = Object.keys(userData)[0];
    	//if user exists - bring back progress, scores, etc.
      if (userData[FBKey]) {
        console.log('we have a user', userData);
        showMainPage();
        //userData should be all relevant info, where are we storing it?
      } else { //if not user - create new user
        $("#usernameEntry").show();
        $('#signInButton').off('click');
        $('#signInButton').on('click', function() {
          let username = $("#userName").val();
          createUserInfo(username)
          .then( (newUserData) => {
            getUserInfo(data.user.uid);
          	//route to main app page
            showMainPage();
          })
          .catch( (err) => {console.log('err', err); });
        });
      }
    })
    .catch( (error) => {
      console.log('error authenticating', error);
    });
  });
}

$("#signInButton").on('click', function() {
  Authenticate();
});

function showMainPage() {
  $('#welcomeScreen').hide();
  $('#mainScreen').show();
}

function registerNewUser(username) {

}



function LoadUserSettings(user){
	//take the object from firebase with user information load the correct level/progress
  getUserInfo()
  .then( (userData) => {

  });
}

/*main page functions*/
function GetQuestions(level){
	return new Promise ( (resolve, reject) => {
        $.getJSON("questions.json", function(json) {
            if (json){
            	// console.log("JSON: ", json);
                resolve(json[level])
            }else{
                reject(false)
            }
	    });
	})
}
ShowQuestion('one');

function RandomizeQuestionOrder(){
	//take the question and randomize the order of the options
	//choose an option to use for the goal display
	//render the options on the cards
}

//Add event listener to card
$('.optionCard').click(function(event) {
	DisplayAnswer(event);
});
function DisplayAnswer(event){
	var toCurrent = $("p", event.target)[0];
	console.log("toCurrent", toCurrent.innerHTML);
	$('#current').attr("style", toCurrent.innerHTML);
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


//Event Handlers for Level buttons
//load and render the level that is clicked
$("#level1Btn").on('click', () => {
	console.log("in level button click 1");
	GetQuestions('one');

});$("#level2Btn").on('click', () => {
	console.log("in level button click 2");
	GetQuestions('two');

});$("#level3Btn").on('click', () => {
	console.log("in level button click 3");
	GetQuestions('three');

});$("#level4Btn").on('click', () => {
	console.log("in level button click 4");
	GetQuestions('four');
});


function ShowQuestion(){
	GetQuestions('one').then(function (level_questions) {
		// Get amount of questions to generate a random number
		var num_questions = level_questions.length;

		// Random number (1-4) used to randomly choose a question
		var rand_question_index = Math.floor((Math.random() * num_questions) + 1);

		// Array of numbers to randomly sort the options for the randomly selected question
		var random_options = [0, 1, 2, 3]
		// Randomize the order of the array created above
		random_options.sort(randOrd)

		// Set new instructions
		$("#instructions").html(level_questions[rand_question_index-1].instruction);
		// Set the 4 options
	    $("#option1").html(level_questions[rand_question_index-1].options[random_options[0]]);
	    $("#option2").html(level_questions[rand_question_index-1].options[random_options[1]]);
	    $("#option3").html(level_questions[rand_question_index-1].options[random_options[2]]);
	    $("#option4").html(level_questions[rand_question_index-1].options[random_options[3]]);
	})
}


function randOrd(){
  return (Math.round(Math.random())-0.5);
}


//GET GOAL BOX VALUE
function getGoal(){
	GetQuestions('one').then(function (level_questions) {
		console.log("JSON2: ", level_questions);
		$('#goal').css("background-color", level_questions[0].goal);

	})
}
getGoal();


function LevelUp() {
	//opens model with badge and congrats
	SaveProgress();
}


function SaveProgress(){
	//save the progress to firebase
}


function logout(){
	//log user out and show credits page
	$("#mainScreen").hide();
	$("#endScreen").show();
}



// Click event listener for 'DONE' button at bottom of page
$("#doneBtn").on('click',logout);

