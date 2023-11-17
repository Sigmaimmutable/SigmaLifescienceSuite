import React, { useState,useEffect } from 'react';
import { Accordion, Badge, Button, Col, Container, Dropdown, Form, FormControl, InputGroup, OverlayTrigger, Row, Tab, Tabs, Tooltip } from 'react-bootstrap';
import Layout from './LayoutT';
import USDC from '../../assets/images/usdc.jpg';
import Icon1 from '../../assets/images/elem-original.png';
import Icon2 from '../../assets/images/algorand-logo.png';
import MyAlgoConnect from '@randlabs/myalgo-connect';
import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';
import "../toast-style-override.css"
import configfileelem from "../../stakingconfig.json";
import configfiletau from "../../stakingFarmTauconfig.json";
import ButtonLoad from 'react-bootstrap-button-loader';
import node from './nodeapi.json';
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import { formatJsonRpcRequest } from "@json-rpc-tools/utils";
import { dualwalletconnect } from './walletconnection';

import { checkotp,assetOptin,priceOfCoin1,priceOfCoin2,find_balance,find_balance_escrow,convert1,convert2,readingLocalstate,assetName,decodLocalState, updatealgobalance } from '../formula';
const algosdk = require('algosdk');
const algodClientGet = new algosdk.Algodv2('', node['algodclient'], '');
const algodClient = new algosdk.Algodv2('', node['algodclient'], '');
const indexClient = new algosdk.Indexer('', node['indexerclient'], '');
const bridge = "https://bridge.walletconnect.org";
// const baseServer = 'https://testnet-algorand.api.purestake.io/ps2';
// const port = '';
// const token = {
//     'X-API-Key': 'pOD5BAUCxq7InVPjo0sO01B0Vq4d7pD1ask5Ix43'
//  }
 
 
 
//  const algodClientGet = new algosdk.Algodv2(token, baseServer, port);
//  const algodClient = new algosdk.Algodv2('', 'https://node.testnet.algoexplorerapi.io', '');
//  const indexClient = new algosdk.Indexer('', 'https://algoindexer.testnet.algoexplorerapi.io', '');
const myAlgoConnect = new MyAlgoConnect();
const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
const Stakecard=(props)=>{ 
  useEffect(() => {
    document.title = "ELEMENT | Stake"
}, [])
//ELEM
const[stakedbalanceelem,setStakedBalanceelem] = useState("");
const[globalstakeelem,setGlobalStakeelem] = useState('');
const[totalsulelem,settotalsulelem] = useState('');
const[totalsulcelem,settotalsulcelem] = useState('');
const[Totalrewardallocatedelem,setTotalrewardallocatedelem] = useState('');
const[rewardcalcelem,setrewardcalculationelem]=useState('');
const[TotalStakeelem,setTotalStakeelem] = useState("");
const[balanceelem,setBalanceelem] = useState([]);
const[apyelem,setApyELEM]=useState("");
const[Totalrewardelem,setTotalrewardELEM] = useState('');

//TAU
const[stakedbalancetau,setStakedBalancetau] = useState("");
const[globalstaketau,setGlobalStaketau] = useState('');
const[totalsultau,settotalsultau] = useState('');
const[totalsulctau,settotalsulctau] = useState('');
const[Totalrewardallocatedtau,setTotalrewardallocatedtau] = useState('');
const[rewardcalctau,setrewardcalculationtau]=useState('');
const[TotalStaketau,setTotalStaketau] = useState("");
const[balancetau,setBalancetau] = useState([]);
const[apytau,setApyTAU]=useState("");
const[Totalrewardtau,setTotalrewardtau] = useState('');
const[totalvaluelockedelem,setTVLELEM]=useState("");
//GENERAL
const [minAlgo, setMinAlgo] = useState("");
const[rewardamountbalance,setrewardBalance] = useState([]);
const[globaltime,setGlobalTime] = useState('');
const[usertime,setusertime] = useState('');
const[rewardupdatetime,setrewardupdatetime]=useState("");
const [usertimeset,setusertimecheck]=useState("");
const[rewardBool,setRewardBool]=useState(false);
const [state, setState] = useState("");
const [val, setVal] = useState('');
const [swicth, setSwitch] = useState(true);
const [receive, setReceive] = useState('Wone');
const handleToggle = () => setSwitch(!swicth);
const [stakevalue,setStakevalue] = useState("");
const [withdrawvalue,setwithdrawvalue] = useState("");
const [connector, setConnector] = useState("");
const [accounts, setaccount] = useState("");
const [assetUsdcOpt, setAssetUsdcOpt] = useState(false);
const [assetElemOpt, setAssetElemOpt] = useState(false);
const [appOpt, setAppOpt] = useState(false);
const[appOpted,setOpted] = useState(false);
const[appOptedtau,setOptedtau] = useState(false);
const [assetOpt,setToAssetOpt] = useState(false);
    const[loaderstake, setLoaderstake] = useState(false);
    const handleShowLoadstake = () => setLoaderstake(true);
    const handleHideLoadstake = () => setLoaderstake(false);

    const[loaderunstake, setLoaderunstake] = useState(false);
    const handleShowLoadunstake = () => setLoaderunstake(true);
    const handleHideLoadunstake = () => setLoaderunstake(false);

    const[loaderclaim, setLoaderclaim] = useState(false);
    const handleShowLoadclaim = () => setLoaderclaim(true);
    const handleHideLoadclaim = () => setLoaderclaim(false);
    
    const[loaderAppoptin, setLoaderAppoptin] = useState(false);
    const handleShowLoadAppoptin = () => setLoaderAppoptin(true);
    const handleHideLoadAppoptin = () => setLoaderAppoptin(false);

    const[loaderAssetoptin, setLoaderAssetoptin] = useState(false);
    const handleShowLoadAssetoptin = () => setLoaderAssetoptin(true);
    const handleHideLoadAssetoptin = () => setLoaderAssetoptin(false);
    //let perawallet=localStorage.getItem("walletName");
   //FOR ELEM
   useEffect(() => {
    fetchPostselem();
  }, [rewardcalcelem]);
  const fetchPostselem = async () => {
    // read local state of application from user account

let accountInfoResponse = await algodClientGet.accountInformation(localStorage.getItem("walletAddress")).do();
console.log("configfile1",configfileelem.applicationid);
let appById = await algodClientGet.getApplicationByID(parseInt(configfileelem.applicationid)).do();

  let globaltimenew;
  let gloablstakenew;
  let totalsulnew;
  let totalslatelocknew;
  let stakedbalancenew;
  let rewardbalancenew;
  let usertimenew;
  for(let i=0;i<11;i++){
     
       if(appById['params']['global-state'][i]['key']==="R1Q="){
       globaltimenew = appById['params']['global-state'][i]['value']['uint'];
       setGlobalTime(appById['params']['global-state'][i]['value']['uint']);
       console.log("globaltime",globaltime);
       }

       if(appById['params']['global-state'][i]['key']==="R1NT"){
         gloablstakenew=appById['params']['global-state'][i]['value']['uint'];
         
         setGlobalStakeelem(appById['params']['global-state'][i]['value']['uint']);
         
         }
         
         if(appById['params']['global-state'][i]['key']=== "R0E="){
           setTotalStakeelem(appById['params']['global-state'][i]['value']['uint']);
           
           console.log("checktvl",appById['params']['global-state'][i]['value']['uint'])
         }
       if(appById['params']['global-state'][i]['key']==="VFNVTA=="){
           totalsulnew =appById['params']['global-state'][i]['value']['uint'];
           
           settotalsulelem(appById['params']['global-state'][i]['value']['uint']);
           }
           if(appById['params']['global-state'][i]['key']==="VFNVTEM="){
               //totalsulnew =appById['params']['global-state'][i]['value']['uint'];
               
               settotalsulcelem(appById['params']['global-state'][i]['value']['uint']);
               }
       if(appById['params']['global-state'][i]['key']==="VFNM"){
             totalslatelocknew=appById['params']['global-state'][i]['value']['uint'];
             setTotalrewardallocatedelem(appById['params']['global-state'][i]['value']['uint']);
             }   
      }
   

console.log("accinfolocal",accountInfoResponse);
if( accountInfoResponse['apps-local-state'].length === null|| accountInfoResponse['apps-local-state'].length ===undefined||accountInfoResponse['apps-local-state'].length===""){
// alert("check");
}
else{


console.log("User",accountInfoResponse['apps-local-state'].length);
for (let i = 0; i < accountInfoResponse['apps-local-state'].length; i++) { 
 if (accountInfoResponse['apps-local-state'][i].id == parseInt(configfileelem.applicationid)) {
     console.log("User's local state:",accountInfoResponse['apps-local-state'][i].id);
     let acccheck= accountInfoResponse['apps-local-state'][i][`key-value`]; 
     console.log("Usercheck",acccheck);
     console.log("User",accountInfoResponse['apps-local-state'][i][`key-value`]);
   

     if(accountInfoResponse['apps-local-state'][i][`key-value`]=== null|| accountInfoResponse['apps-local-state'][i][`key-value`] === undefined||accountInfoResponse['apps-local-state'][i][`key-value`]===""){
       // alert("check");
    }
   else{
for (let n = 0; n < accountInfoResponse['apps-local-state'][i][`key-value`].length; n++) {
         console.log(accountInfoResponse['apps-local-state'][i][`key-value`][n]);
         //setStakedBalance(accountInfoResponse['apps-local-state'][i][`key-value`][n]);
         
         let rewardkey =accountInfoResponse['apps-local-state'][i]['key-value'][n];
        if(rewardkey['key'] === "VUE="){
          stakedbalancenew=accountInfoResponse['apps-local-state'][i]['key-value'][n]['value']['uint'];
          setStakedBalanceelem(accountInfoResponse['apps-local-state'][i]['key-value'][n]['value']['uint']);
        }
       if(rewardkey['key'] === "VVNT"){
         rewardbalancenew=accountInfoResponse['apps-local-state'][i]['key-value'][n]['value']['uint'];
         console.log("rewardcheck",accountInfoResponse['apps-local-state'][i]['key-value'][n]['value']['uint']);
         setrewardBalance(accountInfoResponse['apps-local-state'][i]['key-value'][n]['value']['uint']);
         console.log("rewardcheck",accountInfoResponse['apps-local-state'][i]['key-value'][n]['value']['uint']);
       }
       if(rewardkey['key'] === "VVQ="){
         usertimenew = accountInfoResponse['apps-local-state'][i]['key-value'][n]['value']['uint'];
         console.log("usertimecheck",usertimenew);
         setusertimecheck(usertimenew);
         console.log("usertimeset",usertimeset);

         setrewardupdatetime(parseInt(usertimenew)+604800);
         console.log("rewardupdatetime",rewardupdatetime);
         console.log("usertime",accountInfoResponse['apps-local-state'][i]['key-value'][n]['value']['uint']);
         setusertime(accountInfoResponse['apps-local-state'][i]['key-value'][n]['value']['uint']);
         console.log("usertime",accountInfoResponse['apps-local-state'][i]['key-value'][n]['value']['uint']);
       }
         
     }

   }

     
 }
}
}
for(let i = 0; i < accountInfoResponse['assets'].length; i++){
console.log("accountsasset", accountInfoResponse['assets']);
if (accountInfoResponse['assets'][i]['asset-id'] == parseInt(configfileelem.assetid)) {
 setBalanceelem(accountInfoResponse['assets'][i]['amount']);
 console.log("accountassetid", configfileelem.assetid);
 console.log("accountsassetnew", accountInfoResponse['assets'][i]['amount']);

}
}



console.log("sub",globaltimenew);
console.log("sub_div",usertimenew);
console.log("mul1",stakedbalancenew);
console.log("add_div",rewardbalancenew);
console.log("mul2",gloablstakenew);
//console.log("rewardCal",rewardCal);
let sub = parseInt(globaltimenew) - parseInt(usertimenew);
console.log("checksub",sub);
let sub_div = parseFloat(sub) / 86400;

let mul1 = parseFloat(sub_div) * parseFloat(stakedbalancenew);

let add = parseFloat(rewardbalancenew) + parseFloat(mul1);

let add_div =  parseFloat(add) / parseFloat(gloablstakenew);

let mul2 = parseFloat(add_div) * parseFloat(totalsulnew);

let rewardCal1 = parseFloat(mul2) / 1000000;
let rewardCalelem = rewardCal1.toFixed(6);
console.log("rewardamountcalculation",parseFloat(rewardCalelem));
//let rewardcalculation =parseFloat((parseFloat(rewardamountbalance)+(parseFloat((globaltime)-parseFloat(usertime))/60)*parseFloat(stakedbalance)/parseFloat(globalstake))*parseFloat(totalsul)/parseFloat(1000000));
setrewardcalculationelem(parseFloat(rewardCalelem));
(rewardCalelem === 'NaN'||rewardCalelem === "" || rewardCalelem === null || rewardCalelem === '' || rewardCalelem === undefined) ? setRewardBool(false) : setRewardBool(true);



};
  //For TAU

  useEffect(() => {
    fetchPostsTau();
  }, [rewardcalctau]);
  const fetchPostsTau = async () => {
    // read local state of application from user account

let accountInfoResponse = await algodClientGet.accountInformation(localStorage.getItem("walletAddress")).do();
console.log("configfile1",configfiletau.applicationid);
let appById = await algodClientGet.getApplicationByID(parseInt(configfiletau.applicationid)).do();

  let globaltimenew;
  let gloablstakenew;
  let totalsulnew;
  let totalslatelocknew;
  let stakedbalancenew;
  let rewardbalancenew;
  let usertimenew;
  for(let i=0;i<11;i++){
     
       if(appById['params']['global-state'][i]['key']==="R1Q="){
       globaltimenew = appById['params']['global-state'][i]['value']['uint'];
       setGlobalTime(appById['params']['global-state'][i]['value']['uint']);
       console.log("globaltime",globaltime);
       }

       if(appById['params']['global-state'][i]['key']==="R1NT"){
         gloablstakenew=appById['params']['global-state'][i]['value']['uint'];
         setGlobalStaketau(appById['params']['global-state'][i]['value']['uint']);
         }

         if(appById['params']['global-state'][i]['key']=== "R0E="){
           setTotalStaketau(appById['params']['global-state'][i]['value']['uint']);
           console.log("checktvl",appById['params']['global-state'][i]['value']['uint'])
         }
       if(appById['params']['global-state'][i]['key']==="VFNVTA=="){
           totalsulnew =appById['params']['global-state'][i]['value']['uint'];
           
           settotalsultau(appById['params']['global-state'][i]['value']['uint']);
           }
           if(appById['params']['global-state'][i]['key']==="VFNVTEM="){
               //totalsulnew =appById['params']['global-state'][i]['value']['uint'];
               
               settotalsulctau(appById['params']['global-state'][i]['value']['uint']);
               }
       if(appById['params']['global-state'][i]['key']==="VFNM"){
             totalslatelocknew=appById['params']['global-state'][i]['value']['uint'];
             setTotalrewardallocatedtau(appById['params']['global-state'][i]['value']['uint']);
             }   
      }
   

console.log("accinfolocal",accountInfoResponse);
if( accountInfoResponse['apps-local-state'].length === null|| accountInfoResponse['apps-local-state'].length ===undefined||accountInfoResponse['apps-local-state'].length===""){
// alert("check");
}
else{


console.log("User",accountInfoResponse['apps-local-state'].length);
for (let i = 0; i < accountInfoResponse['apps-local-state'].length; i++) { 
 if (accountInfoResponse['apps-local-state'][i].id == parseInt(configfiletau.applicationid)) {
     console.log("User's local state:",accountInfoResponse['apps-local-state'][i].id);
     let acccheck= accountInfoResponse['apps-local-state'][i][`key-value`]; 
     console.log("Usercheck",acccheck);
     console.log("User",accountInfoResponse['apps-local-state'][i][`key-value`]);
   

     if(accountInfoResponse['apps-local-state'][i][`key-value`]=== null|| accountInfoResponse['apps-local-state'][i][`key-value`] === undefined||accountInfoResponse['apps-local-state'][i][`key-value`]===""){
       // alert("check");
    }
   else{
for (let n = 0; n < accountInfoResponse['apps-local-state'][i][`key-value`].length; n++) {
         console.log(accountInfoResponse['apps-local-state'][i][`key-value`][n]);
         //setStakedBalance(accountInfoResponse['apps-local-state'][i][`key-value`][n]);
         
         let rewardkey =accountInfoResponse['apps-local-state'][i]['key-value'][n];
        if(rewardkey['key'] === "VUE="){
          stakedbalancenew=accountInfoResponse['apps-local-state'][i]['key-value'][n]['value']['uint'];
          setStakedBalancetau(accountInfoResponse['apps-local-state'][i]['key-value'][n]['value']['uint']);
        }
       if(rewardkey['key'] === "VVNT"){
         rewardbalancenew=accountInfoResponse['apps-local-state'][i]['key-value'][n]['value']['uint'];
         console.log("rewardcheck",accountInfoResponse['apps-local-state'][i]['key-value'][n]['value']['uint']);
         setrewardBalance(accountInfoResponse['apps-local-state'][i]['key-value'][n]['value']['uint']);
         console.log("rewardcheck",accountInfoResponse['apps-local-state'][i]['key-value'][n]['value']['uint']);
       }
       if(rewardkey['key'] === "VVQ="){
         usertimenew = accountInfoResponse['apps-local-state'][i]['key-value'][n]['value']['uint'];
         console.log("usertimecheck",usertimenew);
         setusertimecheck(usertimenew);
         console.log("usertimeset",usertimeset);

         setrewardupdatetime(parseInt(usertimenew)+604800);
         console.log("rewardupdatetime",rewardupdatetime);
         console.log("usertime",accountInfoResponse['apps-local-state'][i]['key-value'][n]['value']['uint']);
         setusertime(accountInfoResponse['apps-local-state'][i]['key-value'][n]['value']['uint']);
         console.log("usertime",accountInfoResponse['apps-local-state'][i]['key-value'][n]['value']['uint']);
       }
         
     }

   }

     
 }
}
}
for(let i = 0; i < accountInfoResponse['assets'].length; i++){
console.log("accountsasset", accountInfoResponse['assets']);
if (accountInfoResponse['assets'][i]['asset-id'] == parseInt(configfiletau.assetid)) {
 setBalancetau(accountInfoResponse['assets'][i]['amount']);
 console.log("accountassetid", configfiletau.assetid);
 console.log("accountsassetnew", accountInfoResponse['assets'][i]['amount']);

}
}



console.log("sub",globaltimenew);
console.log("sub_div",usertimenew);
console.log("mul1",stakedbalancenew);
console.log("add_div",rewardbalancenew);
console.log("mul2",gloablstakenew);
//console.log("rewardCal",rewardCal);
let sub = parseInt(globaltimenew) - parseInt(usertimenew);
console.log("checksub",sub);
let sub_div = parseFloat(sub) / 86400;

let mul1 = parseFloat(sub_div) * parseFloat(stakedbalancenew);

let add = parseFloat(rewardbalancenew) + parseFloat(mul1);

let add_div =  parseFloat(add) / parseFloat(gloablstakenew);

let mul2 = parseFloat(add_div) * parseFloat(totalsulnew);

let rewardCal1 = parseFloat(mul2) / 1000000;
let rewardCaltau = rewardCal1.toFixed(6);
console.log("rewardamountcalculation",parseFloat(rewardCaltau));
//let rewardcalculation =parseFloat((parseFloat(rewardamountbalance)+(parseFloat((globaltime)-parseFloat(usertime))/60)*parseFloat(stakedbalance)/parseFloat(globalstake))*parseFloat(totalsul)/parseFloat(1000000));
setrewardcalculationtau(parseFloat(rewardCaltau));
(rewardCaltau === 'NaN'||rewardCaltau === "" || rewardCaltau === null || rewardCaltau === '' || rewardCaltau === undefined ) ? setRewardBool(false) : setRewardBool(true);


};
//FOR ELEM APY
 
 useEffect(() => {
  fetchPostsELEMAPY();
}, []); 
const fetchPostsELEMAPY = async () => {
 

  let accountInfoResponse1 = await algodClientGet.accountInformation(configfileelem.creatoraddress).do();
  let totalstake1;
  let totalclaimed1;
  for (let i = 0; i < accountInfoResponse1['created-apps'].length; i++) { 
   console.log("Application's global state:");
  if (accountInfoResponse1['created-apps'][i].id == parseInt(configfileelem.applicationid)) {
      console.log("Application's global state:");
      for (let n = 0; n < accountInfoResponse1['created-apps'][i]['params']['global-state'].length; n++) {
          console.log(accountInfoResponse1['created-apps'][i]['params']['global-state'][n]);
          let enc = accountInfoResponse1['created-apps'][i]['params']['global-state'][n];
          console.log("encode",enc);
          var decodedString = window.atob(enc.key);
          if(enc['key'] === "R0E="){
            setTotalStakeelem( accountInfoResponse1['created-apps'][i]['params']['global-state'][n]['value']['uint']);
             totalstake1=accountInfoResponse1['created-apps'][i]['params']['global-state'][n]['value']['uint'];
            console.log("checktvl", accountInfoResponse1['created-apps'][i]['params']['global-state'][n]['value']['uint'])
            
  
            
          }
          if(enc['key'] === "VFNVTEM="){
            setTotalrewardELEM( accountInfoResponse1['created-apps'][i]['params']['global-state'][n]['value']['uint']);
           totalclaimed1= accountInfoResponse1['created-apps'][i]['params']['global-state'][n]['value']['uint']
            console.log("checktvl", accountInfoResponse1['created-apps'][i]['params']['global-state'][n]['value']['uint'])
          }
          if(enc['key'] === "VFNM"){
            setTotalrewardallocatedelem( accountInfoResponse1['created-apps'][i]['params']['global-state'][n]['value']['uint']);
            console.log("checktvl", accountInfoResponse1['created-apps'][i]['params']['global-state'][n]['value']['uint'])
          }
  
  
          var principal =	((totalstake1)/1000000) * (configfileelem.price) * 10 ** 6;
            console.log("principal",principal)
            var interest  = ((totalclaimed1)/1000000) * 0.4 * 3 * 10 ** 6;
            console.log("interest",interest)
            var rate = interest / principal;
            let calapy=((1 + rate / 1) ** 1 - 1) * 100;
            setApyELEM(calapy);
            console.log("apy2",calapy);
      }
      
  }
  }
    
    };

//For TAU APY
 
useEffect(() => {
  fetchPostsTAUAPY();
}, []);

const fetchPostsTAUAPY = async () => {
 

  let accountInfoResponse1 = await algodClientGet.accountInformation(configfiletau.creatoraddress).do();
  let totalstake1;
  let totalclaimed1;
  for (let i = 0; i < accountInfoResponse1['created-apps'].length; i++) { 
   console.log("Application's global state:");
  if (accountInfoResponse1['created-apps'][i].id == parseInt(configfiletau.applicationid)) {
      console.log("Application's global state:");
      for (let n = 0; n < accountInfoResponse1['created-apps'][i]['params']['global-state'].length; n++) {
          console.log(accountInfoResponse1['created-apps'][i]['params']['global-state'][n]);
          let enc = accountInfoResponse1['created-apps'][i]['params']['global-state'][n];
          console.log("encode",enc);
          var decodedString = window.atob(enc.key);
          if(enc['key'] === "R0E="){
            setTotalStaketau( accountInfoResponse1['created-apps'][i]['params']['global-state'][n]['value']['uint']);
             totalstake1=accountInfoResponse1['created-apps'][i]['params']['global-state'][n]['value']['uint'];
            console.log("checktvl", accountInfoResponse1['created-apps'][i]['params']['global-state'][n]['value']['uint'])
            
  
            
          }
          if(enc['key'] === "VFNVTEM="){
            setTotalrewardtau( accountInfoResponse1['created-apps'][i]['params']['global-state'][n]['value']['uint']);
           totalclaimed1= accountInfoResponse1['created-apps'][i]['params']['global-state'][n]['value']['uint']
            console.log("checktvl", accountInfoResponse1['created-apps'][i]['params']['global-state'][n]['value']['uint'])
          }
          if(enc['key'] === "VFNM"){
            setTotalrewardallocatedtau( accountInfoResponse1['created-apps'][i]['params']['global-state'][n]['value']['uint']);
            console.log("checktvl", accountInfoResponse1['created-apps'][i]['params']['global-state'][n]['value']['uint'])
          }
  
  
          var principal =	((totalstake1)/1000000) * (configfileelem.price) * 10 ** 6;
            console.log("principal",principal)
            var interest  = ((totalclaimed1)/1000000) * 0.4 * 3 * 10 ** 6;
            console.log("interest",interest)
            var rate = interest / principal;
            let calapy=((1 + rate / 1) ** 1 - 1) * 100;
            setApyTAU(calapy);
            console.log("apy2",calapy);
      }
      
  }
  }
    
    };
//TOTAL VALUE LOCKED(ELEM )
useEffect(() => {
  const fetchPosts = async () => {
      let pk1 = await priceOfCoin1();
      console.log("algoprice1",pk1);
     //setAlgoPrice(pk1);
      console.log("algoprice",pk1);
      let pk2 = await priceOfCoin2();
      //setUsdcPrice(pk2);
       console.log("usdcprice",pk2);
 
 
       console.log("TotalStakeelem",TotalStakeelem);
     //let setTotalStakecal = TotalStakeelem; 
      let elemconvert =  parseFloat((TotalStakeelem) * parseFloat(3));
     //console.log("totalstakeelaem",totalstake);
      let elemconvert1=parseFloat(elemconvert) * parseFloat (pk2);
      let elemconvert2=parseFloat(elemconvert1/1000000);
      //setelemconversion(elemconvert2);
      console.log("elemdollarconversion",elemconvert2);  

  //  let  setTotalStaketaucal = await farmtvltau(configfiletau.creatoraddress,configfiletau.applicationid);
  //     let tauconvert =  parseFloat((setTotalStaketaucal) * parseFloat(1));
  //     console.log("totalstakeelaem",totalstaketau);
  //     let tauconvert1=parseFloat(tauconvert) * parseFloat (pk2);
  //     let tauconvert2=parseFloat(tauconvert1/1000000);
  //    // settauconversion(tauconvert2);
  //     console.log("taudollarconversion",tauconvert2);  
      
    

      setTVLELEM(elemconvert2);
      console.log("calculatingtvlelem",totalvaluelockedelem);
      console.log("calculatingtvl",elemconvert2);

  };
  fetchPosts();
}, []); 



const waitForConfirmation = async function (client, txId) {
    let status = (await client.status().do());
    let lastRound = status["last-round"];
      while (true) {
        const pendingInfo = await client.pendingTransactionInformation(txId).do();
        if (pendingInfo["confirmed-round"] !== null && pendingInfo["confirmed-round"] > 0) {
          //Got the completed Transaction
          console.log("Transaction " + txId + " confirmed in round " + pendingInfo["confirmed-round"]);
          function sleep(ms) {
          return new Promise(resolve => setTimeout(resolve, ms));
     } 
     let id = "https://testnet.algoexplorer.io/tx/" + txId;
        toast.success(toastDiv(id));
        handleHideLoadAppoptin();
        handleHideLoadAssetoptin();
        await sleep(5000);
          break;
        }
        lastRound++;
        await client.statusAfterBlock(lastRound).do();
      }
    };
    
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
     } 
     const toastDiv = (txId) =>
     (
         <div>
             <p> Transaction is successful &nbsp;<a style={{color:'#133ac6'}} href={txId} target="_blank" rel="noreferrer"><br/><p style={{fontWeight: 'bold'}}>View in Algoexplorer <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.7176 3.97604L1.69366 14L0.046875 12.3532L10.0697 2.32926H1.23596V0H14.0469V12.8109H11.7176V3.97604Z" fill="#133ac6"/>
      </svg></p></a></p>  
         </div>
     );

     const assetoptin = async(name) => {
      handleShowLoadAssetoptin(); 
      try{
        let  configfile="";
            
            if(name==="ELEM"){
             
                console.log("config",configfileelem);
                configfile =configfileelem;
            }
            else{
                configfile=configfiletau;
            }
      const algosdk = require('algosdk');
     //const algodclient = new algosdk.Algodv2('', 'https://api.testnet.algoexplorer.io/', '');
      const myAlgoConnect = new MyAlgoConnect();
      const params = await algodClient.getTransactionParams().do();
      const assetoptin1 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        from: localStorage.getItem("walletAddress"),
        to: localStorage.getItem("walletAddress"),
        assetIndex: parseInt(configfile.rewardassetid),
        note: undefined,
        amount: 0,
        suggestedParams: params
        });
        let transid=await dualwalletconnect(assetoptin1);
        await waitForConfirmation(algodClient, transid);
        setToAssetOpt(true);
        updatealgobalance();
        // if(localStorage.getItem("walletName") === "myAlgoWallet")
        // {
        //   const signedTxnass = await myAlgoConnect.signTransaction(assetoptin1.toByte());
        //   toast.info("Transaction in Progress");
        //   const responseass = await algodClient.sendRawTransaction(signedTxnass.blob).do();
        //   //toast.success(`Asset Optin Successful ${responseass.txId}`);
        //   console.log("optresponse",responseass)
        
        //   // toast.success(`Asset Optin Success ${responseass.txId}`);
        //   await waitForConfirmation(algodClient, responseass.txId);
        // }
        // else if(localStorage.getItem("walletName") === "PeraWallet")
        // {
        //   const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
        //   setConnector(connector);
        //   let txId = assetoptin1.txID().toString();
  
        //   // time to sign . . . which we have to do with walletconnect
        //   const txns = [assetoptin1]
        //   const txnsToSign = txns.map(txn => {
        //     const encodedTxn = Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString("base64");
        //     return {
        //       txn: encodedTxn,
        //   };
        // });
        // const requestParams = [ txnsToSign ];
        // const request = formatJsonRpcRequest("algo_signTxn", requestParams);
      
        // const result = await connector.sendCustomRequest(request);
        // console.log("res1",result);
        // const decodedResult = result.map(element => {
        //   return element ? new Uint8Array(Buffer.from(element, "base64")) : null;
        // });
        // console.log("decodedre",decodedResult);
        //   // send and await
        //   //await algodClient.sendRawTransaction([decodedResult]).do();
        //  await algodClient.sendRawTransaction(decodedResult).do();
        //   await waitForConfirmation(algodClient, txId);
    


        // }
        


         // window.location.reload();
        // datasethere("Asset Optin Successfully")
        // setIsOpennewpro(false)
        // setIsOpennew(true)
      }
      catch (err) {
          console.error(err);
          toast.error(`Asset Optin Failed due to ${err}`);
          handleHideLoadAssetoptin();
        //   setIsOpennewpro(false)
      }
      }

//optin
    const optin=async(name)=>{

        handleShowLoadAppoptin();
        try{   
            let  configfile="";
            
            if(name==="ELEM"){
             
                console.log("config",configfileelem.applicationid);
                configfile =configfileelem.applicationid;
            }
            else{
                configfile=configfiletau.applicationid;
            }
            console.log("configfile",configfile);
           
          if(parseFloat(minAlgo) < 101000 + 628000)
                          {
                              toast.error("Your Algo balance is low. Please get more Algos from dispenser.")
                              handleHideLoadAppoptin();
                          }
                          else
                          {    
         
        const algosdk = require('algosdk');
       // const algodclient = new algosdk.Algodv2('', 'https://api.testnet.algoexplorer.io/', '');
        const myAlgoConnect = new MyAlgoConnect();
        
       
        
        const params = await algodClient.getTransactionParams().do();
        let transoptin2 = algosdk.makeApplicationOptInTxnFromObject({
            from: localStorage.getItem("walletAddress"),
            appIndex:parseInt(configfile),
            note: undefined,
            suggestedParams: params
            });
            if(localStorage.getItem("walletName") === "myAlgoWallet"){
              const signedTxn2 = await myAlgoConnect.signTransaction(transoptin2.toByte());
              // toast.info("Transaction in Progress");
               const response2 = await algodClient.sendRawTransaction(signedTxn2.blob).do();
               console.log("optresponse",response2);
               //toast.success(`App Optin Successful ${response2.txId}`);
               await waitForConfirmation(algodClient, response2.txId);
               updatealgobalance();
               if(name==="ELEM"){
                setOpted(true);
                
            }
            else{
              setOptedtau(true);
            }
                
            }
            else if(localStorage.getItem("walletName") === "PeraWallet"){
              const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
              let txId = transoptin2.txID().toString();
  
              // time to sign . . . which we have to do with walletconnect
              const txns = [transoptin2]
              const txnsToSign = txns.map(txn => {
                const encodedTxn = Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString("base64");
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
              await algodClient.sendRawTransaction(decodedResult).do();
              await waitForConfirmation(algodClient, txId);
              updatealgobalance();
              if(name==="ELEM"){
                setOpted(true);
                
            }
            else{
              setOptedtau(true);
            }
            }
   
       
        
      
      }
    }
      catch (err) {
          console.error(err);
          toast.error(`App Optin Failed due to ${err}`);
          handleHideLoadAppoptin();
      }
      }


      useEffect(async() => {
        await minBal();
      }, [minAlgo]);
      

      const minBal = async () =>
      {
        let min = await algodClientGet.accountInformation(localStorage.getItem("walletAddress")).do();
        // console.log("minBalanceApi", min['min-balance']);
        setMinAlgo(min['amount'] - min['min-balance']);
        console.log("minBalance", minAlgo);
      } 
    
      
      /**stake */
   
  const stake = async(name) => {
    handleShowLoadstake();
    
     // console.log("stakevaul1",stakevalue);
     // console.log("balancevalue1",balance);
     let  configfile="";
     let balance=""  ; 
         if(name==="ELEM"){
             balance=balanceelem;
             
             console.log("config",configfileelem);
             configfile =configfileelem;
         }
         else{
             configfile=configfiletau;
             balance=balancetau;
         }
         
   console.log("balancecheck",balance);
     if(stakevalue===0||stakevalue==="0"||stakevalue===null||stakevalue===""||stakevalue <= 0){
      
         toast.error("Please enter an amount greater than 0");
         handleHideLoadstake();
     }
     else if(parseFloat(stakevalue)>parseFloat(balance/1000000)){
        
       toast.error("You are trying to stake more than your Asset balance");
       handleHideLoadstake();
     }
 
     
     else{
 
     
   if(parseFloat(minAlgo) < 3000)
                         {
                             toast.error("Your Algo balance is low. Please get more Algos from dispenser.");
                             handleHideLoadstake();
                         }
                         else
                         {
     try{
         
     const algosdk = require('algosdk');
     //const algodClient = new algosdk.Algodv2('', 'https://api.testnet.algoexplorer.io', '');
    
    //  var amt = document.getElementById("tid1").value; 
      var amt=stakevalue;
      let stakeamount = (amt) * 1000000;
      global.TextEncoder = require("util").TextEncoder; 
    
      setaccount(localStorage.getItem("walletAddress"));
     // let sender = localStorage.getItem("walletAddress");
    
      
      // helper function to await transaction confirmation
      // Function used to wait for a tx confirmation
      const waitForConfirmation = async function (algodclient, txId) {
          let status = (await algodclient.status().do());
          let lastRound = status["last-round"];
            while (true) {
              const pendingInfo = await algodclient.pendingTransactionInformation(txId).do();
              if (pendingInfo["confirmed-round"] !== null && pendingInfo["confirmed-round"] > 0) {
               let id = "https://testnet.algoexplorer.io/tx/" + txId;
           toast.success(toastDiv(id));
           handleHideLoadstake();
           await sleep(5000);
                //window.location.reload();
                //console.log("Transaction " + txId + " confirmed in round " + pendingInfo["confirmed-round"]);
                break;
              }
              lastRound++;
              await algodclient.statusAfterBlock(lastRound).do();
            }
          };
          
     
     
     //   const addresses = await myAlgoConnect.connect();
        // define sender
        
        let sender = localStorage.getItem("walletAddress");
        //let client = new algosdk.Algodv2(algodToken, algodServer, algodPort);
      // get node suggested parameters
        let params = await algodClient.getTransactionParams().do();
        // comment out the next two lines to use suggested fee
        params.fee = 1000;
        params.flatFee = true;
      
        let appArgs1= [];
        
        appArgs1.push(new Uint8Array(Buffer.from("CHECK")));
        //console.log("(line:516) appArgs = ",appArgs1)
      
        // create unsigned transaction
        let transaction1 = algosdk.makeApplicationNoOpTxnFromObject({
         from: sender, 
        suggestedParams: params, 
        appIndex: parseInt(configfile.applicationid), 
         appArgs: appArgs1});
        //  let txId1 = transaction1.txID().toString();
      
        let appArgs2= [];
        
        appArgs2.push(new Uint8Array(Buffer.from("S")));
        //console.log("(line:516) appArgs = ",appArgs2)
      
        // create unsigned transaction
        let transaction2 = algosdk.makeApplicationNoOpTxnFromObject({
         from: sender, 
        suggestedParams: params, 
        appIndex: parseInt(configfile.applicationid), 
         appArgs: appArgs2});
        // // Sign the transaction
        // let signedTxn = txn.signTxn(account.sk);
        // console.log("Signed transaction with txID: %s", txId);
      
      let transaction3 =algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        from: sender,
        to: configfile.escrowaddress,
        amount:parseInt(stakeamount),
        note: undefined,
        assetIndex: parseInt(configfile.assetid),
        suggestedParams: params});
      
       //  let transaction3 =algosdk.makePaymentTxnWithSuggestedParamsFromObject({
       //   from: sender,
       //   to: "QGJQVEY5DFKXSHSEKOTRUXMRNNJTGEBDSNDKEKBGHRFBD6EEBNCZVT37TY",
       //   amount: stakeamount,
       //   note: undefined,
       //   suggestedParams: params}); 
   
        const groupID = algosdk.computeGroupID([ transaction1, transaction2, transaction3]);
        const txs = [ transaction1, transaction2, transaction3];
        txs[0].group = groupID;
        txs[1].group = groupID;
        txs[2].group = groupID;
      
        if(localStorage.getItem("walletName") === "myAlgoWallet"){
          const signedTx1 = await myAlgoConnect.signTransaction([txs[0].toByte(), txs[1].toByte(), txs[2].toByte()]);
          // const signedTx2 = await myAlgoConnect.signTransaction(txs[1].toByte());
          // const signedTx3 = await myAlgoConnect.signTransaction(txs[2].toByte());
          toast.info("Transaction in Progress");
          const response = await algodClient.sendRawTransaction([ signedTx1[0].blob, signedTx1[1].blob, signedTx1[2].blob]).do();
         console.log("TxID", JSON.stringify(response, null, 1));   
         // toast.success(`Staked Successfully! ${response.txId}`);   
         await waitForConfirmation(algodClient, response.txId);
         updatealgobalance();
          // localStorage.setItem("Staked","stakedbalance");
         // window.location.reload();
         setStakevalue("");
         if(name==="ELEM"){
         fetchPostselem();
         fetchPostsELEMAPY();
      }
      else{
        fetchPostsTau();
        fetchPostsTAUAPY();
      }
        }
        else if(localStorage.getItem("walletName") === "PeraWallet"){
          const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
          const txns = [txs[0], txs[1], txs[2]]
          const txnsToSign = txns.map(txn => {
            const encodedTxn = Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString("base64");
            console.log(encodedTxn);
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
          await waitForConfirmation(algodClient, response.txId);
      
          updatealgobalance();
          setStakevalue("");
          
       // localStorage.setItem("Staked","stakedbalance");
       //window.location.reload();
       if(name==="ELEM"){
        fetchPostselem();
        fetchPostsELEMAPY();
       
     }
     else{
       fetchPostsTau();
       fetchPostsTAUAPY();
     }

        }
      
    

      
     
     }
     
     catch (err) {
         console.error(err);
         //setIsOpennewpro(false)
         toast.error(`Transaction Failed due to ${err}`);
         handleHideLoadstake();
     }
   }
   } 
 }  
 

   //unstake

   const unstake = async(name) => {
    
    handleShowLoadunstake();
    let  configfile="";
    let stakedbalance=""  ; 
        if(name==="ELEM"){
            stakedbalance=stakedbalanceelem;
            // alert("checking1");
            console.log("config",configfileelem);
            configfile =configfileelem;
        }
        else{
            configfile=configfiletau;
            stakedbalance=stakedbalancetau;
        }
    console.log("configfile",configfile.applicationid);
    if(withdrawvalue===0||withdrawvalue==="0"||withdrawvalue===null||withdrawvalue==="" ||withdrawvalue <= 0 ){
      toast.error("Please enter an amount greater than 0");
      handleHideLoadunstake();
    }
    else if(parseFloat(withdrawvalue)>parseFloat(stakedbalance/1000000)){
      toast.error("You are trying to withdraw more than your staked balance");
      handleHideLoadunstake();
    }
    else{
        if(parseFloat(minAlgo) < 2000)
                        {
                            toast.error("Your Algo balance is low. Please get more Algos from dispenser.");
                            handleHideLoadunstake();
                        }
                        else
                        {
     
      try{
    
    
    
      var amt = withdrawvalue; 
      let unstakeamount = (amt) * 1000000;
      global.TextEncoder = require("util").TextEncoder; 
      // const algosdk = require('algosdk');
    
      const waitForConfirmation = async function (algodclient, txId) {
        let status = (await algodclient.status().do());
        let lastRound = status["last-round"];
          while (true) {
            const pendingInfo = await algodclient.pendingTransactionInformation(txId).do();
            if (pendingInfo["confirmed-round"] !== null && pendingInfo["confirmed-round"] > 0) {
              //Got the completed Transaction
             
              console.log("Transaction " + txId + " confirmed in round " + pendingInfo["confirmed-round"]);
              let id = "https://testnet.algoexplorer.io/tx/" + txId;
              toast.success(toastDiv(id));
              handleHideLoadunstake();
              await sleep(5000);
              break;
            }
            lastRound++;
            await algodclient.statusAfterBlock(lastRound).do();
          }
        };
    
      
      //  const addresses = await myAlgoConnect.connect();
        //console.log("Address =", addresses);
        
       // var escrowdata=escrowdata1.replaceAll("appid",parseInt(configfile.applicationid));
       
      // define sender
      let sender = localStorage.getItem("walletAddress");
     // let client = new algosdk.Algodv2(algodToken, algodServer, algodPort);
    
     // get node suggested parameters
      let params = await algodClient.getTransactionParams().do();
      // comment out the next two lines to use suggested fee
      params.fee = 1000;
      params.flatFee = true;
      let appArgs1= [];
      
      appArgs1.push(new Uint8Array(Buffer.from("CHECK")));
      console.log("(line:516) appArgs = ",appArgs1)
    
      // create unsigned transaction
      let transaction1 = algosdk.makeApplicationNoOpTxnFromObject({
        from: sender, 
        suggestedParams: params, 
        appIndex: parseInt(configfile.applicationid), 
        appArgs: appArgs1});
      //  let txId1 = transaction1.txID().toString();
    
      let appArgs2= [];
      
      appArgs2.push(new Uint8Array(Buffer.from("W")));
      console.log("(line:516) appArgs = ",appArgs2)
    
      // create unsigned transaction
      let transaction2 = algosdk.makeApplicationNoOpTxnFromObject({
        from: sender, 
        suggestedParams: params, 
        appIndex: parseInt(configfile.applicationid), 
        appArgs: appArgs2})
     
      
      let program = new Uint8Array(Buffer.from(configfile.escrowdata, "base64"));
     
    
      // let lsig = algosdk.makeLogicSig(program);
      let lsig = new algosdk.LogicSigAccount(program);
    
    let sender1 = lsig.address();
    console.log("logic",sender1)
        let receiver = sender;
        // let receiver = "<receiver-address>"";
        
       // let closeToRemaninder = sender;
        let note = undefined;
        let transaction3 =algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
          from: sender1,
          to: receiver,
          amount:parseInt(unstakeamount),
          note: undefined,
          assetIndex: parseInt(configfile.assetid),
          suggestedParams: params});
        
    //myAlgo start
    
    const groupID = algosdk.computeGroupID([ transaction1, transaction2, transaction3]);
          const txs = [ transaction1, transaction2, transaction3];
          txs[0].group = groupID;
          txs[1].group = groupID;
          txs[2].group = groupID;
         // txs[3].group = groupID;
         if(localStorage.getItem("walletName") === "myAlgoWallet"){
          const signedTx1 = await myAlgoConnect.signTransaction([txs[0].toByte(), txs[1].toByte()]);
          // const signedTx2 = await myAlgoConnect.signTransaction(txs[1].toByte());
          const signedTx3 = algosdk.signLogicSigTransaction(txs[2], lsig);
  
          const response = await algodClient.sendRawTransaction([ signedTx1[0].blob, signedTx1[1].blob, signedTx3.blob]).do();
   
          await waitForConfirmation(algodClient, response.txId);
    // localStorage.setItem("Alreadywithdraw","withdrawnstate");
    updatealgobalance();
    setwithdrawvalue(" ");
    if(name==="ELEM"){
      fetchPostselem();
      fetchPostsELEMAPY();
   }
   else{
     fetchPostsTau();
     fetchPostsTAUAPY();
   }
         }
        else if(localStorage.getItem("walletName") === "PeraWallet"){
          const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
          const txns = [txs[0], txs[1], txs[2]]
          const txnsToSign = txns.map(txn => {
            const encodedTxn = Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString("base64");
            console.log(encodedTxn);
            return {
              txn: encodedTxn,
          };
        });
          const signedTx3 = algosdk.signLogicSigTransaction(txs[2], lsig);
          const requestParams = [ txnsToSign ];
          const request = formatJsonRpcRequest("algo_signTxn", requestParams);
          const result = await connector.sendCustomRequest(request);
          const decodedResult = result.map(element => {
            return element ? new Uint8Array(Buffer.from(element, "base64")) : null;
          });
          console.log(result);
          decodedResult[2] = signedTx3.blob;
         let response = await algodClient.sendRawTransaction(decodedResult).do()
        await waitForConfirmation(algodClient, response.txId);
        updatealgobalance();
        setwithdrawvalue(" ");
        if(name==="ELEM"){
       
          fetchPostselem();
          fetchPostsELEMAPY();
          
       }
       else{
         
         fetchPostsTau();
         fetchPostsTAUAPY();
         
       }
}
        

    
   
    }
    catch (err) {
        console.error(err);
      //   setIsOpennewpro(false)
      toast.error(`Unstaking Failed due to ${err}`);
      handleHideLoadunstake();
    }
    
  }
}
    }

 //claim reward
 const Claimreward = async(name) => {
    handleShowLoadclaim();
  
    if(parseFloat(minAlgo) < 2000)
                        {
                            toast.error("Your Algo balance is low. Please get more Algos from dispenser.");
                            handleHideLoadclaim();
                        }
                        else
                        {
    try{
        let  configfile="";
        let rewardcalc =""  ;  
        if(name==="ELEM"){
           
            console.log("config",configfileelem);
            configfile =configfileelem;
            rewardcalc=rewardcalcelem;
        }
        else{
            configfile=configfiletau;
            rewardcalc=rewardcalctau;
        }
        console.log("configfile",configfile);
    
    global.TextEncoder = require("util").TextEncoder; 
    // const algosdk = require('algosdk');
  
    const waitForConfirmation = async function (algodclient, txId) {
      let status = (await algodclient.status().do());
      let lastRound = status["last-round"];
        while (true) {
          const pendingInfo = await algodclient.pendingTransactionInformation(txId).do();
          if (pendingInfo["confirmed-round"] !== null && pendingInfo["confirmed-round"] > 0) {
            //Got the completed Transaction
           
           console.log("Transaction " + txId + " confirmed in round " + pendingInfo["confirmed-round"]);
           let id = "https://testnet.algoexplorer.io/tx/" + txId;
           toast.success(toastDiv(id));
           handleHideLoadclaim();
           await sleep(5000);
           break;
          }
          lastRound++;
          await algodclient.statusAfterBlock(lastRound).do();
        }
      };
  
  
      //const addresses = await myAlgoConnect.connect();
      //console.log("Address =", addresses);
    //     var escrowdata1 = `#pragma version 4
  
    //     global GroupSize // size=6
    //     int 2
    //     >=
    //     global GroupSize // size=6
    //     int 6
    //     <=
    //     &&
    //     bz label1
    //     gtxn 0 ApplicationID
    //     int appid
    //     ==
    //     bnz label2
    //     b label1
    //     label2:
    //     gtxn 0 TypeEnum
    //     int 6 // ApplicationCall
    //     ==
    //     gtxn 0 OnCompletion
    //     int 0 // NoOp
    //     ==
    //     int 0
    //     gtxn 0 OnCompletion
    //     ==
    //     ||
    //     &&
    //     gtxn 1 RekeyTo // AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HFKQ
    //     global ZeroAddress
    //     ==
    //     &&
    //     gtxn 0 RekeyTo // AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HFKQ
    //     global ZeroAddress
    //     ==
    //     &&
    //     bnz label3
    //     label1:
    //     int 0
    //     return
    //     label3:
    //     int 1
    //     return    
    // `;
    //var escrowdata=escrowdata1.replaceAll("appid",parseInt(configfile.applicationid));
    // define sender
    let sender = localStorage.getItem("walletAddress");
   // let client = new algosdk.Algodv2(algodToken, algodServer, algodPort);
  
   // get node suggested parameters
    let params = await algodClient.getTransactionParams().do();
    // comment out the next two lines to use suggested fee
    params.fee = 1000;
    params.flatFee = true;
    let appArgs1= [];
    
    appArgs1.push(new Uint8Array(Buffer.from("CHECK")));
    console.log("(line:516) appArgs = ",appArgs1)
  
    // create unsigned transaction
    let transaction1 = algosdk.makeApplicationNoOpTxnFromObject({
      from: sender, 
      suggestedParams: params, 
      appIndex: parseInt(configfile.applicationid), 
      appArgs: appArgs1});
    //  let txId1 = transaction1.txID().toString();
  
    let appArgs2= [];
    
    appArgs2.push(new Uint8Array(Buffer.from("CA")));
    console.log("(line:516) appArgs = ",appArgs2)
  
    // create unsigned transaction
    let transaction2 = algosdk.makeApplicationNoOpTxnFromObject({
      from: sender, 
      suggestedParams: params, 
      appIndex: parseInt(configfile.applicationid), 
      appArgs: appArgs2})
    
  let program = new Uint8Array(Buffer.from(configfile.escrowdata, "base64"));
   
  
  // let lsig = algosdk.makeLogicSig(program);
  let lsig = new algosdk.LogicSigAccount(program);   
  
  let sender1 = lsig.address();
  console.log("logic",sender1)
      let receiver = sender;
      // let receiver = "<receiver-address>"";
      console.log("amount",parseFloat(parseFloat(rewardcalc)*1000000).toFixed(6));
     // let closeToRemaninder = sender;
      let note = undefined;
      let transaction4 =algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        from: sender1,
        to: receiver,
        amount: parseInt(rewardcalc*1000000),
        note: undefined,
        assetIndex: parseInt(configfile.rewardassetid),
        suggestedParams: params});
  
  
  //myAlgo start
  
  const groupID = algosdk.computeGroupID([ transaction1, transaction2, transaction4]);
        const txs = [ transaction1, transaction2, transaction4];
        txs[0].group = groupID;
        txs[1].group = groupID;
        txs[2].group = groupID;
        //txs[2].group = groupID;
          //txs[4].group = groupID;
          if(localStorage.getItem("walletName") === "myAlgoWallet"){
            const signedTx1 = await myAlgoConnect.signTransaction([txs[0].toByte(), txs[1].toByte()]);
            const signedTx4 = algosdk.signLogicSigTransaction(txs[2], lsig);
            const response = await algodClient.sendRawTransaction([ signedTx1[0].blob, signedTx1[1].blob,signedTx4.blob]).do();
            await waitForConfirmation(algodClient, response.txId);
            localStorage.setItem("Claimed","Rewardclaimsetzero");
            updatealgobalance();
            if(name==="ELEM"){
              fetchPostselem();
              fetchPostsELEMAPY();
           }
           else{
             fetchPostsTau();
             fetchPostsTAUAPY();
           }
          }
          else if(localStorage.getItem("walletName") === "PeraWallet"){
            const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
            const txns = [txs[0], txs[1], txs[2]]
            const txnsToSign = txns.map(txn => {
            const encodedTxn = Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString("base64");
            console.log(encodedTxn);
            return {
              txn: encodedTxn,
          };
        });
            const signedTx4 = algosdk.signLogicSigTransaction(txs[2], lsig);
            const requestParams = [ txnsToSign ];
            const request = formatJsonRpcRequest("algo_signTxn", requestParams);
            const result = await connector.sendCustomRequest(request);
            const decodedResult = result.map(element => {
              return element ? new Uint8Array(Buffer.from(element, "base64")) : null;
            });
            console.log(result);
            decodedResult[2] = signedTx4.blob;
            let response = await algodClient.sendRawTransaction(decodedResult).do()
            await waitForConfirmation(algodClient, response.txId);
            updatealgobalance();
            if(name==="ELEM"){
              fetchPostselem();
             
           }
           else{
             fetchPostsTau();
           }
          }
      

  

  }
  catch (err) {
      console.error(err);
      //setIsOpennewpro(false)
      toast.error(`Transaction Failed due to ${err}`);
      handleHideLoadclaim();
  }
}
  }

  
  // useEffect(() => {
  //   const fetchPosts = async (name) => {
  //     let  configfile="";
     
  //        if(name==="ELEM"){
            
             
  //            console.log("config",configfileelem);
  //            configfile =configfileelem;
  //            setOpted(await checkotp(configfile.applicationid));
  //            setToAssetOpt(await assetOptin(configfile.rewardassetid));
  //        }
  //        else{
  //            configfile=configfiletau;
  //            setOptedtau(await checkotp(configfile.applicationid));
  //            setToAssetOpt(await assetOptin(configfile.rewardassetid));
  //        }
   
      
  //   };
  //   fetchPosts();
  // }, []);

  useEffect(() => {
    const fetchPosts = async (name) => {
    
        
            
             
          
             setOpted(await checkotp(configfileelem.applicationid));
             setToAssetOpt(await assetOptin(configfileelem.rewardassetid));
         
   
      
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
        
             setOptedtau(await checkotp(configfiletau.applicationid));
             setToAssetOpt(await assetOptin(configfiletau.rewardassetid));
         
   
      
    };
    fetchPosts();
  }, []);


const Max = async(name) => {
     let  configfile="";
     let maxvalue= ""  ; 
         if(name==="ELEM"){
            
            //  alert("checking1");
             configfile =configfileelem;
             maxvalue=balanceelem;
             console.log("maxvalue",maxvalue)
             setStakevalue(maxvalue/1000000);
         }
         else{
             configfile=configfiletau;
             maxvalue=balancetau;
             setStakevalue(maxvalue/1000000);
         }

   
   
    }
const Maxwithdraw = async(name) => {
    let  configfile="";
    let maxwithdraw=""  ; 
        if(name==="ELEM"){
           
            // alert("checking1");
            configfile =configfileelem;
            maxwithdraw=stakedbalanceelem;
            console.log("maxwithdraw",maxwithdraw)
            setwithdrawvalue(maxwithdraw/1000000);
        }
        else{
            configfile=configfiletau;
            maxwithdraw=stakedbalancetau;
            setwithdrawvalue(maxwithdraw/1000000);
        }
   
      }
const handleChange = (e, i) => {
        const { value,name } = e.target;
        
        console.log("newState",value);
        setStakevalue(value);
      
      
        
      };   
      const handleChange2 = (e, i) => {
        const { value,name } = e.target;
        
        console.log("newState",value);

        setwithdrawvalue(value);
      
        
      };   
      
      
      const [hdropdown, sethdropdown] = useState(false); 
      const handleDropdown = () => sethdropdown(!hdropdown);

    return(


<Accordion defaultActiveKey="">
                    <Accordion.Item className='mb-24' eventKey="0">
                        <Accordion.Header>
                            <div className="acc-title me-2 d-flex align-items-center">
                                <img src={props.x.image1name} alt="logo" />
                                <span className='ms-3'>{props.x.Farmname} <br /><Badge bg='success'>SINGLE ASSET STAKING</Badge></span>
                            </div>

                            <div className="ms-auto flex-grow-1 pe-md-4 justify-content-between d-flex align-items-center">
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                         Staked
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                    {props.x.Farmname==="ELEM"?(<>
                                            {isNaN(parseFloat((parseFloat(stakedbalanceelem/1000000)))) ? 0.00 : parseFloat((parseFloat(stakedbalanceelem/1000000))).toFixed(2)}
                                            </>):(<>
                                                {isNaN(parseFloat((parseFloat(stakedbalancetau/1000000)))) ? 0.00 : parseFloat((parseFloat(stakedbalancetau/1000000))).toFixed(2)}
                                            </>)}
                                    </h5>
                                </div>
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        Rewards Allocated
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                    {props.x.Farmname==="ELEM"?(<>
                                            {isNaN(parseFloat((parseFloat(Totalrewardallocatedelem/1000000)))) ? 0.00 : parseFloat((parseFloat(Totalrewardallocatedelem/1000000))).toFixed(2)}
                                            </>):(<>
                                                {isNaN(parseFloat((parseFloat(Totalrewardallocatedtau/1000000)))) ? 0.00 : parseFloat((parseFloat(Totalrewardallocatedtau/1000000))).toFixed(2)}
                                            </>)}
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
                                    </h5>
                                </div>
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                       Rewards Pending
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                    {props.x.Farmname==="ELEM"?(<>
                                            {parseFloat((Totalrewardallocatedelem-(totalsulcelem-totalsulelem))/1000000).toFixed(2)}
                                            </>):(<>
                                                {parseFloat((Totalrewardallocatedtau-(totalsulctau-totalsultau))/1000000).toFixed(2)}
                                            </>)}
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
                                    </h5>
                                </div>
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        TVL 
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                    {props.x.Farmname==="ELEM"?(<>
                                      {isNaN(parseFloat((parseFloat(TotalStakeelem/1000000)))) ? 0.00 : parseFloat((parseFloat(TotalStakeelem/1000000))).toFixed(2)}
                                            </>):(<>
                                                {isNaN(parseFloat((parseFloat(TotalStaketau/1000000)))) ? 0.00 : parseFloat((parseFloat(TotalStaketau/1000000))).toFixed(2)}
                                            </>)}
                                    </h5>
                                </div>
                            </div>
                        </Accordion.Header>
                        <Accordion.Body>
                        {/* <Row className='row-divider'>
                                        <Col md={5}>
                          
                                            </Col>
                                            </Row> */}
                            <div className="d-flex align-items-center flex-wrap justify-content-md-end justify-content-center mb-4 mt-1 acc-h-links">
                            {props.x.Farmname==="ELEM" ?(<>
                              {localStorage.getItem("walletAddress")?(<>
                              
                                {appOpted ?(<>
                              <div className="flex-start"  > 
                            <ButtonLoad   className='btn btn-blue my-1 disabled'>
                                                App Optin
                                            </ButtonLoad>
                                            </div>&nbsp;&nbsp;
                            
                            </>):(<>
                              <div className="flex-start"  > 
                         
                         <ButtonLoad loading={loaderAppoptin}  className='btn my-1 btn-blue' onClick={()=>optin(props.x.Farmname)}>
                                             App Optin
                                         </ButtonLoad>
                                         </div>&nbsp;&nbsp;
                            
                            
                            </>)}
                              
                              
                              </>):(<>
                              
                                <div className="flex-start"  > 
                            <ButtonLoad   className='btn btn-blue my-1 disabled'>
                                                App Optin
                                            </ButtonLoad>
                                            </div>&nbsp;&nbsp;
                              
                              </>)}
                            
                            
                            </>):(<>
                              {localStorage.getItem("walletAddress")?(<>
                                {appOptedtau ?(<>
                              
                              <div className="flex-start"  > 
                            <ButtonLoad   className='btn btn-blue my-1 disabled'>
                                                App Optin
                                            </ButtonLoad>
                                            </div>&nbsp;&nbsp;
                            
                            </>):(<>
                              <div className="flex-start"  > 
                         
                         <ButtonLoad loading={loaderAppoptin}  className='btn my-1 btn-blue' onClick={()=>optin(props.x.Farmname)}>
                                             App Optin
                                         </ButtonLoad>
                                         </div>&nbsp;&nbsp;
                            
                            
                            </>)}
                                
                                
                                </>):(<>
                                
                                
                                
                                  <div className="flex-start"  > 
                            <ButtonLoad   className='btn btn-blue my-1 disabled'>
                                                App Optin
                                            </ButtonLoad>
                                            </div>&nbsp;&nbsp;
                                
                                </>)}
                             
                            
                            
                            
                            
                            
                            </>)}
                           
                            {localStorage.getItem("walletAddress")?(<>
                              {assetOpt ?(<>
                                              <div className="flex-start"  > 
                            <ButtonLoad   className='btn btn-blue my-1 disabled'>
                                                Asset Optin
                                            </ButtonLoad>
                                            </div>&nbsp;&nbsp;
                           
                           </>):(<>
                           
                            <div className="flex-start"  > 
                            <ButtonLoad loading={loaderAssetoptin}  className='btn my-1 btn-blue' onClick={()=>assetoptin()}>
                                                Asset Optin
                                            </ButtonLoad>
                                            </div>&nbsp;&nbsp;
                           
                           </>)}
                            
                            
                            </>):(<>
                            
                              <div className="flex-start"  > 
                            <ButtonLoad   className='btn btn-blue my-1 disabled'>
                                                Asset Optin
                                            </ButtonLoad>
                                            </div>&nbsp;&nbsp;
                            
                            </>)}
                                            

                                         
                                <Dropdown>
                                    <Dropdown.Toggle onMouseEnter={handleDropdown} onMouseLeave={handleDropdown} variant="link" className="text-purple-d d-block p-0 noarrow" id="dropdown-basic">
                                        Staking Details

                                        <svg class="ms-2 mb-1" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#AB9EEB" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#AB9EEB"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#AB9EEB"></path></svg>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu show={hdropdown ? true : false} className='bg-black' align="end">
                                        <h6 className='d-flex mb-4 align-items-center justify-content-between'>My Holdings</h6>

                                        <div className="d-flex align-items-center mb-2 dropdown-row">
                                            <img src={props.x.image1name} alt="logo" />
                                            <strong className='px-2'>{props.x.Farmname}</strong>
                                            {/* <span>{props.x.Farmname}</span> */}
                                            <span className='ms-auto ps-2'>{props.x.Farmname==="ELEM"?(<>
                                            {isNaN(parseFloat((parseFloat(stakedbalanceelem/1000000)))) ? 0.00 : parseFloat((parseFloat(stakedbalanceelem/1000000)))}
                                            </>):(<>
                                                {isNaN(parseFloat((parseFloat(stakedbalancetau/1000000)))) ? 0.00 : parseFloat((parseFloat(stakedbalancetau/1000000)))}
                                            </>)}</span>
                                        </div>
                                        
                                        <hr className='my-4' />
                                        
                                        <h6 className='d-flex mb-4 align-items-center justify-content-between'>ELEM Earned</h6>
                                        <div className="d-flex align-items-center mb-2 dropdown-row">
                                            <img src={props.x.image1name} alt="logo" />
                                            <strong className='px-2'>ELEM</strong>
                                            {/* <span>ELEM</span> */}
                                            <span className='ms-auto ps-2'>{props.x.Farmname==="ELEM"?(<>
                                              {rewardcalcelem ? rewardcalcelem : '0.00'}
                                            
                                            
                                            </>):(<> {rewardcalctau ? rewardcalctau : '0.00'} </>)}</span>
                                        </div>
                                    </Dropdown.Menu>
                                </Dropdown>

                                {/* <h6 className='sub-heading ms-md-4 ms-3 d-flex mb-0'>
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
                                            <svg className="tooltip-icon ms-2 mb-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                        </OverlayTrigger>
                                </h6>  */}

                                <h6 className='sub-heading  ms-md-4 ms-3 d-flex mb-0'>
                                   Current APY 
                                    <OverlayTrigger
                                        key="left"
                                        placement="left"
                                        overlay={
                                            <Tooltip id={`tooltip-left`}>
                                                <strong className='text-purple'>    {props.x.Farmname==="ELEM"?(<>
                                                  {parseFloat(apyelem)===Infinity||isNaN(parseFloat((parseFloat(apyelem)))) ? 0.00 : parseFloat((parseFloat(apyelem))).toFixed(2)}%
                                            </>):(<>
                                              {parseFloat(apytau)===Infinity||isNaN(parseFloat((parseFloat(apytau)))) ? 0.00 : parseFloat((parseFloat(apytau))).toFixed(2)}%
                                            </>)}</strong><br /><br />
                                                {/* <strong className='text-purple'>1.</strong> Lorem, ipsum dolor sit amet consectetur adipisicing elit. <br /><br /><strong className='text-purple'>2.</strong> Lorem, ipsum dolor sit amet consectetur adipisicing elit. */}
                                            </Tooltip>
                                        }
                                        >
                                            <svg className="tooltip-icon ms-2 mb-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                        </OverlayTrigger>
                                </h6>   
                            </div>
                            <div className="tab-content">
                                
                            <Row className='row-divider'>
                                        <Col md={5}>
                                     
                                            <h6><span className='text-sm text-gray-d'>Your {props.x.Farmname} Balance: </span>
                                            {props.x.Farmname==="ELEM"?(<>
                                            
                                              {parseFloat(balanceelem/1000000)===Infinity||isNaN(parseFloat((parseFloat(balanceelem/1000000)))) ? 0.00 : parseFloat((parseFloat(balanceelem/1000000))).toFixed(2)}
                                            </>):(<>
                                            
                                            {parseFloat(balancetau/1000000)===Infinity||isNaN(parseFloat((parseFloat(balancetau/1000000)))) ? 0.00 : parseFloat((parseFloat(balancetau/1000000))).toFixed(2)}
                                            </>)}
                                            </h6>
                                            <Row className='flex-nowrap mb-2 gx-3'>
                                                <Col>
                                                    <InputGroup className='input-group-max'>
                                                        <FormControl
                                                            type='number'
                                                            pattern="[0-9]*"
                                                            id="tid1"
                                                            placeholder="0.00"
                                                            aria-label="Recipient's username"
                                                            aria-describedby="basic-addon2"
                                                            value={stakevalue}
                                                           onChange={(e) => handleChange(e)}
                                                        />
                                                        <Button variant="outline-purple"  className='btn-xs-d '  onClick={()=>Max(props.x.Farmname)}>Max</Button>
                                                    </InputGroup>
{/* <InputGroup type="number" pattern="[0-9]*" id="tid1" className=" input-group-field" maxlength="5" onChange={(e) => handleChange(e)}>
                        <Form.Control
                            placeholder='Enter Amount'
                        />
                            <Button variant="outline-purple"  className='btn-xs-d disabled'>Max</Button>
                        </InputGroup> */}


                                                </Col>
                                                <Col xs="auto">
                                                  {props.x.Farmname==="ELEM"?(<>
                                                  {appOpted ?(<>
                                                  {assetOpt ?(<>
                                                    <ButtonLoad loading={loaderstake} className='btn btn-blue' onClick={()=>stake(props.x.Farmname)}>
                                                        Stake
                                                    </ButtonLoad>
                                                  
                                                  </>):(<>
                                                    <ButtonLoad loading={loaderstake} className='btn btn-blue disabled'>
                                                        Stake
                                                    </ButtonLoad>

                                                  
                                                  </>)}
                                                  
                                                  
                                                  </>):(<>
                                                  
                                                    <ButtonLoad loading={loaderstake} className='btn btn-blue disabled'>
                                                        Stake
                                                    </ButtonLoad>

                                                  
                                                  </>)}
                                                </>):(<>
                                                  {appOptedtau ?(<>
                                                  {assetOpt ?(<>
                                                    <ButtonLoad loading={loaderstake} className='btn btn-blue' onClick={()=>stake(props.x.Farmname)}>
                                                        Stake
                                                    </ButtonLoad>
                                                  
                                                  </>):(<>
                                                    <ButtonLoad loading={loaderstake} className='btn btn-blue disabled'>
                                                        Stake
                                                    </ButtonLoad>

                                                  
                                                  </>)}
                                                  
                                                  
                                                  </>):(<>
                                                  
                                                    <ButtonLoad loading={loaderstake} className='btn btn-blue disabled'>
                                                        Stake
                                                    </ButtonLoad>

                                                  
                                                  </>)}
                                                
                                                </>)}
                                                    
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col md={5}>
                                            <h6><span className='text-sm text-gray-d' >{props.x.Farmname} Staked: </span>{props.x.Farmname==="ELEM"?(<>
                                              {parseFloat(stakedbalanceelem/1000000)===Infinity||isNaN(parseFloat((parseFloat(stakedbalanceelem/1000000)))) ? 0.00 : parseFloat((parseFloat(stakedbalanceelem/1000000))).toFixed(2)}
                                            </>):(<>
                                              {parseFloat(stakedbalancetau/1000000)===Infinity||isNaN(parseFloat((parseFloat(stakedbalancetau/1000000)))) ? 0.00 : parseFloat((parseFloat(stakedbalancetau/1000000))).toFixed(2)}
                                            </>)}</h6>
                                            <Row className='flex-nowrap mb-2 gx-3'>
                                                <Col>
                                                    <InputGroup className='input-group-max'>
                                                        <FormControl
                                                            type="number"
                                                            pattern="[0-9]*"
                                                             id="tid2"
                                                            placeholder="0.00"
                                                            aria-label="Recipient's username"
                                                            aria-describedby="basic-addon2"
                                                            value={withdrawvalue}
                                                            onChange={(e) => handleChange2(e)}
                                                        />
                                                        <Button variant="outline-purple" className='btn-xs-d '  onClick={()=>Maxwithdraw(props.x.Farmname)}>Max</Button>
                                                    </InputGroup>


                                                </Col>
                                                <Col xs="auto">
                                                {props.x.Farmname==="ELEM"?(<>
                                                  {stakedbalanceelem === 0 || stakedbalanceelem ==="" || stakedbalanceelem ===undefined || stakedbalanceelem === null||isNaN(stakedbalanceelem)?(<>
                                                    <ButtonLoad loading={loaderunstake}  className='btn btn-blue disabled' >
                                                        Unstake
                                                    </ButtonLoad>
                                                  
                                                  </>):(<>
                                                  
                                                    <ButtonLoad loading={loaderunstake}  className='btn btn-blue' onClick={()=>unstake(props.x.Farmname)}>
                                                        Unstake
                                                    </ButtonLoad>
                                                  
                                                  </>)}
                                                
                                                </>):(<>
                                                  {stakedbalancetau === 0 || stakedbalancetau ==="" || stakedbalancetau ===undefined || stakedbalancetau === null||isNaN(stakedbalancetau)?(<>
                                                    <ButtonLoad loading={loaderunstake}  className='btn btn-blue disabled' >
                                                        Unstake
                                                    </ButtonLoad>
                                                  
                                                  </>):(<>
                                                    <ButtonLoad loading={loaderunstake}  className='btn btn-blue' onClick={()=>unstake(props.x.Farmname)}>
                                                        Unstake
                                                    </ButtonLoad>
                                                  
                                                  </>)}
                                                 
                                                
                                                </>)}
                                                   
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col md={2}>
                                         
                                            <h6><span className='text-sm text-gray-d'>ELEM Earned: </span>{props.x.Farmname==="ELEM"?(<>
                                                {/* {rewardBool === true ? (<>{rewardcalcelem}</>) : (<>{0.00}</>)} */}
                                                {rewardcalcelem ? rewardcalcelem : '0.00'}
                                            
                                            </>):(<>  {rewardcalctau ? rewardcalctau : '0.00'} </>)} </h6>
                                            {props.x.Farmname==="ELEM"?(<>
                                                {rewardcalcelem === 0 || rewardcalcelem ==="" || rewardcalcelem ===undefined || rewardcalcelem === null||isNaN(rewardcalcelem)?(<>
                                                <Button  className='btn btn-blue disabled'>
                                                Claim
                                            </Button>
                                            </>):(<>
                                                <ButtonLoad loading={loaderclaim} className='btn btn-blue' onClick={()=>Claimreward(props.x.Farmname)}>
                                                Claim
                                            </ButtonLoad>
                                            
                                            </>)}
                                            
                                            
                                            </>):(<>
                                                {rewardcalctau === 0 || rewardcalctau ==="" || rewardcalctau ===undefined || rewardcalctau === null||isNaN(rewardcalctau)?(<>
                                                <Button  className='btn btn-blue disabled'>
                                                Claim
                                            </Button>
                                            </>):(<>
                                                <Button  loading={loaderclaim} className='btn btn-blue' onClick={()=>Claimreward(props.x.Farmname)}>
                                                Claim
                                            </Button>
                                            
                                            </>)}
                                            
                                            
                                            
                                            
                                            
                                            </>)
                                           }
                                           
                                        </Col>
                                    </Row>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
               ) }
               export default Stakecard;