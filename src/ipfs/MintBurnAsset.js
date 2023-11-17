import React,{ useEffect ,useState} from "react";
import { Link, useHistory } from "react-router-dom";
import {  Col, Container,Row,Button } from "reactstrap";
import ButtonLoad from 'react-bootstrap-button-loader';
import Compress from "react-image-file-resizer";
import ipfs from "./ipfs";
//import Layout from '../components/Layouts/Layout';
//import Layout from '../components/Dashboard/Layout';
//import Layout from '../components/DashboardNew/Layout';
import Layout from '../components/DashboardNew/LayoutT';
import { ToastContainer, Zoom, toast} from 'react-toastify';
import fireDb from '../NFTFolder/firebase'
import escrow from '../KycDid/escrow'
import node from '../components/DashboardNew/nodeapi.json';
import MyAlgoConnect from '@randlabs/myalgo-connect';
import { updatealgobalance } from "../components/formula";
import firebase from '../NFTFolder/firebase';
import PostCardNew from "../components/Snippets/PostCardNew";

const algosdk = require('algosdk'); 
const algodClientGet = new algosdk.Algodv2('', node['algodclient'], '');
const algodClient = new algosdk.Algodv2('', node['algodclient'], '');
const indexClient = new algosdk.Indexer('', node['indexerclient'], '');
const myAlgoWallet = new MyAlgoConnect();
const MintBurnAsset = () => {  
  useEffect(() => {
    document.title = "Sigma | Minter"
}, [])
         
    const[loader, setLoader] = useState(false);
    const handleShowLoad = () => setLoader(true);
    const handleHideLoad = () => setLoader(false); 

    const[loaderBurn, setLoaderBurn] = useState(false);
    const handleShowLoadBurn = () => setLoaderBurn(true);
    const handleHideLoadBurn = () => setLoaderBurn(false); 

    const[assetID,setAssetID]=useState("");
    const[assetAmount,setAmount]=useState("");
    const[minAlgo, setMinAlgo] = useState("");
    const[mintBal, setMintBal] = useState("");

    const algodClient = new algosdk.Algodv2('', node['algodclient'], '');
    
    const toastDiv = (txId) =>
    (
    <div>
         <p> Transaction is successful &nbsp;<a style={{color:'#133ac6'}} href={txId} target="_blank" rel="noreferrer"><br/><p style={{fontWeight: 'bold'}}>View in Algoexplorer <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M11.7176 3.97604L1.69366 14L0.046875 12.3532L10.0697 2.32926H1.23596V0H14.0469V12.8109H11.7176V3.97604Z" fill="#133ac6"/>
          </svg></p></a></p>  
     </div>
    );

    const waitForConfirmation = async function (client, txId) {
      let status = (await client.status().do());
      let lastRound = status["last-round"];
        while (true) {
          const pendingInfo = await client.pendingTransactionInformation(txId).do();
          if (pendingInfo["confirmed-round"] !== null && pendingInfo["confirmed-round"] > 0) {
            //Got the completed Transaction
          //   // console.log("Transaction " + txId + " confirmed in round " + pendingInfo["confirmed-round"]);
          // toast.success(`Transaction ${txId} is successful and confirmed in round ${pendingInfo["confirmed-round"]}`);
          let id = "https://testnet.algoexplorer.io/tx/" + txId;
          toast.success(toastDiv(id));
          handleHideLoad();
          handleHideLoadBurn();
          await updatealgobalance();
          // await sleep(5000);
          // reload();  
          break;
          }
          lastRound++;
          await client.statusAfterBlock(lastRound).do();
        }
      };  

      const mintAsset = async () =>
      {
        handleShowLoad();
        if (localStorage.getItem("walletAddress") === "")
        {
            toast.error("Connect your wallet");
            handleHideLoad();
        }
        else{
            if(parseFloat(minAlgo) < 2000)
            {
                toast.error("Your Algo balance is low. Please get more Algos from dispenser.")
                handleHideLoad();
            }
            else
            {
        try{
          let asset = await indexClient.lookupAssetByID(parseInt(assetID)).do();
          let decimal = asset['asset']['params']['decimals'];

          const params = await algodClient.getTransactionParams().do();

          let dataReplace = escrow.replaceAll("Address",localStorage.getItem("walletAddress")).replaceAll("AssetID",parseInt(assetID));
          let results = await algodClient.compile(dataReplace).do();
            
          let program = new Uint8Array(Buffer.from(results.result, "base64"));
          
          let lsig = new algosdk.LogicSigAccount(program);

          let sender = localStorage.getItem("walletAddress");
          // create unsigned transaction
          let transaction1 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
            from:sender, 
            to: lsig.address(), 
            amount: 1000, 
            suggestedParams: params
          })
          
          let sender_es = lsig.address();
          let receiver_es = localStorage.getItem("walletAddress");

          let transaction2 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
            from: sender_es, 
            to: receiver_es,  
            amount: parseInt(assetAmount) * Math.pow(10, decimal), 
            assetIndex: parseInt(assetID), 
            suggestedParams: params
          }); 
    
          const groupID = algosdk.computeGroupID([ transaction1, transaction2]);
          const txs = [ transaction1, transaction2 ];
          txs[0].group = groupID;
          txs[1].group = groupID;
          
          const signedTx1 = await myAlgoWallet.signTransaction(txs[0].toByte());
          const signedTx2 = algosdk.signLogicSigTransaction(txs[1], lsig);

      const response = await algodClient.sendRawTransaction([ signedTx1.blob, signedTx2.blob]).do();

      await waitForConfirmation(algodClient, response.txId); 
        }  
        catch (err) {
          toast.error(err.toString());
          handleHideLoad();
          console.error(err);
      }
      }
      }
    }

    const check = async () =>
    {
      let asset = await indexClient.lookupAssetByID(115661285).do();
      console.log(asset['asset']['params']['decimals']);
    }

    const burnAsset = async () =>
    {
      handleShowLoadBurn();
      if (localStorage.getItem("walletAddress") === "")
      {
          toast.error("Connect your wallet");
          handleHideLoadBurn();
      }
      else{
          if(parseFloat(minAlgo) < 2000)
          {
              toast.error("Your Algo balance is low. Please get more Algos from dispenser.")
              handleHideLoadBurn();
          }
          else
          {
      try{
        let asset = await indexClient.lookupAssetByID(parseInt(assetID)).do();
        let decimal = asset['asset']['params']['decimals'];

        const params = await algodClient.getTransactionParams().do();

        let dataReplace = escrow.replaceAll("Address",localStorage.getItem("walletAddress")).replaceAll("AssetID",parseInt(assetID));
        let results = await algodClient.compile(dataReplace).do();
          
        let program = new Uint8Array(Buffer.from(results.result, "base64"));
        
        let lsig = new algosdk.LogicSigAccount(program);

        let sender = localStorage.getItem("walletAddress");
        // create unsigned transaction
        let transaction1 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
          from:sender, 
          to: lsig.address(), 
          amount: 1000, 
          suggestedParams: params
        })
        
        let sender_es = localStorage.getItem("walletAddress");
        let receiver_es = lsig.address();

        let transaction2 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
          from: sender_es, 
          to: receiver_es,  
          amount: parseInt(assetAmount) * Math.pow(10, decimal), 
          assetIndex: parseInt(assetID), 
          suggestedParams: params
        }); 
  
        const groupID = algosdk.computeGroupID([ transaction1, transaction2]);
        const txs = [ transaction1, transaction2 ];
        txs[0].group = groupID;
        txs[1].group = groupID;
        
        const signedTx = await myAlgoWallet.signTransaction([txs[0].toByte(), txs[1].toByte()]);

        const response = await algodClient.sendRawTransaction([ signedTx[0].blob, signedTx[1].blob ]).do();

        await waitForConfirmation(algodClient, response.txId); 
      }  
      catch (err) {
        toast.error(err.toString());
        handleHideLoadBurn();
        console.error(err);
    }
    }
    }
  }

    useEffect(async() => {
      await minBal();
  }, [minAlgo]);

      const minBal = async () =>
      {
          let min = await algodClientGet.accountInformation(localStorage.getItem("walletAddress")).do();
          // // console.log("minBalanceApi", min['min-balance']);
          setMinAlgo(min['amount'] - min['min-balance']);
          // console.log("minBalance", minAlgo);
      }

      useEffect(async() => {
        await mintBalance();
    }, [mintBal, assetID]);
  
        const mintBalance = async () =>
        {
            let addressDetails = await algodClientGet.accountInformation(localStorage.getItem("walletAddress")).do();
            // // console.log("minBalanceApi", min['min-balance']);
            setMintBal();
            // console.log("minBalance", minAlgo);
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
              <Col xs={6} className="mb-3">
                <label>Asset ID:</label>
                <input placeholder="Asset ID" type="number" className="form-control form-control-reset" onChange={event => setAssetID( event.target.value)}/>                
              </Col>
              <Col xs={6} className="mb-3">
                <label>Amount to Mint:</label>
                <input placeholder="Unit Name" type="text" className="form-control form-control-reset" style={{color:'#808080'}} onChange={event => setAmount( event.target.value)}/>                
              </Col>
            </Row>            
               <ButtonLoad loading={loader} className='w-100 btn-blue mb-3' onClick={()=>{mintAsset()}}>Mint Asset</ButtonLoad>            
          </form>        
          <form>
            <Row>
              <Col xs={6} className="mb-3">
                <label>Asset ID:</label>
                <input placeholder="Asset ID" type="number" className="form-control form-control-reset" onChange={event => setAssetID( event.target.value)}/>                
              </Col>
              <Col xs={6} className="mb-3">
                <label>Amount to Burn:</label>
                <input placeholder="Unit Name" type="text" className="form-control form-control-reset" style={{color:'#808080'}} onChange={event => setAmount( event.target.value)}/>                
              </Col>
            </Row>            
               <ButtonLoad loading={loaderBurn} className='w-100 btn-blue mb-3' onClick={()=>{burnAsset()}}>Burn Asset</ButtonLoad>            
          </form>    
          {/* <Button className='w-100 mb-3' onClick={()=>{check()}}>check</Button>             */}
          </Container>
      )}        
    </Layout>                      
)
}

export default MintBurnAsset;