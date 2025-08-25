// ===================== CONFIG =====================
const correctWord = "WORSHIP"; // target word
const iconSize = 100;         // width/height of icons in pixels
const speedFactor = 0.7;     // 1 = normal speed, <1 = slower

// ===================== SETUP =====================
//const feedback = document.getElementById("feedback");
const icons = Array.from(document.querySelectorAll(".icon"));
let userInput = "";

// Initialize icons with random position and velocity
const iconData = icons.map(icon => {
  const x = Math.random() * (window.innerWidth - iconSize);
  const y = Math.random() * (window.innerHeight - iconSize);
  const dx = (Math.random() * 2 + 0.5) * (Math.random() < 0.5 ? -1 : 1);
  const dy = (Math.random() * 2 + 0.5) * (Math.random() < 0.5 ? -1 : 1);
  icon.style.left = x + "px";
  icon.style.top = y + "px";
  return { icon, x, y, dx, dy };
});

// ===================== COLLISION FUNCTIONS =====================

// Collision detection and resolution between two icons
function handleCollision(a, b) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < iconSize) {
    const overlap = (iconSize - distance) / 2;
    const nx = dx / distance;
    const ny = dy / distance;

    // Push icons apart
    a.x -= nx * overlap;
    a.y -= ny * overlap;
    b.x += nx * overlap;
    b.y += ny * overlap;

    // Swap velocities (simple elastic)
    [a.dx, b.dx] = [b.dx, a.dx];
    [a.dy, b.dy] = [b.dy, a.dy];
  }
}

// ===================== ANIMATION LOOP =====================
function animate() {
  iconData.forEach(data => {
    // Move icons
    data.x += data.dx * speedFactor;
    data.y += data.dy * speedFactor;

    // Bounce off walls with position clamping
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

    // Update DOM position
    data.icon.style.left = data.x + "px";
    data.icon.style.top = data.y + "px";
  });

  // Handle collisions between icon pairs
  for (let i = 0; i < iconData.length; i++) {
    for (let j = i + 1; j < iconData.length; j++) {
      handleCollision(iconData[i], iconData[j]);
    }
  }

  requestAnimationFrame(animate);
}

// Start animation
animate();

// ===================== ICON CLICK HANDLER =====================
icons.forEach(icon => {
  icon.addEventListener("click", () => {
    const letter = icon.getAttribute("data-letter");
    userInput += letter;

    // Highlight clicked icon
    icon.classList.add("pressed");

    // Wrong sequence: reset input and remove all highlights
    if (!correctWord.startsWith(userInput)) {
      console.log("wrong try again");
      userInput = "";
      icons.forEach(i => i.classList.remove("pressed"));
    }

    // Correct sequence: go to answer page
    if (userInput === correctWord) {
      console.log("yo");
      window.location.href = "answer.html";
    }
  });
});
