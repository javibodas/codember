import { readFileLines, getChallengeFromPath, writeFileSync } from "../utils.js";
import { fileURLToPath } from 'url';

const challenge = getChallengeFromPath(fileURLToPath(import.meta.url))
const input = readFileLines(challenge + '.txt').map(line => line.replace('\r', ''));

const validateId = (id) => id && (id.match(/^[a-z\d\s]+$/i)||[]).length > 0
const validateUsername = (username) => username && (username.match(/^[a-z\d\s]+$/i)||[]).length > 0
const validateEmail = (email) => email && (email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i)||[]).length > 0
const validateAge = (age) => !age || (age.match(/^[\d]+$/)||[]).length > 0
const validateLocation = (location) => !location || (location.match(/^[a-z\s]+$/i)||[]).length > 0


const result = input.filter(user => {
    const [ id, username, email, age, location ] = user.split(',')

    return !validateId(id) || !validateUsername(username) ||
        !validateEmail(email) || !validateLocation(location) ||
        !validateAge(age)
})
.map(user => user.split(',')[1])
.reduce((acc, username) => {
    return acc + username[0]
},'')

writeFileSync(challenge + '.result', result)