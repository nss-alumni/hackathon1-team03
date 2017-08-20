'use strict';
console.log("writing to screen");


// var config = {
//     apiKey: FbCreds.apiKey,
//     authDomain: FbCreds.authDomain
//   };

// firebase.initializeApp(config);
// var provider = new firebase.auth.GoogleAuthProvider();



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
	return new Promise ( (resolve, reject) => {
        $.getJSON("questions.json", function(json) {
            if (json){
            	console.log("JSON: ", json);
                resolve(json[level])
            }else{
                reject(false)
            }
	    });
	})
}
NextQuestion();

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
	$('#current').html(toCurrent.innerHTML)
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
	// Get the questions from JSON
	GetQuestions('one').then(function (level_questions) {
		// Random number (1-4) used to randomly choose a question
		var rand_question_index = Math.floor((Math.random() * 4) + 1);
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


function LevelUp() {
	//opens model with badge and congratse
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