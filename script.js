score = 0;
crossed = true; 

audio = new Audio('music.mp3');
audiogor = new Audio('gameover.mp3');
setTimeout(() => {
    audio.play();
}, 1000);

document.onkeydown = function(e) {
    console.log("Key code is: ", e.key);
    if(e.key == 'ArrowUp' || e.key == 'w'){
         gorilla = document.querySelector('.gorilla');
         gorilla.classList.add('animateGorilla');
         setTimeout(()=>{
         gorilla.classList.remove('animateGorilla')
         },700);
    }
    if(e.key == 'ArrowRight' || e.key == 'd'){
        gorilla = document.querySelector('.gorilla');
        gorillaAtXAxis = parseInt(window.getComputedStyle(gorilla, null).getPropertyValue('left'));
        gorilla.style.left = (gorillaAtXAxis + 112) + "px";
    }
    if(e.key == 'ArrowLeft' || e.key == 'a'){
        gorilla = document.querySelector('.gorilla');
        gorillaAtXAxis = parseInt(window.getComputedStyle(gorilla, null).getPropertyValue('left'));
        gorilla.style.left = (gorillaAtXAxis - 112) + "px";
    }
}

setInterval(() => {
    gorilla = document.querySelector('.gorilla');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle'); 

    gx = parseInt(window.getComputedStyle(gorilla, null).getPropertyValue('left'));
    gy = parseInt(window.getComputedStyle(gorilla, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX = Math.abs(gx-ox);
    offsetY = Math.abs(gy-oy);
    // console.log(offsetX, offsetY);
    if(offsetX < 73 && offsetY <52){
        gameOver.style.visibility = 'visible';
        obstacle.classList.remove('obstacle12');
        audiogor.play();
        gameOver.innerHTML = "Game Over - Reload to Play Again"
        setTimeout(() => {
            audio.pause();
            
        }, 1000);
    }
    else if(offsetX < 145 && crossed){
        score += 1;
        ScoreUpdate(score);
        crossed = false;
        setTimeout(() => {
            crossed = true;
        }, 1000);
        setTimeout(() => {
            animationDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = animationDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';
            console.log('New animation duration: ', newDur);
        }, 500);
    
    }

}, 10);

function ScoreUpdate(score){
    scoreCount.innerHTML = "Your Score: " + score
}