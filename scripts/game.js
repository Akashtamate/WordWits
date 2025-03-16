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
const validWordsArr = ['ADIEU', 'AUDIO', 'GRECE', 'ROCHE', 'CHORE', 'BLISS', 'AKASH']; //For testing
const randomFinalWord = validWordsArr[Math.floor(Math.random() * validWordsArr.length)]; //For testing
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
 * Event listener for handling key presses from on-screen keyborad
 */
document.addEventListener('click', (event) => {
    const target = event.target;
    const eventFromKeyboard = false;
    // Handle adding letters
    handleLetter(target, eventFromKeyboard);

    // Handle 'enter' button
    if (target.classList.contains('enter-clear')) {
        if (target.textContent === 'enter') {
            handleEnter();
        }
    }

    // Handle 'clear' button
    if (target.classList.contains('js-clear-button')) {
        handleClear();
    }
    console.log(`Row: ${currentRowTileIndex}, Tile: ${currentTileIndex}, Row States: ${rowStates}`);
});

/**
 * Event listener for handling key presses from the physical keyboard
 */
document.addEventListener('keydown', (event) => {
    const key = event.key.toUpperCase();
    const eventFromKeyboard = true;
    if(key === 'ENTER') {
        handleEnter();
    }
    else if(key === 'BACKSPACE'){
        handleClear();
    }
    else if(/^[A-Z]$/.test(key)) {
        handleLetter(key, eventFromKeyboard);
    }
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
 * Function to handle adding of letters
 * @param {*} target 
 * @param {*} eventFromKeyboard 
 * @returns 
 */
function handleLetter(target, eventFromKeyboard) {
    if (!rowStates[currentRowTileIndex] && currentRowTileIndex < rows) {
        if (eventFromKeyboard  || target.classList.contains('js-button-keys')) {
            if (currentTileIndex >= cols) {
                console.log('All 5 letters have been entered. Press "enter" to submit or "clear" to edit.');
                return; // Prevent further action if the row is already filled
            }

            const rowTileEle = document.querySelector(`.row-tile[data-index="${currentRowTileIndex}"]`);
            const tileEle = rowTileEle.querySelector(`.tile[data-index="${currentTileIndex}"]`);
            if(eventFromKeyboard) {
                tileEle.textContent = target;
                tileEle.style.border ='2px solid #565758';
            }
            else {
                tileEle.textContent = target.textContent;
                tileEle.style.border ='2px solid #565758';
            }
            
            // **Apply the pop effect**
            tileEle.classList.add('pop-effect');

            setTimeout(() => {
                tileEle.classList.remove('pop-effect');
            }, 150); 

            currentTileIndex++;
            if (currentTileIndex === cols) {
                console.log('Row is filled, waiting for "enter" to freeze or "clear" to edit.');
            }
        }
    }
}

/**
 * Function to handle 'enter' button press
 */
function handleEnter() {
    const currentWord = document.querySelector(`.row-tile[data-index="${currentRowTileIndex}"]`).textContent;

    if (currentTileIndex < cols) {
        invalidEntryEle.textContent = 'Not enough letters';
        handleInvalidEntry();
        shakeAnimation(currentRowTileIndex);
    } 
    else {
        console.log(`Row ${currentRowTileIndex} submitted: ${currentWord}`);

        if (!(validWordsArr.includes(currentWord))) {
            invalidEntryEle.textContent = 'Not in word list';
            handleInvalidEntry();
            shakeAnimation(currentRowTileIndex);
        }
        else {
            if (currentWord === randomFinalWord) {
                console.log('Congratulations! You have won the game.');
                rowStates[currentRowTileIndex] = true; // Freeze the row after pressing enter
                flipAnimation(currentRowTileIndex, true).then(() => {
                    jumpAnimation(currentRowTileIndex);
                });
                return;
            } 
            else {
                let letterCount = {}; // Track letter occurrences in randomFinalWord

                for (let char of randomFinalWord) {
                    letterCount[char] = (letterCount[char] || 0) + 1;
                }

                let resultColors = Array(cols).fill('#3a3a3c'); // Default all tiles to black
                
                // First pass: Handle Green (Correct Position)
                for (let i = 0; i < cols; i++) {
                    let guessedLetter = currentWord[i];

                    if (guessedLetter === randomFinalWord[i]) {
                        resultColors[i] = '#538d4e'; 
                        letterCount[guessedLetter]--; // Reduce count as it's already used
                    }
                }

                // Second pass: Handle Yellow (Correct Letter, Wrong Position)
                for (let i = 0; i < cols; i++) {
                    let guessedLetter = currentWord[i];

                    if (resultColors[i] === '#538d4e') continue; // Skip already processed greens

                    if (randomFinalWord.includes(guessedLetter) && letterCount[guessedLetter] > 0) {
                        resultColors[i] = '#b59f3b';
                        letterCount[guessedLetter]--; // Reduce available occurrences
                    }
                }

                rowStates[currentRowTileIndex] = true; // Freeze the row after pressing enter
                flipAnimation(currentRowTileIndex, false, resultColors).then(() => {
                    currentRowTileIndex++; // Move to next row
                    currentTileIndex = 0; // Reset tile index for new row
                    console.log('Row submitted and frozen.');
                });
            }
        }  
    }
}


/**
 * Function to handle 'clear' button press
 */
function handleClear() {
    if (!rowStates[currentRowTileIndex] && currentTileIndex > 0) {
        const rowTileEle = document.querySelector(`.row-tile[data-index="${currentRowTileIndex}"]`);
        const tileEle = rowTileEle.querySelector(`.tile[data-index="${currentTileIndex - 1}"]`);
        tileEle.textContent = ''; // Clear the last tile
        tileEle.style.border = '2px solid #3a3a3c';
        currentTileIndex--;
    }
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

/**
 * @param {*} currentRowTileIndex 
 * Function to animate the row tile when invalid entry is made
 */
function shakeAnimation(currentRowTileIndex) {
    let shakeTimeout
    const rowTileEle = document.querySelector(`.row-tile[data-index="${currentRowTileIndex}"]`); 
    rowTileEle.classList.add('shake-animation');
    clearTimeout(shakeTimeout);
    shakeTimeout = setTimeout(() => {
        rowTileEle.classList.remove('shake-animation');
    }, 600);
}

/*
    * @param {*} currentRowTileIndex 
    * @param {*} isWin 
    * @param {*} resultColors 
    * Function to animate the row tile when valid entry is made
    */
// function flipAnimation(currentRowTileIndex, isWin, resultColors) {
//     const rowTileEle = document.querySelector(`.row-tile[data-index="${currentRowTileIndex}"]`); 
    
//     for(let i = 0; i < cols; i++) {
//         let currentTile = rowTileEle.querySelector(`.tile[data-index="${i}"]`);

//         setTimeout(() => {
//             currentTile.classList.add('flip-animation');

//             // Midway through the animation (250ms), change letter and color
//             setTimeout(() => {
//                 if (isWin) {
//                     currentTile.style.backgroundColor = '#538d4e';
//                 }
//                 else {
//                     currentTile.style.backgroundColor = resultColors[i];
//                 }
//                 currentTile.style.border = 'none';
//             }, 250); // Change color midway through flip (half of 500ms duration)

//             // Remove animation class after it completes
//             setTimeout(() => {
//                 currentTile.classList.remove('flip-animation');
//             }, 500); // Matches animation duration
//         }, i * 300); // Staggered delay for smooth effect
//     }
// }

function flipAnimation(currentRowTileIndex, isWin, resultColors) {
    return new Promise((resolve) => {
        const rowTileEle = document.querySelector(`.row-tile[data-index="${currentRowTileIndex}"]`); 
        let completedAnimations = 0; // To track when all tiles finish flipping

        for (let i = 0; i < cols; i++) {
            let currentTile = rowTileEle.querySelector(`.tile[data-index="${i}"]`);

            setTimeout(() => {
                currentTile.classList.add('flip-animation');

                // Midway through the animation (250ms), change letter and color
                setTimeout(() => {
                    if (isWin) {
                        currentTile.style.backgroundColor = '#538d4e';
                    } else {
                        currentTile.style.backgroundColor = resultColors[i];
                    }
                    currentTile.style.border = 'none';
                }, 250); // Change color midway through flip

                // Remove animation class after it completes
                setTimeout(() => {
                    currentTile.classList.remove('flip-animation');
                    completedAnimations++;

                    // If all tiles in the row have finished flipping, resolve the Promise
                    if (completedAnimations === cols) {
                        resolve(); // Resolves when all animations in the row are done
                    }
                }, 500); // Matches animation duration
            }, i * 300); // Staggered delay for smooth effect
        }
    });
}


function jumpAnimation(currentRowTileIndex) {
    const rowTileEle = document.querySelector(`.row-tile[data-index="${currentRowTileIndex}"]`);
    const tiles = rowTileEle.querySelectorAll('.tile');

    tiles.forEach((tile, index) => {
        setTimeout(() => {
            tile.classList.add('jump-effect');

            // Remove class after animation completes (to allow re-triggering)
            setTimeout(() => {
                tile.classList.remove('jump-effect');
            }, 300); // Match animation duration
        }, index * 100); // Delay each tile slightly for a wave effect
    });
}


