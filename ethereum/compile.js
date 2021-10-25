const fs = require('fs-extra')
const path = require('path')
const solc = require('solc')

const buildPath = path.resolve(__dirname, "build")
fs.removeSync(buildPath)

const campaignPath = path.resolve(__dirname, "contracts","Campaign.sol")
const source = fs.readFileSync(campaignPath, "utf8")
console.log("try to compile")
//https://stackoverflow.com/questions/53353167/npm-solc-assertionerror-err-assertion-invalid-callback-specified
const input = {
  language: 'Solidity',
  sources: {
      'Campaign.sol' : {
          content: source
      }
  },
  settings: {
      outputSelection: {
          '*': {
              '*': [ '*' ]
          }
      }
  }
};
const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts['Campaign.sol']
console.log("compiled")

fs.ensureDirSync(buildPath)

for (const contract in output) {
  fs.outputJSONSync(
    path.resolve(buildPath, contract.replace(':','') + ".json"),
    output[contract]
  )
}