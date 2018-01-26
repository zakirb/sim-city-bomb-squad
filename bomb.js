console.log("javascript running");

var totalTime = 30;
var timeRemaining = 0;
var gameOver = false;
var wiresToCut = [];

var delay = null;
var timer = null;


var wiresCut = {
	blue: false,
	green: false,
	red: false,
	white: false,
	yellow: false
};

var checkForWin = function() {
	return wiresToCut.length > 0 ? false : true;
}

var detonate = function () {
	endGame(false);
}


var endGame = function(win) {
	gameOver = true;
	clearTimeout(delay);
	clearInterval(timer);
	if (win) {
		// we won
		console.log("YOU SAVED THE CITY");
		document.getElementsByClassName("timerbox")[0].style.color = "green";
	} else {
		// we lost
		console.log("BOOM!");
		document.body.classList.remove('unexploded');
		document.body.classList.add('exploded');

	}
};

var cutWire = function(id) {
	if (!wiresCut[this.id]) {
		//do the wire cut stuff and game checking here
		this.src = "img/cut-" + this.id + "-wire.png";
		wiresCut[this.id] = true;
		var wireIndex = wiresToCut.indexOf(this.id);
		if (wireIndex > -1) {
			//this is where the good cut logic goes
			console.log(this.id + " was correct");
			wiresToCut.splice(wireIndex, 1);

			if (checkForWin()) {
				endGame(true);
			}
		} else {
			// this is where the bad cut logic goes
			delay = setTimeout(detonate, 750);
		}


	} 

};



var reset = function () {
	var wireImages = document.getElementsByClassName('imagebox')[0].children;

	for (var i = 0; i < wireImages.length; i++) {
		wireImages[i].src = "img/uncut-" + wireImages[i].id + "-wire.png";
	};
};

var initGame = function () {
	timeRemaining = totalTime;
	var allColors = Object.keys(wiresCut);

	wiresToCut = allColors.filter(function() {
		var rand = Math.random();
		if (rand > 0.5) {
			return true;
		} else {
			return false;
		}
	})
console.log(wiresToCut);
console.log(wiresCut);
};




document.addEventListener("DOMContentLoaded", function() {
  document.getElementById('blue').addEventListener('click', cutWire);
  document.getElementById('green').addEventListener('click', cutWire);
  document.getElementById('red').addEventListener('click', cutWire);
  document.getElementById('white').addEventListener('click', cutWire);
  document.getElementById('yellow').addEventListener('click', cutWire);
  document.getElementById('reset').addEventListener('click', reset);
  initGame();
  
});


