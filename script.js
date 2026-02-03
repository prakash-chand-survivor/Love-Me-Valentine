const questionContainer = document.querySelector(".question-container");
const resultContainer = document.querySelector(".result-container");
const gifResult = document.querySelector(".gif-result");
const heartLoader = document.querySelector(".cssload-main");
const yesBtn = document.querySelector(".js-yes-btn");
const noBtn = document.querySelector(".js-no-btn");

let yesScale = 1;

function moveNoButton() {
  const containerWidth = questionContainer.offsetWidth;
  const containerHeight = questionContainer.offsetHeight;

  // Get the current position and size of the Yes button
  const yesRect = yesBtn.getBoundingClientRect();
  const containerRect = questionContainer.getBoundingClientRect();

  // Convert Yes button position to be relative to the container
  const yesLeft = yesRect.left - containerRect.left;
  const yesTop = yesRect.top - containerRect.top;
  const yesRight = yesLeft + yesRect.width;
  const yesBottom = yesTop + yesRect.height;

  let newX, newY;
  let isOverlapping = true;

  // Keep picking a random spot until it's NOT overlapping the Yes button
  while (isOverlapping) {
    newX = Math.floor(Math.random() * (containerWidth - noBtn.offsetWidth));
    newY = Math.floor(Math.random() * (containerHeight - noBtn.offsetHeight));

    // Check if the new No button position overlaps the Yes button (with a 20px buffer)
    const noRight = newX + noBtn.offsetWidth;
    const noBottom = newY + noBtn.offsetHeight;

    const overlapsX = newX < yesRight + 20 && noRight > yesLeft - 20;
    const overlapsY = newY < yesBottom + 20 && noBottom > yesTop - 20;

    if (!(overlapsX && overlapsY)) {
      isOverlapping = false; // Spot is safe!
    }
  }

  noBtn.style.left = `${newX}px`;
  noBtn.style.top = `${newY}px`;

  // Grow the Yes Button
  yesScale += 0.15;
  yesBtn.style.transform = `scale(${yesScale})`;
  yesBtn.style.zIndex = "100";
}

// Listeners for both Desktop and Mobile
noBtn.addEventListener("mouseover", moveNoButton);
noBtn.addEventListener("click", (e) => {
  e.preventDefault();
  moveNoButton();
});
noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  moveNoButton();
}); 

// Yes button final result
yesBtn.addEventListener("click", () => {
  questionContainer.style.display = "none";
  heartLoader.style.display = "inherit";
  setTimeout(() => {
    heartLoader.style.display = "none";
    resultContainer.style.display = "inherit";
    gifResult.play();
  }, 3000);
});