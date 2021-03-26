// SPDX-License-Identifier: MIT
pragma solidity >= 0.6.0 <= 0.8.5;

import "hardhat/console.sol";

contract Greeter {
  string greeting;

  event Greeted(string greet);

  constructor(string memory _greeting, string memory token_address) {
    console.log("Deploying a Greeter with greeting:", _greeting);
    console.log(msg.sender);
    console.log('token address', token_address);
    greeting = _greeting;
  }

  function greet() public {
    emit Greeted(greeting);
  }

  function setGreeting(string memory _greeting) public {
    console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
    greeting = _greeting;
  }
}
