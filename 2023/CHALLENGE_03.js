import { readFileLines, getChallengeFromPath, writeFileSync } from "../utils.js";
import { fileURLToPath } from 'url';

const challenge = getChallengeFromPath(fileURLToPath(import.meta.url))
const input = readFileLines(challenge + '.txt');

const wrongPassword = (ocurrences, min ,max ) => ocurrences < min || ocurrences > max

writeFileSync(challenge + '.result',
    input
    .map(securityPolicy => {
        const [ policy, password ] = securityPolicy.split(':')
        const [ occurrences, letter ] = policy.split(' ')
        const [ minOcurrences, maxOcurrences ] = occurrences.trim().split('-')
        const actualOcurrences = (password.trim().match(new RegExp(letter, 'g'))||[]).length

        return { 
            actualOcurrences, 
            minOcurrences, 
            maxOcurrences,
            password: password.trim() 
        }
    })
    .filter(sp => wrongPassword(sp.actualOcurrences, sp.minOcurrences, sp.maxOcurrences))
    .map(sp => sp.password)
    [41]
)