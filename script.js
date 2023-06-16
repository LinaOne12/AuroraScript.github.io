document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");

  const startButton = document.getElementById("startButton");
  const pauseButton = document.getElementById("pauseButton");
  const resetButton = document.getElementById("resetButton");
  const currentRound = document.getElementById("currentRound");
  const currentScore = document.getElementById("currentScore");

  const playerColorInput = document.getElementById("playerColorInput");
  const resetPlayerColorBtn = document.getElementById("resetPlayerColorBtn");
  const toggleCursorBtn = document.getElementById("toggleCursorBtn");

  const backgroundMusic = document.getElementById("backgroundMusic");

  // Background color 
  canvas.style.backgroundColor = "#313131";

  const game = {
    canvas: canvas,
    ctx: ctx,
    player: {
      x: canvas.width / 2 - 25,
      y: canvas.height - 50,
      width: 50,
      height: 50,
      color: playerColorInput.value,
      speed: 8,
      direction: 0,
    },
    round: 0,
    score: 0,
    obstacles: [],
    gameStarted: false,
    gamePaused: false,
    animationId: null,

    startGame() {
      if (!this.gameStarted) {
        this.gameStarted = true;
        this.gamePaused = false;
        this.round = 0;
        this.score = 0;
        this.obstacles = [];
        currentRound.textContent = "Round: " + this.round;
        currentScore.textContent = "Score: " + this.score;
        startButton.disabled = true;
        pauseButton.disabled = false;
        resetButton.disabled = true;

        backgroundMusic.currentTime = 0;
        backgroundMusic.play();
        this.draw();
      }
    },

    pauseGame() {
      if (this.gameStarted && !this.gamePaused) {
        this.gamePaused = true;
        pauseButton.textContent = "Resume (R)";
        backgroundMusic.pause();
        cancelAnimationFrame(this.animationId);
        this.showGamePaused();
      } else if (this.gameStarted && this.gamePaused) {
        this.gamePaused = false;
        pauseButton.textContent = "Pause (R)";
        backgroundMusic.play();
        this.hideGamePaused();
        this.draw();
      }
    },

    stopGame() {
      this.gameStarted = false;
      this.gamePaused = false;
      startButton.disabled = false;
      pauseButton.disabled = true;
      resetButton.disabled = false;
      backgroundMusic.pause();
      cancelAnimationFrame(this.animationId);
    },

    resetGame() {
      this.gameStarted = false;
      this.gamePaused = false;
      startButton.disabled = false;
      pauseButton.disabled = true;
      resetButton.disabled = true;
      backgroundMusic.pause();
      cancelAnimationFrame(this.animationId);
      this.clearCanvas();
      this.player.color = playerColorInput.value;
      this.obstacles = [];
      currentRound.textContent = "Round: 0";
      currentScore.textContent = "Score: 0";
    },

    updatePlayer() {
      if (this.player.direction === "left") {
        this.player.x -= this.player.speed;
      } else if (this.player.direction === "right") {
        this.player.x += this.player.speed;
      }

      if (this.player.x < 0) {
        this.player.x = 0;
      } else if (this.player.x + this.player.width > this.canvas.width) {
        this.player.x = this.canvas.width - this.player.width;
      }
    },

    drawPlayer() {
      ctx.fillStyle = this.player.color;
      ctx.fillRect(
        this.player.x,
        this.player.y,
        this.player.width,
        this.player.height
      );
    },

    updateObstacles() {
      if (Math.random() < 0.05 + this.round / 500) {
        const obstacle = {
          x: Math.random() * (this.canvas.width - 50),
          y: -50,
          width: 50,
          height: 50,
          color: this.getRandomBrightColor(),
          speed: 3 + this.round / 100,
        };
        this.obstacles.push(obstacle);
      }

      for (let i = 0; i < this.obstacles.length; i++) {
        this.obstacles[i].y += this.obstacles[i].speed;

        if (this.detectCollision(this.player, this.obstacles[i])) {
          this.stopGame();
          this.showGameOver();
          return;
        }

        if (this.obstacles[i].y > this.canvas.height) {
          this.obstacles.splice(i, 1);
          i--;
          this.score++;
          currentScore.textContent = "Score: " + this.score;

          if (this.score % 10 === 0) {
            this.round++;
            currentRound.textContent = "Round: " + this.round;
          }
        }
      }
    },

    drawObstacles() {
      for (let i = 0; i < this.obstacles.length; i++) {
        ctx.fillStyle = this.obstacles[i].color;
        ctx.fillRect(
          this.obstacles[i].x,
          this.obstacles[i].y,
          this.obstacles[i].width,
          this.obstacles[i].height
        );
      }
    },

    detectCollision(object1, object2) {
      return (
        object1.x < object2.x + object2.width &&
        object1.x + object1.width > object2.x &&
        object1.y < object2.y + object2.height &&
        object1.y + object1.height > object2.y
      );
    },

    clearCanvas() {
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    draw() {
      this.clearCanvas();
      this.drawPlayer();
      this.drawObstacles();

      if (!this.gamePaused) {
        this.updatePlayer();
        this.updateObstacles();
      }

      if (this.gameStarted) {
        this.animationId = requestAnimationFrame(() => this.draw());
      }
    },

    showGamePaused() {
      ctx.fillStyle = "#000";
      ctx.fillRect(0, this.canvas.height / 2 - 30, this.canvas.width, 60);
      ctx.fillStyle = "#FFF";
      ctx.font = "30px Arial";
      ctx.fillText(
        "Game Paused!",
        this.canvas.width / 2 - 95,
        this.canvas.height / 2 + 10
      );
    },

    hideGamePaused() {
      this.clearCanvas();
    },

    showGameOver() {
      ctx.fillStyle = "#000";
      ctx.fillRect(0, this.canvas.height / 2 - 30, this.canvas.width, 60);
      ctx.fillStyle = "#FFF";
      ctx.font = "30px Arial";
      ctx.fillText(
        "Game Over!",
        this.canvas.width / 2 - 80,
        this.canvas.height / 2 + 10
      );
    },

    applySettings() {
      this.player.color = playerColorInput.value;
      backgroundMusic.volume = volumeSlider.value;
    },

    resetPlayerColor() {
      playerColorInput.value = "#00D5FF";
      this.player.color = "#00D5FF";
    },

    toggleCursorVisibility() {
      const bodyElement = document.getElementsByTagName("body")[0];
      bodyElement.style.cursor =
        bodyElement.style.cursor === "none" ? "default" : "none";
    },

    getRandomBrightColor() {
      const colors = ["red", "blue", "green", "yellow", "purple", "orange"];
      const randomIndex = Math.floor(Math.random() * colors.length);
      return colors[randomIndex];
    },
  };

  startButton.addEventListener("click", game.startGame.bind(game));
  pauseButton.addEventListener("click", game.pauseGame.bind(game));
  resetButton.addEventListener("click", game.resetGame.bind(game));
  playerColorInput.addEventListener("change", game.applySettings.bind(game));
  resetPlayerColorBtn.addEventListener(
    "click",
    game.resetPlayerColor.bind(game)
  );
  toggleCursorBtn.addEventListener(
    "click",
    game.toggleCursorVisibility.bind(game)
  );

  document.addEventListener("keydown", function (event) {
    if (event.key === "e" || event.key === "E") {
      game.startGame();
    } else if (event.key === "r" || event.key === "R") {
      game.pauseGame();
    } else if (event.key === "t" || event.key === "T") {
      game.resetGame();
    } else if (event.key === "y" || event.key === "Y") {
      game.toggleCursorVisibility();
    } else if (event.key === "ArrowLeft") {
      game.player.direction = "left";
    } else if (event.key === "ArrowRight") {
      game.player.direction = "right";
    }
  });
  
  document.addEventListener("keyup", function (event) {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      game.player.direction = 0;
    }
  });
});
