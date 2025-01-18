const gameboard = (function() {

    const board = ['','','', '','','','','',''];

    const addSign = (index, sign) => {
        if (getSign(index) === '') {
            board[index] = sign;
        }
    }

    const getSign = (index) => {
        return board[index];
    }

    const resetBoard = () => {
        for (let i=0; i < board.length; i++){
            board[i] = ''
        }
    }

    return {board, addSign, getSign, resetBoard}

})();

function createPlayer(name, sign) {
  let winsCount = 0;
  const getWinsCount = () => winsCount;
  const giveWinsCount = () => ++winsCount;
  
  return {name, sign, getWinsCount, giveWinsCount};
}