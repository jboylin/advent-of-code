//Day 1
const { readFileSync } = require('fs')

const calories = readFileSync('./calories.txt', 'utf-8').split("\n\n");

const total = [];

for (let index = 0; index < calories.length; index++) {
    const elfCalories = calories[index].split('\n').reduce((previous, current) => parseInt(previous) + parseInt(current), 0);

    total.push(elfCalories);
}

total.sort((a, b) => b - a)

console.log('top elf is carrying: ',total[0])
console.log('top 3 elves are carrying: ', total[0] + total[1] + total[2])