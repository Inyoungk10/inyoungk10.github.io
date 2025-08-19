// ✅ Change this to your target word
const correctWord = "LAMP"; 
let userInput = "";

const icons = document.querySelectorAll(".icon");
const feedback = document.getElementById("feedback");

icons.forEach(icon => {
  icon.addEventListener("click", () => {
    const letter = icon.getAttribute("data-letter");
    userInput += letter;

    feedback.textContent = "Current: " + userInput;

    if (!correctWord.startsWith(userInput)) {
      feedback.textContent = "❌ Wrong sequence! Start again.";
      userInput = "";
    }

    if (userInput === correctWord) {
      feedback.textContent = "✅ Correct!";
      window.location.href = "answer.html";
    }
  });
});