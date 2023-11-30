import { readFileLines, getChallengeFromPath, writeFileSync } from "../utils.js";
import { fileURLToPath } from 'url';

const challenge = getChallengeFromPath(fileURLToPath(import.meta.url))
const input = readFileLines(challenge + '.txt').map(line => line.replace('\r', ''));

const charExistsOneTimeInString = (c, str) => (str.match(new RegExp(c, 'g'))||[]).length === 1

writeFileSync(challenge + '.result',
    input
    .filter(fileChecksum => {
        const [ file, checkSum ] = fileChecksum.split('-')
        const fileChars = [...file]
        const checksumChars = [...checkSum]

        const charExistsInString = checksumChars.every(char => charExistsOneTimeInString(char, file))
        const charsWithWrongOrder = fileChars.reduce((chars, fileChar) => {
            if (chars[0] === fileChar) chars.shift()
            return chars
        }, checksumChars);

        return charExistsInString && charsWithWrongOrder.length === 0
    })[32]
)