


// Get the canvas element from the HTML file



const canvas = document.getElementById('gameCanvas');

// Set the canvas dimensions to the window dimensions
canvas.width = window.innerWidth-40;
canvas.height = window.innerHeight-40;
canvas.style.border = "20px solid black";

// Get the 2D context of the canvas
const context = canvas.getContext('2d');

// Create a player object
let player = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 50,
  angle: 0,
  speed: 5
};

// Create a mouse click position variable
let mouseClickPosition = null;

// Create a counter for destroyed players
let destroyedPlayers = 0;

// Function to spawn a new player
function spawnPlayer() {
  player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 50,
    angle: 0,
    speed: 5
  };
}


function update() {
    // Calculate the angle to the mouse click position
    if (mouseClickPosition) {
      const dx = mouseClickPosition.x - player.x;
      const dy = mouseClickPosition.y - player.y;
      player.angle = Math.atan2(dy, dx);
    }
  
    // Move the player towards the mouse click position
    player.x += player.speed * Math.cos(player.angle);
    player.y += player.speed * Math.sin(player.angle);
  
    // Check if the player has reached the edge of the canvas
    if (player.x < 0 || player.x > canvas.width || player.y < 0 || player.y > canvas.height) {
      destroyedPlayers++;
  
      if (destroyedPlayers % 10 === 0) {
        spawnPlayer();
        spawnPlayer();
      } else {
        spawnPlayer();
      }
    }
  }
  
// Function to render the game
function render() {
  // Clear the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the player as a red square
  context.save();
  context.translate(player.x, player.y);
  context.rotate(player.angle);
  context.fillStyle = 'red';
  context.fillRect(-player.size / 2, -player.size / 2, player.size, player.size);
  context.restore();

  // Draw the text at the top of the canvas
  context.fillStyle = 'black';
  context.font = 'bold 45px Arial';
  context.textAlign = 'center';
  context.fillText('AI GAME', canvas.width / 2, 50);

  // Draw the counter at the bottom of the canvas
  context.fillStyle = 'black';
  context.font = 'bold 40px Arial';
  context.textAlign = 'center';
  context.fillText(`Score: ${destroyedPlayers}`, canvas.width / 2, canvas.height - 30);
}

// Function to update and render the game
function gameLoop() {
  update();
  render();
  requestAnimationFrame(gameLoop);
}

// Add an event listener to the canvas to store the mouse click position
canvas.addEventListener('click', (event) => {
  mouseClickPosition = { x: event.clientX, y: event.clientY };
});

// Add an event listener to the window to resize the canvas
    window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
  

// Call the game loop to start the game
gameLoop();
