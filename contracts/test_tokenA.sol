// SPDX-License-Identifier: MIT
pragma solidity >= 0.6.0 <= 0.9.0;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

contract TestTokenA is ERC20 {
    constructor(uint initialSupply) ERC20("TestTokenA", "TESTA") {
        _mint(msg.sender, initialSupply);
    }
}
