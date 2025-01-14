var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

// Detecting key pressed
$(document).keypress(function(){
    if (!started){
        $("#level-title").text("Level"+level);
        nextSequence();
        started =  true;
    } 
});

// detecting the button clicked
$(".btn").on("click",function(){
    var userChosencolour = $(this).attr("id");
    userClickedPattern.push(userChosencolour);

    playSound(userChosencolour);
    animatePress(userChosencolour);

    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");

        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    } 
    else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
            },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function nextSequence(){

    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    // Adding flash effect
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    // Playing the audio for chosen color
    playSound(randomChosenColour);
    
}

// Adding Sounds to button clicks
function playSound(name){
    
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play(); 
}

// Adding animations to user clicks
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}

function startOver(){
    started = false;
    level = 0;
    gamePattern = [];
}