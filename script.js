let currentPlayer = 1;
let strikes = ['c1 c2 c3','c4 c5 c6','c7 c8 c9','c1 c4 c7','c2 c5 c8','c3 c6 c9','c1 c5 c9','c3 c5 c7'];
let selected = [];
let p1Score = [];
let p2Score = [];

/* Add player selection to grid */
function play(id) {
  if (selected.includes(id)) {
    return;
  }
  if (currentPlayer === 1) {
    document.getElementById(id).innerHTML = 'x';
    document.getElementById(id).style.cursor = 'default';
    p1Score.push(id);
    selected.push(id);
    checkScores();
    currentPlayer = 2;
  } else {
    document.getElementById(id).innerHTML = 'o';
    document.getElementById(id).style.cursor = 'default';
    p2Score.push(id);
    selected.push(id);
    checkScores();
    currentPlayer = 1;
  }
}

/* Check if current move wins */
function checkScores() {
  let playerScore = currentPlayer === 1 ? p1Score : p2Score;
  for (let strike of strikes) {
    let counter = 0;
    let checkItem = strike.split(' ');
    for (let item of playerScore) {
      if (checkItem.includes(item)) {
        counter++;
      }
      if (counter === 3) {
        document.getElementById(checkItem[0]).style.background = "green";
        document.getElementById(checkItem[1]).style.background = "green";
        document.getElementById(checkItem[2]).style.background = "green";
        document.getElementById("overlay-text").innerHTML = `Player ${currentPlayer} wins!`;
        document.getElementById("overlay").style.display = "block";
        setTimeout(function(){
          document.getElementById("overlay").style.display = "none";
          clearPitch();
        }, 2300);
      }
    }
  }
}

/* Reset playground for a new game */
function clearPitch() {
  for (let item of selected) {
    if (item === 'c1' || item === 'c5' || item === 'c9') {
      document.getElementById(item).innerHTML = `<span class="span-size">x</span>`;
    } else {
      document.getElementById(item).innerHTML = '';
    }
    document.getElementById(item).style.background = "white";
  }
  currentPlayer = 1;
  selected = [];
  p1Score = [];
  p2Score = [];
}


document.getElementById("c1").addEventListener("click", function() {play('c1')});
document.getElementById("c2").addEventListener("click", function() {play('c2')});
document.getElementById("c3").addEventListener("click", function() {play('c3')});
document.getElementById("c4").addEventListener("click", function() {play('c4')});
document.getElementById("c5").addEventListener("click", function() {play('c5')});
document.getElementById("c6").addEventListener("click", function() {play('c6')});
document.getElementById("c7").addEventListener("click", function() {play('c7')});
document.getElementById("c8").addEventListener("click", function() {play('c8')});
document.getElementById("c9").addEventListener("click", function() {play('c9')});
