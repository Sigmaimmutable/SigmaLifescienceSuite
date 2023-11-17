import React, { Component, useState, useEffect, useRef } from 'react';
import { Col, Container, Row, Form, InputGroup, Button, Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Layout from './Layout';
import {
    Link
  } from "react-router-dom";

// import Icon1 from '../assets/images/icon1.png';
// import Icon2 from '../assets/images/icon2.png';
import Icon1 from '../../assets/images/elem-original.png';
import Icon2 from '../../assets/images/algorand-logo.png';
import Icon3 from '../../assets/images/tau-original.png';
import Icon4 from '../../assets/images/EINR-original.png';
import MyAlgoConnect from '@randlabs/myalgo-connect';
import configfile from "../../stakingconfig.json";
import configfiletau from "../../stakingFarmTauconfig.json";

import configfileelemalgo from "../../stakingelemalgoconfig.json";
import configfileeinralgo from "../../stakingFarmEinrAlgo.json";
import {farmtvlelemalgopair} from "../ElemAlgoFarmStaking.js";
import {Rewardelemalgopair} from "../REWARDELEMALGO";
import {farmtvleinralgopair} from "../EINRALGOFarmStaking";
import {Rewardeinralgopair} from "../REWARDEINRALGO";
import {farmtvlelem} from "../ElemFarmStaking ";
import {Rewardelem} from "../REWARDELEM";
import {farmtvltau} from "../TAUFarmStaking ";
import {Rewardtau} from "../REWARDTAU";
import { priceOfCoin1,priceOfCoin2,find_balance,find_balance_escrow,convert1,convert2,readingLocalstate,assetName,decodLocalState } from '../formula';
const baseServer = 'https://testnet-algorand.api.purestake.io/ps2';
const port = '';
const token = {
    'X-API-Key': 'pOD5BAUCxq7InVPjo0sO01B0Vq4d7pD1ask5Ix43'
 }
 
 
 const algosdk = require('algosdk');
 const algodClientGet = new algosdk.Algodv2(token, baseServer, port);
 const algodClient = new algosdk.Algodv2('', 'https://node.testnet.algoexplorerapi.io', '');
 const indexClient = new algosdk.Indexer('', 'https://algoindexer.testnet.algoexplorerapi.io', '');
//const algosdk = require('algosdk');
//const algodClient = new algosdk.Algodv2('', 'https://api.testnet.algoexplorer.io', '');
const myAlgoConnect = new MyAlgoConnect();

function FarmPage() {
    // React.useEffect(() => {
    //     window.scrollTo(0,0);
    // });
    //window.location.reload();
   // const configfile =localStorage.getItem("ASSETFARM") === "elem"?require("../stakingconfig.json"):localStorage.getItem("ASSETFARM") === "elemalgo"?  require("../stakingelemalgoconfig.json"):require("../stakingconfigTau.json");
   //const configfile =localStorage.getItem("ASSETFARM") === "elem"?require("../stakingconfig.json"):localStorage.getItem("ASSETFARM") === "elemalgo"?  require("../stakingelemalgoconfig.json"):localStorage.getItem("ASSETFARM") === "einralgo"?  require("../stakingFarmEinrAlgo.json"):require("../stakingFarmTauconfig.json"); 
   const[allfarm,setAllfarm]=useState(true);
    const[singlefarm,setSinglefarm]=useState(false);
    const[lpfarm,setlpfarm]=useState(false);
    const[totalstake,setTotalStake]=useState("");
    const[balance,setBalance] = useState([]);
    const[globaltime,setGlobalTime] = useState('');
    const[stakedbalance,setStakedBalance] = useState([]);
    const[usertime,setusertime] = useState('');
    const[rewardcalc,setrewardcalculation]=useState('');
    const[rewardamountbalance,setrewardBalance] = useState([]);
    const[globalstake,setGlobalStake] = useState('');
    const[totalsul,settotalsul] = useState('');
    const[totalslatelock,settotalslatelock] = useState('');
    const[price,setprice]=useState("");
    const[prices1,setS1]=useState("");
    const[prices2,setS2]=useState("");
    const[totalreward,setTotalreward]=useState("");
    const[totalrewardallocatedelem,setTotalrewardallocatedelem]=useState("");
    const[totalrewardallocatedtau,setTotalrewardallocatedtau]=useState("");
    const[totalrewardallocatedelemalgo,setTotalrewardallocatedelemalgo]=useState("");
    const[totalrewardallocatedeinralgo,setTotalrewardallocatedeinralgo]=useState("");
    const[totalstakeelemalgo,setTotalStakeelemalgo]=useState("");
    const[totalstaketau,setTotalStaketau]=useState("");
    const[totalstakeeinralgo,setTotalStakeeinralgo]=useState("");
    const[totalvaluelockedoverall,setOverallTVL]=useState("");
    const[stakeenddate,setStakeendDate]=useState('');
    var[datestake,setDatestake]=useState([]);
    var [time2, settime2]=useState("");
    var [date1, setdate1]=useState("");
    var [time1, settime1]=useState("");
    const[day,setTime4]= useState("")
    const[hour,setTim1]= useState("");
    const[min,setTim2]= useState("");
    const[sec,setTim3]= useState("");
    const[lock,setlock]= useState(""); 
    const[time,settime]= useState("");
    const[date,setdate]= useState("");
    const[algoprice,setAlgoPrice]=useState("");
    const[usdcprice,setUsdcPrice]=useState("");
    const[elemalgoconversion,setelemalgoconversion]=useState("");
    const[elemconversion,setelemconversion]=useState("");
    const[tauconversion,settauconversion]=useState("");
   
    //const[displaying,setDisplaying]=usestate([]);    
    //let totalstakeelemalgo="";
    const [searchText, setSearchText] = React.useState('');
    const CategoryOptions = [
        { Farmname: 'ALGO/ELEM', image1name: Icon1, image2name:Icon2 },
        {Farmname:'ALGO/EINR', image1name: Icon4, image2name:Icon2 },
        { Farmname: 'ELEM', image1name: Icon1, image2name: "" },
        {Farmname: 'Tau', image1name: Icon3, image2name: ""}
        
      
    ]


    const CategoryOptions2 = [
        
        { Farmname: 'ELEM', image1name: Icon1, image2name: "" },
        {Farmname: 'Tau', image1name: Icon3, image2name: ""}
      
    ]
    const CategoryOptions3 = [
        
    { Farmname: 'ALGO/ELEM', image1name: Icon1, image2name:Icon2 },
    { Farmname: 'ALGO/EINR', image1name: Icon4, image2name:Icon2 },
      
    ]
    const datasearch=()=>{
      const returndata=CategoryOptions.filter((values)=>{
          let valussearch1=(values.Farmname).toLowerCase().includes(searchText.toLocaleLowerCase());
          return valussearch1
        
        })
        return returndata

    }
    const datasearch2=()=>{
        const returndata=CategoryOptions2.filter((values)=>{
            let valussearch1=(values.Farmname).toLowerCase().includes(searchText.toLocaleLowerCase());
            return valussearch1
          
          })
          return returndata
  
      }
      const datasearch3=()=>{
        const returndata=CategoryOptions3.filter((values)=>{
            let valussearch1=(values.Farmname).toLowerCase().includes(searchText.toLocaleLowerCase());
            return valussearch1
          
          })
          return returndata
  
      }
// console.log("categories",CategoryOptions);
 const allfarmfunction = async() => {
         setAllfarm(true);
         setSinglefarm(false);
         setlpfarm(false);
    }
    const singlefarmfunction = async() => {
        setAllfarm(false);
        setSinglefarm(true);
        setlpfarm(false);
   }
   const lpfarmfunction = async() => {
    setAllfarm(false);
    setSinglefarm(false);
    setlpfarm(true);
}
const Farmdetail = async(name) => {
if(name==="ALGO/ELEM"){


   localStorage.setItem("ASSETFARM","");
   localStorage.setItem("ASSETFARM","elemalgo");
   console.log("insideelemalgo");
}
else if(name==="ALGO/EINR"){

    localStorage.setItem("ASSETFARM","");
    localStorage.setItem("ASSETFARM","einralgo");
    console.log("insideelemalgo");
}
else if(name==="ELEM"){
    localStorage.setItem("ASSETFARM","");
    localStorage.setItem("ASSETFARM","elem");
    console.log("insideelem"); 
}
else{
    localStorage.setItem("ASSETFARM","");
    localStorage.setItem("ASSETFARM","tau");
    console.log("insideelem");
}
}
// const elem = async() => {
//     localStorage.setItem("ASSETFARM","");
//     localStorage.setItem("ASSETFARM","elem");
//     console.log("insideelem");
//  }
//  const tau = async() => {
//     localStorage.setItem("ASSETFARM","");
//     localStorage.setItem("ASSETFARM","tau");
//     console.log("insideelem");
//  }

 
//enddate
useEffect(async() => {
    await first()
}, [day, hour, min, sec, lock]);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }

const first = async () => {
   
    var us1= parseInt(configfile.enddate);
    var us=us1+30;
    
    var ff=new Date(us);
setdate(ff.toDateString());
console.log("datecheck",date);
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


//for value fetching
useEffect(() => {
    const fetchPosts = async () => {
         // read local state of application from user account

  let accountInfoResponse = await algodClientGet.accountInformation(localStorage.getItem("walletAddress")).do();
  let appById = await algodClientGet.getApplicationByID(parseInt(configfile.applicationid)).do();
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
              console.log("rewardcheck",accountInfoResponse['apps-local-state'][i]['key-value'][n]['value']['uint']);
              setusertime(accountInfoResponse['apps-local-state'][i]['key-value'][n]['value']['uint']);
              console.log("rewardcheck",accountInfoResponse['apps-local-state'][i]['key-value'][n]['value']['uint']);
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
      console.log("accountsassetnew", accountInfoResponse['assets'][i]['amount']);

     }
  }


  
  console.log("sub",globaltimenew);
  console.log("sub_div",usertimenew);
  console.log("mul1",stakedbalancenew);
  console.log("add_div",rewardbalancenew);
  console.log("mul2",gloablstakenew);
  // console.log("rewardCal",rewardCal);
  let sub = parseInt(globaltimenew) - parseInt(usertimenew);
    console.log("checksub",sub);
  let sub_div = parseFloat(sub) / 86400;
  
  let mul1 = parseFloat(sub_div) * parseFloat(stakedbalancenew);
  
  let add = parseFloat(rewardbalancenew) + parseFloat(mul1);
  
  let add_div =  parseFloat(add) / parseFloat(gloablstakenew);
  
  let mul2 = parseFloat(add_div) * parseFloat(totalsulnew);
  
  let rewardCal1 = parseFloat(mul2) / 1000000;
  let rewardCal = rewardCal1.toFixed(6);
  console.log("rewardamountcalculation",rewardCal);
  //let rewardcalculation =parseFloat((parseFloat(rewardamountbalance)+(parseFloat((globaltime)-parseFloat(usertime))/60)*parseFloat(stakedbalance)/parseFloat(globalstake))*parseFloat(totalsul)/parseFloat(1000000));
  setrewardcalculation(rewardCal);


  
    
    };
    

    fetchPosts();
  }, []);



//for price
useEffect(() => {
const fetchPosts = async () => {
  let slpricenew;
  let s2pricenew;
let priceappid = 21580889;
//const client = new algosdk.Algodv2('', 'https://api.testnet.algoexplorer.io', '');
//let accountInfoResponse1 = await client.accountInformation("MX4W5I4UMDT5B76BMP4DS63Z357WDMNHDICPNEKPG4HVPZJTS2G53DDVBY").do();
let accountInfoResponse2 = await algodClientGet.accountInformation(configfile.pairescrowaddress).do();
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
    //   alert("check");
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


useEffect(() => {
    window.scrollTo(0, 0);    
    const fetchPosts = async () => {
let pk1 = await priceOfCoin1();
setAlgoPrice(pk1);
console.log("algoprice",pk1);
let pk2 = await priceOfCoin2();

setUsdcPrice(pk2);
console.log("usdcprice",pk2);
};
fetchPosts();
}, []); 

//ELEMALGOPAIR
useEffect(() => {
    const fetchPosts = async () => {
        setTotalStakeelemalgo(await farmtvlelemalgopair(configfileelemalgo.creatoraddress,configfileelemalgo.applicationid));   
        setTotalrewardallocatedelemalgo(await Rewardelemalgopair(configfileelemalgo.creatoraddress,configfileelemalgo.applicationid));        
        console.log("checkingELEMREWARD1",totalrewardallocatedelemalgo);
    };
    fetchPosts();
  }, []); 
//ELEM
useEffect(() => {
    const fetchPosts = async () => {
        setTotalStake(await farmtvlelem(configfile.creatoraddress,configfile.applicationid));   
        setTotalrewardallocatedelem(await Rewardelem(configfile.creatoraddress,configfile.applicationid));
        console.log("checkingELEMREWARD",totalrewardallocatedelem);   
    };
    fetchPosts();
  }, []); 

  //tau
useEffect(() => {
    const fetchPosts = async () => {
        setTotalStaketau(await farmtvltau(configfiletau.creatoraddress,configfiletau.applicationid));   
        setTotalrewardallocatedtau(await Rewardtau(configfiletau.creatoraddress,configfiletau.applicationid));
        console.log("checkingELEMREWARD",totalrewardallocatedtau);   
    };
    fetchPosts();
  }, []); 

  //EINRALGOPAIR
useEffect(() => {
    const fetchPosts = async () => {
        setTotalStakeeinralgo(await farmtvleinralgopair(configfileeinralgo.creatoraddress,configfileeinralgo.applicationid));   
        setTotalrewardallocatedeinralgo(await Rewardeinralgopair(configfileeinralgo.creatoraddress,configfileeinralgo.applicationid));        
    };
    fetchPosts();
  }, []); 

//TOTAL VALUE LOCKED(OVERALL)
useEffect(() => {
    const fetchPosts = async () => {
        let pk1 = await priceOfCoin1();
        console.log("algoprice1",pk1);
       //setAlgoPrice(pk1);
        console.log("algoprice",pk1);
        let pk2 = await priceOfCoin2();
        //setUsdcPrice(pk2);
         console.log("usdcprice",pk2);
let setTotalStakeelemalgocal = await farmtvlelemalgopair(configfileelemalgo.creatoraddress,configfileelemalgo.applicationid);   
        let elemalgoconvert =  parseFloat((setTotalStakeelemalgocal) * parseFloat (pk1));
        let elemalgoconvert2= parseFloat(elemalgoconvert/1000000);
        //setelemalgoconversion(elemalgoconvert2);
        console.log("elemalgodollarconversion2",elemalgoconvert2);  

        let setTotalStakeeinralgocal = await farmtvleinralgopair(configfileeinralgo.creatoraddress,configfileeinralgo.applicationid);   
        let einralgoconvert =  parseFloat((setTotalStakeeinralgocal) * parseFloat (pk1));
        let einralgoconvert2= parseFloat(einralgoconvert/1000000);
        //setelemalgoconversion(elemalgoconvert2);
        console.log("elemalgodollarconversion2",einralgoconvert2);  

       let setTotalStakecal =await farmtvlelem(configfile.creatoraddress,configfile.applicationid); 
        let elemconvert =  parseFloat((setTotalStakecal) * parseFloat(3));
        console.log("totalstakeelaem",totalstake);
        let elemconvert1=parseFloat(elemconvert) * parseFloat (pk2);
        let elemconvert2=parseFloat(elemconvert1/1000000);
        //setelemconversion(elemconvert2);
        console.log("elemdollarconversion",elemconvert2);  

     let  setTotalStaketaucal = await farmtvltau(configfiletau.creatoraddress,configfiletau.applicationid);
        let tauconvert =  parseFloat((setTotalStaketaucal) * parseFloat(1));
        console.log("totalstakeelaem",totalstaketau);
        let tauconvert1=parseFloat(tauconvert) * parseFloat (pk2);
        let tauconvert2=parseFloat(tauconvert1/1000000);
       // settauconversion(tauconvert2);
        console.log("taudollarconversion",tauconvert2);  
        
        let totalvaluelockedoverall1=elemalgoconvert2 + elemconvert2 + tauconvert2 +einralgoconvert2;

        setOverallTVL(totalvaluelockedoverall1);
        console.log("calculatingtvl",totalvaluelockedoverall1);

    };
    fetchPosts();
  }, []); 

    return (
        <Layout>
            <div className="page-content">
                <Container fluid="lg">
                    <Row >
                        <Col lg={4} xl={3} className='mb-lg-0 d-none mb-4'>
                            <div className="card-base card-dark card-left">
                                <h2 className="h3 mb-20 font-semi-bold">Farms</h2>
                                <h5 className='text-gray text-normal mb-30'>Stake tokens to earn rewards in ELEM. <br /></h5>

                                <h6 className='text-gray-D2'>Total Value Locked (TVL)</h6>

                                <h5 className='mb-30' style={{color:"white",fontSize:"20px"}}>${isNaN(parseFloat((parseFloat(totalvaluelockedoverall)))) ? 0.00 : parseFloat((parseFloat(totalvaluelockedoverall))).toFixed(2)}</h5>


                                <h6 className='text-gray-D2'>ELEM Price</h6>
                                <h5 className='mb-30'  style={{color:"white",fontSize:"20px"}}>$3.00</h5>

                                <h6 className='text-gray-D2'>Total Reward Allocated</h6>
                                <h5 className='mb-0' style={{color:"white",fontSize:"20px"}}>{isNaN(parseFloat((parseFloat(totalrewardallocatedelem)/1000000)+parseFloat((totalrewardallocatedelemalgo))/1000000 + parseFloat((totalrewardallocatedeinralgo))/1000000 + parseFloat((totalrewardallocatedtau))/1000000))?0.00:parseFloat((parseFloat(totalrewardallocatedelem)/1000000)+parseFloat((totalrewardallocatedelemalgo))/1000000 +parseFloat((totalrewardallocatedeinralgo))/1000000 + parseFloat((totalrewardallocatedtau))/1000000)}&nbsp;ELEM</h5>
                            </div>
                        </Col>
                        <Col lg={12}>
                            {/* lg={8} xl={9} */}
                            <div className="d-flex filter-responsive flex-wrap mb-3 align-items-center justify-content-xl-between justify-content-center">
                                
                                {/* <ul className="nav-filter mb-xl-0 mb-3 d-flex align-items-center list-unstyled">
                                    <li><a href='' className='active'>All Farms</a></li>
                                    <li><a href=''   >Single Farm</a></li>
                                    <li><a href=''  >LP Asset Farm</a></li>
                                </ul> */}
                                
         {/*allstakestart */}
                                {allfarm === true ? <><ul className="nav-filter mb-xl-0 mb-3 d-flex align-items-center list-unstyled">
                                    <li><a  className='active' onClick={allfarmfunction}>All Farms</a></li>
                                    <li><a   onClick={singlefarmfunction} >Single Farm</a></li>
                                    <li><a   onClick={lpfarmfunction}>LP Asset Farm</a></li>
                                </ul>
                                <Form>
                                    <InputGroup className="input-group-search " >
                                        <Form.Control  placeholder="Search by name, symbol or address" onChange={(e) => setSearchText(e.target.value) } value={searchText}/>
                                        <Button variant="reset">
                                            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11.0693 2.06396C16.0373 2.06396 20.0693 6.09596 20.0693 11.064C20.0693 16.032 16.0373 20.064 11.0693 20.064C6.10134 20.064 2.06934 16.032 2.06934 11.064C2.06934 6.09596 6.10134 2.06396 11.0693 2.06396ZM11.0693 18.064C14.9363 18.064 18.0693 14.931 18.0693 11.064C18.0693 7.19596 14.9363 4.06396 11.0693 4.06396C7.20134 4.06396 4.06934 7.19596 4.06934 11.064C4.06934 14.931 7.20134 18.064 11.0693 18.064ZM19.5543 18.135L22.3833 20.963L20.9683 22.378L18.1403 19.549L19.5543 18.135Z" fill="white"/>
                                            </svg>
                                        </Button>
                                    </InputGroup>
                                    

                                    
                                </Form>
                                <div className="table-group-outer mt-2">
                                <div className="table-group-head" style={{minWidth: '700px'}}>
                                    <div className="table-group-tr">
                                        <div className="table-group-th">Liquidity</div>
                                        <div className="table-group-th">Total Value Locked
                                            {/* <Dropdown>
                                                <Dropdown.Toggle variant="reset" id="dropdown-basic">
                                                    TVL
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown> */}
                                        </div>
                                        <div className="table-group-th">Total Rewards</div>
                                        {/* <div className="table-group-th">APR</div> */}
                                        <div className="table-group-th text-end">End Date
                                            {/* <Dropdown>
                                                <Dropdown.Toggle variant="reset" id="dropdown-basic">
                                                    End Date
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown> */}
                                        </div>
                                    </div>
                                </div>
                              
                               {datasearch().map((x)=>{
                                   return(
                                      
                                 <div className="table-group-body" style={{minWidth: '700px'}}>
                                    {x.image2name===""?(<>
                                    
                                        <Link  to={{
                  pathname: 'FarmStaking', query:{farm: x.Farmname,image1:x.image1name,image2:x.image2name}}}   onClick={()=>{Farmdetail(x.Farmname)}}>
                 
                                    <div className="table-group-tr">
                                        <div className="table-group-td">
                                            <div className="d-flex align-items-center td-cell">
                                                <img src={x.image1name} alt='icon' />
                                                {/* <img src={Icon2} alt='icon' /> */}
                                                <span style={{color:"white"}}>{x.Farmname}</span>
                                            </div>
                                        </div>
                                        {x.Farmname==="Tau"?(<>
                                            <div className="table-group-td" style={{color:"white"}}>{isNaN(parseFloat((parseFloat(totalstaketau)/1000000)))?0.00:parseFloat((parseFloat(totalstaketau)/1000000)).toFixed(2)} &nbsp;{x.Farmname}</div>
                                             
                                        </>):(<>                                       
                                        <div className="table-group-td" style={{color:"white"}}>{isNaN(parseFloat((parseFloat(totalstake)/1000000)))?0.00:parseFloat((parseFloat(totalstake)/1000000)).toFixed(2)}&nbsp;{x.Farmname}
                                         </div>
                                        </>)
                                        }
                                        <div className="table-group-td">
                                            <div className="d-flex align-items-center td-cell">
                                                <img src={Icon1} alt='icon' />
                                                {x.Farmname==="Tau"?(<>
                                                
                                                    <span style={{color:"white"}}>{isNaN(parseFloat((parseFloat(totalrewardallocatedtau)/1000000)))?0.00:parseFloat((parseFloat(totalrewardallocatedtau)/1000000))}</span>
                                                </>):(<>
                                                
                                                    <span style={{color:"white"}}>{isNaN(parseFloat((parseFloat(totalrewardallocatedelem)/1000000)))?0.00:parseFloat((parseFloat(totalrewardallocatedelem)/1000000))}</span>
                                                </>)}
                                               
                                            </div>
                                        </div>
                                        
                                            {/* <p>253% 
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={
                                                    <Tooltip id={`tooltip-top`}>
                                                        annualized
                                                    </Tooltip>
                                                }
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
                                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                                    </svg>
                                                </OverlayTrigger>
                                            </p> */}
                                            {/* <div className='table-group-td text-white'>APR</div> */}
                                            <div className="table-group-td text-end"  style={{color:"white"}}>{lock == true ? (<>{day}d:{hour}h:{min}m:{sec}s</>):(<>{0}d:{0}h:{0}m:{0}s</>)}
                                          
                                          <p>left</p> 
                                           
                                        </div>
                                   
                                
                                    </div>
                                    </Link>
                                    
                                    </>):(<>
                                    
                                        <Link  to={{
                  pathname: 'FarmStaking', query:{farm: x.Farmname,image1:x.image1name,image2:x.image2name}}}  onClick={()=>{Farmdetail(x.Farmname)}}>
                 
                                    <div className="table-group-tr">
                                        <div className="table-group-td">
                                            <div className="d-flex align-items-center td-cell">
                                                <img src={x.image1name} alt='icon' />
                                                <img src={x.image2name} alt='icon' />
                                                <span style={{color:"white"}}>{x.Farmname}</span>
                                            </div>
                                        </div>
                                        {x.Farmname==="ALGO/EINR"?(<>
                                        
                                            <div className="table-group-td" style={{color:"white"}}>{isNaN(parseFloat((parseFloat(totalstakeeinralgo)/1000000)))?0.00:parseFloat((parseFloat(totalstakeeinralgo)/1000000)).toFixed(2)}&nbsp;{x.Farmname}</div>
                                        </>):(<>
                                            <div className="table-group-td" style={{color:"white"}}>{isNaN(parseFloat((parseFloat(totalstakeelemalgo)/1000000)))?0.00:parseFloat((parseFloat(totalstakeelemalgo)/1000000)).toFixed(2)}&nbsp;{x.Farmname}</div>
                                        
                                        </>)}
                                        
                                        <div className="table-group-td">
                                            <div className="d-flex align-items-center td-cell">
                                                <img src={Icon1} alt='icon' />
                                                {x.Farmname==="ALGO/EINR"?(<>
                                                    <span style={{color:"white"}}>{isNaN(parseFloat((parseFloat(totalrewardallocatedeinralgo)/1000000)))?0.00:parseFloat((parseFloat(totalrewardallocatedeinralgo)/1000000))}</span>
                                                </>):(<>
                                                    <span style={{color:"white"}}>{isNaN(parseFloat((parseFloat(totalrewardallocatedelemalgo)/1000000)))?0.00:parseFloat((parseFloat(totalrewardallocatedelemalgo)/1000000))}</span>
                                                
                                                </>)}
                                              
                                            </div>
                                        </div>
                                        
                                            {/* <p>253% 
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={
                                                    <Tooltip id={`tooltip-top`}>
                                                        annualized
                                                    </Tooltip>
                                                }
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
                                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                                    </svg>
                                                </OverlayTrigger>
                                            </p> */}
                                            {/* <div className='table-group-td text-white'>APR</div> */}
                                            <div className="table-group-td text-end"  style={{color:"white"}}>{lock == true ? (<>{day}d:{hour}h:{min}m:{sec}s</>):(<>{0}d:{0}h:{0}m:{0}s</>)}
                                          
                                          <p>left</p> 
                                           
                                        </div>
                                   
                                
                                    </div>
                                    </Link>
                                    
                                    
                                    </>)}
                              
                                    </div>
                                    )
                                   })}
                               
                            </div>

                           

                                
                                
     {/*singlestakestart */}
                                
                                 </> : singlefarm === true ? <>
                                <ul className="nav-filter mb-xl-0 mb-3 d-flex align-items-center list-unstyled">
                                    <li><a  onClick={allfarmfunction}>All Farms</a></li>
                                    <li><a  className='active' onClick={singlefarmfunction}>Single Farm</a></li>
                                    <li><a onClick={lpfarmfunction}>LP Asset Farm</a></li>
                                </ul>
                                <Form>
                                    <InputGroup className="input-group-search " >
                                        <Form.Control  placeholder="Search by name, symbol or address" onChange={(e) => setSearchText(e.target.value) } value={searchText}/>
                                        <Button variant="reset">
                                            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11.0693 2.06396C16.0373 2.06396 20.0693 6.09596 20.0693 11.064C20.0693 16.032 16.0373 20.064 11.0693 20.064C6.10134 20.064 2.06934 16.032 2.06934 11.064C2.06934 6.09596 6.10134 2.06396 11.0693 2.06396ZM11.0693 18.064C14.9363 18.064 18.0693 14.931 18.0693 11.064C18.0693 7.19596 14.9363 4.06396 11.0693 4.06396C7.20134 4.06396 4.06934 7.19596 4.06934 11.064C4.06934 14.931 7.20134 18.064 11.0693 18.064ZM19.5543 18.135L22.3833 20.963L20.9683 22.378L18.1403 19.549L19.5543 18.135Z" fill="white"/>
                                            </svg>
                                        </Button>
                                    </InputGroup>
                                    

                                    
                                </Form>
                                <div className="table-group-outer">
                                <div className="table-group-head">
                                    <div className="table-group-tr">
                                        <div className="table-group-th">Liquidity</div>
                                        <div className="table-group-th">Total Value Locked
                                            {/* <Dropdown>
                                                <Dropdown.Toggle variant="reset" id="dropdown-basic">
                                                    TVL
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown> */}
                                        </div>
                                        <div className="table-group-th">Total Rewards</div>
                                        {/* <div className="table-group-th">APR</div> */}
                                        <div className="table-group-th text-end">End Date
                                            {/* <Dropdown>
                                                <Dropdown.Toggle variant="reset" id="dropdown-basic">
                                                    End Date
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown> */}
                                        </div>
                                    </div>
                                </div>
                                {datasearch2().map((y)=>{
                                      return(
 <div className="table-group-body">
 <Link to={{
pathname: 'FarmStaking', query:{farm:y.Farmname,image1:y.image1name}}}   onClick={()=>{Farmdetail(y.Farmname)}}>
     <div className="table-group-tr">
         <div className="table-group-td">
             <div className="d-flex align-items-center td-cell">
                 <img src={y.image1name} alt='icon' />
                
                 <span style={{color:"white"}}>{y.Farmname}</span>
             </div>
         </div>
         {y.Farmname==="Tau"?(<>
            <div className="table-group-td" style={{color:"white"}}>{isNaN(parseFloat((parseFloat(totalstaketau)/1000000)))?0.00:parseFloat((parseFloat(totalstaketau)/1000000))}&nbsp;{y.Farmname}</div>
         
         </>):(<>
         
            <div className="table-group-td" style={{color:"white"}}>{isNaN(parseFloat((parseFloat(totalstake)/1000000)))?0.00:parseFloat((parseFloat(totalstake)/1000000))}&nbsp;{y.Farmname}</div>
         </>)
         }
       
         <div className="table-group-td">
             <div className="d-flex align-items-center td-cell">
                 <img src={Icon1} alt='icon' />
                 {y.Farmname==="Tau"?(<>
                    <span style={{color:"white"}}>{isNaN(parseInt(totalrewardallocatedtau/1000000))?0.00:parseInt(totalrewardallocatedtau/1000000)}</span>
                 </>):(<>
                 
                    <span style={{color:"white"}}>{isNaN(parseInt(totalrewardallocatedelem/1000000))?0.00:parseInt(totalrewardallocatedelem/1000000)}</span>
                 </>)}

               
             </div>
         </div>
         {/* <div className="table-group-td text-end"> */}
         {/* <div className='table-group-td text-white'>APR</div> */}
         <div className="table-group-td text-end"  style={{color:"white"}}>{lock == true ? (<>{day}d:{hour}h:{min}m:{sec}s</>):(<>{0}d:{0}h:{0}m:{0}s</>)}
             {/* <p>253% 
             <OverlayTrigger
                 placement="top"
                 overlay={
                     <Tooltip id={`tooltip-top`}>
                         annualized
                     </Tooltip>
                 }
                 >
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
                         <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                         <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                     </svg>
                 </OverlayTrigger>
             </p> */}
             <p>left</p>
         </div>
    
 
     </div>
     </Link>
     
    

 </div>
                                      )
                                })

                                }
                               
                            </div>


                                </> : <>
{/*lpstakestart */}
                                <ul className="nav-filter mb-xl-0 mb-3 d-flex align-items-center list-unstyled">
                                    <li><a onClick={allfarmfunction}>All Farms</a></li>
                                    <li><a onClick={singlefarmfunction}>Single Farm</a></li>
                                    <li><a  className='active'  onClick={lpfarmfunction}>LP Asset Farm</a></li>
                                </ul>
                                <Form>
                                    <InputGroup className="input-group-search " >
                                        <Form.Control  placeholder="Search by name, symbol or address" onChange={(e) => setSearchText(e.target.value) } value={searchText}/>
                                        <Button variant="reset">
                                            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11.0693 2.06396C16.0373 2.06396 20.0693 6.09596 20.0693 11.064C20.0693 16.032 16.0373 20.064 11.0693 20.064C6.10134 20.064 2.06934 16.032 2.06934 11.064C2.06934 6.09596 6.10134 2.06396 11.0693 2.06396ZM11.0693 18.064C14.9363 18.064 18.0693 14.931 18.0693 11.064C18.0693 7.19596 14.9363 4.06396 11.0693 4.06396C7.20134 4.06396 4.06934 7.19596 4.06934 11.064C4.06934 14.931 7.20134 18.064 11.0693 18.064ZM19.5543 18.135L22.3833 20.963L20.9683 22.378L18.1403 19.549L19.5543 18.135Z" fill="white"/>
                                            </svg>
                                        </Button>
                                    </InputGroup>
                                    

                                    
                                </Form>
                                <div className="table-group-outer">
                                <div className="table-group-head">
                                    <div className="table-group-tr">
                                        <div className="table-group-th">Liquidity</div>
                                        <div className="table-group-th">Total Value Locked </div>
                                        <div className="table-group-th">Total Rewards</div>
                                        {/* <div className="table-group-th">APR</div> */}
                                        <div className="table-group-th text-end">End Date </div>
                                          
                                       
                                    </div>
                                </div>

                                {datasearch3().map((z)=>{
                                    return(
                                <div className="table-group-body">
                                <Link  to={{
                  pathname: 'FarmStaking', query:{farm:z.Farmname,image1:z.image1name,image2:z.image2name}}}   onClick={()=>{Farmdetail(z.Farmname)}}>
                                    <div className="table-group-tr">
                                        <div className="table-group-td">
                                            <div className="d-flex align-items-center td-cell">
                                                <img src={z.image1name} alt='icon' />
                                                <img src={z.image2name} alt='icon' />
                                                <span style={{color:"white"}}>{z.Farmname}</span>
                                            </div>
                                        </div>
                                        {z.Farmname==="ALGO/EINR"?(<>
                                            <div className="table-group-td" style={{color:"white"}}>{isNaN(parseFloat((parseFloat(totalstakeeinralgo)/1000000)))?0.00:parseFloat((parseFloat(totalstakeeinralgo)/1000000))}&nbsp;{z.Farmname}</div>
                                        
                                        </>):(<>
                                            <div className="table-group-td" style={{color:"white"}}>{isNaN(parseFloat((parseFloat(totalstakeelemalgo)/1000000)))?0.00:parseFloat((parseFloat(totalstakeelemalgo)/1000000))}&nbsp;{z.Farmname}</div>
                                        
                                        </>)}
                                        
                                        <div className="table-group-td">
                                            <div className="d-flex align-items-center td-cell">
                                                <img src={Icon1} alt='icon' />
                                               
                                                <span style={{color:"white"}}>{isNaN(parseFloat((parseFloat(totalrewardallocatedelemalgo)/1000000)))?0.00:parseFloat((parseFloat(totalrewardallocatedelemalgo)/1000000))}</span>
                                            </div>
                                        </div>
                                        {/* <div className="table-group-td text-end"> */}
                                        {/* <div className='table-group-td text-white'>APR</div> */}
                                        <div className="table-group-td text-end"  style={{color:"white"}}>{lock == true ? (<>{day}d:{hour}h:{min}m:{sec}s</>):(<>{0}d:{0}h:{0}m:{0}s</>)}
                                          
                                            <p>left</p>
                                        </div>
                                
                                    </div>
                                    </Link>
                                   

                                </div>
                                    )
                                })}
                            </div>

                         

                                </>}     
                            
                            </div>
                            <div className="pagination-footer d-flex align-items-center justify-content-between">
                                <p>showing 1-1 from 1</p>

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

                           
                        </Col>
                    </Row>
                </Container>
            </div>
        </Layout>
    );
}

export default FarmPage;