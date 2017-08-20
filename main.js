'use strict';
// console.log("writing to screen");

var level = 'one';

var selectSound = new Audio('audio/select.wav');
var back = new Audio('audio/back.wav');
var pika = new Audio('audio/pikachu.wav');
var wrongAudio = new Audio('audio/wrong.wav');

$('#saveProgressButton').click(function(){
	back.play();
})


let userInfo = null;


/*Welcome page functions*/
function Authenticate(){
  loginUser()
  .then( (data) => {
  	//check firebase for credentials
    getUserInfo(data.user.uid)
    .then( (userData) => {
      let FBKey = Object.keys(userData)[0];
    	//if user exists - bring back progress, scores, etc.
      if (userData[FBKey]) {
        //userData should be all relevant info, where are we storing it?
        console.log('we have a user', userData);
        showMainPage();
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
  pika.play();
});

function showMainPage() {
  $('#welcomeScreen').hide();
  $('#mainScreen').show();
  updateTotalPoints();
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
// ShowQuestion(level);
ShowQuestion(level);

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
	selectSound.play();
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
		$('#levelUpModal').modal('show');
		
	}else{
		GetQuestions();
	}

	//render the correct progress on the progress bar
}

function updateTotalPoints() {
  let pointTotal = userInfo.points.reduce(function(a,b) {
    return a + b;
  });
  $('#totalPoints').text(pointTotal);
}


//Event Handlers for Level buttons
//load and render the level that is clicked
$("#level1Btn").on('click', () => {
	console.log("in level button click 1");
	level = 'one';
	GetQuestions('one').then(function (level_questions) {
		ShowQuestion(level);
	})
});

$("#level2Btn").on('click', () => {
	console.log("in level button click 2");
	level = 'two';
	GetQuestions('two').then(function (level_questions) {
		ShowQuestion(level);
	})
});

$("#level3Btn").on('click', () => {
	console.log("in level button click 3");
	level = 'three';
	GetQuestions('three');
});

$("#level4Btn").on('click', () => {
	console.log("in level button click 4");
	level = 'four';
	GetQuestions('four');
});


function ShowQuestion(level){
	GetQuestions(level).then(function (level_questions) {
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



//opens model with badge and congrats
function LevelUp(level) {
	level++;
	SaveProgress();
}


function SaveProgress(){
	//save the progress to firebase
}


function logout(){
	//log user out and show credits page
	$("#mainScreen").hide();
	$("#endScreen").show();
	back.play();
}

// Click event listener for 'DONE' button at bottom of page
$("#doneBtn").on('click',logout);

