var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var isGamesStarted = false;

$(document).on("keydown", function(e) {
    if(!isGamesStarted) {
        $("#level-title").text("Level " + level);
        newSequence();
        isGamesStarted = true;
    }
})

$(".btn").on("click", function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);

    console.log("user clicked pattern: " + userClickedPattern);
});

function newSequence() {
    level++;

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

    console.log("game pattern: " + gamePattern);
}

function playSound(name) {
    var colorSound = new Audio("sounds/" + name + ".mp3");
    colorSound.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    console.log(currentLevel);
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        setTimeout(function() {
            newSequence();
        }, 1000);
        userClickedPattern = [];
    } else {
        console.log("wrong");
    }
}