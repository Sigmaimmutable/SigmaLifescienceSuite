import React, { useState,useEffect } from 'react';
import { Accordion, Badge, Button, Col, Container, Dropdown, Form, FormControl, InputGroup, OverlayTrigger, Row, Tab, Tabs, Tooltip } from 'react-bootstrap';
import Layout from './LayoutT';

import USDC from '../../assets/images/usdc.jpg';
import Icon1 from '../../assets/images/elem-original.png';
import Icon2 from '../../assets/images/algorand-logo.png';
import elementLogo from '../../assets/images/favicon.ico';
import elemLogo from '../../assets/images/modal-square-logo.png';
import Icon3 from '../../assets/images/tau-original.png';
import axios from "axios";

import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';
import "../toast-style-override.css"
import MyAlgoConnect from '@randlabs/myalgo-connect';

import configfileelem from "../../stakingconfig.json";
import configfiletau from "../../stakingFarmTauconfig.json";

import configfileelemalgo from "../../stakingelemalgoconfig.json";
import configfileeinralgo from "../../stakingFarmEinrAlgo.json";
//import configfile from "../stakingelemalgoconfig.json";
import url from "../../configurl";
import { config } from 'dotenv';
import{checkotp,assetOptin}from "../formula";
import {farmtvltau} from "../TAUFarmStaking ";
import {farmtvlelem} from "../ElemFarmStaking ";
import {farmtvlelemalgopair} from "../ElemAlgoFarmStaking.js";
import { farmtvleinralgopair } from '../EINRALGOFarmStaking';
import Stakecard from './Stakecard';
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import { formatJsonRpcRequest } from "@json-rpc-tools/utils";
const baseServer = 'https://testnet-algorand.api.purestake.io/ps2';
const port = '';
const token = {
    'X-API-Key': 'pOD5BAUCxq7InVPjo0sO01B0Vq4d7pD1ask5Ix43'
 }
 
 
 const algosdk = require('algosdk');
 const algodClientGet = new algosdk.Algodv2(token, baseServer, port);
 const algodClient = new algosdk.Algodv2('', 'https://node.testnet.algoexplorerapi.io', '');
 const indexClient = new algosdk.Indexer('', 'https://algoindexer.testnet.algoexplorerapi.io', '');
 const myAlgoConnect = new MyAlgoConnect();
 
 const bridge = "https://bridge.walletconnect.org";
// import { Link } from 'react-router-dom';
const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
function Staking(props) {
  useEffect(() => {
    document.title = "Sigma | Stake"
}, [])
    const [val, setVal] = useState('');
    const [swicth, setSwitch] = useState(true);
    const [receive, setReceive] = useState('Wone');
    const handleToggle = () => setSwitch(!swicth);
    const [stakevalue,setStakevalue] = useState("");
    const [withdrawvalue,setwithdrawvalue] = useState("");
    const[balanceelem,setBalanceelem] = useState([]);
    const[balancetau,setBalancetau] = useState([]);
    const[stakedbalanceelem,setStakedBalanceelem] = useState("");
    const[stakedbalancetau,setStakedBalancetau] = useState("");
    const [accounts, setaccount] = useState("");
    const CategoryOptions = [
        // { Farmname: 'ALGO/ELEM', image1name: Icon1, image2name:Icon2 },
        // {Farmname:'ALGO/EINR', image1name: Icon4, image2name:Icon2 },
        {Farmname: 'ELEM', image1name: Icon1, image2name: "" },
        {Farmname: 'TAU', image1name: Icon3, image2name: ""}
        
      
    ]
   const [minAlgo, setMinAlgo] = useState("");
 
   const[rewardamountbalance,setrewardBalance] = useState([]);
   const[globaltime,setGlobalTime] = useState('');
   const[globalstake,setGlobalStake] = useState('');
   const[totalsul,settotalsul] = useState('');
   const[totalslatelock,settotalslatelock] = useState('');
   const[usertime,setusertime] = useState('');
   const[rewardcalc,setrewardcalculation]=useState('');
   console.log("rewardcalcheck",rewardcalc);
   const[stakeamount,setstakedamount] = useState("");
   const[unstakeamount,setunstakedamount] = useState("");
   const[rewardupdatetime,setrewardupdatetime]=useState("");
   const [usertimeset,setusertimecheck]=useState("");
   const[rewardBool,setRewardBool]=useState(false);
   const [state, setState] = useState("");
//    //FOR ELEM
//    useEffect(() => {
//     const fetchPosts = async () => {
//          // read local state of application from user account

//   let accountInfoResponse = await algodClientGet.accountInformation(localStorage.getItem("walletAddress")).do();
//   console.log("configfile1",configfileelem.applicationid);
//   let appById = await algodClientGet.getApplicationByID(parseInt(configfileelem.applicationid)).do();
 
//        let globaltimenew;
//        let gloablstakenew;
//        let totalsulnew;
//        let totalslatelocknew;
//        let stakedbalancenew;
//        let rewardbalancenew;
//        let usertimenew;
//        for(let i=0;i<11;i++){
          
//             if(appById['params']['global-state'][i]['key']==="R1Q="){
//             globaltimenew = appById['params']['global-state'][i]['value']['uint'];
//             setGlobalTime(appById['params']['global-state'][i]['value']['uint']);
//             console.log("globaltime",globaltime);
//             }
 
//             if(appById['params']['global-state'][i]['key']==="R1NT"){
//               gloablstakenew=appById['params']['global-state'][i]['value']['uint'];
//               setGlobalStake(appById['params']['global-state'][i]['value']['uint']);
//               }
//             if(appById['params']['global-state'][i]['key']==="VFNVTA=="){
//                 totalsulnew =appById['params']['global-state'][i]['value']['uint'];
                
//                 settotalsul(appById['params']['global-state'][i]['value']['uint']);
//                 }
//             if(appById['params']['global-state'][i]['key']==="VFNM"){
//                   totalslatelocknew=appById['params']['global-state'][i]['value']['uint'];
//                   settotalslatelock(appById['params']['global-state'][i]['value']['uint']);
//                   }   
//            }
        

//   console.log("accinfolocal",accountInfoResponse);
//   if( accountInfoResponse['apps-local-state'].length === null|| accountInfoResponse['apps-local-state'].length ===undefined||accountInfoResponse['apps-local-state'].length===""){
//     // alert("check");
//  }
// else{


//   console.log("User",accountInfoResponse['apps-local-state'].length);
//   for (let i = 0; i < accountInfoResponse['apps-local-state'].length; i++) { 
//       if (accountInfoResponse['apps-local-state'][i].id == parseInt(configfileelem.applicationid)) {
//           console.log("User's local state:",accountInfoResponse['apps-local-state'][i].id);
//           let acccheck= accountInfoResponse['apps-local-state'][i][`key-value`]; 
//           console.log("Usercheck",acccheck);
//           console.log("User",accountInfoResponse['apps-local-state'][i][`key-value`]);
        

//           if(accountInfoResponse['apps-local-state'][i][`key-value`]=== null|| accountInfoResponse['apps-local-state'][i][`key-value`] === undefined||accountInfoResponse['apps-local-state'][i][`key-value`]===""){
//             // alert("check");
//          }
//         else{
// for (let n = 0; n < accountInfoResponse['apps-local-state'][i][`key-value`].length; n++) {
//               console.log(accountInfoResponse['apps-local-state'][i][`key-value`][n]);
//               //setStakedBalance(accountInfoResponse['apps-local-state'][i][`key-value`][n]);
              
//               let rewardkey =accountInfoResponse['apps-local-state'][i]['key-value'][n];
//              if(rewardkey['key'] === "VUE="){
//                stakedbalancenew=accountInfoResponse['apps-local-state'][i]['key-value'][n]['value']['uint'];
//                setStakedBalanceelem(accountInfoResponse['apps-local-state'][i]['key-value'][n]['value']['uint']);
//              }
//             if(rewardkey['key'] === "VVNT"){
//               rewardbalancenew=accountInfoResponse['apps-local-state'][i]['key-value'][n]['value']['uint'];
//               console.log("rewardcheck",accountInfoResponse['apps-local-state'][i]['key-value'][n]['value']['uint']);
//               setrewardBalance(accountInfoResponse['apps-local-state'][i]['key-value'][n]['value']['uint']);
//               console.log("rewardcheck",accountInfoResponse['apps-local-state'][i]['key-value'][n]['value']['uint']);
//             }
//             if(rewardkey['key'] === "VVQ="){
//               usertimenew = accountInfoResponse['apps-local-state'][i]['key-value'][n]['value']['uint'];
//               console.log("usertimecheck",usertimenew);
//               setusertimecheck(usertimenew);
//               console.log("usertimeset",usertimeset);
    
//               setrewardupdatetime(parseInt(usertimenew)+604800);
//               console.log("rewardupdatetime",rewardupdatetime);
//               console.log("usertime",accountInfoResponse['apps-local-state'][i]['key-value'][n]['value']['uint']);
//               setusertime(accountInfoResponse['apps-local-state'][i]['key-value'][n]['value']['uint']);
//               console.log("usertime",accountInfoResponse['apps-local-state'][i]['key-value'][n]['value']['uint']);
//             }
              
//           }

//         }

          
//       }
//   }
// }
//   for(let i = 0; i < accountInfoResponse['assets'].length; i++){
//     console.log("accountsasset", accountInfoResponse['assets']);
//      if (accountInfoResponse['assets'][i]['asset-id'] == parseInt(configfileelem.assetid)) {
//       setBalanceelem(accountInfoResponse['assets'][i]['amount']);
//       console.log("accountassetid", configfileelem.assetid);
//       console.log("accountsassetnew", accountInfoResponse['assets'][i]['amount']);

//      }
//   }


  
//   console.log("sub",globaltimenew);
//   console.log("sub_div",usertimenew);
//   console.log("mul1",stakedbalancenew);
//   console.log("add_div",rewardbalancenew);
//   console.log("mul2",gloablstakenew);
//   //console.log("rewardCal",rewardCal);
//   let sub = parseInt(globaltimenew) - parseInt(usertimenew);
//     console.log("checksub",sub);
//   let sub_div = parseFloat(sub) / 86400;
  
//   let mul1 = parseFloat(sub_div) * parseFloat(stakedbalancenew);
  
//   let add = parseFloat(rewardbalancenew) + parseFloat(mul1);
  
//   let add_div =  parseFloat(add) / parseFloat(gloablstakenew);
  
//   let mul2 = parseFloat(add_div) * parseFloat(totalsulnew);
  
//   let rewardCal1 = parseFloat(mul2) / 1000000;
//   let rewardCal = rewardCal1.toFixed(6);
//   console.log("rewardamountcalculation",parseFloat(rewardCal));
//   //let rewardcalculation =parseFloat((parseFloat(rewardamountbalance)+(parseFloat((globaltime)-parseFloat(usertime))/60)*parseFloat(stakedbalance)/parseFloat(globalstake))*parseFloat(totalsul)/parseFloat(1000000));
//   setrewardcalculation(parseFloat(rewardCal));
//   (rewardCal === 'NaN' || rewardCal === "" || rewardCal === null || rewardCal === '' || rewardCal === undefined) ? setRewardBool(false) : setRewardBool(true);

  
    
//     };
    

//     fetchPosts();
//   }, [rewardcalc]);
  
  //For TAU

//   useEffect(() => {
//     const fetchPosts = async () => {
//          // read local state of application from user account

//   let accountInfoResponse = await algodClientGet.accountInformation(localStorage.getItem("walletAddress")).do();
//   console.log("configfile1",configfiletau.applicationid);
//   let appById = await algodClientGet.getApplicationByID(parseInt(configfiletau.applicationid)).do();
 
//        let globaltimenew;
//        let gloablstakenew;
//        let totalsulnew;
//        let totalslatelocknew;
//        let stakedbalancenew;
//        let rewardbalancenew;
//        let usertimenew;
//        for(let i=0;i<11;i++){
          
//             if(appById['params']['global-state'][i]['key']==="R1Q="){
//             globaltimenew = appById['params']['global-state'][i]['value']['uint'];
//             setGlobalTime(appById['params']['global-state'][i]['value']['uint']);
//             console.log("globaltime",globaltime);
//             }
 
//             if(appById['params']['global-state'][i]['key']==="R1NT"){
//               gloablstakenew=appById['params']['global-state'][i]['value']['uint'];
//               setGlobalStake(appById['params']['global-state'][i]['value']['uint']);
//               }
//             if(appById['params']['global-state'][i]['key']==="VFNVTA=="){
//                 totalsulnew =appById['params']['global-state'][i]['value']['uint'];
                
//                 settotalsul(appById['params']['global-state'][i]['value']['uint']);
//                 }
//             if(appById['params']['global-state'][i]['key']==="VFNM"){
//                   totalslatelocknew=appById['params']['global-state'][i]['value']['uint'];
//                   settotalslatelock(appById['params']['global-state'][i]['value']['uint']);
//                   }   
//            }
        

//   console.log("accinfolocal",accountInfoResponse);
//   if( accountInfoResponse['apps-local-state'].length === null|| accountInfoResponse['apps-local-state'].length ===undefined||accountInfoResponse['apps-local-state'].length===""){
//     // alert("check");
//  }
// else{


//   console.log("User",accountInfoResponse['apps-local-state'].length);
//   for (let i = 0; i < accountInfoResponse['apps-local-state'].length; i++) { 
//       if (accountInfoResponse['apps-local-state'][i].id == parseInt(configfiletau.applicationid)) {
//           console.log("User's local state:",accountInfoResponse['apps-local-state'][i].id);
//           let acccheck= accountInfoResponse['apps-local-state'][i][`key-value`]; 
//           console.log("Usercheck",acccheck);
//           console.log("User",accountInfoResponse['apps-local-state'][i][`key-value`]);
        

//           if(accountInfoResponse['apps-local-state'][i][`key-value`]=== null|| accountInfoResponse['apps-local-state'][i][`key-value`] === undefined||accountInfoResponse['apps-local-state'][i][`key-value`]===""){
//             // alert("check");
//          }
//         else{
// for (let n = 0; n < accountInfoResponse['apps-local-state'][i][`key-value`].length; n++) {
//               console.log(accountInfoResponse['apps-local-state'][i][`key-value`][n]);
//               //setStakedBalance(accountInfoResponse['apps-local-state'][i][`key-value`][n]);
              
//               let rewardkey =accountInfoResponse['apps-local-state'][i]['key-value'][n];
//              if(rewardkey['key'] === "VUE="){
//                stakedbalancenew=accountInfoResponse['apps-local-state'][i]['key-value'][n]['value']['uint'];
//                setStakedBalancetau(accountInfoResponse['apps-local-state'][i]['key-value'][n]['value']['uint']);
//              }
//             if(rewardkey['key'] === "VVNT"){
//               rewardbalancenew=accountInfoResponse['apps-local-state'][i]['key-value'][n]['value']['uint'];
//               console.log("rewardcheck",accountInfoResponse['apps-local-state'][i]['key-value'][n]['value']['uint']);
//               setrewardBalance(accountInfoResponse['apps-local-state'][i]['key-value'][n]['value']['uint']);
//               console.log("rewardcheck",accountInfoResponse['apps-local-state'][i]['key-value'][n]['value']['uint']);
//             }
//             if(rewardkey['key'] === "VVQ="){
//               usertimenew = accountInfoResponse['apps-local-state'][i]['key-value'][n]['value']['uint'];
//               console.log("usertimecheck",usertimenew);
//               setusertimecheck(usertimenew);
//               console.log("usertimeset",usertimeset);
    
//               setrewardupdatetime(parseInt(usertimenew)+604800);
//               console.log("rewardupdatetime",rewardupdatetime);
//               console.log("usertime",accountInfoResponse['apps-local-state'][i]['key-value'][n]['value']['uint']);
//               setusertime(accountInfoResponse['apps-local-state'][i]['key-value'][n]['value']['uint']);
//               console.log("usertime",accountInfoResponse['apps-local-state'][i]['key-value'][n]['value']['uint']);
//             }
              
//           }

//         }

          
//       }
//   }
// }
//   for(let i = 0; i < accountInfoResponse['assets'].length; i++){
//     console.log("accountsasset", accountInfoResponse['assets']);
//      if (accountInfoResponse['assets'][i]['asset-id'] == parseInt(configfiletau.assetid)) {
//       setBalancetau(accountInfoResponse['assets'][i]['amount']);
//       console.log("accountassetid", configfiletau.assetid);
//       console.log("accountsassetnew", accountInfoResponse['assets'][i]['amount']);

//      }
//   }


  
//   console.log("sub",globaltimenew);
//   console.log("sub_div",usertimenew);
//   console.log("mul1",stakedbalancenew);
//   console.log("add_div",rewardbalancenew);
//   console.log("mul2",gloablstakenew);
//   //console.log("rewardCal",rewardCal);
//   let sub = parseInt(globaltimenew) - parseInt(usertimenew);
//     console.log("checksub",sub);
//   let sub_div = parseFloat(sub) / 86400;
  
//   let mul1 = parseFloat(sub_div) * parseFloat(stakedbalancenew);
  
//   let add = parseFloat(rewardbalancenew) + parseFloat(mul1);
  
//   let add_div =  parseFloat(add) / parseFloat(gloablstakenew);
  
//   let mul2 = parseFloat(add_div) * parseFloat(totalsulnew);
  
//   let rewardCal1 = parseFloat(mul2) / 1000000;
//   let rewardCal = rewardCal1.toFixed(6);
//   console.log("rewardamountcalculation",parseFloat(rewardCal));
//   //let rewardcalculation =parseFloat((parseFloat(rewardamountbalance)+(parseFloat((globaltime)-parseFloat(usertime))/60)*parseFloat(stakedbalance)/parseFloat(globalstake))*parseFloat(totalsul)/parseFloat(1000000));
//   setrewardcalculation(parseFloat(rewardCal));
//   (rewardCal === 'NaN' || rewardCal === "" || rewardCal === null || rewardCal === '' || rewardCal === undefined) ? setRewardBool(false) : setRewardBool(true);

  
    
//     };
    

//     fetchPosts();
//   }, [rewardcalc]);
  

    // const waitForConfirmation = async function (client, txId) {
    //     let status = (await client.status().do());
    //     let lastRound = status["last-round"];
    //       while (true) {
    //         const pendingInfo = await client.pendingTransactionInformation(txId).do();
    //         if (pendingInfo["confirmed-round"] !== null && pendingInfo["confirmed-round"] > 0) {
    //           //Got the completed Transaction
    //           console.log("Transaction " + txId + " confirmed in round " + pendingInfo["confirmed-round"]);
    //           function sleep(ms) {
    //         return new Promise(resolve => setTimeout(resolve, ms));
    //      } 
    //      let id = "https://testnet.algoexplorer.io/tx/" + txId;
    //         toast.success(toastDiv(id));
    //         await sleep(10000);
    //           break;
    //         }
    //         lastRound++;
    //         await client.statusAfterBlock(lastRound).do();
    //       }
    //     };
        
    //     function sleep(ms) {
    //         return new Promise(resolve => setTimeout(resolve, ms));
    //      } 
    //     const toastDiv = (txId) =>
    //     (
    //         <div>
    //            <p> Transaction is Successful &nbsp;<a style={{color:'blue'}} href={txId} target="_blank" rel="noreferrer">View in algoexplorer <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    //     <path d="M11.7176 3.97604L1.69366 14L0.046875 12.3532L10.0697 2.32926H1.23596V0H14.0469V12.8109H11.7176V3.97604Z" fill="blue"/>
    //     </svg></a></p> 
    //         </div>
    //     );
        
 //appoptin
 //const configfile =localStorage.getItem("ASSETFARM") === "elem"?require("../stakingconfig.json"):localStorage.getItem("ASSETFARM") === "elemalgo"?  require("../stakingelemalgoconfig.json"):localStorage.getItem("ASSETFARM") === "einralgo"?  require("../stakingFarmEinrAlgo.json"):require("../stakingFarmTauconfig.json");
//  const optin=async(name)=>{
//     try{   
//         let  configfile="";
        
//         if(name==="ELEM"){
//             alert("checking1");
//             console.log("config",configfileelem.applicationid);
//             configfile =configfileelem.applicationid;
//         }
//         else{
//             configfile=configfiletau.applicationid;
//         }
//         console.log("configfile",configfile);
       
//       if(parseFloat(minAlgo) < 101000 + 628000)
//                       {
//                           toast.error("Your Algo balance is low. Please get more Algos from dispenser.")
//                       }
//                       else
//                       {    
     
//     const algosdk = require('algosdk');
//    // const algodclient = new algosdk.Algodv2('', 'https://api.testnet.algoexplorer.io/', '');
//     const myAlgoConnect = new MyAlgoConnect();
    
//     try {
    
//     const params = await algodClient.getTransactionParams().do();
//     let transoptin2 = algosdk.makeApplicationOptInTxnFromObject({
//         from: localStorage.getItem("walletAddress"),
//         appIndex:parseInt(configfile),
//         note: undefined,
//         suggestedParams: params
//         });
  
//    // const signedTxn1 = await myAlgoConnect.signTransaction(transoptin1.toByte());
//     const signedTxn2 = await myAlgoConnect.signTransaction(transoptin2.toByte());
//     toast.info("Transaction in Progress");
//     const response2 = await algodClient.sendRawTransaction(signedTxn2.blob).do();
//     console.log("optresponse",response2);
//     //toast.success(`App Optin Successful ${response2.txId}`);
//     await waitForConfirmation(algodClient, response2.txId);
//      window.location.reload();
    
//     }
//     catch (err) {
//       console.error(err);
//       toast.error(`App Optin Failed due to ${err}`);
//       //storedb(assetID,responsetxId,addresseswall);
//     }
//   }
// }
//   catch (err) {
//       console.error(err);
//       toast.error(`App Optin Failed due to ${err}`);
//   }
//   }
 
//   /**stake */
//   const stake = async(name,id) => {
//    console.log("stakevaul1",id);
    
//     alert("stake2");
//     // console.log("stakevaul1",stakevalue);
//     // console.log("balancevalue1",balance);
//     let  configfile="";
//     let balance=""  ; 
//         if(name==="ELEM"){
//             balance=balanceelem;
//             alert("checking1");
//             console.log("config",configfileelem);
//             configfile =configfileelem;
//         }
//         else{
//             configfile=configfiletau;
//             balance=balancetau;
//         }
        
//   console.log("balancecheck",balance);
//     if(stakevalue===0||stakevalue==="0"||stakevalue===null||stakevalue===""){
//      alert("stake3")
//         toast.error("Please enter an amount greater than 0");
//     }
//     else if(parseFloat(stakevalue)>parseFloat(balance/1000000)){
//         alert("stake4")
//       toast.error("You are trying to stake more than your Asset balance");
//     }

    
//     else{

    
//   if(parseFloat(minAlgo) < 3000)
//                         {
//                             toast.error("Your Algo balance is low. Please get more Algos from dispenser.")
//                         }
//                         else
//                         {
//     try{
        
//     const algosdk = require('algosdk');
//     //const algodClient = new algosdk.Algodv2('', 'https://api.testnet.algoexplorer.io', '');
   
//    //  var amt = document.getElementById("tid1").value; 
//      var amt=stakevalue;
//      let stakeamount = (amt) * 1000000;
//      global.TextEncoder = require("util").TextEncoder; 
   
//      setaccount(localStorage.getItem("walletAddress"));
//      let sender = localStorage.getItem("walletAddress");
   
     
//      // helper function to await transaction confirmation
//      // Function used to wait for a tx confirmation
//      const waitForConfirmation = async function (algodclient, txId) {
//          let status = (await algodclient.status().do());
//          let lastRound = status["last-round"];
//            while (true) {
//              const pendingInfo = await algodclient.pendingTransactionInformation(txId).do();
//              if (pendingInfo["confirmed-round"] !== null && pendingInfo["confirmed-round"] > 0) {
//               let id = "https://testnet.algoexplorer.io/tx/" + txId;
//           toast.success(toastDiv(id));
//           await sleep(10000);
//                //window.location.reload();
//                //console.log("Transaction " + txId + " confirmed in round " + pendingInfo["confirmed-round"]);
//                break;
//              }
//              lastRound++;
//              await algodclient.statusAfterBlock(lastRound).do();
//            }
//          };
         
    
//      try {
//     //   const addresses = await myAlgoConnect.connect();
//        // define sender
       
//        let sender = localStorage.getItem("walletAddress");
//        //let client = new algosdk.Algodv2(algodToken, algodServer, algodPort);
//      // get node suggested parameters
//        let params = await algodClient.getTransactionParams().do();
//        // comment out the next two lines to use suggested fee
//        params.fee = 1000;
//        params.flatFee = true;
     
//        let appArgs1= [];
       
//        appArgs1.push(new Uint8Array(Buffer.from("CHECK")));
//        //console.log("(line:516) appArgs = ",appArgs1)
     
//        // create unsigned transaction
//        let transaction1 = algosdk.makeApplicationNoOpTxnFromObject({
//         from: sender, 
//        suggestedParams: params, 
//        appIndex: parseInt(configfile.applicationid), 
//         appArgs: appArgs1});
//        //  let txId1 = transaction1.txID().toString();
     
//        let appArgs2= [];
       
//        appArgs2.push(new Uint8Array(Buffer.from("S")));
//        //console.log("(line:516) appArgs = ",appArgs2)
     
//        // create unsigned transaction
//        let transaction2 = algosdk.makeApplicationNoOpTxnFromObject({
//         from: sender, 
//        suggestedParams: params, 
//        appIndex: parseInt(configfile.applicationid), 
//         appArgs: appArgs2});
//        // // Sign the transaction
//        // let signedTxn = txn.signTxn(account.sk);
//        // console.log("Signed transaction with txID: %s", txId);
     
//      let transaction3 =algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
//        from: sender,
//        to: configfile.escrowaddress,
//        amount:parseInt(stakeamount),
//        note: undefined,
//        assetIndex: parseInt(configfile.assetid),
//        suggestedParams: params});
   
  
//        const groupID = algosdk.computeGroupID([ transaction1, transaction2, transaction3]);
//        const txs = [ transaction1, transaction2, transaction3];
//        txs[0].group = groupID;
//        txs[1].group = groupID;
//        txs[2].group = groupID;
     
     
     
//     const signedTx1 = await myAlgoConnect.signTransaction([txs[0].toByte(), txs[1].toByte(), txs[2].toByte()]);
//     // const signedTx2 = await myAlgoConnect.signTransaction(txs[1].toByte());
//     // const signedTx3 = await myAlgoConnect.signTransaction(txs[2].toByte());
//     toast.info("Transaction in Progress");
//     const response = await algodClient.sendRawTransaction([ signedTx1[0].blob, signedTx1[1].blob, signedTx1[2].blob]).do();
//    console.log("TxID", JSON.stringify(response, null, 1));   
//    toast.success(`Staked Successfully! ${response.txId}`);   
//    await waitForConfirmation(algodClient, response.txId);
//     // localStorage.setItem("Staked","stakedbalance");
//     window.location.reload();
// // this.forceUpdate();
//    //alert("Staked Successfully");
// //    datasethere("Staked Successfully")
// //    setIsOpennewpro(false)
// //    setIsOpennew(true)
//      }
//      catch (err) {
//          console.error(err);
//          toast.error(`Staking Failed due to ${err}`);
//      }
//     }
    
//     catch (err) {
//         console.error(err);
//         //setIsOpennewpro(false)
//         toast.error(`Transaction Failed due to ${err}`);
//     }
//   }
//   } 
// }


  // useEffect(async() => {
  //   await minBal();
  // }, [minAlgo]);
  
  // const minBal = async () =>
  // {
  //   let min = await algodClientGet.accountInformation(localStorage.getItem("walletAddress")).do();
  //   // console.log("minBalanceApi", min['min-balance']);
  //   setMinAlgo(min['amount'] - min['min-balance']);
  //   console.log("minBalance", minAlgo);
  // } 

  // const handleChange = (e, i) => {
  //   const { value, name } = e.target;
    
  //   console.log("newState",value);
  //   setStakevalue(value);
  // };
    return (
        <Layout>
            <><ToastContainer position='bottom-right' draggable = {false} transition={Zoom} autoClose={4000} closeOnClick = {false}/></>
            <Container>
            {CategoryOptions.map((x, index) => (              
            <Stakecard x={x}/>
           ))} </Container>
        </Layout>
    );
};

export default Staking;