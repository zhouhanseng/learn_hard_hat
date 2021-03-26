const { expect } = require("chai");
const BigNumber = require('bignumber.js')
const { data } = require('../temp/generated')
const {
  getEventLogs
} = require("./utils")
const {
  greet_encode,
  greet_type
} = require("./constants")

describe("Greeter", function(taskArguments) {
  this.beforeAll(async function () {
    console.log('data', data)
    console.log(taskArguments, 'ggg')
    const amount = new BigNumber(1e27).toFixed()
    accounts = await ethers.getSigners()
    creator = accounts[0]
    /* get rid of migration.js */
    const TestTokenA = await ethers.getContractFactory("TestTokenA");    
    const testTokenA = await TestTokenA.deploy(amount)
    testTokenADeployed = await testTokenA.deployed();
    console.log(testTokenADeployed.address)
    console.log(accounts[1].address)
    const Greeter = await ethers.getContractFactory("Greeter", /* default to accounts[0] */);
    const greeter = await Greeter.deploy("Hello, world!", testTokenADeployed.address);
    greeterDeployed = await greeter.deployed();

    await testTokenADeployed.transfer(greeterDeployed.address, amount)
  })

  it("Should return the new greeting once it's changed", async function() {    
    const balance = await testTokenADeployed.balanceOf(greeterDeployed.address) /* get rid of testTokenADeployed.balanceOf.sendTransaction */
    console.log('balance', balance.toString())
    await greeterDeployed.greet()
    const log = await getEventLogs(greeterDeployed.address, greet_encode, greet_type)
    console.log('log', log)
    // await greeterDeployed.setGreeting("Hola, mundo!");
    // expect(await greeterDeployed.greet()).to.equal("Hola, mundo!");
  });
});
