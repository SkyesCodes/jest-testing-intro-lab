const gameBoard = document.getElementById("board");
const gameState = document.querySelector("gameState")
const playAgainBtn = document.querySelector('button')
const COLORS = {
'0': '',
'1': 'red',
'-1': 'blue',   
};
let board;
let turn;
let winner;
const messageEl = document.querySelector('h1');
const boardEls = [...document.querySelectorAll('#board > div')];
let answer = document.getElementById('board').addEventListener('click', update());
playAgainBtn.addEventListener('click', init);
console.log(answer)
init();
function init(){
board =[ [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],];
turn = 1;
winner = null;
render()
}
function update(e){
    let colIdx=board.indexOf(e.target)
    if(colIdx ===-1) return;
    const colArr = board[colIdx];
    const rowIdx = colArr.indexOf(0);
    colArr[rowIdx] = turn;
    turn *=-1;
 winner = getWinner(colArr, rowIdx);
 render();
}
function getWinner(colIdx, rowIdx) {
    return checkVerticalWin(colIdx, rowIdx) ||
      checkHorizontalWin(colIdx, rowIdx) ||
      checkDiagonalWinNESW(colIdx, rowIdx) ||
      checkDiagonalWinNWSE(colIdx, rowIdx);
}
  function checkDiagonalWinNWSE(colIdx, rowIdx) {
    const adjCountNW = countAdjacent(colIdx, rowIdx, -1, 1);
    const adjCountSE = countAdjacent(colIdx, rowIdx, 1, -1);
    return (adjCountNW + adjCountSE) >= 2 ? board[colIdx][rowIdx] : null;
}
  function checkDiagonalWinNESW(colIdx, rowIdx) {
    const adjCountNE = countAdjacent(colIdx, rowIdx, 1, 1);
    const adjCountSW = countAdjacent(colIdx, rowIdx, -1, -1);
    return (adjCountNE + adjCountSW) >= 2 ? board[colIdx][rowIdx] : null;}
    function checkHorizontalWin(colIdx, rowIdx) {
        const adjCountLeft = countAdjacent(colIdx, rowIdx, -1, 0);
        const adjCountRight = countAdjacent(colIdx, rowIdx, 1, 0);
        return (adjCountLeft + adjCountRight) >= 2 ? board[colIdx][rowIdx] : null;
}
function checkVerticalWin(colIdx, rowIdx) {
    return countAdjacent(colIdx, rowIdx, 0, -1) === 2 ? board[colIdx][rowIdx] : null;
}
function countAdjacent(colIdx, rowIdx, colOffset, rowOffset) {
    
    const player = board[colIdx][rowIdx];
   
    let count = 0;
    
    colIdx += colOffset;
    rowIdx += rowOffset;
    while (
      board[colIdx] !== undefined &&
      board[colIdx][rowIdx] !== undefined &&
      board[colIdx][rowIdx] === player
    ) {
      count++;
      colIdx += colOffset;
      rowIdx += rowOffset;
    }
    return count;
  }

  function render() {
    renderBoard();
    renderMessage();
    renderControls();
  }
  
  function renderBoard() {
    board.forEach(function(colArr, colIdx) {
      colArr.forEach(function(cellVal, rowIdx) {
        const cellId = `c${colIdx}r${rowIdx}`;
        const cellEl = document.getElementById(cellId);
        cellEl.style.backgroundColor = COLORS[cellVal];
      });
    });
  }
  function renderMessage() {
    if (winner === 'T') {
      messageEl.innerText = "It's a Tie!!!";
    } else if (winner) {
      messageEl.innerHTML = `<span style="color: ${COLORS[winner]}">${COLORS[winner].toUpperCase()}</span> Wins!`;
    } else {
      // Game is in play
      messageEl.innerHTML = `<span style="color: ${COLORS[turn]}">${COLORS[turn].toUpperCase()}</span>'s Turn`;
    }}
    function renderControls() {
        playAgainBtn.style.visibility = winner ? 'visible' : 'hidden';
}