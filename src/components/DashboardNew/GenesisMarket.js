import React,{useState,useEffect} from 'react';
import Layout from './LayoutT';
import { Link } from 'react-router-dom';
import { Card, Col, Container, Row, Tabs, Tab, Badge, Button, InputGroup, Form, Dropdown,Modal} from 'react-bootstrap';
import ButtonLoad from 'react-bootstrap-button-loader';
import CardImage from '../../assets/images/card-image.jpg';
import Logo from '../../assets/images/algorand-logo.png';
import algonft from '../../assets/images/algonftlogo.jpg'
import configfile from '../../NFTFolder/config.json'
import firebase from '../../NFTFolder/firebase';
import Icon1 from '../../assets/images/elem-original.png';
import logogif from '../../assets/images/gif4.gif';
import configelem from '../../NFTFolder/config.json';
import node from './nodeapi.json';
import { ToastContainer, Zoom, toast} from 'react-toastify';
import GExploreTab from './GExploreTab';
import GSportsTab from './GSportsTab'
import GArtTab from './GArtTab'
import GPetTab from './GPetTab'
import GTradingCardTab from './GTradingCardTab'
import GPhotographyTab from './GPhotographyTab'
const algosdk = require('algosdk'); 


const GenesisMarket = () => {
    useEffect(() => {
        document.title = "Sigma | GenesisMarket"
    }, [])
    const[loader, setLoader] = useState(false);
    const handleShowLoad = () => setLoader(true);
    const handleHideLoad = () => setLoader(false);
    const[getElemBalance,setElembalance]=useState("");
    const[getElemBalanceEscrow,setElembalanceEscrow]=useState("");
    const[getElemBalanceTotal,setElembalanceTotal]=useState("");
    const[getElemBalanceEscrowCir,setElembalanceEscrowCir]=useState("");
    // console.log("ElemBal",getElemBalance)
    // console.log("ElemBalEscrow",getElemBalanceEscrow)
    // console.log("ElemBalEscrowBurn",getElemBalanceTotal)
    // const [showTestAlert,setshowTestAlert] = React.useState(false);   
    // const [issuesdisplay,setissuesdisplay]=useState(null)
    const[getImgreffalgoLiked,setgetImgreffalgoLiked]=useState([]);
    // const [showTestSaleAlready,setshowTestSaleAlready] = React.useState(false);   
    // const [showTestSale,setshowTestSale] = React.useState(false);       
    // const [showTestLoading, setShowTestLoading] = React.useState(false);    
    // const[count,setcount]=useState(0);
    // console.log("Gene",count)
    // const[getImgreffalgo,setgetImgreffalgo]=useState([]);        
    // console.log("checkprofileValue",getImgreffalgo)   
    const[pageSize,setPageSize]=useState(12);     
    const [searchText, setSearchText] = React.useState('');
    const[getrecent,setrecent]=useState("Recently added");
    // console.log("Recent",getrecent)
    const indexClient = new algosdk.Indexer('', node['indexerclient'], '');
    const [algobalanceApp,setalgobalanceApp] = useState("");  
    const[getImgreffalgosale,setgetImgreffalgosale]=useState([]);
    // console.log("checkprofileSale",getImgreffalgosale)  
    const[getImgreffalgosaleSports,setgetImgreffalgosaleSports]=useState([]);
    // console.log("checkprofileSaleS",getImgreffalgosaleSports)  
    const[getImgreffalgosalePet,setgetImgreffalgosalePet]=useState([]);
    // console.log("checkprofileSaleP",getImgreffalgosalePet)  
    const[getImgreffalgosaleArts,setgetImgreffalgosaleArts]=useState([]);
    // console.log("checkprofileSaleA",getImgreffalgosaleArts)  
    const[getImgreffalgoCount,setgetImgreffalgoCount]=useState([]);
    // console.log("checkprofileCount",getImgreffalgoCount)  
    const[getImgreffalgosalePhotography,setgetImgreffalgosalePhotography]=useState([]);
    // console.log("checkprofilePhotography",getImgreffalgosalePhotography)  
    const[getImgreffalgosaleTradingCards,setgetImgreffalgosaleTradingCards]=useState([]);
    // console.log("checkprofileTradingCards",getImgreffalgosaleTradingCards)  
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
        firebase.auth().signInAnonymously().then((response)=>{      
          firebase.database().ref("imagerefexploreoneAlgos").on("value", (data) => {
            if (data) {
              data.forEach((d) => {                
                let value=d.val();
                Object.keys(value).map(async(k)=>{                                        
                req.push(            
                  {
                    Assetid:value[k].Assetid,
                    Imageurl:value[k].Imageurl,
                    NFTPrice:value[k].NFTPrice,
                    EscrowAddress:value[k].EscrowAddress,
                    keyId:value[k].keyId,
                    NFTName:value[k].NFTName,
                    userSymbol:value[k].userSymbol,
                    Ipfsurl:value[k].Ipfsurl,
                    ownerAddress:value[k].ownerAddress,
                    previousoaddress:value[k].previousoaddress,
                    TimeStamp:value[k].TimeStamp,
                    NFTDescription:value[k].NFTDescription,
                    HistoryAddress:value[k].HistoryAddress,
                    Appid:value[k].Appid,
                    valid:value[k].valid,
                    CreatorAddress:value[k].CreatorAddress,
                    NFTType:value[k].NFTType,
                    NFTChannel:value[k].NFTChannel,
                    SocialLink:value[k].SocialLink
                  })                
                })
                });        
              }
              setgetImgreffalgosale(req);
            });      
        })                      
    }      
    useEffect(()=>{dbcallalgos()},[])

    const dbcallalgos1=async()=>{
        //console.log("inside dbcallalgo function")  
        let req = [];
        firebase.auth().signInAnonymously().then((response)=>{      
          firebase.database().ref("imagerefexploreoneAlgos").on("value", (data) => {
            if (data) {
              data.forEach((d) => {                
                let value=d.val();
                Object.keys(value).map(async(k)=>{                                        
                    if(value[k].NFTChannel === "Sports"){
                        // console.log("InsideS",value[k].CreatorAddress)
                        req.push(            
                            {
                              Assetid:value[k].Assetid,
                              Imageurl:value[k].Imageurl,
                              NFTPrice:value[k].NFTPrice,
                              EscrowAddress:value[k].EscrowAddress,
                              keyId:value[k].keyId,
                              NFTName:value[k].NFTName,
                              userSymbol:value[k].userSymbol,
                              Ipfsurl:value[k].Ipfsurl,
                              ownerAddress:value[k].ownerAddress,
                              previousoaddress:value[k].previousoaddress,
                              TimeStamp:value[k].TimeStamp,
                              NFTDescription:value[k].NFTDescription,
                              HistoryAddress:value[k].HistoryAddress,
                              Appid:value[k].Appid,
                              valid:value[k].valid,
                              CreatorAddress:value[k].CreatorAddress,
                              NFTType:value[k].NFTType,
                              NFTChannel:value[k].NFTChannel,
                              SocialLink:value[k].SocialLink
                        })                                  
                        
                    }   
                    
                })
                }); 
                setgetImgreffalgosaleSports(req);                                                 
              }
              
            });      
        })                      
    }      
    useEffect(()=>{dbcallalgos1()},[])

    const dbcallalgos2=async()=>{
        //console.log("inside dbcallalgo function")  
        let req = [];
        firebase.auth().signInAnonymously().then((response)=>{      
          firebase.database().ref("imagerefexploreoneAlgos").on("value", (data) => {
            if (data) {
              data.forEach((d) => {                
                let value=d.val();
                Object.keys(value).map(async(k)=>{                                        
                    if(value[k].NFTChannel === "Pet"){
                        req.push(            
                            {
                              Assetid:value[k].Assetid,
                              Imageurl:value[k].Imageurl,
                              NFTPrice:value[k].NFTPrice,
                              EscrowAddress:value[k].EscrowAddress,
                              keyId:value[k].keyId,
                              NFTName:value[k].NFTName,
                              userSymbol:value[k].userSymbol,
                              Ipfsurl:value[k].Ipfsurl,
                              ownerAddress:value[k].ownerAddress,
                              previousoaddress:value[k].previousoaddress,
                              TimeStamp:value[k].TimeStamp,
                              NFTDescription:value[k].NFTDescription,
                              HistoryAddress:value[k].HistoryAddress,
                              Appid:value[k].Appid,
                              valid:value[k].valid,
                              CreatorAddress:value[k].CreatorAddress,
                              NFTType:value[k].NFTType,
                              NFTChannel:value[k].NFTChannel,
                              SocialLink:value[k].SocialLink
                        })                
                    }               
                })
                });        
              }
              setgetImgreffalgosalePet(req);
            });      
        })                      
    }      
    useEffect(()=>{dbcallalgos2()},[])

    const dbcallalgos3=async()=>{
        //console.log("inside dbcallalgo function")  
        let req = [];
        firebase.auth().signInAnonymously().then((response)=>{      
          firebase.database().ref("imagerefexploreoneAlgos").on("value", (data) => {
            if (data) {
              data.forEach((d) => {                
                let value=d.val();
                Object.keys(value).map(async(k)=>{                                        
                    if(value[k].NFTChannel === "Arts"){
                        req.push(            
                            {
                              Assetid:value[k].Assetid,
                              Imageurl:value[k].Imageurl,
                              NFTPrice:value[k].NFTPrice,
                              EscrowAddress:value[k].EscrowAddress,
                              keyId:value[k].keyId,
                              NFTName:value[k].NFTName,
                              userSymbol:value[k].userSymbol,
                              Ipfsurl:value[k].Ipfsurl,
                              ownerAddress:value[k].ownerAddress,
                              previousoaddress:value[k].previousoaddress,
                              TimeStamp:value[k].TimeStamp,
                              NFTDescription:value[k].NFTDescription,
                              HistoryAddress:value[k].HistoryAddress,
                              Appid:value[k].Appid,
                              valid:value[k].valid,
                              CreatorAddress:value[k].CreatorAddress,
                              NFTType:value[k].NFTType,
                              NFTChannel:value[k].NFTChannel,
                              SocialLink:value[k].SocialLink
                        })                
                    }               
                })
                });        
              }
              setgetImgreffalgosaleArts(req);
            });      
        })                      
    }      
    useEffect(()=>{dbcallalgos3()},[])
    
    const dbcallalgos4=async()=>{
        //console.log("inside dbcallalgo function")  
        let req = [];
        firebase.auth().signInAnonymously().then((response)=>{      
          firebase.database().ref("imagerefexploreoneAlgos").on("value", (data) => {
            if (data) {
              data.forEach((d) => {                
                let value=d.val();
                Object.keys(value).map(async(k)=>{                                        
                    if(value[k].NFTChannel === "Photography"){
                        req.push(            
                            {
                              Assetid:value[k].Assetid,
                              Imageurl:value[k].Imageurl,
                              NFTPrice:value[k].NFTPrice,
                              EscrowAddress:value[k].EscrowAddress,
                              keyId:value[k].keyId,
                              NFTName:value[k].NFTName,
                              userSymbol:value[k].userSymbol,
                              Ipfsurl:value[k].Ipfsurl,
                              ownerAddress:value[k].ownerAddress,
                              previousoaddress:value[k].previousoaddress,
                              TimeStamp:value[k].TimeStamp,
                              NFTDescription:value[k].NFTDescription,
                              HistoryAddress:value[k].HistoryAddress,
                              Appid:value[k].Appid,
                              valid:value[k].valid,
                              CreatorAddress:value[k].CreatorAddress,
                              NFTType:value[k].NFTType,
                              NFTChannel:value[k].NFTChannel,
                              SocialLink:value[k].SocialLink
                        })                
                    }               
                })
                });        
              }
              setgetImgreffalgosalePhotography(req);
            });      
        })                      
    }      
    useEffect(()=>{dbcallalgos4()},[])

    const dbcallalgos5=async()=>{
        //console.log("inside dbcallalgo function")  
        let req = [];
        firebase.auth().signInAnonymously().then((response)=>{      
          firebase.database().ref("imagerefexploreoneAlgos").on("value", (data) => {
            if (data) {
              data.forEach((d) => {                
                let value=d.val();
                Object.keys(value).map(async(k)=>{                                        
                    if(value[k].NFTChannel === "Trading Cards"){
                        req.push(            
                            {
                              Assetid:value[k].Assetid,
                              Imageurl:value[k].Imageurl,
                              NFTPrice:value[k].NFTPrice,
                              EscrowAddress:value[k].EscrowAddress,
                              keyId:value[k].keyId,
                              NFTName:value[k].NFTName,
                              userSymbol:value[k].userSymbol,
                              Ipfsurl:value[k].Ipfsurl,
                              ownerAddress:value[k].ownerAddress,
                              previousoaddress:value[k].previousoaddress,
                              TimeStamp:value[k].TimeStamp,
                              NFTDescription:value[k].NFTDescription,
                              HistoryAddress:value[k].HistoryAddress,
                              Appid:value[k].Appid,
                              valid:value[k].valid,
                              CreatorAddress:value[k].CreatorAddress,
                              NFTType:value[k].NFTType,
                              NFTChannel:value[k].NFTChannel,
                              SocialLink:value[k].SocialLink
                        })                
                    }               
                })
                });        
              }
              setgetImgreffalgosaleTradingCards(req);
            });      
        })                      
    }      
    useEffect(()=>{dbcallalgos5()},[])

    const filterdata=()=>{
        let dateset=new Date().toDateString();
        let today= new Date();
        let weekdate=new Date(today.getFullYear(), today.getMonth(), today.getDate()-1).toDateString();
        //console.log("DateExplore",weekdate)
        // console.log("DateExplore2",dateset)
        if(searchText === "")
        {                          
        if(getrecent === "Recently added"){        
          let data=getImgreffalgosale.reverse().filter((val)=> (weekdate) <= (val.TimeStamp) || (val.TimeStamp) >= dateset)
        console.log("filR",data)
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

    const filterdata1=()=>{
        let dateset=new Date().toDateString();
        let today= new Date();
        let weekdate=new Date(today.getFullYear(), today.getMonth(), today.getDate()-1).toDateString();
        //console.log("DateExplore",weekdate)
        // console.log("DateExplore2",dateset)
        if(searchText === "")
        {                          
        if(getrecent === "Recently added"){        
          let data=getImgreffalgosaleSports.reverse().filter((val)=> (weekdate) <= (val.TimeStamp) || (val.TimeStamp) >= dateset)
        console.log("filR",data)
          return data;        
        }
        if(getrecent === "Low to High"){
          let data=getImgreffalgosaleSports.sort((a,b)=>{ return parseFloat(a.NFTPrice/1000000) - parseFloat(b.NFTPrice/1000000)})
          //console.log("filtercall1",data)
          return data;
        }
        if(getrecent ===  "High to Low"){
          let data=getImgreffalgosaleSports.sort((a,b)=>{ return parseFloat(b.NFTPrice/1000000) - parseFloat(a.NFTPrice/1000000)})
          //console.log("filtercall1",data)
          return data;
        }
        }
        else{
                let data = getImgreffalgosaleSports.filter((val)=>{
                if(val.NFTName === "" || val.NFTName === null || val.NFTName === undefined){    
                }else{
                let val1 = (val.NFTName).toLowerCase().includes(searchText.toLocaleLowerCase())                                
                return val1
                }            
            })                                    
            return data;
        }                
        return getImgreffalgosaleSports
    }

    const filterdata2=()=>{
        let dateset=new Date().toDateString();
        let today= new Date();
        let weekdate=new Date(today.getFullYear(), today.getMonth(), today.getDate()-1).toDateString();
        //console.log("DateExplore",weekdate)
        // console.log("DateExplore2",dateset)
        if(searchText === "")
        {                          
        if(getrecent === "Recently added"){        
          let data=getImgreffalgosalePet.reverse().filter((val)=> (weekdate) <= (val.TimeStamp) || (val.TimeStamp) >= dateset)
        console.log("filR",data)
          return data;        
        }
        if(getrecent === "Low to High"){
          let data=getImgreffalgosalePet.sort((a,b)=>{ return parseFloat(a.NFTPrice/1000000) - parseFloat(b.NFTPrice/1000000)})
          //console.log("filtercall1",data)
          return data;
        }
        if(getrecent ===  "High to Low"){
          let data=getImgreffalgosalePet.sort((a,b)=>{ return parseFloat(b.NFTPrice/1000000) - parseFloat(a.NFTPrice/1000000)})
          //console.log("filtercall1",data)
          return data;
        }
        }
        else{
                let data = getImgreffalgosalePet.filter((val)=>{
                if(val.NFTName === "" || val.NFTName === null || val.NFTName === undefined){    
                }else{
                let val1 = (val.NFTName).toLowerCase().includes(searchText.toLocaleLowerCase())                                
                return val1
                }            
            })                                    
            return data;
        }                
        return getImgreffalgosalePet
    }

    const filterdata3=()=>{
        let dateset=new Date().toDateString();
        let today= new Date();
        let weekdate=new Date(today.getFullYear(), today.getMonth(), today.getDate()-1).toDateString();
        //console.log("DateExplore",weekdate)
        // console.log("DateExplore2",dateset)
        if(searchText === "")
        {                          
        if(getrecent === "Recently added"){        
          let data=getImgreffalgosaleArts.reverse().filter((val)=> (weekdate) <= (val.TimeStamp) || (val.TimeStamp) >= dateset)
        console.log("filR",data)
          return data;        
        }
        if(getrecent === "Low to High"){
          let data=getImgreffalgosaleArts.sort((a,b)=>{ return parseFloat(a.NFTPrice/1000000) - parseFloat(b.NFTPrice/1000000)})
          console.log("filtercall1",data)
          return data;
        }
        if(getrecent ===  "High to Low"){
          let data=getImgreffalgosaleArts.sort((a,b)=>{ return parseFloat(b.NFTPrice/1000000) - parseFloat(a.NFTPrice/1000000)})
          console.log("filtercall1",data)
          return data;
        }
        }
        else{
                let data = getImgreffalgosaleArts.filter((val)=>{
                if(val.NFTName === "" || val.NFTName === null || val.NFTName === undefined){    
                }else{
                let val1 = (val.NFTName).toLowerCase().includes(searchText.toLocaleLowerCase())                                
                return val1
                }            
            })                                    
            return data;
        }                
        return getImgreffalgosaleArts
    }

    const filterdata4=()=>{
        let dateset=new Date().toDateString();
        let today= new Date();
        let weekdate=new Date(today.getFullYear(), today.getMonth(), today.getDate()-1).toDateString();
        //console.log("DateExplore",weekdate)
        // console.log("DateExplore2",dateset)
        if(searchText === "")
        {                          
        if(getrecent === "Recently added"){        
          let data=getImgreffalgosalePhotography.reverse().filter((val)=> (weekdate) <= (val.TimeStamp) || (val.TimeStamp) >= dateset)
        console.log("filR",data)
          return data;        
        }
        if(getrecent === "Low to High"){
            let data=getImgreffalgosalePhotography.sort((a,b)=>{ return parseFloat(a.NFTPrice/1000000) - parseFloat(b.NFTPrice/1000000)})
            //console.log("filtercall1",data)
            return data;
          }
          if(getrecent ===  "High to Low"){
            let data=getImgreffalgosalePhotography.sort((a,b)=>{ return parseFloat(b.NFTPrice/1000000) - parseFloat(a.NFTPrice/1000000)})
            //console.log("filtercall1",data)
            return data;
          }
        }
        else{
                let data = getImgreffalgosalePhotography.filter((val)=>{
                if(val.NFTName === "" || val.NFTName === null || val.NFTName === undefined){    
                }else{
                let val1 = (val.NFTName).toLowerCase().includes(searchText.toLocaleLowerCase())                                
                return val1
                }            
            })                                    
            return data;
        }                
        //return getImgreffalgosalePhotography
    }

    const filterdata5=()=>{
        let dateset=new Date().toDateString();
        let today= new Date();
        let weekdate=new Date(today.getFullYear(), today.getMonth(), today.getDate()-1).toDateString();
        //console.log("DateExplore",weekdate)
        // console.log("DateExplore2",dateset)
        if(searchText === "")
        {                          
        if(getrecent === "Recently added"){        
          let data=getImgreffalgosaleTradingCards.reverse().filter((val)=> (weekdate) <= (val.TimeStamp) || (val.TimeStamp) >= dateset)
        console.log("filR",data)
          return data;        
        }
        if(getrecent === "Low to High"){
          let data=getImgreffalgosaleTradingCards.sort((a,b)=>{ return parseFloat(a.NFTPrice/1000000) - parseFloat(b.NFTPrice/1000000)})
          //console.log("filtercall1",data)
          return data;
        }
        if(getrecent ===  "High to Low"){
          let data=getImgreffalgosaleTradingCards.sort((a,b)=>{ return parseFloat(b.NFTPrice/1000000) - parseFloat(a.NFTPrice/1000000)})
          //console.log("filtercall1",data)
          return data;
        }
        }
        else{
                let data = getImgreffalgosaleTradingCards.filter((val)=>{
                if(val.NFTName === "" || val.NFTName === null || val.NFTName === undefined){    
                }else{
                let val1 = (val.NFTName).toLowerCase().includes(searchText.toLocaleLowerCase())                                
                return val1
                }            
            })                                    
            return data;
        }                
        return getImgreffalgosaleTradingCards
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
    //                                     //setShowTestLoading(false)		
    //                                     toast.success(`Thanks for liking`,{autoClose:3000})
    //                                     handleHideLoad()
    //                                     //setshowTestSale(true)
    //                                 })
    //                 })

    //             }
    //             else{
    //                 let asset=""
    //                 firebase.database().ref("LikedImage").child(localStorage.getItem("walletAddress")).child(x.keyId).child(x.Assetid)
    //                 .once('value', snapshot => {                        
    //                     asset=snapshot.key;
    //                 })
    //                 console.log("LikedD",asset)                        
    //                 if(asset === x.Assetid){
    //                     toast.success(`You are Already Liked`,{autoClose:3000})
    //                     handleHideLoad()                    
    //                 }else{
    //                     if(asset === "" || asset === null || asset === undefined){
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
    //                                             toast.success(`Thanks for liking`,{autoClose:3000})
    //                                             handleHideLoad()
    //                                             //handleHideLoad()
    //                                             //setshowTestSale(true)
    //                                         })
    //                         })
    //                     }
    //                         else{
    //                         let ref2=firebase.database().ref(`LikedImage/${localStorage.getItem('walletAddress')}`);            
    //                         let refactivity=firebase.database().ref(`activitytable/${localStorage.getItem('walletAddress')}`);   
    //                         const db = ref2.push().key;                                                
    //                         ref2.child(x.keyId).update({
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
                        
    //                 }
                    
    //                 firebase.database().ref("LikedImage").child(localStorage.getItem("walletAddress")).on("value", (data) => {
    //                     if (data) {
    //                       data.forEach((d) => {  
                              
                            
    //                       })
    //                     }
    //                 })
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

    const addLiked=(x)=>{        
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
        firebase.auth().signInAnonymously().then((response)=>{      
            if(getImgreffalgoLiked === "" || getImgreffalgoLiked === null || getImgreffalgoLiked === undefined)
            {
                // toast.success(`You are Already Liked`,{autoClose:3000})
                // handleHideLoad()
            }else{
                if(getImgreffalgoLiked[0] === "" || getImgreffalgoLiked[0] === null || getImgreffalgoLiked[0] === undefined){
                    let ref2=firebase.database().ref(`LikedImage/${localStorage.getItem('walletAddress')}`);            
                    let refactivity=firebase.database().ref(`activitytable/${localStorage.getItem('walletAddress')}`);   
                    const db = ref2.push().key;                                                
                    ref2.child(db).set({
                    Assetid:x.Assetid,Imageurl:x.Imageurl,NFTPrice:x.NFTPrice,EscrowAddress:x.EscrowAddress,keyId:x.keyId,
                    NFTName:x.NFTName,userSymbol:x.userSymbol,Ipfsurl:x.Ipfsurl,ownerAddress:x.ownerAddress,previousoaddress:x.previousoaddress,
                    TimeStamp:x.TimeStamp,NFTDescription:x.NFTDescription,HistoryAddress:x.HistoryAddress,Appid:x.Appid,valid:x.valid,
                    CreatorAddress:x.CreatorAddress,NFTType:x.NFTType,NFTChannel:x.NFTChannel,SocialLink:x.SocialLink
                    })
                    .then(()=>{
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

                }
                else{                    
                    getImgreffalgoLiked.map((a)=>{
                        // console.log("Assetid",a.Assetid)
                    if(a.Assetid === x.Assetid){
                        toast.dismiss()
                        toast.success(`You are Already Liked`,{autoClose:3000})                        
                        handleHideLoad()        
                        window.location.reload(false)            
                    }else if(a.asset === "" || a.asset === null || a.asset === undefined){
                            let ref2=firebase.database().ref(`LikedImage/${localStorage.getItem('walletAddress')}`);            
                            let refactivity=firebase.database().ref(`activitytable/${localStorage.getItem('walletAddress')}`);   
                            const db = ref2.push().key;                                                
                            ref2.child(x.keyId).set({
                            Assetid:x.Assetid,Imageurl:x.Imageurl,NFTPrice:x.NFTPrice,EscrowAddress:x.EscrowAddress,keyId:x.keyId,
                            NFTName:x.NFTName,userSymbol:x.userSymbol,Ipfsurl:x.Ipfsurl,ownerAddress:x.ownerAddress,previousoaddress:x.previousoaddress,
                            TimeStamp:x.TimeStamp,NFTDescription:x.NFTDescription,HistoryAddress:x.HistoryAddress,Appid:x.Appid,valid:x.valid,
                            CreatorAddress:x.CreatorAddress,NFTType:x.NFTType,NFTChannel:x.NFTChannel,SocialLink:x.SocialLink
                            })
                            .then(()=>{
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
                                                //setShowTestLoading(false)		
                                                toast.dismiss()
                                                toast.success(`Thanks for liking`,{autoClose:3000})
                                                handleHideLoad()
                                                //handleHideLoad()
                                                //setshowTestSale(true)
                                            })
                            })
                    }
                    else{
                            let ref2=firebase.database().ref(`LikedImage/${localStorage.getItem('walletAddress')}`);            
                            let refactivity=firebase.database().ref(`activitytable/${localStorage.getItem('walletAddress')}`);   
                            const db = ref2.push().key;                                                
                            ref2.child(x.keyId).set({
                            Assetid:x.Assetid,Imageurl:x.Imageurl,NFTPrice:x.NFTPrice,EscrowAddress:x.EscrowAddress,keyId:x.keyId,
                            NFTName:x.NFTName,userSymbol:x.userSymbol,Ipfsurl:x.Ipfsurl,ownerAddress:x.ownerAddress,previousoaddress:x.previousoaddress,
                            TimeStamp:x.TimeStamp,NFTDescription:x.NFTDescription,HistoryAddress:x.HistoryAddress,Appid:x.Appid,valid:x.valid,
                            CreatorAddress:x.CreatorAddress,NFTType:x.NFTType,NFTChannel:x.NFTChannel,SocialLink:x.SocialLink
                            })
                            .then(()=>{
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
                                                //setShowTestLoading(false)	
                                                toast.dismiss()	
                                                toast.success(`Thanks for liking`,{autoClose:3000})
                                                handleHideLoad()
                                                //handleHideLoad()
                                                //setshowTestSale(true)
                                            })
                            })
                                // toast.success(`You are Already Likeds`,{autoClose:3000})
                                // handleHideLoad()
                                //handleHideLoad()
                                //setShowTestLoading(false)
                                //setshowTestSaleAlready(true)
                            }                                                                                    
                    })
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
            }            
            })
        }
    }
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
    // const dbcallalgo=async()=>{
    //     //console.log("inside dbcallalgo function")  
    //     let req = [];
    //     if(localStorage.getItem("walletAddress")  === null || localStorage.getItem("walletAddress")  === "" || localStorage.getItem("walletAddress")  === " " || localStorage.getItem("wallet") === undefined || localStorage.getItem("walletAddress") === ''){
    //     }
    //     else{        
        
    //       firebase.database().ref("imagerefAlgo").on("value", (data) => {
    //         if (data) {
    //           data.forEach((d) => {                
    //             let value=d.val();
    //             setcount(count+1)
    //         });
    //         }                           
    //       })
    //     }                
    // }      
    // useEffect(()=>{dbcallalgo()},[])
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

    const filterdata2static1=()=>{
        if(searchText === "")
        {                  
        let data=getImgreffalgosale.sort((a,b)=>{ return parseFloat(a.NFTPrice/1000000) - parseFloat(b.NFTPrice/1000000)})
          //console.log("filtercall1",data)
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
    const filterdata2static2=()=>{
        if(searchText === "")
        {                  
        let data=getImgreffalgosaleSports.sort((a,b)=>{ return parseFloat(a.NFTPrice/1000000) - parseFloat(b.NFTPrice/1000000)})
          //console.log("filtercall1",data)
        return data;
        }
        else{
                let data = getImgreffalgosaleSports.filter((val)=>{
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
    const filterdata2static3=()=>{
        if(searchText === "")
        {                  
        let data=getImgreffalgosalePet.sort((a,b)=>{ return parseFloat(a.NFTPrice/1000000) - parseFloat(b.NFTPrice/1000000)})
          //console.log("filtercall1",data)
        return data;
        }
        else{
                let data = getImgreffalgosalePet.filter((val)=>{
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
    const filterdata2static4=()=>{
        if(searchText === "")
        {                  
        let data=getImgreffalgosalePhotography.sort((a,b)=>{ return parseFloat(a.NFTPrice/1000000) - parseFloat(b.NFTPrice/1000000)})
          //console.log("filtercall1",data)
        return data;
        }
        else{
                let data = getImgreffalgosalePhotography.filter((val)=>{
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
    const filterdata2static5=()=>{
        if(searchText === "")
        {                  
        let data=getImgreffalgosaleTradingCards.sort((a,b)=>{ return parseFloat(a.NFTPrice/1000000) - parseFloat(b.NFTPrice/1000000)})
          //console.log("filtercall1",data)
        return data;
        }
        else{
                let data = getImgreffalgosaleTradingCards.filter((val)=>{
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
    const filterdata2static6=()=>{
        if(searchText === "")
        {                  
        let data=getImgreffalgosaleArts.sort((a,b)=>{ return parseFloat(a.NFTPrice/1000000) - parseFloat(b.NFTPrice/1000000)})
          //console.log("filtercall1",data)
        return data;
        }
        else{
                let data = getImgreffalgosaleArts.filter((val)=>{
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


    return (
        <Layout>
            <Container>
            <ToastContainer position='bottom-right' draggable = {false} transition={Zoom} autoClose={4000} closeOnClick = {false}/>        
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
                        <Tab eventKey="all" title="Explore">
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
                                {filterdata2static1().map((x, index) => {  
                                    if(index<pageSize)    
                                    return(
                                        <GExploreTab x={x}/>                                     
                                    )
                                })}      
                                </>
                            ) : (
                            <>
                            {filterdata().map((x, index) => {   
                                if(index<pageSize)                
                                return(
                                    <GExploreTab x={x}/> 
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
                                    //     {/* <h6 className='mb-2'>{x.NFTName} <br /><span className='text-success'><h6>{x.SocialLink.slice(0,18)}</h6></span></h6> */}
                                    //     <h6 className='mb-2'>{x.NFTName} <br /><span className='text-success'><h6>
                                    //         {x.SocialLink === null || x.SocialLink === undefined || x.SocialLink === "" ? ( 
                                    //             <>{configfile.nullvalue}</>
                                    //         ):( 
                                    //             <>
                                    //             {x.SocialLink.slice(0,18)}
                                    //             </>
                                    //         )}                                            
                                    //         </h6></span></h6>
                                    //     {/* <ButtonLoad loading={loader} variant='default' className='btn-count float-end' onClick={()=>{addLiked(x)}}>  
                                    //     <svg viewBox="0 0 17 16" fill="none" width="16" height="16" xlmns="http://www.w3.org/2000/svg" className="sc-bdvvtL sc-hKwDye bZjZGw"><path d="M8.2112 14L12.1056 9.69231L14.1853 7.39185C15.2497 6.21455 15.3683 4.46116 14.4723 3.15121V3.15121C13.3207 1.46757 10.9637 1.15351 9.41139 2.47685L8.2112 3.5L6.95566 2.42966C5.40738 1.10976 3.06841 1.3603 1.83482 2.97819V2.97819C0.777858 4.36443 0.885104 6.31329 2.08779 7.57518L8.2112 14Z" stroke="currentColor" strokeWidth="2"></path></svg>                    
                                    //     </ButtonLoad>                     */}
                                    //     <h4 className='d-flex mb-3 align-items-center'><img src={Logo} style={{width:'12%',height:'8%'}}alt="logo" className='me-2 avatar-pic' /> {x.NFTPrice/1000000}</h4> 
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

                            {getImgreffalgosale.length <= 10 ? (
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
                        
                        <Tab eventKey="Sports" title="Sports">
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
                            {getImgreffalgosaleSports === null || getImgreffalgosaleSports === "" || getImgreffalgosaleSports === undefined || getImgreffalgosaleSports[0] === null || getImgreffalgosaleSports[0] === "" || getImgreffalgosaleSports[0] === undefined || filterdata1()[0] === null || filterdata1()[0] === "" || filterdata1()[0] === undefined ? (
                                <>
                                {filterdata2static2().map((x, index) => {  
                                    if(index<pageSize)    
                                    return(
                                        <GSportsTab x={x}/>                                     
                                    )
                                })}      
                                </>
                            ) : (
                            <>
                            {filterdata1().map((x, index) => {  
                                if(index<pageSize)                                                 
                                return(
                                    <GSportsTab x={x}/>                                                                     
                                    // <Col xxl={3} md={4} sm={6} xs={12} className='mb-4'>
                                    // <Card className='card-dash p-3 d-block border-0'>
                                    //     <div className='card-img text-center mb-2'>
                                    //         <Link 
                                    //         to={{
                                    //         pathname: "/my-NFTcopy",            
                                    //         state:{allData:x} 
                                    //         }}
                                    //         >
                                    //         <img src={x.Imageurl} alt="image" className='img-fluid' />
                                    //         </Link>
                                    //     </div>
                                    //     <div className='d-flex mb-2 justify-content-between flex-wrap align-items-center'>
                                    //         <h6 className='subheading'>Images</h6>
                                    //         {/* <Badge bg="purple">Image</Badge> */}
                                    //     </div>
                                    //     {/* <h3 className='mb-2'>{x.NFTName} <br /><span className='text-success'><h6>{x.SocialLink}</h6></span></h3> */}
                                    //     {/* <h6 className='mb-2'>{x.NFTName} <br /><span className='text-success'><h6>{x.SocialLink.slice(0,18)}</h6></span></h6> */}
                                    //     <h6 className='mb-2'>{x.NFTName} <br /><span className='text-success'><h6>
                                    //         {x.SocialLink === null || x.SocialLink === undefined || x.SocialLink === "" ? ( 
                                    //             <>{configfile.nullvalue}</>
                                    //         ):( 
                                    //             <>
                                    //             {x.SocialLink.slice(0,18)}
                                    //             </>
                                    //         )}                                            
                                    //         </h6></span></h6>
                                    //     {/* <ButtonLoad loading={loader} variant='default' className='btn-count float-end' onClick={()=>{addLiked(x)}}>  
                                    //     <svg viewBox="0 0 17 16" fill="none" width="16" height="16" xlmns="http://www.w3.org/2000/svg" className="sc-bdvvtL sc-hKwDye bZjZGw"><path d="M8.2112 14L12.1056 9.69231L14.1853 7.39185C15.2497 6.21455 15.3683 4.46116 14.4723 3.15121V3.15121C13.3207 1.46757 10.9637 1.15351 9.41139 2.47685L8.2112 3.5L6.95566 2.42966C5.40738 1.10976 3.06841 1.3603 1.83482 2.97819V2.97819C0.777858 4.36443 0.885104 6.31329 2.08779 7.57518L8.2112 14Z" stroke="currentColor" strokeWidth="2"></path></svg>                    
                                    //     </ButtonLoad>                     */}
                                    //     <h4 className='d-flex mb-3 align-items-center'><img src={Logo} alt="logo" className='me-2 avatar-pic' style={{width:'12%',height:'8%'}}/> {x.NFTPrice/1000000}</h4> 
                                    //     {/* {x.NFTPrice === "" || x.NFTPrice === null || x.NFTPrice === undefined ?(
                                    //         <>                                                                                        
                                    //         <Button variant='primary' className='w-100' s>Buy NFT</Button>                                        
                                    //         </>
                                    //     ):(
                                    //         <Link to={{
                                    //             pathname: "/NFT-details",            
                                    //             state:{allData:x}                                                
                                    //         }}><Button variant='primary' className='w-100'>Buy NFT</Button></Link>
                                    //     )}  */}
                                    // </Card>
                                    // </Col>                                                                                                                                                 
                                )
                            })}   
                            </>
                            )}                             
                            </Row>

                            {getImgreffalgosaleSports.length <= 12 ? (
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
                        <Tab eventKey="Pet" title="Pet">
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
                            {getImgreffalgosalePet === null || getImgreffalgosalePet === "" || getImgreffalgosalePet === undefined || getImgreffalgosalePet[0] === null || getImgreffalgosalePet[0] === "" || getImgreffalgosalePet[0] === undefined || filterdata2()[0] === null || filterdata2()[0] === "" || filterdata2()[0] === undefined ? (
                                <>
                                {filterdata2static3().map((x, index) => {  
                                    if(index<pageSize)    
                                    return(
                                        <GPetTab x={x}/>                                     
                                    )
                                })}      
                                </>
                            ) : (
                            <>
                            {filterdata2().map((x, index) => {  
                                if(index<pageSize)                 
                                return( 
                                    <GPetTab x={x}/>                                 
                                    
                                        // <Col xxl={3} md={4} sm={6} xs={12} className='mb-4'>
                                        // <Card className='card-dash p-3 d-block border-0'>
                                        //     <div className='card-img text-center mb-2'>
                                        //         <Link 
                                        //         to={{
                                        //         pathname: "/my-NFTcopy",            
                                        //         state:{allData:x} 
                                        //         }}
                                        //         >
                                        //         <img src={x.Imageurl} alt="image" className='img-fluid' />
                                        //         </Link>
                                        //     </div>
                                        //     <div className='d-flex mb-2 justify-content-between flex-wrap align-items-center'>
                                        //         <h6 className='subheading'>Images</h6>
                                        //         {/* <Badge bg="purple">Image</Badge> */}
                                        //     </div>
                                        //     {/* <h6 className='mb-2'>{x.NFTName} <br /><span className='text-success'><h6>{x.SocialLink.slice(0,18)}</h6></span></h6> */}
                                        //     <h6 className='mb-2'>{x.NFTName} <br /><span className='text-success'><h6>
                                        //     {x.SocialLink === null || x.SocialLink === undefined || x.SocialLink === "" ? ( 
                                        //         <>{configfile.nullvalue}</>
                                        //     ):( 
                                        //         <>
                                        //         {x.SocialLink.slice(0,18)}
                                        //         </>
                                        //     )}                                            
                                        //     </h6></span></h6>
                                        //     {/* <ButtonLoad loading={loader} variant='default' className='btn-count float-end' onClick={()=>{addLiked(x)}}>  
                                        //     <svg viewBox="0 0 17 16" fill="none" width="16" height="16" xlmns="http://www.w3.org/2000/svg" className="sc-bdvvtL sc-hKwDye bZjZGw"><path d="M8.2112 14L12.1056 9.69231L14.1853 7.39185C15.2497 6.21455 15.3683 4.46116 14.4723 3.15121V3.15121C13.3207 1.46757 10.9637 1.15351 9.41139 2.47685L8.2112 3.5L6.95566 2.42966C5.40738 1.10976 3.06841 1.3603 1.83482 2.97819V2.97819C0.777858 4.36443 0.885104 6.31329 2.08779 7.57518L8.2112 14Z" stroke="currentColor" strokeWidth="2"></path></svg>                    
                                        //     </ButtonLoad>                     */}
                                        //     <h4 className='d-flex mb-3 align-items-center'><img src={Logo} alt="logo" className='me-2 avatar-pic' style={{width:'12%',height:'8%'}}/> {x.NFTPrice/1000000}</h4> 
                                        //     {/* {x.NFTPrice === "" || x.NFTPrice === null || x.NFTPrice === undefined ?(
                                        //         <>                                                                                        
                                        //         <Button variant='primary' className='w-100' s>Buy NFT</Button>                                        
                                        //         </>
                                        //     ):(
                                        //         <Link to={{
                                        //             pathname: "/NFT-details",            
                                        //             state:{allData:x}                                                
                                        //         }}><Button variant='primary' className='w-100'>Buy NFT</Button></Link>
                                        //     )}  */}
                                        // </Card>
                                        // </Col>                                    
                                )
                            })}  
                            </>
                            )}                              
                            </Row>

                            {getImgreffalgosalePet.length <= 12 ? (
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
                        <Tab eventKey="Photography" title="Photography">
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
                            {getImgreffalgosalePhotography === null || getImgreffalgosalePhotography === "" || getImgreffalgosalePhotography === undefined || getImgreffalgosalePhotography[0] === null || getImgreffalgosalePhotography[0] === "" || getImgreffalgosalePhotography[0] === undefined || filterdata4()[0] === null || filterdata4()[0] === "" || filterdata4()[0] === undefined ? (
                                <>
                                {filterdata2static4().map((x, index) => {  
                                    if(index<pageSize)    
                                    return(
                                        <GPhotographyTab x={x}/>                                     
                                    )
                                })}      
                                </>
                            ) : (
                            <>
                            {filterdata4().map((x, index) => {  
                                if(index<pageSize)                 
                                return(       
                                    <GPhotographyTab x={x}/>                                                               
                                        // <Col xxl={3} md={4} sm={6} xs={12} className='mb-4'>
                                        // <Card className='card-dash p-3 d-block border-0'>
                                        //     <div className='card-img text-center mb-2'>
                                        //         <Link 
                                        //         to={{
                                        //         pathname: "/my-NFTcopy",            
                                        //         state:{allData:x} 
                                        //         }}
                                        //         >
                                        //         <img src={x.Imageurl} alt="image" className='img-fluid' />
                                        //         </Link>
                                        //     </div>
                                        //     <div className='d-flex mb-2 justify-content-between flex-wrap align-items-center'>
                                        //         <h6 className='subheading'>Images</h6>
                                        //         {/* <Badge bg="purple">Image</Badge> */}
                                        //     </div>
                                        //     {/* <h6 className='mb-2'>{x.NFTName} <br /><span className='text-success'><h6>{x.SocialLink.slice(0,18)}</h6></span></h6> */}
                                        //     <h6 className='mb-2'>{x.NFTName} <br /><span className='text-success'><h6>
                                        //     {x.SocialLink === null || x.SocialLink === undefined || x.SocialLink === "" ? ( 
                                        //         <>{configfile.nullvalue}</>
                                        //     ):( 
                                        //         <>
                                        //         {x.SocialLink.slice(0,18)}
                                        //         </>
                                        //     )}                                            
                                        //     </h6></span></h6>
                                        //     {/* <ButtonLoad loading={loader} variant='default' className='btn-count float-end' onClick={()=>{addLiked(x)}}>  
                                        //     <svg viewBox="0 0 17 16" fill="none" width="16" height="16" xlmns="http://www.w3.org/2000/svg" className="sc-bdvvtL sc-hKwDye bZjZGw"><path d="M8.2112 14L12.1056 9.69231L14.1853 7.39185C15.2497 6.21455 15.3683 4.46116 14.4723 3.15121V3.15121C13.3207 1.46757 10.9637 1.15351 9.41139 2.47685L8.2112 3.5L6.95566 2.42966C5.40738 1.10976 3.06841 1.3603 1.83482 2.97819V2.97819C0.777858 4.36443 0.885104 6.31329 2.08779 7.57518L8.2112 14Z" stroke="currentColor" strokeWidth="2"></path></svg>                    
                                        //     </ButtonLoad>                     */}
                                        //     <h4 className='d-flex mb-3 align-items-center'><img src={Logo} alt="logo" className='me-2 avatar-pic' style={{width:'12%',height:'8%'}} /> {x.NFTPrice/1000000}</h4> 
                                        //     {/* {x.NFTPrice === "" || x.NFTPrice === null || x.NFTPrice === undefined ?(
                                        //         <>                                                                                        
                                        //         <Button variant='primary' className='w-100' s>Buy NFT</Button>                                        
                                        //         </>
                                        //     ):(
                                        //         <Link to={{
                                        //             pathname: "/NFT-details",            
                                        //             state:{allData:x}                                                
                                        //         }}><Button variant='primary' className='w-100'>Buy NFT</Button></Link>
                                        //     )}  */}
                                        // </Card>
                                        // </Col>                                    
                                )
                            })}    
                            </>
                            )}                            
                            </Row>

                            {getImgreffalgosalePhotography.length <= 12 ? (
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
                        <Tab eventKey="Trading Cards" title="Trading Cards">
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
                            {getImgreffalgosaleTradingCards === null || getImgreffalgosaleTradingCards === "" || getImgreffalgosaleTradingCards === undefined || getImgreffalgosaleTradingCards[0] === null || getImgreffalgosaleTradingCards[0] === "" || getImgreffalgosaleTradingCards[0] === undefined || filterdata5()[0] === null || filterdata5()[0] === "" || filterdata5()[0] === undefined ? (
                                <>
                                {filterdata2static5().map((x, index) => {  
                                    if(index<pageSize)    
                                    return(
                                        <GTradingCardTab x={x}/>                                     
                                    )
                                })}      
                                </>
                            ) : (
                            <>
                            {filterdata5().map((x, index) => {  
                                if(index<pageSize)                 
                                return(       
                                    <GTradingCardTab x={x}/>                                                               
                                        // <Col xxl={3} md={4} sm={6} xs={12} className='mb-4'>
                                        // <Card className='card-dash p-3 d-block border-0'>
                                        //     <div className='card-img text-center mb-2'>
                                        //         <Link 
                                        //         to={{
                                        //         pathname: "/my-NFTcopy",            
                                        //         state:{allData:x} 
                                        //         }}
                                        //         >
                                        //         <img src={x.Imageurl} alt="image" className='img-fluid' />
                                        //         </Link>
                                        //     </div>
                                        //     <div className='d-flex mb-2 justify-content-between flex-wrap align-items-center'>
                                        //         <h6 className='subheading'>Images</h6>
                                        //         {/* <Badge bg="purple">Image</Badge> */}
                                        //     </div>
                                        //     {/* <h6 className='mb-2'>{x.NFTName} <br /><span className='text-success'><h6>{x.SocialLink.slice(0,18)}</h6></span></h6> */}
                                        //     <h6 className='mb-2'>{x.NFTName} <br /><span className='text-success'><h6>
                                        //     {x.SocialLink === null || x.SocialLink === undefined || x.SocialLink === "" ? ( 
                                        //         <>{configfile.nullvalue}</>
                                        //     ):( 
                                        //         <>
                                        //         {x.SocialLink.slice(0,18)}
                                        //         </>
                                        //     )}                                            
                                        //     </h6></span></h6>
                                        //     {/* <ButtonLoad loading={loader} variant='default' className='btn-count float-end' onClick={()=>{addLiked(x)}}>  
                                        //     <svg viewBox="0 0 17 16" fill="none" width="16" height="16" xlmns="http://www.w3.org/2000/svg" className="sc-bdvvtL sc-hKwDye bZjZGw"><path d="M8.2112 14L12.1056 9.69231L14.1853 7.39185C15.2497 6.21455 15.3683 4.46116 14.4723 3.15121V3.15121C13.3207 1.46757 10.9637 1.15351 9.41139 2.47685L8.2112 3.5L6.95566 2.42966C5.40738 1.10976 3.06841 1.3603 1.83482 2.97819V2.97819C0.777858 4.36443 0.885104 6.31329 2.08779 7.57518L8.2112 14Z" stroke="currentColor" strokeWidth="2"></path></svg>                    
                                        //     </ButtonLoad>                     */}
                                        //     <h4 className='d-flex mb-3 align-items-center'><img src={Logo} alt="logo" className='me-2 avatar-pic' style={{width:'12%',height:'8%'}} /> {x.NFTPrice/1000000}</h4> 
                                        //     {/* {x.NFTPrice === "" || x.NFTPrice === null || x.NFTPrice === undefined ?(
                                        //         <>                                                                                        
                                        //         <Button variant='primary' className='w-100' s>Buy NFT</Button>                                        
                                        //         </>
                                        //     ):(
                                        //         <Link to={{
                                        //             pathname: "/NFT-details",            
                                        //             state:{allData:x}                                                
                                        //         }}><Button variant='primary' className='w-100'>Buy NFT</Button></Link>
                                        //     )}  */}
                                        // </Card>
                                        // </Col>                                    
                                )
                            })}  
                            </>
                            )}                              
                            </Row>

                            {getImgreffalgosaleTradingCards.length <= 12 ? (
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
                        <Tab eventKey="Arts" title="Arts">
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
                                        label="Recently added"
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
                            {getImgreffalgosaleArts === null || getImgreffalgosaleArts === "" || getImgreffalgosaleArts === undefined || getImgreffalgosaleArts[0] === null || getImgreffalgosaleArts[0] === "" || getImgreffalgosaleArts[0] === undefined || filterdata3()[0] === null || filterdata3()[0] === "" || filterdata3()[0] === undefined ? (
                                <>
                                {filterdata2static6().map((x, index) => {  
                                    if(index<pageSize)    
                                    return(
                                        <GArtTab x={x}/>                                     
                                    )
                                })}      
                                </>
                            ) : (
                            <>
                            {filterdata3().map((x, index) => {  
                                if(index<pageSize)                 
                                return(    
                                    <GArtTab x={x}/>                                 
                                        // <Col xxl={3} md={4} sm={6} xs={12} className='mb-4'>
                                        // <Card className='card-dash p-3 d-block border-0'>
                                        //     <div className='card-img text-center mb-2'>
                                        //         <Link 
                                        //         to={{
                                        //         pathname: "/my-NFTcopy",            
                                        //         state:{allData:x} 
                                        //         }}
                                        //         >
                                        //         <img src={x.Imageurl} alt="image" className='img-fluid' />
                                        //         </Link>
                                        //     </div>
                                        //     <div className='d-flex mb-2 justify-content-between flex-wrap align-items-center'>
                                        //         <h6 className='subheading'>Images</h6>
                                        //         {/* <Badge bg="purple">Image</Badge> */}
                                        //     </div>
                                        //     {/* <h6 className='mb-2'>{x.NFTName} <br /><span className='text-success'><h6>{x.SocialLink.slice(0,18)}</h6></span></h6> */}
                                        //     <h6 className='mb-2'>{x.NFTName} <br /><span className='text-success'><h6>
                                        //     {x.SocialLink === null || x.SocialLink === undefined || x.SocialLink === "" ? ( 
                                        //         <>{configfile.nullvalue}</>
                                        //     ):( 
                                        //         <>
                                        //         {x.SocialLink.slice(0,18)}
                                        //         </>
                                        //     )}                                            
                                        //     </h6></span></h6>
                                        //     {/* <ButtonLoad loading={loader} variant='default' className='btn-count float-end' onClick={()=>{addLiked(x)}}>  
                                        //     <svg viewBox="0 0 17 16" fill="none" width="16" height="16" xlmns="http://www.w3.org/2000/svg" className="sc-bdvvtL sc-hKwDye bZjZGw"><path d="M8.2112 14L12.1056 9.69231L14.1853 7.39185C15.2497 6.21455 15.3683 4.46116 14.4723 3.15121V3.15121C13.3207 1.46757 10.9637 1.15351 9.41139 2.47685L8.2112 3.5L6.95566 2.42966C5.40738 1.10976 3.06841 1.3603 1.83482 2.97819V2.97819C0.777858 4.36443 0.885104 6.31329 2.08779 7.57518L8.2112 14Z" stroke="currentColor" strokeWidth="2"></path></svg>                    
                                        //     </ButtonLoad>                     */}
                                        //     <h4 className='d-flex mb-3 align-items-center'><img src={Logo} alt="logo" className='me-2 avatar-pic' style={{width:'12%',height:'8%'}} /> {x.NFTPrice/1000000}</h4> 
                                        //     {/* {x.NFTPrice === "" || x.NFTPrice === null || x.NFTPrice === undefined ?(
                                        //         <>                                                                                        
                                        //         <Button variant='primary' className='w-100' s>Buy NFT</Button>                                        
                                        //         </>
                                        //     ):(
                                        //         <Link to={{
                                        //             pathname: "/NFT-details",            
                                        //             state:{allData:x}                                                
                                        //         }}><Button variant='primary' className='w-100'>Buy NFT</Button></Link>
                                        //     )}  */}
                                        // </Card>
                                        // </Col>                                    
                                )
                            })}     
                            </>
                            )}                           
                            </Row>

                            {getImgreffalgosaleArts.length <= 12 ? (
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
                        {/* <Tab eventKey="popular-collection" title="Popular Collection">
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
                                        checked
                                    />
                                    <Form.Check 
                                        type='radio'
                                        id="sort 2"
                                        name="sort"
                                        label="Price low - high"
                                    />
                                    <Form.Check 
                                        type='radio'
                                        id="sort 3"
                                        name="sort"
                                        label="Price high - low"
                                    />
                                </Dropdown.Menu>
                            </Dropdown>
                            </div>
                            <Row>
                            {getImgreffalgosale.map((x, index) => {                
                                return( 
                                    <Col xxl={3} md={4} sm={6} xs={12} className='mb-4'>
                                    <Card className='card-dash p-3 d-block border-0'>
                                        <div className='card-img text-center mb-2'>
                                        <Link 
                                            to={{
                                            pathname: "/my-NFTcopy",            
                                            state:{allData:x} 
                                            }}
                                        >
                                                <img src={x.Imageurl} alt="image" className='img-fluid' />
                                            </Link>
                                        </div>
                                        <div className='d-flex mb-2 justify-content-between flex-wrap align-items-center'>
                                            <h6 className='subheading'>Images</h6>                                            
                                        </div>
                                        <h3 className='mb-2'>{x.NFTName} <br /><span className='text-success'><small>{x.SocialLink}</small></span></h3>
                                        <h4 className='d-flex mb-3 align-items-center'><img src={Logo} alt="logo" className='me-2 avatar-pic' /> {x.NFTPrice/1000000}</h4>                                         
                                    </Card>
                                    </Col>
                                )
                            })}                                
                            </Row>

                            <div className='pagination justify-content-end d-flex align-items-center'>
                                <div className='page-count'>1</div>
                                <div className='page-numbers'>of 49</div>
                                <Button variant='page'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#fff" class="bi m-0 bi-chevron-left" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                                    </svg>
                                </Button>
                                <Button variant='page'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#fff" class="bi m-0 bi-chevron-right" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                                </Button>
                            </div>
                        </Tab> */}
                    </Tabs>
                </div>
            </Container>
        </Layout>
    )
}

export default GenesisMarket;