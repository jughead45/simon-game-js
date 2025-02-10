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

    userClickedPattern = [];
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

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("correct");
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function() {
                newSequence();
            }, 1000);
        }
    } else {
        var wrongSound = new Audio("sounds/wrong.mp3");
        wrongSound.play();

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }

}

function startOver() {
    level = 0;
    gamePattern = [];
    isGamesStarted = false;
}