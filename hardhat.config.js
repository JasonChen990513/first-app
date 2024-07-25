require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
    networks:{
    hardhat:{},
    sepolia:{
      url: 'https://sepolia.infura.io/v3/9f0c17d5f38044ed814e4d5c2ce0b527',
      accounts: ['2db7cfe52d9205da0aefc21047c112e17ea620c2312e8944d92be7ac9f2d47dc']
    },
    maal:{
      url:'https://node1.maalscan.io',
      accounts: ['2db7cfe52d9205da0aefc21047c112e17ea620c2312e8944d92be7ac9f2d47dc']
    }
  }
};
