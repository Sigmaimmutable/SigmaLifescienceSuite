import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row, Tabs, Tab, Button, InputGroup, Form, Table, OverlayTrigger, Tooltip, Modal, Badge } from 'react-bootstrap';
import Layout from './LayoutT';
// import PieChart from './snippets/PieChart';
import PieChartBorow from './snippets/PieChartBorrow';
import Slider from './snippets/ReactRange';
import SliderSafer from './snippets/ReactRangeSafer';

import Lockicon from '../../assets/images/lockLight.svg'
import Moneyicon from '../../assets/images/moneybag.png'
import MyAlgoConnect from '@randlabs/myalgo-connect';
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import { formatJsonRpcRequest } from "@json-rpc-tools/utils";
import { dualwalletconnect } from './walletconnection';
import algosdk, { Algod ,encodeUint64} from "algosdk";
import node from './nodeapi.json';

import { AppId,escrowProgram,escrowProgram2,elemToken } from '../swapConfig';
import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';
import ButtonLoad from 'react-bootstrap-button-loader';


import { walletBalance,priceofalgoperusdc,checkotp,checkotpforanotheraddress,minAlgoBalance,assetOptin } from '../formula';
import { ManagerAppid,ManagerAppAddress,AlgoAssetAppid,AlgoAppAddress,UsdcAssetAppid,USDCAppAddress,EALGOAssetid,
    EUSDCAssetid,algooracleid,usdcoracleid,thirdappid,fourthappid,fifthappid,thirdOracle,fourthOracle,fifthOracle,
    algoEscrow,usdcEscrow,globalstate,globalstateapp,globalstateoracle,maxBorrow,MaxBorrow,totalborrowed } from '../lendingConfigFile';

const algodClient = new algosdk.Algodv2('',node['algodclient'], '');
const myAlgoWallet = new MyAlgoConnect({ disableLedgerNano: false });
const indexerClient = new algosdk.Indexer('', node['indexerclient'], '');

const bridge = "https://bridge.walletconnect.org";

const Deposit = () => {
     
    useEffect(() => {
        document.title = "ELEMENT | Borrow"
    }, [])
    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const [show1, setShow1] = React.useState(false);
    const handleClose1 = () => {setShow1(false); setShow(true);};
    const handleShow1 = () => {setShow1(true); setShow(false);};

    const [show2, setShow2] = React.useState(false);
    const handleClose2 = () => {setShow2(false); };
    const handleShow2 = () => {setShow2(true); };

    const handleShowLoad = () => setLoader(true);
    const handleHideLoad = () => setLoader(false);

    const[loader, setLoader] = useState(false);

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
    const[combine,setcombined] = useState([]);
    const[totalborrowAlgo,setTotalBorrowedAlgo] = useState("");
    const[totalborrowUsdc,setTotalBorrowedUsdc] = useState("");
    const[MaxUsdcBorrow,setMaxUsdcBorrow] = useState("");
    const[MaxAlgoBorrow,setMaxAlgoBorrow] = useState("");
    const[maxborrow,setmaxborrow] = useState("");
    const[totalborrowedinusd,settotalborrewdinusd] = useState("")
    const[minalgoBalance,setminimumalgoBalance] = useState("");
    const[optinneeded,setoptinneeded] = useState(false)



    console.log("combined",combine)
    useEffect(()=>{table()},[])
    const table = async()=>{
        if(localStorage.getItem("walletAddress")){
          let [s1,opt] = await walletBalance(0);
          let [s2,opt2] = await walletBalance(78045387);
          let managerappopted = await checkotp(ManagerAppid)
          let price1 = await globalstateoracle(algodClient,algooracleid);
          let price2 = await globalstateoracle(algodClient,usdcoracleid);
          let t = [
              {name:"ALGO",id:1,appid:AlgoAssetAppid,price:price1.latest_twap_price,opted:managerappopted,underlying:EALGOAssetid,logo:"https://app.folks.finance/algo.svg",balance:s1,address:AlgoAppAddress},
              {name:"USDC",id:78045387,appid:UsdcAssetAppid,price:price2.price,opted:managerappopted,underlying:EUSDCAssetid,logo:"https://app.folks.finance/usdc.svg",balance:s2,address:USDCAppAddress}
          ]
          settable(t);
          let lsig = await logicsigcreting(localStorage.getItem("walletAddress"));
          let global1 = await globalstate(AlgoAssetAppid,lsig.address())
          let global2 = await globalstate(UsdcAssetAppid,lsig.address())
          let globalapp1 = await globalstateapp(algodClient,AlgoAssetAppid)
          let globalapp2 = await globalstateapp(algodClient,UsdcAssetAppid)
          let [maxborrow1,borrowed1] = await maxBorrow(t[0].price,globalapp1,global1)
          let [maxborrow2,borrowed2] = await maxBorrow(t[1].price,globalapp2,global2)
          let totalbrr = await totalborrowed(t[0].price,globalapp1,global1,t[1].price,globalapp2,global2)
          setglobal1(global1)
          setglobal2(global2)
          setglobalapp1(globalapp1);
          setglobalapp2(globalapp2)
          console.log("global",globalapp1,globalapp2)
          let comb = [globalapp1.acc,globalapp2.acc]
          setcombined(comb)
          setMaxAlgoBorrow(maxborrow1)
          setMaxUsdcBorrow(maxborrow2)
          setTotalBorrowedAlgo(borrowed1);
          setTotalBorrowedUsdc(borrowed2)
          settotalborrewdinusd(totalbrr);
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

    useEffect(()=>{pricecal()},[])
    const pricecal=async()=>{
      let pk1 = await priceofalgoperusdc(algodClient);
      setalgoprice(pk1/1000000);

      
    }
    // useEffect(()=>{ borrowcalculation()},[])

// const borrowcalculation = async(price1,price2,globapp1,globapp2,glob1,glob2)=>{

//     console.log("borrowUSD",borrowUsd1)
// let activeCollateralUnderlying1 = Math.floor(
//   (glob1.uac * globapp1.bt) / (1000000000)
// )

// let activeCollateralUsd1 = ((price1/1000000) * activeCollateralUnderlying1)/1000000;


// let activeCollateralMaxBorrowUsd1 = (activeCollateralUsd1 * globapp1.cf) / (1000)
// let borrowUnderlying1 = Math.floor((globapp1.ub * glob1.ubs) / globapp1.ob)

// let borrowUsd1 = (borrowUnderlying1 * (price1/1000000))/1000000
// let borrow_token1 = ((glob1.ubs *globapp1.ub ) / globapp1.ob) / 1000000;
// setTotalBorrowedAlgo(borrowUsd1)
    

// let activeCollateralUnderlying2 = Math.floor(
//   (glob2.uac * globapp2.bt) / (1000000000)
// )
// console.log("first",activeCollateralUnderlying2)
// let activeCollateralUsd2 = (
//     (price2/1000000) * activeCollateralUnderlying2)/1000000;


// let activeCollateralMaxBorrowUsd2 = (activeCollateralUsd2 * (globapp2.cf)) / (1000)
// let borrowUnderlying2 = Math.floor((globapp2.ub * glob2.ubs) / globapp2.ob)

// let borrowUsd2 = (borrowUnderlying2 * (price2/1000000))/1000000
// let borrow_token2 = ((glob2.ubs *globapp2.ub ) / globapp2.ob) / 1000000;
// setTotalBorrowedUsdc(borrowUsd2)
//     // console.log("borrow1",activeCollateralUnderlying,activeCollateralUsd,activeCollateralMaxBorrowUsd);
//     // console.log("borrow2",borrowUsd2)
  
    


// }
    const openmodel1 =async(r,l)=>{
        setselectedValue(r);
        let k = r.id ===1 ? totalborrowAlgo : totalborrowUsdc;
        console.log("child",k)
        parentToChild(l);
        let[s,opt] = await walletBalance(r.underlying);
        let lsig = await logicsigcreting(localStorage.getItem("walletAddress"));
        let assetappopted = await checkotpforanotheraddress(parseInt(r.appid),lsig.address())
        
        
        handleShow2();
  
    }


    const openmodel =async(r)=>{
        setselectedValue(r);
        let maxb = await MaxBorrow(tablle[0].price,globapp1,glob1,tablle[1].price,globapp2,glob2,r.price)
        setmaxborrow(maxb)
       parentToChild(maxb)
       let assetOptincheck = (r.id === 1) ? true : await assetOptin(parseInt(r.id))
       setoptinneeded(assetOptincheck);
       maxb > 1 ?  handleShow() : toast.info("You are not able to Borrow");
//         if(r.id === 1){
//             let activeCollateralBank = glob1.uac;
//     let activeCollateralUnderlying = Math.floor(
//       (glob1.uac * globapp1.bt) / (1000000000)
//     )

//    let activeCollateralUsd = (1.268875 * activeCollateralUnderlying)/1000000;


//     let activeCollateralMaxBorrowUsd = (activeCollateralUsd * globapp1.cf) / (1000)
//     let borrowShares = glob1.ubs;
//     let borrowUnderlying = Math.floor((globapp1.ub * glob1.ubs) / globapp1.ob)

//     let borrowUsd = (borrowUnderlying * 1.268875)/1000000
// let borrow_token = ((glob1.ubs *globapp1.ub ) / globapp1.ob) / 1000000;
//         console.log("borrow1",activeCollateralUnderlying,activeCollateralUsd,activeCollateralMaxBorrowUsd);
//         console.log("borrow2",borrowShares,borrowUnderlying,borrowUsd,borrow_token)
//         }
//         else{
//             // activecollUSD = combine[1]
//             let activeCollateralBank = glob2.uac;
//     let activeCollateralUnderlying = Math.floor(
//       (activeCollateralBank * globapp2.bt) / (1000000000)
//     )

//    let activeCollateralUsd = (
//     1 * activeCollateralUnderlying)/1000000;


//     let activeCollateralMaxBorrowUsd = (activeCollateralUsd * (globapp2.cf)) / (1000)
//     let borrowShares = glob2.ubs;
//     let borrowUnderlying = Math.floor((globapp2.ub * glob2.ubs) / globapp2.ob)

//     let borrowUsd = (borrowUnderlying * 1)/1000000
// let borrow_token = ((glob2.ubs *globapp2.ub ) / globapp2.ob) / 1000000;
//         console.log("borrow1",activeCollateralUnderlying,activeCollateralUsd,activeCollateralMaxBorrowUsd);
//         console.log("borrow2",borrowShares,borrowUnderlying,borrowUsd,borrow_token)
      
//         }

      

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

    const logicsigcreting = async(sender) =>{
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

    const borrow = async(r,amount)=>{
        handleShowLoad()
        let s = r.name === "ALGO" ? parseFloat((maxborrow)/1000000) :parseFloat((maxborrow)/1000000);
        if(s>=amount){
        const params = await algodClient.getTransactionParams().do();
        
      let sender = localStorage.getItem("walletAddress");
      const enc = new TextEncoder();
      let lsig = await logicsigcreting(sender)
      
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
  appArgs: [enc.encode("b"),encodeUint64(parseInt(parseFloat(amount) * 1000000))],
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
  appArgs: [enc.encode("b")],
  suggestedParams: params2,
  accounts: [lsig.address()],
  foreignApps: [ManagerAppid],
  foreignAssets: [parseInt(r.id)],
  rekeyTo: undefined
}); 
console.log("r.if",r.id) 
     
// let txn15 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
//   from: sender, 
//   to: "LDWXWGDNZIGHKNZDID2NLOUE3LNV64U4SVHMPPIOBYRBKGPAOQUL5YRLG4", 
//   amount: 2000000, 
//   //  note: note1,
//   assetIndex:90528909,  
//    suggestedParams: params
//  });

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
      await waitForConfirmation(algodClient, response.txId,"Borrowed Successully");
      await table();
        handleClose1();
    }catch{
        toast.error("Transcation fails")
        handleHideLoad()
      }
    }
}
      else{
        toast.error("Enter within the maximum limit")
        handleHideLoad()
      }
    }
    const assetoptin = async(r) =>{
        handleShowLoad()
        const params = await algodClient.getTransactionParams().do();
    
        let optinTranscation = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        from:localStorage.getItem("walletAddress"),
        to :localStorage.getItem("walletAddress"),
        assetIndex: r.id ,
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
        handleHideLoad()
      }
    
       
    }

    const repayborrow= async(r,amount)=>{
        handleShowLoad();
        console.log("input",amount*1000000)
        const params = await algodClient.getTransactionParams().do();
        
      let sender = localStorage.getItem("walletAddress");
      const enc = new TextEncoder();
      let lsig = await logicsigcreting(sender)
      
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
  appArgs: [enc.encode("rb")],
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
  appArgs: [enc.encode("rb")],
  suggestedParams: params2,
  accounts: [lsig.address()],
  foreignApps: [ManagerAppid],
  foreignAssets: [parseInt(r.id)],
  rekeyTo: undefined
});  
let txn15;
if(r.id === 1){
   txn15 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
       from: sender, 
       to: r.address, 
       amount: parseInt(amount*1000000), 
       //  note: note1,  
        suggestedParams: params
      });
}
else{
   txn15 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
       from: sender, 
       to: r.address, 
       amount: parseInt(amount*1000000), 
       //  note: note1,  
        suggestedParams: params,
        assetIndex:r.id
      });
    }

 const groupID = algosdk.computeGroupID([txn1,txn2,txn3,txn4,txn5,txn6,txn7,txn8,txn9,txn10,txn11,txn12,txn13,txn14,txn15])
 const txs = [txn1,txn2,txn3,txn4,txn5,txn6,txn7,txn8,txn9,txn10,txn11,txn12,txn13,txn14,txn15];
 for (let i = 0; i <= 14; i++) txs[i].group = groupID;
 let amt = r.id === 1 ? amount*1000000 : ((amount*1000000)+1000)
 let ckmin = await checkminalgo(amt + 14000);
 if(ckmin === 0){
 try{
         const signedTx1 = await myAlgoWallet.signTransaction([txs[0].toByte(),txs[1].toByte(),txs[2].toByte(),txs[3].toByte(),txs[4].toByte(),txs[5].toByte(),txs[6].toByte(),txs[7].toByte(),txs[8].toByte(),txs[9].toByte(),txs[10].toByte(),txs[11].toByte(),txs[12].toByte(),txs[13].toByte(),txs[14].toByte()]);     
 toast.info("Transaction in progress")
//  console.log("blob",signedTx3)
 const response = await algodClient.sendRawTransaction([signedTx1[0].blob,signedTx1[1].blob,signedTx1[2].blob,signedTx1[3].blob,signedTx1[4].blob,signedTx1[5].blob,signedTx1[6].blob,signedTx1[7].blob,signedTx1[8].blob,signedTx1[9].blob,signedTx1[10].blob,signedTx1[11].blob,signedTx1[12].blob,signedTx1[13].blob,signedTx1[14].blob]).do();
 
      console.log("TxID", JSON.stringify(response, null, 1));
      await waitForConfirmation(algodClient, response.txId,"Borrowed Repayed Successully");
      await table();
          handleClose2();
    
    }catch{
        toast.error("Transcation fails")
        handleHideLoad();
      }
    
    }
    }

    const checkminalgo = async(fees)=>{
        if(fees>minalgoBalance){
          return 1;
          toast.error("You don't have minimum Algo balance")
          handleHideLoad();
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
                        <h4 className='mb-3'>Available To Borrow</h4>
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
                                                    <th className='text-end'>Total Borrowed</th>
                                                    <th className='text-end'>
                                                        Borrow APR
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
                                                            <span className='me-lg-3 me-2'><img style={{width: '30px'}} src="https://app.folks.finance/usdc.svg" alt="usdc" /></span>
                                                            <div className='text-nowrap' style={{lineHeight: '1.4'}}>
                                                                <span style={{fontWeight: '500'}}>USDC</span> <br /><span style={{opacity: '0.5'}}>USD Coin</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className='text-end'>
                                                        <div className='text-nowrap' style={{lineHeight: '1.4'}}>
                                                            <span style={{fontWeight: '500'}}>371,711.41 USDC</span> <br /><span style={{opacity: '0.5'}}>$371,695.42</span>
                                                        </div>
                                                    </td>
                                                    <td className='text-end'>
                                                        <strong style={{color : '#613eeb'}}>6.05%</strong><br />
                                                        <OverlayTrigger
                                                            key="left"
                                                            placement="left"
                                                            overlay={
                                                                <Tooltip id={`tooltip-left`}>
                                                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                                                </Tooltip>
                                                            }
                                                            >
                                                            <div className="info-badge mt-1 d-inline-flex align-items-center">
                                                                + up to 4.39% <img style={{width: '20px'}} src="https://app.folks.finance/usdc.svg" alt="usdc" />
                                                            </div>
                                                        </OverlayTrigger>
                                                    </td>
                                                </tr> */}
                                              
                                                {tablle.map((r,i)=>{
                                                    return(<>
                                                    <tr className='cursor-pointer' onClick={()=>openmodel(r)}>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <span className='me-lg-3 me-2'><img style={{width: '30px'}} src={r.logo} alt="usdc" /></span>
                                                            <div className='text-nowrap' style={{lineHeight: '1.4'}}>
                                                                <span style={{fontWeight: '500'}}>{r.name}</span> <br /><span style={{opacity: '0.5'}}>{r.name} Coin</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className='text-end'>
                                                        <div className='text-nowrap' style={{lineHeight: '1.4'}}>
                                                            <span style={{fontWeight: '500'}}>
                                                                {r.name === "ALGO" ? parseFloat((globapp1.ub)/1000000).toFixed(3) :parseFloat((globapp2.ub)/1000000).toFixed(3)}
                                                                 {r.name}</span> <br /><span style={{opacity: '0.5'}}>${r.name === "ALGO" ? parseFloat(((globapp1.ub)/1000000)*(r.price/1000000)).toFixed(3) : parseFloat(((globapp2.ub)/1000000)*(r.price/1000000)).toFixed(3)}</span>
                                                        </div>
                                                    </td>
                                                    <td className='text-end'>
                                                        <strong style={{color : '#613eeb'}}>
                                                        {r.name === "ALGO" ? parseFloat((globapp1.uc/globapp1.ub)*100).toFixed(3) :parseFloat((globapp2.uc/globapp2.ub)*100).toFixed(3)}
                                                            %</strong><br />
                                                        <OverlayTrigger
                                                            key="left"
                                                            placement="left"
                                                            overlay={
                                                                <Tooltip id={`tooltip-left`}>
                                                                  An annual percentage rate is expressed as an interest rate
                                                                </Tooltip>
                                                            }
                                                            >
                                                            <div className="info-badge mt-1 d-inline-flex align-items-center">
                                                                {/* + up to 4.39%  */}
                                                                <img style={{width: '20px'}} src={r.logo} alt="usdc" />
                                                            </div>
                                                        </OverlayTrigger>
                                                    </td>
                                                </tr>
                                                    </>)})}
                                                
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
                                                    <th className='text-end'>Available To Borrow</th>
                                                    <th className='text-end'>
                                                        Borrow APR
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
                        <h4 className='mb-3'>My Borrow Information</h4>
                        <Card className='card-dash text-center border-0 mb-4'>
                            <div className="mb-4">
                                <div className="deposit-chart">
                                    <PieChartBorow ptoChild={(globapp1.ub+globapp2.ub)} patochild={(totalborrowAlgo+totalborrowUsdc)}></PieChartBorow> 
                                   {/* {(totalborrowAlgo+totalborrowUsdc)?
                                   (<> <span>My borrow</span></>):
                                   (<> <span>No Borrows</span></>)} */}
                                    <span>My Borrows</span>
                                </div>
                            </div>
                            
                            <div className="deposit-content">
                                <h4 className='mb-0' style={{color: '#613eeb'}}>Borrow APR 
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
                                <h2 className='mb-0'>{ (parseFloat((globapp1.uc/globapp1.ub) + (globapp2.uc/globapp2.ub)*100).toFixed(3))}%</h2>
                                <hr />
                                <h4 className='mb-3'>Total Borrowed <span style={{color: '#613eeb'}}>${parseFloat(totalborrowedinusd/1000000).toFixed(3)}</span></h4>
                                <hr />
                                <h6 className='subheading mb-0 p-0'>Your Collateral {parseFloat(glob1.uac?(glob1.uac/1000000):0)+parseFloat(glob2.uac ? (glob2.uac/1000000) : 0)}</h6>
                            </div>
                        </Card>  

                        <h4 className='mb-3'>My Borrows 
                            <OverlayTrigger
                                key="right"
                                placement="right"
                                overlay={
                                    <Tooltip id={`tooltip-right`}>
                                        Maintain an appropriate health factor to mitigate the risk of your loan being liquidated.
                                    </Tooltip>
                                }
                                >
                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                            </OverlayTrigger></h4>
                        <Card className='card-dash text-center border-0 mb-4'>
                            <div className="mb-4">
                                <Table responsive hover className='dashboard-table'>
                                    <thead>
                                        <tr>
                                            <th>Asset</th>
                                            <th className='text-center'>
                                            Borrow APR
                                            </th>
                                            <th className='text-center'>Borrowed Amount	</th>
                                            {/* <th className='text-center'>Health Factor</th> */}
                                        </tr>
                                    </thead>
                                   
                              
                               
                                {((totalborrowAlgo/1000000) > 0.000001 )  ?(<>
                                          <tr className='cursor-pointer' onClick={()=>openmodel1(tablle[0],totalborrowAlgo)} >
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
                                                            <span style={{fontWeight: '500'}}>
                                                            {parseFloat((globapp1.uc/globapp1.ub)*100).toFixed(3) }
                                                                %</span> <br />
                                                        </div>
                                                    </td>
                                                    <td className='text-center' style={{lineHeight: '1.4'}}>
                                                    <div className='text-nowrap' style={{lineHeight: '1.4'}}>
                                                            <span style={{fontWeight: '500'}}>{parseFloat(totalborrowAlgo/1000000).toFixed(3)}</span> <br />
                                                        </div>
                                                    </td>
                                                   
                                                </tr>
                                        </>):(<></>) }
                                        {( (totalborrowUsdc/1000000) > 0.000001) ?(<>
                                          <tr className='cursor-pointer' onClick={()=>openmodel1(tablle[1],totalborrowUsdc)}>
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
                                                            <span style={{fontWeight: '500'}}>  {parseFloat((globapp2.uc/globapp2.ub)*100).toFixed(3)}%</span> <br />
                                                        </div>
                                                    </td>
                                                    <td className='text-center' style={{lineHeight: '1.4'}}>
                                                    <div className='text-nowrap' style={{lineHeight: '1.4'}}>
                                                            <span style={{fontWeight: '500'}}>{parseFloat(totalborrowUsdc/1000000).toFixed(3)}</span> <br />
                                                        </div>
                                                    </td>
                                                </tr>
                                        </>):(<></>) }
                                        </Table>
                                      
                                    {( (totalborrowAlgo/1000000) < 0.000001 && (totalborrowUsdc/1000000) < 0.000001 )?(<>                                               
                                <div className="empty-content mt-4 text-center">
                                    <h4 className='text-muted'>No borrows yet</h4>
                                    </div>                                
                                    </>):(<></>)}
                                   
                            </div>
                        </Card>                                              
                    </Col>
                </Row>
            </Container>

            <Modal show={show} size="xs" className="modal-dashboard" centered onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>BORROW</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <Row className='gx-1 mb-4'>
                        {/* <Col xs={6}>
                            <Button variant='gray' onClick={handleShow1} className='popup-btn flex-column align-items-start'>
                                <small>Collateral</small>
                                <div className='d-flex align-items-center mt-2 w-100'>
                                    <img src="https://app.folks.finance/algo.svg" alt="image" className='popup-btn-icon' width='28' height='28' />
                                    <img src={Lockicon} className='popup-btn-icon-sm' alt="Lockicon" />
                                    <span>f ALGO</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                                </div>
                            </Button>
                        </Col> */}
                        <Col xs={12}>
                            <Button variant='none' className='popup-btn flex-column align-items-start'>
                                <small>Borrow</small>
                                <div className='d-flex align-items-center mt-2 w-100'>
                                    <img src={selectedValue.logo} alt="image" className='popup-btn-icon' width='28' height='28' />
                                    <img src={Moneyicon} className='popup-btn-icon-sm' alt="Lockicon" />
                                    <span>{selectedValue.name}</span>
                                </div>
                            </Button>
                        </Col>
                    </Row>
                    
                    <input type="text" style={{fontWeight: '600', fontSize: '20px !important'}} placeholder={selectedValue.name} className='form-control text-center form-control-field' value={ inputvalue } onChange={event => setinputvalue((event.target.value))}/>
                    <p className='text-center text-gray'>${selectedValue.name === "ALGO" ? inputvalue*algoprice : inputvalue}</p>

                                                                
                    <div className="text-end text-white"><small>Max borrow:  {selectedValue.name === "ALGO" ? parseFloat((maxborrow)/1000000).toFixed(3) :parseFloat((maxborrow)/1000000).toFixed(3)}{selectedValue.name}</small></div>
                    <div className="mb-3 py-1">
                        <Slider parentToChild={data} datas={(inputvalue)=>{setinputvalue(inputvalue)}} inputval = {inputvalue} />
                    </div>
                    <p className='d-flex align-items-center justify-content-between mb-0'>
                        <span>
                            Borrow APR
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
                        <strong style={{color: '#1eb76f'}}> {selectedValue.name === "ALGO" ? parseFloat((globapp1.uc/globapp1.ub)*100).toFixed(3):parseFloat((globapp2.uc/globapp2.ub)*100).toFixed(3) }%</strong>
                    </p>
                    <hr />
                    {/* <p className='d-flex align-items-center justify-content-between'>
                        <span>
                            Health Factor
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
                        <strong style={{color: '#808191'}}>0.00 <Badge bg-default>None</Badge></strong>
                    </p> */}

                    {/* <div className="text-white d-flex align-items-center justify-content-between"><small>Safer</small><small>Riskier</small></div>
                    <div className="mb-3 py-1">
                        <SliderSafer />
                    </div> */}


                    {/* <h6 className="subheading">Collateral Value</h6> */}
                    {/* <div className="text-white d-flex align-items-center justify-content-between"><small>0 <span className='text-muted'>fALGO</span></small> <small>$0.00</small></div> */}
                    {/* <div className="text-white d-flex align-items-center justify-content-between"><small>0 <span className='text-muted'>{selectedValue.name}</span></small> <small>0.00% LTV</small></div> */}

                    <div className="mt-4 text-center">
                        {optinneeded ? (<>
                            <ButtonLoad loading={loader} variant='primary' className='btn-blue' onClick={()=>borrow(selectedValue,inputvalue)} >Borrow {selectedValue.name}</ButtonLoad>
                        </>):(<>
                            <ButtonLoad loading={loader} variant='primary' className='btn-blue' onClick={()=>assetoptin(selectedValue)} >Opt-In {selectedValue.name}</ButtonLoad>
                        </>)}
                    </div>
                </Modal.Body>
            </Modal>


            <Modal show={show1} size="xs" className="modal-dashboard " centered onHide={handleClose1}>
                <Modal.Header closeButton>
                    <Modal.Title>Select a Asset</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-4">
                        <div className="text-md mb-2">Search Asset</div>
                        <input type="text" placeholder='Search Asset' className='form-control form-control-field border-0' />
                    </div>
                    
                    <hr className='mb-4' />

                    <div className="currency-list py-1">
                        <Button variant='link' className='btn-currency mb-2 w-100 justify-content-start align-items-center btn-currency-md p-1'>
                            <img src="https://app.folks.finance/algo.svg" alt="image" className='popup-btn-icon' width='28' height='28' />
                            <div className="ms-3 flex-grow-1 d-flex align-items-center text-start">
                            <div className='flex-grow-1'>
                                <h5 className='mb-0 font-semibold text-white'>Folks ALGO</h5>
                                <h7 className='mb-0 sub-heading text-sm mb-0'>fALGO</h7>
                            </div>
                            <div className='text-end'>
                                <h7 className='mb-0 sub-heading text-sm mb-0'>0 <br />$0.00</h7>
                            </div>
                            </div>
                        </Button>
                        <Button variant='link' className='btn-currency mb-2 w-100 justify-content-start align-items-center btn-currency-md p-1'>
                            <img src="https://app.folks.finance/algo.svg" alt="image" className='popup-btn-icon' width='28' height='28' />
                            <div className="ms-3 flex-grow-1 d-flex align-items-center text-start">
                            <div className='flex-grow-1'>
                                <h5 className='mb-0 font-semibold text-white'>Folks ALGO</h5>
                                <h7 className='mb-0 sub-heading text-sm mb-0'>fALGO</h7>
                            </div>
                            <div className='text-end'>
                                <h7 className='mb-0 sub-heading text-sm mb-0'>0 <br />$0.00</h7>
                            </div>
                            </div>
                        </Button>
                        <Button variant='link' className='btn-currency mb-2 w-100 justify-content-start align-items-center btn-currency-md p-1'>
                            <img src="https://app.folks.finance/algo.svg" alt="image" className='popup-btn-icon' width='28' height='28' />
                            <div className="ms-3 flex-grow-1 d-flex align-items-center text-start">
                            <div className='flex-grow-1'>
                                <h5 className='mb-0 font-semibold text-white'>Folks ALGO</h5>
                                <h7 className='mb-0 sub-heading text-sm mb-0'>fALGO</h7>
                            </div>
                            <div className='text-end'>
                                <h7 className='mb-0 sub-heading text-sm mb-0'>0 <br />$0.00</h7>
                            </div>
                            </div>
                        </Button>
                        <Button variant='link' className='btn-currency mb-2 w-100 justify-content-start align-items-center btn-currency-md p-1'>
                            <img src="https://app.folks.finance/algo.svg" alt="image" className='popup-btn-icon' width='28' height='28' />
                            <div className="ms-3 flex-grow-1 d-flex align-items-center text-start">
                            <div className='flex-grow-1'>
                                <h5 className='mb-0 font-semibold text-white'>Folks ALGO</h5>
                                <h7 className='mb-0 sub-heading text-sm mb-0'>fALGO</h7>
                            </div>
                            <div className='text-end'>
                                <h7 className='mb-0 sub-heading text-sm mb-0'>0 <br />$0.00</h7>
                            </div>
                            </div>
                        </Button>
                        <Button variant='link' className='btn-currency mb-2 w-100 justify-content-start align-items-center btn-currency-md p-1'>
                            <img src="https://app.folks.finance/algo.svg" alt="image" className='popup-btn-icon' width='28' height='28' />
                            <div className="ms-3 flex-grow-1 d-flex align-items-center text-start">
                            <div className='flex-grow-1'>
                                <h5 className='mb-0 font-semibold text-white'>Folks ALGO</h5>
                                <h7 className='mb-0 sub-heading text-sm mb-0'>fALGO</h7>
                            </div>
                            <div className='text-end'>
                                <h7 className='mb-0 sub-heading text-sm mb-0'>0 <br />$0.00</h7>
                            </div>
                            </div>
                        </Button>
                        <Button variant='link' className='btn-currency mb-2 w-100 justify-content-start align-items-center btn-currency-md p-1'>
                            <img src="https://app.folks.finance/algo.svg" alt="image" className='popup-btn-icon' width='28' height='28' />
                            <div className="ms-3 flex-grow-1 d-flex align-items-center text-start">
                            <div className='flex-grow-1'>
                                <h5 className='mb-0 font-semibold text-white'>Folks ALGO</h5>
                                <h7 className='mb-0 sub-heading text-sm mb-0'>fALGO</h7>
                            </div>
                            <div className='text-end'>
                                <h7 className='mb-0 sub-heading text-sm mb-0'>0 <br />$0.00</h7>
                            </div>
                            </div>
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>

            <Modal show={show2} size="xs" className="modal-dashboard" centered onHide={handleClose2}>
                <Modal.Header closeButton>
                    <Modal.Title>Repay Borrow</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <Row className='gx-1 mb-4'>
                        {/* <Col xs={6}>
                            <Button variant='gray' onClick={handleShow1} className='popup-btn flex-column align-items-start'>
                                <small>Collateral</small>
                                <div className='d-flex align-items-center mt-2 w-100'>
                                    <img src="https://app.folks.finance/algo.svg" alt="image" className='popup-btn-icon' width='28' height='28' />
                                    <img src={Lockicon} className='popup-btn-icon-sm' alt="Lockicon" />
                                    <span>f ALGO</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                                </div>
                            </Button>
                        </Col> */}
                        <Col xs={12}>
                            <Button variant='none' className='popup-btn flex-column align-items-start'>
                                <small>Borrow</small>
                                <div className='d-flex align-items-center mt-2 w-100'>
                                    <img src={selectedValue.logo} alt="image" className='popup-btn-icon' width='28' height='28' />
                                    <img src={Moneyicon} className='popup-btn-icon-sm' alt="Lockicon" />
                                    <span>{selectedValue.name}</span>
                                </div>
                            </Button>
                        </Col>
                    </Row>
                    
                    <input type="text" style={{fontWeight: '600', fontSize: '20px !important'}} placeholder={selectedValue.name} className='form-control text-center form-control-field' value={ inputvalue } onChange={event => setinputvalue((event.target.value))}/>
                    <p className='text-center text-gray'>${selectedValue.name === "ALGO" ? inputvalue*algoprice : inputvalue}</p>

                    <div className="text-end text-white"><small>Max Repay: {selectedValue.name === "ALGO" ?totalborrowAlgo/1000000 : totalborrowUsdc/1000000} {selectedValue.name}</small></div>
                    <div className="mb-3 py-1">
                        <Slider parentToChild={data} datas={(inputvalue)=>{setinputvalue(inputvalue)}} inputval = {inputvalue} />
                    </div>
                    <p className='d-flex align-items-center justify-content-between mb-0'>
                        <span>
                            Borrow APR
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
                        <strong style={{color: '#1eb76f'}}> {selectedValue.name === "ALGO" ? parseFloat((globapp1.uc/globapp1.ub)*100).toFixed(3):parseFloat((globapp2.uc/globapp2.ub)*100).toFixed(3) }%</strong>
                    </p>
                    <hr />
                    {/* <p className='d-flex align-items-center justify-content-between'>
                        <span>
                            Health Factor
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
                        <strong style={{color: '#808191'}}>0.00 <Badge bg-default>None</Badge></strong>
                    </p> */}

                    {/* <div className="text-white d-flex align-items-center justify-content-between"><small>Safer</small><small>Riskier</small></div>
                    <div className="mb-3 py-1">
                        <SliderSafer />
                    </div> */}


                    {/* <h6 className="subheading">Collateral Value</h6> */}
                    {/* <div className="text-white d-flex align-items-center justify-content-between"><small>0 <span className='text-muted'>fALGO</span></small> <small>$0.00</small></div> */}
                    {/* <div className="text-white d-flex align-items-center justify-content-between"><small>0 <span className='text-muted'>{selectedValue.name}</span></small> <small>0.00% LTV</small></div> */}

                    <div className="mt-4 text-center">
                        <ButtonLoad loading={loader} variant='primary' className='btn-blue' onClick={()=>repayborrow(selectedValue,inputvalue)} >Repay {selectedValue.name}</ButtonLoad>
                    </div>
                </Modal.Body>
            </Modal>
            <><ToastContainer position='bottom-right' draggable = {false} transition={Zoom} autoClose={4000} closeOnClick = {false}/></>

        </Layout>
    );
};

export default Deposit;