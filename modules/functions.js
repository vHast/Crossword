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

const wordAdder = (finalPuzzle, puzzleIndexRow, puzzleIndexColumn, word) => {

    wordToAddArray = word.split('')
    console.log(`wordToAdd splitted: ${wordToAddArray}`)
    solvedPuzzle = [...finalPuzzle]
    console.log(solvedPuzzle)
    let targetRow = [...finalPuzzle[puzzleIndexRow]]
    console.log(`targetRow = ${targetRow} `)

    for (let i = 0; i < finalPuzzle[puzzleIndexRow].length; i++) {
        targetRow[puzzleIndexColumn + i] = wordToAddArray[i]
        console.log(`Addition loop ${i}, targetRow = ${targetRow}`)
    }

    console.log(`targetRow vale after loop ${targetRow}`)
    console.log(`solvedPuzzle[puzzleIndexRow] = ${solvedPuzzle[puzzleIndexRow]}`)
    solvedPuzzle[puzzleIndexRow] = targetRow
    console.log(`solvedPuzzle after addition = ${solvedPuzzle}`)
    return solvedPuzzle
}

const firstScan = (puzzleArr, words) => {
    wordList = words
    let finalPuzzle = puzzleArr

    for (let i = 0; i < puzzleArr.length; i++) {
        console.log(`Checking row: ${i}`)
        for (let j = 0; j < puzzleArr.length; j++) {
            console.log(`Checking column: ${j}`)
            if (puzzleArr[i][j] == 2 || puzzleArr[i][j] == 1 ) {

                // Count distance
                distanceRow = 0
                // distanceColumn = 0

                // Row distance
                for (let k = j; k < puzzleArr.length; k++) {
                    if (puzzleArr[i][k] != 1 || puzzleArr[i][k] != 2) {
                        distanceRow++
                    } else if (puzzleArr[i][k] == 1 || puzzleArr[i][k] == "." || puzzleArr[i][k] == 2) {
                        break
                    }
                }

                console.log(`Current row distance: ${distanceRow}`)

                // Get word
                let wordToAdd = ""
                let indexToRemove = 0

                for (let m = 0; m < words.length; m++) {
                    if ( words[m].length == distanceRow) {
                        wordToAdd = words[m]
                        indexToRemove = words.indexOf(words[m])
                        break
                    }
                }

                if (wordToAdd == "") {
                    console.log("No words were available to complete this row/column")
                    break
                }

                words.splice(indexToRemove, 1)

                let indexY = i 
                let indexZ = j

                console.log(`Indexes: Y: ${indexY}, X: ${indexZ}`)
                console.log(`wordToAdd value: ${wordToAdd}`)


                finalPuzzle = wordAdder(finalPuzzle, indexY, indexZ, wordToAdd)
                console.log(`finalPuzzle after the wordAdder ${finalPuzzle}`)
            }
        }
    }
    console.log(`Finalpuzzle before return:${finalPuzzle}`)
    return finalPuzzle
}

const crosswordSolver = (emptyPuzzle, words) => {
    let crosswordSplitted = puzzleSplitter(emptyPuzzle);

    let solvedPuzzle = firstScan(crosswordSplitted, words);
    console.log(solvedPuzzle)
    return solvedPuzzle;
}

module.exports = {wordSplitter, puzzleSplitter, crosswordSolver}