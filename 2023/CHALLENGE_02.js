import { readFileSync, getChallengeFromPath, writeFileSync, appendFileSync } from "../utils.js";
import { fileURLToPath } from 'url';

const challenge = getChallengeFromPath(fileURLToPath(import.meta.url))
const input = readFileSync(challenge + '.txt');
writeFileSync(challenge + '.result', "")

const COMPILER_OPERATIONS = {
    '#': (value) => value + 1,
    '@': (value) => value - 1,
    '*': (value) => value * value,
    '&': (value) => { appendFileSync(challenge + '.result', "" + value); return value },
}

input.split('').reduce(function(acc, value) { 
    return COMPILER_OPERATIONS[value](acc)
}, 0)