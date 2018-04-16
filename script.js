let currentPlayer = 1;

/* Fill cell and check status */
function play(id) {
  if (currentPlayer === 1) {
    document.getElementById(id).innerHTML = 'x';
    currentPlayer = 2;
  } else {
    document.getElementById(id).innerHTML = 'o';
    currentPlayer = 1;
  }
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
