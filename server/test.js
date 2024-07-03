const { keccak256 } = require('ethereum-cryptography/keccak');
const { utf8ToBytes, } = require('ethereum-cryptography/utils');
const { ethers, utils } = require('ethers')
const { hexToBytes, bytesToHex, toHex } = require("ethereum-cryptography/utils");
const { recoverPublicKey, Signature, secp256k1 } = require("ethereum-cryptography/secp256k1");




const signature = "0x1f8bd4bc728025d5a0be3d32898bfc1104a8d50b70fa1ae0f19fdc83e6218dae2946b0ba4f9873a6e0c0ea6804b22fc2d06c17e635abedece1ceff2d4198999c1c";
let message = "Transfer 1 to 12";
// const hexPrivateKey = "0xae78c8b502571dba876742437f8bc78b689cf8518356c0921393d89caaf284ce";//waldek
const hexPrivateKey = "0xbd7237fb319818013d44df522f2ac6b2357c06040be24b72ace368f6761228a1";//account7
const sig3 = ethers.Signature.from(signature);

// let secpSig = secp256k1.Signature.fromCompact(getBytesCopy(concat([ sig.r, sig.s ])));
const signingKey = new ethers.SigningKey(hexPrivateKey);
const digest = ethers.id(message);

const signature31 = signingKey.sign(digest);
// const joinedSignature = ethers.utils.joinSignature(signature31);
// 0xf0a760680a88ec3efff6e68ebce051b948cffd51d5814a448c0b32e35f2c753a6862077f01ae8edfccd524ba843b9340bcedfeafe62167fdd8517ca8528f398b1c

const recoveredAddress = ethers.recoverAddress(digest, signature31);
console.log("recovered address: " + recoveredAddress);
const recoveredAddress2 = ethers.recoverAddress(digest, sig3);
console.log("recovered address: " + recoveredAddress2);
const add3 = ethers.verifyMessage(message, signature);
console.log("recovered address: " + add3)
let hashMessage = ethers.hashMessage(message);
const add4 = ethers.recoverAddress(hashMessage, signature);
console.log("recovered address: " + add4);
