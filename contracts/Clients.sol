// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./DataCapToken.sol";

/// @custom:security-contact hfccr@outlook.com
contract Clients is Pausable, Ownable {
    mapping(address => bool) public verified;
    mapping(address => string) public verificationData;
    mapping(address => bool) public blacklisted;
    DataCapToken public dataCapToken;

    constructor(address _dataCapToken) {
        dataCapToken = DataCapToken(_dataCapToken);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function isVerified(address _account) public view returns (bool) {
        return verified[_account];
    }

    function verify(address _account, string memory _verificationData) public onlyOwner {
        verified[_account] = true;
        verificationData[_account] = _verificationData;
    }

    function updateVerificationData(
        address _account,
        string memory _verificationData
    ) public onlyOwner {
        verificationData[_account] = _verificationData;
    }

    function unverify(address _account) public onlyOwner {
        verified[_account] = false;
        blacklisted[_account] = true;
        burnAllDataCap(_account);
    }

    function getDataCap(address _receiver, uint256 _amount) public onlyOwner {
        dataCapToken.mint(_receiver, _amount);
    }

    function burnAllDataCap(address _account) public onlyOwner {
        dataCapToken.burnAll(_account);
    }

    function burnDataCap(address _account, uint256 _amount) public onlyOwner {
        dataCapToken.burnSome(_account, _amount);
    }
}
