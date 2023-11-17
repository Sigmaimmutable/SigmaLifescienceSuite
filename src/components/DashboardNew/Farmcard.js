import React, { useState,useEffect } from 'react';
import { Accordion, Badge, Button, Col, Container, Dropdown, Form, FormControl, InputGroup, OverlayTrigger, Row, Tab, Tabs, Tooltip } from 'react-bootstrap';
import Layout from './LayoutT';

import USDC from '../../assets/images/usdc.jpg';
import Icon1 from '../../assets/images/elem-original.png';
import Icon2 from '../../assets/images/algorand-logo.png';
import elementLogo from '../../assets/images/favicon.ico';
import elemLogo from '../../assets/images/modal-square-logo.png';
import Icon3 from '../../assets/images/tau-original.png';
import Icon4 from '../../assets/images/EINR-original.png';
// import { Link } from 'react-router-dom';
import MyAlgoConnect from '@randlabs/myalgo-connect';
import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';
import "../toast-style-override.css"
import configfileelemalgo from "../../stakingelemalgoconfig.json";
import configfileeinralgo from "../../stakingFarmEinrAlgo.json";
import ButtonLoad from 'react-bootstrap-button-loader';
import node from './nodeapi.json';
import { AppId,escrowProgram,escrowProgram2,elemToken } from '../swapConfig';
import WalletConnect from "@walletconnect/client";
import { getpostdatafilter } from '../../firedbstore';
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import { formatJsonRpcRequest } from "@json-rpc-tools/utils";
import { dualwalletconnect } from './walletconnection';
import {amount_out_with_slippage,minAlgoBalance,assetUnitName,swapinput,walletBalance,amount1_input,asset1_price,assert3Reserve,assert1Reserve,assert2Reserve,escrowdatacompile,checkassetin,escrowdata,asset2_price,updatealgobalance} from '../formula';
import { checkotp,assetOptin,priceOfCoin1,priceOfCoin2,find_balance,find_balance_escrow,convert1,convert2,readingLocalstate,assetName,decodLocalState } from '../formula';
const algosdk = require('algosdk');
const algodClientGet = new algosdk.Algodv2('', node['algodclient'], '');
const algodClient = new algosdk.Algodv2('', node['algodclient'], '');
const indexClient = new algosdk.Indexer('', node['indexerclient'], '');
const myAlgoWallet = new MyAlgoConnect({ disableLedgerNano: false });
const bridge = "https://bridge.walletconnect.org";
const myAlgoConnect = new MyAlgoConnect();
const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
let appID_global = AppId;
let data = escrowProgram;
function Farmcard (props) {
  useEffect(() => {
    document.title = "Sigma | Farm"
}, [])
    const [val, setVal] = useState('');
    const [swicth, setSwitch] = useState(true);
    const [receive, setReceive] = useState('Wone');
    const handleToggle = () => setSwitch(!swicth);
//ELEMALGO
const[stakedbalanceelemalgo,setStakedBalanceelemalgo] = useState("");
const[globalstakeelemalgo,setGlobalStakeelemalgo] = useState('');
const[totalsulelemalgo,settotalsulelemalgo] = useState('');
const[totalsulcelemalgo,settotalsulcelemalgo] = useState('');
const[Totalrewardallocatedelemalgo,setTotalrewardallocatedelemalgo] = useState('');
const[rewardcalcelemalgo,setrewardcalculationelemalgo]=useState('');
const[TotalStakeelemalgo,setTotalStakeelemalgo] = useState("");
const[balanceelemalgo,setBalanceelemalgo] = useState([]);
const[apyelemalgo,setApyELEMalgo]=useState("");
const[Totalrewardelemalgo,setTotalrewardELEMalgo] = useState('');

//EINRALGO
const[stakedbalanceeinralgo,setStakedBalanceeinralgo] = useState("");
const[globalstakeeinralgo,setGlobalStakeeinralgo] = useState('');
const[totalsuleinralgo,settotalsuleinralgo] = useState('');
const[totalsulceinralgo,settotalsulceinralgo] = useState('');
const[Totalrewardallocatedeinralgo,setTotalrewardallocatedeinralgo] = useState('');
const[rewardcalceinralgo,setrewardcalculationeinralgo]=useState('');
const[TotalStakeeinralgo,setTotalStakeeinralgo] = useState("");
const[balanceeinralgo,setBalanceeinralgo] = useState([]);
const[apyeinralgo,setApyeinralgo]=useState("");
const[Totalrewardeinralgo,setTotalrewardeinralgo] = useState('');
const[totalvaluelockedeinralgo,setTVLeinralgo]=useState("");
//LIQUIDITY
const[balancealgo,setbalanceofalgo]= useState("");
const[balanceofleem,setbalanceofelem]= useState("");
const[balanceofleinr,setbalanceofeinr]= useState("");
const[tokId1,setTokId1] = useState(0)  //TokId1
const[tokId2,setTokId2] = useState()  //TokId2
const[tokName1,setTokName1] = useState("ALGO")  //Tok Name 1
const[tokName2,setTokName2] = useState()  //Tok Name 2
const[tokLogo2,setTokLogo2] = useState() //Tok logo 2
//const[tokBalance1,setTokBalance1] = useState()  //Tok Balance 1
//const[tokBalance2,setTokBalance2] = useState() //Tok Balance 2
const[assetoptin1,setAssetOptin1] = useState(false);
const[assetoptin2,setAssetOptin2] = useState(false);
const[assetoptin3,setAssetOptin3] = useState(false);
const[sout1,setsout1] = useState("");
const[sout2,setsout2] = useState("");
const[rs1value,setrsvalue1] = useState("")
const[rs2value,setrsvalue2] = useState("")
const[rs3value,setrsvalue3] = useState("")
const[rs1valueeinr,setrsvalueEINRALGO1] = useState("")
const[rs2valueeinr,setrsvalueEINRALGO2] = useState("")
const[rs3valueeinr,setrsvalueEINRALGO3] = useState("")
const[fee,setfees] = useState(0.05);

const[decl1,setdeclaring1]=useState("");
const[decl2,setdeclaring2] = useState("");
const[samount1,setsamount1] = useState("");
const[samount2,setsamount2] = useState("");
const[AssWithFee,setasswithfee] = useState("");
const[swf,setswf] = useState("");
const[minbalance,setminbalance]= useState("");
const [enoughbalance, setenoughbalance] = useState(false);
const[swapdetail,setswapdetail]= useState(false);
const[sufficient,setsufficient]= useState(false);
const[nolPair,setNoLPair]= useState(false);
const[balanceid1,setbamalanceid1]= useState("");

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


//GENERAL
const [minAlgo, setMinAlgo] = useState("");
const[rewardamountbalance,setrewardBalance] = useState([]);
const[globaltime,setGlobalTime] = useState('');
const[usertime,setusertime] = useState('');
const[rewardupdatetime,setrewardupdatetime]=useState("");
const [usertimeset,setusertimecheck]=useState("");
const[rewardBool,setRewardBool]=useState(false);
const [state, setState] = useState("");

const [stakevalue,setStakevalue] = useState("");
const [withdrawvalue,setwithdrawvalue] = useState("");
const [connector, setConnector] = useState("");
const [accounts, setaccount] = useState("");
const [assetUsdcOpt, setAssetUsdcOpt] = useState(false);
const [assetElemOpt, setAssetElemOpt] = useState(false);
const [appOpt, setAppOpt] = useState(false);
const[appOpted,setOpted] = useState(false);
const[appOptedeinralgo,setOptedeinralgo] = useState(false);
const [assetOpt,setToAssetOpt] = useState(false);
const [assetOptLP,setToAssetOptLP] = useState(false);
const [assetOptLPeinralgo,setToAssetOptLPeinralgo] = useState(false);
const [appOptedLp,setOptedLp] = useState(false);

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

    const[loaderAppoptinlp, setLoaderAppoptinlp] = useState(false);
    const handleShowLoadAppoptinlp = () => setLoaderAppoptinlp(true);
    const handleHideLoadAppoptinlp = () => setLoaderAppoptinlp(false);
    console.log("rsval1",rs1value);
    const[loader, setLoader] = useState(false);
    const handleShowLoad = () => setLoader(true);
    const handleHideLoad = () => setLoader(false);
    //FOR ELEMALGO
   useEffect(() => {
    fetchPostsELEMALGO();
  }, [rewardcalcelemalgo]);
  const fetchPostsELEMALGO = async () => {
    // read local state of application from user account
callvalalgoelem(configfileelemalgo.assetidelem,configfileelemalgo.assetidalgo);
let accountInfoResponse = await algodClientGet.accountInformation(localStorage.getItem("walletAddress")).do();
console.log("configfile1",configfileelemalgo.applicationid);
let appById = await algodClientGet.getApplicationByID(parseInt(configfileelemalgo.applicationid)).do();

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
         
         setGlobalStakeelemalgo(appById['params']['global-state'][i]['value']['uint']);
         
         }
         
         if(appById['params']['global-state'][i]['key']=== "R0E="){
           setTotalStakeelemalgo(appById['params']['global-state'][i]['value']['uint']);
           
           console.log("checktvl",appById['params']['global-state'][i]['value']['uint'])
         }
       if(appById['params']['global-state'][i]['key']==="VFNVTA=="){
           totalsulnew =appById['params']['global-state'][i]['value']['uint'];
           
           settotalsulelemalgo(appById['params']['global-state'][i]['value']['uint']);
           }
           if(appById['params']['global-state'][i]['key']==="VFNVTEM="){
               //totalsulnew =appById['params']['global-state'][i]['value']['uint'];
               
               settotalsulcelemalgo(appById['params']['global-state'][i]['value']['uint']);
               }
       if(appById['params']['global-state'][i]['key']==="VFNM"){
             totalslatelocknew=appById['params']['global-state'][i]['value']['uint'];
             setTotalrewardallocatedelemalgo(appById['params']['global-state'][i]['value']['uint']);
             }   
      }
   

console.log("accinfolocal",accountInfoResponse);
if( accountInfoResponse['apps-local-state'].length === null|| accountInfoResponse['apps-local-state'].length ===undefined||accountInfoResponse['apps-local-state'].length===""){
// alert("check");
}
else{


console.log("User",accountInfoResponse['apps-local-state'].length);
for (let i = 0; i < accountInfoResponse['apps-local-state'].length; i++) { 
 if (accountInfoResponse['apps-local-state'][i].id == parseInt(configfileelemalgo.applicationid)) {
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
          setStakedBalanceelemalgo(accountInfoResponse['apps-local-state'][i]['key-value'][n]['value']['uint']);
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
if (accountInfoResponse['assets'][i]['asset-id'] == parseInt(configfileelemalgo.assetid)) {
 setBalanceelemalgo(accountInfoResponse['assets'][i]['amount']);
 console.log("accountassetid", configfileelemalgo.assetid);
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
setrewardcalculationelemalgo(parseFloat(rewardCalelem));
(rewardcalcelemalgo === 'NaN' || rewardcalcelemalgo=== "" || rewardcalcelemalgo === null || rewardcalcelemalgo === '' || rewardcalcelemalgo === undefined) ? setRewardBool(false) : setRewardBool(true);



};
  //For EINRALGO
   useEffect(() => {
  fetchPostsEINRALGO();
  }, [rewardcalceinralgo]);
  const fetchPostsEINRALGO = async () => {
    // read local state of application from user account
    callvaleinralgo(configfileeinralgo.assetideinr,configfileeinralgo.assetidalgo);
let accountInfoResponse = await algodClientGet.accountInformation(localStorage.getItem("walletAddress")).do();
console.log("configfile1",configfileeinralgo.applicationid);
let appById = await algodClientGet.getApplicationByID(parseInt(configfileeinralgo.applicationid)).do();

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
         setGlobalStakeeinralgo(appById['params']['global-state'][i]['value']['uint']);
         }

         if(appById['params']['global-state'][i]['key']=== "R0E="){
           setTotalStakeeinralgo(appById['params']['global-state'][i]['value']['uint']);
           console.log("checktvl",appById['params']['global-state'][i]['value']['uint'])
         }
       if(appById['params']['global-state'][i]['key']==="VFNVTA=="){
           totalsulnew =appById['params']['global-state'][i]['value']['uint'];
           
           settotalsuleinralgo(appById['params']['global-state'][i]['value']['uint']);
           }
           if(appById['params']['global-state'][i]['key']==="VFNVTEM="){
              // totalsulnew =appById['params']['global-state'][i]['value']['uint'];
               
               settotalsulceinralgo(appById['params']['global-state'][i]['value']['uint']);
               }
       if(appById['params']['global-state'][i]['key']==="VFNM"){
             totalslatelocknew=appById['params']['global-state'][i]['value']['uint'];
             setTotalrewardallocatedeinralgo(appById['params']['global-state'][i]['value']['uint']);
             }   
      }
   

console.log("accinfolocal",accountInfoResponse);
if( accountInfoResponse['apps-local-state'].length === null|| accountInfoResponse['apps-local-state'].length ===undefined||accountInfoResponse['apps-local-state'].length===""){
// alert("check");
}
else{


console.log("User",accountInfoResponse['apps-local-state'].length);
for (let i = 0; i < accountInfoResponse['apps-local-state'].length; i++) { 
 if (accountInfoResponse['apps-local-state'][i].id == parseInt(configfileeinralgo.applicationid)) {
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
          setStakedBalanceeinralgo(accountInfoResponse['apps-local-state'][i]['key-value'][n]['value']['uint']);
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
if (accountInfoResponse['assets'][i]['asset-id'] == parseInt(configfileeinralgo.assetid)) {
 setBalanceeinralgo(accountInfoResponse['assets'][i]['amount']);
 console.log("accountassetid", configfileeinralgo.assetid);
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
console.log("rewardamountcalculationtau",parseFloat(rewardCaltau));
//let rewardcalculation =parseFloat((parseFloat(rewardamountbalance)+(parseFloat((globaltime)-parseFloat(usertime))/60)*parseFloat(stakedbalance)/parseFloat(globalstake))*parseFloat(totalsul)/parseFloat(1000000));
setrewardcalculationeinralgo(parseFloat(rewardCaltau));
(rewardcalceinralgo === 'NaN' || rewardcalceinralgo === "" || rewardcalceinralgo === null || rewardcalceinralgo === '' || rewardcalceinralgo === undefined) ? setRewardBool(false) : setRewardBool(true);



};
 //FOR ELEMALGOAPY
  useEffect(() => {
   
    
    updatealgobalance();
    fetchPostsELEMALGOAPY();
  }, []); 

  const fetchPostsELEMALGOAPY = async () => {
   
  
    let accountInfoResponse1 = await algodClientGet.accountInformation(configfileelemalgo.creatoraddress).do();
    let totalstake1;
    let totalclaimed1;
    for (let i = 0; i < accountInfoResponse1['created-apps'].length; i++) { 
     console.log("Application's global state:");
    if (accountInfoResponse1['created-apps'][i].id == parseInt(configfileelemalgo.applicationid)) {
        console.log("Application's global state:");
        for (let n = 0; n < accountInfoResponse1['created-apps'][i]['params']['global-state'].length; n++) {
            console.log(accountInfoResponse1['created-apps'][i]['params']['global-state'][n]);
            let enc = accountInfoResponse1['created-apps'][i]['params']['global-state'][n];
            console.log("encode",enc);
            var decodedString = window.atob(enc.key);
            if(enc['key'] === "R0E="){
              setTotalStakeelemalgo( accountInfoResponse1['created-apps'][i]['params']['global-state'][n]['value']['uint']);
               totalstake1=accountInfoResponse1['created-apps'][i]['params']['global-state'][n]['value']['uint'];
              console.log("checktvl", accountInfoResponse1['created-apps'][i]['params']['global-state'][n]['value']['uint'])
              
    
              
            }
            if(enc['key'] === "VFNVTEM="){
              setTotalrewardELEMalgo( accountInfoResponse1['created-apps'][i]['params']['global-state'][n]['value']['uint']);
             totalclaimed1= accountInfoResponse1['created-apps'][i]['params']['global-state'][n]['value']['uint']
              console.log("checktvl", accountInfoResponse1['created-apps'][i]['params']['global-state'][n]['value']['uint'])
            }
            if(enc['key'] === "VFNM"){
              setTotalrewardallocatedelemalgo( accountInfoResponse1['created-apps'][i]['params']['global-state'][n]['value']['uint']);
              console.log("checktvl", accountInfoResponse1['created-apps'][i]['params']['global-state'][n]['value']['uint'])
            }
    
    
            var principal =	((totalstake1)/1000000) * (configfileelemalgo.price) * 10 ** 6;
              console.log("principal",principal)
              var interest  = ((totalclaimed1)/1000000) * 0.4 * 3 * 10 ** 6;
              console.log("interest",interest)
              var rate = interest / principal;
              let calapy=((1 + rate / 1) ** 1 - 1) * 100;
              setApyELEMalgo(calapy);
              console.log("apy2",calapy);
        }
        
    }
    }
      
      };
   //FOR EINRALGOAPY
  useEffect(() => {
    
    
  
    fetchPostsEINRALGOAPY();
  }, []);
  const fetchPostsEINRALGOAPY = async () => {
   
  
  let accountInfoResponse1 = await algodClientGet.accountInformation(configfileeinralgo.creatoraddress).do();
  let totalstake1;
  let totalclaimed1;
  for (let i = 0; i < accountInfoResponse1['created-apps'].length; i++) { 
   console.log("Application's global state:");
  if (accountInfoResponse1['created-apps'][i].id == parseInt(configfileeinralgo.applicationid)) {
      console.log("Application's global state:");
      for (let n = 0; n < accountInfoResponse1['created-apps'][i]['params']['global-state'].length; n++) {
          console.log(accountInfoResponse1['created-apps'][i]['params']['global-state'][n]);
          let enc = accountInfoResponse1['created-apps'][i]['params']['global-state'][n];
          console.log("encode",enc);
          var decodedString = window.atob(enc.key);
          if(enc['key'] === "R0E="){
            setTotalStakeeinralgo( accountInfoResponse1['created-apps'][i]['params']['global-state'][n]['value']['uint']);
             totalstake1=accountInfoResponse1['created-apps'][i]['params']['global-state'][n]['value']['uint'];
            console.log("checktvl", accountInfoResponse1['created-apps'][i]['params']['global-state'][n]['value']['uint'])
            
  
            
          }
          if(enc['key'] === "VFNVTEM="){
            setTotalrewardeinralgo( accountInfoResponse1['created-apps'][i]['params']['global-state'][n]['value']['uint']);
           totalclaimed1= accountInfoResponse1['created-apps'][i]['params']['global-state'][n]['value']['uint']
            console.log("checktvl", accountInfoResponse1['created-apps'][i]['params']['global-state'][n]['value']['uint'])
          }
          if(enc['key'] === "VFNM"){
            setTotalrewardallocatedeinralgo( accountInfoResponse1['created-apps'][i]['params']['global-state'][n]['value']['uint']);
            console.log("checktvl", accountInfoResponse1['created-apps'][i]['params']['global-state'][n]['value']['uint'])
          }
  
  
          var principal =	((totalstake1)/1000000) * (configfileeinralgo.price) * 10 ** 6;
            console.log("principal",principal)
            var interest  = ((totalclaimed1)/1000000) * 0.4 * 3 * 10 ** 6;
            console.log("interest",interest)
            var rate = interest / principal;
            let calapy=((1 + rate / 1) ** 1 - 1) * 100;
            setApyeinralgo(calapy);
            console.log("apy2",calapy);
      }
      
  }
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
        handleHideLoadAppoptinlp();
        handleHideLoad();
      
        await sleep(5000);
          break;
        }
        lastRound++;
        await client.statusAfterBlock(lastRound).do();
      }
    };

    const assetoptin = async(name) => {
        handleShowLoadAssetoptin(); 
        try{
          let  configfile="";
              
              if(name==="ALGO/ELEM"){
               
                  console.log("config",configfileelemalgo);
                  configfile =configfileelemalgo;
              }
              else{
                  configfile=configfileeinralgo;
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
          updatealgobalance();
         // window.location.reload();
         setToAssetOpt(true);
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


   //Lpassetoptin
   const LPassetoptin = async(name) => {
    handleShowLoadAssetoptin(); 
    try{
      let  configfile="";
          
          if(name==="ALGO/ELEM"){
           
              console.log("config",configfileelemalgo);
              configfile =configfileelemalgo;
          }
          else{
              configfile=configfileeinralgo;
          }
    const algosdk = require('algosdk');
   //const algodclient = new algosdk.Algodv2('', 'https://api.testnet.algoexplorer.io/', '');
    const myAlgoConnect = new MyAlgoConnect();
    const params = await algodClient.getTransactionParams().do();
    const assetoptin1 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from: localStorage.getItem("walletAddress"),
      to: localStorage.getItem("walletAddress"),
      assetIndex: parseInt(configfile.assetid),
      note: undefined,
      amount: 0,
      suggestedParams: params
      });
      let transid=await dualwalletconnect(assetoptin1);
      await waitForConfirmation(algodClient, transid);
      updatealgobalance();
      if(name==="ALGO/ELEM"){
        setToAssetOptLP(true);
    }
    else{
      setToAssetOptLPeinralgo(true);
    }
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
            
            if(name==="ALGO/ELEM"){
             
                console.log("config",configfileelemalgo.applicationid);
                configfile =configfileelemalgo.applicationid;
            }
            else{
                configfile=configfileeinralgo.applicationid;
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
               if(name==="ALGO/ELEM"){
                setOpted(true);
            }
            else{
              setOptedeinralgo(true);
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
              if(name==="ALGO/ELEM"){
                setOpted(true);
            }
            else{
              setOptedeinralgo(true);
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
      

//Lpappoptin
      const LpAPPoptin=async(name)=>{

        handleShowLoadAppoptinlp();
        try{   
            let  configfile="";
            
            if(name==="ALGO/ELEM"){
             
                //console.log("config",configfileelemalgo.applicationid);
                configfile =configfileelemalgo.LpAPP;
            }
            else{
                configfile=configfileeinralgo.LpAPP;
            }
            console.log("configfile",configfile);
           
          if(parseFloat(minAlgo) < 101000 + 628000)
                          {
                              toast.error("Your Algo balance is low. Please get more Algos from dispenser.")
                              handleHideLoadAppoptinlp();
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
               if(name==="ALGO/ELEM"){
                setOptedLp(true);
            }
            else{
              setOptedLp(true);
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
              if(name==="ALGO/ELEM"){
                setOptedLp(true);
            }
            else{
              setOptedLp(true);
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
      const stake = async(name) => {
        handleShowLoadstake();
        
         // console.log("stakevaul1",stakevalue);
         // console.log("balancevalue1",balance);
         let  configfile="";
         let balance=""  ; 
             if(name==="ALGO/ELEM"){
                 balance=balanceelemalgo;
                 
                 console.log("config",configfileelemalgo);
                 configfile =configfileelemalgo;
             }
             else{
                 configfile=configfileeinralgo;
                 balance=balanceeinralgo;
             }
             
       console.log("balancecheck",balance);
         if(stakevalue===0||stakevalue==="0"||stakevalue===null||stakevalue==="" ||stakevalue <= 0){
          
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
               updatealgobalance();
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
              // localStorage.setItem("Staked","stakedbalance");
              await updatealgobalance();
              setStakevalue(" ");
             
              if(name==="ALGO/ELEM"){
                fetchPostsELEMALGO();
                fetchPostsELEMALGOAPY();
            }
            else{
               fetchPostsEINRALGO();
               fetchPostsEINRALGOAPY();
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
              setStakevalue(" ");
            
        
           // localStorage.setItem("Staked","stakedbalance");
           //window.location.reload();
           if(name==="ALGO/ELEM"){
            fetchPostsELEMALGO();
            fetchPostsELEMALGOAPY();
        }
        else{
           fetchPostsEINRALGO();
           fetchPostsEINRALGOAPY();
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
        if(name==="ALGO/ELEM"){
            stakedbalance=stakedbalanceelemalgo;
            // alert("checking1");
            console.log("config",configfileelemalgo);
            configfile =configfileelemalgo;
        }
        else{
            configfile=configfileeinralgo;
            stakedbalance=stakedbalanceeinralgo;
        }
    console.log("configfile",configfile.applicationid);
    if(withdrawvalue===0||withdrawvalue==="0"||withdrawvalue===null||withdrawvalue===""||withdrawvalue <= 0){
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
    setwithdrawvalue("");
   
    if(name==="ALGO/ELEM"){
      fetchPostsELEMALGO();
      fetchPostsELEMALGOAPY();
  }
  else{
     fetchPostsEINRALGO();
     fetchPostsEINRALGOAPY();
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
        setwithdrawvalue("");
       
      if(name==="ALGO/ELEM"){
          setStakedBalanceelemalgo(true);
      }
      else{
         setStakedBalanceeinralgo(true);
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
        if(name==="ALGO/ELEM"){
           
            console.log("config",configfileelemalgo);
            configfile =configfileelemalgo;
            rewardcalc=rewardcalcelemalgo;
        }
        else{
            configfile=configfileeinralgo;
            rewardcalc=rewardcalceinralgo;
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
   
  
  //let lsig = algosdk.makeLogicSig(program);
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
            if(name==="ALGO/ELEM"){
              fetchPostsELEMALGO();
              fetchPostsELEMALGOAPY();
          }
          else{
             fetchPostsEINRALGO();
             fetchPostsEINRALGOAPY();
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
            if(name==="ALGO/ELEM"){
              fetchPostsELEMALGO();
              fetchPostsELEMALGOAPY();
          }
          else{
             fetchPostsEINRALGO();
             fetchPostsEINRALGOAPY();
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
    const Max = async(name) => {
        let  configfile="";
        let maxvalue= ""  ; 
            if(name==="ALGO/ELEM"){
               
                //alert("checking1");
                configfile =configfileelemalgo;
                maxvalue=balanceelemalgo;
                console.log("maxvalue",maxvalue)
                setStakevalue(maxvalue/1000000);
            }
            else{
                configfile=configfileeinralgo;
                maxvalue=balanceeinralgo;
                setStakevalue(maxvalue/1000000);
            }
   
      
      
       }
   const Maxwithdraw = async(name) => {
       let  configfile="";
       let maxwithdraw=""  ; 
           if(name==="ALGO/ELEM"){
              
            //    alert("checking1");
               configfile =configfileelemalgo;
               maxwithdraw=stakedbalanceelemalgo;
               console.log("maxwithdraw",maxwithdraw)
               setwithdrawvalue(maxwithdraw/1000000);
           }
           else{
               configfile=configfileeinralgo;
               maxwithdraw=stakedbalanceeinralgo;
               setwithdrawvalue(maxwithdraw/1000000);
           }
      
         }
        //  useEffect(() => {
        //     const fetchPosts = async (name) => {
        //       let  configfile="";
             
        //          if(name==="ALGO/ELEM"){
                    
                     
        //              console.log("config",configfileelemalgo);
        //              configfile =configfileelemalgo;
        //              setOpted(await checkotp(configfile.applicationid));
        //              setToAssetOpt(await assetOptin(configfile.rewardassetid));
        //          }
        //          else{
        //              configfile=configfileeinralgo;
        //              setOpted(await checkotp(configfile.applicationid));
        //              setToAssetOpt(await assetOptin(configfile.rewardassetid));
        //          }
           
              
        //     };
        //     fetchPosts();
        //   }, []);

          useEffect(() => {
            const fetchPosts = async () => {
                
                     setOpted(await checkotp(configfileelemalgo.applicationid));
                     setToAssetOpt(await assetOptin(configfileelemalgo.rewardassetid));
                     setOptedLp(await checkotp(configfileeinralgo.LpAPP));
                     setToAssetOptLP(await assetOptin(configfileelemalgo.assetid));
            };
            fetchPosts();
          }, []);

          useEffect(() => {
            const fetchPosts = async () => {
                
                     setOptedeinralgo(await checkotp(configfileeinralgo.applicationid));
                     setToAssetOpt(await assetOptin(configfileeinralgo.rewardassetid));
                     setOptedLp(await checkotp(configfileeinralgo.LpAPP));
                     setToAssetOptLPeinralgo(await assetOptin(configfileeinralgo.assetid));
           
              
            };
            fetchPosts();
          }, []);

          


          // useEffect(() => {
          //   const fetchPosts = async (name) => {
          //     let  configfile="";
             
          //        if(name==="ALGO/ELEM"){
                    
                     
          //            console.log("config",configfileelemalgo);
          //            configfile =configfileelemalgo;
                    
          //            setToAssetOptLP(await assetOptin(configfile.assetid));
          //        }
          //        else{
          //            configfile=configfileeinralgo;
                    
          //            setToAssetOptLP(await assetOptin(configfile.assetid));
          //        }
           
              
          //   };
          //   fetchPosts();
          // }, []);


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
 
/**LIQUIDITY */
  //liquidity functionality
  //elemalgo
  const checkbalanelemalgo = async()=>{
    //console.log("balance",id1Token)
    // let s1 = await find_balance(configfileelemalgo.assetidalgo);
    // setbalanceofalgo(s1);
   
    // let s2 = await find_balance(configfileelemalgo.assetidelem);
    // setbalanceofelem(s2);
 
    let [b1,s1] = await walletBalance(configfileelemalgo.assetidalgo);
    let [b2,s2] = await walletBalance(configfileelemalgo.assetidelem);
    setbalanceofalgo(b1);
    setbalanceofelem(b2);
    //console.log("balance",s2,id2Token)
  }


  const checkbalanceeinralgo = async()=>{
    //console.log("balance",id1Token)
    // let s1 = await find_balance(configfileelemalgo.assetidalgo);
    // setbalanceofalgo(s1);
   
    // let s2 = await find_balance(configfileelemalgo.assetidelem);
    // setbalanceofelem(s2);
 
    let [b1,s1] = await walletBalance(configfileeinralgo.assetidalgo);
    let [b2,s2] = await walletBalance(configfileeinralgo.assetideinr);
    setbalanceofalgo(b1);
    setbalanceofeinr(b2);
    //console.log("balance",s2,id2Token)
  }
  useEffect(() => {
    checkbalanelemalgo();
    checkbalanceeinralgo();
  }, []);

  
  const callvalalgoelem=async(id1,id2)=>{
   
    let [rs1,rs2,liq,assetid3,rs3] = await swapinput(appID_global,id1,id2);         
   //setas3Id(assetid3);

    setrsvalue1(rs1);
    setrsvalue2(rs2);
    setrsvalue3(rs3);
   
}
const callvaleinralgo=async(id1,id2)=>{
   
    let [rs1,rs2,liq,assetid3,rs3] = await swapinput(appID_global,id1,id2);         
   //setas3Id(assetid3);

    setrsvalueEINRALGO1(rs1);
    setrsvalueEINRALGO2(rs2);
    setrsvalueEINRALGO3(rs3);
   
}
  
const liqValue1 = async(v1,check) =>{
 
    if(v1 === 0){
      setliq1(0);
    }
    else{
      setliq1(v1);
    }
    let sr1 ,sr2;
    let minbalance
    let tokBalance1;
    let tokBalance2;
    if(check==="algoelem"){
       minbalance=balancealgo;
       tokBalance1=balancealgo;
       tokBalance2=balanceofleem;
      
        // if(tokId1 > tokId2){
        //     sr1 = rs1value;
        //     sr2 = rs2value;
            
        //   }
          // else{
            sr2 = rs2value;
            sr1 = rs1value;
          // }
        
    }else{
       minbalance=balancealgo;
       tokBalance1=balancealgo;
       tokBalance2=balanceofleinr;

        // if(tokId1 > tokId2){
        //     sr1 = rs1valueeinr;
        //     sr2 = rs2valueeinr;
        //   }
          // else{
            sr2 = rs2valueeinr;
            sr1 = rs1valueeinr;
          // }
    }
   
    let amount2 = convert1((v1 * 1000000),sr1,sr2);
  console.log("Reserves",sr1,sr2,amount2)
   
    let tb,tb1,tb2;
     setliq2(parseFloat(amount2/1000000).toFixed(4));
     {
        if(tokName1 === "ALGO" ){
            if(( 6000 + (v1 * 1000000)) > minbalance || tokBalance2 < amount2 ){
                setminimumBalance(true)
                console.log("minimum")
            }
            else{
                setminimumBalance(false)
                console.log("minimum")
            }
         }
         else if(tokName2 === "ALGO" ){
            if((amount2) > tokBalance2 || minbalance < (6000 + (v1 * 1000000)) ){
                setminimumBalance(true)
                console.log("minimum")
            }
            else{
                setminimumBalance(false)
                console.log("minimum")
            }
         }
         else{
             if(tokBalance1 < (v1*1000000) || tokBalance2 < amount2 ){
                setminimumBalance(true)
                console.log("minimum")
             }
             else{
                setminimumBalance(false)
                console.log("minimum")
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
  let minbalance;
  let  tokBalance1;
  let  tokBalance2;
    let sr1 ,sr2;
    if(check==="algoelem"){
      minbalance=balancealgo;
      tokBalance1=balancealgo;
      tokBalance2=balanceofleem;
        // if(tokId1 > tokId2){
        //     sr1 = rs1value;
        //     sr2 = rs2value;
        //   }
          // else{
            sr2 = rs2value;
            sr1 = rs1value;
          // }

    }else{
      minbalance=balancealgo;
      tokBalance1=balancealgo;
      tokBalance2=balanceofleinr;
        // if(tokId1 > tokId2){
        //     sr1 = rs1valueeinr;
        //     sr2 = rs2valueeinr;
        //   }
          // else{
            sr2 = rs2valueeinr;
            sr1 = rs1valueeinr;
          // }
    }
    
    
  let amount2 = convert2((v2 * 1000000),sr1,sr2);
  console.log("Reserves",sr1,sr2,amount2)
  setliq1(parseFloat(amount2/1000000).toFixed(4))
  let tb,tb1,tb2;
  {
    if(tokName1 === "ALGO" ){
        if(( amount2) > (minbalance - 6000) || tokBalance2 < (v2 * 1000000)){
            setminimumBalance(true)
            console.log("minimum")
        }
        else{
            setminimumBalance(false)
            console.log("minimum")
        }
     }
     else if(tokName2 === "ALGO" ){
        if((amount2) > tokBalance2 || minbalance < (6000 + (v2 * 1000000)) ){
            setminimumBalance(true)
            console.log("minimum")
        }
        else{
            setminimumBalance(false)
            console.log("minimum")
        }
     }
     else{
         if(tokBalance1 < (v2*1000000) || tokBalance2 < amount2 ){
            setminimumBalance(true)
            console.log("minimum")
         }
         else{
            setminimumBalance(false)
            console.log("minimum")
         }
     }
 }

  
  
  }

  const addliquiditycall=async(name)=>{
    if((liq2 === 0||(liq2 *1000000) ===0||liq2 ==="0"||liq2===null||liq2 ==="")&&(liq1 === 0||(liq1 *1000000) ===0||liq1 ==="0"||liq1===null||liq1 ==="")){
      
      toast.error("Please enter an amount greater than 0");
      handleHideLoad();
     
  }
  else if(parseFloat(liq2)>parseFloat(balancealgo/1000000)){
        
    toast.error("You are trying to add  more than your algo balance");
    handleHideLoad();
  }
  else if(name==="ALGO/ELEM"){
      console.log("liqudity1",liq2,liq1);
      console.log("balanceof",balanceofleem,minAlgoBalance);
     
        await  mint21call(appID_global,configfileelemalgo.assetidelem,configfileelemalgo.assetidalgo,(liq1 *1000000),(liq2 *1000000),configfileelemalgo.assetid,rs1value,rs2value);
        checkbalanelemalgo();
        checkbalanceeinralgo();
        await updatealgobalance();
        fetchPostsELEMALGO();
        fetchPostsELEMALGOAPY();
         setliq1("");
        setliq2("");
            
            
              
    }
    else{
       
        await  mint21call(appID_global,configfileeinralgo.assetideinr,configfileeinralgo.assetidalgo,(liq1 *1000000),(liq2 *1000000),configfileeinralgo.assetid,rs1valueeinr,rs2valueeinr); 
        checkbalanelemalgo();
        checkbalanceeinralgo();
        await updatealgobalance();
        fetchPostsEINRALGO();
        fetchPostsEINRALGOAPY();
        updatealgobalance();
        setliq1("");
        setliq2("");
        
      }
  }
  const mint21call = async (appid,asn1,asn2,v1,v2,lpasset,rval1,rval2) => {
    handleShowLoad()
      let index = parseInt(appid);
    console.log("appId inside donate", index);
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
      s1 = rval1;
      s2 =  rval2; 
    }
    else{
      at1 = asn2;
      at2 = asn1;
      // an1 = baname;
      // an2 = aname;
      a1 = v2;
      a2 = v1;
      s2 = rval1;
      s1 =  rval2;
    }
    console.log("tokens",at1,at2,a1,a2)
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
              let ass3id = lpasset;
    
    // let compiled = await readingLocalstate(algodClientGet,results.hash)
    
    let ilt = reserve3;
    console.log("s1values",s1,s2,ilt) 
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
    console.log("input1",i1)
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
      console.log("Total 2: ", total,a1,(a2));
     
    
                            
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

                    await waitForConfirmation(algodClient, response.txId,"Add Liquidity");
                    await updatealgobalance();
                    checkbalanelemalgo();
                   checkbalanceeinralgo();
                    fetchPostsELEMALGO();
                    fetchPostsELEMALGOAPY();
                
                
                   fetchPostsEINRALGO();
                   fetchPostsEINRALGOAPY();
                    updatealgobalance();
                  }
                  else if(localStorage.getItem("walletName") === "PeraWallet"){
                    const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
                    const txns = [txs[0], txs[1], txs[2],txs[3],txs[4]]
                    const txnsToSign = txns.map(txn => {
                      const encodedTxn = Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString("base64");
                      console.log(encodedTxn);
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
                      console.log(result);
                      decodedResult[1] = signedTx3.blob;
                      decodedResult[4] = signedTx4.blob;
                      let response = await algodClient.sendRawTransaction(decodedResult).do()
                    await  getpostdatafilter(parseInt(tokenid1),parseInt(tokenid2),(rs1value+ rs2value),(rs1value+ rs2value + rs3value),amount)

                    await waitForConfirmation(algodClient, response.txId,"Add Liquidity");
                    checkbalanelemalgo();
                    checkbalanceeinralgo();
                    fetchPostsELEMALGO();
                    fetchPostsELEMALGOAPY();
                
                
                   fetchPostsEINRALGO();
                   fetchPostsEINRALGOAPY();
                
                   updatealgobalance();
                  
              
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

                await waitForConfirmation(algodClient, response.txId,"Add liquidity");
                checkbalanelemalgo();
               checkbalanceeinralgo();
               updatealgobalance();
                }
                else if(localStorage.getItem("walletName") === "PeraWallet"){
                  const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
                  const txns = [txs[0], txs[1], txs[2],txs[3],txs[4]]
                  const txnsToSign = txns.map(txn => {
                    const encodedTxn = Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString("base64");
                    console.log(encodedTxn);
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
                    console.log(result);
                    decodedResult[1] = signedTx3.blob;
                    decodedResult[4] = signedTx4.blob;
                    let response = await algodClient.sendRawTransaction(decodedResult).do()
                  await  getpostdatafilter(parseInt(tokenid1),parseInt(tokenid2),(rs1value+ rs2value),(rs1value+ rs2value + rs3value),amount)

                  await waitForConfirmation(algodClient, response.txId,"Add Liquidity");
                  checkbalanelemalgo();
                  checkbalanceeinralgo();
            
                  fetchPostsELEMALGO();
                  fetchPostsELEMALGOAPY();
              
              
                 fetchPostsEINRALGO();
                 fetchPostsEINRALGOAPY();
              
            
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
              console.log("err",err.toString())
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
                toast.error(`Pair is not created for this Assets,Create pair and try add Liquidity`);
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
                handleHideLoad()
              }
        
        
                  
                //console.error(err);
                }                                       
          
      
    }; 
const percent = async(entered_percent,name) =>{
    let asset1_amount ;
    let asset2_amount;
    let liquidity_asset_in;
        //  console.log("v",removeLi) 
        if(name==="ALGO/ELEM"){
             liquidity_asset_in = balanceelemalgo * entered_percent / 100;
            setliquidityamount(liquidity_asset_in);
            asset1_amount = (liquidity_asset_in * rs1value) / rs3value ;
            //  console.log(asset1_amount)
              asset2_amount = (liquidity_asset_in * rs2value) / rs3value ;
              
        }
        else{
            liquidity_asset_in = balanceeinralgo * entered_percent / 100;
            setliquidityamount(liquidity_asset_in);
            asset1_amount = (liquidity_asset_in * rs1valueeinr) / rs3valueeinr ;
            //  console.log(asset1_amount)
             asset2_amount = (liquidity_asset_in * rs2valueeinr) / rs3valueeinr ;
        }
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
      
         console.log("asset1_amount_out",asset1_amount_out)
         
         console.log("asset2_amount_out",asset2_amount_out)
      
      }   


const removeliquidity = async (token1,token2,lpasset) => {
  handleShowLoad()
        let tokenid1 = token1;
        let tokenid2 = token2;
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
               foreignassets.push(parseInt(lpasset));
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
                  amount: parseInt((amount1Out)),
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
                   amount: parseInt(amount2Out),
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
                    amount: parseInt(amount2Out),
                    suggestedParams: params
                  });
                }
                
                
                let foreignassetliquidity =[];
                foreignassetliquidity.push(parseInt(lpasset));
                // let decAddr = algosdk.decodeAddress(recv_escrow);
                // let acc =[];
                // acc.push(decAddr.publicKey);
                const transaction5 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                  from:  localStorage.getItem("walletAddress") ,
                  to:recv_escrow ,
                  assetIndex: parseInt(lpasset),
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
    
    
      await waitForConfirmation(algodClient, response.txId,"Remove Liquidity");
      handleHideLoad()
      fetchPostsELEMALGO();
      fetchPostsELEMALGOAPY();
       updatealgobalance();
  
     fetchPostsEINRALGO();
     fetchPostsEINRALGOAPY();
  
              }
              else if(localStorage.getItem("walletName") === "PeraWallet"){
                const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
                const txns = [txs[0], txs[1], txs[2],txs[3],txs[4]]
                const txnsToSign = txns.map(txn => {
                const encodedTxn = Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString("base64");
                console.log(encodedTxn);
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
                console.log(result);
                decodedResult[1] = signedTx1.blob;
                decodedResult[2] = signedTx2.blob;
                decodedResult[3] = signedTx3.blob;
                let response = await algodClient.sendRawTransaction(decodedResult).do()
                await  getpostdatafilter(parseInt(t1),parseInt(t2),(rs1value+ rs2value),(rs1value+ rs2value + rs3value),amount)

                await waitForConfirmation(algodClient, response.txId);
                // window.location.reload();
                handleHideLoad()
                fetchPostsELEMALGO();
                fetchPostsELEMALGOAPY();
            
            
               fetchPostsEINRALGO();
               fetchPostsEINRALGOAPY();
               updatealgobalance();
            
              }
          
            
     
    setliquidityamount(0);
    setamount1Out(0)
    setamount2Out(0) 
    
    //   handleRemove()
      // toast.success(`Transaction Completed Successfully ${response.txId}`);
      // toast.info("Removing Liquidity is Done!")  
    } catch (err) {
      handleHideLoad()
      console.log("err",err.toString())
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
        toast.error(`Try again by giving small amount`);
      }
  
  
          
        //console.error(err);
        }
      };

      const [hdropdown, sethdropdown] = useState(false); 
      const handleDropdown = () => sethdropdown(!hdropdown);
    return (
       
                <Accordion defaultActiveKey="">
                    <Accordion.Item className='mb-24' eventKey="0">
                        <Accordion.Header>
                            <div className="acc-title me-2 d-flex align-items-center">
                                <img src={props.x.image1name} alt="logo" />
                                <img src={props.x.image2name} alt="logo" />
                                <span className='ms-3'>{props.x.Farmname}<br /><Badge bg='success'>MULTI ASSET STAKING</Badge></span>
                            </div>

                            <div className="ms-auto flex-grow-1 pe-md-4 justify-content-between d-flex align-items-center">
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                     Balance
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                    {props.x.Farmname==="ALGO/ELEM"?(<>
                                            
                                            {parseFloat(balanceelemalgo/1000000)===Infinity||isNaN(parseFloat((parseFloat(balanceelemalgo/1000000)))) ? 0.00 : parseFloat((parseFloat(balanceelemalgo/1000000))).toFixed(2)}
                                            </>):(<>
                                            
                                                {parseFloat(balanceeinralgo/1000000)===Infinity||isNaN(parseFloat((parseFloat(balanceeinralgo/1000000)))) ? 0.00 : parseFloat((parseFloat(balanceeinralgo/1000000))).toFixed(2)}
                                            </>)}
                                    </h5>
                                </div>
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        APY
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                    {props.x.Farmname==="ALGO/ELEM"?(<>
                                                  {parseFloat(apyelemalgo)===Infinity||isNaN(parseFloat((parseFloat(apyelemalgo)))) ? 0.00 : parseFloat((parseFloat(apyelemalgo))).toFixed(2)}%
                                            </>):(<>
                                              {parseFloat(apyeinralgo)===Infinity||isNaN(parseFloat((parseFloat(apyeinralgo)))) ? 0.00 : parseFloat((parseFloat(apyeinralgo))).toFixed(2)}%
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
                                     Rewards Allocated 
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                    {props.x.Farmname==="ALGO/ELEM"?(<>
                                            {parseFloat(Totalrewardallocatedelemalgo)===Infinity||isNaN(parseFloat((parseFloat(Totalrewardallocatedelemalgo)))) ? 0.00 : parseFloat((parseFloat(Totalrewardallocatedelemalgo/1000000)))}
                                            </>):(<>
                                                {parseFloat(Totalrewardallocatedeinralgo)===Infinity||isNaN(parseFloat((parseFloat(Totalrewardallocatedeinralgo)))) ? 0.00 : parseFloat((parseFloat(Totalrewardallocatedeinralgo/1000000)))}
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
                                    {props.x.Farmname==="ALGO/ELEM"?(<>
                                      {isNaN(parseFloat((parseFloat(TotalStakeelemalgo/1000000)))) ? 0.00 : parseFloat((parseFloat(TotalStakeelemalgo/1000000))).toFixed(2)}
                                            </>):(<>
                                                {isNaN(parseFloat((parseFloat(TotalStakeeinralgo/1000000)))) ? 0.00 : parseFloat((parseFloat(TotalStakeeinralgo/1000000))).toFixed(2)}
                                            </>)}
                                    </h5>
                                </div>
                            </div>
                        </Accordion.Header>
                        <Accordion.Body>
                            <div className="d-flex align-items-center flex-wrap justify-content-center float-sm-end mt-sm-1 mb-sm-0 mb-3 acc-h-links">
                            {props.x.Farmname==="ALGO/ELEM" ?(<>
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
                                {appOptedeinralgo ?(<>
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
                            <ButtonLoad loading={loaderAssetoptin}  className='btn my-1 btn-blue' onClick={()=>assetoptin(props.x.Farmname)}>
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
                                    <Dropdown.Toggle  onMouseEnter={handleDropdown} onMouseLeave={handleDropdown} variant="link" className="text-purple-d d-block p-0 noarrow" id="dropdown-basic">
                                        Staking Details

                                        <svg class="ms-2 mb-1" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#AB9EEB" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#AB9EEB"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#AB9EEB"></path></svg>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu show={hdropdown ? true : false} className='bg-black' align="end">
                                        <h6 className='d-flex mb-4 align-items-center justify-content-between'><span>My Holdings</span> <span> <sub className='font-normal'>LP</sub></span></h6>

                                        <div className="d-flex align-items-center mb-2 dropdown-row">
                                        <img src={props.x.image1name} alt="logo" />
                                          <img src={props.x.image2name} alt="logo" />
                                            {/* <strong className='px-2'>0</strong> */}
                                            <span>{props.x.Farmname}</span>
                                            <span className='ms-auto ps-2'>{props.x.Farmname==="ALGO/ELEM"?(<>
                                            {isNaN(parseFloat((parseFloat(stakedbalanceelemalgo/1000000)))) ? 0.00 : parseFloat((parseFloat(stakedbalanceelemalgo/1000000)))}
                                            </>):(<>
                                                {isNaN(parseFloat((parseFloat(stakedbalanceeinralgo/1000000)))) ? 0.00 : parseFloat((parseFloat(stakedbalanceeinralgo/1000000)))}
                                            </>)}</span>
                                        </div>
                                        {/* <div className="d-flex align-items-center mb-2 dropdown-row">
                                            <img src={USDC} alt="logo" />
                                            <strong className='px-2'>0</strong>
                                            <span>WONE</span>
                                            <span className='ms-auto ps-2'>$0.00</span>
                                        </div> */}
                                        <hr className='my-4' />
                                        <h6 className='d-flex mb-4 align-items-center justify-content-between'>Earned</h6>
                                        <div className="d-flex align-items-center mb-2 dropdown-row">
                                        <img src={Icon1} alt="logo" />
                                            {/* <strong className='px-2'>0</strong> */}
                                            <span>ELEM</span>
                                            <span className='ms-auto ps-2'>{props.x.Farmname==="ALGO/ELEM"?(<>
                                              {rewardcalcelemalgo ? rewardcalcelemalgo : '0.00'}
                                            
                                            
                                            </>):(<>   {rewardcalceinralgo ? rewardcalceinralgo : '0.00'}</>)}</span>
                                        </div>
                                    </Dropdown.Menu>
                                </Dropdown>
{/* 
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
                                            <svg className="tooltip-icon ms-2 mb-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                        </OverlayTrigger>
                                </h6>    */}
                            </div>
                            <Tabs defaultActiveKey="staking" className='dashboard-tabs' id="tab-example-1">
                                <Tab eventKey="staking" title="Staking">
                                    <Row className='row-divider'>
                                        <Col md={5}>
                                        <h6><span className='text-sm text-gray-d'>Your {props.x.Farmname} Balance: </span>
                                            {props.x.Farmname==="ALGO/ELEM"?(<>
                                            
                                            {isNaN(parseFloat((parseFloat(balanceelemalgo/1000000)))) ? 0.00 : parseFloat((parseFloat(balanceelemalgo/1000000))).toFixed(2)}
                                            </>):(<>
                                            
                                            {isNaN(parseFloat((parseFloat(balanceeinralgo/1000000)))) ? 0.00 : parseFloat((parseFloat(balanceeinralgo/1000000))).toFixed(2)}
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
                                                </Col>
                                                <Col xs="auto">

                                                {props.x.Farmname==="ALGO/ELEM"?(<>
                                                  {appOpted ?(<>
                                                   {assetOpt ?(<>
                                                   
                                                    <ButtonLoad loading={loaderstake} className='btn btn-blue' onClick={()=>stake(props.x.Farmname)}>
                                                        Stake
                                                    </ButtonLoad>
                                                   </>):(<>
                                                    <ButtonLoad loading={loaderstake} className='btn btn-blue disabled' >
                                                        Stake
                                                    </ButtonLoad>
                                                   
                                                   
                                                   </>)}
                                                  
                                                  </>):(<>
                                                  
                                                    <ButtonLoad loading={loaderstake} className='btn btn-blue disabled' >
                                                        Stake
                                                    </ButtonLoad>
                                                   
                                                  </>)}
                                                
                                                
                                                </>):(<>
                                                
                                                  {appOptedeinralgo ?(<>
                                                   {assetOpt ?(<>
                                                   
                                                    <ButtonLoad loading={loaderstake} className='btn btn-blue' onClick={()=>stake(props.x.Farmname)}>
                                                        Stake
                                                    </ButtonLoad>
                                                   </>):(<>
                                                    <ButtonLoad loading={loaderstake} className='btn btn-blue disabled' >
                                                        Stake
                                                    </ButtonLoad>
                                                   
                                                   
                                                   </>)}
                                                  
                                                  </>):(<>
                                                  
                                                    <ButtonLoad loading={loaderstake} className='btn btn-blue disabled' >
                                                        Stake
                                                    </ButtonLoad>
                                                   
                                                  </>)}
                                                
                                                
                                                
                                                </>)}
                                                
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col md={5}>
                                        <h6><span className='text-sm text-gray-d' >{props.x.Farmname} Staked: </span>{props.x.Farmname==="ALGO/ELEM"?(<>
                                            {isNaN(parseFloat((parseFloat(stakedbalanceelemalgo/1000000)))) ? 0.00 : parseFloat((parseFloat(stakedbalanceelemalgo/1000000))).toFixed(2)}
                                            </>):(<>
                                                {isNaN(parseFloat((parseFloat(stakedbalanceeinralgo/1000000)))) ? 0.00 : parseFloat((parseFloat(stakedbalanceeinralgo/1000000))).toFixed(2)}
                                            </>)}</h6>
                                            <Row className='flex-nowrap mb-2 gx-3'>
                                                <Col>
                                                    <InputGroup className='input-group-max'>
                                                        <FormControl
                                                            type="number"
                                                            pattern="[0-9]*"
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
                                                {props.x.Farmname==="ALGO/ELEM"?(<>
                                                  {stakedbalanceelemalgo === 0 || stakedbalanceelemalgo ==="" || stakedbalanceelemalgo ===undefined || stakedbalanceelemalgo === null||isNaN(stakedbalanceelemalgo)?(<>
                                                    <ButtonLoad loading={loaderunstake}  className='btn btn-blue disabled' >
                                                        Unstake
                                                    </ButtonLoad>
                                                  
                                                  
                                                  </>):(<>
                                                  
                                                    <ButtonLoad loading={loaderunstake}  className='btn btn-blue' onClick={()=>unstake(props.x.Farmname)}>
                                                        Unstake
                                                    </ButtonLoad>
                                                  
                                                  </>)}
                                                </>):(<>
                                                
                                                  {stakedbalanceeinralgo === 0 || stakedbalanceeinralgo ==="" || stakedbalanceeinralgo ===undefined || stakedbalanceeinralgo === null||isNaN(stakedbalanceeinralgo)?(<>
                                                  
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
                                        <h6><span className='text-sm text-gray-d'>ELEM Earned: </span>{props.x.Farmname==="ALGO/ELEM"?(<>
                                          {rewardcalcelemalgo ? rewardcalcelemalgo : '0.00'}
                                            
                                            
                                            </>):(<> {rewardcalceinralgo ? rewardcalceinralgo : '0.00'}
                                               </>)} </h6>
                                            {props.x.Farmname==="ALGO/ELEM"?(<>
                                                {rewardcalcelemalgo === 0 || rewardcalcelemalgo ==="" || rewardcalcelemalgo ===undefined || rewardcalcelemalgo === null||isNaN(rewardcalcelemalgo)?(<>
                                                <Button  className='btn btn-blue disabled'>
                                                Claim
                                            </Button>
                                            </>):(<>
                                                <ButtonLoad loading={loaderclaim} className='btn btn-blue' onClick={()=>Claimreward(props.x.Farmname)}>
                                                Claim
                                            </ButtonLoad>
                                            
                                            </>)}
                                            
                                            
                                            </>):(<>
                                                {rewardcalceinralgo === 0 || rewardcalceinralgo ==="" || rewardcalceinralgo ===undefined || rewardcalceinralgo === null||isNaN(rewardcalceinralgo)?(<>
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
                                </Tab>
                                <Tab eventKey="liquidity" title="Liquidity">
                                    <div className="d-flex mb-4 py-1 align-items-center  acc-h-links">
                                        <div className="switch-toggle d-flex me-auto align-items-center">
                                            <div className={`switch-toggle-btn me-2 ${swicth ? '' : 'active'}`} onClick={handleToggle}>
                                                {swicth ? 
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                                                    </svg>
                                                    :
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-dash-circle-fill" viewBox="0 0 16 16">
                                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z"/>
                                                    </svg>
                                                }
                                            </div>
                                            {swicth ? 'Add Liquidity' : 'Remove Liquidity'}
                                        </div>

                                        {/* <Dropdown>
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
                                                                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
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
                                                            />
                                                            <InputGroup.Text className='p-0 border-0' id="basic-addon2">%</InputGroup.Text>
                                                        </InputGroup>
                                                    </Col>
                                                    <Col xs="auto">
                                                        <Button variant='blue'>Auto</Button>
                                                    </Col>
                                                </Row>

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
                                                        id="custom-switch-  1"
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
                                                        id="custom-switch-  1"
                                                    />
                                                </div>

                                            </Dropdown.Menu>
                                        </Dropdown> */}
                                    </div>
                                    
                                    {swicth ? (

                                        <Row>
                                            <Col sm={6} className="mb-3">
                                                <div className="group-row group-row-logo">
                                                    <Row className='align-items-center gx-3 flex-sm-nowrap'>
                                                        <Col sm="auto" className='mb-sm-0 mb-3'>
                                                            <img src={props.x.image1name} alt="USDC" />
                                                        </Col>
                                                        <Col xs="auto" className='flex-grow-1'>
                                                            <div className="input-group-max d-flex justify-content-end align-items-center px-3 input-group-max-lg w-100">
                                                            {props.x.Farmname==="ALGO/ELEM"?(<>
                                                            
                                                                <input type="text" placeholder='0.00' value = {liq2}  onChange={(e) => liqValue2((e.target.value),"algoelem")} className='form-control' />
                                                                <span className='text-xs' style={{opacity: '0.9'}}>Balance <strong>{parseFloat(balancealgo/1000000).toFixed(3)}</strong></span>
                                                                
                                                            </>):(<>
                                                            
                                                                <input type="text" placeholder='0.00' value = {liq2}  onChange={(e) => liqValue2((e.target.value),"einralgo")} className='form-control' />
                                                                <span className='text-xs' style={{opacity: '0.9'}}>Balance <strong>{parseFloat(balancealgo/1000000).toFixed(3)} </strong></span>
                                                            
                                                            </>)} 
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Col>
                                            <Col sm={6} className="mb-3">
                                                <div className="group-row group-row-logo">
                                                    <Row className='align-items-center gx-3 flex-sm-nowrap'>
                                                        <Col sm="auto" className='mb-sm-0 mb-3'>
                                                            <img src={props.x.image2name} alt="USDC" />
                                                        </Col>
                                                        <Col xs="auto" className='flex-grow-1'>
                                                            <div className="input-group-max d-flex justify-content-end align-items-center px-3 input-group-max-lg w-100">
                                                            {props.x.Farmname==="ALGO/ELEM"?(<>
                                                            
                                                                <input type="text" placeholder='0.00' value = {liq1}  onChange={(e) => liqValue1((e.target.value),"algoelem")} className='form-control' /> 
                                                                <span className='text-xs' style={{opacity: '0.9'}}>Balance <strong>{parseFloat(balanceofleem/1000000).toFixed(3)} </strong></span>
                                                                
                                                            </>):(<>
                                                            
                                                                <input type="text" placeholder='0.00' value = {liq1}  onChange={(e) => liqValue1((e.target.value),"einralgo")} className='form-control' />
                                                                <span className='text-xs' style={{opacity: '0.9'}}>Balance <strong>{parseFloat(balanceofleinr/1000000).toFixed(3)} </strong></span>
                                                            
                                                            
                                                            </>)} 
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Col>
                                            <Col sm={12}>
                                            {props.x.Farmname==="ALGO/ELEM"?(<>
                                              {localStorage.getItem("walletAddress")?(<>
                                                {appOptedLp?(<>
                                              {assetOptLP?(<>
                                                {minimumbalance?(<>
                                                  <ButtonLoad loading={loader} className='btn btn-blue w-100' >
                                                    
                                                    You don't have sufficient Balance.
                                                  </ButtonLoad>
                                                
                                                </>):(<>
                                                  <ButtonLoad loading={loader} className='btn btn-blue w-100' onClick={()=>addliquiditycall(props.x.Farmname)}>
                                                    
                                                    Add Liquidity
                                                  </ButtonLoad>
                                                
                                                </>)}
                                                  
                                                
                                                
                                              
                                             
                                              
                                              
                                              </>):(<>
                                              
                                                <ButtonLoad loading={loaderAssetoptin} className='btn btn-blue w-100' onClick={()=>LPassetoptin(props.x.Farmname)}>
                                                    
                                                    LP Asset Optin
                                                  </ButtonLoad>
                                              
                                              </>)}
                                            
                                            </>):(<>
                                            
                                              <ButtonLoad loading={loaderAssetoptin} className='btn btn-blue w-100' onClick={()=>LpAPPoptin(props.x.Farmname)}>
                                                    
                                                    LP APP Optin
                                                  </ButtonLoad>
                                            
                                            
                                            </>)}
                                              
                                              
                                              </>):(<>
                                              
                                                <ButtonLoad className='btn btn-blue w-100 disabled' >
                                                    
                                                    LP APP Optin
                                                  </ButtonLoad>
                                              
                                              </>)}
                                           
                                              
                                            
                                            
                                            </>):(<>

                                              {localStorage.getItem("walletAddress")?(<>
                                                {appOptedLp?(<>
                                              {assetOptLPeinralgo?(<>
                                              
                                                {minimumbalance?(<>
                                                  <ButtonLoad loading={loader} className='btn btn-blue w-100 disabled' >
                                                    
                                                   You don't have sufficient Balance.
                                                  </ButtonLoad>
                                                
                                                </>):(<>
                                                
                                                
                                                  <ButtonLoad loading={loader} className='btn btn-blue w-100' onClick={()=>addliquiditycall(props.x.Farmname)}>
                                                    
                                                    Add Liquidity
                                                  </ButtonLoad>
                                                
                                                
                                                </>)}
                                              
                                          

                                              
                                                
                                              
                                              
                                              </>):(<>
                                              
                                                <ButtonLoad loading={loaderAssetoptin} className='btn btn-blue w-100' onClick={()=>LPassetoptin(props.x.Farmname)}>
                                                    
                                                    LP Asset Optin
                                                  </ButtonLoad>
                                              
                                              </>)}
                                            
                                            </>):(<>
                                            
                                              <ButtonLoad loading={loaderAppoptinlp} className='btn btn-blue w-100' onClick={()=>LpAPPoptin(props.x.Farmname)}>
                                                    
                                                    LP APP Optin
                                                  </ButtonLoad>
                                            
                                            
                                            </>)}
                                              
                                              
                                              
                                              </>):(<>
                                              
                                                <ButtonLoad className='btn btn-blue w-100 disabled' >
                                                    
                                                    LP APP Optin
                                                  </ButtonLoad>
                                              
                                              </>)}
                                           
                                            
                                            
                                            
                                            </>)}
                                           
                                               
                                            </Col>
                                        </Row>
                                    ): (

                                        <div>
                                            <div className="group-row mb-3">
                                                <Row className='align-items-center flex-sm-nowrap'>
                                                    <Col sm="auto" md={4} className='mb-sm-0 mb-3'>
                                                        <h6 className='sub-heading mb-0'>Remove Liquidity</h6>
                                                    </Col>
                                                    <Col xs="auto" className='flex-grow-1'>
                                                        <div className="input-group-max d-flex justify-content-end align-items-center px-3 input-group-max-lg w-100">
                                                            <input type="text" placeholder='0.00'value={parseFloat(liquidityamount/1000000).toFixed(3)} style={{width: '80px'}}  className='form-control text-end' />
                                                            <Button variant="outline-purple" className='btn-xs-d ms-3' onClick={() => percent(25,props.x.Farmname)}style={{height: '20px'}}>25%</Button>
                                                            <Button variant="outline-purple" className='btn-xs-d ms-2' onClick={() => percent(50,props.x.Farmname)} style={{height: '20px'}}>50%</Button>
                                                            <Button variant="outline-purple" className='btn-xs-d ms-2' onClick={() => percent(75,props.x.Farmname)} style={{height: '20px'}}>75%</Button>
                                                            <Button variant="outline-purple" className='btn-xs-d ms-2' onClick={() => percent(100,props.x.Farmname)} style={{height: '20px'}}>Max</Button>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                            <div className="group-row mb-3">
                                                <Row className='align-items-center flex-sm-nowrap'>
                                                    <Col sm="auto" className='mb-sm-0 mb-3'>
                                                        <h6 className='sub-heading mb-0'>You'll Receive:</h6>
                                                        {receive === 'Wone' && <Button variant='link' className='p-0 text-text-FF' onClick={() => setReceive('One')}></Button>} 
                                                        {receive === 'One' && <Button variant='link' className='p-0 text-text-FF' onClick={() => setReceive('Wone')}></Button>} 
                                                    </Col>
                                                    <Col xs="auto" className='flex-grow-1 text-uppercase  flex-sm-row flex-column justify-content-center d-flex flex-wrap align-items-center justify-content-sm-end'>
                                                        <div className="input-group-max input-group-max-img my-sm-0 my-1 d-flex align-items-center px-3">
                                                            <span className='h3 mb-1'>{parseFloat(amount1Out/1000000).toFixed(2)}</span>
                                                            <span className='text-xs px-2'>{props.x.nameasset1}</span>
                                                            <img src={props.x.image2name} alt="USDC" />
                                                        </div>
                                                        <div className="input-group-max ms-sm-3 input-group-max-img my-sm-0 my-1 d-flex align-items-center px-3">
                                                            <span className='h3 mb-1'>{parseFloat(amount2Out/1000000).toFixed(2)}</span>
                                                            <span className='text-xs px-2'>{props.x.nameasset2}</span>
                                                            <img src={props.x.image1name} alt="USDC" />
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                            {localStorage.getItem("walletAddress")?(<>
                                              {liquidityamount === 0 || liquidityamount ==="" || liquidityamount ===undefined || liquidityamount === null||isNaN(liquidityamount)?(<>
                                              
                                                <ButtonLoad loading={loader} className='btn btn-blue w-100 disabled' >
                                               
                                               Remove Liquidity
                                           </ButtonLoad >
                                              </>):(<>
                                                <ButtonLoad loading={loader} className='btn btn-blue w-100' onClick={()=>removeliquidity(props.x.assetid1,props.x.assetid2,props.x.lpassetid)}>
                                               
                                               Remove Liquidity
                                           </ButtonLoad >
                                              </>)}
                                              
                                            </>):(<>
                                              <ButtonLoad loading={loader} className='btn btn-blue w-100 disabled' >
                                               
                                               Remove Liquidity
                                           </ButtonLoad >
                                            </>)}
                                           
                                        </div>
                                    )}

                                </Tab>
                            </Tabs>
                        </Accordion.Body>
                    </Accordion.Item>
                
                </Accordion>
    
    );
};

export default Farmcard;