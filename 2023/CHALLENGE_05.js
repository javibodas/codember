import { readFileLines, getChallengeFromPath, writeFileSync } from "../utils.js";
import { fileURLToPath } from 'url';

const challenge = getChallengeFromPath(fileURLToPath(import.meta.url))
const input = readFileLines(challenge + '.txt').map(line => line.replace('\r', ''));

const isValidId = (id) => id && (id.match(/^[a-z\d\s]+$/i)||[]).length > 0
const isValidUsername = (username) => username && (username.match(/^[a-z\d\s]+$/i)||[]).length > 0
const isValidEmail = (email) => email && (email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i)||[]).length > 0
const isValidAge = (age) => !age || (age.match(/^[\d]+$/)||[]).length > 0
const isValidLocation = (location) => !location || (location.match(/^[a-z\s]+$/i)||[]).length > 0
const isValidUser = (user) => isValidId(user.id) && isValidUsername(user.username) && 
                            isValidEmail(user.email) && isValidLocation(user.location) && 
                            isValidAge(user.age)


writeFileSync(challenge + '.result',
    input
    .map(userRaw => {
        const [ id, username, email, age, location ] = userRaw.split(',')
        return { id, username, email, age, location }
    })
    .filter(user => !isValidUser(user))
    .reduce((acc, user) => {
        return acc + user.username[0]
    },'')
)