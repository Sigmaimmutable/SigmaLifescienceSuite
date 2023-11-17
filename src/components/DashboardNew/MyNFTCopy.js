import React,{useEffect,useState} from 'react';
import Layout from './LayoutT';
import { Link,useLocation} from 'react-router-dom';
import { Card, Col, Container, Row, Tabs, Tab, Badge, Button, InputGroup, Form, Dropdown,Modal} from 'react-bootstrap';
import ButtonLoad from 'react-bootstrap-button-loader';
import CardImage from '../../assets/images/card-image.jpg';
import firebase from '../../NFTFolder/firebase';
import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';
import Icon1 from '../../assets/images/elem-original.png';
import configfile from '../../NFTFolder/config.json'
const MyNFTCopy = (props) => {
    useEffect(() => {
        document.title = "ELEMENT | MyNFT"
    }, [])
    // const[loader, setLoader] = useState(false);
    // const handleShowLoad = () => setLoader(true);
    // const handleHideLoad = () => setLoader(false);
    const[getImgreffalgoActivity,setgetImgreffalgoActivity]=useState([]);
    // console.log("Activityprofile",getImgreffalgoActivity)
    const[getImgreffalgoLiked,setgetImgreffalgoLiked]=useState([]);
    const[pageSize,setPageSize]=useState(12);     
    const [searchText, setSearchText] = React.useState('');
    const[getrecent,setrecent]=useState("Recently added");
    // console.log("Recent",getrecent)
    const location = useLocation();        
    // console.log("BData",location.state.allData)
    //const [showTestDone,setshowTestDone] = React.useState(false);   
    //const [showTestSale,setshowTestSale] = React.useState(false);           
    const[getImgreffalgo,setgetImgreffalgo]=useState([]);
    // console.log("checkprofileValue",getImgreffalgo)
    const[getImgreffalgosale,setgetImgreffalgosale]=useState([]);
    // console.log("checkprofileSale",getImgreffalgosale)
    const[getImgreffalgosowned,setgetImgreffalgoowned]=useState([]);
    // console.log("checkprofileSale",getImgreffalgosowned)    
    const[getIProfile,setgetIProfile]=useState([""]);   
    // console.log("checkprofile",getIProfile)

    const dbcallalgoActivity=async()=>{
        //console.log("inside dbcallalgo function")          
        let req = [];
        if(location.state  === null || location.state  === "" || location.state  === " " || location.state === undefined || location.state === ''){
        }
        else{            
        let getalgo=location.state.allData.ownerAddress;        
        firebase.auth().signInAnonymously().then((response)=>{              
          firebase.database().ref("activitytable").child(getalgo).on("value", (data) => {
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
              setgetImgreffalgoActivity(req);
            });    
        })              
          }        
    }      
    useEffect(()=>{dbcallalgoActivity()},[])

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

    const dbcallalgos=async()=>{
        //console.log("inside dbcallalgo function")  
        let req = [];
        if(location.state  === null || location.state  === "" || location.state  === " " || location.state === undefined || location.state === ''){
        }
        else{
        let getalgo=location.state.allData.ownerAddress;              
        firebase.auth().signInAnonymously().then((response)=>{      
          firebase.database().ref("imagerefexploreoneAlgos").child(getalgo).on("value", (data) => {
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
              setgetImgreffalgosale(req);
            });    
        })              
          }        
    }      
    useEffect(()=>{dbcallalgos()},[])
    
    const dbcallProfile=async()=>{            
        let r=[];
        try {                 
        if(location.state  === null || location.state  === "" || location.state  === " " || location.state === undefined || location.state === ''){
        }
        else{
        firebase.auth().signInAnonymously().then((response)=>{      
        firebase.database().ref("userprofile").child(location.state.allData.ownerAddress).on("value", (data) => {          
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
            setgetIProfile([""]);  
          }
          setgetIProfile(r);
        });   
        })               
        }
      } catch (error) {
        //console.log('error occured during search', error);    
      }                
    }    
    useEffect(()=>{dbcallProfile()},[])
    const dbcallalgo=async()=>{
        //console.log("inside dbcallalgo function")  
        let req = [];
        
        if(location.state  === null || location.state  === "" || location.state  === " " || location.state === undefined || location.state === ''){
        }
        else{
        let getalgo=location.state.allData.ownerAddress
        firebase.auth().signInAnonymously().then((response)=>{      
          firebase.database().ref("imagerefAlgo").child(getalgo).on("value", (data) => {
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
              setgetImgreffalgo(req);
            });    
        })              
          }        
    }      
    useEffect(()=>{dbcallalgo()},[])
    

    const dbcallalgoowned=async()=>{
        //console.log("inside dbcallalgo function")  
        let req = [];
        if(location.state  === null || location.state  === "" || location.state  === " " || location.state === undefined || location.state === ''){
        }
        else{
        let getalgo=location.state.allData.ownerAddress
        firebase.auth().signInAnonymously().then((response)=>{      
          firebase.database().ref("imagerefbuy").child(getalgo).on("value", (data) => {
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
              setgetImgreffalgoowned(req);
            });  
        })                
          }        
    }      
    useEffect(()=>{dbcallalgoowned()},[])
    
    // const refresh=()=>{
    //     setshowTestDone(false)
    //     window.location.reload(false)                        
    // }
    
    // const refreshSale=()=>{
    //     setshowTestSale(false)
    //     window.location.reload(false)
    // }

    const filterdata=()=>{
        let dateset=new Date().toDateString();
        let today= new Date();
        let weekdate=new Date(today.getFullYear(), today.getMonth(), today.getDate()-1).toDateString();
        // console.log("DateExplore",weekdate)
        // console.log("DateExplore2",dateset)
        if(searchText === "")
        {                          
        if(getrecent === "Recently added"){        
            //let data=getImgreffalgo.reverse().filter((val)=> (weekdate) <= (val.TimeStamp) || (val.TimeStamp) >= dateset)
        //   console.log("filtercall12",data)
          return getImgreffalgosale;        
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
        let dateset=new Date().toDateString();
        let today= new Date();
        let weekdate=new Date(today.getFullYear(), today.getMonth(), today.getDate()-1).toDateString();
        // console.log("DateExplore",weekdate)
        // console.log("DateExplore2",dateset)
        if(searchText === "")
        {                          
        if(getrecent === "Recently added"){        
            //let data=getImgreffalgosowned.reverse().filter((val)=> (weekdate) <= (val.TimeStamp) || (val.TimeStamp) >= dateset)
        //   console.log("filtercall12",data)
          return getImgreffalgosowned;        
        }
        if(getrecent === "Low to High"){
          let data=getImgreffalgosowned.sort((a,b)=>{ return parseFloat(a.NFTPrice/1000000) - parseFloat(b.NFTPrice/1000000)})
          //console.log("filtercall1",data)
          return data;
        }
        if(getrecent ===  "High to Low"){
          let data=getImgreffalgosowned.sort((a,b)=>{ return parseFloat(b.NFTPrice/1000000) - parseFloat(a.NFTPrice/1000000)})
          //console.log("filtercall1",data)
          return data;
        }
        }
        else{
                let data = getImgreffalgosowned.filter((val)=>{
                if(val.NFTName === "" || val.NFTName === null || val.NFTName === undefined){    
                }else{
                let val1 = (val.NFTName).toLowerCase().includes(searchText.toLocaleLowerCase())                                
                return val1
                }            
            })                                    
            return data;
        }                
        return getImgreffalgosowned
    }

    const filterdata3=()=>{
        let dateset=new Date().toDateString();
        let today= new Date();
        let weekdate=new Date(today.getFullYear(), today.getMonth(), today.getDate()-1).toDateString();
        // console.log("DateExplore",weekdate)
        // console.log("DateExplore2",dateset)
        if(searchText === "")
        {                          
        if(getrecent === "Recently added"){        
            //let data=getImgreffalgo.reverse().filter((val)=> (val.TimeStamp) <= weekdate || (val.TimeStamp) >= dateset)
        //   console.log("filtercall12",data)
          return getImgreffalgo;        
        }
        if(getrecent === "Low to High"){
          let data=getImgreffalgo.sort((a,b)=>{ return parseFloat(a.NFTPrice/1000000) - parseFloat(b.NFTPrice/1000000)})
          //console.log("filtercall1",data)
          return data;
        }
        if(getrecent ===  "High to Low"){
          let data=getImgreffalgo.sort((a,b)=>{ return parseFloat(b.NFTPrice/1000000) - parseFloat(a.NFTPrice/1000000)})
          //console.log("filtercall1",data)
          return data;
        }
        }
        else{
                let data = getImgreffalgo.filter((val)=>{
                if(val.NFTName === "" || val.NFTName === null || val.NFTName === undefined){    
                }else{
                let val1 = (val.NFTName).toLowerCase().includes(searchText.toLocaleLowerCase())                                
                return val1
                }            
            })                                    
            return data;
        }                
        return getImgreffalgo
    }

    const filterdata4=()=>{
        let dateset=new Date().toDateString();
        let today= new Date();
        let weekdate=new Date(today.getFullYear(), today.getMonth(), today.getDate()-1).toDateString();
        // console.log("DateExplore",weekdate)
        // console.log("DateExplore2",dateset)
        if(searchText === "")
        {                          
        if(getrecent === "Recently added"){        
            //let data=getImgreffalgo.reverse().filter((val)=> (weekdate) <= (val.TimeStamp) || (val.TimeStamp) >= dateset)
        //   console.log("filtercall12",data)
          return getImgreffalgoLiked;        
        }
        if(getrecent === "Low to High"){
          let data=getImgreffalgoLiked.sort((a,b)=>{ return parseFloat(a.NFTPrice/1000000) - parseFloat(b.NFTPrice/1000000)})
          //console.log("filtercall1",data)
          return data;
        }
        if(getrecent ===  "High to Low"){
          let data=getImgreffalgoLiked.sort((a,b)=>{ return parseFloat(b.NFTPrice/1000000) - parseFloat(a.NFTPrice/1000000)})
          //console.log("filtercall1",data)
          return data;
        }
        }
        else{
                let data = getImgreffalgoLiked.filter((val)=>{
                if(val.NFTName === "" || val.NFTName === null || val.NFTName === undefined){    
                }else{
                let val1 = (val.NFTName).toLowerCase().includes(searchText.toLocaleLowerCase())                                
                return val1
                }            
            })                                    
            return data;
        }                
        return getImgreffalgoLiked
    }
    const decrementSize=()=>{
        if(pageSize >= 16){
        setPageSize(pageSize-4)
        }        
    }

    const filterdata5=()=>{
        let dateset=new Date().toDateString();
        let today= new Date();
        let weekdate=new Date(today.getFullYear(), today.getMonth(), today.getDate()-1).toDateString();
        // console.log("DateExplore",weekdate)
        // console.log("DateExplore2",dateset)
        if(searchText === "")
        {                          
        if(getrecent === "Recently added"){        
            //let data=getImgreffalgo.reverse().filter((val)=> (weekdate) <= (val.TimeStamp) || (val.TimeStamp) >= dateset)
        //   console.log("filtercall12",data)
          return getImgreffalgoActivity;        
        }
        if(getrecent === "Low to High"){
          let data=getImgreffalgoActivity.sort((a,b)=>{ return parseFloat(a.NFTPrice/1000000) - parseFloat(b.NFTPrice/1000000)})
          //console.log("filtercall1",data)
          return data;
        }
        if(getrecent ===  "High to Low"){
          let data=getImgreffalgoActivity.sort((a,b)=>{ return parseFloat(b.NFTPrice/1000000) - parseFloat(a.NFTPrice/1000000)})
          //console.log("filtercall1",data)
          return data;
        }
        }
        else{
                let data = getImgreffalgoActivity.filter((val)=>{
                if(val.NFTName === "" || val.NFTName === null || val.NFTName === undefined){    
                }else{
                let val1 = (val.NFTName).toLowerCase().includes(searchText.toLocaleLowerCase())                                
                return val1
                }            
            })                                    
            return data;
        }                
        return getImgreffalgoActivity
    }
    return (
        <Layout>
            <Container>
            <ToastContainer position='top-center' draggable = {false} transition={Zoom} autoClose={8000} closeOnClick = {false}/>
                <Card className='card-dash mb-4 d-block border-0'>
                    <Row className='align-items-center'>
                        <Col lg={4} className="order-lg-2 mb-lg-0 mb-2 text-end">
                        {/* {getIProfile === "" || getIProfile === null || getIProfile === undefined  || getIProfile[0] === "" || getIProfile[0] === null || getIProfile[0] === undefined?( 
                            <Button className='btn btn-blue' onClick={()=>{history.push({
                                pathname: '/create-artists'
                            })}}>Create Artist</Button>
                        ):(
                            <Button className='btn btn-blue' onClick={()=>{history.push({
                                pathname: '/Mint-NFT'
                            })}}>Mint NFT</Button>
                        )} */}
                            
                        </Col>
                            <div className="profile-banner">
                    <div className="profile-card">
                    {getIProfile[0] === null || getIProfile[0] === "" || getIProfile[0] === undefined || getIProfile[0] === " " || getIProfile[0] === NaN ? (
                        <>
                          <img src={Icon1} alt="pics" width={"1500px"} height={"260px"} />
                        </>
                      ):(
                        <>
                        {getIProfile[0].bgurl === null || getIProfile[0].bgurl === "" || getIProfile[0].bgurl === undefined || getIProfile[0].bgurl === " " || getIProfile[0].bgurl === NaN ? (<>
                          <img src={Icon1} alt="pics" width={"1500px"} height={"260px"} />
                        </>):(
                          <>
                          <img src={getIProfile[0].bgurl} alt="pic" width={"1500px"} height={"260px"}/>
                        </>
                        )}                        
                        </>
                      )}                                              
                    </div>                   
                      {getIProfile[0] === null || getIProfile[0] === "" || getIProfile[0] === undefined || getIProfile[0] === " " || getIProfile[0] === NaN ? (
                        <> <Link className='profile-pic'>
                          <img src={Icon1} alt="pic" />
                          </Link>
                        </>
                      ):(
                        <>
                        {getIProfile[0].Imageurl === null || getIProfile[0].Imageurl === "" || getIProfile[0].Imageurl === undefined || getIProfile[0].Imageurl === " " || getIProfile[0].Imageurl === NaN ? (<>
                            <Link className='profile-pic'>
                          <img src={Icon1} alt="pic" />
                          </Link>
                        </>):(<> 
                            <Link className='profile-pic'>                       
                          <img src={getIProfile[0].Imageurl} alt="pic" />
                          </Link>
                        </>)}
                        
                        </>
                      )}                                            
                            </div>
                            <Col lg={8}>
                             <div className='d-flex flex-wrap flex-lg-nowrap align-items-center create-art'>                             
                                 <div className=''>
                                     {getIProfile === "" || getIProfile === null || getIProfile === undefined || getIProfile[0] === "" || getIProfile[0] === null || getIProfile[0] === undefined?(
                                         <>
                                         <p className='subheading mb-0'>Name : <strong>{configfile.nullvalue}</strong></p>
                                         <p className='subheading mb-0'>Social : <strong>{configfile.nullvalue} </strong><br />Wallet address : <strong>{configfile.nullvalue}</strong></p>
                                         </>
                                     ):(
                                         <>
                                         <p className='subheading mb-0'>Name : <strong>{getIProfile[0].UserName}</strong></p>
                                         <p className='subheading mb-0'>Social : 
                                             {getIProfile[0].Personalsiteurl === null || getIProfile[0].Personalsiteurl === undefined || getIProfile[0].Personalsiteurl === "" ? (
                                                <strong>{configfile.nullvalue}</strong>
                                             ):(                                            
                                                <>
                                                &nbsp;
                                                <strong>{getIProfile[0].Personalsiteurl}</strong>
                                                &nbsp;
                                                </>                                            
                                                // <a  href={getIProfile[0].Personalsiteurl} target="_blank" rel="noreferer">
                                                //     &nbsp;
                                                // {getIProfile[0].Personalsiteurl}
                                                // &nbsp;
                                                // <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi ms-2 bi-box-arrow-up-right" viewBox="0 0 16 16">
                                                // <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                                                // <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                                                // </svg>
                                                // </a>
                                             )}
                                              <br />Wallet address : 
                                         {/* className='mb-3 ms-3 text-text-FF d-flex align-items-center btn-link' */}
                                         &nbsp;
                                         {location.state === "" || location.state === undefined || location.state === null ? (
                                            <strong>{configfile.nullvalue}</strong>
                                         ):(
                                            <a  href={"https://testnet.algoexplorer.io/address/"+location.state.allData.ownerAddress} target="_blank" rel="noreferer">                                    
                                            <strong>{location.state.allData.ownerAddress.slice(0,12)}....{location.state.allData.ownerAddress.slice(50,58)} </strong>
                                            &nbsp;
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi ms-2 bi-box-arrow-up-right" viewBox="0 0 16 16">
                                                    <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                                                    <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                                                    </svg>
                                            </a>                                        
                                         )}
                                        
                                         <p className='subheading mb-0'>Twitter : {getIProfile[0].Twittername === null || getIProfile[0].Twittername === undefined || getIProfile[0].Twittername === "" ? (
                                            <strong>{configfile.nullvalue}</strong>
                                         ):(
                                            <a  href={"https://twitter.com/" + getIProfile[0].Twittername} target="_blank" rel="noreferer">
                                            <strong>{getIProfile[0].Twittername}</strong>
                                            &nbsp;
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi ms-2 bi-box-arrow-up-right" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                                                <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                                                </svg>
                                            </a>
                                         )}
                                         {/* <p>Personalsite-url : {getIProfile[0].Personalsiteurl === null || getIProfile[0].Personalsiteurl === undefined || getIProfile[0].Personalsiteurl === "" ? (
                                            <></>
                                         ):(
                                            <>
                                            <a  href={getIProfile[0].Personalsiteurl} target="_blank" rel="noreferer">
                                            {getIProfile[0].Personalsiteurl}
                                            &nbsp;
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi ms-2 bi-box-arrow-up-right" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                                                <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                                                </svg>
                                            </a>
                                            
                                            </>
                                         )}</p> */}
                                         </p>
                                         </p>
                                         </>
                                     )}
                                     
                                 </div>
                             </div>                             
                         </Col>
                        
                    </Row>
                </Card>
                
                <div className='nft-tabs'>
                    <InputGroup className="input-group-search float-md-end">
                        <Form.Control placeholder="Search" value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
                        <Button variant="outline-secondary" id="button-addon2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                            </svg>
                        </Button>
                    </InputGroup>
                    <Tabs defaultActiveKey="Activity" id="uncontrolled-tab-example" className="mb-3">
                        <Tab eventKey="all" title="On Sale">
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
                            {getImgreffalgosale === null || getImgreffalgosale === "" || getImgreffalgosale === undefined || getImgreffalgosale[0] === null || getImgreffalgosale[0] === "" || getImgreffalgosale[0] === undefined ? (
                                <div className="no-found py-5p text-center">
                                <h2>No Data Found</h2>
                                {/* <p className="lead mb-4">Subscribe to authors and come back to see <br />NFTs from your favorite artists</p> */}
                                <Link to="/my-NFTcopy" className='btn btn-primary'>Browse marketplace</Link>
                                </div>

                            ) : (
                                <>   
                            {filterdata().map((x, index) => {   
                                if(index<pageSize)                
                                return( 
                                    <Col xxl={3} md={4} sm={6} xs={12} className='mb-4'>
                                    <Card className='card-dash p-3 d-block border-0'>
                                        <div className='card-img text-center mb-2'>
                                            <Link to={{
                                                pathname: "/NFT-details",            
                                                state:{allData:x}                                                
                                            }}>
                                                <img src={x.Imageurl} alt="image" className='img-fluid' />
                                            </Link>
                                        </div>
                                        <div className='d-flex mb-2 justify-content-between flex-wrap align-items-center'>
                                            {/* <h6 className='subheading'>Images</h6> */}
                                            {/* <Badge bg="purple">Image</Badge> */}
                                        </div>
                                        {/* <h5 className='mb-2'>{x.NFTName} <br /><span className='text-success'>{x.SocialLink}</span></h5>                                         */}
                                        <h4 className='d-flex mb-3 align-items-center'><img src={getIProfile[0].Imageurl} alt="logo" className='me-2 avatar-pic' /> {x.NFTPrice/1000000}</h4> 
                                        {/* {x.NFTPrice === "" || x.NFTPrice === null || x.NFTPrice === undefined ?(
                                            <>                                            
                                            <input type="text" placeholder='Enter Price' className="className='d-flex mb-3 align-items-center" onChange={event => setprices( event.target.value)}/>
                                            <Button variant="blue" className='w-100' onClick={()=>{setpricedb(x)}}>Set Price</Button>                                        
                                            </>
                                        ):(
                                            <Button variant="blue" className='w-100' onClick={()=>{saledb(x)}}>Sale</Button>                                        
                                        )}  */}
                                    </Card>
                                    </Col>
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
                        <Tab eventKey="hot-collection" title="Owned">
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
                            {getImgreffalgosowned === null || getImgreffalgosowned === "" || getImgreffalgosowned === undefined || getImgreffalgosowned[0] === null || getImgreffalgosowned[0] === "" || getImgreffalgosowned[0] === undefined ? (
                                <div className="no-found py-5p text-center">
                                <h2>No Data Found</h2>
                                {/* <p className="lead mb-4">Subscribe to authors and come back to see <br />NFTs from your favorite artists</p> */}
                                <Link to="/my-NFTcopy" className='btn btn-primary'>Browse marketplace</Link>
                                </div>

                            ) : (
                                <>                            
                            {filterdata2().map((x, index) => {  
                                if(index<pageSize)                 
                                return( 
                                    <Col xxl={3} md={4} sm={6} xs={12} className='mb-4'>
                                    <Card className='card-dash p-3 d-block border-0'>
                                        <div className='card-img text-center mb-2'>
                                            {/* <Link to="/NFT-details"> */}
                                                <img src={x.Imageurl} alt="image" className='img-fluid' />
                                            {/* </Link> */}
                                        </div>
                                        <div className='d-flex mb-2 justify-content-between flex-wrap align-items-center'>
                                            {/* <h6 className='subheading'>Images</h6> */}
                                            {/* <Badge bg="purple">Image</Badge> */}
                                        </div>
                                        {/* <h3 className='mb-2'>{x.NFTName} <br /><span className='text-success'><h6>{x.SocialLink}</h6></span></h3> */}
                                        {/* <h5 className='mb-2'>{x.NFTName} <br /><span className='text-success'>{x.SocialLink}</span></h5> */}
                                        <h4 className='d-flex mb-3 align-items-center'><img src={getIProfile[0].Imageurl} alt="logo" className='me-2 avatar-pic' /> {x.NFTPrice/1000000}</h4> 
                                        {/* {x.NFTPrice === "" || x.NFTPrice === null || x.NFTPrice === undefined ?(
                                            <>                                            
                                            <input type="text" placeholder='Enter Price' className="className='d-flex mb-3 align-items-center" onChange={event => setprices( event.target.value)}/>
                                            <Button variant="blue" className='w-100' onClick={()=>{setpricedb(x)}}>Set Price</Button>                                        
                                            </>
                                        ):(
                                            <>
                                            <Button variant="blue" className='w-10' onClick={()=>{setpricedb(x)}}>Update Price</Button>                                                                                 
                                            <Button variant="blue" className='w-50' onClick={()=>{saledb(x)}}>ReSale</Button>                                        
                                            </>
                                        )}  */}
                                    </Card>
                                    </Col>
                                )
                            })}   
                            </>
                            )}                                                             
                            </Row>

                            {getImgreffalgosowned.length <= 10 ? (
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
                        <Tab eventKey="popular-collection" title="Created">

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
                            {getImgreffalgo === null || getImgreffalgo === "" || getImgreffalgo === undefined || getImgreffalgo[0] === null || getImgreffalgo[0] === "" || getImgreffalgo[0] === undefined ? (
                                <div className="no-found py-5p text-center">
                                <h2>No Data Found</h2>
                                {/* <p className="lead mb-4">Subscribe to authors and come back to see <br />NFTs from your favorite artists</p> */}
                                <Link to="/my-NFTcopy" className='btn btn-primary'>Browse marketplace</Link>
                                </div>

                            ) : (
                                <>
                                {/* <Col xxl={3} md={4} sm={6} xs={12} className='mb-4'> */}
                                {filterdata3().map((x, index) => {    
                                    if(index<pageSize)               
                                    return( 
                                    <Col xxl={3} md={4} sm={6} xs={12} className='mb-4'>
                                    <Card className='card-dash p-3 d-block border-0'>
                                        <div className='card-img text-center mb-2'>
                                            {/* <Link to="/NFT-details"> */}
                                                <img src={x.Imageurl} alt="image" className='img-fluid' />
                                            {/* </Link> */}
                                        </div>
                                        <div className='d-flex mb-2 justify-content-between flex-wrap align-items-center'>
                                            {/* <h6 className='subheading'>Images</h6> */}
                                            {/* <Badge bg="purple">Image</Badge> */}
                                        </div>
                                        {/* <h3 className='mb-2'>{x.NFTName} <br /><span className='text-success'><h6>{x.SocialLink}</h6></span></h3> */}
                                        {/* <h5 className='mb-2'>{x.NFTName} <br /><span className='text-success'>{x.SocialLink}</span></h5> */}
                                        <h4 className='d-flex mb-3 align-items-center'><img src={getIProfile[0].Imageurl} alt="logo" className='me-2 avatar-pic' /> {x.NFTPrice/1000000}</h4> 
                                        {/* {x.NFTPrice === "" || x.NFTPrice === null || x.NFTPrice === undefined ?(
                                            <>                                            
                                            <input type="text" placeholder='Enter Price' className="className='d-flex mb-3 align-items-center" onChange={event => setprices( event.target.value)}/>
                                            <Button variant="blue" className='w-100' onClick={()=>{setpricedb(x)}}>Update Price</Button>                                        
                                            </>
                                        ):(
                                            <Button variant="blue" className='w-100' onClick={()=>{saledb(x)}}>Sale</Button>                                        
                                        )}  */}
                                    </Card>
                                    </Col>
                                    )
                                })}
                                </>
                            )}
                                {/* </Col> */}
                                
                            </Row>

                            {getImgreffalgo.length <= 10 ? (
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
                        <Tab eventKey="Liked" title="Liked">

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
                            {getImgreffalgoLiked === null || getImgreffalgoLiked === "" || getImgreffalgoLiked === undefined || getImgreffalgoLiked[0] === null || getImgreffalgoLiked[0] === "" || getImgreffalgoLiked[0] === undefined ? (
                                <div className="no-found py-5p text-center">
                                <h2>No Data Found</h2>
                                {/* <p className="lead mb-4">Subscribe to authors and come back to see <br />NFTs from your favorite artists</p> */}
                                <Link to="/my-NFTcopy" className='btn btn-primary'>Browse marketplace</Link>
                                </div>

                            ) : (
                                <>
                                {/* <Col xxl={3} md={4} sm={6} xs={12} className='mb-4'> */}
                                {filterdata4().map((x, index) => {    
                                    if(index<pageSize)               
                                    return( 
                                    <Col xxl={3} md={4} sm={6} xs={12} className='mb-4'>
                                    <Card className='card-dash p-3 d-block border-0'>
                                        <div className='card-img text-center mb-2'>
                                            {/* <Link to="/NFT-details"> */}
                                                <img src={x.Imageurl} alt="image" className='img-fluid' />
                                            {/* </Link> */}
                                        </div>
                                        <div className='d-flex mb-2 justify-content-between flex-wrap align-items-center'>
                                            {/* <h6 className='subheading'>Images</h6> */}
                                            {/* <Badge bg="purple">Image</Badge> */}
                                        </div>
                                        {/* <h3 className='mb-2'>{x.NFTName} <br /><span className='text-success'><h6>{x.SocialLink}</h6></span></h3> */}
                                        {/* <h5 className='mb-2'>{x.NFTName} <br /><span className='text-success'>{x.SocialLink}</span></h5> */}
                                        <h4 className='d-flex mb-3 align-items-center'><img src={getIProfile[0].Imageurl} alt="logo" className='me-2 avatar-pic' /> </h4> 
                                        {/* {x.NFTPrice === "" || x.NFTPrice === null || x.NFTPrice === undefined ?(
                                            <>                                            
                                            <input type="text" placeholder='Enter Price' className="className='d-flex mb-3 align-items-center" onChange={event => setprices( event.target.value)}/>
                                            <Button variant="blue" className='w-100' onClick={()=>{setpricedb(x)}}>Update Price</Button>                                        
                                            </>
                                        ):(
                                            <Button variant="blue" className='w-100' onClick={()=>{saledb(x)}}>Sale</Button>                                        
                                        )}  */}
                                    </Card>
                                    </Col>
                                    )
                                })}
                                </>
                                )}
                                {/* </Col> */}
                                
                            </Row>

                            {getImgreffalgoLiked.length <= 10 ? (
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
                        <Tab eventKey="Activity" title="Activity">
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
                            {getImgreffalgoActivity === null || getImgreffalgoActivity === "" || getImgreffalgoActivity === undefined || getImgreffalgoActivity[0] === null || getImgreffalgoActivity[0] === "" || getImgreffalgoActivity[0] === undefined ? (
                                <div className="no-found py-5p text-center">
                                <h2>No Data Found</h2>
                                {/* <p className="lead mb-4">Subscribe to authors and come back to see <br />NFTs from your favorite artists</p> */}
                                <Link to="/my-NFTcopy" className='btn btn-primary'>Browse marketplace</Link>
                                </div>

                            ) : (
                                <>
                            {filterdata5().map((x, index) => {   
                                if(index<pageSize)                
                                return( 
                                    // <Col xxl={3} md={4} sm={6} xs={12} className='mb-4'>                                    
                                    <Card className='card-dash p-3 d-block border-0'>
                                    <div className='activity-item d-flex align-items-center mb-3'>        
                                            <div className="activity-content">
                                                {/* <h4><Link to="/activity">{props.dataall.NFTName}</Link></h4> */}
                                                {/* <img src={props.image} alt="icon" /> </Link>*/}
                                                <p>  {x.EscrowAddress}</p>
                                                {x.Assetid === "" || x.Assetid === null || x.Assetid === undefined ?(<>
                                                </>):(<>
                                                    <p style={{cursor: 'pointer'}} onClick={() => window.open(`https://testnet.algoexplorer.io/asset/${x.Assetid}`)}>  {x.Assetid}</p>
                                                </>)}
                                                <p style={{cursor: 'pointer'}} onClick={() => window.open(`https://testnet.algoexplorer.io/address/${x.ownerAddress}`)}> {x.ownerAddress}</p>                
                                                {x.NFTDescription === "" || x.NFTDescription === null || x.NFTDescription === undefined ?(<>
                                                </>):(<>
                                                    <p style={{cursor: 'pointer'}} onClick={() => window.open(`https://testnet.algoexplorer.io/tx/${x.NFTDescription}`)}>  {x.NFTDescription}</p>
                                                </>)}
                                                <div className="time">{x.TimeStamp}</div>
                                                
                                            </div>
                                        </div>
                                                                        
                                        {/* {x.NFTPrice === "" || x.NFTPrice === null || x.NFTPrice === undefined ?(
                                            <>                                            
                                            <input type="text" placeholder='Enter Price' className="className='d-flex mb-3 align-items-center" onChange={event => setprices( event.target.value)}/>
                                            <Button variant="blue" className='w-100' onClick={()=>{setpricedb(x)}}>Set Price</Button>                                        
                                            </>
                                        ):(
                                            <Button variant="blue" className='w-100' onClick={()=>{saledb(x)}}>Sale</Button>                                        
                                        )}  */}
                                    </Card>
                                    // </Col>
                                )
                            })}    
                            </>
                            )}                                                            
                            </Row>

                            {getImgreffalgoActivity.length <= 10 ? (
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
                
            
            {/* onHide={handleCloseTestDone} */}
            
            </div>
            </Container>
        </Layout>
    )
}

export default MyNFTCopy;