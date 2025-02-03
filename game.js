var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

function newSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+ gamePattern).fadeIn(100).fadeOut(100).fadeIn(100);
    var colorSound = new Audio("sounds/" + gamePattern + ".mp3");
    colorSound.play();
}

$(".btn").on("click", function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
})

console.log(userClickedPattern);