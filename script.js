let currentPlayer = 1;    // 1 = Player 1, 2 = Player 2, 3 = computer
let playMode = 2;         // 1 = 1 player, 2 = 2 players
const strikes = ['c1 c2 c3','c4 c5 c6','c7 c8 c9','c1 c4 c7','c2 c5 c8','c3 c6 c9','c1 c5 c9','c3 c5 c7'];
let selected = [];
let p1Score = [];
let p2Score = [];
let p1OverallScore = 0;
let p2OverallScore = 0;
let p1Icon = '';
let p2Icon = '';
let p2Name = '';

/* Add player selection to grid */
function play(id) {
  if (selected.includes(id)) {
    return;
  }
  if (currentPlayer === 1) {
    document.getElementById(id).innerHTML = p1Icon;
    document.getElementById(id).style.cursor = 'default';
    p1Score.push(id);
    selected.push(id);
    checkScores();
  } else if (currentPlayer > 1) {
    document.getElementById(id).innerHTML = p2Icon;
    document.getElementById(id).style.cursor = 'default';
    p2Score.push(id);
    selected.push(id);
    checkScores();
  }
}

/* Set player after a move */
function setPlayer() {
  if (currentPlayer === 1) {
    if (playMode === 1) {
      currentPlayer = 3;
      ePlayer();
    } else {
      currentPlayer = 2;
      titleStyle();
    }
  } else if (currentPlayer > 1) {
    currentPlayer = 1;
    titleStyle();
  }
}

/* Change title style during play */
function titleStyle() {
  if (playMode === 1) {
    if (currentPlayer === 3) {
     document.getElementById("title").innerHTML = `Computer's turn..`;
   } else {
     document.getElementById("title").innerHTML = `Your turn..`;
   }
  }
  else {
    document.getElementById("title").innerHTML = `Player ${currentPlayer} turn`;
  }
  document.getElementById("title").style.background = '#63ccff';
}

/* Check if current move wins */
function checkScores() {
  let playerScore = currentPlayer === 1 ? p1Score : p2Score;
  let drawCheck = strikes.length;
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
        document.getElementById("title").innerHTML = `Congrats!!`;
        if (playMode === 2) {
          document.getElementById("overlay-text").innerHTML = `Player ${currentPlayer} wins!`;
          if (currentPlayer === 1) {
            p1OverallScore++;
          } else {
            p2OverallScore++;
          }
        }
        else {
          if (currentPlayer === 3) {
            document.getElementById("overlay-text").innerHTML = `The Computer wins!`;
            p2OverallScore++;
          } else {
              document.getElementById("overlay-text").innerHTML = `You win!`;
              p1OverallScore++;
          }
        }
        document.getElementById("overlay").style.display = "flex";
        setTimeout(function(){
          document.getElementById("overlay").style.display = "none";
          clearPitch();
        }, 2300);
        return;
      }
    }
    drawCheck--;
    if (selected.length === 9 && drawCheck === 0) {
      document.getElementById("title").innerHTML = `Boring...`;
      document.getElementById("overlay-text").innerHTML = `It's a draw!`;
      document.getElementById("overlay").style.display = "flex";
      setTimeout(function(){
        document.getElementById("overlay").style.display = "none";
        clearPitch();
      }, 2300);
      return;
    }
  }
  setPlayer();
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
  titleStyle();
  let cells = document.getElementsByClassName("cell");
  for (const cell of cells) {
    cell.style.cursor = "pointer";
  }
  document.getElementById("player1-stats").innerHTML = p1OverallScore;
  document.getElementById("player2-stats").innerHTML = p2OverallScore;
}

function ePlayer() {
  const allCells = ['c1','c2','c3','c4','c5','c6','c7','c8','c9'];
  const freeCells = allCells.filter( x => !selected.includes(x) );
  const selection = freeCells[Math.floor(Math.random() * (freeCells.length-1 - 0 + 0)) + 0];
  titleStyle();
  setTimeout(function(){
    play(selection);
  }, 200);
}

document.getElementById("btn-1player").addEventListener("click", function() {
  playMode = 1;
  document.getElementById("btn-1player").style.display = "none";
  document.getElementById("btn-2players").style.display = "none";
  document.getElementById("title").innerHTML = "Would you like to be X or O?";
  document.getElementById("btn-x").style.display = "inline";
  document.getElementById("btn-o").style.display = "inline";
  p2Name = 'Computer';
});

document.getElementById("btn-2players").addEventListener("click", function() {
  playMode = 2;
  document.getElementById("btn-1player").style.display = "none";
  document.getElementById("btn-2players").style.display = "none";
  document.getElementById("title").innerHTML = "Player 1: Would you like to be X or O?";
  document.getElementById("btn-x").style.display = "inline";
  document.getElementById("btn-o").style.display = "inline";
  p2Name = 'Player 2';
});

document.getElementById("btn-x").addEventListener("click", function() {
  p1Icon = 'x';
  p2Icon = 'o';
  document.getElementById("btn-x").style.display = "none";
  document.getElementById("btn-o").style.display = "none";
  document.getElementById("main").style.display = "flex";
  document.getElementById("bottom-section").style.display = "flex";
  document.getElementById("player2-name").innerHTML = p2Name;
  titleStyle();
});

document.getElementById("btn-o").addEventListener("click", function() {
  p1Icon = 'o';
  p2Icon = 'x';
  document.getElementById("btn-x").style.display = "none";
  document.getElementById("btn-o").style.display = "none";
  document.getElementById("main").style.display = "flex";
  document.getElementById("bottom-section").style.display = "flex";
  document.getElementById("player2-name").innerHTML = p2Name;
  titleStyle();
});

document.getElementById("btn-reset").addEventListener("click", function() {
  location.reload();
});

document.getElementById("c1").addEventListener("click", function() {play('c1')});
document.getElementById("c2").addEventListener("click", function() {play('c2')});
document.getElementById("c3").addEventListener("click", function() {play('c3')});
document.getElementById("c4").addEventListener("click", function() {play('c4')});
document.getElementById("c5").addEventListener("click", function() {play('c5')});
document.getElementById("c6").addEventListener("click", function() {play('c6')});
document.getElementById("c7").addEventListener("click", function() {play('c7')});
document.getElementById("c8").addEventListener("click", function() {play('c8')});
document.getElementById("c9").addEventListener("click", function() {play('c9')});
