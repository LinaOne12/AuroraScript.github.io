document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");

  const startButton = document.getElementById("startButton");
  const pauseButton = document.getElementById("pauseButton");
  const resetButton = document.getElementById("resetButton");
  const currentRound = document.getElementById("currentRound");
  const currentScore = document.getElementById("currentScore");

  const playerColorInput = document.getElementById("playerColorInput");
  const obstacleColorInput = document.getElementById("obstacleColorInput");
  const resetPlayerColorBtn = document.getElementById("resetPlayerColorBtn");
  const resetObstacleColorBtn = document.getElementById("resetObstacleColorBtn");
  const toggleCursorBtn = document.getElementById("toggleCursorBtn");

  const backgroundMusic = document.getElementById("backgroundMusic");

  const player = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 50,
    width: 50,
    height: 50,
    color: playerColorInput.value,
    speed: 6,
    direction: 0,
  };

  let gameStarted = false;
  let gamePaused = false;
  let round = 0;
  let score = 0;
  let obstacles = [];
  let animationId;

  function updatePlayer() {
    player.x += player.direction * player.speed;

    if (player.x < 0) {
      player.x = 0;
    } else if (player.x + player.width > canvas.width) {
      player.x = canvas.width - player.width;
    }
  }

  function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
  }

  function updateObstacles() {
    if (Math.random() < 0.02 + round / 1000) {
      const obstacle = {
        x: Math.random() * (canvas.width - 50),
        y: 0,
        width: 50,
        height: 50,
        color: obstacleColorInput.value,
        speed: 3 + round / 100,
      };
      obstacles.push(obstacle);
    }

    for (let i = 0; i < obstacles.length; i++) {
      obstacles[i].y += obstacles[i].speed;

      if (detectCollision(player, obstacles[i])) {
        stopGame();
        showGameOver();
        return;
      }

      if (obstacles[i].y > canvas.height) {
        obstacles.splice(i, 1);
        i--;
        score++;
        currentScore.textContent = "Score: " + score;
      }
    }
  }

  function drawObstacles() {
    for (let i = 0; i < obstacles.length; i++) {
      ctx.fillStyle = obstacles[i].color;
      ctx.fillRect(
        obstacles[i].x,
        obstacles[i].y,
        obstacles[i].width,
        obstacles[i].height
      );
    }
  }

  function detectCollision(object1, object2) {
    return (
      object1.x < object2.x + object2.width &&
      object1.x + object1.width > object2.x &&
      object1.y < object2.y + object2.height &&
      object1.y + object1.height > object2.y
    );
  }

  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function draw() {
    clearCanvas();
    drawPlayer();
    drawObstacles();

    if (!gamePaused) {
      updatePlayer();
      updateObstacles();
    }

    if (gameStarted) {
      animationId = requestAnimationFrame(draw);
    }
  }

  function startGame() {
    if (!gameStarted) {
      gameStarted = true;
      gamePaused = false;
      round = 0;
      score = 0;
      obstacles = [];
      currentRound.textContent = "Round: " + round;
      currentScore.textContent = "Score: " + score;
      startButton.disabled = true;
      pauseButton.disabled = false;
      resetButton.disabled = true;

      backgroundMusic.currentTime = 0; // Reset music to the beginning
      backgroundMusic.play();
      draw();
    }
  }

  canvas.style.backgroundColor = "#313131";

  function pauseGame() {
    if (gameStarted && !gamePaused) {
      gamePaused = true;
      pauseButton.textContent = "Resume";
      backgroundMusic.pause();
      cancelAnimationFrame(animationId);
      showGamePaused(); // Display "Game Paused" message
    } else if (gameStarted && gamePaused) {
      gamePaused = false;
      pauseButton.textContent = "Pause";
      backgroundMusic.play();
      hideGamePaused(); // Hide "Game Paused" message
      draw();
    }
  }
  
  function showGamePaused() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, canvas.height / 2 - 30, canvas.width, 60);
    ctx.fillStyle = "#FFF";
    ctx.font = "30px Arial";
    ctx.fillText("Game Paused!", canvas.width / 2 - 95, canvas.height / 2 + 10);
  }
  
  
  function hideGamePaused() {
    clearCanvas();
  }
  

  function stopGame() {
    gameStarted = false;
    gamePaused = false;
    startButton.disabled = false;
    pauseButton.disabled = true;
    resetButton.disabled = false;
    backgroundMusic.pause();
    cancelAnimationFrame(animationId);
  }

  function showGameOver() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, canvas.height / 2 - 30, canvas.width, 60);
    ctx.fillStyle = "#FFF";
    ctx.font = "30px Arial";
    ctx.fillText("Game Over!", canvas.width / 2 - 80, canvas.height / 2 + 10);
  }

  function resetGame() {
    stopGame();
    clearCanvas();
    player.color = playerColorInput.value;
    obstacles = [];
    currentRound.textContent = "Round: 0";
    currentScore.textContent = "Score: 0";
  }

  function applySettings() {
    player.color = playerColorInput.value;
    backgroundMusic.volume = difficulty.value === "easy" ? 0.2 : 0.5;
  }

  function resetPlayerColor() {
    playerColorInput.value = "#00D5FF";
    player.color = "#00D5FF";
  }

  function resetObstacleColor() {
    obstacleColorInput.value = "#FF0000";
  }

  function toggleCursorVisibility() {
    var bodyElement = document.getElementsByTagName("body")[0];
    bodyElement.style.cursor = bodyElement.style.cursor === "none" ? "default" : "none";
  }

  function handleKeydown(event) {
    if (event.key === "ArrowLeft" || event.key === "Left") {
      player.direction = -1;
    } else if (event.key === "ArrowRight" || event.key === "Right") {
      player.direction = 1;
    } else if (event.key === "q" || event.key === "Q") {
      toggleCursorVisibility();
    } else if (event.key === "e" || event.key === "E") {
      startGame();
    } else if (event.key === "r" || event.key === "R") {
      pauseGame();
    } else if (event.key === "t" || event.key === "T") {
      resetGame();
    } else if (event.key === "y" || event.key === "Y") {
      toggleCursorVisibility();
    }
  }


  function handleKeyup(event) {
    if (
      (event.key === "ArrowLeft" || event.key === "Left") &&
      player.direction === -1
    ) {
      player.direction = 0;
    } else if (
      (event.key === "ArrowRight" || event.key === "Right") &&
      player.direction === 1
    ) {
      player.direction = 0;
    }
  }

  startButton.addEventListener("click", startGame);
  pauseButton.addEventListener("click", pauseGame);
  resetButton.addEventListener("click", resetGame);
  playerColorInput.addEventListener("input", applySettings);
  obstacleColorInput.addEventListener("input", applySettings);
  resetPlayerColorBtn.addEventListener("click", resetPlayerColor);
  resetObstacleColorBtn.addEventListener("click", resetObstacleColor);
  toggleCursorBtn.addEventListener("click", toggleCursorVisibility);
  document.addEventListener("keydown", handleKeydown);
  document.addEventListener("keyup", handleKeyup);
});