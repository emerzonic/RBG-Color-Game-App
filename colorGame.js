var numberOfSquares = 6;
var pickedColor;
var squares = document.querySelectorAll(".squares");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#resetButton");
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {
	setupModeButtons();
	setupSquares();
	reset();
}

function setupModeButtons() {
	for (var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function () {
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			this.textContent === "Easy" ? numberOfSquares = 3 : numberOfSquares = 6;
			reset();
		});
	}
}

function setupSquares() {
	colorDisplay.textContent = pickedColor;
	squares.forEach(square => {
		square.addEventListener("click", function () {
			var clickedColor = this.style.backgroundColor;
			if (clickedColor === pickedColor) {
				setCorrectGuessDisplay(clickedColor);
			} else {
				setWrongGuessDisplay(this);
			}
		});
	})
}

function setCorrectGuessDisplay(clickedColor) {
	messageDisplay.textContent = "Correct!";
	h1.style.backgroundColor = clickedColor;
	resetButton.textContent = "PLAY AGAIN?";
	changeColor(pickedColor);
}

function setWrongGuessDisplay(square) {
	square.style.backgroundColor = "rgb(44, 44, 44)";
	messageDisplay.textContent = "Try Again";
}

function changeColor(color) {
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = color;
	}
}

function reset() {
	const colors = generateRandomColors(numberOfSquares);
	pickedColor = pickcolor(colors);
	colorDisplay.textContent = pickedColor;
	resetButton.textContent = "New Colors";
	messageDisplay.textContent = "";
	squares.forEach((square, i) => {
		if (colors[i]) {
			square.style.display = "block";
			square.style.background = colors[i];
		} else {
			square.style.display = "none";
		}
	})
	h1.style.backgroundColor = "steelblue";
}

resetButton.addEventListener("click", function () {
	reset();
});

function pickcolor(colors) {
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(numberOfSquares) {
	const colorList = [];
	for (let i = 0; i < numberOfSquares; i++) {
		colorList.push(randomColor());
	}
	return colorList;
}

function randomColor() {
	const red = Math.floor(Math.random() * 256);
	const green = Math.floor(Math.random() * 256);
	const blue = Math.floor(Math.random() * 256);
	const randomRGBColor = `rgb(${red}, ${green}, ${blue})`;
	return randomRGBColor;
}