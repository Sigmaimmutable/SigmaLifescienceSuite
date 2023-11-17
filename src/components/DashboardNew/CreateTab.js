import React,{useEffect,useState} from 'react';
import { Card, Col} from 'react-bootstrap';
import ButtonLoad from 'react-bootstrap-button-loader';
import firebase from '../../NFTFolder/firebase';
import fireDb from '../../NFTFolder/firebase';
import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';
import { useHistory } from "react-router-dom";
import MyAlgoConnect from '@randlabs/myalgo-connect';
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import { formatJsonRpcRequest } from "@json-rpc-tools/utils";
import WalletConnect from "@walletconnect/client";
import configfile from '../../NFTFolder/config.json'
import { minAlgoBalance } from '../formula';
import dataescrowprice from "../../NFTFolder/escrowpricenew";
import node from './nodeapi.json';
const algosdk = require('algosdk'); 
const algodClient = new algosdk.Algodv2('', 'https://node.testnet.algoexplorerapi.io', '');
const myAlgoWallet = new MyAlgoConnect();
const bridge = "https://bridge.walletconnect.org";



// {setMax,setMin,setChain,setCategory,setRecent,setSaletype,getrecent}
const CreateTab =({x})=>{

    let history=useHistory();
    const handleShowLoad = () => setLoader(true);
    const handleHideLoad = () => setLoader(false);
    const[getIProfile,setgetIProfile]=useState([""]);       
    // console.log("checkprofile",getIProfile)
    const [getprices,setprices]=useState("")
    // console.log("getpricess",getprices)
    const[loader, setLoader] = useState(false);
    const [algobalanceApp,setalgobalanceApp] = useState("");    
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
              //Got the completed Transaction
              //console.log("Transaction " + txId + " confirmed in round " + pendingInfo["confirmed-round"]);
              break;
            }
            lastRound++;
            await algodclient.statusAfterBlock(lastRound).do();
          }
    };

    const saledb =(b) =>{
        //setShowTestLoading(true)
        //console.log("sale",props.dataall);
        if(localStorage.getItem('walletAddress') === null || localStorage.getItem('walletAddress') === "" || localStorage.getItem('walletAddress') === undefined || localStorage.getItem('walletAddress') === " "){
            //setissuesdisplay("please connect your wallet")
            toast.warn(`please connect your wallet`,{autoClose: 5000});            
            handleHideLoad()
            //setshowTestAlert(true)                      
            //alert("please connect your wallet")
        }else if(localStorage.getItem('walletAddress') === b.ownerAddress){   
            handleShowLoad()     
            //fireDb.auth().signInAnonymously().then((response)=>{                     
            let dateset=new Date().toDateString();      
            fireDb.database().ref(`imagerefexploreoneAlgos/${localStorage.getItem('walletAddress')}`).child(b.keyId).set({
                Assetid:b.Assetid,Imageurl:b.Imageurl,NFTPrice:b.NFTPrice,EscrowAddress:b.EscrowAddress,keyId:b.keyId,
                NFTName:b.NFTName,userSymbol:b.userSymbol,Ipfsurl:b.Ipfsurl,ownerAddress:b.ownerAddress,previousoaddress:b.previousoaddress,
                TimeStamp:dateset,NFTDescription:b.NFTDescription,HistoryAddress:b.HistoryAddress,Appid:b.Appid,valid:b.valid,
                CreatorAddress:b.CreatorAddress,NFTType:b.NFTType,NFTChannel:b.NFTChannel,SocialLink:b.SocialLink
              }).then(()=>{
                fireDb.database().ref(`imagerefAlgo/${localStorage.getItem('walletAddress')}`).child(b.keyId).remove();
                let refactivity=fireDb.database().ref(`activitytable/${localStorage.getItem('walletAddress')}`);   
                const db = refactivity.push().key;                         
                refactivity.child(db).set({
                Assetid:b.Assetid,Imageurl:b.Imageurl,NFTPrice:b.NFTPrice,EscrowAddress:"saleNFT",keyId:db,
                NFTName:b.NFTName,userSymbol:b.userSymbol,Ipfsurl:b.Ipfsurl,ownerAddress:b.ownerAddress,previousoaddress:localStorage.getItem('walletAddress'),                
                TimeStamp:dateset,NFTDescription:b.NFTDescription,HistoryAddress:b.HistoryAddress,Appid:b.Appid,valid:b.valid,
                CreatorAddress:b.CreatorAddress,NFTType:b.NFTType,NFTChannel:b.NFTChannel,SocialLink:b.SocialLink
            })
                .then(async()=>{                                                            
                    //console.log("remove db");                    
                    //setShowTestLoading(false)
                    //toast.success(`Moving NFT to Sale`,{autoClose: 5000});            
                    handleHideLoad()
                    //done()
                    await sleep(1000);
                    history.push("/my-NFT")
                    window.location.reload(false);    
                    //setshowTestSale(true)              
                })                                          
              })
            //})
        }        
    }
    const setpricedb=async(b)=>{
        // console.log("BB",b)        
        // console.log("BBB",b.Assetid)        
        //setShowTest(false)        
        if(getprices === null || getprices === undefined || getprices === "" ){
            toast.warning(`please enter price`,{autoClose:5000})
            handleHideLoad()
            //setissuesdisplay("please enter price")
            //setshowTestAlert(true)                           
            //setShowTest(true)            
        }else if(isNaN(getprices))
        {        
            toast.warning(`please valid number`,{autoClose:5000})
            handleHideLoad()
            // setissuesdisplay("please valid number")
            // setshowTestAlert(true)               
            // setShowTest(true)            
        }
        else if(getprices === "0"){
            toast.warning(`please enter above 0 price`,{autoClose:5000})
            handleHideLoad()
            //setissuesdisplay("please enter above 0 price")
            //setshowTestAlert(true)                      
            //setShowTest(true)            
        }
        else if(getprices === "00" || getprices === "000" || getprices === "0000" || getprices === "00000"){
            toast.warning(`you are entered zeros`,{autoClose:5000})
            handleHideLoad()
            // setissuesdisplay("you are entered zeros")
            // setshowTestAlert(true)               
            //alert("you are entered zeros")
        }
        else if(getprices.length >= 5 ){                                    
            toast.warning(`you are entered Maximum Values`,{autoClose:5000})
            handleHideLoad()
            // setissuesdisplay("you are entered Maximum Values")
            // setshowTestAlert(true)                           
        }
        else if(algobalanceApp === "" || algobalanceApp === "0" || algobalanceApp === undefined || algobalanceApp === null || algobalanceApp <= 3){
            toast.warning(`Insufficient balance to create NFT`,{autoClose:5000})
            handleHideLoad()
            // setissuesdisplay("Insufficient balance to create NFT")
            // setshowTestAlert(true)                           
        }
        else if(localStorage.getItem('walletAddress') === null || localStorage.getItem('walletAddress') === "" || localStorage.getItem('walletAddress') === undefined || localStorage.getItem('walletAddress') === " "){
            toast.warning(`please connect your wallet`,{autoClose:5000})
            handleHideLoad()
            // setissuesdisplay("please connect your wallet")
            // setshowTestAlert(true)                      
            //alert("please connect your wallet")
        }        
        else{
        let minbalance=await minAlgoBalance()
        if(minbalance < (961000+2000)){
            toast.error("Your Algo balance is low. Please get more Algos from dispenser",{autoClose:5000});              
            handleHideLoad()
        }
        else{
              //setShowTestLoading(true)        
        handleShowLoad()     
        let amountmul=(parseFloat(getprices)*1000000);
        toast.info("Updating The Price of NFT",{autoClose:5000});         
        // const baseServer = 'https://testnet-algorand.api.purestake.io/ps2';
        // //const baseServer = 'https://testnet-algorand.api.purestake.io/ps2';
        // const port = '';
        // const token = {
        //   'X-API-key' : `${configfile['purestakeapi']}`,
        // }
        // const algodClient = new algosdk.Algodv2(token, baseServer, port);//get                
        //const indexClient = new algosdk.Indexer('', 'https://algoindexer.testnet.algoexplorerapi.io', '');
        //const params = await algodClient.getTransactionParams().do();
        //const algodClient = new algosdk.Algodv2('', 'https://node.testnet.algoexplorerapi.io', '');//post        
        //const algodClient = new algosdk.Algodv2('', 'https://algoindexer.testnet.algoexplorerapi.io', '');    
        let index = parseInt(configfile['appIdPrice']);  
        let dataopreplace = dataescrowprice.replaceAll("AppID",parseInt(configfile['appIdPrice'])).replaceAll("AssId",parseInt(b.Assetid))        
        // console.log("DataReplace",dataopreplace)
        const params = await algodClient.getTransactionParams().do();            
        params.fee = 1000;
        params.flatFee = true;        
        // console.log("Params",params)
        
        let results = await algodClient.compile(dataopreplace).do();                
        let program = new Uint8Array(Buffer.from(results.result, "base64"));   
        // console.log("CompileProgram",program)   
        let lsig = new algosdk.LogicSigAccount(program);
        //let lsig = algosdk.makeLogicSig(program);
        // console.log("CompileProgramLogic",lsig.address())   
        try {            
            
            let recv_escrow = lsig.address();
            let amount = 961000;      
            //let foreignassets = [];
            //
            //foreignassets.push(parseInt(b.Assetid));            
            // let transaction1 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
            //   from: localStorage.getItem('walletAddress'), 
            //   to: recv_escrow, 
            //   amount: amount, 
            //   note: undefined,  
            //   suggestedParams: params
            //  });     
            //  let appArg = [];
            //  //
            //  appArg.push(new Uint8Array(Buffer.from("createlisting")));       
            //  appArg.push(algosdk.encodeUint64(parseFloat(amountmul))); 
            //  console.log("Apparg",parseFloat(amountmul))
            //  const transaction2 = algosdk.makeApplicationNoOpTxnFromObject({
            //     from: recv_escrow, 
            //     appIndex: index,
            //     appArgs: appArg,
            //     accounts: [localStorage.getItem('walletAddress')],
            //     foreignAssets:foreignassets,
            //     suggestedParams: params
            //   });                            
            //    //foreignAssets:foreignassets,               
            //   const transaction3 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
            //     from: recv_escrow,
            //     to: recv_escrow,
            //     assetIndex: parseInt(b.Assetid),
            //     note: undefined,                
            //     foreignAssets:foreignassets,
            //     amount: 0,
            //     suggestedParams: params
            //   });          
            //   //parseInt(props.Assetid)
              
            //   const transaction4 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
            //     from: localStorage.getItem('walletAddress'),
            //     to: recv_escrow,
            //     assetIndex: parseInt(b.Assetid),
            //     note: undefined,
            //     amount: 1,
            //     suggestedParams: params
            //   });    

      let foreignassets = [];
      foreignassets.push(parseInt(b.Assetid));

      let transaction1 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        from: localStorage.getItem('walletAddress'), 
        to: recv_escrow, 
        amount: amount, 
         note: undefined,  
         suggestedParams: params
       });
     
       let appArg = [];
       
       appArg.push(new Uint8Array(Buffer.from("createlisting")));       
       appArg.push(algosdk.encodeUint64(amountmul));
       
       const transaction2 = algosdk.makeApplicationNoOpTxnFromObject({
           from: recv_escrow, 
           appIndex: index,
           appArgs: appArg,
           accounts: [localStorage.getItem('walletAddress')],
           foreignAssets:foreignassets,
           suggestedParams: params
         });
      
         
        const transaction3 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
          from: recv_escrow,
          to: recv_escrow,
          assetIndex: parseInt(b.Assetid),
          note: undefined,
          foreignAssets:foreignassets,
          amount: 0,
          suggestedParams: params
        });
    
      
        const transaction4 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
          from: localStorage.getItem('walletAddress'),
          to: recv_escrow,
          assetIndex: parseInt(b.Assetid),
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
      let response = "";      
      if(localStorage.getItem("walletName") === "myAlgoWallet")
      {
            
      const signedTx1 = await myAlgoWallet.signTransaction([txs[0].toByte(),txs[3].toByte()]);
      const signedTx2 = algosdk.signLogicSigTransaction(txs[1], lsig);

      const signedTx3 = algosdk.signLogicSigTransaction(txs[2], lsig);
      // const signedTx4 = algosdk.signLogicSigTransaction(txs[3], lsig);
      
      response = await algodClient.sendRawTransaction([ signedTx1[0].blob, signedTx2.blob, signedTx3.blob, signedTx1[1].blob]).do();
      // console.log("TxID", JSON.stringify(response, null, 1));
      await waitForConfirmation(algodClient, response.txId);            
      let id = "https://testnet.algoexplorer.io/tx/" + response.txId;
      toast.success(toastDiv(id));

      }else if(localStorage.getItem("walletName") === "PeraWallet"){

            const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
            const txns = [txs[0], txs[1], txs[2],txs[3]]            
            const txnsToSign = txns.map(txn => {
            const encodedTxn = Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString("base64");
            // console.log(encodedTxn);
            return {
              txn: encodedTxn,
          };
        });        
          const signedTx3 = algosdk.signLogicSigTransaction(txns[1], lsig);
          const signedTx4 = algosdk.signLogicSigTransaction(txns[2], lsig);
          const requestParams = [ txnsToSign ];
          const request = formatJsonRpcRequest("algo_signTxn", requestParams);
          const result = await connector.sendCustomRequest(request);
          const decodedResult = result.map(element => {
            return element ? new Uint8Array(Buffer.from(element, "base64")) : null;
          });
          // console.log(result);
          decodedResult[1] = signedTx3.blob;
          decodedResult[2] = signedTx4.blob;
          response = await algodClient.sendRawTransaction(decodedResult).do()          
          await waitForConfirmation(algodClient, response.txId);                      
          let id = "https://testnet.algoexplorer.io/tx/" + response.txId;
          toast.success(toastDiv(id));
      }      

                        
      
//       let foreignassets = [];
//       foreignassets.push(76806280);

//       let transaction1 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
//         from: localStorage.getItem('walletAddress'), 
//         to: recv_escrow, 
//         amount: amount, 
//          note: undefined,  
//          suggestedParams: params
//        });
     
//        let appArg = [];
//        appArg.push(new Uint8Array(Buffer.from("createlisting")));       
//        appArg.push(algosdk.encodeUint64(1000));
       
//        const transaction2 = algosdk.makeApplicationNoOpTxnFromObject({
//            from: recv_escrow, 
//            appIndex: index,
//            appArgs: appArg,
//            accounts: [localStorage.getItem('walletAddress')],
//            foreignAssets:foreignassets,
//            suggestedParams: params
//          });
      
         
//         const transaction3 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
//           from: recv_escrow,
//           to: recv_escrow,
//           assetIndex: 76806280,
//           note: undefined,
//           foreignAssets:foreignassets,
//           amount: 0,
//           suggestedParams: params
//         });
    
      
//         const transaction4 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
//           from: localStorage.getItem('walletAddress'),
//           to: recv_escrow,
//           assetIndex: 76806280,
//           note: undefined,
//           amount: 1,
//           suggestedParams: params
//         });
             
        

//         const groupID = algosdk.computeGroupID([ transaction1, transaction2, transaction3, transaction4]);
//       const txs = [ transaction1, transaction2, transaction3, transaction4];
//       txs[0].group = groupID;
//       txs[1].group = groupID;
//       txs[2].group = groupID;
//       txs[3].group = groupID;
     
      
//       const signedTx1 = await myAlgoWallet.signTransaction([txs[0].toByte(),txs[3].toByte()]);
//       const signedTx2 = algosdk.signLogicSigTransaction(txs[1], lsig);

//       const signedTx3 = algosdk.signLogicSigTransaction(txs[2], lsig);
//       // const signedTx4 = algosdk.signLogicSigTransaction(txs[3], lsig);
      

//   const response = await algodClient.sendRawTransaction([ signedTx1[0].blob, signedTx2.blob, signedTx3.blob, signedTx1[1].blob]).do();
//   console.log("TxID", JSON.stringify(response, null, 1));
//   await waitForConfirmation(algodClient, response.txId);


            
        //   const groupID = algosdk.computeGroupID([ transaction1, transaction2, transaction3, transaction4]);
        //   const txs = [ transaction1, transaction2, transaction3, transaction4];
        //   txs[0].group = groupID;
        //   txs[1].group = groupID;
        //   txs[2].group = groupID;
        //   txs[3].group = groupID;           
        //   const signedTx1 = await myAlgoWallet.signTransaction([txs[0].toByte(),txs[3].toByte()]);
        //   const signedTx2 = algosdk.signLogicSigTransaction(txs[1], lsig);
        //   const signedTx3 = algosdk.signLogicSigTransaction(txs[2], lsig);      
        //   const response = await algodClient.sendRawTransaction([ signedTx1[0].blob, signedTx2.blob, signedTx3.blob, signedTx1[1].blob]).do();

            // const groupID = algosdk.computeGroupID([ transaction1, transaction2, transaction3, transaction4]);
            // const txs = [ transaction1, transaction2, transaction3, transaction4];
            // txs[0].group = groupID;
            // txs[1].group = groupID;
            // txs[2].group = groupID;
            // txs[3].group = groupID;           
            //const signedTx1 = await myAlgoWallet.signTransaction([txs[0].toByte(),txs[3].toByte()]);
            // const signedTx11 = await myAlgoWallet.signTransaction(txs[0].toByte());
            // const signedTx12 = await myAlgoWallet.signTransaction(txs[3].toByte());
            // const signedTx2 = algosdk.signLogicSigTransaction(txs[1], lsig);
            // const signedTx3 = algosdk.signLogicSigTransaction(txs[2], lsig);      
            // const response = await algodClient.sendRawTransaction([ signedTx11.blob, signedTx2.blob, signedTx3.blob, signedTx12.blob]).do();

          //this const response = await algodClient.sendRawTransaction([ signedTx1[0].blob, signedTx2.blob, signedTx3.blob, signedTx1[1].blob]).do();
          //console.log("TxID", JSON.stringify(response, null, 1));
          //await waitForConfirmation(algodClient, response.txId);
          let cl=response.txId;
          //toast.success(`Create Listing Sucessfully ${response.txId}`,{autoClose: 8000});            
        //db here          
        let dateset=new Date().toDateString();
        //fireDb.auth().signInAnonymously().then((responses)=>{                     
        fireDb.database().ref(`imagerefAlgo/${localStorage.getItem('walletAddress')}`).child(b.keyId).update({
            Assetid:b.Assetid,Imageurl:b.Imageurl,NFTPrice:parseFloat(amountmul),EscrowAddress:lsig.address(),keyId:b.keyId,
            NFTName:b.NFTName,userSymbol:b.userSymbol,Ipfsurl:b.Ipfsurl,ownerAddress:b.ownerAddress,previousoaddress:localStorage.getItem('walletAddress'),
            TimeStamp:dateset,NFTDescription:b.NFTDescription,HistoryAddress:b.HistoryAddress,Appid:b.Appid,valid:b.valid,
            CreatorAddress:b.CreatorAddress,NFTType:b.NFTType,NFTChannel:b.NFTChannel,SocialLink:b.SocialLink
        }).then(()=>{  
            let refactivity=fireDb.database().ref(`activitytable/${localStorage.getItem('walletAddress')}`);   
            const db = refactivity.push().key;                         
            refactivity.child(db).set({
                Assetid:b.Assetid,Imageurl:b.Imageurl,NFTPrice:parseFloat(amountmul),EscrowAddress:"priceupdated",keyId:db,
                NFTName:b.NFTName,userSymbol:b.userSymbol,Ipfsurl:b.Ipfsurl,ownerAddress:b.ownerAddress,previousoaddress:localStorage.getItem('walletAddress'),
                TimeStamp:dateset,NFTDescription:cl,HistoryAddress:b.HistoryAddress,Appid:b.Appid,valid:b.valid,
                CreatorAddress:b.CreatorAddress,NFTType:b.NFTType,NFTChannel:b.NFTChannel,SocialLink:b.SocialLink
        })
        .then(()=>{                                        
            //handleHideLoad()
            //setShowTestLoading(true)
            //setshowTestDone(true)
            toast.success(`NFT Price Updated Successfully`,{autoClose: 5000});            
            handleHideLoad()
            done()
            })                        
        })            
    //})
        //db end here                  
    } catch (err) {
            console.error(err);
            //setShowTestLoading(false)
            toast.error(`your browser appearing issue`,{autoClose: 5000});            
            handleHideLoad()
            done()
            //toast.dismiss();
            //setissuesdisplay("your browser appearing issue")
            //setshowTestAlert(true)                      
            // alert("you wallet raises some issues")
            //window.location.reload(false)
          }

        }              
        }            
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    const done=async()=>{
        await sleep(7000);
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
                    <h5 className='mb-2'>{x.NFTName} <br />
                                        </h5>
                                        <p className='subheading mb-0'>
                                        <span className='text-success'>
                                            {x.SocialLink === null || x.SocialLink === "" || x.SocialLink === undefined ?(
                                                <>{configfile.nullvalue}</>
                                            ):(
                                                <h6>{x.SocialLink}</h6>
                                            )}                                            
                                        </span>
                                        </p>
                                        <br />
                    
                    {x.NFTPrice === "" || x.NFTPrice === null || x.NFTPrice === undefined ?(
                        <>                                            
                        <h5 className='d-flex mb-3 align-items-center'><img src={getIProfile[0].Imageurl} alt="logo" className='me-2 avatar-pic' />
                        {/* <input type="text" placeholder='Enter Price' className="className='d-flex mb-2 align-items-center" style={{width:'80%',height:'1%'}} onChange={event => setprices( event.target.value)}/> */}
                        <div className="input-group-max d-flex align-items-center text-nowrap px-3 input-group-max-lg w-100">
                        <input type="number" placeholder='Enter Price' className='form-control' value={((getprices))} onChange={event => setprices((event.target.value))} />
                        </div>
                        </h5> 
                        <ButtonLoad loading={loader} variant="blue" className='w-100' onClick={()=>{setpricedb(x)}}>Update Price</ButtonLoad>                                        
                        </>
                    ):(
                        <>
                        <h5 className='d-flex mb-3 align-items-center'><img src={getIProfile[0].Imageurl} alt="logo" className='me-2 avatar-pic' />{x.NFTPrice/1000000}</h5>
                        <ButtonLoad loading={loader} variant="blue" className='w-100' onClick={()=>{saledb(x)}}>Sale</ButtonLoad>                          
                        </>
                    )} 
                </Card>
                </Col>                
        
    )
}

export default CreateTab