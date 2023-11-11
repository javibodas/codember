import { readFileSync, getChallengeFromPath, writeFileSync } from "../utils.js";
import { fileURLToPath } from 'url';

const challenge = getChallengeFromPath(fileURLToPath(import.meta.url))
const data = readFileSync(challenge + '.txt');

const result =
    [...(new Set(data.toLowerCase().split(' ')))]
    .reduce(function(acc, word) { return acc += word + (data.match(new RegExp(word, 'g'))||[]).length }, '')

writeFileSync(challenge + '.result', result)