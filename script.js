document.addEventListener("DOMContentLoaded", function () {
  var canvas = document.getElementById("gameCanvas");
  var ctx = canvas.getContext("2d");
  var gameContainer = document.getElementById("gameContainer");
  var controlsBox = document.getElementById("controlsContainer");
  var settingsBox = document.getElementById("settingsContainer");
  var descriptionBox = document.getElementById("descriptionContainer");
  var startButton = document.getElementById("startButton");
  var pauseButton = document.getElementById("pauseButton");
  var resetButton = document.getElementById("resetButton");
  var currentRound = document.getElementById("currentRound");
  var autoStartToggle = document.getElementById("autoStartToggle");
  var currentScore = document.getElementById("currentScore");
  var difficulty = document.getElementById("difficulty");
  var playerColorInput = document.getElementById("playerColorInput");
  var obstacleColorInput = document.getElementById("obstacleColorInput");
  var round = 0;
  var score = 0;
  var startTime = null;
  var gameStarted = false;
  var gamePaused = false;
  var animationId = null;

  var player = {
    x: canvas.width / 2,
    y: canvas.height - 30,
    width: 30,
    height: 30,
    color: playerColorInput.value,
    speed: 6,
    direction: 0,
  };

  var obstacle = {
    x: 0,
    y: 0,
    width: 30,
    height: 30,
    color: obstacleColorInput.value,
    speed: 4,
  };

  function drawPlayer() {
    ctx.beginPath();
    ctx.rect(player.x, player.y, player.width, player.height);
    ctx.fillStyle = player.color;
    ctx.fill();
    ctx.closePath();
  }

  function drawObstacle() {
    ctx.beginPath();
    ctx.rect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    ctx.fillStyle = obstacle.color;
    ctx.fill();
    ctx.closePath();
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

  function updateObstacle() {
    obstacle.y += obstacle.speed;

    if (obstacle.y > canvas.height) {
      obstacle.x = Math.random() * (canvas.width - obstacle.width);
      obstacle.y = -obstacle.height;
      obstacle.color = obstacleColorInput.value;
      increaseDifficulty();
      round++;
      currentRound.textContent = "Round: " + round;
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawObstacle();
  }

  function update() {
    if (!gameStarted) {
      cancelAnimationFrame(animationId);
      return;
    }

    if (!gamePaused) {
      updatePlayer();
      updateObstacle();
      draw();

      if (
        player.x < obstacle.x + obstacle.width &&
        player.x + player.width > obstacle.x &&
        player.y < obstacle.y + obstacle.height &&
        player.y + player.height > obstacle.y
      ) {
        stopGame();
        return;
      }
    }

    animationId = requestAnimationFrame(update);
  }

  function increaseDifficulty() {
    switch (difficulty.value) {
      case "easy":
        obstacle.speed += 0.2;
        break;
      case "normal":
        obstacle.speed += 0.4
        break;
        case "hard":
          obstacle.speed += 0.6;
          break;
      }
    }
  
    function startGame() {
      startButton.disabled = true;
      pauseButton.disabled = false;
      resetButton.disabled = false;
      currentRound.textContent = "Round: 0";
      score = 0;
      currentScore.textContent = "Score: " + score;
      gameStarted = true;
      gamePaused = false;
      obstacle.speed = 4;
      obstacle.x = Math.random() * (canvas.width - obstacle.width);
      obstacle.y = -obstacle.height;
      obstacle.color = obstacleColorInput.value;
      round = 0;
      startTime = performance.now();
      animationId = requestAnimationFrame(update);
    }
  
    function stopGame() {
      startButton.disabled = false;
      pauseButton.disabled = true;
      resetButton.disabled = true;
      gameStarted = false;
      gamePaused = false;
      obstacle.speed = 0;
      obstacle.y = -obstacle.height;
      round = 0;
      currentRound.textContent = "Round: 0";
      cancelAnimationFrame(animationId);
    }
  
    function pauseGame() {
      if (gameStarted) {
        gamePaused = !gamePaused;
        if (gamePaused) {
          pauseButton.textContent = "Resume";
          cancelAnimationFrame(animationId);
        } else {
          pauseButton.textContent = "Pause";
          startTime += performance.now();
          animationId = requestAnimationFrame(update);
        }
      }
    }
  
    function resetGame() {
      stopGame();
      player.x = canvas.width / 2;
      player.y = canvas.height - 30;
      player.direction = 0;
      score = 0;
      currentScore.textContent = "Score: " + score;
    }
  
    function changePlayerColor() {
      player.color = playerColorInput.value;
    }
  
    function changeObstacleColor() {
      obstacle.color = obstacleColorInput.value;
    }
  
    function handleKeyDown(event) {
      if (event.keyCode === 37) {
        player.direction = -1;
      } else if (event.keyCode === 39) {
        player.direction = 1;
      }
    }
  
    function handleKeyUp(event) {
      if (event.keyCode === 37 || event.keyCode === 39) {
        player.direction = 0;
      }
    }
  
    function toggleAutoStart() {
      if (autoStartToggle.checked) {
        startButton.style.display = "none";
      } else {
        startButton.style.display = "block";
      }
    }
  
    startButton.addEventListener("click", startGame);
    pauseButton.addEventListener("click", pauseGame);
    resetButton.addEventListener("click", resetGame);
    playerColorInput.addEventListener("input", changePlayerColor);
    obstacleColorInput.addEventListener("input", changeObstacleColor);
    autoStartToggle.addEventListener("change", toggleAutoStart);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
  
    // Initial setup
    pauseButton.disabled = true;
    resetButton.disabled = true;
    toggleAutoStart();
  });
  
