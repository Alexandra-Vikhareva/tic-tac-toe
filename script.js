const gameboard = (function() {
    const board = ['','','', '','','','','',''];

    const addSign = (index, sign) => {
        board[index] = sign;
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