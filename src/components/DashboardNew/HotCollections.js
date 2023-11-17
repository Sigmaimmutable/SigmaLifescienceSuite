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
import banner1 from '../../assets/images/element-nft-banner.jpeg'
import Icon1 from '../../assets/images/elem-original.png';
import logogif from '../../assets/images/gif4.gif';
import firebase from '../../NFTFolder/firebase';
import configelem from '../../NFTFolder/config.json';
import configfile from '../../NFTFolder/config.json'
import node from './nodeapi.json';
import HotCollectionTab from './HotCollectionTab';
const algosdk = require('algosdk'); 

const flickityOptions = {
    initialIndex: 2,
    wrapAround: true
}
const HotCollections = () => {
    useEffect(() => {
        document.title = "ELEMENT | HotCollections"
    }, [])
    const[loader, setLoader] = useState(false);
    const handleShowLoad = () => setLoader(true);
    const handleHideLoad = () => setLoader(false);
    const[getElemBalance,setElembalance]=useState("");
    const[getElemBalanceEscrow,setElembalanceEscrow]=useState("");
    const[getElemBalanceEscrowCir,setElembalanceEscrowCir]=useState("");
    const[getElemBalanceTotal,setElembalanceTotal]=useState("");
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
    const[pageSize,setPageSize]=useState(12);     
    const [searchText, setSearchText] = React.useState('');
    const[getrecent,setrecent]=useState("Low to High");
    // console.log("Recent",getrecent)
    const indexClient = new algosdk.Indexer('', node['indexerclient'], '');
    const [algobalanceApp,setalgobalanceApp] = useState("");  
    const[getImgreffalgosale,setgetImgreffalgosale]=useState([]);    
    // console.log("checkprofileSale",getImgreffalgosale)  
    const[getImgreffalgoCount,setgetImgreffalgoCount]=useState([]);
    // console.log("checkprofileCount",getImgreffalgoCount)  
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

    const dbcallalgos=async()=>{
        //console.log("inside dbcallalgo function")  
        let req = [];                
        let getalgo='T74UOPBZA23IO2TRMQEJE7MFES3MJ6WNIXCAFHZTBDOCSH7YZX4GVZ5PH4';              
        firebase.auth().signInAnonymously().then((response)=>{      
          firebase.database().ref("imagerefexploreoneAlgos").child(getalgo).on("value", (data) => {
            if (data) {
              data.forEach((d) => {                
                let value=d.val();
                if(value.ownerAddress  === "T74UOPBZA23IO2TRMQEJE7MFES3MJ6WNIXCAFHZTBDOCSH7YZX4GVZ5PH4"){

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
                }                
                });        
              }
              setgetImgreffalgosale(req);
            });  
        })                
                 
    }      
    useEffect(()=>{dbcallalgos()},[])
    
    const filterdata=()=>{
        if(searchText === "")
        {          
        let dateset=new Date().toDateString();
        let today= new Date();
        let weekdate=new Date(today.getFullYear(), today.getMonth(), today.getDate()-1).toDateString();
        // console.log("DateExplore",weekdate)
        // console.log("DateExplore2",dateset)        
        if(getrecent === "Recently added"){        
            let data=getImgreffalgosale.filter((val)=> (weekdate) <= (val.TimeStamp) || (val.TimeStamp) >= dateset)
        //   console.log("filtercall12",data)
          return data;        
        }
        if(getrecent === "Low to High"){
          let data=getImgreffalgosale.sort((a,b)=>{ return parseFloat(a.NFTPrice/1000000) - parseFloat(b.NFTPrice/1000000)})
          //console.log("filtercall1",data)
          return data;
        }
        if(getrecent ===  "High to Low"){
          let data=getImgreffalgosale.sort((a,b)=>{ return parseFloat(b.NFTPrice/1000000) - parseFloat(a.NFTPrice/1000000)})
          //console.log("filtercall1",data)
          return data;
        }
        }
        else{
                let data = getImgreffalgosale.filter((val)=>{
                if(val.NFTName === "" || val.NFTName === null || val.NFTName === undefined){    
                }else{
                let val1 = (val.NFTName).toLowerCase().includes(searchText.toLocaleLowerCase())                
                return val1
                    }            
            })            
            return data;
        }                
        return getImgreffalgosale
    }
     
    const filterdata2=()=>{
        if(searchText === "")
        {                  
            let data=getImgreffalgosale.reverse().sort((a,b)=>{ return parseFloat(a.NFTPrice/1000000) - parseFloat(b.NFTPrice/1000000)})            
            return data;
        }
        else{
                let data = getImgreffalgosale.filter((val)=>{
                if(val.NFTName === "" || val.NFTName === null || val.NFTName === undefined){    
                }else{
                let val1 = (val.NFTName).toLowerCase().includes(searchText.toLocaleLowerCase())                
                return val1
                    }            
            })            
            return data;
        }                
        //return getImgreffalgosale
    }

    const decrementSize=()=>{
        if(pageSize >= 16){
        setPageSize(pageSize-4)
        }        
    }

    // const addLiked=(x)=>{        
    //     //setShowTestLoading(true)                
    //     handleShowLoad()
    //     let dateset=new Date().toDateString();     
    //     if(localStorage.getItem('walletAddress') === null || localStorage.getItem('walletAddress') === "" || localStorage.getItem('walletAddress') === undefined || localStorage.getItem('walletAddress') === " "){
    //         toast.dismiss()
    //         toast.warning(`please connect your wallet`,{autoClose:3000})
    //         handleHideLoad()
    //         //setissuesdisplay("please connect your wallet")
    //         //setshowTestAlert(true)                      
    //         //alert("please connect your wallet")
    //     }
    //     else{
    //     handleShowLoad()     
    //     firebase.auth().signInAnonymously().then((response)=>{      
    //         if(getImgreffalgoLiked === "" || getImgreffalgoLiked === null || getImgreffalgoLiked === undefined)
    //         {
    //             // toast.success(`You are Already Liked`,{autoClose:3000})
    //             // handleHideLoad()
    //         }else{
    //             if(getImgreffalgoLiked[0] === "" || getImgreffalgoLiked[0] === null || getImgreffalgoLiked[0] === undefined){
    //                 let ref2=firebase.database().ref(`LikedImage/${localStorage.getItem('walletAddress')}`);            
    //                 let refactivity=firebase.database().ref(`activitytable/${localStorage.getItem('walletAddress')}`);   
    //                 const db = ref2.push().key;                                                
    //                 ref2.child(db).set({
    //                 Assetid:x.Assetid,Imageurl:x.Imageurl,NFTPrice:x.NFTPrice,EscrowAddress:x.EscrowAddress,keyId:x.keyId,
    //                 NFTName:x.NFTName,userSymbol:x.userSymbol,Ipfsurl:x.Ipfsurl,ownerAddress:x.ownerAddress,previousoaddress:x.previousoaddress,
    //                 TimeStamp:x.TimeStamp,NFTDescription:x.NFTDescription,HistoryAddress:x.HistoryAddress,Appid:x.Appid,valid:x.valid,
    //                 CreatorAddress:x.CreatorAddress,NFTType:x.NFTType,NFTChannel:x.NFTChannel,SocialLink:x.SocialLink
    //                 })
    //                 .then(()=>{
    //                                 refactivity.child(db).set({
    //                                 Assetid:x.Assetid,Imageurl:x.Imageurl,NFTPrice:x.NFTPrice,
    //                                 EscrowAddress:"Liked Asset",keyId:x.keyId,
    //                                 NFTName:x.NFTName,userSymbol:x.userSymbol,Ipfsurl:"",
    //                                 ownerAddress:x.ownerAddress,previousoaddress:x.previousoaddress, 
    //                                 TimeStamp:dateset,NFTDescription:x.NFTDescription,HistoryAddress:"",
    //                                 Appid:"",valid:"",
    //                                 CreatorAddress:x.CreatorAddress,
    //                                 NFTType:x.NFTType,NFTChannel:x.NFTChannel,SocialLink:x.SocialLink
    //                             })
    //                                 .then(()=>{		
    //                                     //setShowTestLoading(false)		\
    //                                     toast.dismiss()
    //                                     toast.success(`Thanks for liking`,{autoClose:3000})
    //                                     handleHideLoad()
    //                                     //setshowTestSale(true)
    //                                 })
    //                 })

    //             }
    //             else{                    
    //                 getImgreffalgoLiked.map((a)=>{
    //                     // console.log("Assetid",a.Assetid)
    //                 if(a.Assetid === x.Assetid){
    //                     toast.dismiss()
    //                     toast.success(`You are Already Liked`,{autoClose:3000})                        
    //                     handleHideLoad()        
    //                     window.location.reload(false)            
    //                 }else if(a.asset === "" || a.asset === null || a.asset === undefined){
    //                         let ref2=firebase.database().ref(`LikedImage/${localStorage.getItem('walletAddress')}`);            
    //                         let refactivity=firebase.database().ref(`activitytable/${localStorage.getItem('walletAddress')}`);   
    //                         const db = ref2.push().key;                                                
    //                         ref2.child(x.keyId).set({
    //                         Assetid:x.Assetid,Imageurl:x.Imageurl,NFTPrice:x.NFTPrice,EscrowAddress:x.EscrowAddress,keyId:x.keyId,
    //                         NFTName:x.NFTName,userSymbol:x.userSymbol,Ipfsurl:x.Ipfsurl,ownerAddress:x.ownerAddress,previousoaddress:x.previousoaddress,
    //                         TimeStamp:x.TimeStamp,NFTDescription:x.NFTDescription,HistoryAddress:x.HistoryAddress,Appid:x.Appid,valid:x.valid,
    //                         CreatorAddress:x.CreatorAddress,NFTType:x.NFTType,NFTChannel:x.NFTChannel,SocialLink:x.SocialLink
    //                         })
    //                         .then(()=>{
    //                                         refactivity.child(db).set({
    //                                         Assetid:x.Assetid,Imageurl:x.Imageurl,NFTPrice:x.NFTPrice,
    //                                         EscrowAddress:"Liked Asset",keyId:x.keyId,
    //                                         NFTName:x.NFTName,userSymbol:x.userSymbol,Ipfsurl:"",
    //                                         ownerAddress:x.ownerAddress,previousoaddress:x.previousoaddress, 
    //                                         TimeStamp:dateset,NFTDescription:x.NFTDescription,HistoryAddress:"",
    //                                         Appid:"",valid:"",
    //                                         CreatorAddress:x.CreatorAddress,
    //                                         NFTType:x.NFTType,NFTChannel:x.NFTChannel,SocialLink:x.SocialLink
    //                                     })
    //                                         .then(()=>{		
    //                                             //setShowTestLoading(false)		
    //                                             toast.dismiss()
    //                                             toast.success(`Thanks for liking`,{autoClose:3000})
    //                                             handleHideLoad()
    //                                             //handleHideLoad()
    //                                             //setshowTestSale(true)
    //                                         })
    //                         })
    //                 }
    //                 else{
    //                         let ref2=firebase.database().ref(`LikedImage/${localStorage.getItem('walletAddress')}`);            
    //                         let refactivity=firebase.database().ref(`activitytable/${localStorage.getItem('walletAddress')}`);   
    //                         const db = ref2.push().key;                                                
    //                         ref2.child(x.keyId).set({
    //                         Assetid:x.Assetid,Imageurl:x.Imageurl,NFTPrice:x.NFTPrice,EscrowAddress:x.EscrowAddress,keyId:x.keyId,
    //                         NFTName:x.NFTName,userSymbol:x.userSymbol,Ipfsurl:x.Ipfsurl,ownerAddress:x.ownerAddress,previousoaddress:x.previousoaddress,
    //                         TimeStamp:x.TimeStamp,NFTDescription:x.NFTDescription,HistoryAddress:x.HistoryAddress,Appid:x.Appid,valid:x.valid,
    //                         CreatorAddress:x.CreatorAddress,NFTType:x.NFTType,NFTChannel:x.NFTChannel,SocialLink:x.SocialLink
    //                         })
    //                         .then(()=>{
    //                                         refactivity.child(db).set({
    //                                         Assetid:x.Assetid,Imageurl:x.Imageurl,NFTPrice:x.NFTPrice,
    //                                         EscrowAddress:"Liked Asset",keyId:x.keyId,
    //                                         NFTName:x.NFTName,userSymbol:x.userSymbol,Ipfsurl:"",
    //                                         ownerAddress:x.ownerAddress,previousoaddress:x.previousoaddress, 
    //                                         TimeStamp:dateset,NFTDescription:x.NFTDescription,HistoryAddress:"",
    //                                         Appid:"",valid:"",
    //                                         CreatorAddress:x.CreatorAddress,
    //                                         NFTType:x.NFTType,NFTChannel:x.NFTChannel,SocialLink:x.SocialLink
    //                                     })
    //                                         .then(()=>{		
    //                                             //setShowTestLoading(false)	
    //                                             toast.dismiss()	
    //                                             toast.success(`Thanks for liking`,{autoClose:3000})
    //                                             handleHideLoad()
    //                                             //handleHideLoad()
    //                                             //setshowTestSale(true)
    //                                         })
    //                         })
    //                             // toast.success(`You are Already Likeds`,{autoClose:3000})
    //                             // handleHideLoad()
    //                             //handleHideLoad()
    //                             //setShowTestLoading(false)
    //                             //setshowTestSaleAlready(true)
    //                         }                                                                                    
    //                 })
    //                 // firebase.database().ref("LikedImage").child(localStorage.getItem("walletAddress"))
    //                 // .once('value', snapshot => {                        
    //                 //     asset=snapshot.key;
    //                 //     console.log("snapkey",snapshot.key)
    //                 // })
    //                 // firebase.database().ref("LikedImage").child(localStorage.getItem("walletAddress")).child(x.Assetid)
    //                 // .once('value', snapshot => {                        
    //                 //     asset=snapshot.key;
    //                 //     console.log("snapkey",snapshot.key)
    //                 // })
    //                 //console.log("LikedD",a.Assetid)                        
    //                 // if(asset === x.Assetid){
    //                 //     toast.success(`You are Already Liked.`,{autoClose:3000})
    //                 //     handleHideLoad()                    
    //                 // }else{
    //                 //     if(asset === "" || asset === null || asset === undefined){
    //                 //         let ref2=firebase.database().ref(`LikedImage/${localStorage.getItem('walletAddress')}`);            
    //                 //         let refactivity=firebase.database().ref(`activitytable/${localStorage.getItem('walletAddress')}`);   
    //                 //         const db = ref2.push().key;                                                
    //                 //         ref2.child(x.keyId).set({
    //                 //         Assetid:x.Assetid,Imageurl:x.Imageurl,NFTPrice:x.NFTPrice,EscrowAddress:x.EscrowAddress,keyId:x.keyId,
    //                 //         NFTName:x.NFTName,userSymbol:x.userSymbol,Ipfsurl:x.Ipfsurl,ownerAddress:x.ownerAddress,previousoaddress:x.previousoaddress,
    //                 //         TimeStamp:x.TimeStamp,NFTDescription:x.NFTDescription,HistoryAddress:x.HistoryAddress,Appid:x.Appid,valid:x.valid,
    //                 //         CreatorAddress:x.CreatorAddress,NFTType:x.NFTType,NFTChannel:x.NFTChannel,SocialLink:x.SocialLink
    //                 //         })
    //                 //         .then(()=>{
    //                 //                         refactivity.child(db).set({
    //                 //                         Assetid:x.Assetid,Imageurl:x.Imageurl,NFTPrice:x.NFTPrice,
    //                 //                         EscrowAddress:"Liked Asset",keyId:x.keyId,
    //                 //                         NFTName:x.NFTName,userSymbol:x.userSymbol,Ipfsurl:"",
    //                 //                         ownerAddress:x.ownerAddress,previousoaddress:x.previousoaddress, 
    //                 //                         TimeStamp:dateset,NFTDescription:x.NFTDescription,HistoryAddress:"",
    //                 //                         Appid:"",valid:"",
    //                 //                         CreatorAddress:x.CreatorAddress,
    //                 //                         NFTType:x.NFTType,NFTChannel:x.NFTChannel,SocialLink:x.SocialLink
    //                 //                     })
    //                 //                         .then(()=>{		
    //                 //                             //setShowTestLoading(false)		
    //                 //                             toast.success(`Thanks for liking`,{autoClose:3000})
    //                 //                             handleHideLoad()
    //                 //                             //handleHideLoad()
    //                 //                             //setshowTestSale(true)
    //                 //                         })
    //                 //         })
    //                 //     }
    //                 //         else{
    //                 //         let ref2=firebase.database().ref(`LikedImage/${localStorage.getItem('walletAddress')}`);            
    //                 //         let refactivity=firebase.database().ref(`activitytable/${localStorage.getItem('walletAddress')}`);   
    //                 //         const db = ref2.push().key;                                                
    //                 //         ref2.child(x.keyId).update({
    //                 //         Assetid:x.Assetid,Imageurl:x.Imageurl,NFTPrice:x.NFTPrice,EscrowAddress:x.EscrowAddress,keyId:x.keyId,
    //                 //         NFTName:x.NFTName,userSymbol:x.userSymbol,Ipfsurl:x.Ipfsurl,ownerAddress:x.ownerAddress,previousoaddress:x.previousoaddress,
    //                 //         TimeStamp:x.TimeStamp,NFTDescription:x.NFTDescription,HistoryAddress:x.HistoryAddress,Appid:x.Appid,valid:x.valid,
    //                 //         CreatorAddress:x.CreatorAddress,NFTType:x.NFTType,NFTChannel:x.NFTChannel,SocialLink:x.SocialLink
    //                 //         })
    //                 //         .then(()=>{
    //                 //                         refactivity.child(db).set({
    //                 //                         Assetid:x.Assetid,Imageurl:x.Imageurl,NFTPrice:x.NFTPrice,
    //                 //                         EscrowAddress:"Liked Asset",keyId:x.keyId,
    //                 //                         NFTName:x.NFTName,userSymbol:x.userSymbol,Ipfsurl:"",
    //                 //                         ownerAddress:x.ownerAddress,previousoaddress:x.previousoaddress, 
    //                 //                         TimeStamp:dateset,NFTDescription:x.NFTDescription,HistoryAddress:"",
    //                 //                         Appid:"",valid:"",
    //                 //                         CreatorAddress:x.CreatorAddress,
    //                 //                         NFTType:x.NFTType,NFTChannel:x.NFTChannel,SocialLink:x.SocialLink
    //                 //                     })
    //                 //                         .then(()=>{		
    //                 //                             //setShowTestLoading(false)		
    //                 //                             toast.success(`Thanks for liking`,{autoClose:3000})
    //                 //                             handleHideLoad()
    //                 //                             //handleHideLoad()
    //                 //                             //setshowTestSale(true)
    //                 //                         })
    //                 //         })
    //                 //             // toast.success(`You are Already Likeds`,{autoClose:3000})
    //                 //             // handleHideLoad()
    //                 //             //handleHideLoad()
    //                 //             //setShowTestLoading(false)
    //                 //             //setshowTestSaleAlready(true)
    //                 //         }                                        
                        
    //                 // }
                    
    //                 // firebase.database().ref("LikedImage").child(localStorage.getItem("walletAddress")).on("value", (data) => {
    //                 //     if (data) {
    //                 //       data.forEach((d) => {  
                              
                            
    //                 //       })
    //                 //     }
    //                 // })
    //             }
    //         }            
    //         })
    //     }
    // }
    
    // const refreshSale=()=>{
    //     setshowTestSale(false)         
    // }
    // const refreshSale2=()=>{
    //     setshowTestSaleAlready(false)   
    //     window.location.reload(false)             
    // }
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
        const fetchPosts = async () => {
        const algodClientGet = new algosdk.Algodv2('', node['algodclient'], '');
        let accountInfoResponse = await algodClientGet.accountInformation(localStorage.getItem("walletAddress")).do();              
        for(let i = 0; i < accountInfoResponse['assets'].length; i++){
        // console.log("accountsasset", accountInfoResponse['assets']);
        if (accountInfoResponse['assets'][i]['asset-id'] == parseInt(configelem.elemId)) {
         setElembalance(accountInfoResponse['assets'][i]['amount']);
        //  console.log("accountassetid", configelem.elemId);
        //  console.log("accountsassetnew", accountInfoResponse['assets'][i]['amount']);   
        }
     }
   
    };             
   
    fetchPosts();
    }, []);

    useEffect(() => {
        const fetchPostsss = async () => {
        const algodClientGet = new algosdk.Algodv2('', node['algodclient'], '');
        let accountInfoResponse = await algodClientGet.accountInformation('26YB76MYZHKHCGRAJLQRMVFSEI5OUR5W22WW7ABODC5JXLG4JPL3U5OYIA').do();              
        // console.log("accountcreate", accountInfoResponse);
    //     for(let i = 0; i < accountInfoResponse['assets'].length; i++){
    //     console.log("accountsasset", accountInfoResponse['assets']);
    //     if (accountInfoResponse['assets'][i]['asset-id'] == parseInt(configelem.elemId)) {
    //      setElembalance(accountInfoResponse['assets'][i]['amount']);
    //      console.log("accountassetid", configelem.elemId);
    //      console.log("accountsassetnew", accountInfoResponse['assets'][i]['amount']);   
    //     }
    //  }
   
    };             
   
    fetchPostsss();
    }, []);


    useEffect(() => {
        const fetchPostss = async () => {
        const algodClientGet = new algosdk.Algodv2('', node['algodclient'], '');
        const indexerClient = new algosdk.Indexer('', node['indexerclient'], '');        
        const assetInfo = await indexerClient.lookupAssetByID(configelem.elemId).do();
        //const assetTxns = await indexerClient.lookupAssetTransactions(configelem.elemId).do();
        // console.log("assetinfo",assetInfo);
        let accountInfoResponse = await algodClientGet.accountInformation("JUNVYPS2SRNKRN3JJZNSYM3IV5WQHZTBR4BM6ZI7OTEJP2AGEJLSAXSE5U").do();              
        //let accountInfoResponse1 = await algodClientGet.accountAssetInformation("26YB76MYZHKHCGRAJLQRMVFSEI5OUR5W22WW7ABODC5JXLG4JPL3U5OYIA").do();              
        //console.log("accountassetid1",accountInfoResponse1);
        setElembalanceEscrow(accountInfoResponse['amount']);     
        setElembalanceEscrowCir(accountInfoResponse['assets'][0]['amount']);     
        setElembalanceTotal(assetInfo.asset.params['total']/1000000)
    };             
   
    fetchPostss();
    }, []);


    const dbcallalgoCount=async()=>{
        //console.log("inside dbcallalgo function")  
        //let req = [];
        let c=0;
        firebase.auth().signInAnonymously().then((response)=>{      
          firebase.database().ref("imagerefAlgolt").on("value", (data) => {
            if (data) {
              data.forEach((d) => {                
                  c=c+1                
                });        
              }
              setgetImgreffalgoCount(c)              
            });      
        })                      
    }      
    useEffect(()=>{dbcallalgoCount()},[])

    return (    
        <Layout>
            <Container>
                <ToastContainer position='bottom-right' draggable = {false} transition={Zoom} autoClose={4000} closeOnClick = {false}/>
                <div className='mb-4 text-center'>
                    <h1 className='mb-2'> NFT Marketplace</h1>
                    <h4>The Leading Digital Artworks Marketplace</h4>
                </div>
                <Flickity
                    className={'carousel mb-5 w-100'} // default ''
                    elementType={'div'} // default 'div'
                    options={flickityOptions} // takes flickity options {}
                    disableImagesLoaded={false} // default false
                    reloadOnUpdate // default false
                    static // default false
                >
                    <div className='carousel-cell'>
                        {/* <Link to="/"> */}
                        <a href='https://twitter.com/ElementDeFi' target="_blank" rel="noopener noreferrer">                                                                    
                            <img className='img-fluid' src={banner1}/>
                        </a>
                        {/* </Link> */}
                    </div>
                    <div className='carousel-cell'>
                        <a href='https://twitter.com/ElementDeFi' target="_blank" rel="noopener noreferrer">                                                                    
                            {/* <img className='img-fluid' src="https://bscstation.finance/images/bscs-zwz.jpeg"/> */}
                            <img className='img-fluid' src={banner1}/>
                        </a>
                    </div>
                    <div className='carousel-cell'>
                        <a href='https://twitter.com/ElementDeFi' target="_blank" rel="noopener noreferrer">                                                                    
                            {/* <img className='img-fluid' src="https://bscstation.finance/images/bscs-zwz.jpeg"/> */}
                            <img className='img-fluid' src={banner1}/>
                        </a>
                    </div>
                    <div className='carousel-cell'>
                        <a href='https://twitter.com/ElementDeFi' target="_blank" rel="noopener noreferrer">                                                                    
                        <img className='img-fluid' src={banner1}/>
                        </a>
                    </div>
                    <div className='carousel-cell'>
                        <a href='https://twitter.com/ElementDeFi' target="_blank" rel="noopener noreferrer">                                                                    
                        <img className='img-fluid' src={banner1}/>
                        </a>
                    </div>
                    <div className='carousel-cell'>
                        <a href='https://twitter.com/ElementDeFi' target="_blank" rel="noopener noreferrer">                                                                    
                        <img className='img-fluid' src={banner1}/>
                        </a>
                    </div>
                </Flickity>

        
                <Row className='mb-4'>
                    <Col lg={16} className="mb-4">
                        <Card className='card-dash h-100 d-block border-0'>
                            <Row>
                                {/* <Col xs={6} md={4} lg={3} >
                                    <h6 className='subheading mb-2'>Your ALGO blance</h6>
                                    {algobalanceApp === "" || algobalanceApp === null || algobalanceApp === undefined ? (<>
                                        <h6 className='d-flex align-items-center'><img src={Logo} alt="logo" className='me-2 avatar-pic'  /> {configfile.nullvalue}</h6>
                                    </>):(
                                        <h6 className='d-flex align-items-center'><img src={Logo} alt="logo" className='me-2 avatar-pic'  /> {algobalanceApp}</h6>
                                    )}
                                    
                                </Col> */}
                                <Col xs={6} md={4} lg={3} className="my-2">
                                    <h6 className='subheading mb-2'>Your ELEM Balance</h6>
                                    {getElemBalance === '' || getElemBalance === null || getElemBalance === undefined ? ( 
                                        <h6 className='d-flex align-items-center'><img src={Icon1} alt="logo" className='me-2 avatar-pic'   /> 0.00</h6>
                                    ):( 
                                        <h6 className='d-flex align-items-center'><img src={Icon1} alt="logo" className='me-2 avatar-pic'  /> {getElemBalance/1000000}</h6>
                                    )}
                                    
                                </Col>
                                {/* <Col xs={6} md={4} lg={3} className="my-2">
                                    <h6 className='subheading mb-2'>Pending harvest</h6>
                                    <h5 className='d-flex align-items-center'><img src={Icon1} alt="logo" className='me-2 avatar-pic' /> 0.00</h5>
                                </Col>
                                <Col xs={6} md={4} lg={3} className="my-2">
                                    <h6 className='subheading mb-2'>ELEM price</h6>
                                    <h5 className='d-flex align-items-center'>$ 0.05758</h5>
                                </Col>
                                <Col xs={6} md={4} lg={3} className="my-2">
                                    <h6 className='subheading mb-2'>ELEM Market Cap</h6>
                                    <h5 className='d-flex align-items-center'>$ 0.00</h5>
                                </Col> */}
                                <Col xs={6} md={4} lg={3} className="my-2">                                    
                                    <h6 className='subheading mb-2'>Total Rewards</h6>
                                    {getElemBalanceEscrow === '' || getElemBalanceEscrow === null || getElemBalanceEscrow === undefined ? ( 
                                        <h6 className='d-flex align-items-center'> <img src={Icon1} alt="logo" className='me-2 avatar-pic'  />0</h6>
                                    ):(
                                        <h6 className='d-flex align-items-center'><img src={Icon1} alt="logo" className='me-2 avatar-pic'  />{getElemBalanceEscrow/1000000}</h6>
                                    )}                                                                          
                                </Col>
                                <Col xs={6} md={4} lg={3} className="my-2">                                    
                                    <h6 className='subheading mb-2'>Total NFT Minted</h6>
                                    {getImgreffalgoCount === '' || getImgreffalgoCount === null || getImgreffalgoCount === undefined ? ( 
                                        <h6 className='d-flex align-items-center'><img src={algonft} alt="logo" className='me-2 avatar-pic'  />0</h6>
                                    ):(
                                        <h6 className='d-flex align-items-center'><img src={algonft} alt="logo" className='me-2 avatar-pic'  />{getImgreffalgoCount}</h6>
                                    )}                                                                          
                                </Col>
                                <Col xs={6} md={4} lg={3} className="my-2">
                                    <h6 className='subheading mb-2'>ELEM in circulation</h6>
                                    {getElemBalanceEscrowCir === '' || getElemBalanceEscrowCir === null || getElemBalanceEscrowCir === undefined ? ( 
                                        <h6 className='d-flex align-items-center'><img src={Icon1} alt="logo" className='me-2 avatar-pic'  />0.00</h6>
                                    ):(
                                        <h6 className='d-flex align-items-center'><img src={Icon1} alt="logo" className='me-2 avatar-pic'   />{parseFloat(getElemBalanceEscrowCir/1000000)}</h6>
                                    )}
                                    
                                </Col>
                                
                                {/* <Col xs={6} md={4} lg={3} className="my-2">
                                    <h6 className='subheading mb-2'>TVL (ELEM)</h6>
                                    <h5 className='d-flex align-items-center'><img src={Icon1} alt="logo" className='me-2 avatar-pic' /> $ 2,672,087.38</h5>
                                </Col> */}
                                {/* <Col xs={6} md={4} lg={3} className="my-2">
                                    <h6 className='subheading mb-2'>Volume(24hr)</h6>
                                    <h5 className='d-flex align-items-center'><img src={Icon1} alt="logo" className='me-2 avatar-pic' /> $313,156</h5>
                                </Col> */}
                            </Row>
                        </Card>
                    </Col>
                    {/* <Col lg={4} className="mb-4">
                    <Card className='card-dash h-100 d-block border-0'>
                            <Row>
                                <Col xs={6} className="my-2">
                                    <h6 className='subheading mb-2'>Total NFT Minted</h6>
                                    {getElemBalanceEscrow === '' || getElemBalanceEscrow === null || getElemBalanceEscrow === undefined ? ( 
                                        <h6 className='d-flex align-items-center'>0</h6>
                                    ):(
                                        <h6 className='d-flex align-items-center'>{getImgreffalgoCount}</h6>
                                    )}                                                                        
                                </Col>                                
                                <Col xs={6} className="my-2">
                                    <h6 className='subheading mb-2'>ELEM Balance</h6>
                                    {getElemBalanceEscrow === '' || getElemBalanceEscrow === null || getElemBalanceEscrow === undefined ? ( 
                                        <h6 className='d-flex align-items-center'><img src={Icon1} alt="logo" className='me-2 avatar-pic'  /> 0.00</h6>
                                    ):(
                                        <h6 className='d-flex align-items-center'><img src={Icon1} alt="logo" className='me-2 avatar-pic'  /> {parseInt(getElemBalanceEscrow/1000000)}</h6>
                                    )}
                                    
                                </Col>
                                <Col xs={6} className="my-2">
                                    <h6 className='subheading mb-2'>ELEM Trading vol</h6>
                                    <h5 className='d-flex align-items-center'><img src={Icon1} alt="logo" className='me-2 avatar-pic' /> 0.00</h5>
                                </Col>
                                <Col xs={6} className="my-2">
                                    <h6 className='subheading mb-2'>ELEM Lock by NFT</h6>
                                    <h5 className='d-flex align-items-center'><img src={Icon1} alt="logo" className='me-2 avatar-pic' /> 435,000</h5>
                                </Col>
                            </Row>
                        </Card>
                    </Col> */}
                </Row>

                <div className='nft-tabs'>
                    <InputGroup className="input-group-search float-md-end">
                        <Form.Control placeholder="Search" value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
                        <Button variant="outline-secondary" id="button-addon2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                            </svg>
                        </Button>
                    </InputGroup>                    
                    <Tabs defaultActiveKey="all" id="uncontrolled-tab-example" className="mb-3">
                        <Tab eventKey="all" title="All">
                            <div className='d-flex justify-content-end mb-3'>
                            <Dropdown>
                                <Dropdown.Toggle variant='dark' className='noarrow' id="dropdown-basic">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi ms-0 me-2 bi-sort-down-alt" viewBox="0 0 16 16">
                                        <path d="M3.5 3.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 12.293V3.5zm4 .5a.5.5 0 0 1 0-1h1a.5.5 0 0 1 0 1h-1zm0 3a.5.5 0 0 1 0-1h3a.5.5 0 0 1 0 1h-3zm0 3a.5.5 0 0 1 0-1h5a.5.5 0 0 1 0 1h-5zM7 12.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5z"/>
                                    </svg> Sort
                                </Dropdown.Toggle>

                                <Dropdown.Menu className='list-unstyled' align="end">
                                    <Form.Check 
                                        type='radio'
                                        id="sort 1"
                                        label="Latest first"
                                        name="sort"                                        
                                        onChange={()=>{setrecent("Recently added")}}
                                    />
                                    <Form.Check 
                                        type='radio'
                                        id="sort 2"
                                        name="sort"
                                        label="Price low - high"
                                        onChange={()=>{setrecent("Low to High")}}
                                    />
                                    <Form.Check 
                                        type='radio'
                                        id="sort 3"
                                        name="sort"
                                        label="Price high - low"
                                        onChange={()=>{setrecent("High to Low")}}
                                    />
                                </Dropdown.Menu>
                            </Dropdown>
                            </div>
                            <Row>
                            {getImgreffalgosale === null || getImgreffalgosale === "" || getImgreffalgosale === undefined || getImgreffalgosale[0] === null || getImgreffalgosale[0] === "" || getImgreffalgosale[0] === undefined || filterdata()[0] === null || filterdata()[0] === "" || filterdata()[0] === undefined ? (
                            <>
                            {filterdata2().map((x, index) => {  
                                if(index<pageSize)    
                                return(
                                    <HotCollectionTab x={x}/>                                     
                                )
                            })}      
                            </>
                            ) : (
                            <>
                            {filterdata().map((x, index) => {  
                                if(index<pageSize)    

                                return(
                                    <HotCollectionTab x={x}/> 
                                    // <Col xxl={3} md={4} sm={6} xs={12} className='mb-4'>
                                    // <Card className='card-dash p-3 d-block border-0'>
                                    //     <div className='card-img text-center mb-2'>
                                    //         {/* <Link to="/NFT-details"> */}
                                    //             <img src={x.Imageurl} alt="image" className='img-fluid' />
                                    //         {/* </Link> */}
                                    //     </div>
                                    //     <div className='d-flex mb-2 justify-content-between flex-wrap align-items-center'>
                                    //         <h6 className='subheading'>Images</h6>
                                    //         {/* <Badge bg="purple">Image</Badge> */}
                                    //     </div>
                                    //     <h6 className='mb-2'>{x.NFTName} <br /><span className='text-success'>
                                    //     {x.SocialLink === null || x.SocialLink === undefined || x.SocialLink === "" ?(
                                    //         <h6>{configfile.nullvalue}</h6>
                                    //     ):(
                                    //         <h6>{x.SocialLink.slice(0,15)}.....</h6>
                                    //     )}
                                    //     </span></h6>
                                        
                                    //     <ButtonLoad loading={loader} variant='default' className='btn-count float-end' onClick={()=>{addLiked(x)}}>  
                                    //     <svg viewBox="0 0 17 16" fill="none" width="16" height="16" xlmns="http://www.w3.org/2000/svg" className="sc-bdvvtL sc-hKwDye bZjZGw"><path d="M8.2112 14L12.1056 9.69231L14.1853 7.39185C15.2497 6.21455 15.3683 4.46116 14.4723 3.15121V3.15121C13.3207 1.46757 10.9637 1.15351 9.41139 2.47685L8.2112 3.5L6.95566 2.42966C5.40738 1.10976 3.06841 1.3603 1.83482 2.97819V2.97819C0.777858 4.36443 0.885104 6.31329 2.08779 7.57518L8.2112 14Z" stroke="currentColor" strokeWidth="2"></path></svg>                    
                                    //     </ButtonLoad>                    
                                    //     <h4 className='d-flex mb-3 align-items-center'><img src={Logo} alt="logo" style={{width:'12%',height:'8%'}} className='me-2 avatar-pic' /> {x.NFTPrice/1000000}</h4> 
                                        
                                    //     {x.NFTPrice === "" || x.NFTPrice === null || x.NFTPrice === undefined ?(
                                    //         <>                                                                                        
                                    //         <Button variant="blue" className='w-100' s>Buy NFT</Button>                                        
                                    //         </>
                                    //     ):(
                                    //         <Link to={{
                                    //             pathname: "/NFT-details",            
                                    //             state:{allData:x}                                                
                                    //         }}><Button variant="blue" className='w-100'>Buy NFT</Button></Link>
                                    //     )} 
                                        
                                    // </Card>
                                    // </Col>
                                )
                            })}      
                            </>
                            )}                          
                            </Row>

                            {getImgreffalgosale.length <= 12 ? (
                                <></>
                            ):(
                                <div className='pagination justify-content-end d-flex align-items-center'>
                                {/* <div className='page-count'>1</div>
                                <div className='page-numbers'>of 49</div> */}
                                <Button variant='page' onClick={()=>{decrementSize()}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#fff" class="bi m-0 bi-chevron-left" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                                    </svg>
                                </Button>
                                <Button variant='page' onClick={()=>{setPageSize(pageSize+4)}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#fff" class="bi m-0 bi-chevron-right" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                                </Button>
                            </div>

                            ) }                            
                        </Tab>
                    </Tabs>
                </div>                
            </Container>
        </Layout>
    )
}

export default HotCollections;