const boardEle = document.querySelector('.js-board');
const rows = 6;  
const cols = 5;  


for (let i = 0; i < rows; i++) {
    const rowEle = document.createElement('div');
    rowEle.classList.add('row-tile'); 
    rowEle.setAttribute('data-index', i);
    boardEle.appendChild(rowEle);

    for (let j = 0; j < cols; j++) {
        const tileEle = document.createElement('div');
        tileEle.classList.add('tile');
        tileEle.setAttribute('data-index',j);
        rowEle.appendChild(tileEle);
    }
}

const rowOneKeys = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
const rowTwoKeys = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
const rowThreeKeys = ['Z', 'X', 'C', 'V', 'B','N', 'M'];
createKeys(rowOneKeys, 'row-one');
createKeys(rowTwoKeys, 'row-two');
createKeys(rowThreeKeys, 'row-three');

function createKeys(keyRowsArr, id) {
    const keyboardRowEle = document.getElementById(id);
    keyRowsArr.forEach((key) => {
        const keyEle = document.createElement('button');
        keyEle.textContent = key;   
        keyEle.classList.add('button-keys', 'js-button-keys');
        keyboardRowEle.appendChild(keyEle);
    });
}

//Adding margin to first and last key of row two
const keyboardRowTwoEle = document.getElementById('row-two');
const firstChildDiv = document.createElement('div');
firstChildDiv.classList.add("spacer");
const lastChildDiv = document.createElement('div');
lastChildDiv.classList.add("spacer");
keyboardRowTwoEle.prepend(firstChildDiv);
keyboardRowTwoEle.appendChild(lastChildDiv);

const keyBoardRowThreeEle = document.getElementById('row-three');

//Prepending enter button to row three
const enterButton = document.createElement('button');
enterButton.classList.add('enter-clear', 'button-keys');
enterButton.textContent = 'enter';
keyBoardRowThreeEle.prepend(enterButton);

//Appending a clear button with svg to row three
const clearButtonEle = document.createElement('button');
clearButtonEle.classList.add('enter-clear', 'button-keys', 'js-clear-button');
const svgEle = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svgEle.setAttribute("xmlns", "http://www.w3.org/2000/svg");
svgEle.setAttribute("height", "20");
svgEle.setAttribute("viewBox", "0 0 24 24");
svgEle.setAttribute("width", "20");
svgEle.classList.add("game-icon");

const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
path.setAttribute("fill", "white");
path.setAttribute(
  "d",
  "M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"
);
svgEle.appendChild(path);
clearButtonEle.appendChild(svgEle);
keyBoardRowThreeEle.appendChild(clearButtonEle);

//On click event for keys
let rowTilesFixed = false;
let currentRowTileIndex = 0;
let currentTileIndex = 0;
let enterClicked = false;

document.addEventListener('click', (event) => {
    const target = event.target;
    if (!rowTilesFixed && currentRowTileIndex < rows) {
        if (target.classList.contains('js-button-keys')) {
            console.log(currentRowTileIndex, currentTileIndex);
            const rowTileEle = document.querySelector(`.row-tile[data-index="${currentRowTileIndex}"]`);
            const tileEle = rowTileEle.querySelector(`.tile[data-index="${currentTileIndex}"]`);
            tileEle.textContent = target.textContent;
            
            currentTileIndex++;
            if (currentTileIndex === cols) {
                rowTilesFixed = true;
                currentRowTileIndex ++;
                currentTileIndex = 0;
            }
        }
    }
    if(target.classList.contains('enter-clear')) {
        if(target.textContent === 'enter')  {
            if(!rowTilesFixed) {
                console.log('Not enough letters');
                //Implememt a modal to show error message
            }
            else{
                rowTilesFixed = false;
                console.log('enter clicked');
                enterClicked = true;
            }
        }
    }
    if(target.classList.contains('js-clear-button') && currentTileIndex >= 0 ) {
        console.log('clear clicked');
        
        if(currentTileIndex === 0 && currentRowTileIndex > 0) { 
            console.log('entered here');
            currentRowTileIndex--;
            currentTileIndex = cols;
            rowTilesFixed = false; 
            //enterClicked = false;
        }
        const rowTileEle = document.querySelector(`.row-tile[data-index="${currentRowTileIndex}"]`);
         
        if(currentTileIndex > 0) {
            const tileEle = rowTileEle.querySelector(`.tile[data-index="${currentTileIndex - 1}"]`); 
            tileEle.textContent = '';
            currentTileIndex--;
            enterClicked = false;
        }
        console.log(currentTileIndex);
    }
});