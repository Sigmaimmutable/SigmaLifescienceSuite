import React,{useState,useEffect} from 'react';
import Layout from './LayoutT';
import { Link ,useLocation} from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Card, Col, Container, Row, Tabs, Tab, Badge, Button, InputGroup, Form, Dropdown, Table,Modal} from 'react-bootstrap';
import ButtonLoad from 'react-bootstrap-button-loader';
import CardImage from '../../assets/images/card-image.jpg';
import Nobidding from '../../assets/images/nobidding.svg';
import firebase from '../../NFTFolder/firebase';
import fireDb from '../../NFTFolder/firebase';
import MyAlgoConnect from '@randlabs/myalgo-connect';
import configfile from '../../NFTFolder/config.json'
import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';
import dataescrowprice from "../../NFTFolder/escrowpricenew";
import dataelemescrow from "../../NFTFolder/escrowelem";
import logogif from '../../assets/images/gif4.gif';
import Logo from '../../assets/images/algorand-logo.png';
import node from './nodeapi.json';
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import { formatJsonRpcRequest } from "@json-rpc-tools/utils";
import WalletConnect from "@walletconnect/client";
import { minAlgoBalance } from '../formula';
const algosdk = require('algosdk'); 
const algodClientGet = new algosdk.Algodv2('', node['algodclient'], '');
const algodClient = new algosdk.Algodv2('', node['algodclient'], '');
const indexClient = new algosdk.Indexer('', node['indexerclient'], '');
const myAlgoWallet = new MyAlgoConnect();
const bridge = "https://bridge.walletconnect.org";

const NFTDetails = (props) => {
    useEffect(() => {
        document.title = "ELEMENT | NFTDetails"
    }, [])
    const [minAlgo, setMinAlgo] = useState("");
    // console.log("Algomin",minAlgo)
    const [MintStart,setMinStart] = useState(false) 
    const[loader, setLoader] = useState(false);
    const handleShowLoad = () => setLoader(true);
    const handleHideLoad = () => setLoader(false);
    const[algobalanceApp,setalgobalanceApp]=useState([""]);
    // console.log("Algoba",algobalanceApp)
    const location = useLocation();
    const history = useHistory();    
    //console.log("checkState",location.state.allData)
    const[getIProfile,setgetIProfile]=useState([""]);   
    // console.log("checkprofile",getIProfile)

    //const [showTestLoading, setShowTestLoading] = React.useState(false);    ownerAddress
    //const [showTestSale,setshowTestSale] = React.useState(false);   
    //const [showTestAlert,setshowTestAlert] = React.useState(false);   
    //const [issuesdisplay,setissuesdisplay]=useState(null)

    const indexClient = new algosdk.Indexer('', node['indexerclient'], '');
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
    const dbcallPro=async()=>{            
        let r=[];            
            if(location.state === null || location.state === undefined || location.state === "" ){
            }else{
                try {  
                firebase.auth().signInAnonymously().then((response)=>{         
                firebase.database().ref("userprofile").child(location.state.allData.ownerAddress).on("value", (data) => {          
                    if (data) {                      
                        r.push({                
                            Imageurl:data.val().Imageurl,                
                            Bio:data.val().Bio,
                            Customurl: data.val().Customurl,
                            Email: data.val().Email,                            
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
                } catch (error) {
                  //console.log('error occured during search', error);    
                } 

            }
                       
    }    
    useEffect(()=>{dbcallPro()},[])

    const waitForConfirmation = async function (algodclient, txId) {
        let status = (await algodclient.status().do());
        let lastRound = status["last-round"];
          while (true) {
            const pendingInfo = await algodclient.pendingTransactionInformation(txId).do();
            if (pendingInfo["confirmed-round"] !== null && pendingInfo["confirmed-round"] > 0) {
              //Got the completed Transaction
              //console.log("Transaction " + txId + " confirmed in round " + pendingInfo["confirmed-round"]);
              break;
            }
            lastRound++;
            await algodclient.statusAfterBlock(lastRound).do();
          }
    }; 


    const BuyNFT =async()=>{
        if(location.state.allData === null || location.state.allData === "" || location.state.allData === undefined ){
            toast.warning(`Data is Required`,{autoClose:5000})
            handleHideLoad()
            done2()
        }
        else if(location.state === null || location.state === "" || location.state === undefined){
            toast.warning(`Data is Required`,{autoClose:5000})
            handleHideLoad()
            done2()
        }
        else if(localStorage.getItem("walletAddress") === null || localStorage.getItem("walletAddress") === "0x" || localStorage.getItem("walletAddress") === undefined || localStorage.getItem("walletAddress") === ''){
            toast.warning(`please connect wallet`,{autoClose:5000})
            handleHideLoad()
            //setissuesdisplay("please connect wallet")
            //setshowTestAlert(true)
        }
        else if(location.state.allData.ownerAddress === localStorage.getItem("walletAddress"))
        {   
            toast.warning(`please connect Another wallet`,{autoClose:5000})
            handleHideLoad()
            //alert("you are owner so you does not purchase this token")             
            //setissuesdisplay("you are owner")
            //setshowTestAlert(true)
            //window.location.reload(false)                
        }            
        else if(algobalanceApp === 0 || algobalanceApp === ""){
            toast.warning(`your wallet balance below 1`,{autoClose:5000})
            handleHideLoad()
            //setissuesdisplay("your wallet balance below 1")
            //setshowTestAlert(true)          
        }
        else if((parseFloat(location.state.allData.NFTPrice)/1000000) >= algobalanceApp ){
            toast.warning(`your balance not enough to purchase this nft`,{autoClose:5000})
            handleHideLoad()
            //setissuesdisplay("your balance not enough to purchase this nft")
            //setshowTestAlert(true)            
        }        
        else{
        let minbalance=await minAlgoBalance()
        let minAss = await minBal()
        // console.log("MinBal2",minbalance)
        // console.log("MinAss2",minAss)
        let mbalance = (961000+1000+location.state.allData.NFTPrice+1000)
        if(minAss < mbalance){
            console.log("Mbal1",mbalance)
            toast.error("Your Algo balance is low. Please get more Algos from dispenser.",{autoClose:5000});  
            handleHideLoad()
        }
        else if(minbalance < mbalance){
            toast.error("Your Algo balance is low. Please get more Algos from dispenser..",{autoClose:5000});  
            handleHideLoad()
        }
        // else if(minAss < 258000){
        //     toast.error("Your Algo balance is low. Please get more Algos from dispenser...",{autoClose:5000});  
        //     handleHideLoad()
        // }
        else if(algobalanceApp  < ((location.state.allData.NFTPrice/1000000)+2)  )
        {            
            toast.dismiss()
            toast.error("Your Algo balance is low. Please get more Algos from dispenser..",{autoClose:5000});  
            handleHideLoad()
        }
        else{
            handleShowLoad()  
            toast.dismiss();
            let index = parseInt(configfile['appIdPrice']);
            let a=location.state.allData.HistoryAddress.concat(localStorage.getItem('walletAddress'));                                                                      
            toast.info("NFT Purchase InProgress",{autoClose: 5000});  
            let convert95=(((parseFloat(location.state.allData.NFTPrice))/100)*95)    
            let convert5=(((parseFloat(location.state.allData.NFTPrice))/100)*5);            
            const params = await algodClient.getTransactionParams().do();                
            params.fee = 1000;
            params.flatFee = true;              
            let dataopreplace = dataescrowprice.replaceAll("AppID",configfile['appIdPrice']).replaceAll("AssId",parseInt(location.state.allData.Assetid))
            let dataelem = dataelemescrow.replaceAll("AppID",configfile['appIdPrice']).replaceAll("elemId",parseInt(configfile['elemId']))
            let results = await algodClient.compile(dataopreplace).do();                
            let program = new Uint8Array(Buffer.from(results.result, "base64"));      
            //let lsig = algosdk.makeLogicSig(program);                
            let lsig = new algosdk.LogicSigAccount(program);
            let recv_escrow = lsig.address();
            let resultselem = await algodClient.compile(dataelem).do();                
            let programelem = new Uint8Array(Buffer.from(resultselem.result, "base64"));      
            //let lsigelem = algosdk.makeLogicSig(programelem);                            
            let lsigelem = new algosdk.LogicSigAccount(programelem);
            //let recv_escrowlem = lsig.address();
            // console.log("AddressE",recv_escrow)
            let amount = 961000;
        try{            
            let transaction1 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
              from: localStorage.getItem('walletAddress'), 
              to: recv_escrow, 
              amount: amount, 
              note: undefined,  
              suggestedParams: params
             });               
             let appArg = [];
             appArg.push(new Uint8Array(Buffer.from("Buynow")));
             
             //lsig
             const transaction2 = algosdk.makeApplicationNoOpTxnFromObject({
                 from: recv_escrow, 
                 appIndex: index,
                 appArgs: appArg,
                 accounts: [localStorage.getItem('walletAddress')],
                 foreignAssets : [parseInt(location.state.allData.Assetid)],
                 suggestedParams: params
               });
               

               //popup
               let transaction3 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
                from: localStorage.getItem('walletAddress'), 
                to: recv_escrow, 
                amount:parseFloat(location.state.allData.NFTPrice), 
                 note: undefined,  
                 suggestedParams: params
               });

               //lsig
              const transaction4 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                from: recv_escrow,
                to: localStorage.getItem('walletAddress'),
                assetIndex: parseInt(location.state.allData.Assetid),
                note: undefined,
                amount: 1,
                suggestedParams: params
              });
          
               //lsig
              //location.state.allData.NFTPrice
              let transaction5 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
                  from: recv_escrow, 
                  to: location.state.allData.ownerAddress, 
                  amount: parseFloat(convert95), 
                  note: undefined,  
                  suggestedParams: params
               });
                //lsig
               let transaction6 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
                  from: recv_escrow, 
                  to: "JJHBUM7FOLSGD5OPQNLLAHQJ2FDKV2FQKLRJUTZFGOQPYVIH72TNI7Y6YU", 
                  amount: parseFloat(convert5), 
                  note: undefined,  
                  suggestedParams: params
              });    
               //lsig
              const transaction7 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                from: lsigelem.address(),
                to: localStorage.getItem('walletAddress'),
                assetIndex: parseInt(configfile['elemId']),
                note: undefined,
                amount: parseFloat(convert5),
                suggestedParams: params
              });


              
          const groupID = algosdk.computeGroupID([ transaction1, transaction2, transaction3, transaction4,transaction5,transaction6,transaction7]);
          const txs = [ transaction1, transaction2, transaction3, transaction4,transaction5,transaction6,transaction7];
          txs[0].group = groupID;//
          txs[1].group = groupID;
          txs[2].group = groupID;//
          txs[3].group = groupID;
          txs[4].group = groupID;
          txs[5].group = groupID;                  
          txs[6].group = groupID;                  
          let response = ""
          if(localStorage.getItem("walletName") === "myAlgoWallet")
          {
            const signedTx1 = await myAlgoWallet.signTransaction([txs[0].toByte(),txs[2].toByte()]);
            const signedTx2 = algosdk.signLogicSigTransaction(txs[1], lsig);            
            const signedTx3 = algosdk.signLogicSigTransaction(txs[3], lsig);                  
            const signedTx4 = algosdk.signLogicSigTransaction(txs[4], lsig);                  
            const signedTx5 = algosdk.signLogicSigTransaction(txs[5], lsig);                                                
            const signedTx6 = algosdk.signLogicSigTransaction(txs[6], lsigelem);                                                
            response = await algodClient.sendRawTransaction([ signedTx1[0].blob, signedTx2.blob, signedTx1[1].blob, signedTx3.blob,signedTx4.blob,signedTx5.blob,signedTx6.blob]).do();
            //console.log("TxID", JSON.stringify(response, null, 1));
            await waitForConfirmation(algodClient, response.txId);
          }else if(localStorage.getItem("walletName") === "PeraWallet"){
            const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
            const txns = [txs[0], txs[1], txs[2],txs[3],txs[4],txs[5],txs[6]]            
            // console.log("354",txns)
            const txnsToSign = txns.map(txn => {
            const encodedTxn = Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString("base64");
            // console.log("357",encodedTxn);
            return {
            txn: encodedTxn,
            };
            });        
            const signedTx3 = algosdk.signLogicSigTransaction(txs[1], lsig);
            const signedTx4 = algosdk.signLogicSigTransaction(txs[3], lsig);
            const signedTx5 = algosdk.signLogicSigTransaction(txs[4], lsig);
            const signedTx6 = algosdk.signLogicSigTransaction(txs[5], lsig);
            const signedTx7 = algosdk.signLogicSigTransaction(txs[6], lsigelem);
            // console.log("366",signedTx3,signedTx4,signedTx5,signedTx6,signedTx7)
            const requestParams = [ txnsToSign ];
            const request = formatJsonRpcRequest("algo_signTxn", requestParams);
            // console.log("369",request)
            const result = await connector.sendCustomRequest(request);
            // console.log("371",result)
            const decodedResult = result.map(element => {
                return element ? new Uint8Array(Buffer.from(element, "base64")) : null;
            });
            // console.log(result);
            decodedResult[1] = signedTx3.blob;
            decodedResult[3] = signedTx4.blob;
            decodedResult[4] = signedTx5.blob;
            decodedResult[5] = signedTx6.blob;
            decodedResult[6] = signedTx7.blob;

            response = await algodClient.sendRawTransaction(decodedResult).do()
            await waitForConfirmation(algodClient, response.txId);            
          }
                      
          let id = "https://testnet.algoexplorer.io/tx/" + response.txId;
          toast.success(toastDiv(id));
          let dbtxid=response.txId;
          toast.success(`Asset Buying ${response.txId}`,{autoClose: 8000});              
        //db change here
          let a=location.state.allData.HistoryAddress.concat(localStorage.getItem('walletAddress'));              
          let dateset=new Date().toDateString();
          if(location.state.allData.NFTType === undefined || location.state.allData.SocialLink === undefined || location.state.allData.NFTChannel === undefined)
          {
            firebase.auth().signInAnonymously().then((response)=>{                              
                fireDb.database().ref(`imagerefexploreoneAlgos/${location.state.allData.ownerAddress}`).child(location.state.allData.keyId).remove().then(()=>{
                fireDb.database().ref(`imagerefbuy/${localStorage.getItem("walletAddress")}`).child(location.state.allData.keyId).set({
                    Assetid:location.state.allData.Assetid,Imageurl:location.state.allData.Imageurl,NFTPrice:location.state.allData.NFTPrice,
                    EscrowAddress:location.state.allData.EscrowAddress,keyId:location.state.allData.keyId,
                    NFTName:location.state.allData.NFTName,userSymbol:location.state.allData.userSymbol,Ipfsurl:location.state.allData.Ipfsurl,
                    ownerAddress:localStorage.getItem('walletAddress'),previousoaddress:location.state.allData.ownerAddress,
                    TimeStamp:dateset,NFTDescription:location.state.allData.NFTDescription,HistoryAddress:a,
                    Appid:location.state.allData.Appid,valid:location.state.allData.valid,
                    CreatorAddress:location.state.allData.CreatorAddress,NFTType:"",
                    NFTChannel:"",
                    SocialLink:""     
                      }).then(()=>{          
                        let refactivity=fireDb.database().ref(`activitytable/${localStorage.getItem('walletAddress')}`);   
                        const db = refactivity.push().key;                         
                        refactivity.child(db).set({
                        Assetid:location.state.allData.Assetid,Imageurl:location.state.allData.Imageurl,NFTPrice:location.state.allData.NFTPrice,
                        EscrowAddress:"BuyNFT",keyId:db,
                        NFTName:location.state.allData.NFTName,userSymbol:location.state.allData.userSymbol,Ipfsurl:location.state.allData.Ipfsurl,
                        ownerAddress:localStorage.getItem('walletAddress'),previousoaddress:location.state.allData.ownerAddress, 
                        TimeStamp:dateset,NFTDescription:dbtxid,HistoryAddress:a,
                        Appid:location.state.allData.Appid,valid:location.state.allData.valid,
                        CreatorAddress:location.state.allData.CreatorAddress,NFTType:"",
                        NFTChannel:"",
                        SocialLink:""
                    })
                        .then(()=>{     
                            toast.dismiss() 

                            toast.success(`NFT Purchased Successfully`,{autoClose: 8000});
                            //setShowTestLoading(false)
                            handleHideLoad()
                            done()
                            //setshowTestSale(true)              
                        })                        
                        //setShowTestLoading(false)  
                        handleHideLoad()
                        done()
                        //setshowTestSale(true)
                    }) 
                })
              })

          }else{
            firebase.auth().signInAnonymously().then((response)=>{                              
                fireDb.database().ref(`imagerefexploreoneAlgos/${location.state.allData.ownerAddress}`).child(location.state.allData.keyId).remove().then(()=>{
                fireDb.database().ref(`imagerefbuy/${localStorage.getItem("walletAddress")}`).child(location.state.allData.keyId).set({
                    Assetid:location.state.allData.Assetid,Imageurl:location.state.allData.Imageurl,NFTPrice:location.state.allData.NFTPrice,
                    EscrowAddress:location.state.allData.EscrowAddress,keyId:location.state.allData.keyId,
                    NFTName:location.state.allData.NFTName,userSymbol:location.state.allData.userSymbol,Ipfsurl:location.state.allData.Ipfsurl,
                    ownerAddress:localStorage.getItem('walletAddress'),previousoaddress:location.state.allData.ownerAddress,
                    TimeStamp:dateset,NFTDescription:location.state.allData.NFTDescription,HistoryAddress:a,
                    Appid:location.state.allData.Appid,valid:location.state.allData.valid,
                    CreatorAddress:location.state.allData.CreatorAddress,NFTType:location.state.allData.NFTType,
                    NFTChannel:location.state.allData.NFTChannel,
                    SocialLink:location.state.allData.SocialLink      
                      }).then(()=>{          
                        let refactivity=fireDb.database().ref(`activitytable/${localStorage.getItem('walletAddress')}`);   
                        const db = refactivity.push().key;                         
                        refactivity.child(db).set({
                        Assetid:location.state.allData.Assetid,Imageurl:location.state.allData.Imageurl,NFTPrice:location.state.allData.NFTPrice,
                        EscrowAddress:"BuyNFT",keyId:db,
                        NFTName:location.state.allData.NFTName,userSymbol:location.state.allData.userSymbol,Ipfsurl:location.state.allData.Ipfsurl,
                        ownerAddress:localStorage.getItem('walletAddress'),previousoaddress:location.state.allData.ownerAddress, 
                        TimeStamp:dateset,NFTDescription:dbtxid,HistoryAddress:a,
                        Appid:location.state.allData.Appid,valid:location.state.allData.valid,
                        CreatorAddress:location.state.allData.CreatorAddress,NFTType:location.state.allData.NFTType,
                        NFTChannel:location.state.allData.NFTChannel,
                        SocialLink:location.state.allData.SocialLink
                    })
                        .then(()=>{  
                            toast.dismiss()                                                                                    
                            toast.success(`NFT Purchased Successfully`,{autoClose: 8000});
                            //setShowTestLoading(false)
                            handleHideLoad()
                            done()
                            //setshowTestSale(true)              
                        })                        
                        //setShowTestLoading(false)  
                        handleHideLoad()
                        done()
                        //setshowTestSale(true)
                    }) 
                })
              })

          }

        }catch (err) {        
            console.error(err);
            toast.warning(`you are facing error `,{autoClose:5000})
            //done2()          
        }   

        }
        }                    
    }

    const minBal = async () =>
    {
      let min = await algodClientGet.accountInformation(localStorage.getItem("walletAddress")).do();      
      let sub = min['amount'] - min['min-balance']
    //   console.log("minBalances",sub);
      setMinAlgo(sub);      
    }

    const BuyOptNFT=async()=>{
        if(location.state.allData === null || location.state.allData === "" || location.state.allData === undefined ){
            toast.warning(`Data is Required`,{autoClose:5000})
            handleHideLoad()
            done2()
        }
        else if(location.state === null || location.state === "" || location.state === undefined){
            toast.warning(`Data is Required`,{autoClose:5000})
            handleHideLoad()
            done2()
        }
        else{              
        if(localStorage.getItem("walletAddress") === null || localStorage.getItem("walletAddress") === "0x" || localStorage.getItem("walletAddress") === undefined || localStorage.getItem("walletAddress") === ''){
            toast.warning(`please connect wallet`,{autoClose:5000})
            handleHideLoad()
            //setissuesdisplay("please connect wallet")
            //setshowTestAlert(true)
        }
        else{          
        if(location.state.allData.ownerAddress === localStorage.getItem("walletAddress"))
        {   
            toast.warning(`please connect Another wallet`,{autoClose:5000})
            handleHideLoad()
            //alert("you are owner so you does not purchase this token")             
            //setissuesdisplay("you are owner")
            //setshowTestAlert(true)
            //window.location.reload(false)                
        }            
        else{                    
        if(algobalanceApp === 0 || algobalanceApp === ""){
            toast.warning(`your wallet balance below 1`,{autoClose:5000})
            handleHideLoad()
            //setissuesdisplay("your wallet balance below 1")
            //setshowTestAlert(true)          
        }
        else if((parseFloat(location.state.allData.NFTPrice)/1000000) >= algobalanceApp ){
            toast.warning(`your balance not enough to purchase this nft`,{autoClose:5000})
            handleHideLoad()
            //setissuesdisplay("your balance not enough to purchase this nft")
            //setshowTestAlert(true)            
        }        
        else{
        let minbalance=await minAlgoBalance()
        let minAss = await minBal()
        // console.log("MinBal",minbalance)
        // console.log("MinAss",minAss)
        let mbalance = (101000+101000+4000)
        let mbalance2 = (961000+1000+location.state.allData.NFTPrice+1000)
        if(minAss < mbalance){
            toast.dismiss()
            toast.error("Your Algo balance is low. Please get more Algos from dispenser",{autoClose:5000});              
            handleHideLoad()
        }
        else if(minAss < mbalance2){
            toast.dismiss();
            toast.error("Your Algo balance is low. Please get more Algos from dispenser.",{autoClose:5000});  
            handleHideLoad()
        }
        else if(minbalance < mbalance2){
            toast.dismiss();
            toast.error("Your Algo balance is low. Please get more Algos from dispenser.",{autoClose:5000});  
            handleHideLoad()
        }
        else if(minbalance < mbalance){
            toast.dismiss();
            toast.error("Your Algo balance is low. Please get more Algos from dispenser.",{autoClose:5000});  
            handleHideLoad()
        }
        // else if(minAss < 258000){
        //     toast.dismiss()
        //     toast.error("Your Algo balance is low. Please get more Algos from dispenser.",{autoClose:5000});  
        //     handleHideLoad()
        // }
        else if(algobalanceApp  < ((location.state.allData.NFTPrice/1000000)+2)  )
        {            
            toast.dismiss()
            toast.error("Your Algo balance is low. Please get more Algos from dispenser..",{autoClose:5000});  
            handleHideLoad()
        }
        // if(minbalance < (101000+101000+4000)){
        //     toast.error("Your Algo balance is low. Please get more Algos from dispenser",{autoClose:5000});  
        //     handleHideLoad()
        // }
        // else if(minAss < 258000){
        //     toast.error("Your Algo balance is low. Please get more Algos from dispenser.",{autoClose:5000});  
        //     handleHideLoad()
        // }
        else{
            //setShowTestLoading(true)                  
            handleShowLoad()     
            // console.log("BUyDBCheck",location.state.allData)
            const algosdk = require('algosdk');  
            // const baseServer = 'https://testnet-algorand.api.purestake.io/ps2';
            // const port = '';
            // const token = {
            // 'X-API-key' : `${configfile['purestakeapi']}`,
            // }
            //const algodClientGet = new algosdk.Algodv2(token, baseServer, port);//get                
            //const indexClient = new algosdk.Indexer('', 'https://algoindexer.testnet.algoexplorerapi.io', '');
            //const params = await algodClient.getTransactionParams().do();
            //const algodClient = new algosdk.Algodv2('', 'https://node.testnet.algoexplorerapi.io', '');//post
            //const algodClient = new algosdk.Algodv2('', 'https://algoindexer.testnet.algoexplorerapi.io', '');        
            let index = parseInt(configfile['appIdPrice']);
            let a=location.state.allData.HistoryAddress.concat(localStorage.getItem('walletAddress'));                                                          
            let params = await algodClient.getTransactionParams().do();
            //comment out the next two lines to use suggested fee
            params.fee = 1000;
            params.flatFee = true;              
            toast.info("NFT Purchase InProgress",{autoClose: 5000});  
            try {    
            //let convert95=(((parseFloat(location.state.allData.NFTPrice))/100)*95)    
            //let convert5=(((parseFloat(location.state.allData.NFTPrice))/100)*5);            
            const params = await algodClient.getTransactionParams().do();                
            //let dataopreplace = dataescrowprice.replaceAll("AppID",configfile['appIdPrice']).replaceAll("AssId",parseInt(location.state.allData.Assetid))
            let dataelem = dataelemescrow.replaceAll("AppID",configfile['appIdPrice']).replaceAll("elemId",parseInt(configfile['elemId']))
            //let results = await algodClient.compile(dataopreplace).do();                
            //let program = new Uint8Array(Buffer.from(results.result, "base64"));      
            //let lsig = algosdk.makeLogicSig(program);                
            //let lsig = new algosdk.LogicSigAccount(program);
            //let recv_escrow = lsig.address();
            console.log("568",dataelem)
            let resultselem = await algodClient.compile(dataelem).do();                
            console.log("569",resultselem)
            let programelem = new Uint8Array(Buffer.from(resultselem.result, "base64"));      
            //let lsigelem = algosdk.makeLogicSig(programelem);                            
            let lsigelem = new algosdk.LogicSigAccount(programelem);
            console.log("572",lsigelem.address())
            //let recv_escrowlem = lsig.address();
            // console.log("AddressE",recv_escrow)
            //let amount = 961000;
            try{

            
            const transactionass = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                  from: localStorage.getItem('walletAddress'),
                  to: localStorage.getItem('walletAddress'),
                  assetIndex: parseInt(location.state.allData.Assetid),
                  note: undefined,
                  amount: 0,
                  suggestedParams: params
              });
            const transactionelem = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                from: localStorage.getItem('walletAddress'),
                to: localStorage.getItem('walletAddress'),
                assetIndex: parseInt(configfile['elemId']),
                note: undefined,
                amount: 0,
                suggestedParams: params
            });              


            //here popup
              let transactionfund = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
                from: localStorage.getItem('walletAddress'), 
                to: lsigelem.address(), 
                amount: parseInt(3000), 
                note: undefined,  
                suggestedParams: params
               });

             
            
                const groupIDfirst = algosdk.computeGroupID([ transactionass, transactionelem, transactionfund]);
                const txsfirst = [ transactionass, transactionelem, transactionfund];
                txsfirst[0].group = groupIDfirst;
                txsfirst[1].group = groupIDfirst;
                txsfirst[2].group = groupIDfirst;
               let responsefirst =""
               if(localStorage.getItem("walletName") === "myAlgoWallet")
               {                
                const signedTx1first = await myAlgoWallet.signTransaction([txsfirst[0].toByte(),txsfirst[1].toByte(),txsfirst[2].toByte()]);
                responsefirst = await algodClient.sendRawTransaction([signedTx1first[0].blob,signedTx1first[1].blob,signedTx1first[2].blob]).do();                  
                await waitForConfirmation(algodClient, responsefirst.txId);
  
                toast.dismiss()
                toast.success(`Assest opt-in successfull`,{autoClose: 5000});
                handleHideLoad()
                setMinStart(true)                
                }else if(localStorage.getItem("walletName") === "PeraWallet"){
                
                const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
                //const txsfirst = [ transactionass, transactionelem, transactionfund];
                const txns = [txsfirst[0], txsfirst[1], txsfirst[2]]  
                // console.log("236Txns",txns)          
                const txnsToSign = txns.map(txn => {
                const encodedTxn = Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString("base64");
                // console.log("239Enc",encodedTxn);
                return {
                txn: encodedTxn,
                };
                });       

                const requestParams = [ txnsToSign ];
                // console.log("246Re",requestParams)
                const request = formatJsonRpcRequest("algo_signTxn", requestParams);
                // console.log("245Req",request)
                const result = await connector.sendCustomRequest(request);
                // console.log("250Res",result)
                const decodedResult = result.map(element => {
                    return element ? new Uint8Array(Buffer.from(element, "base64")) : null;
                });
                // console.log(result);                
                responsefirst = await algodClient.sendRawTransaction(decodedResult).do()
                await waitForConfirmation(algodClient, responsefirst.txId);  
                toast.dismiss()
                toast.success(`Assest opt-in successfull`,{autoClose: 8000});
                handleHideLoad()
                setMinStart(true)                
                }            
            }catch (err) {        
                console.error(err);
                toast.dismiss()
                toast.warning(`your browser appearing issue .`,{autoClose:5000})
                //done2()          
            }

            //popup             
              
              } catch (err) {
                  console.error("error",err);
                  //setShowTestLoading(false)
                  toast.dismiss()
                  toast.error(`your browser appearing issue`,{autoClose:5000})
                  handleHideLoad()
                  //done2()
                  //handleHideLoad()
                  //toast.dismiss();                
                  //setissuesdisplay("your browser appearing issue")
                  //setshowTestAlert(true)                                        
            }  
        
        }                                                      
        }
        
       
        }
        }
    }
    }        

    // const sharebutton=()=>{        
    //     //setshowShare(true)            
    // }

    // const refreshSale=()=>{
    //     handleHideLoad()
    //     setshowTestSale(false) 
    //     setshowTestAlert(false)
    //     setissuesdisplay(false)    
        
    // }
    // const refreshSale2=()=>{
    //     handleHideLoad()
    //     setshowTestSale(false) 
    //     setshowTestAlert(false)
    //     setissuesdisplay(false)            
    //     history.push('/my-NFT')
    //     window.location.reload(false)                    
    // }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
     }
      const done=async()=>{
        await sleep(7000);
        history.push("/my-NFT")
        window.location.reload(false);    
      } 

      const done2=async()=>{
        await sleep(3000);
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

    return (
        <Layout>
            <Container>
            <ToastContainer position='bottom-right' draggable = {false} transition={Zoom} autoClose={4000} closeOnClick = {false}/>
                <Row className='mb-4'>
                    <Col md={4} className="mb-md-0 mb-4">
                        <Card className='card-dash d-block'>
                        {location.state === null || location.state === "" || location.state === undefined ? ( 
                            <img src={CardImage} alt="img" className='img-fluid rounded-16' />
                        ):(
                            <img src={location.state.allData.Imageurl} alt="img" className='img-fluid' />
                        )}
                            
                        </Card>
                    </Col>
                    <Col md={8}>
                        <Card className='card-dash border-0 d-block'>
                            {getIProfile === "" || getIProfile === null || getIProfile === undefined  || getIProfile[0] === "" || getIProfile[0] === null || getIProfile[0] === undefined ? (
                                <h6 className='subheading mb-0'>Artist : <strong><Link className='text-primary'> {configfile.nullvalue}</Link></strong></h6>
                            ):(
                                <h6 className='subheading mb-0'>Artist : <strong><Link className='text-primary'> {getIProfile[0].UserName}</Link></strong></h6>
                            )}
                            &nbsp;                            
                            {location.state === null || location.state === "" || location.state === undefined ? ( 
                                <>
                                <h2 className='subheading mb-0'>{configfile.nullvalue}</h2>
                                <p>{configfile.nullvalue}</p>                                
                                </>
                            ):(
                                <>
                                <h6 className='subheading mb-0'>NFT Name :  <strong>{location.state.allData.NFTName} </strong></h6>
                                <p>{location.state.allData.NFTDescription}</p>                                
                                </>
                             )}
                            
                            {getIProfile === "" || getIProfile === null || getIProfile === undefined  || getIProfile[0] === "" || getIProfile[0] === null || getIProfile[0] === undefined ? (
                            <>
                            <h3 className='d-flex mb-3 align-items-center'><img src={Logo} alt="logo" className='me-2 avatar-pic' />{configfile.nullvalue}</h3>
                            <Button className='btn btn-blue'>Buy NFT</Button>
                                </>
                            ):(
                            <>
                            <h3 className='d-flex mb-3 align-items-center'><img src={getIProfile[0].Imageurl} alt="logo" className='me-2 avatar-pic' />{(location.state.allData.NFTPrice/1000000)}</h3>
                            {MintStart === false ? (
                                    <ButtonLoad loading={loader} className='btn btn-blue' onClick={()=>{BuyOptNFT()}}>Optin NFT</ButtonLoad>
                                ):(
                                    <ButtonLoad loading={loader} className='btn btn-blue' onClick={()=>{BuyNFT()}}>Buy NFT</ButtonLoad>
                            )}                            
                                </>
                            )}
                        </Card>
                    </Col>
                </Row>
                <Row className='mb-5'>
                    <Col md={4} className="mb-md-0 mb-4">
                        <Card className='card-dash border-0 d-block'>
                            <h3>Item Info</h3>
                            
                            <div className='d-flex mb-2 align-items-center justify-content-between'>
                                <h6 className='subheading mb-0'>NFT Contract :</h6>
                                {location.state === null || location.state === "" || location.state === undefined ? ( 
                                    <strong>{configfile.nullvalue}</strong>
                                ):(
                                    <a href={`https://testnet.algoexplorer.io/address/${location.state.allData.EscrowAddress}`} target="_blank" rel="noopener noreferrer">                                                                    
                                    <strong>{location.state.allData.EscrowAddress.slice(0,8)}....{location.state.allData.EscrowAddress.slice(50,58)}</strong>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi ms-2 bi-box-arrow-up-right" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                                            <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                                    </svg>
                                    </a>
                                )}                                
                                {/* <Link to="/"><strong>0x243...DdE34</strong></Link> */}
                            </div>
                            <div className='d-flex mb-2 align-items-center justify-content-between'>
                                <h6 className='subheading mb-0'>Token ID :</h6>

                                {location.state === null || location.state === "" || location.state === undefined ? ( 
                                    <strong>{configfile.nullvalue}</strong>
                                ):(
                                    <a href={`https://testnet.algoexplorer.io/asset/${location.state.allData.Assetid}`} target="_blank" rel="noopener noreferrer">                                
                                    <strong>{location.state.allData.Assetid}</strong>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi ms-2 bi-box-arrow-up-right" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                                            <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                                            </svg>
                                    </a>
                                )}
                                
                            </div>
                            <div className='d-flex mb-2 align-items-center justify-content-between'>
                                <h6 className='subheading mb-0'>Creator's Address :</h6>
                                {location.state === null || location.state === "" || location.state === undefined ? ( 
                                    <strong>{configfile.nullvalue}</strong>
                                ):(
                                    <a href={`https://testnet.algoexplorer.io/address/${location.state.allData.CreatorAddress}`} target="_blank" rel="noopener noreferrer">                                
                                    <strong>{location.state.allData.CreatorAddress.slice(0,8)}....{location.state.allData.CreatorAddress.slice(50,58)}</strong>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi ms-2 bi-box-arrow-up-right" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                                            <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                                    </svg>
                                    </a>
                                )}                                
                            </div>
                            <div className='d-flex mb-2 align-items-center justify-content-between'>
                                <h6 className='subheading mb-0'>Owner's Address :</h6>
                                {location.state === null || location.state === "" || location.state === undefined ? ( 
                                    <strong>{configfile.nullvalue}</strong>
                                ):(
                                    <a href={`https://testnet.algoexplorer.io/address/${location.state.allData.ownerAddress}`} target="_blank" rel="noopener noreferrer">                                
                                    <strong>{location.state.allData.ownerAddress.slice(0,8)}....{location.state.allData.ownerAddress.slice(50,58)}</strong>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi ms-2 bi-box-arrow-up-right" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                                            <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                                    </svg>
                                    </a>
                                )}                                
                            </div>
                        </Card>
                    </Col>
                    <Col md={8}>
                        <Card className='card-dash mb-4 d-block border-0'>
                            <div className='d-flex flex-wrap flex-lg-nowrap create-art'>
                            {getIProfile === "" || getIProfile === null || getIProfile === undefined  || getIProfile[0] === "" || getIProfile[0] === null || getIProfile[0] === undefined ? (
                                  <img src="https://bscstation.finance/images/logo-defaul.png" alt="art" className='me-3' />
                            ):(
                                <img src={getIProfile[0].Imageurl} alt="art" className='me-3' />
                            )}                              
                                <div className=''>
                                {getIProfile === "" || getIProfile === null || getIProfile === undefined  || getIProfile[0] === "" || getIProfile[0] === null || getIProfile[0] === undefined ? (
                                    <strong>{configfile.nullvalue}</strong>
                                ):(
                                    <h6 className='subheading mb-0'>Artist : &nbsp; <strong>{getIProfile[0].UserName} </strong></h6>
                                )}
                                    
                                    <p className='subheading mb-0'>Social :  &nbsp;
                                    {getIProfile === "" || getIProfile === null || getIProfile === undefined  || getIProfile[0] === "" || getIProfile[0] === null || getIProfile[0] === undefined ? (
                                        <strong>{configfile.nullvalue}</strong>
                                    ):(
                                        <>
                                        {getIProfile[0].Personalsiteurl === "" || getIProfile[0].Personalsiteurl === null || getIProfile[0].Personalsiteurl === undefined  || getIProfile[0] === "" || getIProfile[0] === null || getIProfile[0] === undefined ? (
                                            <>                                            
                                            <strong>{getIProfile[0].Personalsiteurl}</strong>
                                            {/* <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi ms-2 bi-box-arrow-up-right" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                                            <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                                            </svg>                                         */}
                                            </>
                                        ):(
                                        // <a href={`${getIProfile[0].Personalsiteurl}`} target="_blank" rel="noopener noreferrer">                                                                                                            
                                        <>
                                            <strong>{getIProfile[0].Personalsiteurl}</strong>
                                        </>
                                        //     <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi ms-2 bi-box-arrow-up-right" viewBox="0 0 16 16">
                                        //     <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                                        //     <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                                        //     </svg>                                        
                                        // </a>
                                        )}
                                        </>                                        
                                    )}
                                    </p>
                                    <p className='subheading mb-0'>Wallet address :  &nbsp;
                                    {/* {getIProfile === "" || getIProfile === null || getIProfile === undefined  || getIProfile[0] === "" || getIProfile[0] === null || getIProfile[0] === undefined ? (
                                        <strong>NAN</strong>
                                    ):( */}
                                        <>
                                        {(location.state  === null || location.state  === "" || location.state === " " || location.state === undefined || location.state === '') ? (

                                            <a  href={"https://testnet.algoexplorer.io/address/" + configfile.nullvalue} target="_blank" rel="noreferer">
                                            <strong>{configfile.nullvalue}.... </strong>
                                            &nbsp;
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi ms-2 bi-box-arrow-up-right" viewBox="0 0 16 16">
                                                    <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                                                    <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                                                    </svg>
                                            </a>                                        
                                        //     <Button onClick={() => {navigator.clipboard.writeText(configfile.nullvalue)}} variant='link' className='d-inline-flex p-0 text-white align-items-center ms-2'>
                                        //     {configfile.nullvalue}.....{configfile.nullvalue}
                                        //     <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-files" viewBox="0 0 16 16">
                                        //         <path d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z"/>
                                        //     </svg>
                                        // </Button>
                                        ):(
                                        <a  href={"https://testnet.algoexplorer.io/address/" + location.state.allData.ownerAddress} target="_blank" rel="noreferer">
                                        <strong>{location.state.allData.ownerAddress.slice(0,12)}....{location.state.allData.ownerAddress.slice(50,58)} </strong>
                                        &nbsp;
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi ms-2 bi-box-arrow-up-right" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                                                <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                                                </svg>
                                        </a>                                        
                                        //     <Button onClick={() => {navigator.clipboard.writeText(location.state.allData.ownerAddress)}} variant='link' className='d-inline-flex p-0 text-white align-items-center ms-2'>
                                        //     {location.state.allData.ownerAddress.slice(0,8)}.....{location.state.allData.ownerAddress.slice(50,58)}
                                        //     <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-files" viewBox="0 0 16 16">
                                        //         <path d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z"/>
                                        //     </svg>
                                        // </Button>
                                        )}
                                        
                                        </>
                                    {/* )} */}
                                    </p>
                                    {getIProfile === "" || getIProfile === null || getIProfile === undefined  || getIProfile[0] === "" || getIProfile[0] === null || getIProfile[0] === undefined ? (
                                        <h5>{configfile.nullvalue}</h5>
                                    ):(
                                        <>
                                        <h5>{getIProfile[0].Bio}</h5>
                                        <br/>
                                        </>
                                    )}
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>

                {/* <h2>Bidding</h2>

                <Card className='card-dash mb-4 d-block border-0 mb-4'>
                    <Table striped hover responsive className='mb-0 text-nowrap'>
                        <thead>
                            <tr>
                                <th>Address</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <strong>Tiny USDT</strong><br />
                                    $TINYUSDt - 21582818
                                </td>
                                <td>TINYUSDt / ALGO</td>
                                <td><Link to="/" className='btn ms-2 btn-blue'>Redeem</Link></td>
                            </tr>
                        </tbody>
                        </Table>
                </Card>
                <Card className='card-dash mb-4 d-block border-0 mb-4'>
                    <Table striped hover responsive className='mb-0 text-nowrap'>
                        <thead>
                            <tr>
                                <th>Address</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        
                    </Table>

                    <div className='py-5 text-center'>
                        <img src={Nobidding} alt="Nobidding" className='mb-4' />
                        <h4 className='text-primary'>No one is currently bidding here</h4>
                    </div>
                </Card> */}                
            </Container>
        </Layout>
    )
}

export default NFTDetails;