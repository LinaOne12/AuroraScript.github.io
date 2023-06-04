document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");
  const startButton = document.getElementById("startButton");
  const pauseButton = document.getElementById("pauseButton");
  const resetButton = document.getElementById("resetButton");
  const currentRound = document.getElementById("currentRound");
  const currentScore = document.getElementById("currentScore");
  const difficulty = document.getElementById("difficulty");
  const playerColorInput = document.getElementById("playerColorInput");
  const obstacleColorInput = document.getElementById("obstacleColorInput");
  const backgroundMusic = new Audio("Unknown Brain x Rival - Control (ft. Jex) [Lyric Video].mp3");

  let round = 0;
  let score = 0;
  let gameStarted = false;
  let gamePaused = false;
  let animationId = null;

  // Add game background color
  canvas.style.backgroundColor = "#313131";

  const player = {
    x: canvas.width / 2,
    y: canvas.height - 30,
    width: 30,
    height: 30,
    color: playerColorInput.value,
    speed: 6,
    direction: 0,
  };

  let obstacles = [];

  function drawPlayer() {
    ctx.beginPath();
    ctx.rect(player.x, player.y, player.width, player.height);
    ctx.fillStyle = player.color;
    ctx.fill();
    ctx.closePath();
  }

  function drawObstacles() {
    obstacles.forEach(function (obstacle) {
      ctx.beginPath();
      ctx.rect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
      ctx.fillStyle = obstacle.color;
      ctx.fill();
      ctx.closePath();
    });
  }

  function updatePlayer() {
    player.x += player.direction * player.speed;

    if (player.x < 0) {
      player.x = 0;
    } else if (player.x > canvas.width - player.width) {
      player.x = canvas.width - player.width;
    }

    player.y = canvas.height - player.height; // Set player's y-coordinate to the bottom of the canvas
  }

  function updateObstacles() {
    obstacles.forEach(function (obstacle) {
      obstacle.y += obstacle.speed;

      if (obstacle.y > canvas.height) {
        obstacle.x = Math.random() * (canvas.width - obstacle.width);
        obstacle.y = -obstacle.height;
        obstacle.color = obstacleColorInput.value;
        increaseDifficulty();
        round++;
        currentRound.textContent = "Round: " + round;
      }
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawObstacles();
  }

  function update() {
    if (!gameStarted || gamePaused) {
      return;
    }

    updatePlayer();
    updateObstacles();
    draw();

    obstacles.forEach(function (obstacle) {
      if (
        player.x < obstacle.x + obstacle.width &&
        player.x + player.width > obstacle.x &&
        player.y < obstacle.y + obstacle.height &&
        player.y + player.height > obstacle.y
      ) {
        stopGame();
        drawGameOverText();
        return;
      }
    });

    animationId = requestAnimationFrame(update);
  }

  function increaseDifficulty() {
    switch (difficulty.value) {
      case "easy":
        obstacles.forEach(function (obstacle) {
          obstacle.speed += 0.2;
        });
        break;
      case "normal":
        obstacles.forEach(function (obstacle) {
          obstacle.speed += 0.4;
        });
        break;
      case "hard":
        obstacles.forEach(function (obstacle) {
          obstacle.speed += 0.6;
        });
        break;
    }
  }

  function startGame() {
    if (gameStarted) {
      return; // Ignore button press if game is already running
    }

    startButton.disabled = true;
    pauseButton.disabled = false;
    resetButton.disabled = false;
    player.color = playerColorInput.value;

    round = 0;
    score = 0;
    currentRound.textContent = "Round: " + round;
    currentScore.textContent = "Score: " + score;

    obstacles = [];

    for (let i = 0; i < 5; i++) {
      const obstacle = {
        x: Math.random() * (canvas.width - 50),
        y: Math.random() * (canvas.height - 30),
        width: 50,
        height: 30,
        color: obstacleColorInput.value,
        speed: 2,
      };

      obstacles.push(obstacle);
    }

    gameStarted = true;
    gamePaused = false;
    update();
    playBackgroundMusic();
  }

  function stopGame() {
    gameStarted = false;
    gamePaused = false;
    startButton.disabled = false;
    pauseButton.disabled = true;
    resetButton.disabled = true;
    cancelAnimationFrame(animationId);
  }

  function pauseGame() {
    if (!gameStarted) {
      return; // Ignore button press if game is not running
    }

    gamePaused = !gamePaused;
    if (gamePaused) {
      pauseButton.textContent = "Resume";
    } else {
      pauseButton.textContent = "Pause";
      update();
    }
  }

  function resetGame() {
    stopGame();
    startGame();
  }

  function drawGameOverText() {
    ctx.font = "48px sans-serif";
    ctx.fillStyle = "#FFFFFF";
    ctx.textAlign = "center";
    ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
  }

  function playBackgroundMusic() {
    backgroundMusic.play();
  }

  function applySettings() {
    player.color = playerColorInput.value;

    obstacles.forEach(function (obstacle) {
      obstacle.color = obstacleColorInput.value;
    });
  }

  startButton.addEventListener("click", startGame);
  pauseButton.addEventListener("click", pauseGame);
  resetButton.addEventListener("click", resetGame);
  applySettingsButton.addEventListener("click", applySettings);

  // Mobile touch controls
  const leftArrow = document.getElementById("leftArrow");
  const rightArrow = document.getElementById("rightArrow");

  function handleTouchStart(event) {
    const touch = event.touches[0];
    const touchX = touch.clientX;

    if (touchX < window.innerWidth / 2) {
      player.direction = -1; // Move left
    } else {
      player.direction = 1; // Move right
    }
  }

  function handleTouchEnd() {
    player.direction = 0; // No movement
  }

  leftArrow.addEventListener("touchstart", handleTouchStart);
  leftArrow.addEventListener("touchend", handleTouchEnd);
  rightArrow.addEventListener("touchstart", handleTouchStart);
  rightArrow.addEventListener("touchend", handleTouchEnd);
});
