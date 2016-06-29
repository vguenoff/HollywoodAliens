function init() {
    // GUI
    var circle = document.querySelector(".circle"),
        line = document.querySelector(".line"),
        alien = document.querySelector(".alien"),
        focus = document.querySelector(".focus"),
        output = document.querySelector(".output"),
        fullOutput = document.querySelector(".full-output"),
        finalMessage = document.querySelector(".final-message");

    // game vars
    var circleLeft = 285,
        circleTop = 120,
        lineTop = 195,
        alienTop = 310,
        alienLeft = 0,
        gameWon = false,
        movesLeft = 11;
    // listeners
    window.addEventListener("keydown", enterKey, false);
    function enterKey(event) {
        if (circleLeft >= 0 &&
            circleLeft <= 560 && 
            circleTop >= 0 && 
            circleTop <= 240 ) {
            
            switch(event.keyCode) {
                case 37: //left
                    circle.style.left = circleLeft - 15 + "px";
                    circleLeft -= 15;
                    console.log("circleLeft", circleLeft);
                    break;
                case 38: //up
                    circle.style.top = circleTop - 15 + "px";
                    circleTop -= 15;
                    line.style.top = lineTop - 15 +  "px";
                    lineTop -= 15;
                    console.log("circleTop", circleTop);
                    break;
                case 39: //right
                    circle.style.left = circleLeft + 15 + "px";
                    circleLeft += 15;
                    console.log("circleLeft", circleLeft);
                    break;
                case 40: //down
                    circle.style.top = circleTop + 15 + "px";
                    circleTop += 15;
                    line.style.top = lineTop + 15 +  "px";
                    lineTop += 15;
                    console.log("circleTop", circleTop);
                    break;
                case 32: //space
                    focus.style.background = "rgba(255, 255, 255, 0.15)";
                    alien.style.opacity = "0";
                    setTimeout(function(){
                        focus.style.background = "rgba(255, 255, 255, 0.1)";
                        alien.style.opacity = "1";
                    }, 100);
                    render();
                    break;
            }
        }

        if (circleLeft < 0) {
            circleLeft = 0;
        }
        else if (circleLeft > 560) {
            circleLeft = 560;
        }
        else if (circleTop < 0) {
            circleTop = 0;
            lineTop = 75;
        }
        else if (circleTop > 240) {
            circleTop = 240;
            lineTop = 315;
        }
    }
    // game logic
    function render() {
        alienLeft = Math.round(Math.random() * 616);
        alien.style.top = alienTop + "px";
        alien.style.left = alienLeft + "px";
        console.log("alienTop", alienTop);
        console.log("alienLeft", alienLeft);

        if (alienLeft > circleLeft && 
            alienTop > circleTop && 
            circleLeft + 146 > alienLeft + 100 &&
            circleTop + 150 > alienTop + 75 ) {
            gameWon = true;
            endGame();
        }

        alienTop -= 30;
        if (alienTop < -50) {
            endGame();
        }

        output.innerHTML = movesLeft;
        movesLeft--;
        if (movesLeft < 0) {
            fullOutput.innerHTML = "No more tryes left!";
        }
    }

    //first load
    setTimeout(render, 1000);
    

    // end game logic 
    function endGame() {
        window.removeEventListener("keydown", enterKey, false);

        if (gameWon) {
            console.log("game won");
            finalMessage.innerHTML = "Congratulations!<br> You won!";
        }    
        else {
            console.log("game over");
            finalMessage.innerHTML = "Game Over";
        }    

        setTimeout(function(){
            focus.style.background = "rgba(0, 0, 0, 0.8";
            line.style.display = "none";
            alien.style.opacity = "0.1";
            circle.style.opacity = "0.1";
            finalMessage.style.opacity = "1";
        }, 200);
    }
}