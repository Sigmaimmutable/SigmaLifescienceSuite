import React, { useState,useEffect } from 'react';
import { Button, Card, Form, InputGroup, Col, Container, Dropdown, Modal, OverlayTrigger, Row, Tab, Tabs, Tooltip, Alert, Badge } from 'react-bootstrap';
import Layout from './LayoutT';

import USDC from '../../assets/images/usdc.jpg';
import { Link } from 'react-router-dom';
import ButtonLoad from 'react-bootstrap-button-loader';

import usdclogo from '../../assets/images/usdc-logo.png';
import taulogo from '../../assets/images/tau-original.png';
import elemlogo from '../../assets/images/elem-original.png';
import algologo from '../../assets/images/Algo.png';
import MyAlgoConnect from '@randlabs/myalgo-connect';
import selecttoken from '../../assets/images/selecttoken.png';

import axios from 'axios';

import WalletConnect from "@walletconnect/client";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import { formatJsonRpcRequest } from "@json-rpc-tools/utils";
import { dualwalletconnect } from './walletconnection';
import algosdk, { Algod } from "algosdk";

import node from './nodeapi.json';
import einrlogo from '../../assets/images/EINR-original.png';
import { AppId,escrowProgram,escrowProgram2,elemToken } from '../swapConfig';
import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';
import { getpostdatafilter } from '../../firedbstore';
import {amount_out_with_slippage,minAlgoBalance,updatealgobalance,burnassetamount,mintotrx,checkotp,swapinput,walletBalance,amount1_input,convert1,convert2,asset1_price,assert3Reserve,assert1Reserve,assert2Reserve,readingLocalstate,escrowdatacompile,checkassetin,escrowdata,asset2_price, find_balance_escrow,find_balance,priceOfCoin1,priceOfCoin2} from '../formula';
const algodClient = new algosdk.Algodv2('',node['algodclient'], '');
const myAlgoWallet = new MyAlgoConnect({ disableLedgerNano: false });
const indexerClient = new algosdk.Indexer('', node['indexerclient'], '');

const bridge = "https://bridge.walletconnect.org";

let appID_global = AppId;
let data = escrowProgram;

const Stablecoin = () => {
  useEffect(() => {
    document.title = "ELEMENT | Swap"
}, [])
    const [show, setShow] = useState(false);
    // const [switchState, setSwitchState] = useState(false);
    const [showMode, setShowMode] = useState(false);
    const [showAlert, setShowAlert] = useState(true);
    const [val, setVal] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleChange = () => {
        setShowMode(true); 
        // setSwitchState(true);
    }
    const handleCloseMode = () => {
        setShowMode(false); 
        // setSwitchState(true);
    }
    const btnhandleCloseMode = () => {
        setShowMode(false); 
        // setSwitchState(true);
    }

    const [key, setKey] = useState();
    const [show1, setShow1] = useState(false);

    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);

    const[tokId1,setTokId1] = useState(0)  //TokId1
    const[tokId2,setTokId2] = useState()  //TokId2
    const[tokName1,setTokName1] = useState("ALGO")  //Tok Name 1
    const[tokName2,setTokName2] = useState()  //Tok Name 2

    const[tokLogo1,setTokLogo1] = useState(algologo)  //Tok logo 1
    const[tokLogo2,setTokLogo2] = useState() //Tok logo 2

    const[tokBalance1,setTokBalance1] = useState()  //Tok Balance 1
    const[tokBalance2,setTokBalance2] = useState() //Tok Balance 2

    const[assetoptin1,setAssetOptin1] = useState(false);
    const[assetoptin2,setAssetOptin2] = useState(false);
    const[assetoptin3,setAssetOptin3] = useState(false);
    const[sout1,setsout1] = useState("");
    const[sout2,setsout2] = useState("");
    const[rs1value,setrsvalue1] = useState("")
    const[rs2value,setrsvalue2] = useState("")
    const[rs3value,setrsvalue3] = useState("")
    const[fee,setfees] = useState(0.05);
    const[insuuficient,showinsuuficient] = useState(false);
    
    const[decl1,setdeclaring1]=useState("");
    const[decl2,setdeclaring2] = useState("");
    const[samount1,setsamount1] = useState("");
    const[samount2,setsamount2] = useState("");
    const[AssWithFee,setasswithfee] = useState("");
    const[swf,setswf] = useState("");
    const[assetBalance,setassetBalance] = useState("");
    const[minbalance,setminbalance]= useState("");
    const [enoughbalance, setenoughbalance] = useState(false);
    const[swapdetail,setswapdetail]= useState(false);
    const[sufficient,setsufficient]= useState(false);
    const[nolPair,setNoLPair]= useState(false);
    const[balanceid1,setbamalanceid1]= useState("");
    const[appOpted,setOpted] = useState(false);
    const[showdetails,setshowdetails] = useState(false);
    const[as3Id,setas3Id] = useState("");
    const[slippage,setslippage] = useState()
    const[liq1,setliq1] = useState("");
    const[liq2,setliq2] = useState("");
    const[LpAssetOptin,setLpAssetOptin] = useState("");
    const[minimumbalance,setminimumBalance] = useState("")
    const[LpassetBlance,setLpassetBlance] = useState("");
    const[liquidityamount,setliquidityamount]=useState("");
    const[amount1Out,setamount1Out]= useState([]);
    const[amount2Out,setamount2Out]= useState([]);
    const[id,setid]= React.useState("");
    const[seem,setseem]= useState([]);
    const[smore,sets]= useState(false);
    const[smore1,sets1] = useState(false);
    const[assetdetails,setAssetdetails] = useState([]);
    const[sname1,setsName1] = useState("");
    const[slogo1,setSlogo] = useState("");
    const[sunitname1,setSunitname1] = useState("");
    const[sid,setSid1] = useState("");
 const[loader, setLoader] = useState(false);
 const[simage,setsimage] = useState([]);
 const[mintotranser,setmintotransfer] = useState("");
 const[burnquote,setburnquote] = useState([]);
//console.log("mintotranser",mintotranser)
//console.log("decl1",decl1);
    const handleShowLoad = () => setLoader(true);
    const handleHideLoad = () => setLoader(false);

   
    useEffect(()=>{checkbalan()},[])
    const checkbalan = async()=>{
 
        setOpted(await checkotp(appID_global));
        let [s1,opt] = await walletBalance(0);
        setbamalanceid1(s1);
        let k = await mintotrx();
        ////console.log("kval",k)
        setmintotransfer(k);
        let mn = await minAlgoBalance();
        ////console.log("minimum",mn)
        setminbalance(mn);
        let [s2,opt1] = await walletBalance(elemToken);
        setAssetOptin3(opt1)
        let [s3,opt3] = await walletBalance(78045387);
        let [s4,opt4] = await walletBalance(78043454);
        let [s5,opt5] = await walletBalance(78044898);

      let  s=[
          {index:78045387,image:usdclogo,name:"USDC",bal:s3},
          {index:78043454,image:taulogo,name:"TAU",bal:s4},
          {index:78044331,image:elemlogo,name:"ELEM",bal:s2},
          {index:78044898,image:einrlogo,name:"EINR",bal:s5}
         
      ]
      setsimage(s);

       
      }
    const settingfee = (a)=>{
      if(a < 2){
        setfees(a)
      }
      else{
        setfees(0.05)
      }
      
    } 
    
    const choose1 =async(id,logo,name)=>{
        setsamount1(0)
        setsamount2(0)
       
        setliq1(0)
        setliq2(0)
        callval(id,tokId2,1) 
        setTokId1(id);
        setTokName1(name)
        setTokLogo1(logo)
        let [value,optin] = await walletBalance(parseInt(id));
        setTokBalance1(value)
        setAssetOptin1(optin)
        //  swap2(samount2) 
        handleClose()
        
        
    }

    const choose2 =async(id,logo,name)=>{
        setsamount1(0)
        setsamount2(0)
        setliq1(0)
        setliq2(0)
        callval(tokId1,id,2)
        setTokId2(id);
        setTokName2(name)
        setTokLogo2(logo)
        let [value,optin] = await walletBalance(parseInt(id));
        setTokBalance2(value);
        setAssetOptin2(optin)
        // swap1(samount1);
        // liqValue1(liq1) 
        handleClose1()
        
    }
    // useEffect(()=>{callval()
    // },[tokId1,tokId2])
    const callval=async(id1,id2,wh)=>{
             if((id1>=0) && (id2>=0)){
             let [rs1,rs2,liq,assetid3,rs3] = await swapinput(appID_global,id1,id2);
            //console.log("idvalues",rs1,rs2,liq,assetid3,rs3)
                if(liq){
                    setNoLPair(true)
                    setshowdetails(false)
                }
                else{
                    setNoLPair(false)
                    setshowdetails(true);
                    let [out1,out2] = await amount1_input(id1,id2,rs1,rs2);
                    setas3Id(assetid3);
             // setsamount2(out * ain_amount);
             setsout1(out1);
             setsout2(out2);
             setrsvalue1(rs1);
             setrsvalue2(rs2);
             setrsvalue3(rs3);
             let outslippage1 = await amount_out_with_slippage(out1,fee)
             let outslippage2 = await amount_out_with_slippage(out2,fee)
         //console.log("out",outslippage1,outslippage2)
             let a1,a2; 
            //  let asset_out_amount_withoutfees = (1000000 * 997 * rs2 ) / ((rs1 * 1000) +(1000000 * 997));
            //  let calculated_amount_in = ((1000000 * 1000 * rs1) / ((rs2 - 1000000) * 997)) + 1;

             let asset_out_amount_withoutfees = ((1*1000000) * 997 * rs2 ) / ((rs1 * 1000) +((1*1000000)  * 997))
            let calculated_amount_in = (((1*1000000) * 1000 * rs1) / ((rs2 - (1*1000000)) * 997)) + 1;
         //console.log("asset_out_amount_withoutfees",asset_out_amount_withoutfees)
         //console.log("calculated_amount_in",calculated_amount_in)
            
             if(id1 > id2){
               a1 = out1;
               a2 = out2;
               setdeclaring1(asset_out_amount_withoutfees);
              setdeclaring2(calculated_amount_in);
              // samount1 ? await swap1(samount1): swap1(0);
              // samount2 ? await swap2(samount2): swap2(0);
              let [s1,s2] = await burnassetamount(tokId1,tokId2,appID_global);
              setburnquote([s1,s2]);
             }
             else{
               a1 = out2;
               a2 = out1;
               setdeclaring1(calculated_amount_in);
             setdeclaring2(asset_out_amount_withoutfees);
             let [s1,s2] = await burnassetamount(tokId2,tokId1,appID_global);
             setburnquote([s1,s2]);
              
             }
             let [s3,opt2] = await walletBalance(assetid3);
            setLpAssetOptin(opt2)
            setLpassetBlance(s3)
            //console.log("values",out1,out2)
                }
            // wh===1 ?  await swap2(samount2): await swap1(samount1)
            // wh===1 ? await  liqValue2(liq2) : await liqValue1(liq1) 
         
             
       
        }
        }
    const regainstate = async(id1,id2)=>{
      setsamount1("");
      setsamount2("");
      setliq1("");
      setliq2("");
      await checkbalan();
      let [s1,opt] = await walletBalance(0);
        setbamalanceid1(s1);
        let k = await mintotrx();
        ////console.log("kval",k)
        setmintotransfer(k);
        let mn = await minAlgoBalance();
      let [value1,optin1] = await walletBalance(parseInt(id1));
      let [value,optin] = await walletBalance(parseInt(id2));
     //console.log("value",value1,value)
      if(id1 === 0 ){
        setbamalanceid1(value1);
      }
      else{
        setTokBalance1(value1)
      }
      if(id2 === 0 ){
        setbamalanceid1(value);
      }
      else{
        setTokBalance2(value)
      }
        // setTokBalance2(value);
        callval(id1,id2,0);
    } 
        
      const swap1 = async(in_Amount) => {
        let in_amount;
       if(Math.sign(in_Amount )=== -1){
         in_amount = 0;
       }else{
         in_amount = in_Amount;
       }
       
        {
          let a1,a2,asset_out_amount_withoutfees;
          if(tokId1 > tokId2){
            a1 = rs1value;
            a2 = rs2value;
            asset_out_amount_withoutfees = ((in_amount*1000000) * 997 * a2 ) / ((a1 * 1000) +((in_amount*1000000)  * 997))
            // let calculated_amount_in = (((out_amount*1000000) * 1000 * a1) / ((a2 - (out_amount*1000000)) * 997)) + 1;
            
          }
          else{
            a1 = rs2value;
            a2 = rs1value;
            asset_out_amount_withoutfees = (((in_amount*1000000) * 1000 * a2) / ((a1 - (in_amount*1000000)) * 997)) + 1;

          }
          setsamount1(in_amount);
          // setsamount2(a1 * in_amount)
          
         setsamount2(parseFloat(asset_out_amount_withoutfees/1000000).toFixed(3))
         //console.log("asset_out_amount_withoutfees",asset_out_amount_withoutfees)
          let outslippage1 = await amount_out_with_slippage(asset_out_amount_withoutfees,fee)
          setasswithfee((outslippage1))
          setswf((in_amount) * 0.003);
          rsvaluecheck((in_amount),(asset_out_amount_withoutfees/1000000),a1,a2)
        
          let tb;
         //console.log("token",tokName1)
          if(tokName1 === "ALGO"){
            tb = minbalance;
          }
          else{
            tb = tokBalance1;
            // alert("enet") 
          }
      
          if(tb < (in_amount * 1000000) || tb === undefined || tb === "" || tb === 0){
            setenoughbalance(true)
           //console.log("entering",tb)
            // setalrt(true)
            // setalrtclose(false)
            // setalrtvalue("You are not having enough Balance") 
            // setsamount1(0)
            // setsamount2(0)
          }
          else{
            setenoughbalance(false)
          }
          if((in_amount * 1000000) > a1){
                 
            setsufficient(true);
          }
          else{
            setswapdetail(true);
            setsufficient(false);
          }
         
          
      
        }
       
      
      }
      const swap2 = async(out_Amount) =>{
        
        let out_amount;
        if(Math.sign(out_Amount) === -1){
          out_amount = 0;
          }
          else{
            out_amount = out_Amount
          }
          let a1,a2,calculated_amount_in;
          if(tokId1 > tokId2){
            a1 = rs1value;
            a2 = rs2value;
            calculated_amount_in = (((out_amount*1000000) * 1000 * a1) / ((a2 - (out_amount*1000000)) * 997)) + 1;
            
          }
          else{
            a1 = rs2value;
            a2 = rs1value;
            calculated_amount_in = ((out_amount*1000000) * 997 * a1 ) / ((a2 * 1000) +((out_amount*1000000)  * 997))
           
          }
        setsamount2(out_amount);
        // setsamount1(a1 * out_amount)
        // let calculated_amount_in = (((out_amount*1000000) * 1000 * a1) / ((a2 - (out_amount*1000000)) * 997)) + 1;
        setsamount1(parseFloat(calculated_amount_in/1000000).toFixed(3))
        let outslippage1 = await amount_out_with_slippage((calculated_amount_in),fee)
        setasswithfee((outslippage1 ))
        setswf((out_amount) * 0.003);
        rsvaluecheck((out_amount),(calculated_amount_in/1000000),a1,a2)
        let tb;
         //console.log("token",tokName1)
          if(tokName1 === "ALGO"){
            tb = balanceid1;
          }
          else{
            tb = tokBalance1;
            // alert("enet") 
          }
         //console.log("tbval",tb,calculated_amount_in)
          if(tb < (calculated_amount_in) || tb === undefined || tb === "" || tb === 0){
            setenoughbalance(true)
           //console.log("entering",tb)
            // setalrt(true)
            // setalrtclose(false)
            // setalrtvalue("You are not having enough Balance") 
            // setsamount1(0)
            // setsamount2(0)
          }
          else{
            setenoughbalance(false)
          }
      
         
      }
      const conectWallet = async () => {
        try {
            let settings = {
                shouldSelectOneAccount: true,
                openManager: true
            }
            const accounts = await myAlgoWallet.connect(settings);
            const addresses = accounts.map((account) => account.address);
            
            localStorage.setItem("walletAddress", addresses[0]);
            window.location.reload();
            } catch (err) {
            //console.error(err);
            }

       };
    const appOptIn = async () =>
    {
      handleShowLoad()
   //console.log("minb",mintotranser ,balanceid1)
    if(balanceid1 >= mintotranser + 557000){
    // const algodClient = new algosdk.Algodv2('', 'https://api.testnet.algoexplorer.io', '');



    let index = parseInt(appID_global);
    ////console.log("appId inside donate", index)
    try {

    const params = await algodClient.getTransactionParams().do();

    let optinTranscation = algosdk.makeApplicationOptInTxnFromObject({
    from:localStorage.getItem("walletAddress"),
    suggestedParams:params,
    appIndex:index
    });

    let transid=await dualwalletconnect(optinTranscation);
    await waitForConfirmation(algodClient, transid,"App Opt-In is completed successfully");
    await updatealgobalance()
    // const signedTx1 = await myAlgoWallet.signTransaction(optinTranscation.toByte());

    // //toast.info("Transaction in Progress");
    // const response = await algodClient.sendRawTransaction(signedTx1.blob).do();
    // ////console.log("TxID", JSON.stringify(response, null, 1));
    // await waitForConfirmation(algodClient, response.txId,"App Opt-In");
    

    // await postusertx(localStorage.getItem("walletAddress"),response.txId,0,"Opt-In App",0,0,"","",0);

    // await postusertx("-",response.txId,"App Opt-In","-","-")

    setOpted(true)
    }catch (err) {
      handleHideLoad()
   //console.log("err",err.toString())
    let ev = err.toString()
    let present = ev.indexOf("balance")   
    let present4 = ev.indexOf("already")
    let present5 = ev.indexOf("blocked")
    //console.log("err",ev)
    if(present > 1){
    toast.error(`Your Algo balance is low. Please get more Algos from dispenser`);
    }
    else if(present4 > 1){
    toast.error(`Already opted the App `);
    }
    else if(present5 > 1){
    toast.error(`Allow the pop up window and try again`);
    }
    else{
      toast.error(`err`);
    }
   



    //console.error(err);
    }
    }
    else{
handleHideLoad()
    toast.error("You are not having enough Algo to do Transaction");
    }

    }

    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
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
            // await sleep(5000);
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
    const checkassetOptin = async()=>{
      handleShowLoad()
    
        if(parseInt(tokId2) === parseInt(elemToken)){
            if(balanceid1 >= (mintotranser + 101000)){
                assetoptincall(1);
            }
            
            else{
              handleHideLoad()
              toast.error("Not having sufficient Algo")
            }
        }
        else if(assetoptin2 && assetoptin3){
            if(balanceid1 >= (mintotranser + 202000)){
                assetoptincall(2);
            }
            
            else{
              handleHideLoad()
              toast.error("Not having sufficient Algo")

            }
        }
        else if(assetoptin2){
            if(balanceid1 >= (mintotranser + 101000)){
                assetoptincall(1);
            }
            
            else{
              handleHideLoad()
              toast.error("Not having sufficient Algo")

            }
        }
        else if(assetoptin3){
            if(balanceid1 >= (mintotranser + 101000)){
                assetoptincall(1);
            }
            
            else{
              handleHideLoad()
              toast.error("Not having sufficient Algo")

            }
        }
    }  
    const assetoptincall = async(a)=>{
        const params = await algodClient.getTransactionParams().do();
        let optinTranscation1 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                from:localStorage.getItem("walletAddress"),
                to :localStorage.getItem("walletAddress"),
                assetIndex: parseInt(tokId2),
                amount: 0,
                suggestedParams:params
              });
        let optinTranscation2 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
            from:localStorage.getItem("walletAddress"),
            to :localStorage.getItem("walletAddress"),
            assetIndex: parseInt(elemToken) ,
            amount: 0,
            suggestedParams:params
            });
        if(a === 1)
        {           
            // const signedTx11 = await myAlgoWallet.signTransaction(optinTranscation1.toByte());
            //   //toast.info("Transaction in Progress");
              
            //   const response1 = await algodClient.sendRawTransaction(signedTx11.blob).do();
              // await waitForConfirmation(algodClient, response1.txId,"Asset Opt-In");
              let transid=await dualwalletconnect(optinTranscation1);
              await waitForConfirmation(algodClient, transid,"Asset Opt-In is completed successfully");
              await updatealgobalance()
              setAssetOptin2(false)
              setAssetOptin3(false)
        }else{
            const groupID = algosdk.computeGroupID([ optinTranscation1, optinTranscation2]);
            const txs = [ optinTranscation1, optinTranscation2];
            for (let i = 0; i <= 1; i++) txs[i].group = groupID;
            if(localStorage.getItem("walletName") === "myAlgoWallet"){
              const signedTx11 = await myAlgoWallet.signTransaction([txs[0].toByte(),txs[1].toByte()]);
              // //toast.info("Transaction in Progress");
  
              const response1 = await algodClient.sendRawTransaction([signedTx11[0].blob,signedTx11[1].blob]).do();
              await waitForConfirmation(algodClient, response1.txId,"Opt-In is completed successfully");
              await updatealgobalance()
              setAssetOptin2(false)
              setAssetOptin3(false)
            }
            else if(localStorage.getItem("walletName") === "PeraWallet"){
              const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
              const txns = [txs[0], txs[1]]
              const txnsToSign = txns.map(txn => {
                const encodedTxn = Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString("base64");
               //console.log(encodedTxn);
                return {
                  txn: encodedTxn,
              };
            });
        
            const requestParams = [ txnsToSign ];
            const request = formatJsonRpcRequest("algo_signTxn", requestParams);
            const result = await connector.sendCustomRequest(request);
            const decodedResult = result.map(element => {
              return element ? new Uint8Array(Buffer.from(element, "base64")) : null;
            });
              // send and await
        
              let response = await algodClient.sendRawTransaction(decodedResult).do();
              await waitForConfirmation(algodClient, response.txId,"Opt-In is completed successfully");
              await updatealgobalance()
        
        
           // localStorage.setItem("Staked","stakedbalance");
           
    
    
            }


            
        }
    } 
    const zeroinput = async(a,b)=>{
      let k ;
     //console.log("zeroinput",a,b)
      if(a === 0 || a === "" || (a*1000000) === 0||  (b*1000000) === 0|| a === undefined || b === undefined || a === null || b === null || b === 0 || b === ""){
        toast.error("Please enter the input values")
        handleHideLoad();
        k = 1;
       //console.log("val")
      }
      else{
        k = 0;
      }
      return k;
    }
    const swapcheck = async(appid,asset_in_amount,assetout_amount) =>{
      handleShowLoad();
      let s = await zeroinput(samount1,samount2);
      ////console.log("svalue",s)
      if(s === 0){
        if(tokName1 === "ALGO"){
          if(balanceid1 >= ( 4000 + asset_in_amount + mintotranser) ){
               await swap(appid,asset_in_amount,assetout_amount);

          }
          else{
            toast.error("Not having sufficient Algo")
            handleHideLoad();

          }
      }
      else{
          if(balanceid1 >= ( 4000 + mintotranser) ){
              await swap(appid,asset_in_amount,assetout_amount);
         }
         else{
          toast.error("Not having sufficient Algo")
          handleHideLoad();

         } 
      }
      }
       
    }
    const rsvaluecheck = (a,b,c,d)=>{
      let k ;
      if(c > (a * 1000000) && d > (b*1000000)){
        k =  0;
        showinsuuficient(false)
      }
      else{
        k = 1;
        showinsuuficient(true)
      }
    }
    const swap = async (appid,asset_in_amount,assetout_amount) => {

       
            
  
        let  tokenid1 = tokId1;   
        let tokenid2 = tokId2;
          let index = parseInt(appid);
        
         let r1,r2;
         let t1 ,t2;
  
        //  const [ls,rs1,rs2,rs3,as3] = swapdet
     //console.log("after calculatuon",ls,rs1,rs2,rs3,as3)
            
        
        // let reserve1 = rs1;
        // let reserve2 = rs2;
        // let reserve3 = rs3;
        // let lsig = ls;
        // let assetId3 = as3;
          let tt1;
            let tt2;
          if(tokenid1 > tokenid2){
            r1 = rs1value;
            r2 = rs2value;
            tt1 =tokenid1;
            tt2 = tokenid2;
  
            
        }
        else{
          r2 = rs1value;
          r1 = rs2value;
            tt1 =tokenid2;
            tt2 = tokenid1;
            // t1 = tokenid1;
            // t2 = tokenid2;
        }
       let lsig = await escrowdata(appID_global,tt1,tt2);
       let as3 = await axios.get(`${node['algodclient']}/v2/accounts/${lsig.address()}`); 
      //  let ln = await axios.get(`${node['algodclient']}/v2/accounts/${lsig.address()}/assets/${as3.data['created-assets']['0'].index}`);

      //  //console.log("Ass",as3.data['created-assets']['0']['params']['total'],ln.data['asset-holding'].amount) 
        let assetId3 = as3.data['created-assets']['0'].index;
            // let vl = reserve1 + reserve2 + reserve3;
            // let tvl = reserve1 + reserve2;
          // let k = r1 * r2 ;
          // let asset_in_amount_minus_fee = (asset_in_amount * 997) / 1000
              
          // let swap_fees = asset_in_amount - asset_in_amount_minus_fee
              
          // let l = asset_in_amount_minus_fee - swap_fees;
          // let asset_out_amount_withoutfees = r2 - (k / (r1 + l ))
          // let asset_out_amount = amount_out_with_slippage(asset_out_amount_withoutfees,fee);
          let am1;
          let am2;
          let swap_fees;
          let asset_out_amount
          {
            t1 = tokenid1;
            t2 = tokenid2;
            // let k = r1 * r2 ;
            let asset_in_amount_minus_fee = (asset_in_amount * 997) / 1000
                
             swap_fees = asset_in_amount - asset_in_amount_minus_fee
                
            // // let l = asset_in_amount_minus_fee - swap_fees;
            // // let asset_out_amount_withoutfees = r2 - (k / (r1 + asset_in_amount_minus_fee ))
            
            // let asset_out_amount_withoutfees = (asset_in_amount * 997 * r2) / ((r1 * 1000) +(asset_in_amount * 997))
            // asset_out_amount = amount_out_with_slippage(asset_out_amount_withoutfees,fee);
            // let minus_amount = asset_out_amount_withoutfees > asset_out_amount
            // let asset_out_amount_withoutfees = (asset_in_amount * 997 * r2) / ((r1 * 1000) +(asset_in_amount * 997))
            // asset_out_amount = amount_out_with_slippage(asset_out_amount_withoutfees,fee);
            // let minus_amount = asset_out_amount_withoutfees > asset_out_amount
  
            asset_out_amount = amount_out_with_slippage((assetout_amount),fee);
            //console.log("minus_amount",minus_amount)
          //   if(tokenid1 > tokenid2){
              am1 = asset_in_amount;
              am2 = asset_out_amount;
  
         
          } 
           
         
          
  
        //console.log("amount",am1,am2,t1,t2)
          
          try {
    
            const params = await algodClient.getTransactionParams().do();
            
          // //toast.info("Optin Completed");
            
            let sender = localStorage.getItem("walletAddress");
            let recv_escrow = lsig.address();
            let amount = 2000;
          // //console.log("tk1&tk2",tk1,tk2,am1,am2)
  
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
    
             if(parseInt(tt1)==0){
              // foreignassets.push(parseInt(tokenid1));
              foreignassets.push(parseInt(tt2));
              
             }
             else if(parseInt(tt2)==0){
              foreignassets.push(parseInt(tt1));
              // foreignassets.push(parseInt(tokenid2));
             }
             else{
              foreignassets.push(parseInt(tt1));
              foreignassets.push(parseInt(tt2));
             }
             foreignassets.push(parseInt(assetId3));
          // //console.log("tk1&tk2",tt1,tt2,recv_escrow)
  
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
               ////console.log("asset1",t1);
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
                  // amount: (parseInt(70)),
                  suggestedParams: params
                });
              }
            // //console.log("tk1&tk2",tk1,tk2,am1,am2)
     let newescrow = escrowProgram2;
     let results1 = await algodClient.compile(newescrow).do(); 
   //console.log("escrownew",results1.hash)  
     let program1 = new Uint8Array(Buffer.from(results1.result, "base64"));
      
          // let lsig1 = algosdk.makeLogicSig(program1);
          let lsig1 = new algosdk.LogicSigAccount(program1);
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
            if(localStorage.getItem("walletName") === "myAlgoWallet"){
              const signedTx2 = algosdk.signLogicSigTransaction(txs[1], lsig);
            const signedTx4 = algosdk.signLogicSigTransaction(txs[3], lsig);
            const signedTx5 = algosdk.signLogicSigTransaction(txs[4], lsig1);
            const signedTxnarray = await myAlgoWallet.signTransaction([txs[0].toByte(),txs[2].toByte()]);
            // //toast.info("Swapping in Progress");
        const response = await algodClient.sendRawTransaction([signedTxnarray[0].blob, signedTx2.blob, signedTxnarray[1].blob, signedTx4.blob, signedTx5.blob]).do();
      ////console.log("TxID", JSON.stringify(response, null, 1));
      //   setTxId(response.txId);
      //   setShow(true);
      // toast.success(`Swapping Completed Successfully ${response.txId}`);    
      // toast.info("Swapping Completed"); 
      // let an = tokName1 +"/"+tokName2;
         await  getpostdatafilter(parseInt(tt1),parseInt(tt2),(r1+ r2),(r1+ r2 + rs3value),swap_fees)
        await waitForConfirmation(algodClient, response.txId,"Swapping completed successfully");
        // window.location.reload();
        await updatealgobalance()
        await regainstate(tokId1,tokId2);
       
            }
            else if(localStorage.getItem("walletName") === "PeraWallet"){
              const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
              const txns = [txs[0],txs[1],txs[2],txs[3],txs[4]]
              const txnsToSign = txns.map(txn => {
                const encodedTxn = Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString("base64");
               //console.log(encodedTxn);
                return {
                  txn: encodedTxn,
              };
            });
              const signedTx3 = algosdk.signLogicSigTransaction(txs[1], lsig);
              const signedTx4 = algosdk.signLogicSigTransaction(txs[3], lsig);
              const signedTx5 = algosdk.signLogicSigTransaction(txs[4], lsig1);
              const requestParams = [ txnsToSign ];
              const request = formatJsonRpcRequest("algo_signTxn", requestParams);
              const result = await connector.sendCustomRequest(request);
              const decodedResult = result.map(element => {
                return element ? new Uint8Array(Buffer.from(element, "base64")) : null;
              });
             //console.log(result);
              decodedResult[1] = signedTx3.blob;
              decodedResult[3] = signedTx4.blob;
              decodedResult[4] = signedTx5.blob;
             let response = await algodClient.sendRawTransaction(decodedResult).do()
             let an = tokName1 +"/"+tokName2;
             await  getpostdatafilter(parseInt(tt1),parseInt(tt2),(r1+ r2),(r1+ r2 + rs3value),swap_fees)
            await waitForConfirmation(algodClient, response.txId,"Swapping completed successfully");
            // window.location.reload();
            await updatealgobalance();
            await regainstate(tokId1,tokId2);
            
    }
            
        // await postusertx(localStorage.getItem("walletAddress"),response.txId,recv_escrow,"Swap",tvl,asset_in_amount,tk1,tk2,amount);
        // await createtxhash(recv_escrow,response.txId,"SWAP",asset_in_amount,an)
        // await updatepairhistory(tokenid1,tokenid2,amount,tvl,vl);
        
        // {
        //   setsamount1(0)
        //   setsamount2(0)
        // }
        // else{
        //   setdvalue(true)
        //   setsamount1(0)
        //   setsamount2(0)
        // }
        
    //    await sleep(8000);
       
    //     window.location.reload();
       
          
  
        
      } catch (err) {
        handleHideLoad();
       //console.log("err",err.toString())
        let ev = err.toString()
        let present = ev.indexOf("balance")
        let present1 = ev.indexOf("exceeds")
        let present2 = ev.indexOf("underflow")
        let present3 = ev.indexOf("negative")
        // let present4 = ev.indexOf("asset_holding")
        let present5 = ev.indexOf("Operation cancelled");
        let present6 = ev.indexOf("blocked")
        ////console.log("err",ev)
        if(present > 1){
          toast.error(`Your Algo balance is low. Please get more Algos from dispenser`);
        }
        else if(present1 > 1){
          toast.error(`Please Refresh this page and Redeem your excess amount ${tokName1} & ${tokName2}, then try to swap`);
        }
        else if(present2 > 1){
          toast.error(`Your Asset balance is low`);
        }
        else if(present3 > 1){
          toast.error(`Please Add liquidity and try again`);
        }
        // else if(present4 > 1){
        //   toast.error(`No Pair for these assets,don't try to Swap these asset`);
        // }
        else if(present5 > 1){
          toast.error(`Operation Cancelled`);
        }
        else if(present6 > 1){
          toast.error(`Please allow the pop up window and try again`);
        }
        else{
          toast.error(`err`);
        }
  
  
            
          //console.error(err);
          }
        
       

    }; 
        const changetokens =()=>{
            // setSwapv(!swapv)
            setsamount1("")
            setsamount2("")
            let a = tokId1;
            let b = tokId2;
            let aname1 = tokName1;
            let aname2 = tokName2;
            let logo11 = tokLogo1;
            let logo12 = tokLogo2;
            let balan1 = tokBalance1;
            let balan2 = tokBalance2;
            
            setTokName1(aname2);
            setTokName2(aname1);
            setTokId1(b);
            setTokId2(a);
            setTokLogo1(logo12)
            setTokLogo2(logo11);
            setTokBalance1(balan2)
            setTokBalance2(balan1)
            let de1 = decl1;
            let de2 = decl2;
            setdeclaring1(de2);
            setdeclaring2(de1)
            
          
          }
          const callingmax1 =async()=>{
            if(tokName1 === "ALGO"){
                  let mn = minbalance - 4000;
                  await swap1(parseFloat(mn/1000000))
               
            }
            else{
              await swap1(parseFloat(tokBalance1/1000000))
            }
           
          }
          const callingmax2 =async()=>{
            if(tokName2 === "ALGO"){
                  let mn = minbalance - 4000;
                  await swap2(parseFloat(mn/1000000))           
              }
            else{
              await swap2(parseFloat(tokBalance2/1000000))
            }
          
          }

          const liqValue1 = async(v1,check) =>{
 
            if(v1 === 0){
              setliq1(0);
            }
            else{
              setliq1(v1);
            }
            let sr1 ,sr2;
            if(tokId1 > tokId2){
              sr1 = rs1value;
              sr2 = rs2value;
            }
            else{
              sr2 = rs1value;
              sr1 = rs2value;
            }
            let amount2 = convert1((v1 * 1000000),sr1,sr2);
         //console.log("Reserves",sr1,sr2,amount2)
           
            let tb,tb1,tb2;
             setliq2(parseFloat(amount2/1000000).toFixed(4));
             {
                if(tokName1 === "ALGO" ){
                    if(( 6000 + (v1 * 1000000)) > minbalance || tokBalance2 < amount2 ){
                        setminimumBalance(true)
                       //console.log("minimum")
                    }
                    else{
                        setminimumBalance(false)
                       //console.log("minimum")
                    }
                 }
                 else if(tokName2 === "ALGO" ){
                    if((amount2) > tokBalance2 || minbalance < (6000 + (v1 * 1000000)) ){
                        setminimumBalance(true)
                       //console.log("minimum")
                    }
                    else{
                        setminimumBalance(false)
                       //console.log("minimum")
                    }
                 }
                 else{
                     if(tokBalance1 < (v1*1000000) || tokBalance2 < amount2 ){
                        setminimumBalance(true)
                       //console.log("minimum")
                     }
                     else{
                        setminimumBalance(false)
                       //console.log("minimum")
                     }
                 }
             }         
            
          }
          
          const liqValue2 = async(v2,check)=>{
            
            if(v2 === 0){
              setliq2(0);
            }
            else{
              setliq2(v2);
            }
            let sr1 ,sr2;
            if(tokId1 > tokId2){
              sr1 = rs1value;
              sr2 = rs2value;
            }
            else{
              sr2 = rs1value;
              sr1 = rs2value;
            }
            // let dtdata = await escrowdatacompile(parseInt(appID_global),parseInt(tokId1),parseInt(tokId2));
            // let compiled = await readingLocalstate(algodClientGet,dtdata.hash)
            // let reserve1 = await assert1Reserve(compiled);
            // let reserve2 = await assert2Reserve(compiled); 
            let amount2 = convert2((v2 * 1000000),sr1,sr2);
         //console.log("Reserves",sr1,sr2,amount2)
          setliq1(parseFloat(amount2/1000000).toFixed(4))
          let tb,tb1,tb2;
          {
            if(tokName1 === "ALGO" ){
                if(( amount2) > (minbalance - 6000) || tokBalance2 < (v2 * 1000000)){
                    setminimumBalance(true)
                   //console.log("minimum")
                }
                else{
                    setminimumBalance(false)
                   //console.log("minimum")
                }
             }
             else if(tokName2 === "ALGO" ){
                if((amount2) > tokBalance2 || minbalance < (6000 + (v2 * 1000000)) ){
                    setminimumBalance(true)
                   //console.log("minimum")
                }
                else{
                    setminimumBalance(false)
                   //console.log("minimum")
                }
             }
             else{
                 if(tokBalance1 < (v2*1000000) || tokBalance2 < amount2 ){
                    setminimumBalance(true)
                   //console.log("minimum")
                 }
                 else{
                    setminimumBalance(false)
                   //console.log("minimum")
                 }
             }
         }
        //       if(tokName2 === "ALGO"){
        //           tb = (balanceid1 - 5000 )- (v2*1000000) ;
              
              
        //           if( tb > minbalance  || Math.sign(tb) === -1){
        //               setnotsufficientadd(true)
        //         }
        //               else{
        //              setnotsufficientadd(false)
        //         }
        //         }
        //         else{
        //           tb1 = tokBalance2;
        //         if((v2*1000000) > tb1  ){
        //           setnotsufficientadd(true)
        //         }
        //         else{
        //           setnotsufficientadd(false)
        //         }
        //           // alert("enet") 
        //         }
        //         if(tokName1 === "ALGO"){
        //           tb = (balanceid1 - 5000 )-(amount2) ;
        //           if(tb > minbalance  || Math.sign(tb) === -1){
        //             setnotsufficientadd(true)
        //           }
        //           else{
        //             setnotsufficientadd(false)
        //           }
        //         }
        //         else{
        //           tb2 = tokBalance1;
        //           if( (amount2) > tb2 ){
        //               setnotsufficientadd(true)
        //         }
        //         else{
        //              setnotsufficientadd(false)
        //         }
        //           // alert("enet") 
        //         }
                
                
          
        //   if(sr1 <=0 || sr2 <=0  || v2*1000000 > sr1 || amount2 > sr2){
        //     setsufficient(true);
        //   }
        //   else
        //   {
        //     setsufficient(false);
        //   }
          
          
          }
         
          const callingmaxliq1 =async()=>{
            if(tokName1 === "ALGO"){
              let mn = minbalance - 6000;
              if(Math.sign(mn) === -1){
                await liqValue1(0,0)
               //console.log("enter")
              }
              else{
               //console.log("enter",mn/1000000)
                await liqValue1(mn/1000000,1)
              }}
          
            else{
              await liqValue1(tokBalance1/1000000,1)
            }
           
          }
          const callingmaxliq2 =async()=>{
            if(tokName2 === "ALGO"){
              let mn = minbalance - 6000;
              if(Math.sign(mn) === -1){
                await liqValue2(0,0)
              }
              else{
              await liqValue2(mn/1000000,1)
              }
            }
            else{
              await liqValue2(tokBalance2/1000000,1)
            }
           
          }

    const liqassetOptin = async(asid)=>{
      handleShowLoad()
        try{
          const params = await algodClient.getTransactionParams().do();
        let optinTranscation = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
            from:localStorage.getItem("walletAddress"),
            to: localStorage.getItem("walletAddress"),
            amount: 0,
            assetIndex: parseInt(asid),
            suggestedParams: params,
        });
        let transid=await dualwalletconnect(optinTranscation);
        await waitForConfirmation(algodClient, transid,"Asset Opt-In completed successfully");
        await updatealgobalance()
        // const signedTx1 = await myAlgoWallet.signTransaction(optinTranscation.toByte());
        // const response = await algodClient.sendRawTransaction(signedTx1.blob).do();
        // await waitForConfirmation(algodClient, response.txId,"Asset Opt-In");
        setLpAssetOptin(false)
        }
        catch(err){
          toast.error(`err`);
          handleHideLoad();
        }
    }    
    const mint21call = async (appid,asn1,asn2,v1,v2) => {
      handleShowLoad()
      let s = await zeroinput(liq1,liq2);
      if(s === 0){
        let index = parseInt(appid);
       //console.log("appId inside donate", index);
        //console.log("input1",a1)
        ////console.log("input2",ls)
        let at1,at2,a1,a2,s1,s2;
        if(asn1 > asn2){
          at1 = asn1;
          at2 = asn2;
          // an1 = aname;
          // an2 = baname;
          a1 = v1;
          a2 = v2;
          s1 = rs1value;
          s2 =  rs2value; 
        }
        else{
          at1 = asn2;
          at2 = asn1;
          // an1 = baname;
          // an2 = aname;
          a1 = v2;
          a2 = v1;
          s2 = rs1value;
          s1 =  rs2value;
        }
       //console.log("tokens",at1,at2,a1,a2)
          // setAppId(appid);
          let tokenid1 = at1;
          let tokenid2 = at2;
          let results = await escrowdatacompile(appID_global,tokenid1,tokenid2);
          // let replacedData = data.replaceAll("Token1",tokenid1).replaceAll("Token2",tokenid2).replaceAll("appId",appID_global);
          // let results = await algodClient.compile(replacedData).do();
        
        //console.log("Hash = " + results.hash);
        //console.log("Result = " + results.result);
        let program = new Uint8Array(Buffer.from(results.result, "base64"));
        
              // let ls = algosdk.makeLogicSig(program);
              let ls = new algosdk.LogicSigAccount(program);
              let compiled = await readingLocalstate(5,results.hash)
              let reserve3 = await assert3Reserve(compiled); 
              // let ass3id = await compiled['created-assets'][0]['index'];
                  let ass3id = as3Id;
        
        // let compiled = await readingLocalstate(algodClientGet,results.hash)
        
        let ilt = reserve3;
       //console.log("s1values",s1,s2,ilt) 
          // let as3id = await compiled['created-assets'][0]['index'];
            let assetId3 = ass3id;
            // let aopt = await assetOptin(assetId3);
        
           
            // //toast.info("Create Liquidity Done Sucessfully");
            // setShowMintButton(true);
            
        //console.log(assetId3)
        
          // let program = new Uint8Array(Buffer.from(results.result, "base64"));
        
          let lsig = ls;
        //console.log("Escrow =", lsig.address()); 
        
          // readLocalState(algodClient,results.hash,appId,tokenid1,tokenid2,assetId3);
        
        let i1 = (a1);
        let i2 = (a2);
       //console.log("input1",i1)
        //console.log("input2",ilt)
        let tvl = s1+s2;
        let vl = s1 + s2 + ilt;
          let total;
         
        
            let liquidity_asset_amount = Math.min(
              (i1 * ilt) / s1,
              (i2 * ilt) / s2
            );
            // liquidity_asset_amount = liquidity_asset_amount - (liquidity_asset_amount * 0.05)
            //  let liquidity_asset_amount = Math.min(
            //   (i1 * aprice[3]) / aprice[0],
            //   (i2 * aprice[3]) / aprice[1]
            // );
          //console.log("liquidity_asset_amount",liquidity_asset_amount)
          total = Math.floor(liquidity_asset_amount - (liquidity_asset_amount * 0.5));
          // total = (liquidity_asset_amount)
         //console.log("Total 2: ", total,a1,(a2));
         
        
                                
                // this.setState({setLoading:false}) ;  
                // this.setState({setisOpenmkyc:true}); 
                try {
        
                
             {
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
                        amount: parseInt((i1)),
                        suggestedParams: params,
                      });
              
                    const transaction4 =
                      algosdk.makePaymentTxnWithSuggestedParamsFromObject({
                        from: sender,
                        to: recv_escrow,
                        note: undefined,
                        accounts: sender,
                        amount: parseInt((i2)),
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
                        amount: parseInt(total),
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
                      if(localStorage.getItem("walletName") === "myAlgoWallet"){
                        const signedTx1 = algosdk.signLogicSigTransaction(txs[1], lsig);
                        const signedTx2 = algosdk.signLogicSigTransaction(txs[4], lsig);
                
                        const signedTxArray = await myAlgoWallet.signTransaction([txs[0].toByte(),txs[2].toByte(),txs[3].toByte()]);
                        //toast.info("Transaction in Progress");
                        const response = await algodClient
                          .sendRawTransaction([
                            signedTxArray[0].blob,
                            signedTx1.blob,
                            signedTxArray[1].blob,
                            signedTxArray[2].blob,
                            signedTx2.blob,
                          ])
                          .do();
                        
                        await  getpostdatafilter(parseInt(tokenid1),parseInt(tokenid2),(rs1value+ rs2value),(rs1value+ rs2value + rs3value),amount)
    
                        await waitForConfirmation(algodClient, response.txId,"Liquidity Added successfully");
                        // window.location.reload();
                        await updatealgobalance();
                        await regainstate(tokId1,tokId2);
                      }
                      else if(localStorage.getItem("walletName") === "PeraWallet"){
                        const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
                        const txns = [txs[0], txs[1], txs[2],txs[3],txs[4]]
                        const txnsToSign = txns.map(txn => {
                          const encodedTxn = Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString("base64");
                         //console.log(encodedTxn);
                          return {
                            txn: encodedTxn,
                        };
                      });
                          const signedTx3 = algosdk.signLogicSigTransaction(txs[1], lsig);
                          const signedTx4 = algosdk.signLogicSigTransaction(txs[4], lsig);
                          const requestParams = [ txnsToSign ];
                          const request = formatJsonRpcRequest("algo_signTxn", requestParams);
                          const result = await connector.sendCustomRequest(request);
                          const decodedResult = result.map(element => {
                            return element ? new Uint8Array(Buffer.from(element, "base64")) : null;
                          });
                         //console.log(result);
                          decodedResult[1] = signedTx3.blob;
                          decodedResult[4] = signedTx4.blob;
                          let response = await algodClient.sendRawTransaction(decodedResult).do()
                        await  getpostdatafilter(parseInt(tokenid1),parseInt(tokenid2),(rs1value+ rs2value),(rs1value+ rs2value + rs3value),amount)
  
                        await waitForConfirmation(algodClient, response.txId,"Liquidity added successfully");
                        await updatealgobalance();
                        await regainstate(tokId1,tokId2);
                    
                  
                  
                     // localStorage.setItem("Staked","stakedbalance");
                     
              
              
                      }
                    
                
                     
                     setliq1(0);
                     setliq2(0);
                      // let an = asetName1 +"/"+asetName2;
                      
                      // await postusertx(localStorage.getItem("walletAddress"),response.txId,recv_escrow,"Add Liquidity",total,0,asn1,asn2,amount);
                      // await createtxhash(recv_escrow,response.txId,"ADD LIQUIDITY",total,an)
                      // await updatepairhistory(tokenid1,tokenid2,amount,tvl,vl);
                      // await sleep(8000);
                      // window.location.reload();
                    //   setTxId(response.txId);
                  }
                  else
            {
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
                      amount: parseInt((i1)),
                      suggestedParams: params,
                    });
            
                  const transaction4 =
                    algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                      from: sender,
                      to: recv_escrow,
                      assetIndex: parseInt(tokenid2),
                      note: undefined,
                      accounts: sender,
                      amount: (parseInt(i2)),
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
                      amount: (parseInt(total)),
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
  
                    if(localStorage.getItem("walletName") === "myAlgoWallet"){
                                  
                    const signedTx1 = algosdk.signLogicSigTransaction(txs[1], lsig);
                    const signedTx2 = algosdk.signLogicSigTransaction(txs[4], lsig);
                   
                    const signedTxArray = await myAlgoWallet.signTransaction([txs[0].toByte(),txs[2].toByte(),txs[3].toByte()]);
                    //toast.info("Transaction in Progress");
                    const response = await algodClient
                      .sendRawTransaction([
                        signedTxArray[0].blob,
                        signedTx1.blob,
                        signedTxArray[1].blob,
                        signedTxArray[2].blob,
                        signedTx2.blob,
                      ])
                      .do();
                      // let an = an1 +"/"+an2;
                    //   toast.success(`Transaction Success ${response.txId}`);
                    // //toast.info("Add Liquidity Done Sucessfully");
                  //     await updateusedetails(tokenid1,tokenid2,tvl,vl,0);
                  //   await postusertx(recv_escrow,response.txId,"ADD LIQUIDITY",total,an)
                    
                  //console.log("TxID", JSON.stringify(response, null, 1));
                  await  getpostdatafilter(parseInt(tokenid1),parseInt(tokenid2),(rs1value+ rs2value),(rs1value+ rs2value + rs3value),amount)
  
                    await waitForConfirmation(algodClient, response.txId,"Liquidity added successfully");
                    await updatealgobalance();
                    await regainstate(tokId1,tokId2);
                    }
                    else if(localStorage.getItem("walletName") === "PeraWallet"){
                      const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
                      const txns = [txs[0], txs[1], txs[2],txs[3],txs[4]]
                      const txnsToSign = txns.map(txn => {
                        const encodedTxn = Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString("base64");
                       //console.log(encodedTxn);
                        return {
                          txn: encodedTxn,
                      };
                    });
                        const signedTx3 = algosdk.signLogicSigTransaction(txs[1], lsig);
                        const signedTx4 = algosdk.signLogicSigTransaction(txs[4], lsig);
                        const requestParams = [ txnsToSign ];
                        const request = formatJsonRpcRequest("algo_signTxn", requestParams);
                        const result = await connector.sendCustomRequest(request);
                        const decodedResult = result.map(element => {
                          return element ? new Uint8Array(Buffer.from(element, "base64")) : null;
                        });
                       //console.log(result);
                        decodedResult[1] = signedTx3.blob;
                        decodedResult[4] = signedTx4.blob;
                        let response = await algodClient.sendRawTransaction(decodedResult).do()
                      await  getpostdatafilter(parseInt(tokenid1),parseInt(tokenid2),(rs1value+ rs2value),(rs1value+ rs2value + rs3value),amount)
  
                      await waitForConfirmation(algodClient, response.txId,"Liquidity added successfully");
                      await updatealgobalance();
                      await regainstate(tokId1,tokId2);
                  
                
                
                   // localStorage.setItem("Staked","stakedbalance");
                   
            
            
                    }
                    setliq1(0);
                    setliq2(0);
                    // await postusertx(localStorage.getItem("walletAddress"),response.txId,recv_escrow,"Add Liquidity",total,0,asn1,asn2,amount);
                    // await createtxhash(recv_escrow,response.txId,"ADD LIQUIDITY",total,an)
                    // await updatepairhistory(tokenid1,tokenid2,amount,tvl,vl)
                  //   await sleep(8000);
                  //   window.location.reload();
                  //   handleLiquidiy();
                    // setTxId(response.txId);
                  }
                  
                 }
           
                  
                } catch (err) {
                  handleHideLoad()
                 //console.log("err",err.toString())
                  let ev = err.toString()
                  let present = ev.indexOf("balance")
                  let present1 = ev.indexOf("exceeds")
                  let present2 = ev.indexOf("underflow")
                  let present3 = ev.indexOf("negative")
                  let present4 = ev.indexOf("already")
                  let present5 = ev.indexOf("asset_holding")
                  let present6 = ev.indexOf("blocked")
                  //console.log("err",ev)
                  if(present > 1){
                    toast.error(`Your Algo balance is low. Please get more Algos from dispenser`);
                  }
                  else if(present1 > 1){
                    toast.error(`Please Refresh this page and Redeem your excess amount ${tokName1} & ${tokName2} ,then try add Liquidity`);
                  }
                  else if(present2 > 1){
                    toast.error(`try again By giving small amount`);
                  }
                  else if(present3 > 1){
                    toast.error(`You dont have enough Assets in your wallet`);
                  }
                  else if(present4 > 1){
                    toast.error(`This Pair of Assets is Already Created,So Please try to Add liquidity `);
                  }
                  else if(present5 > 1){
                    toast.error(`No Pair for these assets,don't try to addd liquidity these asset`);
                  }
                  else if(present6 > 1){
                    toast.error(`Allow the pop up window and try again`);
                  }
                  else{
                    toast.error(`Operation Cancelled`);
                  }
            
            
                      
                    //console.error(err);
                    }                                       
              
          
      }
     
      };  
      const percent = async(entered_percent) =>{
       
        let liquidity_asset_in = LpassetBlance * entered_percent / 100;
        setliquidityamount(liquidity_asset_in);
        // //console.log("v",removeLi) 
      
        //  let asset1_amount = (liquidity_asset_in * rs1value) / rs3value ;
        // // //console.log(asset1_amount)
        //  let asset2_amount = (liquidity_asset_in * rs2value) / rs3value ;
        //  let asset1_amount_out = asset1_amount - (asset1_amount * 0.05)
        
        //  let asset2_amount_out = asset2_amount - (asset2_amount * 0.05)
        //console.log("quote",burnquote)
         if(tokId1 > tokId2){
          // let [s1,s2] = await burnassetamount(tokId1,tokId2,appID_global);
          let asset1_amount = (rs1value - burnquote[0]) ;
        // //console.log(asset1_amount)
          let asset2_amount = (rs2value - burnquote[1]) ;
           let asset1_amount_ou = asset1_amount * (liquidity_asset_in / rs3value) 
           let asset1_amount_out = asset1_amount_ou - (asset1_amount_ou * 0.05)
        
          let asset2_amount_ou2 = asset2_amount * (liquidity_asset_in / rs3value) 
          let asset2_amount_out = asset2_amount_ou2 - (asset2_amount_ou2 * 0.05)
            setamount1Out(asset1_amount_out)
            setamount2Out(asset2_amount_out)
         }
         else{
          // let [s1,s2] = await burnassetamount(tokId2,tokId1,appID_global);
          let asset1_amount = ( rs1value - burnquote[0]) ;
        
         let asset2_amount = (rs2value - burnquote[1])  ;
         let asset1_amount_ou = asset1_amount * (liquidity_asset_in / rs3value) 
         let asset1_amount_out = asset1_amount_ou - (asset1_amount_ou * 0.05)

        //console.log("asset1_amount",liquidity_asset_in , LpassetBlance )
         let asset2_amount_ou = asset2_amount * (liquidity_asset_in / rs3value) 
         let asset2_amount_out = asset2_amount_ou - (asset2_amount_ou * 0.05)

            setamount2Out(asset1_amount_out)
            setamount1Out(asset2_amount_out)  
         }
      
        // //console.log("asset1_amount_out",asset1_amount_out)
         
        // //console.log("asset2_amount_out",asset2_amount_out)
      
      }
      const checkremoveLiquidity = async()=>{
        handleShowLoad()
        let s = await zeroinput(amount1Out,amount2Out)
        if(s === 0){
          if(balanceid1 > (mintotranser + 8000)){
            await removeliquidity()
          }
          else{
            toast.error("Not having sufficient Algo ")
            handleHideLoad()
            
          }
        }
         
      }
      const removeliquidity = async () => {
        let tokenid1 = tokId1;
        let tokenid2 = tokId2;
        let index = parseInt(appID_global);
        //console.log("appId inside donate", tokenid2);
  
        
        let t1,t2,burn1,burn2;
        if(tokenid1 > tokenid2 ){
            t2 = tokenid2;
            t1 = tokenid1;
            burn1 = amount1Out;
            burn2 = amount2Out;
            
        }
        else{
            t2 = tokenid1;
            t1 = tokenid2;
            burn1 = amount2Out;
            burn2 = amount1Out;

            
        }
    
       //console.log("burning",t1,t2,amount1Out,amount2Out,burn1,burn2)
      // let replacedData = data.replaceAll("Token1",tokenid1).replaceAll("Token2",tokenid2).replaceAll("appId",appId);
      // let results = await algodClient.compile(replacedData).do();
        let replacedData = data.replaceAll("Token1",t1).replaceAll("Token2",t2).replaceAll("appId",appID_global);
        let results = await algodClient.compile(replacedData).do();
        let escrowaddress = results.hash;
        //console.log("escrow",escrowaddress)
        let program = new Uint8Array(Buffer.from(results.result, "base64"));
    
        // let lsig = algosdk.makeLogicSig(program);
        let lsig = new algosdk.LogicSigAccount(program);
        //console.log("Escrow =", lsig.address()); 
        // await readLocalState(algodClient,escrowaddress,index,t1,t2,"0");
        let ana1 ;
      
       
            try {
              // const accounts = await myAlgoWallet.connect();
              // const addresses = accounts.map(account => account.address);
              const params = await algodClient.getTransactionParams().do();
              
              let sender =  localStorage.getItem("walletAddress");
              let recv_escrow = lsig.address();
              let amount = 3000;
            //   let vl = s1+s2 + ilt;  
            //   let tvl = s1 + s2;      
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
               foreignassets.push(parseInt(as3Id));
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
                  amount: parseInt((burn1)),
                  suggestedParams: params
                });
                let transaction4;
                if(parseInt(t2) === 0){
                  transaction4 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
                   from:recv_escrow ,
                   to:  localStorage.getItem("walletAddress"),
                   // assetIndex: parseInt(t2),
                   note: undefined,
                   accounts:  localStorage.getItem("walletAddress"),
                   amount: parseInt(burn2),
                   suggestedParams: params
                 });
                }
                else{
                   transaction4 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                    from:recv_escrow ,
                    to:  localStorage.getItem("walletAddress"),
                    assetIndex: parseInt(t2),
                    note: undefined,
                    accounts:  localStorage.getItem("walletAddress"),
                    amount: parseInt(burn2),
                    suggestedParams: params
                  });
                }
                
                
                let foreignassetliquidity =[];
                foreignassetliquidity.push(parseInt(as3Id));
                // let decAddr = algosdk.decodeAddress(recv_escrow);
                // let acc =[];
                // acc.push(decAddr.publicKey);
                const transaction5 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                  from:  localStorage.getItem("walletAddress") ,
                  to:recv_escrow ,
                  assetIndex: parseInt(as3Id),
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
              if(localStorage.getItem("walletName") === "myAlgoWallet"){
                const signedTx1 = await myAlgoWallet.signTransaction([txs[0].toByte(),txs[4].toByte()]);
                const signedTx2 = algosdk.signLogicSigTransaction(txs[1], lsig);
                const signedTx3 = algosdk.signLogicSigTransaction(txs[2], lsig);
                const signedTx4 = algosdk.signLogicSigTransaction(txs[3], lsig);
                // const signedTx5 = await myAlgoWallet.signTransaction(txs[4].toByte());
                //toast.info("Removing Liquidity in Progress");
          const response = await algodClient.sendRawTransaction([ signedTx1[0].blob, signedTx2.blob, signedTx3.blob, signedTx4.blob, signedTx1[1].blob ]).do();
          await  getpostdatafilter(parseInt(t1),parseInt(t2),(rs1value+ rs2value),(rs1value+ rs2value + rs3value),amount)
    
    
      await waitForConfirmation(algodClient, response.txId,"Liquidity removed successfully");
      await updatealgobalance();
      await regainstate(tokId1,tokId2);
              }
              else if(localStorage.getItem("walletName") === "PeraWallet"){
                const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
                const txns = [txs[0], txs[1], txs[2],txs[3],txs[4]]
                const txnsToSign = txns.map(txn => {
                const encodedTxn = Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString("base64");
               //console.log(encodedTxn);
                return {
                  txn: encodedTxn,
              };
            });
                const signedTx1 = algosdk.signLogicSigTransaction(txs[1], lsig);
                const signedTx2 = algosdk.signLogicSigTransaction(txs[2], lsig);
                const signedTx3 = algosdk.signLogicSigTransaction(txs[3], lsig);
                const requestParams = [ txnsToSign ];
                const request = formatJsonRpcRequest("algo_signTxn", requestParams);
                const result = await connector.sendCustomRequest(request);
                const decodedResult = result.map(element => {
                  return element ? new Uint8Array(Buffer.from(element, "base64")) : null;
                });
               //console.log(result);
                decodedResult[1] = signedTx1.blob;
                decodedResult[2] = signedTx2.blob;
                decodedResult[3] = signedTx3.blob;
                let response = await algodClient.sendRawTransaction(decodedResult).do()
                await  getpostdatafilter(parseInt(t1),parseInt(t2),(rs1value+ rs2value),(rs1value+ rs2value + rs3value),amount)

                await waitForConfirmation(algodClient, response.txId,"Liquidity removed successfully");
                await updatealgobalance();
                await regainstate(tokId1,tokId2);
              }
          
            
     
    setliquidityamount(0);
    setamount1Out(0)
    setamount2Out(0) 
    
    //   handleRemove()
      // toast.success(`Transaction Completed Successfully ${response.txId}`);
      // toast.info("Removing Liquidity is Done!")  
    } catch (err) {
      handleHideLoad()
     //console.log("err",err.toString())
      let ev = err.toString()
      let present = ev.indexOf("balance")
      let present1 = ev.indexOf("exceeds")
      let present2 = ev.indexOf("underflow")
      let present3 = ev.indexOf("negative")
      let present4 = ev.indexOf("already")
      let present5 = ev.indexOf("asset_holding")
      let present6 = ev.indexOf("blocked")
      //console.log("err",ev)
      if(present > 1){
        toast.error(`Your Algo balance is low. Please get more Algos from dispenser`);
      }
      else if(present1 > 1){
        toast.error(`Please Refresh this page and Redeem your excess amount ${tokName1} & ${tokName2} then try to Remove liquidity`);
      }
      else if(present2 > 1){
        toast.error(`You dont have enough Assets in your wallet`);
      }
      else if(present3 > 1){
        toast.error(`Not able to Remove Liquidity`);
      }
      else if(present4 > 1){
        toast.error(`This Pair of Assets is Already Created,So Please try to Add liquidity `);
      }
      else if(present5 > 1){
        toast.error(`No Pair for these assets,don't try to Swap these asset`);
      }
      else if(present6 > 1){
        toast.error(`Allow the pop up window and try again`);
      }
      else{
        toast.error(`err`);
      }
  
  
          
        //console.error(err);
        }
      };
      
      function valuestfunction(a){
        call(a);
    }
    const checklogo = (name,id)=>{
      if(name === "ALGO" && id === 0){
          return algologo;
      }
      else if(name === "USDC" && id === 78045387){
          return usdclogo;
      }
      else if(name === "ELEM"  && id === 78044331){
          return elemlogo;
      }
      else if(name === "TAU"  && id === 78043454){
          return taulogo;
      }
      else if(name === "EINR"  && id === 78044898){
          return einrlogo;
      }
  } 
  const searchassets = async(v)=>{
    let ln = await axios.get(`${node['indexerclient']}/v2/assets?name=${v}&limit=10`);
    let asn=[];
    ln.data.assets.map((r,i)=>{
      let nm = r['params']['unit-name'].toUpperCase();
      let unname = checklogo(nm,r['index'])
      let k ={
        "assetname" : r['params']['name'],
        "assetunitname":r['params']['unit-name'],
        "assetindex":r['index'],
        "aslogo":unname
      }
      asn.push(k);
    })
   setAssetdetails(asn)

  }
    const call =async(v)=>{
  if(v === 0 || v === undefined || v === ""){
    sets(false)
    sets1(false)
  }
      //console.log("working",typeof parseInt(value))
      if(!isNaN(v)){
          let ln = await axios.get(`${node['algodclient']}/v2/assets/${v}`);

          ////console.log("unitanem",unitname,name,id,ln.data['params']['unit-name'])
          let asnamw =(ln.data['params']['unit-name']).toUpperCase();
         //console.log("upercase",asnamw)
          setsName1(ln.data['params']['name'])
          setSid1(v)
          setSunitname1(ln.data['params']['unit-name'])
          setSlogo(checklogo(asnamw,v))
          let [b,s] = await walletBalance(v);
          ////console.log("bvalue",b)
          setassetBalance(b);
          
          // setassetsname(asnamw);
     
          sets1(true)
          sets(false)
          //console.log("assets",assets)
      }
      else{
        //console.log("string")
          let assetInfo = await indexerClient.searchForAssets().name(v).limit(10).do();
          await searchassets(v)

          let [b,s] = await walletBalance(v);
          setassetBalance(b);
          sets(true)
          sets1(false)
          // setseem(assetInfo.assets)
      }

    
      
     
  }
  
    return (
        <Layout>
   <><ToastContainer position='bottom-right' draggable = {false} transition={Zoom} autoClose={4000} closeOnClick = {false}/></>

            <Container>
                <Row className='justify-content-center'>
                    <Col md={10} lg={7} className="mb-4">
                        {key ? 
                            <>
                                <Link className='mb-3 text-white d-flex align-items-center btn-link' to="/pool">
                                    View Liquidity Positions
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                                </Link>
                            </>

                            : null
                        }

                        {key && key !== "remove" ? 
                            showAlert? 
                            <Alert variant="grad" className='mb-4' onClose={() => setShowAlert(false)} dismissible>
                                <p><strong>Tip:</strong> By adding liquidity you'll earn 0.15% of all trades for this pair proportional to your share of the pool. Fees are added to the pool, accrue in real time and can be claimed by withdrawing your liquidity.</p>
                            </Alert>
                            : null

                            : null
                        }

                        <Card className='card-dash d-block border-0 mb-4'>
                            
                            <div className="d-flex align-items-center float-end mt-1 acc-h-links">
                            <Dropdown>
                                <Dropdown.Toggle variant="reset" className='noarrow p-0' id="dropdown-basic">
                                    <svg class="blue-dark-theme-white-10" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M10.4903 2C10.0113 2 9.60183 2.33859 9.50983 2.80859L9.17585 4.52344C8.35509 4.8338 7.59617 5.2674 6.92975 5.81445L5.28522 5.24805C4.83222 5.09205 4.33382 5.27936 4.09382 5.69336L2.586 8.30664C2.347 8.72164 2.43399 9.2485 2.79499 9.5625L4.11335 10.709C4.04478 11.1303 4.00007 11.5593 4.00007 12C4.00007 12.4407 4.04478 12.8697 4.11335 13.291L2.79499 14.4375C2.43399 14.7515 2.347 15.2784 2.586 15.6934L4.09382 18.3066C4.33282 18.7216 4.83222 18.9089 5.28522 18.7539L6.92975 18.1875C7.59595 18.7342 8.35546 19.1663 9.17585 19.4766L9.50983 21.1914C9.60183 21.6614 10.0113 22 10.4903 22H13.5098C13.9888 22 14.3983 21.6614 14.4903 21.1914L14.8243 19.4766C15.645 19.1662 16.404 18.7326 17.0704 18.1855L18.7149 18.752C19.1679 18.908 19.6663 18.7216 19.9063 18.3066L21.4141 15.6914C21.6531 15.2764 21.5661 14.7515 21.2051 14.4375L19.8868 13.291C19.9553 12.8697 20.0001 12.4407 20.0001 12C20.0001 11.5593 19.9553 11.1303 19.8868 10.709L21.2051 9.5625C21.5661 9.2485 21.6531 8.72164 21.4141 8.30664L19.9063 5.69336C19.6673 5.27836 19.1679 5.09109 18.7149 5.24609L17.0704 5.8125C16.4042 5.26579 15.6447 4.83366 14.8243 4.52344L14.4903 2.80859C14.3983 2.33859 13.9888 2 13.5098 2H10.4903ZM12.0001 8C14.2091 8 16.0001 9.791 16.0001 12C16.0001 14.209 14.2091 16 12.0001 16C9.79107 16 8.00007 14.209 8.00007 12C8.00007 9.791 9.79107 8 12.0001 8Z"></path></svg>
                                </Dropdown.Toggle>

                                <Dropdown.Menu align="end" className='dropdown-menu-lg'>
                                    <h5 className='font-semibold'>Transaction Settings</h5>

                                    <h6 className='font-normal d-flex'>
                                        Slippage tolerance
                                        <OverlayTrigger
                                            key="left"
                                            placement="left"
                                            overlay={
                                                <Tooltip id={`tooltip-left`}>
                                                   During transaction some amount is deducted,This fees should be less than or equal to 1.
                                                </Tooltip>
                                            }
                                            >
                                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                            </OverlayTrigger>
                                    </h6>
                                    
                                    <Row className='flex-nowrap mb-3 gx-2'>
                                        <Col>
                                            <InputGroup className='input-group-max'>
                                                <Form.Control
                                                    placeholder="0.50"
                                                    aria-label="Recipient's username"
                                                    aria-describedby="basic-addon2"
                                                    value ={fee}
                                                    onChange={event => settingfee((event.target.value))}
                                                />
                                                <InputGroup.Text className='p-0 border-0' id="basic-addon2">%</InputGroup.Text>
                                            </InputGroup>
                                        </Col>
                                        <Col xs="auto">
                                            <Button variant='blue' onClick={()=>setfees(0.5)}>Auto</Button>
                                        </Col>
                                    </Row>
{/* 
                                    <h6 className='font-normal d-flex'>
                                        Transaction deadline
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
                                    </h6>
                                    <InputGroup className='input-group-max mb-4'>
                                        <Form.Control
                                            placeholder="30"
                                            aria-label="Recipient's username"
                                            aria-describedby="basic-addon2"
                                        />
                                        <InputGroup.Text className='p-0 border-0' id="basic-addon2">minutes</InputGroup.Text>
                                    </InputGroup>

                                    <h5 className='font-semibold mb-3'>Interface Settings</h5>

                                    <div className="d-flex mb-2 align-items-center justify-content-between">
                                        <h6 className='font-normal mb-0 d-flex'>
                                            Toggle Expert Mode
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
                                        </h6>
                                        <Form.Check 
                                            type="switch"
                                            className='p-0'
                                            defaultChecked={false}
                                            id="custom-switch-3"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="d-flex mb-2 align-items-center justify-content-between">
                                        <h6 className='font-normal mb-0 d-flex'>
                                            Disable Multihops
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
                                        </h6>
                                        <Form.Check 
                                            type="switch"
                                            className='p-0'
                                            id="custom-switch-2"
                                        />
                                    </div> */}

                                </Dropdown.Menu>
                            </Dropdown>
                            </div>
                            <Tabs defaultActiveKey="swap" onSelect={(k) => setKey(k === 'liquidity' ? 'add' : '')} className='dashboard-tabs' id="tab-example-1">
                                <Tab eventKey="swap" title="Swap">
                                    <div className="mb-4">
                                        <div className="group-row">
                                            <Row>
                                                <Col sm={5} className="mb-sm-0 mb-3">
                                                    <Button variant='link' onClick={handleShow} className='btn-currency p-0'>
                                                    {tokLogo1 ? (<><img src={ tokLogo1 }  /></>):(<><img src={ selecttoken }  /></>)}

                                                        <div className="ms-3 text-start">
                                                            <h6 className='sub-heading text-xs mb-0'>Swap From:</h6>
                                                            <h5 className='mb-0 font-semibold'>
                                                                {tokName1}
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="16" height="16" class="ml-2 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                                                            </h5>
                                                        </div>
                                                    </Button>
                                                </Col>
                                                <Col sm={7}>
                                                    <div className="input-group-max d-flex align-items-center text-nowrap px-3 input-group-max-lg w-100">
                                                        <input type="number" placeholder='0.00' className='form-control'value={ samount1 } onChange={event => swap1((event.target.value))}  />
{tokName1 === "ALGO" ?(<> <span className='text-xs' style={{opacity: '0.5'}}>Balance <strong>{parseFloat(balanceid1/1000000).toFixed(3)} {tokName1}</strong></span>
&nbsp;<Button variant="outline-purple" className='btn-xs-d' style={{height: '20px'}}  onClick={()=>callingmax1()}>Max</Button></>):
									   (<> <span className='text-xs' style={{opacity: '0.5'}}>Balance <strong>{parseFloat(tokBalance1/1000000).toFixed(3)} {tokName1}</strong></span>
                     &nbsp;<Button variant="outline-purple" className='btn-xs-d' style={{height: '20px'}}  onClick={()=>callingmax1()}>Max</Button></>)  }                  
                                  

                                                     </div>

                                                    <div className="text-end">
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className="py-2 px-sm-4 px-2">
                                        <Button variant='blue' className='rounded-circle py-3' onClick={()=>changetokens()}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi m-0 bi-arrow-down-up" viewBox="0 0 16 16" >
                                            <path fill-rule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"/>
                                            </svg></Button>                                        </div>
                                        <div className="group-row">
                                            <Row>
                                                <Col sm={5} className="mb-sm-0 mb-3">
                                                    <Button variant='link' onClick={handleShow1} className='btn-currency p-0'>
                                                    {tokLogo2 ? (<><img src={ tokLogo2 }  /></>):(<><img src={ selecttoken }  /></>)}
                                                        <div className="ms-3 text-start">
                                                            <h6 className='sub-heading text-xs mb-0'>Swap To (est.):</h6>
                                                            <h5 className='mb-0 font-semibold'>
                                                                {tokName2 ? tokName2 : <Badge bg="purple">Select Token</Badge>}
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="16" height="16" class="ml-2 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                                                            </h5>
                                                        </div>
                                                    </Button>
                                                </Col>
                                                <Col sm={7}>
                                                    <div className="input-group-max d-flex align-items-center text-nowrap px-3 input-group-max-lg w-100">
                                                        <input type="number" placeholder='0.00' className='form-control' value={((samount2))} onChange={event => swap2((event.target.value))} />
                                                       { tokName2 === "ALGO" ?
                                                       (<> <span className='text-xs' style={{opacity: '0.5'}}>Balance <strong>{parseFloat(balanceid1/1000000).toFixed(3)} {tokName2}</strong></span>
                                                      &nbsp;<Button variant="outline-purple" className='btn-xs-d' style={{height: '20px'}}  onClick={()=>callingmax2()}>Max</Button> </>):
                                                       tokName2 ?  (<> <span className='text-xs' style={{opacity: '0.5'}}>Balance <strong>{ tokBalance2 ? parseFloat(tokBalance2/1000000).toFixed(3) : '0.00'} {tokName2}</strong></span>
                                                       &nbsp;<Button variant="outline-purple" className='btn-xs-d' style={{height: '20px'}}  onClick={()=>callingmax2()}>Max</Button></>)

                                               :(<></>)}
                                                    
                                                    </div>
                                                    <div className="text-end">
                                                        {/* <Button variant="outline-purple" className='btn-xs-d' style={{height: '20px'}}  onClick={()=>callingmax2()}>Max</Button> */}
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                        
                                        
                                        {showdetails ? 
                                        (<>
                                        <br/>
                                           <label className='d-flex align-items-center justify-content-between'>
                                            
                                            <h6>Price</h6>                          <h6> 1 {tokName1} = { decl1  ? parseFloat(decl1/1000000).toFixed(2) : "0"} {tokName2}  </h6>  
                                           
                                       </label>
                                       <br></br>
                                       <label className='d-flex align-items-center justify-content-between'>                                            
                                            <h6>Minimum Received</h6><h6> {parseFloat(AssWithFee/1000000).toFixed(4)} {tokName2}  </h6>  
                                        </label>
                                        <br></br>
                                       <label className='d-flex align-items-center justify-content-between'>                                            
                                            <h6>Swap Rewards</h6><h6>{swf > 0 ? parseFloat(swf).toFixed(3) : "0" } ELEM</h6>  
                                        </label>
                                        </>):
                                        (<></>)}
                                      
                                    </div>
{localStorage.getItem("walletAddress") ?
 (<>{nolPair ?
  (<>
<Button className='btn btn-blue w-100'>
{/* <svg width="20" height="20" className='me-2 ms-0' viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg"><path d="M21 18V19C21 20.1 20.1 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.89 3 5 3H19C20.1 3 21 3.9 21 5V6H12C10.89 6 10 6.9 10 8V16C10 17.1 10.89 18 12 18H21ZM12 16H22V8H12V16ZM16 13.5C15.17 13.5 14.5 12.83 14.5 12C14.5 11.17 15.17 10.5 16 10.5C16.83 10.5 17.5 11.17 17.5 12C17.5 12.83 16.83 13.5 16 13.5Z"></path></svg> */}
No Pair Found
</Button>
  </>):
  (<>
   {appOpted ? 
 (<>
  {(assetoptin2 || assetoptin3 ) ?
 (<>
  <ButtonLoad loading={loader} className='btn btn-blue w-100' onClick={()=>checkassetOptin()}>
{/* <svg width="20" height="20" className='me-2 ms-0' viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg"><path d="M21 18V19C21 20.1 20.1 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.89 3 5 3H19C20.1 3 21 3.9 21 5V6H12C10.89 6 10 6.9 10 8V16C10 17.1 10.89 18 12 18H21ZM12 16H22V8H12V16ZM16 13.5C15.17 13.5 14.5 12.83 14.5 12C14.5 11.17 15.17 10.5 16 10.5C16.83 10.5 17.5 11.17 17.5 12C17.5 12.83 16.83 13.5 16 13.5Z"></path></svg> */}
Asset Opt-In
</ButtonLoad>
 </>):enoughbalance ? (<>
    <Button className='btn btn-blue w-100' >
{/* <svg width="20" height="20" className='me-2 ms-0' viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg"><path d="M21 18V19C21 20.1 20.1 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.89 3 5 3H19C20.1 3 21 3.9 21 5V6H12C10.89 6 10 6.9 10 8V16C10 17.1 10.89 18 12 18H21ZM12 16H22V8H12V16ZM16 13.5C15.17 13.5 14.5 12.83 14.5 12C14.5 11.17 15.17 10.5 16 10.5C16.83 10.5 17.5 11.17 17.5 12C17.5 12.83 16.83 13.5 16 13.5Z"></path></svg> */}
You don't have sufficient balance to swap
</Button>
 </>):
 (<>{tokName2 ? (<>
 {insuuficient ? (<>
  <ButtonLoad  className='btn btn-blue w-100' >
Insuficient Liquidity
</ButtonLoad>
 </>):(<>
  <ButtonLoad loading={loader} className='btn btn-blue w-100' onClick={()=>swapcheck(appID_global,(samount1 * 1000000),(samount2*1000000))}>
Zero Fee Swap
</ButtonLoad>
 </>)}

</>):(<>
  <ButtonLoad  className='btn btn-blue w-100' >
Select Asset
</ButtonLoad>
</>)}
  
 </>)}
 </>):
 (<>
  <ButtonLoad loading={loader} className='btn btn-blue w-100' onClick={()=>appOptIn()}>
{/* <svg width="20" height="20" className='me-2 ms-0' viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg"><path d="M21 18V19C21 20.1 20.1 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.89 3 5 3H19C20.1 3 21 3.9 21 5V6H12C10.89 6 10 6.9 10 8V16C10 17.1 10.89 18 12 18H21ZM12 16H22V8H12V16ZM16 13.5C15.17 13.5 14.5 12.83 14.5 12C14.5 11.17 15.17 10.5 16 10.5C16.83 10.5 17.5 11.17 17.5 12C17.5 12.83 16.83 13.5 16 13.5Z"></path></svg> */}
App Opt-In
</ButtonLoad>
 </>)}
  </>)}



 </>):
(<>
<Button className='btn btn-blue w-100' onClick={()=>conectWallet()}>
<svg width="20" height="20" className='me-2 ms-0' viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg"><path d="M21 18V19C21 20.1 20.1 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.89 3 5 3H19C20.1 3 21 3.9 21 5V6H12C10.89 6 10 6.9 10 8V16C10 17.1 10.89 18 12 18H21ZM12 16H22V8H12V16ZM16 13.5C15.17 13.5 14.5 12.83 14.5 12C14.5 11.17 15.17 10.5 16 10.5C16.83 10.5 17.5 11.17 17.5 12C17.5 12.83 16.83 13.5 16 13.5Z"></path></svg>
Connect wallet
</Button>
</>)}
                                   
                                </Tab>
                                <Tab eventKey="liquidity" title="Liquidity">
                                    
                                    <Tabs
                                        id="controlled-tab-example"
                                        activeKey={key}
                                        className='dashboard-tabs'
                                        onSelect={(k) => setKey(k)}
                                    >
                                        <Tab eventKey="add" title="Add">
                                        <div className="mb-4">
                                        <div className="group-row">
                                            <Row>
                                                <Col sm={5} className="mb-sm-0 mb-3">
                                                    <Button variant='link' onClick={handleShow} className='btn-currency p-0'>
                                                        <img src= { tokLogo1 } alt="algo" />
                                                        <div className="ms-3 text-start">
                                                            {/* <h6 className='sub-heading text-xs mb-0'>Input1:</h6> */}
                                                            <h5 className='mb-0 font-semibold'>
                                                                {tokName1}
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="16" height="16" class="ml-2 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                                                            </h5>
                                                        </div>
                                                    </Button>
                                                </Col>
                                                <Col sm={7}>
                                                    <div className="input-group-max d-flex align-items-center text-nowrap px-3 input-group-max-lg w-100">
                                                        <input type="number" placeholder='0.00' className='form-control' value = {liq1}  onChange={(e) => liqValue1((e.target.value),0)}  />
{tokName1 === "ALGO" ?(<> <span className='text-xs' style={{opacity: '0.5'}}>Balance <strong>{parseFloat(balanceid1/1000000).toFixed(3)} {tokName1}</strong></span>
&nbsp;     <Button variant="outline-purple" className='btn-xs-d' style={{height: '20px'}}  onClick={()=>callingmaxliq1()}>Max</Button></>):
									   (<> <span className='text-xs' style={{opacity: '0.5'}}>Balance <strong>{parseFloat(tokBalance1/1000000).toFixed(3)} {tokName1} </strong></span>
                      &nbsp;     <Button variant="outline-purple" className='btn-xs-d' style={{height: '20px'}}  onClick={()=>callingmaxliq1()}>Max</Button></>)  }     
                                                   

                                                                  </div>
                                                    <div className="text-end">
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className="py-2 px-sm-4 px-2">
                                        <Button variant='blue' className='rounded-circle py-3'><svg width="20" class="ms-0" height="20" className='ms-0' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 12C19 12.5523 18.5523 13 18 13H13V18C13 18.5523 12.5523 19 12 19C11.4477 19 11 18.5523 11 18V13H6C5.44772 13 5 12.5523 5 12C5 11.4477 5.44772 11 6 11H11V6C11 5.44772 11.4477 5 12 5C12.5523 5 13 5.44772 13 6V11H18C18.5523 11 19 11.4477 19 12Z" fill="#ffffff"></path></svg></Button>
                                     </div>
                                        <div className="group-row">
                                            <Row>
                                                <Col sm={5} className="mb-sm-0 mb-3">
                                                    <Button variant='link' onClick={handleShow1} className='btn-currency p-0'>
                                                    {tokLogo2 ? (<><img src={ tokLogo2 }  /></>):(<><img src={ selecttoken }  /></>)}
                                                        <div className="ms-3 text-start">
                                                            {/* <h6 className='sub-heading text-xs mb-0'>Input2:</h6> */}
                                                            <h5 className='mb-0 font-semibold'>
                                                                {tokName2 ? tokName2 : <Badge bg="purple">Select Token</Badge>}
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="16" height="16" class="ml-2 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                                                            </h5>
                                                        </div>
                                                    </Button>
                                                </Col>
                                                <Col sm={7}>
                                                    <div className="input-group-max d-flex align-items-center text-nowrap px-3 input-group-max-lg w-100">
                                                        <input type="number" placeholder='0.00' className='form-control' value = {liq2}  onChange={(e) => liqValue2((e.target.value),0)} />
                                                       { tokName2 === "ALGO" ?
                                                       (<> <span className='text-xs' style={{opacity: '0.5'}}>Balance <strong>{parseFloat(balanceid1/1000000).toFixed(3)} {tokName2}</strong></span>
                                                        &nbsp; <Button variant="outline-purple" className='btn-xs-d' style={{height: '20px'}}  onClick={()=>callingmaxliq2()}>Max</Button>
                                                   </>):
                                                       tokName2 ?  (<> <span className='text-xs' style={{opacity: '0.5'}}>Balance <strong>{tokBalance2 ? parseFloat(tokBalance2/1000000).toFixed(3): '0.00'} {tokName2}</strong></span>
                                                       &nbsp; <Button variant="outline-purple" className='btn-xs-d' style={{height: '20px'}}  onClick={()=>callingmaxliq2()}>Max</Button>
                                                   
                                                       </>)
                                                :(<></>)}
                                               
                                                    </div>
                                                    <div className="text-end">
                                                        </div>
                                                </Col>
                                            </Row>
                                        </div>
                                        
                                        
                                        {showdetails ? 
                                        (<>
                                        <br/>
                                        {/* <br/>
                                           <label className='d-flex align-items-center justify-content-between'>
                                            
                                            <h6>Price</h6>                          <h6> 1 {tokName1} = { decl1  ? parseFloat(decl1/1000000).toFixed(2) : "0"} {tokName2}  </h6>  
                                           
                                       </label>
                                       <br></br>
                                       <label className='d-flex align-items-center justify-content-between'>                                            
                                            <h6>Minimum Received</h6><h6> {parseFloat(AssWithFee/1000000).toFixed(4)} {tokName2}  </h6>  
                                        </label>
                                        <br></br>
                                       <label className='d-flex align-items-center justify-content-between'>                                            
                                            <h6>Swap Rewards</h6><h6>{swf > 0 ? parseFloat(swf).toFixed(3) : "0" } ELEM</h6>  
                                        </label> */}
                                        <div className="mb-20">
                                                <div className="d-flex mb-1 align-items-center justify-content-between text-md">
                                                    <span><strong></strong>{tokName2} per {tokName1}</span>
                                                    <strong className='font-semibold'>{parseFloat(decl1/1000000).toFixed(2)}</strong>
                                                </div>
                                                <div className="d-flex mb-1 align-items-center justify-content-between text-md">
                                                    <span><strong></strong>Share of Pool</span>
                                                    <strong className='font-semibold'>{(rs1value+rs2value)/1000000}</strong>
                                                </div>
                                            </div>
                                        </>):
                                        (<></>)}
                                       
                                       
                                     
                                    </div>

                                    {localStorage.getItem("walletAddress") ?
                                    (<>
                                    {nolPair ? 
                                    (<>
                                    <Button className='btn btn-blue w-100'>
                                    No Pair Found
                                    </Button>
                                   </>):
                                    (<> {appOpted ? 
                                    (<>
                                     {LpAssetOptin ? 
                                    (<>
                                     <ButtonLoad loading={loader} className='btn btn-blue w-100' onClick={()=>liqassetOptin(as3Id)}>
                                    Asset Opt-In
                                    </ButtonLoad>  
                                    </>):
                                    (<>
                                    {minimumbalance ? 
                                    (<>
                                    <Button className='btn btn-blue w-100' >
                                    You don't have sufficient balance to Add liquidity
                                    </Button></>):
                                    (<>{tokName2 ? 
                                    (<>
                                     <ButtonLoad loading={loader} className='btn btn-blue w-100' onClick={()=>mint21call(appID_global,tokId1,tokId2,(liq1 * 1000000),(liq2*1000000))}>
                                    Add Liquidity
                                    </ButtonLoad>
                                    </>):
                                    (<>
                                     <ButtonLoad  className='btn btn-blue w-100'>
                                    Select Asset
                                    </ButtonLoad>
                                    </>)}
                                   
                                    </>)}
                                       
                                    </>)}
                                    </>):
                                    (<>
                                     <ButtonLoad loading={loader} className='btn btn-blue w-100' onClick={()=>appOptIn()}>
                                        App Opt-In
                                        </ButtonLoad>
                                    </>)}
                                   
                                                                      
                                     </>)}
                                    </>):                                   
                                    (<>
                                    <Button className='btn btn-blue w-100' onClick={()=>conectWallet()}>
                                    <svg width="20" height="20" className='me-2 ms-0' viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg"><path d="M21 18V19C21 20.1 20.1 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.89 3 5 3H19C20.1 3 21 3.9 21 5V6H12C10.89 6 10 6.9 10 8V16C10 17.1 10.89 18 12 18H21ZM12 16H22V8H12V16ZM16 13.5C15.17 13.5 14.5 12.83 14.5 12C14.5 11.17 15.17 10.5 16 10.5C16.83 10.5 17.5 11.17 17.5 12C17.5 12.83 16.83 13.5 16 13.5Z"></path></svg>
                                    Connect wallet
                                    </Button>
                                    </>)}

                                          
                                        </Tab>
                                        <Tab eventKey="remove" title="Remove">
                                            
                                        <div className="group-row mb-3">
                                                <Row className='align-items-center flex-sm-nowrap'>
                                                    <Col sm="auto" className="mb-sm-0 mb-2">
                                                        <h6 className='sub-heading'>Amount to Remove</h6>
                                                    </Col>
                                                    <Col xs="auto" className='flex-grow-1'>
                                                        <div className="input-group-max d-flex justify-content-end align-items-center px-3 input-group-max-lg w-100">
                                                            <input type="number" placeholder='0.00' value={parseFloat(liquidityamount/1000000).toFixed(3)} style={{width: '80px'}}  className='form-control text-end' />
                                                            <Button variant="outline-purple" className='btn-xs-d ms-3' onClick={() => percent(25)} style={{height: '20px'}}>25%</Button>
                                                            <Button variant="outline-purple" className='btn-xs-d ms-2' onClick={() => percent(50)} style={{height: '20px'}}>50%</Button>
                                                            <Button variant="outline-purple" className='btn-xs-d ms-2' onClick={() => percent(75)} style={{height: '20px'}}>75%</Button>
                                                            <Button variant="outline-purple" className='btn-xs-d ms-2' onClick={() => percent(100)} style={{height: '20px'}}>Max</Button>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                            <div className="group-row mb-3">
                                                <Row className='align-items-center flex-sm-nowrap'>
                                                    <Col sm="auto" className="mb-sm-0 mb-2">
                                                        <h6 className='sub-heading'>You'll Receive:</h6>
                                                    </Col>
                                                    <Col xs="auto" className='flex-grow-1 d-flex align-items-center justify-content-sm-end'>
                                                        <div className="input-group-max input-group-max-img d-flex align-items-center px-3">
                                                            <span className='h3 mb-1'>{amount1Out ? parseFloat(amount1Out/1000000).toFixed(2) : '0.0'}</span>
                                                            <span className='text-xs px-2'>{tokName1}</span>
                                                            <img src={tokLogo1} alt="USDC" />
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="16" height="16" class="ml-2 stroke-current" onClick={()=>handleShow()}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>

                                                        </div>
                                                        <div className="input-group-max ms-3 input-group-max-img d-flex align-items-center px-3">
                                                            <span className='h3 mb-1'>{amount2Out ? parseFloat(amount2Out/1000000).toFixed(2) :'0.0'}</span>
                                                           {tokName2 ?
                                                            (<>
                                                             <span className='text-xs px-2'>{tokName2}</span>
                                                            <img src={tokLogo2}  /></>):
                                                            (<>
                                                            <Badge bg="purple">Select token</Badge>
                                                            </>)}
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="16" height="16" class="ml-2 stroke-current" onClick={()=>handleShow1()}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>

                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                            {localStorage.getItem("walletAddress") ? 
                                            (<>
                                            {nolPair ?
                                            (<>
                                            <Button className='btn btn-blue w-100'>
                                            {/* <svg width="20" height="20" className='me-2 ms-0' viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg"><path d="M21 18V19C21 20.1 20.1 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.89 3 5 3H19C20.1 3 21 3.9 21 5V6H12C10.89 6 10 6.9 10 8V16C10 17.1 10.89 18 12 18H21ZM12 16H22V8H12V16ZM16 13.5C15.17 13.5 14.5 12.83 14.5 12C14.5 11.17 15.17 10.5 16 10.5C16.83 10.5 17.5 11.17 17.5 12C17.5 12.83 16.83 13.5 16 13.5Z"></path></svg> */}
                                            No Pair Found
                                            </Button>
                                            </>):
                                            (<>
                                            {LpassetBlance > 0.0000000001 ? (<>
                                                <ButtonLoad loading={loader} className='btn btn-blue w-100' onClick={()=>checkremoveLiquidity()}>
                                            Remove Liquidity
                                            </ButtonLoad>
                                            </>):(<>
                                                <Button className='btn btn-blue w-100' >
                                           No Liquidity Found
                                            </Button>
                                            </>)}
                                           
                                            </>)}
                                                                                        
                                            </>):
                                            (<>
                                            <Button className='btn btn-blue w-100' onClick={()=>conectWallet()}>
                                            <svg width="20" height="20" className='me-2 ms-0' viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg"><path d="M21 18V19C21 20.1 20.1 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.89 3 5 3H19C20.1 3 21 3.9 21 5V6H12C10.89 6 10 6.9 10 8V16C10 17.1 10.89 18 12 18H21ZM12 16H22V8H12V16ZM16 13.5C15.17 13.5 14.5 12.83 14.5 12C14.5 11.17 15.17 10.5 16 10.5C16.83 10.5 17.5 11.17 17.5 12C17.5 12.83 16.83 13.5 16 13.5Z"></path></svg>
                                            Connect wallet
                                            </Button>
                                            </>)}
                                            
                                            

                                            {/* <div className="text-center">
                                                <Link className='text-text-FF' to="/find">Don't see your pool? Import it.</Link>
                                            </div> */}
                                        </Tab>
                                    </Tabs>
                                </Tab>
                            </Tabs>
                        </Card>
                    </Col>
                </Row>
            </Container>
           
            <Modal show={show} className="modal-dashboard " centered onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Select token</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-4">
                        <div className="text-md mb-2">Search</div>
                        <input type="text" placeholder='Search by Name,or paste Asset Id' onChange={(e) => valuestfunction(e.target.value)}  className='form-control form-control-field border-0' />
                    </div>
                    <div className="mb-4">
                        <h5 className='mb-3 font-semibold'>
                            Common bases
                            <OverlayTrigger
                                key="right"
                                placement="right"
                                overlay={
                                    <Tooltip id={`tooltip-right`}>
                                        Verified Assets
                                    </Tooltip>
                                }
                                >
                                    <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                </OverlayTrigger>
                        </h5>

                        <div className="d-flex flex-wrap justify-content-center">
                            <Button className='p-0  btn-currency-sm text-white mb-3 me-4' variant='link'>
                         <img src={algologo} alt="USDC" />
                         <h6 className='mb-0 ms-2 font-semibold' onClick={()=>choose1(0,algologo,"ALGO")}>ALGO</h6>
                     </Button>
                     <Button className='p-0  btn-currency-sm text-white mb-3 me-4' variant='link'>
                         <img src={usdclogo} alt="USDC" />
                         <h6 className='mb-0 ms-2 font-semibold' onClick={()=>choose1(78045387,usdclogo,"USDC")}>USDC</h6>
                     </Button>
                     <Button className='p-0  btn-currency-sm text-white mb-3 me-4' variant='link'>
                         <img src={taulogo} alt="USDC" />
                         <h6 className='mb-0 ms-2 font-semibold'onClick={()=>choose1(78043454,taulogo,"TAU")}>TAU</h6>
                     </Button>
                     <Button className='p-0  btn-currency-sm text-white mb-3 me-4' variant='link'>
                         <img src={elemlogo} alt="USDC" />
                         <h6 className='mb-0 ms-2 font-semibold'onClick={()=>choose1(78044331,elemlogo,"ELEM")}>ELEM</h6>
                     </Button>
                     <Button className='p-0  btn-currency-sm text-white mb-3 me-4' variant='link'>
                         <img src={einrlogo} alt="USDC" />
                         <h6 className='mb-0 ms-2 font-semibold'onClick={()=>choose1(78044898,einrlogo,"EINR")} >EINR</h6>
                            </Button>
                     {/* <Button className='p-0  btn-currency-sm text-white mb-3 me-4' variant='link'>
                         <img src={USDC} alt="USDC" />
                         <h6 className='mb-0 ms-2 font-semibold'>DAI</h6>
                     </Button>
                            <Button className='p-0  btn-currency-sm text-white mb-3 me-4' variant='link'>
                                <img src={USDC} alt="USDC" />
                                <h6 className='mb-0 ms-2 font-semibold'>DAI</h6>
                            </Button>
                            <Button className='p-0  btn-currency-sm text-white mb-3 me-4' variant='link'>
                                <img src={USDC} alt="USDC" />
                                <h6 className='mb-0 ms-2 font-semibold'>USDC</h6>
                            </Button>
                            <Button className='p-0  btn-currency-sm text-white mb-3 me-4' variant='link'>
                                <img src={USDC} alt="USDC" />
                                <h6 className='mb-0 ms-2 font-semibold'>USDT</h6>
                     </Button> */}
                        </div>
                    </div>

                    <hr className='mb-4' />

                    <div className="currency-list py-1">
                      {/* {!smore1 && ! smore (<></>)} */}
                      {smore1 ?
                       (<>
                        <Button variant='link' onClick={()=>choose1(sid,selecttoken,sunitname1)} className='btn-currency mb-2 w-100 justify-content-start align-items-center btn-currency-md p-1'>
                            <img src={ selecttoken }  />
                            <div className="ms-3 flex-grow-1 d-flex align-items-center text-start">
                          <div className='flex-grow-1'>
                            <h5 className='mb-0 font-semibold text-white'>{sunitname1}</h5>
                            <h7 className='mb-0 sub-heading text-sm mb-0'>{sid}</h7>
                          </div>
                          <div className='text-end'>
                            <h7 className='mb-0 sub-heading text-sm mb-0'>Balance <br />{assetBalance ? parseFloat(assetBalance/1000000).toFixed(3) : '0.00'}</h7>
                          </div>
                        </div>
                            {/* <div className="ms-3 text-start">
                                <h5 className='mb-0 font-semibold text-white'>{sunitname1}</h5>
                                <h7 className='mb-0 sub-heading text-sm mb-0'>{sid}</h7>
                            </div> */}
                        </Button>
                       </>):
                       smore ? (<>
                       {assetdetails.map((r,i)=>{
                         return(<>
                          <Button variant='link'  onClick={()=>choose1(r.assetindex,selecttoken,r.assetunitname)} className='btn-currency mb-2 w-100 justify-content-start align-items-center btn-currency-md p-1'>
                            <img src={selecttoken}  />
                            <div className="ms-3 flex-grow-1 d-flex align-items-center text-start">
                          <div className='flex-grow-1'>
                            <h5 className='mb-0 font-semibold text-white'>{r.assetunitname}</h5>
                            <h7 className='mb-0 sub-heading text-sm mb-0'>{r.assetindex}</h7>
                          </div>
                          <div className='text-end'>
                            {/* <h7 className='mb-0 sub-heading text-sm mb-0'>Balance <br />{ assetBalance ? parseFloat(assetBalance/1000000).toFixed(3) : '0.00'}</h7> */}
                          </div>
                        </div>
                            {/* <div className="ms-3 text-start">
                                <h5 className='mb-0 font-semibold text-white'>{r.assetunitname}</h5>
                                <h7 className='mb-0 sub-heading text-sm mb-0'>{r.assetindex}</h7>
                            </div> */}
                        </Button>
                         </>)
                       })}
                       </>):(<>
                        {simage.map((r,i)=>{
                         return(<>
                          <Button variant='link'  onClick={()=>choose1(r.index,r.image,r.name)} className='btn-currency mb-2 w-100 justify-content-start align-items-center btn-currency-md p-1'>
                            <img src={r.image}  />
                            <div className="ms-3 flex-grow-1 d-flex align-items-center text-start">
                          <div className='flex-grow-1'>
                            <h5 className='mb-0 font-semibold text-white'>{r.name}</h5>
                            <h7 className='mb-0 sub-heading text-sm mb-0'>{r.index}</h7>
                          </div>
                          <div className='text-end'>
                            <h7 className='mb-0 sub-heading text-sm mb-0'>Balance <br />{parseFloat(r.bal/1000000).toFixed(3)}</h7>
                          </div>
                        </div>
                            {/* <div className="ms-3 text-start">
                                <h5 className='mb-0 font-semibold text-white'>{r.name}</h5>
                                <h7 className='mb-0 sub-heading text-sm mb-0'>{r.index}</h7>
                            </div> */}
                        </Button>
                         </>)
                       })}
                       </>)}
                       
                      
                    </div>
                </Modal.Body>
            </Modal>
            <Modal show={show1} className="modal-dashboard" centered onHide={handleClose1}>
                <Modal.Header closeButton>
                    <Modal.Title>Select token</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-4">
                        <div className="text-md mb-2">Search</div>
                        <input type="text" placeholder='Search by Name,or paste Asset Id' onChange={(e) => valuestfunction(e.target.value)}  className='form-control form-control-field border-0' />
                    </div>
                    <div className="mb-4">
                        <h5 className='mb-3 font-semibold'>
                            Common bases
                            <OverlayTrigger
                                key="right"
                                placement="right"
                                overlay={
                                    <Tooltip id={`tooltip-right`}>
                                       Verified Assets
                                    </Tooltip>
                                }
                                >
                                    <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                </OverlayTrigger>
                        </h5>

                        <div className="d-flex flex-wrap justify-content-center">
                     
                     <Button className='p-0  btn-currency-sm text-white mb-3 me-4' variant='link'>
                         <img src={algologo} alt="USDC" />
                         <h6 className='mb-0 ms-2 font-semibold' onClick={()=>choose2(0,algologo,"ALGO")}>ALGO</h6>
                     </Button>
                     <Button className='p-0  btn-currency-sm text-white mb-3 me-4' variant='link'>
                         <img src={usdclogo} alt="USDC" />
                         <h6 className='mb-0 ms-2 font-semibold' onClick={()=>choose2(78045387,usdclogo,"USDC")}>USDC</h6>
                     </Button>
                     <Button className='p-0  btn-currency-sm text-white mb-3 me-4' variant='link'>
                         <img src={taulogo} alt="USDC" />
                         <h6 className='mb-0 ms-2 font-semibold'onClick={()=>choose2(78043454,taulogo,"TAU")}>TAU</h6>
                     </Button>
                     <Button className='p-0  btn-currency-sm text-white mb-3 me-4' variant='link'>
                         <img src={elemlogo} alt="USDC" />
                         <h6 className='mb-0 ms-2 font-semibold'onClick={()=>choose2(78044331,elemlogo,"ELEM")}>ELEM</h6>
                     </Button>
                     <Button className='p-0  btn-currency-sm text-white mb-3 me-4' variant='link'>
                         <img src={einrlogo} alt="USDC" />
                         <h6 className='mb-0 ms-2 font-semibold'onClick={()=>choose2(78044898,einrlogo,"EINR")} >EINR</h6>
                     </Button>
                     {/* <Button className='p-0  btn-currency-sm text-white mb-3 me-4' variant='link'>
                         <img src={USDC} alt="USDC" />
                         <h6 className='mb-0 ms-2 font-semibold'>DAI</h6>
                     </Button>
                     <Button className='p-0  btn-currency-sm text-white mb-3 me-4' variant='link'>
                         <img src={USDC} alt="USDC" />
                         <h6 className='mb-0 ms-2 font-semibold'>USDC</h6>
                     </Button>
                     <Button className='p-0  btn-currency-sm text-white mb-3 me-4' variant='link'>
                         <img src={USDC} alt="USDC" />
                         <h6 className='mb-0 ms-2 font-semibold'>USDT</h6>
                     </Button> */}
                 </div>
                    </div>

                    <hr className='mb-4' />

                    <div className="currency-list py-1">
                      <Button variant='link' onClick={()=>choose2(sid,selecttoken,sunitname1)} className='btn-currency mb-2 w-100 justify-content-start align-items-center btn-currency-md p-0'>
                        {/* <img src={ selecttoken }  /> */}
                        {/* <div className="ms-3 flex-grow-1 d-flex align-items-center text-start">
                          <div className='flex-grow-1'>
                            <h5 className='mb-0 font-semibold text-white'>fsdfds</h5>
                            <h7 className='mb-0 sub-heading text-sm mb-0'>ccdscds</h7>
                          </div>
                          <div className='text-end'>
                            <h7 className='mb-0 sub-heading text-sm mb-0'>Balance <br />Amount</h7>
                          </div>
                        </div> */}
                    </Button>
                      {smore1 ?
                       (<>
                        <Button variant='link' onClick={()=>choose2(sid,selecttoken,sunitname1)} className='btn-currency mb-2 w-100 justify-content-start align-items-center btn-currency-md p-1'>
                            <img src={ selecttoken }  />
                            <div className="ms-3 flex-grow-1 d-flex align-items-center text-start">
                          <div className='flex-grow-1'>
                            <h5 className='mb-0 font-semibold text-white'>{sunitname1}</h5>
                            <h7 className='mb-0 sub-heading text-sm mb-0'>{sid}</h7>
                          </div>
                          <div className='text-end'>
                            <h7 className='mb-0 sub-heading text-sm mb-0'>Balance <br />{ assetBalance ? parseFloat(assetBalance/1000000).toFixed(3) : '0.00'}</h7>
                          </div>
                        </div>
                           
                        </Button>
                       </>):smore ? (<>
                       {assetdetails.map((r,i)=>{
                         return(<>
                          <Button variant='link'  onClick={()=>choose2(r.assetindex,selecttoken,r.assetunitname)} className='btn-currency mb-2 w-100 justify-content-start align-items-center btn-currency-md p-1'>
                            <img src={selecttoken}  />
                            <div className="ms-3 flex-grow-1 d-flex align-items-center text-start">
                          <div className='flex-grow-1'>
                            <h5 className='mb-0 font-semibold text-white'>{r.assetunitname}</h5>
                            <h7 className='mb-0 sub-heading text-sm mb-0'>{r.assetindex}</h7>
                          </div>
                          <div className='text-end'>
                            {/* <h7 className='mb-0 sub-heading text-sm mb-0'>Balance <br />{ assetBalance ? parseFloat(assetBalance/1000000).toFixed(3) : '0.00'}</h7> */}
                          </div>
                        </div>
                           
                        </Button>
                         </>)
                       })}
                       </>):(<>{simage.map((r,i)=>{
                         return(<>
                          <Button variant='link'  onClick={()=>choose2(r.index,r.image,r.name)} className='btn-currency mb-2 w-100 justify-content-start align-items-center btn-currency-md p-1'>
                            <img src={r.image}  />
                            <div className="ms-3 flex-grow-1 d-flex align-items-center text-start">
                          <div className='flex-grow-1'>
                            <h5 className='mb-0 font-semibold text-white'>{r.name}</h5>
                            <h7 className='mb-0 sub-heading text-sm mb-0'>{r.index}</h7>
                          </div>
                          <div className='text-end'>
                            <h7 className='mb-0 sub-heading text-sm mb-0'>Balance <br />{parseFloat(r.bal/1000000).toFixed(3)}</h7>
                          </div>
                        </div>
                            
                        </Button>
                        </>)})}
                       </>)}
                       
                      
                    </div>
                </Modal.Body>
                </Modal>
            <Modal show={showMode} className="modal-dashboard" centered onHide={handleCloseMode}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Expert mode turns off the confirm transaction prompt and allows high slippage trades that often result in bad rates and lost funds.</p>
                    <p>ONLY USE THIS MODE IF YOU KNOW WHAT YOU ARE DOING.</p>
                    <Button variant='danger' onClick={btnhandleCloseMode} className='w-100'>Turn On Expert Mode</Button>
                </Modal.Body>
            </Modal>
        </Layout>
    );
};

export default Stablecoin;