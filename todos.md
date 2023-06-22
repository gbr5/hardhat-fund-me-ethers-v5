- warning hardhat > eth-sig-util@2.5.4: Deprecated in favor of '@metamask/eth-sig-util'

- warning hardhat > mocha > debug@3.2.6: Debug versions >=3.2.0 <3.2.7 || >=4 <4.3.1 have a low-severity ReDos regression when used in a Node.js environment. It is recommended you upgrade to 3.2.7 or 4.3.1. (https://github.com/visionmedia/debug/issues/797)

- warning hardhat > mocha > chokidar > fsevents@2.1.3: "Please update to latest v2.3 or v2.2"

warning " > @nomiclabs/hardhat-waffle@2.0.6" has incorrect peer dependency "@nomiclabs/hardhat-ethers@^2.0.0".
warning " > @nomiclabs/hardhat-waffle@2.0.6" has unmet peer dependency "@types/sinon-chai@^3.2.3".
warning " > hardhat-deploy@0.9.29" has unmet peer dependency "@ethersproject/hardware-wallets@^5.0.14".
warning " > prettier-plugin-solidity@1.1.3" has unmet peer dependency "prettier@>=2.3.0 || >=3.0.0-alpha.0".
warning " > ts-node@10.9.1" has unmet peer dependency "@types/node@*".
warning " > @typechain/ethers-v5@11.0.0" has unmet peer dependency "@ethersproject/abi@^5.0.0".
warning " > @typechain/ethers-v5@11.0.0" has unmet peer dependency "@ethersproject/providers@^5.0.0".
warning " > @typechain/hardhat@8.0.0" has unmet peer dependency "@typechain/ethers-v6@^0.4.0".
warning " > @typechain/hardhat@8.0.0" has incorrect peer dependency "ethers@^6.1.0".

warning " > @nomiclabs/hardhat-waffle@2.0.6" has incorrect peer dependency "@nomiclabs/hardhat-ethers@^2.0.0".
warning " > @nomiclabs/hardhat-waffle@2.0.6" has unmet peer dependency "@types/sinon-chai@^3.2.3".
warning " > hardhat-deploy@0.9.29" has unmet peer dependency "@ethersproject/hardware-wallets@^5.0.14".
warning " > prettier-plugin-solidity@1.1.3" has unmet peer dependency "prettier@>=2.3.0 || >=3.0.0-alpha.0".

warning " > @nomiclabs/hardhat-waffle@2.0.6" has incorrect peer dependency "@nomiclabs/hardhat-ethers@^2.0.0".
warning " > @nomiclabs/hardhat-waffle@2.0.6" has unmet peer dependency "@types/sinon-chai@^3.2.3".
warning " > hardhat-deploy@0.9.29" has unmet peer dependency "@ethersproject/hardware-wallets@^5.0.14".
warning " > prettier-plugin-solidity@1.1.3" has unmet peer dependency "prettier@>=2.3.0 || >=3.0.0-alpha.0".
warning " > ts-node@10.9.1" has unmet peer dependency "@types/node@*".

How to upgrade a library that is inside another library? like:
fsevents@2.3


First delete yarn.lock and node_modules than run the command yarn install to confirm the warnings


