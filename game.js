var btnColor = ["red", "blue", "yellow", "green"];
var game_rec = [];
var user_rec = [];
var level = 0;
var best = 0;

$(document).on("keypress", function(event) {
    if(event.key !== 'i' && event.key !== 'o' && event.key !== 'k' && event.key !== 'l'){
        if(level === 0){
            nextSequence();
        }
    }
});


$(".btn").click(function(){
    if(level !== 0){
        user_rec.push(this.id);
        soundPlay(this.id);
        animate(this.id);
        check(user_rec.length-1);        
    }
});

$(document).keypress(function(event){ 
    if(event.key === 'i' || event.key === 'o' || event.key === 'k' || event.key === 'l'){
        if(level !== 0){
            var x = "";
            if(event.key === 'k')
                x = "red";
            else if(event.key === 'o')
                x = "blue";
            else if(event.key === 'i')
                x = "yellow";
            else if(event.key === 'l')
                x = "green";

            user_rec.push(x);
            soundPlay(x);
            animate(x);
            check(user_rec.length-1);        
        }
    }    
});

function check(currentLevel) {

    if((game_rec[currentLevel] === user_rec[currentLevel]) && (game_rec.length === user_rec.length) ){
            setTimeout(() => {
                nextSequence();
            }, 1000);   
    }
    else if(game_rec[currentLevel] !== user_rec[currentLevel]){
        $("h1").text("Game Over, Press Any Key / Press Play to Restart");
        soundPlay("wrong");
        $(".gameBox").addClass("gameOver");
        setTimeout(() => {
            $(".gameBox").removeClass("gameOver");
        }, 100);
        
        startAgain();

    }
    else{

    }
}

function nextSequence(){
    user_rec = [];
    level++;
    $("h1").text("Level: " + level);
    var randomChosice = Math.floor(4* Math.random());
    var flag = btnColor[randomChosice];
    game_rec.push(flag);

    soundPlay(flag);
    $("."+flag).animate({opacity : "0"}).delay(75).animate({opacity : "1"});
}


function soundPlay(file) {
    var audio = new Audio("sounds/"+file+".mp3");
    audio.play();
}
function animate(cls) {
    $("#"+cls).addClass("pressed");
    setTimeout(() => {
        $("#"+cls).removeClass("pressed");
    }, 100);
}

function startAgain() {
    if(best < level){
        best = level
         $(".score").text("Your Best: "+best);
    }
    level = 0;
    game_rec = [];
}

$(".rules").hide();
$("#ruleBtn").click(function () {
    animate("ruleBtn");
    $(".rules").slideToggle();
});

$("#play").click(function () {
    if(level === 0){
        nextSequence();
    }
})