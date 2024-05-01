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

const crosswordSolver = (emptyPuzzle, words) => {
    let wordsSplitted = wordSplitter(words)
    let crosswordSplitted = puzzleSplitter(emptyPuzzle)

    return wordsSplitted, crosswordSplitted
}

module.exports = {wordSplitter, puzzleSplitter, crosswordSolver}