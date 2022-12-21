/*
#Part 1 rules

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
/*
#Part 2 rules

Player:
X = lose
Y = draw
Z = win
*/

const { readFileSync } = require('fs')

const strategyGuide = readFileSync('./strategy.txt', 'utf-8').split('\n');

const handScore = (playersHand) => {
    const hand = playersHand[1]
    switch (hand) {
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

const winLoseDraw = (bothHands) => {
    const xyz = bothHands[1];
    switch (xyz) {
        case 'X': return 'LOSE'
        case 'Y': return 'DRAW'
        case 'Z': return 'WIN'
    }
}

const throwOrWin = (winLoseDraw, opponentHand) => {
    switch (opponentHand) {
        case 'A':
            switch (winLoseDraw) {
                case 'LOSE': return 'Z'
                case 'DRAW': return 'X'
                case 'WIN': return 'Y'
            }
        case 'B':
            switch (winLoseDraw) {
                case 'LOSE': return 'X'
                case 'DRAW': return 'Y'
                case 'WIN': return 'Z'
            }
        case 'C':
            switch (winLoseDraw) {
                case 'LOSE': return 'Y'
                case 'DRAW': return 'Z'
                case 'WIN': return 'X'
            }
    }
}

const getScore = (round = 1) => {
    let totalScore = 0;
    let handScoreTotal = 0;
    let winningHandTotal = 0;
    
    if (round === 1) {
        strategyGuide.forEach((combination) => {
            const splitCombination = combination.split(' ');
            winningHandTotal += winningHand(splitCombination);
            handScoreTotal += handScore(splitCombination);
        })
        totalScore = handScoreTotal + winningHandTotal;
    }

    if (round === 2) {
        strategyGuide.forEach((combination) => {
            const splitCombination = combination.split(' ');
            winningHandTotal += winningHand([splitCombination[0], throwOrWin(winLoseDraw(splitCombination), splitCombination[0])])
            handScoreTotal += handScore([splitCombination[0], throwOrWin(winLoseDraw(splitCombination), splitCombination[0])]);
        })
        totalScore = handScoreTotal + winningHandTotal;
    }
    return totalScore;
}

console.log(getScore())
