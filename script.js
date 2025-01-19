const gameboard = (function() {

    const board = ['','','','','','','','',''];

    const addSign = (index, sign) => {
        if (getSign(index) === '') {
            board[index] = sign;
        }
        checkWins(sign);
    }

    const getSign = (index) => {
        return board[index];
    }

    const resetBoard = () => {
        for (let i=0; i < board.length; i++){
            board[i] = ''
        }
    }

    const checkWins = (sign) => {
      if ((board[0] == sign && board[1] == sign && board[2] == sign)||
      (board[3] == sign && board[4] == sign && board[5] == sign)||
      (board[6] == sign && board[7] == sign && board[8] == sign)||
      (board[0] == sign && board[3] == sign && board[6] == sign)||
      (board[1] == sign && board[4] == sign && board[7] == sign)||
      (board[2] == sign && board[5] == sign && board[8] == sign)||
      (board[0] == sign && board[4] == sign && board[8] == sign)||
      (board[6] == sign && board[4] == sign && board[2] == sign)
    ) {
      console.log(`Game over. The winer is ${sign}`);
      return true;
    }
    return false;
  }
    return {board, addSign, getSign, resetBoard, checkWins}

})();

function createPlayer(name, sign) {
  let winsCount = 0;
  const getWinsCount = () => winsCount;
  const giveWinsCount = () => ++winsCount;
  
  return {name, sign, getWinsCount, giveWinsCount};
}

const startButton = document.querySelector('.start.button input');
const form = document.querySelector('form');
const app = document.querySelector('#app');
startButton.addEventListener('click', () => {
  const player1 = createPlayer(playerName1.value, 'X');
  const player2 = createPlayer(playerName2.value, 'O');  
  form.remove();
  drawScore(player1, player2);
  drawBoard(player1, player2);
  drawResetButton(player1, player2);
})

function drawBoard(player1, player2){
  let round = 0;
  const marks = ['O', 'X'];
  let board = document.createElement('div');
  board.className = 'board';
  for (let i = 0; i <= 8; i++){
    let cell = document.createElement('div');
    cell.className = 'cell';
    cell.addEventListener('click', () => {
      if (!gameboard.checkWins('X') && !gameboard.checkWins('O')){
        const cells = Array.from(document.querySelectorAll('.cell'));
        const checkedIndex = cells.indexOf(cell);
        if (gameboard.board[checkedIndex]==''){
          round++;
          gameboard.addSign(checkedIndex, marks[round % 2]);
          const img = document.createElement('img');
          if (round % 2 !== 0){
            img.src = 'https://jithin-rajesh.github.io/tic-tac-toe/icons/x-symbol-svgrepo-com.svg';
          }else{
            img.src = 'https://jithin-rajesh.github.io/tic-tac-toe/icons/circle-svgrepo-com.svg';
          }
          cell.append(img);
          if (gameboard.checkWins('X')){
            player1.giveWinsCount();
            drawScore(player1, player2);
          }
          if (gameboard.checkWins('O')){
            player2.giveWinsCount();
            drawScore(player1, player2);
          }
        }
      }
  });
    board.append(cell);
  }
  const score = document.querySelector('.score');
  score.after(board);
}

function drawScore(player1, player2){
  if (document.querySelector('.score') != null){
    const score = document.querySelector('.score');
    score.remove();
  }
  const score = document.createElement('div');
  score.className = 'score';
  const player1Score = document.createElement('div');
  const player2Score = document.createElement('div');
  player1Score.innerHTML = `${player1.name} (${player1.sign}): ${player1.getWinsCount()}`;
  player2Score.innerHTML = `${player2.name} (${player2.sign}): ${player2.getWinsCount()}`;
  score.append(player1Score, player2Score);
  app.prepend(score);
}

function drawResetButton(player1, player2){
  const div = document.createElement('div');
  const btn = document.createElement('button');
  btn.className = 'reset';
  btn.innerHTML = 'Reset board';
  div.className =  'btnDiv'
  div.append(btn);
  app.appendChild(div);
  btn.addEventListener('click', () => {
    const oldBoard = document.querySelector('.board');
    oldBoard.remove();
    gameboard.resetBoard();
    drawBoard(player1, player2);
  })
}