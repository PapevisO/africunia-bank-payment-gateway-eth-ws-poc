# Africunia-Bank Payment Gateway
# Proof of Concept

## Component based on eth web3 websocket provider

1. Make sure nvm is installed and node 12+ used. Or simply make sure that node 12+ is used.
2. In console browse to folder where you target to clone repository
3. Run
<pre>
git clone https://github.com/PapevisO/africunia-bank-payment-gateway-eth-ws-poc
</pre>

4. Generate a .env file and configure at least below 3 parameters
<pre>
PROVIDER_API=https://provider/rinkeby/?api_key=
PROVIDER_API_WS=wss://provider/rinkeby/?api_key=
DEPOSIT_ADDRESSES=0x,0x
</pre>
Where:
- Deposit addresses is a comma-separated list of addresses to monitor
- provider/rinkeby should be replaced with endpoint of your jsonRPC provider and a respected network.
Rinkeby is a testnet of Ethereum with chainId 4

5. Run 
<pre>
node server.js > server.log
</pre>
6. Trigger an Ethereum (or other chain-specific base coin like BNB) transfer to one of the deposit addresses
7. Open server.log file in readonly

Witness a payload generated and sent to console.
