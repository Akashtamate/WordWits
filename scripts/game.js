const boardEle = document.querySelector('.js-board');

for(i = 0; i < 6; i ++) {
    let RowEle = document.createElement('div');
    RowEle.classList.add('Row-tile');
    boardEle.appendChild(RowEle);
}

Array.from(boardEle.children).forEach((child) => {
    for(i = onabort; i< 5; i++) {
        let eachRowTileEle = document.createElement('div');
        eachRowTileEle.classList.add('tile');
        child.appendChild(eachRowTileEle);
    }  
});