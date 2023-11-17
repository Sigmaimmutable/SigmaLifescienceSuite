import React, {useState, useEffect} from 'react';
import { Accordion, Button, Col, Container, FormControl, InputGroup, OverlayTrigger, Row, Tab, Tabs, Tooltip } from 'react-bootstrap';
import Layout from './LayoutT';
import { updatealgobalance } from "../formula";

import ButtonLoad from 'react-bootstrap-button-loader';
import USDC from '../../assets/images/usdc.jpg';
import MyAlgoConnect from '@randlabs/myalgo-connect';
import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';
import Logo from '../../assets/images/modal-logo.png';
import Arrow from '../../assets/images/arrow-tr.svg';
import ModalSquareLogo from '../../assets/images/modal-square-logo.png';
import faucetDetails from "../Dashboard/stablecoin.json";
import {TAU, Usdt} from "./singlesidedAmmconfig";
import node from "./nodeapi.json"
import elemLogo from '../../assets/images/gold.jfif';
import tauLogo from '../../assets/images/tau-original.png';
import einrLogo from '../../assets/images/EINR-original.png';
import usdtLogo from '../../assets/images/usdtimg.png';
import usdLogo from '../../assets/images/dollar-symbol.png';
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import { formatJsonRpcRequest } from "@json-rpc-tools/utils";
import dai from '../../assets/images/dai.png';
import {Daiaddressfaucet,elemaddressfaucet,elemrewardaddressfaucet} from './Faucetcontractaddress';
import {FaucetAbi} from './faucetabi';
import {BondAddress,Daiaddress,elemrewardaddress,elemaddress} from './stablecoincontractAddress';
import {Bondabi,DAI,ELEMReward,ELEM   } from './stablecoinabi';
import web3 from "../../web3";
const Faucet = () => {

    useEffect(() => {
        document.title = "ELEMENT | Faucet"
    }, [])

    const[appTotal,setAppTotal] = useState("");


    //ELEM
    const[loaderUsdcFund, setLoaderUsdcFund] = useState(false);

    const handleShowLoadUsdcFund = () => setLoaderUsdcFund(true);
    const handleHideLoadUsdcFund = () => setLoaderUsdcFund(false);
  

    //ELEM
    const[loaderElemFund, setLoaderElemFund] = useState(false);

    const handleShowLoadElemFund = () => setLoaderElemFund(true);
    const handleHideLoadElemFund = () => setLoaderElemFund(false);

    //TAU
    const[loaderTauFund, setLoaderTauFund] = useState(false);

    const handleShowLoadTauFund = () => setLoaderTauFund(true);
    const handleHideLoadTauFund = () => setLoaderTauFund(false);

    //EINR
    const[loaderEinrFund, setLoaderEinrFund] = useState(false);

    const handleShowLoadEinrFund = () => setLoaderEinrFund(true);
    const handleHideLoadEinrFund = () => setLoaderEinrFund(false);

    //USDT
    const[loaderUsdtFund, setLoaderUsdtFund] = useState(false);

    const handleShowLoadUsdtFund = () => setLoaderUsdtFund(true);
    const handleHideLoadUsdtFund = () => setLoaderUsdtFund(false);



    const [bondBalance, setBondBalance] = useState([]);
    const [appOpt,setToAppOpt] = useState(false);
    const [elemAssetOpt,setToElemAssetOpt] = useState(false);
    const [usdcAssetOpt,setToUsdcAssetOpt] = useState(false);
    const [tauAssetOpt,setToTauAssetOpt] = useState(false);
    const [einrAssetOpt,setToEinrAssetOpt] = useState(false);
    const [usdtAssetOpt,setToUsdtAssetOpt] = useState(false);
    const [usdAssetOpt,setToUsdAssetOpt] = useState(false);
    const [daiBalances, setdaibalance] = useState("");
    const [goldbalance, setgoldbalance] = useState("");
    const [elemBalances, setElemBalances] = useState("");
    const [tauBalances, setTauBalances] = useState("");
    const [einrBalances, setEinrBalances] = useState("");
    const [usdtBalances, setUsdtBalances] = useState("");
    const [usdBalances, setUsdBalances] = useState("");
    const [cDAIbalance, setcDAIbalance] = useState("");
    const [minAlgo, setMinAlgo] = useState("");
    const [connector, setConnector] = useState("");

    const daifaucetcontract = new web3.eth.Contract(FaucetAbi, Daiaddressfaucet);
    const GOLDfaucetcontract = new web3.eth.Contract(FaucetAbi, elemrewardaddressfaucet);
    const cDAIfaucetcontract = new web3.eth.Contract(FaucetAbi, elemaddressfaucet);

    const daicontract = new web3.eth.Contract(DAI, Daiaddress);
    const elemrewardcontract = new web3.eth.Contract(ELEMReward, elemrewardaddress);
    const taucontract = new web3.eth.Contract(ELEM, elemaddress);

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
     }

     const toastDiv = (txId) =>
    (
        <div>
            <p> Transaction is successful &nbsp;<a style={{color:'#133ac6'}} href={txId} target="_blank" rel="noreferrer"><br/><p style={{fontWeight: 'bold'}}>View in Bscscan Explorer <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
     <path d="M11.7176 3.97604L1.69366 14L0.046875 12.3532L10.0697 2.32926H1.23596V0H14.0469V12.8109H11.7176V3.97604Z" fill="#133ac6"/>
     </svg></p></a></p> 
        </div>
    );

  
    useEffect(()=>{firstrender()})
    const firstrender=async()=>{
        if(localStorage.getItem("walletAddress")>0){

        const accounts = await  web3.eth.getAccounts();
        setdaibalance(await daicontract.methods.balanceOf(accounts[0]).call());
        setgoldbalance(await elemrewardcontract.methods.balanceOf(accounts[0]).call());
        setcDAIbalance(await taucontract.methods.balanceOf(accounts[0]).call());
        // setclaimable(parseFloat(elemrewardbalance));
       
      
    }   

    }

//Dispenser code        

const DaiFund = async () =>
{
    handleShowLoadUsdcFund();
    if (localStorage.getItem("walletAddress") === "")
        {
            toast.error("Connect your wallet");
            handleHideLoadUsdcFund();
        }
        else{


// console.log("Escrow =", lsigusdcFund.address());

try {
    const accounts = await  web3.eth.getAccounts();
    await daifaucetcontract.methods.claim().send({from:accounts[0]}).
    on('transactionHash',function(hash){      

    
     let id = "https://testnet.bscscan.com/tx/" + hash;
     toast.success(toastDiv(id));
    //  toast.success(`Transaction Success ${hash}`);
     // window.location.reload();
     firstrender();
     handleHideLoadUsdcFund();
   
     })
     handleHideLoadUsdcFund();
     reload();
//toast.success(`Transaction Successful with ${response.txId}`);
  } catch (err) {
    handleHideLoadUsdcFund();
    toast.error(err.toString());
    console.error(err);
  }

        }
}


const tauFund = async () =>
{
    handleShowLoadTauFund();
    if (localStorage.getItem("walletAddress") === "")
        {
            toast.error("Connect your wallet");
            handleHideLoadTauFund();
        }
        else{


// console.log("Escrow =", lsigusdcFund.address());

try {
    const accounts = await  web3.eth.getAccounts();
    await cDAIfaucetcontract.methods.claim().send({from:accounts[0]}).
    on('transactionHash',function(hash){      

    
     let id = "https://testnet.bscscan.com/tx/" + hash;
     toast.success(toastDiv(id));
    //  toast.success(`Transaction Success ${hash}`);
     // window.location.reload();
     firstrender();
     handleHideLoadTauFund();
   
     })
     handleHideLoadTauFund();
     reload();
//toast.success(`Transaction Successful with ${response.txId}`);
  } catch (err) {
    handleHideLoadTauFund();
    toast.error(err.toString());
    console.error(err);
  }

        }
}


const elemFund = async () =>
{
    handleShowLoadElemFund();
    if (localStorage.getItem("walletAddress") === "")
        {
            toast.error("Connect your wallet");
            handleHideLoadElemFund();
        }
        else{


// console.log("Escrow =", lsigusdcFund.address());

try {
    const accounts = await  web3.eth.getAccounts();
    await GOLDfaucetcontract.methods.claim().send({from:accounts[0]}).
    on('transactionHash',function(hash){      

    
     let id = "https://testnet.bscscan.com/tx/" + hash;
     toast.success(toastDiv(id));
    //  toast.success(`Transaction Success ${hash}`);
     // window.location.reload();
     firstrender();
     handleHideLoadElemFund();
    
     })
     handleHideLoadElemFund();
     reload();
//toast.success(`Transaction Successful with ${response.txId}`);
  } catch (err) {
    handleHideLoadTauFund();
    toast.error(err.toString());
    console.error(err);
  }

        }
}
















const reload = () => {
    sessionStorage.setItem("reloading", "true");
    window.location.reload(false); 
};

    window.onload = () => {
        let reloading = sessionStorage.getItem("reloading");
        if (reloading) {
            sessionStorage.removeItem("reloading");
        }
    }

 






    return (
        <Layout>
            <><ToastContainer position='bottom-right' draggable = {false} transition={Zoom} autoClose={10000} closeOnClick = {false}/></>

            <Container>
            <div className="d-flex mb-24 align-items-center justify-content-center">
                    <div>
                        <h3 className='mb-0 text-187'>
                            Faucet 
                            <OverlayTrigger
                                key="right"
                                placement="right"
                                overlay={
                                    <Tooltip id={`tooltip-right`}>
                                        Assets required to test our ecosystem is available here.
                                    </Tooltip>
                                }
                                >
                                    <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                </OverlayTrigger>
                        </h3>
                        {/* <h3 className='mb-0 text-187'>${(parseFloat(bondBalance) / 3).toFixed(2)}</h3> */}
                    </div>
                    {/* <div className='ms-sm-5 ms-4'>
                        <h6 className='sub-heading mb-0'>
                            ELEM Market Price
                            <OverlayTrigger
                                key="left"
                                placement="left"
                                overlay={
                                    <Tooltip id={`tooltip-left`}>
                                        ELEM asset price.
                                    </Tooltip>
                                }
                                >
                                    <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                </OverlayTrigger>
                        </h6>
                        <h3 className='mb-0 text-187'>$3.00</h3>
                    </div> */}
                </div>

                <Accordion defaultActiveKey="">
                    <Accordion.Item className='mb-24' eventKey="0">
                        <Accordion.Header>
                            <div className="acc-title me-2 d-flex align-items-center">
                                <img src={dai} alt="logo" />
                                <span className='ms-3'>DAI</span>
                            </div>

                            <div className="ms-auto flex-grow-1 pe-md-4 justify-content-between d-flex align-items-center">
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        You will Receive
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                        10 DAI
                                        <OverlayTrigger
                                            key="left"
                                            placement="left"
                                            overlay={
                                                <Tooltip id={`tooltip-left`}>
                                                    Amount of DAI asset per transaction.
                                                </Tooltip>
                                            }
                                            >
                                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                            </OverlayTrigger>
                                    </h5>
                                </div>
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        Balance
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                    {(parseFloat(daiBalances)/1000000000000000000).toFixed(2) === 'NaN' || (parseFloat(daiBalances)/1000000000000000000).toFixed(2) === null ? '0.00' : (parseFloat(daiBalances)/1000000000000000000).toFixed(2)} DAI
                                        <OverlayTrigger
                                            key="left"
                                            placement="left"
                                            overlay={
                                                <Tooltip id={`tooltip-left`}>
                                                    Your Account's DAI balance.
                                                </Tooltip>
                                            }
                                            >
                                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                            </OverlayTrigger>
                                    </h5>
                                </div>
                                {/* <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        Vesting Term
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                        5 days
                                        <OverlayTrigger
                                            key="left"
                                            placement="left"
                                            overlay={
                                                <Tooltip id={`tooltip-left`}>
                                                    Total time required to claim all ELEM asset
                                                </Tooltip>
                                            }
                                            >
                                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                            </OverlayTrigger>
                                    </h5>
                                </div>
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        Purchased
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                        ${(parseFloat(appTotal)/1000000 * 2).toFixed(2)}
                                    </h5>
                                </div> */}
                            </div>
                        </Accordion.Header>
                        <Accordion.Body>
                            {/* <div className="d-flex align-items-center float-end mt-1 acc-h-links">
                                <a href="https://testnet.algoexplorer.io/application/78065709" rel="noopener noreferrer" target="_blank">
                                    <svg className="blue-dark-theme-pink mb-1" width="16" height="16" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.8333 15.8333H4.16667V4.16667H10V2.5H4.16667C3.24167 2.5 2.5 3.25 2.5 4.16667V15.8333C2.5 16.75 3.24167 17.5 4.16667 17.5H15.8333C16.75 17.5 17.5 16.75 17.5 15.8333V10H15.8333V15.8333ZM11.6667 2.5V4.16667H14.6583L6.46667 12.3583L7.64167 13.5333L15.8333 5.34167V8.33333H17.5V2.5H11.6667Z"></path></svg>
                                    <span className='text-text-FF ms-2'>View Contract</span>
                                </a>

                                <h6 className='sub-heading ms-4 d-flex mb-0'>
                                    How it works 
                                    <OverlayTrigger
                                        className="me-20"
                                        key="left"
                                        placement="left"
                                        overlay={
                                            <Tooltip id={`tooltip-left`}>
                                                <strong className='text-purple'>1.</strong> Enter the amount of USDC asset that you want to invest and bond ELEM asset. <br /><br /><strong className='text-purple'>2.</strong> 20% of the ELEM asset will be Claimable for every 24 hours. <br/>( 5 times 20% will get your 100% ELEM asset for you inverstment in 5 days )
                                            </Tooltip>
                                        }
                                        >
                                            <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                        </OverlayTrigger>
                                </h6> &nbsp;&nbsp;&nbsp;&nbsp;
                                <ButtonLoad loading={loaderUsdcFund} className='btn btn-blue' onClick={usdcFund}>
                                                        USDC Faucet
                                                    </ButtonLoad>
                                                    <OverlayTrigger
                                        key="left"
                                        placement="left"
                                        overlay={
                                            <Tooltip id={`tooltip-left`}>
                                                By clicking on this button <br/>10 USDC can be received by your address. This USDC is for testing purpose only.
                                            </Tooltip>
                                        }
                                        >
                                            <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                        </OverlayTrigger>  
                            </div> */}
                            <Tabs defaultActiveKey="bond" className='dashboard-tabs' id="tab-example-1">
                            
                                <Tab eventKey="bond" title="USDC Faucet">
                                    <Row className='row-divider'>
                                        {/* <Col>
                                            <h6><span className='text-sm text-gray-d'>Your USDC Balance: </span>{(parseFloat(usdcBalances)/1000000).toFixed(2) === 'NaN' || (parseFloat(usdcBalances)/1000000).toFixed(2) === null ? '0.00' : (parseFloat(usdcBalances)/1000000).toFixed(2)} USDC</h6>
                                            <Row className='flex-nowrap mb-2 gx-3'>
                                                <Col xs="auto">
                                                {appOpt === false ? <Button disabled className='btn btn-blue'>
                                                        Purchase Bond
                                                    </Button>:<ButtonLoad style={{width:"100%"}} loading={loaderPurchase} className='btn btn-blue' onClick={Exchange}>
                                                    Purchase Bond
                                                    </ButtonLoad>}
                                                </Col>
                                            </Row>
                                            <div className="d-flex">

                                                <div className='ms-4'>
                                                    <h6><span className='text-sm mb-1 d-block text-gray-d'>Max You Can Buy</span> {(parseFloat(usdcBalances)/1000000 / 2).toFixed(2) === 'NaN' || (parseFloat(usdcBalances)/1000000 / 2).toFixed(2) === null ? '0.00' : (parseFloat(usdcBalances)/1000000 / 2).toFixed(2)} ELEM</h6>
                                                </div>
                                            </div>
                                        </Col> */}
                                        <Col md={12}>
                                            {/* <h6><span className='text-sm text-gray-d'>Claimable Rewards: </span>{(parseFloat(stable)/1000000).toFixed(2) === 'NaN' ? <>{0.00}</>:(parseFloat(stable)/1000000 * 20 / 100).toFixed(2)} ELEM</h6> */}
                                            <Row className='flex-nowrap align-items-center mb-2 gx-3'>
                                            
                                                <Col>
                                                <ButtonLoad loading={loaderUsdcFund} className='btn w-20 btn-blue' onClick={() => DaiFund()}>
                                                        Dispense 
                                                    </ButtonLoad> 
                                                </Col>
                                                <Col xs="auto">
                                                {/* <OverlayTrigger
                                                    key="left"
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip id={`tooltip-left`}>
                                                            Please Opt-In the address to asset, After you can Dispense USDC.
                                                        </Tooltip>
                                                    }
                                                    >
                                                        <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                                    </OverlayTrigger> */}
                                                </Col>
                                            </Row>
                                        
                                        </Col>
                                    </Row>
                                </Tab>
                            </Tabs>
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item className='mb-24' eventKey="1">
                        <Accordion.Header>
                            <div className="acc-title me-2 d-flex align-items-center">
                                <img src={elemLogo} alt="logo" />
                                <span className='ms-3'>GOLD</span>
                            </div>

                            <div className="ms-auto flex-grow-1 pe-md-4 justify-content-between d-flex align-items-center">
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        You will Receive
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                        10 GOLD
                                        <OverlayTrigger
                                            key="left"
                                            placement="left"
                                            overlay={
                                                <Tooltip id={`tooltip-left`}>
                                                    Amount of GOLD asset per transaction.
                                                </Tooltip>
                                            }
                                            >
                                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                            </OverlayTrigger>
                                    </h5>
                                </div>
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        Balance
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                    {(parseFloat(goldbalance)/1000000000000000000).toFixed(2) === 'NaN' || (parseFloat(goldbalance)/1000000000000000000).toFixed(2) === null ? '0.00' : (parseFloat(goldbalance)/1000000000000000000).toFixed(2)} GOLD
                                        <OverlayTrigger
                                            key="left"
                                            placement="left"
                                            overlay={
                                                <Tooltip id={`tooltip-left`}>
                                                    Your Account's GOLD balance.
                                                </Tooltip>
                                            }
                                            >
                                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                            </OverlayTrigger>
                                    </h5>
                                </div>
                                {/* <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        Vesting Term
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                        5 days
                                        <OverlayTrigger
                                            key="left"
                                            placement="left"
                                            overlay={
                                                <Tooltip id={`tooltip-left`}>
                                                    Total time required to claim all ELEM asset
                                                </Tooltip>
                                            }
                                            >
                                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                            </OverlayTrigger>
                                    </h5>
                                </div>
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        Purchased
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                        ${(parseFloat(appTotal)/1000000 * 2).toFixed(2)}
                                    </h5>
                                </div> */}
                            </div>
                        </Accordion.Header>
                        <Accordion.Body>
                            {/* <div className="d-flex align-items-center float-end mt-1 acc-h-links">
                                <a href="https://testnet.algoexplorer.io/application/78065709" rel="noopener noreferrer" target="_blank">
                                    <svg className="blue-dark-theme-pink mb-1" width="16" height="16" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.8333 15.8333H4.16667V4.16667H10V2.5H4.16667C3.24167 2.5 2.5 3.25 2.5 4.16667V15.8333C2.5 16.75 3.24167 17.5 4.16667 17.5H15.8333C16.75 17.5 17.5 16.75 17.5 15.8333V10H15.8333V15.8333ZM11.6667 2.5V4.16667H14.6583L6.46667 12.3583L7.64167 13.5333L15.8333 5.34167V8.33333H17.5V2.5H11.6667Z"></path></svg>
                                    <span className='text-text-FF ms-2'>View Contract</span>
                                </a>

                                <h6 className='sub-heading ms-4 d-flex mb-0'>
                                    How it works 
                                    <OverlayTrigger
                                        className="me-20"
                                        key="left"
                                        placement="left"
                                        overlay={
                                            <Tooltip id={`tooltip-left`}>
                                                <strong className='text-purple'>1.</strong> Enter the amount of USDC asset that you want to invest and bond ELEM asset. <br /><br /><strong className='text-purple'>2.</strong> 20% of the ELEM asset will be Claimable for every 24 hours. <br/>( 5 times 20% will get your 100% ELEM asset for you inverstment in 5 days )
                                            </Tooltip>
                                        }
                                        >
                                            <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                        </OverlayTrigger>
                                </h6> &nbsp;&nbsp;&nbsp;&nbsp;
                                <ButtonLoad loading={loaderUsdcFund} className='btn btn-blue' onClick={usdcFund}>
                                                        USDC Faucet
                                                    </ButtonLoad>
                                                    <OverlayTrigger
                                        key="left"
                                        placement="left"
                                        overlay={
                                            <Tooltip id={`tooltip-left`}>
                                                By clicking on this button <br/>10 USDC can be received by your address. This USDC is for testing purpose only.
                                            </Tooltip>
                                        }
                                        >
                                            <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                        </OverlayTrigger>  
                            </div> */}
                            <Tabs defaultActiveKey="bond" className='dashboard-tabs' id="tab-example-1">
                            
                                <Tab eventKey="bond" title="GOLD Faucet">
                                    <Row className='row-divider'>
                                        {/* <Col>
                                            <h6><span className='text-sm text-gray-d'>Your USDC Balance: </span>{(parseFloat(usdcBalances)/1000000).toFixed(2) === 'NaN' || (parseFloat(usdcBalances)/1000000).toFixed(2) === null ? '0.00' : (parseFloat(usdcBalances)/1000000).toFixed(2)} USDC</h6>
                                            <Row className='flex-nowrap mb-2 gx-3'>
                                                <Col xs="auto">
                                                {appOpt === false ? <Button disabled className='btn btn-blue'>
                                                        Purchase Bond
                                                    </Button>:<ButtonLoad style={{width:"100%"}} loading={loaderPurchase} className='btn btn-blue' onClick={Exchange}>
                                                    Purchase Bond
                                                    </ButtonLoad>}
                                                </Col>
                                            </Row>
                                            <div className="d-flex">

                                                <div className='ms-4'>
                                                    <h6><span className='text-sm mb-1 d-block text-gray-d'>Max You Can Buy</span> {(parseFloat(usdcBalances)/1000000 / 2).toFixed(2) === 'NaN' || (parseFloat(usdcBalances)/1000000 / 2).toFixed(2) === null ? '0.00' : (parseFloat(usdcBalances)/1000000 / 2).toFixed(2)} ELEM</h6>
                                                </div>
                                            </div>
                                        </Col> */}
                                        <Col md={12}>
                                            {/* <h6><span className='text-sm text-gray-d'>Claimable Rewards: </span>{(parseFloat(stable)/1000000).toFixed(2) === 'NaN' ? <>{0.00}</>:(parseFloat(stable)/1000000 * 20 / 100).toFixed(2)} ELEM</h6> */}
                                            <Row className='flex-nowrap align-items-center mb-2 gx-3'>
                                                {/* <Col xs="auto">
                                                    {elemAssetOpt === false ? <ButtonLoad loading={loaderElemAssetOpt} className='btn w-100 btn-blue' onClick={() => elemWalletCheck()}>
                                                    GOLD Asset Optin
                                                    </ButtonLoad> : <><Button disabled className='btn w-100 btn-blue'>
                                                    GOLD Asset Opted
                                                    </Button></> }
                                                </Col> */}
                                                <Col>
                                               <ButtonLoad loading={loaderElemFund} className='btn w-20 btn-blue' onClick={()=>elemFund()} >
                                                        Dispense 
                                                    </ButtonLoad> 
                                                </Col>
                                                <Col xs="auto">
                                                {/* <OverlayTrigger
                                                    key="left"
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip id={`tooltip-left`}>
                                                            Please Opt-In the address to asset, After you can Dispense GOLD.
                                                        </Tooltip>
                                                    }
                                                    >
                                                        <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                                    </OverlayTrigger> */}
                                                </Col>
                                            </Row>
                                            {/* <div className="d-flex">
                                                <div>
                                                    <h6><span className='text-sm mb-1 d-block text-gray-d'>Pending Rewards</span> {(parseFloat(bond)/1000000).toFixed(2) === 'NaN' ? <>{0.00}</>:(parseFloat(bond)/1000000).toFixed(2)} ELEM</h6>
                                                </div>
                                                <div className='ms-4'>
                                                    <h6><span className='text-sm mb-1 d-block text-gray-d'>Time until fully vested</span> {lock == true ? (<>{day}d:{hour}h:{min}m:{sec}s</>):(<></>)} </h6>
                                                </div>
                                            </div> */}
                                        </Col>
                                    </Row>
                                </Tab>
                            </Tabs>
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item className='mb-24' eventKey="2">
                        <Accordion.Header>
                            <div className="acc-title me-2 d-flex align-items-center">
                                <img src={tauLogo} alt="logo" />
                                <span className='ms-3'>TAU</span>
                            </div>

                            <div className="ms-auto flex-grow-1 pe-md-4 justify-content-between d-flex align-items-center">
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        You will Receive
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                        10 TAU
                                        <OverlayTrigger
                                            key="left"
                                            placement="left"
                                            overlay={
                                                <Tooltip id={`tooltip-left`}>
                                                    Amount of TAU asset per transaction.
                                                </Tooltip>
                                            }
                                            >
                                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                            </OverlayTrigger>
                                    </h5>
                                </div>
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        Balance
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                    {(parseFloat(cDAIbalance)/1000000000000000000).toFixed(2) === 'NaN' || (parseFloat(cDAIbalance)/1000000000000000000).toFixed(2) === null ? '0.00' : (parseFloat(cDAIbalance)/1000000000000000000).toFixed(2)} TAU
                                        <OverlayTrigger
                                            key="left"
                                            placement="left"
                                            overlay={
                                                <Tooltip id={`tooltip-left`}>
                                                    Your Account's TAU balance.
                                                </Tooltip>
                                            }
                                            >
                                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                            </OverlayTrigger>
                                    </h5>
                                </div>
                                {/* <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        Vesting Term
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                        5 days
                                        <OverlayTrigger
                                            key="left"
                                            placement="left"
                                            overlay={
                                                <Tooltip id={`tooltip-left`}>
                                                    Total time required to claim all ELEM asset
                                                </Tooltip>
                                            }
                                            >
                                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                            </OverlayTrigger>
                                    </h5>
                                </div>
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        Purchased
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                        ${(parseFloat(appTotal)/1000000 * 2).toFixed(2)}
                                    </h5>
                                </div> */}
                            </div>
                        </Accordion.Header>
                        <Accordion.Body>
                            {/* <div className="d-flex align-items-center float-end mt-1 acc-h-links">
                                <a href="https://testnet.algoexplorer.io/application/78065709" rel="noopener noreferrer" target="_blank">
                                    <svg className="blue-dark-theme-pink mb-1" width="16" height="16" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.8333 15.8333H4.16667V4.16667H10V2.5H4.16667C3.24167 2.5 2.5 3.25 2.5 4.16667V15.8333C2.5 16.75 3.24167 17.5 4.16667 17.5H15.8333C16.75 17.5 17.5 16.75 17.5 15.8333V10H15.8333V15.8333ZM11.6667 2.5V4.16667H14.6583L6.46667 12.3583L7.64167 13.5333L15.8333 5.34167V8.33333H17.5V2.5H11.6667Z"></path></svg>
                                    <span className='text-text-FF ms-2'>View Contract</span>
                                </a>

                                <h6 className='sub-heading ms-4 d-flex mb-0'>
                                    How it works 
                                    <OverlayTrigger
                                        className="me-20"
                                        key="left"
                                        placement="left"
                                        overlay={
                                            <Tooltip id={`tooltip-left`}>
                                                <strong className='text-purple'>1.</strong> Enter the amount of USDC asset that you want to invest and bond ELEM asset. <br /><br /><strong className='text-purple'>2.</strong> 20% of the ELEM asset will be Claimable for every 24 hours. <br/>( 5 times 20% will get your 100% ELEM asset for you inverstment in 5 days )
                                            </Tooltip>
                                        }
                                        >
                                            <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                        </OverlayTrigger>
                                </h6> &nbsp;&nbsp;&nbsp;&nbsp;
                                <ButtonLoad loading={loaderUsdcFund} className='btn btn-blue' onClick={usdcFund}>
                                                        USDC Faucet
                                                    </ButtonLoad>
                                                    <OverlayTrigger
                                        key="left"
                                        placement="left"
                                        overlay={
                                            <Tooltip id={`tooltip-left`}>
                                                By clicking on this button <br/>10 USDC can be received by your address. This USDC is for testing purpose only.
                                            </Tooltip>
                                        }
                                        >
                                            <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                        </OverlayTrigger>  
                            </div> */}
                            <Tabs defaultActiveKey="bond" className='dashboard-tabs' id="tab-example-1">
                            
                                <Tab eventKey="bond" title="TAU Faucet">
                                    <Row className='row-divider'>
                                        {/* <Col>
                                            <h6><span className='text-sm text-gray-d'>Your USDC Balance: </span>{(parseFloat(usdcBalances)/1000000).toFixed(2) === 'NaN' || (parseFloat(usdcBalances)/1000000).toFixed(2) === null ? '0.00' : (parseFloat(usdcBalances)/1000000).toFixed(2)} USDC</h6>
                                            <Row className='flex-nowrap mb-2 gx-3'>
                                                <Col xs="auto">
                                                {appOpt === false ? <Button disabled className='btn btn-blue'>
                                                        Purchase Bond
                                                    </Button>:<ButtonLoad style={{width:"100%"}} loading={loaderPurchase} className='btn btn-blue' onClick={Exchange}>
                                                    Purchase Bond
                                                    </ButtonLoad>}
                                                </Col>
                                            </Row>
                                            <div className="d-flex">

                                                <div className='ms-4'>
                                                    <h6><span className='text-sm mb-1 d-block text-gray-d'>Max You Can Buy</span> {(parseFloat(usdcBalances)/1000000 / 2).toFixed(2) === 'NaN' || (parseFloat(usdcBalances)/1000000 / 2).toFixed(2) === null ? '0.00' : (parseFloat(usdcBalances)/1000000 / 2).toFixed(2)} ELEM</h6>
                                                </div>
                                            </div>
                                        </Col> */}
                                        <Col md={12}>
                                            {/* <h6><span className='text-sm text-gray-d'>Claimable Rewards: </span>{(parseFloat(stable)/1000000).toFixed(2) === 'NaN' ? <>{0.00}</>:(parseFloat(stable)/1000000 * 20 / 100).toFixed(2)} ELEM</h6> */}
                                            <Row className='flex-nowrap align-items-center mb-2 gx-3'>
                                               
                                                <Col>
                                                <ButtonLoad loading={loaderTauFund} className='btn w-20 btn-blue' onClick={()=>tauFund()}>
                                                        Dispense 
                                                    </ButtonLoad> 
                                                </Col>
                                                <Col xs="auto">
                                                {/* <OverlayTrigger
                                                    key="left"
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip id={`tooltip-left`}>
                                                            Please Opt-In the address to asset, After you can Dispense TAU.
                                                        </Tooltip>
                                                    }
                                                    >
                                                        <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                                    </OverlayTrigger> */}
                                                </Col>
                                            </Row>
                                           
                                        </Col>
                                    </Row>
                                </Tab>
                            </Tabs>
                        </Accordion.Body>
                    </Accordion.Item>

                    {/* <Accordion.Item className='mb-24' eventKey="3">
                        <Accordion.Header>
                            <div className="acc-title me-2 d-flex align-items-center">
                                <img src={einrLogo} alt="logo" />
                                <span className='ms-3'>EINR</span>
                            </div>

                            <div className="ms-auto flex-grow-1 pe-md-4 justify-content-between d-flex align-items-center">
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        You will Receive
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                        10 EINR
                                        <OverlayTrigger
                                            key="left"
                                            placement="left"
                                            overlay={
                                                <Tooltip id={`tooltip-left`}>
                                                    Amount of EINR asset per transaction.
                                                </Tooltip>
                                            }
                                            >
                                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                            </OverlayTrigger>
                                    </h5>
                                </div>
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        Balance
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                    {(parseFloat(einrBalances)/1000000).toFixed(2) === 'NaN' || (parseFloat(einrBalances)/1000000).toFixed(2) === null ? '0.00' : (parseFloat(einrBalances)/1000000).toFixed(2)} EINR
                                        <OverlayTrigger
                                            key="left"
                                            placement="left"
                                            overlay={
                                                <Tooltip id={`tooltip-left`}>
                                                    Your Account's EINR balance.
                                                </Tooltip>
                                            }
                                            >
                                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                            </OverlayTrigger>
                                    </h5>
                                </div>
                              
                            </div>
                        </Accordion.Header>
                        <Accordion.Body>
                            
                            <Tabs defaultActiveKey="bond" className='dashboard-tabs' id="tab-example-1">
                            
                                <Tab eventKey="bond" title="EINR Faucet">
                                    <Row className='row-divider'>
                                      
                                        <Col md={12}>
                                            <Row className='flex-nowrap align-items-center mb-2 gx-3'>
                                                <Col xs="auto">
                                                    {einrAssetOpt === false ? <ButtonLoad loading={loaderEinrAssetOpt} className='btn w-100 btn-blue' >
                                                        EINR Asset Optin
                                                    </ButtonLoad> : <><Button disabled className='btn w-100 btn-blue'>
                                                        EINR Asset Opted
                                                    </Button></> }
                                                </Col>
                                                <Col>
                                                {einrAssetOpt == true ? <ButtonLoad loading={loaderEinrFund} className='btn w-20 btn-blue' >
                                                        Dispense 
                                                    </ButtonLoad> : <Button disabled className='btn w-20 btn-blue'>
                                                        Dispense
                                                    </Button>}
                                                </Col>
                                                <Col xs="auto">
                                                <OverlayTrigger
                                                    key="left"
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip id={`tooltip-left`}>
                                                            Please Opt-In the address to asset, After you can Dispense EINR.
                                                        </Tooltip>
                                                    }
                                                    >
                                                        <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                                    </OverlayTrigger>
                                                </Col>
                                            </Row>
                                            
                                        </Col>
                                    </Row>
                                </Tab>
                            </Tabs>
                        </Accordion.Body>
                    </Accordion.Item>       */}

                    {/* <Accordion.Item className='mb-24' eventKey="4">
                        <Accordion.Header>
                            <div className="acc-title me-2 d-flex align-items-center">
                                <img src={dai} alt="logo" />
                                <span className='ms-3'>USDT</span>
                            </div>

                            <div className="ms-auto flex-grow-1 pe-md-4 justify-content-between d-flex align-items-center">
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        You will Receive
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                        10 USDT
                                        <OverlayTrigger
                                            key="left"
                                            placement="left"
                                            overlay={
                                                <Tooltip id={`tooltip-left`}>
                                                    Amount of USDT asset per transaction.
                                                </Tooltip>
                                            }
                                            >
                                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                            </OverlayTrigger>
                                    </h5>
                                </div>
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        Balance
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                    {(parseFloat(usdtBalances)/1000000).toFixed(2) === 'NaN' || (parseFloat(usdtBalances)/1000000).toFixed(2) === null ? '0.00' : (parseFloat(usdtBalances)/1000000).toFixed(2)} USDT
                                        <OverlayTrigger
                                            key="left"
                                            placement="left"
                                            overlay={
                                                <Tooltip id={`tooltip-left`}>
                                                    Your Account's USDT balance.
                                                </Tooltip>
                                            }
                                            >
                                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                            </OverlayTrigger>
                                    </h5>
                                </div>
                              
                            </div>
                        </Accordion.Header>
                        <Accordion.Body>
                           
                            <Tabs defaultActiveKey="bond" className='dashboard-tabs' id="tab-example-1">
                            
                                <Tab eventKey="bond" title="USDT Faucet">
                                    <Row className='row-divider'>
                                       
                                        <Col md={12}>
                                            <Row className='flex-nowrap align-items-center mb-2 gx-3'>
                                                <Col xs="auto">
                                                    {usdtAssetOpt === false ? <ButtonLoad loading={loaderUsdtAssetOpt} className='btn w-100 btn-blue' >
                                                        USDT Asset Optin
                                                    </ButtonLoad> : <><Button disabled className='btn w-100 btn-blue'>
                                                        USDT Asset Opted
                                                    </Button></> }
                                                </Col>
                                                <Col>
                                                {usdtAssetOpt == true ? <ButtonLoad loading={loaderUsdtFund} className='btn w-20 btn-blue' >
                                                        Dispense 
                                                    </ButtonLoad> : <Button disabled className='btn w-20 btn-blue'>
                                                        Dispense
                                                    </Button>}
                                                </Col>
                                                <Col xs="auto">
                                                <OverlayTrigger
                                                    key="left"
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip id={`tooltip-left`}>
                                                            Please Opt-In the address to asset, After you can Dispense USDT.
                                                        </Tooltip>
                                                    }
                                                    >
                                                        <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                                    </OverlayTrigger>
                                                </Col>
                                            </Row>
                                        
                                        </Col>
                                    </Row>
                                </Tab>
                            </Tabs>
                        </Accordion.Body>
                    </Accordion.Item>    */}
{/* 
                    <Accordion.Item className='mb-24' eventKey="5">
                        <Accordion.Header>
                            <div className="acc-title me-2 d-flex align-items-center">
                                <img src={dai} alt="logo" />
                                <span className='ms-3'>USD</span>
                            </div>

                            <div className="ms-auto flex-grow-1 pe-md-4 justify-content-between d-flex align-items-center">
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        You will Receive
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                        10 USD
                                        <OverlayTrigger
                                            key="left"
                                            placement="left"
                                            overlay={
                                                <Tooltip id={`tooltip-left`}>
                                                    Amount of USD asset per transaction.
                                                </Tooltip>
                                            }
                                            >
                                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                            </OverlayTrigger>
                                    </h5>
                                </div>
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        Balance
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                    {(parseFloat(usdBalances)/1000000).toFixed(2) === 'NaN' || (parseFloat(usdBalances)/1000000).toFixed(2) === null ? '0.00' : (parseFloat(usdBalances)/1000000).toFixed(2)} USD
                                        <OverlayTrigger
                                            key="left"
                                            placement="left"
                                            overlay={
                                                <Tooltip id={`tooltip-left`}>
                                                    Your Account's USD balance.
                                                </Tooltip>
                                            }
                                            >
                                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                            </OverlayTrigger>
                                    </h5>
                                </div>
                              
                            </div>
                        </Accordion.Header>
                        <Accordion.Body>
                           
                            <Tabs defaultActiveKey="bond" className='dashboard-tabs' id="tab-example-1">
                            
                                <Tab eventKey="bond" title="USD Faucet">
                                    <Row className='row-divider'>
                                      
                                        <Col md={12}>
                                         
                                            <Row className='flex-nowrap align-items-center mb-2 gx-3'>
                                                <Col xs="auto">
                                                    {usdAssetOpt === false ? <ButtonLoad loading={loaderUsdAssetOpt} className='btn w-100 btn-blue' >
                                                        USD Asset Optin
                                                    </ButtonLoad> : <><Button disabled className='btn w-100 btn-blue'>
                                                        USD Asset Opted
                                                    </Button></> }
                                                </Col>
                                                <Col>
                                                {usdAssetOpt == true ? <ButtonLoad loading={loaderUsdFund} className='btn w-20 btn-blue'>
                                                        Dispense 
                                                    </ButtonLoad> : <Button disabled className='btn w-20 btn-blue'>
                                                        Dispense
                                                    </Button>}
                                                </Col>
                                                <Col xs="auto">
                                                <OverlayTrigger
                                                    key="left"
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip id={`tooltip-left`}>
                                                            Please Opt-In the address to asset, After you can Dispense USD.
                                                        </Tooltip>
                                                    }
                                                    >
                                                        <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                                    </OverlayTrigger>
                                                </Col>
                                            </Row>
                                           
                                        </Col>
                                    </Row>
                                </Tab>
                            </Tabs>
                        </Accordion.Body>
                    </Accordion.Item>    
                             */}

              
                </Accordion>
            </Container>
        </Layout>
    );
};

export default Faucet;