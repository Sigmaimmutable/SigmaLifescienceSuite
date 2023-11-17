import React,{ useEffect ,useState} from "react";
import { Link, useHistory } from "react-router-dom";
import {  Col, Container,Row,Button } from "reactstrap";
import ButtonLoad from 'react-bootstrap-button-loader';
import Compress from "react-image-file-resizer";
// import config from "./config.json";
//import Layout from '../components/Layouts/Layout';
//import Layout from '../components/Dashboard/Layout';
//import Layout from '../components/DashboardNew/Layout';
import Layout from '../components/DashboardNew/LayoutT';
import { ToastContainer, Zoom, toast} from 'react-toastify';
import escrow from '../KycDid/escrow'
import node from '../components/DashboardNew/nodeapi.json';

import web3 from "../web3";
import { updatealgobalance } from "../components/formula";
import { ListGroup } from "react-bootstrap";
import firebase from '../NFTFolder/firebase';
const axios = require('axios');
const UploadKyc = () => {  
  useEffect(() => {
    document.title = "Sigma | Creator"
}, [])
         
    const[loader, setLoader] = useState(false);
    const handleShowLoad = () => setLoader(true);
    const handleHideLoad = () => setLoader(false); 

    const[address1,setAddress1]=useState("");
    const[address2,setAddress2]=useState("");
    const[address3,setAddress3]=useState("");
  
    const[createdAsset, setCreatedAsset] = useState("");
    const[getIProfile,setgetIProfile]=useState([""]);
    const [Imgname,setImgname] = useState("")
    const [Img,setImg] = useState("")
    const [getFile,setFile] = useState("")
    const captureFile =async(event) => {
      event.stopPropagation()
      event.preventDefault()
      const file = event.target.files[0]
      setImgname(file.name)
      setFile(file)
      const MIN_FILE_SIZE = 1024 // 1KB
      const MAX_FILE_SIZE = 500120 // 500KB
      let fileSizeKiloBytes = file.size 
      let c=0;
      if(fileSizeKiloBytes < MIN_FILE_SIZE){
        toast.dismiss();
        toast.error("File size is less than minimum limit",{autoClose:3000});          
        c=c+1;
        handleHideLoad()                               
        await sleep(4000);
        window.location.reload(false)
      }
      if(fileSizeKiloBytes > MAX_FILE_SIZE){
        toast.dismiss();
        toast.error("File size is greater than maximum limit",{autoClose:3000});      
        c=c+1;
        handleHideLoad()  
        await sleep(4000);                             
        window.location.reload(false)
      }        
      if(c===0){
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
      }else{
        toast.dismiss();
        toast.error("Support file size: 1 kb to 500 kb ",{autoClose:3000});                
        handleHideLoad()                               
        await sleep(4000);
        window.location.reload(false)
        
      }
      
  };
    const uploadkyc =async()=>{
      const accounts = await web3.eth.getAccounts();
      const formData = new FormData();
      formData.append("file", getFile);

      const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
              'pinata_api_key': "3c04667b948dfaba1be7",
              'pinata_secret_api_key': '62d496b53365b6e87d738a92605be1b39ee7cd936e84a9e0063b9df587003db2',                        
              "Content-Type": "multipart/form-data"
          },
        });                
        const realipfsurl = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;                                  
        console.log("Pinata updated",realipfsurl)

    let refactivity= await firebase.database().ref(`kyctable/${accounts[0]}`);   
   
    const db = refactivity.push().key;                         
    await refactivity.child(db).set({
    keyId:db,
    walletaddress: localStorage.getItem("walletAddress"),
    ipfslink:realipfsurl,
    proofType:"aadhar",
   
})
    
            .then(()=>{	                      
                toast.dismiss()
                toast.success(`Uploaded Successfully `,{autoClose: 5000});                                                                  
                handleHideLoad()
                // done2();            
        })                    
                     
  




    }
    const clearImage = () =>{
      setImg("")
    }
  //   const dbcallProfile=async()=>{            
  //     if(localStorage.getItem("walletAddress")  === null || localStorage.getItem("walletAddress")  === "" || localStorage.getItem("walletAddress")  === " " || localStorage.getItem("walletAddress") === undefined || localStorage.getItem("walletAddress") === ''){
  //     }
  //     else{
  //         // firebase.auth().signInAnonymously().then(async(response)=>{           
  //         const hasRestaurant = await firebase.database()
  //         .ref(`kyctable/${localStorage.getItem('walletAddress')}`)
  //         .orderByKey().limitToFirst(1).once('value')
  //         .then(res => res.exists());              
  //         if(hasRestaurant)
  //         {
  //             let r=[];
  //         try {    
  //         // firebase.auth().signInAnonymously().then((response)=>{           
  //         firebase.database().ref("kyctable").child(localStorage.getItem('walletAddress')).on("value", (data) => {          
  //             if (data) {  
  //                 try{
  //                 let datavar=data.val()
  //                 Object.keys(datavar).map((m)=>{
  //                   console.log("datascheck",datavar[m]);
  //                   r.push({
  //                     keyId:datavar[m].keyId,
  //                     ipfslink:datavar[m].keyId,
  //                     proofType:datavar[m].keyId,
  //                   })                


  //                 })
                 
                
  //             }   catch(e){                      
  //             }                 
  //             }
  //             else{
  //             setgetIProfile([""]);  
  //             }
  //             r.reverse();
  //             setgetIProfile(r);

  //         });         
  //         // })         
  //         } catch (error) {            
  //         }                
  //         }else{
  //             setgetIProfile([""]);  
  //         }  
  //         // })          
  //     }        
  // }    
  // useEffect(()=>{dbcallProfile()},[])
    

    const toastDiv = (txId) =>
    (
    <div>
         <p> Transaction is successful &nbsp;<a style={{color:'#133ac6'}} href={txId} target="_blank" rel="noreferrer"><br/><p style={{fontWeight: 'bold'}}>View in Bscscan <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M11.7176 3.97604L1.69366 14L0.046875 12.3532L10.0697 2.32926H1.23596V0H14.0469V12.8109H11.7176V3.97604Z" fill="#133ac6"/>
          </svg></p></a></p>  
     </div>
    );
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }


return(
    <Layout>
      <ToastContainer position='bottom-right' draggable = {false} transition={Zoom} autoClose={4000} closeOnClick = {false}/>
      {localStorage.getItem('walletAddress') === null || localStorage.getItem('walletAddress') === undefined || localStorage.getItem('walletAddress') === "" ? (
        <Container fluid>           
        <Row className="justify-content-center">
            <Col xl="8" lg="8" md="10" sm="12">
                      <center>
                    <h4 className="mb-3">Please connect your wallet</h4>                                                                                                        
                      </center>
            </Col>
        </Row>
        </Container>          
      ):( 
          <Container fluid="md">                  
          <form>
            <Row>

            <div className='mb-3'>
                                    {/* <label>Upload</label> */}

                                    <div className='upload-box text-center'>

                                      {Img === null || Img === "" || Img === undefined ?(
                                        <>
                                        <input id="upload" type="file" hidden onChange = {captureFile}/>
                                        <label htmlFor='upload'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi mb-3 bi-upload" viewBox="0 0 16 16">
                                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                                <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
                                            </svg>
                                            <p id="inputID">Support file : png/img </p>                                           
                                        </label>
                                            <p id="inputID">Support file size: 1 kb to 500 kb </p>
                                        </>
                                      ):(
                                        <>
                                        <input id="upload" type="file" hidden onChange = {captureFile}/>
                                        <label htmlFor='Image Uploaded' className='p-2' >                                                                        
                                        {/* <Button variant='link' className='p-0 text-white btn-closeimg' onClick={()=>{clearImage()}}>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi m-0 bi-x-circle-fill" viewBox="0 0 16 16">
                                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                                            </svg>
                                        </Button>  */}
                                        <img src={Img} alt="Img" className='img-fluid w-100 rounded-16' />            
                                        </label>
                                        </>
                                      )}
                                        
                                    </div>
                                </div>
              {/* <Col xs={6} className="mb-3">
                <label htmlFor="name">Address 1:</label>
                <input placeholder={localStorage.getItem('walletAddress')} type="text" className="form-control form-control-reset" id="name"  style={{color:'#808080'}} onChange={event => setAddress1(localStorage.getItem('walletAddress'))}/>                
              </Col> */}

              {/* <Col xs={6} className="mb-3">
                <label htmlFor="dob">Address 1:</label>
                <input placeholder="Address 1" type="text" className="form-control form-control-reset" id="dob" style={{color:'#808080'}} onChange={event => setAddress1( event.target.value)}/>                
              </Col> */}
             
             
            </Row>            
               <ButtonLoad loading={loader} className='w-100 btn-blue mb-3' onClick={()=>{uploadkyc()}}>Upload</ButtonLoad>            
          </form>          
          </Container>
      )}        
    </Layout>                      
)
}

export default UploadKyc;