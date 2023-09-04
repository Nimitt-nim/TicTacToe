let current = 'X';
let board = ["", "", "", "", "", "", "", "", ""]; 
let gameActive = true;

class Move{
    constructor(){
        this.index;
        this.score;
    }
}

function makemove(index) {
    if (gameActive && board[index] === "") {
        // console.log('yes')
        board[index] = current;
        document.getElementsByClassName('cell')[index].innerText = current;
        if (checkWin(current)){
            document.getElementById('message').innerText = `${current} wins`;
            gameActive = false;
        }else if (board.indexOf('') === -1) {
            document.getElementById('message').innerText = "It's a draw!";
            gameActive = false;
        }else{
        current = otherplayer(current);
        if (current === 'O' && gameActive){
            makebestmove();
        }
        }
    }
}

function otherplayer(current){
    return (current === 'X') ? 'O' : 'X';
}

function makebestmove(){
    move = findbestmove(current);
    i = move.index;
    makemove(i);
}

function isFull(){
    if (board.indexOf('') === -1) {
        return true;
    }else{
        return false;
    }
}

function findbestmove(current){
    let move = new Move;
    const cells = document.getElementsByClassName('cell');
    let i = 0;
    for (let cell of cells){
        // console.log(i);
        if (board[i] === ''){
            cell.innerText = current;
            if (checkWin(current)){
                cell.innerText = '';
                return move;
            }
            cell.innerText = '';
        }
        i = i + 1;
    }
    let nocandidate = true;
    i = 0 
    for (let cell of cells){
        if (board[i] === ''){
            cell.innerText = current;
            let response = findbestmove(otherplayer(current));
            cell.innerText = '';
            if (response.score === -1){
                move.index = i;
                move.score = 1;
                return move;
            }
            else if (response.score === 0){
                move.index = i;
                move.score = 0;
                nocandidate = false;
            }
            else{
                if (nocandidate){
                    move.index = i;
                    move.score = -1;
                }
            }
        }
    }
    console.log(move.index);
    return move;
}

function checkWin(player) {
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    return winningCombos.some(combo =>
        combo.every(index => board[index] === player)
    );
}


function reset() {
    gameActive = true;
    current = 'X';
    board = ["", "", "", "", "", "", "", "", ""];
    document.getElementById('message').innerText = '';
    const cells = document.getElementsByClassName('cell');
    for (let cell of cells) {
        cell.innerText = ''; 
    }
}