// Target word for the puzzle
const correctWord = "CODE"; 
let userInput = "";
const feedback = document.getElementById("feedback");

// Collect all icons and set constants
const icons = Array.from(document.querySelectorAll(".icon"));
const iconSize = 60;          // width/height of icons
const speedFactor = 0.5;      // slow down the motion

// Initialize each icon with random position and velocity
const iconData = icons.map(icon => {
  const x = Math.random() * (window.innerWidth - iconSize);
  const y = Math.random() * (window.innerHeight - iconSize);
  const dx = (Math.random() * 2 + 0.5) * (Math.random() < 0.5 ? -1 : 1);
  const dy = (Math.random() * 2 + 0.5) * (Math.random() < 0.5 ? -1 : 1);
  icon.style.left = x + "px";
  icon.style.top = y + "px";
  return { icon, x, y, dx, dy };
});

// Handle collisions between two icons
function handleCollision(a, b) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < iconSize) {
    // Push icons apart
    const overlap = (iconSize - distance) / 2;
    const nx = dx / distance;
    const ny = dy / distance;

    a.x -= nx * overlap;
    a.y -= ny * overlap;
    b.x += nx * overlap;
    b.y += ny * overlap;

    // Swap velocities
    [a.dx, b.dx] = [b.dx, a.dx];
    [a.dy, b.dy] = [b.dy, a.dy];
  }
}

// Animation loop
function animate() {
  iconData.forEach(data => {
    // Move icons by their velocity and speed factor
    data.x += data.dx * speedFactor;
    data.y += data.dy * speedFactor;

    // Bounce off walls with clamping
    if (data.x < 0) {
      data.x = 0;
      data.dx *= -1;
    } else if (data.x > window.innerWidth - iconSize) {
      data.x = window.innerWidth - iconSize;
      data.dx *= -1;
    }

    if (data.y < 0) {
      data.y = 0;
      data.dy *= -1;
    } else if (data.y > window.innerHeight - iconSize) {
      data.y = window.innerHeight - iconSize;
      data.dy *= -1;
    }

    data.icon.style.left = data.x + "px";
    data.icon.style.top = data.y + "px";
  });

  // Check collisions between all icon pairs
  for (let i = 0; i < iconData.length; i++) {
    for (let j = i + 1; j < iconData.length; j++) {
      handleCollision(iconData[i], iconData[j]);
    }
  }

  requestAnimationFrame(animate);
}
animate();

// Handle icon clicks
icons.forEach(icon => {
  icon.addEventListener("click", () => {
    const letter = icon.getAttribute("data-letter");
    userInput += letter;

    // Highlight the icon
    icon.classList.add("pressed");

    feedback.textContent = "Current: " + userInput;

    // Check if current sequence is wrong
    if (!correctWord.startsWith(userInput)) {
      feedback.textContent = "❌ Wrong sequence! Start again.";
      userInput = "";

      // Remove highlight from all icons
      icons.forEach(i => i.classList.remove("pressed"));
    }

    // Check if user completed the word
    if (userInput === correctWord) {
      feedback.textContent = "✅ Correct!";
      window.location.href = "answer.html";
    }
  });
});
