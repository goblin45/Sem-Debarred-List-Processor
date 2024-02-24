const fs = require('fs')
const { TabularRepresentation } = require('./tabularRep.js')

const csvData = fs.readFileSync('data.csv', 'utf-8');

const rows = csvData.split('\n').map(row => row.split(','));

var debarredFromTerm = []
let maxNameLen = 0
for (let i = 4; i < rows.length; i++) {
    try {
        let secStr = rows[i][0], rollStr = rows[i][1], nameStr = rows[i][3], leavesStr = rows[i][4]
        secStr = secStr.substring(1, secStr.length - 1)
        rollStr = rollStr.substring(1, rollStr.length - 1)
        nameStr = nameStr.substring(1, nameStr.length - 1)
        leavesStr = leavesStr.substring(1, leavesStr.length - 1)
        if (Number(leavesStr) > 12) {
            debarredFromTerm.push({name: nameStr, sec: secStr, roll: rollStr, leaves: leavesStr})
            maxNameLen = (maxNameLen < nameStr.length) ? maxNameLen = nameStr.length : maxNameLen
        }
    } catch (error) {
        continue;
    }
}

debarredFromTerm.sort((student1, student2) => student2.leaves - student1.leaves)

maxNameLen += 10

console.log('Debarred From 6th sem exam: \n')

TabularRepresentation(maxNameLen, debarredFromTerm)
