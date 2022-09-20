var cells;
var bingo = [
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25]
];
const socket = io('http://localhost:8000')

socket.on('clicked-event', data => {
    // console.log(data);
    clickAutomatically(data);
})
socket.on('game-status', status => {
    alert("you lost opponent won the game");
})


function clickAutomatically(data) {
    var bingocells = document.getElementsByClassName("Bcells");
    for (var i = 0; i < bingocells.length; i++) {
        if (bingocells[i].innerHTML == data) {
            bingocells[i].style.backgroundColor = "#d2601a";
            MarkBingo(bingocells[i].id);
            validate();
        }
    }
}

const BNames = ["B", "I", "N", "G", "O"];
var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
function shuffle() {
    numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
    for (var i = 1; i <= 25; i++) {
        var cell = document.getElementById(i);
        var genNumber = numbers[Math.floor(Math.random() * numbers.length)];
        RemoveFormArray(genNumber);
        cell.innerHTML = genNumber;
    }
}
function RemoveFormArray(num) {
    const index = numbers.indexOf(num);
    if (index > -1)
        numbers.splice(index, 1)
}
function selected(div) {
    div.style.backgroundColor = "#e3b448"
    MarkBingo(div.id);
    socket.emit("selected-cell", div.innerHTML);
    validate();
}

function MarkBingo(n) {
    var row = parseInt(n / 5);
    var col = n - (5 * parseInt(n / 5)) - 1;
    if (col < 0) {
        row = row - 1;
        col = 4;
    }
    bingo[row][col] = -1;
    // console.log( bingo);
}

function validate() {
    var counter = 0;
    for (var i = 0; i < 5; i++) {
        if (bingo[i][0] == -1 && bingo[i][1] == -1 && bingo[i][2] == -1 && bingo[i][3] == -1 && bingo[i][4] == -1) {
            var letter = document.getElementById(BNames[counter]);
            letter.style.textDecoration = "line-through";
            letter.style.color = "#26495c";
            counter++;
        }
        if (bingo[0][i] == -1 && bingo[1][i] == -1 && bingo[2][i] == -1 && bingo[3][i] == -1 && bingo[4][i] == -1) {
            var letter = document.getElementById(BNames[counter]);
            letter.style.textDecoration = "line-through";
            letter.style.color = "#26495c";
            counter++;
        }

    }
    if (bingo[0][0] == -1 && bingo[1][1] == -1 && bingo[2][2] == -1 && bingo[3][3] == -1 && bingo[4][4] == -1) {
        var letter = document.getElementById(BNames[counter]);
        letter.style.textDecoration = "line-through";
        letter.style.color = "#26495c";
        counter++;
    }
    if (bingo[0][4] == -1 && bingo[1][3] == -1 && bingo[2][2] == -1 && bingo[3][1] == -1 && bingo[4][0] == -1) {
        var letter = document.getElementById(BNames[counter]);
        letter.style.textDecoration = "line-through";
        letter.style.color = "#26495c";
        counter++;
    }
    if (counter == 5) {
        socket.emit("User-Won");
        alert("congo you won");
    }
}
shuffle()
