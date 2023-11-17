import React, { useEffect, useState } from 'react';
import { Button, Card, Form, InputGroup, Col, Container, Dropdown, Modal, OverlayTrigger,Accordion, Row, Tab, Tabs, Tooltip, Alert,Badge } from 'react-bootstrap';
import Layout from './LayoutT';
import ButtonLoad from 'react-bootstrap-button-loader';
import USDC from '../../assets/images/usdc.jpg';
import { Link } from 'react-router-dom';
import axios from 'axios';
import algosdk, { Algod } from "algosdk";
import node from './nodeapi.json';
import { AppId,escrowProgram,escrowProgram2,elemToken } from '../swapConfig';

import usdclogo from '../../assets/images/usdc-logo.png';

import einrlogo from '../../assets/images/EINR-original.png';
import taulogo from '../../assets/images/tau-original.png';
import elemlogo from '../../assets/images/elem-original.png';
import algologo from '../../assets/images/Algo.png';
import MyAlgoConnect from '@randlabs/myalgo-connect';
import selecttoken from '../../assets/images/selecttoken.png';

import WalletConnect from "@walletconnect/client";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import { formatJsonRpcRequest } from "@json-rpc-tools/utils";
import { dualwalletconnect } from './walletconnection';


import {amount_out_with_slippage,minAlgoBalance,mintotrx,updatealgobalance,checkotp,swapinput,walletBalance,amount1_input,convert1,convert2,asset1_price,assert3Reserve,assert1Reserve,assert2Reserve,readingLocalstate,escrowdatacompile,checkassetin,escrowdata,asset2_price, find_balance_escrow,find_balance,priceOfCoin1,priceOfCoin2} from '../formula';
import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';
import {postdata,getpostdata,getpostdatafilter,getmultiplefilter,deletedata,getpostdataall} from "../../firedbstore";


const algodClient = new algosdk.Algodv2('',node['algodclient'], '');
const myAlgoWallet = new MyAlgoConnect({ disableLedgerNano: false });
const indexerClient = new algosdk.Indexer('', node['indexerclient'], '');
const bridge = "https://bridge.walletconnect.org";


let appID_global = AppId;
let data = escrowProgram;

const Stablecoin = () => {
  useEffect(() => {
    document.title = "ELEMENT | LP Pool"
}, [])
    const [show, setShow] = useState(false);
    const [showAlert, setShowAlert] = useState(true);
    const [val, setVal] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [key, setKey] = useState();
    const[diplay,setdisplay] = useState([]);
    const[contain1,setcontain1] = useState(true);
    const[contain2,setcontain2] = useState(true);
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
    const[liq1,setliq1] = useState("");
    const[liq2,setliq2] = useState("");
    const[LpAssetOptin,setLpAssetOptin] = useState("");
    const[minimumbalance,setminimumBalance] = useState("")
    const[LpassetBlance,setLpassetBlance] = useState("");
    const[liquidityamount,setliquidityamount]=useState("");
    const[amount1Out,setamount1Out]= useState([]);
    const[amount2Out,setamount2Out]= useState([]);
    const[minbalance,setminbalance]= useState("");
    const [enoughbalance, setenoughbalance] = useState(false);
    const[swapdetail,setswapdetail]= useState(false);
    const[sufficient,setsufficient]= useState(false);
    const[nolPair,setNoLPair]= useState(false);
    const[balanceid1,setbamalanceid1]= useState("");
    const[appOpted,setOpted] = useState(false);
    const[showdetails,setshowdetails] = useState(false);
    const[as3Id,setas3Id] = useState("");
    const[rs1value,setrsvalue1] = useState("")
    const[rs2value,setrsvalue2] = useState("")
    const[rs3value,setrsvalue3] = useState("")
    
    const[decl1,setdeclaring1]=useState("");
    const[decl2,setdeclaring2] = useState("");
    const[sout1,setsout1] = useState("");
    const[sout2,setsout2] = useState("");
    const[fee,setfees] = useState(0.05);
    const[samount1,setsamount1] = useState("");
    const[samount2,setsamount2] = useState("");
    const[assetBalance,setassetBalance] = useState("");

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

    const handleShowLoad = () => setLoader(true);
    const handleHideLoad = () => setLoader(false);
    const[simage,setsimage] = useState([]);
    const [input1, setValue] = React.useState('0.0');
    const [input2, setValue1] = React.useState('0.0');
    const[notsufficientcreate,setnotsufficientcreate] = useState(false);
    
    const [showOptInButton, setShowOptInButton] = React.useState(false);
    const [showMintButton, setShowMintButton] = React.useState(false);
    const[tescrowaddress,setescrowaddress] = useState("");
    const[mintotranser,setmintotransfer] = useState("");




    useEffect(()=>{callgetvalues()},[diplay])
    // console.log("diplay",diplay)
    const callgetvalues = async()=>{
        // console.log("length",diplay)
        if(diplay.length > 0){

        }
        else{
            getvaluesfromnode()
        }
        let [s2,opt1] = await walletBalance(elemToken);
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

    const getvaluesfromnode = async()=>{
        let id =[];
        if(id.length === 0){
            let ln = await axios.get(`${node['indexerclient']}/v2/transactions?address=${localStorage.getItem("walletAddress")}&application-id=${appID_global}&tx-type=appl`);
           
            let s =  ln.data.transactions;
            let k =[];
            
            s.map(async(r,i)=>{
                // console.log("lnvalue",r['application-transaction']['application-args']['0'])
                let arrayvalue=[]
                if(r['application-transaction']['application-args']['0'] === "bWludA=="){
                    
                    let name1 = await axios.get(`${node['indexerclient']}/v2/assets?asset-id=${r['application-transaction']['foreign-assets'][0]}`);
                    let name2,n2,n3;
                    if(r['application-transaction']['foreign-assets'].length > 2){
                         name2 = await axios.get(`${node['indexerclient']}/v2/assets?asset-id=${r['application-transaction']['foreign-assets'][1]}`);
                         n2 = name2.data.assets['0']['params']['unit-name'];
                         n3 = name2.data['assets']['0']['index']
                        }
                    else{
                        n2 = "ALGO";
                        n3 = 0;
                    }
                    let assetIndex = await axios.get(`${node['indexerclient']}/v2/assets?creator=${r['sender']}`);
                    let ln = await axios.get(`${node['algodclient']}/v2/accounts/${localStorage.getItem("walletAddress")}/assets/${assetIndex.data['assets']['0']['index']}`);
                    // console.log("ln",ln,ln.data['asset-holding'].amount)
                   let  kvalue = ln.data['asset-holding'].amount;
                    // console.log("cval",kvalue)
                    // console.log("name1",name1.data.assets['0']['params']['unit-name'])
                    // console.log("name2",name2.data.assets['0']['params']['unit-name']);
                    let n1 = name1.data.assets['0']['params']['unit-name'];
                   
                    let cmb = n1 +"/"+ n2 ;
                    k.push(cmb)
                     arrayvalue ={
                        "assetname1":n1,
                        "assetname2":n2,
                        "assetblance":kvalue,
                        "escrowaddress":r['sender'],
                        "asset1":name1.data['assets']['0']['index'],
                        "asset2":n3
                    }
                   
                }
                if(arrayvalue.assetname1){
                    id.push(arrayvalue)
                    // setdisplay(id)
                    function getUnique(arr, index) {

                      const unique = arr
                           .map(e => e[index])
                    
                           // store the keys of the unique objects
                           .map((e, i, final) => final.indexOf(e) === i && i)
                    
                           // eliminate the dead keys & store unique objects
                          .filter(e => arr[e]).map(e => arr[e]);      
                      setdisplay(unique)
                       return unique;
                    }
                    
                  getUnique(id,'escrowaddress')
                    
                }
                
                let l = Array.from(new Set(id));
               
               
                
            })


           
            // console.log("kvalue",k,id,id.length)
            // if(id.length>0){
            //     setdisplay(id)
            // }
            
        }
        
        

        
        //  console.log("lnvalue",s)
        
    }

    useEffect(()=>{checkbalan()},[])
    const checkbalan = async()=>{
 
        setOpted(await checkotp(appID_global));
        let [s1,opt] = await walletBalance(0);
        setbamalanceid1(s1);
        // console.log("s1",s1)
        let k = await mintotrx();
        // console.log("kval",k)
        setmintotransfer(k);
        let mn = await minAlgoBalance();
        // console.log("minimum",mn)
        setminbalance(mn);
        let [s2,opt1] = await walletBalance(elemToken);
        setAssetOptin3(opt1)


       
      }
     
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
  const regainstate = async(id1,id2)=>{
    setsamount1("");
    setsamount2("");
    checkbalan();
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
      callval(id1,id2);
  } 
    const call =async(v)=>{
  
      //console.log("working",typeof parseInt(value))
      if(!isNaN(v)){
          let ln = await axios.get(`${node['algodclient']}/v2/assets/${v}`);

          // console.log("unitanem",unitname,name,id,ln.data['params']['unit-name'])
          let asnamw =(ln.data['params']['unit-name']).toUpperCase();
        //console.log("upercase",asnamw)
          setsName1(ln.data['params']['name'])
          setSid1(v)
          setSunitname1(ln.data['params']['unit-name'])
          setSlogo(checklogo(asnamw,v))
          let [b,s] = await walletBalance(v);
          // console.log("bvalue",b)
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
          // console.log("bvalue",b)
          setassetBalance(b);
          sets(true)
          sets1(false)
          // setseem(assetInfo.assets)
      }

    
      
     
  }
    const manage =async(escr,id1,id2,name1,name2)=>{
      //console.log("ass",id1,id2)
        callval(id1,id2)
        setTokName1(name1)
        setTokName2(name2)
        setTokId1(id1);
        setTokId2(id2);
        let [value,optin] = await walletBalance(parseInt(id1));
        setTokBalance1(value)
        setAssetOptin1(optin)
        let [value1,optin1] = await walletBalance(parseInt(id2));
        setTokBalance2(value1)
        setAssetOptin2(optin1)
        setTokLogo1(checklogo(name1,id1))
        setTokLogo2(checklogo(name2,id2))
        
        setcontain1(false)
       
    }
    const callval=async(id1,id2)=>{
        if((id1>=0) && (id2>=0)){
        let [rs1,rs2,liq,assetid3,rs3] = await swapinput(appID_global,id1,id2);
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
        let asset_out_amount_withoutfees = (1000000 * 997 * rs2 ) / ((rs1 * 1000) +(1000000 * 997));
        let calculated_amount_in = ((1000000 * 1000 * rs1) / ((rs2 - 1000000) * 997)) + 1;
        if(id1 > id2){
          a1 = out1;
          a2 = out2;
          setdeclaring1(asset_out_amount_withoutfees);
         setdeclaring2(calculated_amount_in);
        }
        else{
          a1 = out2;
          a2 = out1;
          setdeclaring1(calculated_amount_in);
        setdeclaring2(asset_out_amount_withoutfees);
         
        }
        let [s3,opt2] = await walletBalance(assetid3);
       setLpAssetOptin(opt2)
       setLpassetBlance(s3)
      //console.log("values",out1,out2)
           }
      
    
        
  
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
  handleShowLoad();
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
    await waitForConfirmation(algodClient, transid,"Asset Opt-In is completed successfully");
    await updatealgobalance()
    // const signedTx1 = await myAlgoWallet.signTransaction(optinTranscation.toByte());
    // const response = await algodClient.sendRawTransaction(signedTx1.blob).do();
    // await waitForConfirmation(algodClient, response.txId,"Asset Opt-In");
    setLpAssetOptin(false)
   }
   catch(err){
     toast.error(`err`)
     handleHideLoad()
   }
}    
const mint21call = async (appid,asn1,asn2,v1,v2) => {
  
    handleShowLoad();
    let s = await zeroinput(liq1,liq2);
    if(s === 0){
      let index = parseInt(appid);
    //console.log("appId inside donate", index);
      //console.log("input1",a1)
      // console.log("input2",ls)
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
        //   total = (liquidity_asset_amount)
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
                handleHideLoad();
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
                  toast.error(`No Pair Found for these assets,don't try to addd liquidity these asset`);
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
    //  console.log("v",removeLi) 
  
     let asset1_amount = (liquidity_asset_in * rs1value) / rs3value ;
    //  console.log(asset1_amount)
     let asset2_amount = (liquidity_asset_in * rs2value) / rs3value ;
     let asset1_amount_out = asset1_amount - (asset1_amount * 0.5)
    
     let asset2_amount_out = asset2_amount - (asset2_amount * 0.5)
     
     if(tokId1 > tokId2){
        setamount1Out(asset1_amount_out)
        setamount2Out(asset2_amount_out)
     }
     else{
        setamount2Out(asset1_amount_out)
        setamount1Out(asset2_amount_out)  
     }
  
   //console.log("asset1_amount_out",asset1_amount_out)
     
   //console.log("asset2_amount_out",asset2_amount_out)
  
  }
  const checkremoveLiquidity = async()=>{
   
    handleShowLoad();
    let s = await zeroinput(amount1Out,amount2Out);
    if(s === 0){
      if(balanceid1 > (mintotranser + 8000)){
        await removeliquidity()
      }
      else{        
        handleHideLoad()
      //console.log("min",balanceid1,minbalance)
        toast.error("Not having sufficient Algo")
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
    toast.error(`Please Refresh this page and Redeem your excess amount ${tokName1} & ${tokName2} ,then try to Remove liquidity`);
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
    toast.error(`No Pair Found for these assets,don't try to Swap these asset`);
  }
  else if(present6 > 1){
    toast.error(`Allow the pop up window and try again`);
  }
  else{
    toast.error(`Try again by giving small amount`);
  }


      
    //console.error(err);
    }
  };
  const choose1 =async(id,logo,name)=>{
    setsamount1(0)
    setsamount2(0)
    setliq1(0)
    setliq2(0)
    setTokId1(id);
    setTokName1(name)
    setTokLogo1(logo)
    let [value,optin] = await walletBalance(parseInt(id));
    setTokBalance1(value)
    setAssetOptin1(optin)
    callval(id,tokId2)
    handleClose()
    
}

const choose2 =async(id,logo,name)=>{
    setsamount1(0)
    setsamount2(0)
    setliq1(0)
    setliq2(0)
    setTokId2(id);
    setTokName2(name)
    setTokLogo2(logo)
    let [value,optin] = await walletBalance(parseInt(id));
    setTokBalance2(value);
    setAssetOptin2(optin)
    callval(tokId1,id)
    handleClose1()
    
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
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
        handleHideLoad()
        await sleep(5000);
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
  const appOptIn = async () =>
  {
    handleShowLoad();
//console.log("minb",minbalance)
  if(balanceid1 >= mintotranser + 557000){
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




  let transid=await dualwalletconnect(optinTranscation);
  await waitForConfirmation(algodClient, transid,"App Opt-In is completed successfully");
  await updatealgobalance()
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
 



  //console.error(err);
  }
  }
  else{
    handleHideLoad()
  toast.error("You are not having enough Algo to do Transaction");
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
   const goback=()=>{
    setcontain1(true);
    setcontain2(true)
   }

   const setVal1 =(k) =>{
    setValue(k );
        let tb,tb1;
   //console.log("notsufficient",tokName1)
    if(tokName1 === "ALGO"){
      tb = (balanceid1 - 967000) - (k *1000000);
      if( minbalance < tb  || Math.sign(tb) === -1 ){
    //console.log("notsufficient")
      setnotsufficientcreate(true);
    }
    else{
      setnotsufficientcreate(false);
    }
    }
    else{
      tb1 = tokBalance1;
      if(  tb1 < (k*1000000)  ){
    //console.log("notsufficient")
      setnotsufficientcreate(true);
    }
    else{
      setnotsufficientcreate(false);
    }
      // alert("enet") 
    }
    
    
    //console.log("price1",pr1*k)
   }
   const setVal2 =(k) =>{
    setValue1(k);
     
    let tb,tb1;
   //console.log("notsufficient",tokName1)
    if(tokName2 === "ALGO"){
      tb = (balanceid1 - 967000) - (k *1000000);
      if( minbalance < tb || Math.sign(tb) === -1 ){
    //console.log("notsufficient")
      setnotsufficientcreate(true);
    }
    else{
      setnotsufficientcreate(false);
    }
    }
    else{
      tb1 = tokBalance2;
      if( tb1 < (k*1000000)  ){
    //console.log("notsufficient")
      setnotsufficientcreate(true);
    }
    else{
      setnotsufficientcreate(false);
    }
      // alert("enet") 
    }
   
    //console.log("price1",pr2*k)
   }
   const callingmax11 =async()=>{
    if(tokName1 === "ALGO"){
      let mn = minbalance - (1069000);
      if(Math.sign(mn) === -1){
        setValue(0)
      }
      else{
        setValue(mn/1000000)
      }
       
    }
    else{
       setValue(tokBalance1/1000000)
    }
   
  }
  const callingmax12 =async()=>{
    if(tokName2 === "ALGO"){
      let mn = minbalance - (1069000);
      if(Math.sign(mn)=== -1){
        setValue1(0)
      }
      else{
        setValue1(mn/1000000)
      }
      
    }
    else{
      setValue1(tokBalance2/1000000)
    }
    
  }
  const bootstrap = async (appid,asid1,asid2) => {
    handleShowLoad();
    // console.log("value1",parseInt(1234.56),parseFloat(1234.56).toFixed(0),Math.floor(1234.56))
    let tokenid1 ;
    if(asid1 === ""|| asid1 === undefined ||asid1 ===null){
      setTokId1(0);
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
//console.log("tokenid1",tokenid1,tokenid2)
      let index = parseInt(appID_global);
     

      // setvs1(ci1);
      // setvs2(ci2);
      // console.log("cali1",cali1,cali2);
      setescrowaddress(results.hash);
      // localStorage.setItem("escrow",results.hash)
  
      let program = new Uint8Array(Buffer.from(results.result, "base64"));
  
      // let lsig = algosdk.makeLogicSig(program);
      let lsig = new algosdk.LogicSigAccount(program);
      // console.log("Escrow =", lsig.address());
      try 
  {
        if(balanceid1 > (mintotranser + 1069000) ){
      
        const params = await algodClient.getTransactionParams().do();
  
        let sender =  localStorage.getItem("walletAddress");;
        let recv_escrow = lsig.address();
        let amount ;
       
        
        if(parseInt(t2) == 0){
         {
            
          let accountasset1 = await algodClient.getAssetByID(t1).do();
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
    
        
          
          if(localStorage.getItem("walletName") === "myAlgoWallet"){
            const signedTx1 = await myAlgoWallet.signTransaction(txs[0].toByte());
            const signedTx2 = algosdk.signLogicSigTransaction(txs[1], lsig);
      
            const signedTx3 = algosdk.signLogicSigTransaction(txs[2], lsig);
            const signedTx4 = algosdk.signLogicSigTransaction(txs[3], lsig);
            const response = await algodClient
            .sendRawTransaction([
              signedTx1.blob,
              signedTx2.blob,
              signedTx3.blob,
              signedTx4.blob
            ])
            .do();
        //console.log("TxID", JSON.stringify(response, null, 1));
           await waitForConfirmation(algodClient, response.txId,"Confirmed  successfully");
           await updatealgobalance()
          //  await regainstate(tokId1,tokId2);
          }
          else if(localStorage.getItem("walletName") === "PeraWallet"){
            const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
            const txns = [txs[0],txs[1],txs[2],txs[3]]
            const txnsToSign = txns.map(txn => {
              const encodedTxn = Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString("base64");
            //console.log(encodedTxn);
              return {
                txn: encodedTxn,
            };
          });
            const signedTx3 = algosdk.signLogicSigTransaction(txs[1], lsig);
            const signedTx4 = algosdk.signLogicSigTransaction(txs[2], lsig);
            const signedTx5 = algosdk.signLogicSigTransaction(txs[3], lsig);
            const requestParams = [ txnsToSign ];
            const request = formatJsonRpcRequest("algo_signTxn", requestParams);
            const result = await connector.sendCustomRequest(request);
            const decodedResult = result.map(element => {
              return element ? new Uint8Array(Buffer.from(element, "base64")) : null;
            });
          //console.log(result);
            decodedResult[1] = signedTx3.blob;
            decodedResult[2] = signedTx4.blob;
            decodedResult[3] = signedTx5.blob;
           let response = await algodClient.sendRawTransaction(decodedResult).do()
          
          await waitForConfirmation(algodClient, response.txId,"Confirmed  successfully");
          await updatealgobalance()
          // await regainstate(tokId1,tokId2);
  }
    
          
          //toast.info("Transaction in Progress"); 
          
        // toast.success(`Transaction Success ${response.txId}`);
       
        setShowOptInButton(true);
        
          }
          
        }
        else{
         {
            
          let accountasset1 = await algodClient.getAssetByID(t1).do();
          let accountasset2 = await algodClient.getAssetByID(t2).do();
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
  
        if(localStorage.getItem("walletName") === "myAlgoWallet"){
          const signedTx1 = await myAlgoWallet.signTransaction(txs[0].toByte());
          const signedTx2 = algosdk.signLogicSigTransaction(txs[1], lsig);
    
          const signedTx3 = algosdk.signLogicSigTransaction(txs[2], lsig);
          const signedTx4 = algosdk.signLogicSigTransaction(txs[3], lsig);
          const signedTx5 = algosdk.signLogicSigTransaction(txs[4], lsig);
    
          
          //toast.info("Transaction in Progress");
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
          await waitForConfirmation(algodClient, response.txId,"Confirm successfully");
          await updatealgobalance()
          // await regainstate(tokId1,tokId2);
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
          const signedTx4 = algosdk.signLogicSigTransaction(txs[2], lsig);
          const signedTx5 = algosdk.signLogicSigTransaction(txs[3], lsig);

          const signedTx6 = algosdk.signLogicSigTransaction(txs[4], lsig);
          const requestParams = [ txnsToSign ];
          const request = formatJsonRpcRequest("algo_signTxn", requestParams);
          const result = await connector.sendCustomRequest(request);
          const decodedResult = result.map(element => {
            return element ? new Uint8Array(Buffer.from(element, "base64")) : null;
          });
        //console.log(result);
          decodedResult[1] = signedTx3.blob;
          decodedResult[2] = signedTx4.blob;
          decodedResult[3] = signedTx5.blob;
          decodedResult[4] = signedTx6.blob;
         let response = await algodClient.sendRawTransaction(decodedResult).do()
        
        
        await waitForConfirmation(algodClient, response.txId,"Confirm  successfully");
        await updatealgobalance()
        // await regainstate(tokId1,tokId2);
}
        // toast.success(`Transaction Success ${response.txId}`);
        setShowOptInButton(true);
        
          }
          
        }
        
        
       
        }
    else{
    // setalrt(true)
    handleHideLoad()
    // setalrtclose(false)
    toast.error("You are not having enough Algo Balance to do Create Pair") 
    }
      }
  catch (err)
  {
    handleHideLoad();
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
          toast.error(`You dont have enough Assets in your wallet`);
        }
        else if(present2 > 1){
          toast.error(`You dont have enough Assets in your wallet`);
        }
        else if(present3 > 1){
          toast.error(`You dont have enough Assets in your wallet`);
        }
        else if(present4 > 1){
          toast.error(`This Pair of Assets is Already Created,So Please try to Add liquidity `);
        }
        else if(present5 > 1){
          toast.error(`No Pair Found for these assets,don't try to Swap these asset`);
        }
        else if(present6 > 1){
          toast.error(`Allow the pop up window and try again`);
        }
        else
    {
          toast.error(`err`);
        }
     }
    };
    const optIn =async (appid) => {
handleShowLoad();
      // const algodClient = new algosdk.Algodv2('', 'https://api.testnet.algoexplorer.io', '');
      const params = await algodClient.getTransactionParams().do();
      // let escrowaddress = localStorage.getItem("escrow");
      // console.log("Hash = " + AssetId1,AssetId2);
      let results = await escrowdatacompile(appID_global,tokId1,tokId2);
      // console.log("result",results)
      // let accountInfoResponse = await algodClient.accountInformation(results.hash).do();
      let compiled = await readingLocalstate(5,results.hash)
      // let replacedData = data.replaceAll("Token1",tokenid1).replaceAll("Token2",tokenid2).replaceAll("appId",appID_global);
      // let results = await algodClient.compile(replacedData).do();
  
    //console.log("Hash =info " +  await compiled['created-assets'][0]['index']);
      // console.log("Result = " + results.result);
      let as3id = await compiled['created-assets'][0]['index'];
      let assetId3 = as3id;
      
      localStorage.setItem("newasset",assetId3);
      // setassetID3(assetId3);
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

  
  let transid=await dualwalletconnect(optinTranscation);
  await waitForConfirmation(algodClient, transid,"Asset Opt-In is completed successfully");
  await updatealgobalance()
//     const signedTx1 = await myAlgoWallet.signTransaction(optinTranscation.toByte());
//     //toast.info("Transaction in Progress");

// const response = await algodClient.sendRawTransaction(signedTx1.blob).do();
// //console.log("TxID", JSON.stringify(response, null, 1));
// await waitForConfirmation(algodClient, response.txId,"Asset Opt-In");
// toast.success(`Transaction Success ${response.txId}`);
// //toast.info("Create Liquidity Done Sucessfully");
setShowMintButton(true);
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
    ////console.log("err",ev)
    if(present > 1){
      toast.error(`Your Algo balance is low. Please get more Algos from dispenser`);
    }
    else if(present1 > 1){
      toast.error(`You dont have enough Assets in your wallet`);
    }
    else if(present2 > 1){
      toast.error(`You dont have enough Assets in your wallet`);
    }
    else if(present3 > 1){
      toast.error(`You dont have enough Assets in your wallet`);
    }
    else if(present4 > 1){
      toast.error(`This Pair of Assets is Already Created,So Please try to Add liquidity `);
    }
    else if(present5 > 1){
      toast.error(`No Pair Found for these assets,don't try to Swap these asset`);
    }
    else if(present6 > 1){
      toast.error(`Allow the pop up window and try again`);
    }
    else{
      toast.error(`err`);
    }


        
      //console.error(err);
      }

   
}
const mint = async (appid,a1,a2,i1,i2) => {
  handleShowLoad();
  let s = await zeroinput(i1,i2);
  if(s === 0){
  //console.log("a1",a1)
    let tokenid1;
    if(a1 === "" || a1 === undefined|| a1 === null){
       tokenid1 = 0;
    }
    else{
       tokenid1 = a1;
    }
    let tokenid2 = a2;
    let t1,t2,l1,l2;
    let asetName1,asetName2;
    if(parseInt(tokenid1) > parseInt(tokenid2) ){
     asetName1 = tokName1;
     asetName2 = tokName2;
      t1 = tokenid1;
      t2 = tokenid2;
      l1 = i1;
      l2 = i2;
     
    }
    else{
      asetName2 = tokName1;
     asetName1 = tokName2;
       t1 = tokenid2;
       t2 = tokenid1;
       l1 = i2;
       l2 = i1;
      
    }
    let index = parseInt(appid);
    // console.log("appId inside donate", index);
    // console.log("input1",input1)
    // console.log("input2",input2)
    // setAppId(appid);
   
    
    let results = await escrowdatacompile(appID_global,t1,t2);
    let compiled = await readingLocalstate(5,results.hash)
    // let replacedData = data.replaceAll("Token1",tokenid1).replaceAll("Token2",tokenid2).replaceAll("appId",appID_global);
    // let results = await algodClient.compile(replacedData).do();
  
    // console.log("Hash = " + results.hash);
    // console.log("Result = " + results.result);
    let as3id = await compiled['created-assets'][0]['index'];
        
    // let as3id = await asset3id(compiled);
    
    let assetId3 = as3id;
    // console.log(assetId3)
  
    
    let program = new Uint8Array(Buffer.from(results.result, "base64"));
  
    // let lsig = algosdk.makeLogicSig(program);
    let lsig = new algosdk.LogicSigAccount(program);
  
  
  
    let total;
    //console.log("s1",l1,l2)
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
  
    // if(parseInt(t1) === 0){
    //   asetName1  = "ALGO"
    // }
    // else{
    //   asetName1 = await assetName(t1);
    // }
    // if(parseInt(t2) === 0){
    //   asetName2  = "ALGO"
    // }
    // else{
    //   asetName2 = await assetName(t2);
    // }
    // let asset3Name = await assetName(assetId3);
  
    
  //console.log("values")
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
              "AssetId1": t1,    
              "AssetId2": t2,
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
                //console.log("total",total, parseInt(total),parseFloat(total).toFixed(0))
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
                   
                await postdata(t1,t2,assetId3,asetName1,asetName2,results.hash,(l1+l2),(l1+l2+total),amount,localStorage.getItem("walletAddress"))
    
                  await waitForConfirmation(algodClient, response.txId,"Create Liquidity completed successfully");
                  await updatealgobalance();
                  await regainstate(tokId1,tokId2);
                  setValue("");
                  setValue1("");
                  
                
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
                  // const signedTx4 = algosdk.signLogicSigTransaction(txs[3], lsig);
                  const signedTx5 = algosdk.signLogicSigTransaction(txs[4], lsig);
                  const requestParams = [ txnsToSign ];
                  const request = formatJsonRpcRequest("algo_signTxn", requestParams);
                  const result = await connector.sendCustomRequest(request);
                  const decodedResult = result.map(element => {
                    return element ? new Uint8Array(Buffer.from(element, "base64")) : null;
                  });
                  //console.log(result);
                  decodedResult[1] = signedTx3.blob;
                  // decodedResult[3] = signedTx4.blob;
                  decodedResult[4] = signedTx5.blob;
                 let response = await algodClient.sendRawTransaction(decodedResult).do()
                
                 await postdata(t1,t2,assetId3,asetName1,asetName2,results.hash,(l1+l2),(l1+l2+total),amount,localStorage.getItem("walletAddress"))
  
                await waitForConfirmation(algodClient, response.txId,"Create Liquidity completed successfully");
                await updatealgobalance();
                await regainstate(tokId1,tokId2);
                setValue("");
                  setValue1("");
        }
                // await createpair(recv_escrow,asetName1,asetName2,asset3Name,tokenid1,tokenid2,assetId3)
                // await createtpairhistory(recv_escrow,(vs1+vs2),(vs1+vs2+total),amount,asetName1,asetName2,asset3Name,tokenid1,tokenid2,assetId3);
               
                // handlePair();
                // await sleep(8000);
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
              //console.log("total",total, parseInt(total),parseFloat(total).toFixed(0))
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
                  
              await postdata(t1,t2,assetId3,asetName1,asetName2,results.hash,(l1+l2),(l1+l2+total),amount,localStorage.getItem("walletAddress"))
    
                await waitForConfirmation(algodClient, response.txId,"Create Liquidity completed successfully");
                await updatealgobalance();
                await regainstate(tokId1,tokId2);
                setValue("");
                  setValue1("");
               
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
                // const signedTx4 = algosdk.signLogicSigTransaction(txs[3], lsig);
                const signedTx5 = algosdk.signLogicSigTransaction(txs[4], lsig);
                const requestParams = [ txnsToSign ];
                const request = formatJsonRpcRequest("algo_signTxn", requestParams);
                const result = await connector.sendCustomRequest(request);
                const decodedResult = result.map(element => {
                  return element ? new Uint8Array(Buffer.from(element, "base64")) : null;
                });
                //console.log(result);
                decodedResult[1] = signedTx3.blob;
                // decodedResult[3] = signedTx4.blob;
                decodedResult[4] = signedTx5.blob;
               let response = await algodClient.sendRawTransaction(decodedResult).do()
               await postdata(t1,t2,assetId3,asetName1,asetName2,results.hash,(l1+l2),(l1+l2+total),amount,localStorage.getItem("walletAddress"))
  
              await waitForConfirmation(algodClient, response.txId,"Create Liquidity completed successfully");
              await updatealgobalance();
              await regainstate(tokId1,tokId2);
              setValue("");
                  setValue1("");
      }
        
             
                // handlePair();
              // await postusertx(localStorage.getItem("walletAddress"),response.txId,recv_escrow,"Create Liquidity",0,total,tokenid1,tokenid2,amount);
              // await createpair(recv_escrow,asetName1,asetName2,asset3Name,tokenid1,tokenid2,assetId3);
              // await createtpairhistory(recv_escrow,(vs1+vs2),(vs1+vs2+total),amount,asetName1,asetName2,asset3Name,tokenid1,tokenid2,assetId3);
              // await sleep(8000);
              // window.location.reload();
              // setTxId(response.txId);
            }
            
           
            setShow(true);
            // console.log("userjson",userjsonkey)
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
            ////console.log("err",ev)
            if(present > 1){
              toast.error(`Your Algo balance is low. Please get more Algos from dispenser`);
            }
            else if(present1 > 1){
              toast.error(`You dont have enough Assets in your wallet`);
            }
            else if(present2 > 1){
              toast.error(`You dont have enough Assets in your wallet`);
            }
            else if(present3 > 1){
              toast.error(`You dont have enough Assets in your wallet`);
            }
            else if(present4 > 1){
              toast.error(`This Pair of Assets is Already Created,So Please try to Add liquidity `);
            }
            else if(present5 > 1){
              toast.error(`No Pair Found for these assets,don't try to Swap these asset`);
            }
            else if(present6 > 1){
              toast.error(`Allow the pop up window and try again`);
            }
            else{
              toast.error(`err`);
            }
      
      
                
              //console.error(err);
              }                                    
        }
    
  }
  
};
   const createliq = async()=>{
    // await getpostdataall();
    // await postdata(62281549,0,78262682,"xUSD","ALGO","I3DXKOPJHD2YSZHXXTTIFZ2BRFAM7RSAORR5S4WTRVGCVFXST5SUQL2Q2E",268023402,328514541,201000,"2ZFJJ47STV5TT3XUKKDCACDHVCSG7NUHR23X5G5NQKB7FTPSLYNM35V37Q")
    // await getpostdata("PJS5453L2YTTQMBW4UA7SIEZT4KEOYY4MN3M7NVRGJ5XY23NQRV35YCDHA")
    // await deletedata("-N-8nZGXg1ylmXeDgupj","2ZFJJ47STV5TT3XUKKDCACDHVCSG7NUHR23X5G5NQKB7FTPSLYNM35V37Q")
  //  await getpostdatafilter(78044331,0,8154556098,11548062392,8370719)
    // await getmultiplefilter(78044331,0,8154556098,11548062392,8370719,"4BAD7VLKCWF5OXR4JR5Y4KTPNM74X3OWGZJUSMEP3VGAWW5TLWN5MY")
  
   
  }

    return (
        <Layout>
               <><ToastContainer position='bottom-right' draggable = {false} transition={Zoom} autoClose={4000} closeOnClick = {false}/></>

            {contain1 && contain2 ?
             (<>
               <Container>
                <Row className='justify-content-center'>
                    <Col md={10} lg={7} className="mb-4">
                        <Link className='mb-3 text-white d-flex align-items-center btn-link' to="/swap">
                            <svg xmlns="http://www.w3.org/2000/svg" className='me-2' width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                            Go Back
                        </Link>

                        {/* <Link to={{
                  pathname: 'swap'}}   onClick={()=>localStorage.setItem("liqvalue","liquidity")}>
                 
                            <svg xmlns="http://www.w3.org/2000/svg" className='me-2' width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                            Go Back2
                        </Link> */}

                        <h4>My Liquidity Positions</h4>

                      

                        { 
                            showAlert? 
                            <Alert variant="grad" className='mb-4' onClose={() => setShowAlert(false)} dismissible>
                                <h4 className='mb-3'>Liquidity Provider Rewards</h4>
                                <p>Liquidity providers earn a 0.15% fee on all trades proportional to their share of the pool. Fees are added to the pool, accrue in real time and can be claimed by withdrawing your liquidity.</p>
                            </Alert>
                            : null
                        }

 <Accordion className='accordion-list'>
 {localStorage.getItem("walletAddress") ?
                        (<>
                         {diplay.length > 0 ? 
                            (<>{diplay.map((r,i)=>{
                              
                                return(<>{
                                  (r.assetblance/1000000) > 0.001 ? 

                                  (<>
                          <Accordion.Item className='mb-24'>
                            <Accordion.Header>
                              <div className="acc-title me-2 d-flex align-items-center">
                                {/* <img src={USDC} alt="logo" /> */}
                                <span className='ms-3'>{r.assetname1}/{r.assetname2}</span>
                              </div>

                              <div className="ms-sm-auto justify-content-between flex-grow-1 d-flex align-items-center">
                                <div>
                                  <h6 className='sub-heading text-xs mb-0'>
                                      Your pool share
                                  </h6>
                                  <h5 className='mb-0 d-flex align-items-center'>
                                  {parseFloat(r.assetblance/1000000).toFixed(3)}
                                      <OverlayTrigger
                                          key="left"
                                          placement="left"
                                          overlay={
                                              <Tooltip id={`tooltip-left`}>
                                                 Your LP asset balance
                                              </Tooltip>
                                          }
                                          >
                                              <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                          </OverlayTrigger>
                                  </h5>
                                </div>
                                <div className='ms-3'>
                                  <Button variant='primary' onClick={()=>manage(r.escrowaddress,r.asset1,r.asset2,r.assetname1,r.assetname2)}>Manage</Button>
                                </div>
                              </div>
                            </Accordion.Header>
                          </Accordion.Item>
                          </>):
                                  (<></>)
                                }
                               
                                </>)
                            })}
                          
                            </>):
                            (<></>)}
                        </>):
                        (<>
                        <Button className='btn btn-blue w-100' onClick={()=>conectWallet()}>
<svg width="20" height="20" className='me-2 ms-0' viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg"><path d="M21 18V19C21 20.1 20.1 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.89 3 5 3H19C20.1 3 21 3.9 21 5V6H12C10.89 6 10 6.9 10 8V16C10 17.1 10.89 18 12 18H21ZM12 16H22V8H12V16ZM16 13.5C15.17 13.5 14.5 12.83 14.5 12C14.5 11.17 15.17 10.5 16 10.5C16.83 10.5 17.5 11.17 17.5 12C17.5 12.83 16.83 13.5 16 13.5Z"></path></svg>
Connect wallet
</Button>
                        </>)}
                        </Accordion>
                        <Card className='card-dash p-3 d-block border-0 mb-4'>
                        {/* {localStorage.getItem("walletAddress") ?
                        (<>
                         {diplay.length > 0 ? 
                            (<>{diplay.map((r,i)=>{
                              console.log("balance",r.assetblance/1000000)
                                return(<>{
                                  (r.assetblance/1000000) > 0.0001 ? 

                                  (<>
                                   <Row>
                                     <Col xs={4}>
                                         {r.assetname1}/{r.assetname2}
                                            <br/>
                                     </Col>
                                     
                                     <Col xs={4}>
                                    <center>Your Pool Share</center>
                                     
                                         <center>{parseFloat(r.assetblance/1000000).toFixed(3)}</center>
                                         
                                     </Col>
                                     <Col xs={3}>
                                        <center>
                                        <Button  className='btn btn-blue w-100' onClick={()=>manage(r.escrowaddress,r.asset1,r.asset2,r.assetname1,r.assetname2)} >
                                             Manage
                                         </Button></center> 
                                         
                                     </Col>
                                 </Row>
                                 </>):
                                  (<></>)
                                }
                               
                                </>)
                            })}
                          
                            </>):
                            (<></>)}
                        </>):
                        (<>
                        <Button className='btn btn-blue w-100' onClick={()=>conectWallet()}>
<svg width="20" height="20" className='me-2 ms-0' viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg"><path d="M21 18V19C21 20.1 20.1 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.89 3 5 3H19C20.1 3 21 3.9 21 5V6H12C10.89 6 10 6.9 10 8V16C10 17.1 10.89 18 12 18H21ZM12 16H22V8H12V16ZM16 13.5C15.17 13.5 14.5 12.83 14.5 12C14.5 11.17 15.17 10.5 16 10.5C16.83 10.5 17.5 11.17 17.5 12C17.5 12.83 16.83 13.5 16 13.5Z"></path></svg>
Connect wallet
</Button>
                        </>)}
                       
                           
                           
<br/> */}
                            <Row>
                                <Col xs={6}>
                                    <Button className='btn btn-blue w-100' onClick={()=>setcontain1(false)}>
                                        Add Liquidity
                                    </Button>
                                </Col>
                                <Col xs={6}>
                                    <Button variant='outline-purple' onClick={()=>setcontain2(false)} className='btn w-100'>
                                        Create Pool
                                    </Button>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Container></>):
             (<>{
                 contain2 ?
                  (<>
                   <Container>
                <Row className='justify-content-center'>
                    <Col md={10} lg={7} className="mb-4">
                    <Link className='mb-3 text-white d-flex align-items-center btn-link' onClick={()=>goback()}>
                            <svg xmlns="http://www.w3.org/2000/svg" className='me-2' width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                            Go Back
                        </Link>

                        <Card className='card-dash d-block border-0 mb-4'>
                            
                           
                            <Tabs defaultActiveKey="liquidity" className='dashboard-tabs' id="tab-example-1">
                                
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
                                          
                                                        {tokLogo1 ? (<><img src={ tokLogo1 }  /></>):(<><img src={ selecttoken }  /></>)}

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
&nbsp;<Button variant="outline-purple" className='btn-xs-d' style={{height: '20px'}}  onClick={()=>callingmaxliq1()}>Max</Button></>):
									   (<> <span className='text-xs' style={{opacity: '0.5'}}>Balance <strong>{parseFloat(tokBalance1/1000000).toFixed(3)} {tokName1}</strong></span>
                                                           &nbsp;<Button variant="outline-purple" className='btn-xs-d' style={{height: '20px'}}  onClick={()=>callingmaxliq1()}>Max</Button>
</>)  }                                                  </div>
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
                                                        &nbsp;  <Button variant="outline-purple" className='btn-xs-d' style={{height: '20px'}}  onClick={()=>callingmaxliq2()}>Max</Button>
                                                        </>):
                                                        tokName2 ?  (<> <span className='text-xs' style={{opacity: '0.5'}}>Balance <strong>{parseFloat(tokBalance2/1000000).toFixed(3)} {tokName2}</strong></span>
                                                        &nbsp;  <Button variant="outline-purple" className='btn-xs-d' style={{height: '20px'}}  onClick={()=>callingmaxliq2()}>Max</Button>

                                                       </>)
                                                :(<></>)
                                                }
                                               
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
                                    </>):(<>
                                      <ButtonLoad  className='btn btn-blue w-100' >
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
                                                    <Col xs="auto" className='flex-grow-1 d-flex flex-sm-row flex-column flex-wrap justify-content-center align-items-center justify-content-sm-end'>
                                                        <div className="input-group-max input-group-max-img  my-sm-0 my-1 d-flex align-items-center px-3">
                                                            <span className='h3 mb-1'>{parseFloat(amount1Out/1000000).toFixed(2)}</span>
                                                            <span className='text-xs px-2'>{tokName1}</span>
                                                            
                                                            {tokLogo1 ? (<><img src={ tokLogo1 }  /></>):(<><img src={ selecttoken }  /></>)}

                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="16" height="16" class="ml-2 stroke-current" onClick={()=>handleShow()}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>

                                                        </div>
                                                        <div className="input-group-max ms-sm-3 input-group-max-img  my-sm-0 my-1 d-flex align-items-center px-3">
                                                            <span className='h3 mb-1'>{parseFloat(amount2Out/1000000).toFixed(2)}</span>
                                                           {tokName2 ?
                                                            (<>
                                                             <span className='text-xs px-2'>{tokName2}</span>
                                                          
                                                            {tokLogo2 ? (<><img src={ tokLogo2 }  /></>):(<><img src={ selecttoken }  /></>)}

                                                            </>):
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
                  </>):
                  (<>
                   <Container>
                <Row className='justify-content-center'>
                    <Col md={10} lg={7} className="mb-4">
                    <Link className='mb-3 text-white d-flex align-items-center btn-link' onClick={()=>goback()}>
                            <svg xmlns="http://www.w3.org/2000/svg" className='me-2' width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                            Go Back
                        </Link>

                        <Card className='card-dash d-block border-0 mb-4'>
                            
                           
                            <Tabs defaultActiveKey="liquidity" className='dashboard-tabs' id="tab-example-1">
                                
                            <Tab eventKey="liquidity" title="Liquidity">
                                    
                                    <Tabs
                                        id="controlled-tab-example"
                                        activeKey={key}
                                        className='dashboard-tabs'
                                        onSelect={(k) => setKey(k)}
                                    >
                                        <Tab eventKey="Create" title="create">
                                        <div className="mb-4">
                                        <div className="group-row">
                                            <Row>
                                                <Col sm={5} className="mb-sm-0 mb-3">
                                                    <Button variant='link' onClick={handleShow} className='btn-currency p-0'>
                                                    {tokLogo1 ? (<><img src={ tokLogo1 }  /></>):(<><img src={ selecttoken }  /></>)}
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
                                                        <input type="number" placeholder='0.00' className='form-control'  onChange={(e) => setVal1((e.target.value))} value={input1}  />
{tokName1 === "ALGO" ?(<> <span className='text-xs' style={{opacity: '0.5'}}>Balance <strong>{parseFloat(balanceid1/1000000).toFixed(3)} {tokName1}</strong></span>
&nbsp;<Button variant="outline-purple" className='btn-xs-d' style={{height: '20px'}}  onClick={()=>callingmax11()}>Max</Button></>):
									   (<> <span className='text-xs' style={{opacity: '0.5'}}>Balance <strong>{parseFloat(tokBalance1/1000000).toFixed(3)} {tokName1}</strong></span>
                                                           &nbsp;<Button variant="outline-purple" className='btn-xs-d' style={{height: '20px'}}  onClick={()=>callingmax11()}>Max</Button>
</>)  }                                                  </div>
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
                                                        <input type="number" placeholder='0.00' className='form-control' onChange={(e) => setVal2((e.target.value))} value={input2}  />
                                                       { tokName2 === "ALGO" ?
                                                        (<> <span className='text-xs' style={{opacity: '0.5'}}>Balance <strong>{parseFloat(balanceid1/1000000).toFixed(3)} {tokName2}</strong></span>
                                                        &nbsp;  <Button variant="outline-purple" className='btn-xs-d' style={{height: '20px'}}  onClick={()=>callingmax12()}>Max</Button>
                                                        </>):
                                                        tokName2 ?  (<> <span className='text-xs' style={{opacity: '0.5'}}>Balance <strong>{parseFloat(tokBalance2/1000000).toFixed(3)} {tokName2}</strong></span>
                                                        &nbsp;  <Button variant="outline-purple" className='btn-xs-d' style={{height: '20px'}}  onClick={()=>callingmax12()}>Max</Button>

                                                       </>)
                                                :(<></>)
                                                }
                                               
                                                    </div>
                                                    <div className="text-end">
                                                        </div>
                                                </Col>
                                            </Row>
                                        </div>
                                        
                                        
                                
                                       
                                     
                                    </div>
                                    {localStorage.getItem("walletAddress") ?
                                    (<>{nolPair ? 
                                    (<>{
                                        minimumbalance?
                                        (<>
                                        <Button className='btn btn-blue w-100' >
                                    You don't have sufficient balance to Create liquidity
                                    </Button></>):
                                        (<>{(!showOptInButton && !showMintButton )?
                                          (<>
                                          <ButtonLoad loading={loader} className='btn btn-blue w-100' onClick={()=>bootstrap(appID_global,tokId1,tokId2)}>
                                    Confirm
                                    </ButtonLoad>
                                    </>):(showOptInButton && !showMintButton)?
                                          (<>
                                          <ButtonLoad loading={loader} className='btn btn-blue w-100'  onClick={()=>optIn(appID_global)}>
                                    Asset Optin
                                    </ButtonLoad>
                                    </>):(<>
                                      <ButtonLoad loading={loader} className='btn btn-blue w-100' onClick={()=>mint(appID_global,tokId1,tokId2,(input1*1000000),(input2 * 1000000))}>
                                    Create Liquidity
                                    </ButtonLoad>
                                    </>)}
                                        
                                    </>)
                                    }
                                    
                                    </>):
                                    (<>                                    
                                    <Button className='btn btn-blue w-100' onClick={()=>createliq()}>
                                    Already had a Pair
                                    </Button>
                                    </>)}
                                     </>):                                   
                                    (<>
                                    <Button className='btn btn-blue w-100' onClick={()=>conectWallet()}>
                                    <svg width="20" height="20" className='me-2 ms-0' viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg"><path d="M21 18V19C21 20.1 20.1 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.89 3 5 3H19C20.1 3 21 3.9 21 5V6H12C10.89 6 10 6.9 10 8V16C10 17.1 10.89 18 12 18H21ZM12 16H22V8H12V16ZM16 13.5C15.17 13.5 14.5 12.83 14.5 12C14.5 11.17 15.17 10.5 16 10.5C16.83 10.5 17.5 11.17 17.5 12C17.5 12.83 16.83 13.5 16 13.5Z"></path></svg>
                                    Connect wallet
                                    </Button>
                                    </>)}

                                          
                                        </Tab>
                                       
                                    </Tabs>
                                </Tab>
                            </Tabs>
                        </Card>
                    </Col>
                </Row>
            </Container>
                  </>)
             }
             </>)}
          
           

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
        </Layout>
    );
};

export default Stablecoin;