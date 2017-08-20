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
        //userData should be all relevant info, where are we storing it?
      } else { //if not user - create new user
        createUserInfo();
      }
    })
    .catch( (error) => {
      console.log('error authenticating', error);
    });
  })
  .catch( (error) => {
    console.log('error loggin in', error);
  })
	//route to main app page
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
NextQuestion('one');

function RandomizeQuestionOrder(){
	//take the question and randomize the order of the options
	//choose an option to use for the goal display
	//render the options on the cards
}

//Add event listener to card
$('.optionCards').on("click", ".optionCard", function() {
	console.log('this', this)
	DisplayAnswer(event);
	CheckAnswer();
	$(this).removeClass('optionCard');
	$(this).addClass('wronganswer')
});

function DisplayAnswer(event){
	var toCurrent = $("p", event.target)[0];
	console.log("toCurrent", toCurrent.innerHTML);
	GetQuestions('one').then(function (level_questions) {
	switch(level_questions[0].type) {
    case 1 : $('#current').attr("style", toCurrent.innerHTML);
        break;
    case 2 : $('#current').append(toCurrent.innerHTML);
        break;
    default:
        alert('ERROR');
    }
	})
}
function CheckAnswer(){
var totalPoint = $('#qPoints').html();
totalPoint = parseInt(totalPoint);
	var CheckAnswer = 1;
	if (CheckAnswer == 0){
		ProgressBar += totalPoint;
		ProgressBar();
		$('#qPoints').html('<p>25</p>');
	}else{
		totalPoint = totalPoint - 5;
		$('#qPoints').html(totalPoint);
		console.log('totalPoint', totalPoint)
		console.log("event.target", $("p", event.target))
	}
		return totalPoint;
	//onclick of a card this function checks if the answer is correct
	//totalPoint starts at 25
	//if correct - then add  points to total and move to next question
	//if not correct - then subtract 5 points from the question score and mark the answer as unavailable
}

var ProgressBar = 0;
function ProgressBar() {
	if (ProgressBar > 99){
		LevelUp();
	}else{
		GetQuestions();
	}

	//render the correct progress on the progress bar
}

function LevelTabs(level){
	//load and render the level that was clicked
}


function NextQuestion(){
	GetQuestions('one').then(function (level_questions) {
		// console.log("JSON2: ", level_questions);
		// Set new instructions
		$("#instructions").html(level_questions.instruction);
		// Set the 4 options
		// Need to randomize the 0 index so we are randomizing questions
	    $("#option1").html(level_questions[0].options[0]);
	    $("#option2").html(level_questions[0].options[1]);
	    $("#option3").html(level_questions[0].options[2]);
	    $("#option4").html(level_questions[0].options[3]);
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
		$('#goal').attr("style", level_questions.goal);
	})
}
getGoal();


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

