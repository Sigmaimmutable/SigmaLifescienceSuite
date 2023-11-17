import React, {useState, useEffect} from 'react';
import { Container, Row, Col, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';
import Arrow from '../../assets/images/arrow-tr.svg';
// import FilterDropdown from '../Snippets/FilterDropdown';
import MyAlgoConnect from '@randlabs/myalgo-connect';
import elemLogo from '../../assets/images/modal-square-logo.png';
import tauLogo from '../../assets/images/tau-original.png';
import einrLogo from '../../assets/images/EINR-original.png';
import usdcLogo from '../../assets/images/usdc-logo.png';
import redeemDetails from './stablecoin.json';

const algosdk = require('algosdk');
const myAlgoWallet = new MyAlgoConnect();
// const baseServer = 'https://testnet-algorand.api.purestake.io/ps2';
// const port = '';

// const token = {
//    'X-API-Key': 'pOD5BAUCxq7InVPjo0sO01B0Vq4d7pD1ask5Ix43'
// }

// const algodClientGet = new algosdk.Algodv2(token, baseServer, port);

    const algodClient = new algosdk.Algodv2('', 'https://node.testnet.algoexplorerapi.io', '');
    const indexClient = new algosdk.Indexer('', 'https://algoindexer.testnet.algoexplorerapi.io', '');
const Redeem = () => {

    const [usdcAmount, setUsdcAmount ] = useState("");
    const [usdcAmount1, setUsdcAmount1 ] = useState("");
    const [usdcAmount99, setUsdcAmount99 ] = useState("");
    const [elemAmount, setElemAmount ] = useState("");
    const [tauAmount, setTauAmount ] = useState("");

    const [usdcEinrAmount, setUsdcEinrAmount ] = useState("");
    const [usdcEinrAmount1, setUsdcEinrAmount1 ] = useState("");
    const [usdcEinrAmount99, setUsdcEinrAmount99 ] = useState("");
    const [elemEinrAmount, setElemEinrAmount ] = useState("");
    const [EinrAmount, setEinrAmount ] = useState("");

    const [assets, setAssets] = useState("");

    const [usdcBalances, setUsdcBalances] = useState("");
    const [elemBalances, setElemBalances] = useState("");
    const [tauBalances, setTauBalances] = useState("");
    const [EinrBalances, setEinrBalances] = useState("");
    const [einrCir, setEinrCir] = useState("");
    const [tauCir, setTauCir] = useState("");

    let appID_global = redeemDetails.swapTauAppID;
    let tauID = redeemDetails.tauID;
    let einrID = redeemDetails.einrID;
    let elemID = redeemDetails.elemID;
    let usdcID = redeemDetails.usdcID;
    let totalSupply = 18446744073709551615;
    let elemReserve = redeemDetails.rebaseReserveAddress;

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
     }

    const waitForConfirmation = async function (client, txId) {
        let status = (await client.status().do());
        let lastRound = status["last-round"];
          while (true) {
            const pendingInfo = await client.pendingTransactionInformation(txId).do();
            if (pendingInfo["confirmed-round"] !== null && pendingInfo["confirmed-round"] > 0) {
              //Got the completed Transaction
              //console.log("Transaction " + txId + " confirmed in round " + pendingInfo["confirmed-round"]);
            //   toast.success(`Transaction Successful with ${txId}`);
              toast.success(`Transaction ${txId} confirmed in round ${pendingInfo["confirmed-round"]}`);
              await sleep(10000);
              reload();
              break;
            }
            lastRound++;
            await client.statusAfterBlock(lastRound).do();
          }
        };          

        const reload = async () => {
            window.location.reload();
        }

const redeemTau = async () => 
{
    if (localStorage.getItem("walletAddress") === "")
        {
            toast.error("Connect your wallet");
        }
        else{
    try {
        // const accounts = await myAlgoWallet.connect();
        // const addresses = accounts.map(account => account.address);
        const params = await algodClient.getTransactionParams().do();
  
        let appArgs1 = [];
        appArgs1.push(new Uint8Array(Buffer.from("redeemTau")));

        let transaction1 = algosdk.makeApplicationNoOpTxnFromObject({
          from:localStorage.getItem("walletAddress"), 
          suggestedParams: params, 
          appIndex: parseInt(appID_global), 
          appArgs: appArgs1
        })                    
        
        
        let data = `#pragma version 5

        gtxn 0 TypeEnum
        int 6
        ==
        gtxn 0 ApplicationArgs 0
        byte "escrowOptin"
        ==
        &&
        bnz opt_in
        
        gtxn 0 TypeEnum
        int 6
        ==
        gtxn 0 ApplicationArgs 0
        byte "mintTau"
        ==
        &&
        bnz mintTau
        
        gtxn 0 TypeEnum
        int 6
        ==
        gtxn 0 ApplicationArgs 0
        byte "redeemTau"
        ==
        &&
        bnz redeemTau
        
        gtxn 0 TypeEnum
        int 6
        ==
        gtxn 0 ApplicationArgs 0
        byte "mintEinr"
        ==
        &&
        bnz mintEinr
        
        gtxn 0 TypeEnum
        int 6
        ==
        gtxn 0 ApplicationArgs 0
        byte "redeemEinr"
        ==
        &&
        bnz redeemEinr
        
        b failed
        
        opt_in:
        global GroupSize
        int 2
        ==
        bz failed
        gtxn 0 TypeEnum
        int 6
        ==
        
        gtxn 0 ApplicationID
        int 77396031 //appID
        ==
        &&
        
        gtxn 0 OnCompletion
        int NoOp
        ==
        
        int DeleteApplication
        gtxn 0 OnCompletion
        ==
        ||
        &&
        
        gtxn 1 RekeyTo
        global ZeroAddress
        ==
        &&
        gtxn 0 RekeyTo
        global ZeroAddress
        ==
        &&
        bz failed
        b finish
        
        mintTau:
        global GroupSize
        int 6
        ==
        gtxn 0 TypeEnum
        int 6
        ==
        &&
        
        gtxn 0 ApplicationID
        int 77396031
        ==
        &&
        
        gtxn 0 OnCompletion
        int NoOp
        ==
        int DeleteApplication
        gtxn 0 OnCompletion
        ==
        ||
        &&
        
        gtxn 0 RekeyTo
        global ZeroAddress
        ==
        &&
        gtxn 1 RekeyTo
        global ZeroAddress
        ==
        &&
        gtxn 2 RekeyTo
        global ZeroAddress
        ==
        &&
        gtxn 3 RekeyTo
        global ZeroAddress
        ==
        &&
        gtxn 4 RekeyTo
        global ZeroAddress
        ==
        &&
        gtxn 5 RekeyTo
        global ZeroAddress
        ==
        &&
        bnz finish
        b failed
        
        redeemTau:
        global GroupSize
        int 6
        ==
        gtxn 0 TypeEnum
        int 6
        ==
        &&
        
        gtxn 0 ApplicationID
        int 77396031
        ==
        &&
        
        gtxn 0 OnCompletion
        int NoOp
        ==
        int DeleteApplication
        gtxn 0 OnCompletion
        ==
        ||
        &&
        
        gtxn 0 RekeyTo
        global ZeroAddress
        ==
        &&
        gtxn 1 RekeyTo
        global ZeroAddress
        ==
        &&
        gtxn 2 RekeyTo
        global ZeroAddress
        ==
        &&
        gtxn 3 RekeyTo
        global ZeroAddress
        ==
        &&
        gtxn 4 RekeyTo
        global ZeroAddress
        ==
        &&
        gtxn 5 RekeyTo
        global ZeroAddress
        ==
        &&
        bnz finish
        b failed
        
        mintEinr:
        global GroupSize
        int 6
        ==
        gtxn 0 TypeEnum
        int 6
        ==
        &&
        
        gtxn 0 ApplicationID
        int 77396031
        ==
        &&
        
        gtxn 0 OnCompletion
        int NoOp
        ==
        int DeleteApplication
        gtxn 0 OnCompletion
        ==
        ||
        &&
        
        gtxn 0 RekeyTo
        global ZeroAddress
        ==
        &&
        gtxn 1 RekeyTo
        global ZeroAddress
        ==
        &&
        gtxn 2 RekeyTo
        global ZeroAddress
        ==
        &&
        gtxn 3 RekeyTo
        global ZeroAddress
        ==
        &&
        gtxn 4 RekeyTo
        global ZeroAddress
        ==
        &&
        gtxn 5 RekeyTo
        global ZeroAddress
        ==
        &&
        bnz finish
        b failed
        
        redeemEinr:
        global GroupSize
        int 6
        ==
        gtxn 0 TypeEnum
        int 6
        ==
        &&
        
        gtxn 0 ApplicationID
        int 77396031
        ==
        &&
        
        gtxn 0 OnCompletion
        int NoOp
        ==
        int DeleteApplication
        gtxn 0 OnCompletion
        ==
        ||
        &&
        
        gtxn 0 RekeyTo
        global ZeroAddress
        ==
        &&
        gtxn 1 RekeyTo
        global ZeroAddress
        ==
        &&
        gtxn 2 RekeyTo
        global ZeroAddress
        ==
        &&
        gtxn 3 RekeyTo
        global ZeroAddress
        ==
        &&
        gtxn 4 RekeyTo
        global ZeroAddress
        ==
        &&
        gtxn 5 RekeyTo
        global ZeroAddress
        ==
        &&
        bnz finish
        b failed
        
        failed:
        int 0
        return
        finish:
        int 1
        return`;
        
        
        
        let results = await algodClient.compile(data).do();
        //console.log("Hash = " + results.hash);
        //console.log("Result = " + results.result);
        
        let program = new Uint8Array(Buffer.from(redeemDetails.swapTauEscrow, "base64"));          
        let lsig = new algosdk.LogicSigAccount(program);
        console.log("Escrow =", lsig.address());
        
        let transaction2 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
            from: localStorage.getItem("walletAddress"), 
            to: lsig.address(), 
            amount: parseFloat(tauAmount).toFixed(6) * 1000000, 
            assetIndex: parseInt(tauID), 
            suggestedParams: params
          });

          let usdc99 = (parseFloat(usdcAmount) * 99 / 100).toString().match(/^-?\d+(?:\.\d{0,6})?/)[0] * 1000000;
   
        let transaction3 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
            from: lsig.address(), 
            to: localStorage.getItem("walletAddress"), 
            amount: parseInt(usdc99), 
            assetIndex: parseInt(usdcID), 
            suggestedParams: params
          }); 

          let usdc1 = (parseFloat(usdcAmount) * 1 / 100).toString().match(/^-?\d+(?:\.\d{0,6})?/)[0] * 1000000;
          
          let transaction4 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
            from: lsig.address(), 
            to: redeemDetails.creatorAddress, 
            amount: parseInt(usdc1), 
            assetIndex: parseInt(usdcID), 
            suggestedParams: params
          }); 

          let transaction5 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
            from: lsig.address(), 
            to: localStorage.getItem("walletAddress"), 
            amount: parseFloat(elemAmount).toFixed(6) * 1000000, 
            assetIndex: parseInt(elemID), 
            suggestedParams: params
          });
          console.log("elem =",parseFloat(elemAmount).toFixed(6) * 1000000);
        let transaction6 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
          from: localStorage.getItem("walletAddress"), 
          to: lsig.address(), 
          amount: 3000, 
           note: undefined,  
           suggestedParams: params
         });
        
        const groupID = algosdk.computeGroupID([ transaction1, transaction2, transaction3, transaction4, transaction5, transaction6 ]);
        const txs = [ transaction1, transaction2, transaction3, transaction4, transaction5, transaction6 ];
        txs[0].group = groupID;
        txs[1].group = groupID;
        txs[2].group = groupID;
        txs[3].group = groupID;
        txs[4].group = groupID;
        txs[5].group = groupID;


        const signedTx1 = await myAlgoWallet.signTransaction([txs[0].toByte(), txs[1].toByte(), txs[5].toByte()]);
      //   const signedTx2 = await myAlgoWallet.signTransaction(txs[1].toByte());
        const signedTxEscrow1 = algosdk.signLogicSigTransaction(txs[2], lsig);
        const signedTxEscrow2 = algosdk.signLogicSigTransaction(txs[3], lsig);
        const signedTxEscrow3 = algosdk.signLogicSigTransaction(txs[4], lsig);
      //   const signedTx4 = algosdk.signLogicSigTransaction(txs[3].toByte());

        toast.info("Transaction in Progress");
    const response = await algodClient.sendRawTransaction([signedTx1[0].blob, signedTx1[1].blob, signedTxEscrow1.blob, signedTxEscrow2.blob, signedTxEscrow3.blob, signedTx1[2].blob ]).do();
    //console.log("TxID", JSON.stringify(response, null, 1));
    await waitForConfirmation(algodClient, response.txId);
    // toast.success(`Transaction Successfully completed with ${response.txId}`);
      } catch (err) {
        toast.error(`Transaction Failed due to ${err}`);
        console.error(err);
      }
    }
}

const redeemEinr = async () => 
{
    if (localStorage.getItem("walletAddress") === "")
        {
            toast.error("Connect your wallet");
        }
        else{
    try {
        // const accounts = await myAlgoWallet.connect();
        // const addresses = accounts.map(account => account.address);
        const params = await algodClient.getTransactionParams().do();
  
        let appArgs1 = [];
        appArgs1.push(new Uint8Array(Buffer.from("redeemEinr")));

        let transaction1 = algosdk.makeApplicationNoOpTxnFromObject({
          from:localStorage.getItem("walletAddress"), 
          suggestedParams: params, 
          appIndex: parseInt(appID_global), 
          appArgs: appArgs1
        })                    
        
        
        let data = `#pragma version 5

        gtxn 0 TypeEnum
        int 6
        ==
        gtxn 0 ApplicationArgs 0
        byte "escrowOptin"
        ==
        &&
        bnz opt_in
        
        gtxn 0 TypeEnum
        int 6
        ==
        gtxn 0 ApplicationArgs 0
        byte "mintTau"
        ==
        &&
        bnz mintTau
        
        gtxn 0 TypeEnum
        int 6
        ==
        gtxn 0 ApplicationArgs 0
        byte "redeemTau"
        ==
        &&
        bnz redeemTau
        
        gtxn 0 TypeEnum
        int 6
        ==
        gtxn 0 ApplicationArgs 0
        byte "mintEinr"
        ==
        &&
        bnz mintEinr
        
        gtxn 0 TypeEnum
        int 6
        ==
        gtxn 0 ApplicationArgs 0
        byte "redeemEinr"
        ==
        &&
        bnz redeemEinr
        
        b failed
        
        opt_in:
        global GroupSize
        int 2
        ==
        bz failed
        gtxn 0 TypeEnum
        int 6
        ==
        
        gtxn 0 ApplicationID
        int 77396031 //appID
        ==
        &&
        
        gtxn 0 OnCompletion
        int NoOp
        ==
        
        int DeleteApplication
        gtxn 0 OnCompletion
        ==
        ||
        &&
        
        gtxn 1 RekeyTo
        global ZeroAddress
        ==
        &&
        gtxn 0 RekeyTo
        global ZeroAddress
        ==
        &&
        bz failed
        b finish
        
        mintTau:
        global GroupSize
        int 6
        ==
        gtxn 0 TypeEnum
        int 6
        ==
        &&
        
        gtxn 0 ApplicationID
        int 77396031
        ==
        &&
        
        gtxn 0 OnCompletion
        int NoOp
        ==
        int DeleteApplication
        gtxn 0 OnCompletion
        ==
        ||
        &&
        
        gtxn 0 RekeyTo
        global ZeroAddress
        ==
        &&
        gtxn 1 RekeyTo
        global ZeroAddress
        ==
        &&
        gtxn 2 RekeyTo
        global ZeroAddress
        ==
        &&
        gtxn 3 RekeyTo
        global ZeroAddress
        ==
        &&
        gtxn 4 RekeyTo
        global ZeroAddress
        ==
        &&
        gtxn 5 RekeyTo
        global ZeroAddress
        ==
        &&
        bnz finish
        b failed
        
        redeemTau:
        global GroupSize
        int 6
        ==
        gtxn 0 TypeEnum
        int 6
        ==
        &&
        
        gtxn 0 ApplicationID
        int 77396031
        ==
        &&
        
        gtxn 0 OnCompletion
        int NoOp
        ==
        int DeleteApplication
        gtxn 0 OnCompletion
        ==
        ||
        &&
        
        gtxn 0 RekeyTo
        global ZeroAddress
        ==
        &&
        gtxn 1 RekeyTo
        global ZeroAddress
        ==
        &&
        gtxn 2 RekeyTo
        global ZeroAddress
        ==
        &&
        gtxn 3 RekeyTo
        global ZeroAddress
        ==
        &&
        gtxn 4 RekeyTo
        global ZeroAddress
        ==
        &&
        gtxn 5 RekeyTo
        global ZeroAddress
        ==
        &&
        bnz finish
        b failed
        
        mintEinr:
        global GroupSize
        int 6
        ==
        gtxn 0 TypeEnum
        int 6
        ==
        &&
        
        gtxn 0 ApplicationID
        int 77396031
        ==
        &&
        
        gtxn 0 OnCompletion
        int NoOp
        ==
        int DeleteApplication
        gtxn 0 OnCompletion
        ==
        ||
        &&
        
        gtxn 0 RekeyTo
        global ZeroAddress
        ==
        &&
        gtxn 1 RekeyTo
        global ZeroAddress
        ==
        &&
        gtxn 2 RekeyTo
        global ZeroAddress
        ==
        &&
        gtxn 3 RekeyTo
        global ZeroAddress
        ==
        &&
        gtxn 4 RekeyTo
        global ZeroAddress
        ==
        &&
        gtxn 5 RekeyTo
        global ZeroAddress
        ==
        &&
        bnz finish
        b failed
        
        redeemEinr:
        global GroupSize
        int 6
        ==
        gtxn 0 TypeEnum
        int 6
        ==
        &&
        
        gtxn 0 ApplicationID
        int 77396031
        ==
        &&
        
        gtxn 0 OnCompletion
        int NoOp
        ==
        int DeleteApplication
        gtxn 0 OnCompletion
        ==
        ||
        &&
        
        gtxn 0 RekeyTo
        global ZeroAddress
        ==
        &&
        gtxn 1 RekeyTo
        global ZeroAddress
        ==
        &&
        gtxn 2 RekeyTo
        global ZeroAddress
        ==
        &&
        gtxn 3 RekeyTo
        global ZeroAddress
        ==
        &&
        gtxn 4 RekeyTo
        global ZeroAddress
        ==
        &&
        gtxn 5 RekeyTo
        global ZeroAddress
        ==
        &&
        bnz finish
        b failed
        
        failed:
        int 0
        return
        finish:
        int 1
        return`;
        
        
        
        let results = await algodClient.compile(data).do();
        //console.log("Hash = " + results.hash);
        //console.log("Result = " + results.result);
        
        let program = new Uint8Array(Buffer.from(redeemDetails.swapTauEscrow, "base64"));          
        let lsig = new algosdk.LogicSigAccount(program);
        console.log("Escrow =", lsig.address());
        
        let transaction2 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
            from: localStorage.getItem("walletAddress"), 
            to: lsig.address(), 
            amount: parseFloat(EinrAmount).toFixed(6) * 1000000, 
            assetIndex: parseInt(einrID), 
            suggestedParams: params
          });

          let usdc99 = (parseFloat(usdcEinrAmount) * 99 / 100).toString().match(/^-?\d+(?:\.\d{0,6})?/)[0] * 1000000;
   
        let transaction3 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
            from: lsig.address(), 
            to: localStorage.getItem("walletAddress"), 
            amount: parseInt(usdc99), 
            assetIndex: parseInt(usdcID), 
            suggestedParams: params
          }); 

          let usdc1 = (parseFloat(usdcEinrAmount) * 1 / 100).toString().match(/^-?\d+(?:\.\d{0,6})?/)[0] * 1000000;
          
          let transaction4 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
            from: lsig.address(), 
            to: redeemDetails.creatorAddress, 
            amount: parseInt(usdc1), 
            assetIndex: parseInt(usdcID), 
            suggestedParams: params
          }); 

          let transaction5 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
            from: lsig.address(), 
            to: localStorage.getItem("walletAddress"), 
            amount: parseFloat(elemEinrAmount).toFixed(6) * 1000000, 
            assetIndex: parseInt(elemID), 
            suggestedParams: params
          });
          console.log("elem =",parseFloat(elemEinrAmount).toFixed(6) * 1000000);
        let transaction6 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
          from: localStorage.getItem("walletAddress"), 
          to: lsig.address(), 
          amount: 3000, 
           note: undefined,  
           suggestedParams: params
         });
        
        const groupID = algosdk.computeGroupID([ transaction1, transaction2, transaction3, transaction4, transaction5, transaction6 ]);
        const txs = [ transaction1, transaction2, transaction3, transaction4, transaction5, transaction6 ];
        txs[0].group = groupID;
        txs[1].group = groupID;
        txs[2].group = groupID;
        txs[3].group = groupID;
        txs[4].group = groupID;
        txs[5].group = groupID;


        const signedTx1 = await myAlgoWallet.signTransaction([txs[0].toByte(), txs[1].toByte(), txs[5].toByte()]);
      //   const signedTx2 = await myAlgoWallet.signTransaction(txs[1].toByte());
        const signedTxEscrow1 = algosdk.signLogicSigTransaction(txs[2], lsig);
        const signedTxEscrow2 = algosdk.signLogicSigTransaction(txs[3], lsig);
        const signedTxEscrow3 = algosdk.signLogicSigTransaction(txs[4], lsig);
      //   const signedTx4 = algosdk.signLogicSigTransaction(txs[3].toByte());

        toast.info("Transaction in Progress");
    const response = await algodClient.sendRawTransaction([signedTx1[0].blob, signedTx1[1].blob, signedTxEscrow1.blob, signedTxEscrow2.blob, signedTxEscrow3.blob, signedTx1[2].blob ]).do();
    //console.log("TxID", JSON.stringify(response, null, 1));
    await waitForConfirmation(algodClient, response.txId);
    // toast.success(`Transaction Successfully completed with ${response.txId}`);
      } catch (err) {
        toast.error(`Transaction Failed due to ${err}`);
        console.error(err);
      }
    }
}

const print = () => {
    console.log("usdc =", usdcAmount);
    console.log("elem =", elemAmount);
    console.log("tau =", tauAmount);
}

useEffect(async () => {
    await balAsset();
}, [usdcBalances, elemBalances, tauBalances, EinrBalances, tauCir]);

const balAsset = async () =>
{
    // indexClient
let bal = await indexClient.lookupAccountByID(localStorage.getItem("walletAddress")).do();
let l = bal['account']['assets']['length'];
for(let i = 0; i < l; i++)
{
    if(bal['account']['assets'][i]['asset-id'] === usdcID)
    {
        setUsdcBalances(bal['account']['assets'][i]['amount']);
        break;
    }
}
for(let j = 0; j < l; j++)
{
    if(bal['account']['assets'][j]['asset-id'] === elemID)
    {
        setElemBalances(bal['account']['assets'][j]['amount']);
        break;
    }
}
for(let k = 0; k < l; k++)
{
    if(bal['account']['assets'][k]['asset-id'] === tauID)
    {
        setTauBalances(bal['account']['assets'][k]['amount']);
        break;
    }
}
for(let m = 0; m < l; m++)
{
    if(bal['account']['assets'][m]['asset-id'] === einrID)
    {
        setEinrBalances(bal['account']['assets'][m]['amount']);
        break;
    }
}

// setAssets(bal['account']['assets']);
}

useEffect(async () => {
    await cir();
}, [tauCir, einrCir]);

const cir = async () =>
{
    let escrow = await indexClient.lookupAccountByID(redeemDetails.swapTauEscrowAddress).do();
// console.log(bal['account']['assets']);
let eL = escrow['account']['assets']['length'];
// console.log(l);
for(let k = 0; k < eL; k++)
{
    if(escrow['account']['assets'][k]['asset-id'] === tauID)
    {
        setTauCir(escrow['account']['assets'][k]['amount']);
        break;
    }
}
for(let k = 0; k < eL; k++)
{
    if(escrow['account']['assets'][k]['asset-id'] === einrID)
    {
        setEinrCir(escrow['account']['assets'][k]['amount']);
        break;
    }
}
}

const amountSet = (value)=>{
    setTauAmount(value);
    setElemAmount(((parseFloat(value).toString().match(/^-?\d+(?:\.\d{0,6})?/)[0] / parseFloat(6))).toString().match(/^-?\d+(?:\.\d{0,6})?/)[0]);
    setUsdcAmount(parseFloat(value).toString().match(/^-?\d+(?:\.\d{0,6})?/)[0] / 2);
    setUsdcAmount99((parseFloat(value)/2 * 99 / 100).toString().match(/^-?\d+(?:\.\d{0,6})?/)[0]);
    setUsdcAmount1((parseFloat(value)/2 * 1 / 100).toString().match(/^-?\d+(?:\.\d{0,6})?/)[0]);
    // console.log(value);
}

const amountSetEinr = (value)=>{
    setEinrAmount(value);
    setElemEinrAmount(((parseFloat(value).toString().match(/^-?\d+(?:\.\d{0,6})?/)[0] / parseFloat(600))).toString().match(/^-?\d+(?:\.\d{0,6})?/)[0]);
    setUsdcEinrAmount(parseFloat(value).toString().match(/^-?\d+(?:\.\d{0,6})?/)[0] / 200);
    setUsdcEinrAmount99((parseFloat(value)/200 * 99 / 100).toString().match(/^-?\d+(?:\.\d{0,6})?/)[0]);
    setUsdcEinrAmount1((parseFloat(value)/200 * 1 / 100).toString().match(/^-?\d+(?:\.\d{0,6})?/)[0]);
    // console.log(value);
}

    
    return (
        <Layout>
            <><ToastContainer position='top-center' draggable = {false} transition={Zoom} autoClose={8000} closeOnClick = {false}/></>
            <Container fluid="lg">
                <Row className='mb-20'>
                    <Col md="4" sm="6" lg="3" className="mb-3">
                        <div className="card-graph flex-column p-3 d-flex align-items-center justify-content-center">
                            <span>Circulating TAU 
                            {/* <OverlayTrigger
                                placement="top"
                                overlay={
                                    <Tooltip id={`tooltip-top`}>
                                        From Chain
                                    </Tooltip>
                                }
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi ms-2 bi-info-circle" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                    </svg>
                                </OverlayTrigger> */}
                            </span>
                            <strong>{(parseFloat(totalSupply - parseFloat(tauCir))/1000000).toFixed(2)}</strong>
                        </div>
                    </Col>
                    <Col md="4" sm="6" lg="3" className="mb-3">
                        <div className="card-graph flex-column p-3 d-flex align-items-center justify-content-center">
                            <span>Circulating EINR</span>
                            <strong>{(parseFloat(totalSupply - parseFloat(einrCir))/1000000).toFixed(2)}</strong>
                        </div>
                    </Col>
                    <Col md="4" sm="6" lg="3" className="mb-3">
                        <div className="card-graph flex-column p-3 d-flex align-items-center justify-content-center">
                            <span>Redemption fee</span>
                            <strong>1%</strong>
                        </div>
                    </Col>
                    <Col md="4" sm="6" lg="3" className="mb-3">
                        <div className="card-graph flex-column p-3 d-flex align-items-center justify-content-center">
                            <span>Balancer ratio</span>
                            <strong>50%</strong>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col md={4} className="mb-4">
                        <div className="card-graph d-flex flex-column h-100">
                            <div className="my-auto px-4">
                                <div className="card-graph-header mb-3 d-flex align-items-center justify-content-between">
                                    <div className='pe-5'>
                                        <h4 className='mb-1'>TAU</h4> 
                                        <p>Value {"<"}&nbsp; <strong style={{color:"red"}}>0.0002 TAU</strong> can't be redeemed</p>
                                    </div>
                                </div>

                                <div className="card-graph-body text-center m-0">
                                    <div className="token-list-item token-list-item-nohover mb-3 px-0">
                                        <div className="token-list-icon">
                                            {/* <svg width="31" height="30" viewBox="0 0 31 30" fill="none" >
                                                <rect width="30.1212" height="30" rx="15" fill="#FA84B5"/>
                                                <path d="M21.943 11.2538C21.4418 12.1245 20.965 12.8983 20.5494 13.6964C20.4394 13.914 20.3905 14.2284 20.4516 14.4582C21.1117 16.9612 21.7963 19.4642 22.4686 21.9671C22.5053 22.1122 22.542 22.2694 22.5909 22.4871C21.8452 22.4871 21.1728 22.5113 20.4883 22.4629C20.366 22.4508 20.1826 22.2211 20.146 22.0518C19.6937 20.4678 19.278 18.8837 18.8379 17.2997C18.8013 17.1788 18.7646 17.0579 18.7035 16.8644C18.5446 17.1304 18.4223 17.3239 18.3001 17.5295C17.4077 19.0651 16.5031 20.5887 15.6107 22.1364C15.464 22.3904 15.3051 22.4992 14.9994 22.4871C14.2904 22.4629 13.5814 22.475 12.7746 22.475C12.8968 22.2453 12.9824 22.076 13.0802 21.9067C14.596 19.307 16.0997 16.7193 17.6277 14.1317C17.7989 13.8415 17.8478 13.5997 17.75 13.2732C17.5055 12.463 17.2977 11.6287 17.0409 10.6976C16.9065 10.9274 16.8087 11.0725 16.7231 11.2176C14.6083 14.833 12.5056 18.4364 10.403 22.0639C10.2197 22.3904 10.0118 22.5113 9.63289 22.4992C8.96054 22.4629 8.27597 22.4871 7.53027 22.4871C7.64029 22.2694 7.72587 22.1122 7.81144 21.9671C10.5375 17.2997 13.2636 12.6444 15.9652 7.97698C16.173 7.61423 16.393 7.46913 16.8087 7.50541C17.2488 7.54168 17.6888 7.52959 18.1289 7.50541C18.4345 7.49331 18.5812 7.57796 18.6668 7.90443C18.9113 8.88387 19.2047 9.8633 19.4614 10.8427C19.5347 11.145 19.6692 11.2659 19.9871 11.2538C20.5983 11.2297 21.2217 11.2538 21.943 11.2538Z" fill="black"/>
                                            </svg> */}
                                            <img src={tauLogo} />
                                        </div>
                                        <div className="token-list-title flex-grow-1">
                                            <input type="text" placeholder="-" className="form-control text-center form-control-reset" value={tauAmount} onChange={(e) => amountSet(e.target.value)}/>                  
                                        </div>
                                    </div>

                                    <p className='text-white mb-3'>{(parseFloat(tauBalances).toFixed(6)) === "NaN" ? <>{0}</> : parseFloat(tauBalances).toFixed(6) / 1000000} Available</p>
                                    <center>
                            <button className='btn m-2 px-sm-5 btn-grad ' onClick={()=>redeemTau()} style={{textTransform:"capitalize"}}>Redeem with TAU</button>
                            </center>
                                    {/* <p className='text-center'>Pool (V3) 🌊 : 0x2fE0 ... 0729</p> */}
                                </div>
                            </div>
                        </div>
                    </Col>

                    <Col md={8} className="mb-4">
                        <div className="card-bond h-100">
                            <div className="card-bond-inner h-100">
                                <div className="table-group-outer table-group-redeem table-group-redeem-dashboard">
                                    <div className="table-group-body">
                                        <div className="table-group-tr">
                                            <div className="table-group-td">1%</div>
                                            <div className="table-group-td">REDEMPTION FEE</div>
                                            <div className="table-group-td" style={{minWidth: '120px', width: '120px'}}>
                                                <div className="token-list-item token-list-item-nohover ms-auto mb-0 px-0" style={{minWidth: '120px', width: '120px'}}>
                                                    <div className="token-list-icon">
                                                        {/* <svg width="31" height="30" viewBox="0 0 31 30" fill="none" >
                                                            <rect width="30.1212" height="30" rx="15" fill="#FA84B5"/>
                                                            <path d="M21.943 11.2538C21.4418 12.1245 20.965 12.8983 20.5494 13.6964C20.4394 13.914 20.3905 14.2284 20.4516 14.4582C21.1117 16.9612 21.7963 19.4642 22.4686 21.9671C22.5053 22.1122 22.542 22.2694 22.5909 22.4871C21.8452 22.4871 21.1728 22.5113 20.4883 22.4629C20.366 22.4508 20.1826 22.2211 20.146 22.0518C19.6937 20.4678 19.278 18.8837 18.8379 17.2997C18.8013 17.1788 18.7646 17.0579 18.7035 16.8644C18.5446 17.1304 18.4223 17.3239 18.3001 17.5295C17.4077 19.0651 16.5031 20.5887 15.6107 22.1364C15.464 22.3904 15.3051 22.4992 14.9994 22.4871C14.2904 22.4629 13.5814 22.475 12.7746 22.475C12.8968 22.2453 12.9824 22.076 13.0802 21.9067C14.596 19.307 16.0997 16.7193 17.6277 14.1317C17.7989 13.8415 17.8478 13.5997 17.75 13.2732C17.5055 12.463 17.2977 11.6287 17.0409 10.6976C16.9065 10.9274 16.8087 11.0725 16.7231 11.2176C14.6083 14.833 12.5056 18.4364 10.403 22.0639C10.2197 22.3904 10.0118 22.5113 9.63289 22.4992C8.96054 22.4629 8.27597 22.4871 7.53027 22.4871C7.64029 22.2694 7.72587 22.1122 7.81144 21.9671C10.5375 17.2997 13.2636 12.6444 15.9652 7.97698C16.173 7.61423 16.393 7.46913 16.8087 7.50541C17.2488 7.54168 17.6888 7.52959 18.1289 7.50541C18.4345 7.49331 18.5812 7.57796 18.6668 7.90443C18.9113 8.88387 19.2047 9.8633 19.4614 10.8427C19.5347 11.145 19.6692 11.2659 19.9871 11.2538C20.5983 11.2297 21.2217 11.2538 21.943 11.2538Z" fill="black"/>
                                                        </svg> */}
                                                        <img src={usdcLogo} />
                                                    </div>
                                                    <div className="token-list-title flex-grow-1">
                                                        <input type="text" placeholder="-" className="form-control text-center form-control-reset" value={usdcAmount1}/>                  
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table-group-tr">
                                            <div className="table-group-td">49%</div>
                                            <div className="table-group-td">USDC</div>
                                            <div className="table-group-td" style={{minWidth: '120px', width: '120px'}}>
                                                <div className="token-list-item token-list-item-nohover ms-auto mb-0 px-0" style={{minWidth: '120px', width: '120px'}}>
                                                    <div className="token-list-icon">
                                                        {/* <svg width="31" height="30" viewBox="0 0 31 30" fill="none" >
                                                            <rect width="30.1212" height="30" rx="15" fill="#FA84B5"/>
                                                            <path d="M21.943 11.2538C21.4418 12.1245 20.965 12.8983 20.5494 13.6964C20.4394 13.914 20.3905 14.2284 20.4516 14.4582C21.1117 16.9612 21.7963 19.4642 22.4686 21.9671C22.5053 22.1122 22.542 22.2694 22.5909 22.4871C21.8452 22.4871 21.1728 22.5113 20.4883 22.4629C20.366 22.4508 20.1826 22.2211 20.146 22.0518C19.6937 20.4678 19.278 18.8837 18.8379 17.2997C18.8013 17.1788 18.7646 17.0579 18.7035 16.8644C18.5446 17.1304 18.4223 17.3239 18.3001 17.5295C17.4077 19.0651 16.5031 20.5887 15.6107 22.1364C15.464 22.3904 15.3051 22.4992 14.9994 22.4871C14.2904 22.4629 13.5814 22.475 12.7746 22.475C12.8968 22.2453 12.9824 22.076 13.0802 21.9067C14.596 19.307 16.0997 16.7193 17.6277 14.1317C17.7989 13.8415 17.8478 13.5997 17.75 13.2732C17.5055 12.463 17.2977 11.6287 17.0409 10.6976C16.9065 10.9274 16.8087 11.0725 16.7231 11.2176C14.6083 14.833 12.5056 18.4364 10.403 22.0639C10.2197 22.3904 10.0118 22.5113 9.63289 22.4992C8.96054 22.4629 8.27597 22.4871 7.53027 22.4871C7.64029 22.2694 7.72587 22.1122 7.81144 21.9671C10.5375 17.2997 13.2636 12.6444 15.9652 7.97698C16.173 7.61423 16.393 7.46913 16.8087 7.50541C17.2488 7.54168 17.6888 7.52959 18.1289 7.50541C18.4345 7.49331 18.5812 7.57796 18.6668 7.90443C18.9113 8.88387 19.2047 9.8633 19.4614 10.8427C19.5347 11.145 19.6692 11.2659 19.9871 11.2538C20.5983 11.2297 21.2217 11.2538 21.943 11.2538Z" fill="black"/>
                                                        </svg> */}
                                                        <img src={usdcLogo} />
                                                    </div>
                                                    <div className="token-list-title flex-grow-1">
                                                        <input type="text" placeholder="-" className="form-control text-center form-control-reset" value={usdcAmount99}/>                  
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table-group-tr">
                                            <div className="table-group-td">50%</div>
                                            <div className="table-group-td">ELEM </div>
                                            <div className="table-group-td" style={{minWidth: '120px', width: '120px'}}>
                                                <div className="token-list-item token-list-item-nohover ms-auto mb-0 px-0" style={{minWidth: '120px', width: '120px'}}>
                                                    <div className="token-list-icon">
                                                        {/* <svg width="31" height="30" viewBox="0 0 31 30" fill="none" >
                                                            <rect width="30.1212" height="30" rx="15" fill="#FA84B5"/>
                                                            <path d="M21.943 11.2538C21.4418 12.1245 20.965 12.8983 20.5494 13.6964C20.4394 13.914 20.3905 14.2284 20.4516 14.4582C21.1117 16.9612 21.7963 19.4642 22.4686 21.9671C22.5053 22.1122 22.542 22.2694 22.5909 22.4871C21.8452 22.4871 21.1728 22.5113 20.4883 22.4629C20.366 22.4508 20.1826 22.2211 20.146 22.0518C19.6937 20.4678 19.278 18.8837 18.8379 17.2997C18.8013 17.1788 18.7646 17.0579 18.7035 16.8644C18.5446 17.1304 18.4223 17.3239 18.3001 17.5295C17.4077 19.0651 16.5031 20.5887 15.6107 22.1364C15.464 22.3904 15.3051 22.4992 14.9994 22.4871C14.2904 22.4629 13.5814 22.475 12.7746 22.475C12.8968 22.2453 12.9824 22.076 13.0802 21.9067C14.596 19.307 16.0997 16.7193 17.6277 14.1317C17.7989 13.8415 17.8478 13.5997 17.75 13.2732C17.5055 12.463 17.2977 11.6287 17.0409 10.6976C16.9065 10.9274 16.8087 11.0725 16.7231 11.2176C14.6083 14.833 12.5056 18.4364 10.403 22.0639C10.2197 22.3904 10.0118 22.5113 9.63289 22.4992C8.96054 22.4629 8.27597 22.4871 7.53027 22.4871C7.64029 22.2694 7.72587 22.1122 7.81144 21.9671C10.5375 17.2997 13.2636 12.6444 15.9652 7.97698C16.173 7.61423 16.393 7.46913 16.8087 7.50541C17.2488 7.54168 17.6888 7.52959 18.1289 7.50541C18.4345 7.49331 18.5812 7.57796 18.6668 7.90443C18.9113 8.88387 19.2047 9.8633 19.4614 10.8427C19.5347 11.145 19.6692 11.2659 19.9871 11.2538C20.5983 11.2297 21.2217 11.2538 21.943 11.2538Z" fill="black"/>
                                                        </svg> */}
                                                        <img src={elemLogo} />
                                                    </div>
                                                    <div className="token-list-title flex-grow-1">
                                                        <input type="text" placeholder="-" className="form-control text-center form-control-reset" value={elemAmount}/>                  
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col md={4} className="mb-4">
                        <div className="card-graph d-flex flex-column h-100">
                            <div className="my-auto px-4">
                                <div className="card-graph-header mb-3 d-flex align-items-center justify-content-between">
                                    <div className='pe-5'>
                                        <h4 className='mb-1'>EINR</h4>
                                        <p>Value {"<"}&nbsp; <strong style={{color:"red"}}>5 EINR</strong> can't be redeemed</p>
                                    </div>
                                </div>

                                <div className="card-graph-body text-center m-0">
                                    <div className="token-list-item token-list-item-nohover mb-3 px-0">
                                        <div className="token-list-icon">
                                            {/* <svg width="31" height="30" viewBox="0 0 31 30" fill="none" >
                                                <rect width="30.1212" height="30" rx="15" fill="#FA84B5"/>
                                                <path d="M21.943 11.2538C21.4418 12.1245 20.965 12.8983 20.5494 13.6964C20.4394 13.914 20.3905 14.2284 20.4516 14.4582C21.1117 16.9612 21.7963 19.4642 22.4686 21.9671C22.5053 22.1122 22.542 22.2694 22.5909 22.4871C21.8452 22.4871 21.1728 22.5113 20.4883 22.4629C20.366 22.4508 20.1826 22.2211 20.146 22.0518C19.6937 20.4678 19.278 18.8837 18.8379 17.2997C18.8013 17.1788 18.7646 17.0579 18.7035 16.8644C18.5446 17.1304 18.4223 17.3239 18.3001 17.5295C17.4077 19.0651 16.5031 20.5887 15.6107 22.1364C15.464 22.3904 15.3051 22.4992 14.9994 22.4871C14.2904 22.4629 13.5814 22.475 12.7746 22.475C12.8968 22.2453 12.9824 22.076 13.0802 21.9067C14.596 19.307 16.0997 16.7193 17.6277 14.1317C17.7989 13.8415 17.8478 13.5997 17.75 13.2732C17.5055 12.463 17.2977 11.6287 17.0409 10.6976C16.9065 10.9274 16.8087 11.0725 16.7231 11.2176C14.6083 14.833 12.5056 18.4364 10.403 22.0639C10.2197 22.3904 10.0118 22.5113 9.63289 22.4992C8.96054 22.4629 8.27597 22.4871 7.53027 22.4871C7.64029 22.2694 7.72587 22.1122 7.81144 21.9671C10.5375 17.2997 13.2636 12.6444 15.9652 7.97698C16.173 7.61423 16.393 7.46913 16.8087 7.50541C17.2488 7.54168 17.6888 7.52959 18.1289 7.50541C18.4345 7.49331 18.5812 7.57796 18.6668 7.90443C18.9113 8.88387 19.2047 9.8633 19.4614 10.8427C19.5347 11.145 19.6692 11.2659 19.9871 11.2538C20.5983 11.2297 21.2217 11.2538 21.943 11.2538Z" fill="black"/>
                                            </svg> */}
                                            <img src={einrLogo} />
                                        </div>
                                        <div className="token-list-title flex-grow-1">
                                            <input type="text" placeholder="-" className="form-control text-center form-control-reset" value={EinrAmount} onChange={(e) => amountSetEinr(e.target.value)}/>                  
                                        </div>
                                    </div>

                                    <p className='text-white mb-3'>{(parseFloat(EinrBalances).toFixed(6)) === "NaN" ? <>{0}</> : parseFloat(EinrBalances).toFixed(6) / 1000000} Available</p>
                                    <center>
                            <button className='btn m-2 px-sm-5 btn-grad ' onClick={()=>redeemEinr()} style={{textTransform:"capitalize"}}>Redeem with EINR</button>
                            </center>
                                    {/* <p className='text-center'>Pool (V3) 🌊 : 0x2fE0 ... 0729</p> */}
                                </div>
                            </div>
                        </div>
                    </Col>

                    <Col md={8} className="mb-4">
                        <div className="card-bond h-100">
                            <div className="card-bond-inner h-100">
                            <div className="table-group-outer table-group-redeem table-group-redeem-dashboard">
                                    <div className="table-group-body">
                                        <div className="table-group-tr">
                                            <div className="table-group-td">1%</div>
                                            <div className="table-group-td">REDEMPTION FEE</div>
                                            <div className="table-group-td" style={{minWidth: '120px', width: '120px'}}>
                                                <div className="token-list-item token-list-item-nohover ms-auto mb-0 px-0" style={{minWidth: '120px', width: '120px'}}>
                                                    <div className="token-list-icon">
                                                        {/* <svg width="31" height="30" viewBox="0 0 31 30" fill="none" >
                                                            <rect width="30.1212" height="30" rx="15" fill="#FA84B5"/>
                                                            <path d="M21.943 11.2538C21.4418 12.1245 20.965 12.8983 20.5494 13.6964C20.4394 13.914 20.3905 14.2284 20.4516 14.4582C21.1117 16.9612 21.7963 19.4642 22.4686 21.9671C22.5053 22.1122 22.542 22.2694 22.5909 22.4871C21.8452 22.4871 21.1728 22.5113 20.4883 22.4629C20.366 22.4508 20.1826 22.2211 20.146 22.0518C19.6937 20.4678 19.278 18.8837 18.8379 17.2997C18.8013 17.1788 18.7646 17.0579 18.7035 16.8644C18.5446 17.1304 18.4223 17.3239 18.3001 17.5295C17.4077 19.0651 16.5031 20.5887 15.6107 22.1364C15.464 22.3904 15.3051 22.4992 14.9994 22.4871C14.2904 22.4629 13.5814 22.475 12.7746 22.475C12.8968 22.2453 12.9824 22.076 13.0802 21.9067C14.596 19.307 16.0997 16.7193 17.6277 14.1317C17.7989 13.8415 17.8478 13.5997 17.75 13.2732C17.5055 12.463 17.2977 11.6287 17.0409 10.6976C16.9065 10.9274 16.8087 11.0725 16.7231 11.2176C14.6083 14.833 12.5056 18.4364 10.403 22.0639C10.2197 22.3904 10.0118 22.5113 9.63289 22.4992C8.96054 22.4629 8.27597 22.4871 7.53027 22.4871C7.64029 22.2694 7.72587 22.1122 7.81144 21.9671C10.5375 17.2997 13.2636 12.6444 15.9652 7.97698C16.173 7.61423 16.393 7.46913 16.8087 7.50541C17.2488 7.54168 17.6888 7.52959 18.1289 7.50541C18.4345 7.49331 18.5812 7.57796 18.6668 7.90443C18.9113 8.88387 19.2047 9.8633 19.4614 10.8427C19.5347 11.145 19.6692 11.2659 19.9871 11.2538C20.5983 11.2297 21.2217 11.2538 21.943 11.2538Z" fill="black"/>
                                                        </svg> */}
                                                        <img src={usdcLogo} />
                                                    </div>
                                                    <div className="token-list-title flex-grow-1">
                                                        <input type="text" placeholder="-" className="form-control text-center form-control-reset" value={usdcAmount1}/>                  
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table-group-tr">
                                            <div className="table-group-td">49%</div>
                                            <div className="table-group-td">USDC</div>
                                            <div className="table-group-td" style={{minWidth: '120px', width: '120px'}}>
                                                <div className="token-list-item token-list-item-nohover ms-auto mb-0 px-0" style={{minWidth: '120px', width: '120px'}}>
                                                    <div className="token-list-icon">
                                                        {/* <svg width="31" height="30" viewBox="0 0 31 30" fill="none" >
                                                            <rect width="30.1212" height="30" rx="15" fill="#FA84B5"/>
                                                            <path d="M21.943 11.2538C21.4418 12.1245 20.965 12.8983 20.5494 13.6964C20.4394 13.914 20.3905 14.2284 20.4516 14.4582C21.1117 16.9612 21.7963 19.4642 22.4686 21.9671C22.5053 22.1122 22.542 22.2694 22.5909 22.4871C21.8452 22.4871 21.1728 22.5113 20.4883 22.4629C20.366 22.4508 20.1826 22.2211 20.146 22.0518C19.6937 20.4678 19.278 18.8837 18.8379 17.2997C18.8013 17.1788 18.7646 17.0579 18.7035 16.8644C18.5446 17.1304 18.4223 17.3239 18.3001 17.5295C17.4077 19.0651 16.5031 20.5887 15.6107 22.1364C15.464 22.3904 15.3051 22.4992 14.9994 22.4871C14.2904 22.4629 13.5814 22.475 12.7746 22.475C12.8968 22.2453 12.9824 22.076 13.0802 21.9067C14.596 19.307 16.0997 16.7193 17.6277 14.1317C17.7989 13.8415 17.8478 13.5997 17.75 13.2732C17.5055 12.463 17.2977 11.6287 17.0409 10.6976C16.9065 10.9274 16.8087 11.0725 16.7231 11.2176C14.6083 14.833 12.5056 18.4364 10.403 22.0639C10.2197 22.3904 10.0118 22.5113 9.63289 22.4992C8.96054 22.4629 8.27597 22.4871 7.53027 22.4871C7.64029 22.2694 7.72587 22.1122 7.81144 21.9671C10.5375 17.2997 13.2636 12.6444 15.9652 7.97698C16.173 7.61423 16.393 7.46913 16.8087 7.50541C17.2488 7.54168 17.6888 7.52959 18.1289 7.50541C18.4345 7.49331 18.5812 7.57796 18.6668 7.90443C18.9113 8.88387 19.2047 9.8633 19.4614 10.8427C19.5347 11.145 19.6692 11.2659 19.9871 11.2538C20.5983 11.2297 21.2217 11.2538 21.943 11.2538Z" fill="black"/>
                                                        </svg> */}
                                                        <img src={usdcLogo} />
                                                    </div>
                                                    <div className="token-list-title flex-grow-1">
                                                        <input type="text" placeholder="-" className="form-control text-center form-control-reset" value={usdcAmount99}/>                  
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table-group-tr">
                                            <div className="table-group-td">50%</div>
                                            <div className="table-group-td">ELEM </div>
                                            <div className="table-group-td" style={{minWidth: '120px', width: '120px'}}>
                                                <div className="token-list-item token-list-item-nohover ms-auto mb-0 px-0" style={{minWidth: '120px', width: '120px'}}>
                                                    <div className="token-list-icon">
                                                        {/* <svg width="31" height="30" viewBox="0 0 31 30" fill="none" >
                                                            <rect width="30.1212" height="30" rx="15" fill="#FA84B5"/>
                                                            <path d="M21.943 11.2538C21.4418 12.1245 20.965 12.8983 20.5494 13.6964C20.4394 13.914 20.3905 14.2284 20.4516 14.4582C21.1117 16.9612 21.7963 19.4642 22.4686 21.9671C22.5053 22.1122 22.542 22.2694 22.5909 22.4871C21.8452 22.4871 21.1728 22.5113 20.4883 22.4629C20.366 22.4508 20.1826 22.2211 20.146 22.0518C19.6937 20.4678 19.278 18.8837 18.8379 17.2997C18.8013 17.1788 18.7646 17.0579 18.7035 16.8644C18.5446 17.1304 18.4223 17.3239 18.3001 17.5295C17.4077 19.0651 16.5031 20.5887 15.6107 22.1364C15.464 22.3904 15.3051 22.4992 14.9994 22.4871C14.2904 22.4629 13.5814 22.475 12.7746 22.475C12.8968 22.2453 12.9824 22.076 13.0802 21.9067C14.596 19.307 16.0997 16.7193 17.6277 14.1317C17.7989 13.8415 17.8478 13.5997 17.75 13.2732C17.5055 12.463 17.2977 11.6287 17.0409 10.6976C16.9065 10.9274 16.8087 11.0725 16.7231 11.2176C14.6083 14.833 12.5056 18.4364 10.403 22.0639C10.2197 22.3904 10.0118 22.5113 9.63289 22.4992C8.96054 22.4629 8.27597 22.4871 7.53027 22.4871C7.64029 22.2694 7.72587 22.1122 7.81144 21.9671C10.5375 17.2997 13.2636 12.6444 15.9652 7.97698C16.173 7.61423 16.393 7.46913 16.8087 7.50541C17.2488 7.54168 17.6888 7.52959 18.1289 7.50541C18.4345 7.49331 18.5812 7.57796 18.6668 7.90443C18.9113 8.88387 19.2047 9.8633 19.4614 10.8427C19.5347 11.145 19.6692 11.2659 19.9871 11.2538C20.5983 11.2297 21.2217 11.2538 21.943 11.2538Z" fill="black"/>
                                                        </svg> */}
                                                        <img src={elemLogo} />
                                                    </div>
                                                    <div className="token-list-title flex-grow-1">
                                                        <input type="text" placeholder="-" className="form-control text-center form-control-reset" value={elemAmount}/>                  
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>   

            </Container>
        </Layout>
    );
};

export default Redeem;