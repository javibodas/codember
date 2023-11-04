import { readFileSync, getChallengeFromPath } from "../utils.js";
import { fileURLToPath } from 'url';

const challenge = getChallengeFromPath(fileURLToPath(import.meta.url))
const data = readFileSync(challenge + '.txt');

const words = (new Set(data.toLowerCase().split(' ')));
console.log(
    [...words]
    .reduce(function(acc, word) { return acc += word + (data.match(new RegExp(word, 'g'))||[]).length }, '')
);