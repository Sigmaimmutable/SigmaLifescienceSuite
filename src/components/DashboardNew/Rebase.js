import React, {useState, useEffect} from 'react';
import { Accordion, Button, Col, Container, FormControl, InputGroup, OverlayTrigger, Row, Tab, Tabs, Tooltip } from 'react-bootstrap';
import Layout from './LayoutT';

import ButtonLoad from 'react-bootstrap-button-loader';
import { Link } from 'react-router-dom';
import USDC from '../../assets/images/usdc.jpg';
import MyAlgoConnect from '@randlabs/myalgo-connect';
import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';
import Logo from '../../assets/images/modal-logo.png';
import Arrow from '../../assets/images/arrow-tr.svg';
import ModalSquareLogo from '../../assets/images/modal-square-logo.png';
import bondDetails from "../Dashboard/stablecoin.json";
import node from "./nodeapi.json"
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import { formatJsonRpcRequest } from "@json-rpc-tools/utils";
import { updatealgobalance } from "../formula";
import rebaseDetails from "../Dashboard/stablecoin.json";

const algosdk = require('algosdk');
const myAlgoConnect = new MyAlgoConnect();

const bridge = "https://bridge.walletconnect.org";


const Rebase = () => {

    useEffect(() => {
        document.title = "ELEMENT | Rebase"
    }, [])

    const [show, setShow] = React.useState(true);
    const [showStake, setShowStake] = React.useState(false);

    const handleCloseStake = () => setShowStake(false);
    const handleShowStake = () => setShowStake(true);

    const[rewardBool,setRewardBool]=useState(false);
    const [showUnstake, setShowUnstake] = React.useState(false);
    const[time,settime]= useState("");
    const handleCloseUnstake = () => setShowUnstake(false);
    const handleShowUnstake = () => setShowUnstake(true);
    const [algoPrice, setAlgoPrice] = useState([]);
    const [rebaseTime, setRebaseTime] = useState("");
    const handle = () => setShow(!show);
    const[day,setTime4]= useState("");
    const[hour,setTim1]= useState("");
    const[min,setTim2]= useState("");
    const[sec,setTim3]= useState("");
    const[lock,setlock]= useState(""); 
    const [bondBalance, setBondBalance] = useState("");
    const [stake1Balance, setStake1Balance] = useState("");
    const [stake2Balance, setStake2Balance] = useState("");
    const [lpStake1Balance, setLpStake1Balance] = useState("");

    function sleep(delay) {
        var start = new Date().getTime();
        while (new Date().getTime() < start + delay);
    }


    // const [show, setShow] = React.useState(false);

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

let appID_global = rebaseDetails.rebaseAppID;
let elementID_global = rebaseDetails.elemID;
let elemID = rebaseDetails.elemID;
let usdcID = rebaseDetails.usdcID;

const algodClientGet = new algosdk.Algodv2('', node['algodclient'], '');

    const algodClient = new algosdk.Algodv2('', node['algodclient'], '');
    const indexClient = new algosdk.Indexer('', node['indexerclient'], '');

    useEffect(async() => {
        await Balance()
    }, [bondBalance]);        
    
    const Balance = async () =>{
    let bond = await indexClient.lookupAccountByID(bondDetails.b_escrow).do();
    let stake1 = await indexClient.lookupAccountByID(bondDetails.stake1).do();
    let stake2 = await indexClient.lookupAccountByID(bondDetails.stake2).do();
    let lpStake1 = await indexClient.lookupAccountByID(bondDetails.lpstake1).do();
    // // console.log(balance['account']['assets'][0]['amount']);
    let assetCount = bond['account']['assets']['length'];
    let assetCountS1 = stake1['account']['assets']['length'];
    let assetCountS2 = stake2['account']['assets']['length'];
    let assetCountLp1 = lpStake1['account']['assets']['length'];
    // // console.log(l);
    for(let i = 0; i < assetCount; i++)
    {
        if(bond['account']['assets'][i]['asset-id'] === elemID)
        {
            setBondBalance(parseFloat(bond['account']['assets'][i]['amount'])/1000000);
            break;
        }
    }
    for(let i = 0; i < assetCountS1; i++)
    {
        if(bond['account']['assets'][i]['asset-id'] === elemID)
        {
            setStake1Balance(parseFloat(stake1['account']['assets'][i]['amount'])/1000000);
            break;
        }
    }
    for(let i = 0; i < assetCountS2; i++)
    {
        if(bond['account']['assets'][i]['asset-id'] === elemID)
        {
            setStake2Balance(parseFloat(stake2['account']['assets'][i]['amount'])/1000000);
            break;
        }
    }
    for(let i = 0; i < assetCountLp1; i++)
    {
        if(bond['account']['assets'][i]['asset-id'] === elemID)
        {
            setLpStake1Balance(parseFloat(lpStake1['account']['assets'][i]['amount'])/1000000);
            break;
        }
    } 
    }    

    const fetch = async () => {
        await rebaseGlobalState();
      
        }
      
      const rebaseGlobalState = async () => {
      //     let accountCheckInfo = algodClient.accountInformation(localStorage.getItem("walletAddress")).do();
      //     let appCount = accountCheckInfo['apps-local-state']['length'];
      //     for(let j = 0; j < appCount; j++)
      // {
      //     if(accountCheckInfo['apps-local-state'][j]['id'] != 77396031 && accountCheckInfo['apps-local-state'][j]['id'] != appID_global && accountCheckInfo['apps-local-state'][j]['id'] != 71951577 && accountCheckInfo['apps-local-state'][j]['id'] != 71326217)
      //     {
      //         handleShow();
      //         break;
      //     }
      // }
      
        let appById = await algodClientGet.getApplicationByID(parseInt(rebaseDetails.rebaseAppID)).do();
        let appArgsRet = [];
        appArgsRet.push(JSON.stringify(appById['params']['global-state'][0]['key']));
        appArgsRet.push(JSON.stringify(appById['params']['global-state'][1]['key']));
        appArgsRet.push(JSON.stringify(appById['params']['global-state'][2]['key']));
        appArgsRet.push(JSON.stringify(appById['params']['global-state'][3]['key']));
        appArgsRet.push(JSON.stringify(appById['params']['global-state'][4]['key']));
        appArgsRet.push(JSON.stringify(appById['params']['global-state'][5]['key']));
        appArgsRet.push(JSON.stringify(appById['params']['global-state'][6]['key']));
        appArgsRet.push(JSON.stringify(appById['params']['global-state'][7]['key']));
        appArgsRet.push(JSON.stringify(appById['params']['global-state'][8]['key']));
        console.log("array", appArgsRet);
      
        for (let i = 0; i <= 8; i++) { 
      
                        // if(appArgsRet[i] == '"Q3JlYXRvcg=="'){
                        //     let creatorAddress_c =  JSON.stringify(await appById['params']['global-state'][i]['value'][`bytes`]);
                        //     // console.log("creator address", creatorAddress_c)
                        //     setCreator(JSON.stringify(await appById['params']['global-state'][i]['value'][`bytes`]));
                        // }
                        if(appArgsRet[i] == '"UmViYXNlVGltZQ=="'){
                            let endDate_c = JSON.stringify(await appById['params']['global-state'][i]['value'][`uint`]);
                            console.log(endDate_c);
                            setRebaseTime(JSON.stringify(await appById['params']['global-state'][i]['value'][`uint`]));
                        }
                        else if(appArgsRet[i] == '"UmViYXNlQ291bnQ="'){
                            let closeDate_c = JSON.stringify(await appById['params']['global-state'][i]['value'][`uint`]);
                            localStorage.setItem("rebaseCountStake",JSON.stringify(await appById['params']['global-state'][i]['value'][`uint`]));
                        }
                        // else if(appArgsRet[i] == '"R29hbA=="'){
                        //     let goalAmount_c = JSON.stringify(await appById['params']['global-state'][i]['value'][`uint`]);
                        //     setgoal(goalAmount_c);
                        // }
                        // else if(appArgsRet[i] == '"UmVjZWl2ZXI="'){
                        //     let recv_c = JSON.stringify(await appById['params']['global-state'][i]['value'][`bytes`]);
                        //     setrec(JSON.stringify(await appById['params']['global-state'][i]['value'][`bytes`]));
                        // }
                        // else if(appArgsRet[i] == '"U3RhcnREYXRl"'){
                        //     let startDate_c = JSON.stringify(await appById['params']['global-state'][i]['value'][`uint`]);
                        //     setstartdt(JSON.stringify(await appById['params']['global-state'][i]['value'][`uint`]));
                        // }
                        // else if(appArgsRet[i] == '"VG90YWw="'){
                        //     let total_c = JSON.stringify(await appById['params']['global-state'][i]['value'][`uint`]);
                        //     settotal(JSON.stringify(await appById['params']['global-state'][i]['value'][`uint`]));
                        // }
                        // else if(appArgsRet[i] == '"RXNjcm93"'){
                        //     let escrow_c = JSON.stringify(await appById['params']['global-state'][i]['value'][`bytes`]);
                        //     setescrow(JSON.stringify(await appById['params']['global-state'][i]['value'][`bytes`]));
                        // }
      }
      }
      
      useEffect(async() =>{await fetch()},[rebaseTime])

const waitForConfirmation = async function (client, txId) {
    let status = (await client.status().do());
    let lastRound = status["last-round"];
      while (true) {
        const pendingInfo = await client.pendingTransactionInformation(txId).do();
        if (pendingInfo["confirmed-round"] !== null && pendingInfo["confirmed-round"] > 0) {
          //Got the completed Transaction
        //   // console.log("Transaction " + txId + " confirmed in round " + pendingInfo["confirmed-round"]);
        toast.success(`Transaction ${txId} is successful and confirmed in round ${pendingInfo["confirmed-round"]}`);
        // toast.success(toastDiv(id));
        // await sleep(5000);
        // reload();  
        break;
        }
        lastRound++;
        await client.statusAfterBlock(lastRound).do();
      }
    };  

    useEffect(async() => {
        await first()
    }, [day, hour, min, sec, lock]);
  
      const first = async () => {
        let rebaseT = parseInt(rebaseTime);
        var us= rebaseT + 28800 + 60;
        var ff=new Date(us);
    // setdate(ff.toDateString());
    var hours = ff.getHours();
      var minutes = ff.getMinutes();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      settime( hours + ':' + minutes + ' ' + ampm);
    //settime(lock);
    var countDowndate   =us * 1000;
    //console.log(countDowndate);
    // var countDownDate = new Date().getTime() + (lock * 1000) ;
    //alert(time);
        var x = setInterval(function() {
           var now = new Date().getTime();
          var distance = countDowndate - now ;
        //   console.log("-------------------now", distance);
         // console.log(now);
          // Time calculations for days, hours, minutes and seconds
         var days = Math.floor(distance / (1000 * 60 * 60 * 24));
          var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
        //   console.log("date e", day);
        //   console.log("hour e", hour);
        //   console.log("min e", minutes);
        //   console.log("sec e", seconds);
    
          // Output the result in an element with id="demo"
         // document.getElementById("demo").innerHTML = hours + "h "
         // + minutes + "m " + seconds + "s ";
        setTime4(days);
        setTim1(hours);
        setTim2(minutes);
        setTim3(seconds);
    
    
        
        
        
        
          // If the count down is over, write some text 
          if (distance < 0) {
                clearInterval(x);
                setlock(false);
    
               // console.log('CountDown Finished');
            }
            else{
             setlock(true);
            }
    
        
          
        }, 1000);
       
    
    }
  
  
    const burn = async () => {
   
      let index = parseInt(appID_global);
      console.log("appId", index);      
  
      //reserve start
    
      let reserveData = `#pragma version 5
  
      global GroupSize
      int 2
      >=
      global GroupSize
      int 5
      <=
      &&
      bz failed
      
      gtxn 0 TypeEnum
      int 6
      ==
      
      gtxn 0 ApplicationID
      int 71117404
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
      int 1
      return
      
      failed:
      int 0
      return`;
      
      let reserveResults = await algodClient.compile(reserveData).do();
      console.log("Hash = " + reserveResults.hash);
      console.log("Result = " + reserveResults.result);
      // let program = new Uint8Array(Buffer.from(<"base64-encoded-program">, "base64"));
      let reserveProgram = new Uint8Array(Buffer.from(reserveResults.result, "base64"));
      let resArg = [];
      resArg.push(new Uint8Array (Buffer.from("burn")));
      let lsigReserve = new algosdk.LogicSigAccount(reserveProgram);
      console.log("Escrow =", lsigReserve.address());
      
      //reserve end
  
      try {
        // const accounts = await myAlgoWallet.connect();
        // const addresses = accounts.map(account => account.address);
        const params = await algodClient.getTransactionParams().do();
        let reserve = lsigReserve.address();
        
        let appArg = [];
        appArg.push(new Uint8Array (Buffer.from("burn")));
         const transaction1 = algosdk.makeApplicationNoOpTxnFromObject({
             from: localStorage.getItem("walletAddress"), 
             appIndex: index,
             appArgs: appArg,
             suggestedParams: params
           });
  
          const transaction2 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
            from:localStorage.getItem("walletAddress"),
            to: reserve,
            assetIndex: parseInt(elementID_global),
            amount: 1000000 * 1000000,
            suggestedParams: params
          });
  
        const groupID = algosdk.computeGroupID([ transaction1, transaction2]);
        const txs = [ transaction1, transaction2];
        txs[0].group = groupID;
        txs[1].group = groupID;
        
        const signedTx1 = await myAlgoConnect.signTransaction([txs[0].toByte(), txs[1].toByte()]);
        // const signedTx2 = algosdk.signLogicSigTransaction(txs[1], smartSiglsig);
  console.log("before send raw");
  const response = await algodClient.sendRawTransaction([signedTx1[0].blob, signedTx1[1].blob]).do();
     
  console.log("TxID", JSON.stringify(response, null, 1));
  // setTxId(response.txId);
  // setShow(true);
  await waitForConfirmation(algodClient, response.txId);
  //toast.success("Rebase completed and burn completed");
  } catch (err) {
    toast.error(`Error: ${err}`);
    console.error(err);
  }
    };
  
    const mint = async () => {
     
      let index = appID_global;
      console.log("appId inside", index);
  
      //reserve start
    
      // let program = new Uint8Array(Buffer.from(<"base64-encoded-program">, "base64"));
      let reserveProgram = new Uint8Array(Buffer.from(rebaseDetails.rebaseReserve, "base64"));
      // let reserveProgram = new Uint8Array(Buffer.from(reserveResults.result, "base64"));
  
      let lsigReserve = new algosdk.LogicSigAccount(reserveProgram);
      console.log("Escrow =", lsigReserve.address());
      
    //   console.log("bond balance", bondBalance);
    //   console.log("stake1 balance", stake1Balance);
    //   console.log("stake2 balance", stake2Balance);
    //   console.log("lpStake1 balance", lpStake1Balance);
      

      //escrow end
      if(lock === true)
      {
          toast.error("The rebase is locked for 8 hours. Please check the timer.");
      }
      else
      {
          try {
            // const accounts = await myAlgoWallet.connect();
            // const addresses = accounts.map(account => account.address);
            const params = await algodClient.getTransactionParams().do();
  
            let reserve = lsigReserve.address();
            
            let appArg = [];
            appArg.push(new Uint8Array (Buffer.from("mint")));
             const transaction1 = algosdk.makeApplicationNoOpTxnFromObject({
                 from: localStorage.getItem("walletAddress"), 
                 appIndex: index,
                 appArgs: appArg,
                 suggestedParams: params
               });
  
               let bondAmount;
               if(parseFloat(parseFloat(10250000) - parseFloat(bondBalance)) < 0)
               {
                   bondAmount = 0;
               }
               else
               {
                   bondAmount = parseFloat(parseFloat(10250000) - parseFloat(bondBalance));
               }
               console.log("bond", bondAmount);
              const transaction2 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                from:reserve,
                to: rebaseDetails.b_escrow, //bond
                assetIndex: parseInt(elementID_global),
                amount: parseInt((parseFloat(bondAmount) * 1000000)),
                suggestedParams: params
              });

              let stake1Amount;
              if(parseFloat(parseFloat(1000000) - parseFloat(stake1Balance)) < 0)
              {
                  stake1Amount = 0;
              }
              else
              {
                  stake1Amount = parseFloat(parseFloat(1000000) - parseFloat(stake1Balance));
              }
              console.log("stake1", stake1Amount);
              const transaction3 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                from:reserve,
                to: rebaseDetails.stake1, //stake1
                assetIndex: parseInt(elementID_global),
                amount: parseInt((parseFloat(stake1Amount) * 1000000)),
                suggestedParams: params
              });

              let stake2Amount;
              if(parseFloat(parseFloat(1000000) - parseFloat(stake2Balance)) < 0)
              {
                  stake2Amount = 0;
              }
              else
              {
                  stake2Amount = parseFloat(parseFloat(1000000) - parseFloat(stake2Balance));
              }
              console.log("stake2", stake2Amount);
              const transaction4 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                from:reserve,
                to: rebaseDetails.stake2, //stake2
                assetIndex: parseInt(elementID_global),
                amount: parseInt((parseFloat(stake2Amount) * 1000000)),
                suggestedParams: params
              });

              let lpStake1Amount;
              if(parseFloat(parseFloat(1000000) - parseFloat(lpStake1Balance)) < 0)
              {
                  lpStake1Amount = 0;
              }
              else
              {
                  lpStake1Amount = parseFloat(parseFloat(1000000) - parseFloat(lpStake1Balance));
              }
              console.log("lpStake1", lpStake1Amount);
              const transaction5 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                from:reserve,
                to: rebaseDetails.lpstake1, //lpStake1
                assetIndex: parseInt(elementID_global),
                amount: parseInt((parseFloat(lpStake1Amount) * 1000000)),
                suggestedParams: params
              });
  
            const groupID = algosdk.computeGroupID([ transaction1, transaction2, transaction3, transaction4, transaction5]);
            const txs = [ transaction1, transaction2, transaction3, transaction4, transaction5];
            txs[0].group = groupID;
            txs[1].group = groupID;
            txs[2].group = groupID;
            txs[3].group = groupID;
            txs[4].group = groupID;
            
            const signedTx1 = await myAlgoConnect.signTransaction(txs[0].toByte());
            const signedTx2 = algosdk.signLogicSigTransaction(txs[1], lsigReserve);
            const signedTx3 = algosdk.signLogicSigTransaction(txs[2], lsigReserve);
            const signedTx4 = algosdk.signLogicSigTransaction(txs[3], lsigReserve);
            const signedTx5 = algosdk.signLogicSigTransaction(txs[4], lsigReserve);
  
      const response = await algodClient.sendRawTransaction([ signedTx1.blob, signedTx2.blob, signedTx3.blob, signedTx4.blob, signedTx5.blob]).do();
         
    console.log("TxID", JSON.stringify(response, null, 1));
    // setTxId(response.txId);
    // setShow(true);
    await waitForConfirmation(algodClient, response.txId);
    await rebaseGlobalState();
    //toast.success(`Rebase completed and bond funded with TxId = ${response.txId}`);
      } catch (err) {
        toast.error(`Error: ${err}`);
        console.error(err);
      }
    }
    }
  
  const noRebase = async () =>
  {    
    let index = parseInt(appID_global);
    
    try {
    // const accounts = await myAlgoWallet.connect();
    // const addresses = accounts.map(account => account.address);
    const params = await algodClient.getTransactionParams().do();
    
    let appArg = [];
    appArg.push(new Uint8Array (Buffer.from("equal")));
     const transaction1 = algosdk.makeApplicationNoOpTxnFromObject({
         from: localStorage.getItem("walletAddress"), 
         appIndex: index,
         appArgs: appArg,
         suggestedParams: params
       });
  
    
    const signedTx1 = await myAlgoConnect.signTransaction(transaction1.toByte());
  const response = await algodClient.sendRawTransaction(signedTx1.blob).do();
  
  console.log("TxID", JSON.stringify(response, null, 1));
  // setTxId(response.txId);
  // setShow(true);
  await waitForConfirmation(algodClient, response.txId);
  toast.info("NO REBASE, COIN IS STABLE");
  } catch (err) {
  toast.error(`Error: ${err}`);
  console.error(err);
  }
  }
  
        const rebase = async () =>
        {
          await mint();
        }

    return (
        <Layout>
            <><ToastContainer position='bottom-right' draggable = {false} transition={Zoom} autoClose={4000} closeOnClick = {false}/></>

            <Container>
            {/* <div className="d-flex mb-24 align-items-center justify-content-center">
                    <div>
                        <h6 className='sub-heading mb-0'>
                            Treasury Balance 
                            <OverlayTrigger
                                key="right"
                                placement="right"
                                overlay={
                                    <Tooltip id={`tooltip-right`}>
                                        Total USD worth of ELEM available for bond.
                                    </Tooltip>
                                }
                                >
                                    <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                </OverlayTrigger>
                        </h6>
                        <h3 className='mb-0 text-187'>${0}</h3>
                    </div>
                    <div className='ms-sm-5 ms-4'>
                        <h6 className='sub-heading mb-0'>
                            ELEM Market Price
                            <OverlayTrigger
                                key="left"
                                placement="left"
                                overlay={
                                    <Tooltip id={`tooltip-left`}>
                                        ELEM asset price.
                                    </Tooltip>
                                }
                                >
                                    <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                </OverlayTrigger>
                        </h6>
                        <h3 className='mb-0 text-187'>$3.00</h3>
                    </div>
                </div> */}

                <Accordion defaultActiveKey="">
                    <Accordion.Item className='mb-24' eventKey="1">
                        <Accordion.Header>
                            <div className="acc-title me-2 d-flex align-items-center">
                                {/* <img src={USDC} alt="logo" /> */}
                                {/* <img src={USDC} alt="logo" /> */}
                                <span className='ms-3'>Rebase</span>
                            </div>

                            {/* <div className="ms-auto flex-grow-1 pe-md-4 justify-content-between d-flex align-items-center">
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        Bond Price
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                        $0.0218
                                        <OverlayTrigger
                                            key="left"
                                            placement="left"
                                            overlay={
                                                <Tooltip id={`tooltip-left`}>
                                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                                </Tooltip>
                                            }
                                            >
                                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                            </OverlayTrigger>
                                    </h5>
                                </div>
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        ROI
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                        5.65%
                                        <OverlayTrigger
                                            key="left"
                                            placement="left"
                                            overlay={
                                                <Tooltip id={`tooltip-left`}>
                                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                                </Tooltip>
                                            }
                                            >
                                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                            </OverlayTrigger>
                                    </h5>
                                </div>
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        Vesting Term
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                        5 days
                                        <OverlayTrigger
                                            key="left"
                                            placement="left"
                                            overlay={
                                                <Tooltip id={`tooltip-left`}>
                                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                                </Tooltip>
                                            }
                                            >
                                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                            </OverlayTrigger>
                                    </h5>
                                </div>
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        Purchased
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                        $571,564
                                    </h5>
                                </div>
                            </div> */}
                        </Accordion.Header>
                        <Accordion.Body>
                            {/* <div className="d-flex align-items-center float-sm-end mt-sm-1 mb-sm-0 mb-3 justify-content-center acc-h-links">
                                <a href="https://explorer.harmony.one/address/0xe443F63564216f60625520465F1324043fcC47b9" rel="noopener noreferrer" target="_blank">
                                    <svg className="blue-dark-theme-pink mb-1" width="16" height="16" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.8333 15.8333H4.16667V4.16667H10V2.5H4.16667C3.24167 2.5 2.5 3.25 2.5 4.16667V15.8333C2.5 16.75 3.24167 17.5 4.16667 17.5H15.8333C16.75 17.5 17.5 16.75 17.5 15.8333V10H15.8333V15.8333ZM11.6667 2.5V4.16667H14.6583L6.46667 12.3583L7.64167 13.5333L15.8333 5.34167V8.33333H17.5V2.5H11.6667Z"></path></svg>
                                    <span className='text-text-FF ms-2'>View Contract</span>
                                </a>

                                <h6 className='sub-heading ms-4 d-flex mb-0'>
                                    How it works 
                                    <OverlayTrigger
                                        key="left"
                                        placement="left"
                                        overlay={
                                            <Tooltip id={`tooltip-left`}>
                                                <strong className='text-purple'>1.</strong> Lorem, ipsum dolor sit amet consectetur adipisicing elit. <br /><br /><strong className='text-purple'>2.</strong> Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                            </Tooltip>
                                        }
                                        >
                                            <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                        </OverlayTrigger>
                                </h6>   
                            </div> */}
                            <Tabs defaultActiveKey="bond" className='dashboard-tabs' id="tab-example-1">
                                <Tab eventKey="bond" title="ELEM Rebase">
                                    <Row className='row-divider'>
                                        <Col md={6}>
                                            {/* <h6><span className='text-sm text-gray-d'>Your 1USDC Balance: </span>N/A</h6> */}
                                            <Row className='flex-nowrap mb-2 gx-3'>
                                                <Col>
                                                    {/* <InputGroup className='input-group-max'>
                                                        <FormControl
                                                            disabled={true}
                                                            placeholder="0.00"
                                                            aria-label="Recipient's username"
                                                            aria-describedby="basic-addon2"
                                                        />
                                                        <Button variant="outline-purple" disabled={true} className='btn-xs-d disabled'>Max</Button>
                                                    </InputGroup> */}
                                                </Col>
                                                <Col xs="auto">
                                                    {/* <Button disabled className='btn btn-blue'>
                                                        Enter an amount
                                                    </Button> */}
                                                </Col>
                                            </Row>
                                            {/* <div className="d-flex">
                                                <div>
                                                    <h6><span className='text-sm mb-1 d-block text-gray-d'>You Will Get</span> 0.00 GMI</h6>
                                                </div>
                                                <div className='ms-4'>
                                                    <h6><span className='text-sm mb-1 d-block text-gray-d'>Max You Can Buy</span> 0.00001378 GMI</h6>
                                                </div>
                                            </div> */}
                                        </Col>
                                        <Col md={6}>
                                            <h6><span className='text-sm text-gray-d'>Time until next Rebase: </span>{lock == true ? (<>{hour}h:{min}m:{sec}s</>):(<>{0}h:{0}m:{0}s</>)}</h6>
                                            <Row className='flex-nowrap align-items-center mb-2 gx-3'>
                                                <Col>
                                                    <Button className='btn w-100 btn-blue' onClick={rebase}>
                                                        Rebase
                                                    </Button>
                                                </Col>
                                                <Col>
                                                    {/* <Button disabled className='btn w-100 btn-blue'>
                                                        Claim and Autostake
                                                    </Button> */}
                                                </Col>
                                                <Col xs="auto">
                                                {/* <OverlayTrigger
                                                    key="left"
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip id={`tooltip-left`}>
                                                            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                                        </Tooltip>
                                                    }
                                                    >
                                                        <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                                    </OverlayTrigger> */}
                                                </Col>
                                            </Row>
                                            <div className="d-flex">
                                                <div>
                                                    {/* <h6><span className='text-sm mb-1 d-block text-gray-d'>Pending Rewards</span> N/A GMI</h6> */}
                                                </div>
                                                <div className='ms-4'>
                                                    {/* <h6><span className='text-sm mb-1 d-block text-gray-d'>Time until fully vested</span></h6> */}
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Tab>
                            </Tabs>
                        </Accordion.Body>
                    </Accordion.Item>
                    {/* <Accordion.Item className='mb-24' eventKey="3">
                        <Accordion.Header>
                            <div className="acc-title me-2 d-flex align-items-center">
                                <img src={USDC} alt="logo" />
                                <span className='ms-3'>1USDC</span>
                            </div>

                            <div className="ms-auto flex-grow-1 pe-md-4 justify-content-between d-flex align-items-center">
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        Bond Price
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                        $0.0218
                                        <OverlayTrigger
                                            key="left"
                                            placement="left"
                                            overlay={
                                                <Tooltip id={`tooltip-left`}>
                                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                                </Tooltip>
                                            }
                                            >
                                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                            </OverlayTrigger>
                                    </h5>
                                </div>
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        ROI
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                        5.65%
                                        <OverlayTrigger
                                            key="left"
                                            placement="left"
                                            overlay={
                                                <Tooltip id={`tooltip-left`}>
                                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                                </Tooltip>
                                            }
                                            >
                                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                            </OverlayTrigger>
                                    </h5>
                                </div>
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        Vesting Term
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                        5 days
                                        <OverlayTrigger
                                            key="left"
                                            placement="left"
                                            overlay={
                                                <Tooltip id={`tooltip-left`}>
                                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                                </Tooltip>
                                            }
                                            >
                                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                            </OverlayTrigger>
                                    </h5>
                                </div>
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        Purchased
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                        $571,564
                                    </h5>
                                </div>
                            </div>
                        </Accordion.Header>
                        <Accordion.Body>
                            <div className="d-flex align-items-center float-sm-end mt-sm-1 mb-sm-0 mb-3 justify-content-center acc-h-links">
                                <a href="https://explorer.harmony.one/address/0xe443F63564216f60625520465F1324043fcC47b9" rel="noopener noreferrer" target="_blank">
                                    <svg className="blue-dark-theme-pink mb-1" width="16" height="16" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.8333 15.8333H4.16667V4.16667H10V2.5H4.16667C3.24167 2.5 2.5 3.25 2.5 4.16667V15.8333C2.5 16.75 3.24167 17.5 4.16667 17.5H15.8333C16.75 17.5 17.5 16.75 17.5 15.8333V10H15.8333V15.8333ZM11.6667 2.5V4.16667H14.6583L6.46667 12.3583L7.64167 13.5333L15.8333 5.34167V8.33333H17.5V2.5H11.6667Z"></path></svg>
                                    <span className='text-text-FF ms-2'>View Contract</span>
                                </a>

                                <h6 className='sub-heading ms-4 d-flex mb-0'>
                                    How it works 
                                    <OverlayTrigger
                                        key="left"
                                        placement="left"
                                        overlay={
                                            <Tooltip id={`tooltip-left`}>
                                                <strong className='text-purple'>1.</strong> Lorem, ipsum dolor sit amet consectetur adipisicing elit. <br /><br /><strong className='text-purple'>2.</strong> Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                            </Tooltip>
                                        }
                                        >
                                            <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                        </OverlayTrigger>
                                </h6>   
                            </div>
                            <Tabs defaultActiveKey="bond" className='dashboard-tabs' id="tab-example-1">
                                <Tab eventKey="bond" title="Bond">
                                    <Row className='row-divider'>
                                        <Col md={6}>
                                            <h6><span className='text-sm text-gray-d'>Your 1USDC Balance: </span>N/A</h6>
                                            <Row className='flex-nowrap mb-2 gx-3'>
                                                <Col>
                                                    <InputGroup className='input-group-max'>
                                                        <FormControl
                                                            disabled={true}
                                                            placeholder="0.00"
                                                            aria-label="Recipient's username"
                                                            aria-describedby="basic-addon2"
                                                        />
                                                        <Button variant="outline-purple" disabled={true} className='btn-xs-d disabled'>Max</Button>
                                                    </InputGroup>
                                                </Col>
                                                <Col xs="auto">
                                                    <Button disabled className='btn btn-blue'>
                                                        Enter an amount
                                                    </Button>
                                                </Col>
                                            </Row>
                                            <div className="d-flex">
                                                <div>
                                                    <h6><span className='text-sm mb-1 d-block text-gray-d'>You Will Get</span> 0.00 GMI</h6>
                                                </div>
                                                <div className='ms-4'>
                                                    <h6><span className='text-sm mb-1 d-block text-gray-d'>Max You Can Buy</span> 0.00001378 GMI</h6>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <h6><span className='text-sm text-gray-d'>Claimable Rewards: </span>N/A GMI</h6>
                                            <Row className='flex-nowrap align-items-center mb-2 gx-3'>
                                                <Col>
                                                    <Button disabled className='btn w-100 btn-blue'>
                                                        Claim
                                                    </Button>
                                                </Col>
                                                <Col>
                                                    <Button disabled className='btn w-100 btn-blue'>
                                                        Claim and Autostake
                                                    </Button>
                                                </Col>
                                                <Col xs="auto">
                                                <OverlayTrigger
                                                    key="left"
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip id={`tooltip-left`}>
                                                            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                                        </Tooltip>
                                                    }
                                                    >
                                                        <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                                    </OverlayTrigger>
                                                </Col>
                                            </Row>
                                            <div className="d-flex">
                                                <div>
                                                    <h6><span className='text-sm mb-1 d-block text-gray-d'>Pending Rewards</span> N/A GMI</h6>
                                                </div>
                                                <div className='ms-4'>
                                                    <h6><span className='text-sm mb-1 d-block text-gray-d'>Time until fully vested</span></h6>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Tab>
                            </Tabs>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item className='mb-24' eventKey="4">
                        <Accordion.Header>
                            <div className="acc-title me-2 d-flex align-items-center">
                                <img src={USDC} alt="logo" />
                                <img src={USDC} alt="logo" />
                                <span className='ms-3'>GMI - 1USDC</span>
                            </div>

                            <div className="ms-auto flex-grow-1 pe-md-4 justify-content-between d-flex align-items-center">
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        Bond Price
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                        $0.0218
                                        <OverlayTrigger
                                            key="left"
                                            placement="left"
                                            overlay={
                                                <Tooltip id={`tooltip-left`}>
                                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                                </Tooltip>
                                            }
                                            >
                                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                            </OverlayTrigger>
                                    </h5>
                                </div>
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        ROI
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                        5.65%
                                        <OverlayTrigger
                                            key="left"
                                            placement="left"
                                            overlay={
                                                <Tooltip id={`tooltip-left`}>
                                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                                </Tooltip>
                                            }
                                            >
                                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                            </OverlayTrigger>
                                    </h5>
                                </div>
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        Vesting Term
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                        5 days
                                        <OverlayTrigger
                                            key="left"
                                            placement="left"
                                            overlay={
                                                <Tooltip id={`tooltip-left`}>
                                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                                </Tooltip>
                                            }
                                            >
                                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                            </OverlayTrigger>
                                    </h5>
                                </div>
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        Purchased
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                        $571,564
                                    </h5>
                                </div>
                            </div>
                        </Accordion.Header>
                        <Accordion.Body>
                            <div className="d-flex align-items-center float-sm-end mt-sm-1 mb-sm-0 mb-3 justify-content-center acc-h-links">
                                <a href="https://explorer.harmony.one/address/0xe443F63564216f60625520465F1324043fcC47b9" rel="noopener noreferrer" target="_blank">
                                    <svg className="blue-dark-theme-pink mb-1" width="16" height="16" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.8333 15.8333H4.16667V4.16667H10V2.5H4.16667C3.24167 2.5 2.5 3.25 2.5 4.16667V15.8333C2.5 16.75 3.24167 17.5 4.16667 17.5H15.8333C16.75 17.5 17.5 16.75 17.5 15.8333V10H15.8333V15.8333ZM11.6667 2.5V4.16667H14.6583L6.46667 12.3583L7.64167 13.5333L15.8333 5.34167V8.33333H17.5V2.5H11.6667Z"></path></svg>
                                    <span className='text-text-FF ms-2'>View Contract</span>
                                </a>

                                <h6 className='sub-heading ms-4 d-flex mb-0'>
                                    How it works 
                                    <OverlayTrigger
                                        key="left"
                                        placement="left"
                                        overlay={
                                            <Tooltip id={`tooltip-left`}>
                                                <strong className='text-purple'>1.</strong> Lorem, ipsum dolor sit amet consectetur adipisicing elit. <br /><br /><strong className='text-purple'>2.</strong> Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                            </Tooltip>
                                        }
                                        >
                                            <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                        </OverlayTrigger>
                                </h6>   
                            </div>
                            <Tabs defaultActiveKey="bond" className='dashboard-tabs' id="tab-example-1">
                                <Tab eventKey="bond" title="Bond">
                                    <Row className='row-divider'>
                                        <Col md={6}>
                                            <h6><span className='text-sm text-gray-d'>Your 1USDC Balance: </span>N/A</h6>
                                            <Row className='flex-nowrap mb-2 gx-3'>
                                                <Col>
                                                    <InputGroup className='input-group-max'>
                                                        <FormControl
                                                            disabled={true}
                                                            placeholder="0.00"
                                                            aria-label="Recipient's username"
                                                            aria-describedby="basic-addon2"
                                                        />
                                                        <Button variant="outline-purple" disabled={true} className='btn-xs-d disabled'>Max</Button>
                                                    </InputGroup>
                                                </Col>
                                                <Col xs="auto">
                                                    <Button disabled className='btn btn-blue'>
                                                        Enter an amount
                                                    </Button>
                                                </Col>
                                            </Row>
                                            <div className="d-flex">
                                                <div>
                                                    <h6><span className='text-sm mb-1 d-block text-gray-d'>You Will Get</span> 0.00 GMI</h6>
                                                </div>
                                                <div className='ms-4'>
                                                    <h6><span className='text-sm mb-1 d-block text-gray-d'>Max You Can Buy</span> 0.00001378 GMI</h6>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <h6><span className='text-sm text-gray-d'>Claimable Rewards: </span>N/A GMI</h6>
                                            <Row className='flex-nowrap align-items-center mb-2 gx-3'>
                                                <Col>
                                                    <Button disabled className='btn w-100 btn-blue'>
                                                        Claim
                                                    </Button>
                                                </Col>
                                                <Col>
                                                    <Button disabled className='btn w-100 btn-blue'>
                                                        Claim and Autostake
                                                    </Button>
                                                </Col>
                                                <Col xs="auto">
                                                <OverlayTrigger
                                                    key="left"
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip id={`tooltip-left`}>
                                                            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                                        </Tooltip>
                                                    }
                                                    >
                                                        <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                                    </OverlayTrigger>
                                                </Col>
                                            </Row>
                                            <div className="d-flex">
                                                <div>
                                                    <h6><span className='text-sm mb-1 d-block text-gray-d'>Pending Rewards</span> N/A GMI</h6>
                                                </div>
                                                <div className='ms-4'>
                                                    <h6><span className='text-sm mb-1 d-block text-gray-d'>Time until fully vested</span></h6>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Tab>
                            </Tabs>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item className='mb-24' eventKey="8">
                        <Accordion.Header>
                            <div className="acc-title me-2 d-flex align-items-center">
                                <img src={USDC} alt="logo" />
                                <span className='ms-3'>1USDC</span>
                            </div>

                            <div className="ms-auto flex-grow-1 pe-md-4 justify-content-between d-flex align-items-center">
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        Bond Price
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                        $0.0218
                                        <OverlayTrigger
                                            key="left"
                                            placement="left"
                                            overlay={
                                                <Tooltip id={`tooltip-left`}>
                                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                                </Tooltip>
                                            }
                                            >
                                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                            </OverlayTrigger>
                                    </h5>
                                </div>
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        ROI
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                        5.65%
                                        <OverlayTrigger
                                            key="left"
                                            placement="left"
                                            overlay={
                                                <Tooltip id={`tooltip-left`}>
                                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                                </Tooltip>
                                            }
                                            >
                                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                            </OverlayTrigger>
                                    </h5>
                                </div>
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        Vesting Term
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                        5 days
                                        <OverlayTrigger
                                            key="left"
                                            placement="left"
                                            overlay={
                                                <Tooltip id={`tooltip-left`}>
                                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                                </Tooltip>
                                            }
                                            >
                                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                            </OverlayTrigger>
                                    </h5>
                                </div>
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        Purchased
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                        $571,564
                                    </h5>
                                </div>
                            </div>
                        </Accordion.Header>
                        <Accordion.Body>
                            <div className="d-flex align-items-center float-sm-end mt-sm-1 mb-sm-0 mb-3 justify-content-center acc-h-links">
                                <a href="https://explorer.harmony.one/address/0xe443F63564216f60625520465F1324043fcC47b9" rel="noopener noreferrer" target="_blank">
                                    <svg className="blue-dark-theme-pink mb-1" width="16" height="16" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.8333 15.8333H4.16667V4.16667H10V2.5H4.16667C3.24167 2.5 2.5 3.25 2.5 4.16667V15.8333C2.5 16.75 3.24167 17.5 4.16667 17.5H15.8333C16.75 17.5 17.5 16.75 17.5 15.8333V10H15.8333V15.8333ZM11.6667 2.5V4.16667H14.6583L6.46667 12.3583L7.64167 13.5333L15.8333 5.34167V8.33333H17.5V2.5H11.6667Z"></path></svg>
                                    <span className='text-text-FF ms-2'>View Contract</span>
                                </a>

                                <h6 className='sub-heading ms-4 d-flex mb-0'>
                                    How it works 
                                    <OverlayTrigger
                                        key="left"
                                        placement="left"
                                        overlay={
                                            <Tooltip id={`tooltip-left`}>
                                                <strong className='text-purple'>1.</strong> Lorem, ipsum dolor sit amet consectetur adipisicing elit. <br /><br /><strong className='text-purple'>2.</strong> Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                            </Tooltip>
                                        }
                                        >
                                            <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                        </OverlayTrigger>
                                </h6>   
                            </div>
                            <Tabs defaultActiveKey="bond" className='dashboard-tabs' id="tab-example-1">
                                <Tab eventKey="bond" title="Bond">
                                    <Row className='row-divider'>
                                        <Col md={6}>
                                            <h6><span className='text-sm text-gray-d'>Your 1USDC Balance: </span>N/A</h6>
                                            <Row className='flex-nowrap mb-2 gx-3'>
                                                <Col>
                                                    <InputGroup className='input-group-max'>
                                                        <FormControl
                                                            disabled={true}
                                                            placeholder="0.00"
                                                            aria-label="Recipient's username"
                                                            aria-describedby="basic-addon2"
                                                        />
                                                        <Button variant="outline-purple" disabled={true} className='btn-xs-d disabled'>Max</Button>
                                                    </InputGroup>
                                                </Col>
                                                <Col xs="auto">
                                                    <Button disabled className='btn btn-blue'>
                                                        Enter an amount
                                                    </Button>
                                                </Col>
                                            </Row>
                                            <div className="d-flex">
                                                <div>
                                                    <h6><span className='text-sm mb-1 d-block text-gray-d'>You Will Get</span> 0.00 GMI</h6>
                                                </div>
                                                <div className='ms-4'>
                                                    <h6><span className='text-sm mb-1 d-block text-gray-d'>Max You Can Buy</span> 0.00001378 GMI</h6>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <h6><span className='text-sm text-gray-d'>Claimable Rewards: </span>N/A GMI</h6>
                                            <Row className='flex-nowrap align-items-center mb-2 gx-3'>
                                                <Col>
                                                    <Button disabled className='btn w-100 btn-blue'>
                                                        Claim
                                                    </Button>
                                                </Col>
                                                <Col>
                                                    <Button disabled className='btn w-100 btn-blue'>
                                                        Claim and Autostake
                                                    </Button>
                                                </Col>
                                                <Col xs="auto">
                                                <OverlayTrigger
                                                    key="left"
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip id={`tooltip-left`}>
                                                            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                                        </Tooltip>
                                                    }
                                                    >
                                                        <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                                    </OverlayTrigger>
                                                </Col>
                                            </Row>
                                            <div className="d-flex">
                                                <div>
                                                    <h6><span className='text-sm mb-1 d-block text-gray-d'>Pending Rewards</span> N/A GMI</h6>
                                                </div>
                                                <div className='ms-4'>
                                                    <h6><span className='text-sm mb-1 d-block text-gray-d'>Time until fully vested</span></h6>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Tab>
                            </Tabs>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item className='mb-24' eventKey="1">
                        <Accordion.Header>
                            <div className="acc-title me-2 d-flex align-items-center">
                                <img src={USDC} alt="logo" />
                                <img src={USDC} alt="logo" />
                                <span className='ms-3'>GMI - 1USDC</span>
                            </div>

                            <div className="ms-auto flex-grow-1 pe-md-4 justify-content-between d-flex align-items-center">
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        Bond Price
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                        $0.0218
                                        <OverlayTrigger
                                            key="left"
                                            placement="left"
                                            overlay={
                                                <Tooltip id={`tooltip-left`}>
                                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                                </Tooltip>
                                            }
                                            >
                                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                            </OverlayTrigger>
                                    </h5>
                                </div>
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        ROI
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                        5.65%
                                        <OverlayTrigger
                                            key="left"
                                            placement="left"
                                            overlay={
                                                <Tooltip id={`tooltip-left`}>
                                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                                </Tooltip>
                                            }
                                            >
                                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                            </OverlayTrigger>
                                    </h5>
                                </div>
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        Vesting Term
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                        5 days
                                        <OverlayTrigger
                                            key="left"
                                            placement="left"
                                            overlay={
                                                <Tooltip id={`tooltip-left`}>
                                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                                </Tooltip>
                                            }
                                            >
                                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                            </OverlayTrigger>
                                    </h5>
                                </div>
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        Purchased
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                        $571,564
                                    </h5>
                                </div>
                            </div>
                        </Accordion.Header>
                        <Accordion.Body>
                            <div className="d-flex align-items-center float-sm-end mt-sm-1 mb-sm-0 mb-3 justify-content-center acc-h-links">
                                <a href="https://explorer.harmony.one/address/0xe443F63564216f60625520465F1324043fcC47b9" rel="noopener noreferrer" target="_blank">
                                    <svg className="blue-dark-theme-pink mb-1" width="16" height="16" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.8333 15.8333H4.16667V4.16667H10V2.5H4.16667C3.24167 2.5 2.5 3.25 2.5 4.16667V15.8333C2.5 16.75 3.24167 17.5 4.16667 17.5H15.8333C16.75 17.5 17.5 16.75 17.5 15.8333V10H15.8333V15.8333ZM11.6667 2.5V4.16667H14.6583L6.46667 12.3583L7.64167 13.5333L15.8333 5.34167V8.33333H17.5V2.5H11.6667Z"></path></svg>
                                    <span className='text-text-FF ms-2'>View Contract</span>
                                </a>

                                <h6 className='sub-heading ms-4 d-flex mb-0'>
                                    How it works 
                                    <OverlayTrigger
                                        key="left"
                                        placement="left"
                                        overlay={
                                            <Tooltip id={`tooltip-left`}>
                                                <strong className='text-purple'>1.</strong> Lorem, ipsum dolor sit amet consectetur adipisicing elit. <br /><br /><strong className='text-purple'>2.</strong> Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                            </Tooltip>
                                        }
                                        >
                                            <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                        </OverlayTrigger>
                                </h6>   
                            </div>
                            <Tabs defaultActiveKey="bond" className='dashboard-tabs' id="tab-example-1">
                                <Tab eventKey="bond" title="Bond">
                                    <Row className='row-divider'>
                                        <Col md={6}>
                                            <h6><span className='text-sm text-gray-d'>Your 1USDC Balance: </span>N/A</h6>
                                            <Row className='flex-nowrap mb-2 gx-3'>
                                                <Col>
                                                    <InputGroup className='input-group-max'>
                                                        <FormControl
                                                            disabled={true}
                                                            placeholder="0.00"
                                                            aria-label="Recipient's username"
                                                            aria-describedby="basic-addon2"
                                                        />
                                                        <Button variant="outline-purple" disabled={true} className='btn-xs-d disabled'>Max</Button>
                                                    </InputGroup>
                                                </Col>
                                                <Col xs="auto">
                                                    <Button disabled className='btn btn-blue'>
                                                        Enter an amount
                                                    </Button>
                                                </Col>
                                            </Row>
                                            <div className="d-flex">
                                                <div>
                                                    <h6><span className='text-sm mb-1 d-block text-gray-d'>You Will Get</span> 0.00 GMI</h6>
                                                </div>
                                                <div className='ms-4'>
                                                    <h6><span className='text-sm mb-1 d-block text-gray-d'>Max You Can Buy</span> 0.00001378 GMI</h6>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <h6><span className='text-sm text-gray-d'>Claimable Rewards: </span>N/A GMI</h6>
                                            <Row className='flex-nowrap align-items-center mb-2 gx-3'>
                                                <Col>
                                                    <Button disabled className='btn w-100 btn-blue'>
                                                        Claim
                                                    </Button>
                                                </Col>
                                                <Col>
                                                    <Button disabled className='btn w-100 btn-blue'>
                                                        Claim and Autostake
                                                    </Button>
                                                </Col>
                                                <Col xs="auto">
                                                <OverlayTrigger
                                                    key="left"
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip id={`tooltip-left`}>
                                                            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                                        </Tooltip>
                                                    }
                                                    >
                                                        <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                                    </OverlayTrigger>
                                                </Col>
                                            </Row>
                                            <div className="d-flex">
                                                <div>
                                                    <h6><span className='text-sm mb-1 d-block text-gray-d'>Pending Rewards</span> N/A GMI</h6>
                                                </div>
                                                <div className='ms-4'>
                                                    <h6><span className='text-sm mb-1 d-block text-gray-d'>Time until fully vested</span></h6>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Tab>
                            </Tabs>
                        </Accordion.Body> 
                    </Accordion.Item>*/}
                </Accordion>
            </Container>
        </Layout>
    );
};

export default Rebase;