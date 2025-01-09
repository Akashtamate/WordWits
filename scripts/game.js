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