require('@nomiclabs/hardhat-waffle')
require('dotenv').config()

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners()

  for (const account of accounts) {
    console.log(account.address)
  }
})

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: 'localhost',
  networks: {
    mumbai: {
      url: 'https://rpc-mumbai.maticvigil.com',
      accounts: [process.env.ADD_PRIVATE_KEY],
      gasPrice: 35000000000
    },
    bsctestnet: {
      url: 'https://data-seed-prebsc-1-s1.binance.org:8545',
      chainId: 97,
      gasPrice: 20000000000,
      accounts: [process.env.ADD_PRIVATE_KEY]
    },
    rinkeby: {
      url: 'https://rinkeby.infura.io/v3/3a57146e93d3454e8751164880ede71e',
      accounts: [process.env.ADD_PRIVATE_KEY]
    }
    // hardhat: {
    //   // accounts: {
    //   //   mnemonic,
    //   // },
    //   chainId: chainIds.hardhat
    // }
  },
  solidity: '0.8.4'
}
