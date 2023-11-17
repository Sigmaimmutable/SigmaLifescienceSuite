import React,{useState,useEffect, useContext} from 'react';
//import Layout from '../components/Layouts/LayoutInner';
//import Layout from '../components/Dashboard/Layout';
import Layout from '../components/DashboardNew/Layout';
import {Container, Row, Col, Form, InputGroup, Button, Modal} from 'react-bootstrap';
import Compress from "react-image-file-resizer";
import fireDb from './firebase';
//import fireDbAuth from './firebaseAuth';
//import { create } from 'ipfs-http-client';
import MyAlgoConnect from '@randlabs/myalgo-connect';
import { useHistory } from "react-router-dom";
import firebase from './firebase';
//import fireDb2 from '../../firebasetest';
import { DataContext } from './DataContext';
import { ToastContainer, Zoom, toast} from 'react-toastify';
//import '../../toast-style-override.css'
import logogif from '../assets/images/gif4.gif';
import dataescrowprice from "./escrowpricenew";
import configfile from './config.json'
import {getpostdatafilter,getpostdata,getmultiplefilter,postdata,deletedata,getAllData} from './FirebaseMartina'
//const client = create('https://ipfs.infura.io:5001/api/v0')
const algosdk = require('algosdk'); 
const myAlgoConnect = new MyAlgoConnect();
const axios = require('axios');
const Single = () => {
  const [getactivity,setgetImgreffalgo] = useState([""]);    
  console.log("ActivityData",getactivity)  
  // React.useEffect(() => {
  //   window.scrollTo(0, 0);     
  // });
    //const {algobalanceApp}=useContext(DataContext)  
    const [algobalanceApp,setalgobalanceApp] = useState("");    
    useEffect(() => {        
      async function listenMMAccount() {    
      if(localStorage.getItem("walletAddress") === null || localStorage.getItem("walletAddress") === "0x" || localStorage.getItem("walletAddress") === undefined || localStorage.getItem("walletAddress") === ''){                  
      setalgobalanceApp("");      
      }
      else{          
      const baseServer = "https://testnet-algorand.api.purestake.io/ps2";
      const port = "";            
      const token = {            
      'X-API-key' : configfile.purestakeapi,
      }
      //const client = new algosdk.Algodv2('', 'https://algoindexer.testnet.algoexplorerapi.io', '');            
      let client = new algosdk.Algodv2(token, baseServer, port);                
      ( async() => {
      //let accountById = await indexClient.lookupAccountByID(localStorage.getItem("walletAddress")).do();
      //let account1_info = (await client.lookupAccountBalances(localStorage.getItem('wallet')).do());      
      let account1_info = (await client.accountInformation(localStorage.getItem('wallet')).do());      
      // calc=JSON.stringify(account1_info.amount)/1000000;      
      setalgobalanceApp(JSON.stringify(account1_info.amount)/1000000);      
      localStorage.setItem("balget",JSON.stringify(account1_info.amount)/1000000);      
    })().catch(e => {
      //console.log(e);
    })                    
    }        
    }
    listenMMAccount();
    }, []);
    let history=useHistory();
    //const [fileUrl, updateFileUrl] = useState(``)    
    const [show, setShow] = React.useState(false);
    const [tname,setName] = useState("");
    const [tdescription,setDescription] = useState("");        
    const handleClose = () => setShow(false);            
    const [showTest, setShowTest] = React.useState(false);
    const [showTestLoading, setshowTestLoading] = React.useState(false);        
    const [Img,setImg] = useState("")
    const [Imgname,setImgname] = useState("")
    const[getIPro,setgetIPro]=useState([""]);   
    const [showTestAlert,setshowTestAlert] = React.useState(false);   
    const [issuesdisplay,setissuesdisplay]=useState(null) 
    const [showTestOPt,setshowTestOPt] = React.useState(false);      
    console.log("opted",showTestOPt)
    const dbcallOpt=async()=>{                  
      try {                 
        const baseServer = 'https://testnet-algorand.api.purestake.io/ps2';
        const port = '';
        const token = {
          'X-API-key' : `${configfile['purestakeapi']}`,
        }
        const algodClientGet = new algosdk.Algodv2(token, baseServer, port);
        //const algodclient = new algosdk.Algodv2('', 'https://node.testnet.algoexplorerapi.io', '');
        const indexClient = new algosdk.Indexer('', 'https://algoindexer.testnet.algoexplorerapi.io', '');
        //const algodclient = new algosdk.Algodv2('', 'https://algoindexer.testnet.algoexplorerapi.io', '');  
        //let datas= await algodClientGet.accountInformation(localStorage.getItem("walletAddress")).do();     
        //console.log("odata",datas)
        let data = (await indexClient.lookupAccountByID(localStorage.getItem("walletAddress")).do());
        //let data = await algodClientGet.lookupAccountBalances(localStorage.getItem("walletAddress")).do();             
        console.log("odata",data)
        if(data.account['apps-local-state']){
        data['apps-local-state'].map((r,s)=>{
          if(r.id === parseInt(76917406)){
            setshowTestOPt(true)            
          }                          
        })           
      } 
    } catch (error) {
      //console.log('error occured during search', error);    
    }                
    }    
    useEffect(()=>{dbcallOpt()},[])
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
    const captureFile =async(event) => {
        event.stopPropagation()
        event.preventDefault()
        const file = event.target.files[0]
        setImgname(file.name)
        let reader = new window.FileReader()
        try{
        Compress.imageFileResizer(file, 500,500 , 'JPEG', 200, 0,
        uri => {
          //console.log("iuri",uri)
          setImg(uri)
        },
        'base64'
        );
        reader.readAsArrayBuffer(file)
        try {
            //const added = await client.add(file)
            //const url = `https://ipfs.infura.io/ipfs/${added.path}`            
            //updateFileUrl(url)
          } catch (error) {
            //console.log('Error uploading file: ', error)
          }          
        //console.log(reader)    
      }catch (err) {
        //console.error(err);    
        }
    };
    const waitForConfirmation = async function (algodclient, txId) {
        let status = (await algodclient.status().do());
        let lastRound = status["last-round"];
          while (true) {
            const pendingInfo = await algodclient.pendingTransactionInformation(txId).do();
            if (pendingInfo["confirmed-round"] !== null && pendingInfo["confirmed-round"] > 0) {              
              break;
            }
            lastRound++;
            await algodclient.statusAfterBlock(lastRound).do();
          }
    };
    const refreshSale=()=>{
      setshowTestAlert(false)
      //history.push('/')
      //window.location.reload(false)            
    }      
    const onSubmitNFT = async (event) => {        
        var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;          
        if(localStorage.getItem("walletAddress") === null || localStorage.getItem("walletAddress") === undefined || localStorage.getItem("walletAddress") === ''){            
          setissuesdisplay("please connect your wallet")
          setshowTestAlert(true)                      
          //alert("please connect your wallet")
        }          
        else if(tname === "" ){
          setissuesdisplay("please enter NFT Name")
          setshowTestAlert(true)               
          //alert("please enter NFT Name")
        }
        else if(!/\S/.test(tname)){
          setissuesdisplay("only space not allowed")
          setshowTestAlert(true)               
          //alert("only space not allowed")
        }
        else if(format.test(tname)){
          setissuesdisplay("please enter valid NFT Name special character not allowed")
          setshowTestAlert(true)               
          //alert("please enter valid NFT Name special character not allowed")
        }
        else if(Img === "" || Img === null || Img === undefined ){
          setissuesdisplay("please upload image")
          setshowTestAlert(true)               
          //alert("please upload image")
        }          
        else if(algobalanceApp === "" || algobalanceApp === "0" || algobalanceApp === undefined || algobalanceApp === null || algobalanceApp <= 3){
          setissuesdisplay("Insufficient balance to create NFT")
          setshowTestAlert(true)               
          //alert("Insufficient balance to create NFT")
        }
        else{
        try{                    
        setshowTestLoading(true)
        let tb='ASA';      
        //https://testnet-algorand.api.purestake.io/ps2    
        // const server = "https://algoindexer.testnet.algoexplorerapi.io";
        // const port = "";  
        // const token = {
        //   'X-API-key' : `${configfile['purestakeapi']}`,
        // }
        // //const algodclient = new algosdk.Algodv2('', 'https://algoindexer.testnet.algoexplorerapi.io', '');            
        // let algodclient = new algosdk.Algodv2(token, server, port);
        const baseServer = 'https://testnet-algorand.api.purestake.io/ps2';
        const port = '';
        const token = {
          'X-API-key' : `${configfile['purestakeapi']}`,
        }
        const algodClientGet = new algosdk.Algodv2(token, baseServer, port);//get                
        const indexClient = new algosdk.Indexer('', 'https://algoindexer.testnet.algoexplorerapi.io', '');
        //const params = await algodClient.getTransactionParams().do();
        const algodclient = new algosdk.Algodv2('', 'https://node.testnet.algoexplorerapi.io', '');//post
        const params = await algodclient.getTransactionParams().do();
        //console.log("185")        
        params.fee = 1000;
        params.flatFee = true;        
        //const algodclient = new algosdk.Algodv2('', 'https://api.testnet.algoexplorer.io/', '');      
        const myAlgoConnect = new MyAlgoConnect();      
        const txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({    
        from:localStorage.getItem('walletAddress'),
        assetName: tname,
        unitName: tb,
        total: 1,
        decimals: 0,
        note: undefined,        
        assetURL:'https://elementnft.vercel.app/',
        manager:localStorage.getItem('walletAddress'),
        reserve:localStorage.getItem('walletAddress'),
        freeze:localStorage.getItem('walletAddress'),
        clawback:localStorage.getItem('walletAddress'),
        suggestedParams: params
        });      
        const signedTxn = await myAlgoConnect.signTransaction(txn.toByte());
        const response = await algodclient.sendRawTransaction(signedTxn.blob).do();      
        await waitForConfirmation(algodclient,response.txId);
        let ptx = await algodclient.pendingTransactionInformation(response.txId).do();
        let assetID = ptx["asset-index"];   
        if(showTestOPt === true)   {
          storeDbPinataDuplicate(assetID,response.txId,localStorage.getItem('walletAddress'))
        }else{
          appoptin(assetID,response.txId,localStorage.getItem('walletAddress'))              
        }        
    }catch (err) {        
        setshowTestLoading(false)
        setissuesdisplay("your browser appearing issue")
        setshowTestAlert(true)               
        //alert("you wallet raises some issues")
        //window.location.reload(false)
    }
    }          
    }
    
    const appoptin=async(assetID,responsetxId,addresseswall)=>{
      let index = parseInt(configfile['appIdPrice']);      
      //https://api.testnet.algoexplorer.io
      //const algodClient = new algosdk.Algodv2('', 'https://algoindexer.testnet.algoexplorerapi.io', '');            
        const baseServer = 'https://testnet-algorand.api.purestake.io/ps2';
        const port = '';
        const token = {
          'X-API-key' : `${configfile['purestakeapi']}`,
        }
        const algodClientGet = new algosdk.Algodv2(token, baseServer, port);//get                
        const indexClient = new algosdk.Indexer('', 'https://algoindexer.testnet.algoexplorerapi.io', '');
        //const params = await algodClient.getTransactionParams().do();
        const algodclient = new algosdk.Algodv2('', 'https://node.testnet.algoexplorerapi.io', '');//post
      let dataopreplace = dataescrowprice.replaceAll("AppID",configfile['appIdPrice']).replaceAll("AssId",parseInt(assetID))
      let results = await algodclient.compile(dataopreplace).do();                
      let program = new Uint8Array(Buffer.from(results.result, "base64"));      
      let lsig = algosdk.makeLogicSig(program);
      try {                
        const params = await algodclient.getTransactionParams().do();
        let appArg = [];     
        let t1 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
          from:localStorage.getItem('walletAddress'),
          suggestedParams:params,
          to:results.hash,
          amount:900000,
          note: undefined
        });     
        const signedTx = await myAlgoConnect.signTransaction(t1.toByte());           
        const response1 = await algodclient.sendRawTransaction(signedTx.blob).do();
        await waitForConfirmation(algodclient, response1.txId);
        let optinTranscation = algosdk.makeApplicationOptInTxnFromObject({
          from : results.hash,
          suggestedParams:params,
          appIndex:index
        });
        const signedTx1 = await algosdk.signLogicSigTransaction(optinTranscation, lsig);
        const response = await algodclient.sendRawTransaction(signedTx1.blob).do();      
        await waitForConfirmation(algodclient, response.txId);          
        storeDbPinataDuplicate(assetID,response.txId,addresseswall)      
      } catch (err) {        
        storeDbPinataDuplicate(assetID,responsetxId,addresseswall)      
        //setshowTestLoading(false)
        //setissuesdisplay("your browser appearing issue")
        //setshowTestAlert(true)       
        //window.location.reload(false)        
        //alert("you wallet raises some issues")
      }             
    }      

    const storeDbPinataDuplicate=(assetID,responsetxId,addresseswall)=>{
      //setshowTestLoading(false)
      toast.info("Image Uploading in IPFS",{autoClose: 5000}); 
      let appId="76917406";      

      //let ref2=fireDb.database().ref(`imagerefAlgo/${addresseswall}`);
      //let ref2=fireDb.database().ref(`/${addresseswall}`);
      //let ref22=fireDb.database().ref(`imagerefAlgolt`);   
      //let refactivity=fireDb.database().ref(`activitytable/${addresseswall}`);   
      let dateset=new Date().toDateString();     
      //const db = ref2.push().key;                                                
      const JSONBody = {
        "imageurl": Img
      }
      const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
      return axios
          .post(url, JSONBody, {
              headers: {
                  pinata_api_key: configfile['pinataApiKey'],
                  pinata_secret_api_key: configfile['pinataSecretApiKey']
              }
          })
          .then(function (response) {
            toast.success(`Image Uploaded in IPFS ${response.data.IpfsHash}`,{autoClose: 8000});            
            let ipfsurl=`https://ipfs.infura.io/ipfs/${response.data.IpfsHash}`                                                          
            if(getIPro[0].valid === "validated"){
              //toast.success(`Image Uploaded in IPFS ${response.data.IpfsHash}`,{autoClose: 8000});
              //db add here
              // toast.loading(`images uploading ipfs`, {
              // onClose: ('loading') });        
              firebase.auth().signInAnonymously().then((response)=>{      
              let ref2=fireDb.database().ref(`imagerefAlgo/${addresseswall}`);
              let ref22=fireDb.database().ref(`imagerefAlgolt`);   
              let refactivity=fireDb.database().ref(`activitytable/${addresseswall}`);   
              const db = ref2.push().key;                                                
              ref2.child(db).set({
                Assetid:assetID,Imageurl:Img,NFTPrice:"",EscrowAddress:"",keyId:db,
                NFTName:tname,userSymbol:"ASA",Ipfsurl:ipfsurl,ownerAddress:addresseswall,previousoaddress:"",
                TimeStamp:dateset,NFTDescription:tdescription,HistoryAddress:[addresseswall],Appid:appId,valid:"true",
                CreatorAddress:addresseswall
              })
                .then(()=>{
                  refactivity.child(db).set({
                      Assetid:assetID,Imageurl:Img,NFTPrice:"",EscrowAddress:"",keyId:db,
                      NFTName:tname,userSymbol:"ASA",Ipfsurl:ipfsurl,ownerAddress:addresseswall,previousoaddress:"",
                      TimeStamp:dateset,NFTDescription:tdescription,HistoryAddress:[addresseswall],Appid:appId,valid:"true",
                      CreatorAddress:addresseswall
                    })
                      .then(()=>{                                        
                  ref22.child(db).set({
                  Assetid:assetID,Imageurl:Img,NFTPrice:"",EscrowAddress:"",keyId:db,
                  NFTName:tname,userSymbol:"ASA",Ipfsurl:ipfsurl,ownerAddress:addresseswall,previousoaddress:"",
                  TimeStamp:dateset,NFTDescription:tdescription,HistoryAddress:[addresseswall],Appid:appId,valid:"true",
                  CreatorAddress:addresseswall
                    })
                .then(()=>{                                                     
                  toast.success("NFT Minted successfully",{autoClose: 5000})                  
                  let refactivity=firebase.database().ref(`activitytable/${localStorage.getItem('walletAddress')}`);   
                          const db = refactivity.push().key;                         
                          refactivity.child(db).set({
                          Assetid:assetID,Imageurl:Img,NFTPrice:"",
                          EscrowAddress:"Create Asset",keyId:db,
                          NFTName:tname,userSymbol:"ASA",Ipfsurl:"",
                          ownerAddress:localStorage.getItem('walletAddress'),previousoaddress:localStorage.getItem('walletAddress'), 
                          TimeStamp:dateset,NFTDescription:responsetxId,HistoryAddress:"",
                          Appid:"",valid:"",
                          CreatorAddress:localStorage.getItem('walletAddress')
                      })
                          .then(()=>{				
                            setshowTestLoading(false)
                            setShowTest(true)                                                                                         
						        })
              
                })              
                })
              })                                                                                                           
            })
          }
            else{
              //toast.success(`Image Uploaded in IPFS ${response.data.IpfsHash}`,{autoClose: 8000});              
              firebase.auth().signInAnonymously().then((response)=>{      
              let ref2=fireDb.database().ref(`imagerefAlgo/${addresseswall}`);
              let ref22=fireDb.database().ref(`imagerefAlgolt`);   
              let refactivity=fireDb.database().ref(`activitytable/${addresseswall}`);   
              const db = ref2.push().key;                                                
              ref2.child(db).set({
                Assetid:assetID,Imageurl:Img,NFTPrice:"",EscrowAddress:"",keyId:db,
                NFTName:tname,userSymbol:"ASA",Ipfsurl:ipfsurl,ownerAddress:addresseswall,previousoaddress:"",
                TimeStamp:dateset,NFTDescription:tdescription,HistoryAddress:[addresseswall],Appid:appId,valid:"false",
                CreatorAddress:addresseswall
              })
                .then(()=>{
                  refactivity.child(db).set({
                      Assetid:assetID,Imageurl:Img,NFTPrice:"",EscrowAddress:"",keyId:db,
                      NFTName:tname,userSymbol:"ASA",Ipfsurl:ipfsurl,ownerAddress:addresseswall,previousoaddress:"",
                      TimeStamp:dateset,NFTDescription:tdescription,HistoryAddress:[addresseswall],Appid:appId,valid:"false",
                      CreatorAddress:addresseswall
                    })
                      .then(()=>{                                        
                  ref22.child(db).set({
                  Assetid:assetID,Imageurl:Img,NFTPrice:"",EscrowAddress:"",keyId:db,
                  NFTName:tname,userSymbol:"ASA",Ipfsurl:ipfsurl,ownerAddress:addresseswall,previousoaddress:"",
                  TimeStamp:dateset,NFTDescription:tdescription,HistoryAddress:[addresseswall],Appid:appId,valid:"false",
                  CreatorAddress:addresseswall
                    })
                .then(()=>{                                                     
                  toast.success("NFT Minted successfully",{autoClose: 5000})                  
                  let refactivity=firebase.database().ref(`activitytable/${localStorage.getItem('walletAddress')}`);   
                          const db = refactivity.push().key;                         
                          refactivity.child(db).set({
                          Assetid:assetID,Imageurl:Img,NFTPrice:"",
                          EscrowAddress:"Create Asset",keyId:db,
                          NFTName:tname,userSymbol:"ASA",Ipfsurl:"",
                          ownerAddress:localStorage.getItem('walletAddress'),previousoaddress:localStorage.getItem('walletAddress'), 
                          TimeStamp:dateset,NFTDescription:responsetxId,HistoryAddress:"",
                          Appid:"",valid:"",
                          CreatorAddress:localStorage.getItem('walletAddress')
                      })
                          .then(()=>{				
                            setshowTestLoading(false)
                            setShowTest(true)                                                                                         
						        })                  
                })              
                })
              })                                                                                                           
            })
            }                                  
          })
          .catch(function (error) {
              //handle error here
              setissuesdisplay("your browser appearing issue")
              setshowTestAlert(true)               
              console.log("Error1",error)
          });
    }
    const done=()=>{
      history.push("/profilec")
      window.location.reload(false);    
    }


    const CreateSample=()=>{
      let req=[];
      let getalgo=localStorage.getItem("walletAddress");              
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
                  CreatorAddress:value.CreatorAddress
                })                
              });        
            }
            setgetImgreffalgo(req);
          });    
    }
    
    const CreateSampleMartinacode = async()=>{
       //await postdata(78044331,0,78082460,"ELEMA","ALGOA","YJSLFKKX5RT5QIZJKFBLOGD7QL4FQT4572EAF4BHJDUTDQBML5YSEBSOQM",8154556099,11548062391,8370718,"PJS5453L2YTTQMBW4UA7SIEZT4KEOYY4MN3M7NVRGJ5XY23NQRV35YCDHA")
    //await getpostdata("PJS5453L2YTTQMBW4UA7SIEZT4KEOYY4MN3M7NVRGJ5XY23NQRV35YCDHA")
   
    //await deletedata('-N-7giIccgKyHffgEalG','PJS5453L2YTTQMBW4UA7SIEZT4KEOYY4MN3M7NVRGJ5XY23NQRV35YCDHA')
    
     //await getpostdatafilter(78044331,0,8154556098,11548062392,8370719)
     //await getmultiplefilter(78044331,0,8154556098,11548062392,8370719,"PJS5453L2YTTQMBW4UA7SIEZT4KEOYY4MN3M7NVRGJ5XY23NQRV35YCDHA")
     let data=await getAllData()
     console.log("SingleData",data)
    }
    return (
        <Layout>
            <div className="page-content">
            <Container className='container-xs'>
            <><ToastContainer position='top-center' draggable = {false} transition={Zoom} autoClose={8000} closeOnClick = {false}/></>
                <div className="card-bond">
                  <div className="card-bond-inner">
                    <Row className='mb-0'>
                        <Col md={12}>
                            <h4 className='mb-4'>Create single NFT on Algorand</h4>
                        </Col>
                    </Row>
                    <Row className='text-white'>
                        <Col md={12} className='mb-3'>
                            <Row className='align-items-center mb-4'>
                              <Col className='col-auto'>
                            <h5 className='mb-2'>Upload file</h5>
                              </Col>
                              <Col>
                            <div className="upload px-2 py-2">
                                <div>
                                  {Img === "" || Img === null || Img === "" || Img === undefined ? (
                                    <>
                                     {/* GIF, WEBP, MP4 or MP3. Max 100mb. */}
                                    <p className='mb-3 text-white'>PNG,IMG,JPG</p>
                                    <input type="file" hidden name="upload" id='upload' onChange = {captureFile}/>
                                    <label htmlFor="upload" className='btn btn-grad'>Choose File</label>
                                    </>
                                  ):(
                                    <>
                                    <p className='mb-3 text-white'>Images Uploaded: <br /><strong>{Imgname}</strong></p>
                                    <input type="file" hidden name="upload" id='upload' onChange = {captureFile}/>
                                    <label htmlFor="upload" className='btn btn-grad'>Choose File</label>
                                    </>
                                  )}                                    
                                </div>
                            </div>                                        
                              </Col>
                            </Row>
                            <div className="mb-4">                        
                                <h4 className='mb-2'>Name</h4>
                                <InputGroup className="mb-4 input-group-field" onChange={event => setName(event.target.value)}>
                                    <Form.Control
                                        placeholder='Enter Asset Title  '
                                    />
                                </InputGroup>
                                <h4 className='mb-2'>Description <small>(Optional)</small></h4>
                                <InputGroup className="mb-2 input-group-field" onChange={event => setDescription(event.target.value)}>
                                    <Form.Control
                                        placeholder=' Enter Description '
                                    />
                                </InputGroup>                                
                            </div>
                            <div className="d-flex flex-wrap justify-content-between align-items-center">
                                <Button variant='grad' size="lg" onClick={()=>onSubmitNFT()}>Create item</Button>                                                                
                                <Button variant='grad' size="lg" onClick={()=>CreateSample()}>Create Sample</Button>                                
                                <Button variant='grad' size="lg" onClick={()=>CreateSampleMartinacode()}>Create Martina code</Button>                                
                            </div>                                                        
                        </Col>                        
                    </Row>
                  </div>
                </div>
            </Container>
            <Modal show={show} centered size="sm" onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Collection</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex mb-4">
                        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMDAnIGhlaWdodD0nMTAwJyBzdHlsZT0nYmFja2dyb3VuZC1jb2xvcjpyZ2JhKDI0NiwyNDYsMjQ2LDEpOyc+PGcgc3R5bGU9J2ZpbGw6cmdiYSgyMTcsMzgsMzgsMSk7IHN0cm9rZTpyZ2JhKDIxNywzOCwzOCwxKTsgc3Ryb2tlLXdpZHRoOjAuNTsnPjxyZWN0ICB4PSc0NicgeT0nMzAnIHdpZHRoPSc4JyBoZWlnaHQ9JzgnLz48cmVjdCAgeD0nNDYnIHk9JzM4JyB3aWR0aD0nOCcgaGVpZ2h0PSc4Jy8+PHJlY3QgIHg9JzQ2JyB5PSc0Nicgd2lkdGg9JzgnIGhlaWdodD0nOCcvPjxyZWN0ICB4PSc0NicgeT0nNTQnIHdpZHRoPSc4JyBoZWlnaHQ9JzgnLz48cmVjdCAgeD0nNDYnIHk9JzYyJyB3aWR0aD0nOCcgaGVpZ2h0PSc4Jy8+PHJlY3QgIHg9JzM4JyB5PSczMCcgd2lkdGg9JzgnIGhlaWdodD0nOCcvPjxyZWN0ICB4PSc1NCcgeT0nMzAnIHdpZHRoPSc4JyBoZWlnaHQ9JzgnLz48cmVjdCAgeD0nMzgnIHk9JzM4JyB3aWR0aD0nOCcgaGVpZ2h0PSc4Jy8+PHJlY3QgIHg9JzU0JyB5PSczOCcgd2lkdGg9JzgnIGhlaWdodD0nOCcvPjxyZWN0ICB4PSczOCcgeT0nNDYnIHdpZHRoPSc4JyBoZWlnaHQ9JzgnLz48cmVjdCAgeD0nNTQnIHk9JzQ2JyB3aWR0aD0nOCcgaGVpZ2h0PSc4Jy8+PHJlY3QgIHg9JzM4JyB5PSc1NCcgd2lkdGg9JzgnIGhlaWdodD0nOCcvPjxyZWN0ICB4PSc1NCcgeT0nNTQnIHdpZHRoPSc4JyBoZWlnaHQ9JzgnLz48cmVjdCAgeD0nMzgnIHk9JzYyJyB3aWR0aD0nOCcgaGVpZ2h0PSc4Jy8+PHJlY3QgIHg9JzU0JyB5PSc2Micgd2lkdGg9JzgnIGhlaWdodD0nOCcvPjxyZWN0ICB4PSczMCcgeT0nMzAnIHdpZHRoPSc4JyBoZWlnaHQ9JzgnLz48cmVjdCAgeD0nNjInIHk9JzMwJyB3aWR0aD0nOCcgaGVpZ2h0PSc4Jy8+PHJlY3QgIHg9JzMwJyB5PSczOCcgd2lkdGg9JzgnIGhlaWdodD0nOCcvPjxyZWN0ICB4PSc2MicgeT0nMzgnIHdpZHRoPSc4JyBoZWlnaHQ9JzgnLz48cmVjdCAgeD0nMzAnIHk9JzQ2JyB3aWR0aD0nOCcgaGVpZ2h0PSc4Jy8+PHJlY3QgIHg9JzYyJyB5PSc0Nicgd2lkdGg9JzgnIGhlaWdodD0nOCcvPjxyZWN0ICB4PSczMCcgeT0nNTQnIHdpZHRoPSc4JyBoZWlnaHQ9JzgnLz48cmVjdCAgeD0nNjInIHk9JzU0JyB3aWR0aD0nOCcgaGVpZ2h0PSc4Jy8+PHJlY3QgIHg9JzMwJyB5PSc2Micgd2lkdGg9JzgnIGhlaWdodD0nOCcvPjxyZWN0ICB4PSc2MicgeT0nNjInIHdpZHRoPSc4JyBoZWlnaHQ9JzgnLz48L2c+PC9zdmc+" alt="icon" />
                        <div className='ms-3'>
                            <p className='mb-3'>We recommend an image of at least 500x500. Gifs work too.</p>
                            <input type="file" hidden id='upload-2' />
                            <label htmlFor="upload-2" className='btn btn-light-blue'>Choose File</label>
                        </div>
                    </div>
                    <h4 className='mb-2'>Display name <small>(required)</small></h4>
                    <InputGroup className="mb-2 input-group-field">
                        <Form.Control
                            placeholder='Enter collection name'
                        />
                    </InputGroup>
                    <p className='mb-4'>Token name cannot be changed in future</p>
                    <h4 className='mb-2'>Symbol <small>(required)</small></h4>
                    <InputGroup className="mb-4 input-group-field">
                        <Form.Control
                            placeholder='Enter token symbol'
                        />
                    </InputGroup>
                    <h4 className='mb-2'>Description <small>(required)</small></h4>
                    <InputGroup className="mb-4 input-group-field" onChange={event => setDescription( event.target.value)}>
                        <Form.Control
                            placeholder='Spread some words about your token collection'
                        />
                    </InputGroup>
                    <h4 className='mb-2'>Short url <small>(required)</small></h4>
                    <InputGroup className="mb-2 input-group-field">
                        <InputGroup.Text className='ps-0' id="basic-addon1">ELEMENT.com/</InputGroup.Text>
                        <Form.Control
                            placeholder='Enter short url'
                        />
                    </InputGroup>
                    <p className='mb-4'>Will be used as public URL</p>
                    <Button className='w-100' variant='grad'>Create collection</Button>
                </Modal.Body>
            </Modal>
            {/* onHide={handleCloseTest} */}
            <Modal show={showTest} centered size="sm" >
                <Modal.Body>
                    <div className="text-center py-4">
                        <h4 className='mb-2'>NFT Created Successfully</h4>
                    </div>
                    <Button variant="grad" size="lg" className='w-100' onClick={()=>done()}>Done</Button>
                </Modal.Body>
            </Modal>
            {/* onHide={handleCloseTestLoading} */}
            <Modal show={showTestLoading} centered size="sm" >
                <Modal.Body>
                    <div className="text-center py-4">                        
                        <img src={logogif} alt="loading..." />
                    </div>                    
                </Modal.Body>
            </Modal>         
            <Modal show={showTestAlert} centered size="sm" >
                <Modal.Body>
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

export default Single;

// closeButton