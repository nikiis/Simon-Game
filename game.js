// alert("hello");

var gamePattern = [];
userClickedPattern = [];
var level = 0;
var started = false;
var buttonColours = ["red", "blue", "green", "yellow"];

//detect keyboard press and call nextsequence if the game has not started
$(document).keypress(function () {
    if (!started) {
        //h1 should say Level 0
        $("#level-title").html("Level " + level);
        nextSequence();
        started = true;
    }
});


$(".btn").click(function () {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
    //reset userClickPattern to be empty
    userClickedPattern = [];
    // increment level and display it 
    level++;
    $("#level-title").html("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];

    // adding the random colour to the list of game pattern
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

    // play audio
    playSound(randomChosenColour);

    console.log("game pattern " + gamePattern);
    // return gamePattern;

}

function playSound(name) {
    soundFile = "sounds/" + name + ".mp3";
    var audio = new Audio(soundFile);
    audio.play();
}

function animatePress(currentColour) {
    $("." + currentColour).addClass("pressed");
    setTimeout(function () {
        $("." + currentColour).removeClass('pressed');
        //....and whatever else you need to do
    }, 100);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
                //....and whatever else you need to do
            }, 1000);
        }
    } else {
        console.log("wrong")
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass('game-over');
            //....and whatever else you need to do
        }, 200);
        $("#level-title").html("Game Over, Press any Key to Restart")
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}