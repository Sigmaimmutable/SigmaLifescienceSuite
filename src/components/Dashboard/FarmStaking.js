import React, { Component, useState, useEffect, useRef } from 'react';
import { Col, Container, Row, Form, InputGroup, Button, Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Layout from './Layout';
import { Link, useHistory,useLocation } from "react-router-dom";
import Icon1 from '../../assets/images/elem-original.png';
import Icon2 from '../../assets/images/algorand-logo.png';
import elementLogo from '../../assets/images/favicon.ico';
import elemLogo from '../../assets/images/modal-square-logo.png';
import axios from "axios";

import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';
import "../toast-style-override.css"
import MyAlgoConnect from '@randlabs/myalgo-connect';

//import configfile from "../stakingconfig.json";
//import configfile from "../stakingelemalgoconfig.json";
import url from "../../configurl";
import { config } from 'dotenv';
import{checkotp,assetOptin}from "../formula";
import {farmtvltau} from "../TAUFarmStaking ";
import {farmtvlelem} from "../ElemFarmStaking ";
import {farmtvlelemalgopair} from "../ElemAlgoFarmStaking.js";
import { farmtvleinralgopair } from '../EINRALGOFarmStaking';
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


function FarmStaking(props) {
 
  const configfile =localStorage.getItem("ASSETFARM") === "elem"?require("../../stakingconfig.json"):localStorage.getItem("ASSETFARM") === "elemalgo"?  require("../../stakingelemalgoconfig.json"):localStorage.getItem("ASSETFARM") === "einralgo"?  require("../../stakingFarmEinrAlgo.json"):require("../../stakingFarmTauconfig.json");
  // console.log("configfile",configfile);
  const location = useLocation();
  const[farmname,setFarmname]=useState("");
  const[farmimage1,setImage1]=useState("");
  const[farmimage2,setImage2]=useState("");
  const[tvl,settvl]=useState("");
  const[updatereward,setupdatereward]=useState("");
  const[appOpted,setOpted] = useState(false);
  const [assetOpt,setToAssetOpt] = useState(false);

  useEffect(() => {
    
    const fetchPosts = async () => {
      if(location.query.farm === "" ||location.query.farm === undefined ||location.query.farm === null||location.query.image1 === "" ||location.query.image1 === undefined ||location.query.image1 === null ){
    
      }else{
        console.log("locationnew",location.query.farm);
        setFarmname(location.query.farm);
        settvl(location.query.tvl);
        setImage1(location.query.image1);
        sessionStorage.setItem("Farmname",location.query.farm);
        sessionStorage.setItem("Farmtvl",location.query.tvl);
        sessionStorage.setItem("Farmimage1",location.query.image1);
        
        if(location.query.image2 === "" ||location.query.image2 === undefined ||location.query.image2 === null ){
          sessionStorage.setItem("Farmimage2","");
        }
        else{
          setImage2(location.query.image2);
          sessionStorage.setItem("Farmimage2",location.query.image2);
        }
      } 


    };
    

    fetchPosts();
  }, []); 
 

    const [show, setShow] = React.useState(true);

    const handle = () => setShow(!show);

    function sleep(delay) {
        var start = new Date().getTime();
        while (new Date().getTime() < start + delay);
    }


    let [activeTab, setActiveTab] = useState("Deposit");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownOpen1, setDropdownOpen1] = useState(false);
    const [multiple, setMultiple] = useState(false);
    const[rewardBool,setRewardBool]=useState(false);
    const[stakeenddate,setStakeendDate]=useState('');
    var[datestake,setDatestake]=useState([]);
    var [time2, settime2]=useState("");
    var [date1, setdate1]=useState("");
    var [time1, settime1]=useState("");
    const[ap1,setAP] = useState("");
    const [discal ,setdistance]=useState("");
    const [lock1 ,setlock1]=useState("");
    const[stakelock,setStakeLock]=useState("");
    const toggleDropDown = () => setDropdownOpen(!dropdownOpen);
    const toggle1 = () => setDropdownOpen1(!dropdownOpen1);
    let history = useHistory();
    const [isOpen, setIsOpen] = useState(false);
    const [isOpens, setIsOpens] = useState(false);
    var[dis,setDis] = useState("");
    const [isOpennew, setIsOpennew] = useState(false);
    const [isOpennewpro, setIsOpennewpro] = useState(false);
    const[datasendhere,datasethere] = useState("");
    var[datestake,setDatestake]=useState([]);
    var [time2, settime2]=useState("");
    var [date1, setdate1]=useState("");
    var [time1, settime1]=useState("");
    const[day,setTime4]= useState("");
    const[hour,setTim1]= useState("");
    const[min,setTim2]= useState("");
    const[sec,setTim3]= useState("");
    const[lock,setlock]= useState(""); 
    const[time,settime]= useState("");
    const[date,setdate]= useState("");
    const[nowtime,setnowtime]=useState("");
    const[dateformat,setdateformat]=useState("");

    // const [show, setShow] = React.useState(false);

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    const[balance,setBalance] = useState([]);

    const[stakedbalance,setStakedBalance] = useState("");
    console.log("checkstakedbal",stakedbalance);
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
    const [accounts, setaccount] = useState("");

    const[totalstake,setTotalStake]=useState("");
    const[prices1,setS1]=useState("");
    const[prices2,setS2]=useState("");
    const[price,setprice]=useState("");
    const[totalreward,setTotalreward]=useState("");
    const[totalrewardallocated,setTotalrewardallocated]=useState("");
    const[rewardleft,setRewardleft]=useState("");
    const[totalclaimed,setTotalclaim]=useState("");
    const[totallock,setTotallock]=useState("");
    let address=localStorage.getItem("walletAddress");
    const[tk1,sett1] = useState("");
    const[tk2,sett2] = useState("");
    const[rewardupdatetime,setrewardupdatetime]=useState("");
   const [usertimeset,setusertimecheck]=useState("");
   const[totalstaketau,setTotalStaketau]=useState("");
   const[totalstakeelemalgo,setTotalStakeelemalgo]=useState("");
   const[totalstakeeinralgo,setTotalStakeeinralgo]=useState("");
   const[apy,setApy]=useState("");
   
//ELEM
useEffect(() => {
  const fetchPosts = async () => {
      setTotalStake(await farmtvlelem(configfile.creatoraddress,configfile.applicationid));   
      //setTotalrewardallocatedelem(await Rewardelem(configfile.creatoraddress,configfile.applicationid));
      //console.log("checkingELEMREWARD",totalrewardallocatedelem);   
  };
  fetchPosts();
}, []); 


//tautvl
   useEffect(() => {
    const fetchPosts = async () => {
        setTotalStaketau(await farmtvltau(configfile.creatoraddress,configfile.applicationid));   
       // setTotalrewardallocatedtau(await Rewardtau(configfiletau.creatoraddress,configfiletau.applicationid));
        //console.log("checkingELEMREWARD",totalrewardallocatedtau);   
    };
    fetchPosts();
  }, []);
  //ELEMALGOPAIR
useEffect(() => {
  const fetchPosts = async () => {
      setTotalStakeelemalgo(await farmtvlelemalgopair(configfile.creatoraddress,configfile.applicationid));   
     // setTotalrewardallocatedelemalgo(await Rewardelemalgopair(configfileelemalgo.creatoraddress,configfileelemalgo.applicationid));        
  };
  fetchPosts();
}, []);

 //EINRALGOPAIR
 useEffect(() => {
  const fetchPosts = async () => {
      setTotalStakeeinralgo(await farmtvleinralgopair(configfile.creatoraddress,configfile.applicationid));   
     // setTotalrewardallocatedelemalgo(await Rewardelemalgopair(configfileelemalgo.creatoraddress,configfileelemalgo.applicationid));        
  };
  fetchPosts();
}, []);
//check optin
useEffect(() => {
  const fetchPosts = async () => {
    setOpted(await checkotp(configfile.applicationid));
    setToAssetOpt(await assetOptin(configfile.rewardassetid));
    
  };
  fetchPosts();
}, []);
//assetoptincheck
// useEffect(async() => {
//   await optCheck();
// }, [assetOpt]);
// const optCheck = async () =>
// {
// let accountInfo = (await algodClientGet.accountInformation(localStorage.getItem("walletAddress")).do());
// //let accountInfo = await indexClient.lookupAccountByID(localStorage.getItem("walletAddress")).do();
// console.log(accountInfo);
// let assetCount = accountInfo['account']['assets']['length']
// // console.log(l);
// for(let i = 0; i < assetCount; i++)
// {
//     if(accountInfo['account']['assets'][i]['asset-id'] === configfile.rewardassetid)
//     {
//         setToAssetOpt(true);
//         break;
//     }
// }
// }
    useEffect(() => {
        const fetchPosts = async () => {
             // read local state of application from user account

      let accountInfoResponse = await algodClientGet.accountInformation(localStorage.getItem("walletAddress")).do();
      console.log("configfile1",configfile.applicationid);
      let appById = await algodClientGet.getApplicationByID(parseInt(configfile.applicationid)).do();
      console.log("configfile2",configfile.applicationid);
      console.log("globalappid",appById);
     
        console.log("Application's global state:");
       
           console.log("Application's global state:1",appById['params']['global-state']);
           console.log("Application's :1",appById['params']['global-state'][0]['key']);
           console.log("globaltime",appById['params']['global-state'][0]['value']['uint']);
          
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
                  setGlobalStake(appById['params']['global-state'][i]['value']['uint']);
                  }
                if(appById['params']['global-state'][i]['key']==="VFNVTA=="){
                    totalsulnew =appById['params']['global-state'][i]['value']['uint'];
                    
                    settotalsul(appById['params']['global-state'][i]['value']['uint']);
                    }
                if(appById['params']['global-state'][i]['key']==="VFNM"){
                      totalslatelocknew=appById['params']['global-state'][i]['value']['uint'];
                      settotalslatelock(appById['params']['global-state'][i]['value']['uint']);
                      }   
               }
            
    
      console.log("accinfolocal",accountInfoResponse);
      if( accountInfoResponse['apps-local-state'].length === null|| accountInfoResponse['apps-local-state'].length ===undefined||accountInfoResponse['apps-local-state'].length===""){
        // alert("check");
     }
    else{
    
    
      console.log("User",accountInfoResponse['apps-local-state'].length);
      for (let i = 0; i < accountInfoResponse['apps-local-state'].length; i++) { 
          if (accountInfoResponse['apps-local-state'][i].id == parseInt(configfile.applicationid)) {
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
                   setStakedBalance(accountInfoResponse['apps-local-state'][i]['key-value'][n]['value']['uint']);
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
         if (accountInfoResponse['assets'][i]['asset-id'] == parseInt(configfile.assetid)) {
          setBalance(accountInfoResponse['assets'][i]['amount']);
          console.log("accountassetid", configfile.assetid);
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
      let rewardCal = rewardCal1.toFixed(6);
      console.log("rewardamountcalculation",parseFloat(rewardCal));
      //let rewardcalculation =parseFloat((parseFloat(rewardamountbalance)+(parseFloat((globaltime)-parseFloat(usertime))/60)*parseFloat(stakedbalance)/parseFloat(globalstake))*parseFloat(totalsul)/parseFloat(1000000));
      setrewardcalculation(parseFloat(rewardCal));
      (rewardCal === 'NaN' || rewardCal === "" || rewardCal === null || rewardCal === '' || rewardCal === undefined) ? setRewardBool(false) : setRewardBool(true);
   
      
        
        };
        
    
        fetchPosts();
      }, [rewardcalc]);

    //for totalstakeed and reward 
    useEffect(() => {
        const fetchPosts = async () => {
       
      //let applicationid = 53433787;
     // const client = new algosdk.Algodv2('', 'https://api.testnet.algoexplorer.io', '');
      let accountInfoResponse1 = await algodClientGet.accountInformation(configfile.creatoraddress).do();
      let totalstake1;
      let totalclaimed1;
    for (let i = 0; i < accountInfoResponse1['created-apps'].length; i++) { 
       console.log("Application's global state:");
      if (accountInfoResponse1['created-apps'][i].id == parseInt(configfile.applicationid)) {
          console.log("Application's global state:");
          for (let n = 0; n < accountInfoResponse1['created-apps'][i]['params']['global-state'].length; n++) {
              console.log(accountInfoResponse1['created-apps'][i]['params']['global-state'][n]);
              let enc = accountInfoResponse1['created-apps'][i]['params']['global-state'][n];
              console.log("encode",enc);
              var decodedString = window.atob(enc.key);
              if(enc['key'] === "R0E="){
                setTotalStake( accountInfoResponse1['created-apps'][i]['params']['global-state'][n]['value']['uint']);
                 totalstake1=accountInfoResponse1['created-apps'][i]['params']['global-state'][n]['value']['uint'];
                console.log("checktvl", accountInfoResponse1['created-apps'][i]['params']['global-state'][n]['value']['uint'])
                

                
              }
              if(enc['key'] === "VFNVTEM="){
                setTotalreward( accountInfoResponse1['created-apps'][i]['params']['global-state'][n]['value']['uint']);
               totalclaimed1= accountInfoResponse1['created-apps'][i]['params']['global-state'][n]['value']['uint']
                console.log("checktvl", accountInfoResponse1['created-apps'][i]['params']['global-state'][n]['value']['uint'])
              }
              if(enc['key'] === "VFNM"){
                setTotalrewardallocated( accountInfoResponse1['created-apps'][i]['params']['global-state'][n]['value']['uint']);
                console.log("checktvl", accountInfoResponse1['created-apps'][i]['params']['global-state'][n]['value']['uint'])
              }


              var principal =	((totalstake1)/1000000) * (configfile.price) * 10 ** 6;
                console.log("principal",principal)
                var interest  = ((totalclaimed1)/1000000) * 0.4 * 3 * 10 ** 6;
                console.log("interest",interest)
                var rate = interest / principal;
                let calapy=((1 + rate / 1) ** 1 - 1) * 100;
                setApy(calapy);
                console.log("apy2",calapy);
          }
          
      }
  }
        
        };
        
    
        fetchPosts();
      }, []);  

    
//for price
useEffect(() => {
    const fetchPosts = async () => {
      let slpricenew;
      let s2pricenew;
  let priceappid = 21580889;
  const client = new algosdk.Algodv2('', 'https://api.testnet.algoexplorer.io', '');
  //let accountInfoResponse1 = await client.accountInformation("MX4W5I4UMDT5B76BMP4DS63Z357WDMNHDICPNEKPG4HVPZJTS2G53DDVBY").do();
  let accountInfoResponse2 = await client.accountInformation(configfile.pairescrowaddress).do();
  console.log("accinfolocalprice",accountInfoResponse2);
  if( accountInfoResponse2['apps-local-state'].length === null|| accountInfoResponse2['apps-local-state'].length ===undefined||accountInfoResponse2['apps-local-state'].length===""){
    // alert("checkprice");
 }else{
  console.log("priceconsole",accountInfoResponse2['apps-local-state'].length);
  for (let i = 0; i < accountInfoResponse2['apps-local-state'].length; i++) { 
    if (accountInfoResponse2['apps-local-state'][i].id == parseInt(configfile.priceappid)) {
        console.log("User's local stateprice:",accountInfoResponse2['apps-local-state'][i].id);
        let acccheck= accountInfoResponse2['apps-local-state'][i][`key-value`]; 
        console.log("Usercheckfor price",acccheck);
        console.log("Userforprice",accountInfoResponse2['apps-local-state'][i][`key-value`]);
      
        if(accountInfoResponse2['apps-local-state'][i][`key-value`]=== null|| accountInfoResponse2['apps-local-state'][i][`key-value`] === undefined||accountInfoResponse2['apps-local-state'][i][`key-value`]===""){
          // alert("check");
       }
      else{
for (let n = 0; n < accountInfoResponse2['apps-local-state'][i][`key-value`].length; n++) {
            console.log(accountInfoResponse2['apps-local-state'][i][`key-value`][n]);
            //setStakedBalance(accountInfoResponse['apps-local-state'][i][`key-value`][n]);
            
            let rewardkey =accountInfoResponse2['apps-local-state'][i]['key-value'][n];
           if(rewardkey['key'] === "czE="){
            slpricenew=accountInfoResponse2['apps-local-state'][i]['key-value'][n]['value']['uint'];
            console.log("s1pricenew",accountInfoResponse2['apps-local-state'][i]['key-value'][n]['value']['uint']);
             setS1(accountInfoResponse2['apps-local-state'][i]['key-value'][n]['value']['uint']);
           }
          if(rewardkey['key'] === "czI="){
            s2pricenew=accountInfoResponse2['apps-local-state'][i]['key-value'][n]['value']['uint'];
            console.log("s2pricenew",accountInfoResponse2['apps-local-state'][i]['key-value'][n]['value']['uint']);
            setS2(accountInfoResponse2['apps-local-state'][i]['key-value'][n]['value']['uint']);
          
          }
          
            
        }

      }

        
    }
}


 }
 let pricecal;
 pricecal=parseInt((slpricenew)/(s2pricenew));
 console.log("pricecalculated",pricecal);
 setprice(pricecal);
    
    };
    

    fetchPosts();
  }, []);  


//rewardleft
useEffect(() => {
    const fetchPosts = async () => {
        
let appById = await algodClientGet.getApplicationByID(parseInt(configfile.applicationid)).do();
console.log("globalappid",appById);

console.log("Application's global state:");

   console.log("Application's global state:1",appById['params']['global-state']);
   console.log("Application's :1",appById['params']['global-state'][0]['key']);
   console.log("globaltime",appById['params']['global-state'][0]['value']['uint']);
  
   
   let totalclaim;
   let totallock;
   let rewardleft;
   for(let i=0;i<11;i++){
      
      
        if(appById['params']['global-state'][i]['key']==="VFNVTEM="){
            totalclaim =appById['params']['global-state'][i]['value']['uint'];
            console.log("totalclaim",totalclaim);
            setTotalclaim(appById['params']['global-state'][i]['value']['uint']);
            }
        if(appById['params']['global-state'][i]['key']==="VFNM"){
            
            totallock=appById['params']['global-state'][i]['value']['uint'];
            console.log("totallock",totallock);
              setTotallock(appById['params']['global-state'][i]['value']['uint']);
              }   
       }
    
     rewardleft=(parseFloat(totallock-totalclaim)).toFixed(4);
     setRewardleft(rewardleft);

    };
    

    fetchPosts();
  }, []); 

  useEffect(() => {
    const fetchPosts = async () => {
      console.log("totalstake",totalstake);
      var principal =	((totalstake)/1000000) * (configfile.price) * 10 ** 6;
      console.log("principal",principal)
      var interest  = ((totalclaimed)/1000000) * 0.4 * 3 * 10 ** 6;
      console.log("interest",interest)
      var rate = interest / principal;
      let calapy=((1 + rate / 1) ** 1 - 1) * 100;
      setApy(calapy);
      console.log("apy",calapy);
    };
    fetchPosts();
  }, []); 
  

  // const APY = (async) => {
  //   var principal =	(parseFloat(Totalvaluelocked)/1000000) *configfile.price * 10 ** 6,
  //   var interest  = (parseFloat(totalclaimed)/1000000) * 0.4 * 3 * 10 ** 6,
  //   var rate = interest / principal;
    
  //     return ((1 + rate / 1) ** 1 - 1) * 100;
  //   };
  
  
    const waitForConfirmation = async function (client, txId) {
        let status = (await client.status().do());
        let lastRound = status["last-round"];
          while (true) {
            const pendingInfo = await client.pendingTransactionInformation(txId).do();
            if (pendingInfo["confirmed-round"] !== null && pendingInfo["confirmed-round"] > 0) {
              //Got the completed Transaction
              console.log("Transaction " + txId + " confirmed in round " + pendingInfo["confirmed-round"]);
              break;
            }
            lastRound++;
            await client.statusAfterBlock(lastRound).do();
          }
        };  
    const assetoptin = async() => {
        
      try{
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
        
        const signedTxnass = await myAlgoConnect.signTransaction(assetoptin1.toByte());
        toast.info("Transaction in Progress");
        const responseass = await algodClient.sendRawTransaction(signedTxnass.blob).do();
        toast.success(`Asset Optin Successful ${responseass.txId}`);
        console.log("optresponse",responseass)
        // toast.success(`Asset Optin Success ${responseass.txId}`);
        await waitForConfirmation(algodClient, responseass.txId);


        window.location.reload();
        // datasethere("Asset Optin Successfully")
        // setIsOpennewpro(false)
        // setIsOpennew(true)
      }
      catch (err) {
          console.error(err);
          toast.error(`Asset Optin Failed due to ${err}`);
        //   setIsOpennewpro(false)
      }
      }

      //appoptin

      const optin=async(assetID,responsetxId,addresseswall)=>{
        try{    
         
        const algosdk = require('algosdk');
       // const algodclient = new algosdk.Algodv2('', 'https://api.testnet.algoexplorer.io/', '');
        const myAlgoConnect = new MyAlgoConnect();
        
        try {
          //const accounts = await myAlgoWallet.connect();
          //const addresses = accounts.map(account => account.address);
          //console.log("addressget",addresses)
          //localStorage.getItem('wallet',addresses[0])
        const params = await algodClient.getTransactionParams().do();
        // let transoptin1 = algosdk.makeApplicationOptInTxnFromObject({
        //   from: localStorage.getItem('wallet'),
        //   appIndex:parseInt(appId1),
        //   note: undefined,
        //   suggestedParams: params
        //   });
      
      
        let transoptin2 = algosdk.makeApplicationOptInTxnFromObject({
            from: localStorage.getItem("walletAddress"),
            appIndex:parseInt(configfile.applicationid),
            note: undefined,
            suggestedParams: params
            });
      
       // const signedTxn1 = await myAlgoConnect.signTransaction(transoptin1.toByte());
        const signedTxn2 = await myAlgoConnect.signTransaction(transoptin2.toByte());
        toast.info("Transaction in Progress");
        const response2 = await algodClient.sendRawTransaction(signedTxn2.blob).do();
        console.log("optresponse",response2);
        toast.success(`App Optin Successful ${response2.txId}`);
        await waitForConfirmation(algodClient, response2.txId);
         window.location.reload();
        
        }
        catch (err) {
          console.error(err);
          toast.error(`App Optin Failed due to ${err}`);
          //storedb(assetID,responsetxId,addresseswall);
        }
      }
      catch (err) {
          console.error(err);
          toast.error(`App Optin Failed due to ${err}`);
      }
      }
    //stake
    const stake = async() => {
      try{
       
      const algosdk = require('algosdk');
      //const algodClient = new algosdk.Algodv2('', 'https://api.testnet.algoexplorer.io', '');
     
       var amt = document.getElementById("tid1").value; 
       let stakeamount = parseFloat(amt) * 1000000;
       global.TextEncoder = require("util").TextEncoder; 
     
       setaccount(localStorage.getItem("walletAddress"));
       let sender = localStorage.getItem("walletAddress");
     
       
       // helper function to await transaction confirmation
       // Function used to wait for a tx confirmation
       const waitForConfirmation = async function (algodclient, txId) {
           let status = (await algodclient.status().do());
           let lastRound = status["last-round"];
             while (true) {
               const pendingInfo = await algodclient.pendingTransactionInformation(txId).do();
               if (pendingInfo["confirmed-round"] !== null && pendingInfo["confirmed-round"] > 0) {
                 //Got the completed Transaction
                 //console.log("Transaction " + txId + " confirmed in round " + pendingInfo["confirmed-round"]);
                 break;
               }
               lastRound++;
               await algodclient.statusAfterBlock(lastRound).do();
             }
           };
       
      
       try {
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
         amount:stakeamount,
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
       
       
       
      const signedTx1 = await myAlgoConnect.signTransaction([txs[0].toByte(), txs[1].toByte(), txs[2].toByte()]);
      // const signedTx2 = await myAlgoConnect.signTransaction(txs[1].toByte());
      // const signedTx3 = await myAlgoConnect.signTransaction(txs[2].toByte());
      toast.info("Transaction in Progress");
     const response = await algodClient.sendRawTransaction([ signedTx1[0].blob, signedTx1[1].blob, signedTx1[2].blob]).do();
     //console.log("TxID", JSON.stringify(response, null, 1));   
     toast.success(`Staked Successfully! ${response.txId}`);   
     await waitForConfirmation(algodClient, response.txId);
      // localStorage.setItem("Staked","stakedbalance");
      window.location.reload();
  // this.forceUpdate();
     //alert("Staked Successfully");
  //    datasethere("Staked Successfully")
  //    setIsOpennewpro(false)
  //    setIsOpennew(true)
       }
       catch (err) {
           console.error(err);
           toast.error(`Staking Failed due to ${err}`);
       }
      }
      catch (err) {
          console.error(err);
          //setIsOpennewpro(false)
          toast.error(`Transaction Failed due to ${err}`);
      }
    
    } 
     //unstake

     const unstake = async() => {
      console.log("configfile",configfile.applicationid);
        //setIsOpennewpro(true)
        try{
        await myAlgoConnect.connect();
        //const algodClient = new algosdk.Algodv2('', 'https://api.testnet.algoexplorer.io', '');
      
      
        let appId1 = 46315308;
        //let applicationid = 53433787;
        var amt = document.getElementById("tid2").value; 
        let unstakeamount = parseFloat(amt) * 1000000;
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
                break;
              }
              lastRound++;
              await algodclient.statusAfterBlock(lastRound).do();
            }
          };
      
        try {
          const addresses = await myAlgoConnect.connect();
          console.log("Address =", addresses);
          
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
       
        //  let txId1 = transaction1.txID().toString();
      
        //let results = await algodClient.compile().do();
        //console.log("Hash = " + results.hash);
        //console.log("Result = " + results.result);
        let program = new Uint8Array(Buffer.from(configfile.escrowdata, "base64"));
       
      
      let lsig = algosdk.makeLogicSig(program);
          
      
      let sender1 = lsig.address();
      console.log("logic",sender1)
          let receiver = sender;
          // let receiver = "<receiver-address>"";
          
         // let closeToRemaninder = sender;
          let note = undefined;
          let transaction3 =algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
            from: sender1,
            to: receiver,
            amount: unstakeamount,
            note: undefined,
            assetIndex: parseInt(configfile.assetid),
            suggestedParams: params});
      
            // let transaction3 =algosdk.makePaymentTxnWithSuggestedParamsFromObject({
            //   from: sender1,
            //   to: receiver,
            //   amount:unstakeamount,
            //   note: undefined,
            //   suggestedParams: params});
      
      
      
      
          // let transaction4 =algosdk.makePaymentTxnWithSuggestedParamsFromObject({
          //   from: sender,
          //   to: sender1,
          //   amount: 1000,
          //   note: undefined,
          //   suggestedParams: params});
          //let txns = [transaction1, transaction2,transaction3,transaction4];
      
      //myAlgo start
      
      const groupID = algosdk.computeGroupID([ transaction1, transaction2, transaction3]);
            const txs = [ transaction1, transaction2, transaction3];
            txs[0].group = groupID;
            txs[1].group = groupID;
            txs[2].group = groupID;
           // txs[3].group = groupID;
            
            const signedTx1 = await myAlgoConnect.signTransaction([txs[0].toByte(), txs[1].toByte()]);
            // const signedTx2 = await myAlgoConnect.signTransaction(txs[1].toByte());
            const signedTx3 = algosdk.signLogicSigTransaction(txs[2], lsig);
            //const signedTx4 = await myAlgoConnect.signTransaction(txs[3].toByte());
            toast.info("Transaction in Progress");
            //console.log("Show", show);
        const response = await algodClient.sendRawTransaction([ signedTx1[0].blob, signedTx1[1].blob, signedTx3.blob]).do();
        //console.log("TxID", JSON.stringify(response, null, 1));
        toast.success(`Unstaked Successfully ${response.txId}`);
        await waitForConfirmation(algodClient, response.txId);
      // localStorage.setItem("Alreadywithdraw","withdrawnstate");
        window.location.reload();

    //    // alert("Unstaked Successfully");
    //    datasethere("Unstaked Successfully")
    //    setIsOpennewpro(false)
    //    setIsOpennew(true)
      }
      catch (err) {
          console.error(err);
          toast.error(`Unstaking Failed due to ${err}`);
      }
      }
      catch (err) {
          console.error(err);
        //   setIsOpennewpro(false)
        toast.error(`Unstaking Failed due to ${err}`);
      }
      
      }


     //claim reward
     const Claimreward = async() => {
     

      
      setIsOpennewpro(true)
      try{
      //const algodClient = new algosdk.Algodv2('', 'https://api.testnet.algoexplorer.io', '');
    
    
     // let appId1 = 46315308;
      //let applicationid = 53433787;
      
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
              break;
            }
            lastRound++;
            await algodclient.statusAfterBlock(lastRound).do();
          }
        };
    
      try {
        const addresses = await myAlgoConnect.connect();
        console.log("Address =", addresses);
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
     
    
    
    
    //  let appArgs3= [];
      
    //   appArgs2.push(new Uint8Array(Buffer.from("12")));
    //   console.log("(line:516) appArgs = ",appArgs3)
    
    //   // create unsigned transaction
    //   let transaction3 = algosdk.makeApplicationNoOpTxnFromObject({
    //     from: sender, 
    //     suggestedParams: params, 
    //     appIndex: configfile.applicationid, 
    //     appArgs: appArgs3})
      //  let txId1 = transaction1.txID().toString();
    
      //let results = await algodClient.compile(escrowdata).do();
     // console.log("Hash = " + results.hash);
     //console.log("Result = " + results.result);
      let program = new Uint8Array(Buffer.from(configfile.escrowdata, "base64"));
     
    
    let lsig = algosdk.makeLogicSig(program);
        
    
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
          amount: parseFloat(rewardcalc)*1000000,
          note: undefined,
          assetIndex: parseInt(configfile.rewardassetid),
          suggestedParams: params});
        // let transaction5 =algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        //   from: sender,
        //   to: sender1,
        //   amount: 2000,
        //   note: undefined,
        //   suggestedParams: params});
        //let txns = [transaction1, transaction2,transaction3,transaction4];
    
    //myAlgo start
    
    const groupID = algosdk.computeGroupID([ transaction1, transaction2, transaction4]);
          const txs = [ transaction1, transaction2, transaction4];
          txs[0].group = groupID;
          txs[1].group = groupID;
          txs[2].group = groupID;
          //txs[2].group = groupID;
            //txs[4].group = groupID;
          
          const signedTx1 = await myAlgoConnect.signTransaction([txs[0].toByte(), txs[1].toByte()]);
          // const signedTx2 = await myAlgoConnect.signTransaction(txs[1].toByte());
          //const signedTx3 = await myAlgoConnect.signTransaction(txs[2].toByte());
          const signedTx4 = algosdk.signLogicSigTransaction(txs[2], lsig);
          //const signedTx5 = await myAlgoConnect.signTransaction(txs[4].toByte());
          toast.info("Transaction in Progress");
      const response = await algodClient.sendRawTransaction([ signedTx1[0].blob, signedTx1[1].blob,signedTx4.blob]).do();
      //console.log("TxID", JSON.stringify(response, null, 1));
      await toast.success(`Reward Claimed Successfully ${response.txId}`);
      await waitForConfirmation(algodClient, response.txId);
      localStorage.setItem("Claimed","Rewardclaimsetzero");
      window.location.reload();
     // alert(" Reward Claimed Successfully");
  //    datasethere("Reward Claimed Successfully")
  //    setIsOpennewpro(false)
  //    setIsOpennew(true)
    }
    catch (err) {
        console.error(err);
        toast.error(`Reward Claiming Failed due to ${err}`);
    }
    }
    catch (err) {
        console.error(err);
        //setIsOpennewpro(false)
        toast.error(`Transaction Failed due to ${err}`);
    }
  
    }
//update
  
  const update = async() => {
    try{
     
    const algosdk = require('algosdk');
    //const algodClient = new algosdk.Algodv2('', 'https://api.testnet.algoexplorer.io', '');
   
    // var amt = document.getElementById("tid1").value; 
     //let stakeamount = parseFloat(amt) * 1000000;
     global.TextEncoder = require("util").TextEncoder; 
   
     setaccount(localStorage.getItem("walletAddress"));
     let sender = localStorage.getItem("walletAddress");
   
     
     // helper function to await transaction confirmation
     // Function used to wait for a tx confirmation
     const waitForConfirmation = async function (algodclient, txId) {
         let status = (await algodclient.status().do());
         let lastRound = status["last-round"];
           while (true) {
             const pendingInfo = await algodclient.pendingTransactionInformation(txId).do();
             if (pendingInfo["confirmed-round"] !== null && pendingInfo["confirmed-round"] > 0) {
               //Got the completed Transaction
               console.log("Transaction " + txId + " confirmed in round " + pendingInfo["confirmed-round"]);
               break;
             }
             lastRound++;
             await algodclient.statusAfterBlock(lastRound).do();
           }
         };
     
    
     try {
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
       console.log("(line:516) appArgs = ",appArgs1)
     
       // create unsigned transaction
       let transaction1 = algosdk.makeApplicationNoOpTxnFromObject({
        from: sender, 
       suggestedParams: params, 
       appIndex: parseInt(configfile.applicationid), 
        appArgs: appArgs1});
       //  let txId1 = transaction1.txID().toString();
     
       let appArgs2= [];
       
       appArgs2.push(new Uint8Array(Buffer.from("S")));
       console.log("(line:516) appArgs = ",appArgs2)
     
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
       amount:0,
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
     
     
     
    const signedTx1 = await myAlgoConnect.signTransaction([txs[0].toByte(), txs[1].toByte(), txs[2].toByte()]);
    //const signedTx2 = await myAlgoConnect.signTransaction(txs[1].toByte());
    //const signedTx3 = await myAlgoConnect.signTransaction(txs[2].toByte());
    toast.info("Transaction in Progress");
    const response = await algodClient.sendRawTransaction([ signedTx1[0].blob, signedTx1[1].blob, signedTx1[2].blob]).do();
   console.log("TxID", JSON.stringify(response, null, 1));   
   toast.success(`Rewards Updated  Successfully! ${response.txId}`);   
   await waitForConfirmation(algodClient, response.txId);

    window.location.reload();
// this.forceUpdate();
   //alert("Staked Successfully");
//    datasethere("Staked Successfully")
//    setIsOpennewpro(false)
//    setIsOpennew(true)
     }
     catch (err) {
         console.error(err);
         toast.error(`Reward Updation Failed due to ${err}`);
     }
    }
    catch (err) {
        console.error(err);
        //setIsOpennewpro(false)
        toast.error(`Transaction Failed due to ${err}`);
    }
  
  } 

//updatedate
useEffect(async() => {
  await first()
}, [day, hour, min, sec, lock]);

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const first = async () => {

  var us1= parseInt(rewardupdatetime);
  var us=us1;
  //console.log("uscheck",us);
  var ff=new Date(us);
setdate(ff.toDateString());
//console.log("datecheck",date);
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
     setnowtime(now);
    console.log("now",now);
    var distance = countDowndate - now ;
  //console.log("now", distance);
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


          



    return (
        <Layout>
            <><ToastContainer position='top-center' draggable = {false} transition={Zoom} autoClose={8000} closeOnClick = {false}/></>
            <div className="page-content">
                <Container fluid="lg">
                    <Row>
                    <Col lg={4} xl={3} className='mb-lg-0 d-none mb-4'>
                            <div className="card-base card-dark card-left">
                                <h2 className="h3 mb-20 font-semi-bold">Farms</h2>
                                <h5 className='text-gray text-normal mb-30'>Stake  tokens to earn rewards in ELEM. <br /></h5>

                                <h6 className='text-gray-D2'>Total Value Locked (TVL)</h6>
                                <h5 className='mb-30' style={{color:"white",fontSize:"20px"}}>{totalstaketau===""||totalstaketau===undefined||totalstaketau===null? (<span className='d-flex mb-10 align-items-center' >  </span>):(<span  className='d-flex mb-10 align-items-center' ><h5>{(parseFloat(totalstaketau)/1000000).toFixed(2)}&nbsp;{farmname}</h5></span>)}</h5>

                                <h6 className='text-gray-D2'>ELEM PRICE</h6>
                                <h5 className='mb-30' style={{color:"white",fontSize:"20px"}}>$3.00</h5>

                                <h6 className='text-gray-D2'>My Holdings</h6>
                                <h5 className='mb-0' style={{color:"white",fontSize:"20px"}}>{parseFloat(stakedbalance/1000000)}&nbsp;{farmname}</h5>
                            </div>
                        </Col>
                        <Col lg={12}>
                          {/* lg={8} xl={9} */}
                        {/* <div className="d-flex filter-responsive flex-wrap mb-3 align-items-center justify-content-xl-between justify-content-center">
                                <ul className="nav-filter mb-xl-0 mb-3 d-flex align-items-center list-unstyled">
                                    <li><a href="/" className='active'>All farms</a></li>
                                    <li><a href="/">Inactive farms</a></li>
                                </ul>
                                
                                <Form>
                                    <InputGroup className="input-group-search">
                                        <Form.Control placeholder="Search by name, symbol or address" />
                                        <Button variant="reset">
                                            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11.0693 2.06396C16.0373 2.06396 20.0693 6.09596 20.0693 11.064C20.0693 16.032 16.0373 20.064 11.0693 20.064C6.10134 20.064 2.06934 16.032 2.06934 11.064C2.06934 6.09596 6.10134 2.06396 11.0693 2.06396ZM11.0693 18.064C14.9363 18.064 18.0693 14.931 18.0693 11.064C18.0693 7.19596 14.9363 4.06396 11.0693 4.06396C7.20134 4.06396 4.06934 7.19596 4.06934 11.064C4.06934 14.931 7.20134 18.064 11.0693 18.064ZM19.5543 18.135L22.3833 20.963L20.9683 22.378L18.1403 19.549L19.5543 18.135Z" fill="white"/>
                                            </svg>
                                        </Button>
                                    </InputGroup>
                                </Form>
                            </div> */}

                            {!show ? (
                                <>
                                    <div className="table-group-outer">
                                        <div className="table-group-head">
                                            <div className="table-group-tr">
                                                <div className="table-group-th">Stake</div>
                                                <div className="table-group-th">
                                                    <Dropdown>
                                                        <Dropdown.Toggle variant="reset" id="dropdown-basic">
                                                            TVL
                                                        </Dropdown.Toggle>

                                                        <Dropdown.Menu>
                                                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </div>
                                                <div className="table-group-th">Earn</div>
                                                <div className="table-group-th text-end">
                                                    <Dropdown>
                                                        <Dropdown.Toggle variant="reset" id="dropdown-basic">
                                                            APR
                                                        </Dropdown.Toggle>

                                                        <Dropdown.Menu>
                                                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </div>
                                            </div>
                                        </div>
                                    
                                    </div>
                            
                                    <div className="pagination-footer d-flex align-items-center justify-content-between">
                                        <p>showing 1-5 from 150</p>

                                        <div className="d-flex align-items-center">
                                            <Button variant='arrow'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                                                    <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                                                </svg>
                                            </Button>
                                            <Button variant='arrow'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                                                    <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                                                </svg>
                                            </Button>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div >
                                    <Row>
                                        <Col md={6}>
                                           
                                            <div className="table-group-td">
                                            <div className="d-flex align-items-center td-cell">
                                            {sessionStorage.getItem("Farmimage1")===null||sessionStorage.getItem("Farmimage1")===undefined||sessionStorage.getItem("Farmimage1")==="" ? (<>   <img src={Icon1} style={{width:'30px',height:'30px'}} /> </>):(<>   <img src={sessionStorage.getItem("Farmimage1")} style={{width:'50px',height:'50px'}} /></>)}
                                            {sessionStorage.getItem("Farmimage2")===null||sessionStorage.getItem("Farmimage2")===undefined||sessionStorage.getItem("Farmimage2")===""  ? (<>   </>):(<>   <img src={sessionStorage.getItem("Farmimage2")} style={{width:'40px',height:'40px'}} /></>)}                                          
                                            <span className='d-flex mb-0 align-items-center' ><h5>Stake</h5></span>{sessionStorage.getItem("Farmname")===""||sessionStorage.getItem("Farmname")===undefined||sessionStorage.getItem("Farmname")===null? (<span className='d-flex mb-0 align-items-center' >  </span>):(<span  className='d-flex mb-0 align-items-center' ><h5>{sessionStorage.getItem("Farmname")}</h5></span>)}
                                           
                                            </div>
                                           
                                            </div>
                                          

                                            <div className="mb-3">
                                                <label className='d-flex align-items-center justify-content-between'><small>Balance: {parseFloat(balance/1000000)}</small></label>
                                                <div className="balance-card py-1 px-2 d-flex align-items-center justify-content-between">
                                                    <input type='text' id="tid1" className='me-3 form-control flex-grow-1 p-0 border-0 text-white' />
                                                    
                                                    <strong>{sessionStorage.getItem("Farmname")===""||sessionStorage.getItem("Farmname")===undefined||sessionStorage.getItem("Farmname")===null? (<span className='d-flex align-items-center' >  </span>):(<span  className='d-flex align-items-center' ><h5>{sessionStorage.getItem("Farmname")}</h5></span>)}</strong>
                                                </div>
                                            </div>
                                            <Row className='gx-2 mb-5'>
                                                {/* <Col sm="4" className='py-sm-0 py-1'> */}
                                                {assetOpt ?(<>
                                                  {appOpted ? (<>
                                                    
                                                    <Button variant='grad' className='w-100' onClick={stake}>Stake </Button>
                                               
                                                 </>):
                                                  (<>
                                                    <Col xs="6" className='py-sm-0 py-1'>
                                                   <Button variant='grad' className='px-9 py-2 w-100' onClick={optin}>App Opt-in</Button>
                                                    </Col>

                                                  <Col xs="6" className='py-sm-0 py-1'>
                                                    <Button variant='grad' className='px-2 py-2 w-100' onClick={stake}>Stake </Button>
                                                   </Col>
 
                                   </>)}
                                                </>):(<>
                                                  {appOpted?(<>
                                                    <Col xs="6" className='py-sm-0 py-1'>
                                                   <Button variant='grad' className='px-9 py-2 w-100' onClick={assetoptin}>Asset Opt-in</Button>
                                                    </Col>

                                                  <Col xs="6" className='py-sm-0 py-1'>
                                                    <Button variant='grad' className='px-2 py-2 w-100' onClick={stake}>Stake </Button>
                                                   </Col>
                                                  
                                                  
                                                  </>):(<>
                                                <Col xs="4" className='py-sm-0 py-1'>
                                                <Button variant='grad' className='px-2 py-2 w-100' onClick={assetoptin}>Asset Opt-in</Button>
                                                </Col>
                              
                                              <Col xs="4" className='py-sm-0 py-1'>
                                              <Button variant='grad' className='px-2 py-2 w-100' onClick={optin}>App Opt-in</Button>
                                              </Col>

                                              <Col xs="4" className='py-sm-0 py-1'>
                                                    <Button variant='grad' className='px-2 py-2 w-100' onClick={stake}>Stake </Button>
                                                </Col>
                                                  
                                                  
                                                  </>)}

                                                  
                                                </>)}
                                                  
                                                {/* </Col> */}
                                                <Col sm="4" className='py-sm-0 py-1'>
                                                {/* {appOpted ? (<>
                                                 
                                                </>):
                                  (<>
                                  <Button variant='grad' className='px-2 py-2 w-100' onClick={optin}>App Opt-in</Button>

                                  </>)} */}
                                                   
                                                </Col>
                                                
                                            </Row>

                                            <h5 className='d-flex mb-10 align-items-center'>
                                                <svg width="40" height="40" className='me-3' viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect width="39.8942" height="40" rx="19.9471" transform="matrix(-1 0 0 1 40 0)" fill="white"/>
                                                    <path d="M16.9993 20.0377L13.2681 23.7688L16.9993 27.5L18.0651 26.4342L16.1535 24.5219L26.0822 24.5226V23.0151H16.1535L18.0651 21.1035L16.9993 20.0377ZM23.1048 12.5L22.039 13.5658L23.9505 15.4774H14.0219V16.9849H23.9505L22.039 18.8965L23.1048 19.9623L26.8359 16.2312L23.1048 12.5Z" fill="black"/>
                                                </svg>
                                               Withdraw
                                            </h5>

                                            <div className="mb-3">
                                                <label className='d-flex align-items-center justify-content-between'><small>Balance: {parseFloat(stakedbalance/1000000)}</small></label>
                                                <div className="balance-card py-1 px-2 d-flex align-items-center justify-content-between">
                                                    <input type='text' id="tid2" className='me-3 form-control flex-grow-1 p-0 border-0 text-white' />
                                                    
                                                    <strong>{sessionStorage.getItem("Farmname")===""||sessionStorage.getItem("Farmname")===undefined||sessionStorage.getItem("Farmname")===null? (<span className='d-flex align-items-center' >  </span>):(<span  className='d-flex align-items-center' ><h5>{sessionStorage.getItem("Farmname")}</h5></span>)}</strong>
                                                </div>
                                            </div>

                                            <Button variant='grad' className='w-100' onClick={unstake}>Withdraw</Button>
                                        </Col>

                                        <Col md={6} className='mt-md-0 pt-md-5 mt-4'>
                                            <div className="balance-card  py-1 px-2 d-flex mb-4 align-items-center justify-content-between">
                                                <div className='h6 mb-0 ms-1 py-3 d-flex align-items-center'>Current APY
                                                {/* <div className="ms-2">
                                                    <OverlayTrigger
                                                        placement="top"
                                                        overlay={
                                                            <Tooltip id={`tooltip-top`}>
                                                                Current APY
                                                            </Tooltip>
                                                        }
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#969696" className="bi d-block bi-info-circle" viewBox="0 0 16 16">
                                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                                            </svg>
                                                        </OverlayTrigger>
                                                </div> */}
                                                </div>
                                                <strong>{parseFloat(apy)===Infinity||isNaN(parseFloat((parseFloat(apy)))) ? 0.00 : parseFloat((parseFloat(apy))).toFixed(2)}%</strong>
                                            </div>
                                            <div className="balance-card  py-1 px-2 d-flex mb-4 align-items-center justify-content-between">
                                                <div className='h6 ms-1 mb-0 py-3 d-flex align-items-center'>{sessionStorage.getItem("Farmname")===""||sessionStorage.getItem("Farmname")===undefined||sessionStorage.getItem("Farmname")===null? (<span  >  </span>):(<span  >{sessionStorage.getItem("Farmname")}</span>)} &nbsp;Staked
                                                {/* <div className="ms-2">
                                                    <OverlayTrigger
                                                        placement="top"
                                                        overlay={
                                                            <Tooltip id={`tooltip-top`}>
                                                                My Staked {farmname}
                                                            </Tooltip>
                                                        }
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#969696" className="bi d-block bi-info-circle" viewBox="0 0 16 16">
                                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                                            </svg>
                                                        </OverlayTrigger>
                                                </div> */}
                                                </div>
                                                <strong>{stakedbalance/1000000} <small className='h7 ms-2'>{farmname}</small></strong>
                                            </div>
                                            <div className="balance-card  py-1 px-2 d-flex mb-4 align-items-center justify-content-between">
                                                <div className='h6 mb-0 ms-1 py-3 d-flex align-items-center'>ELEM Earned 
                                                <div className="ms-2">
                                                    <OverlayTrigger
                                                        placement="top"
                                                        overlay={
                                                            <Tooltip id={`tooltip-top`}>
                                                                Reward accumulates every 24 hrs
                                                            </Tooltip>
                                                        }
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#969696" className="bi d-block bi-info-circle" viewBox="0 0 16 16">
                                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                                            </svg>
                                                        </OverlayTrigger>
                                                </div>
                                                </div>
                                                <strong>{rewardBool === true ? (<>{rewardcalc}</>) : (<>{0.00}</>)} <small className='h7 ms-2'>ELEM</small></strong>
                                            </div>
                                            <div className="balance-card py-1 px-2 d-flex mb-4 align-items-center justify-content-between">
                                                <div className='h6 mb-0 ms-1 py-3 d-flex align-items-center'>ELEM Rewards 
                                                <div className="ms-2">
                                                    <OverlayTrigger
                                                        placement="top"
                                                        overlay={
                                                            <Tooltip id={`tooltip-top`}>
                                                             Click update reward, if your reward is not updated after 24hrs of your staked time
                                                            </Tooltip>
                                                        }
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#969696" className="bi d-block bi-info-circle" viewBox="0 0 16 16">
                                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                                            </svg>
                                                        </OverlayTrigger>
                                                </div>
                                                </div>
                                               
                                                
                                                {rewardcalc === 0 || rewardcalc ==="" || rewardcalc ===undefined || rewardcalc === null||isNaN(rewardcalc)?(<>
                                                
                                                <Button sm="4" variant='grad' onClick={update}>Update Reward</Button>
                                              
                                              </>):(<>
                                                <Button sm="4" variant='grad' onClick={Claimreward}>Claim Reward</Button>
                                              
                                              
                                              </>) }
                                              
                                               
                                               
                                                
                                            </div>
                                            
                                        </Col>
                                    </Row>
                                </div>
                            )}

                        </Col>
                    </Row>
                </Container>
            </div>
        </Layout>
    );
}

export default FarmStaking;