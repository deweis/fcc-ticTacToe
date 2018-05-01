/*jshint esversion: 6 */
let currentPlayer = 1;    // 1 = Player 1, 2 = Player 2, 3 = computer
let playMode = 2;         // 1 = 1 player, 2 = 2 players
const strikes = ['c1 c2 c3', 'c4 c5 c6', 'c7 c8 c9', 'c1 c4 c7',
                 'c2 c5 c8', 'c3 c6 c9', 'c1 c5 c9', 'c3 c5 c7'];
const allCells = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9'];
let selected = [];
let p1Score = [];
let p2Score = [];
let p1OverallScore = 0;
let p2OverallScore = 0;
let p1Icon = '';
let p2Icon = '';
let p2Name = '';
let mnxBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];

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
    mnxBoard.splice(id[1] - 1, 1, p1Icon);
    checkScores();
  } else if (currentPlayer > 1) {
    document.getElementById(id).innerHTML = p2Icon;
    document.getElementById(id).style.cursor = 'default';
    p2Score.push(id);
    selected.push(id);
    mnxBoard.splice(id[1] - 1, 1, p2Icon);
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
      document.getElementById('title').innerHTML = `Computer's turn..`;
    } else {
      document.getElementById('title').innerHTML = `Your turn..`;
    }
  } else {
    document.getElementById('title').innerHTML = `Player ${currentPlayer} turn`;
  }

  document.getElementById('title').style.background = '#000';
  document.getElementById('title').style.color = '#fff';
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
        document.getElementById(checkItem[0]).style.background = 'green';
        document.getElementById(checkItem[1]).style.background = 'green';
        document.getElementById(checkItem[2]).style.background = 'green';
        document.getElementById('title').innerHTML = `Congrats!!`;
        if (playMode === 2) {
          document.getElementById('overlay-text').innerHTML = `Player ${currentPlayer} wins!`;
          if (currentPlayer === 1) {
            p1OverallScore++;
          } else {
            p2OverallScore++;
          }
        } else {
          if (currentPlayer === 3) {
            document.getElementById('overlay-text').innerHTML = `The Computer wins!`;
            p2OverallScore++;
          } else {
            document.getElementById('overlay-text').innerHTML = `You win!`;
            p1OverallScore++;
          }
        }

        document.getElementById('overlay').style.display = 'flex';
        setTimeout(function () {
          document.getElementById('overlay').style.display = 'none';
          clearPitch();
        }, 2300
        );
        return;
      }
    }

    drawCheck--;
    if (selected.length === 9 && drawCheck === 0) {
      document.getElementById('title').innerHTML = `Boring...`;
      document.getElementById('overlay-text').innerHTML = `It's a draw!`;
      document.getElementById('overlay').style.display = 'flex';
      setTimeout(function () {
        document.getElementById('overlay').style.display = 'none';
        clearPitch();
      }, 2300
      );
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

    document.getElementById(item).style.background = 'white';
  }

  currentPlayer = 1;
  selected = [];
  p1Score = [];
  p2Score = [];
  mnxBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  titleStyle();
  let cells = document.getElementsByClassName('cell');
  for (const cell of cells) {
    cell.style.cursor = 'pointer';
  }

  document.getElementById('player1-stats').innerHTML = p1OverallScore;
  document.getElementById('player2-stats').innerHTML = p2OverallScore;
}

function ePlayer() {
  /* The computer just selects a random cell:
   *   const freeCells = allCells.filter(x => !selected.includes(x));
   *   const selection = freeCells[Math.floor(Math.random() * (freeCells.length - 1)) + 0];
  */
  const selection = theMinimax(mnxBoard, p1Icon, p2Icon);
  titleStyle();
  setTimeout(function () {
    play(selection);
  }, 200);
}

document.getElementById('btn-start').addEventListener('click', function () {
  document.getElementById('btn-start').style.display = 'none';
  document.getElementById('btn-1player').style.display = 'inline';
  document.getElementById('btn-2players').style.display = 'inline';
  document.getElementById('btn-back').style.display = 'block';
});

document.getElementById('btn-1player').addEventListener('click', function () {
  playMode = 1;
  document.getElementById('btn-1player').style.display = 'none';
  document.getElementById('btn-2players').style.display = 'none';
  document.getElementById('title').innerHTML = 'Would you like to be X or O?';
  document.getElementById('btn-x').style.display = 'inline';
  document.getElementById('btn-o').style.display = 'inline';
  p2Name = 'Computer';
});

document.getElementById('btn-2players').addEventListener('click', function () {
  playMode = 2;
  document.getElementById('btn-1player').style.display = 'none';
  document.getElementById('btn-2players').style.display = 'none';
  document.getElementById('title').innerHTML = 'Player 1: Would you like to be X or O?';
  document.getElementById('btn-x').style.display = 'inline';
  document.getElementById('btn-o').style.display = 'inline';
  p2Name = 'Player 2';
});

document.getElementById('btn-x').addEventListener('click', function () {
  p1Icon = 'x';
  p2Icon = 'o';
  document.getElementById('btn-x').style.display = 'none';
  document.getElementById('btn-o').style.display = 'none';
  document.getElementById('btn-back').style.display = 'none';
  document.getElementById('main').style.display = 'flex';
  document.getElementById('bottom-section').style.display = 'flex';
  document.getElementById('player2-name').innerHTML = p2Name;
  document.getElementById('logo').style.display = 'none';
  document.getElementById('title').style.fontSize = '2em';
  titleStyle();
});

document.getElementById('btn-o').addEventListener('click', function () {
  p1Icon = 'o';
  p2Icon = 'x';
  document.getElementById('btn-x').style.display = 'none';
  document.getElementById('btn-o').style.display = 'none';
  document.getElementById('btn-back').style.display = 'none';
  document.getElementById('main').style.display = 'flex';
  document.getElementById('bottom-section').style.display = 'flex';
  document.getElementById('player2-name').innerHTML = p2Name;
  document.getElementById('logo').style.display = 'none';
  document.getElementById('title').style.fontSize = '2em';
  titleStyle();
});

document.getElementById('btn-reset').addEventListener('click', function () {
  location.reload();
});

document.getElementById('btn-back').addEventListener('click', function () {
  location.reload();
});

for (const cell of allCells) {
  document.getElementById(cell).addEventListener('click', function () {
    play(cell);
  });
}

/*
 * Minimax Algorithm by: Ahmad Abdolsaheb
 * --> https://codepen.io/abdolsa/pen/vgjoMb
 * --> https://medium.freecodecamp.org/how-to-make-your-tic-tac-toe-game-unbeatable-by-using-the-minimax-algorithm-9d690bad4b37
*/
function theMinimax(origBoard, huPlayer, aiPlayer) {

  // returns list of the indexes of empty spots on the board
  function emptyIndexies(board) {
    return board.filter(s => s != 'o' && s != 'x');
  }

  // winning combinations using the board indexies
  function winning(board, player) {
    if (
         (board[0] == player && board[1] == player && board[2] == player) ||
         (board[3] == player && board[4] == player && board[5] == player) ||
         (board[6] == player && board[7] == player && board[8] == player) ||
         (board[0] == player && board[3] == player && board[6] == player) ||
         (board[1] == player && board[4] == player && board[7] == player) ||
         (board[2] == player && board[5] == player && board[8] == player) ||
         (board[0] == player && board[4] == player && board[8] == player) ||
         (board[2] == player && board[4] == player && board[6] == player)
       ) {
      return true;
    } else {
      return false;
    }
  }

  // the main minimax function
  function minimax(newBoard, player) {

    //available spots
    let availSpots = emptyIndexies(newBoard);

    // checks for the terminal states such as win, lose, and tie
    // and returning a value accordingly
    if (winning(newBoard, huPlayer)) {
      return { score: -10 };
    } else if (winning(newBoard, aiPlayer)) {
      return { score: 10 };
    } else if (availSpots.length === 0) {
      return { score: 0 };
    }

    // an array to collect all the objects
    let moves = [];

    // loop through available spots
    for (const i in availSpots) {
      //create an object for each and store the index of that spot
      let move = {};
      move.index = newBoard[availSpots[i]];

      // set the empty spot to the current player
      newBoard[availSpots[i]] = player;

      /*collect the score resulted from calling minimax
        on the opponent of the current player*/
      if (player == aiPlayer) {
        const result = minimax(newBoard, huPlayer);
        move.score = result.score;
      } else {
        const result = minimax(newBoard, aiPlayer);
        move.score = result.score;
      }

      // reset the spot to empty
      newBoard[availSpots[i]] = move.index;

      // push the object to the array
      moves.push(move);
    }

    // if it is the computer's turn loop over the moves and choose the move with the highest score
    let bestMove;
    if (player === aiPlayer) {
      let bestScore = -10000;
      for (const i in moves) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      // else loop over the moves and choose the move with the lowest score
      let bestScore = 10000;

      for (const i in moves) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }

    return moves[bestMove];
  }

  const res = minimax(origBoard, aiPlayer);
  return `c${res.index + 1}`;
}
