// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import {IDIAOracleV2} from "./IDIAOracleV2.sol";
import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {SafeCast} from "@openzeppelin/contracts/utils/math/SafeCast.sol";

contract DiaToChainlinkAdapter is AggregatorV3Interface, Ownable {
    using SafeCast for int256;
    using SafeCast for uint128;

    error NotImplemented();

    IDIAOracleV2 private diaOracle;
    uint256 private _version;
    uint8 private _decimals;
    string private _description;
    string private _pairKey;

    constructor(address diaOracleAddress, string memory description_, string memory pairKey) {
        diaOracle = IDIAOracleV2(diaOracleAddress);
        _decimals = 8;
        _description = description_;
        _pairKey = pairKey;
    }

    function version() external view override returns (uint256) {
        return _version;
    }

    function setVersion(uint256 newVersion) external onlyOwner {
        _version = newVersion;
    }

    function decimals() external view override returns (uint8) {
        return _decimals;
    }

    function setDecimals(uint8 newDecimals) external onlyOwner {
        _decimals = newDecimals;
    }

    function description() external view override returns (string memory) {
        return _description;
    }

    function setDescription(string memory newDescription) external onlyOwner {
        _description = newDescription;
    }

    function getRoundData(uint80 /*_roundId*/)
    external
    pure
    returns (
      uint80  /*roundId*/,
      int256  /*answer*/,
      uint256 /*startedAt*/,
      uint256 /*updatedAt*/,
      uint80  /*answeredInRound*/
    ) {
        revert NotImplemented();
    }


    function latestRoundData() external view override returns (
        uint80 roundId_,
        int256 answer,
        uint256 startedAt,
        uint256 updatedAt,
        uint80 answeredInRound
    ) {
        (int128 value, uint128 timestamp) = getValueAndTimestamp();

        roundId_ = uint80(block.number);
        answer = value;
        startedAt = timestamp;
        updatedAt = timestamp;
        answeredInRound = uint80(block.number);
    }

    function getValueAndTimestamp() private view returns (int128, uint128) {
        (uint128 value, uint128 timestamp) = diaOracle.getValue(_pairKey);
        return (value.toInt256().toInt128(), timestamp);
    }
}
