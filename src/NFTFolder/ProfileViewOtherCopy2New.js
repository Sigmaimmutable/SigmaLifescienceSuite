/* eslint-disable use-isnan */
import React, { useState,useEffect} from "react";
//import Layout from '../components/Layouts/LayoutInner';
//import Layout from '../components/Dashboard/Layout';
import Layout from '../components/DashboardNew/Layout';
import {Container, Button, Modal, Toast, Dropdown} from 'react-bootstrap';
import {
    Link,useLocation,useHistory
  } from "react-router-dom";
import DummyPic from '../assets/images/dummy-icon.svg'
//import DummyPic from '../assets/images/dummy-icon.svg';
//import ProfileTabs from './Sections/ProfileTabs';
import firebase from './firebase';
//import ProfileTabs from "./Sections/ProfileTabs";
import ProfileTabsOther from "./ProfileTabsOther";
import Algopng from '../assets/images/Algo.png'
//const axios = require('axios');


function ProfileViewOtherCopy2New (props) { 
  // React.useEffect(() => {
  //   window.scrollTo(0, 0);     
  // });
    const location = useLocation(); 
    let history=useHistory();
    //console.log("BannerNew",location.state.ownerAddress)        
    //console.log("followlast",location.state.follow[0].follower)
    //console.log("followlast2",location.state.follow[0].following)
    
    const [show, setShow] = React.useState(false);
    const [toast, setToast] = React.useState(false);
    const [followers, setFollowers] = React.useState(false);
    const [following, setFollowing] = React.useState(false);
    const[getImgreffalgo,setgetImgreffalgo]=useState([]);
    const[getIPro,setgetIPro]=useState([""]);
    //console.log("getIPro",getIPro) 
    //console.log("getImgalgo",getImgreffalgo)
    const[getImgreffalgosale,setgetImgreffalgosale]=useState([]);
    console.log("getImgalgosaleBanner",getImgreffalgosale)
    const[getImgreffalgobuy,setgetImgreffalgobuy]=useState([]);
    //console.log("getImgalgobuy",getImgreffalgobuy)

    const handleClose = () => {setShow(false); setFollowers(false); setFollowing(false)};
    //const handleShow = () => setShow(true);
    //const handleFollowers = () => setFollowers(true);
    //const handleFollowing = () => setFollowing(true);

    //title:props.NFTName,amount:props.NFTPrice,appid:props.Appid,assetid:props.Assetid,escrowaddress:props.EscrowAddress,historyaddress:props.HistoryAddress,imageurl:props.Imageurl,ipfsurl:props.Ipfsurl,nftdescription:props.NFTDescription,TimeStamp:props.TimeStamp,keyId:props.keyId,ownerAddress:props.ownerAddress,previousaddress:props.previousaddress,userSymbol:props.userSymbol

    //const[getIf,setgetIf]=useState([""]); 
    //console.log("gethome",getIf)        
    //const[getIfo,setgetIfo]=useState([null]); 
    //console.log("gethomeo",getIfo)        
    //const[getIfl,setgetIfl]=useState([null]); 
    //console.log("gethomefl",getIfl)   
    
    const[getdbLike,setdbLike]=useState([]);
    //console.log("getdbLike",getdbLike)
    const dbLike=async()=>{    
        let req = [];
        
        if(location.state.ownerAddress === null || location.state.ownerAddress === "" || location.state.ownerAddress === undefined){
          history.push("/")
          window.location.reload(false);    
        }else{      
          let getalgo=localStorage.getItem("wallet");              
          firebase.database().ref("dblike").child(location.state.ownerAddress).on("value", (data) => {
            if (data) {
              data.forEach((d) => {                                             
                req.push(            
                  {
                    Assetid:d.val().Assetid,
                    Imageurl:d.val().Imageurl,
                    NFTPrice:d.val().NFTPrice,
                    keyId:d.val().keyId,
                    NFTName:d.val().NFTName,
                    userSymbol:d.val().userSymbol,
                    Ipfsurl:d.val().Ipfsurl,
                    ownerAddress:d.val().ownerAddress,
                    previousoaddress:d.val().previousoaddress,
                    TimeStamp:d.val().TimeStamp,
                    NFTDescription:d.val().NFTDescription,
                    HistoryAddress:d.val().HistoryAddress,
                    Appid:d.val().Appid,
                    valid:d.val().valid,
                    CreatorAddress:d.val().CreatorAddress,
                    like:d.val().like
                  })                
              });        
              setdbLike(req);
            }            
          });                  
        }        
    }
    useEffect(()=>{dbLike()},[])

    const dbcallPro=async()=>{            
      let r=[];
      try {         
      if(location.state.ownerAddress === null || location.state.ownerAddress === "" || location.state.ownerAddress === undefined){
        history.push("/")
        window.location.reload(false);    
      }else{      
      firebase.database().ref("userprofile").child(location.state.ownerAddress).on("value", (data) => {          
        if (data) {                      
            r.push({
              Bio:data.val().Bio,
              Customurl: data.val().Customurl,
              Email: data.val().Email,
              Imageurl:data.val().Imageurl,
              Personalsiteurl: data.val().Personalsiteurl,
              TimeStamp: data.val().TimeStamp,
              Twittername: data.val().Twittername,
              UserName: data.val().UserName,
              WalletAddress: data.val().WalletAddress,
              bgurl:data.val().bgurl,
              valid:data.val().valid 
            })                
        }
        else{
          setgetIPro([""]);  
        }
        setgetIPro(r);
      });   
    }               
    } catch (error) {
      //console.log('error occured during search', error);    
    }                
    }    
  useEffect(()=>{dbcallPro()},[])



    const dbcallowner=async()=>{      
      // //console.log("Insowner",location.state.ownerAddress)    
      // let reqoo = [];      
      // try {
      //   if(firebase.database().ref("followings").child(location.state.ownerAddress) === undefined){
      //     alert("nono")
      //   }
      //   else{
      //     firebase.database().ref("followings").child(location.state.ownerAddress).on("value", (data) => {
      //       //console.log("Insowners",data)
      //       if (data) {                            
      //         //console.log("tataam",data.val())
      //         reqoo.push({
      //           TimeStamp:data.val().TimeStamp,
      //           follower:data.val().follower,
      //           following:data.val().following,
      //           walletAddress:data.val().walletAddress, 
      //         })          
      //       }
      //       // else{
      //       //   setgetIfo([""]);  
      //       // }
      //       setgetIfo(reqoo);
      //     }) 
      //   }          
      // } catch (error) {
      //   //console.log('error occured during search', error);
      // }          
    }
    
  useEffect(()=>{dbcallowner()},[])

  const dbcallother=async()=>{    
    // let reqo = [];    
    //   try {  
    //     if(firebase.database().ref("followings").child(localStorage.getItem("wallet")) === undefined)       
    //     {          
    //       alert("nono2")                
    //     }
    //     else{
    //     firebase.database().ref("followings").child(localStorage.getItem("wallet")).on("value", (data) => {
    //     if (data) {        
          
    //       reqo.push({
    //         TimeStamp:data.val().TimeStamp,
    //         follower:data.val().follower,
    //         following:data.val().following,
    //         walletAddress:data.val().walletAddress, 
    //         })          
    //     }
    //     // else{
    //     //   setgetIfl([""]);  
    //     // }
    //     setgetIfl(reqo);
    //   });
    //   }
      
    // } catch (error) {
    //   //console.log('error occured during search', error);    
    // }          
  }  
useEffect(()=>{dbcallother()},[])


    // const dbcallsaleal=async(index)=>{        
    //     let req2 = [];
    //     if(localStorage.getItem("wallet")  === null || localStorage.getItem("wallet")  === "" || localStorage.getItem("wallet")  === " " || localStorage.getItem("wallet") === 'undefined' || localStorage.getItem("wallet") === '' || localStorage.getItem("wallet") === "0x"){
    //     }
    //     else{                        
    //       axios({
    //                 method: 'get',
    //                 url: 'https://demonft-2e778-default-rtdb.firebaseio.com/followings.json',
    //                 responseType: 'stream'
    //               })
    //                 .then(function (response) {
    //                 let req = [];        
    //                 req.push(response.data)
    //                 let req2 =[];
    //                 req.forEach((a) => {              
    //                   console.log("Ddhome",a) 
    //                   Object.keys(a).map(async(b)=>{                              
    //                     console.log("Dadhomel",a[b].walletAddress)                       
    //                       req2.push({                      
    //                         TimeStamp:a[b].TimeStamp,
    //                         follower:a[b].follower,
    //                         following:a[b].following,
    //                         walletAddress:a[b].walletAddress,                  
    //                       })   
    //                     //}                        
    //                   })                                                                     
    //                 });                        
    //                 setgetIfo(req2)  
    //       })              
    //   } 
    // }
    // useEffect(()=>{dbcallsaleal()},[])


    const dbcallalgo=async()=>{
        //console.log("inside dbcallalgo function")  
        let req = [];        
        if(location.state.ownerAddress === null || location.state.ownerAddress === "" || location.state.ownerAddress === undefined){
          history.push("/")
          window.location.reload(false);    
        }else{      
          firebase.database().ref("imagerefAlgo").child(location.state.ownerAddress).on("value", (data) => {
            if (data) {
              data.forEach((d) => {
                //console.log("keycheck",d.key)
                let value=d.val();
                req.push(            
                  {
                  Assetid:value.Assetid,
                  Imageurl:value.Imageurl,
                  NFTPrice:value.NFTPrice,
                  EscrowAddress:value.EscrowAddress,
                  keyId:value.keyId,
                  NFTName:value.NFTName,
                  userSymbol:value.userSymbol,
                  Ipfsurl:value.Ipfsurl,
                  ownerAddress:value.ownerAddress,
                  previousoaddress:value.previousoaddress,
                  TimeStamp:value.TimeStamp,
                  NFTDescription:value.NFTDescription,
                  HistoryAddress:value.HistoryAddress,
                  Appid:value.Appid,
                  valid:value.valid,
                  CreatorAddress:value.CreatorAddress
                  }          
                )
                //image:images/content/card-pic-1.jpg
                //image2x: "/images/content/card-pic-1@2x.jpg",
      
                //req.push(d.key)          
              });        
            }
            setgetImgreffalgo(req);
          });
          
        }
        //}
        //console.log("acc",getalgo)
    }   
    useEffect(()=>{dbcallalgo()},[])

    const dbcallsalealgo=async()=>{       
        let req = [];              
        if(location.state.ownerAddress === null || location.state.ownerAddress === "" || location.state.ownerAddress === undefined){
          history.push("/")
          window.location.reload(false);    
        }else{      
          firebase.database().ref("imagerefexploreoneAlgosBoson").child(location.state.ownerAddress).on("value", (data) => {
            if (data) {
              data.forEach((d) => {                
                let value=d.val();
                req.push(            
                  {
                    Assetid:value.Assetid,
                    Imageurl:value.Imageurl,
                    NFTPrice:value.NFTPrice,
                    EscrowAddress:value.EscrowAddress,
                    keyId:value.keyId,
                    NFTName:value.NFTName,
                    userSymbol:value.userSymbol,
                    Ipfsurl:value.Ipfsurl,
                    ownerAddress:value.ownerAddress,
                    previousoaddress:value.previousoaddress,
                    TimeStamp:value.TimeStamp,
                    NFTDescription:value.NFTDescription,
                    HistoryAddress:value.HistoryAddress,
                    Appid:value.Appid,
                    valid:value.valid  
                  },                
                )
              });        
            }
            setgetImgreffalgosale(req);  
          });       
        }           
        //console.log("accsale",getImgreffalgosale)      
    }      
    useEffect(()=>{dbcallsalealgo()},[])

    

    const dbcallalgobuy=async()=>{    
        let req = [];          
        if(location.state.ownerAddress === null || location.state.ownerAddress === "" || location.state.ownerAddress === undefined){
          history.push("/")
          window.location.reload(false);    
        }else{      
        firebase.database().ref("imagerefbuy").child(location.state.ownerAddress).on("value", (data) => {      
            if (data) {
              data.forEach((d) => {                
                let value=d.val();
                req.push(            
                  {
                    Assetid:value.Assetid,
                    Imageurl:value.Imageurl,
                    NFTPrice:value.NFTPrice,
                    EscrowAddress:value.EscrowAddress,
                    keyId:value.keyId,
                    NFTName:value.NFTName,
                    userSymbol:value.userSymbol,
                    Ipfsurl:value.Ipfsurl,
                    ownerAddress:value.ownerAddress,
                    previousoaddress:value.previousoaddress,
                    TimeStamp:value.TimeStamp,
                    NFTDescription:value.NFTDescription,
                    HistoryAddress:value.HistoryAddress,
                    Appid:value.Appid,
                    valid:value.valid   
                  },                
                )      
              });        
            }
            setgetImgreffalgobuy(req);
          });       
        }                   
    }      
    useEffect(()=>{dbcallalgobuy()},[])
      
    const followstart=async()=>{                      
      // if( getIfl[0] === null || getIfl[0] === undefined || getIfl[0] === "" || getIfl[0] === NaN || getIfo[0] === "" || getIfo[0] === null || getIfo[0] === undefined || getIfo[0] === NaN){
      //   let ref2=firebase.database().ref(`followings/${localStorage.getItem('wallet')}`);
      //   let ref22=firebase.database().ref(`followings/${location.state.ownerAddress}`);
      //   let dateset=new Date().toDateString();                                         
      //   let arr1=[];
      //   let arr11=[];
      //   arr1.push(location.state.ownerAddress)
      //   arr11.push(localStorage.getItem('wallet'))
      //   ref2.set({        
      //     walletAddress:localStorage.getItem('wallet'),TimeStamp:dateset,following:arr1,follower:""})
      //     .then(()=>{
      //       ref22.set({        
      //         walletAddress:location.state.ownerAddress,TimeStamp:dateset,following:"",follower:arr11})
      //         .then(()=>{    
      //           alert("done1")              
      //           })                  
      //       })                           
      // }
      // else if((getIfl[0] === null || getIfl[0] === undefined || getIfl[0] === "" || getIfl[0] === NaN ) && (getIfo[0] !== "" || getIfo[0] !== null || getIfo[0] !== undefined || getIfo[0] !== NaN)){

      //   //local null && owner entry
      //   let dateset=new Date().toDateString();      
      //   //console.log("nullnew1","null1")                  
      //   let ref1=firebase.database().ref(`followings/${localStorage.getItem('wallet')}`);
      //   let ref11=firebase.database().ref(`followings/${location.state.ownerAddress}`);
      //   //let allarr1=getIfl[0].following.concat(location.state.alldata.ownerAddress) 
      //   //let allarr11=getIfl[0].follower
      //   let allarr2=getIfo[0].following 
      //   let allarr22=getIfo[0].follower.concat(localStorage.getItem('wallet'))
      //   //let chars1 = allarr1
      //   //let uniqueChars1 = new Set(chars1);
      //   //console.log("uni1",uniqueChars1);//ramfollowing local
      //   //let chars11 = allarr11                
      //   //let uniqueChars11 = new Set(chars11);
      //   //console.log("uni11",uniqueChars11);//ramfollow local
      //   let chars2 = allarr2      
      //   let uniqueChars2 = new Set(chars2);
      //   //console.log("uni2",uniqueChars2);//thiru following
      //   let chars22 = allarr22        
      //   let uniqueChars22 = new Set(chars22);
      //   //console.log("uni22",uniqueChars22);//thiru follow
      //   let arr1=[]        
      //   arr1.push(location.state.ownerAddress)        
      //   ref1.set({  
      //     walletAddress:localStorage.getItem('wallet'),TimeStamp:dateset,following:arr1,follower:""})
      //     .then(()=>{    
      //       ref11.update({        
      //         walletAddress:location.state.ownerAddress,TimeStamp:dateset,following:uniqueChars2,follower:uniqueChars22})
      //         .then(()=>{    
      //           alert("alert")                
      //           })                              
      //       })                  
      // }
      // else if((getIfo[0] === "" || getIfo[0] === null || getIfo[0] === undefined || getIfo[0] === NaN ) && (getIfl[0] !== null || getIfl[0] !== undefined || getIfl[0] !== "" || getIfl[0] !== NaN)){

      //   //owner null && local entry
      //   let dateset=new Date().toDateString();      
      //   //console.log("nullnew1","null1")                  
      //   let ref1=firebase.database().ref(`followings/${localStorage.getItem('wallet')}`);
      //   let ref11=firebase.database().ref(`followings/${location.state.ownerAddress}`);
      //   let allarr1=getIfl[0].following.concat(location.state.ownerAddress) 
      //   let allarr11=getIfl[0].follower
      //   //let allarr2=getIfo[0].following 
      //   //let allarr22=getIfo[0].follower.concat(localStorage.getItem('wallet'))
      //   let chars1 = allarr1
      //   let uniqueChars1 = new Set(chars1);
      //   //console.log("uni1",uniqueChars1);//ramfollowing local
      //   let chars11 = allarr11                
      //   let uniqueChars11 = new Set(chars11);
      //   //console.log("uni11",uniqueChars11);//ramfollow local
      //   //let chars2 = allarr2      
      //   //let uniqueChars2 = new Set(chars2);
      //   //console.log("uni2",uniqueChars2);//thiru following
      //   //let chars22 = allarr22        
      //   //let uniqueChars22 = new Set(chars22);
      //   //console.log("uni22",uniqueChars22);//thiru follow
      //   let arr1=[]        
      //   arr1.push(localStorage.getItem('wallet'))        
      //   ref1.set({  
      //     walletAddress:localStorage.getItem('wallet'),TimeStamp:dateset,following:uniqueChars1,follower:uniqueChars11})
      //     .then(()=>{    
      //       ref11.set({        
      //         walletAddress:location.state.ownerAddress,TimeStamp:dateset,following:"",follower:arr1})
      //         .then(()=>{    
      //           alert("alert")                
      //           })                              
      //       })                  
      // }
      // else{
      //   let dateset=new Date().toDateString();      
      //   //console.log("nullnew1","null1")                  
      //   let ref1=firebase.database().ref(`followings/${localStorage.getItem('wallet')}`);
      //   let ref11=firebase.database().ref(`followings/${location.state.ownerAddress}`);
      //   let allarr1=getIfl[0].following.concat(location.state.ownerAddress) 
      //   let allarr11=getIfl[0].follower
      //   let allarr2=getIfo[0].following 
      //   let allarr22=getIfo[0].follower.concat(localStorage.getItem('wallet'))
      //   let chars1 = allarr1
      //   let uniqueChars1 = new Set(chars1);
      //   //console.log("uni1",uniqueChars1);//ramfollowing local
      //   let chars11 = allarr11                
      //   let uniqueChars11 = new Set(chars11);
      //   //console.log("uni11",uniqueChars11);//ramfollow local
      //   let chars2 = allarr2      
      //   let uniqueChars2 = new Set(chars2);
      //   //console.log("uni2",uniqueChars2);//thiru following
      //   let chars22 = allarr22        
      //   let uniqueChars22 = new Set(chars22);
      //   //console.log("uni22",uniqueChars22);//thiru follow

      //   ref1.update({  
      //     walletAddress:localStorage.getItem('wallet'),TimeStamp:dateset,following:uniqueChars1,follower:uniqueChars11})
      //     .then(()=>{    
      //       ref11.update({        
      //         walletAddress:location.state.ownerAddress,TimeStamp:dateset,following:uniqueChars2,follower:uniqueChars22})
      //         .then(()=>{    
      //           alert("alert")                
      //           })                              
      //       })                          
      // }      
    }

    return (
        <Layout>
          <div className="page-content">
            <Container fluid="lg">
                <div className="profile-banner">
                    <div className="profile-card">
                      {getIPro[0] === null || getIPro[0] === "" || getIPro[0] === undefined || getIPro[0] === NaN || getIPro[0] === " " ? (
                        <>
                      <img src={DummyPic} alt="pic" width={"1500px"} height={"260px"} />
                    </>
                    ):(
                      <>
                      {getIPro[0].bgurl === null || getIPro[0].bgurl === "" || getIPro[0].bgurl === undefined || getIPro[0].bgurl === " " || getIPro[0].bgurl === NaN ? (<>
                          <img src={DummyPic} alt="pics" width={"1500px"} height={"260px"} />
                        </>):(
                          <>
                          <img src={getIPro[0].bgurl} alt="pic" width={"1500px"} height={"260px"}/>
                        </>
                        )}                        
                    </>
                    )}                      
                    </div>                    
                    {getIPro[0] === null || getIPro[0] === "" || getIPro[0] === undefined || getIPro[0] === NaN || getIPro[0] === " " ? (
                      <div className="profile-pic">
                      <img src={DummyPic} alt="pic" />
                      </div>
                    ):(
                      <>
                      {getIPro[0].Imageurl === null || getIPro[0].Imageurl === "" || getIPro[0].Imageurl === undefined || getIPro[0].Imageurl === " " || getIPro[0].Imageurl === NaN ? (<>
                        <img src={DummyPic} alt="pic" />
                      </>):(<>
                      <div className="profile-pic">
                      <img src={getIPro[0].Imageurl} alt="pic" />                      
                      </div>                                              
                      </>)}                      
                      </>
                    )}
                    
                </div>

                <div className="mb-36 text-center">
                {location.state.ownerAddress === null || location.state.ownerAddress === "" || location.state.ownerAddress === undefined ? (<>                                                
                        </>):(<>
                    <Button variant='copy-code' className="btn"  onClick={() => { navigator.clipboard.writeText(location.state.alldata.ownerAddress); setToast(true)}}>
                        <img src={Algopng} alt="icon" />                        
                          {!toast ? <span>{(location.state.ownerAddress).slice(0,8)}....{(location.state.ownerAddress).slice(52,58)}</span> : (
                            <Toast className='toast-text' onClose={() => {setToast(false); handleClose();}} show={toast} autohide delay={1500}>
                                <Toast.Body>Copied!</Toast.Body>
                            </Toast>  
                        )}                                                                        
                    </Button>
                    </>)}                    
                </div>

                <div className="mb-32 d-flex align-items-center justify-content-center">                                    
                    {/* <Button variant='link' onClick={handleFollowers} className='btn-reset'><span>0</span> <span className='ms-1 text-gray'>followers</span></Button>
                    <Button variant='link' onClick={handleFollowing} className='btn-reset ms-4'><span>0</span> <span className='ms-1 text-gray'>following</span></Button> */}
                </div>

                <div className="mb-4 text-center d-flex align-items-center justify-content-center">
                    {/* <Link to="/profile" className='btn btn-white'>Edit profile</Link> */}
                    {/* <Button variant='link' onClick={()=>followstart()} className='btn d-md-block d-none btn-grad' >
                    <span>Follow</span>
                    </Button> */}
                    &nbsp;
                    <Dropdown className='dropdown-noarrow ms-2'>
                        <Dropdown.Toggle variant="white" className='btn-round btn-round-sm'>
                            <svg viewBox="0 0 15 16" fill="none" width="16" height="16" xlmns="http://www.w3.org/2000/svg" className="sc-bdvvtL sc-hKwDye esgSbr"><path fillRule="evenodd" clip-rule="evenodd" d="M11.7086 5.2928L7.00146 0.585693L2.29436 5.2928C1.90383 5.68332 1.90383 6.31649 2.29436 6.70701C2.68488 7.09754 3.31805 7.09754 3.70857 6.70701L6.00146 4.41412V11C6.00146 11.5523 6.44918 12 7.00146 12C7.55375 12 8.00146 11.5523 8.00146 11V4.41412L10.2944 6.70701C10.6849 7.09754 11.318 7.09754 11.7086 6.70701C12.0991 6.31649 12.0991 5.68332 11.7086 5.2928ZM1.00146 10C1.55375 10 2.00146 10.4477 2.00146 11V14H12.0015V11C12.0015 10.4477 12.4492 10 13.0015 10C13.5538 10 14.0015 10.4477 14.0015 11V15C14.0015 15.5523 13.5538 16 13.0015 16H1.00146C0.44918 16 0.00146484 15.5523 0.00146484 15V11C0.00146484 10.4477 0.44918 10 1.00146 10Z" fill="currentColor"></path></svg>
                        </Dropdown.Toggle>
                        
                        <Dropdown.Menu className='link-flex text-center dropdown-share py-3 px-3'>
                            <h3>Share link to this page</h3>
                            {/* <div className="d-flex mt-3 justify-content-between"> */}
                            <div className="footer-social d-flex align-items-center">                                                                                   
                                <div>                                
                                    <a href={"https://twitter.com/ElementDeFi"} target="_blank" rel="noopener noreferrer">                                      
                                        <svg viewBox="0 0 18 16" fill="none" width="40" height="16" xlmns="http://www.w3.org/2000/svg" className="sc-bdvvtL sc-hKwDye esgSbr"><path d="M17.9655 2.42676C17.3018 2.71851 16.593 2.91726 15.8468 3.00801C16.6073 2.54976 17.1922 1.82751 17.469 0.965759C16.7558 1.38201 15.9653 1.68501 15.1238 1.85376C14.4518 1.13451 13.494 0.684509 12.4305 0.684509C10.3927 0.684509 8.7405 2.33676 8.7405 4.37226C8.7405 4.66476 8.77425 4.94601 8.83575 5.21526C5.76825 5.07051 3.0495 3.59751 1.23 1.37076C0.90975 1.91226 0.7305 2.54151 0.7305 3.22701C0.7305 4.50951 1.383 5.63676 2.3715 6.29901C1.76625 6.27951 1.197 6.11301 0.7005 5.83701V5.88276C0.7005 7.67151 1.97025 9.16326 3.66 9.50301C3.35025 9.58626 3.02325 9.63126 2.688 9.63126C2.4525 9.63126 2.22675 9.60876 2.001 9.56676C2.47425 11.0315 3.83475 12.0995 5.454 12.1295C4.194 13.1188 2.59725 13.7083 0.8775 13.7083C0.585 13.7083 0.29325 13.691 0 13.658C1.64175 14.7035 3.576 15.3148 5.66775 15.3148C12.4583 15.3148 16.167 9.69276 16.167 4.82526C16.167 4.66851 16.167 4.51026 16.1558 4.35276C16.8765 3.83601 17.5057 3.18276 18.0007 2.44176L17.9655 2.42676Z" fill="currentColor"></path></svg>
                                   </a>
                                    <small className='d-block mt-2'>Twitter</small>
                                </div>
                                <div>                                
                                <a href={"https://github.com/BosonLabs/ELEMENTNFT_UI.git"} target="_blank" rel="noopener noreferrer">
                                        <svg viewBox="0 0 16 14" width="40" height="16" xlmns="http://www.w3.org/2000/svg" className="sc-bdvvtL sc-hKwDye esgSbr">
                                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                                        </svg>
                                </a>
                                    <small className='d-block mt-2'>Github</small>
                                </div>
                                
                                {/* <a href={"https://github.com/BosonLabs/ELEMENTNFT_UI.git"} target="_blank" rel="noopener noreferrer">                                
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="d-block mt-2" viewBox="0 0 16 16">
                                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                                </svg>
                                </a> */}                                
                                <div>
                                <a href={"https://t.me/elementSwap"} target="_blank" rel="noopener noreferrer">                                
                                        <svg viewBox="0 0 16 14" fill="none" width="40" height="16" xlmns="http://www.w3.org/2000/svg" className="sc-bdvvtL sc-hKwDye esgSbr"><path d="M15.9513 1.29916L13.5438 13.1556C13.377 13.997 12.8902 14.1987 12.21 13.8093L8.542 10.979L6.76804 12.7662C6.56797 12.9748 6.40125 13.1556 6.03445 13.1556C5.55428 13.1556 5.63431 12.9679 5.47425 12.495L4.20714 8.19051L0.572523 7.00834C-0.214421 6.76495 -0.22109 6.20168 0.745918 5.7914L14.9243 0.0891779C15.5711 -0.209841 16.1914 0.256072 15.9446 1.29221L15.9513 1.29916Z" fill="currentColor"></path></svg>
                                </a>
                                    <small className='d-block mt-2'>Telegram</small>
                                </div>
                                <div>
                                <a href={"https://medium.com/@ramachandran.baskar/nft-steps-513fae0c36a1"} target="_blank" rel="noopener noreferrer">                                
                                <svg viewBox="0 0 16 14" fill="none" width="40" height="16" xlmns="http://www.w3.org/2000/svg" className="sc-bdvvtL sc-hKwDye gVaYHr"><path d="M5.07644 11.25C7.88022 11.25 10.1531 8.89939 10.1531 5.99991C10.1531 3.10043 7.88004 0.75 5.07644 0.75C2.27284 0.75 0 3.09972 0 5.99991C0 8.9001 2.27267 11.25 5.07644 11.25Z" fill="currentColor"></path><path d="M13.1839 10.9419C14.5857 10.9419 15.7222 8.72942 15.7222 5.99991C15.7222 3.27111 14.5857 1.0579 13.1839 1.0579C11.7821 1.0579 10.6455 3.27111 10.6455 5.99991C10.6455 8.72871 11.7821 10.9419 13.1839 10.9419Z" fill="currentColor"></path><path d="M17.1072 10.4277C17.6003 10.4277 18 8.44542 18 5.99991C18 3.55458 17.6006 1.57207 17.1074 1.57207C16.6142 1.57207 16.2145 3.55511 16.2145 5.99991C16.2145 8.44471 16.6142 10.4277 17.1072 10.4277Z" fill="currentColor"></path></svg>
                                </a>
                                <small className='d-block mt-2'>Medium</small>
                                </div>
                                {/* <div>
                                <a href={"https://mail.google.com/"} target="_blank" rel="noopener noreferrer">                                                                
                                        <svg viewBox="0 0 24 24" width="40" height="16" xlmns="http://www.w3.org/2000/svg" className="sc-bdvvtL sc-hKwDye esgSbr"><path d="M12 12.713l-11.985-9.713h23.971l-11.986 9.713zm-5.425-1.822l-6.575-5.329v12.501l6.575-7.172zm10.85 0l6.575 7.172v-12.501l-6.575 5.329zm-1.557 1.261l-3.868 3.135-3.868-3.135-8.11 8.848h23.956l-8.11-8.848z" fill="currentColor"></path></svg>
                                </a>
                                    <small className='d-block mt-2'>E-mail</small>
                                </div> */}
                            </div>
                        </Dropdown.Menu>
                    </Dropdown>
                    {/* <Dropdown className='dropdown-noarrow ms-2'>
                        <Dropdown.Toggle variant="white" className='btn-round btn-round-sm'>
                            <svg viewBox="0 0 14 4" fill="none" width="16" height="16" xlmns="http://www.w3.org/2000/svg" className="sc-bdvvtL sc-hKwDye esgSbr"><path fillRule="evenodd" clip-rule="evenodd" d="M3.5 2C3.5 2.82843 2.82843 3.5 2 3.5C1.17157 3.5 0.5 2.82843 0.5 2C0.5 1.17157 1.17157 0.5 2 0.5C2.82843 0.5 3.5 1.17157 3.5 2ZM8.5 2C8.5 2.82843 7.82843 3.5 7 3.5C6.17157 3.5 5.5 2.82843 5.5 2C5.5 1.17157 6.17157 0.5 7 0.5C7.82843 0.5 8.5 1.17157 8.5 2ZM11.999 3.5C12.8274 3.5 13.499 2.82843 13.499 2C13.499 1.17157 12.8274 0.5 11.999 0.5C11.1706 0.5 10.499 1.17157 10.499 2C10.499 2.82843 11.1706 3.5 11.999 3.5Z" fill="currentColor"></path></svg>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className='link-flex dropdown-menu-right'>
                            <Dropdown.Item href="">Refresh Page</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown> */}
                </div>

{/* {location.state.ownerAddress === "" || location.state.ownerAddress === null || location.state.ownerAddress === undefined ? ( <></>):(<> */}
  <ProfileTabsOther create={getImgreffalgo} sale={getImgreffalgosale} buyed={getImgreffalgobuy} owner={location.state.ownerAddress} likes={getdbLike}/>
{/* </>)}             */}
            </Container>

            {/* onHide={handleClose} */}
            <Modal show={show} size="sm" className="modal-reset" centered >
                <Modal.Header closeButton>
                <Modal.Title>Update cover</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Upload new cover for your profile page. We recommend to upload images in 1440x260 resolution

                    <div className="mt-3">
                        <input type="file" hidden id='uploadFile' />
                        <label htmlFor="uploadFile" className='mb-3 btn btn-grad btn-lg w-100'>Select file</label>
                        <Button variant="white" className='w-100' size={'lg'} onClick={handleClose}>
                            Cancel
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>

            {/* onHide={handleClose} */}
            <Modal show={followers} size="sm" className="modal-reset" centered onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Followers</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Upload new cover for your profile page. We recommend to upload images in 1440x260 resolution

                    
                </Modal.Body>
            </Modal>
            {/* onHide={handleClose} */}
            <Modal show={following} size="sm" className="modal-reset" centered onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Following</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Upload new cover for your profile page. We recommend to upload images in 1440x260 resolution                    
                </Modal.Body>
            </Modal>
            </div>
        </Layout>
    );
}

export default ProfileViewOtherCopy2New;