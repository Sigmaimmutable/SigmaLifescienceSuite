import React, {useState, useEffect} from 'react';
import { Container, Row, Col, OverlayTrigger, Tooltip, Form, Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';
import Arrow from '../../assets/images/arrow-tr.svg';
import TotalValueDepositedChart from './Snippets/TotalValueDepositedChart';
import MarketValueTreasuryAssets from './Snippets/MarketValueTreasuryAssets';
import RiskFreeValueTreasuryAsset from './Snippets/RiskFreeValueTreasuryAsset';
import SLPTreasury from './Snippets/SLPTreasury';
import TAUStaked from './Snippets/TAUStaked';
import RunwayAvailable from './Snippets/RunwayAvailable';
import SLogo from '../../assets/images/sidebar-logo.png'
import MyAlgoConnect from '@randlabs/myalgo-connect';
import connectWalletHeader from "./Header"; 
import configSupply from './stablecoin.json';

const myAlgoWallet = new MyAlgoConnect({ disableLedgerNano: false });
const algosdk = require("algosdk");
// const algodClient = new algosdk.Algodv2('', 'https://api.testnet.algoexplorer.io', '');

let TotalSupply = 18446744073709551615;
const Dashboard = () => {
    React.useEffect(() => {
        window.scrollTo(0, 0);
    });

const [totalSupply, setTotalSupply] = useState("");
const [cirSupply, setCirSupply] = useState("");
const [treasuryBalance, setTreasuryBalance] = useState("");
const [bondBalance, setBondBalance] = useState("");
const [stakeBalance, setStakeBalance] = useState("");
const [reserveBalance, setReserveBalance] = useState("");
const [einrCir, setEinrCir] = useState("");
const [tauCir, setTauCir] = useState("");
const [show, setShow] = React.useState(false);

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

// let appID_global = 77396031;
// let tauID = 71682000;
// let einrID = 77353167;
// let elemID = 71116238;
// let usdcID = 71311423;
// let elemReserve = "Z6AEFL237SLCYWEDPGPVP5SCKJ7MOQWIC6EMCTRLBAZPGSSRQQQV3GCXFQ";

const baseServer = 'https://testnet-algorand.api.purestake.io/ps2';
const port = '';

const token = {
   'X-API-Key': 'pOD5BAUCxq7InVPjo0sO01B0Vq4d7pD1ask5Ix43'
}

const algodClientGet = new algosdk.Algodv2(token, baseServer, port);

    const algodClient = new algosdk.Algodv2('', 'https://node.testnet.algoexplorerapi.io', '');
    const indexClient = new algosdk.Indexer('', 'https://algoindexer.testnet.algoexplorerapi.io', '');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }
 
const waitForConfirmation = async function (client, txId) {
    let status = (await client.status().do());
    let lastRound = status["last-round"];
      while (true) {
        const pendingInfo = await client.pendingTransactionInformation(txId).do();
        if (pendingInfo["confirmed-round"] !== null && pendingInfo["confirmed-round"] > 0) {
          //Got the completed Transaction
          //console.log("Transaction " + txId + " confirmed in round " + pendingInfo["confirmed-round"]);
        //   toast.success(`Transaction Successful with ${txId}`);
          toast.success(`Transaction ${txId} confirmed in round ${pendingInfo["confirmed-round"]}`);
          break;
        }
        lastRound++;
        await client.statusAfterBlock(lastRound).do();
      }
    };   

// const opt = async () =>{
    
// }


const fetch = async () => {
  await rebaseGlobalState();

  }

const rebaseGlobalState = async () => {
//     let accountCheckInfo = algodClient.accountInformation(localStorage.getItem("walletAddress")).do();
//     let appCount = accountCheckInfo['apps-local-state']['length'];
//     for(let j = 0; j < appCount; j++)
// {
//     if(accountCheckInfo['apps-local-state'][j]['id'] != 77396031 && accountCheckInfo['apps-local-state'][j]['id'] != appID_global && accountCheckInfo['apps-local-state'][j]['id'] != 71951577 && accountCheckInfo['apps-local-state'][j]['id'] != 71326217)
//     {
//         handleShow();
//         break;
//     }
// }

  let appById = await algodClientGet.getApplicationByID(parseInt(configSupply.rebaseAppID)).do();
  let appArgsRet = [];
  appArgsRet.push(JSON.stringify(appById['params']['global-state'][0]['key']));
  appArgsRet.push(JSON.stringify(appById['params']['global-state'][1]['key']));
  appArgsRet.push(JSON.stringify(appById['params']['global-state'][2]['key']));
  appArgsRet.push(JSON.stringify(appById['params']['global-state'][3]['key']));
  appArgsRet.push(JSON.stringify(appById['params']['global-state'][4]['key']));
  appArgsRet.push(JSON.stringify(appById['params']['global-state'][5]['key']));
  appArgsRet.push(JSON.stringify(appById['params']['global-state'][6]['key']));
  appArgsRet.push(JSON.stringify(appById['params']['global-state'][7]['key']));
  appArgsRet.push(JSON.stringify(appById['params']['global-state'][8]['key']));
  console.log("array", appArgsRet);

  for (let i = 0; i <= 8; i++) { 

                  // if(appArgsRet[i] == '"Q3JlYXRvcg=="'){
                  //     let creatorAddress_c =  JSON.stringify(await appById['params']['global-state'][i]['value'][`bytes`]);
                  //     // console.log("creator address", creatorAddress_c)
                  //     setCreator(JSON.stringify(await appById['params']['global-state'][i]['value'][`bytes`]));
                  // }
                  if(appArgsRet[i] == '"UmViYXNlVGltZQ=="'){
                      let endDate_c = JSON.stringify(await appById['params']['global-state'][i]['value'][`uint`]);
                      // console.log(endDate_c);
                      localStorage.setItem("rebaseTime", JSON.stringify(await appById['params']['global-state'][i]['value'][`uint`]));
                  }
                  else if(appArgsRet[i] == '"UmViYXNlQ291bnQ="'){
                      let closeDate_c = JSON.stringify(await appById['params']['global-state'][i]['value'][`uint`]);
                      localStorage.setItem("rebaseCountStake",JSON.stringify(await appById['params']['global-state'][i]['value'][`uint`]));
                  }
                  // else if(appArgsRet[i] == '"R29hbA=="'){
                  //     let goalAmount_c = JSON.stringify(await appById['params']['global-state'][i]['value'][`uint`]);
                  //     setgoal(goalAmount_c);
                  // }
                  // else if(appArgsRet[i] == '"UmVjZWl2ZXI="'){
                  //     let recv_c = JSON.stringify(await appById['params']['global-state'][i]['value'][`bytes`]);
                  //     setrec(JSON.stringify(await appById['params']['global-state'][i]['value'][`bytes`]));
                  // }
                  // else if(appArgsRet[i] == '"U3RhcnREYXRl"'){
                  //     let startDate_c = JSON.stringify(await appById['params']['global-state'][i]['value'][`uint`]);
                  //     setstartdt(JSON.stringify(await appById['params']['global-state'][i]['value'][`uint`]));
                  // }
                  // else if(appArgsRet[i] == '"VG90YWw="'){
                  //     let total_c = JSON.stringify(await appById['params']['global-state'][i]['value'][`uint`]);
                  //     settotal(JSON.stringify(await appById['params']['global-state'][i]['value'][`uint`]));
                  // }
                  // else if(appArgsRet[i] == '"RXNjcm93"'){
                  //     let escrow_c = JSON.stringify(await appById['params']['global-state'][i]['value'][`bytes`]);
                  //     setescrow(JSON.stringify(await appById['params']['global-state'][i]['value'][`bytes`]));
                  // }
}
}

useEffect(async() =>{await fetch()},[])



    useEffect(async() => {
        await assetSupply()
    }, [totalSupply, cirSupply]);  

const assetSupply = async () => {
    let asset = await algodClientGet.getAssetByID(parseInt(configSupply.elemID)).do();
    // console.log(asset['params']['total']);
    let totalSupply = parseFloat(asset['params']['total']) / 1000000;
    setTotalSupply(totalSupply);
    let accountInfoResponse2 = await indexClient.lookupAccountByID(configSupply.dynamicStblecoinEscrow).do();
    // console.log(accountInfoResponse2['account']['assets'][0]['amount']);
    let l = accountInfoResponse2['account']['assets']['length'];
    for(let i = 0; i < l; i++)
    {
        if(accountInfoResponse2['account']['assets']['id'] === configSupply.elemID)
        {
            let reserveSupply = parseFloat(accountInfoResponse2['account']['assets'][i]['amount'])/1000000;
            let circulatingSupply = parseFloat(parseFloat(totalSupply) - parseFloat(reserveSupply)).toFixed(6);
            setCirSupply(circulatingSupply);
            break;
        }
    }
}

useEffect(async() => {
    await TreasuryBalance()
}, [treasuryBalance]);        

const TreasuryBalance = async () =>{
let balance = await indexClient.lookupAccountByID(configSupply.rebaseElemTreasury).do();
// console.log(balance['account']['assets'][0]['amount']);
setTreasuryBalance(parseFloat(balance['account']['assets'][0]['amount'])/1000000);
}

// useEffect(async() => {
//     await BondBalance()
// }, [bondBalance]);        

// const BondBalance = async () =>{
// let balance = await algodClient.accountInformation(configSupply.b_escrow).do();
// // console.log(balance['account']['assets'][0]['amount']);
// setBondBalance(parseFloat(balance['account']['assets'][0]['amount'])/1000000);
// }

// useEffect(async() => {
//     await StakeBalance()
// }, [stakeBalance]);        

// const StakeBalance = async () =>{
// let balance = await algodClient.accountInformation("QSVJYDZSCVCCDS2NGIMLCLHDUGL6TRTXHEPH4BQZP6MBBNLWCOM5TRJGEM").do();
// // console.log(balance['account']['assets'][0]['amount']);
// setStakeBalance(parseFloat(balance['account']['assets'][0]['amount'])/1000000);
// }

useEffect(async() => {
    await ReserveBalance()
}, [reserveBalance]);        

const ReserveBalance = async () =>{
let balance = await indexClient.lookupAccountByID(configSupply.rebaseReserveAddress).do();
// console.log(balance['account']['assets'][0]['amount']);
setReserveBalance(parseFloat(balance['account']['assets'][0]['amount'])/1000000);
}

useEffect(() => {
    balAsset();
}, [tauCir, einrCir]);

const balAsset = async () =>
{
let escrow = await indexClient.lookupAccountByID(configSupply.swapTauEscrowAddress).do();

let eL = escrow['account']['assets']['length'];

for(let k = 0; k < eL; k++)
{
    if(escrow['account']['assets'][k]['asset-id'] === configSupply.tauID)
    {
        setTauCir(escrow['account']['assets'][k]['amount']);
        break;
    }
}
for(let k = 0; k < eL; k++)
{
    if(escrow['account']['assets'][k]['asset-id'] === configSupply.einrID)
    {
        setEinrCir(escrow['account']['assets'][k]['amount']);
        break;
    }
}

// setAssets(bal['assets']);
}

    return (
        <Layout>
                {/* <Modal show={show} centered onHide={handleClose}>
                 <Modal.Header className="btn-close btn-close-white" closeButton /> 
                <Modal.Body>
                    <Button className='modal-close' onClick={handleClose} variant='reset'>
                        <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g opacity="1">
                            <path d="M17.5004 32.0832C9.44597 32.0832 2.91699 25.5542 2.91699 17.4998C2.91699 9.44546 9.44597 2.9165 17.5004 2.9165C25.5548 2.9165 32.0837 9.44546 32.0837 17.4998C32.0837 25.5542 25.5548 32.0832 17.5004 32.0832ZM17.5004 29.1665C20.5946 29.1665 23.562 27.9373 25.75 25.7494C27.9379 23.5615 29.1671 20.594 29.1671 17.4998C29.1671 14.4056 27.9379 11.4382 25.75 9.25026C23.562 7.06233 20.5946 5.83317 17.5004 5.83317C14.4062 5.83317 11.4387 7.06233 9.25076 9.25026C7.06283 11.4382 5.83367 14.4056 5.83367 17.4998C5.83367 20.594 7.06283 23.5615 9.25076 25.7494C11.4387 27.9373 14.4062 29.1665 17.5004 29.1665ZM17.5004 15.4378L21.6245 11.3121L23.6881 13.3757L19.5625 17.4998L23.6881 21.624L21.6245 23.6875L17.5004 19.5619L13.3762 23.6875L11.3126 21.624L15.4383 17.4998L11.3126 13.3757L13.3762 11.3121L17.5004 15.4378Z" fill="white"/>
                            </g>
                        </svg>
                    </Button>
                    <div className="pb-4 px-3">
                  
                        <img src={SLogo} width="80" className="mx-auto mb-1 d-block" alt="icon" />
                        <h5 className="mb-1 text-center">Element</h5>
                        <p className="mb-4 pb-3 text-center"></p>

                        <Form className='form-area'>
                            <Button variant="grad" size="lg" className='w-100' onClick={()=>opt()}>
                                Apps and Assets Optin
                            </Button>
                        </Form>
                    </div>
                </Modal.Body>
            </Modal> */}
            <Container fluid="lg">
                <Row>
                    <Col md="4" sm="6" lg="3" className="mb-3">
                        <div className="card-graph flex-column p-3 d-flex align-items-center justify-content-center">
                            <span>TAU Price</span>
                            <strong>$1.00</strong>
                        </div>
                    </Col>
                    <Col md="4" sm="6" lg="3" className="mb-3">
                        <div className="card-graph flex-column p-3 d-flex align-items-center justify-content-center">
                            <span>ELEM Price</span>
                            <strong>$3.00</strong>
                        </div>
                    </Col>
                    <Col md="4" sm="6" lg="3" className="mb-3">
                        <div className="card-graph flex-column p-3 d-flex align-items-center justify-content-center">
                            <span>EINR Price
                            {/* <OverlayTrigger
                                placement="top"
                                overlay={
                                    <Tooltip id={`tooltip-top`}>
                                        annualized
                                    </Tooltip>
                                }
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi ms-2 bi-info-circle" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                    </svg>
                                </OverlayTrigger> */}
                            </span>
                            <strong>$0.01</strong>
                        </div>
                    </Col>
                    <Col md="4" sm="6" lg="3" className="mb-3">
                        <div className="card-graph flex-column p-3 d-flex align-items-center justify-content-center">
                            <span>USDC Price</span>
                            <strong>$1.00</strong>
                        </div>
                    </Col>
                    <Col md="4" sm="6" lg="3" className="mb-3">
                        <div className="card-graph flex-column p-3 d-flex align-items-center justify-content-center">
                            <span>Circulating TAU</span>
                            <strong>{((TotalSupply - parseFloat(tauCir))/1000000).toFixed(2)}</strong>
                        </div>
                    </Col>
                    <Col md="4" sm="6" lg="3" className="mb-3">
                        <div className="card-graph flex-column p-3 d-flex align-items-center justify-content-center">
                            <span>Circulating ELEM</span>
                            <strong>{(parseFloat(cirSupply)).toFixed(2)}</strong>
                        </div>
                    </Col>
                    <Col md="4" sm="6" lg="3" className="mb-3">
                        <div className="card-graph flex-column p-3 d-flex align-items-center justify-content-center">
                            <span>Circulating EINR
                            {/* <OverlayTrigger
                                placement="top"
                                overlay={
                                    <Tooltip id={`tooltip-top`}>
                                        annualized
                                    </Tooltip>
                                }
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi ms-2 bi-info-circle" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                    </svg>
                                </OverlayTrigger> */}
                            </span>
                            <strong>{(parseFloat(TotalSupply - parseFloat(einrCir))/1000000).toFixed(2)}</strong>
                        </div>
                    </Col>
                    <Col md="4" sm="6" lg="3" className="mb-3">
                        <div className="card-graph flex-column p-3 d-flex align-items-center justify-content-center">
                            <span>Rebase Index</span>
                            <strong>{localStorage.getItem("rebaseCountStake")}</strong>
                        </div>
                    </Col>
                    <Col md="4" sm="6" lg="3" className="mb-3">
                        <div className="card-graph flex-column p-3 d-flex align-items-center justify-content-center">
                            <span>TAU Reserve</span>
                            <strong>{(parseFloat(tauCir)/1000000).toFixed(2)}</strong>
                        </div>
                    </Col>
                    <Col md="4" sm="6" lg="3" className="mb-3">
                        <div className="card-graph flex-column p-3 d-flex align-items-center justify-content-center">
                            <span>ELEM Reserve</span>
                            <strong>{parseFloat(reserveBalance).toFixed(2)}</strong>
                        </div>
                    </Col>
                    <Col md="4" sm="6" lg="3" className="mb-3">
                        <div className="card-graph flex-column p-3 d-flex align-items-center justify-content-center">
                            <span>EINR Reserve</span>
                            <strong>{(parseFloat(einrCir)/1000000).toFixed(2)}</strong>
                        </div>
                    </Col>
                    <Col md="4" sm="6" lg="3" className="mb-3">
                        <div className="card-graph flex-column p-3 d-flex align-items-center justify-content-center">
                            <span>ELEM Treasury</span>
                            <strong>{parseFloat(treasuryBalance).toFixed(2)}</strong>
                        </div>
                    </Col>
                </Row>

                {/* <div className="note mb-40 d-flex justify-content-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi ms-2 bi-info-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                    </svg>
                    <p>TAU is currently migrating to improved contracts. Please note that during this time, frontend metrics may be inaccurate.</p>
                </div> */}

                <Row>
                    <Col md="6" className='mb-4'>
                        <div className="card-graph">
                            <div className="card-graph-header d-flex align-items-center justify-content-between">
                                <div className='pe-5'>
                                    <p className='mb-1'>Total Value Deposited 
                                    {/* <OverlayTrigger
                                        placement="top"
                                        overlay={
                                            <Tooltip id={`tooltip-top`}>
                                                Total Value Deposited
                                            </Tooltip>
                                        }
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi ms-2 bi-info-circle" viewBox="0 0 16 16">
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                            </svg>
                                        </OverlayTrigger> */}
                                    </p>
                                    <h6><strong>$1,703,470,900</strong> Today</h6>
                                </div>
                                <Link to="#"><img src={Arrow} className='d-block' alt="arrow" /></Link>
                            </div>
                            <TotalValueDepositedChart />
                        </div>
                    </Col>
                    <Col md="6" className='mb-4'>
                        <div className="card-graph">
                            <div className="card-graph-header d-flex align-items-center justify-content-between">
                                <div className='pe-5'>
                                    <p className='mb-1'>Market Value of Treasury Assets 
                                    {/* <OverlayTrigger
                                        placement="top"
                                        overlay={
                                            <Tooltip id={`tooltip-top`}>
                                                Market Value of Treasury Assets
                                            </Tooltip>
                                        }
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi ms-2 bi-info-circle" viewBox="0 0 16 16">
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                            </svg>
                                        </OverlayTrigger> */}
                                    </p>
                                    <h6><strong>$560,925,646</strong> Today</h6>
                                </div>
                                <Link to="#"><img src={Arrow} className='d-block' alt="arrow" /></Link>
                            </div>
                            <MarketValueTreasuryAssets />
                        </div>
                    </Col>
                    <Col md="6" className='mb-4'>
                        <div className="card-graph">
                            <div className="card-graph-header d-flex align-items-center justify-content-between">
                                <div className='pe-5'>
                                    <p className='mb-1'>Risk Free Value of Treasury Asset 
                                    {/* <OverlayTrigger
                                        placement="top"
                                        overlay={
                                            <Tooltip id={`tooltip-top`}>
                                                Risk Free Value of Treasury Asset
                                            </Tooltip>
                                        }
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi ms-2 bi-info-circle" viewBox="0 0 16 16">
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                            </svg>
                                        </OverlayTrigger> */}
                                    </p>
                                    <h6><strong>$215,380,370</strong> Today</h6>
                                </div>
                                <Link to="#"><img src={Arrow} className='d-block' alt="arrow" /></Link>
                            </div>
                            <RiskFreeValueTreasuryAsset />
                        </div>
                    </Col>
                    <Col md="6" className='mb-4'>
                        <div className="card-graph">
                            <div className="card-graph-header d-flex align-items-center justify-content-between">
                                <div className='pe-5'>
                                    <p className='mb-1'>Protocol Owned Liquidity TAU-USDC 
                                    {/* <OverlayTrigger
                                        placement="top"
                                        overlay={
                                            <Tooltip id={`tooltip-top`}>
                                                Protocol Owned Liquidity TAU-USDC
                                            </Tooltip>
                                        }
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi ms-2 bi-info-circle" viewBox="0 0 16 16">
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                            </svg>
                                        </OverlayTrigger> */}
                                    </p>
                                    <h6><strong>99.99%</strong> Today</h6>
                                </div>
                                <Link to="#"><img src={Arrow} className='d-block' alt="arrow" /></Link>
                            </div>
                            <SLPTreasury />
                        </div>
                    </Col>
                    <Col md="6" className='mb-4'>
                        <div className="card-graph">
                            <div className="card-graph-header d-flex align-items-center justify-content-between">
                                <div className='pe-5'>
                                    <p className='mb-1'>TAU Staked 
                                    {/* <OverlayTrigger
                                        placement="top"
                                        overlay={
                                            <Tooltip id={`tooltip-top`}>
                                                TAU Staked
                                            </Tooltip>
                                        }
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi ms-2 bi-info-circle" viewBox="0 0 16 16">
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                            </svg>
                                        </OverlayTrigger> */}
                                    </p>
                                    <h6><strong>88.95%</strong> Today</h6>
                                </div>
                                <Link to="#"><img src={Arrow} className='d-block' alt="arrow" /></Link>
                            </div>
                            <TAUStaked />
                        </div>
                    </Col>
                    <Col md="6" className='mb-4'>
                        <div className="card-graph">
                            <div className="card-graph-header d-flex align-items-center justify-content-between">
                                <div className='pe-5'>
                                    <p className='mb-1'>Runway Available 
                                    {/* <OverlayTrigger
                                        placement="top"
                                        overlay={
                                            <Tooltip id={`tooltip-top`}>
                                                Runway Available
                                            </Tooltip>
                                        }
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi ms-2 bi-info-circle" viewBox="0 0 16 16">
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                            </svg>
                                        </OverlayTrigger> */}
                                    </p>
                                    <h6><strong>357.9 Days</strong></h6>
                                </div>
                                <Link to="#"><img src={Arrow} className='d-block' alt="arrow" /></Link>
                            </div>
                            <RunwayAvailable />
                        </div>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
};

export default Dashboard;