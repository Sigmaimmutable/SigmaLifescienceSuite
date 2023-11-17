import React,{useState,useEffect, useContext} from 'react';
//import Layout from '../components/Layouts/LayoutInner';
//import Layout from '../components/Dashboard/Layout';
import Layout from '../components/DashboardNew/Layout';
import {Container, Row, Col, Form, InputGroup, Button, Modal} from 'react-bootstrap';
import icon from '../assets/images/dummy-icon.svg'
import Compress from "react-image-file-resizer";
import fireDb from './firebase';
//import ipfs from "./ipfs";
//import { create } from 'ipfs-http-client';
//import MyAlgoConnect from '@randlabs/myalgo-connect';
import { useHistory } from "react-router-dom";
import firebase from './firebase';
//import configfile from '../../config.json'
//import { DataContext } from './DataContext';
//const axios = require('axios');

const Edit = () => {
//const{getIPro2}=useContext(DataContext)
const [getIPro2,setgetIPro2]=useState([""]) 
   
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
        setgetIPro2([""]);  
      }
      setgetIPro2(r);
    });                  
  } catch (error) {
    //console.log('error occured during search', error);    
  }                
}    
useEffect(()=>{dbcallPro()},[])

const [showTestAlert,setshowTestAlert] = React.useState(false);   
const [issuesdisplay,setissuesdisplay]=useState(null)    
let history=useHistory();        
const [tname,setName] = useState("");
const [tpurl,setPurl] = useState("");  
const [tbio,setBio] = useState("");
const [turl,setUrl] = useState("");        
const [tTwitter,setTwitter] = useState("");  
const [temail,setEmail] = useState("");      
const [showTestLoading, setshowTestLoading] = React.useState(false);    
const [show, setShow] = React.useState(false);    
const [Img,setImg] = useState("")
const [Imgname,setImgname] = useState("")
const captureFile =async(event) => {
    event.stopPropagation()
    event.preventDefault()
    const file = event.target.files[0]
    setImgname(file.name)
    let reader = new window.FileReader()
    try{
    Compress.imageFileResizer(file, 500, 500, 'JPEG', 200, 0,
    uri => {          
        setImg(uri)          
    },
    'base64'
    );
    reader.readAsArrayBuffer(file)        
    }catch (err) {      
    }
};

    const onSubmitNFT = async (event) => {        
    if(tname === ""){
        setissuesdisplay("please enter profile name")
        setshowTestAlert(true)                                  
    }        
    else if(tTwitter === "" ){
        setissuesdisplay("please enter twitter username")
        setshowTestAlert(true)                                  
    }else if(temail === ""){
        setissuesdisplay("please enter gmail")
        setshowTestAlert(true)                                  
    }else if(tbio === "" ){
        setissuesdisplay("please enter Bio")
        setshowTestAlert(true)                                  
    }
    else if(Img === ""){
        setissuesdisplay("please Upload Image")
        setshowTestAlert(true)                               
    }
    else if(tpurl === ""){
        setissuesdisplay("please enter personal url")
        setshowTestAlert(true)                      
    }
    else if(localStorage.getItem("walletAddress") === null || localStorage.getItem("walletAddress") === undefined || localStorage.getItem("walletAddress") === "" || localStorage.getItem("walletAddress") === " " ){
        setissuesdisplay("Please Connect Wallet")
        setshowTestAlert(true)                                  
    }
    else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(temail))){
        setissuesdisplay("Please Enter Valid E-mail")
        setshowTestAlert(true)                                  
    }
    else if(getIPro2[0] === null || getIPro2[0] === "" || getIPro2[0] === undefined || getIPro2 === null || getIPro2 === undefined || getIPro2 === ""){                    
    setshowTestLoading(true)                                             
    let ref2=fireDb.database().ref(`userprofile/${localStorage.getItem('walletAddress')}`);                    
    let dateset=new Date().toDateString();
    ref2.set({
    Imageurl:Img,bgurl:"",
    UserName:tname,Customurl:turl,walletAddressAddress:localStorage.getItem('walletAddress'),
    TimeStamp:dateset,Twittername:tTwitter,Personalsiteurl:tpurl,Email:temail,Bio:tbio,valid:""})
    .then(()=>{             
        setshowTestLoading(false)  
        setShow(true)
    }).catch((err) => {                                    
        setshowTestLoading(false)                     
        setissuesdisplay("your browser appearing issue")
        setshowTestAlert(true)                      
        console.log(err);
    });               
    }
    else{
    setshowTestLoading(true)        
    if(getIPro2[0].bgurl === null || getIPro2[0].bgurl === undefined || getIPro2[0].bgurl === ""){
    let ref2=fireDb.database().ref(`userprofile/${localStorage.getItem('walletAddress')}`);        
    let dateset=new Date().toDateString();
    ref2.set({
    Imageurl:Img,bgurl:"",
    UserName:tname,Customurl:turl,WalletAddress:localStorage.getItem("walletAddress"),
    TimeStamp:dateset,Twittername:tTwitter,Personalsiteurl:tpurl,Email:temail,Bio:tbio,valid:""})
    .then(()=>{             
        setshowTestLoading(false)  
        setShow(true)
    }).catch((err) => {                                    
        setshowTestLoading(false)                     
        console.log(err);
    });   
    }
    else{                
    let ref2=fireDb.database().ref(`userprofile/${localStorage.getItem("walletAddress")}`);  
    let dateset=new Date().toDateString();
    let r=[];
    firebase.database().ref("userprofile").child(localStorage.getItem("walletAddress")).on("value", (data) => {          
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
    ref2.set({
        Imageurl:Img,bgurl:r[0].bgurl,
        UserName:tname,Customurl:turl,WalletAddress:localStorage.getItem("walletAddress"),
        TimeStamp:dateset,Twittername:tTwitter,Personalsiteurl:tpurl,Email:temail,Bio:tbio,valid:r[0].valid})
        .then(()=>{             
            setshowTestLoading(false)  
            setShow(true)
        }).catch((err) => {                                    
            setshowTestLoading(false)                     
            console.log(err);
        });   
    }        
    })
    }                                                       
    }    
    }
    const done=()=>{
    history.push("/profile")
    window.location.reload(false);    
    }

    const refreshSale=()=>{
        setshowTestAlert(false)        
    }
    
return (
    <Layout>
        <div className="page-content">
        <Container fluid="md">
            <div className="card-bond">                    
                <div className="card-bond-inner">
                <Row className=''>
                    <Col md={4} className='mb-4 order-md-2'>
                        <div className='text-center text-md-start'>
                            {Img === null || Img === undefined || Img === "" ?(
                            <>
                            <img src={icon} alt="icon" className='update-pic mb-3' />
                            <p className='mb-3'>We recommend an image <br />of at least 500x500. Gifs work too.</p>
                            <input type="file" hidden name="upload" id='upload' onChange = {captureFile}/>
                            <label htmlFor="upload" className='btn btn-grad'>Choose File</label>
                            </>
                            ):(
                            <>
                            <img src={Img} alt="icon" className='update-pic mb-3' />
                            <p className='mb-3'>Image Uploaded <br />{Imgname}</p>
                            <input type="file" hidden name="upload" id='upload' onChange = {captureFile}/>
                            <label htmlFor="upload" className='btn btn-grad'>Choose File</label>
                            </>
                            )}                                
                        </div>
                    </Col>
                    <Col md={8} className='mb-4'>                                      
                        <div className="mb-4">                        
                            <h4 className='mb-2'>Display name</h4>
                            <InputGroup className="mb-4 input-group-field" onChange={event => setName( event.target.value)}>
                                <Form.Control
                                    placeholder='Enter your display name'
                                />
                            </InputGroup>                                
                            <h4 className='mb-2'>Bio</h4>
                            <InputGroup className="mb-4 input-group-field" onChange={event => setBio( event.target.value)}>
                                <Form.Control
                                    placeholder='Tell about yourself in a few words'
                                />
                            </InputGroup>   
                            <h4 className='mb-2'>Twitter Username</h4>   
                            <p className='mb-2'>Link your Twitter account to gain more trust on the marketplace</p> 
                            <InputGroup className="mb-4 input-group-field" onChange={event => setTwitter( event.target.value)}>
                                <InputGroup.Text className='py-0 font-weight-normal'>
                                    @
                                </InputGroup.Text>
                                <Form.Control placeholder="Enter your name in Twitter" />
                                {/* <Button variant='reset' className='text-blue'>Link</Button> */}
                            </InputGroup>     

                            <h4 className='mb-2'>Personal site or portfolio</h4>
                            <InputGroup className="mb-4 input-group-field" onChange={event => setPurl( event.target.value)}>
                                <Form.Control
                                    placeholder='https://'
                                />
                            </InputGroup>     
                            <h4 className='mb-2'>Email</h4>   
                            <p className='mb-2'>Your email for marketplace notifications</p> 
                            <InputGroup refs="email" className="mb-5 input-group-field" onChange={event => setEmail( event.target.value)}>
                                <Form.Control placeholder="Enter your email" />
                                {/* <Button variant='reset' className='text-blue' disabled>Confirm</Button> */}
                            </InputGroup>                                     
                        </div>
                        <div className="d-flex flex-wrap justify-content-between align-items-center">
                            <Button variant='grad' size="lg" onClick={()=>{onSubmitNFT()}}>Update profile</Button>
                        </div>
                    </Col>                        
                </Row>
                </div>
            </div>
        </Container>
        {/* onHide={handleCloseTestLoading} */}
        <Modal show={showTestLoading} centered size="sm" >
            <Modal.Body>
                {/* <Button className='modal-close' onClick={handleClose} variant='reset'>
                    <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g opacity="1">
                        <path d="M17.5004 32.0832C9.44597 32.0832 2.91699 25.5542 2.91699 17.4998C2.91699 9.44546 9.44597 2.9165 17.5004 2.9165C25.5548 2.9165 32.0837 9.44546 32.0837 17.4998C32.0837 25.5542 25.5548 32.0832 17.5004 32.0832ZM17.5004 29.1665C20.5946 29.1665 23.562 27.9373 25.75 25.7494C27.9379 23.5615 29.1671 20.594 29.1671 17.4998C29.1671 14.4056 27.9379 11.4382 25.75 9.25026C23.562 7.06233 20.5946 5.83317 17.5004 5.83317C14.4062 5.83317 11.4387 7.06233 9.25076 9.25026C7.06283 11.4382 5.83367 14.4056 5.83367 17.4998C5.83367 20.594 7.06283 23.5615 9.25076 25.7494C11.4387 27.9373 14.4062 29.1665 17.5004 29.1665ZM17.5004 15.4378L21.6245 11.3121L23.6881 13.3757L19.5625 17.4998L23.6881 21.624L21.6245 23.6875L17.5004 19.5619L13.3762 23.6875L11.3126 21.624L15.4383 17.4998L11.3126 13.3757L13.3762 11.3121L17.5004 15.4378Z" fill="white"/>
                        </g>
                    </svg>
                </Button> */}
                <div className="text-center py-4">
                    {/* <h4 className='mb-2'>Loading...</h4> */}
                    {/* <img src={logogif} alt="loading..." /> */}
                </div>                    
            </Modal.Body>
        </Modal>
        {/* onHide={handleCloseTest} */}
        <Modal show={show} centered size="sm" >
            <Modal.Body>
                {/* <Button className='modal-close' onClick={handleClose} variant='reset'>
                    <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g opacity="1">
                        <path d="M17.5004 32.0832C9.44597 32.0832 2.91699 25.5542 2.91699 17.4998C2.91699 9.44546 9.44597 2.9165 17.5004 2.9165C25.5548 2.9165 32.0837 9.44546 32.0837 17.4998C32.0837 25.5542 25.5548 32.0832 17.5004 32.0832ZM17.5004 29.1665C20.5946 29.1665 23.562 27.9373 25.75 25.7494C27.9379 23.5615 29.1671 20.594 29.1671 17.4998C29.1671 14.4056 27.9379 11.4382 25.75 9.25026C23.562 7.06233 20.5946 5.83317 17.5004 5.83317C14.4062 5.83317 11.4387 7.06233 9.25076 9.25026C7.06283 11.4382 5.83367 14.4056 5.83367 17.4998C5.83367 20.594 7.06283 23.5615 9.25076 25.7494C11.4387 27.9373 14.4062 29.1665 17.5004 29.1665ZM17.5004 15.4378L21.6245 11.3121L23.6881 13.3757L19.5625 17.4998L23.6881 21.624L21.6245 23.6875L17.5004 19.5619L13.3762 23.6875L11.3126 21.624L15.4383 17.4998L11.3126 13.3757L13.3762 11.3121L17.5004 15.4378Z" fill="white"/>
                        </g>
                    </svg>
                </Button> */}
                <div className="text-center py-4">
                    <h4 className='mb-2'>Upload completed Successfully...</h4>
                </div>                    
                <Button variant="grad" size="lg" className='w-100' onClick={()=>done()}>Done</Button>
            </Modal.Body>
        </Modal>
        <Modal show={showTestAlert} centered size="sm" >
            <Modal.Body>
                {/* <Button className='modal-close' onClick={handleClose} variant='reset'>
                    <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g opacity="1">
                        <path d="M17.5004 32.0832C9.44597 32.0832 2.91699 25.5542 2.91699 17.4998C2.91699 9.44546 9.44597 2.9165 17.5004 2.9165C25.5548 2.9165 32.0837 9.44546 32.0837 17.4998C32.0837 25.5542 25.5548 32.0832 17.5004 32.0832ZM17.5004 29.1665C20.5946 29.1665 23.562 27.9373 25.75 25.7494C27.9379 23.5615 29.1671 20.594 29.1671 17.4998C29.1671 14.4056 27.9379 11.4382 25.75 9.25026C23.562 7.06233 20.5946 5.83317 17.5004 5.83317C14.4062 5.83317 11.4387 7.06233 9.25076 9.25026C7.06283 11.4382 5.83367 14.4056 5.83367 17.4998C5.83367 20.594 7.06283 23.5615 9.25076 25.7494C11.4387 27.9373 14.4062 29.1665 17.5004 29.1665ZM17.5004 15.4378L21.6245 11.3121L23.6881 13.3757L19.5625 17.4998L23.6881 21.624L21.6245 23.6875L17.5004 19.5619L13.3762 23.6875L11.3126 21.624L15.4383 17.4998L11.3126 13.3757L13.3762 11.3121L17.5004 15.4378Z" fill="white"/>
                        </g>
                    </svg>
                </Button> */}
                <div className="text-center py-4">
                    <h4 className='mb-2'>{issuesdisplay}</h4>  
                </div>                    
                <Button variant="grad" size="lg" className='w-100' onClick={()=>refreshSale()}>Ok</Button>
            </Modal.Body>
        </Modal>    
    </div>     
    </Layout>
);
};
export default Edit;