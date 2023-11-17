import React, { Component, useState, useEffect, useContext, useRef } from 'react';
import { Modal, Button, ProgressBar, Form, InputGroup, Card, FormControl } from 'react-bootstrap';

import Image from '../../../assets/images/element_banner_sale.png';
import Icon from '../../../assets/images/post-icon-1.png';
import Logo from '../../../assets/images/modal-logo-new.png';
import SLogo from '../../../assets/images/elem-original.png';

import ReactDomServer from 'react-dom/server';
import ButtonLoad from 'react-bootstrap-button-loader'
import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';
// import {appOptinLaunchpad, assetOptinLaunchpad, donateLaunchpad} from '../apicallfunction';
import '../../toast-style-override.css'
import firebase from '../../../NFTFolder/firebase';

import abi from '../../DashboardNew/contracts/Launchpad/abi';
import launchpadabi from '../../DashboardNew/contracts/Launchpad/launchpadabi'
import {ercdata} from '../../DashboardNew/contracts/Launchpad/data';
import {launchdata} from '../../DashboardNew/contracts/Launchpad/launchpaddata'
import deployLaunchpad from '../../../assets/images/deploy-launchpad.png'
import { BinanceLaunchpadPost } from '../../../API/ApiFunctions';
import axios from 'axios';  
// import url from '../../../../configurl';
import { Link } from 'react-router-dom';
import web3 from "../../../web3";
const PostCard = () => {

    const [show, setShow] = React.useState(false);
    const [showDonate, setShowDonate] = React.useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseDonate = () => setShowDonate(false);
    const handleShowDonate = () => setShowDonate(true);

    const[loaderAppOpt, setLoaderAppOpt] = useState(false);

    const handleShowLoadAppOpt = () => setLoaderAppOpt(true);
    const handleHideLoadAppOpt = () => setLoaderAppOpt(false);

    const[loaderAssetOpt, setLoaderAssetOpt] = useState(false);

    const handleShowLoadAssetOpt = () => setLoaderAssetOpt(true);
    const handleHideLoadAssetOpt = () => setLoaderAssetOpt(false);

    const[loaderParticipate, setLoaderParticipate] = useState(false);

    const handleShowLoadParticipate = () => setLoaderParticipate(true);
    const handleHideLoadParticipate = () => setLoaderParticipate(false);

    const[whiteOpt, setLoaderWhiteOpt] = useState(false);

    const handleShowWhiteOpt = () => setLoaderWhiteOpt(true);
    const handleHideWhiteOpt = () => setLoaderWhiteOpt(false); 

    const [address, setAddress] = React.useState(false);
    const [connector, setConnector] = useState("");
    const [accounts, setaccount] = useState("");
    let[startdt,setstartdt] = useState("");
    const[enddt,setenddt] = useState("");
    const[clsdt,setclsdt] = useState("");
    const[goal,setgoal] = useState("");
    const[total,settotal] = useState("");
    const[rec,setrec]= useState("");
    const[creator,setCreator]= useState("");
    const[escrow,setescrow]= useState("");
    const[appid,setappid]= useState("");
    const[percent,setPercent]= useState(parseFloat(""));
    const[date,setdate]= useState("");
    const[time,settime]= useState("");
    const[map1,setMap]= useState([]);
    const[day,setTime4]= useState("");
    const[hour,setTim1]= useState("");
    const[min,setTim2]= useState("");
    const[sec,setTim3]= useState("");
    const[lock,setlock]= useState(""); 
    const [appOpt,setToAppOpt] = useState(false);
    const [assetOpt,setToAssetOpt] = useState(false);
    const [asset,setToasset] = useState("");
    const [amount_inp, setToamount] = useState("");
    const [amtReclaim, setToReclaim] = useState("");
    const [LocalAmount, setLocalAmount] = useState("");
    // const [show, setShow] = useState(false);
    const [value, setValue] = React.useState('');
    const [valueAddAddress, setValueAddAddress] = React.useState('');
    const [addrAddAddress, setValueAddrAddAddress] = React.useState('');
    const [algoBalance, setAlgoBalance] = useState("");
    const [elemBalance, setElemBalance] = useState("");
    const [Tokenstartdate, setTokenstartdate] = useState("");
    const[enddatelaunchpad,setLaunchpadenddate]=useState("");
    const[createdToken, setCreatedToken] = useState("");
    const[createdLaunchpad, setCreatedLaunchpad] = useState("");
    const [tokenname, setTokenname] = useState("");

    const handleAssetFalse = () => setToAssetOpt(false);
    const handleAssetTrue = () => setToAssetOpt(true);





    const toastDiv = (txId) =>
    (
        <div>
            <p> Transaction is successful &nbsp;<a style={{color:'#133ac6'}} href={txId} target="_blank" rel="noreferrer"><br/><p style={{fontWeight: 'bold'}}>View in  Explorer <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
     <path d="M11.7176 3.97604L1.69366 14L0.046875 12.3532L10.0697 2.32926H1.23596V0H14.0469V12.8109H11.7176V3.97604Z" fill="#133ac6"/>
     </svg></p></a></p>  
        </div>
    );

    // let   erccontract = new web3.eth.Contract(abi,createdToken);
    // const approve = async()=>{
    //     handleShowLoadParticipate();
    //     const accounts = await  web3.eth.getAccounts();
    //     let amount =  1000000000000000000 +"000000000000000000"; 
    //     try{
    //         console("createdLauchpad",createdLaunchpad);
    //         await erccontract.methods.approve(createdLaunchpad,web3.utils.toBN((amount))).send({
    //             from:accounts[0],              
    //             // gas: 210000,
    //             //gasPrice: '20000000000'
    //             }).on('transactionHash',function(hash){      
    //                 console.log("hashget",hash)                                                
    //                 let id = "https://rinkeby.etherscan.io/tx/" + hash;
    //                 toast.success(toastDiv(id));
                    
    //             })
    //             // handleHideLoadParticipate();
    //             console.log("approved ")
    //     }
    //     catch(err){
    //         handleHideLoadParticipate();
    //         toast.error(`err`,err)
    //     }
    //     // setdaiapproved(true)    
    
    // }

    const Deploy = async () => {
        handleShowLoadParticipate();
        handleCloseDonate();
        if (localStorage.getItem("walletAddress") === "")
        {
            toast.error("Connect your wallet");
            handleHideLoadParticipate();
        }
        else{
       
      try {
        const accounts = await web3.eth.getAccounts();
 //deploy ERC       
        const createdtoken = await abi.deploy({
      
            data:ercdata,
            arguments: ["ERCToken","ERC20"]        
            })
            .send({
            from: accounts[0],
            gas: 4796559,
            gasPrice: '20000000000'
          }).
          on('transactionHash',function(hash){      

          
           let id = "https://mumbai.polygonscan.com/tx/" + hash;
           toast.success(toastDiv(id));
         
           })


          setCreatedToken(createdtoken.options.address);
          
          setTokenname( await createdtoken.methods.name().call())
         console.log("name",tokenname);
          localStorage.setItem("createdERC20",createdtoken.options.address);
//Launchpad deploy
          const createLaunchpad = await launchpadabi.deploy({
      
            data:launchdata,
            arguments: [createdtoken.options.address]        
            })
            .send({
            from: accounts[0],
            gas: 4796559,
            gasPrice: '20000000000'
          }).
          on('transactionHash',function(hash){      

          
           let id = "https://mumbai.polygonscan.com/tx/" + hash;
           toast.success(toastDiv(id));
         
           })


         setCreatedLaunchpad(createLaunchpad.options.address);


         setTokenstartdate( await createLaunchpad.methods.raiseBy().call())
         console.log("datelaunchpad",Tokenstartdate);
         setLaunchpadenddate( await createLaunchpad.methods.completeAt().call())

    //      let refactivity= await firebase.database().ref(`ContractAutoDeploy/${accounts[0]}`);   
    //      const db = refactivity.push().key;                         
    //      await refactivity.child(db).set({
    //      keyId:db,
    //      Owner:accounts[0],
    //      DepositToken:"eth",
    //      purchaseTokenAddress:createdtoken.options.address,
    //      Tokenname:tokenname,
    //      contractAddress:createLaunchpad.options.address,
    //      startdate:Tokenstartdate,
    //      enddate:enddatelaunchpad,
        
        
        
    //  })

    let enddate=await createLaunchpad.methods.raiseBy().call();
    console.log("enddate",enddate);

        
         
        // let  erccontract = new web3.eth.Contract(abi, createLaunchpad.options.address);
        localStorage.setItem("CreatedLaunchpad",createLaunchpad.options.address);

          console.log("launchpadaddreess",createdLaunchpad)
        

          console.log("check1")

        let createdercToken = localStorage.getItem("createdToken");
        console.log("createdToken",createdtoken.options.address)
        console.log("createddata",createdtoken);
//approve
        let amount =  1000000000000000000 +"000000000000000000"; 
        await createdtoken.methods.approve(createLaunchpad.options.address,web3.utils.toBN((amount))).send({
            from:accounts[0],              
            // gas: 210000,
            //gasPrice: '20000000000'
            }).on('transactionHash',function(hash){      
                console.log("hashget",hash)                                                
                let id = "https://mumbai.polygonscan.com/tx/" + hash;
                toast.success(toastDiv(id));
                
            })


    
//mint
            let amountmint =  1000000000000000000 +"000000"; 
            await createdtoken.methods.mint(createLaunchpad.options.address,web3.utils.toBN((amountmint))).send({
                from:accounts[0],              
                // gas: 210000,
                //gasPrice: '20000000000'
                }).on('transactionHash',function(hash){      
                    console.log("hashget",hash)                                                
                    let id = "https://mumbai.polygonscan.com/tx/" + hash;
                    toast.success(toastDiv(id));
                    
                })
    
    
    await BinanceLaunchpadPost(createLaunchpad.options.address,createdtoken.options.address,enddate);


        handleHideLoadParticipate();   
        window.location.reload();
         
        } catch (err) {
          toast.error(`Transaction Failed due to ${err}`);
          handleHideLoadParticipate();
          console.error(err);
        }

        
          
      
        }
    }

    
  
   

useEffect(async() => {
    await first()
}, [day, hour, min, sec, lock]);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }

const first = async () => {

    var us= enddt;
    var ff=new Date(us);
setdate(ff.toDateString());
var hours = ff.getHours();
  var minutes = ff.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  settime( hours + ':' + minutes + ' ' + ampm);
//settime(lock);
var countDowndate   =us * 1000;
// //console.log(countDowndate);
// var countDownDate = new Date().getTime() + (lock * 1000) ;
//alert(time);
    var x = setInterval(function() {
       var now = new Date().getTime();
      var distance = countDowndate - now ;
    //    //console.log("-------------------now", distance);
     //  //console.log(now);
      // Time calculations for days, hours, minutes and seconds
     var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
    //    //console.log("date e", day);
    //    //console.log("hour e", hour);
    //    //console.log("min e", minutes);
    //    //console.log("sec e", seconds);

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

           //  //console.log('CountDown Finished');
        }
        else{
         setlock(true);
        }

    
      
    }, 1000);
   

}








    return (
        
        <>
        <><ToastContainer position='bottom-right' draggable = {false} transition={Zoom} autoClose={10000} closeOnClick = {false}/></>
            <Card className='card-dash border-0 d-block'>
                {/* <div className="mb-3">
                    <img src={deployLaunchpad} className="w-100 img-fluid rounded-16" alt="post img" />
                </div> */}

                <div className="post-card-title mb-2 w-100 d-flex align-items-center">
                    {/* <img src={deployLaunchpad} width="50" height="50" alt="icon" /> */}
                    <div>
                        {/* <h6 className='m-0'>Launchpad</h6> */}
                        {createdToken === "" ? <></> : <><center><h5>Created Token: <strong>{createdToken}</strong></h5></center><br/></>}
                        {/* <span className='d-block'>ELEM</span> */}
                    </div>

                  
                </div>

                 <div className="post-card-body mb-3">
                   
                     <div>
                        {/* <h6 className='m-0'>Launchpad</h6> */}
                        {createdLaunchpad === "" ? <></> : <><center><h5>Created CrowdFunding Contract: <strong>{createdLaunchpad}</strong></h5></center><br/></>}
                        {/* <span className='d-block'>ELEM</span> */}
                    </div>
                </div> 

                <div className="post-card-footer">
                    <div>
                    <ButtonLoad loading={loaderParticipate} className='w-100 btn-blue' onClick={Deploy}>Deploy CrowdFunding</ButtonLoad>                                   
                    </div>
                  
                </div>
             
            </Card>

        </>
    );
};

export default PostCard;