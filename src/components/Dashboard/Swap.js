import React from 'react';
import { Col, Container, Row, Breadcrumb, Dropdown, Button, ButtonGroup, DropdownButton, InputGroup, FormControl, Modal, Tabs, Tab, Nav } from 'react-bootstrap';
import Layout from './Layout';
// import {Container} from 'react-bootstrap';
import SwapChart from '../Snippets/SwapChart';
// import Select from 'react-select';
import logo1 from '../../assets/images/logoasset.png';
import appcss from "../../App.css";
// import makeAnimated from 'react-select/animated';
import FilterDropdown from '../Snippets/FilterDropdown';
import FilterDropdown2 from '../Snippets/FilterDropdown2';
import elem from '../../assets/images/elem-original.png';
import tau from '../../assets/images/tau-original.png';
import logo from '../../assets/images/logoasset.png';
import usdclogo from '../../assets/images/usdc-logo.png';
import taulogo from '../../assets/images/tau-original.png';
import algologo from '../../assets/images/algorand-logo.png';
// const animatedComponents = makeAnimated();
import { useState } from "react";
import { useEffect } from "react";
// import { createtxhash ,updatepairhistory} from './apicallfunction';
import { postusertx ,updateusedetails} from '../apicallfunction';
import MyAlgoConnect from "@randlabs/myalgo-connect";
import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';
import { useLocation } from "react-router-dom";
import algosdk from "algosdk";
import { AppId,escrowProgram,escrowProgram2,elemToken } from '../swapConfig';
import {amount_out_with_slippage,checkotp,asset1_price,assert3Reserve,assert1Reserve,assert2Reserve,readingLocalstate,escrowdatacompile,checkassetin,escrowdata,asset2_price, find_balance_escrow,find_balance,priceOfCoin1,priceOfCoin2} from '../formula';
const myAlgoWallet = new MyAlgoConnect();
const baseServer = 'https://testnet-algorand.api.purestake.io/ps2';
const port = '';

const token = {
   'X-API-Key': 'pOD5BAUCxq7InVPjo0sO01B0Vq4d7pD1ask5Ix43'
}

const algodClientGet = new algosdk.Algodv2(token, baseServer, port);

const algodClient = new algosdk.Algodv2('', 'https://node.testnet.algoexplorerapi.io', '');
const indexerClient = new algosdk.Indexer('', 'https://algoindexer.testnet.algoexplorerapi.io', '');
let appID_global = AppId;
let data = escrowProgram;

function SwapPage(props) {
  React.useEffect(() => {
    window.scrollTo(0, 0);
});

  const location = useLocation();
  const [a, setdisplay] = useState([]);
  const [dvalue, setdvalue] = useState(false);
  // console.log("pagesi",location); 
  
  
    const [input1, setValue] = React.useState('0.0');
    const [input2, setValue1] = React.useState('0.0');
    const [s1, sets1] = useState("");

    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);
    const [AssetId1,setAssetId1] = useState("0");
    const [AssetId2,setAssetId2] = useState("");
console.log("Assetid1",AssetId1,AssetId2)
    const[tk1,sett1] = useState("");
    const[id1Token,setTokenId1] = useState("");
    const[id2Token,setTokenId2] = useState("");
    const[tk2,sett2] = useState("");
  //console.log("tk2",tk1)
    const [s2, sets2] = useState("");
    const[samount1,setsamount1] = useState("");
    const[samount2,setsamount2] = useState("");
    const[swapfees,setswapfees]= useState("");
    const[swapamount,set_inp_goal] = useState("");
    const[ass1,setAssets1]= React.useState("");
    const[assn1,setAssetsn1]= React.useState("");
    const [appId,setAppId] = useState("");
    const [ilt, setilt] = useState("");
    const[optinbutton,setoptinbutton] = useState("");
    const[swapopt,setoswapopt]= useState(true);
    
    const[esc,setesc]= useState("");
    const[fee,setfees] = useState("");
    const[swf,setswf] = useState("");
    const[swapdetail,setswapdetail]= useState(false);
    const[pricechange,setpricechange]= useState(false);
    const[sufficient,setsufficient]= useState(false);
    const[AssWithFee,setasswithfee] = useState("");
    const[price1,setprice1]= useState("");
    const[price2,setprice2]= useState("");
    // const[gain,setgain] = useState("");
    const[logovalue1,setlogo1] = useState("");
    const[logovalue2,setlogo2] = useState("");
    const [algoPrice, setAlgoPrice] = useState("");
    const [usdcPrice, setUsdcPrice] = useState("");
    const[swapv,setSwapv] = useState(true);
    const[pr1,setpr1]= useState("");
    const[pr2,setpr2]= useState("");
    const[pc1 ,setpc1]= useState("");
    const[pc2 ,setpc2]= useState("");
    const[balanceid1,setbamalanceid1]= useState("");
    const[balanceid2,setbamalanceid2]= useState("");
    const[assn,setAssetsn]= React.useState("");
    const[ass,setAssets]= React.useState("");
    const[appOpted,setOpted] = useState(false);
// console.log("swapopt",samount1/samount2,samount2/samount1)
    // let a = [];
    
    // if(a){
    //   // sett1(a.name1);
    //   // sett2(a.name2);
    //   // sets1(a.avalue);
    //   // sets2(a.bvalue);
    // }
    useEffect(async() =>{
      if(location.state === null || location.state === undefined || location.state ===""){
        setdvalue(true);
      }
      else{
        window.scrollTo(0, 0);
        // a = location.state.detail;
        setdisplay(location.state.detail)
         sett1(location.state.detail.name1);
        sett2(location.state.detail.name2);
         setdvalue(false);
         sets1(location.state.detail.a);
          sets2(location.state.detail.b);
          setAssetId1(location.state.detail.id1);
          setAssetId2(location.state.detail.id2);
         localStorage.setItem("tokenid1",location.state.detail.id1)
         localStorage.setItem("tokenid2",location.state.detail.id2)
         let v = await find_balance(location.state.detail.id1);
         setTokenId1(v);
         setTokenId2(await find_balance(location.state.detail.id2));

  // console.log("pagesi",ass,ass1); 
      }

    },[])
   
  //console.log("state",tk1,tk2)
    // const[gain1,setgain1] = useState("");
    useEffect(() =>{ren()},[])
    // useEffect(() =>{checkbalan()},[])

  //console.log("gain",logovalue1)
  //console.log("gain1",id2Token)
    // if(tk2 === "TAU"){
    //   setTokenId2(71682000);
    // }
  const ren =()=>{
    if(!fee){
      setfees(0.05);
    }
    if(!AssWithFee){
    }
    if(!localStorage.getItem("assetname1")){
    }
    if(!localStorage.getItem("assetname2")){
    }
    callfirst();
    checkbalan();
    
    // checkoptin();
   
  //console.log("id1",localStorage.getItem("tokenid1"))
  //console.log("id1",localStorage.getItem("tokenid2"))
    
  }
  
//  const checkoptin = async() =>{
//   let l1 = localStorage.getItem("tokenid2");
//   let l2 = localStorage.getItem("tokenid1");
//   await checkassetin(l1);
//  }


  const checkbalan = async()=>{
    setOpted(await checkotp(appID_global));
    console.log("balance",appOpted)
    // // if(tk2 === "TAU"){
    // //   setTokenId2(71682000);
    // // }
    // console.log("balance",id2Token)
    {
      let s1 = await find_balance(0);
      setbamalanceid1(s1);
      // console.log("balance",s1,id1Token)
      // let s2 = await find_balance(id2Token);
      // setbamalanceid2(s2);
      // console.log("balance",s2,id2Token)
    }
    
   
  }
  const callfirst =async()=>{

    let pk1 = await priceOfCoin1();
      setAlgoPrice(pk1);
      setpc1(pk1);
      // setpc2(pk1);
  //console.log("pk1",pk1);
    let pk2 = await priceOfCoin2();
    setpc2(pk2);
    // setpc2(pk2);
    setUsdcPrice(pk2);
  //console.log("pk2",pk2);
    if(tk1 == "Algo" || tk1 === "ALGO"){
      setpc1(pk1);
    }
    if(tk2 == "USDC" || tk2 === "usdc"){
      setpc2(pk2);
    }
  }
  const callp1 =() =>{
    if(tk1){
    //console.log("tk1")
       call_price1();
    }
  }
  const callp2 =() =>{
    if(tk2){
       call_price2();
    }
  }
  
  const call_price1 =async()=>{
    let p1;
  //console.log("k1",tk1)
    if(tk1 === "Algo"|| tk1=== "ALGO"){
      p1 =  algoPrice;
    //console.log("first",p1);
    }
    else if(tk1 === "USDC"){
    //console.log("firstvalue",p1);
      p1 = usdcPrice;
    //console.log("first",p1);
    }
  //console.log("p1",p1)
    setpr1(p1);
    // setpc1(p1);
  }
  const call_price2 =async()=>{
    let p2;
    if(tk2 === "Algo"|| tk2=== "ALGO"){
     p2 = algoPrice;
    }
    else if(tk2 === "USDC"){
      p2 = usdcPrice;
    }
  //console.log("p2",p2)
    setpr2(p2);
    // setpc1(p2)
  }
  const pricelisting=async(s1,s2)=>{
    let p1 =await asset1_price(s1,s2);
  //console.log("p1",p1)
    setprice1(p1);
    let p2 = await asset2_price(s1,s2);
    setprice2(p2);
  }
   
    const waitForConfirmation = async function (algodclient, txId) {
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
            //Got the completed Transaction
            // console.log(
            //   "Transaction " +
            //     txId +
            //     " confirmed in round " +
            //     pendingInfo["confirmed-round"]
            // );
            break;
          }
          lastRound++;
          await algodclient.statusAfterBlock(lastRound).do();
        }
      };
  
    //   async function readLocalState(client, account, index1){
    //       let accountInfoResponse = await client.accountInformation(account).do();
    //       console.log("accinfo",accountInfoResponse);
    //       if(accountInfoResponse['apps-local-state'].length > 0){
    //         for(let i = 0; i< accountInfoResponse['apps-local-state'][0]['key-value'].length;i++){
    //           if(accountInfoResponse['apps-local-state'][0]['key-value'][i]['key'] === "czE="){
    //            sets1(accountInfoResponse['apps-local-state'][0]['key-value'][i]['value']['uint'])
    //            console.log(accountInfoResponse['apps-local-state'][0]['key-value'][i]['value']['uint'])
    //           }
    //           else if(accountInfoResponse['apps-local-state'][0]['key-value'][i]['key'] === "czI="){
    //            sets2(accountInfoResponse['apps-local-state'][0]['key-value'][i]['value']['uint'])
    //            console.log(accountInfoResponse['apps-local-state'][0]['key-value'][i]['value']['uint'])
    //           }
    //           else if(accountInfoResponse['apps-local-state'][0]['key-value'][i]['key'] ===  "aWx0"){
    //            setilt(accountInfoResponse['apps-local-state'][0]['key-value'][i]['value']['uint'])
    //            console.log(accountInfoResponse['apps-local-state'][0]['key-value'][i]['value']['uint'])
    //           }
    //         }
    //       }
         
    //       // for (let i = 0; i < accountInfoResponse['apps-local-state'].length; i++) { 
    //       //   if (accountInfoResponse['apps-local-state'][i].id == index1) {
    //       //       console.log("Application's global state:");
    //       //       for (let n = 0; n < accountInfoResponse['apps-local-state'][i]['key-value'].length; n++) {
    //       //          // console.log(accountInfoResponse['apps-local-state'][i]['key-value']);
    //       //           let enc = accountInfoResponse['apps-local-state'][i]['key-value'][n];
    //       //           if(enc['key'] === "czE="){
    //       //             sets1(enc.value.uint)
    //       //           }
    //       //           if(enc['key'] === "czI="){
    //       //             sets2(enc.value.uint)
    //       //           }
    //       //           if(enc['key'] === "aWx0"){
    //       //             setilt(enc.value.uint)
    //       //           }             
    //       //       }
                
    //   //        }
    //   //   }
    //   }
const swap = async (appid,asset_in_amount,assetout_amount) => {
      // await optinassert();
    // console.log("Ass",AssetId1,AssetId2,asset_in_amount)
      let tokenid1;
      if(AssetId1 === ""|| AssetId1===undefined || AssetId1===null){
        setAssetId1(0);
         tokenid1 = 0;
     }
     else{
      tokenid1 = AssetId1;
     }
      if(tk1 === "ALGO"){
        localStorage.setItem("tokenid1","0");
      }
      
       if(tk2 === "TAU"){
        localStorage.setItem("tokenid2",71682000);
      }
        // let tokenid1 = AssetId1;
        let tokenid2 = AssetId2;
        let index = parseInt(appid);
      //console.log("appId inside donate", index);
  
        setAppId(appid);
        let tt1;
        let tt2;
          if(tokenid1 > tokenid2){
              tt1 =tokenid1;
              tt2 = tokenid2;
          }
          else{
              tt1 =tokenid2;
              tt2 = tokenid1;
          }
      //console.log("data",tt1)
      //console.log("data1",tt2)
        
     
          let edata = await escrowdatacompile(appID_global,tt1,tt2);
        
        // let escrowaddress = edata.hash()
      //console.log("escrow",edata)
        let accountInfoResponse = await algodClientGet.accountInformation(edata.hash).do();
      //console.log("account",accountInfoResponse);
        let assetId3 = accountInfoResponse['created-assets'][0]['index'];
      //console.log('Asset 3 ID: ', assetId3);
      
      
    
        // let program = new Uint8Array(Buffer.from(edata.logic, "base64"));
    
        // let lsig = algosdk.makeLogicSig(program);
        // let lsig = edata;
        
    let program = new Uint8Array(Buffer.from(edata.result, "base64"));

    let lsig = algosdk.makeLogicSig(program);
  // console.log("Escrow =", lsig.address()); 
      //console.log("Escrow =", lsig.address()); 
  
        // readLocalState(algodClient,escrowaddress,appId);
        
     //console.log(s1)
       let r1,r2;
       let t1 ,t2;
          
        let dtdata = await escrowdatacompile(appID_global,parseInt(AssetId1),parseInt(AssetId2));
      // console.log("dtdata",dtdata)
        let compiled = await readingLocalstate(algodClientGet,dtdata.hash)
        let reserve1 = await assert1Reserve(compiled);
        let reserve2 = await assert2Reserve(compiled); 
        let reserve3 = await assert3Reserve(compiled); 
        if(tokenid1 > tokenid2){
          r1 = reserve1;
          r2 = reserve2;
          
      }
      else{
          r1 = reserve2;
          r2 = reserve1;
          // t1 = tokenid1;
          // t2 = tokenid2;
      }
          
          let vl = reserve1 + reserve2 + reserve3;
          let tvl = reserve1 + reserve2;
        // let k = r1 * r2 ;
        // let asset_in_amount_minus_fee = (asset_in_amount * 997) / 1000
            
        // let swap_fees = asset_in_amount - asset_in_amount_minus_fee
            
        // let l = asset_in_amount_minus_fee - swap_fees;
        // let asset_out_amount_withoutfees = r2 - (k / (r1 + l ))
        // let asset_out_amount = amount_out_with_slippage(asset_out_amount_withoutfees,fee);

        let k = r1 * r2 ;
        let asset_in_amount_minus_fee = (asset_in_amount * 997) / 1000
            
        let swap_fees = asset_in_amount - asset_in_amount_minus_fee
            
        // let l = asset_in_amount_minus_fee - swap_fees;
        // let asset_out_amount_withoutfees = r2 - (k / (r1 + asset_in_amount_minus_fee ))
        
        let asset_out_amount_withoutfees = (asset_in_amount * 997 * r2) / ((r1 * 1000) +(asset_in_amount * 997))
      let asset_out_amount = amount_out_with_slippage(asset_out_amount_withoutfees,fee);
let minus_amount = asset_out_amount_withoutfees > asset_out_amount
console.log("minus_amount",minus_amount)
        // let asset_out_amount = amount_out_with_slippage(assetout_amount,fee);
        let am1;
        let am2;
      // console.log("tokenidvalues",tokenid1,tokenid2)
      
    // console.log("am1",am1,am2)
        if(swapv){
          t1 = tokenid1;
          t2 = tokenid2;
        //   if(tokenid1 > tokenid2){
            am1 = asset_in_amount;
            am2 = asset_out_amount;
        // }
        // else{
        //   am2 = asset_in_amount;
        //   am1 = asset_out_amount;
        // }
        } 
        else{
          t1 = tokenid2;
          t2 = tokenid1;
          am2 = asset_in_amount;
          am1 = asset_out_amount;
        }  
       
        

      //console.log("amount",asset_in_amount,asset_out_amount)
        
        try {
  
          const params = await algodClient.getTransactionParams().do();
          
        // toast.info("Optin Completed");
          
          let sender = localStorage.getItem("walletAddress");
          let recv_escrow = lsig.address();
          let amount = 2000;
        // console.log("tk1&tk2",tk1,tk2,am1,am2)

          let transaction1 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
            from: sender, 
            to: recv_escrow, 
            amount: amount,  
             suggestedParams: params
           });
         
           let appArg = [];
           appArg.push(new Uint8Array(Buffer.from("swap")));
           appArg.push(new Uint8Array(Buffer.from("fi")));
  
           let foreignassets = [];
  
           if(parseInt(t1)==0){
            // foreignassets.push(parseInt(tokenid1));
            foreignassets.push(parseInt(t2));
            foreignassets.push(parseInt(assetId3));
           }
           else if(parseInt(t2)==0){
            foreignassets.push(parseInt(t1));
            // foreignassets.push(parseInt(tokenid2));
            foreignassets.push(parseInt(assetId3));
           }
           else{
            foreignassets.push(parseInt(t1));
            foreignassets.push(parseInt(t2));
            foreignassets.push(parseInt(assetId3));
           }
           
         // console.log("tk1&tk2",tk1,tk2,am1,am2)

           const transaction2 = algosdk.makeApplicationNoOpTxnFromObject({
               from: recv_escrow, 
               appIndex: index,
               appArgs: appArg,
               appAccounts:sender,
               accounts: [sender],
               foreignAssets:foreignassets,
               suggestedParams: params
             });
             let transaction3;
             let transaction4;
             if(parseInt(t1)==0){
              transaction3 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
                from: sender,
                to: recv_escrow,
                note: undefined,
                accounts:sender,
                amount: parseInt(am1), 
                suggestedParams: params
              });
             }
             else{
             //console.log("asset1",t1);
              transaction3 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                from: sender,
                to: recv_escrow,
                assetIndex: parseInt(t1),
                note: undefined,
                accounts:sender,
                amount: parseInt(am1), 
                suggestedParams: params
              });
             }
            
            if(parseInt(t2)==0){
             transaction4 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
                from: recv_escrow ,
                to: sender,               
                note: undefined,
                accounts: recv_escrow,
                amount: (parseInt(am2)),
                suggestedParams: params
              });
            }
            else{
              transaction4 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                from: recv_escrow ,
                to: sender,
                assetIndex:parseInt(t2), 
                note: undefined,
                accounts: recv_escrow,
                amount: (parseInt(am2)),
                suggestedParams: params
              });
            }
          // console.log("tk1&tk2",tk1,tk2,am1,am2)
   let newescrow = escrowProgram2;
   let results1 = await algodClient.compile(newescrow).do(); 
 console.log("escrownew",results1.hash)  
   let program1 = new Uint8Array(Buffer.from(results1.result, "base64"));
    
        let lsig1 = algosdk.makeLogicSig(program1);
           let transaction5 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
              from: results1.hash ,
              to: sender,
              assetIndex:parseInt(elemToken), 
              note: undefined,
              accounts: recv_escrow,
              amount: (parseInt(swap_fees)),
              suggestedParams: params
            });
            
            
          const groupID = algosdk.computeGroupID([ transaction1, transaction2, transaction3, transaction4,transaction5]);
          const txs = [ transaction1, transaction2, transaction3, transaction4, transaction5];
          for (let i = 0; i <= 4; i++) txs[i].group = groupID;
        
          const signedTx2 = algosdk.signLogicSigTransaction(txs[1], lsig);
          const signedTx4 = algosdk.signLogicSigTransaction(txs[3], lsig);
          const signedTx5 = algosdk.signLogicSigTransaction(txs[4], lsig1);
          const signedTxnarray = await myAlgoWallet.signTransaction([txs[0].toByte(),txs[2].toByte()]);
          toast.info("Swapping in Progress");
      const response = await algodClient.sendRawTransaction([signedTxnarray[0].blob, signedTx2.blob, signedTxnarray[1].blob, signedTx4.blob, signedTx5.blob]).do();
    //console.log("TxID", JSON.stringify(response, null, 1));
    //   setTxId(response.txId);
    //   setShow(true);
      await waitForConfirmation(algodClient, response.txId);
     let an = tk1 +"/"+tk2;
      // await postusertx(localStorage.getItem("walletAddress"),response.txId,recv_escrow,"Swap",tvl,asset_in_amount,tk1,tk2,amount);
      // await createtxhash(recv_escrow,response.txId,"SWAP",asset_in_amount,an)
      // await updatepairhistory(tokenid1,tokenid2,amount,tvl,vl);
      await updateusedetails(tt1,tt2,tvl,vl,swap_fees);
      await postusertx(recv_escrow,response.txId,"SWAP",asset_in_amount,an)
      if(dvalue){
        setsamount1(0)
        setsamount2(0)
      }
      else{
        setdvalue(true)
        setsamount1(0)
        setsamount2(0)
      }
      
      toast.success(`Swapping Completed Successfully ${response.txId}`);    
      toast.info("Swapping Completed"); 

     
        

      
    } catch (err) {
          toast.error(`Transaction Failed due to ${err}`);
        //console.error(err);
        }
      };
  
      const setvalueA1 =async(asset_in_amount)=>{
        let dtdata;
        setsamount1(asset_in_amount);
        if(AssetId1 === ""|| AssetId1===undefined || AssetId1===null){
           dtdata = await escrowdatacompile(appID_global,0,AssetId2);
        }
        else{
           dtdata = await escrowdatacompile(appID_global,AssetId1,AssetId2);
        }
      // console.log("dtdata",dtdata)
        let compiled = await readingLocalstate(algodClientGet,dtdata.hash)
        let reserve1 = await assert1Reserve(compiled);
        let reserve2 = await assert2Reserve(compiled);
        // let asid = await asset1WithId(compiled);
        // console.log("asid",compiled,reserve2,dtdata)
          callp1();
        //console.log("asset_in_amount",asset_in_amount)
          setpc1(pr1 * (asset_in_amount/1000000));
          // if(tk1 === "ALGO"){
          //   localStorage.setItem("tokenid1","0");
          // }
          // else if(tk2 === "ALGO"){
          //   localStorage.setItem("tokenid2","0");
          // }
          let r1,r2;
          let tokenid1 = AssetId1;
          let tokenid2 = AssetId2;
          if(tokenid1 > tokenid2){
              r1 = reserve1;
              r2 = reserve2;
          }
          else{
              r1 = reserve2;
              r2 = reserve1;
          }
          pricelisting(s1,s2);
          setswf((asset_in_amount)/1000000 * 0.003);
          set_inp_goal(asset_in_amount);
          let k = r1 * r2 ;
        //console.log('s1', s1);
        //console.log('s2', s2);
          let asset_in_amount_minus_fee = (asset_in_amount * 997) / 1000;
        //console.log('asset_in_amount', asset_in_amount);
              
          let swap_fees = asset_in_amount - asset_in_amount_minus_fee;
        //console.log('swap_fees', swap_fees);
          setswapfees(swap_fees)
              
          let l = asset_in_amount_minus_fee - swap_fees;
        //console.log('l', l);
  
          let asset_out_amount = r2 - (k / (r1 + l ))   ;
          let asswithfee = amount_out_with_slippage(asset_out_amount,fee);
        //console.log("asswithfee",asswithfee);
          setasswithfee(asswithfee)
          
          setsamount2(asset_out_amount);
          setswapdetail(true);
          if(reserve1 <=0 || reserve2 <=0  || asset_in_amount > r1 || asset_out_amount > r2){
            setsufficient(true);
          }
          else{
            setsufficient(false);
          }
      
      }
  
      const setvalueA2=async(asset_out)=>{
        let dtdata;
        setsamount2(asset_out);
      //console.log("asset_out",asset_out)
        if(AssetId1 === ""|| AssetId1===undefined || AssetId1===null){
            dtdata = await escrowdatacompile(appID_global,0,AssetId2);
        }
        else{
            dtdata = await escrowdatacompile(appID_global,AssetId1,AssetId2);
        }
      // console.log("dtdata",dtdata)
        let compiled = await readingLocalstate(algodClientGet,dtdata.hash)
        let reserve1 = await assert1Reserve(compiled);
        let reserve2 = await assert2Reserve(compiled);
      // console.log("dtdata",reserve1,reserve2,dtdata)
        callp2();
        setpc2(pr2 * (asset_out/1000000));
        if(tk1 === "ALGO"){
          localStorage.setItem("tokenid1","0");
        }
        else if(tk2 === "ALGO"){
          localStorage.setItem("tokenid2","0");
        }
        //   first();
        let tokenid1 = reserve1;
        let tokenid2 = reserve2;
          let r1,r2;
          if((AssetId1) > (AssetId2)){
              r1 = tokenid2;
              r2 = tokenid1;
          }
          else{
              r1 = tokenid1;
              r2 = tokenid2;
          }
          pricelisting(tokenid2,tokenid1);
          let k = r1 * r2 ;
        console.log('s1', k);
        //console.log('s2', s2);
          let asset_in_amount_minus_fee = (asset_out * 997) / 1000;
        
              
          let swap_fees = asset_out - asset_in_amount_minus_fee;
        //console.log('swap_fees', swap_fees);
          setswapfees(swap_fees)
              
          let l = asset_in_amount_minus_fee - swap_fees;
        //console.log('l', l);
  
          let asset_out_amount = r2 - (k / (r1 + l ));
          // console.log('asset_in_amount', fee);
          let asswithfee = amount_out_with_slippage(asset_out_amount,fee);
          setasswithfee(asswithfee)
          setswf((asset_out_amount)/1000000 * 0.003);
        //console.log("s",asset_out_amount);
          set_inp_goal(asset_out_amount);
          
          setsamount1(asset_out_amount);
          setswapdetail(true);
          if(reserve1 <=0 || reserve2 <=0  || asset_out > r1 || asset_out_amount > r2){
            setsufficient(true);
          }
          else{
            setsufficient(false);
          }
      
    
    }
    function setvalueA1duplicate(asset_in_amount){
      callp1();
      setpc1(pr1 * (asset_in_amount/1000000));
      if(a.name1 === "ALGO"){
        localStorage.setItem("tokenid1","0");
      }
      else if(a.name2 === "ALGO"){
        localStorage.setItem("tokenid2","0");
      }
      let r1,r2;
      let tokenid1 = AssetId1;
      let tokenid2 = AssetId2;
      if(tokenid1 > tokenid2){
          r1 = a.a;
          r2 = a.b;
      }
      else{
          r1 = a.b;
          r2 = a.a;
      }
      pricelisting(a.a,a.b);
      setswf((asset_in_amount)/1000000 * 0.003);
      set_inp_goal(asset_in_amount);
      let k = r1 * r2 ;
    //console.log('s1', a.a);
    //console.log('s2', a.b);
      let asset_in_amount_minus_fee = (asset_in_amount * 997) / 1000;
    //console.log('asset_in_amount', asset_in_amount);
          
      let swap_fees = asset_in_amount - asset_in_amount_minus_fee;
    //console.log('swap_fees', swap_fees);
      setswapfees(swap_fees)
          
      let l = asset_in_amount_minus_fee - swap_fees;
    //console.log('l', l);

      let asset_out_amount = r2 - (k / (r1 + l ))   ;
      let asswithfee = amount_out_with_slippage(asset_out_amount,fee);
    //console.log("asswithfee",asswithfee);
      setasswithfee(asswithfee)
      setsamount1(asset_in_amount);
      setsamount2(asset_out_amount);
      setswapdetail(true);
      if(a.a<=0 || a.b <=0){
        setsufficient(true);
      }
      else{
        setsufficient(false);
      }
  
  }
  function setvalueA2duplicate(asset_out){
    callp2();
    setpc2(pr2 * (asset_out/1000000));
    if(a.name1 === "ALGO"){
      localStorage.setItem("tokenid1","0");
    }
    else if(a.name2 === "ALGO"){
      localStorage.setItem("tokenid2","0");
    }
    //   first();
    let tokenid1 = AssetId1;
    let tokenid2 = AssetId2;
      let r1,r2;
      if(tokenid1 > tokenid2){
          r1 = a.b;
          r2 = a.a;
      }
      else{
          r1 = a.a;
          r2 = a.b;
      }
      pricelisting(a.a,a.b);
      let k = r1 * r2 ;
      // console.log('s1', s1);
      // console.log('s2', s2);
      let asset_in_amount_minus_fee = (asset_out * 997) / 1000;
    //console.log('asset_in_amount', asset_out);
          
      let swap_fees = asset_out - asset_in_amount_minus_fee;
    //console.log('swap_fees', swap_fees);
      setswapfees(swap_fees)
          
      let l = asset_in_amount_minus_fee - swap_fees;
    //console.log('l', l);

      let asset_out_amount = r2 - (k / (r1 + l ));
      let asswithfee = amount_out_with_slippage(asset_out_amount,fee);
      setasswithfee(asswithfee)
      setswf((asset_out_amount)/1000000 * 0.003);
    //console.log("s",asset_out_amount);
      set_inp_goal(asset_out_amount);
      setsamount2(asset_out);
      setsamount1(asset_out_amount);
      setswapdetail(true);
      if(a.a<=0 || a.b <=0){
        setsufficient(true);
      }
      else{
        setsufficient(false);
      }
  

}
     
const optinassert =async () => {
        // history.replace({pathname: '/swap', state: { detail: null }})
        // let assetidvalue = await walletAsset(indexerClient,localStorage.getItem("walletAddress"))
        // //  let assetidvalue = await indexerClient.lookupAccountByID(localStorage.getItem("walletAddress")).do();
        //      console.log("assetid",AssetId2);
        //      let k =0;
        //      let k1 =0;
        //     //  setMax2(true);
            
        //      assetidvalue.map((r,i)=>{
        //             if(parseInt(AssetId2) === 0){
        //               k = 1;
        //             }
        //          else if(r['asset-id'] === parseInt(AssetId2)){
        //              k = 1;
        //              console.log("max value",k)                 
        //             }
                  
        //           if(r['asset-id'] === parseInt(elemToken)){
        //             k1 = 1;
        //             console.log("max value",k)                 
        //          }
        //         }
        //        )


//         if(AssetId2 === 0 || k === 1){
//           if(k1 === 1){
//               setoswapopt(false);
//           }
//           else{
//             let optinTranscation1 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
//               from:localStorage.getItem("walletAddress"),
//               to :localStorage.getItem("walletAddress"),
//               assetIndex: parseInt(elemToken) ,
//               amount: 0,
//               suggestedParams:params
//             });
          
            
              
//             const signedTx11 = await myAlgoWallet.signTransaction(optinTranscation1.toByte());
//             toast.info("Transaction in Progress");
          
//             const response1 = await algodClient.sendRawTransaction(signedTx11.blob).do();
//             await waitForConfirmation(algodClient, response1.txId);
//             toast.success(`Opt-In Completed Success ${response1.txId}`);
//             setoswapopt(false);
//           }
          
//         }
// else{
//       if(k1 === 1){
//       const algodClient = new algosdk.Algodv2('', 'https://api.testnet.algoexplorer.io', '');
//             const params = await algodClient.getTransactionParams().do();
//       try {
        

//         let optinTranscation = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
//           from:localStorage.getItem("walletAddress"),
//           to :localStorage.getItem("walletAddress"),
//           assetIndex: parseInt(localStorage.getItem("tokenid2")) ,
//           amount: 0,
//           suggestedParams:params
//         });

        
          
//           const signedTx1 = await myAlgoWallet.signTransaction(optinTranscation.toByte());
//           toast.info("Transaction in Progress");

//       const response = await algodClient.sendRawTransaction(signedTx1.blob).do();
//     //console.log("TxID", JSON.stringify(response, null, 1));
//       await waitForConfirmation(algodClient, response.txId);
      
//     //console.log("TxID", JSON.stringify(response1, null, 1));

    
//       // await postusertx(localStorage.getItem("walletAddress"),response.txId,0,"Opt-In Asset",0,0,"","","3000");
//       setoswapopt(false);
//       toast.success(`Opt-In Completed Success ${response.txId}`);
//       setoswapopt(false);
//         } catch (err) {
//           toast.error(`Transaction Failed due to ${err}`);
//           //console.error(err);
//         }}
//         else{
  const params = await algodClient.getTransactionParams().do();
 if(parseInt(AssetId2) === parseInt(elemToken)){
  let optinTranscation1 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
    from:localStorage.getItem("walletAddress"),
    to :localStorage.getItem("walletAddress"),
    assetIndex: parseInt(elemToken) ,
    amount: 0,
    suggestedParams:params
  });

  const signedTx11 = await myAlgoWallet.signTransaction(optinTranscation1.toByte());
  toast.info("Transaction in Progress");
  
  const response1 = await algodClient.sendRawTransaction(signedTx11.blob).do();
  await waitForConfirmation(algodClient, response1.txId);
  toast.success(`Opt-In Completed Success ${response1.txId}`);
  await swap(appID_global,samount1,samount2)
 }
else if(parseInt(AssetId2) === 0){
  let optinTranscation1 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
    from:localStorage.getItem("walletAddress"),
    to :localStorage.getItem("walletAddress"),
    assetIndex: parseInt(elemToken) ,
    amount: 0,
    suggestedParams:params
  });

  const signedTx11 = await myAlgoWallet.signTransaction(optinTranscation1.toByte());
  toast.info("Transaction in Progress");
  
  const response1 = await algodClient.sendRawTransaction(signedTx11.blob).do();
  await waitForConfirmation(algodClient, response1.txId);
  toast.success(`Opt-In Completed Success ${response1.txId}`);
  await swap(appID_global,samount1,samount2)
}
else
{
  let optinTranscation1 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
    from:localStorage.getItem("walletAddress"),
    to :localStorage.getItem("walletAddress"),
    assetIndex: parseInt(elemToken) ,
    amount: 0,
    suggestedParams:params
  });

  
    
 


let optinTranscation = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
from:localStorage.getItem("walletAddress"),
to :localStorage.getItem("walletAddress"),
assetIndex: parseInt(localStorage.getItem("tokenid2")) ,
amount: 0,
suggestedParams:params
});

const groupID = algosdk.computeGroupID([ optinTranscation1, optinTranscation]);
const txs = [ optinTranscation1, optinTranscation];
for (let i = 0; i <= 1; i++) txs[i].group = groupID;



const signedTx11 = await myAlgoWallet.signTransaction([txs[0].toByte(),txs[1].toByte()]);
toast.info("Transaction in Progress");

const response1 = await algodClient.sendRawTransaction([signedTx11[0].blob,signedTx11[1].blob]).do();
await waitForConfirmation(algodClient, response1.txId);
toast.success(`Opt-In Completed Success ${response1.txId}`);
await swap(appID_global,samount1,samount2);
}

  //     const algodClient = new algosdk.Algodv2('', 'https://api.testnet.algoexplorer.io', '');
  //     const params = await algodClient.getTransactionParams().do();

  //       const signedTx1 = await myAlgoWallet.signTransaction(optinTranscation.toByte());
  //       toast.info("Transaction in Progress");

  //   const response = await algodClient.sendRawTransaction(signedTx1.blob).do();
  // //console.log("TxID", JSON.stringify(response, null, 1));
  //   await waitForConfirmation(algodClient, response.txId);
    
  //console.log("TxID", JSON.stringify(response1, null, 1));

  
    // await postusertx(localStorage.getItem("walletAddress"),response.txId,0,"Opt-In Asset",0,0,"","","3000");
    // setoswapopt(false);
    
    // setoswapopt(false);
      
//         }
    
// }
  
      

     
  }

  const feesAmount =(f) =>{
    setfees(f);
    handleCloseModal();
  }
  const setpChange =() =>{
    if(pricechange){
      setpricechange(false)
    }
    else{
      setpricechange(true)
    }
    
  }

const changetokens =()=>{
  setSwapv(!swapv)
  setsamount1(0)
  setsamount2(0)
  // let a = tk1;
  // let b = tk2;
  // // sett1(a) 
  // sett1(b);
  // sett2(a);
  //console.log("clicking")
  // localStorage.setItem("tokenid1","0");
  //console.log("tkvalues",tk1,tk2)
  // //console.log("tkvalues",tk1,tk2)

}

const appOptIn = async () =>
{
  const myAlgoWallet = new MyAlgoConnect();
  // const algodClient = new algosdk.Algodv2('', 'https://api.testnet.algoexplorer.io', '');
  
  
  
  let index = parseInt(appID_global);
  // console.log("appId inside donate", index)
try {
 
  const params = await algodClient.getTransactionParams().do();

  let optinTranscation = algosdk.makeApplicationOptInTxnFromObject({
    from:localStorage.getItem("walletAddress"),
    suggestedParams:params,
    appIndex:index
  });

  
    
    const signedTx1 = await myAlgoWallet.signTransaction(optinTranscation.toByte());
    
    toast.info("Transaction in Progress");
const response = await algodClient.sendRawTransaction(signedTx1.blob).do();
// console.log("TxID", JSON.stringify(response, null, 1));
await waitForConfirmation(algodClient, response.txId);

// await postusertx(localStorage.getItem("walletAddress"),response.txId,0,"Opt-In App",0,0,"","",0);

await postusertx("-",response.txId,"App Opt-In","-","-")
toast.success(`Transaction Success ${response.txId}`);
setOpted(true)
  } catch (err) {
    toast.error(`Transaction Failed due to ${err}`);
    // console.error(err);
  }
}

    return (
        <Layout>
        <><ToastContainer position='top-center' draggable = {false} transition={Zoom} autoClose={8000} closeOnClick = {false}/></>

            <div className="page-content">

            <Modal centered size="lgmd" show={showModal} onHide={handleCloseModal}>
              <Modal.Body>
                <Button className='modal-close' onClick={handleCloseModal} variant='reset'>
                  <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g opacity="1">
                      <path d="M17.5004 32.0832C9.44597 32.0832 2.91699 25.5542 2.91699 17.4998C2.91699 9.44546 9.44597 2.9165 17.5004 2.9165C25.5548 2.9165 32.0837 9.44546 32.0837 17.4998C32.0837 25.5542 25.5548 32.0832 17.5004 32.0832ZM17.5004 29.1665C20.5946 29.1665 23.562 27.9373 25.75 25.7494C27.9379 23.5615 29.1671 20.594 29.1671 17.4998C29.1671 14.4056 27.9379 11.4382 25.75 9.25026C23.562 7.06233 20.5946 5.83317 17.5004 5.83317C14.4062 5.83317 11.4387 7.06233 9.25076 9.25026C7.06283 11.4382 5.83367 14.4056 5.83367 17.4998C5.83367 20.594 7.06283 23.5615 9.25076 25.7494C11.4387 27.9373 14.4062 29.1665 17.5004 29.1665ZM17.5004 15.4378L21.6245 11.3121L23.6881 13.3757L19.5625 17.4998L23.6881 21.624L21.6245 23.6875L17.5004 19.5619L13.3762 23.6875L11.3126 21.624L15.4383 17.4998L11.3126 13.3757L13.3762 11.3121L17.5004 15.4378Z" fill="white"/>
                      </g>
                  </svg>
                </Button>

                <h3 className="h3 mb-0">SLIPPAGE TOLERANCE</h3>  

                <div className="pt-md-5 pt-3">
                  <Row className='mb-30'>
                    <Col sm={4} className='mb-2'>
                        <input type="radio" hidden id='radio1' name="amount" />
                        <label htmlFor="radio1"  variant="grad" className='btn btn-default px-2 w-100' onClick={()=>feesAmount(0.05)} >0.05%</label>
                        {/* <Button className='mt-4 btn btn-xl w-100 btn-grad' onClick={()=>feesAmount(0.05)}>0.05%</Button> */}
                    </Col>
                    <Col sm={4} className='mb-2'>
                        <input type="radio" hidden id='radio2' name="amount" />
                        <label htmlFor="radio1"  variant="grad" className='btn btn-default px-2 w-100' onClick={()=>feesAmount(0.01)} >0.01%</label>

                        {/* <Button className='mt-4 btn btn-xl w-100 btn-grad' onClick={()=>feesAmount(0.01)}>0.01%</Button> */}
                    </Col>
                    <Col sm={4} className='mb-2'>
                    <label htmlFor="radio1"  variant="grad" className='btn btn-default px-2 w-100' onClick={()=>feesAmount(0.5)} >0.5%</label>

                        <input type="radio" hidden id='radio3' name="amount" />
                        {/* <Button className='mt-4 btn btn-xl w-100 btn-grad' onClick={()=>feesAmount(0.5)}>0.5%</Button> */}
                    </Col>
                    {/* <Col sm={12} md={3} className='mb-md-2'>
                      <InputGroup className='mb-2 py-2 input-reload'>
                        <FormControl
                          className='m-0 form-control py-0 pe-1 ps-2  border-0 text-white'
                          aria-label="Recipient's username"
                          aria-describedby="basic-addon2"
                        />
                        <InputGroup.Text id="basic-addon2" style={{opacity: '0.5'}} className='px-1'>0.50%</InputGroup.Text>
                      </InputGroup>
                    </Col> */}
                  </Row>
                </div>
              </Modal.Body>
              
            </Modal>
                <Container>
                    <Row className='justify-content-center'>
                        <Col lg={6} className='mb-lg-0 mb-4 order-lg-2'>
                            <div className="card-base card-shadow card-dark">
                                {/* <h6 className='text-uppercase mb-4'></h6> */}


                                <Tabs defaultActiveKey="swap" className='tabs-normal'>
                                  <Tab eventKey="swap" title="Swap">
                                    <div className="d-flex mb-1 justify-content-end">
                                      <Row className='align-items-center mb-3'>
                                        <Col>
                                        {appOpted ? (<></>):
                                        (<>
                                        <button className='btn btn-grad' onClick={()=>appOptIn()}>App Opt-In</button>

                                        </>)}
                                      </Col>
                                      <Col>
                                      <button className='btn btn-grad' onClick={handleShowModal}>Slippage Tolerance Config</button>

                                          {/* <Button variant='reset' onClick={handleShowModal}> */}
                                            {/* <svg width="24" height="29" viewBox="0 0 24 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <path d="M6.17 21.4721C6.3766 20.8052 6.75974 20.2278 7.2666 19.8193C7.77346 19.4109 8.37909 19.1915 9 19.1915C9.62091 19.1915 10.2265 19.4109 10.7334 19.8193C11.2403 20.2278 11.6234 20.8052 11.83 21.4721H22V23.7499H11.83C11.6234 24.4167 11.2403 24.9942 10.7334 25.4027C10.2265 25.8111 9.62091 26.0305 9 26.0305C8.37909 26.0305 7.77346 25.8111 7.2666 25.4027C6.75974 24.9942 6.3766 24.4167 6.17 23.7499H2V21.4721H6.17ZM12.17 13.4999C12.3766 12.833 12.7597 12.2556 13.2666 11.8471C13.7735 11.4386 14.3791 11.2193 15 11.2193C15.6209 11.2193 16.2265 11.4386 16.7334 11.8471C17.2403 12.2556 17.6234 12.833 17.83 13.4999H22V15.7777H17.83C17.6234 16.4445 17.2403 17.022 16.7334 17.4304C16.2265 17.8389 15.6209 18.0582 15 18.0582C14.3791 18.0582 13.7735 17.8389 13.2666 17.4304C12.7597 17.022 12.3766 16.4445 12.17 15.7777H2V13.4999H12.17ZM6.17 5.52764C6.3766 4.86078 6.75974 4.28333 7.2666 3.87487C7.77346 3.46642 8.37909 3.24707 9 3.24707C9.62091 3.24707 10.2265 3.46642 10.7334 3.87487C11.2403 4.28333 11.6234 4.86078 11.83 5.52764H22V7.80542H11.83C11.6234 8.47228 11.2403 9.04973 10.7334 9.45819C10.2265 9.86665 9.62091 10.086 9 10.086C8.37909 10.086 7.77346 9.86665 7.2666 9.45819C6.75974 9.04973 6.3766 8.47228 6.17 7.80542H2V5.52764H6.17ZM9 7.80542C9.26522 7.80542 9.51957 7.68543 9.70711 7.47185C9.89464 7.25827 10 6.96858 10 6.66653C10 6.36448 9.89464 6.0748 9.70711 5.86121C9.51957 5.64763 9.26522 5.52764 9 5.52764C8.73478 5.52764 8.48043 5.64763 8.29289 5.86121C8.10536 6.0748 8 6.36448 8 6.66653C8 6.96858 8.10536 7.25827 8.29289 7.47185C8.48043 7.68543 8.73478 7.80542 9 7.80542ZM15 15.7777C15.2652 15.7777 15.5196 15.6577 15.7071 15.4441C15.8946 15.2305 16 14.9408 16 14.6388C16 14.3367 15.8946 14.047 15.7071 13.8334C15.5196 13.6199 15.2652 13.4999 15 13.4999C14.7348 13.4999 14.4804 13.6199 14.2929 13.8334C14.1054 14.047 14 14.3367 14 14.6388C14 14.9408 14.1054 15.2305 14.2929 15.4441C14.4804 15.6577 14.7348 15.7777 15 15.7777ZM9 23.7499C9.26522 23.7499 9.51957 23.6299 9.70711 23.4163C9.89464 23.2027 10 22.913 10 22.611C10 22.3089 9.89464 22.0193 9.70711 21.8057C9.51957 21.5921 9.26522 21.4721 9 21.4721C8.73478 21.4721 8.48043 21.5921 8.29289 21.8057C8.10536 22.0193 8 22.3089 8 22.611C8 22.913 8.10536 23.2027 8.29289 23.4163C8.48043 23.6299 8.73478 23.7499 9 23.7499Z" fill="white"/>
                                          </svg> */}
                                          {/* Slippage Tolerance Config
                                          </Button> */}
                                          <DropdownButton
                                              as={ButtonGroup}
                                              drop={'start'}
                                              variant="secondary"
                                              className='dropdown-reset d-none'
                                              title={<svg width="24" height="29" viewBox="0 0 24 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                      <path d="M6.17 21.4721C6.3766 20.8052 6.75974 20.2278 7.2666 19.8193C7.77346 19.4109 8.37909 19.1915 9 19.1915C9.62091 19.1915 10.2265 19.4109 10.7334 19.8193C11.2403 20.2278 11.6234 20.8052 11.83 21.4721H22V23.7499H11.83C11.6234 24.4167 11.2403 24.9942 10.7334 25.4027C10.2265 25.8111 9.62091 26.0305 9 26.0305C8.37909 26.0305 7.77346 25.8111 7.2666 25.4027C6.75974 24.9942 6.3766 24.4167 6.17 23.7499H2V21.4721H6.17ZM12.17 13.4999C12.3766 12.833 12.7597 12.2556 13.2666 11.8471C13.7735 11.4386 14.3791 11.2193 15 11.2193C15.6209 11.2193 16.2265 11.4386 16.7334 11.8471C17.2403 12.2556 17.6234 12.833 17.83 13.4999H22V15.7777H17.83C17.6234 16.4445 17.2403 17.022 16.7334 17.4304C16.2265 17.8389 15.6209 18.0582 15 18.0582C14.3791 18.0582 13.7735 17.8389 13.2666 17.4304C12.7597 17.022 12.3766 16.4445 12.17 15.7777H2V13.4999H12.17ZM6.17 5.52764C6.3766 4.86078 6.75974 4.28333 7.2666 3.87487C7.77346 3.46642 8.37909 3.24707 9 3.24707C9.62091 3.24707 10.2265 3.46642 10.7334 3.87487C11.2403 4.28333 11.6234 4.86078 11.83 5.52764H22V7.80542H11.83C11.6234 8.47228 11.2403 9.04973 10.7334 9.45819C10.2265 9.86665 9.62091 10.086 9 10.086C8.37909 10.086 7.77346 9.86665 7.2666 9.45819C6.75974 9.04973 6.3766 8.47228 6.17 7.80542H2V5.52764H6.17ZM9 7.80542C9.26522 7.80542 9.51957 7.68543 9.70711 7.47185C9.89464 7.25827 10 6.96858 10 6.66653C10 6.36448 9.89464 6.0748 9.70711 5.86121C9.51957 5.64763 9.26522 5.52764 9 5.52764C8.73478 5.52764 8.48043 5.64763 8.29289 5.86121C8.10536 6.0748 8 6.36448 8 6.66653C8 6.96858 8.10536 7.25827 8.29289 7.47185C8.48043 7.68543 8.73478 7.80542 9 7.80542ZM15 15.7777C15.2652 15.7777 15.5196 15.6577 15.7071 15.4441C15.8946 15.2305 16 14.9408 16 14.6388C16 14.3367 15.8946 14.047 15.7071 13.8334C15.5196 13.6199 15.2652 13.4999 15 13.4999C14.7348 13.4999 14.4804 13.6199 14.2929 13.8334C14.1054 14.047 14 14.3367 14 14.6388C14 14.9408 14.1054 15.2305 14.2929 15.4441C14.4804 15.6577 14.7348 15.7777 15 15.7777ZM9 23.7499C9.26522 23.7499 9.51957 23.6299 9.70711 23.4163C9.89464 23.2027 10 22.913 10 22.611C10 22.3089 9.89464 22.0193 9.70711 21.8057C9.51957 21.5921 9.26522 21.4721 9 21.4721C8.73478 21.4721 8.48043 21.5921 8.29289 21.8057C8.10536 22.0193 8 22.3089 8 22.611C8 22.913 8.10536 23.2027 8.29289 23.4163C8.48043 23.6299 8.73478 23.7499 9 23.7499Z" fill="white"/>
                                                  </svg>}
                                          >
                                              <Dropdown.Item eventKey="1">Action</Dropdown.Item>
                                              <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
                                              <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
                                              <Dropdown.Divider />
                                              <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
                                          </DropdownButton>
                                          </Col>
                                      </Row>
                                      </div>

                                      <div className="mb-0">
                                        
                                          <label className='d-flex align-items-center justify-content-between'>From
                                          {(tk1 == "ALGO")||(tk1 == "Algo") ? (<><small>Price: 1 {tk1.toUpperCase()} = {algoPrice > 0.0000001 ? parseFloat(algoPrice).toFixed(2) : '0.0'} USD</small></>):
                                          (tk1 == "USDC")?(<><small>Price:1 {tk1.toUpperCase()} = {usdcPrice > 0.00001 ? parseFloat(usdcPrice).toFixed(2) :  '0.0'} USD</small></>):(<></>) }
                                                  
                                          </label>

                                              {/* <input type="text" onChange={(e) => setValue(e.target.value)} placeholder='Enter Token' className='form-control' value={value} />
                                      <div className="card-base card-dark card-token mb-30">      
                                  <input  type="text" onChange={(e) => setValue(e.target.value)} placeholder='Enter Token' className='form-control' value={value} />
                              </div> */}
      {dvalue ? (
      <>
      {swapv ? (
        <>
        <div className="balance-card d-flex align-items-center justify-content-between">

        <input type='number' id="sf" className='m-0 form-control p-0 border-0 text-white' placeholder='0.0'  autoComplete='off' value={ parseInt(samount1)/1000000 } onChange={event => setvalueA1((event.target.value)* 1000000)} />
        <FilterDropdown assetid1 = {AssetId1} setassetid1={(AssetId1)=>(setAssetId1(AssetId1))}  ass={ass1} setassets={(ass1)=>setAssets1(ass1)} setassetsn={(assn1)=>setAssetsn1(assn1)} assn = {assn1} setk = {(t1)=>sett1(t1)} setToken1Id={(ti1)=>{setTokenId1(ti1)}} setclicklogo1={(l1)=>{setlogo1(l1)}}></FilterDropdown>
        </div>
          {(tk1 == "ALGO")||(tk1 == "Algo")?(<><small>Balance:{ balanceid1 > 0 ? parseFloat(balanceid1/1000000).toFixed(2) : '0.0'}</small></>):(<><small>Balance:{(id1Token=== NaN||id1Token ===undefined||id1Token===null)?'0.0': parseFloat(id1Token/1000000).toFixed(2) } </small></>) }

          </>
      ):(<>
      <div className="balance-card d-flex align-items-center justify-content-between">
      <input type='number' className='m-0 form-control p-0 border-0 text-white' placeholder="0.0" autoComplete='off' value={(parseInt(samount2)/1000000)} onChange={event => setvalueA2((event.target.value)* 1000000)} />
      <FilterDropdown2 assetid2 = {AssetId2} setassetid2={(AssetId2)=>(setAssetId2(AssetId2))} ass={ass} setassets={(ass)=>setAssets(ass)} setassetsn={(assn)=>setAssetsn(assn)} assn = {assn} setMax ={(value)=>sets1(value)} setMax1 ={(value)=>sets2(value)} setMax2 ={(value)=>setoswapopt(value)} setMax3 ={(value)=>setesc(value)} setk1 ={(k1)=>sett2(k1)} setToken2Id={(ti2)=>{setTokenId2(ti2)}} setclicklogo2={(l2)=>{setlogo2(l2)}}/>
      </div>
                                          {/* {(tk2 == "TAU")?(<><small>Balance:{parseFloat(balanceid2).toFixed(2)}</small></>):(<> */}
                                          <small>Balance:{(id2Token=== NaN||id2Token ===undefined||id2Token===null)?'0.0':parseFloat(id2Token/1000000).toFixed(2)  } </small>
          
      </>)} 
      
      </>
      ):(swapv)?(<>
      <div className="balance-card d-flex align-items-center justify-content-between">

        <input type='number' id="sf" className='m-0 form-control p-0 border-0 text-white' placeholder='0.0'  autoComplete='off' value={ parseInt(samount1)/1000000 } onChange={event => setvalueA1duplicate((event.target.value)* 1000000)} />

        {/* <Button variant='filter'  > */}
                  {/* <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="">
                      <rect width="30.1212" height="30" rx="15" fill="#FA84B5"/>
                      <path d="M21.943 11.2538C21.4418 12.1245 20.965 12.8983 20.5494 13.6964C20.4394 13.914 20.3905 14.2284 20.4516 14.4582C21.1117 16.9612 21.7963 19.4642 22.4686 21.9671C22.5053 22.1122 22.542 22.2694 22.5909 22.4871C21.8452 22.4871 21.1728 22.5113 20.4883 22.4629C20.366 22.4508 20.1826 22.2211 20.146 22.0518C19.6937 20.4678 19.278 18.8837 18.8379 17.2997C18.8013 17.1788 18.7646 17.0579 18.7035 16.8644C18.5446 17.1304 18.4223 17.3239 18.3001 17.5295C17.4077 19.0651 16.5031 20.5887 15.6107 22.1364C15.464 22.3904 15.3051 22.4992 14.9994 22.4871C14.2904 22.4629 13.5814 22.475 12.7746 22.475C12.8968 22.2453 12.9824 22.076 13.0802 21.9067C14.596 19.307 16.0997 16.7193 17.6277 14.1317C17.7989 13.8415 17.8478 13.5997 17.75 13.2732C17.5055 12.463 17.2977 11.6287 17.0409 10.6976C16.9065 10.9274 16.8087 11.0725 16.7231 11.2176C14.6083 14.833 12.5056 18.4364 10.403 22.0639C10.2197 22.3904 10.0118 22.5113 9.63289 22.4992C8.96054 22.4629 8.27597 22.4871 7.53027 22.4871C7.64029 22.2694 7.72587 22.1122 7.81144 21.9671C10.5375 17.2997 13.2636 12.6444 15.9652 7.97698C16.173 7.61423 16.393 7.46913 16.8087 7.50541C17.2488 7.54168 17.6888 7.52959 18.1289 7.50541C18.4345 7.49331 18.5812 7.57796 18.6668 7.90443C18.9113 8.88387 19.2047 9.8633 19.4614 10.8427C19.5347 11.145 19.6692 11.2659 19.9871 11.2538C20.5983 11.2297 21.2217 11.2538 21.943 11.2538Z" fill="black"/>
                  </svg> */}
                
                {/* {a.name1 === "ALGO"?(<>
                  <img  width="31" height="30" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROQNyD7j5bC5DMh1kN613JbHgcczZBwncxFrSp-5EhdVCrg3vEHayr5WtEo1JCSyyJUAs&usqp=CAU"}/>
                </>):(<>
                  <img  width="31" height="30" src={logo}/>

                </>)}           {a.name1}
              
              </Button> */}
              
              {tk1 ==="ALGO" ? (<> 
                <FilterDropdown assetid1 = {AssetId1} setassetid1={(AssetId1)=>(setAssetId1(AssetId1))}  ass={ass1?ass1 : a.name1} setassets={(ass1)=>setAssets1(ass1 ? ass1 :a.name1)} setassetsn={(assn1)=>setAssetsn1(assn1 ? assn1 : algologo)} assn = {assn1 ? assn1 : algologo} setk = {(t1)=>sett1(t1)} setToken1Id={(ti1)=>{setTokenId1(ti1)}} setclicklogo1={(l1)=>{setlogo1(l1)}}></FilterDropdown>

                                              </>):tk1 === "USDC" ?
                                              (<>           <FilterDropdown assetid1 = {AssetId1} setassetid1={(AssetId1)=>(setAssetId1(AssetId1))}  ass={ass1?ass1 : a.name1} setassets={(ass1)=>setAssets1(ass1 ? ass1 :a.name1)} setassetsn={(assn1)=>setAssetsn1(assn1 ? assn1 : usdclogo)} assn = {assn1 ? assn1 : usdclogo} setk = {(t1)=>sett1(t1)} setToken1Id={(ti1)=>{setTokenId1(ti1)}} setclicklogo1={(l1)=>{setlogo1(l1)}}></FilterDropdown>
                                              </>):
                                              tk1 === "ELEM" ?
                                              (<>           <FilterDropdown assetid1 = {AssetId1} setassetid1={(AssetId1)=>(setAssetId1(AssetId1))}  ass={ass1?ass1 : a.name1} setassets={(ass1)=>setAssets1(ass1 ? ass1 :a.name1)} setassetsn={(assn1)=>setAssetsn1(assn1 ? assn1 : elem)} assn = {assn1 ? assn1 : elem} setk = {(t1)=>sett1(t1)} setToken1Id={(ti1)=>{setTokenId1(ti1)}} setclicklogo1={(l1)=>{setlogo1(l1)}}></FilterDropdown>
                                              </>):
                                              tk1 === "TAU" ?
                                              (<>           <FilterDropdown assetid1 = {AssetId1} setassetid1={(AssetId1)=>(setAssetId1(AssetId1))}  ass={ass1?ass1 : a.name1} setassets={(ass1)=>setAssets1(ass1 ? ass1 :a.name1)} setassetsn={(assn1)=>setAssetsn1(assn1 ? assn1 : tau)} assn = {assn1 ? assn1 : tau} setk = {(t1)=>sett1(t1)} setToken1Id={(ti1)=>{setTokenId1(ti1)}} setclicklogo1={(l1)=>{setlogo1(l1)}}></FilterDropdown>
                                              </>):(<>
                                                <FilterDropdown assetid1 = {AssetId1} setassetid1={(AssetId1)=>(setAssetId1(AssetId1))}  ass={ass1?ass1 : a.name1} setassets={(ass1)=>setAssets1(ass1 ? ass1 :a.name1)} setassetsn={(assn1)=>setAssetsn1(assn1 ? assn1 : logo)} assn = {assn1 ? assn1 : logo} setk = {(t1)=>sett1(t1)} setToken1Id={(ti1)=>{setTokenId1(ti1)}} setclicklogo1={(l1)=>{setlogo1(l1)}}></FilterDropdown>

                                              </>)}


              </div>
          {(tk1 == "ALGO")||(tk1 == "Algo")?(<><small>Balance:{ balanceid1 > 0 ? parseFloat(balanceid1/1000000).toFixed(2) : '0.0'}</small></>):(<><small>Balance:{(id1Token=== NaN||id1Token ===undefined||id1Token===null)?'0.0':parseFloat(id1Token/1000000).toFixed(2) } </small></>) }

      </>):(<>
        <div className="balance-card d-flex align-items-center justify-content-between">
        <input type='number' className='m-0 form-control p-0 border-0 text-white' placeholder="0.0" autoComplete='off' value={(parseInt(samount2)/1000000)} onChange={event => setvalueA2duplicate((event.target.value)* 1000000)} />

        {/* <Button variant='filter'  > */}
                  {/* <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="">
                      <rect width="30.1212" height="30" rx="15" fill="#FA84B5"/>
                      <path d="M21.943 11.2538C21.4418 12.1245 20.965 12.8983 20.5494 13.6964C20.4394 13.914 20.3905 14.2284 20.4516 14.4582C21.1117 16.9612 21.7963 19.4642 22.4686 21.9671C22.5053 22.1122 22.542 22.2694 22.5909 22.4871C21.8452 22.4871 21.1728 22.5113 20.4883 22.4629C20.366 22.4508 20.1826 22.2211 20.146 22.0518C19.6937 20.4678 19.278 18.8837 18.8379 17.2997C18.8013 17.1788 18.7646 17.0579 18.7035 16.8644C18.5446 17.1304 18.4223 17.3239 18.3001 17.5295C17.4077 19.0651 16.5031 20.5887 15.6107 22.1364C15.464 22.3904 15.3051 22.4992 14.9994 22.4871C14.2904 22.4629 13.5814 22.475 12.7746 22.475C12.8968 22.2453 12.9824 22.076 13.0802 21.9067C14.596 19.307 16.0997 16.7193 17.6277 14.1317C17.7989 13.8415 17.8478 13.5997 17.75 13.2732C17.5055 12.463 17.2977 11.6287 17.0409 10.6976C16.9065 10.9274 16.8087 11.0725 16.7231 11.2176C14.6083 14.833 12.5056 18.4364 10.403 22.0639C10.2197 22.3904 10.0118 22.5113 9.63289 22.4992C8.96054 22.4629 8.27597 22.4871 7.53027 22.4871C7.64029 22.2694 7.72587 22.1122 7.81144 21.9671C10.5375 17.2997 13.2636 12.6444 15.9652 7.97698C16.173 7.61423 16.393 7.46913 16.8087 7.50541C17.2488 7.54168 17.6888 7.52959 18.1289 7.50541C18.4345 7.49331 18.5812 7.57796 18.6668 7.90443C18.9113 8.88387 19.2047 9.8633 19.4614 10.8427C19.5347 11.145 19.6692 11.2659 19.9871 11.2538C20.5983 11.2297 21.2217 11.2538 21.943 11.2538Z" fill="black"/>
                  </svg> */}
                {/* {a.name2 === "ALGO"?(<>
                  <img  width="31" height="30" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROQNyD7j5bC5DMh1kN613JbHgcczZBwncxFrSp-5EhdVCrg3vEHayr5WtEo1JCSyyJUAs&usqp=CAU"}/>
                </>):(<>
                  <img  width="31" height="30" src={logo}/>

                </>)}
              {a.name2}
              
              </Button> */}
              {tk2 ==="ALGO" ? (<> 
                <FilterDropdown2 assetid2 = {AssetId2} setassetid2={(AssetId2)=>(setAssetId2(AssetId2))} ass={ass ? ass : a.name2} setassets={(ass)=>setAssets(ass ? ass : a.name2)} setassetsn={(assn)=>setAssetsn(assn ? assn : algologo)} assn = {assn ? assn : algologo} setMax ={(value)=>sets1(value)} setMax1 ={(value)=>sets2(value)} setMax2 ={(value)=>setoswapopt(value)} setMax3 ={(value)=>setesc(value)} setk1 ={(k1)=>sett2(k1)} setToken2Id={(ti2)=>{setTokenId2(ti2)}} setclicklogo2={(l2)=>{setlogo2(l2)}}/>

                                              </>):tk2 === "USDC" ?
                                              (<>  
              <FilterDropdown2 assetid2 = {AssetId2} setassetid2={(AssetId2)=>(setAssetId2(AssetId2))} ass={ass ? ass : a.name2} setassets={(ass)=>setAssets(ass ? ass : a.name2)} setassetsn={(assn)=>setAssetsn(assn ? assn : usdclogo)} assn = {assn ? assn : usdclogo} setMax ={(value)=>sets1(value)} setMax1 ={(value)=>sets2(value)} setMax2 ={(value)=>setoswapopt(value)} setMax3 ={(value)=>setesc(value)} setk1 ={(k1)=>sett2(k1)} setToken2Id={(ti2)=>{setTokenId2(ti2)}} setclicklogo2={(l2)=>{setlogo2(l2)}}/>
                                              </>):
                                              tk2 === "ELEM" ?
                                              (<>   
              <FilterDropdown2 assetid2 = {AssetId2} setassetid2={(AssetId2)=>(setAssetId2(AssetId2))} ass={ass ? ass : a.name2} setassets={(ass)=>setAssets(ass ? ass : a.name2)} setassetsn={(assn)=>setAssetsn(assn ? assn : elem)} assn = {assn ? assn : elem} setMax ={(value)=>sets1(value)} setMax1 ={(value)=>sets2(value)} setMax2 ={(value)=>setoswapopt(value)} setMax3 ={(value)=>setesc(value)} setk1 ={(k1)=>sett2(k1)} setToken2Id={(ti2)=>{setTokenId2(ti2)}} setclicklogo2={(l2)=>{setlogo2(l2)}}/>
                                              </>):
                                              tk2 === "TAU" ?
                                              (<>    
              <FilterDropdown2 assetid2 = {AssetId2} setassetid2={(AssetId2)=>(setAssetId2(AssetId2))} ass={ass ? ass : a.name2} setassets={(ass)=>setAssets(ass ? ass : a.name2)} setassetsn={(assn)=>setAssetsn(assn ? assn : tau)} assn = {assn ? assn : tau} setMax ={(value)=>sets1(value)} setMax1 ={(value)=>sets2(value)} setMax2 ={(value)=>setoswapopt(value)} setMax3 ={(value)=>setesc(value)} setk1 ={(k1)=>sett2(k1)} setToken2Id={(ti2)=>{setTokenId2(ti2)}} setclicklogo2={(l2)=>{setlogo2(l2)}}/>
                                              </>):(<>
                                                <FilterDropdown2 assetid2 = {AssetId2} setassetid2={(AssetId2)=>(setAssetId2(AssetId2))} ass={ass ? ass : a.name2} setassets={(ass)=>setAssets(ass ? ass : a.name2)} setassetsn={(assn)=>setAssetsn(assn ? assn : logo)} assn = {assn ? assn : logo} setMax ={(value)=>sets1(value)} setMax1 ={(value)=>sets2(value)} setMax2 ={(value)=>setoswapopt(value)} setMax3 ={(value)=>setesc(value)} setk1 ={(k1)=>sett2(k1)} setToken2Id={(ti2)=>{setTokenId2(ti2)}} setclicklogo2={(l2)=>{setlogo2(l2)}}/>

                                              </>)}


              </div>
                                          {/* {(tk2 == "TAU")?(<><small>Balance:{parseFloat(balanceid2).toFixed(2)}</small></>):(<> */}
                                          <small>Balance:{(id2Token=== NaN||id2Token ===undefined||id2Token===null)?'0.0': parseFloat(id2Token/1000000).toFixed(2)  } </small>
          
      </>)}                                        
        </div>

      <div className="text-center">
          <Button variant='reset' onClick={() => changetokens()}>
              <svg width="32" height="32" viewBox="0 0 62 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0.919922" y="60.0796" width="60" height="60.1591" rx="30" transform="rotate(-90 0.919922 60.0796)" fill="white"/>
                  <path d="M31.0488 26.0296L35.9988 21.0796L40.9488 26.0296L39.5348 27.4436L36.9978 24.9076L36.9988 38.0796H34.9988V24.9076L32.4628 27.4436L31.0488 26.0296ZM21.0488 34.1296L22.4628 32.7156L24.9988 35.2516V22.0796H26.9988V35.2516L29.5348 32.7156L30.9488 34.1296L25.9988 39.0796L21.0488 34.1296Z" fill="black"/>
              </svg>
          </Button>
      </div>

      <div className="mb-0">
          <label className='d-flex align-items-center justify-content-between'>To 
          {(tk2 == "ALGO")||(tk2 == "Algo") ? (<><small >Price: 1 {tk2.toUpperCase()} = {algoPrice > 0.0001 ? parseFloat(algoPrice).toFixed(2) : '0.0'}  USD</small></>):
            (tk2 == "USDC")?(<><small>Price:1 {tk2.toUpperCase()} = {usdcPrice > 0 ? parseFloat(usdcPrice).toFixed(2) :  '0.0'} USD</small></>):(<></>) }


          </label>

        
          {dvalue ? (
          <>
          {swapv ? (
        <>
        <div className="balance-card d-flex align-items-center justify-content-between">
        <input type='number' className='m-0 form-control p-0 border-0 text-white' placeholder="0.0" autoComplete='off' value={(parseInt(samount2)/1000000)} onChange={event => setvalueA2((event.target.value)* 1000000)} />
        <FilterDropdown2 assetid2 = {AssetId2} setassetid2={(AssetId2)=>(setAssetId2(AssetId2))} ass={ass} setassets={(ass)=>setAssets(ass)} setassetsn={(assn)=>setAssetsn(assn)} assn = {assn} setMax ={(value)=>sets1(value)} setMax1 ={(value)=>sets2(value)} setMax2 ={(value)=>setoswapopt(value)} setMax3 ={(value)=>setesc(value)} setk1 ={(k1)=>sett2(k1)} setToken2Id={(ti2)=>{setTokenId2(ti2)}} setclicklogo2={(l2)=>{setlogo2(l2)}}/>
        </div>
                                          {/* {(tk2 == "TAU")?(<><small>Balance:{parseFloat(balanceid2).toFixed(2)}</small></>):(<> */}
                                          <small>Balance:{(id2Token=== NaN||id2Token ===undefined||id2Token===null)?'0.0': parseFloat(id2Token/1000000).toFixed(2) } </small>
                                          
      </>
      ):(<>
      <div className="balance-card d-flex align-items-center justify-content-between">
      <input type='number' id="sf" className='m-0 form-control p-0 border-0 text-white' placeholder='0.0'  autoComplete='off' value={ parseInt(samount1)/1000000 } onChange={event => setvalueA1((event.target.value)* 1000000)} />
      <FilterDropdown assetid1 = {AssetId1} setassetid1={(AssetId2)=>(setAssetId1(AssetId2))}  ass={ass1} setassets={(ass1)=>setAssets1(ass1)} setassetsn={(assn1)=>setAssetsn1(assn1)} assn = {assn1} setk = {(t1)=>sett1(t1)} setToken1Id={(ti1)=>{setTokenId1(ti1)}} setclicklogo1={(l1)=>{setlogo1(l1)}}></FilterDropdown>
        </div>
          {(tk1 == "ALGO")||(tk1 == "Algo")?(<><small>Balance:{ balanceid1 > 0 ? parseFloat(balanceid1/1000000).toFixed(2) : '0.0'}</small></>):(<><small>Balance:{(id1Token=== NaN||id1Token ===undefined||id1Token===null)?'0.0': parseFloat(id1Token/1000000).toFixed(2) } </small></>) }

          </>)} </>
      ):(swapv)?(<>
      <div className="balance-card d-flex align-items-center justify-content-between">
        <input type='number' className='m-0 form-control p-0 border-0 text-white' placeholder="0.0" autoComplete='off' value={(parseInt(samount2)/1000000)} onChange={event => setvalueA2duplicate((event.target.value)* 1000000)} />

        {/* <Button variant='filter'  > */}
                  {/* <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="">
                      <rect width="30.1212" height="30" rx="15" fill="#FA84B5"/>
                      <path d="M21.943 11.2538C21.4418 12.1245 20.965 12.8983 20.5494 13.6964C20.4394 13.914 20.3905 14.2284 20.4516 14.4582C21.1117 16.9612 21.7963 19.4642 22.4686 21.9671C22.5053 22.1122 22.542 22.2694 22.5909 22.4871C21.8452 22.4871 21.1728 22.5113 20.4883 22.4629C20.366 22.4508 20.1826 22.2211 20.146 22.0518C19.6937 20.4678 19.278 18.8837 18.8379 17.2997C18.8013 17.1788 18.7646 17.0579 18.7035 16.8644C18.5446 17.1304 18.4223 17.3239 18.3001 17.5295C17.4077 19.0651 16.5031 20.5887 15.6107 22.1364C15.464 22.3904 15.3051 22.4992 14.9994 22.4871C14.2904 22.4629 13.5814 22.475 12.7746 22.475C12.8968 22.2453 12.9824 22.076 13.0802 21.9067C14.596 19.307 16.0997 16.7193 17.6277 14.1317C17.7989 13.8415 17.8478 13.5997 17.75 13.2732C17.5055 12.463 17.2977 11.6287 17.0409 10.6976C16.9065 10.9274 16.8087 11.0725 16.7231 11.2176C14.6083 14.833 12.5056 18.4364 10.403 22.0639C10.2197 22.3904 10.0118 22.5113 9.63289 22.4992C8.96054 22.4629 8.27597 22.4871 7.53027 22.4871C7.64029 22.2694 7.72587 22.1122 7.81144 21.9671C10.5375 17.2997 13.2636 12.6444 15.9652 7.97698C16.173 7.61423 16.393 7.46913 16.8087 7.50541C17.2488 7.54168 17.6888 7.52959 18.1289 7.50541C18.4345 7.49331 18.5812 7.57796 18.6668 7.90443C18.9113 8.88387 19.2047 9.8633 19.4614 10.8427C19.5347 11.145 19.6692 11.2659 19.9871 11.2538C20.5983 11.2297 21.2217 11.2538 21.943 11.2538Z" fill="black"/>
                  </svg> */}
                {/* {a.name2 === "ALGO"?(<>
                  <img  width="31" height="30" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROQNyD7j5bC5DMh1kN613JbHgcczZBwncxFrSp-5EhdVCrg3vEHayr5WtEo1JCSyyJUAs&usqp=CAU"}/>
                </>):(<>
                  <img  width="31" height="30" src={logo}/>

                </>)}
              {a.name2}
              
              </Button> */}
                  {tk2 ==="ALGO" ? (<> 
                    <FilterDropdown2 assetid2 = {AssetId2} setassetid2={(AssetId2)=>(setAssetId2(AssetId2))} ass={ass ? ass : a.name2} setassets={(ass)=>setAssets(ass ? ass : a.name2)} setassetsn={(assn)=>setAssetsn(assn ? assn : algologo)} assn = {assn ? assn : algologo} setMax ={(value)=>sets1(value)} setMax1 ={(value)=>sets2(value)} setMax2 ={(value)=>setoswapopt(value)} setMax3 ={(value)=>setesc(value)} setk1 ={(k1)=>sett2(k1)} setToken2Id={(ti2)=>{setTokenId2(ti2)}} setclicklogo2={(l2)=>{setlogo2(l2)}}/>

                                              </>):tk2 === "USDC" ?
                                              (<>  
              <FilterDropdown2 assetid2 = {AssetId2} setassetid2={(AssetId2)=>(setAssetId2(AssetId2))} ass={ass ? ass : a.name2} setassets={(ass)=>setAssets(ass ? ass : a.name2)} setassetsn={(assn)=>setAssetsn(assn ? assn : usdclogo)} assn = {assn ? assn : usdclogo} setMax ={(value)=>sets1(value)} setMax1 ={(value)=>sets2(value)} setMax2 ={(value)=>setoswapopt(value)} setMax3 ={(value)=>setesc(value)} setk1 ={(k1)=>sett2(k1)} setToken2Id={(ti2)=>{setTokenId2(ti2)}} setclicklogo2={(l2)=>{setlogo2(l2)}}/>
                                              </>):
                                              tk2 === "ELEM" ?
                                              (<>   
              <FilterDropdown2 assetid2 = {AssetId2} setassetid2={(AssetId2)=>(setAssetId2(AssetId2))} ass={ass ? ass : a.name2} setassets={(ass)=>setAssets(ass ? ass : a.name2)} setassetsn={(assn)=>setAssetsn(assn ? assn : elem)} assn = {assn ? assn : elem} setMax ={(value)=>sets1(value)} setMax1 ={(value)=>sets2(value)} setMax2 ={(value)=>setoswapopt(value)} setMax3 ={(value)=>setesc(value)} setk1 ={(k1)=>sett2(k1)} setToken2Id={(ti2)=>{setTokenId2(ti2)}} setclicklogo2={(l2)=>{setlogo2(l2)}}/>
                                              </>):
                                              tk2 === "TAU" ?
                                              (<>    
              <FilterDropdown2 assetid2 = {AssetId2} setassetid2={(AssetId2)=>(setAssetId2(AssetId2))} ass={ass ? ass : a.name2} setassets={(ass)=>setAssets(ass ? ass : a.name2)} setassetsn={(assn)=>setAssetsn(assn ? assn : tau)} assn = {assn ? assn : tau} setMax ={(value)=>sets1(value)} setMax1 ={(value)=>sets2(value)} setMax2 ={(value)=>setoswapopt(value)} setMax3 ={(value)=>setesc(value)} setk1 ={(k1)=>sett2(k1)} setToken2Id={(ti2)=>{setTokenId2(ti2)}} setclicklogo2={(l2)=>{setlogo2(l2)}}/>
                                              </>):(<>
                                                <FilterDropdown2 assetid2 = {AssetId2} setassetid2={(AssetId2)=>(setAssetId2(AssetId2))} ass={ass ? ass : a.name2} setassets={(ass)=>setAssets(ass ? ass : a.name2)} setassetsn={(assn)=>setAssetsn(assn ? assn : logo)} assn = {assn ? assn : logo} setMax ={(value)=>sets1(value)} setMax1 ={(value)=>sets2(value)} setMax2 ={(value)=>setoswapopt(value)} setMax3 ={(value)=>setesc(value)} setk1 ={(k1)=>sett2(k1)} setToken2Id={(ti2)=>{setTokenId2(ti2)}} setclicklogo2={(l2)=>{setlogo2(l2)}}/>

                                              </>)}

              </div>
                                          {/* {(tk2 == "TAU")?(<><small>Balance:{parseFloat(balanceid2).toFixed(2)}</small></>):(<> */}
                                          <small>Balance:{(id2Token=== NaN||id2Token ===undefined||id2Token===null)?'0.0': parseFloat(id2Token/1000000).toFixed(2)  } </small>
                                          
      </>):(<>
        <div className="balance-card d-flex align-items-center justify-content-between">

      <input type='number' id="sf" className='m-0 form-control p-0 border-0 text-white' placeholder='0.0'  autoComplete='off' value={ parseInt(samount1)/1000000 } onChange={event => setvalueA1duplicate((event.target.value)* 1000000)} />

      {/* <Button variant='filter'  > */}
                {/* <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="">
                    <rect width="30.1212" height="30" rx="15" fill="#FA84B5"/>
                    <path d="M21.943 11.2538C21.4418 12.1245 20.965 12.8983 20.5494 13.6964C20.4394 13.914 20.3905 14.2284 20.4516 14.4582C21.1117 16.9612 21.7963 19.4642 22.4686 21.9671C22.5053 22.1122 22.542 22.2694 22.5909 22.4871C21.8452 22.4871 21.1728 22.5113 20.4883 22.4629C20.366 22.4508 20.1826 22.2211 20.146 22.0518C19.6937 20.4678 19.278 18.8837 18.8379 17.2997C18.8013 17.1788 18.7646 17.0579 18.7035 16.8644C18.5446 17.1304 18.4223 17.3239 18.3001 17.5295C17.4077 19.0651 16.5031 20.5887 15.6107 22.1364C15.464 22.3904 15.3051 22.4992 14.9994 22.4871C14.2904 22.4629 13.5814 22.475 12.7746 22.475C12.8968 22.2453 12.9824 22.076 13.0802 21.9067C14.596 19.307 16.0997 16.7193 17.6277 14.1317C17.7989 13.8415 17.8478 13.5997 17.75 13.2732C17.5055 12.463 17.2977 11.6287 17.0409 10.6976C16.9065 10.9274 16.8087 11.0725 16.7231 11.2176C14.6083 14.833 12.5056 18.4364 10.403 22.0639C10.2197 22.3904 10.0118 22.5113 9.63289 22.4992C8.96054 22.4629 8.27597 22.4871 7.53027 22.4871C7.64029 22.2694 7.72587 22.1122 7.81144 21.9671C10.5375 17.2997 13.2636 12.6444 15.9652 7.97698C16.173 7.61423 16.393 7.46913 16.8087 7.50541C17.2488 7.54168 17.6888 7.52959 18.1289 7.50541C18.4345 7.49331 18.5812 7.57796 18.6668 7.90443C18.9113 8.88387 19.2047 9.8633 19.4614 10.8427C19.5347 11.145 19.6692 11.2659 19.9871 11.2538C20.5983 11.2297 21.2217 11.2538 21.943 11.2538Z" fill="black"/>
                </svg> */}
              
              {/* {a.name1 === "ALGO"?(<>
                <img  width="31" height="30" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROQNyD7j5bC5DMh1kN613JbHgcczZBwncxFrSp-5EhdVCrg3vEHayr5WtEo1JCSyyJUAs&usqp=CAU"}/>
              </>):(<>
                <img  width="31" height="30" src={logo}/>

              </>)}           {a.name1}
            
            </Button> */}
              {tk1 ==="ALGO" ? (<> 
                <FilterDropdown assetid1 = {AssetId1} setassetid1={(AssetId1)=>(setAssetId1(AssetId1))}  ass={ass1?ass1 : a.name1} setassets={(ass1)=>setAssets1(ass1 ? ass1 :a.name1)} setassetsn={(assn1)=>setAssetsn1(assn1 ? assn1 : algologo)} assn = {assn1 ? assn1 : algologo} setk = {(t1)=>sett1(t1)} setToken1Id={(ti1)=>{setTokenId1(ti1)}} setclicklogo1={(l1)=>{setlogo1(l1)}}></FilterDropdown>

                                              </>):tk1 === "USDC" ?
                                              (<>  
            <FilterDropdown assetid1 = {AssetId1} setassetid1={(AssetId1)=>(setAssetId1(AssetId1))}  ass={ass1?ass1 : a.name1} setassets={(ass1)=>setAssets1(ass1 ? ass1 :a.name1)} setassetsn={(assn1)=>setAssetsn1(assn1 ? assn1 : usdclogo)} assn = {assn1 ? assn1 : usdclogo} setk = {(t1)=>sett1(t1)} setToken1Id={(ti1)=>{setTokenId1(ti1)}} setclicklogo1={(l1)=>{setlogo1(l1)}}></FilterDropdown>
                                              </>):
                                              tk1 === "ELEM" ?
                                              (<>   
            <FilterDropdown assetid1 = {AssetId1} setassetid1={(AssetId1)=>(setAssetId1(AssetId1))}  ass={ass1?ass1 : a.name1} setassets={(ass1)=>setAssets1(ass1 ? ass1 :a.name1)} setassetsn={(assn1)=>setAssetsn1(assn1 ? assn1 : elem)} assn = {assn1 ? assn1 : elem} setk = {(t1)=>sett1(t1)} setToken1Id={(ti1)=>{setTokenId1(ti1)}} setclicklogo1={(l1)=>{setlogo1(l1)}}></FilterDropdown>
                                              </>):
                                              tk1 === "TAU" ?
                                              (<>    
            <FilterDropdown assetid1 = {AssetId1} setassetid1={(AssetId1)=>(setAssetId1(AssetId1))}  ass={ass1?ass1 : a.name1} setassets={(ass1)=>setAssets1(ass1 ? ass1 :a.name1)} setassetsn={(assn1)=>setAssetsn1(assn1 ? assn1 : tau)} assn = {assn1 ? assn1 : tau} setk = {(t1)=>sett1(t1)} setToken1Id={(ti1)=>{setTokenId1(ti1)}} setclicklogo1={(l1)=>{setlogo1(l1)}}></FilterDropdown>
                                              </>):(<>
                                                <FilterDropdown assetid1 = {AssetId1} setassetid1={(AssetId1)=>(setAssetId1(AssetId1))}  ass={ass1?ass1 : a.name1} setassets={(ass1)=>setAssets1(ass1 ? ass1 :a.name1)} setassetsn={(assn1)=>setAssetsn1(assn1 ? assn1 : logo)} assn = {assn1 ? assn1 : logo} setk = {(t1)=>sett1(t1)} setToken1Id={(ti1)=>{setTokenId1(ti1)}} setclicklogo1={(l1)=>{setlogo1(l1)}}></FilterDropdown>

                                              </>)}

            </div>
        {(tk1 == "ALGO")||(tk1 == "Algo")?(<><small>Balance:{ balanceid1 > 0 ? parseFloat(balanceid1/1000000).toFixed(2) : '0.0'}</small></>):(<><small>Balance:{(id1Token=== NaN||id1Token ===undefined||id1Token===null)?'0.0':parseFloat(id1Token/1000000).toFixed(2) } </small></>) }

      </>)}
                                          {/* </>) } */}
                                      </div>
                                      {swapdetail ? (<>
                                        <InputGroup className='mb-2 input-reload'>
                                        <FormControl
                                          className='m-0 form-control py-0 pe-0 ps-2  border-0 text-white' placeholder="Price" value="Price"
                                        
                                          aria-label="Recipient's username"
                                          aria-describedby="basic-addon2"
                                        />
                                        {/* {swapv ?
                                        (<>
                                        <InputGroup.Text id="basic-addon2" className='px-1'>{ samount2 > 0 ? parseFloat(samount2/samount1).toFixed(4) : "0"} {tk2} per {tk1}</InputGroup.Text>
                                        </>):
                                        (<>
                                        <InputGroup.Text id="basic-addon2" className='px-1'>{ samount1 > 0 ? parseFloat(samount1/samount2).toFixed(4) : "0"} {tk1} per {tk2}</InputGroup.Text>
                                        </>)} */}
                                        
                                          
                                        {/* <Button variant="reset" id="button-addon2" >
                                          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-repeat" viewBox="0 0 16 16">
                                            <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
                                            <path fillRule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
                                          </svg>
                                        </Button> */}
                                      </InputGroup>

                                      <div className="card card-stack mb-2">
                                        <div className="card-body">
                                          <div className="d-flex justify-content-between align-items-center mb-3">
                                            <span>Minimum Received</span>
                                            {/* <strong>{parseFloat(AssWithFee/1000000).toFixed(4)} {tk2}</strong> */}
                                          </div>
                                          <div className="d-flex justify-content-between align-items-center mb-3">
                                            <span>Slippage Tolerance</span>
                                            {/* <strong>{fee}%</strong> */}
                                          </div>
                                          <div className="d-flex justify-content-between align-items-center mb-3">
                                            <span>Swap Rewards</span>
                                            {/* <strong >{swf > 0 ? parseFloat(swf).toFixed(3) : "0" } ELEM</strong> */}
                                          </div>                        
                                        </div>
                                      </div> 
                                      </>):(<>
                                      </>)}
                                    
                                  </Tab>
                                  <Tab eventKey="liquidity" title="Liquidity">
                                    <Tabs
                                        defaultActiveKey="add"
                                        transition={false}
                                        id="noanim-tab-example"
                                        className='tabs-dark'
                                    >
                                        <Tab eventKey="add" title="Add">
                                          <div className="pt-2">
                                          <div className="mb-1">
                                            <label className='d-flex align-items-center justify-content-between' >From
                                            {(tk1 == "ALGO")||(tk1 == "Algo") ? (<><small>Price:1 {tk1.toUpperCase()} = {algoPrice > 0.0000001 ? parseFloat(algoPrice).toFixed(2) : '0.0'} USD</small></>):
                                    (tk1 == "USDC")?(<><small>Price:1 {tk1.toUpperCase()} = {usdcPrice > 0.00001 ? parseFloat(usdcPrice).toFixed(2) :  '0.0'} USD</small></>):(<></>) }
                                      
                                              </label>

                                            <div className="balance-card d-flex align-items-center justify-content-between" >
                                            <input type='number' className='m-0 form-control p-0 border-0 text-white'  placeholder='0.0' />

                                              

                                            {/* <FilterDropdown setk = {(t1)=>sett1(t1)} ></FilterDropdown> */}
                                            <FilterDropdown assetid1 = {AssetId1} setassetid1={(AssetId2)=>(setAssetId1(AssetId2))}  ass={ass1} setassets={(ass1)=>setAssets1(ass1)} setassetsn={(assn1)=>setAssetsn1(assn1)} assn = {assn1} setk = {(t1)=>sett1(t1)} setToken1Id={(ti1)=>{setTokenId1(ti1)}} setclicklogo1={(l1)=>{setlogo1(l1)}}></FilterDropdown>

                                            </div>
                                        </div>
                                        {(tk1 == "ALGO")||(tk1 == "Algo")?(<><small>Balance:{(balanceid1===null||balanceid1===""||balanceid1===undefined) ?'0.0': parseFloat(balanceid1/1000000).toFixed(2)}</small></>):(<><small>Balance:{(id1Token===null||id1Token===""||id1Token===undefined) ?'0.0' : parseFloat(id1Token/1000000).toFixed(2) } </small></>) }

                                        <div className="mb-0 pt-0 text-center">
                                            <Button variant='reset'>
                                                <svg width="32" height="31" viewBox="0 0 62 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect x="0.919922" y="60.1743" width="60.0313" height="60.1591" rx="30" transform="rotate(-90 0.919922 60.1743)" fill="white"/>
                                                    <path d="M30 29.1584V23.1553H32V29.1584H38V31.1595H32V37.1626H30V31.1595H24V29.1584H30Z" fill="black"/>
                                                </svg>
                                            </Button>
                                        </div>

                                        <div className="mb-1">
                                            <label className='d-flex align-items-center justify-content-between'>To 
                                            {(tk2 == "ALGO")||(tk2 == "Algo") ? (<><small >Price:1 {tk2.toUpperCase()} = {algoPrice > 0.0001 ? parseFloat(algoPrice).toFixed(2) : '0.0'} USD </small></>):
            (tk2 == "USDC")?(<><small>Price:1 {tk2.toUpperCase()} = {usdcPrice > 0 ? parseFloat(usdcPrice).toFixed(2) :  '0.0'} USD</small></>):(<></>) }
                                            </label>

                                            <div className="balance-card d-flex align-items-center justify-content-between">
                                            {/* <input type='number' className='m-0 form-control p-0 border-0 text-white' onChange={(e) => setVal2((e.target.value)*1000000)}  placeholder='0.0' /> */}
                                            
                                            
                                            {/* <FilterDropdown2 setMax ={(value)=>sets1(value)} setMax1 ={(value)=>sets2(value)} setMax2 ={(value)=>setoswapopt(value)} setMax3 ={(value)=>setesc(value)} setk1 ={(k1)=>sett2(k1)}/> */}
                                            <FilterDropdown2 assetid2 = {AssetId2} setassetid2={(AssetId2)=>(setAssetId2(AssetId2))} ass={ass} setassets={(ass)=>setAssets(ass)} setassetsn={(assn)=>setAssetsn(assn)} assn = {assn} setMax ={(value)=>sets1(value)} setMax1 ={(value)=>sets2(value)} setMax2 ={(value)=>setoswapopt(value)} setMax3 ={(value)=>setesc(value)} setk1 ={(k1)=>sett2(k1)} setToken2Id={(ti2)=>{setTokenId2(ti2)}} setclicklogo2={(l2)=>{setlogo2(l2)}}/>

                                            </div>
                                        </div>
                                        {(tk2 == "TAU")||(tk2 == "Algo")?(<><small>Balance:{parseFloat(balanceid2).toFixed(2)}</small></>):(<><small>Balance:{parseFloat(id2Token/1000000).toFixed(2) } </small></>) }
                                        <small>Balance:{(id2Token===null||id2Token===""||id2Token===undefined) ?'0.0' : parseFloat(id2Token/1000000).toFixed(2) } </small>
                                        <div className="balance-card py-1 px-2 mb-10 d-flex align-items-center justify-content-between">
                                            <label>POOL FEE</label>

                                            <h6>0.86 ALGO</h6>
                                        </div>

                                        <p className="text-red">
                                            {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi me-2 bi-info-circle" viewBox="0 0 16 16">
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                            </svg> */}
                                            
                                        </p>
                                        {/* { (!showOptInButton && !showMintButton )?(<>
                                            <Button className='btn w-100 mb-10 text-none btn-grad btn-xl'  onClick={()=>bootstrap(appID_global,AssetId1,AssetId2)}>Add</Button>
                                        </>):(showOptInButton && !showMintButton)?(<>
                                            <Button className='btn w-100 mb-10 text-none btn-grad btn-xl'  onClick={()=>optIn(appID_global)}>Asset Opt-In</Button>
                                        </>):(<>
                                            <Button className='btn w-100 mb-10 text-none btn-grad btn-xl'  onClick={()=>mint(appID_global,AssetId1,AssetId2,input1,input2)}>Add LIQUIDITY</Button>
                                        </>)
                                        } */}

                                        <p className='d-flex'>
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi me-2 bi-info-circle" viewBox="0 0 16 16">
                                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                                </svg>
                                            </span>
                                            Once you create the pool, other users will be able to add liquidity to it.
                                        </p>
                                          </div>
                                        </Tab>
                                        <Tab eventKey="remove" title="Remove">
                                          <div className="pt-2">
                                            <div className="modal-manage mb-10">
                                              <Row className='mb-md-0 text-nowrap align-items-center text-center'>
                                                  <Col sm={4}>
                                                      {/* <h6>99.99%</h6> */}
                                                      <p>Pool Share</p>
                                                  </Col>
                                                  <Col sm={4} className='py-sm-0 py-3'>
                                                      {/* <h6>{parseFloat(aprice[2]/1000000).toFixed(4)} </h6> */}
                                                  </Col>
                                                  <Col sm={4}>
                                                      {/* <h6>{parseFloat(aprice[0]/1000000).toFixed(4)} {rstate.asetName1}</h6>
                                                      <h6>{parseFloat(aprice[1]/1000000).toFixed(4)} {rstate.asetName2}</h6> */}
                                                  </Col>
                                              </Row>
                                          </div>
                                          
                                          <label className='mb-10'>Remove Amount</label>

                                          <Row className='mb-10'>
                                              <Col xs={6} sm={3} className='mb-2'>
                                                  <input type="radio" hidden id='radio1' name="amount" />
                                                  <label htmlFor="radio1"  variant="grad" className='btn btn-default px-2 w-100'>25%</label>
                                              </Col>
                                              <Col xs={6} sm={3} className='mb-2'>
                                                  <input type="radio" hidden id='radio2' name="amount" />
                                                  <label htmlFor="radio2" className='btn btn-default px-2 w-100' >50%</label>
                                              </Col>
                                              <Col xs={6} sm={3} className='mb-2'>
                                                  <input type="radio" hidden id='radio3' name="amount" />
                                                  <label htmlFor="radio3" className='btn btn-default px-2 w-100' >75%</label>
                                              </Col>
                                              <Col xs={6} sm={3} className='mb-2'>
                                                  <input type="radio" hidden id='radio4' name="amount" />
                                                  <label htmlFor="radio4" className='btn btn-default px-2 w-100'>Max</label>
                                              </Col>
                                          </Row>

                                          <Row className='justify-content-center'>
                                              <Col md={6}>
                                                  <div className="balance-card mb-10 d-flex align-items-center justify-content-between">
                                                      {/* <label className='h6'>{rstate.asetName1}</label> */}

                                                      {/* <h6 className='py-1'>{amount1Out > 0 ? parseFloat(amount1Out/1000000).toFixed(3) :"0.00"}</h6> */}
                                                  </div>

                                                  <div className="balance-card mb-30 d-flex align-items-center justify-content-between">
                                                      {/* <label className='h6'>{rstate.asetName2}</label> */}

                                                      {/* <h6 className='py-1' >{amount2Out > 0 ? parseFloat(amount2Out/1000000).toFixed(3) :"0.00"}  */}
                                                      {/* <small className='d-block text-gray'>~$0.16</small> */}
                                                      {/* </h6> */}
                                                  </div>

                                                  {/* <Button variant='grad' className='btn-lg w-100' onClick={()=>{percent1(rstate.asetName1,rstate.asetName2)}}>Remove</Button> */}
                                              </Col>
                                          </Row>
                                          </div>
                                        </Tab>
                                    </Tabs>
                                  </Tab>
                                </Tabs>

                                
                            </div>
                        </Col>
                        <Col lg={6} className="d-none">
                            <div className="card-base card-chart" style={{minHeight: '640px'}}>
                                <Breadcrumb className='mb-50'>
                                    <Breadcrumb.Item>
                                    {dvalue ? (<>
                                      {swapv ? (<>
                                      {logovalue1 ? (<>
                                          {/* <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns={logovalue1}>
                                            <rect width="30.1212" height="30" rx="15" fill="White"/>
                                            <path d="M21.943 11.2538C21.4418 12.1245 20.965 12.8983 20.5494 13.6964C20.4394 13.914 20.3905 14.2284 20.4516 14.4582C21.1117 16.9612 21.7963 19.4642 22.4686 21.9671C22.5053 22.1122 22.542 22.2694 22.5909 22.4871C21.8452 22.4871 21.1728 22.5113 20.4883 22.4629C20.366 22.4508 20.1826 22.2211 20.146 22.0518C19.6937 20.4678 19.278 18.8837 18.8379 17.2997C18.8013 17.1788 18.7646 17.0579 18.7035 16.8644C18.5446 17.1304 18.4223 17.3239 18.3001 17.5295C17.4077 19.0651 16.5031 20.5887 15.6107 22.1364C15.464 22.3904 15.3051 22.4992 14.9994 22.4871C14.2904 22.4629 13.5814 22.475 12.7746 22.475C12.8968 22.2453 12.9824 22.076 13.0802 21.9067C14.596 19.307 16.0997 16.7193 17.6277 14.1317C17.7989 13.8415 17.8478 13.5997 17.75 13.2732C17.5055 12.463 17.2977 11.6287 17.0409 10.6976C16.9065 10.9274 16.8087 11.0725 16.7231 11.2176C14.6083 14.833 12.5056 18.4364 10.403 22.0639C10.2197 22.3904 10.0118 22.5113 9.63289 22.4992C8.96054 22.4629 8.27597 22.4871 7.53027 22.4871C7.64029 22.2694 7.72587 22.1122 7.81144 21.9671C10.5375 17.2997 13.2636 12.6444 15.9652 7.97698C16.173 7.61423 16.393 7.46913 16.8087 7.50541C17.2488 7.54168 17.6888 7.52959 18.1289 7.50541C18.4345 7.49331 18.5812 7.57796 18.6668 7.90443C18.9113 8.88387 19.2047 9.8633 19.4614 10.8427C19.5347 11.145 19.6692 11.2659 19.9871 11.2538C20.5983 11.2297 21.2217 11.2538 21.943 11.2538Z" fill="black"/>
                                        </svg> */}
                                        <img width="31" height="30"  src={logovalue1}/>

                                        </>):(<>
                                          <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="30.1212" height="30" rx="15" fill="White"/>
                                            <path d="M21.943 11.2538C21.4418 12.1245 20.965 12.8983 20.5494 13.6964C20.4394 13.914 20.3905 14.2284 20.4516 14.4582C21.1117 16.9612 21.7963 19.4642 22.4686 21.9671C22.5053 22.1122 22.542 22.2694 22.5909 22.4871C21.8452 22.4871 21.1728 22.5113 20.4883 22.4629C20.366 22.4508 20.1826 22.2211 20.146 22.0518C19.6937 20.4678 19.278 18.8837 18.8379 17.2997C18.8013 17.1788 18.7646 17.0579 18.7035 16.8644C18.5446 17.1304 18.4223 17.3239 18.3001 17.5295C17.4077 19.0651 16.5031 20.5887 15.6107 22.1364C15.464 22.3904 15.3051 22.4992 14.9994 22.4871C14.2904 22.4629 13.5814 22.475 12.7746 22.475C12.8968 22.2453 12.9824 22.076 13.0802 21.9067C14.596 19.307 16.0997 16.7193 17.6277 14.1317C17.7989 13.8415 17.8478 13.5997 17.75 13.2732C17.5055 12.463 17.2977 11.6287 17.0409 10.6976C16.9065 10.9274 16.8087 11.0725 16.7231 11.2176C14.6083 14.833 12.5056 18.4364 10.403 22.0639C10.2197 22.3904 10.0118 22.5113 9.63289 22.4992C8.96054 22.4629 8.27597 22.4871 7.53027 22.4871C7.64029 22.2694 7.72587 22.1122 7.81144 21.9671C10.5375 17.2997 13.2636 12.6444 15.9652 7.97698C16.173 7.61423 16.393 7.46913 16.8087 7.50541C17.2488 7.54168 17.6888 7.52959 18.1289 7.50541C18.4345 7.49331 18.5812 7.57796 18.6668 7.90443C18.9113 8.88387 19.2047 9.8633 19.4614 10.8427C19.5347 11.145 19.6692 11.2659 19.9871 11.2538C20.5983 11.2297 21.2217 11.2538 21.943 11.2538Z" fill="black"/>
                                        </svg>
                                        </>)}
                                        {/* <img width="31" height="30" viewBox="0 0 31 30" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROQNyD7j5bC5DMh1kN613JbHgcczZBwncxFrSp-5EhdVCrg3vEHayr5WtEo1JCSyyJUAs&usqp=CAU"/> */}

                                        {ass1 ? ass1 : "ALGO"}
                                    </>):(<>
                                      {logovalue2 ? (<>
                                          {/* <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns={logovalue1}>
                                            <rect width="30.1212" height="30" rx="15" fill="White"/>
                                            <path d="M21.943 11.2538C21.4418 12.1245 20.965 12.8983 20.5494 13.6964C20.4394 13.914 20.3905 14.2284 20.4516 14.4582C21.1117 16.9612 21.7963 19.4642 22.4686 21.9671C22.5053 22.1122 22.542 22.2694 22.5909 22.4871C21.8452 22.4871 21.1728 22.5113 20.4883 22.4629C20.366 22.4508 20.1826 22.2211 20.146 22.0518C19.6937 20.4678 19.278 18.8837 18.8379 17.2997C18.8013 17.1788 18.7646 17.0579 18.7035 16.8644C18.5446 17.1304 18.4223 17.3239 18.3001 17.5295C17.4077 19.0651 16.5031 20.5887 15.6107 22.1364C15.464 22.3904 15.3051 22.4992 14.9994 22.4871C14.2904 22.4629 13.5814 22.475 12.7746 22.475C12.8968 22.2453 12.9824 22.076 13.0802 21.9067C14.596 19.307 16.0997 16.7193 17.6277 14.1317C17.7989 13.8415 17.8478 13.5997 17.75 13.2732C17.5055 12.463 17.2977 11.6287 17.0409 10.6976C16.9065 10.9274 16.8087 11.0725 16.7231 11.2176C14.6083 14.833 12.5056 18.4364 10.403 22.0639C10.2197 22.3904 10.0118 22.5113 9.63289 22.4992C8.96054 22.4629 8.27597 22.4871 7.53027 22.4871C7.64029 22.2694 7.72587 22.1122 7.81144 21.9671C10.5375 17.2997 13.2636 12.6444 15.9652 7.97698C16.173 7.61423 16.393 7.46913 16.8087 7.50541C17.2488 7.54168 17.6888 7.52959 18.1289 7.50541C18.4345 7.49331 18.5812 7.57796 18.6668 7.90443C18.9113 8.88387 19.2047 9.8633 19.4614 10.8427C19.5347 11.145 19.6692 11.2659 19.9871 11.2538C20.5983 11.2297 21.2217 11.2538 21.943 11.2538Z" fill="black"/>
                                        </svg> */}
                                        <img width="31" height="30"  src={logovalue2}/>

                                        </>):(<>
                                          {/* <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="30.1212" height="30" rx="15" fill="White"/>
                                            <path d="M21.943 11.2538C21.4418 12.1245 20.965 12.8983 20.5494 13.6964C20.4394 13.914 20.3905 14.2284 20.4516 14.4582C21.1117 16.9612 21.7963 19.4642 22.4686 21.9671C22.5053 22.1122 22.542 22.2694 22.5909 22.4871C21.8452 22.4871 21.1728 22.5113 20.4883 22.4629C20.366 22.4508 20.1826 22.2211 20.146 22.0518C19.6937 20.4678 19.278 18.8837 18.8379 17.2997C18.8013 17.1788 18.7646 17.0579 18.7035 16.8644C18.5446 17.1304 18.4223 17.3239 18.3001 17.5295C17.4077 19.0651 16.5031 20.5887 15.6107 22.1364C15.464 22.3904 15.3051 22.4992 14.9994 22.4871C14.2904 22.4629 13.5814 22.475 12.7746 22.475C12.8968 22.2453 12.9824 22.076 13.0802 21.9067C14.596 19.307 16.0997 16.7193 17.6277 14.1317C17.7989 13.8415 17.8478 13.5997 17.75 13.2732C17.5055 12.463 17.2977 11.6287 17.0409 10.6976C16.9065 10.9274 16.8087 11.0725 16.7231 11.2176C14.6083 14.833 12.5056 18.4364 10.403 22.0639C10.2197 22.3904 10.0118 22.5113 9.63289 22.4992C8.96054 22.4629 8.27597 22.4871 7.53027 22.4871C7.64029 22.2694 7.72587 22.1122 7.81144 21.9671C10.5375 17.2997 13.2636 12.6444 15.9652 7.97698C16.173 7.61423 16.393 7.46913 16.8087 7.50541C17.2488 7.54168 17.6888 7.52959 18.1289 7.50541C18.4345 7.49331 18.5812 7.57796 18.6668 7.90443C18.9113 8.88387 19.2047 9.8633 19.4614 10.8427C19.5347 11.145 19.6692 11.2659 19.9871 11.2538C20.5983 11.2297 21.2217 11.2538 21.943 11.2538Z" fill="black"/>
                                        </svg> */}
  <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="30.1212" height="30" rx="15" fill="White"/>
                                            <path d="M21.943 11.2538C21.4418 12.1245 20.965 12.8983 20.5494 13.6964C20.4394 13.914 20.3905 14.2284 20.4516 14.4582C21.1117 16.9612 21.7963 19.4642 22.4686 21.9671C22.5053 22.1122 22.542 22.2694 22.5909 22.4871C21.8452 22.4871 21.1728 22.5113 20.4883 22.4629C20.366 22.4508 20.1826 22.2211 20.146 22.0518C19.6937 20.4678 19.278 18.8837 18.8379 17.2997C18.8013 17.1788 18.7646 17.0579 18.7035 16.8644C18.5446 17.1304 18.4223 17.3239 18.3001 17.5295C17.4077 19.0651 16.5031 20.5887 15.6107 22.1364C15.464 22.3904 15.3051 22.4992 14.9994 22.4871C14.2904 22.4629 13.5814 22.475 12.7746 22.475C12.8968 22.2453 12.9824 22.076 13.0802 21.9067C14.596 19.307 16.0997 16.7193 17.6277 14.1317C17.7989 13.8415 17.8478 13.5997 17.75 13.2732C17.5055 12.463 17.2977 11.6287 17.0409 10.6976C16.9065 10.9274 16.8087 11.0725 16.7231 11.2176C14.6083 14.833 12.5056 18.4364 10.403 22.0639C10.2197 22.3904 10.0118 22.5113 9.63289 22.4992C8.96054 22.4629 8.27597 22.4871 7.53027 22.4871C7.64029 22.2694 7.72587 22.1122 7.81144 21.9671C10.5375 17.2997 13.2636 12.6444 15.9652 7.97698C16.173 7.61423 16.393 7.46913 16.8087 7.50541C17.2488 7.54168 17.6888 7.52959 18.1289 7.50541C18.4345 7.49331 18.5812 7.57796 18.6668 7.90443C18.9113 8.88387 19.2047 9.8633 19.4614 10.8427C19.5347 11.145 19.6692 11.2659 19.9871 11.2538C20.5983 11.2297 21.2217 11.2538 21.943 11.2538Z" fill="black"/>
                                        </svg>
                                        </>)}

                                        {ass ? ass : "ALGO"}
                                    </>)}
                                    </>):(<>
                                      {tk1 ==="ALGO" ? (<>
                                          {/* <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns={logovalue1}>
                                            <rect width="30.1212" height="30" rx="15" fill="White"/>
                                            <path d="M21.943 11.2538C21.4418 12.1245 20.965 12.8983 20.5494 13.6964C20.4394 13.914 20.3905 14.2284 20.4516 14.4582C21.1117 16.9612 21.7963 19.4642 22.4686 21.9671C22.5053 22.1122 22.542 22.2694 22.5909 22.4871C21.8452 22.4871 21.1728 22.5113 20.4883 22.4629C20.366 22.4508 20.1826 22.2211 20.146 22.0518C19.6937 20.4678 19.278 18.8837 18.8379 17.2997C18.8013 17.1788 18.7646 17.0579 18.7035 16.8644C18.5446 17.1304 18.4223 17.3239 18.3001 17.5295C17.4077 19.0651 16.5031 20.5887 15.6107 22.1364C15.464 22.3904 15.3051 22.4992 14.9994 22.4871C14.2904 22.4629 13.5814 22.475 12.7746 22.475C12.8968 22.2453 12.9824 22.076 13.0802 21.9067C14.596 19.307 16.0997 16.7193 17.6277 14.1317C17.7989 13.8415 17.8478 13.5997 17.75 13.2732C17.5055 12.463 17.2977 11.6287 17.0409 10.6976C16.9065 10.9274 16.8087 11.0725 16.7231 11.2176C14.6083 14.833 12.5056 18.4364 10.403 22.0639C10.2197 22.3904 10.0118 22.5113 9.63289 22.4992C8.96054 22.4629 8.27597 22.4871 7.53027 22.4871C7.64029 22.2694 7.72587 22.1122 7.81144 21.9671C10.5375 17.2997 13.2636 12.6444 15.9652 7.97698C16.173 7.61423 16.393 7.46913 16.8087 7.50541C17.2488 7.54168 17.6888 7.52959 18.1289 7.50541C18.4345 7.49331 18.5812 7.57796 18.6668 7.90443C18.9113 8.88387 19.2047 9.8633 19.4614 10.8427C19.5347 11.145 19.6692 11.2659 19.9871 11.2538C20.5983 11.2297 21.2217 11.2538 21.943 11.2538Z" fill="black"/>
                                        </svg> */}
                                         <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="30.1212" height="30" rx="15" fill="White"/>
                                            <path d="M21.943 11.2538C21.4418 12.1245 20.965 12.8983 20.5494 13.6964C20.4394 13.914 20.3905 14.2284 20.4516 14.4582C21.1117 16.9612 21.7963 19.4642 22.4686 21.9671C22.5053 22.1122 22.542 22.2694 22.5909 22.4871C21.8452 22.4871 21.1728 22.5113 20.4883 22.4629C20.366 22.4508 20.1826 22.2211 20.146 22.0518C19.6937 20.4678 19.278 18.8837 18.8379 17.2997C18.8013 17.1788 18.7646 17.0579 18.7035 16.8644C18.5446 17.1304 18.4223 17.3239 18.3001 17.5295C17.4077 19.0651 16.5031 20.5887 15.6107 22.1364C15.464 22.3904 15.3051 22.4992 14.9994 22.4871C14.2904 22.4629 13.5814 22.475 12.7746 22.475C12.8968 22.2453 12.9824 22.076 13.0802 21.9067C14.596 19.307 16.0997 16.7193 17.6277 14.1317C17.7989 13.8415 17.8478 13.5997 17.75 13.2732C17.5055 12.463 17.2977 11.6287 17.0409 10.6976C16.9065 10.9274 16.8087 11.0725 16.7231 11.2176C14.6083 14.833 12.5056 18.4364 10.403 22.0639C10.2197 22.3904 10.0118 22.5113 9.63289 22.4992C8.96054 22.4629 8.27597 22.4871 7.53027 22.4871C7.64029 22.2694 7.72587 22.1122 7.81144 21.9671C10.5375 17.2997 13.2636 12.6444 15.9652 7.97698C16.173 7.61423 16.393 7.46913 16.8087 7.50541C17.2488 7.54168 17.6888 7.52959 18.1289 7.50541C18.4345 7.49331 18.5812 7.57796 18.6668 7.90443C18.9113 8.88387 19.2047 9.8633 19.4614 10.8427C19.5347 11.145 19.6692 11.2659 19.9871 11.2538C20.5983 11.2297 21.2217 11.2538 21.943 11.2538Z" fill="black"/>
                                        </svg>

                                        </>):tk1 === "USDC" ?
                                        (<> <img  width="31" height="30" src={usdclogo}></img></>):
                                        tk1 === "ELEM" ?
                                        (<> <img  width="31" height="30" src={elem}></img></>):
                                        tk1 === "TAU" ?
                                        (<> <img  width="31" height="30" src={tau}></img></>):(<>
                                         <img width="31" height="30"  src={logo1}/>
                                        </>)}
                                        {/* <img width="31" height="30" viewBox="0 0 31 30" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROQNyD7j5bC5DMh1kN613JbHgcczZBwncxFrSp-5EhdVCrg3vEHayr5WtEo1JCSyyJUAs&usqp=CAU"/> */}

                                        {tk1 }
                                    </>)}
                                   
                                       
                                     </Breadcrumb.Item>
                                    <Breadcrumb.Item>
                                    {dvalue ?(<>
                                      {swapv ? (<>
                                      {logovalue2 ? (<>
                                          {/* <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns={logovalue1}>
                                            <rect width="30.1212" height="30" rx="15" fill="White"/>
                                            <path d="M21.943 11.2538C21.4418 12.1245 20.965 12.8983 20.5494 13.6964C20.4394 13.914 20.3905 14.2284 20.4516 14.4582C21.1117 16.9612 21.7963 19.4642 22.4686 21.9671C22.5053 22.1122 22.542 22.2694 22.5909 22.4871C21.8452 22.4871 21.1728 22.5113 20.4883 22.4629C20.366 22.4508 20.1826 22.2211 20.146 22.0518C19.6937 20.4678 19.278 18.8837 18.8379 17.2997C18.8013 17.1788 18.7646 17.0579 18.7035 16.8644C18.5446 17.1304 18.4223 17.3239 18.3001 17.5295C17.4077 19.0651 16.5031 20.5887 15.6107 22.1364C15.464 22.3904 15.3051 22.4992 14.9994 22.4871C14.2904 22.4629 13.5814 22.475 12.7746 22.475C12.8968 22.2453 12.9824 22.076 13.0802 21.9067C14.596 19.307 16.0997 16.7193 17.6277 14.1317C17.7989 13.8415 17.8478 13.5997 17.75 13.2732C17.5055 12.463 17.2977 11.6287 17.0409 10.6976C16.9065 10.9274 16.8087 11.0725 16.7231 11.2176C14.6083 14.833 12.5056 18.4364 10.403 22.0639C10.2197 22.3904 10.0118 22.5113 9.63289 22.4992C8.96054 22.4629 8.27597 22.4871 7.53027 22.4871C7.64029 22.2694 7.72587 22.1122 7.81144 21.9671C10.5375 17.2997 13.2636 12.6444 15.9652 7.97698C16.173 7.61423 16.393 7.46913 16.8087 7.50541C17.2488 7.54168 17.6888 7.52959 18.1289 7.50541C18.4345 7.49331 18.5812 7.57796 18.6668 7.90443C18.9113 8.88387 19.2047 9.8633 19.4614 10.8427C19.5347 11.145 19.6692 11.2659 19.9871 11.2538C20.5983 11.2297 21.2217 11.2538 21.943 11.2538Z" fill="black"/>
                                        </svg> */}
                                        <img width="31" height="30"  src={logovalue2}/>

                                        </>):(<>
                                          {/* <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="30.1212" height="30" rx="15" fill="White"/>
                                            <path d="M21.943 11.2538C21.4418 12.1245 20.965 12.8983 20.5494 13.6964C20.4394 13.914 20.3905 14.2284 20.4516 14.4582C21.1117 16.9612 21.7963 19.4642 22.4686 21.9671C22.5053 22.1122 22.542 22.2694 22.5909 22.4871C21.8452 22.4871 21.1728 22.5113 20.4883 22.4629C20.366 22.4508 20.1826 22.2211 20.146 22.0518C19.6937 20.4678 19.278 18.8837 18.8379 17.2997C18.8013 17.1788 18.7646 17.0579 18.7035 16.8644C18.5446 17.1304 18.4223 17.3239 18.3001 17.5295C17.4077 19.0651 16.5031 20.5887 15.6107 22.1364C15.464 22.3904 15.3051 22.4992 14.9994 22.4871C14.2904 22.4629 13.5814 22.475 12.7746 22.475C12.8968 22.2453 12.9824 22.076 13.0802 21.9067C14.596 19.307 16.0997 16.7193 17.6277 14.1317C17.7989 13.8415 17.8478 13.5997 17.75 13.2732C17.5055 12.463 17.2977 11.6287 17.0409 10.6976C16.9065 10.9274 16.8087 11.0725 16.7231 11.2176C14.6083 14.833 12.5056 18.4364 10.403 22.0639C10.2197 22.3904 10.0118 22.5113 9.63289 22.4992C8.96054 22.4629 8.27597 22.4871 7.53027 22.4871C7.64029 22.2694 7.72587 22.1122 7.81144 21.9671C10.5375 17.2997 13.2636 12.6444 15.9652 7.97698C16.173 7.61423 16.393 7.46913 16.8087 7.50541C17.2488 7.54168 17.6888 7.52959 18.1289 7.50541C18.4345 7.49331 18.5812 7.57796 18.6668 7.90443C18.9113 8.88387 19.2047 9.8633 19.4614 10.8427C19.5347 11.145 19.6692 11.2659 19.9871 11.2538C20.5983 11.2297 21.2217 11.2538 21.943 11.2538Z" fill="black"/>
                                        </svg> */}
  <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="30.1212" height="30" rx="15" fill="White"/>
                                            <path d="M21.943 11.2538C21.4418 12.1245 20.965 12.8983 20.5494 13.6964C20.4394 13.914 20.3905 14.2284 20.4516 14.4582C21.1117 16.9612 21.7963 19.4642 22.4686 21.9671C22.5053 22.1122 22.542 22.2694 22.5909 22.4871C21.8452 22.4871 21.1728 22.5113 20.4883 22.4629C20.366 22.4508 20.1826 22.2211 20.146 22.0518C19.6937 20.4678 19.278 18.8837 18.8379 17.2997C18.8013 17.1788 18.7646 17.0579 18.7035 16.8644C18.5446 17.1304 18.4223 17.3239 18.3001 17.5295C17.4077 19.0651 16.5031 20.5887 15.6107 22.1364C15.464 22.3904 15.3051 22.4992 14.9994 22.4871C14.2904 22.4629 13.5814 22.475 12.7746 22.475C12.8968 22.2453 12.9824 22.076 13.0802 21.9067C14.596 19.307 16.0997 16.7193 17.6277 14.1317C17.7989 13.8415 17.8478 13.5997 17.75 13.2732C17.5055 12.463 17.2977 11.6287 17.0409 10.6976C16.9065 10.9274 16.8087 11.0725 16.7231 11.2176C14.6083 14.833 12.5056 18.4364 10.403 22.0639C10.2197 22.3904 10.0118 22.5113 9.63289 22.4992C8.96054 22.4629 8.27597 22.4871 7.53027 22.4871C7.64029 22.2694 7.72587 22.1122 7.81144 21.9671C10.5375 17.2997 13.2636 12.6444 15.9652 7.97698C16.173 7.61423 16.393 7.46913 16.8087 7.50541C17.2488 7.54168 17.6888 7.52959 18.1289 7.50541C18.4345 7.49331 18.5812 7.57796 18.6668 7.90443C18.9113 8.88387 19.2047 9.8633 19.4614 10.8427C19.5347 11.145 19.6692 11.2659 19.9871 11.2538C20.5983 11.2297 21.2217 11.2538 21.943 11.2538Z" fill="black"/>
                                        </svg>
                                        </>)}

                                        {ass ? ass : "ALGO"}
                                    </>):(<>
                                      {logovalue1 ? (<>
                                          {/* <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns={logovalue1}>
                                            <rect width="30.1212" height="30" rx="15" fill="White"/>
                                            <path d="M21.943 11.2538C21.4418 12.1245 20.965 12.8983 20.5494 13.6964C20.4394 13.914 20.3905 14.2284 20.4516 14.4582C21.1117 16.9612 21.7963 19.4642 22.4686 21.9671C22.5053 22.1122 22.542 22.2694 22.5909 22.4871C21.8452 22.4871 21.1728 22.5113 20.4883 22.4629C20.366 22.4508 20.1826 22.2211 20.146 22.0518C19.6937 20.4678 19.278 18.8837 18.8379 17.2997C18.8013 17.1788 18.7646 17.0579 18.7035 16.8644C18.5446 17.1304 18.4223 17.3239 18.3001 17.5295C17.4077 19.0651 16.5031 20.5887 15.6107 22.1364C15.464 22.3904 15.3051 22.4992 14.9994 22.4871C14.2904 22.4629 13.5814 22.475 12.7746 22.475C12.8968 22.2453 12.9824 22.076 13.0802 21.9067C14.596 19.307 16.0997 16.7193 17.6277 14.1317C17.7989 13.8415 17.8478 13.5997 17.75 13.2732C17.5055 12.463 17.2977 11.6287 17.0409 10.6976C16.9065 10.9274 16.8087 11.0725 16.7231 11.2176C14.6083 14.833 12.5056 18.4364 10.403 22.0639C10.2197 22.3904 10.0118 22.5113 9.63289 22.4992C8.96054 22.4629 8.27597 22.4871 7.53027 22.4871C7.64029 22.2694 7.72587 22.1122 7.81144 21.9671C10.5375 17.2997 13.2636 12.6444 15.9652 7.97698C16.173 7.61423 16.393 7.46913 16.8087 7.50541C17.2488 7.54168 17.6888 7.52959 18.1289 7.50541C18.4345 7.49331 18.5812 7.57796 18.6668 7.90443C18.9113 8.88387 19.2047 9.8633 19.4614 10.8427C19.5347 11.145 19.6692 11.2659 19.9871 11.2538C20.5983 11.2297 21.2217 11.2538 21.943 11.2538Z" fill="black"/>
                                        </svg> */}
                                        <img width="31" height="30"  src={logovalue1}/>

                                        </>):(<>
                                          <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="30.1212" height="30" rx="15" fill="White"/>
                                            <path d="M21.943 11.2538C21.4418 12.1245 20.965 12.8983 20.5494 13.6964C20.4394 13.914 20.3905 14.2284 20.4516 14.4582C21.1117 16.9612 21.7963 19.4642 22.4686 21.9671C22.5053 22.1122 22.542 22.2694 22.5909 22.4871C21.8452 22.4871 21.1728 22.5113 20.4883 22.4629C20.366 22.4508 20.1826 22.2211 20.146 22.0518C19.6937 20.4678 19.278 18.8837 18.8379 17.2997C18.8013 17.1788 18.7646 17.0579 18.7035 16.8644C18.5446 17.1304 18.4223 17.3239 18.3001 17.5295C17.4077 19.0651 16.5031 20.5887 15.6107 22.1364C15.464 22.3904 15.3051 22.4992 14.9994 22.4871C14.2904 22.4629 13.5814 22.475 12.7746 22.475C12.8968 22.2453 12.9824 22.076 13.0802 21.9067C14.596 19.307 16.0997 16.7193 17.6277 14.1317C17.7989 13.8415 17.8478 13.5997 17.75 13.2732C17.5055 12.463 17.2977 11.6287 17.0409 10.6976C16.9065 10.9274 16.8087 11.0725 16.7231 11.2176C14.6083 14.833 12.5056 18.4364 10.403 22.0639C10.2197 22.3904 10.0118 22.5113 9.63289 22.4992C8.96054 22.4629 8.27597 22.4871 7.53027 22.4871C7.64029 22.2694 7.72587 22.1122 7.81144 21.9671C10.5375 17.2997 13.2636 12.6444 15.9652 7.97698C16.173 7.61423 16.393 7.46913 16.8087 7.50541C17.2488 7.54168 17.6888 7.52959 18.1289 7.50541C18.4345 7.49331 18.5812 7.57796 18.6668 7.90443C18.9113 8.88387 19.2047 9.8633 19.4614 10.8427C19.5347 11.145 19.6692 11.2659 19.9871 11.2538C20.5983 11.2297 21.2217 11.2538 21.943 11.2538Z" fill="black"/>
                                        </svg>
                                        </>)}
                                        {/* <img width="31" height="30" viewBox="0 0 31 30" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROQNyD7j5bC5DMh1kN613JbHgcczZBwncxFrSp-5EhdVCrg3vEHayr5WtEo1JCSyyJUAs&usqp=CAU"/> */}

                                        {ass1 ? ass1 : "ALGO"}
                                    </>)}
                                    </>):(<>
                                      {tk2 ==="ALGO" ? (<>
                                          {/* <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns={logovalue1}>
                                            <rect width="30.1212" height="30" rx="15" fill="White"/>
                                            <path d="M21.943 11.2538C21.4418 12.1245 20.965 12.8983 20.5494 13.6964C20.4394 13.914 20.3905 14.2284 20.4516 14.4582C21.1117 16.9612 21.7963 19.4642 22.4686 21.9671C22.5053 22.1122 22.542 22.2694 22.5909 22.4871C21.8452 22.4871 21.1728 22.5113 20.4883 22.4629C20.366 22.4508 20.1826 22.2211 20.146 22.0518C19.6937 20.4678 19.278 18.8837 18.8379 17.2997C18.8013 17.1788 18.7646 17.0579 18.7035 16.8644C18.5446 17.1304 18.4223 17.3239 18.3001 17.5295C17.4077 19.0651 16.5031 20.5887 15.6107 22.1364C15.464 22.3904 15.3051 22.4992 14.9994 22.4871C14.2904 22.4629 13.5814 22.475 12.7746 22.475C12.8968 22.2453 12.9824 22.076 13.0802 21.9067C14.596 19.307 16.0997 16.7193 17.6277 14.1317C17.7989 13.8415 17.8478 13.5997 17.75 13.2732C17.5055 12.463 17.2977 11.6287 17.0409 10.6976C16.9065 10.9274 16.8087 11.0725 16.7231 11.2176C14.6083 14.833 12.5056 18.4364 10.403 22.0639C10.2197 22.3904 10.0118 22.5113 9.63289 22.4992C8.96054 22.4629 8.27597 22.4871 7.53027 22.4871C7.64029 22.2694 7.72587 22.1122 7.81144 21.9671C10.5375 17.2997 13.2636 12.6444 15.9652 7.97698C16.173 7.61423 16.393 7.46913 16.8087 7.50541C17.2488 7.54168 17.6888 7.52959 18.1289 7.50541C18.4345 7.49331 18.5812 7.57796 18.6668 7.90443C18.9113 8.88387 19.2047 9.8633 19.4614 10.8427C19.5347 11.145 19.6692 11.2659 19.9871 11.2538C20.5983 11.2297 21.2217 11.2538 21.943 11.2538Z" fill="black"/>
                                        </svg> */}
                                         <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="30.1212" height="30" rx="15" fill="White"/>
                                            <path d="M21.943 11.2538C21.4418 12.1245 20.965 12.8983 20.5494 13.6964C20.4394 13.914 20.3905 14.2284 20.4516 14.4582C21.1117 16.9612 21.7963 19.4642 22.4686 21.9671C22.5053 22.1122 22.542 22.2694 22.5909 22.4871C21.8452 22.4871 21.1728 22.5113 20.4883 22.4629C20.366 22.4508 20.1826 22.2211 20.146 22.0518C19.6937 20.4678 19.278 18.8837 18.8379 17.2997C18.8013 17.1788 18.7646 17.0579 18.7035 16.8644C18.5446 17.1304 18.4223 17.3239 18.3001 17.5295C17.4077 19.0651 16.5031 20.5887 15.6107 22.1364C15.464 22.3904 15.3051 22.4992 14.9994 22.4871C14.2904 22.4629 13.5814 22.475 12.7746 22.475C12.8968 22.2453 12.9824 22.076 13.0802 21.9067C14.596 19.307 16.0997 16.7193 17.6277 14.1317C17.7989 13.8415 17.8478 13.5997 17.75 13.2732C17.5055 12.463 17.2977 11.6287 17.0409 10.6976C16.9065 10.9274 16.8087 11.0725 16.7231 11.2176C14.6083 14.833 12.5056 18.4364 10.403 22.0639C10.2197 22.3904 10.0118 22.5113 9.63289 22.4992C8.96054 22.4629 8.27597 22.4871 7.53027 22.4871C7.64029 22.2694 7.72587 22.1122 7.81144 21.9671C10.5375 17.2997 13.2636 12.6444 15.9652 7.97698C16.173 7.61423 16.393 7.46913 16.8087 7.50541C17.2488 7.54168 17.6888 7.52959 18.1289 7.50541C18.4345 7.49331 18.5812 7.57796 18.6668 7.90443C18.9113 8.88387 19.2047 9.8633 19.4614 10.8427C19.5347 11.145 19.6692 11.2659 19.9871 11.2538C20.5983 11.2297 21.2217 11.2538 21.943 11.2538Z" fill="black"/>
                                        </svg>

                                        </>):
                                        tk2 === "USDC" ?
                                        (<> <img  width="31" height="30" src={usdclogo}></img></>):
                                        tk2 === "ELEM" ?
                                        (<> <img  width="31" height="30" src={elem}></img></>):
                                        tk2 === "TAU" ?
                                        (<> <img  width="31" height="30" src={tau}></img></>):
                                        (<>                                         
                                        <img width="31" height="30"  src={logo1}/>
                                        </>)}
                                        {/* <img width="31" height="30" viewBox="0 0 31 30" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROQNyD7j5bC5DMh1kN613JbHgcczZBwncxFrSp-5EhdVCrg3vEHayr5WtEo1JCSyyJUAs&usqp=CAU"/> */}

                                        {tk2 }
                                    </>)}
                                    
                                   
                                    </Breadcrumb.Item>
                                </Breadcrumb>

                                <div className="d-flex mb-4 justify-content-between align-items-center">
                                    <div className="h3 mb-0">180.79</div>

                                    <ul className="chart-filter mb-0 d-flex align-items-center list-unstyled">
                                        <li>5M</li>
                                        <li>15M</li>
                                        <li className='active'>1H</li>
                                        <li>4H</li>
                                        <li>1D</li>
                                    </ul>
                                </div>

                                <SwapChart />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Layout>
    );
}

export default SwapPage;
