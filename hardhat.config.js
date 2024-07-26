require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
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
  },
  etherscan: {
    apiKey: {
      sepolia: '7N1UFM7UYC4K4F5489PN9XXEEVDIXNTBRT',
      maal: '/',
    },
    customChains: [
      {
        network: "maal",
        chainId: 7860,
        urls: {
          apiURL: "https://backendapi-testnet.maalscan.io/api/",
          browserURL: "https://testnet.maalscan.io"
        }
      }
    ],
  },
  sourcify: {
    enabled: true,
    // // Optional: specify a different Sourcify server
    // apiUrl: "https://sourcify.dev/server",
    // // Optional: specify a different Sourcify repository
    // browserUrl: "https://repo.sourcify.dev",
  }

};
