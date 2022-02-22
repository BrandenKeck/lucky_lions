import algosdk from "algosdk";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import { formatJsonRpcRequest } from "@json-rpc-tools/utils";
import MyAlgoConnect from '@randlabs/myalgo-connect';

function connect_walletconnect(){

  // Create a connector
  const connector = new WalletConnect({
    bridge: "https://bridge.walletconnect.org", // Required
    qrcodeModal: QRCodeModal,
    clientMeta: {
      description: "Lucky Lions dApp",
      url: "https://luckylions.app",
      icons: ["http://ec2-18-116-44-142.us-east-2.compute.amazonaws.com/static/img/stylized_logo.png"],
      name: "Lucky Lions",
    }
  });

  // Check if connection is already established
  if (!connector.connected) {connector.createSession();}

  // Subscribe to connection events
  connector.on("connect", (error, payload) => {
    if (error) {throw error;}
    const { accounts } = payload.params[0];
    console.log("CONNECTED");
    console.log(accounts);
  });

  connector.on("session_update", (error, payload) => {
    if (error) {throw error;}
    const { accounts } = payload.params[0];
    console.log("UPDATED");
    console.log(accounts);
  });

  connector.on("disconnect", (error, payload) => {
    if (error) {throw error;}
    console.log("DISCONNECTED");
  });

  return connector.uri;

}

const connect_myalgo = async () => {
  const myAlgoConnect = new MyAlgoConnect();
  const accountsSharedByUser = await myAlgoConnect.connect();
  return myAlgoConnect
}

function signTx(algo_connect){
  let json = $.getJSON("./keys.json");
  const algodClient = new algosdk.Algodv2("",'https://api.testnet.algoexplorer.io', '');
}


function hello_world(){
  console.log("hello world");
}

export {connect_walletconnect, connect_myalgo, hello_world};
