require("@nomiclabs/hardhat-waffle");
const ROPSTEN_API_KEY = "";
const RINKEBY_API_KEY = "";
const MUMBAI_API_KEY = "";
const MAINNET_API_KEY = "";

const fs = require("fs");
const PRIVATE_KEY = fs.readFileSync(".secret").toString();
module.exports = {
  networks:{
    hardhat:{
      chainId:1337
    },
    ropsten:{
      url:`https://ropsten.infura.io/v3/${ROPSTEN_API_KEY}`
      ,accounts:[PRIVATE_KEY]
    },
    rinkeby:{
      url:`https://rinkeby.infura.io/v3/${RINKEBY_API_KEY}`
      ,accounts:[]
    },
    mumbai:{
      url:`https://polygon-mumbai.g.alchemy.com/v2/${MUMBAI_API_KEY}`
      ,accounts:[PRIVATE_KEY]
    },
    mainnet:{
      url:`https://polygon-mainnet.g.alchemy.com/v2/${MAINNET_API_KEY}}`
      ,accounts:[PRIVATE_KEY]
    }
  }
  solidity: "0.8.4",
};
