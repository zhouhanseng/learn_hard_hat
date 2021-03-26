require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-web3")
const Web3  = require('web3')
const fs = require('fs').promises

const web3 = new Web3()

task("test:prepare_data", "Generate data that required by test", async (taskArguments, hre) => {
  /* As hardhat allows to access its runtime environment variables, 
    we don't need to declare the self-generated accounts as a global variable */
  console.log(hre.config.networks.hardhat.accounts.length)
  console.log(taskArguments, 123)
  console.log('process.env.REAL', process.env.REAL)
  await fs.writeFile('./temp/generated.js', `module.exports = { data: ${Math.random()} }`)
})

/* subtasks help us get rid of another script and
  package json script like `hardhat prepare_data && hardhat test` */
task("test:finally", "Test after data prepared")
  /* pass param from cli: `hardhat test:finally --real true` */
  .addOptionalParam("real", "whether using real data", "false")
  .setAction(async (taskArguments) => {
    await run("test:prepare_data")
    /* but pass param to a built-in task is not convenient, recommend using node's process.env */
    await run("test")
  })

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  networks: {
    hardhat: {
      /* if using ganache + truffle, to handle self-generated accounts,
      you have to write more code to launch server with ganache-core api */
      accounts: [...new Array(15)].map(() => {
        const {privateKey} = web3.eth.accounts.create()
        return {
          balance: '0x' + (10 ** 20).toString(16),
          privateKey
        }
      })
    }
  },
  solidity: "0.7.0",
};

