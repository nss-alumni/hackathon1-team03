// 'use strict';
// console.log("writing to screen");

var level = '1';
var current_goal;

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



function isCorrect(event){
    console.log("Event: ", event);
}

$('.optionCard').click(function(event) {
    $(this).removeClass('optionCard');
    $(this).addClass('wronganswer');
    var is_correct = 0;
    if (event.currentTarget.children[1].children[0].innerHTML == current_goal){
        is_correct =  1;
    }
    DisplayAnswer(event);
    CheckAnswer(is_correct);
});


function DisplayAnswer(event){
    var toCurrent = $("p", event.target)[0];

    var current_level = $("#hidden_current_level").html();



    GetQuestions(current_level).then(function (level_questions) {
        current_level = parseInt(current_level);
        console.log("LEVEL: ", current_level);
        current_goal = level_questions[current_level].goal
      switch(level_questions[current_level].type) {
        case 1 : $('#current').attr("style", toCurrent.innerHTML);
            break;
        case 2 : $('#current').append(toCurrent.innerHTML);
            break;
        default:
            alert('ERROR');
        }
	})
}


function CheckAnswer(is_correct){
    console.log("IS CORRECT: ", is_correct);
    var totalPoint = $('#qPoints').html();
    totalPoint = parseInt(totalPoint);
    console.log("Points: ", totalPoint);
	var CheckAnswer = is_correct;
	if (CheckAnswer == 1){
		progressBar += totalPoint;
    checkProgress();
    //add totalPoint to current level points
    let currentLevel = $("#hidden_current_level").html();
    let currentLevelPoints = userInfo.points[(parseInt(currentLevel) - 1)];
    userInfo.points[(parseInt(currentLevel) - 1)] = currentLevelPoints + totalPoint;
    updateTotalPoints();
    $('#qPoints').text('25');
  }else{
    totalPoint = totalPoint - 5;
    $('#qPoints').html(totalPoint);
  }
  return totalPoint;
}

$("#level-up").on('click', function(res){
  $('#levelUpModal').modal('hide');
  var current_level = $("#hidden_current_level").html();
  $(".card").removeClass('wronganswer');
  $(".card").addClass('optionCard');


  ShowQuestion(current_level);

  // current_level = parseInt(current_level);

  // $("#hidden_current_level").html(current_level+1);

});

var progressBar = 0;
function checkProgress() {
    var total_points = getTotalPoints()
    // var total_points = 78;
    let currentLevel = parseInt($("#hidden_current_level").html());
    let levelPoints = userInfo.points[(currentLevel - 1)];
	if (levelPoints > 99){
    $("#hidden_current_level").html(currentLevel + 1);
		$('#levelUpModal').modal('show');
	}else{

    var current_level = parseInt($("#hidden_current_level").html());
		GetQuestions(current_level).then( function(response){
        // current_level += 1;
        current_level = '2';
        $(".card").removeClass('wronganswer');
        $(".card").addClass('optionCard');
        ShowQuestion(current_level);

    });

	}

	//render the correct progress on the progress bar
}

function getTotalPoints() {
  let pointTotal = userInfo.points.reduce(function(a,b) {
    return a + b;
  });
  return pointTotal;
}

function updateTotalPoints() {
  let pointTotal = getTotalPoints();
  $('#totalPoints').text(pointTotal);
  updateUserInfo({points: userInfo.points});
}


//Event Handlers for Level buttons
//load and render the level that is clicked
$("#level1Btn").on('click', () => {
	console.log("in level button click 1");

	level = '1';
	GetQuestions(level).then(function (level_questions) {
		ShowQuestion(level);
	})
});

$("#level2Btn").on('click', () => {
	console.log("in level button click 2");
	level = '2';
	GetQuestions(level).then(function (level_questions) {
		ShowQuestion(level);
	})
});

$("#level3Btn").on('click', () => {
	console.log("in level button click 3");
	level = '3';
	GetQuestions(level);

});

$("#level4Btn").on('click', () => {
	console.log("in level button click 4");
	level = '4';

	GetQuestions(level);
});


function ShowQuestion(level){


  $("#current").attr("style", "");
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

        current_goal = level_questions[rand_question_index-1].goal;

        $('#goal').attr("style", current_goal);




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
	GetQuestions('1').then(function (level_questions) {
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



function isCorrect(){

}