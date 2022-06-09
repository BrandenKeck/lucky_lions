// To Build:
// npx webpack --config webpack.config.js

// Imports
import algosdk from "algosdk";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import { formatJsonRpcRequest } from "@json-rpc-tools/utils";
import MyAlgoConnect from '@randlabs/myalgo-connect';
import * as keys from '../keys.json';

// Globals
let algod_client = null;
let connection_type = "WalletConnect";
let myalgo_connection = null;
let myalgo_accounts = null;
let walletconnect_connection = null;

// Create a connector for walletconnect
const connector = new WalletConnect({
  bridge: "https://bridge.walletconnect.org", // Required
  qrcodeModal: QRCodeModal,
  clientMeta: {
    name: "Lions Foundation",
    description: "Lions Foundation",
    url: "http://lionsfund.org",
    icons: ["http://lionsfund.org/static/img/stylized_logo.png"]
  }
});

// MyAlgo Connection
const connect_myalgo = async () => {
  const token = {'X-API-Key': keys.algod_tokens[0]};
  const server = "https://mainnet-algorand.api.purestake.io/ps2";
  const port = "";
  algod_client = new algosdk.Algodv2(token, server, port);
  myalgo_connection = new MyAlgoConnect();
  myalgo_accounts = await myalgo_connection.connect();
  connection_type = "MyAlgo";
  load_application(myalgo_accounts[0].address);
}

// Connecting via wallet connect
const connect_wallet_wallectconnect = async () =>{

  // Setup Client Connection
  const token = {'X-API-Key': keys.algod_tokens[0]};
  const server = "https://mainnet-algorand.api.purestake.io/ps2";
  const port = "";
  algod_client = new algosdk.Algodv2(token, server, port);

  // Check if connection is already established
  if (!connector.connected) {connector.createSession();}
  else{
    walletconnect_connection = connector;
    connection_type = "WalletConnect";
    load_application(walletconnect_connection._accounts[0]);
    return
  }

  // Subscribe to connection events
  connector.on("connect", (error, payload) => {
    if (error) {throw error;}
    const { accounts } = payload.params[0];
    console.log("CONNECTED");
    console.log(accounts);
    connection_type = "WalletConnect";
    load_application(walletconnect_connection._accounts[0]);
  });

  connector.on("session_update", (error, payload) => {
    if (error) {throw error;}
    const { accounts } = payload.params[0];
    console.log("UPDATED");
    console.log(accounts);
    connection_type = "WalletConnect";
    load_application(walletconnect_connection._accounts[0]);
  });

  connector.on("disconnect", (error, payload) => {
    if (error) {throw error;}
    console.log("DISCONNECTED");
  });

  walletconnect_connection = connector;

}

const disconnect_wallet_wallectconnect = async () =>{
  walletconnect_connection.killSession();
}

const run_app = async () =>{
  if(connection_type == "MyAlgo"){
    send_a_lioncoin_myalgo();
  }else if(connection_type == "WalletConnect"){
    send_a_lioncoin_walletconnect();
  }
}

const send_a_lioncoin_myalgo = async () =>{
  const params = await algod_client.getTransactionParams().do();
  const txn = {
    ...params,
    type: 'axfer',
    from: myalgo_accounts[0].address,
    to: "NZ63GBFROWQYKSQYNSW272FEXFZMMTO4BCVTHGATRD4MWM3JNMGSW3NSI4",
    assetIndex: 372666897,
    amount: 10000 // 1 lioncoin
  };

  myalgo_connection.signTransaction(txn)
  .then((signedTxn) => {
    algod_client.sendRawTransaction(signedTxn.blob).do()
    .then((txn) => {
      thank_you();
    })
  })
  .catch((err) => {
      console.log(err);
  });

}

const send_a_lioncoin_walletconnect = async () =>{

  // Set up asset transfer transaction
  const params = await algod_client.getTransactionParams().do();
  const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
    from: walletconnect_connection._accounts[0],
    to: "NZ63GBFROWQYKSQYNSW272FEXFZMMTO4BCVTHGATRD4MWM3JNMGSW3NSI4",
    assetIndex: 372666897,
    amount: 10000, // 1 lioncoin
    suggestedParams: params
  });

  // Sign transaction
  const txns = [txn]
  const txnsToSign = txns.map(txn => {
    const encodedTxn = Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString("base64");
    return {
      txn: encodedTxn,
      message: 'Send Branden a Lion Coin.'
    };
  });
  const requestParams = [txnsToSign];
  const request = formatJsonRpcRequest("algo_signTxn", requestParams);

  // Get transaction result
  const result = await walletconnect_connection.sendCustomRequest(request);
  console.log(result);
  thank_you();

}

export {connect_myalgo, connect_wallet_wallectconnect, disconnect_wallet_wallectconnect, run_app};
