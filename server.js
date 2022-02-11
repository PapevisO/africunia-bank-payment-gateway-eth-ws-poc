const Web3 = require('web3')
const provider = require('eth-provider')
require('dotenv').config()

const {
  getEtherBalances,
  getTokensBalances,
} = require('@mycrypto/eth-scan')

const web3 = new Web3(provider(process.env.PROVIDER_API_WS))
const depositAddresses = process.env.DEPOSIT_ADDRESSES.split(',').map(v => v.toLowerCase())
const assetAddresses = process.env.ASSET_ADDRESSES.split(',').map(v => v.toLowerCase())

// web3.eth.subscribe('logs', {
//   address: depositAddresses[0],
//   topics:   depositAddresses
// }, (error, result) => {
//   if (!error)
//     console.log(result)
// })

// web3.eth.subscribe('logs', {
//   address: depositAddresses[0],
//   topics:  [web3.utils.sha3('Transfer(address,address,unit256)')]
// }, (error, result) => {
//   if (!error) {
//     console.log(result)
//   } else {
//     console.log('.')
//   }
// })

let dispatchIpn = (payload) => console.log(payload)

let pendingTxPresenter = (tx) => {
  return {
    deposit: {
      status: 'confirming',
      confirmations: 0,
      tid: 'TID0000000000'
    },
    txData: {
      from: tx.from,
      to: tx.to,
      value: web3.utils.fromWei(tx.value),
      valueWei: tx.value,
      gasLimit: tx.gas,
      gasPriceGwei: web3.utils.fromWei(tx.gasPrice) * 1e9,
      gasPriceWei: tx.gasPrice,
      txHash: tx.hash
    }
  }
}

let subscription = web3.eth.subscribe('pendingTransactions', (error, result) => {
  if (error) console.error({Error: error})
})

subscription.on('data', (txHash) => {
  setTimeout(async () =>{
    try {
      let tx = await web3.eth.getTransaction(txHash)
      if (tx && tx.to && depositAddresses.includes(tx.to.toLowerCase()) )
        dispatchIpn(pendingTxPresenter(tx))
    } catch(error) {
      console.log({Error: error})
    }
  })
})

// web3.eth.filter('pending').watch((error, result) => {
//   if (!error) {
//     console.log(result)
//   } else {
//     console.log('.')
//   }
// })

getEtherBalances(
  process.env.PROVIDER_API,
  depositAddresses,
  { batchSize: process.env.ETH_SCAN_BATCH_SIZE }
).then( result => {
  console.log(result)
}).catch( error => {
  console.log(error)
})

getTokensBalances(
  process.env.PROVIDER_API,
  depositAddresses,
  assetAddresses,
  { batchSize: process.env.ETH_SCAN_BATCH_SIZE }
).then( result => {
  console.log(result)
}).catch( error => {
  console.log(error)
})
