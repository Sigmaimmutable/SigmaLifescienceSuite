import React,{useState,useEffect} from 'react';
import Layout from './LayoutT';
import { Link } from 'react-router-dom';
import { Card, Col, Container, Row, Tabs, Tab, Badge, Button, InputGroup, Form, Dropdown,Modal} from 'react-bootstrap';
import ButtonLoad from 'react-bootstrap-button-loader';
import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';
import Flickity from 'react-flickity-component'
import CardImage from '../../assets/images/card-image.jpg';
import Logo from '../../assets/images/algorand-logo.png';
import algonft from '../../assets/images/algonftlogo.jpg'
import Icon1 from '../../assets/images/elem-original.png';
import logogif from '../../assets/images/gif4.gif';
import firebase from '../../NFTFolder/firebase';
import configelem from '../../NFTFolder/config.json';
import configfile from '../../NFTFolder/config.json'
import node from './nodeapi.json';
const algosdk = require('algosdk'); 

const HotCollectionTab =({x})=>{
    useEffect(() => {
        document.title = "ELEMENT | HotCollections"
    }, [])
    const[getIProfile1,setgetIProfile1]=useState([""]);       
    // console.log("checkprofile1",getIProfile1)
    const[getIProfile2,setgetIProfile2]=useState([""]);       
    // console.log("checkprofile2",getIProfile2)
    const[loader, setLoader] = useState(false);
    const handleShowLoad = () => setLoader(true);
    const handleHideLoad = () => setLoader(false);
    // const[getElemBalance,setElembalance]=useState("");
    // const[getElemBalanceEscrow,setElembalanceEscrow]=useState("");
    // const[getElemBalanceEscrowCir,setElembalanceEscrowCir]=useState("");
    // const[getElemBalanceTotal,setElembalanceTotal]=useState("");
    // console.log("ElemBal",getElemBalance)
    // console.log("ElemBalEscrow",getElemBalanceEscrow)
    // console.log("ElemBalEscrowBurn",getElemBalanceTotal)
    // const [showTestAlert,setshowTestAlert] = React.useState(false);   
    // const [issuesdisplay,setissuesdisplay]=useState(null)
    const[getImgreffalgoLiked,setgetImgreffalgoLiked]=useState([]);
    // console.log("checkprofilelike",getImgreffalgoLiked)  
    // const [showTestSaleAlready,setshowTestSaleAlready] = React.useState(false);   
    // const [showTestSale,setshowTestSale] = React.useState(false);       
    // const [showTestLoading, setShowTestLoading] = React.useState(false);    
    // const[pageSize,setPageSize]=useState(4);     
    // const [searchText, setSearchText] = React.useState('');
    //const[getrecent,setrecent]=useState("Recently added");
    // console.log("Recent",getrecent)
    const indexClient = new algosdk.Indexer('', node['indexerclient'], '');
    const [algobalanceApp,setalgobalanceApp] = useState("");  
    //const[getImgreffalgosale,setgetImgreffalgosale]=useState([]);    
    // console.log("checkprofileSale",getImgreffalgosale)  
    //const[getImgreffalgoCount,setgetImgreffalgoCount]=useState([]);
    // console.log("checkprofileCount",getImgreffalgoCount)  
    const dbcallalgoLiked=async()=>{
        //console.log("inside dbcallalgo function")  
        let req = [];
        if(localStorage.getItem("walletAddress")  === null || localStorage.getItem("walletAddress")  === "" || localStorage.getItem("walletAddress")  === " " || localStorage.getItem("wallet") === undefined || localStorage.getItem("walletAddress") === ''){
        }
        else{
        let getalgo=localStorage.getItem("walletAddress");    
        firebase.auth().signInAnonymously().then((response)=>{                
          firebase.database().ref("LikedImage").child(getalgo).on("value", (data) => {
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
                    valid:value.valid,
                    CreatorAddress:value.CreatorAddress,
                    NFTType:value.NFTType,
                    NFTChannel:value.NFTChannel,
                    SocialLink:value.SocialLink
                })                
                });        
              }
              setgetImgreffalgoLiked(req);
            });         
        })         
          }        
    }      
    useEffect(()=>{dbcallalgoLiked()},[])
    useEffect(() => {        
        async function listenMMAccount() {    
        if(localStorage.getItem("walletAddress") === null || localStorage.getItem("walletAddress") === "0x" || localStorage.getItem("walletAddress") === undefined || localStorage.getItem("walletAddress") === ''){                  
        setalgobalanceApp("");      
        }
        else{          
            let accountInfo = await indexClient.lookupAccountByID(localStorage.getItem("walletAddress")).do();                        
            setalgobalanceApp((accountInfo['account']['amount']/1000000));
      }    
    }
    listenMMAccount();
    }, []);
    const dbcallProfile=async()=>{            
        let r=[];
        try {    
            if(x.ownerAddress === "" || x.ownerAddress === undefined || x.ownerAddress === null)        {
                setgetIProfile1([""]);  
            }
            else{
                firebase.auth().signInAnonymously().then((response)=>{           
                    firebase.database().ref("userprofile").child(x.ownerAddress).on("value", (data) => {          
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
                            WalletAddress: data.val().walletAddress,
                            bgurl:data.val().bgurl,
                            valid:data.val().valid
                          })                
                      }
                      else{
                        setgetIProfile1([""]);  
                      }
                      setgetIProfile1(r);
                    });         
                    })         
            }
        
      } catch (error) {
        //console.log('error occured during search', error);    
      }                
    }    
    useEffect(()=>{dbcallProfile()},[])

    const dbcallProfile2=async()=>{            
        let r=[];
        try {    
            if(x.ownerAddress === "" || x.ownerAddress === undefined || x.ownerAddress === null)        {
                setgetIProfile2([""]);  
            }
            else{
                firebase.auth().signInAnonymously().then((response)=>{           
                    firebase.database().ref("userprofile").child(x.previousoaddress).on("value", (data) => {          
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
                            WalletAddress: data.val().walletAddress,
                            bgurl:data.val().bgurl,
                            valid:data.val().valid
                          })                
                      }
                      else{
                        setgetIProfile2([""]);  
                      }
                      setgetIProfile2(r);
                    });         
                    })         
            }        
      } catch (error) {
        //console.log('error occured during search', error);    
      }                
    }    
    useEffect(()=>{dbcallProfile2()},[])

    const addLiked=async(x)=>{        
        //setShowTestLoading(true)                
        handleShowLoad()
        let dateset=new Date().toDateString();     
        if(localStorage.getItem('walletAddress') === null || localStorage.getItem('walletAddress') === "" || localStorage.getItem('walletAddress') === undefined || localStorage.getItem('walletAddress') === " "){
            toast.dismiss()
            toast.warning(`please connect your wallet`,{autoClose:3000})
            handleHideLoad()
            //setissuesdisplay("please connect your wallet")
            //setshowTestAlert(true)                      
            //alert("please connect your wallet")
        }
        else{
        handleShowLoad()     
        
            if(getImgreffalgoLiked === "" || getImgreffalgoLiked === null || getImgreffalgoLiked === undefined)
            {                
                firebase.auth().signInAnonymously().then(async(response)=>{      
                let ref2=firebase.database().ref(`LikedImage/${localStorage.getItem('walletAddress')}`);                                                    
                    ref2.child(x.keyId).set({
                    Assetid:x.Assetid,Imageurl:x.Imageurl,NFTPrice:x.NFTPrice,EscrowAddress:x.EscrowAddress,keyId:x.keyId,
                    NFTName:x.NFTName,userSymbol:x.userSymbol,Ipfsurl:x.Ipfsurl,ownerAddress:x.ownerAddress,previousoaddress:x.previousoaddress,
                    TimeStamp:x.TimeStamp,NFTDescription:x.NFTDescription,HistoryAddress:x.HistoryAddress,Appid:x.Appid,valid:x.valid,
                    CreatorAddress:x.CreatorAddress,NFTType:x.NFTType,NFTChannel:x.NFTChannel,SocialLink:x.SocialLink
                    })
                    .then(()=>{
                                    let refactivity=firebase.database().ref(`activitytable/${localStorage.getItem('walletAddress')}`);   
                                    const db = ref2.push().key;                                                
                                    refactivity.child(db).set({
                                    Assetid:x.Assetid,Imageurl:x.Imageurl,NFTPrice:x.NFTPrice,
                                    EscrowAddress:"Liked Asset",keyId:x.keyId,
                                    NFTName:x.NFTName,userSymbol:x.userSymbol,Ipfsurl:"",
                                    ownerAddress:x.ownerAddress,previousoaddress:x.previousoaddress, 
                                    TimeStamp:dateset,NFTDescription:x.NFTDescription,HistoryAddress:"",
                                    Appid:"",valid:"",
                                    CreatorAddress:x.CreatorAddress,
                                    NFTType:x.NFTType,NFTChannel:x.NFTChannel,SocialLink:x.SocialLink
                                })
                                    .then(()=>{		
                                        //setShowTestLoading(false)		\
                                        toast.dismiss()
                                        toast.success(`Thanks for liking`,{autoClose:3000})
                                        handleHideLoad()
                                        //setshowTestSale(true)
                                    })
                    })
                })
            }else if(getImgreffalgoLiked[0] === "" || getImgreffalgoLiked[0] === null || getImgreffalgoLiked[0] === undefined){
                firebase.auth().signInAnonymously().then(async(response)=>{      
                let ref2=firebase.database().ref(`LikedImage/${localStorage.getItem('walletAddress')}`);                                                
                ref2.child(x.keyId).set({
                Assetid:x.Assetid,Imageurl:x.Imageurl,NFTPrice:x.NFTPrice,EscrowAddress:x.EscrowAddress,keyId:x.keyId,
                NFTName:x.NFTName,userSymbol:x.userSymbol,Ipfsurl:x.Ipfsurl,ownerAddress:x.ownerAddress,previousoaddress:x.previousoaddress,
                TimeStamp:x.TimeStamp,NFTDescription:x.NFTDescription,HistoryAddress:x.HistoryAddress,Appid:x.Appid,valid:x.valid,
                CreatorAddress:x.CreatorAddress,NFTType:x.NFTType,NFTChannel:x.NFTChannel,SocialLink:x.SocialLink
                })
                .then(async()=>{
                                let refactivity=firebase.database().ref(`activitytable/${localStorage.getItem('walletAddress')}`);   
                                const db = ref2.push().key;                                                
                                refactivity.child(db).set({
                                Assetid:x.Assetid,Imageurl:x.Imageurl,NFTPrice:x.NFTPrice,
                                EscrowAddress:"Liked Asset",keyId:x.keyId,
                                NFTName:x.NFTName,userSymbol:x.userSymbol,Ipfsurl:"",
                                ownerAddress:x.ownerAddress,previousoaddress:x.previousoaddress, 
                                TimeStamp:dateset,NFTDescription:x.NFTDescription,HistoryAddress:"",
                                Appid:"",valid:"",
                                CreatorAddress:x.CreatorAddress,
                                NFTType:x.NFTType,NFTChannel:x.NFTChannel,SocialLink:x.SocialLink
                            })
                                .then(async()=>{		
                                    //setShowTestLoading(false)		\
                                    toast.dismiss()
                                    toast.success(`Thanks for liking`,{autoClose:3000})
                                    handleHideLoad()
                                    //setshowTestSale(true)
                                })
                })
            })

            }            
            else{                 
                    for(let i = 0 ;i< getImgreffalgoLiked.length;i++){
                        if(parseInt(getImgreffalgoLiked[i].Assetid) === parseInt(x.Assetid)){
                            toast.dismiss()
                            toast.success(`You are Already Liked`,{autoClose:3000})                        
                            handleHideLoad()       
                            await sleep(200);
                            window.location.reload(false)
                            // await sleep(500);
                            // window.location.reload(false)            
                            
                        }
                        else if(parseInt(getImgreffalgoLiked[i].Assetid) === "" || parseInt(getImgreffalgoLiked[i].Assetid) === null || parseInt(getImgreffalgoLiked[i].Assetid) === undefined || parseInt(getImgreffalgoLiked[i].Assetid) === "null" || parseInt(getImgreffalgoLiked[i].Assetid) === "undefined"){
                            firebase.auth().signInAnonymously().then(async(response)=>{      
                                let ref2=firebase.database().ref(`LikedImage/${localStorage.getItem('walletAddress')}`);                                                                            
                                ref2.child(x.keyId).set({
                                Assetid:x.Assetid,Imageurl:x.Imageurl,NFTPrice:x.NFTPrice,EscrowAddress:x.EscrowAddress,keyId:x.keyId,
                                NFTName:x.NFTName,userSymbol:x.userSymbol,Ipfsurl:x.Ipfsurl,ownerAddress:x.ownerAddress,previousoaddress:x.previousoaddress,
                                TimeStamp:x.TimeStamp,NFTDescription:x.NFTDescription,HistoryAddress:x.HistoryAddress,Appid:x.Appid,valid:x.valid,
                                CreatorAddress:x.CreatorAddress,NFTType:x.NFTType,NFTChannel:x.NFTChannel,SocialLink:x.SocialLink
                                })
                                .then(()=>{
                                                    toast.dismiss()	
                                                    toast.success(`Thanks for liking`,{autoClose:3000})
                                                    handleHideLoad()
                                            //     let refactivity=firebase.database().ref(`activitytable/${localStorage.getItem('walletAddress')}`);   
                                            //     const db = ref2.push().key;                                                
                                            //     refactivity.child(db).set({
                                            //     Assetid:x.Assetid,Imageurl:x.Imageurl,NFTPrice:x.NFTPrice,
                                            //     EscrowAddress:"Liked Asset",keyId:x.keyId,
                                            //     NFTName:x.NFTName,userSymbol:x.userSymbol,Ipfsurl:"",
                                            //     ownerAddress:x.ownerAddress,previousoaddress:x.previousoaddress, 
                                            //     TimeStamp:dateset,NFTDescription:x.NFTDescription,HistoryAddress:"",
                                            //     Appid:"",valid:"",
                                            //     CreatorAddress:x.CreatorAddress,
                                            //     NFTType:x.NFTType,NFTChannel:x.NFTChannel,SocialLink:x.SocialLink
                                            // })
                                            //     .then(()=>{		
                                            //         //setShowTestLoading(false)	
                                            //         toast.dismiss()	
                                            //         toast.success(`Thanks for liking`,{autoClose:3000})
                                            //         handleHideLoad()
                                            //         //handleHideLoad()
                                            //         //setshowTestSale(true)
                                            //     })
                                })
                            })

                        }
                        else{
                            // // console.log("xid",x.Assetid)
                            // // console.log("aid",getImgreffalgoLiked[0].Assetid)                            
                            // toast.dismiss()
                            // toast.success(`You are Already Liked`,{autoClose:3000})                        
                            // handleHideLoad()       
                            // window.location.reload(false)
                            firebase.auth().signInAnonymously().then(async(response)=>{      
                                let ref2=firebase.database().ref(`LikedImage/${localStorage.getItem('walletAddress')}`);                                            
                                //const db = ref2.push().key;                                                
                                ref2.child(x.keyId).set({
                                Assetid:x.Assetid,Imageurl:x.Imageurl,NFTPrice:x.NFTPrice,EscrowAddress:x.EscrowAddress,keyId:x.keyId,
                                NFTName:x.NFTName,userSymbol:x.userSymbol,Ipfsurl:x.Ipfsurl,ownerAddress:x.ownerAddress,previousoaddress:x.previousoaddress,
                                TimeStamp:x.TimeStamp,NFTDescription:x.NFTDescription,HistoryAddress:x.HistoryAddress,Appid:x.Appid,valid:x.valid,
                                CreatorAddress:x.CreatorAddress,NFTType:x.NFTType,NFTChannel:x.NFTChannel,SocialLink:x.SocialLink
                                })
                                .then(()=>{
                                                    toast.dismiss()	
                                                    toast.success(`Thanks for liking`,{autoClose:3000})
                                                    handleHideLoad()
                                            //     let refactivity=firebase.database().ref(`activitytable/${localStorage.getItem('walletAddress')}`);   
                                            //     const db = ref2.push().key;                                                
                                            //     refactivity.child(db).set({
                                            //     Assetid:x.Assetid,Imageurl:x.Imageurl,NFTPrice:x.NFTPrice,
                                            //     EscrowAddress:"Liked Asset",keyId:x.keyId,
                                            //     NFTName:x.NFTName,userSymbol:x.userSymbol,Ipfsurl:"",
                                            //     ownerAddress:x.ownerAddress,previousoaddress:x.previousoaddress, 
                                            //     TimeStamp:dateset,NFTDescription:x.NFTDescription,HistoryAddress:"",
                                            //     Appid:"",valid:"",
                                            //     CreatorAddress:x.CreatorAddress,
                                            //     NFTType:x.NFTType,NFTChannel:x.NFTChannel,SocialLink:x.SocialLink
                                            // })
                                            //     .then(()=>{		
                                            //         //setShowTestLoading(false)	
                                            //         toast.dismiss()	
                                            //         toast.success(`Thanks for liking`,{autoClose:3000})
                                            //         handleHideLoad()
                                            //         //handleHideLoad()
                                            //         //setshowTestSale(true)
                                            //     })
                                })
                            })
                        }                                                                                    
                    }                       
                        // else if(getImgreffalgoLiked[i].Assetid === "" || getImgreffalgoLiked[i].Assetid === null || getImgreffalgoLiked[i].Assetid === undefined){
                        //         let ref2=firebase.database().ref(`LikedImage/${localStorage.getItem('walletAddress')}`);            
                        //         let refactivity=firebase.database().ref(`activitytable/${localStorage.getItem('walletAddress')}`);      
                        //         const db = ref2.push().key;                                                
                        //         ref2.child(x.keyId).set({
                        //         Assetid:x.Assetid,Imageurl:x.Imageurl,NFTPrice:x.NFTPrice,EscrowAddress:x.EscrowAddress,keyId:x.keyId,
                        //         NFTName:x.NFTName,userSymbol:x.userSymbol,Ipfsurl:x.Ipfsurl,ownerAddress:x.ownerAddress,previousoaddress:x.previousoaddress,
                        //         TimeStamp:x.TimeStamp,NFTDescription:x.NFTDescription,HistoryAddress:x.HistoryAddress,Appid:x.Appid,valid:x.valid,
                        //         CreatorAddress:x.CreatorAddress,NFTType:x.NFTType,NFTChannel:x.NFTChannel,SocialLink:x.SocialLink
                        //         })
                        //         .then(()=>{
                        //                         refactivity.child(db).set({
                        //                         Assetid:x.Assetid,Imageurl:x.Imageurl,NFTPrice:x.NFTPrice,
                        //                         EscrowAddress:"Liked Asset",keyId:x.keyId,
                        //                         NFTName:x.NFTName,userSymbol:x.userSymbol,Ipfsurl:"",
                        //                         ownerAddress:x.ownerAddress,previousoaddress:x.previousoaddress, 
                        //                         TimeStamp:dateset,NFTDescription:x.NFTDescription,HistoryAddress:"",
                        //                         Appid:"",valid:"",
                        //                         CreatorAddress:x.CreatorAddress,
                        //                         NFTType:x.NFTType,NFTChannel:x.NFTChannel,SocialLink:x.SocialLink
                        //                     })
                        //                         .then(()=>{		
                        //                             //setShowTestLoading(false)		
                        //                             toast.dismiss()
                        //                             toast.success(`Thanks for liking`,{autoClose:3000})
                        //                             handleHideLoad()
                        //                             //handleHideLoad()
                        //                             //setshowTestSale(true)
                        //                         })
                        //         })
                        // }                          
                    //console.log("Ccount",c)              
                    // getImgreffalgoLiked.map((a)=>{
                    //     console.log("AssetidX",a.Assetid)
                    //     console.log("AssetidA",x.Assetid)
                    // if(a.Assetid === x.Assetid){
                    //     toast.dismiss()
                    //     toast.success(`You are Already Liked`,{autoClose:3000})                        
                    //     handleHideLoad()       

                    //     //window.location.reload(false)            
                    // }else if(a.Assetid === "" || a.Assetid === null || a.Assetid === undefined){
                    //         let ref2=firebase.database().ref(`LikedImage/${localStorage.getItem('walletAddress')}`);            
                    //         let refactivity=firebase.database().ref(`activitytable/${localStorage.getItem('walletAddress')}`);   
                    //         const db = ref2.push().key;                                                
                    //         ref2.child(x.keyId).set({
                    //         Assetid:x.Assetid,Imageurl:x.Imageurl,NFTPrice:x.NFTPrice,EscrowAddress:x.EscrowAddress,keyId:x.keyId,
                    //         NFTName:x.NFTName,userSymbol:x.userSymbol,Ipfsurl:x.Ipfsurl,ownerAddress:x.ownerAddress,previousoaddress:x.previousoaddress,
                    //         TimeStamp:x.TimeStamp,NFTDescription:x.NFTDescription,HistoryAddress:x.HistoryAddress,Appid:x.Appid,valid:x.valid,
                    //         CreatorAddress:x.CreatorAddress,NFTType:x.NFTType,NFTChannel:x.NFTChannel,SocialLink:x.SocialLink
                    //         })
                    //         .then(()=>{
                    //                         refactivity.child(db).set({
                    //                         Assetid:x.Assetid,Imageurl:x.Imageurl,NFTPrice:x.NFTPrice,
                    //                         EscrowAddress:"Liked Asset",keyId:x.keyId,
                    //                         NFTName:x.NFTName,userSymbol:x.userSymbol,Ipfsurl:"",
                    //                         ownerAddress:x.ownerAddress,previousoaddress:x.previousoaddress, 
                    //                         TimeStamp:dateset,NFTDescription:x.NFTDescription,HistoryAddress:"",
                    //                         Appid:"",valid:"",
                    //                         CreatorAddress:x.CreatorAddress,
                    //                         NFTType:x.NFTType,NFTChannel:x.NFTChannel,SocialLink:x.SocialLink
                    //                     })
                    //                         .then(()=>{		
                    //                             //setShowTestLoading(false)		
                    //                             toast.dismiss()
                    //                             toast.success(`Thanks for liking`,{autoClose:3000})
                    //                             handleHideLoad()
                    //                             //handleHideLoad()
                    //                             //setshowTestSale(true)
                    //                         })
                    //         })
                    // }
                    // else{
                    //         let ref2=firebase.database().ref(`LikedImage/${localStorage.getItem('walletAddress')}`);            
                    //         let refactivity=firebase.database().ref(`activitytable/${localStorage.getItem('walletAddress')}`);   
                    //         const db = ref2.push().key;                                                
                    //         ref2.child(x.keyId).set({
                    //         Assetid:x.Assetid,Imageurl:x.Imageurl,NFTPrice:x.NFTPrice,EscrowAddress:x.EscrowAddress,keyId:x.keyId,
                    //         NFTName:x.NFTName,userSymbol:x.userSymbol,Ipfsurl:x.Ipfsurl,ownerAddress:x.ownerAddress,previousoaddress:x.previousoaddress,
                    //         TimeStamp:x.TimeStamp,NFTDescription:x.NFTDescription,HistoryAddress:x.HistoryAddress,Appid:x.Appid,valid:x.valid,
                    //         CreatorAddress:x.CreatorAddress,NFTType:x.NFTType,NFTChannel:x.NFTChannel,SocialLink:x.SocialLink
                    //         })
                    //         .then(()=>{
                    //                         refactivity.child(db).set({
                    //                         Assetid:x.Assetid,Imageurl:x.Imageurl,NFTPrice:x.NFTPrice,
                    //                         EscrowAddress:"Liked Asset",keyId:x.keyId,
                    //                         NFTName:x.NFTName,userSymbol:x.userSymbol,Ipfsurl:"",
                    //                         ownerAddress:x.ownerAddress,previousoaddress:x.previousoaddress, 
                    //                         TimeStamp:dateset,NFTDescription:x.NFTDescription,HistoryAddress:"",
                    //                         Appid:"",valid:"",
                    //                         CreatorAddress:x.CreatorAddress,
                    //                         NFTType:x.NFTType,NFTChannel:x.NFTChannel,SocialLink:x.SocialLink
                    //                     })
                    //                         .then(()=>{		
                    //                             //setShowTestLoading(false)	
                    //                             toast.dismiss()	
                    //                             toast.success(`Thanks for liking`,{autoClose:3000})
                    //                             handleHideLoad()
                    //                             //handleHideLoad()
                    //                             //setshowTestSale(true)
                    //                         })
                    //         })
                    //             // toast.success(`You are Already Likeds`,{autoClose:3000})
                    //             // handleHideLoad()
                    //             //handleHideLoad()
                    //             //setShowTestLoading(false)
                    //             //setshowTestSaleAlready(true)
                    //     }                                                                                    
                    // })
                    // firebase.database().ref("LikedImage").child(localStorage.getItem("walletAddress"))
                    // .once('value', snapshot => {                        
                    //     asset=snapshot.key;
                    //     console.log("snapkey",snapshot.key)
                    // })
                    // firebase.database().ref("LikedImage").child(localStorage.getItem("walletAddress")).child(x.Assetid)
                    // .once('value', snapshot => {                        
                    //     asset=snapshot.key;
                    //     console.log("snapkey",snapshot.key)
                    // })
                    //console.log("LikedD",a.Assetid)                        
                    // if(asset === x.Assetid){
                    //     toast.success(`You are Already Liked.`,{autoClose:3000})
                    //     handleHideLoad()                    
                    // }else{
                    //     if(asset === "" || asset === null || asset === undefined){
                    //         let ref2=firebase.database().ref(`LikedImage/${localStorage.getItem('walletAddress')}`);            
                    //         let refactivity=firebase.database().ref(`activitytable/${localStorage.getItem('walletAddress')}`);   
                    //         const db = ref2.push().key;                                                
                    //         ref2.child(x.keyId).set({
                    //         Assetid:x.Assetid,Imageurl:x.Imageurl,NFTPrice:x.NFTPrice,EscrowAddress:x.EscrowAddress,keyId:x.keyId,
                    //         NFTName:x.NFTName,userSymbol:x.userSymbol,Ipfsurl:x.Ipfsurl,ownerAddress:x.ownerAddress,previousoaddress:x.previousoaddress,
                    //         TimeStamp:x.TimeStamp,NFTDescription:x.NFTDescription,HistoryAddress:x.HistoryAddress,Appid:x.Appid,valid:x.valid,
                    //         CreatorAddress:x.CreatorAddress,NFTType:x.NFTType,NFTChannel:x.NFTChannel,SocialLink:x.SocialLink
                    //         })
                    //         .then(()=>{
                    //                         refactivity.child(db).set({
                    //                         Assetid:x.Assetid,Imageurl:x.Imageurl,NFTPrice:x.NFTPrice,
                    //                         EscrowAddress:"Liked Asset",keyId:x.keyId,
                    //                         NFTName:x.NFTName,userSymbol:x.userSymbol,Ipfsurl:"",
                    //                         ownerAddress:x.ownerAddress,previousoaddress:x.previousoaddress, 
                    //                         TimeStamp:dateset,NFTDescription:x.NFTDescription,HistoryAddress:"",
                    //                         Appid:"",valid:"",
                    //                         CreatorAddress:x.CreatorAddress,
                    //                         NFTType:x.NFTType,NFTChannel:x.NFTChannel,SocialLink:x.SocialLink
                    //                     })
                    //                         .then(()=>{		
                    //                             //setShowTestLoading(false)		
                    //                             toast.success(`Thanks for liking`,{autoClose:3000})
                    //                             handleHideLoad()
                    //                             //handleHideLoad()
                    //                             //setshowTestSale(true)
                    //                         })
                    //         })
                    //     }
                    //         else{
                    //         let ref2=firebase.database().ref(`LikedImage/${localStorage.getItem('walletAddress')}`);            
                    //         let refactivity=firebase.database().ref(`activitytable/${localStorage.getItem('walletAddress')}`);   
                    //         const db = ref2.push().key;                                                
                    //         ref2.child(x.keyId).update({
                    //         Assetid:x.Assetid,Imageurl:x.Imageurl,NFTPrice:x.NFTPrice,EscrowAddress:x.EscrowAddress,keyId:x.keyId,
                    //         NFTName:x.NFTName,userSymbol:x.userSymbol,Ipfsurl:x.Ipfsurl,ownerAddress:x.ownerAddress,previousoaddress:x.previousoaddress,
                    //         TimeStamp:x.TimeStamp,NFTDescription:x.NFTDescription,HistoryAddress:x.HistoryAddress,Appid:x.Appid,valid:x.valid,
                    //         CreatorAddress:x.CreatorAddress,NFTType:x.NFTType,NFTChannel:x.NFTChannel,SocialLink:x.SocialLink
                    //         })
                    //         .then(()=>{
                    //                         refactivity.child(db).set({
                    //                         Assetid:x.Assetid,Imageurl:x.Imageurl,NFTPrice:x.NFTPrice,
                    //                         EscrowAddress:"Liked Asset",keyId:x.keyId,
                    //                         NFTName:x.NFTName,userSymbol:x.userSymbol,Ipfsurl:"",
                    //                         ownerAddress:x.ownerAddress,previousoaddress:x.previousoaddress, 
                    //                         TimeStamp:dateset,NFTDescription:x.NFTDescription,HistoryAddress:"",
                    //                         Appid:"",valid:"",
                    //                         CreatorAddress:x.CreatorAddress,
                    //                         NFTType:x.NFTType,NFTChannel:x.NFTChannel,SocialLink:x.SocialLink
                    //                     })
                    //                         .then(()=>{		
                    //                             //setShowTestLoading(false)		
                    //                             toast.success(`Thanks for liking`,{autoClose:3000})
                    //                             handleHideLoad()
                    //                             //handleHideLoad()
                    //                             //setshowTestSale(true)
                    //                         })
                    //         })
                    //             // toast.success(`You are Already Likeds`,{autoClose:3000})
                    //             // handleHideLoad()
                    //             //handleHideLoad()
                    //             //setShowTestLoading(false)
                    //             //setshowTestSaleAlready(true)
                    //         }                                        
                        
                    // }
                    
                    // firebase.database().ref("LikedImage").child(localStorage.getItem("walletAddress")).on("value", (data) => {
                    //     if (data) {
                    //       data.forEach((d) => {  
                              
                            
                    //       })
                    //     }
                    // })                
            }            
            //})
        }
    }
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    return(
        <Col xxl={3} md={4} sm={6} xs={12} className='mb-4'>
                                    <Card className='card-dash p-3 d-block border-0'>
                                    <div>
                                        {getIProfile1 === null || getIProfile1 === undefined || getIProfile1 === ""  ? (
                                            <img src={Logo}  alt="logo" className='me-2 avatar-pic' />                                            
                                        ):(
                                            <>
                                            {getIProfile1[0].Imageurl === null || getIProfile1[0].Imageurl === undefined || getIProfile1[0].Imageurl === ""  ? (                                                
                                                    <img src={Logo}  alt="logo" className='me-2 avatar-pic' />                                                                                                
                                            ):(
                                                <Link to={{
                                                    pathname: "/my-NFTcopy",            
                                                    state:{allData:x}                                                
                                                }}>
                                                <img src={getIProfile1[0].Imageurl}  alt="logo" className='me-2 avatar-pic' />                                                
                                                </Link>
                                            )}                                            
                                            </>
                                        )}
                                        {/* {getIProfile2 === null || getIProfile2 === undefined || getIProfile2 === "" ? (
                                            <img src={Logo}  alt="logo" className='me-2 avatar-pic' />
                                            
                                        ):(
                                            <>
                                            {getIProfile2[0].Imageurl === null || getIProfile2[0].Imageurl === undefined || getIProfile2[0].Imageurl === "" ? (
                                                <img src={Logo}  alt="logo" className='me-2 avatar-pic' />                                                
                                            ):(
                                                <>
                                                <img src={getIProfile2[0].Imageurl} alt="logo" className='me-2 avatar-pic' />                                                
                                                </>
                                            )}                                    
                                            </>                                            
                                        )}      
                                                                       */}
                                        </div>
                                        <br/>                                        
                                        {/* <br/>
                                        <br/> */}
                                        <div className='card-img text-center mb-2'>
                                            {/* <Link to="/NFT-details"> */}
                                                <img src={x.Imageurl} alt="image" className='img-fluid' />
                                            {/* </Link> */}
                                        </div>
                                        <div className='d-flex mb-2 justify-content-between flex-wrap align-items-center'>
                                            {/* <h6 className='subheading'>Images</h6> */}
                                            {/* <Badge bg="purple">Image</Badge> */}
                                        </div>
                                        <h6 className='mb-2'>{x.NFTName} <br /><span className='text-success'>
                                        {x.SocialLink === null || x.SocialLink === undefined || x.SocialLink === "" ?(
                                            <h6>{configfile.nullvalue}</h6>
                                        ):(
                                            <h6>{x.SocialLink.slice(0,15)}.....</h6>
                                        )}
                                        </span></h6>
                                        
                                        <ButtonLoad loading={loader} variant='default' className='btn-count float-end' onClick={()=>{addLiked(x)}}>  
                                        <svg viewBox="0 0 17 16" fill="none" width="16" height="16" xlmns="http://www.w3.org/2000/svg" className="sc-bdvvtL sc-hKwDye bZjZGw"><path d="M8.2112 14L12.1056 9.69231L14.1853 7.39185C15.2497 6.21455 15.3683 4.46116 14.4723 3.15121V3.15121C13.3207 1.46757 10.9637 1.15351 9.41139 2.47685L8.2112 3.5L6.95566 2.42966C5.40738 1.10976 3.06841 1.3603 1.83482 2.97819V2.97819C0.777858 4.36443 0.885104 6.31329 2.08779 7.57518L8.2112 14Z" stroke="currentColor" strokeWidth="2"></path></svg>                    
                                        </ButtonLoad>                    
                                        <h4 className='d-flex mb-3 align-items-center'><img src={Logo} alt="logo" style={{width:'12%',height:'8%'}} className='me-2 avatar-pic' /> {x.NFTPrice/1000000}</h4> 
                                        
                                        {x.NFTPrice === "" || x.NFTPrice === null || x.NFTPrice === undefined ?(
                                            <>                                                                                        
                                            <Button variant="blue" className='w-100' s>Buy NFT</Button>                                        
                                            </>
                                        ):(
                                            <Link to={{
                                                pathname: "/NFT-details",            
                                                state:{allData:x}                                                
                                            }}><Button variant="blue" className='w-100'>Buy NFT</Button></Link>
                                        )} 
                                        
                                    </Card>
                                    </Col>
    )
}
export default HotCollectionTab;