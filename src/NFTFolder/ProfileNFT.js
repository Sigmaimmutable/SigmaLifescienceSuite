/* eslint-disable use-isnan */
import React, { useState,useEffect} from "react";
import {Container, Button, Modal, Toast, Dropdown} from 'react-bootstrap';
    import {
    Link
  } from "react-router-dom";
import DummyPic from '../assets/images/dummy-icon.svg';
import ProfileTabs from './ProfileTabs';
import firebase from './firebase';
import Compress from "react-image-file-resizer";
//import Logo from '../assets/images/Algo.png';
import Logo from '../assets/images/algorand-logo.png';
//import { useHistory } from "react-router-dom";
//import logogif from '../assets/images/gif1.svg';gif4.gif
import logogif from '../assets/images/gif4.gif';
//import BG from '../assets/images/bg-v2.png';
//import Layout from '../components/Layouts/LayoutInner';
//import Layout from '../components/Dashboard/Layout';
import Layout from '../components/DashboardNew/Layout';
//import { get } from "express/lib/response";

function ProfileNFT() {    
    const[getImgreffalgo,setgetImgreffalgo]=useState([]);
    const[getImgreffalgosale,setgetImgreffalgosale]=useState([]);
    const[getImgreffalgobuy,setgetImgreffalgobuy]=useState([]);
    const[getdbLike,setdbLike]=useState([]);
    const [show, setShow] = React.useState(false);
    const [showL,setShowL] = React.useState(false);
    const [toast, setToast] = React.useState(false);
    const[getPro,setgetPro]=useState([""]);      
    const handleClose = () => {setShow(false)};
    const [showDone,setShowDone] = React.useState(false);  
    const [Img,setImg] = useState("")
    const[getIPro,setgetIPro]=useState([""]);   
    const dbcallPro=async()=>{            
      let r=[];
      try {         
      firebase.database().ref("userprofile").child(localStorage.getItem('walletAddress')).on("value", (data) => {          
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
    } catch (error) {
      //console.log('error occured during search', error);    
    }                
    }    
    useEffect(()=>{dbcallPro()},[])

    const dbcallalgo=async()=>{
      //console.log("inside dbcallalgo function")  
      let req = [];
      if(localStorage.getItem("walletAddress")  === null || localStorage.getItem("walletAddress")  === "" || localStorage.getItem("walletAddress")  === " " || localStorage.getItem("wallet") === undefined || localStorage.getItem("walletAddress") === ''){
      }
      else{
      let getalgo=localStorage.getItem("walletAddress");              
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
                  CreatorAddress:value.CreatorAddress
                })                
              });        
            }
            setgetImgreffalgo(req);
          });                  
        }        
      }      
  useEffect(()=>{dbcallalgo()},[])

  
  const dbcallalgos=async()=>{
    //console.log("inside dbcallalgo function")  
    let req = [];
    if(localStorage.getItem("walletAddress")  === null || localStorage.getItem("walletAddress")  === "" || localStorage.getItem("walletAddress")  === " " || localStorage.getItem("wallet") === undefined || localStorage.getItem("walletAddress") === ''){
    }
    else{
    let getalgo=localStorage.getItem("walletAddress");              
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
                CreatorAddress:value.CreatorAddress
              })                
            });        
          }
          setgetImgreffalgosale(req);
        });                  
      }        
  }      
  useEffect(()=>{dbcallalgos()},[])

  const dbcallalgosbuy=async()=>{
    //console.log("inside dbcallalgo function")  
    let req = [];
    if(localStorage.getItem("walletAddress")  === null || localStorage.getItem("walletAddress")  === "" || localStorage.getItem("walletAddress")  === " " || localStorage.getItem("wallet") === undefined || localStorage.getItem("walletAddress") === ''){
    }
    else{
    let getalgo=localStorage.getItem("walletAddress");              
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
                CreatorAddress:value.CreatorAddress
              })                
            });        
          }
          setgetImgreffalgobuy(req);
        });                  
      }        
  }      
  useEffect(()=>{dbcallalgosbuy()},[])

    //setFollowers(false); setFollowing(false)
    const handleShow = () => setShow(true);
    const captureFile =async(event) => {
        event.stopPropagation()
        event.preventDefault()
        const file = event.target.files[0]
        let reader = new window.FileReader()
        try{
        Compress.imageFileResizer (file,1500, 260, 'JPEG', 300, 0,
        uri =>{
          //console.log("iuri",uri)
          setImg(uri)      
          //setShow(false)
          //setShowL(true)            
          updatecover(uri);
        },
        'base64'
        );
        reader.readAsArrayBuffer(file)
        //console.log(reader)          
      }catch (err) {
        //console.error(err);    
        }
    };
    const updatecover=async(u)=>{
      setShow(false)
      setShowL(true)               
      if(getIPro === "" || getIPro === null || getIPro === undefined ){
          let ref2=firebase.database().ref(`userprofile/${localStorage.getItem('wallet')}`);                    
          let dateset=new Date().toDateString();                
          //console.log("data",data.val())
          ref2.set({
          Imageurl:"",bgurl:u,
          UserName:"",Customurl:"",WalletAddress:localStorage.getItem('wallet'),
          TimeStamp:dateset,Twittername:"",Personalsiteurl:"",Email:"",Bio:"",valid:""})
          .then(()=>{          
            setShowL(false)                                    
            setShowDone(true)            
            window.location.reload(false)
          }).catch((err) => {                                    
            setShowL(false)              
            window.location.reload(false)       
            //console.log(err);
          });   

      }else{
          let ref2=firebase.database().ref(`userprofile/${localStorage.getItem('wallet')}`);                    
          let dateset=new Date().toDateString();                
          //console.log("data",data.val())
          ref2.update({
          Imageurl:getIPro[0].Imageurl,bgurl:u,
          UserName:getIPro[0].UserName,Customurl:getIPro[0].Customurl,WalletAddress:localStorage.getItem('wallet'),
          TimeStamp:dateset,Twittername:getIPro[0].Twittername,Personalsiteurl:getIPro[0].Personalsiteurl,Email:getIPro[0].val().Email,Bio:getIPro[0].val().Bio,valid:getIPro[0].val().valid})
          .then(()=>{          
            setShowL(false)                                    
            setShowDone(true)            
            window.location.reload(false)
          }).catch((err) => {                                    
            setShowL(false)              
            window.location.reload(false)       
            //console.log(err);
          });   
      }
        // firebase.database().ref("userprofile").child(localStorage.getItem('wallet')).on("value", (data) => {          
        //   if (data) {                                  
        //   }          
        // })
        //}

    }
  
    const done=()=>{      
    }

  return (
    <Layout>
        <div className="page-content">
            <Container fluid="lg">
                <div className="profile-banner">
                    <div className="profile-card">
                    {getPro[0] === null || getPro[0] === "" || getPro[0] === undefined || getPro[0] === " " || getPro[0] === NaN ? (
                        <>
                          <img src={DummyPic} alt="pics" width={"1500px"} height={"260px"} />
                        </>
                      ):(
                        <>
                        {getPro[0].bgurl === null || getPro[0].bgurl === "" || getPro[0].bgurl === undefined || getPro[0].bgurl === " " || getPro[0].bgurl === NaN ? (<>
                          <img src={DummyPic} alt="pics" width={"1500px"} height={"260px"} />
                        </>):(
                          <>
                          <img src={getPro[0].bgurl} alt="pic" width={"1500px"} height={"260px"}/>
                        </>
                        )}                        
                        </>
                      )}
                        <Button variant='grad' onClick={handleShow}>Add cover</Button>
                    </div>                   
                      {getPro[0] === null || getPro[0] === "" || getPro[0] === undefined || getPro[0] === " " || getPro[0] === NaN ? (
                        <> <Link to="/edit" className='profile-pic'>
                          <img src={DummyPic} alt="pic" /><span>Edit</span>
                          </Link>
                        </>
                      ):(
                        <>
                        {getPro[0].Imageurl === null || getPro[0].Imageurl === "" || getPro[0].Imageurl === undefined || getPro[0].Imageurl === " " || getPro[0].Imageurl === NaN ? (<>
                          <img src={DummyPic} alt="pic" /><span>Edit</span>
                        </>):(<>
                          <Link to="/edit" className='profile-pic'>
                          <img src={getPro[0].Imageurl} alt="pic" /><span>Edit</span>
                        </Link>
                        </>)}
                        
                        </>
                      )}
                                            
                </div>

                <center>
                  {getPro[0] === null || getPro[0] === "" || getPro[0] === undefined ? (
                  <>
                  </>
                  ):(
                    <>
                    {getPro[0].valid === "validated" ? (
                      <svg width="20" height="20" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.78117 0.743103C5.29164 -0.247701 6.70826 -0.247701 7.21872 0.743103C7.52545 1.33846 8.21742 1.62509 8.8553 1.42099C9.91685 1.08134 10.9186 2.08304 10.5789 3.1446C10.3748 3.78247 10.6614 4.47445 11.2568 4.78117C12.2476 5.29164 12.2476 6.70826 11.2568 7.21872C10.6614 7.52545 10.3748 8.21742 10.5789 8.8553C10.9186 9.91685 9.91685 10.9186 8.8553 10.5789C8.21742 10.3748 7.52545 10.6614 7.21872 11.2568C6.70826 12.2476 5.29164 12.2476 4.78117 11.2568C4.47445 10.6614 3.78247 10.3748 3.1446 10.5789C2.08304 10.9186 1.08134 9.91685 1.42099 8.8553C1.62509 8.21742 1.33846 7.52545 0.743103 7.21872C-0.247701 6.70826 -0.247701 5.29164 0.743103 4.78117C1.33846 4.47445 1.62509 3.78247 1.42099 3.1446C1.08134 2.08304 2.08304 1.08134 3.1446 1.42099C3.78247 1.62509 4.47445 1.33846 4.78117 0.743103Z" fill="#feda03"></path><path fillRule="evenodd" clipRule="evenodd" d="M8.43961 4.23998C8.64623 4.43922 8.65221 4.76823 8.45297 4.97484L5.40604 8.13462L3.54703 6.20676C3.34779 6.00014 3.35377 5.67113 3.56039 5.47189C3.76701 5.27266 4.09602 5.27864 4.29526 5.48525L5.40604 6.63718L7.70475 4.25334C7.90398 4.04672 8.23299 4.04074 8.43961 4.23998Z" fill="#000000">\
                        </path>
                      </svg>                        
                    ):(
                      <></>
                    )}
                  </>
                  )}
                                  
                  
                </center>

                {localStorage.getItem('wallet') === null || localStorage.getItem('wallet') === undefined === localStorage.getItem('wallet') === "" ?(
                <>
                {
                  <div className="mb-4 text-center d-flex align-items-center justify-content-center">
                  <Link to="/connect" className='btn btn-grad'>Connect wallet</Link>                
                  </div>    
                }
                </>
                ):(
                  <div className="mb-36 text-center">
                    <Button variant='copy-code' className="btn"  onClick={() => { navigator.clipboard.writeText(localStorage.getItem('wallet')); setToast(true)}}>
                        <img src={Logo} style={{width:"15%",height:"15%"}} alt="icon" />
                        {!toast ? <span>{localStorage.getItem('wallet').slice(0,8)}....{localStorage.getItem('wallet').slice(52,58)}</span> : (
                            <Toast className='toast-text' onClose={() => {setToast(false); handleClose();}} show={toast} autohide delay={1500}>
                                <Toast.Body>Copied!</Toast.Body>
                            </Toast>  
                        )}
                    </Button>                    
                </div>
                )}
                            
                <div className="mb-4 text-center d-flex align-items-center justify-content-center">
                    <Link to="/edit" className='btn btn-grad'>Edit profile</Link>                    

                    <Dropdown className='dropdown-noarrow ms-2'>
                        <Dropdown.Toggle variant="grad" className='btn-round px-0 btn-round-sm' style={{width: '40px', height: '42px'}}>
                            <svg viewBox="0 0 15 16" fill="none" width="16" height="16" xlmns="http://www.w3.org/2000/svg" className="sc-bdvvtL m-0 sc-hKwDye esgSbr"><path fillRule="evenodd" clip-rule="evenodd" d="M11.7086 5.2928L7.00146 0.585693L2.29436 5.2928C1.90383 5.68332 1.90383 6.31649 2.29436 6.70701C2.68488 7.09754 3.31805 7.09754 3.70857 6.70701L6.00146 4.41412V11C6.00146 11.5523 6.44918 12 7.00146 12C7.55375 12 8.00146 11.5523 8.00146 11V4.41412L10.2944 6.70701C10.6849 7.09754 11.318 7.09754 11.7086 6.70701C12.0991 6.31649 12.0991 5.68332 11.7086 5.2928ZM1.00146 10C1.55375 10 2.00146 10.4477 2.00146 11V14H12.0015V11C12.0015 10.4477 12.4492 10 13.0015 10C13.5538 10 14.0015 10.4477 14.0015 11V15C14.0015 15.5523 13.5538 16 13.0015 16H1.00146C0.44918 16 0.00146484 15.5523 0.00146484 15V11C0.00146484 10.4477 0.44918 10 1.00146 10Z" fill="currentColor"></path></svg>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className='link-flex text-center dropdown-menu-right dropdown-share py-4 px-3'>
                            <h4>Share link to this page</h4>

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
                                        <svg viewBox="0 0 24 24" width="40" height="16" xlmns="http://www.w3.org/2000/svg" className="sc-bdvvtL sc-hKwDye esgSbr">
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
                                <a href={"https://mail.google.com/"} target="_blank" rel="noopener noreferrer">                                                                
                                        <svg viewBox="0 0 24 24" width="40" height="16" xlmns="http://www.w3.org/2000/svg" className="sc-bdvvtL sc-hKwDye esgSbr"><path d="M12 12.713l-11.985-9.713h23.971l-11.986 9.713zm-5.425-1.822l-6.575-5.329v12.501l6.575-7.172zm10.85 0l6.575 7.172v-12.501l-6.575 5.329zm-1.557 1.261l-3.868 3.135-3.868-3.135-8.11 8.848h23.956l-8.11-8.848z" fill="currentColor"></path></svg>
                                </a>
                                    <small className='d-block mt-2'>E-mail</small>
                                </div>
                            </div>
                        </Dropdown.Menu>
                    </Dropdown>                    
                </div>


            <ProfileTabs create={getImgreffalgo} sale={getImgreffalgosale} buyed={getImgreffalgobuy} owner={null} likes={getdbLike} onNameChange={setgetImgreffalgo}/>
            </Container>

            {/* onHide={handleClose} */}
            <Modal show={show} size="sm" className="modal-reset" centered >
                <Modal.Header >
                <Modal.Title>Update cover</Modal.Title>
                </Modal.Header>
                <Modal.Body>                    
                    <div className="mt-3">
                      {localStorage.getItem('wallet') === null || localStorage.getItem('wallet') === undefined || localStorage.getItem('wallet') === "" ? (
                      <>
                      <Link to="/connect">
                      <label htmlFor="uploadFile" className='mb-3 btn btn-grad btn-lg w-100'>Please Connect Wallet</label>
                      </Link>
                      </>
                      ):(
                      <>
                      Upload new cover for your profile page. We recommend to upload images in 1500x260 resolution
                      <input type="file" hidden id='uploadFile' onChange = {captureFile}/>
                      <label htmlFor="uploadFile" className='mb-3 btn btn-grad btn-lg w-100'>Select file</label>
                      <Button variant="grad" className='w-100' size={'lg'} onClick={handleClose}>
                          Cancel
                      </Button>
                      </>
                      )}
                        
                    </div>
                </Modal.Body>
            </Modal>            
            <Modal show={showL} centered size="sm" >
                <Modal.Header  />
                <Modal.Body>
                    <div className="text-center py-4">
                        {/* <h3>Loading...</h3> */}
                        <img src={logogif} alt="loading..." />
                    </div>                    
                </Modal.Body>
            </Modal>

            <Modal show={showL} centered size="sm" >
                <Modal.Header  />
                <Modal.Body>
                    <div className="text-center py-4">
                    <h3>Upload Successfully...</h3>
                    </div>                    
                    <Button variant="primary" size="lg" className='w-100' onClick={()=>done()}>Done</Button>
                </Modal.Body>
            </Modal>
            </div>
        </Layout>
    );
}

export default ProfileNFT;