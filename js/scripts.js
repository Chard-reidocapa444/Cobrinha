let canvas = document.getElementById("snake"); 
let context = canvas.getContext("2d"); 
let box = 32;
let snake = []; 
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "d";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG(){
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box); 
}

function criarCobrinha(){
    for(let i = 0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update);

function update(event){
    if((event.keyCode == 37 || event.keyCode == 65) && direction != 'd') direction = 'a'; // Left
    if((event.keyCode == 38 || event.keyCode == 87) && direction != 's') direction = 'w'; // Up
    if((event.keyCode == 39 || event.keyCode == 68) && direction != 'a') direction = 'd'; // Right
    if((event.keyCode == 40 || event.keyCode == 83) && direction != 'w') direction = 's'; // Down
}

function iniciarJogo(){    
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "d") snakeX += box;
    if(direction == "a") snakeX -= box;
    if(direction == "w") snakeY -= box;
    if(direction == "s") snakeY += box;


    if (snakeX < 0 || snakeX >= 16 * box || snakeY < 0 || snakeY >= 16 * box) {
        clearInterval(jogo);
        alert('Game Over :(');
        return;
    }

    for(let i = 1; i < snake.length; i++){
        if(snakeX == snake[i].x && snakeY == snake[i].y){
            clearInterval(jogo);
            alert('Game Over :(');
            return;
        }
    }

    criarBG();
    criarCobrinha();
    drawFood();

    if(snakeX != food.x || snakeY != food.y){
        snake.pop(); 
    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

let jogo = setInterval(iniciarJogo, 200);
