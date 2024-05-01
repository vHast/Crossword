const wordSplitter =(values)=> {
    const arrWords = []
    for (let i = 0; i < values.length; i++ ) {
        let splittedWord = values[i].split('')
        arrWords.push(splittedWord)
    } 

    return arrWords // Returns a 2D array of each word
}

const puzzleSplitter = (values) => {
    const arrWords = [];
    const lines = values.split('\n');
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const characters = line.split('');
        arrWords.push(characters);
    } 
    return arrWords; // Returns a 2D array of the puzzle
}

const wordAdder = (finalPuzzle, puzzleIndexRow, puzzleIndexColumn, word, isVertical = false) => {
    const wordToAddArray = word.split('');
    const solvedPuzzle = finalPuzzle.map(row => [...row]);

    if (isVertical) {
        for (let i = 0; i < word.length; i++) {
            solvedPuzzle[puzzleIndexRow + i][puzzleIndexColumn] = wordToAddArray[i];
        }
    } else {
        for (let i = 0; i < word.length; i++) {
            solvedPuzzle[puzzleIndexRow][puzzleIndexColumn + i] = wordToAddArray[i];
        }
    }

    return solvedPuzzle;
};

const firstScan = (puzzleArr, words) => {
    let finalPuzzle = puzzleArr;
    let wordList = words.slice();

    for (let i = 0; i < puzzleArr.length; i++) {
        for (let j = 0; j < puzzleArr[i].length; j++) {
            if (puzzleArr[i][j] == 2 || puzzleArr[i][j] == 1) {
                // Check row-wise word placement
                let distanceRow = 0;
                for (let k = j; k < puzzleArr[i].length; k++) {
                    if (puzzleArr[i][k] == '.' || !isNaN(puzzleArr[i][k])) {
                        distanceRow++;
                    } else {
                        break;
                    }
                }

                let wordToAddRow = "";
                let indexToRemoveRow = -1;
                for (let m = 0; m < wordList.length; m++) {
                    if (wordList[m].length == distanceRow) {
                        wordToAddRow = wordList[m];
                        indexToRemoveRow = m;
                        break;
                    }
                }

                if (wordToAddRow !== "") {
                    finalPuzzle = wordAdder(finalPuzzle, i, j, wordToAddRow);
                    wordList.splice(indexToRemoveRow, 1);
                }

                // Check column-wise word placement
                let distanceColumn = 0;
                for (let k = i; k < puzzleArr.length; k++) {
                    if (puzzleArr[k][j] == '.' || !isNaN(puzzleArr[k][j])) {
                        distanceColumn++;
                    } else {
                        break;
                    }
                }

                let wordToAddColumn = "";
                let indexToRemoveColumn = -1;
                for (let m = 0; m < wordList.length; m++) {
                    if (wordList[m].length == distanceColumn) {
                        wordToAddColumn = wordList[m];
                        indexToRemoveColumn = m;
                        break;
                    }
                }

                if (wordToAddColumn !== "") {
                    finalPuzzle = wordAdder(finalPuzzle, i, j, wordToAddColumn, true);
                    wordList.splice(indexToRemoveColumn, 1);
                }
            }
        }
    }

    return finalPuzzle;
};

const crosswordSolver = (emptyPuzzle, words) => {
    let crosswordSplitted = puzzleSplitter(emptyPuzzle);
    let solvedPuzzle = firstScan(crosswordSplitted, words);
    return solvedPuzzle.map(row => row.join('')).join('\n');
};

module.exports = {wordSplitter, puzzleSplitter, crosswordSolver}