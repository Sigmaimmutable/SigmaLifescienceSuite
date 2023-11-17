import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row, Tabs, Tab, Button, InputGroup, Form, Table, OverlayTrigger, Tooltip, Modal } from 'react-bootstrap';
import Layout from './LayoutT';
import PieChartDeposit from './snippets/PieChartdeposit';
import Slider from './snippets/ReactRange';
import MyAlgoConnect from '@randlabs/myalgo-connect';
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import { formatJsonRpcRequest } from "@json-rpc-tools/utils";
import { dualwalletconnect } from './walletconnection';
import algosdk, { Algod ,encodeUint64} from "algosdk";
import node from './nodeapi.json';
import axios from 'axios';
import ButtonLoad from 'react-bootstrap-button-loader';

import { AppId,escrowProgram,escrowProgram2,elemToken } from '../swapConfig';
import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';

import { walletBalance,priceofalgoperusdc,checkotp,checkotpforanotheraddress,minAlgoBalance } from '../formula';
import { ManagerAppid,ManagerAppAddress,AlgoAssetAppid,AlgoAppAddress,UsdcAssetAppid,USDCAppAddress,EALGOAssetid,
    EUSDCAssetid,algooracleid,usdcoracleid,thirdappid,fourthappid,fifthappid,thirdOracle,fourthOracle,fifthOracle,
    algoEscrow,usdcEscrow,globalstate,globalstateapp,globalstateoracle,availabletoWithdraw,availtoWithdraw } from '../lendingConfigFile';

const algodClient = new algosdk.Algodv2('',node['algodclient'], '');
const myAlgoWallet = new MyAlgoConnect({ disableLedgerNano: false });
const indexerClient = new algosdk.Indexer('', node['indexerclient'], '');

const bridge = "https://bridge.walletconnect.org";

const Deposit = () => {
 

    
    useEffect(() => {
        document.title = "ELEMENT | Deposit"
    }, [])
    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [show1, setShow1] = React.useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);

    const handleShowLoad = () => setLoader(true);
    const handleHideLoad = () => setLoader(false);
 // const [switchState, setSwitchState] = useState(false);
 const [showMode, setShowMode] = useState(false);
    const[loader, setLoader] = useState(false);
    const handleCloseMode = () => {
      setShowMode(false); 
      // setSwitchState(true);
  }
  const btnhandleCloseMode = () => {
      setShowMode(false); 
      // setSwitchState(true);
  }

    const[tablle,settable] = useState([]);
    const[selectedValue,setselectedValue] = useState([]);
    const[rangeValue,setRangeValue] = useState("");

    const[inputvalue,setinputvalue] = useState("");
    const[algoprice,setalgoprice] = useState("");
    const[assetopted,setassetopted] = useState(true)
    const[appopted,setappopted] = useState(true)
    const[glob1,setglobal1] = useState([])
    const[glob2,setglobal2] = useState([]);
    const[globapp1,setglobalapp1] = useState([]);
    const[globapp2,setglobalapp2] = useState([]);
    const[maxwithdraw1,setmaxwithdraw1] = useState("");
    const[maxwithdraw2,setmaxwithdraw2] = useState("");
    const[minalgoBalance,setminimumalgoBalance] = useState("");
    const[avtowithdraw,setavtowithdraw] = useState("");


    // console.log("range",appopted)
    useEffect(()=>{table()},[])
    const table = async()=>{
      if(localStorage.getItem("walletAddress")){
        let [s1,opt] = await walletBalance(0);
        let [s2,opt2] = await walletBalance(78045387);
        let managerappopted = await checkotp(ManagerAppid);
        let price1 = await globalstateoracle(algodClient,algooracleid);
        let price2 = await globalstateoracle(algodClient,usdcoracleid);
        let t = [
            {name:"ALGO",id:1,appid:AlgoAssetAppid,price:price1.latest_twap_price,opted:managerappopted,underlying:EALGOAssetid,logo:"https://app.folks.finance/algo.svg",balance:s1,address:AlgoAppAddress},
            {name:"USDC",id:78045387,appid:UsdcAssetAppid,price:price2.price,opted:managerappopted,underlying:EUSDCAssetid,logo:"https://app.folks.finance/usdc.svg",balance:s2,address:USDCAppAddress}
        ]
        settable(t);
        let lsig = await logicsigcreting(6,localStorage.getItem("walletAddress"));
        let global1 = await globalstate(AlgoAssetAppid,lsig.address())
        let global2 = await globalstate(UsdcAssetAppid,lsig.address())
        let globalapp1 = await globalstateapp(algodClient,AlgoAssetAppid)
        let globalapp2 = await globalstateapp(algodClient,UsdcAssetAppid)
        let withdrawvalue1 = await availabletoWithdraw(t[0].price,globalapp1,global1)
        let withdrawvalue2 = await availabletoWithdraw(t[1].price,globalapp2,global2)
        setglobal1(global1)
        setglobal2(global2)
        setglobalapp1(globalapp1);
        setglobalapp2(globalapp2);
        setmaxwithdraw1(withdrawvalue1);
        setmaxwithdraw2(withdrawvalue2);
        let m =  await minAlgoBalance();
        ////console.log("minimum",mn)
        setminimumalgoBalance(m)

      }
      else{
        let t = [
          {name:"ALGO",id:1,appid:AlgoAssetAppid,underlying:EALGOAssetid,logo:"https://app.folks.finance/algo.svg",balance:0,address:AlgoAppAddress},
          {name:"USDC",id:78045387,appid:UsdcAssetAppid,underlying:EUSDCAssetid,logo:"https://app.folks.finance/usdc.svg",balance:0,address:USDCAppAddress}
      ]
      settable(t);
      }
        
        
    }
  // useEffect(()=>{pricecal()},[])
  //   const pricecal=async()=>{
  //     let pk1 = await priceofalgoperusdc(algodClient);
  //     setalgoprice(pk1/1000000);

      
  //   }
    const openmodel =async(r)=>{
        setselectedValue(r);
        
        parentToChild(r.balance);
         r.balance > 1 ? handleShow() :toast.info("You are not able to Deposit");
        // let[s,opt] = await walletBalance(r.underlying);
        let lsig = await logicsigcreting(6,localStorage.getItem("walletAddress"));
        let assetappopted = await checkotpforanotheraddress(parseInt(r.appid),lsig.address())
        // setassetopted(opt)
        console.log("opted",!assetappopted)
        setappopted(!assetappopted)

        
        

    }

    const openmodel1 =async(r,balance)=>{
      setselectedValue(r);
      let maxb = await availtoWithdraw(tablle[0].price,globapp1,glob1,tablle[1].price,globapp2,glob2,r.price)
      setavtowithdraw(maxb)
      console.log("max withdraw",maxb)
      parentToChild(maxb);
      let[s,opt] = await walletBalance(r.underlying);
      let lsig = await logicsigcreting(s,localStorage.getItem("walletAddress"));
      let assetappopted = await checkotpforanotheraddress(parseInt(r.appid),lsig.address())
      
      
      handleShow1();

  }
    
    const [data, setData] = useState('');
  
    const parentToChild = (r) => {
      setData(r);
    }
 
    const waitForConfirmation = async function (algodclient, txId,type) {
        let status = await algodclient.status().do();
        let lastRound = status["last-round"];
        while (true) {
          const pendingInfo = await algodclient
            .pendingTransactionInformation(txId)
            .do();
          if (
            pendingInfo["confirmed-round"] !== null &&
            pendingInfo["confirmed-round"] > 0
          ) {
            let id = "https://testnet.algoexplorer.io/tx/" + txId;
            toast.success(toastDiv(id,type));
            
            handleHideLoad();
            break;
          }
          lastRound++;
          await algodclient.statusAfterBlock(lastRound).do();
        }
      };
      const toastDiv = (txId,type) =>
      (
          <div>
             <p> {type} &nbsp;<a style={{color:'blue'}} href={txId} target="_blank" rel="noreferrer">View in algoexplorer <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.7176 3.97604L1.69366 14L0.046875 12.3532L10.0697 2.32926H1.23596V0H14.0469V12.8109H11.7176V3.97604Z" fill="blue"/>
      </svg></a></p> 
          </div>
      );

    const logicsigcreting = async(s,sender) =>{
        let contract;
        // if(s === 1){
            contract = algoEscrow;
        // }
        // else{
            // contract = usdcEscrow;
        // }
        let replacedData = contract.replaceAll("from",sender);
        console.log("data",replacedData)
        let results = await algodClient.compile(replacedData).do(); 
      let program1 = new Uint8Array(Buffer.from(results.result, "base64"));
      console.log("Escrow =", program1); 
          let lsig = new algosdk.LogicSigAccount(program1);
      console.log("Escrow =", lsig.address()); 
      return lsig;
    }  


    const deposit= async(t,amount)=>{
      handleShowLoad()
        const params = await algodClient.getTransactionParams().do();
        
        let sender = localStorage.getItem("walletAddress");
        const enc = new TextEncoder();
        
        let lsig = await logicsigcreting(t.id,sender);

        const params1 = await algodClient.getTransactionParams().do();
        params1.flatFee = true;
        params1.fee = 1000;
        console.log("fees",params1.fee)
        const txn1 = algosdk.makeApplicationNoOpTxnFromObject({
            from: sender,
            appIndex: parseInt(ManagerAppid),
            appArgs: [enc.encode("fmv")],
            suggestedParams: params1,
            accounts: undefined,
            foreignApps: [AlgoAssetAppid,
              UsdcAssetAppid,
              thirdappid,
              fourthappid,
              fifthappid],
            // foreignAssets: [parseInt(89691505)],
            rekeyTo: undefined
        });
        const txn2 = algosdk.makeApplicationNoOpTxnFromObject({
          from: sender,
          appIndex: parseInt(ManagerAppid),
          appArgs: [enc.encode("up")],
          suggestedParams: params1,
          accounts: undefined,
          foreignApps: [algooracleid,
            usdcoracleid,
            thirdOracle,
            fourthOracle,
            fifthOracle],
          // foreignAssets: [parseInt(89691505)],
          rekeyTo: undefined
      });
      const txn3 = algosdk.makeApplicationNoOpTxnFromObject({
        from: sender,
        appIndex: parseInt(ManagerAppid),
        appArgs: [enc.encode("upd")],
        suggestedParams: params1,
        accounts: [lsig.address()],
        foreignApps: [AlgoAssetAppid,
          UsdcAssetAppid,
          thirdappid,
          fourthappid,
          fifthappid],
        // foreignAssets: [parseInt(89691505)],
        rekeyTo: undefined
    });
    const txn4 = algosdk.makeApplicationNoOpTxnFromObject({
      from: sender,
      appIndex: parseInt(ManagerAppid),
      appArgs: [enc.encode("dummy_one")],
      suggestedParams: params1,
      accounts: undefined,
      foreignApps: [AlgoAssetAppid,
        UsdcAssetAppid,
        thirdappid,
        fourthappid,
        fifthappid],
      // foreignAssets: [parseInt(89691505)],
      rekeyTo: undefined
  });
  const txn5 = algosdk.makeApplicationNoOpTxnFromObject({
    from: sender,
    appIndex: parseInt(ManagerAppid),
    appArgs: [enc.encode("dummy_two")],
    suggestedParams: params1,
    accounts: undefined,
    foreignApps: [AlgoAssetAppid,
      UsdcAssetAppid,
      thirdappid,
      fourthappid,
      fifthappid],
    // foreignAssets: [parseInt(89691505)],
    rekeyTo: undefined
  });
  const txn6 = algosdk.makeApplicationNoOpTxnFromObject({
    from: sender,
    appIndex: parseInt(ManagerAppid),
    appArgs: [enc.encode("dummy_three")],
    suggestedParams: params1,
    accounts: undefined,
    foreignApps: [AlgoAssetAppid,
      UsdcAssetAppid,
      thirdappid,
      fourthappid,
      fifthappid],
    // foreignAssets: [parseInt(89691505)],
    rekeyTo: undefined
  });
  const txn7 = algosdk.makeApplicationNoOpTxnFromObject({
    from: sender,
    appIndex: parseInt(ManagerAppid),
    appArgs: [enc.encode("dummy_four")],
    suggestedParams: params1,
    accounts: undefined,
    foreignApps: [AlgoAssetAppid,
      UsdcAssetAppid,
      thirdappid,
      fourthappid,
      fifthappid],
    // foreignAssets: [parseInt(89691505)],
    rekeyTo: undefined
  });
  const txn8 = algosdk.makeApplicationNoOpTxnFromObject({
    from: sender,
    appIndex: parseInt(ManagerAppid),
    appArgs: [enc.encode("dummy_five")],
    suggestedParams: params1,
    accounts: undefined,
    foreignApps: [AlgoAssetAppid,
      UsdcAssetAppid,
      thirdappid,
      fourthappid,
      fifthappid],
    // foreignAssets: [parseInt(89691505)],
    rekeyTo: undefined
  });
  const txn9 = algosdk.makeApplicationNoOpTxnFromObject({
    from: sender,
    appIndex: parseInt(ManagerAppid),
    appArgs: [enc.encode("dummy_six")],
    suggestedParams: params1,
    accounts: undefined,
    foreignApps: [AlgoAssetAppid,
      UsdcAssetAppid,
      thirdappid,
      fourthappid,
      fifthappid],
    // foreignAssets: [parseInt(89691505)],
    rekeyTo: undefined
  });
  const txn10 = algosdk.makeApplicationNoOpTxnFromObject({
    from: sender,
    appIndex: parseInt(ManagerAppid),
    appArgs: [enc.encode("dummy_seven")],
    suggestedParams: params1,
    accounts: undefined,
    foreignApps: [AlgoAssetAppid,
      UsdcAssetAppid,
      thirdappid,
      fourthappid,
      fifthappid],
    // foreignAssets: [parseInt(89691505)],
    rekeyTo: undefined
  });
  const txn11 = algosdk.makeApplicationNoOpTxnFromObject({
    from: sender,
    appIndex: parseInt(ManagerAppid),
    appArgs: [enc.encode("dummy_eight")],
    suggestedParams: params1,
    accounts: undefined,
    foreignApps: [AlgoAssetAppid,
      UsdcAssetAppid,
      thirdappid,
      fourthappid,
      fifthappid],
    // foreignAssets: [parseInt(89691505)],
    rekeyTo: undefined
  });
  const txn12 = algosdk.makeApplicationNoOpTxnFromObject({
    from: sender,
    appIndex: parseInt(ManagerAppid),
    appArgs: [enc.encode("dummy_nine")],
    suggestedParams: params1,
    accounts: undefined,
    foreignApps: [AlgoAssetAppid,
      UsdcAssetAppid,
      thirdappid,
      fourthappid,
      fifthappid],
    // foreignAssets: [parseInt(89691505)],
    rekeyTo: undefined
  });
  const txn13 = algosdk.makeApplicationNoOpTxnFromObject({
    from: sender,
    appIndex: parseInt(ManagerAppid),
    appArgs: [enc.encode("mt")],
    suggestedParams: params1,
    accounts: undefined,
    // foreignApps: [90227060,
    //   UsdcAssetAppid,
    //   thirdappid,
    //   fourthappid,
    //   fifthappid],
    // foreignAssets: [parseInt(89691505)],
    rekeyTo: undefined
  });
  const params2 = await algodClient.getTransactionParams().do();
        params2.flatFee = true;
        params2.fee = 1000;
  const txn14 = algosdk.makeApplicationNoOpTxnFromObject({
    from: sender,
    appIndex: parseInt(t.appid),
    appArgs: [enc.encode("mt")],
    suggestedParams: params2,
    accounts: [lsig.address()],
    foreignApps: [ManagerAppid],
    // foreignAssets: [parseInt(t.underlying)],
    rekeyTo: undefined
  });  
       
 console.log("addr",t.appid) 
 let txn15;
 if(t.id === 1){
    txn15 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        from: sender, 
        to: t.address, 
        amount: parseInt(amount*1000000), 
        //  note: note1,  
         suggestedParams: params
       });
 }
 else{
    txn15 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        from: sender, 
        to: t.address, 
        amount: parseInt(amount*1000000), 
        //  note: note1,  
         suggestedParams: params,
         assetIndex:t.id
       });
      
 }
  
   const groupID = algosdk.computeGroupID([txn1,txn2,txn3,txn4,txn5,txn6,txn7,txn8,txn9,txn10,txn11,txn12,txn13,txn14,txn15])
   const txs = [txn1,txn2,txn3,txn4,txn5,txn6,txn7,txn8,txn9,txn10,txn11,txn12,txn13,txn14,txn15];
   for (let i = 0; i <= 14; i++) txs[i].group = groupID;
   let k = t.id === 1 ? (amount*1000000) : 0;
   let ckmin = await checkminalgo(14000+k)
   if(ckmin === 0){
    try{
      const signedTx1 = await myAlgoWallet.signTransaction([txs[0].toByte(),txs[1].toByte(),txs[2].toByte(),txs[3].toByte(),txs[4].toByte(),txs[5].toByte(),txs[6].toByte(),txs[7].toByte(),txs[8].toByte(),txs[9].toByte(),txs[10].toByte(),txs[11].toByte(),txs[12].toByte(),txs[13].toByte(),txs[14].toByte()]);     
    toast.info("Transaction in progress")
      //  console.log("blob",signedTx3)
       const response = await algodClient.sendRawTransaction([signedTx1[0].blob,signedTx1[1].blob,signedTx1[2].blob,signedTx1[3].blob,signedTx1[4].blob,signedTx1[5].blob,signedTx1[6].blob,signedTx1[7].blob,signedTx1[8].blob,signedTx1[9].blob,signedTx1[10].blob,signedTx1[11].blob,signedTx1[12].blob,signedTx1[13].blob,signedTx1[14].blob]).do();
       
            console.log("TxID", JSON.stringify(response, null, 1));
            await waitForConfirmation(algodClient, response.txId,"Deposited Successfully");
            await table();
            handleClose();
            
     }catch{
       toast.error("Transcation fails")
       handleHideLoad()
     }
   }
 
 
    }

    const assetAppOptin = async(r) =>{
      handleShowLoad()
        const params = await algodClient.getTransactionParams().do();
          
        let sender = localStorage.getItem("walletAddress");
        const enc = new TextEncoder();
       
        const params1 = await algodClient.getTransactionParams().do();
        params1.flatFee = true;
        params1.fee = 1000;
        console.log("fees",params1.fee)
        let lsig = await logicsigcreting(r.id,sender);
        // const txn1 = algosdk.makeApplicationNoOpTxnFromObject({
        //     from: sender,
        //     appIndex: parseInt(marketappId),
            
  
        //     appArgs: [enc.encode("ssmc"),encodeUint64(5)],
        //     suggestedParams: params1,
        //     accounts: undefined,
        //     // foreignApps: [parseInt(manager_appid)],
        //     // foreignAssets: [parseInt(busdc),usdc],
        //     foreignApps: [parseInt(0),assetappid2],
  
        //     rekeyTo: undefined
        // });
      if(r.opted){
        const txn1 = algosdk.makeApplicationOptInTxnFromObject({
          from: sender,
          appIndex: r.appid,
          suggestedParams: params1,
          foreignAssets: undefined,
          rekeyTo: undefined
      });
      const groupID = algosdk.computeGroupID([ txn1]);
            const txs = [ txn1];
            for (let i = 0; i <= 0; i++) txs[i].group = groupID;
            let ckmin = await checkminalgo(1000)
            if(ckmin === 0){
              try{
                const signedTx11 = await myAlgoWallet.signTransaction([txs[0].toByte()]);
                toast.info("Transaction in Progress");
    
                const response1 = await algodClient.sendRawTransaction([signedTx11[0].blob]).do();
                await table()
                await waitForConfirmation(algodClient, response1.txId,"App Opt-In completed successfully");
                setappopted(false);

              }catch{
                toast.error("Transcation fails")
                handleHideLoad()
              }
            }
           
          
      }
      else{
        let txn1 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
          from:sender, 
          to:lsig.address(), 
          amount: 3569500, 
          //  note: note1,  
           suggestedParams: params
         });

         
    const txn2 = algosdk.makeApplicationOptInTxnFromObject({
      from: lsig.address(),
      appIndex: AlgoAssetAppid,
      suggestedParams: params1,
      foreignAssets: undefined,
      rekeyTo: undefined
  });
  
  
  
  const txn3 = algosdk.makeApplicationOptInTxnFromObject({
    from: lsig.address(),
    appIndex: UsdcAssetAppid,
    suggestedParams: params1,
    foreignAssets: undefined,
    rekeyTo: undefined
  });
  const txn4 = algosdk.makeApplicationOptInTxnFromObject({
    from:lsig.address(),
    appIndex: thirdappid,
    suggestedParams: params1,
    foreignAssets: undefined,
    rekeyTo: undefined
  });
  const txn5 = algosdk.makeApplicationOptInTxnFromObject({
    from: lsig.address(),
    appIndex: fourthappid,
    suggestedParams: params1,
    foreignAssets: undefined,
    rekeyTo: undefined
  });
  const txn6 = algosdk.makeApplicationOptInTxnFromObject({
    from:lsig.address(),
    appIndex: fifthappid,
    suggestedParams: params1,
    foreignAssets: undefined,
    rekeyTo: undefined
  });
  const txn7 = algosdk.makeApplicationOptInTxnFromObject({
    from:lsig.address(),
    appIndex: 90116249,
    suggestedParams: params1,
    foreignAssets: undefined,
    rekeyTo: undefined
  });
  const txn8 = algosdk.makeApplicationOptInTxnFromObject({
    from:lsig.address(),
    appIndex: 51422155,
    suggestedParams: params1,
    foreignAssets: undefined,
    rekeyTo: undefined
  });
  const txn9 = algosdk.makeApplicationOptInTxnFromObject({
    from:lsig.address(),
    appIndex: 51422158,
    suggestedParams: params1,
    foreignAssets: undefined,
    rekeyTo: undefined
  });
  const txn10 = algosdk.makeApplicationOptInTxnFromObject({
    from:lsig.address(),
    appIndex: 51422161,
    suggestedParams: params1,
    foreignAssets: undefined,
    rekeyTo: undefined
  });
  const txn11 = algosdk.makeApplicationOptInTxnFromObject({
    from:lsig.address(),
    appIndex: 51422164,
    suggestedParams: params1,
    foreignAssets: undefined,
    rekeyTo: undefined
  });
  const txn12 = algosdk.makeApplicationOptInTxnFromObject({
    from:lsig.address(),
    appIndex: 51422170,
    suggestedParams: params1,
    foreignAssets: undefined,
    rekeyTo: undefined
  });
  const txn13 = algosdk.makeApplicationOptInTxnFromObject({
    from:lsig.address(),
    appIndex: 51422172,
    suggestedParams: params1,
    foreignAssets: undefined,
    rekeyTo: undefined
  });
  const txn14 = algosdk.makeApplicationOptInTxnFromObject({
    from:lsig.address(),
    appIndex: 51422175,
    suggestedParams: params1,
    foreignAssets: undefined,
    rekeyTo: undefined
  });
  const txn15 = algosdk.makeApplicationOptInTxnFromObject({
    from: sender,
    appIndex: ManagerAppid,
    suggestedParams: params1,
    foreignAssets: undefined,
    rekeyTo: undefined
  });
  const txn16 = algosdk.makeApplicationOptInTxnFromObject({
    from:lsig.address(),
    appIndex: ManagerAppid,
    suggestedParams: params1,
    foreignAssets: undefined,
    rekeyTo: ManagerAppAddress
  });
  const groupID = algosdk.computeGroupID([txn1,txn2,txn3,txn4,txn5,txn6,txn7,txn8,txn9,txn10,txn11,txn12,txn13,txn14,txn15,txn16])
  const txs = [txn1,txn2,txn3,txn4,txn5,txn6,txn7,txn8,txn9,txn10,txn11,txn12,txn13,txn14,txn15,txn16];
  for (let i = 0; i <= 15; i++) txs[i].group = groupID;
  const s1 = algosdk.signLogicSigTransaction(txs[1],lsig);
  const s2 = algosdk.signLogicSigTransaction(txs[2],lsig);
  const s3 = algosdk.signLogicSigTransaction(txs[3],lsig);
  const s4 = algosdk.signLogicSigTransaction(txs[4],lsig);
  const s5 = algosdk.signLogicSigTransaction(txs[5],lsig);
  const s6 = algosdk.signLogicSigTransaction(txs[6],lsig);
  const s7 = algosdk.signLogicSigTransaction(txs[7],lsig);
  const s8 = algosdk.signLogicSigTransaction(txs[8],lsig);
  const s9 = algosdk.signLogicSigTransaction(txs[9],lsig);
  const s10 = algosdk.signLogicSigTransaction(txs[10],lsig);
  const s11 = algosdk.signLogicSigTransaction(txs[11],lsig);
  const s12 = algosdk.signLogicSigTransaction(txs[12],lsig);
  const s13 = algosdk.signLogicSigTransaction(txs[13],lsig);
  const s14 = algosdk.signLogicSigTransaction(txs[15],lsig);
  console.log("tx1",txs[0])
  
let ckmin = await checkminalgo(3570500)
if(ckmin === 0){
  try{
    // const signedTx1 = algosdk.signLogicSigTransaction([(txs[1],lsig),(txs[2],lsig),txs[3].toByte(),txs[4].toByte(),txs[5].toByte(),txs[6].toByte(),txs[7].toByte(),txs[8].toByte(),txs[9].toByte(),txs[10].toByte(),txs[11].toByte(),txs[12].toByte(),txs[13].toByte()]);     
    const signedTx2 = await myAlgoWallet.signTransaction([txs[0].toByte(),txs[14].toByte()])
  //   const signedTx22 = await myAlgoWallet.signTransaction(txs[14].toByte())
    //  const signedTx3 = await myAlgoWallet.signTransaction(txs[15].toByte())
    toast.info("Transaction in progress")
    console.log("blob",s4)
    const response = await algodClient.sendRawTransaction([signedTx2[0].blob,s1.blob,s2.blob,s3.blob,s4.blob,s5.blob,s6.blob,s7.blob,s8.blob,s9.blob,s10.blob,s11.blob,s12.blob,s13.blob,signedTx2[1].blob,s14.blob]).do();
    
          console.log("TxID", JSON.stringify(response, null, 1));
          await table()
          await waitForConfirmation(algodClient, response.txId,"Opt-In Completed Successfully");
          setappopted(true);
          
        }catch{
          toast.error("Transcation fails")
          handleHideLoad();
        }
}
 
    


      }
        


       
      }

const assetoptin = async(r) =>{
    const params = await algodClient.getTransactionParams().do();

    let optinTranscation = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
    from:localStorage.getItem("walletAddress"),
    to :localStorage.getItem("walletAddress"),
    assetIndex: r.underlying ,
    amount: 0,
    suggestedParams:params,
    // appIndex:index
    });


    const signedTx1 = await myAlgoWallet.signTransaction(optinTranscation.toByte());
    toast.info("Transaction in Progress");
try{
    const response = await algodClient.sendRawTransaction(signedTx1.blob).do();
    console.log("TxID", JSON.stringify(response, null, 1));
    await waitForConfirmation(algodClient, response.txId,"Asset Opt-In Completed Successfully");
    setassetopted(false);
  }catch{
    toast.error("Transcation fails")
  }

   
}

const calculateinputvalue=(i)=>{
  setinputvalue(i)
  
}

const withdraw = async(r,input)=>{
  // let k =r.name === "ALGO" ? parseFloat(maxwithdraw1/1000000):parseFloat(maxwithdraw2/1000000);
  let k = avtowithdraw;
  if(input < k){

    handleShowLoad()
    const params = await algodClient.getTransactionParams().do();
    
    let sender = localStorage.getItem("walletAddress");
    const enc = new TextEncoder();
    
    let lsig = await logicsigcreting(r.id,sender);
    const params1 = await algodClient.getTransactionParams().do();
    params1.flatFee = true;
    params1.fee = 1000;
    console.log("fees",params1.fee)
    const txn1 = algosdk.makeApplicationNoOpTxnFromObject({
        from: sender,
        appIndex: parseInt(ManagerAppid),
        appArgs: [enc.encode("fmv")],
        suggestedParams: params1,
        accounts: undefined,
        foreignApps: [AlgoAssetAppid,
          UsdcAssetAppid,
          thirdappid,
          fourthappid,
          fifthappid],
        // foreignAssets: [parseInt(89691505)],
        rekeyTo: undefined
    });
    const txn2 = algosdk.makeApplicationNoOpTxnFromObject({
      from: sender,
      appIndex: parseInt(ManagerAppid),
      appArgs: [enc.encode("up")],
      suggestedParams: params1,
      accounts: undefined,
      foreignApps: [algooracleid,
        usdcoracleid,
        thirdOracle,
        fourthOracle,
        fifthOracle],
      // foreignAssets: [parseInt(89691505)],
      rekeyTo: undefined
  });
  const txn3 = algosdk.makeApplicationNoOpTxnFromObject({
    from: sender,
    appIndex: parseInt(ManagerAppid),
    appArgs: [enc.encode("upd")],
    suggestedParams: params1,
    accounts: [lsig.address()],
    foreignApps: [AlgoAssetAppid,
      UsdcAssetAppid,
      thirdappid,
      fourthappid,
      fifthappid],
    // foreignAssets: [parseInt(89691505)],
    rekeyTo: undefined
  });
  const txn4 = algosdk.makeApplicationNoOpTxnFromObject({
  from: sender,
  appIndex: parseInt(ManagerAppid),
  appArgs: [enc.encode("dummy_one")],
  suggestedParams: params1,
  accounts: undefined,
  foreignApps: [AlgoAssetAppid,
    UsdcAssetAppid,
    thirdappid,
    fourthappid,
    fifthappid],
  // foreignAssets: [parseInt(89691505)],
  rekeyTo: undefined
  });
  const txn5 = algosdk.makeApplicationNoOpTxnFromObject({
  from: sender,
  appIndex: parseInt(ManagerAppid),
  appArgs: [enc.encode("dummy_two")],
  suggestedParams: params1,
  accounts: undefined,
  foreignApps: [AlgoAssetAppid,
  UsdcAssetAppid,
  thirdappid,
  fourthappid,
  fifthappid],
  // foreignAssets: [parseInt(89691505)],
  rekeyTo: undefined
  });
  const txn6 = algosdk.makeApplicationNoOpTxnFromObject({
  from: sender,
  appIndex: parseInt(ManagerAppid),
  appArgs: [enc.encode("dummy_three")],
  suggestedParams: params1,
  accounts: undefined,
  foreignApps: [AlgoAssetAppid,
  UsdcAssetAppid,
  thirdappid,
  fourthappid,
  fifthappid],
  // foreignAssets: [parseInt(89691505)],
  rekeyTo: undefined
  });
  const txn7 = algosdk.makeApplicationNoOpTxnFromObject({
  from: sender,
  appIndex: parseInt(ManagerAppid),
  appArgs: [enc.encode("dummy_four")],
  suggestedParams: params1,
  accounts: undefined,
  foreignApps: [AlgoAssetAppid,
  UsdcAssetAppid,
  thirdappid,
  fourthappid,
  fifthappid],
  // foreignAssets: [parseInt(89691505)],
  rekeyTo: undefined
  });
  const txn8 = algosdk.makeApplicationNoOpTxnFromObject({
  from: sender,
  appIndex: parseInt(ManagerAppid),
  appArgs: [enc.encode("dummy_five")],
  suggestedParams: params1,
  accounts: undefined,
  foreignApps: [AlgoAssetAppid,
  UsdcAssetAppid,
  thirdappid,
  fourthappid,
  fifthappid],
  // foreignAssets: [parseInt(89691505)],
  rekeyTo: undefined
  });
  const txn9 = algosdk.makeApplicationNoOpTxnFromObject({
  from: sender,
  appIndex: parseInt(ManagerAppid),
  appArgs: [enc.encode("dummy_six")],
  suggestedParams: params1,
  accounts: undefined,
  foreignApps: [AlgoAssetAppid,
  UsdcAssetAppid,
  thirdappid,
  fourthappid,
  fifthappid],
  // foreignAssets: [parseInt(89691505)],
  rekeyTo: undefined
  });
  const txn10 = algosdk.makeApplicationNoOpTxnFromObject({
  from: sender,
  appIndex: parseInt(ManagerAppid),
  appArgs: [enc.encode("dummy_seven")],
  suggestedParams: params1,
  accounts: undefined,
  foreignApps: [AlgoAssetAppid,
  UsdcAssetAppid,
  thirdappid,
  fourthappid,
  fifthappid],
  // foreignAssets: [parseInt(89691505)],
  rekeyTo: undefined
  });
  const txn11 = algosdk.makeApplicationNoOpTxnFromObject({
  from: sender,
  appIndex: parseInt(ManagerAppid),
  appArgs: [enc.encode("dummy_eight")],
  suggestedParams: params1,
  accounts: undefined,
  foreignApps: [AlgoAssetAppid,
  UsdcAssetAppid,
  thirdappid,
  fourthappid,
  fifthappid],
  // foreignAssets: [parseInt(89691505)],
  rekeyTo: undefined
  });
  const txn12 = algosdk.makeApplicationNoOpTxnFromObject({
  from: sender,
  appIndex: parseInt(ManagerAppid),
  appArgs: [enc.encode("dummy_nine")],
  suggestedParams: params1,
  accounts: undefined,
  foreignApps: [AlgoAssetAppid,
  UsdcAssetAppid,
  thirdappid,
  fourthappid,
  fifthappid],
  // foreignAssets: [parseInt(89691505)],
  rekeyTo: undefined
  });
  const txn13 = algosdk.makeApplicationNoOpTxnFromObject({
  from: sender,
  appIndex: parseInt(ManagerAppid),
  appArgs: [enc.encode("rcu"),encodeUint64(parseInt(input*1000000))],
  suggestedParams: params1,
  accounts: undefined,
  // foreignApps: [90227060,
  //   UsdcAssetAppid,
  //   thirdappid,
  //   fourthappid,
  //   fifthappid],
  // foreignAssets: [parseInt(89691505)],
  rekeyTo: undefined
  });
  const params2 = await algodClient.getTransactionParams().do();
    params2.flatFee = true;
    params2.fee = 2000;
  const txn14 = algosdk.makeApplicationNoOpTxnFromObject({
  from: sender,
  appIndex: parseInt(r.appid),
  appArgs: [enc.encode("rcu")],
  suggestedParams: params2,
  accounts: [lsig.address()],
  foreignApps: [ManagerAppid],
  foreignAssets: [parseInt(r.id)],
  rekeyTo: undefined
  });  
   
  // let txn15 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
  // from: sender, 
  // to: AlgoAppAddress, 
  // amount: 5000000, 
  // //  note: note1,
  // assetIndex:90528909,  
  // suggestedParams: params
  // });
  
  const groupID = algosdk.computeGroupID([txn1,txn2,txn3,txn4,txn5,txn6,txn7,txn8,txn9,txn10,txn11,txn12,txn13,txn14])
  const txs = [txn1,txn2,txn3,txn4,txn5,txn6,txn7,txn8,txn9,txn10,txn11,txn12,txn13,txn14];
  for (let i = 0; i <= 13; i++) txs[i].group = groupID;
  let ckmin = await checkminalgo(15000);
  if(ckmin === 0){
    try{
      const signedTx1 = await myAlgoWallet.signTransaction([txs[0].toByte(),txs[1].toByte(),txs[2].toByte(),txs[3].toByte(),txs[4].toByte(),txs[5].toByte(),txs[6].toByte(),txs[7].toByte(),txs[8].toByte(),txs[9].toByte(),txs[10].toByte(),txs[11].toByte(),txs[12].toByte(),txs[13].toByte()]);     
      toast.info("Transaction in progress")
      //  console.log("blob",signedTx3)
      const response = await algodClient.sendRawTransaction([signedTx1[0].blob,signedTx1[1].blob,signedTx1[2].blob,signedTx1[3].blob,signedTx1[4].blob,signedTx1[5].blob,signedTx1[6].blob,signedTx1[7].blob,signedTx1[8].blob,signedTx1[9].blob,signedTx1[10].blob,signedTx1[11].blob,signedTx1[12].blob,signedTx1[13].blob]).do();
      
        console.log("TxID", JSON.stringify(response, null, 1));
        await waitForConfirmation(algodClient, response.txId,"Withdraw Suceessfully");
        await table();
                handleClose1();
      }catch{
        toast.error("Transcation fails")
        handleHideLoad();
      }
  }

  
  
  }
  else{
    toast.error("Enter within the maximum limit")
    handleHideLoad();
  }
}

const checkminalgo = async(fees)=>{
    if(fees>minalgoBalance){
      return 1;
      toast.error("You don't have minimum Algo balance")
      handleHideLoad()
    }
    else{
      return 0
    }
}
    return (
        <Layout>
            <Container>
                <Row>
                    <Col md={6} className="mb-4">
                        <h4 className='mb-3'>Available To Deposit</h4>
                        <Card className='card-dash d-block border-0 mb-4'>
                            <div className="nft-tabs float-md-end">
                                <InputGroup className="input-group-search">
                                    <Form.Control placeholder="Search" />
                                    <Button variant="outline-secondary" id="button-addon2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                        </svg>
                                    </Button>
                                </InputGroup>   
                            </div>
                            <Tabs defaultActiveKey="all" className='dashboard-tabs' id="tab-example-1">
                                <Tab eventKey="all" title="All">
                                    <div className="mb-0">
                                        <Table responsive hover className='dashboard-table mb-0'>
                                            <thead>
                                                <tr>
                                                    <th>Asset</th>
                                                    <th className='text-end'>Your Wallet Balance</th>
                                                    <th className='text-end'>
                                                        Deposit APR
                                                        <OverlayTrigger
                                                            key="left"
                                                            placement="left"
                                                            overlay={
                                                                <Tooltip id={`tooltip-left`}>
                                                                   An annual percentage rate is expressed as an interest rate
                                                                </Tooltip>
                                                            }
                                                            >
                                                            <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                                        </OverlayTrigger>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {/* <tr className='cursor-pointer' onClick={handleShow}>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <span className='me-lg-3 me-2'><img style={{width: '30px'}} src="https://app.folks.finance/algo.svg" alt="usdc" /></span>
                                                            <div className='text-nowrap' style={{lineHeight: '1.4'}}>
                                                                <span style={{fontWeight: '500'}}>ALGO</span> <br /><span style={{opacity: '0.5'}}>ALGO</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className='text-end'>
                                                        <div className='text-nowrap' style={{lineHeight: '1.4'}}>
                                                            <span style={{fontWeight: '500'}}>0 ALGO</span> <br /><span style={{opacity: '0.5'}}>$0</span>
                                                        </div>
                                                    </td>
                                                    <td className='text-end'>
                                                        <strong style={{color : '#1eb76f'}}>2.4%</strong>
                                                    </td>
                                                </tr> */}
                                               
                                                {tablle.map((r,i)=>{
                                                    return(<>
                                                     <tr className='cursor-pointer' onClick={()=>openmodel(r)}>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <span className='me-lg-3 me-2'><img style={{width: '30px'}} src={r.logo} alt="usdc" /></span>
                                                            <div className='text-nowrap' style={{lineHeight: '1.4'}}>
                                                                <span style={{fontWeight: '500'}}>{r.name}</span> <br /><span style={{opacity: '0.5'}}>{r.name}</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className='text-end'>
                                                        <div className='text-nowrap' style={{lineHeight: '1.4'}}>
                                                            <span style={{fontWeight: '500'}}>{parseFloat(r.balance/1000000).toFixed(4)} {r.name}</span> <br /><span style={{opacity: '0.5'}}>${parseFloat((r.balance/1000000)*(r.price/1000000)).toFixed(4)}</span>
                                                        </div>
                                                    </td>
                                                    <td className='text-end'>
                                                        <strong style={{color : '#1eb76f'}}>
                                                        {r.name === "ALGO" ? parseFloat((globapp1.uc/globapp1.acc)*100).toFixed(3) :parseFloat((globapp2.uc/globapp2.acc)*100).toFixed(3)}

                                                          %</strong>
                                                    </td>
                                                </tr>
                                                    </>)
                                                   
                                                })}
                                                
                                            </tbody>
                                        </Table>
                                    </div>
                                </Tab>
                                {/* <Tab eventKey="favorites" title="Favorites">
                                    <div className="mb-4">
                                        <Table responsive hover className='dashboard-table'>
                                            <thead>
                                                <tr>
                                                    <th>Asset</th>
                                                    <th className='text-end'>Your Wallet Balance</th>
                                                    <th className='text-end'>
                                                        Deposit APR
                                                        <OverlayTrigger
                                                            key="left"
                                                            placement="left"
                                                            overlay={
                                                                <Tooltip id={`tooltip-left`}>
                                                                    An annual percentage rate is expressed as an interest rate
                                                                </Tooltip>
                                                            }
                                                            >
                                                            <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                                        </OverlayTrigger>
                                                    </th>
                                                </tr>
                                            </thead>
                                        </Table>

                                        <div className="empty-content mt-2 text-center">
                                            <h4 className='text-muted'>You have not added any assets to your favorites. <br />You can add them by clicking on the star icon  next to their name</h4>
                                            <Button variant='blue' className='py-3 px-5'>See all assets</Button>
                                        </div>
                                    </div>
                                </Tab> */}
                            </Tabs>
                        </Card>                                              
                    </Col>
                    <Col md={6} className="mb-4">
                        <h4 className='mb-3'>My Deposit Information</h4>
                        <Card className='card-dash text-center border-0 mb-4'>
                            <div className="mb-4">
                                <div className="deposit-chart">
                                    <PieChartDeposit ptoChild={(globapp1.acc+globapp2.acc)} patochild={(glob1.uac+glob2.uac)}></PieChartDeposit>
                                    <span>My Deposits</span>
                                </div>
                            </div>
                            
                            <div className="deposit-content">
                                <h4 className='mb-0' style={{color: '#1eb76f'}}>Deposit APR 
                                    <OverlayTrigger
                                        key="left"
                                        placement="left"
                                        overlay={
                                            <Tooltip id={`tooltip-left`}>
                                                An annual percentage rate is expressed as an interest rate
                                            </Tooltip>
                                        }
                                        >
                                        <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                    </OverlayTrigger>
                                </h4>
                               
                                <h2 className='mb-0'> {parseFloat(((globapp1.uc/globapp1.acc)+(globapp2.uc/globapp2.acc))*100).toFixed(3) }%</h2>
                                <hr />
                                <h4 className='mb-3'>Total Deposited <span style={{color: '#1eb76f'}}>${(glob1.uac?(parseFloat((glob1.uac/1000000)*(tablle[0].price/1000000)).toFixed(3)):0)+(glob2.uac?parseFloat(((glob2.uac/1000000)*(tablle[1].price/1000000)).toFixed(3)):0)}</span></h4>
                                <hr />
                                {/* <h6 className='subheading mb-0 p-0'>Used As Collateral $0</h6> */}
                            </div>
                        </Card>  

                        <h4 className='mb-3'>My Deposits</h4>
                        <Card className='card-dash text-center border-0 mb-4'>
                            <div className="mb-4">
                                <Table responsive hover className='dashboard-table'>
                                    <thead>
                                        <tr>
                                            <th>Asset</th>
                                            {/* <th className='text-end'>
                                                Deposit APR	
                                            </th> */}
                                            <th className='text-center'>Active Collateral</th>
                                            <th className='text-center'>Deposit APR</th>
                                        </tr>
                                        {(glob1.uac > 0)  ?(<>
                                          <tr className='cursor-pointer' onClick={()=>openmodel1(tablle[0],maxwithdraw1)} >
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <span className='me-lg-3 me-2'><img style={{width: '30px'}} src={tablle[0].logo} alt="usdc" /></span>
                                                            <div className='text-nowrap' style={{lineHeight: '1.4'}}>
                                                                <span style={{fontWeight: '500'}}>ALGO</span> <br />
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className='text-center'>
                                                        <div className='text-nowrap' style={{lineHeight: '1.4'}}>
                                                            <span style={{fontWeight: '500'}}>{parseFloat((glob1.uac )/1000000).toFixed(3)}</span> <br />
                                                        </div>
                                                    </td>
                                                    <td className='text-center'>
                                                        <strong style={{color : '#1eb76f'}}>
                                                        { parseFloat((globapp1.uc/globapp1.acc)*100).toFixed(3)}%
</strong>
                                                    </td>
                                                </tr>
                                        </>):(<></>) }
                                        {( glob2.uac> 0) ?(<>
                                          <tr className='cursor-pointer' onClick={()=>openmodel1(tablle[1],maxwithdraw2)} >
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <span className='me-lg-3 me-2'><img style={{width: '30px'}} src={tablle[1].logo} alt="usdc" /></span>
                                                            <div className='text-nowrap' style={{lineHeight: '1.4'}}>
                                                                <span style={{fontWeight: '500'}}>USDC</span> <br />
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className='text-center'>
                                                        <div className='text-nowrap' style={{lineHeight: '1.4'}}>
                                                            <span style={{fontWeight: '500'}}>{parseFloat((glob2.uac)/1000000).toFixed(3)}</span> <br />
                                                        </div>
                                                    </td>
                                                    <td className='text-center'>
                                                        <strong style={{color : '#1eb76f'}}>
                                                        {parseFloat((globapp2.uc/globapp2.acc)*100).toFixed(3)}%
</strong>
                                                    </td>
                                                </tr>
                                        </>):(<></>) }
                                        
                                    </thead>
                                </Table>
                                {( (glob2.uac< 0) &&( glob1.uac< 0)) ?(<>
                                <div className="empty-content mt-4 text-center">
                                    <h4 className='text-muted'>No deposits yet</h4>
                                </div></>):(<>
                                  </>)}

                               
                            </div>
                        </Card>                                              
                    </Col>
                </Row>
            </Container>

            <Modal show={show} className="modal-dashboard" centered onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>DEPOSIT</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="d-flex justify-content-center mb-3 align-items-center">
                        <span className='me-lg-3 me-2'><img style={{width: '30px'}} src={selectedValue.logo} alt="usdc" /></span>
                        <div className='text-white' style={{lineHeight: '1.4'}}>
                            <span style={{fontWeight: '500', fontSize: '22px'}}>{selectedValue.name}</span>
                        </div>
                    </div>
                    <input type="number"  style={{fontWeight: '600', fontSize: '20px !important'}} placeholder={selectedValue.name} className='form-control text-center form-control-field' value={ inputvalue } onChange={event => calculateinputvalue((event.target.value))} />
                    <p className='text-center text-gray'>${parseFloat((inputvalue)*(selectedValue.price/1000000)).toFixed(4) }</p>

                    <div className="text-end text-white"><small>Available to deposit: {parseFloat(selectedValue.balance/1000000).toFixed(4)} {selectedValue.name}</small></div>
                    <div className="mb-3 py-1">
                        <Slider parentToChild={data} datas={(inputvalue)=>{setinputvalue(inputvalue)}} inputval = {inputvalue} ></Slider>
                    </div>
                    <p className='d-flex align-items-center justify-content-between mb-0'>
                        <span>
                            Deposit APR
                            <OverlayTrigger
                                key="right"
                                placement="right"
                                overlay={
                                    <Tooltip id={`tooltip-right`}>
                                  An annual percentage rate is expressed as an interest rate
                                    </Tooltip>
                                }
                                >
                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                            </OverlayTrigger>
                        </span>
                        <strong style={{color: '#1eb76f'}}> {selectedValue.name === "ALGO"? parseFloat((globapp1.uc/globapp1.acc)*100).toFixed(3): parseFloat((globapp2.uc/globapp2.acc)*100).toFixed(3)}%</strong>
                    </p>
                    <hr />
                    <p className='d-flex align-items-center justify-content-between'>
                        <span>
                            Deposit Token
                            <OverlayTrigger
                                key="right"
                                placement="right"
                                overlay={
                                    <Tooltip id={`tooltip-right`}>
                                        Amount to  Deposit
                                    </Tooltip>
                                }
                                >
                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                            </OverlayTrigger>
                        </span>
                        <strong style={{color: '#808191'}}>{inputvalue} {selectedValue.name}</strong>
                    </p>

                    <div className="mt-4 text-center">
                      {appopted ?(<>
                    <ButtonLoad loading={loader} variant='primary' className='btn-blue' onClick={()=>assetAppOptin(selectedValue)}>App Opt-In</ButtonLoad>
                      </>):(<>
                        <ButtonLoad loading={loader} variant='primary' className='btn-blue' onClick={()=>deposit(selectedValue,inputvalue)}>Deposit</ButtonLoad>
                      </>)}


                    </div>
                </Modal.Body>

            </Modal>

            <Modal show={show1} className="modal-dashboard" centered onHide={handleClose1}>
                <Modal.Header closeButton>
                    <Modal.Title>Withdraw</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="d-flex justify-content-center mb-3 align-items-center">
                        <span className='me-lg-3 me-2'><img style={{width: '30px'}} src={selectedValue.logo} alt="usdc" /></span>
                        <div className='text-white' style={{lineHeight: '1.4'}}>
                            <span style={{fontWeight: '500', fontSize: '22px'}}>{selectedValue.name}</span>
                        </div>
                    </div>
                    <input type="number" style={{fontWeight: '600', fontSize: '20px !important'}} placeholder={selectedValue.name} className='form-control text-center form-control-field' value={ inputvalue } onChange={event => calculateinputvalue((event.target.value))} />
                    <p className='text-center text-gray'>${parseFloat((inputvalue)*(selectedValue.price/1000000)).toFixed(4)}</p>

                    <div className="text-end text-white"><small>Available to Withdraw:
                       {selectedValue.name === "ALGO" ? parseFloat(maxwithdraw1/1000000).toFixed(4):parseFloat(maxwithdraw2/1000000).toFixed(4)} {selectedValue.name}</small></div>
                    <div className="mb-3 py-1">
                        <Slider parentToChild={data} datas={(inputvalue)=>{setinputvalue(inputvalue)}} inputval = {inputvalue} ></Slider>
                    </div>
                    {/* <p className='d-flex align-items-center justify-content-between mb-0'>
                        <span>
                            withdraw APR
                            <OverlayTrigger
                                key="right"
                                placement="right"
                                overlay={
                                    <Tooltip id={`tooltip-right`}>
                                        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                    </Tooltip>
                                }
                                >
                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                            </OverlayTrigger>
                        </span>
                        <strong style={{color: '#1eb76f'}}>1.34%</strong>
                    </p> */}
                    <hr />
                    <p className='d-flex align-items-center justify-content-between'>
                        <span>
                            Withdraw Token
                            <OverlayTrigger
                                key="right"
                                placement="right"
                                overlay={
                                    <Tooltip id={`tooltip-right`}>
                                       Amount to withdraw
                                    </Tooltip>
                                }
                                >
                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                            </OverlayTrigger>
                        </span>
                        <strong style={{color: '#808191'}}>{inputvalue} {selectedValue.name}</strong>
                    </p>

                    <div className="mt-4 text-center">
                     
                        <ButtonLoad loading={loader} variant='primary' className='btn-blue' onClick={()=>withdraw(selectedValue,inputvalue)}>Withdraw</ButtonLoad>
                    


                    </div>
                </Modal.Body>

            </Modal>
            <><ToastContainer position='bottom-right' draggable = {false} transition={Zoom} autoClose={4000} closeOnClick = {false}/></>

        </Layout>
    );
};

export default Deposit;