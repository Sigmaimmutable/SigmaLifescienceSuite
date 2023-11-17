import React,{useState,useContext,useCallback,useEffect} from 'react';
import {Card, Dropdown, Button, OverlayTrigger, Tooltip,Modal,Form, InputGroup } from 'react-bootstrap';
import {
    Link
  } from "react-router-dom";

//import User from '../../assets/images/dummy-icon.svg';
//import Preview from '../../assets/images/preview.jpg';
import EthereumIcon from '../assets/images/Algo.png'
import configfile from '../NFTFolder/config.json'
import MyAlgoConnect from '@randlabs/myalgo-connect';
import fireDb from '../NFTFolder/firebase';
//import dataescrow from "../../escrow.js";
//import logogif from '../../assets/images/gif1.svg';
import logogif from '../assets/images/gif4.gif';
import { DataContext } from '../NFTFolder/DataContext';
import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';
import dataescrowprice from "../NFTFolder/escrowpricenew";
//import '../../toast-style-override.css'
const myAlgoWallet = new MyAlgoConnect();
const algosdk = require('algosdk'); 

const CardCreate = (props) => {
    const [showTestAlert,setshowTestAlert] = React.useState(false);   
    const [issuesdisplay,setissuesdisplay]=useState(null)
    //console.log("cprint",props.onNameChange)
    // const handleInputChange = useCallback(event => {
    //     props.onNameChange(props.onNameChange)
    // }, [props.onNameChange])
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
    //console.log("algobalanceAppSingle",algobalanceApp)
    const [showTest, setShowTest] = React.useState(false);
    const [showTestLoading, setShowTestLoading] = React.useState(false);    
    const [showTestDone,setshowTestDone] = React.useState(false);   
    const [showTestSale,setshowTestSale] = React.useState(false);   
    const [showShare,setshowShare] = React.useState(false);            
    const [getprices,setprices]=useState(null)
    //const handleCloseTest = () => setShowTest(false);
    //const handleCloseTestLoading = () => setShowTestLoading(false);
    //const handleCloseTestDone = () => setshowTestDone(false);
    //const handleCloseTestSale = () => setshowTestSale(false);
    const handleCloseshowShare = () => setshowShare(false);            
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

        

    const refreshSale=()=>{
        setshowTestSale(false)
        window.location.reload(false)
    }

    const refresh=()=>{
        setshowTestDone(false)
        window.location.reload(false)                        
    }

    
    const onshow2=()=>{
        setShowTestLoading(true)
        //console.log("sale",props.dataall);
        if(localStorage.getItem('walletAddress') === null || localStorage.getItem('walletAddress') === "" || localStorage.getItem('walletAddress') === undefined || localStorage.getItem('walletAddress') === " "){
            setissuesdisplay("please connect your wallet")
            setshowTestAlert(true)                      
            //alert("please connect your wallet")
        }else if(localStorage.getItem('walletAddress') === props.dataall.ownerAddress){   
            fireDb.auth().signInAnonymously().then((response)=>{                     
            let dateset=new Date().toDateString();      
            fireDb.database().ref(`imagerefexploreoneAlgos/${localStorage.getItem('walletAddress')}`).child(props.dataall.keyId).set({
                Assetid:props.dataall.Assetid,Imageurl:props.dataall.Imageurl,NFTPrice:props.dataall.NFTPrice,EscrowAddress:props.dataall.EscrowAddress,keyId:props.dataall.keyId,
                NFTName:props.dataall.NFTName,userSymbol:props.dataall.userSymbol,Ipfsurl:props.dataall.Ipfsurl,ownerAddress:props.dataall.ownerAddress,previousoaddress:props.dataall.previousoaddress,
                TimeStamp:dateset,NFTDescription:props.dataall.NFTDescription,HistoryAddress:props.dataall.HistoryAddress,Appid:props.dataall.Appid,valid:props.dataall.valid,
                CreatorAddress:props.dataall.CreatorAddress
              }).then(()=>{
                fireDb.database().ref(`imagerefAlgo/${localStorage.getItem('walletAddress')}`).child(props.dataall.keyId).remove();
                let refactivity=fireDb.database().ref(`activitytable/${localStorage.getItem('walletAddress')}`);   
                const db = refactivity.push().key;                         
                refactivity.child(db).set({
                Assetid:props.dataall.Assetid,Imageurl:props.dataall.Imageurl,NFTPrice:props.dataall.NFTPrice,EscrowAddress:"saleNFT",keyId:db,
                NFTName:props.dataall.NFTName,userSymbol:props.dataall.userSymbol,Ipfsurl:props.dataall.Ipfsurl,ownerAddress:props.dataall.ownerAddress,previousoaddress:localStorage.getItem('walletAddress'),                
                TimeStamp:dateset,NFTDescription:props.dataall.NFTDescription,HistoryAddress:props.dataall.HistoryAddress,Appid:props.dataall.Appid,valid:props.dataall.valid,
                CreatorAddress:props.dataall.CreatorAddress
            })
                .then(()=>{                                                            
                    //console.log("remove db");                    
                    setShowTestLoading(false)
                    setshowTestSale(true)              
                })                                          
              })
            })
        }        
    }


    // const onshow2Boson=()=>{
    //     setShowTestLoading(true)
    //     //console.log("sale",props.dataall);
    //     if(localStorage.getItem('walletAddress') === null || localStorage.getItem('walletAddress') === "" || localStorage.getItem('walletAddress') === undefined || localStorage.getItem('walletAddress') === " "){
    //         alert("please connect your walletAddress")
    //     }else if(localStorage.getItem('walletAddress') === props.dataall.ownerAddress){                  
    //         let dateset=new Date().toDateString();      
    //         fireDb.database().ref(`imagerefexploreoneAlgosBoson/${localStorage.getItem('walletAddress')}`).child(props.dataall.keyId).set({
    //             Assetid:props.dataall.Assetid,Imageurl:props.dataall.Imageurl,NFTPrice:props.dataall.NFTPrice,EscrowAddress:props.dataall.EscrowAddress,keyId:props.dataall.keyId,
    //             NFTName:props.dataall.NFTName,userSymbol:props.dataall.userSymbol,Ipfsurl:props.dataall.Ipfsurl,ownerAddress:props.dataall.ownerAddress,previousoaddress:props.dataall.previousoaddress,
    //             TimeStamp:dateset,NFTDescription:props.dataall.NFTDescription,HistoryAddress:props.dataall.HistoryAddress,Appid:props.dataall.Appid,valid:props.dataall.valid,
    //             CreatorAddress:props.dataall.CreatorAddress
    //           }).then(()=>{
    //             fireDb.database().ref(`imagerefAlgo/${localStorage.getItem('walletAddress')}`).child(props.dataall.keyId).remove();
    //             let refactivity=fireDb.database().ref(`activitytable/${localStorage.getItem('walletAddress')}`);   
    //             const db = refactivity.push().key;                         
    //             refactivity.child(db).set({
    //             Assetid:props.dataall.Assetid,Imageurl:props.dataall.Imageurl,NFTPrice:props.dataall.NFTPrice,EscrowAddress:"saleNFT",keyId:db,
    //             NFTName:props.dataall.NFTName,userSymbol:props.dataall.userSymbol,Ipfsurl:props.dataall.Ipfsurl,ownerAddress:props.dataall.ownerAddress,previousoaddress:localStorage.getItem('walletAddress'),                
    //             TimeStamp:dateset,NFTDescription:props.dataall.NFTDescription,HistoryAddress:props.dataall.HistoryAddress,Appid:props.dataall.Appid,valid:props.dataall.valid,
    //             CreatorAddress:props.dataall.CreatorAddress
    //         })
    //             .then(()=>{                                                            
    //                 //console.log("remove db");                    
    //                 setShowTestLoading(false)
    //                 setshowTestSale(true)              
    //             })                        
                  
    //           })
    //     }        
    // }

    // const onshow2Bosonvideo=()=>{
    //     setShowTestLoading(true)
    //     //console.log("sale",props.dataall);
    //     if(localStorage.getItem('walletAddress') === null || localStorage.getItem('walletAddress') === "" || localStorage.getItem('walletAddress') === undefined || localStorage.getItem('walletAddress') === " "){
    //         alert("please connect your walletAddress")
    //     }else if(localStorage.getItem('walletAddress') === props.dataall.ownerAddress){                  
    //         let dateset=new Date().toDateString();      
    //         fireDb.database().ref(`imagerefexploreoneAlgosBosonvideo/${localStorage.getItem('walletAddress')}`).child(props.dataall.keyId).set({
    //             Assetid:props.dataall.Assetid,Imageurl:props.dataall.Imageurl,NFTPrice:props.dataall.NFTPrice,EscrowAddress:props.dataall.EscrowAddress,keyId:props.dataall.keyId,
    //             NFTName:props.dataall.NFTName,userSymbol:props.dataall.userSymbol,Ipfsurl:props.dataall.Ipfsurl,ownerAddress:props.dataall.ownerAddress,previousoaddress:props.dataall.previousoaddress,
    //             TimeStamp:dateset,NFTDescription:props.dataall.NFTDescription,HistoryAddress:props.dataall.HistoryAddress,Appid:props.dataall.Appid,valid:props.dataall.valid,
    //             CreatorAddress:props.dataall.CreatorAddress
    //           }).then(()=>{
    //             fireDb.database().ref(`imagerefAlgo/${localStorage.getItem('walletAddress')}`).child(props.dataall.keyId).remove();
    //             let refactivity=fireDb.database().ref(`activitytable/${localStorage.getItem('walletAddress')}`);   
    //             const db = refactivity.push().key;                         
    //             refactivity.child(db).set({
    //             Assetid:props.dataall.Assetid,Imageurl:props.dataall.Imageurl,NFTPrice:props.dataall.NFTPrice,EscrowAddress:"saleNFT",keyId:db,
    //             NFTName:props.dataall.NFTName,userSymbol:props.dataall.userSymbol,Ipfsurl:props.dataall.Ipfsurl,ownerAddress:props.dataall.ownerAddress,previousoaddress:localStorage.getItem('walletAddress'),                
    //             TimeStamp:dateset,NFTDescription:props.dataall.NFTDescription,HistoryAddress:props.dataall.HistoryAddress,Appid:props.dataall.Appid,valid:props.dataall.valid,
    //             CreatorAddress:props.dataall.CreatorAddress
    //         })
    //             .then(()=>{                                                            
    //                 //console.log("remove db");                    
    //                 setShowTestLoading(false)
    //                 setshowTestSale(true)              
    //             })                        
                  
    //           })
    //     }        
    // }
    const onshow1=()=>{
        setShowTest(true)                
    }

    const setpricedb=async(b)=>{
        setShowTest(false)
        //var regExpr = new RegExp("^\d*\.?\d*$");
        //var regex = new RegExp("^[a-zA-Z]+$")
        //console.log("Lenget",getprices.length)
        if(getprices === null || getprices === undefined || getprices === "" ){
            setissuesdisplay("please enter price")
            setshowTestAlert(true)               
            //alert("please enter price")
            setShowTest(true)
            //window.location.reload(false)!regExpr.test(getprices) || !regex.test(getprices) || !/[0-9]/.test(getprices)
        }else if(isNaN(getprices))
        {
            //alert("please valid number")
            setissuesdisplay("please valid number")
            setshowTestAlert(true)               
            setShowTest(true)
            //window.location.reload(false)
        }
        else if(getprices === "0"){
            setissuesdisplay("please enter above 0 price")
            setshowTestAlert(true)               
            //alert("please enter above 0 price")
            setShowTest(true)
            //window.location.reload(false)
        }
        else if(getprices === "00" || getprices === "000" || getprices === "0000" || getprices === "00000"){
            setissuesdisplay("you are entered zeros")
            setshowTestAlert(true)               
            //alert("you are entered zeros")
        }
        else if(getprices.length >= 5 ){                                    
            setissuesdisplay("you are entered Maximum Values")
            setshowTestAlert(true)               
            //alert("you are entered Maximum Values")
        }
        else if(algobalanceApp === "" || algobalanceApp === "0" || algobalanceApp === undefined || algobalanceApp === null || algobalanceApp <= 3){
            setissuesdisplay("Insufficient balance to create NFT")
            setshowTestAlert(true)               
            //alert("Insufficient balance to create NFT")
        }
        else{
        
            setShowTestLoading(true)        
        let amountmul=(parseFloat(getprices)*1000000);
        toast.info("Create Listing Starts",{autoClose:5000}); 
        const baseServer = 'https://testnet-algorand.api.purestake.io/ps2';
        const port = '';
        const token = {
          'X-API-key' : `${configfile['purestakeapi']}`,
        }
        const algodClientGet = new algosdk.Algodv2(token, baseServer, port);//get                
        const indexClient = new algosdk.Indexer('', 'https://algoindexer.testnet.algoexplorerapi.io', '');
        //const params = await algodClient.getTransactionParams().do();
        const algodClient = new algosdk.Algodv2('', 'https://node.testnet.algoexplorerapi.io', '');//post
        //const algodClient = new algosdk.Algodv2('', 'https://algoindexer.testnet.algoexplorerapi.io', '');    
        let index = parseInt(configfile['appIdPrice']);  
        let dataopreplace = dataescrowprice.replaceAll("AppID",configfile['appIdPrice']).replaceAll("AssId",parseInt(props.Assetid))
        let results = await algodClient.compile(dataopreplace).do();                
        let program = new Uint8Array(Buffer.from(results.result, "base64"));      
        let lsig = algosdk.makeLogicSig(program);
        try {            
            const params = await algodClient.getTransactionParams().do();            
            let recv_escrow = lsig.address();
            let amount = 961000;      
            let foreignassets = [];
            //
            foreignassets.push(parseInt(props.dataall.Assetid));            
            let transaction1 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
              from: localStorage.getItem('walletAddress'), 
              to: recv_escrow, 
              amount: amount, 
              note: undefined,  
              suggestedParams: params
             });     
             let appArg = [];
             //
             appArg.push(new Uint8Array(Buffer.from("createlisting")));       
             appArg.push(algosdk.encodeUint64(parseFloat(amountmul))); 
             //console.log("Apparg",parseFloat(amountmul))      
              const transaction2 = algosdk.makeApplicationNoOpTxnFromObject({
                 from: recv_escrow, 
                 appIndex: index,
                 appArgs: appArg,
                 accounts: [localStorage.getItem('walletAddress')],
                 foreignAssets:foreignassets,
                 suggestedParams: params
               });          
               //
              const transaction3 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                from: recv_escrow,
                to: recv_escrow,
                assetIndex: parseInt(props.dataall.Assetid),
                note: undefined,
                foreignAssets:foreignassets,
                amount: 0,
                suggestedParams: params
              });          
              //parseInt(props.Assetid)
              const transaction4 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                from: localStorage.getItem('walletAddress'),
                to: recv_escrow,
                assetIndex: parseInt(props.dataall.Assetid),
                note: undefined,
                amount: 1,
                suggestedParams: params
              });
          const groupID = algosdk.computeGroupID([ transaction1, transaction2, transaction3, transaction4]);
          const txs = [ transaction1, transaction2, transaction3, transaction4];
          txs[0].group = groupID;
          txs[1].group = groupID;
          txs[2].group = groupID;
          txs[3].group = groupID;           
          const signedTx1 = await myAlgoWallet.signTransaction([txs[0].toByte(),txs[3].toByte()]);
          const signedTx2 = algosdk.signLogicSigTransaction(txs[1], lsig);
          const signedTx3 = algosdk.signLogicSigTransaction(txs[2], lsig);      
          const response = await algodClient.sendRawTransaction([ signedTx1[0].blob, signedTx2.blob, signedTx3.blob, signedTx1[1].blob]).do();
          //console.log("TxID", JSON.stringify(response, null, 1));
          await waitForConfirmation(algodClient, response.txId);
          let cl=response.txId;
          toast.success(`Create Listing Sucessfully ${response.txId}`,{autoClose: 8000});            

        //db here          
        let dateset=new Date().toDateString();
        fireDb.auth().signInAnonymously().then((responses)=>{                     
        fireDb.database().ref(`imagerefAlgo/${localStorage.getItem('walletAddress')}`).child(props.dataall.keyId).update({
            Assetid:props.dataall.Assetid,Imageurl:props.dataall.Imageurl,NFTPrice:parseFloat(amountmul),EscrowAddress:lsig.address(),keyId:props.dataall.keyId,
            NFTName:props.dataall.NFTName,userSymbol:props.dataall.userSymbol,Ipfsurl:props.dataall.Ipfsurl,ownerAddress:props.dataall.ownerAddress,previousoaddress:localStorage.getItem('walletAddress'),
            TimeStamp:dateset,NFTDescription:props.dataall.NFTDescription,HistoryAddress:props.dataall.HistoryAddress,Appid:props.dataall.Appid,valid:props.dataall.valid,
            CreatorAddress:props.dataall.CreatorAddress
        }).then(()=>{  
            let refactivity=fireDb.database().ref(`activitytable/${localStorage.getItem('walletAddress')}`);   
            const db = refactivity.push().key;                         
            refactivity.child(db).set({
                Assetid:props.dataall.Assetid,Imageurl:props.dataall.Imageurl,NFTPrice:parseFloat(amountmul),EscrowAddress:"priceupdated",keyId:db,
                NFTName:props.dataall.NFTName,userSymbol:props.dataall.userSymbol,Ipfsurl:props.dataall.Ipfsurl,ownerAddress:props.dataall.ownerAddress,previousoaddress:localStorage.getItem('walletAddress'),
                TimeStamp:dateset,NFTDescription:cl,HistoryAddress:props.dataall.HistoryAddress,Appid:props.dataall.Appid,valid:props.dataall.valid,
                CreatorAddress:props.dataall.CreatorAddress
        })
        .then(()=>{                                        
            setShowTestLoading(true)
            setshowTestDone(true)
            })                        
        })            
    })
        //db end here
                  
          } catch (err) {
            //console.error(err);
            setShowTestLoading(false)
            toast.dismiss();
            setissuesdisplay("your browser appearing issue")
            setshowTestAlert(true)                      
            // alert("you wallet raises some issues")
            //window.location.reload(false)
          }
        }            
    }
    
    const sharebutton=()=>{    
        setshowShare(true)
    }

    const refreshSale2=()=>{
        setshowTestAlert(false)
        //history.push('/')
        //window.location.reload(false)            
    }
    
    return (
        <><ToastContainer position='top-center' draggable = {false} transition={Zoom} autoClose={8000} closeOnClick = {false}/>
        <Card>            
            <Card.Header className='d-flex align-items-center'>            
            <div className="card-users d-flex align-items-center me-auto">
                    {/* <OverlayTrigger
                        overlay={<Tooltip>E-Element</Tooltip>}
                    >
                        <Link to="/">
                            <img src={props.img} alt="pic" />
                        </Link>
                    </OverlayTrigger>
                    <OverlayTrigger
                        overlay={<Tooltip>E-Element</Tooltip>}
                    >
                        <Link to="/">
                            <img src={props.img} alt="pic" />
                            {props.verify ? (
                                <svg width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.78117 0.743103C5.29164 -0.247701 6.70826 -0.247701 7.21872 0.743103C7.52545 1.33846 8.21742 1.62509 8.8553 1.42099C9.91685 1.08134 10.9186 2.08304 10.5789 3.1446C10.3748 3.78247 10.6614 4.47445 11.2568 4.78117C12.2476 5.29164 12.2476 6.70826 11.2568 7.21872C10.6614 7.52545 10.3748 8.21742 10.5789 8.8553C10.9186 9.91685 9.91685 10.9186 8.8553 10.5789C8.21742 10.3748 7.52545 10.6614 7.21872 11.2568C6.70826 12.2476 5.29164 12.2476 4.78117 11.2568C4.47445 10.6614 3.78247 10.3748 3.1446 10.5789C2.08304 10.9186 1.08134 9.91685 1.42099 8.8553C1.62509 8.21742 1.33846 7.52545 0.743103 7.21872C-0.247701 6.70826 -0.247701 5.29164 0.743103 4.78117C1.33846 4.47445 1.62509 3.78247 1.42099 3.1446C1.08134 2.08304 2.08304 1.08134 3.1446 1.42099C3.78247 1.62509 4.47445 1.33846 4.78117 0.743103Z" fill="#feda03"></path><path fillRule="evenodd" clipRule="evenodd" d="M8.43961 4.23998C8.64623 4.43922 8.65221 4.76823 8.45297 4.97484L5.40604 8.13462L3.54703 6.20676C3.34779 6.00014 3.35377 5.67113 3.56039 5.47189C3.76701 5.27266 4.09602 5.27864 4.29526 5.48525L5.40604 6.63718L7.70475 4.25334C7.90398 4.04672 8.23299 4.04074 8.43961 4.23998Z" fill="#000000"></path></svg>
                            ) : null}
                        </Link>
                    </OverlayTrigger>
                    <OverlayTrigger
                        overlay={<Tooltip>E-Element</Tooltip>}
                    >
                        <Link to="/">
                            <img src={props.img} alt="pic" />
                            {props.verify ? (
                                <svg width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.78117 0.743103C5.29164 -0.247701 6.70826 -0.247701 7.21872 0.743103C7.52545 1.33846 8.21742 1.62509 8.8553 1.42099C9.91685 1.08134 10.9186 2.08304 10.5789 3.1446C10.3748 3.78247 10.6614 4.47445 11.2568 4.78117C12.2476 5.29164 12.2476 6.70826 11.2568 7.21872C10.6614 7.52545 10.3748 8.21742 10.5789 8.8553C10.9186 9.91685 9.91685 10.9186 8.8553 10.5789C8.21742 10.3748 7.52545 10.6614 7.21872 11.2568C6.70826 12.2476 5.29164 12.2476 4.78117 11.2568C4.47445 10.6614 3.78247 10.3748 3.1446 10.5789C2.08304 10.9186 1.08134 9.91685 1.42099 8.8553C1.62509 8.21742 1.33846 7.52545 0.743103 7.21872C-0.247701 6.70826 -0.247701 5.29164 0.743103 4.78117C1.33846 4.47445 1.62509 3.78247 1.42099 3.1446C1.08134 2.08304 2.08304 1.08134 3.1446 1.42099C3.78247 1.62509 4.47445 1.33846 4.78117 0.743103Z" fill="#feda03"></path><path fillRule="evenodd" clipRule="evenodd" d="M8.43961 4.23998C8.64623 4.43922 8.65221 4.76823 8.45297 4.97484L5.40604 8.13462L3.54703 6.20676C3.34779 6.00014 3.35377 5.67113 3.56039 5.47189C3.76701 5.27266 4.09602 5.27864 4.29526 5.48525L5.40604 6.63718L7.70475 4.25334C7.90398 4.04672 8.23299 4.04074 8.43961 4.23998Z" fill="#000000"></path></svg>
                            ) : null}
                        </Link>
                    </OverlayTrigger> */}
            </div>
            <Dropdown className='dropdown-noarrow'>
                    <Dropdown.Toggle variant="reset">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
                        <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                    </svg>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className='link-flex dropdown-menu-right'>
                        {/* <Dropdown.Item href="/">Buy now</Dropdown.Item> */}
                        <Dropdown.Divider />
                        <Dropdown.Item href="/profile">Refresh Metadata</Dropdown.Item>
                        <Dropdown.Item onClick={()=>sharebutton()}>Share</Dropdown.Item>
                        {/* <Dropdown.Item href="/profile">Report</Dropdown.Item> */}
                    </Dropdown.Menu>
            </Dropdown>
            </Card.Header>
            <Card.Body className='p-0'>
            <div className="position-relative">
            <img src={props.img} className='img-fluid card-image' alt="Preview" />                    
            {props.timer ? (
            <div className="timer">
                            <div>{props.timer} <span>left</span> <img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple@6.0.1/img/apple/64/1f525.png" alt="fire" /></div></div>
                    ) : null}
            </div>

            <div className="card-title justify-content-between d-flex align-items-start">
                    <Link to="/">{props.title}</Link>

                    <OverlayTrigger
                        overlay={<Tooltip>Algorand</Tooltip>}
                    >
                        <img src={EthereumIcon} alt="icon" />
                    </OverlayTrigger>
            </div>  

            <div className="card-info d-flex align-items-end justify-content-between">
                    <div>
                        {/* <h5 dangerouslySetInnerHTML={{__html: props.subTitle}} /> */}
                        {/* <Link  className='btn-link-grad'>{props.linkText}</Link> */}
                        <Link  className='btn-link-grad'>{props.linkText}</Link>
                    </div>                    
                    
                    {/* <Button variant='default' className='btn-count float-end'>
                        <svg viewBox="0 0 17 16" fill="none" width="16" height="16" xlmns="http://www.w3.org/2000/svg" className="sc-bdvvtL sc-hKwDye bZjZGw"><path d="M8.2112 14L12.1056 9.69231L14.1853 7.39185C15.2497 6.21455 15.3683 4.46116 14.4723 3.15121V3.15121C13.3207 1.46757 10.9637 1.15351 9.41139 2.47685L8.2112 3.5L6.95566 2.42966C5.40738 1.10976 3.06841 1.3603 1.83482 2.97819V2.97819C0.777858 4.36443 0.885104 6.31329 2.08779 7.57518L8.2112 14Z" stroke="currentColor" strokeWidth="2"></path></svg>
                        <span>{props.count}</span>
                    </Button> */}

                    {props.linkText === undefined || props.linkText === null || props.linkText === " " || props.linkText === 0 ? (<>
                    <Button variant='primary' className='btn-count float-end' onClick={()=>onshow1()}>                        
                        <span>Set Price</span>
                    </Button>
                     </>) : (<>
                    <Button variant='primary' className='btn-count float-end' onClick={()=>onshow2()}>   
                        <span>Sale NFT</span>
                    </Button>
                    </>)}    

                {/* onHide={handleCloseTest} */}
            <Modal show={showTest} centered size="sm" >
                <Modal.Header  />
                <Modal.Body>
                    <div className="text-center py-4">
                        <h3>Price </h3>
                        <InputGroup type="number" pattern="[0-9]*" className="mb-4 input-group-field" maxlength="5" onChange={event => setprices( event.target.value)}>
                        <Form.Control
                            placeholder='Enter price'
                        />
                        </InputGroup>
                    </div>
                    <Button variant="primary" size="lg" className='w-100' onClick={()=>setpricedb(props.linkText)}>SET PRICE</Button>
                </Modal.Body>
            </Modal>                          

            {/* onHide={handleCloseTestLoading} */}
            <Modal show={showTestLoading} centered size="sm" >
                <Modal.Header  />
                <Modal.Body>
                    <div className="text-center py-4">
                        {/* <h3>Loading...</h3>                                     */}
                        <img src={logogif} alt="loading..." />
                    </div>                    
                </Modal.Body>
            </Modal>                          
            {/* onHide={handleCloseTestDone} */}
            <Modal show={showTestDone} centered size="sm" >
                <Modal.Header  />
                <Modal.Body>
                    <div className="text-center py-4">
                        <h3>Price Updated</h3>  
                    </div>                    
                    <Button variant="primary" size="lg" className='w-100' onClick={()=>refresh()}>Done</Button>
                </Modal.Body>
            </Modal>                          
            {/* onHide={handleCloseTestSale} */}
            <Modal show={showTestSale} centered size="sm" >
                <Modal.Header  />
                <Modal.Body>
                    <div className="text-center py-4">
                        <h3>Updated</h3>  
                    </div>                    
                    <Button variant="primary" size="lg" className='w-100' onClick={()=>refreshSale()}>Done</Button>
                </Modal.Body>
            </Modal>       
            {/* onHide={handleCloseshowShare} */}
                <Modal show={showShare} centered size="sm" onHide={handleCloseshowShare}>
                <Modal.Header closeButton />
                <Modal.Body>
                            
                            <h3>&nbsp;&nbsp;Share link to this page</h3>                            
                            <br/>
                            <div className="footer-social d-flex align-items-center">                                                       
                            <a href={"https://twitter.com/ElementDeFi"} target="_blank" rel="noopener noreferrer">
                                    <svg viewBox="0 0 18 16" fill="none" width="16" height="16" xlmns="http://www.w3.org/2000/svg" className="sc-bdvvtL sc-hKwDye bRyxAn"><path d="M17.9655 2.42676C17.3018 2.71851 16.593 2.91726 15.8468 3.00801C16.6073 2.54976 17.1922 1.82751 17.469 0.965759C16.7558 1.38201 15.9653 1.68501 15.1238 1.85376C14.4518 1.13451 13.494 0.684509 12.4305 0.684509C10.3927 0.684509 8.7405 2.33676 8.7405 4.37226C8.7405 4.66476 8.77425 4.94601 8.83575 5.21526C5.76825 5.07051 3.0495 3.59751 1.23 1.37076C0.90975 1.91226 0.7305 2.54151 0.7305 3.22701C0.7305 4.50951 1.383 5.63676 2.3715 6.29901C1.76625 6.27951 1.197 6.11301 0.7005 5.83701V5.88276C0.7005 7.67151 1.97025 9.16326 3.66 9.50301C3.35025 9.58626 3.02325 9.63126 2.688 9.63126C2.4525 9.63126 2.22675 9.60876 2.001 9.56676C2.47425 11.0315 3.83475 12.0995 5.454 12.1295C4.194 13.1188 2.59725 13.7083 0.8775 13.7083C0.585 13.7083 0.29325 13.691 0 13.658C1.64175 14.7035 3.576 15.3148 5.66775 15.3148C12.4583 15.3148 16.167 9.69276 16.167 4.82526C16.167 4.66851 16.167 4.51026 16.1558 4.35276C16.8765 3.83601 17.5057 3.18276 18.0007 2.44176L17.9655 2.42676Z" fill="currentColor"></path></svg>
                                </a>
                                {/* <a href={"https://www.instagram.com/"} target="_blank" rel="noopener noreferrer">
                                    <svg viewBox="0 0 14 14" fill="none" width="16" height="16" xlmns="http://www.w3.org/2000/svg" className="sc-bdvvtL sc-hKwDye dPpTSf"><path fillRule="evenodd" clipRule="evenodd" d="M7 0C5.09833 0 4.86092 0.00875 4.11425 0.042C3.36875 0.077 2.86125 0.19425 2.415 0.3675C1.95475 0.546 1.56392 0.78575 1.17483 1.17483C0.78575 1.56392 0.545417 1.95417 0.3675 2.415C0.19425 2.86125 0.0764167 3.36875 0.042 4.11425C0.007 4.86092 0 5.09833 0 7C0 8.90167 0.00875 9.13908 0.042 9.88575C0.077 10.6307 0.19425 11.1388 0.3675 11.585C0.546 12.0447 0.78575 12.4361 1.17483 12.8252C1.56392 13.2137 1.95417 13.4546 2.415 13.6325C2.86183 13.8052 3.36933 13.9236 4.11425 13.958C4.86092 13.993 5.09833 14 7 14C8.90167 14 9.13908 13.9912 9.88575 13.958C10.6307 13.923 11.1388 13.8052 11.585 13.6325C12.0447 13.454 12.4361 13.2137 12.8252 12.8252C13.2137 12.4361 13.4546 12.0464 13.6325 11.585C13.8052 11.1388 13.9236 10.6307 13.958 9.88575C13.993 9.13908 14 8.90167 14 7C14 5.09833 13.9912 4.86092 13.958 4.11425C13.923 3.36933 13.8052 2.86067 13.6325 2.415C13.454 1.95475 13.2137 1.56392 12.8252 1.17483C12.4361 0.78575 12.0464 0.545417 11.585 0.3675C11.1388 0.19425 10.6307 0.0764167 9.88575 0.042C9.13908 0.007 8.90167 0 7 0ZM10.7369 4.10372C11.2 4.10372 11.5769 3.72747 11.5769 3.26372C11.5769 2.80055 11.1994 2.42372 10.7369 2.4243C10.2737 2.4243 9.89685 2.80055 9.89685 3.26372C9.89685 3.72689 10.2731 4.10372 10.7369 4.10372ZM3.40552 6.99997C3.40552 5.01547 5.01377 3.40547 7.00002 3.40547C8.98452 3.40547 10.5945 5.01372 10.5945 6.99997C10.5945 8.98447 8.98627 10.5945 7.00002 10.5945C5.01552 10.5945 3.40552 8.98622 3.40552 6.99997ZM7.00002 9.33337C5.71086 9.33337 4.66669 8.2892 4.66669 7.00004C4.66669 5.71087 5.71086 4.6667 7.00002 4.6667C8.28919 4.6667 9.33335 5.71087 9.33335 7.00004C9.33335 8.2892 8.28919 9.33337 7.00002 9.33337Z" fill="currentColor"></path></svg>
                                </a> */}
                                <a href={"https://discord.com/invite/tjPrCnR3yp"} target="_blank" rel="noopener noreferrer">
                                    <svg viewBox="0 0 18 13" fill="none" width="16" height="16" xlmns="http://www.w3.org/2000/svg" className="sc-bdvvtL sc-hKwDye bRyxAn"><path fillRule="evenodd" clipRule="evenodd" d="M11.5507 0.0036464H11.5624L11.5612 0L11.5507 0.0036464ZM11.5108 0.0176323L11.5507 0.0036464H11.5252L11.5108 0.0176323ZM11.5039 0.0243315L11.5108 0.0176323L11.4917 0.0243072L11.5039 0.0243315ZM11.5039 0.0243315L11.2748 0.246719C13.8446 0.975936 15.088 2.11473 15.088 2.11473C13.4318 1.30287 11.9393 0.896938 10.4467 0.732864C9.36818 0.56879 8.28967 0.65508 7.37851 0.732864H7.13058C6.54793 0.732864 5.30826 0.975936 3.64711 1.62616C3.06818 1.87287 2.73595 2.03452 2.73595 2.03452C2.73595 2.03452 3.9781 0.816724 6.71529 0.166505L6.54793 0.00243113C6.54793 0.00243113 4.47521 -0.075352 2.2376 1.54594C2.2376 1.54594 0 5.36704 0 10.0778C0 10.0778 1.23967 12.1925 4.64008 12.2727C4.64008 12.2727 5.13595 11.6249 5.63802 11.0549C3.72893 10.4861 2.98512 9.34857 2.98512 9.34857C2.98512 9.34857 3.15124 9.42878 3.40041 9.59164H3.47479C3.50979 9.59164 3.52722 9.60778 3.54568 9.62487C3.54684 9.62595 3.548 9.62702 3.54917 9.6281V9.63539C3.56901 9.65484 3.58636 9.67185 3.62355 9.67185C3.6596 9.68642 3.69564 9.70096 3.73164 9.71548C4.10416 9.8658 4.47123 10.0139 4.77645 10.158C5.35413 10.4035 6.09669 10.6478 7.00785 10.8094C8.16074 10.9735 9.48223 11.0525 10.9872 10.8094L11.0353 10.7988L11.0353 10.7988C11.7631 10.6384 12.4908 10.4779 13.2186 10.1592C13.3516 10.0923 13.4931 10.0255 13.6419 9.95511C14.0339 9.76978 14.4769 9.56038 14.9504 9.26349C14.9504 9.26349 14.2066 10.4011 12.2169 10.9699C12.626 11.5362 13.2025 12.1852 13.2025 12.1852C15.9898 12.1255 17.3804 10.6948 17.8328 10.2295C17.9325 10.1269 17.9866 10.0713 18 10.0875C18 5.38405 15.75 1.55566 15.75 1.55566C13.7464 0.097178 11.8701 0.0257804 11.5039 0.0243315ZM6.13886 5.36701C7.00663 5.36701 7.70828 6.09623 7.70828 6.98952C7.70828 7.88889 7.00167 8.61811 6.1339 8.61811C5.26613 8.61811 4.55952 7.88889 4.55952 6.99682C4.55952 6.09745 5.26613 5.37066 6.1339 5.37066L6.13886 5.36701ZM11.7707 5.36701C12.6422 5.36701 13.3451 6.09623 13.3451 6.98952C13.3451 7.88889 12.6384 8.61811 11.7707 8.61811C10.9029 8.61811 10.1963 7.88889 10.1963 6.99682C10.1988 6.09745 10.9066 5.37066 11.7707 5.37066V5.36701Z" fill="currentColor"></path></svg>
                                </a>
                                <a href={"https://t.me/elementSwap"} target="_blank" rel="noopener noreferrer">                                
                                    <svg viewBox="0 0 16 14" fill="none" width="16" height="16" xlmns="http://www.w3.org/2000/svg" className="sc-bdvvtL sc-hKwDye fbpERj"><path d="M15.9513 1.29916L13.5438 13.1556C13.377 13.997 12.8902 14.1987 12.21 13.8093L8.542 10.979L6.76804 12.7662C6.56797 12.9748 6.40125 13.1556 6.03445 13.1556C5.55428 13.1556 5.63431 12.9679 5.47425 12.495L4.20714 8.19051L0.572523 7.00834C-0.214421 6.76495 -0.22109 6.20168 0.745918 5.7914L14.9243 0.0891779C15.5711 -0.209841 16.1914 0.256072 15.9446 1.29221L15.9513 1.29916Z" fill="currentColor"></path></svg>
                                </a>
                                {/* <a href={"https://www.youtube.com/"} target="_blank" rel="noopener noreferrer">                                
                                    <svg viewBox="0 0 18 12" fill="none" width="16" height="16" xlmns="http://www.w3.org/2000/svg" className="sc-bdvvtL sc-hKwDye bRyxAn"><path d="M17.6242 1.85293C17.5199 1.49635 17.3209 1.17147 17.0465 0.909689C16.772 0.64791 16.4314 0.458089 16.0576 0.358571C14.6546 1.02807e-05 9.00801 1.01525e-05 9.00801 1.01525e-05C9.00801 1.01525e-05 3.37567 -0.00714662 1.95839 0.358571C1.58457 0.458089 1.24399 0.64791 0.969559 0.909689C0.69513 1.17147 0.496134 1.49635 0.391808 1.85293C0.125849 3.22313 -0.00526955 4.61404 0.000162055 6.00752C-0.00424273 7.39574 0.126872 8.78133 0.391808 10.1464C0.496134 10.5029 0.69513 10.8278 0.969559 11.0896C1.24399 11.3514 1.58457 11.5412 1.95839 11.6407C3.35991 12 9.00801 12 9.00801 12C9.00801 12 14.6396 12 16.0576 11.6407C16.4314 11.5412 16.772 11.3514 17.0465 11.0896C17.3209 10.8278 17.5199 10.5029 17.6242 10.1464C17.8836 8.78084 18.0092 7.39525 17.9994 6.00752C18.0102 4.61454 17.8846 3.22363 17.6242 1.85293ZM7.20584 8.57757V3.4296L11.9056 6.00752L7.20584 8.57757Z" fill="currentColor"></path></svg>
                                </a> */}
                                <a href={"https://medium.com/@ramachandran.baskar/nft-steps-513fae0c36a1"} target="_blank" rel="noopener noreferrer">                                
                                    <svg viewBox="0 0 18 12" fill="none" width="16" height="16" xlmns="http://www.w3.org/2000/svg" className="sc-bdvvtL sc-hKwDye gVaYHr"><path d="M5.07644 11.25C7.88022 11.25 10.1531 8.89939 10.1531 5.99991C10.1531 3.10043 7.88004 0.75 5.07644 0.75C2.27284 0.75 0 3.09972 0 5.99991C0 8.9001 2.27267 11.25 5.07644 11.25Z" fill="currentColor"></path><path d="M13.1839 10.9419C14.5857 10.9419 15.7222 8.72942 15.7222 5.99991C15.7222 3.27111 14.5857 1.0579 13.1839 1.0579C11.7821 1.0579 10.6455 3.27111 10.6455 5.99991C10.6455 8.72871 11.7821 10.9419 13.1839 10.9419Z" fill="currentColor"></path><path d="M17.1072 10.4277C17.6003 10.4277 18 8.44542 18 5.99991C18 3.55458 17.6006 1.57207 17.1074 1.57207C16.6142 1.57207 16.2145 3.55511 16.2145 5.99991C16.2145 8.44471 16.6142 10.4277 17.1072 10.4277Z" fill="currentColor"></path></svg>
                                </a>

                                <div>                                    
                                </div>
                            </div>                                                    
                </Modal.Body>
            </Modal>       
            <Modal show={showTestAlert} centered size="sm" >
                <Modal.Header  />
                <Modal.Body>
                    <div className="text-center py-4">
                        <h3>{issuesdisplay}</h3>  
                    </div>                    
                    <Button variant="primary" size="lg" className='w-100' onClick={()=>refreshSale2()}>Ok</Button>
                </Modal.Body>
            </Modal>                        
            </div>                                   
            </Card.Body>            
        </Card>
        </>
    );
};

export default CardCreate;