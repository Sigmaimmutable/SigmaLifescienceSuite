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


import { ListGroup } from "react-bootstrap";
import firebase from '../NFTFolder/firebase';
import tokencreate from  "./tokenabi.js";
import {ercdata} from  "./ERCdata";
import web3 from "../web3";

const CreateKyc = () => {  
  useEffect(() => {
    document.title = "Sigma | Creator"
}, [])
         
    const[loader, setLoader] = useState(false);
    const handleShowLoad = () => setLoader(true);
    const handleHideLoad = () => setLoader(false); 

    const[assetName,setAssetName]=useState("");
    const[unitName,setUnitName]=useState("");
    const[totalSupply,setTotalSupply]=useState("");
    const[decimals,setDecimals]=useState("");
    const[assetUrlState,setAssetUrl]=useState("");
    const[managerAddress,setManagerAddress]=useState("");
    const[reserveAddress,setReserveAddress]=useState("");
    const[freezeAddress,setFreezeAddress]=useState("");
    const[clawbackAddress,setClawbackAddress]=useState("");
    const [minAlgo, setMinAlgo] = useState("");
    const[createdAsset, setCreatedAsset] = useState("");

    
    const toastDiv = (txId) =>
    (
    <div>
         <p> Transaction is successful &nbsp;<a style={{color:'#133ac6'}} href={txId} target="_blank" rel="noreferrer"><br/><p style={{fontWeight: 'bold'}}>View in Bscscan <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M11.7176 3.97604L1.69366 14L0.046875 12.3532L10.0697 2.32926H1.23596V0H14.0469V12.8109H11.7176V3.97604Z" fill="#133ac6"/>
          </svg></p></a></p>  
     </div>
    );


     

      const createAsset =async()=>{
        const accounts = await web3.eth.getAccounts();
        const createdToken = await tokencreate.deploy({
          
        data:ercdata,
        arguments: [assetName,unitName]        
        })
        .send({
        from: accounts[0],
        gas: 4796559,
        gasPrice: '20000000000'
      })
      console.log("worked",createdToken.options.address);
      console.log("worked",localStorage.getItem('walletAddress'));
      localStorage.setItem("createdToken",createdToken.options.address);
      setCreatedAsset(createdToken.options.address);
  
  
      let refactivity= await firebase.database().ref(`CreatedTokens/${accounts[0]}`);   
      const db = refactivity.push().key;                         
      await refactivity.child(db).set({
      keyId:db,
      Owner:accounts[0],
      TokenAddress:createdToken.options.address,
      Tokenname:assetName,
      TokenSymbol:unitName,
      Totalsupply:"0",
      Minted:"0",
      Burned:"0",
     
     
  })
      
              .then(()=>{	                      
                  toast.dismiss()
                  toast.success(`Token Created  Successfully`,{autoClose: 5000});                                                                  
                  handleHideLoad()
                  // done2();            
          })                    
                       
     
        
                  

  
  
  
  
      }



    //   const createAsset = async () =>
    //   {
    //     handleShowLoad();
    //     if (localStorage.getItem("walletAddress") === "")
    //     {
    //         toast.error("Connect your wallet");
    //         handleHideLoad();
    //     }
    //     else{
    //         if(parseFloat(minAlgo) < 101000)
    //         {
    //             toast.error("Your Algo balance is low. Please get more Algos from dispenser.")
    //             handleHideLoad();
    //         }
    //         else
    //         {
    //     try{
    //     let params = await algodClient.getTransactionParams().do();
    //     //comment out the next two lines to use suggested fee
    //     params.fee = 1000;
    //     params.flatFee = true;
    //     console.log(params);
    //     // Asset creation specific parameters
    //     // The following parameters are asset specific
    //     // Throughout the example these will be re-used. 
    //     // We will also change the manager later in the example
    //     let addr = localStorage.getItem("walletAddress");
    //     console.log(addr);
    //     // total number of this asset available for circulation   
    //     let totalIssuance = totalSupply;

    //     // Optional string pointing to a URL relating to the asset
    //     let assetURL = assetUrlState;
        
    //     // The following parameters are the only ones
    //     // that can be changed, and they have to be changed
    //     // by the current manager
    //     // Specified address can change reserve, freeze, clawback, and manager
    //     let manager = localStorage.getItem("walletAddress");
    //     // Specified address is considered the asset reserve
    //     // (it has no special privileges, this is only informational)
    //     let reserve = reserveAddress;
    //     // Specified address can freeze or unfreeze user asset holdings 
    //     let freeze = freezeAddress;
    //     // Specified address can revoke user asset holdings and send 
    //     // them to other addresses    
    //     let clawback = clawbackAddress;
    
    //     // signing and sending "txn" allows "addr" to create an asset
    //     let txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject(
    //       {
    //         from: addr,
    //         assetName: assetName,
    //         unitName: unitName,
    //         assetURL: assetURL,
    //         total: parseInt(totalIssuance),
    //         decimals: parseInt(decimals),
    //         manager: manager,
    //         reserve: reserve,
    //         freeze: freeze,
    //         clawback: clawback,
    //         suggestedParams: params
    //       }
    //     );
    
    //     const signedTxn = await myAlgoWallet.signTransaction(txn.toByte());
        
    //     const response = await algodClient.sendRawTransaction(signedTxn.blob).do();
    //     await waitForConfirmation(algodClient, response.txId);
    //     let ptx = await algodClient.pendingTransactionInformation(response.txId).do();
    //     setCreatedAsset(ptx["asset-index"]);
    //     //firebase start
    //     let ref2=firebase.database().ref(`MinterDetails/${ptx["asset-index"]}`);  
    //     let currentDate = new Date().toDateString();  
    //     const keyId = ref2.push().key; 
    //     // console.log("234");
    //     // console.log("assetname", assetName, "unitname", unitName);                     
    //     ref2.set({
    //         id:keyId,
    //         WalletAddress:localStorage.getItem("walletAddress"),
    //         assetID: ptx["asset-index"],
    //         name: assetName,
    //         unitName: unitName,
    //         date: currentDate})
    //         .then(()=>{ 
    //           toast.success("Your details uploaded successfully.");
    //         }).catch((err) => {
    //           // console.log("245");                                    
    //           toast.error(err);
    //         });
    //     //firebase end
    //     // console.log("249");
    //     setAssetName("");
    //     setAssetUrl("");
    //     setClawbackAddress("");
    //     setManagerAddress("");
    //     setDecimals("");
    //     setFreezeAddress("");
    //     setReserveAddress("");
    //     setTotalSupply("");
    //     setUnitName("");
    //     await escrowConfig(ptx["asset-index"]);
    //     }  
    //     catch (err) {
    //       toast.error(err.toString());
    //       handleHideLoad();
    //       console.error(err);
    //   }
    //   }
    //   }
    // }

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
              <Col xs={6} className="mb-3">
                <label htmlFor="name">Token Name:</label>
                <input placeholder="Token Name" type="text" className="form-control form-control-reset" id="name" onChange={event => setAssetName( event.target.value)}/>                
              </Col>
              <Col xs={6} className="mb-3">
                <label htmlFor="dob">Token Symbol:</label>
                <input placeholder="Token Symbol" type="text" className="form-control form-control-reset" id="dob" style={{color:'#808080'}} onChange={event => setUnitName( event.target.value)}/>                
              </Col>
              {/* <Col xs={6} className="mb-3">
                <label htmlFor="address">Total supply:</label>
                <input required placeholder="Total supply" type="number" className="form-control form-control-reset" id="address" onChange={event => setTotalSupply( event.target.value)}/>                
              </Col>
              <Col xs={6} className="mb-3">
                <label htmlFor="email">decimals:</label>
                <input required placeholder="decimals" type="number" className="form-control form-control-reset" id="email" onChange={event => setDecimals( event.target.value)}/>                
              </Col>
              <Col xs={6} className="mb-3">
                <label htmlFor="phonenumber">Asset URL:</label>
                <input placeholder="Asset URL" type="text"  id="phonenumber" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" className="form-control form-control-reset" onChange={event => setAssetUrl( event.target.value)}/>                
              </Col> */}
              {/* <Col xs={6} className="mb-3">
                <label htmlFor="citizenship">Manager Address:</label>
                <input placeholder="Manager Address" type="text"  id="citizenship" className="form-control form-control-reset" onChange={event => setManagerAddress( event.target.value)}/>                
              </Col> */}
              {/* <Col xs={6} className="mb-3">
                <label htmlFor="top">Reserve Address:</label>
                <input placeholder="Reserve Address" type="text"  id="top" className="form-control form-control-reset" onChange={event => setReserveAddress( event.target.value)}/>                
              </Col>
              <Col xs={6} className="mb-3">
                <label htmlFor="cor">Freeze Address:</label>
                <input placeholder="Freeze Address" type="text"  id="cor" className="form-control form-control-reset" onChange={event => setFreezeAddress( event.target.value)}/>                
              </Col>
              <Col xs={12} md={6} className="mb-3">
                <label htmlFor="fileid">Clawback Address:</label>
                <input type="text" placeholder="Clawback Address" name="tfile" id="fileid" onChange = {event => setClawbackAddress( event.target.value)} className="form-control form-control-reset"/>                
              </Col> */}
              {createdAsset === "" ? <></> : <><center><h5>Created Asset ID: <strong>{createdAsset}</strong></h5></center><br/></>}
            </Row>            
               <ButtonLoad loading={loader} className='w-100 btn-blue mb-3' onClick={()=>{createAsset()}}>Create Token</ButtonLoad>            
          </form>          
          </Container>
      )}        
    </Layout>                      
)
}

export default CreateKyc;