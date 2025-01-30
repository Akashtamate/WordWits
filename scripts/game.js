// Selecting the board element where tiles will be added
const boardEle = document.querySelector('.js-board');
const rows = 6; // Number of rows (maximum attempts)
const cols = 5; // Number of columns (letters per word)

// Defining keyboard layout (keys for each row)
const rowOneKeys = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
const rowTwoKeys = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
const rowThreeKeys = ['Z', 'X', 'C', 'V', 'B','N', 'M'];

// Game state tracking variables
let currentRowTileIndex = 0; // Tracks current row index
let currentTileIndex = 0; // Tracks current tile position within a row
let rowStates = Array(rows).fill(false); // Boolean array to track frozen (submitted) rows

//Handling Invalid entry of letters
const invalidEntryContainerEle = document.querySelector('.js-invalid-entry-container');
const invalidEntryEle = invalidEntryContainerEle.querySelector('.js-inavalid-entry');

const dbWord = 'AKASH'; //For testing 

/**
 * Creating the game board dynamically with rows and tiles
 */
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

// Creating the on-screen keyboard
createKeys(rowOneKeys, 'row-one');
createKeys(rowTwoKeys, 'row-two');
createKeys(rowThreeKeys, 'row-three');

// Adding spacing for row two's first and last keys
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

// Adding 'Clear' button with an SVG icon to row three
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

/**
 * Event listener for handling key presses and game logic
 */
document.addEventListener('click', (event) => {
    const target = event.target;

    // Handle adding letters
    if (!rowStates[currentRowTileIndex] && currentRowTileIndex < rows) {
        if (target.classList.contains('js-button-keys')) {
            if (currentTileIndex >= cols) {
                console.log('All 5 letters have been entered. Press "enter" to submit or "clear" to edit.');
                return; // Prevent further action if the row is already filled
            }

            const rowTileEle = document.querySelector(`.row-tile[data-index="${currentRowTileIndex}"]`);
            const tileEle = rowTileEle.querySelector(`.tile[data-index="${currentTileIndex}"]`);
            tileEle.textContent = target.textContent;

            currentTileIndex++;
            if (currentTileIndex === cols) {
                console.log('Row is filled, waiting for "enter" to freeze or "clear" to edit.');
            }
        }
    }

    // Handle 'enter' button
    if (target.classList.contains('enter-clear')) {
        if (target.textContent === 'enter') {
            if (currentTileIndex < cols) {
                invalidEntryEle.textContent = 'Not enough letters';
                handleInvalidEntry();
            } 
            else {
                const currentWord = document.querySelector(`.row-tile[data-index="${currentRowTileIndex}"]`).textContent;
                console.log(`Row ${currentRowTileIndex} submitted: ${currentWord}`);
                if(currentWord !== dbWord) { //This is for testing
                    invalidEntryEle.textContent = 'Not in word list';
                    handleInvalidEntry();
                }
                else {
                    rowStates[currentRowTileIndex] = true; // Freeze the row after pressing enter
                    currentRowTileIndex++; // Move to the next row
                    currentTileIndex = 0; // Reset tile index for the new row
                    console.log('Row submitted and frozen.');
                }
                
            }
        }
    }

    // Handle 'clear' button
    if (target.classList.contains('js-clear-button')) {
        if (!rowStates[currentRowTileIndex] && currentTileIndex > 0) {
            const rowTileEle = document.querySelector(`.row-tile[data-index="${currentRowTileIndex}"]`);
            const tileEle = rowTileEle.querySelector(`.tile[data-index="${currentTileIndex - 1}"]`);
            tileEle.textContent = ''; // Clear the last tile
            currentTileIndex--;
        }
    }
    console.log(`Row: ${currentRowTileIndex}, Tile: ${currentTileIndex}, Row States: ${rowStates}`);
});

/**
 * Function to create keys for each row of the keyboard
 * @param {Array} keyRowsArr - Array of keys for the row
 * @param {string} id - ID of the keyboard row container
 */
function createKeys(keyRowsArr, id) {
    const keyboardRowEle = document.getElementById(id);
    keyRowsArr.forEach((key) => {
        const keyEle = document.createElement('button');
        keyEle.textContent = key;   
        keyEle.classList.add('button-keys', 'js-button-keys');
        keyboardRowEle.appendChild(keyEle);
    });
}

/**
 * Displays an invalid entry message briefly
 */
function handleInvalidEntry() {
    let invalidEntryTimeout;
    invalidEntryContainerEle.classList.add('show');      
    clearTimeout(invalidEntryTimeout);
    invalidEntryTimeout = setTimeout(() => {
        invalidEntryContainerEle.classList.remove('show'); 
    }, 1000);
}

