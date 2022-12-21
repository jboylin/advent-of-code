/*
Opponent:
A = Rock
B = Paper
C = Scissors

Player:
X = Rock
Y = Paper
Z = Scissors

#Scoring:
  Hand:
    Rock = 1
    Paper = 2
    Scissors = 3
  Win/Lose/Draw:
    Win = 6
    Draw = 3
    Lose = 0
*/

const { readFileSync } = require('fs')

const strategyGuide = readFileSync('./strategy.txt', 'utf-8').split('\n');

const handScore = (playersHand) => {
    switch (playersHand) {
        case 'X': return 1
        case 'Y': return 2
        case 'Z': return 3
        default: return;
    }
}

const winningHand = (bothHands) => {
    switch (bothHands[0]) {
        case 'A':
            switch (bothHands[1]) {
                case 'X': return 3
                case 'Y': return 6
                case 'Z': return 0
            }
        case 'B':
            switch (bothHands[1]) {
                case 'X': return 0
                case 'Y': return 3
                case 'Z': return 6
            }
        case 'C':
            switch (bothHands[1]) {
                case 'X': return 6
                case 'Y': return 0
                case 'Z': return 3
            }
        default: return
    }
}

const getScore = () => {
    let totalScore = 0;
    let handScoreTotal = 0;
    let winningHandTotal = 0;
    
    strategyGuide.forEach((combination) => {
        const splitCombination = combination.split(' ');
        winningHandTotal += winningHand(splitCombination)
        handScoreTotal += handScore(splitCombination[1])
    })
    totalScore = handScoreTotal + winningHandTotal;
    return totalScore;
}

console.log(getScore())
