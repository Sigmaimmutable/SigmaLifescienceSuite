import React from 'react';
import { Button, Col, Container, Modal, Row, Breadcrumb, Tabs, Tab } from 'react-bootstrap';
import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';
import Layout from './Layout';
import {
    Link
  } from "react-router-dom";
// import Select from 'react-select';
// import makeAnimated from 'react-select/animated';
import FilterDropdown from '../Snippets/FilterDropdown';

import elem from '../../assets/images/elem-original.png';
import tau from '../../assets/images/tau-original.png';
import FilterDropdown2 from '../Snippets/FilterDropdown2';
// const animatedComponents = makeAnimated();
import MyAlgoConnect from "@randlabs/myalgo-connect";
import algosdk, { Algod,base64 } from "algosdk";
import appcss from '../../App.css';
import { AppId,escrowProgram } from '../swapConfig';


import cmblogo from '../../assets/images/modal-logo-new.png';

import { useEffect,useState } from "react";
import config from "../../configurl";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import {callapiforuserslist,postusertx,postuserdetail,updateusedetails,calluserpairlist} from '../apicallfunction';
// import { createpair,createtxhash,createtpairhistory,getpairedtokens,updatepairhistory } from './apicallfunction';
import { priceOfCoin1,priceOfCoin2,find_balance,find_balance_escrow,convert1,convert2,readingLocalstate,assetName,decodLocalState } from '../formula';
import { assert1Reserve,asset3id,escrowdatacompile,assert2Reserve,assert3Reserve,asset1_price,rewardasset3,rewardasset1,rewardasset2 } from '../formula';
const myAlgoWallet = new MyAlgoConnect();
// const algodClient = new algosdk.Algodv2('', 'https://api.testnet.algoexplorer.io', '');
let appID_global = AppId;
let data = escrowProgram;
const baseServer = 'https://testnet-algorand.api.purestake.io/ps2';
const port = '';

const token = {
   'X-API-Key': 'pOD5BAUCxq7InVPjo0sO01B0Vq4d7pD1ask5Ix43'
}

const algodClientGet = new algosdk.Algodv2(token, baseServer, port);

const algodClient = new algosdk.Algodv2('', 'https://node.testnet.algoexplorerapi.io', '');
const indexerClient = new algosdk.Indexer('', 'https://algoindexer.testnet.algoexplorerapi.io', '');

function PoolPage() {
  let history=useHistory();
    const [show, setShow] = React.useState(false);
    const [liquidity, setLiquidity] = React.useState(false);
    const [pair, setPair] = React.useState(false);
    const [remove, setRemove] = React.useState(false);
    const [manage, setManage] = React.useState(false);
    const [dbcheck, setdbcheck] = React.useState(false);
    const [input1, setValue] = React.useState('0.0');
    const [input2, setValue1] = React.useState('0.0');
    const[vs1,setvs1]=useState("");
    const[vs2,setvs2]=useState("")
    const[pc1 ,setpc1]= useState("");
    const[pc2 ,setpc2]= useState("");
    const [appId,setAppId] = useState("");
    const[as1,setas1] = useState([]);
    const[as2,setas2] = useState([]);
    const[as3,setas3] = useState([]);
    const[rstate,setrstate]= useState([]);
    const [AssetId1,setAssetId1] = useState("");
    const [AssetId2,setAssetId2] = useState("");
    const[aprice,setaprice]= useState([]);
    const[pooledValue,setpooladdedValue] = useState("");
    const[esdata,setesdata]=useState("");
    const[tescrowaddress,setescrowaddress] = useState("");

    const[ass1,setAssets1]= React.useState("");
    const[assn1,setAssetsn1]= React.useState("");
    const[assetID3,setassetID3] = useState("")

    const[balanceid1,setbamalanceid1]= useState("");
    const[balanceid2,setbamalanceid2]= useState("");
    // let a = [];
    
    const[amount1Out,setamount1Out]= useState([]);
    const[amount2Out,setamount2Out]= useState([]);
    const[gvprice,setgivenprice]=useState("");
    const[amount2Value,setamount2] = useState("");
    const[amount1Value,setamount1] = useState("");
    const[samount1,setsAmount1] = useState("");
    const[samount2,setsAmount2] = useState("");
    const[liquidityamount,setliquidityamount]=useState("");
    const[a1balance,setas1balance]=useState("");
    const[a2balance,setas2balance]=useState("");
    const[excessb,setexcessb] = useState("");
    const[assn,setAssetsn]= React.useState("");
    const[ass,setAssets]= React.useState("");
    const [algoPrice, setAlgoPrice] = useState("");
    const [usdcPrice, setUsdcPrice] = useState("");
    const[pr1,setpr1]= useState("");
    const[pr2,setpr2]= useState("");

    const[tk1,sett1] = useState("");
    const[tk2,sett2] = useState("");
    const[swapopt,setoswapopt]= useState(false);
    const[esc,setesc]= useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleLiquidiy = () => {setLiquidity(!liquidity); setPair(false)};
    const handlePair = () => {setLiquidity(!liquidity); setPair(!pair)};
    const handleManage = () => {setManage(!manage); setShow(!show)};
    const handleRemove = () => setRemove(!remove);
    
    const [showOptInButton, setShowOptInButton] = React.useState(false);
    const [showMintButton, setShowMintButton] = React.useState(false);
    const [s1, sets1] = useState("");
    const [s2, sets2] = useState("");
    const [ilt, setilt] = useState("");
    const[dbdata,setdbdata] = useState([]);
    const[asPrice,setasprice] = useState([]);
    const[unclaimed_protocol_fees,setunclaimed_protocol_fees]= useState("");
    const[outstanding_asset1_amount,setoutstanding_asset1_amount]= useState("")
    const[outstanding_asset2_amount,setoutstanding_asset2_amount]= useState("")
    const[outstanding_liquidity_amount,setoutstanding_liquidity_amount]= useState("")

    const[id1Token,setTokenId1] = useState("");
    const[id2Token,setTokenId2] = useState("");
    const[logovalue1,setlogo1] = useState("");
    const[logovalue2,setlogo2] = useState("");
    // console.log("dbdata",dbdata)
    useEffect(() =>{ufirst()},[])

    // useEffect(() =>{callp()},[])

    const [token, setToken] = useState([]);
   

    const ufirst =() =>{
      if(dbdata.length <= 0){
        first();
        
       
     }
     checkbalan();
     
    ////console.log("tk1",tk1)
     
    }
    const callp1 =() =>{
      if(tk1){
        // console.log("tk1")
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
      
      if(tk1 === "Algo"){
        p1 =  algoPrice;
       
      }
      else if(tk1 === "USDC"){
        
        p1 = usdcPrice;
       
      }
     
      setpr1(p1);
    }
    const call_price2 =async()=>{
      let p2;
      if(tk2 === "Algo"){
       p2 = algoPrice;
      }
      else if(tk2 === "USDC"){
        p2 = usdcPrice;
      }
    
      setpr2(p2);
    }
    
    const first = async() =>{
     let capi = await calluserpairlist();
     console.log("userlist",capi);
      // let capi = await callapiforuserslist();

      setToken(capi)
    //   let capi = await getpairedtokens()
    // setToken(capi);
      if(capi){
        let tokendata = capi;
        // setdbdata(e.data);
       
        let arrayvalue =[];
        let arrayvalue1 =[];
        let arrayvalue2 =[];
        let assetprice =[];
        let edata=[];
        let arvaluearray=[];
        for(let i=0;i<tokendata.length ; i++){
         
          let a1,a2,b1,b2,b3,b4;
            
            {
          // if(e.data[i].profileURL){
            edata.push(tokendata[i])
          
            // const assets = await indexerClient.lookupAssetByID(e.data[i].asetId1).do();
            // const assets2 = await indexerClient.lookupAssetByID(e.data[i].asetId2).do();
            // setas1(assets.asset.params.name);
            // arrayvalue.push(assets.asset.params.name)
            // arrayvalue1.push(assets2.asset.params.name)
            a1 = await readingLocalstate(algodClientGet,tokendata[i].escrowAddress);
            console.log("values",a1);
            
            // console.log("name",assert1Reserve(await readingLocalstate(algodClient,tokendata[i].algoAddress)))
            // arrayvalue.push(assert1Reserve(a1))
            // // console.log("as1",as1)
            // // a2 = await readingLocalstate(algodClient,tokendata[i].algoAddress);
            // arrayvalue1.push(assert2Reserve(a1))
            // console.log("enetering values")
            // arrayvalue2.push(assert3Reserve(a1))
            // assetprice.push(asset1_price(assert1Reserve(a1),assert2Reserve(a1)))
            // console.log("enetering values")

            b1 = assert1Reserve(a1);
            b2 = assert2Reserve(a1);
            b3 = assert3Reserve(a1);
            //console.log("a1",b1,b2,b3)
            b4 = asset1_price(assert1Reserve(a1),assert2Reserve(a1));
            //console.log("a1",b4)
            }
          
          
          if(b1 === undefined & b2  === undefined & b3 === undefined & b4 === undefined){
           
          }
          else{
            arvaluearray = {
              "a1":b1,"a2":b2,"a3":b3,"a4":b4
            };
            arrayvalue.push(arvaluearray);
          }
         
           console.log("arvaluearray",arvaluearray)
          
          // arrayvalue1.push(b2);
          // arrayvalue2.push(b3);
          // assetprice.push(b4);
         
          
        }
        //console.log("coming",arrayvalue)
        setas1(arrayvalue);
        //console.log("arrayvalue1",arrayvalue)

      //  setas2(arrayvalue1);
      //  setas3(arrayvalue2);
      //  console.log("assetprice",assetprice)
      //  setasprice(assetprice);

       setdbdata(edata)
       console.log("edata",edata)
       
      };
      let pk1 = await priceOfCoin1();
      setAlgoPrice(pk1);
      
   
    let pk2 = await priceOfCoin2();

    setUsdcPrice(pk2);
    
    }
   

    
    async function readLocalState(client, account, index1,asset1,asset2,asset3){
        let accountInfoResponse = await readingLocalstate(client,account);
        
        for(let i=0;i<15;i++){
          let keys = accountInfoResponse['apps-local-state'][0]['key-value'][i]['key'];
          // console.log("keys",keys)
          if(keys === "czE="){
           sets1(accountInfoResponse['apps-local-state'][0]['key-value'][i]['value']['uint'])
           
          }
          if(keys === "czI="){
              sets2(accountInfoResponse['apps-local-state'][0]['key-value'][i]['value']['uint'])
           
          }
          if(keys === "aWx0"){
              setilt(accountInfoResponse['apps-local-state'][0]['key-value'][i]['value']['uint'])
            
            } 
          if(keys === "cA=="){
            setunclaimed_protocol_fees(accountInfoResponse['apps-local-state'][0]['key-value'][i]['value']['uint'])
           
          } 
          if(keys.slice(0,2) === "bw"){
            let a1 = decodLocalState(String(keys));
           
            if(decodLocalState(keys) === asset1){
              setoutstanding_asset1_amount(accountInfoResponse['apps-local-state'][0]['key-value'][i]['value']['uint'])
              
            } 
            if(decodLocalState(keys) === asset2){
              setoutstanding_asset2_amount(accountInfoResponse['apps-local-state'][0]['key-value'][i]['value']['uint'])
             
            } 
            if(decodLocalState(keys) === asset3){
              setoutstanding_liquidity_amount(accountInfoResponse['apps-local-state'][0]['key-value'][i]['value']['uint'])
           
            }
          }          
         
          // let a2 = decodLocalState(asset2);
          // let a3 = decodLocalState(asset3);
          // if(decodLocalState(keys) === asset1){
          //   setoutstanding_asset1_amount(accountInfoResponse['apps-local-state'][0]['key-value'][i]['value']['uint'])
          //   console.log("outstanding",  outstanding_asset1_amount  )
          // } 
          // if(keys === a2){
          //   setoutstanding_asset2_amount(accountInfoResponse['apps-local-state'][0]['key-value'][i]['value']['uint'])
          //   console.log("ilt", outstanding_asset2_amount )
          // } 
          // if(keys === a3){
          //   setoutstanding_liquidity_amount(accountInfoResponse['apps-local-state'][0]['key-value'][i]['value']['uint'])
          //   console.log("ilt",outstanding_liquidity_amount )
          // } 
        }
      //   for (let i = 0; i < accountInfoResponse['apps-local-state'].length; i++) { 
      //     if (accountInfoResponse['apps-local-state'][i].id == index1) {
      //         console.log("Application's global state:");
      //         for (let n = 0; n < accountInfoResponse['apps-local-state'][i]['key-value'].length; n++) {
      //            // console.log(accountInfoResponse['apps-local-state'][i]['key-value']);
      //             let enc = accountInfoResponse['apps-local-state'][i]['key-value'][n];
      //             if(enc['key'] === "czE="){
      //               sets1(enc.value.uint)
      //               console.log("s1",s1)
      //             }
      //             if(enc['key'] === "czI="){
      //               sets2(enc.value.uint)
      //               console.log("s2",s2)
      //             }
      //             if(enc['key'] === "aWx0"){
      //               setilt(enc.value.uint)
      //             }                  
      //         }
              
      //     }
      // }
    }
    // useEffect(() =>{},[s1,s2])
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

      const checkbalan = async()=>{
        //console.log("balance",id1Token)
        let s1 = await find_balance(id1Token);
        setbamalanceid1(s1);
       
        let s2 = await find_balance(id2Token);
        setbamalanceid2(s2);
        //console.log("balance",s2,id2Token)
      }
    const bootstrap = async (appid,asid1,asid2) => {
      // console.log("value1",parseInt(1234.56),parseFloat(1234.56).toFixed(0),Math.floor(1234.56))
      let tokenid1 ;
      if(asid1 === ""|| asid1 === undefined ||asid1 ===null){
        setAssetId1(0);
        tokenid1 = 0;
      }
      else{
         tokenid1 = asid1;
      }
       
        let t1;
        let t2;
        let tokenid2 = asid2;

        let results = await escrowdatacompile(appID_global,tokenid1,tokenid2);

        let ci1;
        let ci2;
    if(parseInt(tokenid1) > parseInt(tokenid2) ){
      // localStorage.setItem("tokenid1",tokenid1);
      // localStorage.setItem("tokenid2",tokenid2);
      t1 = tokenid1;
      t2 = tokenid2;
      // ci1 = input1;
      // ci2 = input2;
      // setvs1(input1);
      // setvs2(input2)
      // //console.log(t1)
      // //console.log(t2)
    }
    else{
      // localStorage.setItem("tokenid1",tokenid2);
      // localStorage.setItem("tokenid2",tokenid1);
       t1 = tokenid2;
       t2 = tokenid1;
      //  ci1 = input2;
      // ci2 = input1;
      //  setvs1(input2);
      // setvs2(input1)
      // //console.log(t1)
      // //console.log(t2)
    }
    console.log("tokenid1",tokenid1,tokenid2)
        let index = parseInt(appID_global);
       

        // setvs1(ci1);
        // setvs2(ci2);
        // console.log("cali1",cali1,cali2);
        setescrowaddress(results.hash);
        // localStorage.setItem("escrow",results.hash)
    
        let program = new Uint8Array(Buffer.from(results.result, "base64"));
    
        let lsig = algosdk.makeLogicSig(program);
        // console.log("Escrow =", lsig.address());
        try {
          // const accounts = await myAlgoWallet.connect();
          // const addresses = accounts.map((account) => account.address);
          const params = await algodClient.getTransactionParams().do();
    
          let sender =  localStorage.getItem("walletAddress");;
          let recv_escrow = lsig.address();
          let amount ;
         
          
          if(parseInt(t2) == 0){
            let accountasset1 = await algodClientGet.getAssetByID(t1).do();
            // let accountasset2 = await algodClient.getAssetByID(t2).do();
            let unit1 = accountasset1.params['unit-name'];
            // console.log(unit1)
            let unit2 ="ALGO";
            amount = 860000;
            let transaction1 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
              from: sender,
              to: recv_escrow,
              amount: amount,
              note: undefined,
              suggestedParams: params,
            });
      
            let appArg = [];
            appArg.push(new Uint8Array(Buffer.from("bootstrap")));
            appArg.push(algosdk.encodeUint64(parseInt(t1)));
            appArg.push(algosdk.encodeUint64(parseInt(t2)));
            let foreignassets = [];
            foreignassets.push(parseInt(t1));
            // foreignassets.push(parseInt(t2));
            const transaction2 = algosdk.makeApplicationOptInTxnFromObject({
              from: recv_escrow,
              appIndex: index,
              appArgs: appArg,
              accounts: [sender],
              foreignAssets: foreignassets,
              suggestedParams: params,
            });
      
            const transaction3 =
              algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
                from: recv_escrow,
                assetName: "Element Pool "+unit1+"-"+"ALGO",
                unitName: "ELEMPOOL",
                assetURL: "https://Element.org",
                total: 18446744073709551615n,
                decimals: 6,
                note: undefined,
                suggestedParams: params,
              });
      
            const transaction4 =
              algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                from: recv_escrow,
                to: recv_escrow,
                assetIndex: parseInt(t1),
                note: undefined,
                amount: 0,
                suggestedParams: params,
              });
      
            
      
            const groupID = algosdk.computeGroupID([
              transaction1,
              transaction2,
              transaction3,
              transaction4
            ]);
            const txs = [
              transaction1,
              transaction2,
              transaction3,
              transaction4              
            ];
            txs[0].group = groupID;
            txs[1].group = groupID;
            txs[2].group = groupID;
            txs[3].group = groupID;
      
            const signedTx1 = await myAlgoWallet.signTransaction(txs[0].toByte());
            const signedTx2 = algosdk.signLogicSigTransaction(txs[1], lsig);
      
            const signedTx3 = algosdk.signLogicSigTransaction(txs[2], lsig);
            const signedTx4 = algosdk.signLogicSigTransaction(txs[3], lsig);
            
      
            
            toast.info("Transaction in Progress"); 
            const response = await algodClient
              .sendRawTransaction([
                signedTx1.blob,
                signedTx2.blob,
                signedTx3.blob,
                signedTx4.blob
              ])
              .do();
          //console.log("TxID", JSON.stringify(response, null, 1));
          await waitForConfirmation(algodClient, response.txId);
          toast.success(`Transaction Success ${response.txId}`);
         
          setShowOptInButton(true);
          }
          else{
            let accountasset1 = await algodClientGet.getAssetByID(t1).do();
            let accountasset2 = await algodClientGet.getAssetByID(t2).do();
            let unit1 =accountasset1.params['unit-name']
           
            amount = 961000;
            let unit2 =accountasset2.params['unit-name']
          let transaction1 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
            from: sender,
            to: recv_escrow,
            amount: amount,
            note: undefined,
            suggestedParams: params,
          });
    
          let appArg = [];
          appArg.push(new Uint8Array(Buffer.from("bootstrap")));
          appArg.push(algosdk.encodeUint64(parseInt(t1)));
          appArg.push(algosdk.encodeUint64(parseInt(t2)));
          let foreignassets = [];
          foreignassets.push(parseInt(t1));
          foreignassets.push(parseInt(t2));
          const transaction2 = algosdk.makeApplicationOptInTxnFromObject({
            from: recv_escrow,
            appIndex: index,
            appArgs: appArg,
            accounts: [sender],
            foreignAssets: foreignassets,
            suggestedParams: params,
          });
    
          const transaction3 =
            algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
              from: recv_escrow,
              assetName: "Element Pool " + unit1 + "-" + unit2,
              unitName: "ELEMPOOL",
              assetURL: "https://Element.org",
              total: 18446744073709551615n,
              decimals: 6,
              note: undefined,
              suggestedParams: params,
            });
    
          const transaction4 =
            algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
              from: recv_escrow,
              to: recv_escrow,
              assetIndex: parseInt(t1),
              note: undefined,
              amount: 0,
              suggestedParams: params,
            });
    
          const transaction5 =
            algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
              from: recv_escrow,
              to: recv_escrow,
              assetIndex: parseInt(t2),
              note: undefined,
              amount: 0,
              suggestedParams: params,
            });
    
          const groupID = algosdk.computeGroupID([
            transaction1,
            transaction2,
            transaction3,
            transaction4,
            transaction5,
          ]);
          const txs = [
            transaction1,
            transaction2,
            transaction3,
            transaction4,
            transaction5,
          ];
          txs[0].group = groupID;
          txs[1].group = groupID;
          txs[2].group = groupID;
          txs[3].group = groupID;
          txs[4].group = groupID;
    
          const signedTx1 = await myAlgoWallet.signTransaction(txs[0].toByte());
          const signedTx2 = algosdk.signLogicSigTransaction(txs[1], lsig);
    
          const signedTx3 = algosdk.signLogicSigTransaction(txs[2], lsig);
          const signedTx4 = algosdk.signLogicSigTransaction(txs[3], lsig);
          const signedTx5 = algosdk.signLogicSigTransaction(txs[4], lsig);
    
          
          toast.info("Transaction in Progress");
          const response = await algodClient
            .sendRawTransaction([
              signedTx1.blob,
              signedTx2.blob,
              signedTx3.blob,
              signedTx4.blob,
              signedTx5.blob,
            ])
            .do();
          //console.log("TxID", JSON.stringify(response, null, 1));
          await waitForConfirmation(algodClient, response.txId);
          toast.success(`Transaction Success ${response.txId}`);
          setShowOptInButton(true);
          }
          
          
         
          //setShowOptInButton(true);
        } catch (err) {
          toast.error(`Transaction Failed due to ${err}`);
          //console.error(err);
        }
      };
      const optIn =async (appid) => {

        // const algodClient = new algosdk.Algodv2('', 'https://api.testnet.algoexplorer.io', '');
        const params = await algodClient.getTransactionParams().do();
        // let escrowaddress = localStorage.getItem("escrow");
        // console.log("Hash = " + AssetId1,AssetId2);
        let results = await escrowdatacompile(appID_global,AssetId1,AssetId2);
        // console.log("result",results)
        // let accountInfoResponse = await algodClient.accountInformation(results.hash).do();
        let compiled = await readingLocalstate(algodClientGet,results.hash)
        // let replacedData = data.replaceAll("Token1",tokenid1).replaceAll("Token2",tokenid2).replaceAll("appId",appID_global);
        // let results = await algodClient.compile(replacedData).do();
    
        console.log("Hash =info " +  await compiled['created-assets'][0]['index']);
        // console.log("Result = " + results.result);
        let as3id = await compiled['created-assets'][0]['index'];
        let assetId3 = as3id;
        
        localStorage.setItem("newasset",assetId3);
        setassetID3(assetId3);
        // console.log('Asset 3 ID: ', assetId3);
  
  
      
    let index = parseInt(appid);
    // console.log("appId inside donate", index)
  try {
    

    let optinTranscation = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from:localStorage.getItem("walletAddress"),
      to :localStorage.getItem("walletAddress"),
      assetIndex: assetId3 ,
      amount: 0,
      suggestedParams:params,
      appIndex:index
    });

    
      
      const signedTx1 = await myAlgoWallet.signTransaction(optinTranscation.toByte());
      toast.info("Transaction in Progress");

  const response = await algodClient.sendRawTransaction(signedTx1.blob).do();
  //console.log("TxID", JSON.stringify(response, null, 1));
  await waitForConfirmation(algodClient, response.txId);
  toast.success(`Transaction Success ${response.txId}`);
  // toast.info("Create Liquidity Done Sucessfully");
  setShowMintButton(true);
    } catch (err) {
      toast.error(`Transaction Failed due to ${err}`);
      //console.error(err);
    }

     
  }
  const mint = async (appid,a1,a2,i1,i2) => {
    console.log("a1",a1)
    let tokenid1;
    if(a1 === "" || a1 === undefined|| a1 === null){
       tokenid1 = 0;
    }
    else{
       tokenid1 = a1;
    }
    let tokenid2 = a2;
    let t1,t2,l1,l2;
    if(parseInt(tokenid1) > parseInt(tokenid2) ){
     
      t1 = tokenid1;
      t2 = tokenid2;
      l1 = i1;
      l2 = i2;
     
    }
    else{
     
       t1 = tokenid2;
       t2 = tokenid1;
       l1 = i2;
       l2 = i1;
      
    }
    let index = parseInt(appid);
    // console.log("appId inside donate", index);
    // console.log("input1",input1)
    // console.log("input2",input2)
    setAppId(appid);
   
    
    let results = await escrowdatacompile(appID_global,t1,t2);
    let compiled = await readingLocalstate(algodClientGet,results.hash)
    // let replacedData = data.replaceAll("Token1",tokenid1).replaceAll("Token2",tokenid2).replaceAll("appId",appID_global);
    // let results = await algodClient.compile(replacedData).do();

    // console.log("Hash = " + results.hash);
    // console.log("Result = " + results.result);
    let as3id = await compiled['created-assets'][0]['index'];
        
    // let as3id = await asset3id(compiled);
    
    let assetId3 = as3id;
    // console.log(assetId3)

    
    let program = new Uint8Array(Buffer.from(results.result, "base64"));

    let lsig = algosdk.makeLogicSig(program);
    console.log("Escrow =", lsig.address()); 



    let total;
    console.log("s1",l1,l2)
    // if (s1 === undefined || s2 === "") {
      total = (Math.sqrt(l1 * l2) - 1000);
      // total = Math.floor(total - (total * 0.05));
      // total = total -(total * 0.05);
      // console.log("Total,: ", total);
    // } else {
      // let liquidity_asset_amount = Math.min(
      //   (vs1 * ilt) / s1,
      //   (vs2 * ilt) / s2
      // );
      // total = Math.floor((liquidity_asset_amount - liquidity_asset_amount ) * 0.05);
      // console.log("Total 2: ", total);
    // }
    let asetName1,asetName2;
    if(parseInt(t1) === 0){
      asetName1  = "ALGO"
    }
    else{
      asetName1 = await assetName(t1);
    }
    if(parseInt(t2) === 0){
      asetName2  = "ALGO"
    }
    else{
      asetName2 = await assetName(t2);
    }
    let asset3Name = await assetName(assetId3);

    
  console.log("values")
    {
                                
          // this.setState({setLoading:false}) ;  
          // this.setState({setisOpenmkyc:true}); 
          try {

            const params = await algodClient.getTransactionParams().do();
            let sender = localStorage.getItem("walletAddress");
      
            let recv_escrow = lsig.address();
            let amount = 3000;
            const userjsonkey= {
              "algoAddress":  localStorage.getItem("walletAddress"),
              "escrowAddress": results.hash,
              "asetName1": asetName1,
              "asetName2": asetName2,
              "tvl": (l1+l2),
              "volume": (l1+l2+total),
              "fees": amount,
              "asetId1": t1,    
              "asetId2": t2,
              "asetId3": assetId3, 
          }
      
            let note1 = [];
            note1.push(new Uint8Array(Buffer.from("fee")));
            if(parseInt(t2) == 0){
      
              let transaction1 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
                from: sender,
                to: recv_escrow,
                amount: amount,
                suggestedParams: params,
              });
        
              let appArg = [];
              appArg.push(new Uint8Array(Buffer.from("mint")));
        
              let foreignassets = [];
              foreignassets.push(parseInt(t1));
              // foreignassets.push(parseInt(tokenid2));
              foreignassets.push(parseInt(assetId3));
              const transaction2 = algosdk.makeApplicationNoOpTxnFromObject({
                from: recv_escrow,
                appIndex: index,
                appArgs: appArg,
                appAccounts: sender,
                accounts: [sender],
                foreignAssets: foreignassets,
                suggestedParams: params,
              });
        
              const transaction3 =
                algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                  from: sender,
                  to: recv_escrow,
                  assetIndex: parseInt(t1),
                  note: undefined,
                  accounts: sender,
                  amount: parseInt(l1),
                  suggestedParams: params,
                });
        
              const transaction4 =
                algosdk.makePaymentTxnWithSuggestedParamsFromObject({
                  from: sender,
                  to: recv_escrow,
                  note: undefined,
                  accounts: sender,
                  amount: parseInt(l2),
                  suggestedParams: params,
                });
        
              let foreignassetliquidity = [];
              foreignassetliquidity.push(parseInt(assetId3));
              
              const transaction5 =
                algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                  from: recv_escrow,
                  to: sender,
                  assetIndex: parseInt(assetId3),
                  note: undefined,
                  accounts: [recv_escrow],
                  appAccounts: recv_escrow,
                  foreignAssets: foreignassetliquidity,
                  amount: parseInt(total),
                  suggestedParams: params,
                });
                console.log("total",total, parseInt(total),parseFloat(total).toFixed(0))
                const groupID = algosdk.computeGroupID([
                  transaction1,
                  transaction2,
                  transaction3,
                  transaction4,
                  transaction5,
                ]);
                const txs = [
                  transaction1,
                  transaction2,
                  transaction3,
                  transaction4,
                  transaction5,
                ];
                for (let i = 0; i <= 4; i++) txs[i].group = groupID;
          
                const signedTx1 = algosdk.signLogicSigTransaction(txs[1], lsig);
                const signedTx2 = algosdk.signLogicSigTransaction(txs[4], lsig);
        
                const signedTxArray = await myAlgoWallet.signTransaction([txs[0].toByte(),txs[2].toByte(),txs[3].toByte()]);
                toast.info("Transaction in Progress");
                const response = await algodClient
                  .sendRawTransaction([
                    signedTxArray[0].blob,
                    signedTx1.blob,
                    signedTxArray[1].blob,
                    signedTxArray[2].blob,
                    signedTx2.blob,
                  ])
                  .do();
              //console.log("TxID", JSON.stringify(response, null, 1));
                await waitForConfirmation(algodClient, response.txId);
      
                let an = asetName1 +"/"+asetName2;
                await postuserdetail(userjsonkey);
                // await updateusedetails(tokenid1,tokenid2,swap_fees,tvl,vl);
                await postusertx(recv_escrow,response.txId,"CREATE LIQUIDITY",total,an)
                handlePair();
                // await postusertx(localStorage.getItem("walletAddress"),response.txId,recv_escrow,"Create Liquidity",0,total,tokenid1,tokenid2,amount);
                toast.success(`Transaction Success ${response.txId}`);
                toast.info("Creating Liquidity Done Sucessfully");
                // await createpair(recv_escrow,asetName1,asetName2,asset3Name,tokenid1,tokenid2,assetId3)
                // await createtpairhistory(recv_escrow,(vs1+vs2),(vs1+vs2+total),amount,asetName1,asetName2,asset3Name,tokenid1,tokenid2,assetId3);
               
                
                // window.location.reload();
              //   setTxId(response.txId);
            }
            else{
            let transaction1 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
              from: sender,
              to: recv_escrow,
              amount: amount,
              suggestedParams: params,
            });
      
            let appArg = [];
            appArg.push(new Uint8Array(Buffer.from("mint")));
      
            let foreignassets = [];
            foreignassets.push(parseInt(t1));
            foreignassets.push(parseInt(t2));
            foreignassets.push(parseInt(assetId3));
            const transaction2 = algosdk.makeApplicationNoOpTxnFromObject({
              from: recv_escrow,
              appIndex: index,
              appArgs: appArg,
              appAccounts: sender,
              accounts: [sender],
              foreignAssets: foreignassets,
              suggestedParams: params,
            });
      
            const transaction3 =
              algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                from: sender,
                to: recv_escrow,
                assetIndex: parseInt(t1),
                note: undefined,
                accounts: sender,
                amount: parseInt(l1),
                suggestedParams: params,
              });
      
            const transaction4 =
              algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                from: sender,
                to: recv_escrow,
                assetIndex: parseInt(t2),
                note: undefined,
                accounts: sender,
                amount: parseInt(l2),
                suggestedParams: params,
              });
      
            let foreignassetliquidity = [];
            foreignassetliquidity.push(parseInt(assetId3));
          //console.log(total.toFixed(0));
            const transaction5 =
              algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                from: recv_escrow,
                to: sender,
                assetIndex: parseInt(assetId3),
                note: undefined,
                accounts: [recv_escrow],
                appAccounts: recv_escrow,
                foreignAssets: foreignassetliquidity,
                amount: parseInt((total)),
                suggestedParams: params,
              });
              console.log("total",total, parseInt(total),parseFloat(total).toFixed(0))
              const groupID = algosdk.computeGroupID([
                transaction1,
                transaction2,
                transaction3,
                transaction4,
                transaction5,
              ]);
              const txs = [
                transaction1,
                transaction2,
                transaction3,
                transaction4,
                transaction5,
              ];
              for (let i = 0; i <= 4; i++) txs[i].group = groupID;
        
              const signedTx1 = algosdk.signLogicSigTransaction(txs[1], lsig);
              const signedTx2 = algosdk.signLogicSigTransaction(txs[4], lsig);
      
              const signedTxArray = await myAlgoWallet.signTransaction([txs[0].toByte(),txs[2].toByte(),txs[3].toByte()]);
              toast.info("Transaction in Progress");
              const response = await algodClient
                .sendRawTransaction([
                  signedTxArray[0].blob,
                  signedTx1.blob,
                  signedTxArray[1].blob,
                  signedTxArray[2].blob,
                  signedTx2.blob,
                ])
                .do();
            //console.log("TxID", JSON.stringify(response, null, 1));
              await waitForConfirmation(algodClient, response.txId);
              
              await postuserdetail(userjsonkey);
                let an = asetName1 +"/"+asetName2;
                // await updateusedetails(tokenid1,tokenid2,swap_fees,tvl,vl);
                await postusertx(recv_escrow,response.txId,"CREATE LIQUIDITY",total,an)
                handlePair();
              // await postusertx(localStorage.getItem("walletAddress"),response.txId,recv_escrow,"Create Liquidity",0,total,tokenid1,tokenid2,amount);
              // await createpair(recv_escrow,asetName1,asetName2,asset3Name,tokenid1,tokenid2,assetId3);
              // await createtpairhistory(recv_escrow,(vs1+vs2),(vs1+vs2+total),amount,asetName1,asetName2,asset3Name,tokenid1,tokenid2,assetId3);
              toast.success(`Transaction Success ${response.txId}`);
              toast.info("Creating Liquidity Done Sucessfully");
              // window.location.reload();
              // setTxId(response.txId);
            }
            
           
            setShow(true);
            // console.log("userjson",userjsonkey)
          } catch (err) {
            toast.error(`Transaction Failed due to ${err}`);
           
          //console.error(err);
          }                                         
        }
    
  };
  const mint1call = async (appid,a1,a2,asn1,asn2) => {
 
    let index = parseInt(appid);
  //console.log("appId inside donate", index);
  //console.log("input1",a1)
  //console.log("input2",a2)
    setAppId(appid);
    let tokenid1 = rstate.asetId1;
    let tokenid2 = rstate.asetId2;
      
    let replacedData = data.replaceAll("Token1",tokenid1).replaceAll("Token2",tokenid2).replaceAll("appId",appID_global);
    let results = await algodClient.compile(replacedData).do();

  //console.log("Hash = " + results.hash);
  //console.log("Result = " + results.result);

    
    let assetId3 = rstate.asetId3;
  //console.log(assetId3)

    let program = new Uint8Array(Buffer.from(results.result, "base64"));

    let lsig = algosdk.makeLogicSig(program);
  //console.log("Escrow =", lsig.address()); 

    // readLocalState(algodClient,results.hash,appId,tokenid1,tokenid2,assetId3);

let i1 = Math.floor(a1);
let i2 = Math.floor(a2);
console.log("input1",i1)
  //console.log("input2",ilt)
let tvl = s1+s2;
let vl = s1 + s2 + ilt;
    let total;
   

      let liquidity_asset_amount = Math.min(
        (i1 * ilt) / s1,
        (i2 * ilt) / s2
      );
      liquidity_asset_amount = liquidity_asset_amount - (liquidity_asset_amount * 0.05)
      //  let liquidity_asset_amount = Math.min(
      //   (i1 * aprice[3]) / aprice[0],
      //   (i2 * aprice[3]) / aprice[1]
      // );
    //console.log("liquidity_asset_amount",liquidity_asset_amount)
      // total = Math.floor((liquidity_asset_amount - liquidity_asset_amount )* 0.5);
      total = Math.floor(liquidity_asset_amount)
    console.log("Total 2: ", total,a1,Math.floor(a2));
   

                          
          // this.setState({setLoading:false}) ;  
          // this.setState({setisOpenmkyc:true}); 
          try {

            const params = await algodClient.getTransactionParams().do();
            let sender = localStorage.getItem("walletAddress");
      
            let recv_escrow = lsig.address();
            let amount = 3000;
      
            let note1 = [];
            note1.push(new Uint8Array(Buffer.from("fee")));
            if(parseInt(tokenid2) == 0){
      
              let transaction1 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
                from: sender,
                to: recv_escrow,
                amount: amount,
                suggestedParams: params,
              });
        
              let appArg = [];
              appArg.push(new Uint8Array(Buffer.from("mint")));
        
              let foreignassets = [];
              foreignassets.push(parseInt(tokenid1));
              // foreignassets.push(parseInt(tokenid2));
              foreignassets.push(parseInt(assetId3));
              const transaction2 = algosdk.makeApplicationNoOpTxnFromObject({
                from: recv_escrow,
                appIndex: index,
                appArgs: appArg,
                appAccounts: sender,
                accounts: [sender],
                foreignAssets: foreignassets,
                suggestedParams: params,
              });
      //console.log("3rdtran",i1)
              const transaction3 =
                algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                  from: sender,
                  to: recv_escrow,
                  assetIndex: parseInt(tokenid1),
                  note: undefined,
                  accounts: sender,
                  amount: parseInt(Math.floor(i1)),
                  suggestedParams: params,
                });
        
              const transaction4 =
                algosdk.makePaymentTxnWithSuggestedParamsFromObject({
                  from: sender,
                  to: recv_escrow,
                  note: undefined,
                  accounts: sender,
                  amount: parseInt(Math.floor(i2)),
                  suggestedParams: params,
                });
        
              let foreignassetliquidity = [];
              foreignassetliquidity.push(parseInt(assetId3));
            //console.log(total.toFixed(0));
              const transaction5 =
                algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                  from: recv_escrow,
                  to: sender,
                  assetIndex: parseInt(assetId3),
                  note: undefined,
                  accounts: [recv_escrow],
                  appAccounts: recv_escrow,
                  foreignAssets: foreignassetliquidity,
                  amount: (total),
                  suggestedParams: params,
                });
                const groupID = algosdk.computeGroupID([
                  transaction1,
                  transaction2,
                  transaction3,
                  transaction4,
                  transaction5,
                ]);
                const txs = [
                  transaction1,
                  transaction2,
                  transaction3,
                  transaction4,
                  transaction5,
                ];
                for (let i = 0; i <= 4; i++) txs[i].group = groupID;
          
                const signedTx1 = algosdk.signLogicSigTransaction(txs[1], lsig);
                const signedTx2 = algosdk.signLogicSigTransaction(txs[4], lsig);
        
                const signedTxArray = await myAlgoWallet.signTransaction([txs[0].toByte(),txs[2].toByte(),txs[3].toByte()]);
                toast.info("Transaction in Progress");
                const response = await algodClient
                  .sendRawTransaction([
                    signedTxArray[0].blob,
                    signedTx1.blob,
                    signedTxArray[1].blob,
                    signedTxArray[2].blob,
                    signedTx2.blob,
                  ])
                  .do();
              //console.log("TxID", JSON.stringify(response, null, 1));
                await waitForConfirmation(algodClient, response.txId);
                let an = asn1 +"/"+ asn2;
                // let an = asetName1 +"/"+asetName2;
                await updateusedetails(tokenid1,tokenid2,tvl,vl,0);
                await postusertx(recv_escrow,response.txId,"ADD LIQUIDITY",total,an)
                // await postusertx(localStorage.getItem("walletAddress"),response.txId,recv_escrow,"Add Liquidity",total,0,asn1,asn2,amount);
                // await createtxhash(recv_escrow,response.txId,"ADD LIQUIDITY",total,an)
                // await updatepairhistory(tokenid1,tokenid2,amount,tvl,vl);
                toast.success(`Transaction Success ${response.txId}`);
                toast.info("Add Liquidity Done Sucessfully");
              //   setTxId(response.txId);
            }
            else{
            let transaction1 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
              from: sender,
              to: recv_escrow,
              amount: amount,
              suggestedParams: params,
            });
      
            let appArg = [];
            appArg.push(new Uint8Array(Buffer.from("mint")));
      
            let foreignassets = [];
            foreignassets.push(parseInt(tokenid1));
            foreignassets.push(parseInt(tokenid2));
            foreignassets.push(parseInt(assetId3));
            const transaction2 = algosdk.makeApplicationNoOpTxnFromObject({
              from: recv_escrow,
              appIndex: index,
              appArgs: appArg,
              appAccounts: sender,
              accounts: [sender],
              foreignAssets: foreignassets,
              suggestedParams: params,
            });
      
            const transaction3 =
              algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                from: sender,
                to: recv_escrow,
                assetIndex: parseInt(tokenid1),
                note: undefined,
                accounts: sender,
                amount: parseInt(Math.floor(i1)),
                suggestedParams: params,
              });
      
            const transaction4 =
              algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                from: sender,
                to: recv_escrow,
                assetIndex: parseInt(tokenid2),
                note: undefined,
                accounts: sender,
                amount: (Math.floor(i2)),
                suggestedParams: params,
              });
      
            let foreignassetliquidity = [];
            foreignassetliquidity.push(parseInt(assetId3));
          //console.log(total.toFixed(0));
            const transaction5 =
              algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                from: recv_escrow,
                to: sender,
                assetIndex: parseInt(assetId3),
                note: undefined,
                accounts: [recv_escrow],
                appAccounts: recv_escrow,
                foreignAssets: foreignassetliquidity,
                amount: ((total)),
                suggestedParams: params,
              });
              const groupID = algosdk.computeGroupID([
                transaction1,
                transaction2,
                transaction3,
                transaction4,
                transaction5,
              ]);
              const txs = [
                transaction1,
                transaction2,
                transaction3,
                transaction4,
                transaction5,
              ];
              for (let i = 0; i <= 4; i++) txs[i].group = groupID;
        
              const signedTx1 = algosdk.signLogicSigTransaction(txs[1], lsig);
              const signedTx2 = algosdk.signLogicSigTransaction(txs[4], lsig);
             
              const signedTxArray = await myAlgoWallet.signTransaction([txs[0].toByte(),txs[2].toByte(),txs[3].toByte()]);
              toast.info("Transaction in Progress");
              const response = await algodClient
                .sendRawTransaction([
                  signedTxArray[0].blob,
                  signedTx1.blob,
                  signedTxArray[1].blob,
                  signedTxArray[2].blob,
                  signedTx2.blob,
                ])
                .do();
            //console.log("TxID", JSON.stringify(response, null, 1));
              await waitForConfirmation(algodClient, response.txId);
              let an = asn1 +"/"+asn2;
              // await postusertx(localStorage.getItem("walletAddress"),response.txId,recv_escrow,"Add Liquidity",total,0,asn1,asn2,amount);
              // await createtxhash(recv_escrow,response.txId,"ADD LIQUIDITY",total,an)
              // await updatepairhistory(tokenid1,tokenid2,amount,tvl,vl);
              await updateusedetails(tokenid1,tokenid2,tvl,vl,0);
              await postusertx(recv_escrow,response.txId,"ADD LIQUIDITY",total,an)
              toast.success(`Transaction Success ${response.txId}`);
              toast.info("Add Liquidity Done Sucessfully");
              handleLiquidiy();
              // setTxId(response.txId);
            }
            
           
            
          } catch (err) {
            toast.error(`Transaction Failed due to ${err}`);
            // console.error(err);
          }                                         
        
    
  };
  
 const optin =async () => {
   
    // const myAlgoWallet = new MyAlgoConnect();
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
  // await createtxhash("-",response.txId,"App Opt-In","-","-")
  // await updateusedetails(tokenid1,tokenid2,tvl,vl,0);
  await postusertx("-",response.txId,"App Opt-In","-","-")
  toast.success(`Transaction Success ${response.txId}`);
  toast.info("App Opt-In Succeed")

    } catch (err) {
      toast.error(`Transaction Failed due to ${err}`);
      // console.error(err);
    }
  }

  const rem = async(a1,a2,a3) =>{
    let escrowaddress = rstate.escrowAddress;
    await readLocalState(algodClient,escrowaddress,appID_global,a1,a2,a3);
      
    handleRemove()
  }
  const addli = async() =>{
    let s1 =  await find_balance(rstate.asetId1);
    // console.log("b1",s1)
    setas1balance(s1);
    let s2 = await find_balance(rstate.asetId2);
    setas2balance(s2);
    //console.log("b2",s2)
    // const assets1 = await indexerClient.lookupAssetBalances(rstate.asetId1).do();
    // console.log("asset",assets1)
    // assets1.balances.map((a)=>{
    //   if(a.address == localStorage.getItem("walletAddress")){
    //     setas1balance(a.amount)
    //   }
    // })
    // const assets2 = await indexerClient.lookupAssetBalances(rstate.asetId2).do();
    // assets2.balances.map((a)=>{
    //   if(a.address == localStorage.getItem("walletAddress")){
    //     setas2balance(a.amount)
    //   }
    // })
    
  }
  const percent = async(entered_percent) =>{
       let liquidity_asset_in = gvprice * entered_percent / 100;
       setliquidityamount(liquidity_asset_in);
        //console.log("v",liquidity_asset_in) 
  
        let asset1_amount = (liquidity_asset_in * s1) / ilt ;
        //console.log(asset1_amount)
        let asset2_amount = (liquidity_asset_in * s2) / ilt ;
        let asset1_amount_out = asset1_amount - (asset1_amount * 0.5)
        setamount1Out(asset1_amount_out)
        let asset2_amount_out = asset2_amount - (asset2_amount * 0.5)
        setamount2Out(asset2_amount_out)

        //console.log("asset1_amount_out",asset1_amount_out)
        
        //console.log("asset2_amount_out",asset2_amount_out)

  }
    const percent1 = async (an1,an2) => {
      let tokenid1 = rstate.asetId1;
      let tokenid2 = rstate.asetId2;
      let index = parseInt(appID_global);
      //console.log("appId inside donate", tokenid2);

      
      let t1,t2;
      if(tokenid1 > tokenid2 ){
          t2 = tokenid2;
          t1 = tokenid1;
          
      }
      else{
          t2 = tokenid1;
          t1 = tokenid2;
          
      }
  
      
    // let replacedData = data.replaceAll("Token1",tokenid1).replaceAll("Token2",tokenid2).replaceAll("appId",appId);
    // let results = await algodClient.compile(replacedData).do();
      let replacedData = data.replaceAll("Token1",t1).replaceAll("Token2",t2).replaceAll("appId",appID_global);
      let results = await algodClient.compile(replacedData).do();
   //console.log("data")
      setesdata(results);
      //console.log("Hash = " + results.hash);
      //console.log("Result = " + results.result);
      let escrowaddress = results.hash;
      //console.log("escrow",escrowaddress)
      let program = new Uint8Array(Buffer.from(results.result, "base64"));
  
      let lsig = algosdk.makeLogicSig(program);
      //console.log("Escrow =", lsig.address()); 
      await readLocalState(algodClient,escrowaddress,index,t1,t2,"0");
      let ana1 = await assetName(tokenid1);
      let ana2 = await assetName(tokenid2);
            // let accountInfoResponse = await algodClient.accountInformation(results.hash).do();
      // //console.log("account",accountInfoResponse);
      // let assetId3 = accountInfoResponse['created-assets'][0]['index'];
      
      // let k = await indexerClient.lookupAccountByID(rstate.algoAddress).do();
     
      // //console.log("k",k)
     
          try {
            // const accounts = await myAlgoWallet.connect();
            // const addresses = accounts.map(account => account.address);
            const params = await algodClient.getTransactionParams().do();
            
            let sender =  localStorage.getItem("walletAddress");
            let recv_escrow = lsig.address();
            let amount = 3000;
            let vl = s1+s2 + ilt;  
            let tvl = s1 + s2;      
            let note1=[];
            note1.push(new Uint8Array(Buffer.from("fee")));
            let transaction1 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
              from:  localStorage.getItem("walletAddress"), 
              to: recv_escrow, 
              amount: amount, 
              //  note: note1,  
               suggestedParams: params
             });
           
             let appArg = [];
             appArg.push(new Uint8Array(Buffer.from("burn")));
             
             let foreignassets = [];
            //  let decAddr = algosdk.decodeAddress(addresses[0]);
            //  foreignassets.push(decAddr.publicKey);
             foreignassets.push(parseInt(t1));
             foreignassets.push(parseInt(t2));
             foreignassets.push(parseInt(rstate.asetId3));
             const transaction2 = algosdk.makeApplicationNoOpTxnFromObject({
                 from: recv_escrow, 
                 appIndex: index,
                 appArgs: appArg,
                 appAccounts: localStorage.getItem("walletAddress"),
                 accounts: [ localStorage.getItem("walletAddress")],
                 foreignAssets:foreignassets,
                 suggestedParams: params
               });
      
             
              //console.log(parseInt(amount1Out).toFixed(0))
              const transaction3 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                from:recv_escrow ,
                to:  localStorage.getItem("walletAddress"),
                assetIndex: parseInt(t1),
                note: undefined,
                accounts:  localStorage.getItem("walletAddress"),
                amount: parseInt(parseInt(amount1Out.toFixed(0))),
                suggestedParams: params
              });
  
              const transaction4 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                from:recv_escrow ,
                to:  localStorage.getItem("walletAddress"),
                assetIndex: parseInt(t2),
                note: undefined,
                accounts:  localStorage.getItem("walletAddress"),
                amount: parseInt(amount2Out.toFixed(0)),
                suggestedParams: params
              });
              
              let foreignassetliquidity =[];
              foreignassetliquidity.push(parseInt(rstate.asetId3));
              // let decAddr = algosdk.decodeAddress(recv_escrow);
              // let acc =[];
              // acc.push(decAddr.publicKey);
              const transaction5 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                from:  localStorage.getItem("walletAddress") ,
                to:recv_escrow ,
                assetIndex: parseInt(rstate.asetId3),
                note: undefined,
                accounts: [recv_escrow],
                appAccounts:recv_escrow,
                foreignAssets:foreignassetliquidity,
                amount: parseInt(liquidityamount),
                suggestedParams: params
              });
      
          
            const groupID = algosdk.computeGroupID([ transaction1, transaction2, transaction3, transaction4, transaction5]);
            const txs = [ transaction1, transaction2, transaction3, transaction4, transaction5];
            txs[0].group = groupID;
            txs[1].group = groupID;
            txs[2].group = groupID;
            txs[3].group = groupID;
            txs[4].group = groupID;
            
            const signedTx1 = await myAlgoWallet.signTransaction([txs[0].toByte(),txs[4].toByte()]);
            const signedTx2 = algosdk.signLogicSigTransaction(txs[1], lsig);
            const signedTx3 = algosdk.signLogicSigTransaction(txs[2], lsig);
            const signedTx4 = algosdk.signLogicSigTransaction(txs[3], lsig);
            // const signedTx5 = await myAlgoWallet.signTransaction(txs[4].toByte());
            toast.info("Removing Liquidity in Progress");
      const response = await algodClient.sendRawTransaction([ signedTx1[0].blob, signedTx2.blob, signedTx3.blob, signedTx4.blob, signedTx1[1].blob ]).do();
         
    //console.log("TxID", JSON.stringify(response, null, 1));
    
    
    await waitForConfirmation(algodClient, response.txId);
    let an = ana1 +"/"+ana2;
    // await postusertx(localStorage.getItem("walletAddress"),response.txId,0,"Remove Liquidity",0,0,"","",amount);
    // await createtxhash(recv_escrow,response.txId,"REMOVE LIQUIDITY",liquidityamount,an)
    // await updatepairhistory(tokenid1,tokenid2,amount,tvl,vl);
    await updateusedetails(tokenid1,tokenid2,tvl,vl,0);
    await postusertx(recv_escrow,response.txId,"REMOVE LIQUIDITY",liquidityamount,an) 
    handleRemove()
    toast.success(`Transaction Completed Successfully ${response.txId}`);
    toast.info("Removing Liquidity is Done!")  
  } catch (err) {
        toast.error(`Transaction Failed due to ${err}`);
        //console.error(err);
      }
    };

const manager = async(r,a,b,c) =>{
let l=[];
l.push(a);
l.push(b);
l.push(c)
  setrstate(r);
  setaprice(l)
  let p = await readingLocalstate(algodClient,r.escrowAddress);
  //console.log("prime",p)
    let p1 =await rewardasset1(p, r.asetId1);
   //console.log("afterp1",p1)
    let p2 = rewardasset2(p,r.asetId2);
    let p3 = await rewardasset3(p,r.asetId3);
    
    let added = p1 + p2 + p3;
    //console.log("rewardasset3",added)
    setpooladdedValue(added);
    //console.log("pooled",pooledValue)
  handleManage();
}
const manager1 = async() =>{
  let v = await find_balance_escrow(rstate.asetId3,rstate.algoAddress)
  //console.log("balance",v)
  setexcessb(v);
  let s =  await find_balance(rstate.asetId3);
  setgivenprice(s)
  // // let a =  (algosdk.encodeUint64((65613731)));

  // //console.log("ssetgiven",s);
    
  

}
//console.log("rstate",rstate);

const pool= async()=>{
  // await createpair ("J7VRGVZBL27ESEC22PFOUEW4NKF6WPHIEIL477O2HABEWJO2RS2XADSF2U",
  // "ELEM","ALGO","Element Pool ELEM-ALGO",71116238,0,75692365,
  //   "26YB76MYZHKHCGRAJLQRMVFSEI5OUR5W22WW7ABODC5JXLG4JPL3U5OYIA")
  // await createtpairhistory("J7VRGVZBL27ESEC22PFOUEW4NKF6WPHIEIL477O2HABEWJO2RS2XADSF2U",
  // 77167245,4413213,3000,"ELEM","ALGO","Element Pool ELEM-ALGO",71116238,0,75692365)
  
  first()
  handleShow()
}
const addingliq =(esc,tid1,tid2,tid3)=>{
  readLocalState(algodClient,esc,appId,tid1,tid2,tid3);
  handleLiquidiy();

}
function SetValue1(Amountin){
  let amount2 = convert1((Amountin * 1000000),aprice[0],aprice[1]);
  //console.log("amout2",amount2)
  setamount2(amount2/1000000);
  setsAmount1(Amountin * 1000000)
  setsAmount2(amount2)
}
function SetValue2(Amountin){
  let amount2 = convert2((Amountin * 1000000),aprice[0],aprice[1]);
  //console.log("amout2",amount2)
  setamount1(amount2/1000000);
  setsAmount1(amount2)
  setsAmount2(Amountin * 1000000)
}



// const pooladdedvalues= async(k) =>{
    
// }
// useEffect(() =>{()},[])
// const asset_reserve= (escrAddr,a1,a2,a3) =>{
//   readLocalState(algodClient,escrAddr,appID_global,a1,a2,a3)
//   let s =[];
//   s.push(s1);
//   //console.log("arrayvalues",s1)
// }
// const findBalance = async() =>{
//   let v = await find_balance(rstate.asetId3)
//   //console.log("balance",v)
//   setexcessb(v);
// }

 const setVal =(k) =>{
  setValue(k);
  callp1();
  setpc1(pr1 * (k/1000000));
  //console.log("price1",pr1*k)
 }
 const setVal2 =(k) =>{
  setValue1(k);
   callp2();
  setpc2(pr2 * (k/1000000));
  //console.log("price1",pr2*k)
 }
 const clickclose =()=>{
  handleClose();
  history.push({
    pathname: '/swap'
  })
 }
    
    return (
        <Layout>
            <div className="page-content">
                <Container fluid="sm" className='d-none' style={{opacity: '0'}}>
                    <div className="card-base text-center mb-30 card-pool card-dark">
                        <Button className='card-close' variant='reset'>
                            <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g opacity="1">
                                <path d="M17.5004 32.0832C9.44597 32.0832 2.91699 25.5542 2.91699 17.4998C2.91699 9.44546 9.44597 2.9165 17.5004 2.9165C25.5548 2.9165 32.0837 9.44546 32.0837 17.4998C32.0837 25.5542 25.5548 32.0832 17.5004 32.0832ZM17.5004 29.1665C20.5946 29.1665 23.562 27.9373 25.75 25.7494C27.9379 23.5615 29.1671 20.594 29.1671 17.4998C29.1671 14.4056 27.9379 11.4382 25.75 9.25026C23.562 7.06233 20.5946 5.83317 17.5004 5.83317C14.4062 5.83317 11.4387 7.06233 9.25076 9.25026C7.06283 11.4382 5.83367 14.4056 5.83367 17.4998C5.83367 20.594 7.06283 23.5615 9.25076 25.7494C11.4387 27.9373 14.4062 29.1665 17.5004 29.1665ZM17.5004 15.4378L21.6245 11.3121L23.6881 13.3757L19.5625 17.4998L23.6881 21.624L21.6245 23.6875L17.5004 19.5619L13.3762 23.6875L11.3126 21.624L15.4383 17.4998L11.3126 13.3757L13.3762 11.3121L17.5004 15.4378Z" fill="white"/>
                                </g>
                            </svg>
                        </Button>
                        <h3>LIQUIDITY PROVIDER REWARDS</h3>
                        <p>Liquidity providers earn a 0.20% fee on all trades proportional to their share of the pool. Fees are added to the pool, accrue in real time and can be claimed by withdrawing your liquidity.</p>
                    </div>

                    <div className="card-base text-center card-pool card-dark">
                        <h3 >My Liquidity Positions</h3>
                        <Button onClick={()=>pool()} className='btn btn-grad btn-xl' >Liquidty</Button>
                    </div>
                </Container>

                <Container>
                  <Row className='justify-content-center'>
                    <Col lg={6} className='mb-lg-0 mb-4 order-lg-2'>
                      <div className="card-base card-shadow card-dark">
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
                                <input type='number' className='m-0 form-control p-0 border-0 text-white' onChange={(e) => setVal((e.target.value)*1000000)}  placeholder='0.0' />

                                  

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

                            <div className="mb-10">
                                <label className='d-flex align-items-center justify-content-between'>To 
                                {(tk2 == "ALGO")||(tk2 == "Algo") ? (<><small >Price:1 {tk2.toUpperCase()} = {algoPrice > 0.0001 ? parseFloat(algoPrice).toFixed(2) : '0.0'} USD </small></>):
(tk2 == "USDC")?(<><small>Price:1 {tk2.toUpperCase()} = {usdcPrice > 0 ? parseFloat(usdcPrice).toFixed(2) :  '0.0'} USD</small></>):(<></>) }
                                </label>

                                <div className="balance-card d-flex align-items-center justify-content-between">
                                <input type='number' className='m-0 form-control p-0 border-0 text-white' onChange={(e) => setVal2((e.target.value)*1000000)}  placeholder='0.0' />
                                
                                
                                {/* <FilterDropdown2 setMax ={(value)=>sets1(value)} setMax1 ={(value)=>sets2(value)} setMax2 ={(value)=>setoswapopt(value)} setMax3 ={(value)=>setesc(value)} setk1 ={(k1)=>sett2(k1)}/> */}
                                <FilterDropdown2 assetid2 = {AssetId2} setassetid2={(AssetId2)=>(setAssetId2(AssetId2))} ass={ass} setassets={(ass)=>setAssets(ass)} setassetsn={(assn)=>setAssetsn(assn)} assn = {assn} setMax ={(value)=>sets1(value)} setMax1 ={(value)=>sets2(value)} setMax2 ={(value)=>setoswapopt(value)} setMax3 ={(value)=>setesc(value)} setk1 ={(k1)=>sett2(k1)} setToken2Id={(ti2)=>{setTokenId2(ti2)}} setclicklogo2={(l2)=>{setlogo2(l2)}}/>

                                </div>
                            </div>
                            {/* {(tk2 == "TAU")||(tk2 == "Algo")?(<><small>Balance:{parseFloat(balanceid2).toFixed(2)}</small></>):(<><small>Balance:{parseFloat(id2Token/1000000).toFixed(2) } </small></>) } */}
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
                            { (!showOptInButton && !showMintButton )?(<>
                                <Button className='btn w-100 mb-10 text-none btn-grad btn-xl'  onClick={()=>bootstrap(appID_global,AssetId1,AssetId2)}>Add</Button>
                            </>):(showOptInButton && !showMintButton)?(<>
                                <Button className='btn w-100 mb-10 text-none btn-grad btn-xl'  onClick={()=>optIn(appID_global)}>Asset Opt-In</Button>
                            </>):(<>
                                <Button className='btn w-100 mb-10 text-none btn-grad btn-xl'  onClick={()=>mint(appID_global,AssetId1,AssetId2,input1,input2)}>Add LIQUIDITY</Button>
                            </>)
                            }

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
                                          <h6>{parseFloat(aprice[2]/1000000).toFixed(4)} </h6>
                                      </Col>
                                      <Col sm={4}>
                                          <h6>{parseFloat(aprice[0]/1000000).toFixed(4)} {rstate.asetName1}</h6>
                                          <h6>{parseFloat(aprice[1]/1000000).toFixed(4)} {rstate.asetName2}</h6>
                                      </Col>
                                  </Row>
                              </div>
                              
                              <label className='mb-10'>Remove Amount</label>

                              <Row className='mb-10'>
                                  <Col xs={6} sm={3} className='mb-1'>
                                      <input type="radio" hidden id='radio1' name="amount" />
                                      <label htmlFor="radio1"  variant="grad" className='btn btn-default px-2 w-100' onClick={()=>percent(25)}>25%</label>
                                  </Col>
                                  <Col xs={6} sm={3} className='mb-1'>
                                      <input type="radio" hidden id='radio2' name="amount" />
                                      <label htmlFor="radio2" className='btn btn-default px-2 w-100'  onClick={()=>percent(50)}>50%</label>
                                  </Col>
                                  <Col xs={6} sm={3} className='mb-1'>
                                      <input type="radio" hidden id='radio3' name="amount" />
                                      <label htmlFor="radio3" className='btn btn-default px-2 w-100'  onClick={()=>percent(75)}>75%</label>
                                  </Col>
                                  <Col xs={6} sm={3} className='mb-1'>
                                      <input type="radio" hidden id='radio4' name="amount" />
                                      <label htmlFor="radio4" className='btn btn-default px-2 w-100'  onClick={()=>percent(100)}>Max</label>
                                  </Col>
                              </Row>

                              <Row className='justify-content-center'>
                                  <Col md={6}>
                                      <div className="balance-card mb-10 d-flex align-items-center justify-content-between">
                                          <label className='h6'>{rstate.asetName1}</label>

                                          <h6 className='py-1'>{amount1Out > 0 ? parseFloat(amount1Out/1000000).toFixed(3) :"0.00"}</h6>
                                      </div>

                                      <div className="balance-card mb-30 d-flex align-items-center justify-content-between">
                                          <label className='h6'>{rstate.asetName2}</label>

                                          <h6 className='py-1' >{amount2Out > 0 ? parseFloat(amount2Out/1000000).toFixed(3) :"0.00"} 
                                          {/* <small className='d-block text-gray'>~$0.16</small> */}
                                          </h6>
                                      </div>

                                      <Button variant='grad' className='btn-lg w-100' onClick={()=>{percent1(rstate.asetName1,rstate.asetName2)}}>Remove</Button>
                                  </Col>
                              </Row>
                              </div>
                            </Tab>
                        </Tabs>
                      </div>
                    </Col>
                  </Row>
                </Container>
            </div>

            <Modal show={show} centered={true} size="lg" backdrop="static" keyboard={false} onHide={handleClose}>
            <ToastContainer position='top-center' draggable = {false} transition={Zoom} autoClose={8000} closeOnClick = {false}/>
                <Modal.Body className='modal-liquidity-body disable'>
                  
                    <Button className='modal-close' onClick={()=>clickclose()} variant='reset'>
                        <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g opacity="1">
                            <path d="M17.5004 32.0832C9.44597 32.0832 2.91699 25.5542 2.91699 17.4998C2.91699 9.44546 9.44597 2.9165 17.5004 2.9165C25.5548 2.9165 32.0837 9.44546 32.0837 17.4998C32.0837 25.5542 25.5548 32.0832 17.5004 32.0832ZM17.5004 29.1665C20.5946 29.1665 23.562 27.9373 25.75 25.7494C27.9379 23.5615 29.1671 20.594 29.1671 17.4998C29.1671 14.4056 27.9379 11.4382 25.75 9.25026C23.562 7.06233 20.5946 5.83317 17.5004 5.83317C14.4062 5.83317 11.4387 7.06233 9.25076 9.25026C7.06283 11.4382 5.83367 14.4056 5.83367 17.4998C5.83367 20.594 7.06283 23.5615 9.25076 25.7494C11.4387 27.9373 14.4062 29.1665 17.5004 29.1665ZM17.5004 15.4378L21.6245 11.3121L23.6881 13.3757L19.5625 17.4998L23.6881 21.624L21.6245 23.6875L17.5004 19.5619L13.3762 23.6875L11.3126 21.624L15.4383 17.4998L11.3126 13.3757L13.3762 11.3121L17.5004 15.4378Z" fill="white"/>
                            </g>
                        </svg>
                    </Button>
                   

                    {!liquidity ? (
                        <div className="text-center">
                            <Row className='justify-content-center mb-100'>
                                <Col md={9}>
                                    <h3>LIQUIDITY PROVIDER REWARDS</h3>
                                    <p>Liquidity providers earn a 0.20% fee on all trades proportional to their share of the pool. Fees are added to the pool, accrue in real time and can be claimed by withdrawing your liquidity.</p>

                                    {/* <Link className='btn-link-purple text-underline' onClick={() => window.open('https://elementdefi.vercel.app/')}>Learn more about providing liquidity</Link> */}
                                </Col>
                            </Row>

                            <div className="d-flex flex-sm-row mb-10 flex-column justify-content-sm-between align-items-center">
                                <h6 className='mb-sm-0 mb-3'>Liquidity</h6>
                                {/* <div className="modal-manage" color="white">
                                <h6 className='mb-sm-0 mb-3'>Your liquidity</h6>
                    {dbdata.map(function (role, i) { <div >
                      
                      <h6 className='mb-sm-0 mb-3 "modal-manage"' >Your liquidity</h6>
                                  {(role.profileURL === localStorage.getItem("walletAddress"))?(<>
                                  <h1>Hello</h1>
                                  <h6 className='mb-sm-0 mb-3'>Your liquidity</h6>
                                    </>
                                  ):(<> <h6 className='mb-sm-0 mb-3'>Your liquidity</h6></>)}
                                    
                                </div>
                                })}
                                </div> */}
                                <div className="d-flex">
                                    <Button variant='grad' onClick={handlePair} className='text-none  ms-2'>Create Pair</Button>
                                    <Button variant='grad' onClick={()=>optin()} className='text-none ms-2'>App Opt-In</Button>
                                </div>
                            </div>
                            
                          
                            <div className="modal-manage mb-1">
                              {(token === null || token === undefined || token ===""||token.length === 0)?
                              (<>
                              <h5>NO LIQUIDITY</h5>
                              </>):
                              (dbdata === null || dbdata === undefined || dbdata.length ===0 )?(<>
                                {/* <img src="https://c.tenor.com/FBeNVFjn-EkAAAAS/ben-redblock-loading.gif"/> */}
                                <span className="d-block text-center">
                                  <svg version="1.1" id="L9" width="80" height="80" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                      viewBox="0 0 100 100" enable-background="new 0 0 0 0">
                                        <path fill="#fff" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
                                          <animateTransform 
                                            attributeName="transform" 
                                            attributeType="XML" 
                                            type="rotate"
                                            dur="1s" 
                                            from="0 50 50"
                                            to="360 50 50" 
                                            repeatCount="indefinite" />
                                      </path>
                                    </svg>
                                </span>
                              </>):(<>
                                {dbdata.map((r,i)=>{
                             
                             
                               // if(r.profileURL){
                               //console.log("rvalue",r,as1[i])
                               return (<div> 
                                 <div className="d-flex flex-sm-row mb-30 flex-column justify-content-sm-between align-items-center">
                                 <div className="d-flex align-items-center td-cell">
                                  <img src={elem} alt="icon" />
                                  <img src={tau} style={{marginLeft: '-15px'}} alt="icon" />
                                  <span className="ms-2">{r.asetName1.toUpperCase()}/{r.asetName2.toUpperCase()}</span>
                                </div>
                                 {/* <Breadcrumb className='mb-sm-0 mb-3'>
                                   
                                 
                                     <Breadcrumb.Item>
                                       
                                         
                                            <img src={elem} width="31" height="30" alt='icon' />
                                          
                                      
            
                                       {r.asetName1.toUpperCase()}
                                         </Breadcrumb.Item>
                                     <Breadcrumb.Item>
                                       
 <img src={tau} width="31" height="30" alt='icon' />
                                         {r.asetName2.toUpperCase()}
                                     </Breadcrumb.Item>
                                 </Breadcrumb> */}

                                 <p className='mb-0'>1 {r.asetName1.toUpperCase()}  = {parseFloat(as1[i].a4).toFixed(3)} {r.asetName2.toUpperCase()}</p>
                             </div>

                             <div className="d-flex flex-md-row flex-column justify-content-md-between align-items-center">
                                 <Row className='mb-md-0 mb-30 text-nowrap align-items-center text-sm-start'>
                                     <Col sm={4} >
                                         {/* <h6>99.99%</h6> */}
                                         
                                         <p><b>Pool Share</b></p>
                                         
                                     </Col>
                                     <Col sm={3} className='text-center py-sm-0 py-3'>
                                         <p >{parseFloat(as1[i].a3/1000000).toFixed(3)} </p>
                                         
                                     </Col>
                                     <Col sm={4}>
                                         <p >{parseFloat(as1[i].a1/1000000).toFixed(3)}  {r.asetName1.toUpperCase()}</p>
                                         <p>{parseFloat(as1[i].a2/1000000).toFixed(3)}  {r.asetName2.toUpperCase()}</p>
                                         {/* <h6>~$1,070.67</h6> */}
                                     </Col>
                                 </Row>

                                 <Button variant='grad' onClick={()=>manager(r,as1[i].a1,as1[i].a2,as1[i].a3)} className='text-none ms-2'>Manage</Button>
                             </div>  

                             </div>  )
                             
                                      })}</>)}
                            
                              
                            
                             
                            </div>
                        </div>
                    ):(
                         (
                            <>
                                <div className="modal_header mb-50 d-flex align-items-center">
                                    <Button variant='reset' onClick={handleLiquidiy} className='p-0 me-4'>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3.828 7.00017H16V9.00017H3.828L9.192 14.3642L7.778 15.7782L0 8.00017L7.778 0.222168L9.192 1.63617L3.828 7.00017Z" fill="white"/>
                                        </svg>
                                    </Button>

                                    <h2 className="h3 mb-0">CREATE LIQUIDITY</h2>     
                                </div>

                                <Row className='justify-content-center' >
                                    <Col md={9} lg={8}>
                                        <div className="mb-1">
                                            <label className='d-flex align-items-center justify-content-between' >From
                                            {(tk1 == "ALGO")||(tk1 == "Algo") ? (<><small>Price:1 {tk1.toUpperCase()} = {algoPrice > 0.0000001 ? parseFloat(algoPrice).toFixed(2) : '0.0'} USD</small></>):
                                    (tk1 == "USDC")?(<><small>Price:1 {tk1.toUpperCase()} = {usdcPrice > 0.00001 ? parseFloat(usdcPrice).toFixed(2) :  '0.0'} USD</small></>):(<></>) }
                                     
                                             </label>

                                            <div className="balance-card d-flex align-items-center justify-content-between" >
                                            <input type='number' className='m-0 form-control p-0 border-0 text-white' onChange={(e) => setVal((e.target.value)*1000000)}  placeholder='0.0' />

                                              

                                            {/* <FilterDropdown setk = {(t1)=>sett1(t1)} ></FilterDropdown> */}
                                            <FilterDropdown assetid1 = {AssetId1} setassetid1={(AssetId2)=>(setAssetId1(AssetId2))}  ass={ass1} setassets={(ass1)=>setAssets1(ass1)} setassetsn={(assn1)=>setAssetsn1(assn1)} assn = {assn1} setk = {(t1)=>sett1(t1)} setToken1Id={(ti1)=>{setTokenId1(ti1)}} setclicklogo1={(l1)=>{setlogo1(l1)}}></FilterDropdown>

                                            </div>
                                        </div>
                                        {(tk1 == "ALGO")||(tk1 == "Algo")?(<><small>Balance:{(balanceid1===null||balanceid1===""||balanceid1===undefined) ?'0.0': parseFloat(balanceid1/1000000).toFixed(2)}</small></>):(<><small>Balance:{(id1Token===null||id1Token===""||id1Token===undefined) ?'0.0' : parseFloat(id1Token/1000000).toFixed(2) } </small></>) }

                                        <div className="mb-1 pt-1 text-center">
                                            <Button variant='reset'>
                                                <svg width="62" height="61" viewBox="0 0 62 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect x="0.919922" y="60.1743" width="60.0313" height="60.1591" rx="30" transform="rotate(-90 0.919922 60.1743)" fill="white"/>
                                                    <path d="M30 29.1584V23.1553H32V29.1584H38V31.1595H32V37.1626H30V31.1595H24V29.1584H30Z" fill="black"/>
                                                </svg>
                                            </Button>
                                        </div>

                                        <div className="mb-10">
                                            <label className='d-flex align-items-center justify-content-between'>To 
                                            {(tk2 == "ALGO")||(tk2 == "Algo") ? (<><small >Price:1 {tk2.toUpperCase()} = {algoPrice > 0.0001 ? parseFloat(algoPrice).toFixed(2) : '0.0'} USD </small></>):
      (tk2 == "USDC")?(<><small>Price:1 {tk2.toUpperCase()} = {usdcPrice > 0 ? parseFloat(usdcPrice).toFixed(2) :  '0.0'} USD</small></>):(<></>) }
                                            </label>

                                            <div className="balance-card d-flex align-items-center justify-content-between">
                                            <input type='number' className='m-0 form-control p-0 border-0 text-white' onChange={(e) => setVal2((e.target.value)*1000000)}  placeholder='0.0' />
                                            
                                            
                                            {/* <FilterDropdown2 setMax ={(value)=>sets1(value)} setMax1 ={(value)=>sets2(value)} setMax2 ={(value)=>setoswapopt(value)} setMax3 ={(value)=>setesc(value)} setk1 ={(k1)=>sett2(k1)}/> */}
                                            <FilterDropdown2 assetid2 = {AssetId2} setassetid2={(AssetId2)=>(setAssetId2(AssetId2))} ass={ass} setassets={(ass)=>setAssets(ass)} setassetsn={(assn)=>setAssetsn(assn)} assn = {assn} setMax ={(value)=>sets1(value)} setMax1 ={(value)=>sets2(value)} setMax2 ={(value)=>setoswapopt(value)} setMax3 ={(value)=>setesc(value)} setk1 ={(k1)=>sett2(k1)} setToken2Id={(ti2)=>{setTokenId2(ti2)}} setclicklogo2={(l2)=>{setlogo2(l2)}}/>

                                            </div>
                                        </div>
                                        {/* {(tk2 == "TAU")||(tk2 == "Algo")?(<><small>Balance:{parseFloat(balanceid2).toFixed(2)}</small></>):(<><small>Balance:{parseFloat(id2Token/1000000).toFixed(2) } </small></>) } */}
                                        <small>Balance:{(id2Token===null||id2Token===""||id2Token===undefined) ?'0.0' : parseFloat(id2Token/1000000).toFixed(2) } </small>
                                        <div className="balance-card py-2 mb-10 d-flex align-items-center justify-content-between">
                                            <label>POOL FEE</label>

                                            <h6>0.86 ALGO</h6>
                                        </div>

                                        <p className="text-red">
                                            {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi me-2 bi-info-circle" viewBox="0 0 16 16">
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                            </svg> */}
                                           
                                        </p>
                                        { (!showOptInButton && !showMintButton )?(<>
                                            <Button className='btn w-100 mb-10 text-none btn-grad btn-xl'  onClick={()=>bootstrap(appID_global,AssetId1,AssetId2)}>CREATE</Button>
                                        </>):(showOptInButton && !showMintButton)?(<>
                                            <Button className='btn w-100 mb-10 text-none btn-grad btn-xl'  onClick={()=>optIn(appID_global)}>Asset Opt-In</Button>
                                        </>):(<>
                                            <Button className='btn w-100 mb-10 text-none btn-grad btn-xl'  onClick={()=>mint(appID_global,AssetId1,AssetId2,input1,input2)}>CREATE LIQUIDITY</Button>
                                        </>)
                                        }

                                        <p className='d-flex'>
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi me-2 bi-info-circle" viewBox="0 0 16 16">
                                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                                </svg>
                                            </span>
                                            Once you create the pool, other users will be able to add liquidity to it.
                                        </p>

                                    </Col>
                                </Row>
                            </>
                        )
                    )}
                </Modal.Body>
            </Modal>


            <Modal show={manage} centered={true} size="lg" onHide={handleManage}>
            <ToastContainer position='top-center' draggable = {false} transition={Zoom} autoClose={8000} closeOnClick = {false}/>
                <Modal.Body className='modal-liquidity-body'>
                    <Link to="/swap" className='modal-close' variant='reset'>
                        <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g opacity="1">
                            <path d="M17.5004 32.0832C9.44597 32.0832 2.91699 25.5542 2.91699 17.4998C2.91699 9.44546 9.44597 2.9165 17.5004 2.9165C25.5548 2.9165 32.0837 9.44546 32.0837 17.4998C32.0837 25.5542 25.5548 32.0832 17.5004 32.0832ZM17.5004 29.1665C20.5946 29.1665 23.562 27.9373 25.75 25.7494C27.9379 23.5615 29.1671 20.594 29.1671 17.4998C29.1671 14.4056 27.9379 11.4382 25.75 9.25026C23.562 7.06233 20.5946 5.83317 17.5004 5.83317C14.4062 5.83317 11.4387 7.06233 9.25076 9.25026C7.06283 11.4382 5.83367 14.4056 5.83367 17.4998C5.83367 20.594 7.06283 23.5615 9.25076 25.7494C11.4387 27.9373 14.4062 29.1665 17.5004 29.1665ZM17.5004 15.4378L21.6245 11.3121L23.6881 13.3757L19.5625 17.4998L23.6881 21.624L21.6245 23.6875L17.5004 19.5619L13.3762 23.6875L11.3126 21.624L15.4383 17.4998L11.3126 13.3757L13.3762 11.3121L17.5004 15.4378Z" fill="white"/>
                            </g>
                        </svg>
                    </Link>
                    
                    {(!remove  && !liquidity) ?(
                        <>
                            <div className="modal_header mb-50 d-flex align-items-center">
                                <Button variant='reset' onClick={handleManage} className='p-0 me-4'>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.828 7.00017H16V9.00017H3.828L9.192 14.3642L7.778 15.7782L0 8.00017L7.778 0.222168L9.192 1.63617L3.828 7.00017Z" fill="white"/>
                                    </svg>
                                </Button>
  
                                <h2 className="h3 mb-0"  >{rstate.asetName1} / {rstate.asetName2}</h2>     
                            </div>
                        
                            <div className="text-center mb-md-5 mb-4">
                                <Button variant='grad' onClick={()=>addingliq(rstate.escrowAddress,rstate.asetId1,rstate.asetId2,rstate.asetId3)} className='m-2 py-3'>Add</Button>
                                 {/* <Button variant='grad' onClick={handleLiquidiy} className='text-none ms-2'>Add liquidity</Button> */}
                                <Button variant='grad' onClick={()=>rem(rstate.asetId1,rstate.asetId2,rstate.asetId3)} className='m-2 py-3'>Remove</Button>
                            </div>
                    
                            <Row className='text-center justify-content-center'>
                                <Col md={8}>
                                    <p>Your Pool tokens (including excess amounts)</p>
                                                                
                                    <div className="balance-card mb-10 d-flex align-items-center justify-content-between">
                                        <label onClick={manager1()} >{rstate.asetName1} / {rstate.asetName2} Pool Tokens</label>

                                        <div className='h3 m-0' >{(parseFloat(pooledValue)/1000000).toFixed(4)}</div>
                                    </div>
                                </Col>
                            </Row>
                        </>
                    ) :(remove && !liquidity) ? (
                        <>
                            <div className="modal_header mb-50 d-flex align-items-center">
                                <Button variant='reset' onClick={handleRemove} className='p-0 me-4'>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.828 7.00017H16V9.00017H3.828L9.192 14.3642L7.778 15.7782L0 8.00017L7.778 0.222168L9.192 1.63617L3.828 7.00017Z" fill="white"/>
                                    </svg>
                                </Button>

                                <h2 className="h3 mb-0">REMOVE LIQUIDITY</h2>     
                            </div>

                            <div className="modal-manage mb-30">
                                <Row className='mb-md-0 text-nowrap align-items-center text-center'>
                                    <Col sm={4}>
                                        {/* <h6>99.99%</h6> */}
                                        <p>Pool Share</p>
                                    </Col>
                                    <Col sm={4} className='py-sm-0 py-3'>
                                        <h6>{parseFloat(aprice[2]/1000000).toFixed(4)} </h6>
                                    </Col>
                                    <Col sm={4}>
                                        <h6>{parseFloat(aprice[0]/1000000).toFixed(4)} {rstate.asetName1}</h6>
                                        <h6>{parseFloat(aprice[1]/1000000).toFixed(4)} {rstate.asetName2}</h6>
                                    </Col>
                                </Row>
                            </div>
                            
                            <label className='mb-10'>Remove Amount</label>

                            <Row className='mb-30'>
                                <Col xs={6} sm={3} className='mb-3'>
                                    <input type="radio" hidden id='radio1' name="amount" />
                                    <label htmlFor="radio1"  variant="grad" className='btn btn-default px-2 w-100' onClick={()=>percent(25)}>25%</label>
                                </Col>
                                <Col xs={6} sm={3} className='mb-3'>
                                    <input type="radio" hidden id='radio2' name="amount" />
                                    <label htmlFor="radio2" className='btn btn-default px-2 w-100'  onClick={()=>percent(50)}>50%</label>
                                </Col>
                                <Col xs={6} sm={3} className='mb-3'>
                                    <input type="radio" hidden id='radio3' name="amount" />
                                    <label htmlFor="radio3" className='btn btn-default px-2 w-100'  onClick={()=>percent(75)}>75%</label>
                                </Col>
                                <Col xs={6} sm={3} className='mb-3'>
                                    <input type="radio" hidden id='radio4' name="amount" />
                                    <label htmlFor="radio4" className='btn btn-default px-2 w-100'  onClick={()=>percent(100)}>Max</label>
                                </Col>
                            </Row>

                            <Row className='justify-content-center'>
                                <Col md={6}>
                                    <div className="balance-card mb-10 d-flex align-items-center justify-content-between">
                                        <label className='h6'>{rstate.asetName1}</label>

                                        <h6  >{amount1Out > 0 ? parseFloat(amount1Out/1000000).toFixed(3) :"0.00"}</h6>
                                    </div>

                                    <div className="balance-card mb-30 d-flex align-items-center justify-content-between">
                                        <label className='h6'>{rstate.asetName2}</label>

                                        <h6 >{amount2Out > 0 ? parseFloat(amount2Out/1000000).toFixed(3) :"0.00"} 
                                        {/* <small className='d-block text-gray'>~$0.16</small> */}
                                        </h6>
                                    </div>

                                    <Button variant='grad' className='btn-lg w-100' onClick={()=>{percent1(rstate.asetName1,rstate.asetName2)}}>Remove</Button>
                                </Col>
                            </Row>

                        </>
                    ):
                    (
                        <>
                            <div className="modal_header mb-50 d-flex align-items-center">
                                <Button variant='reset' onClick={handleLiquidiy} className='p-0 me-4'>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.828 7.00017H16V9.00017H3.828L9.192 14.3642L7.778 15.7782L0 8.00017L7.778 0.222168L9.192 1.63617L3.828 7.00017Z" fill="white"/>
                                    </svg>
                                </Button>

                                <h2 className="h3 mb-0" onClick={addli()}>ADD LIQUIDITY</h2>     
                            </div>

                            <Row className='justify-content-center'>
                                <Col md={9} lg={8}>
                                    <div className="mb-1">
                                        <label className='d-flex align-items-center justify-content-between'>From <small>Balance: { (a1balance===null||a1balance===""||a1balance===undefined) ?'0.0' :  parseFloat(a1balance/1000000).toFixed(3) } {rstate.asetName1}</small></label>

                                        <div className="balance-card d-flex align-items-center justify-content-between">
                                          {amount1Value ? (<>
                                            <input type='number' className='m-0 form-control p-0 border-0 text-white'  value={amount1Value}  placeholder="0.0" autoComplete='off'/>
                                          </>):(<>
                                            <input type='number' className='m-0 form-control p-0 border-0 text-white'  onChange={e => SetValue1(e.target.value)}  placeholder="0.0" autoComplete='off'/>
                                          </>)}

                                      </div>
                                    </div>

                                    <div className="mb-1 pt-1 text-center">
                                        <Button variant='reset'>
                                            <svg width="62" height="61" viewBox="0 0 62 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="0.919922" y="60.1743" width="60.0313" height="60.1591" rx="30" transform="rotate(-90 0.919922 60.1743)" fill="white"/>
                                                <path d="M30 29.1584V23.1553H32V29.1584H38V31.1595H32V37.1626H30V31.1595H24V29.1584H30Z" fill="black"/>
                                            </svg>
                                        </Button>
                                    </div>

                                    <div className="mb-10">
                                        <label className='d-flex align-items-center justify-content-between'>T0 <small>Balance: { (a2balance===null||a2balance===""||a2balance===undefined) ?'0.0' : parseFloat(a2balance/1000000).toFixed(4) }  {rstate.asetName2}</small></label>

                                        <div className="balance-card d-flex align-items-center justify-content-between">
                                          {amount2Value ? (<>
                                            <input type='number' className='m-0 form-control p-0 border-0 text-white'  value={amount2Value}  placeholder="0.0" autoComplete='off'></input>
                                          </>):(<>
                                            <input type='number' className='m-0 form-control p-0 border-0 text-white'  onChange={e => SetValue2(e.target.value)}  placeholder="0.0" autoComplete='off'></input>
                                          </>)}

                                            {/* <FilterDropdown2 /> */}
                                        </div>
                                    </div>

                                    <div className="balance-card py-2 mb-10 d-flex align-items-center justify-content-between">
                                        <label>Pool Fee</label>

                                        <h6>0.86 ALGO</h6>
                                    </div>

                                    <p className="text-red">
                                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi me-2 bi-info-circle" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                        </svg>
                                        unverified assets alert, be careful! */}
                                    </p>

                                    <Button className='btn w-100 mb-10 text-none btn-grad btn-xl' onClick={()=>mint1call(appID_global,samount1,samount2,rstate.asetName1,rstate.asetName2)}>ADD LIQUIDITY</Button>

                                    <p className='d-flex'>
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi me-2 bi-info-circle" viewBox="0 0 16 16">
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                            </svg>
                                        </span>
                                        Once you create the pool, other users will be able to add liquidity to it.
                                    </p>

                                </Col>
                            </Row>
                        </>
                        )}




                </Modal.Body>
            </Modal>

        </Layout>
    );
                    }

export default PoolPage;
