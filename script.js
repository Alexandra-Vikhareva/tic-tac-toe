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