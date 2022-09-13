// Imports
import './App.css';
import algosdk from "algosdk";
import { PeraWalletConnect } from "@perawallet/connect";
import { useEffect } from 'react';
import MyImage from'./flames0.png';


// perawallet instantiating
const perawallet = new PeraWalletConnect()

// algoClient
const algod_token = {
  "X-API-Key": "" 
}
const algod_address = "https://testnet-algorand.api.purestake.io/ps2";
const headers = "";
const algodClient = new algosdk.Algodv2(algod_token, algod_address, headers);

//get address
const address = localStorage.getItem('address');

// prize address
const prizeAddress = ''

//asset id
const ASSET_ID = 22081217;

/// transaction code
const transaction = async () => {
  try{
    const suggestedParams = await algodClient.getTransactionParams().do();
    const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from: address,
      to: prizeAddress,
      amount: 600000,
      assetIndex: ASSET_ID,
      suggestedParams,
    });
    const optInTxn = [{txn : txn, signers: [address]}]
    const signedTxn = await perawallet.signTransaction([optInTxn])
    const success = await algodClient.sendRawTransaction(signedTxn).do();
    return success
  }
  catch(err){
    console.log(err)
    return false
  }
  }
  
// Wallet Connect
async function walletConnect() {
  const newAccounts= await perawallet.connect()
  localStorage.setItem("address", newAccounts[0]);
  window.location.reload()
  console.log('Connect')
  }

// wallet disconnect
const disconnect = () => {
  perawallet.disconnect()
  localStorage.removeItem("address");
  window.location.reload()
  }

const smallestprizetransaction = async () => {
  const mnemonic = '';
  const recoveblueAccount = algosdk.mnemonicToSecretKey(mnemonic); 
  const suggestedParams = await algodClient.getTransactionParams().do();
  const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
    from: prizeAddress,
    to: address,
    amount: 600000,
    assetIndex: ASSET_ID,
    suggestedParams,
  });
  // Sign the transaction
  const signedTxn = txn.signTxn(recoveblueAccount.sk);
  const sendTx = algodClient.sendRawTransaction(signedTxn).do();
  const txId = txn.txID().toString();
  console.log("Transaction sent with ID " + sendTx.txId);
  console.log("Signed transaction with txID: %s", txId);
  // Wait for confirmation
  algosdk.waitForConfirmation(algodClient, txId, 4);
  }

const smallprizetransaction = async () => {
  const mnemonic = '';
  const recoveblueAccount = algosdk.mnemonicToSecretKey(mnemonic); 
  const suggestedParams = await algodClient.getTransactionParams().do();
  const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
    from: prizeAddress,
    to: address,
    amount: 6000000,
    assetIndex: ASSET_ID,
    suggestedParams,
  });
  // Sign the transaction
  const signedTxn = txn.signTxn(recoveblueAccount.sk);
  const sendTx = algodClient.sendRawTransaction(signedTxn).do();
  const txId = txn.txID().toString();
  console.log("Transaction sent with ID " + sendTx.txId);
  console.log("Signed transaction with txID: %s", txId);
  // Wait for confirmation
  algosdk.waitForConfirmation(algodClient, txId, 4);
  }

const bigprizetransaction = async () => {
  const mnemonic = '';
  const recoveblueAccount = algosdk.mnemonicToSecretKey(mnemonic); 
  const suggestedParams = await algodClient.getTransactionParams().do();
  const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
    from: prizeAddress,
    to: address,
    amount: 66600000,
    assetIndex: ASSET_ID,
    suggestedParams,
  });
  // Sign the transaction
  const signedTxn = txn.signTxn(recoveblueAccount.sk);
  const sendTx = algodClient.sendRawTransaction(signedTxn).do();
  const txId = txn.txID().toString();
  console.log("Transaction sent with ID " + sendTx.txId);
  console.log("Signed transaction with txID: %s", txId);
  // Wait for confirmation
  algosdk.waitForConfirmation(algodClient, txId, 4);
  }

const burntransaction = async () => {
  const mnemonic = '';
  const recoveblueAccount = algosdk.mnemonicToSecretKey(mnemonic); 
  const suggestedParams = await algodClient.getTransactionParams().do();
  //MainNet Burn
  const burnaddress = "67HCKTRN3NTX7Q7FEGZAMNCSB7JLZUOPO2556XT4T7E4RB6OR3J3SH6HNQ"
  const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
    from: prizeAddress,
    to: burnaddress,
    amount: 66600,
    assetIndex: ASSET_ID,
    suggestedParams,
  });
  // Sign the transaction
  const signedTxn = txn.signTxn(recoveblueAccount.sk);
  algodClient.sendRawTransaction(signedTxn).do();
  const txId = txn.txID().toString();
  algosdk.waitForConfirmation(algodClient, txId, 4);
  }

// Guess
const guess = async () => {
  const transactionSuccess = await transaction()
  if (transactionSuccess){
    ////////////////////

    const generateNumberOne = Math.floor(Math.random() * 8)
    const generateNumberTwo = Math.floor(Math.random() * 8)
    const generateNumberThree = Math.floor(Math.random() * 8)

    document.getElementById('message1').textContent =  generateNumberOne 
    document.getElementById('message2').textContent =  generateNumberTwo 
    document.getElementById('message3').textContent =  generateNumberThree
    
    // Convert to Int
    const generateNumberOneInt = parseInt(generateNumberOne);
    const generateNumberTwoInt = parseInt(generateNumberTwo);
    const generateNumberThreeInt = parseInt(generateNumberThree);
    console.log(generateNumberTwoInt)
    console.log(generateNumberTwo)
    // jackpot
    const multiply = parseInt(generateNumberOne * generateNumberTwo * generateNumberThree)
    console.log(multiply)
    if(multiply===216){
      document.getElementById('message4').textContent = 'Jackpot! Win 777 Lions!'
      bigprizetransaction();
      return
    };
    // Big prize
    if(generateNumberOneInt===6){
      if(generateNumberTwoInt===6){
        document.getElementById('message4').textContent = 'Win 70 Lions!'
        smallprizetransaction();
      } else if(generateNumberThreeInt===6){
        document.getElementById('message4').textContent = 'Win 70 Lions!'
        smallprizetransaction();
        return
      }
    }; 
    if(generateNumberTwoInt===6){
      if(generateNumberThreeInt===6){
        document.getElementById('message4').textContent = 'Win 70 Lions!'
        smallprizetransaction();}
        return
    }; 
    // small prize
    if(generateNumberOneInt===6){
      document.getElementById('message4').textContent = 'Win 8 Lions!'
      smallestprizetransaction();
    } else if(generateNumberTwoInt===6){
      document.getElementById('message4').textContent = 'Win 8 Lions'
      smallestprizetransaction();
    } else if(generateNumberThreeInt===6){
      document.getElementById('message4').textContent = 'Win 8 Lions'
      smallestprizetransaction();
    } else{
      document.getElementById('message4').textContent = 'Win 7 Lions'
      burntransaction()
      return
    }
  };
}

// React functions must return a React component
function App() {
  useEffect(() => {
    perawallet.reconnectSession().then((accounts) => {
      if (accounts.length) {
        localStorage.setItem("address", accounts[0]);
      }
      perawallet.connector?.on("disconnect", () => {
        localStorage.removeItem("address");
      });
    })
    .catch((e) => console.log(e));
  }, [])
  return (
    <div className="App">
      <header className="App-header">

        <h1>
          <div id = "displaytext" style={{ color: "green" }}> Lucky Lions </div>
        </h1>

        <p>
        <div>
          <div id = "displaytext" style={{ color: "green" }}> Algorand Wallet </div>
        </div>
        <p>
          <button id='button1' onClick={walletConnect}> Connect</button>
          <button id='button2' onClick={disconnect}> Disconnect</button>
        </p>
        </p>
        <h1>
          <div id = "displaytext" style={{ color: "green" }}> Lucky 7s </div>
        </h1>
        <div>
          <div id = "displaytext" style={{ color: "green" }}> Jackpot 777 Lions </div>
        </div>

        <table>
          <tr>
            <th id = "displaytext" style={{ color: "green" }}> 7 </th>
            <th id = "displaytext" style={{ color: "green" }}> 7 </th>
            <th id = "displaytext" style={{ color: "green" }}> 7 </th>
          </tr>
          <tr>
            <td id='message1'></td>
            <td id='message2'></td>
            <td id='message3'></td>
          </tr>
        </table>
        <div id='message4'></div>
        <div>
          <button id='button3' onClick={guess}>Roar</button>
        </div>
        <div>
          <img  src={MyImage} alt="fireSpot"/>
        </div>

      </header>
    </div>
  );

}
export default App



