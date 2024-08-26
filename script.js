const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const grid = 20;
let snake = [{ x: 160, y: 160 }];
let dx = grid;
let dy = 0;
let fruit = { x: 320, y: 320 };
let score = 0;

document.addEventListener('keydown', changeDirection);

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFruit();
    moveSnake();
    checkCollision();
    checkFruit();
}

function drawSnake() {
    ctx.fillStyle = 'green';
    for (let part of snake) {
        ctx.fillRect(part.x, part.y, grid, grid);
    }
}

function drawFruit() {
    ctx.fillStyle = 'red';
    ctx.fillRect(fruit.x, fruit.y, grid, grid);
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    snake.pop();
}

function changeDirection(event) {
    switch (event.code) {
        case 'ArrowUp':
            if (dy === 0) {
                dx = 0;
                dy = -grid;
            }
            break;
        case 'ArrowDown':
            if (dy === 0) {
                dx = 0;
                dy = grid;
            }
            break;
        case 'ArrowLeft':
            if (dx === 0) {
                dx = -grid;
                dy = 0;
            }
            break;
        case 'ArrowRight':
            if (dx === 0) {
                dx = grid;
                dy = 0;
            }
            break;
    }
}

function checkCollision() {
    const head = snake[0];
    
    // Wall collision
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        resetGame();
    }
    
    // Self collision
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            resetGame();
        }
    }
}

function checkFruit() {
    const head = snake[0];
    
    if (head.x === fruit.x && head.y === fruit.y) {
        score++;
        snake.push({ ...snake[snake.length - 1] }); // Add new segment
        fruit = {
            x: Math.floor(Math.random() * (canvas.width / grid)) * grid,
            y: Math.floor(Math.random() * (canvas.height / grid)) * grid,
        };
    }
}

function resetGame() {
    snake = [{ x: 160, y: 160 }];
    dx = grid;
    dy = 0;
    fruit = { x: 320, y: 320 };
    score = 0;
}

setInterval(draw, 100);
