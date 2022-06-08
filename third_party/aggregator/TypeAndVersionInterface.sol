// SPDX-License-Identifier: MIT
// https://github.com/smartcontractkit/libocr/blob/d12971936c1289ae0d512723a9e8535ce382ff6d/contract/TypeAndVersionInterface.sol
pragma solidity ^0.7.0;

abstract contract TypeAndVersionInterface{
  function typeAndVersion()
    external
    pure
    virtual
    returns (string memory);
}