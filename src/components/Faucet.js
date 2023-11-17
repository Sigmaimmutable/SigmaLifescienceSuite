import React, { Component, useState, useEffect, useRef } from 'react';
import { Col, Container, Row, Button, Dropdown, OverlayTrigger, Tooltip  } from 'react-bootstrap';
import Layout from './Layouts/LayoutInner';
import {
    Link, useHistory
  } from "react-router-dom";
import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';
import MyAlgoConnect from '@randlabs/myalgo-connect';
import sLogo from '../assets/images/elem-original.png';
import usdcLogo from '../assets/images/usdc-logo.png';
import assetFile from './Dashboard/stablecoin.json'
import dai from '../assets/images/dai.png';
const algosdk = require('algosdk');
const algodClient = new algosdk.Algodv2('', 'https://node.testnet.algoexplorerapi.io', '');
const indexClient = new algosdk.Indexer('', 'https://algoindexer.testnet.algoexplorerapi.io', '');const myAlgoConnect = new MyAlgoConnect();

function Faucet() {

    const[elemBalance,setElemBalance] = useState("");
    const[usdcBalance,setUsdcBalance] = useState("");
  
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
     }
  
     const reload = async () => {
      window.location.reload();
     }

    const waitForConfirmation = async function (algodclient, txId) {
        let status = (await algodclient.status().do());
        let lastRound = status["last-round"];
          while (true) {
            const pendingInfo = await algodclient.pendingTransactionInformation(txId).do();
            if (pendingInfo["confirmed-round"] !== null && pendingInfo["confirmed-round"] > 0) {
              //Got the completed Transaction
            //   console.log("Transaction " + txId + " confirmed in round " + pendingInfo["confirmed-round"]);
              break;
            }
            lastRound++;
            await algodclient.statusAfterBlock(lastRound).do();
          }
        };  



  const assetoptin = async() => {
  
  try{

  const params = await algodClient.getTransactionParams().do();
  
  const assetoptin1 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
  from: localStorage.getItem("walletAddress"),
  to: localStorage.getItem("walletAddress"),
  assetIndex: parseInt(assetFile.elemID),
  note: undefined,
  amount: 0,
  suggestedParams: params
  });
  const assetoptin2 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
    from: localStorage.getItem("walletAddress"),
    to: localStorage.getItem("walletAddress"),
    assetIndex: parseInt(assetFile.usdcID),
    note: undefined,
    amount: 0,
    suggestedParams: params
    });

    const groupID = algosdk.computeGroupID([assetoptin1, assetoptin2]);
    const txs = [ assetoptin1, assetoptin2];
    txs[0].group = groupID;
    txs[1].group = groupID;
  
  const signedTxn = await myAlgoConnect.signTransaction([txs[0].toByte(), txs[1].toByte()]);
  toast.info(`Transaction in Progress`);
  const response = await algodClient.sendRawTransaction([signedTxn[0].blob, signedTxn[1].blob]).do();

  await waitForConfirmation(algodClient, response.txId);
  toast.success(`USDC and ELEM assets opted in Successfully to ${localStorage.getItem("walletAddress")}`);
  }
  catch (err) {
  toast.error(`Error:${err}`);
  console.error(err);
  }
  }
  
  const assetBuy = async() => { 
  try {

      var escrowdata = `
      #pragma version 5
      
      txn OnCompletion
      int OptIn
      ==
      int 1
      return
      global GroupSize
      int 2
      ==
      gtxn 0 TypeEnum
      int pay
      ==
      &&
      gtxn 1 TypeEnum
      int axfer
      ==
      bz failed
      int 1
      return
      failed:
      int 0
      return
  `;
  
  // get node suggested parameters
  let params = await algodClient.getTransactionParams().do();
  // comment out the next two lines to use suggested fee
  params.fee = 1000;
  params.flatFee = true;
  
  let results = await algodClient.compile(escrowdata).do();
  console.log("Hash = " + results.hash);
  console.log("Result = " + results.result);
  let program = new Uint8Array(Buffer.from(results.result, "base64"));
  
  
  let lsig =new algosdk.LogicSigAccount(program);
    
  
  let escrowAddress = lsig.address();
  
    let transaction1 =algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        from: localStorage.getItem("walletAddress"),
        to: escrowAddress,
        amount: 2000,
        suggestedParams: params});
  
    let transaction2 =algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from: escrowAddress,
      to: localStorage.getItem("walletAddress"),
      amount: 10000000,
      assetIndex: parseInt(assetFile.usdcID),
      suggestedParams: params});
      let transaction3 =algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        from: escrowAddress,
        to: localStorage.getItem("walletAddress"),
        amount: 10000000,
        assetIndex: parseInt(assetFile.elemID),
        suggestedParams: params});
  
  const groupID = algosdk.computeGroupID([transaction1, transaction2, transaction3]);
      const txs = [ transaction1, transaction2, transaction3];
      txs[0].group = groupID;
      txs[1].group = groupID;
      txs[2].group = groupID;
     
  const signedTx1 = await myAlgoConnect.signTransaction(txs[0].toByte());
  const signedTx2 = algosdk.signLogicSigTransaction(txs[1], lsig);
  const signedTx3 = algosdk.signLogicSigTransaction(txs[2], lsig);
  toast.warn(`Transaction in Progress`);
  const response = await algodClient.sendRawTransaction([ signedTx1.blob, signedTx2.blob, signedTx3.blob]).do();
//   console.log("TxID", JSON.stringify(response, null, 1));
  toast.success(`10 USDC and 10 USDC Dispensed Successfully with ${response.txId}`);
  await waitForConfirmation(algodClient, response.txId);
  reload();
  //alert("Buy Successfully");

  }
  catch (err) {
    toast.error(`Error: ${err}`);
    console.error(err);
  } 
  }

  useEffect(async () => {
    await balAsset();
}, [usdcBalance, elemBalance]);

const balAsset = async () =>
{
let bal = await indexClient.lookupAccountByID(localStorage.getItem("walletAddress")).do();
let l = bal['account']['assets']['length'];
// console.log(bal['account']['assets']);
for(let i = 0; i < l; i++)
{
    if(bal['account']['assets'][i]['asset-id'] === assetFile.usdcID)
    {
        setUsdcBalance(bal['account']['assets'][i]['amount']);
        break;
    }
}
for(let j = 0; j < l; j++)
{
    if(bal['account']['assets'][j]['asset-id'] === assetFile.elemID)
    {
        setElemBalance(bal['account']['assets'][j]['amount']);
        break;
    }
}

// setAssets(bal['account']['assets']);
}

    return (
        <Layout>
             <><ToastContainer position='top-center' draggable = {false} transition={Zoom} autoClose={8000} closeOnClick = {false}/></>
            <div className="page-content">
           
                <Container fluid="sm">
                    <div className="d-flex justify-content-center">
                    
                        <ul className="nav-filter mb-40 d-flex align-items-center list-unstyled">
                        <OverlayTrigger
                         placement="top"
                         overlay={
                         <Tooltip id={`tooltip-top`}>
                          NOTE : This USDC and ELEM assets are only for Testing purpose
                          </Tooltip>
                          }
                          >

                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#969696" className="bi d-block bi-info-circle" viewBox="0 0 16 16">
                                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                                            </svg>
                                                        </OverlayTrigger>&nbsp;&nbsp;
                            <li><a href="#" className='active'>Testnet Faucet </a></li> 
                                                  
                        </ul>
                        
                        {/* <br/><br/><br/><br/><br/><br/><br/>
                        <ul className="nav-filter mb-40 d-flex align-items-center list-unstyled">
                        <li><a href="#" className='active'>This ELEM Token Is Only for Testing Purpose</a></li>
                            
                            
                        </ul> */}

                    </div>

                    <h6 className='text-center mb-40'></h6>

                    <Row className='align-items-center mb-20'>
                            <div className="card-base card-dropdown justify-content-center d-flex align-items-center card-dark mb-20">
                                {/* <div className="card-icon"> */}
                                <img src={sLogo} width="40px" height="40px"/>&nbsp;&nbsp;
                                    {/* <svg width="44" height="30" viewBox="0 0 44 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M39.7035 14.7809C40.8265 15.8462 41.9184 16.8804 43.0325 17.9413C42.8861 18.0389 42.8017 18.101 42.713 18.1499C35.904 22.0693 29.0905 25.9842 22.2815 29.908C22.0907 30.019 21.9531 30.0368 21.7578 29.9214C14.9354 25.9798 8.10426 22.0426 1.27751 18.101C1.20649 18.0611 1.13547 18.0167 0.966797 17.9102C1.242 17.6661 1.495 17.4619 1.72582 17.2355C2.41382 16.5519 3.10182 15.8639 3.77207 15.1626C3.96293 14.9629 4.10053 14.9407 4.3491 15.0827C10.1194 18.3762 15.8986 21.6565 21.669 24.95C21.9486 25.1098 22.1395 25.1053 22.4147 24.9456C28.0963 21.5943 33.7867 18.2564 39.4771 14.914C39.5792 14.8519 39.6857 14.7942 39.7035 14.7809Z" fill="url(#paint0_linear_2_566)"/>
                                        <path d="M6.43116 7.5636C7.4565 8.15839 8.42858 8.71767 9.4051 9.28582C13.5154 11.6694 17.63 14.0574 21.7359 16.4499C21.9844 16.5964 22.162 16.6053 22.4194 16.4544C27.3109 13.5825 32.2157 10.724 37.116 7.86099C37.2581 7.77666 37.4045 7.69676 37.6043 7.58579C37.6043 8.00747 37.6043 8.37588 37.6043 8.74874C37.6043 9.9028 37.5998 11.0569 37.6087 12.2065C37.6132 12.4284 37.5555 12.5527 37.3601 12.6681C32.3311 15.571 27.302 18.4828 22.2774 21.3991C22.1043 21.4967 21.9889 21.4923 21.8202 21.3946C16.7822 18.505 11.7399 15.6199 6.70192 12.7258C6.58651 12.6592 6.44447 12.5039 6.44447 12.3929C6.42672 10.8039 6.43116 9.2148 6.43116 7.5636Z" fill="url(#paint1_linear_2_566)"/>
                                        <path d="M12.3828 7.40378C16.6484 4.93142 20.8741 2.48124 25.153 0C25.1663 0.17311 25.1841 0.297394 25.1885 0.421678C25.2151 1.41595 25.2507 2.41022 25.2595 3.40894C25.2595 3.53322 25.1663 3.71077 25.0598 3.77291C21.9571 5.58391 18.85 7.38159 15.7429 9.17483C15.6453 9.2281 15.4722 9.25473 15.3878 9.2059C14.3891 8.61999 13.4082 8.02077 12.3828 7.40378Z" fill="url(#paint2_linear_2_566)"/>
                                        <path d="M27.2085 6.34729C27.2085 7.56794 27.213 8.69537 27.1996 9.82281C27.1996 9.9249 27.0931 10.0625 26.9955 10.1202C25.3931 11.0568 23.7863 11.98 22.175 12.9033C22.0951 12.9521 21.9486 12.9832 21.8821 12.9432C20.8745 12.3662 19.8758 11.7714 18.8193 11.15C21.6202 9.54761 24.3722 7.97186 27.2085 6.34729Z" fill="url(#paint3_linear_2_566)"/>
                                        <defs>
                                        <linearGradient id="paint0_linear_2_566" x1="21.9996" y1="35.1694" x2="21.9996" y2="10.7033" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#5B86E5"/>
                                        <stop offset="1" stop-color="#36D1DC"/>
                                        </linearGradient>
                                        <linearGradient id="paint1_linear_2_566" x1="22.0198" y1="26.1937" x2="22.0198" y2="3.83769" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#5B86E5"/>
                                        <stop offset="1" stop-color="#36D1DC"/>
                                        </linearGradient>
                                        <linearGradient id="paint2_linear_2_566" x1="18.8212" y1="12.3673" x2="18.8212" y2="-2.47337" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#5B86E5"/>
                                        <stop offset="1" stop-color="#36D1DC"/>
                                        </linearGradient>
                                        <linearGradient id="paint3_linear_2_566" x1="23.0143" y1="15.2081" x2="23.0143" y2="4.57518" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#5B86E5"/>
                                        <stop offset="1" stop-color="#36D1DC"/>
                                        </linearGradient>
                                        </defs>
                                    </svg> */}
                                {/* </div> */}
                                <div className="card-text">
                                    Your ELEM Balance : {(elemBalance/1000000).toFixed(3)}

                                </div>
                            </div>
                            <div className="card-base card-dropdown justify-content-center d-flex align-items-center card-dark">
                                {/* <div className="card-icon"> */}
                                <img src={dai} width="40px" height="40px"/>&nbsp;&nbsp;

                                <div className="card-text">
                                    Your DAI Balance : {(usdcBalance/1000000).toFixed(3)}

                                </div>
                            </div>
                    </Row>

                    {/* <div className="card-base card-dark card-token mb-30">
                        <div className="d-flex flex-sm-row flex-column mb-10 card-token-head align-items-center justify-content-sm-between justify-content-center text-nowrap">
                            <p className='text-uppercase me-3 mb-sm-0 mb-3'>Token to bridge:</p>
                            <input type="text" onChange={(e) => setValue(e.target.value)} placeholder='Enter Token' className='form-control' value={value} />
                        </div>
                        <div className="d-flex flex-sm-row flex-column align-items-center justify-content-sm-between justify-content-center text-nowrap">
                            <span className='py-2 mb-sm-0 mb-2'>Balance on Algorand</span>
                            <Button variant='white'>Select a token</Button>
                        </div>
                    </div> */}
                    <center>
                    <Button variant='outline-white' className='btn-lg w-50 mb-10' onClick={()=>assetoptin()}>Opt-In USDC and ELEM</Button><br/><br/>
                    <Button variant='outline-white' className='btn-lg w-50 mb-10'onClick={()=>assetBuy()}>Dispense USDC and ELEM</Button>
                    </center>
                    {/* <p className='text-center'>Powered by <strong className='text-uppercase'>element</strong></p> */}
                </Container>
            </div>
        </Layout>
    );
}

export default Faucet;