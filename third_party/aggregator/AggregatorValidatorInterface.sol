// SPDX-License-Identifier: MIT
// https://github.com/smartcontractkit/libocr/blob/d12971936c1289ae0d512723a9e8535ce382ff6d/contract/AggregatorValidatorInterface.sol
pragma solidity ^0.7.0;

interface AggregatorValidatorInterface {
  function validate(
    uint256 previousRoundId,
    int256 previousAnswer,
    uint256 currentRoundId,
    int256 currentAnswer
  ) external returns (bool);
}