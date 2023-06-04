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
    if (player.direction === -1 && player.x > 0) {
      player.x -= player.speed;
    } else if (
      player.direction === 1 &&
      player.x < canvas.width - player.width
    ) {
      player.x += player.speed;
    }
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
      return; // Ignore key press if game is already running
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
        y: -(Math.random() * 200),
        width: 50,
        height: 50,
        color: obstacleColorInput.value,
        speed: 2,
      };
      obstacles.push(obstacle);
    }

    gameStarted = true;
    gamePaused = false;
    update();

    // Play the background music
    backgroundMusic.currentTime = 0;
    backgroundMusic.loop = true;
    backgroundMusic.play();
  }

  function pauseGame() {
    if (gamePaused) {
      pauseButton.textContent = "Pause";
      gamePaused = false;
      update();

      // Resume the background music
      backgroundMusic.play();
    } else {
      if (gameStarted) {
        pauseButton.textContent = "Resume";
        gamePaused = true;

        // Pause the background music
        backgroundMusic.pause();
      }
    }
  }

  function stopGame() {
    startButton.disabled = false;
    pauseButton.disabled = true;
    resetButton.disabled = true;
    gameStarted = false;
    cancelAnimationFrame(animationId);

    // Pause the background music
    backgroundMusic.pause();
  }

  function resetGame() {
    stopGame();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Pause the background music
    backgroundMusic.pause();
  }

  function drawGameOverText() {
    // Disable the pause button
    pauseButton.disabled = true;

    ctx.font = "30px Arial";
    ctx.fillStyle = "#ff0000";
    ctx.textAlign = "center";
    ctx.fillText("You Died", canvas.width / 2, canvas.height / 2);
  }

  startButton.addEventListener("click", startGame);
  pauseButton.addEventListener("click", pauseGame);
  resetButton.addEventListener("click", resetGame);

  playerColorInput.addEventListener("change", function () {
    player.color = playerColorInput.value;
  });

  obstacleColorInput.addEventListener("change", function () {
    obstacleColorInput.value;
    obstacles.forEach(function (obstacle) {
      obstacle.color = obstacleColorInput.value;
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "e" || event.key === "E") {
      startGame();
    } else if (event.key === "r" || event.key === "R") {
      pauseGame();
    } else if (event.key === "t" || event.key === "T") {
      resetGame();
    } else if (event.key === "ArrowLeft") {
      player.direction = -1;
    } else if (event.key === "ArrowRight") {
      player.direction = 1;
    }
  });

  document.addEventListener("keyup", function (event) {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      player.direction = 0;
    }
  });

  let isTouching = false;

  // Touch events for mobile devices
  canvas.addEventListener("touchstart", function (event) {
    event.preventDefault();
    startGame();
    isTouching = true;
  });

  canvas.addEventListener("touchend", function (event) {
    event.preventDefault();
    pauseGame();
    isTouching = false;
  });

  canvas.addEventListener("touchmove", function (event) {
    event.preventDefault();
    if (!isTouching) return;
    
    const touchX = event.touches[0].clientX;
    const touchY = event.touches[0].clientY;
    const canvasRect = canvas.getBoundingClientRect();

    player.x = touchX - canvasRect.left - player.width / 2;
    player.y = touchY - canvasRect.top - player.height / 2;

    // Keep the player within the canvas bounds
    if (player.x < 0) {
      player.x = 0;
    } else if (player.x + player.width > canvas.width) {
      player.x = canvas.width - player.width;
    }

    if (player.y < 0) {
      player.y = 0;
    } else if (player.y + player.height > canvas.height) {
      player.y = canvas.height - player.height;
    }
  });

  canvas.addEventListener("touchcancel", function (event) {
    event.preventDefault();
    isTouching = false;
  });
});
