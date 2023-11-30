import { readFileLines, getChallengeFromPath, writeFileSync } from "../utils.js";
import { fileURLToPath } from 'url';

const challenge = getChallengeFromPath(fileURLToPath(import.meta.url))
const input = readFileLines(challenge + '.txt').map(line => line.replace('\r', ''));

const validFiles = input
            .filter(fileChecksum => {
                const file = fileChecksum.split('-')[0]
                const fileChars = [...file]
                const checksumChars = [...fileChecksum.split('-')[1]]

                const checksumWithValidChar = checksumChars.every(charChecsum => (file.match(new RegExp(charChecsum, 'g'))||[]).length === 1)
                const checksumCharsWithWrongOrder = fileChars.reduce((acc, curr) => {
                    if (acc[0] === curr) acc.shift()
                    return acc
                }, checksumChars);

                return checksumWithValidChar && checksumCharsWithWrongOrder.length === 0
            })


writeFileSync(challenge + '.result', validFiles[32])