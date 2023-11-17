import React,{useState,useEffect,useContext} from 'react';
//import Layout from './LayoutNoFooter';
//import Layout from '../components/Layouts/LayoutInner';
//import Layout from '../components/Dashboard/Layout';
import Layout from '../components/DashboardNew/Layout';
import {Container, Button, Dropdown, Row, Col, Tabs, Tab,Modal} from 'react-bootstrap';
import {
    Link,useLocation
  } from "react-router-dom";
import configfile from '../NFTFolder/config.json'
import MyAlgoConnect from '@randlabs/myalgo-connect';
import fireDb from '../NFTFolder/firebase';
//import dataescrow from "../escrow.js";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import firebase from '../NFTFolder/firebase';
import { DataContext } from '../NFTFolder/DataContext';
//import logogif from '../assets/images/gif1.svg';
import logogif from '../assets/images/gif4.gif';
import cjson from '../NFTFolder/config.json'
import AlgorandIcon from '../assets/images/Algo.png'
import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';
//import '../toast-style-override.css'
import dataescrowprice from "../NFTFolder/escrowpricenew";
import dataelemescrow from "../NFTFolder/escrowelem";
const algosdk = require('algosdk'); 
const myAlgoWallet = new MyAlgoConnect();

const SingleBid = (props) => {
    //const {algobalanceApp}=useContext(DataContext)
    //console.log("algobalanceAppSingle",algobalanceApp)
    const[algobalanceApp,setalgobalanceApp]=useState([""]);
    const history = useHistory();
    const location = useLocation();
    ////console.log("Biddata2",location.state.alldata)
    const[getIPro,setgetIPro]=useState([""]);
    const[getIPro2,setgetIPro2]=useState([""]);
    //console.log("getIProprofiles",getIPro[0]) 
    //console.log("getIProprofiles2",getIPro2[0]) 
    const [showTest, setShowTest] = React.useState(false);
    
    const [showTestDone,setshowTestDone] = React.useState(false);   
    const [showTestLoading, setShowTestLoading] = React.useState(false);    
    const [showTestSale,setshowTestSale] = React.useState(false);   
    
    const [showShare,setshowShare] = React.useState(false);   
         
    const [getprices,setprices]=useState(null)
    const [showTestAlert,setshowTestAlert] = React.useState(false);   
    const [issuesdisplay,setissuesdisplay]=useState(null)
    
    //const handleCloseTest = () => setShowTest(false);
    //const handleCloseTestLoading = () => setShowTestLoading(false);
    //const handleCloseTestDone = () => setshowTestDone(false);
    //const handleCloseTestSale = () => setshowTestSale(false);
    const handleCloseshowShare = () => setshowShare(false);
    let calc="";
    const [algobalance, setalgobalance] = useState("");
    //console.log("calc",algobalance)
    //console.log("calcstart",parseInt(location.state.alldata.NFTPrice)/1000000)
    useEffect(() => {        
        async function listenMMAccount() {    
          if(localStorage.getItem("walletAddress") === null || localStorage.getItem("walletAddress") === "0x" || localStorage.getItem("walletAddress") === undefined || localStorage.getItem("walletAddress") === ''){                  
          }
          else{          
            const baseServer = 'https://testnet-algorand.api.purestake.io/ps2';
            const port = '';
            const token = {
              'X-API-key' : `${configfile['purestakeapi']}`,
            }
            const algodClientGet = new algosdk.Algodv2(token, baseServer, port);//get                
            const indexClient = new algosdk.Indexer('', 'https://algoindexer.testnet.algoexplorerapi.io', '');
            //const params = await algodClient.getTransactionParams().do();
            const algodclient = new algosdk.Algodv2('', 'https://node.testnet.algoexplorerapi.io', '');//post
            // const baseServer = "https://testnet-algorand.api.purestake.io/ps2";
            // const port = "";            
            // const token = {            
            //     'X-API-key' : cjson.purestakeapi,
            // }
            // let client = new algosdk.Algodv2(token, baseServer, port);                
            //const client = new algosdk.Algodv2('', 'https://algoindexer.testnet.algoexplorerapi.io', '');            
    ( async() => {
      let account1_info = (await algodClientGet.accountInformation(localStorage.getItem('walletAddress')).do());      
      //let account1_info = (await client.lookupAccountByID(localStorage.getItem('wallet')).do());      
      calc=JSON.stringify(account1_info.amount)/1000000;      
      setalgobalance(JSON.stringify(account1_info.amount)/1000000);      
      localStorage.setItem("balget",account1_info);      
  })().catch(e => {
      //console.log(e);
  })                    
        }        
    }
    listenMMAccount();
    }, []);

    const dbcallPro=async()=>{            
        let r=[];
            
            if(location.state === null || location.state === undefined || location.state === "" ){

            }else{
                try {     
                firebase.database().ref("userprofile").child(location.state.alldata.CreatorAddress).on("value", (data) => {          
                    if (data) {                      
                        r.push({                
                          Imageurl:data.val().Imageurl,                
                          valid:data.val().valid,
                          UserName:data.val().UserName
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
                       
    }    
    useEffect(()=>{dbcallPro()},[])

    const dbcallPro2=async()=>{            
        let r=[];
        if(location.state === null || location.state === undefined || location.state === "" ){

        }else{
        try {         
        firebase.database().ref("userprofile").child(location.state.alldata.ownerAddress).on("value", (data) => {          
          if (data) {                      
              r.push({                
                Imageurl:data.val().Imageurl,                
                valid:data.val().valid,
                UserName:data.val().UserName
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
      }    
    useEffect(()=>{dbcallPro2()},[])
    
    
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
            //history.push('/singlebuy')
            //window.location.reload(false)            
        }

        // const buynow2=async()=>{
        //     let a=location.state.alldata.HistoryAddress.concat(localStorage.getItem('wallet'));
        //     //console.log("lol",a)
        // }

        const pleasewait=()=>{
            alert("please wait your balance has checking....")
        }

        const buynow=async()=>{

            if(location.state.alldata === null || location.state.alldata === "" || location.state.alldata === undefined ){

            }
            else{
                
            
            if(localStorage.getItem("walletAddress") === null || localStorage.getItem("walletAddress") === "0x" || localStorage.getItem("walletAddress") === undefined || localStorage.getItem("walletAddress") === ''){
                setissuesdisplay("please connect wallet")
                setshowTestAlert(true)
            }
            else{          
            if(location.state.alldata.ownerAddress === localStorage.getItem("walletAddress"))
            {   
                //alert("you are owner so you does not purchase this token")             
                setissuesdisplay("you are owner")
                setshowTestAlert(true)
                //window.location.reload(false)                
            }            
            else{                    
            if(algobalanceApp === 0 || algobalanceApp === ""){
                setissuesdisplay("your wallet balance below 1")
                setshowTestAlert(true)
              //alert("your balance below 1")                
              //window.location.reload(false)                
            }
            // else if((parseFloat(location.state.alldata.NFTPrice)/1000000) >= algobalance ){
            //     setissuesdisplay("your balance not enough to purchase this nft")
            //     setshowTestAlert(true)
            //     //alert("your balance not enough to purchase this nft")
            //     //window.location.reload(false)                
            // }
            // else if(algobalanceApp === "" || algobalanceApp === "0" || algobalanceApp === undefined || algobalanceApp === null || algobalanceApp <= 3){
            //     setissuesdisplay("Insufficient balance to Buy NFT")
            //     setshowTestAlert(true)
            //     //alert("Insufficient balance to create NFT")
            //     //window.location.reload(false)                
            // }
            else{
                setShowTestLoading(true)                  
                const algosdk = require('algosdk');  
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
                let a=location.state.alldata.HistoryAddress.concat(localStorage.getItem('walletAddress'));                                              
                //const myAlgoConnect = new MyAlgoConnect();
                //  let appId="50714558";
                //let appId=parseInt(configfile['appId']);                
                let params = await algodClient.getTransactionParams().do();
                //comment out the next two lines to use suggested fee
                params.fee = 1000;
                params.flatFee = true;  
                ////console.log("Global state", datedt); 
                toast.info("Buy Starting",{autoClose: 5000});  
                try {    
                let convert95=(((parseFloat(location.state.alldata.NFTPrice))/100)*95)
                //console.log("convert95",convert95)  
                let convert5=(((parseFloat(location.state.alldata.NFTPrice))/100)*5);
                //console.log("convert5",convert5)
                //console.log("AssBuy",parseInt(location.state.alldata.Assetid))
                //console.log("AppBuy",index)
                const params = await algodClient.getTransactionParams().do();    
                const myAlgoConnect = new MyAlgoConnect();
                let dataopreplace = dataescrowprice.replaceAll("AppID",configfile['appIdPrice']).replaceAll("AssId",parseInt(location.state.alldata.Assetid))
                let dataelem = dataelemescrow.replaceAll("AppID",configfile['appIdPrice']).replaceAll("elemId",parseInt(configfile['elemId']))
                let results = await algodClient.compile(dataopreplace).do();                
                let program = new Uint8Array(Buffer.from(results.result, "base64"));      
                let lsig = algosdk.makeLogicSig(program);                
                let resultselem = await algodClient.compile(dataelem).do();                
                let programelem = new Uint8Array(Buffer.from(resultselem.result, "base64"));      
                let lsigelem = algosdk.makeLogicSig(programelem);                
                //console.log("Result//console = " + results);
                //console.log("Hash = " + results.hash);
                //console.log("Result = " + results.result);
                //await sleep(20000)                                
                //let tealSignPrint = tealSign(sk, data, lsig.address());
                //console.log("LSIG",lsig.address())                                                    
                let recv_escrow = lsig.address();
                let amount = 961000;
  
                alert("Alert")
                const transactionass = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                      from: localStorage.getItem('walletAddress'),
                      to: localStorage.getItem('walletAddress'),
                      assetIndex: parseInt(location.state.alldata.Assetid),
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
                //   const signedTxnass = await myAlgoConnect.signTransaction(transactionass.toByte());
                //   const responseass = await algodClient.sendRawTransaction(signedTxnass.blob).do();
                //   const signedTxnelem = await myAlgoConnect.signTransaction(transactionelem.toByte());
                //   const responseelem = await algodClient.sendRawTransaction(signedTxnelem.blob).do();
                  //console.log("optresponse",responseass)            
                  

                  let transactionfund = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
                    from: localStorage.getItem('walletAddress'), 
                    to: lsigelem.address(), 
                    amount: parseInt(3000), 
                    note: undefined,  
                    suggestedParams: params
                   });

                //    const signedTxnfund = await myAlgoConnect.signTransaction(transactionfund.toByte());
                //    const responsefund = await algodClient.sendRawTransaction(signedTxnfund.blob).do();


                const groupIDfirst = algosdk.computeGroupID([ transactionass, transactionelem, transactionfund]);
                  const txsfirst = [ transactionass, transactionelem, transactionfund];
                  txsfirst[0].group = groupIDfirst;
                  txsfirst[1].group = groupIDfirst;
                  txsfirst[2].group = groupIDfirst;
                  const signedTx1first = await myAlgoWallet.signTransaction([txsfirst[0].toByte(),txsfirst[1].toByte(),txsfirst[2].toByte()]);
                  const responsefirst = await algodClient.sendRawTransaction([signedTx1first[0].blob,signedTx1first[1].blob,signedTx1first[2].blob]).do();                  
                  await waitForConfirmation(algodClient, responsefirst.txId);

                  toast.success(`Asset Opted Successfully ${responsefirst.txId}`,{autoClose: 8000});

                
                   let transaction1 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
                      from: localStorage.getItem('walletAddress'), 
                      to: recv_escrow, 
                      amount: amount, 
                      note: undefined,  
                      suggestedParams: params
                     });
                   
                     let appArg = [];
                     appArg.push(new Uint8Array(Buffer.from("Buynow")));
                     
                     
                     const transaction2 = algosdk.makeApplicationNoOpTxnFromObject({
                         from: recv_escrow, 
                         appIndex: index,
                         appArgs: appArg,
                         accounts: [localStorage.getItem('walletAddress')],
                         suggestedParams: params
                       });
                       
                       let transaction3 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
                        from: localStorage.getItem('walletAddress'), 
                        to: recv_escrow, 
                        amount:parseFloat(location.state.alldata.NFTPrice), 
                         note: undefined,  
                         suggestedParams: params
                       });
                      const transaction4 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                        from: recv_escrow,
                        to: localStorage.getItem('walletAddress'),
                        assetIndex: parseFloat(location.state.alldata.Assetid),
                        note: undefined,
                        amount: 1,
                        suggestedParams: params
                      });
                  
                      //location.state.alldata.NFTPrice
                      let transaction5 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
                          from: recv_escrow, 
                          to: location.state.alldata.ownerAddress, 
                          amount: parseFloat(convert95), 
                          note: undefined,  
                          suggestedParams: params
                       });
                       let transaction6 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
                          from: recv_escrow, 
                          to: "JJHBUM7FOLSGD5OPQNLLAHQJ2FDKV2FQKLRJUTZFGOQPYVIH72TNI7Y6YU", 
                          amount: parseInt(convert5), 
                          note: undefined,  
                          suggestedParams: params
                      });    
                      const transaction7 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                        from: lsigelem.address(),
                        to: localStorage.getItem('walletAddress'),
                        assetIndex: parseInt(configfile['elemId']),
                        note: undefined,
                        amount: parseInt(convert5),
                        suggestedParams: params
                      });


                      
                  const groupID = algosdk.computeGroupID([ transaction1, transaction2, transaction3, transaction4,transaction5,transaction6,transaction7]);
                  const txs = [ transaction1, transaction2, transaction3, transaction4,transaction5,transaction6,transaction7];
                  txs[0].group = groupID;
                  txs[1].group = groupID;
                  txs[2].group = groupID;
                  txs[3].group = groupID;
                  txs[4].group = groupID;
                  txs[5].group = groupID;                  
                  txs[6].group = groupID;                  
                  const signedTx1 = await myAlgoWallet.signTransaction([txs[0].toByte(),txs[2].toByte()]);
                  const signedTx2 = algosdk.signLogicSigTransaction(txs[1], lsig);            
                  const signedTx3 = algosdk.signLogicSigTransaction(txs[3], lsig);                  
                  const signedTx4 = algosdk.signLogicSigTransaction(txs[4], lsig);                  
                  const signedTx5 = algosdk.signLogicSigTransaction(txs[5], lsig);                                                
                  const signedTx6 = algosdk.signLogicSigTransaction(txs[6], lsigelem);                                                
                  const response = await algodClient.sendRawTransaction([ signedTx1[0].blob, signedTx2.blob, signedTx1[1].blob, signedTx3.blob,signedTx4.blob,signedTx5.blob,signedTx6.blob]).do();
                  //console.log("TxID", JSON.stringify(response, null, 1));
                  await waitForConfirmation(algodClient, response.txId);
                  let dbtxid=response.txId;
                  toast.success(`Asset Buying ${response.txId}`,{autoClose: 8000});              
                //db change here
                  let a=location.state.alldata.HistoryAddress.concat(localStorage.getItem('walletAddress'));              
                  let dateset=new Date().toDateString();
                  firebase.auth().signInAnonymously().then((response)=>{      
                  fireDb.database().ref(`imagerefexploreoneAlgos/${location.state.alldata.ownerAddress}`).child(location.state.alldata.keyId).remove().then(()=>{
                  fireDb.database().ref(`imagerefbuy/${localStorage.getItem("walletAddress")}`).child(location.state.alldata.keyId).set({
                      Assetid:location.state.alldata.Assetid,Imageurl:location.state.alldata.Imageurl,NFTPrice:location.state.alldata.NFTPrice,
                      EscrowAddress:location.state.alldata.EscrowAddress,keyId:location.state.alldata.keyId,
                      NFTName:location.state.alldata.NFTName,userSymbol:location.state.alldata.userSymbol,Ipfsurl:location.state.alldata.Ipfsurl,
                      ownerAddress:localStorage.getItem('walletAddress'),previousoaddress:location.state.alldata.ownerAddress,
                      TimeStamp:dateset,NFTDescription:location.state.alldata.NFTDescription,HistoryAddress:a,
                      Appid:location.state.alldata.Appid,valid:location.state.alldata.valid,
                      CreatorAddress:location.state.alldata.CreatorAddress            
                        }).then(()=>{          
                          let refactivity=fireDb.database().ref(`activitytable/${localStorage.getItem('walletAddress')}`);   
                          const db = refactivity.push().key;                         
                          refactivity.child(db).set({
                          Assetid:location.state.alldata.Assetid,Imageurl:location.state.alldata.Imageurl,NFTPrice:location.state.alldata.NFTPrice,
                          EscrowAddress:"BuyNFT",keyId:db,
                          NFTName:location.state.alldata.NFTName,userSymbol:location.state.alldata.userSymbol,Ipfsurl:location.state.alldata.Ipfsurl,
                          ownerAddress:localStorage.getItem('walletAddress'),previousoaddress:location.state.alldata.ownerAddress, 
                          TimeStamp:dateset,NFTDescription:dbtxid,HistoryAddress:a,
                          Appid:location.state.alldata.Appid,valid:location.state.alldata.valid,
                          CreatorAddress:location.state.alldata.CreatorAddress
                      })
                          .then(()=>{                                                            
                              //console.log("remove db");
                              toast.success(`Buy Successfully`,{autoClose: 8000});
                              setShowTestLoading(false)
                              setshowTestSale(true)              
                          })                        
                          setShowTestLoading(false)  
                          setshowTestSale(true)
                      }) 
                  })
                })
                  } catch (err) {
                      //console.error(err);
                      setShowTestLoading(false)
                      toast.dismiss();
                      //alert("you wallet raises some issues")
                      setissuesdisplay("your browser appearing issue")
                      setshowTestAlert(true)                      
                      //window.location.reload(false)                
                }                                                        
            }
           
            }
            }
        }
        }        

        const sharebutton=()=>{
            //console.log("SingleBid",location.state.alldata)
            setshowShare(true)            
        }
        
    return (
        <Layout>
            <div className="page-content">
            <Container fluid className='d-md-flex'>
            <><ToastContainer position='top-center' draggable = {false} transition={Zoom} autoClose={8000} closeOnClick = {false}/></>
                <div className="content-left d-flex">
                    {/* <video playsInline={true} autoPlay={true} controls={true} loop={true} src="https://img.rarible.com/prod/video/upload/t_big/prod-itemAnimations/0x5c3daa7a35d7def65bfd9e99120d5fa07f63f555:10061/271db129"></video> */}
                    {location.state === null || location.state === "" || location.state === undefined ? (<>
                    </>):(<>
                    <img src={location.state.alldata.Imageurl} style={{width:"500px",height:"500px"}} alt="test"/>
                    </>)}                    
                </div>
                <div className="content-right d-flex flex-column ms-auto">
                    <div className="d-flex align-items-center mb-4">
                        <div>
                        {location.state === null || location.state === "" || location.state === undefined ? (<>
                    </>):(<>
                        <h2 className='mb-1'>{location.state.alldata.NFTName}</h2>
                    </>)}                    
                            <div className="category">From <span className='text-green'>0.06 ALGO</span> · 474 of 500 available</div>
                        </div>
                        <div className="ms-auto ps-2 d-flex align-items-center">
                            {/* <Button variant='white' className='btn-count me-2 py-3 btn-rounded'>
                                <svg viewBox="0 0 17 16" fill="none" width="16" height="16" xlmns="http://www.w3.org/2000/svg" className="sc-bdvvtL sc-hKwDye fDKaYE sc-cnHmbd lkEDtX">
                                    <path d="M8.2112 14L12.1056 9.69231L14.1853 7.39185C15.2497 6.21455 15.3683 4.46116 14.4723 3.15121V3.15121C13.3207 1.46757 10.9637 1.15351 9.41139 2.47685L8.2112 3.5L6.95566 2.42966C5.40738 1.10976 3.06841 1.3603 1.83482 2.97819V2.97819C0.777858 4.36443 0.885104 6.31329 2.08779 7.57518L8.2112 14Z" stroke="currentColor" strokeWidth="2">
                                </path></svg>
                                50
                            </Button> */}

                            <Dropdown className='dropdown-noarrow'>
                                <Dropdown.Toggle variant="grad" className='btn-round'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi m-0 bi-three-dots" viewBox="0 0 16 16">
                                    <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                                </svg>
                                </Dropdown.Toggle>

                                <Dropdown.Menu className='link-flex dropdown-menu-right'>
                                    {/* <Dropdown.Item href="/">New bid</Dropdown.Item> */}
                                    {/* <Dropdown.Divider /> */}
                                    <Dropdown.Item href="/singlebuy">Refresh Metadata</Dropdown.Item>
                                    <Dropdown.Item onClick={()=>sharebutton()}>Share</Dropdown.Item>
                                    {location.state === null || location.state === "" || location.state === undefined ? (<>
                                    </>):(<>
                                        <Dropdown.Item onClick={() => window.open(`https://testnet.algoexplorer.io/asset/${location.state.alldata.Assetid}`)}>Explore</Dropdown.Item>                        
                                    </>)}                                            
                                    {/* <Dropdown.Item href="/bid-2">Report</Dropdown.Item>                                     */}
                                    {/* href="/bid-2" */}
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>

                    <div className="mb-4 content-right-description">
                        {/* <p>#0009 </p> */}
                        {/* <p>"Gas Station Pills" </p> */}
                    </div>

                    <Row className="bid-users mb-4">
                        <Col>
                            <h6><span>Creator</span></h6>

                            {/* <Link to="/" className="avatar d-flex align-items-center text-truncate">
                                <svg width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.78117 0.743103C5.29164 -0.247701 6.70826 -0.247701 7.21872 0.743103C7.52545 1.33846 8.21742 1.62509 8.8553 1.42099C9.91685 1.08134 10.9186 2.08304 10.5789 3.1446C10.3748 3.78247 10.6614 4.47445 11.2568 4.78117C12.2476 5.29164 12.2476 6.70826 11.2568 7.21872C10.6614 7.52545 10.3748 8.21742 10.5789 8.8553C10.9186 9.91685 9.91685 10.9186 8.8553 10.5789C8.21742 10.3748 7.52545 10.6614 7.21872 11.2568C6.70826 12.2476 5.29164 12.2476 4.78117 11.2568C4.47445 10.6614 3.78247 10.3748 3.1446 10.5789C2.08304 10.9186 1.08134 9.91685 1.42099 8.8553C1.62509 8.21742 1.33846 7.52545 0.743103 7.21872C-0.247701 6.70826 -0.247701 5.29164 0.743103 4.78117C1.33846 4.47445 1.62509 3.78247 1.42099 3.1446C1.08134 2.08304 2.08304 1.08134 3.1446 1.42099C3.78247 1.62509 4.47445 1.33846 4.78117 0.743103Z" fill="#feda03"></path><path fillRule="evenodd" clip-rule="evenodd" d="M8.43961 4.23998C8.64623 4.43922 8.65221 4.76823 8.45297 4.97484L5.40604 8.13462L3.54703 6.20676C3.34779 6.00014 3.35377 5.67113 3.56039 5.47189C3.76701 5.27266 4.09602 5.27864 4.29526 5.48525L5.40604 6.63718L7.70475 4.25334C7.90398 4.04672 8.23299 4.04074 8.43961 4.23998Z" fill="#000000"></path></svg>
                                <img src="https://img.rarible.com/prod/image/upload/t_avatar_big/prod-users/0x668dfaefb6a473c13e5f0ab00893a3bedf85da04/avatar/QmZty95DGjiZ8ZMbBKdpRmmgyvo2kCXvtgC5FxCqYZtRuu" alt="avatar" />
                                <span>HEX TOYS</span>
                            </Link> */}
                            <Link className="avatar d-flex align-items-center text-truncate">
                                {getIPro === null || getIPro === "" || getIPro === undefined ? (
                                    <>
                                    </>
                                ):(
                                    <>
                                    {  getIPro[0] === null || getIPro[0] === "" || getIPro[0] === undefined || getIPro[0].UserName === undefined || getIPro[0].UserName === "" || getIPro[0].UserName === null ?(
                                        <Link className="avatar d-flex align-items-center text-truncate">
                                        <img src="https://img.rarible.com/prod/image/upload/t_avatar_big/prod-users/0x668dfaefb6a473c13e5f0ab00893a3bedf85da04/avatar/QmZty95DGjiZ8ZMbBKdpRmmgyvo2kCXvtgC5FxCqYZtRuu" alt="avatar" />
                                        <span>Profile Not Completed</span>
                                        </Link>                                    
                                        ):(
                                        <Link className="avatar d-flex align-items-center text-truncate">
                                        <img src={getIPro[0].Imageurl} alt="avatar" />
                                        <span>{getIPro[0].UserName}</span>
                                        </Link>
                                        )}
                                    </>
                                )}
                                    
                                    
                            </Link>
                        </Col>
                        {/* <Col>
                            <h6>Collection</h6>

                            <Link to="/" className="avatar d-flex align-items-center text-truncate">
                                <img src="https://img.rarible.com/prod/image/upload/t_avatar_big/prod-users/0x668dfaefb6a473c13e5f0ab00893a3bedf85da04/avatar/QmZty95DGjiZ8ZMbBKdpRmmgyvo2kCXvtgC5FxCqYZtRuu" alt="avatar" />
                                <span>HEX TOYS</span>
                            </Link>
                        </Col> */}
                    </Row>

                    {/* <div className="mb-4 pt-2">
                        <Button className='w-100' size="lg" variant='light-grad'>
                            <span>
                                <svg viewBox="0 0 10 12" fill="none" width="16" height="16" xlmns="http://www.w3.org/2000/svg" className="sc-bdvvtL me-2 sc-hKwDye kpPkaN"><path fillRule="evenodd" clip-rule="evenodd" d="M5 0.75C3.067 0.75 1.5 2.317 1.5 4.25V5.125C1.01675 5.125 0.625 5.51675 0.625 6V10.375C0.625 10.8582 1.01675 11.25 1.5 11.25H8.5C8.98325 11.25 9.375 10.8582 9.375 10.375V6C9.375 5.51675 8.98325 5.125 8.5 5.125V4.25C8.5 2.317 6.933 0.75 5 0.75ZM6.75 5.125V4.25C6.75 3.2835 5.9665 2.5 5 2.5C4.0335 2.5 3.25 3.2835 3.25 4.25V5.125H6.75Z" fill="currentColor"></path></svg>
                                Unlockable content included
                            </span>
                        </Button>
                    </div> */}

                    <Tabs defaultActiveKey="owners" id="bids-tabs" className="mb-4 nav-tabs-start">
                        <Tab eventKey="owners" title="Owners">
                            <div className="d-flex mb-4 align-items-center">

                            {getIPro === null || getIPro === "" || getIPro === undefined ? (
                                    <>
                                    </>
                                ):(
                                    <>
                            
                                {getIPro2[0] === null || getIPro2[0] === "" || getIPro2[0] === undefined || getIPro2[0].UserName === undefined || getIPro2[0].UserName === "" || getIPro2[0].UserName === null ?(
                                <Link  className="avatar d-flex align-items-center text-truncate">
                                <img src="https://img.rarible.com/prod/image/upload/t_avatar_big/prod-users/0x668dfaefb6a473c13e5f0ab00893a3bedf85da04/avatar/QmZty95DGjiZ8ZMbBKdpRmmgyvo2kCXvtgC5FxCqYZtRuu" alt="avatar"/>
                                <span>Profile Not Completed</span>
                                </Link>
                                ):(
                                <Link  className="avatar d-flex align-items-center text-truncate">
                                <img src={getIPro2[0].Imageurl} alt="avatar" />
                                <span>{getIPro2[0].UserName}</span>
                                </Link>
                                
                                )}
                                
                            </>
                            )}

                                
                                {/* <Link to="/" className="avatar d-flex align-items-center text-truncate">
                                    <svg width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.78117 0.743103C5.29164 -0.247701 6.70826 -0.247701 7.21872 0.743103C7.52545 1.33846 8.21742 1.62509 8.8553 1.42099C9.91685 1.08134 10.9186 2.08304 10.5789 3.1446C10.3748 3.78247 10.6614 4.47445 11.2568 4.78117C12.2476 5.29164 12.2476 6.70826 11.2568 7.21872C10.6614 7.52545 10.3748 8.21742 10.5789 8.8553C10.9186 9.91685 9.91685 10.9186 8.8553 10.5789C8.21742 10.3748 7.52545 10.6614 7.21872 11.2568C6.70826 12.2476 5.29164 12.2476 4.78117 11.2568C4.47445 10.6614 3.78247 10.3748 3.1446 10.5789C2.08304 10.9186 1.08134 9.91685 1.42099 8.8553C1.62509 8.21742 1.33846 7.52545 0.743103 7.21872C-0.247701 6.70826 -0.247701 5.29164 0.743103 4.78117C1.33846 4.47445 1.62509 3.78247 1.42099 3.1446C1.08134 2.08304 2.08304 1.08134 3.1446 1.42099C3.78247 1.62509 4.47445 1.33846 4.78117 0.743103Z" fill="#feda03"></path><path fillRule="evenodd" clip-rule="evenodd" d="M8.43961 4.23998C8.64623 4.43922 8.65221 4.76823 8.45297 4.97484L5.40604 8.13462L3.54703 6.20676C3.34779 6.00014 3.35377 5.67113 3.56039 5.47189C3.76701 5.27266 4.09602 5.27864 4.29526 5.48525L5.40604 6.63718L7.70475 4.25334C7.90398 4.04672 8.23299 4.04074 8.43961 4.23998Z" fill="#000000"></path></svg>
                                    <img src="https://img.rarible.com/prod/image/upload/t_avatar_big/prod-users/0x668dfaefb6a473c13e5f0ab00893a3bedf85da04/avatar/QmZty95DGjiZ8ZMbBKdpRmmgyvo2kCXvtgC5FxCqYZtRuu" alt="avatar" />
                                    <div>
                                        <span>HEX TOYS</span>
                                        <p>474/474 on sale for <span>0.06 ETH</span> each</p>
                                    </div>
                                </Link>

                                <Button variant='primary' className='ms-auto'>Buy</Button> */}
                            </div>
                            {/* <div className="d-flex mb-4 align-items-center">
                                <Link to="/" className="avatar d-flex align-items-center text-truncate">
                                    <img src="https://img.rarible.com/prod/image/upload/t_avatar_big/prod-users/0x668dfaefb6a473c13e5f0ab00893a3bedf85da04/avatar/QmZty95DGjiZ8ZMbBKdpRmmgyvo2kCXvtgC5FxCqYZtRuu" alt="avatar" />
                                    <div>
                                        <span>DAIYOX</span>
                                        <p>1 edition <span>not for sale</span></p>
                                    </div>
                                </Link>
                            </div>
                            <div className="d-flex mb-4 align-items-center">
                                <Link to="/" className="avatar d-flex align-items-center text-truncate">
                                    <img src="https://img.rarible.com/prod/image/upload/t_avatar_big/prod-users/0x668dfaefb6a473c13e5f0ab00893a3bedf85da04/avatar/QmZty95DGjiZ8ZMbBKdpRmmgyvo2kCXvtgC5FxCqYZtRuu" alt="avatar" />
                                    <div>
                                        <span>0xd848904449c4c7d5421...4912</span>
                                        <p>1 edition <span>not for sale</span></p>
                                    </div>
                                </Link>
                            </div> */}
                        </Tab>
                        {/* <Tab eventKey="bids" title="Bids">
                            <div className="no-found py-5p text-gray text-center">
                                <svg viewBox="0 0 12 16" fill="none" width="38" height="38" xlmns="http://www.w3.org/2000/svg" className="sc-bdvvtL mb-3 sc-hKwDye jggBKf"><path d="M7.00146 0V6H11.0015L4.00146 16V10H0.00146484L7.00146 0Z" fill="currentColor"></path></svg>
                                <p className="lead mb-4">No active bids yet. Be the <br />first to make a bid!</p>
                            </div>
                        </Tab> */}
                        <Tab eventKey="details" title="Details">
                            <div className="mb-4">
                                <h6 className='subheading'>Blockchain</h6>
                                <div className="avatar d-flex align-items-center text-truncate">
                                <img src={AlgorandIcon} alt="avatar" />
                                    <span>Algorand</span>
                                </div>
                            </div>
                        </Tab>
                        {/* <Tab eventKey="history" title="History">
                            <div className="d-flex mb-4 align-items-center">
                                <div className="avatar d-flex align-items-center text-truncate">
                                    <img src="https://img.rarible.com/prod/image/upload/t_avatar_big/prod-users/0x668dfaefb6a473c13e5f0ab00893a3bedf85da04/avatar/QmZty95DGjiZ8ZMbBKdpRmmgyvo2kCXvtgC5FxCqYZtRuu" alt="avatar" />
                                    <div>
                                        <span><span>Purchased 1 edition for</span> 0.06 ETH</span>
                                        <p>by <span>AppSec</span> 12/23/2021, 2:01 AM <Link to="/"><svg viewBox="0 0 12 12" fill="none" width="16" height="16" xlmns="http://www.w3.org/2000/svg" className="sc-bdvvtL sc-hKwDye vZMA-D"><path d="M3.69233 0.92308V0.92308C2.16292 0.92308 0.923096 2.16291 0.923096 3.69231V8.07693C0.923096 9.73378 2.26624 11.0769 3.9231 11.0769H8.30771C9.83712 11.0769 11.0769 9.8371 11.0769 8.3077V8.3077" stroke="currentColor" strokeWidth="1.5" stroke-linecap="round"></path><path d="M6.46143 0.92308H11.0768V5.53847" stroke="currentColor" strokeWidth="1.5" stroke-linecap="round"></path><path d="M11.077 0.92308L5.53857 6.46154" stroke="currentColor" strokeWidth="1.5" stroke-linecap="round"></path></svg></Link></p>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex mb-4 align-items-center">
                                <div className="avatar d-flex align-items-center text-truncate">
                                    <img src="https://img.rarible.com/prod/image/upload/t_avatar_big/prod-users/0x668dfaefb6a473c13e5f0ab00893a3bedf85da04/avatar/QmZty95DGjiZ8ZMbBKdpRmmgyvo2kCXvtgC5FxCqYZtRuu" alt="avatar" />
                                    <div>
                                        <span><span>Purchased 1 edition for</span> 0.06 ETH</span>
                                        <p>by <span>AppSec</span> 12/23/2021, 2:01 AM <Link to="/"><svg viewBox="0 0 12 12" fill="none" width="16" height="16" xlmns="http://www.w3.org/2000/svg" className="sc-bdvvtL sc-hKwDye vZMA-D"><path d="M3.69233 0.92308V0.92308C2.16292 0.92308 0.923096 2.16291 0.923096 3.69231V8.07693C0.923096 9.73378 2.26624 11.0769 3.9231 11.0769H8.30771C9.83712 11.0769 11.0769 9.8371 11.0769 8.3077V8.3077" stroke="currentColor" strokeWidth="1.5" stroke-linecap="round"></path><path d="M6.46143 0.92308H11.0768V5.53847" stroke="currentColor" strokeWidth="1.5" stroke-linecap="round"></path><path d="M11.077 0.92308L5.53857 6.46154" stroke="currentColor" strokeWidth="1.5" stroke-linecap="round"></path></svg></Link></p>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex mb-4 align-items-center">
                                <div className="avatar d-flex align-items-center text-truncate">
                                    <img src="https://img.rarible.com/prod/image/upload/t_avatar_big/prod-users/0x668dfaefb6a473c13e5f0ab00893a3bedf85da04/avatar/QmZty95DGjiZ8ZMbBKdpRmmgyvo2kCXvtgC5FxCqYZtRuu" alt="avatar" />
                                    <div>
                                        <span><span>Purchased 1 edition for</span> 0.06 ETH</span>
                                        <p>by <span>AppSec</span> 12/23/2021, 2:01 AM <Link to="/"><svg viewBox="0 0 12 12" fill="none" width="16" height="16" xlmns="http://www.w3.org/2000/svg" className="sc-bdvvtL sc-hKwDye vZMA-D"><path d="M3.69233 0.92308V0.92308C2.16292 0.92308 0.923096 2.16291 0.923096 3.69231V8.07693C0.923096 9.73378 2.26624 11.0769 3.9231 11.0769H8.30771C9.83712 11.0769 11.0769 9.8371 11.0769 8.3077V8.3077" stroke="currentColor" strokeWidth="1.5" stroke-linecap="round"></path><path d="M6.46143 0.92308H11.0768V5.53847" stroke="currentColor" strokeWidth="1.5" stroke-linecap="round"></path><path d="M11.077 0.92308L5.53857 6.46154" stroke="currentColor" strokeWidth="1.5" stroke-linecap="round"></path></svg></Link></p>
                                    </div>
                                </div>
                            </div>
                        </Tab> */}
                    </Tabs>

                    <div className="sticky-bottom mt-auto text-center">
                        <Row>
                            {/* <Col xs={6}> */}
                            {algobalanceApp === "0" || algobalanceApp === "" || algobalanceApp === undefined ? (
                                <>
                                {location.state === null || location.state === undefined || location.state === "" ? (<>
                                </>):(<>
                                    <Button variant='primary' className='w-100 mw-auto px-0' size='lg' onClick={()=>pleasewait()}>Buy for {(location.state.alldata.NFTPrice)/1000000} ALGO</Button>
                                </>)}
                                </>                                                                
                            ):(
                                <>
                                {location.state === null || location.state === undefined || location.state === "" ? (<>
                                </>):(<>
                                    <Button variant='primary' className='w-100 mw-auto px-0' size='lg' onClick={()=>buynow()}>Buy for {(location.state.alldata.NFTPrice)/1000000} ALGO</Button>
                                </>
                                )}
                                </>                                
                            )}
                                
                            {/* </Col> */}
                            {/* <Col xs={6}>
                                <Button variant='light-blue' className='w-100 mw-auto px-0' size='lg'>Place a bid</Button>
                            </Col> */}
                        </Row>
                    </div>
                </div>
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
                             
            {/* onHide={handleCloseTestSale} */}
            <Modal show={showTestSale} centered size="sm" >
                <Modal.Header  />
                <Modal.Body>
                    <div className="text-center py-4">
                        <h3>Token Purchase Successfully</h3>  
                    </div>                    
                    <Button variant="primary" size="lg" className='w-100' onClick={()=>refreshSale()}>Done</Button>
                </Modal.Body>
            </Modal>                          

            <Modal show={showTestAlert} centered size="sm" >
                <Modal.Header  />
                <Modal.Body>
                    <div className="text-center py-4">
                        <h3>{issuesdisplay}</h3>  
                    </div>                    
                    <Button variant="primary" size="lg" className='w-100' onClick={()=>refreshSale()}>Ok</Button>
                </Modal.Body>
            </Modal>                          
            
            {/* onHide={handleCloseshowShare} */}
            <Modal show={showShare} centered size="sm" onHide={handleCloseshowShare}>
                <Modal.Header closeButton />
                <Modal.Body>
                            
                            <h3>&nbsp;&nbsp;Share link to this page</h3>                            
                            <br/>
                            {/* <div className="footer-social d-flex align-items-center">                                                        */}
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
            </Container>
            </div>
        </Layout>
    );
};

export default SingleBid;