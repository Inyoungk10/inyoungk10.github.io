// ✅ Change this to the secret word
const correctWord = "JOCELYN"; 
let userInput = "";

const icons = document.querySelectorAll(".icon");
const feedback = document.getElementById("feedback");

icons.forEach(icon => {
  icon.addEventListener("click", () => {
    const letter = icon.getAttribute("data-letter");
    userInput += letter;

    //feedback.textContent = "Current: " + userInput;

    // If input is wrong at any point → reset
    if (!correctWord.startsWith(userInput)) {
      //feedback.textContent = "❌";
      userInput = "";
    }

    // If the word matches fully → redirect
    if (userInput === correctWord) {
      feedback.textContent = "✅ Correct!";
      window.location.href = "answer.html"; // redirect to answer page
    }
  });
});