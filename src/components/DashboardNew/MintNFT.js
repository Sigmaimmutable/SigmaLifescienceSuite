import React,{useEffect,useState} from 'react';
import Layout from './LayoutT';
import { Link ,useHistory} from 'react-router-dom';
import { Card, Col, Container, Row, Button, Form} from 'react-bootstrap';
import ButtonLoad from 'react-bootstrap-button-loader';
import Icon1 from '../../assets/images/elem-original.png';
import firebase from '../../NFTFolder/firebase';
import fireDb from '../../NFTFolder/firebase';
import Compress from "react-image-file-resizer";
import logogif from '../../assets/images/gif4.gif';
import { ToastContainer, Zoom, toast} from 'react-toastify';
import configfile from '../../NFTFolder/config.json'
import dataescrowprice from "../../NFTFolder/escrowpricenew";
import MyAlgoConnect from '@randlabs/myalgo-connect';
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import { formatJsonRpcRequest } from "@json-rpc-tools/utils";
import { minAlgoBalance } from '../formula';
import node from './nodeapi.json';
import ls from 'ipfs-api/src/ls';
const axios = require('axios');
const algosdk = require('algosdk'); 
const myAlgoConnect = new MyAlgoConnect();
const myAlgoWallet = new MyAlgoConnect({ disableLedgerNano: false });
const bridge = "https://bridge.walletconnect.org";


const MintNFT = () => {
    useEffect(() => {
      document.title = "ELEMENT | MintNFT"
    }, [])
    let history=useHistory();    
    const [MintStart,setMinStart] = useState(false) 
    //const [displayeMessagee,setdisplayeMessagee] = useState("") 
    //const [displayeMessagew,setdisplayeMessagew] = useState("") 
    //const [displayeMessages,setdisplayeMessages] = useState("") 
    // const [showTest, setShowTest] = React.useState(false);
    // const [showTestLoading, setshowTestLoading] = React.useState(false);    
    // const [showTestAlert,setshowTestAlert] = React.useState(false);   
    // const [issuesdisplay,setissuesdisplay]=useState(null)         
    //const [showTestOPt,setshowTestOPt] = React.useState(false);      
    const [algobalanceApp,setalgobalanceApp] = useState("");    
    const [selectValue,setSelectValue] = useState("Image");
    const [selectValue2,setSelectValue2] = useState("Sports");    
    const [Check,setCheck] = useState(false);    
    const [Name,setName] = useState("");
    const [Links,setLink] = useState("");
    const [Description,setDescription] = useState("");
    const [Img,setImg] = useState("")
    const [Imgname,setImgname] = useState("") 
    const[getIProfile,setgetIProfile]=useState([""]);  
    // console.log("checkprofile",getIProfile)       
    const indexClient = new algosdk.Indexer('', node['indexerclient'], '');
    const algodClient = new algosdk.Algodv2('', node['algodclient'], '');
    const[loader, setLoader] = useState(false);
    const handleShowLoad = () => setLoader(true);
    const handleHideLoad = () => setLoader(false);
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
    const dbcallProfile=async()=>{            
        let r=[];
        try {         
        firebase.auth().signInAnonymously().then((response)=>{      
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
                WalletAddress: data.val().walletAddress,
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
      } catch (error) {
        //console.log('error occured during search', error);    
      }                
    }    
    useEffect(()=>{dbcallProfile()},[])


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
    // const dbcallOpt=async()=>{                  
    //     try {                 
    //       // const baseServer = 'https://testnet-algorand.api.purestake.io/ps2';
    //       // const port = '';
    //       // const token = {
    //       //   'X-API-key' : `${configfile['purestakeapi']}`,
    //       // }
    //       //const algodClientGet = new algosdk.Algodv2(token, baseServer, port);
    //       //const algodclient = new algosdk.Algodv2('', 'https://node.testnet.algoexplorerapi.io', '');
    //       //const indexClient = new algosdk.Indexer('', 'https://algoindexer.testnet.algoexplorerapi.io', '');
    //       //const algodclient = new algosdk.Algodv2('', 'https://algoindexer.testnet.algoexplorerapi.io', '');  
    //       //let datas= await algodClientGet.accountInformation(localStorage.getItem("walletAddress")).do();     
    //       //console.log("odata",datas)
    //       let data = (await indexClient.lookupAccountByID(localStorage.getItem("walletAddress")).do());
    //       //let data = await algodClientGet.lookupAccountBalances(localStorage.getItem("walletAddress")).do();             
    //       console.log("odata",data)
    //       if(data.account['apps-local-state']){
    //       data['apps-local-state'].map((r,s)=>{
    //         if(r.id === parseInt(76917406)){
    //           setshowTestOPt(true)            
    //         }                          
    //       })           
    //     } 
    //   } catch (error) {
    //     //console.log('error occured during search', error);    
    //   }                
    // }    
    // useEffect(()=>{dbcallOpt()},[])
    // const popupBlockerChecker = {
    //   check: function(popup_window){
    //       var scope = this;
    //       if (popup_window) {
    //           if(/chrome/.test(navigator.userAgent.toLowerCase())){
    //               setTimeout(function () {
    //                   scope.is_popup_blocked(scope, popup_window);
    //               },200);
    //           }else{
    //               popup_window.onload = function () {
    //                   scope.is_popup_blocked(scope, popup_window);
    //               };
    //           }
    //       } else {
    //           scope.displayError();
    //       }
    //   },
    //   is_popup_blocked: function(scope, popup_window){
    //       if ((popup_window.innerHeight > 0)==false){ 
    //           scope.displayError();
    //       }
    //   },
    //   displayError: function(){
    //      alert("Popup Blocker is enabled! Please add this site to your exception list.");
    //   }
    // };
    // var isPopupBlockerActivated = function(popupWindow) {
    //   if (popupWindow) {
    //       if (/chrome/.test(navigator.userAgent.toLowerCase())) {
    //           try {
    //               popupWindow.focus();
    //           } catch (e) {
    //               return true;
    //           }
    //       } else {
    //           popupWindow.onload = function() {
    //               return (popupWindow.innerHeight > 0) === false;
    //           };
    //       }
    //   } else {
    //       return true;
    //   }
    //   return false;
    // };
    const mintAppNFT =async() =>{
      var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;          
        if(localStorage.getItem("walletAddress") === null || localStorage.getItem("walletAddress") === undefined || localStorage.getItem("walletAddress") === ''){            
          //setissuesdisplay("please connect your wallet")
          //setshowTestAlert(true)                      
          toast.warning(`please connect your wallet`,{autoClose: 5000});            
          handleHideLoad()           
          //setdisplayeMessagew("please connect your wallet")

        }
        else if(Name === "" || Name  === undefined || Name === null){
          //setissuesdisplay("please enter NFT Name")
          //setshowTestAlert(true)               
          toast.warning(`please enter NFT Name`,{autoClose: 5000}); 
          handleHideLoad()           
          //setdisplayeMessagew("please enter NFT Name")
        }
        else if(!/\S/.test(Name)){
          //setissuesdisplay("only space not allowed")
          //setshowTestAlert(true)               
          toast.warning(`only space not allowed`,{autoClose: 5000});            
          handleHideLoad()           
          //setdisplayeMessagew("only space not allowed")
        }
        else if(format.test(Name)){
          //setissuesdisplay("please enter valid NFT Name special character not allowed")
          //setshowTestAlert(true)               
          toast.warning(`please enter valid NFT Name special character not allowed`,{autoClose: 5000});            
          handleHideLoad()           
          //setdisplayeMessagew("please enter valid NFT Name special character not allowed")
        }        
        // else if(Links === null || Links === undefined || Links === ""){
        //   //setissuesdisplay("please enter Link")
        //   //setshowTestAlert(true)               
        //   toast.warning(`please enter Link`,{autoClose: 5000});            
        //   handleHideLoad()           
        //   //setdisplayeMessagew("please enter Link")

        // }
        // else if(Description === "" || Description === undefined || Description === null){
        //   //setissuesdisplay("please enter NFT Description")
        //   //setshowTestAlert(true)               
        //   toast.warning(`please enter NFT Description`,{autoClose: 5000});            
        //   handleHideLoad()           
        //   //setdisplayeMessagew("please enter NFT Description")
        // }
        else if(Img === "" || Img === undefined || Img === null){
          //setissuesdisplay("please Upload Image")
          //setshowTestAlert(true)               
          toast.warning(`please Upload Image`,{autoClose: 5000});            
          handleHideLoad()           
          //setdisplayeMessagew("please Upload Image")
        }
        else if(algobalanceApp === "" || algobalanceApp === "0" || algobalanceApp === undefined || algobalanceApp === null || algobalanceApp <= 2){
          //setissuesdisplay("Insufficient balance to create NFT")
          //setshowTestAlert(true)               
          toast.warning(`Insufficient balance to create NFT`,{autoClose: 5000});            
          handleHideLoad()           
          //setdisplayeMessagew("Insufficient balance to create NFT")
        }
        else if( Check === false){
          //setissuesdisplay("please accept declaration")
          //setshowTestAlert(true)               
          toast.warning(`please accept declaration`,{autoClose: 5000});            
          handleHideLoad()           
          //setdisplayeMessagew("please accept declaration")
        }
        else{
        let minbalance=await minAlgoBalance()
        if(minbalance < (900000 + 1000)){
            toast.error("Your Algo balance is low. Please get more Algos from dispenser",{autoClose:5000});  
            handleHideLoad()           
        }
        else{ 
      handleShowLoad()  
      let index = parseInt(configfile['appIdPrice']);              
      let dataopreplace = dataescrowprice.replaceAll("AppID",configfile['appIdPrice']).replaceAll("AssId",parseInt(localStorage.getItem('AssetId')))        
      let results = await algodClient.compile(dataopreplace).do();                
      let program = new Uint8Array(Buffer.from(results.result, "base64"));      
      //let lsig = algosdk.makeLogicSig(program);
      let lsig = new algosdk.LogicSigAccount(program);
      try {                
        const params = await algodClient.getTransactionParams().do();
        params.fee = 1000;
        params.flatFee = true;        
        let appArg = [];     
        const myAlgoConnect = new MyAlgoConnect();      
        let t1 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
          from:localStorage.getItem('walletAddress'),
          suggestedParams:params,
          to:lsig.address(),
          amount:900000,
          note: undefined
        });     
      
        let response = ""
        if(localStorage.getItem("walletName") === "myAlgoWallet"){
          
          const signedTx = await myAlgoConnect.signTransaction(t1.toByte());           
          response = await algodClient.sendRawTransaction(signedTx.blob).do();            
          await waitForConfirmation(algodClient, response.txId);
        }else if( localStorage.getItem("walletName") === "PeraWallet"){
          const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
          //let txId = txn1.txID().toString();
          const txns = [t1]              
          const txnsToSign = txns.map(txn => {
            const encodedTxn = Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString("base64");
            // console.log(encodedTxn);
            return {
              txn: encodedTxn,
          };
        });
        const requestParams = [ txnsToSign ];
        const request = formatJsonRpcRequest("algo_signTxn", requestParams);                      
        const result = await connector.sendCustomRequest(request);           
        const decodedResult = result.map(element => {
          return element ? new Uint8Array(Buffer.from(element, "base64")) : null;
        });
        // send and await        
        response=await algodClient.sendRawTransaction(decodedResult).do();
        await waitForConfirmation(algodClient,response.txId);
        }            
        // const signedTx = await myAlgoConnect.signTransaction(t1.toByte());           
        // const response1 = await algodClient.sendRawTransaction(signedTx.blob).do();
        // await waitForConfirmation(algodClient, response1.txId);          
      try{
        let optinTranscation = algosdk.makeApplicationOptInTxnFromObject({
          from : results.hash,
          suggestedParams:params,
          appIndex:index
        });

        if(localStorage.getItem("walletName") === "myAlgoWallet")
        {            
          const signedTx1 = await algosdk.signLogicSigTransaction(optinTranscation, lsig);
          response = await algodClient.sendRawTransaction(signedTx1.blob).do();                  
          await waitForConfirmation(algodClient, response.txId);          

        }else if(localStorage.getItem("walletName") === "PeraWallet"){                        
        //const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });           
        const signedTx3 = algosdk.signLogicSigTransaction(optinTranscation, lsig);          
        const decodedResult =[]
        decodedResult[0] = signedTx3.blob;
        response = await algodClient.sendRawTransaction(decodedResult).do()
        // console.log("EscandAppOptin",response)
        await waitForConfirmation(algodClient, response.txId);            
        }                              
        let id = "https://testnet.algoexplorer.io/tx/" + response.txId;
        toast.success(toastDiv(id));
        await storeDbPinataDuplicate(localStorage.getItem('AssetId'),response.txId,localStorage.getItem("walletAddress"))      
      }catch(err){
        console.error(err);
        //await storeDbPinataDuplicate(assetID,response.txId,localStorage.getItem("walletAddress"))      
      }          
      } catch (err) {        
        console.error(err);
        toast.warning(`your browser appearing issue`,{autoClose:5000})
        done()        
      }  
    }            
  }           
}
    const mintNFT = async() =>{  
      // console.log("MintNFT")      
        var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;          
        if(localStorage.getItem("walletAddress") === null || localStorage.getItem("walletAddress") === undefined || localStorage.getItem("walletAddress") === ''){            
          //setissuesdisplay("please connect your wallet")
          //setshowTestAlert(true)                      
          toast.warning(`please connect your wallet`,{autoClose: 5000});            
          handleHideLoad()           
          //setdisplayeMessagew("please connect your wallet")

        }
        else if(Name === "" || Name  === undefined || Name === null){
          //setissuesdisplay("please enter NFT Name")
          //setshowTestAlert(true)               
          toast.warning(`please enter NFT Name`,{autoClose: 5000}); 
          handleHideLoad()           
          //setdisplayeMessagew("please enter NFT Name")
        }
        else if(!/\S/.test(Name)){
          //setissuesdisplay("only space not allowed")
          //setshowTestAlert(true)               
          toast.warning(`only space not allowed`,{autoClose: 5000});            
          handleHideLoad()           
          //setdisplayeMessagew("only space not allowed")
        }
        else if(format.test(Name)){
          //setissuesdisplay("please enter valid NFT Name special character not allowed")
          //setshowTestAlert(true)               
          toast.warning(`please enter valid NFT Name special character not allowed`,{autoClose: 5000});            
          handleHideLoad()           
          //setdisplayeMessagew("please enter valid NFT Name special character not allowed")
        }        
        // else if(Links === null || Links === undefined || Links === ""){
        //   //setissuesdisplay("please enter Link")
        //   //setshowTestAlert(true)               
        //   toast.warning(`please enter Link`,{autoClose: 5000});            
        //   handleHideLoad()           
        //   //setdisplayeMessagew("please enter Link")

        // }
        // else if(Description === "" || Description === undefined || Description === null){
        //   //setissuesdisplay("please enter NFT Description")
        //   //setshowTestAlert(true)               
        //   toast.warning(`please enter NFT Description`,{autoClose: 5000});            
        //   handleHideLoad()           
        //   //setdisplayeMessagew("please enter NFT Description")
        // }
        else if(Img === "" || Img === undefined || Img === null){
          //setissuesdisplay("please Upload Image")
          //setshowTestAlert(true)               
          toast.warning(`please Upload Image`,{autoClose: 5000});            
          handleHideLoad()           
          //setdisplayeMessagew("please Upload Image")
        }
        else if(algobalanceApp === "" || algobalanceApp === "0" || algobalanceApp === undefined || algobalanceApp === null || algobalanceApp <= 2){
          //setissuesdisplay("Insufficient balance to create NFT")
          //setshowTestAlert(true)               
          toast.warning(`Insufficient balance to create NFT`,{autoClose: 5000});            
          handleHideLoad()           
          //setdisplayeMessagew("Insufficient balance to create NFT")
        }
        else if( Check === false){
          //setissuesdisplay("please accept declaration")
          //setshowTestAlert(true)               
          toast.warning(`please accept declaration`,{autoClose: 5000});            
          handleHideLoad()           
          //setdisplayeMessagew("please accept declaration")
        }
        else{
        let minbalance=await minAlgoBalance()
        if(minbalance < (101000)){
            toast.error("Your Algo balance is low. Please get more Algos from dispenser",{autoClose:5000});  
            handleHideLoad()           
        }
        else{          
            handleShowLoad()  
            toast.info("Minting ASA",{autoClose: 5000}); 
            //var popup = window.open('https://www.google.com', '_blank');
            // if (isPopupBlockerActivated(window.location.href)) {
            //     // Do what you want.
            //     alert("allow")
            // }     
            // else{
            //   alert("block")
            // }       
            //setshowTestLoading(true)
            let tb='ASA';                  
            // const baseServer = 'https://testnet-algorand.api.purestake.io/ps2';
            // const port = '';
            // const token = {
            //   'X-API-key' : `${configfile['purestakeapi']}`,
            // }
            // const algodClientGet = new algosdk.Algodv2(token, baseServer, port);//get                
            // const indexClient = new algosdk.Indexer('', 'https://algoindexer.testnet.algoexplorerapi.io', '');
            //const params = await algodClient.getTransactionParams().do();
            //const algodclient = new algosdk.Algodv2('', 'https://node.testnet.algoexplorerapi.io', '');//post
            const params = await algodClient.getTransactionParams().do();
            //console.log("185")        
            params.fee = 1000;
            params.flatFee = true;        
            //const algodclient = new algosdk.Algodv2('', 'https://api.testnet.algoexplorer.io/', '');      
            const myAlgoConnect = new MyAlgoConnect();      
            const txn1 = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({    
            from:localStorage.getItem('walletAddress'),
            assetName: Name ,
            unitName: tb,
            total: 1,
            decimals: 0,
            note: undefined,        
            assetURL:'https://devnet.elementfi.io/',
            manager:localStorage.getItem('walletAddress'),
            reserve:localStorage.getItem('walletAddress'),
            freeze:localStorage.getItem('walletAddress'),
            clawback:localStorage.getItem('walletAddress'),
            suggestedParams: params
            });      
            let response;
            try{
            if(localStorage.getItem("walletName") === "myAlgoWallet"){
              const signedTxn = await myAlgoConnect.signTransaction(txn1.toByte());
              response = await algodClient.sendRawTransaction(signedTxn.blob).do(); 
              await waitForConfirmation(algodClient, response.txId);
            }else if( localStorage.getItem("walletName") === "PeraWallet"){
              const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
              //let txId = txn1.txID().toString();
              const txns = [txn1]              
              const txnsToSign = txns.map(txn => {
                const encodedTxn = Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString("base64");
                // console.log(encodedTxn);
                return {
                  txn: encodedTxn,
              };
            });
        
            // console.log("283",txnsToSign)
            const requestParams = [ txnsToSign ];
            const request = formatJsonRpcRequest("algo_signTxn", requestParams);            
            // console.log("287",request)           

            const result = await connector.sendCustomRequest(request); 
            // console.log("289",result)           
            const decodedResult = result.map(element => {
              return element ? new Uint8Array(Buffer.from(element, "base64")) : null;
            });

            // console.log("292",decodedResult)
            // send and await        
            response=await algodClient.sendRawTransaction(decodedResult).do();
            await waitForConfirmation(algodClient,response.txId);
            }            
            let ptx = await algodClient.pendingTransactionInformation(response.txId).do();
            let assetID = ptx["asset-index"];   
            // console.log("213",assetID)
            localStorage.setItem("AssetId",assetID)
            toast.success("Mint ASA successful",{autoClose: 5000}); 
            setMinStart(true)
            handleHideLoad()           
            
            //if(showTestOPt === true)   {
              //storeDbPinataDuplicate(assetID,response.txId,localStorage.getItem('walletAddress'))
            //}else{
            //appoptin(assetID,response.txId,localStorage.getItem('walletAddress'))              
            //}                
        }catch (err) {                    
            console.error(err);
            //setshowTestLoading(false)
            //setissuesdisplay("your browser appearing issue")
            //setshowTestAlert(true)               
            toast.error("your browser appearing issue",{autoClose: 5000});     
            //setdisplayeMessagee("your browser appearing issue")            
            handleHideLoad()
            done()
            //alert("you wallet raises some issues")
            //window.location.reload(false)
        }
        }            
        }
    }

    // const appoptin=async(assetID,responsetxId,addresseswall)=>{
    //     let index = parseInt(configfile['appIdPrice']);              
    //       // const baseServer = 'https://testnet-algorand.api.purestake.io/ps2';
    //       // const port = '';
    //       // const token = {
    //       //   'X-API-key' : `${configfile['purestakeapi']}`,
    //       // }
    //       // const algodClientGet = new algosdk.Algodv2(token, baseServer, port);//get                
    //       // const indexClient = new algosdk.Indexer('', 'https://algoindexer.testnet.algoexplorerapi.io', '');          
    //       // const algodclient = new algosdk.Algodv2('', 'https://node.testnet.algoexplorerapi.io', '');//post        
    // }      

    const storeDbPinataDuplicate=(assetID,responsetxId,addresseswall)=>{
        //setshowTestLoading(false)
        toast.info("Image Uploading in IPFS",{autoClose: 5000}); 
        let appId="76917406";                
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
              toast.dismiss()
              toast.success(`Image Uploaded in IPFS ${response.data.IpfsHash}`,{autoClose: 8000});            
              let ipfsurl=`https://ipfs.infura.io/ipfs/${response.data.IpfsHash}`                                                          
              if(getIProfile[0].valid === "validated"){                
                firebase.auth().signInAnonymously().then((response)=>{      
                let ref2=fireDb.database().ref(`imagerefAlgo/${addresseswall}`);
                let ref22=fireDb.database().ref(`imagerefAlgolt`);   
                let refactivity=fireDb.database().ref(`activitytable/${addresseswall}`);   
                const db = ref2.push().key;                                                
                ref2.child(db).set({
                  Assetid:assetID,Imageurl:Img,NFTPrice:"",EscrowAddress:"",keyId:db,
                  NFTName:Name,userSymbol:"ASA",Ipfsurl:ipfsurl,ownerAddress:addresseswall,previousoaddress:"",
                  TimeStamp:dateset,NFTDescription:Description,HistoryAddress:[addresseswall],Appid:appId,valid:"true",
                  CreatorAddress:addresseswall,NFTType:selectValue,NFTChannel:selectValue2,SocialLink:Links
                })
                  .then(()=>{
                    refactivity.child(db).set({
                        Assetid:assetID,Imageurl:Img,NFTPrice:"",EscrowAddress:"",keyId:db,
                        NFTName:Name,userSymbol:"ASA",Ipfsurl:ipfsurl,ownerAddress:addresseswall,previousoaddress:"",
                        TimeStamp:dateset,NFTDescription:Description,HistoryAddress:[addresseswall],Appid:appId,valid:"true",
                        CreatorAddress:addresseswall,NFTType:selectValue,NFTChannel:selectValue2,SocialLink:Links
                      })
                    .then(()=>{                                        
                    ref22.child(db).set({
                    Assetid:assetID,Imageurl:Img,NFTPrice:"",EscrowAddress:"",keyId:db,
                    NFTName:Name,userSymbol:"ASA",Ipfsurl:ipfsurl,ownerAddress:addresseswall,previousoaddress:"",
                    TimeStamp:dateset,NFTDescription:Description,HistoryAddress:[addresseswall],Appid:appId,valid:"true",
                    CreatorAddress:addresseswall,NFTType:selectValue,NFTChannel:selectValue2,SocialLink:Links
                      })
                  .then(()=>{                                                     
                    //toast.success("NFT Minted successfully",{autoClose: 5000})                  
                    let refactivity=firebase.database().ref(`activitytable/${localStorage.getItem('walletAddress')}`);   
                            const db = refactivity.push().key;                         
                            refactivity.child(db).set({
                            Assetid:assetID,Imageurl:Img,NFTPrice:"",
                            EscrowAddress:"Create Asset",keyId:db,
                            NFTName:Name,userSymbol:"ASA",Ipfsurl:"",
                            ownerAddress:localStorage.getItem('walletAddress'),previousoaddress:localStorage.getItem('walletAddress'), 
                            TimeStamp:dateset,NFTDescription:responsetxId,HistoryAddress:"",
                            Appid:"",valid:"",
                            CreatorAddress:localStorage.getItem('walletAddress'),
                            NFTType:selectValue,NFTChannel:selectValue2,SocialLink:Links
                        })
                            .then(()=>{	
                              toast.dismiss()
                              toast.success(`NFT Minted Successfuly`,{autoClose: 5000});                                          
                              //setdisplayeMessages("NFT Created Successfully")                              
                              handleHideLoad()
                              done2(); 
                              //setshowTestLoading(false)
                              //setShowTest(true)     
                              //alert("NFT created")                                                                                    
                              //window.location.reload(false)
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
                  NFTName:Name,userSymbol:"ASA",Ipfsurl:ipfsurl,ownerAddress:addresseswall,previousoaddress:"",
                  TimeStamp:dateset,NFTDescription:Description,HistoryAddress:[addresseswall],Appid:appId,valid:"false",
                  CreatorAddress:addresseswall,NFTType:selectValue,NFTChannel:selectValue2,SocialLink:Links
                })
                  .then(()=>{
                    refactivity.child(db).set({
                        Assetid:assetID,Imageurl:Img,NFTPrice:"",EscrowAddress:"",keyId:db,
                        NFTName:Name,userSymbol:"ASA",Ipfsurl:ipfsurl,ownerAddress:addresseswall,previousoaddress:"",
                        TimeStamp:dateset,NFTDescription:Description,HistoryAddress:[addresseswall],Appid:appId,valid:"false",
                        CreatorAddress:addresseswall,NFTType:selectValue,NFTChannel:selectValue2,SocialLink:Links
                      })
                        .then(()=>{                                        
                    ref22.child(db).set({
                    Assetid:assetID,Imageurl:Img,NFTPrice:"",EscrowAddress:"",keyId:db,
                    NFTName:Name,userSymbol:"ASA",Ipfsurl:ipfsurl,ownerAddress:addresseswall,previousoaddress:"",
                    TimeStamp:dateset,NFTDescription:Description,HistoryAddress:[addresseswall],Appid:appId,valid:"false",
                    CreatorAddress:addresseswall,NFTType:selectValue,NFTChannel:selectValue2,SocialLink:Links
                      })
                  .then(()=>{                                                     
                    //toast.success("NFT Minted successfully",{autoClose: 5000})                  
                    //let refactivity=firebase.database().ref(`activitytable/${localStorage.getItem('walletAddress')}`);   
                            //const db = refactivity.push().key;                         
                            refactivity.child(db).set({
                            Assetid:assetID,Imageurl:Img,NFTPrice:"",
                            EscrowAddress:"Create Asset",keyId:db,
                            NFTName:Name,userSymbol:"ASA",Ipfsurl:"",
                            ownerAddress:localStorage.getItem('walletAddress'),previousoaddress:localStorage.getItem('walletAddress'), 
                            TimeStamp:dateset,NFTDescription:responsetxId,HistoryAddress:"",
                            Appid:"",valid:"",
                            CreatorAddress:localStorage.getItem('walletAddress'),
                            NFTType:selectValue,NFTChannel:selectValue2,SocialLink:Links
                        })
                            .then(()=>{				
                                //alert("NFT created")                                                                                    
                                //window.location.reload(false)
                              //setshowTestLoading(false)
                              // let id = "https://testnet.algoexplorer.io/tx/" + txId;
                              // toast.success(toastDiv(id));
                              toast.dismiss()
                              toast.success(`NFT Minted Successfuly`,{autoClose: 5000});                                          
                              handleHideLoad()
                              done2();                              
                              //setShowTest(true)                                                                                         
                    })                  
                  })              
                  })
                })                                                                                                           
              })
              }                                  
            })
            .catch(function (error) {
                //handle error here
                //setissuesdisplay("your browser appearing issue")
                //setshowTestAlert(true)               
                //alertOpenerror()
                //setdisplayeMessagee("your browser appearing issue")
                toast.dismiss()
                toast.error(`your browser appearing issue`,{autoClose: 5000});            
                handleHideLoad()
                done();
                // console.log("Error1",error)
            });
    }
    

    const handleChange = (e)=>{
        setSelectValue(e.target.value)
    }
    const handleChange2 = (e)=>{
        setSelectValue2(e.target.value)
    }
    const handleChange3 = (e)=>{
        setCheck(e.target.checked)
    }
    // const refreshSale=()=>{
    //   //setshowTestAlert(false)
    //   //history.push('/')
    //   //window.location.reload(false)            
    // }  
    
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
   }
    const done=async()=>{
      await sleep(7000);
      history.push("/Mint-NFT")
      //window.location.reload(false);    
    } 
    const done2=async()=>{
      await sleep(5000);
      history.push("/my-NFT")
      window.location.reload(false);    
    }
    const toastDiv = (txId) =>
    (
    <div>
         <p> Transaction is successful &nbsp;<a style={{color:'#133ac6'}} href={txId} target="_blank" rel="noreferrer"><br/><p style={{fontWeight: 'bold'}}>View in Algoexplorer <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M11.7176 3.97604L1.69366 14L0.046875 12.3532L10.0697 2.32926H1.23596V0H14.0469V12.8109H11.7176V3.97604Z" fill="#133ac6"/>
          </svg></p></a></p>  
     </div>
    );

    const clearImage = () =>{
      setImg("")
    }

    return (
        <Layout>
            <Container>
            <ToastContainer position='bottom-right' draggable = {false} transition={Zoom} autoClose={4000} closeOnClick = {false}/>
                <Row className='justify-content-center'>
                    <Col md={10} lg={7}>
                        <Card className='card-dash border-0 d-block'>
                            <div className='d-flex align-items-start justify-content-between flex-wrap'>
                                {getIProfile === "" || getIProfile === null || getIProfile === undefined || getIProfile[0] === "" || getIProfile[0] === null || getIProfile[0] === undefined ?(
                                    <Link to="/create-artist" className='btn order-2 btn-outline-purple'>Create Artist</Link>
                                ):(
                                    
                                    <p className='btn order-2 btn-outline-purple'>{getIProfile[0].UserName}</p>
                                    // <p></p>
                                )}
                                
                                <div>
                                    <h3 className='mb-1'>ASA Artists</h3>
                                    <p>Mint NFT</p>
                                </div>
                            </div>
                            <hr className='my-4' />

                            <Form>
                                <div className='mb-3'>
                                    <label>NFT Name</label>
                                    <input id="inputID" type="text" placeholder='Enter the nft name' className="form-control form-control-field border-0" onChange={event => setName( event.target.value)}/>
                                </div>
                                <Row>
                                    <Col md={4} xs={6}>
                                        <div className='mb-3'>
                                            <label>Artwork Type</label>
                                            <select className="form-control form-control-field border-0" 
                                            defaultValue={selectValue} 
                                            onChange={handleChange} >                                                
                                                <option value="Image">Image</option>
                                                {/* <option>Video</option>
                                                <option>Gif</option> */}
                                            </select>
                                        </div>
                                    </Col>
                                    <Col md={4} xs={6}>
                                        <div className='mb-3'>
                                            <label>Channel</label>
                                            <select className="form-control form-control-field border-0"
                                            defaultValue={selectValue2} 
                                            onChange={handleChange2}>
                                                <option value="Sports">Sports</option>
                                                <option value="Pet">Pet</option>
                                                <option value="Arts">Arts</option>
                                                <option value="Photography">Photography</option>
                                                <option value="Trading Cards">Trading Cards</option>
                                            </select>
                                        </div>
                                    </Col>
                                </Row>
                                <div className='mb-3'>
                                    <label>Social Media link</label>
                                    <input id="inputID" type="url" placeholder='Enter the valid Link' className="form-control form-control-field border-0" onChange={event => setLink( event.target.value)} />
                                </div>
                                <div className='mb-3'>
                                    <label>Description</label>
                                    <textarea id="inputID" rows="4" placeholder='Write something about your artwork' className="form-control form-control-field border-0"  onChange={event => setDescription( event.target.value)}/>
                                </div>
                                <div className='mb-3'>
                                    <label>Upload</label>

                                    <div className='upload-box text-center'>

                                      {Img === null || Img === "" || Img === undefined ?(
                                        <>
                                        <input id="upload" type="file" hidden onChange = {captureFile}/>
                                        <label htmlFor='upload'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi mb-3 bi-upload" viewBox="0 0 16 16">
                                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                                <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
                                            </svg>
                                            <p id="inputID">Support file : png/img</p>
                                        </label>
                                        </>
                                      ):(
                                        <>
                                        <input id="upload" type="file" hidden onChange = {captureFile}/>
                                        <label htmlFor='Image Uploaded' className='p-2' >                                                                        
                                        <Button variant='link' className='p-0 text-white btn-closeimg' onClick={()=>{clearImage()}}>
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
                                        </Button> 
                                        <img src={Img} alt="Img" className='img-fluid w-100 rounded-16' />            
                                        </label>
                                        </>
                                      )}
                                        
                                    </div>
                                </div>
                                <div className='mb-3'>
                                <Form.Check 
                                    onChange={e => handleChange3(e)}                                    
                                    type="checkbox"
                                    id="terms"
                                    label="I declare that this is an original artwork. I understand that no plagiarism is allowed, and that the artwork can be removed anytime if detected."
                                />
                                </div>
                                {MintStart === false ? (
                                  <ButtonLoad loading={loader} className='w-100 mb-3' onClick={()=>{mintNFT()}}>Mint ASA</ButtonLoad>
                                ):(
                                  <ButtonLoad loading={loader} className='w-100 mb-3' onClick={()=>{mintAppNFT()}}>Mint NFT</ButtonLoad>
                                )}
                                
                                
                                {/* <p className='text-secondary'>Mint an NFT charges 0.01 ASA, please do not upload any sensitive content. <br />MaxSizeVideo: 30M - MaxSizeThumbnail: 10M - Support: MP4/FLV</p> */}
                            </Form>
                        </Card>
                    </Col>
                </Row>
                
            </Container>
        </Layout>
    )
}

export default MintNFT;