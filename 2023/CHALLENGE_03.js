import { readFileLines, getChallengeFromPath, writeFileSync } from "../utils.js";
import { fileURLToPath } from 'url';

const challenge = getChallengeFromPath(fileURLToPath(import.meta.url))
const input = readFileLines(challenge + '.txt');

const wrongPasswords = input
    .map(securityPolicy => {
        const policy = securityPolicy.split(':')[0]
        const password = securityPolicy.split(':')[1].trim()
        const letter = policy.split(' ')[1]
        const occurrences = policy.split(' ')[0].trim().split('-')

        return { min: occurrences[0], max: occurrences[1], letter, password }
    })
    .filter(mapped => {
        const ocurrences = (mapped.password.match(new RegExp(mapped.letter, 'g'))||[]).length
        return ocurrences < mapped.min || ocurrences > mapped.max
    })
    .map(mapped => mapped.password)

writeFileSync(challenge + '.result', wrongPasswords[41])