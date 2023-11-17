/* global AlgoSigner */
import React,{ useEffect ,useState} from "react";
import {  Col, Container, InputGroup, Row,Button } from "reactstrap";
import { useHistory,Link } from "react-router-dom";
//import Layout from '../components/Layouts/Layout';
//import Layout from '../components/Dashboard/Layout';
//import Layout from '../components/DashboardNew/Layout';
import fireDb from '../NFTFolder/firebase'
import Layout from '../components/DashboardNew/LayoutT';
import { ToastContainer, Zoom, toast} from 'react-toastify';
import ButtonLoad from 'react-bootstrap-button-loader';
import config from '../NFTFolder/config.json'
import node from '../components/DashboardNew/nodeapi.json';
import MyAlgoConnect from '@randlabs/myalgo-connect';
import { updatealgobalance } from "../components/formula"; 
//const bs58 = require("bs58");

const algosdk = require('algosdk'); 
const algodClientGet = new algosdk.Algodv2('', node['algodclient'], '');
const algodClient = new algosdk.Algodv2('', node['algodclient'], '');
const indexClient = new algosdk.Indexer('', node['indexerclient'], '');
const myAlgoWallet = new MyAlgoConnect();     
const Approvepage = () => {  
  useEffect(() => {
    document.title = "Sigma | Freeze"
}, [])
         
    const[loader, setLoader] = useState(false);
    const handleShowLoad = () => setLoader(true);
    const handleHideLoad = () => setLoader(false); 

    const[loader2, setLoader2] = useState(false);
    const handleShowLoad2 = () => setLoader2(true);
    const handleHideLoad2 = () => setLoader2(false); 


    const[assetID,setDecimals]=useState("");

    const[managerAddress,setManagerAddress]=useState("");

    const [minAlgo, setMinAlgo] = useState("");

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
          handleHideLoad2();
          await updatealgobalance();
          // await sleep(5000);
          // reload();  
          break;
          }
          lastRound++;
          await client.statusAfterBlock(lastRound).do();
        }
      };  

      const freezeAsset = async () =>
      {
        handleShowLoad();
        if (localStorage.getItem("walletAddress") === "")
        {
            toast.error("Connect your wallet");
            handleHideLoad();
        }
        else{
            if(parseFloat(minAlgo) < 1000)
            {
                toast.error("Your Algo balance is low. Please get more Algos from dispenser.")
                handleHideLoad();
            }
            else
            {
        try{
        let params = await algodClient.getTransactionParams().do();

        params.fee = 1000;
        params.flatFee = true;
        console.log(params);

        let addr = localStorage.getItem("walletAddress");
        
        let manager = managerAddress;

        let txn = algosdk.makeAssetFreezeTxnWithSuggestedParamsFromObject(
          {
            from: addr,
            assetIndex: parseInt(assetID),
            freezeTarget: manager,
            freezeState: true,
            suggestedParams: params
          }
        );
    
        const signedTxn = await myAlgoWallet.signTransaction(txn.toByte());
        //toast.info("Transaction in Progress");
        const response = await algodClient.sendRawTransaction(signedTxn.blob).do();
        await waitForConfirmation(algodClient, response.txId);
        setDecimals("");
        setManagerAddress("");
        }  
        catch (err) {
          toast.error(err.toString());
          handleHideLoad();
          console.error(err);
      }
      }
      }
    }

    const unfreezeAsset = async () =>
    {
      handleShowLoad2();
      if (localStorage.getItem("walletAddress") === "")
      {
          toast.error("Connect your wallet");
          handleHideLoad2();
      }
      else{
          if(parseFloat(minAlgo) < 1000)
          {
              toast.error("Your Algo balance is low. Please get more Algos from dispenser.")
              handleHideLoad2();
          }
          else
          {
      try{
      let params = await algodClient.getTransactionParams().do();

      params.fee = 1000;
      params.flatFee = true;
      console.log(params);

      let addr = localStorage.getItem("walletAddress");

      let manager = managerAddress;

  
      // signing and sending "txn" allows "addr" to create an asset
      let txn = algosdk.makeAssetFreezeTxnWithSuggestedParamsFromObject(
        {
          from: addr,
          assetIndex: parseInt(assetID),
          freezeTarget: manager,
          freezeState: false,
          suggestedParams: params
        }
      );
  
      const signedTxn = await myAlgoWallet.signTransaction(txn.toByte());
      //toast.info("Transaction in Progress");
      const response = await algodClient.sendRawTransaction(signedTxn.blob).do();
      await waitForConfirmation(algodClient, response.txId);
      setDecimals("");
      setManagerAddress("");
      }  
      catch (err) {
        toast.error(err.toString());
        handleHideLoad2();
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
                <label htmlFor="email">Asset-ID:</label>
                <input required placeholder="Enter Asset-ID" type="number" className="form-control form-control-reset" id="email" onChange={event => setDecimals( event.target.value)}/>                
              </Col>
              <Col xs={6} className="mb-3">
                <label htmlFor="citizenship">Freeze Target Address:</label>
                <input placeholder="Enter Freeze Target Address" type="text"  id="citizenship" className="form-control form-control-reset" onChange={event => setManagerAddress( event.target.value)}/>                
              </Col>
            </Row>  
            <center>          
               <ButtonLoad loading={loader} className='w-25 mb-3 btn-blue' onClick={()=>{freezeAsset()}}>Freeze</ButtonLoad> &nbsp; (OR) &nbsp;
               <ButtonLoad loading={loader2} className='w-25 mb-3  btn-blue float-right' onClick={()=>{unfreezeAsset()}}>UnFreeze</ButtonLoad>            
            </center>
          </form>       
          </Container>
      )}        
    </Layout>                      
)
}
export default Approvepage;