require("@nomiclabs/hardhat-waffle");

const ROPSTEN_API_KEY = "4867b6206c3d4449af5910fe684c11ee";
const RINKEBY_API_KEY = "4867b6206c3d4449af5910fe684c11ee";
const MUMBAI_API_KEY = "O_7K7gJnf8CbOdRFAv5ijdX1R9fOKtH-";
const MAINNET_API_KEY = "momvuyTh0hhVnHC-N9ZxjGk90lScuEHJ";

const fs = require("fs");
const PRIVATE_KEY = fs.readFileSync(".secret").toString();
module.exports = {
  networks: {
    hardhat: {
      chainId: 1337
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${ROPSTEN_API_KEY}`,
      accounts: [PRIVATE_KEY]
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${RINKEBY_API_KEY}`,
      accounts: []
    },
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/O_7K7gJnf8CbOdRFAv5ijdX1R9fOKtH-`,
      accounts: [PRIVATE_KEY]
    },
    mainnet: {
      url: `https://polygon-mainnet.g.alchemy.com/v2/${MAINNET_API_KEY}}`,
      accounts: [PRIVATE_KEY]
    }
  },
  solidity: "0.8.4"
};
