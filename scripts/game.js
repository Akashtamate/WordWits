const boardEle = document.querySelector('.js-board');
const rows = 6;  
const cols = 5;  


for (let i = 0; i < rows; i++) {
    const rowEle = document.createElement('div');
    rowEle.classList.add('row-tile'); 
    boardEle.appendChild(rowEle);

    for (let j = 0; j < cols; j++) {
        const tileEle = document.createElement('div');
        tileEle.classList.add('tile');
        rowEle.appendChild(tileEle);
    }
}

const rowOneKeys = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
const rowTwoKeys = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
const rowTHreeKeys = ['Enter', 'Z', 'X', 'C', 'V', 'B','N', 'M'];
const keyboardRowOneEle = document.getElementById('row-one');
createKeys(rowOneKeys, 'row-one');
createKeys(rowTwoKeys, 'row-two');

function createKeys(keyRowsArr, id) {
    const keyboardRowEle = document.getElementById(id);
    keyRowsArr.forEach((key) => {
        const keyEle = document.createElement('button');
        keyEle.textContent = key;   
        keyEle.classList.add('button-keys');
        keyboardRowEle.appendChild(keyEle);
    });
}

const keyboardRowEle = document.getElementById('row-two');
const firstAndLastChildDiv = document.createElement('div');
firstAndLastChildDiv.classList.add("spacer");

