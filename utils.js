import fs from "fs"

const readFileSync = (file) => {
    return fs.readFileSync(file, 'utf8')
}

const writeFileSync = (file, data) => {
    return fs.writeFileSync(file, data)
}

const readFileLines = (file) => {
    try { return readFileSync(file).split('\n') } 
    catch (err) { console.log(err); return [] }	
}

const writeFileLines = (file, arrayData) => {
    return writeFileSync(file, arrayData.reduce((prev, next) => prev + next + '\n',''))
}

const getChallengeFromPath = (path) => {
    const positionCodember = path.search('codember')
    return '.' + path.slice(positionCodember + 'codember'.length).replace('.js', '')
}

export { readFileSync, readFileLines, writeFileSync, writeFileLines, getChallengeFromPath }