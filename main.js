const { wordSplitter, crosswordSolver } = require("./modules/functions")

const emptyPuzzle = `2001
0..0
1000
0..0`


const words = ['casa', 'alan', 'ciao', 'anta']

console.log(crosswordSolver(emptyPuzzle, words))