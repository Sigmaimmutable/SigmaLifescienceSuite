import React, { useState, useEffect } from 'react';
import { Alert, Button, Card, Col, Container, OverlayTrigger, Row, Tab, Tabs, Tooltip, InputGroup, FormControl, Modal } from 'react-bootstrap';
import Layout from './LayoutT';
import { Link } from 'react-router-dom';


// import { updatealgobalance } from "../formula";
import USDC from '../../assets/images/usdc.jpg';
import ButtonLoad from 'react-bootstrap-button-loader';
import { updatealgobalance } from "../formula";

import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';

import elemLogo from '../../assets/images/gold.jfif';
import tauLogo from '../../assets/images/tau-original.png';
import einrLogo from '../../assets/images/EINR-original.png';
// import mintDetails from '../Dashboard/stablecoin.json';
//import usdcLogo from '../assets/img/usdc-logo.png';
import dai from '../../assets/images/dai.png';

import web3 from "../../web3";
//import dai from '../../assets/images/dai.png';
// import MyAlgoConnect from '@randlabs/myalgo-connect';
// import node from './nodeapi.json'
// import WalletConnect from "@walletconnect/client";
// import QRCodeModal from "algorand-walletconnect-qrcode-modal";
// import { formatJsonRpcRequest } from "@json-rpc-tools/utils";


// const algosdk = require('algosdk');
// const myAlgoWallet = new MyAlgoConnect();
// const bridge = "https://bridge.walletconnect.org";

import { poolv3address,elemaddress,Daiaddress,elemrewardaddress } from './stablecoincontractAddress';
import {poolv3,ELEM,DAI,ELEMReward } from './stablecoinabi';

const Stablecoin = () => {

    useEffect(() => {
        document.title = "Sigma | Mint"
    }, [])

    

    const [cRatioUpdateShow, setCRatioUpdateShow] = useState(false);

    const handleCRatioUpdateShow = () => setCRatioUpdateShow(true);
    const handleCRatioUpdateClose = () => setCRatioUpdateShow(false);

    const [cRatioUpdateShowEinr, setCRatioUpdateShowEinr] = useState(false);

    const handleCRatioUpdateShowEinr = () => setCRatioUpdateShowEinr(true);
    const handleCRatioUpdateCloseEinr = () => setCRatioUpdateShowEinr(false);

    const [cRatioLoad, setcRatioLoad] = useState(false);

    const handleShowcRatioLoad = () => setcRatioLoad(true);
    const handleHidecRatioLoad = () => setcRatioLoad(false);

    const [loadMint, setLoadMint] = useState(false);

    const handleShowMint = () => setLoadMint(true);
    const handleHideMint = () => setLoadMint(false);

    const [loadAppOpt, setLoadAppOpt] = useState(false);

    const handleShowAppOpt = () => setLoadAppOpt(true);
    const handleHideAppOpt = () => setLoadAppOpt(false);

    const [loadelemopt, setLoadELEMOPT] = useState(false);

    const handleShowAppOptELEM = () => setLoadELEMOPT(true);
    const handleHideAppOptELEM = () => setLoadELEMOPT(false);

    const [loadAssetOptTau, setLoadAssetOptTau] = useState(false);

    const handleShowAssetOptTau = () => setLoadAssetOptTau(true);
    const handleHideAssetOptTau = () => setLoadAssetOptTau(false);

    const [loadAssetOptEinr, setLoadAssetOptEinr] = useState(false);

    const handleShowAssetOptEinr = () => setLoadAssetOptEinr(true);
    const handleHideAssetOptEinr = () => setLoadAssetOptEinr(false);    
    
    const [prerequisiteShow, setLoadPrerequisite] = useState(false);

    const handlePrerequisiteShow = () => setLoadPrerequisite(true);
    const handlePrerequisiteClose = () => setLoadPrerequisite(false);

    const [usdcAmount, setUsdcAmount ] = useState();
    const [elemAmount, setElemAmount ] = useState();
   
    const [assetEinrOpt, setAssetEinrOpt] = useState(false);
    const [assetTauOpt, setAssetTauOpt] = useState(false);
    const [appOpt, setAppOpt] = useState(false);
    const [appOptDynamic, setAppOptDynamic] = useState(false);

    const [usdcBalances, setUsdcBalances] = useState("");
    const [elemBalances, setElemBalances] = useState("");
    const [tauBalances, setTauBalances] = useState("");

    const [usdcPrice, setUsdcPrice] = useState();
    const [elemPrice, setElemPrice] = useState();
    const [cRatioValue, setCRatioValue] = useState();

    //Stablecoincode started here
    const[elemmint,setelemmint] = useState("");
    const[elemreward,setelemreward] = useState("");
    const[daitoken,setdaitoken] = useState("");
    const[enteredamount,setenteredamount] = useState("")
    const[daibalance,setdaibalance] = useState("")
    const[elemrewardbalance,setelemrewardbalance] = useState("")
    const[elembalance,setelembalance] = useState("")
    const[ratio,setratio] = useState("")
    const[fxsprice,setfxsprice] = useState("")
    const[fraxprice,setfraxprice] = useState("")
    const[collateralinfo,setcolloteralinfo] = useState([]);
    const [daiapproved, setdaiapproved] = useState(false);
    const [fraxapproved, setfraxapproved] = useState(false);
    const [elemapproved, setelemapproved] = useState(false);

    console.log("fraxapproved",fraxapproved)

    const poolcontract = new web3.eth.Contract(poolv3, poolv3address);
    const elemcontract = new web3.eth.Contract(ELEM, elemaddress);
    const daicontract = new web3.eth.Contract(DAI, Daiaddress);
    const elemrewardcontract = new web3.eth.Contract(ELEMReward, elemrewardaddress);
    useEffect(async() => {
        optinModal();
    },[prerequisiteShow, fraxapproved, daiapproved,elemapproved]);
    useEffect(()=>{firstrender()})
    const firstrender=async()=>{
        if(localStorage.getItem("walletAddress")>0){

        const accounts = await  web3.eth.getAccounts();
        setdaibalance(await daicontract.methods.balanceOf(accounts[0]).call());
        setelemrewardbalance(await elemrewardcontract.methods.balanceOf(accounts[0]).call());
        setelembalance(await elemcontract.methods.balanceOf(accounts[0]).call());
        let daiapp = await daicontract.methods.allowance(accounts[0],poolv3address).call();
        let tauapp = await elemcontract.methods.allowance(accounts[0],poolv3address).call();
        let elemapp = await elemrewardcontract.methods.allowance(accounts[0],poolv3address).call();

        if(daiapp > 0 ){
            setdaiapproved(true);
        } 
        
        if(tauapp > 0 ){
            setfraxapproved(true);
        } 
        if(elemapp > 0){
            setelemapproved(true);

        }
        // console.log("daiapp",daiapproved,daiapp)
        // let fraxapp = await daicontract.methods.allowance(poolv3address,accounts[0]);

        }
        setratio(await elemcontract.methods.global_collateral_ratio().call());
        setfxsprice(await poolcontract.methods.getFXSPrice().call())
        setcolloteralinfo(await poolcontract.methods.collateral_information(Daiaddress).call());
        setfraxprice(await poolcontract.methods.getFRAXPrice().call())
        // console.log("coll",collateralinfo)
    }

    const amountSetTau = async(amount)=>{
        setenteredamount(amount)
       
         let frax_for_collat = ((amount*1000000000000000000) * ratio)/1000000;
        //let frax_for_collat = ((amount*1000000000000000000) / ratio)/1000000;

        let frax_for_fxs = (amount*1000000000000000000)  - frax_for_collat;
        let collat_needed = await poolcontract.methods.getFRAXInCollateral(0,web3.utils.toBN(parseInt(frax_for_collat))).call();
        setdaitoken(collat_needed);
        let fxs_needed = frax_for_fxs * (1000000)/(fxsprice);
        setelemreward(fxs_needed)
        let total_frax_mint =(( (amount * 1000000000000000000)*(1000000-3000))/ratio)/1000000000000000000;
        setelemmint(total_frax_mint)
        console.log("ratio",total_frax_mint,collat_needed,fxs_needed)
    }

    const approvedai = async()=>{
        handleShowMint();
        const accounts = await  web3.eth.getAccounts();
        let amount =  1000000000000000000 +"000000000000000000"; 
        try{
            await daicontract.methods.approve(poolv3address,web3.utils.toBN((amount))).send({
                from:accounts[0],              
                // gas: 210000,
                //gasPrice: '20000000000'
                }).on('transactionHash',function(hash){      
                    console.log("hashget",hash)                                                
                    let id = "https://rinkeby.etherscan.io/tx/" + hash;
                    toast.success(toastDiv(id));
                })
                firstrender();
                handleHideMint();
        }
        catch(err){
            handleHideMint();
            toast.error(`err`,err)
        }
        setdaiapproved(true)    
    
    }
    const approveelem = async()=>{
        handleShowAppOptELEM();
        const accounts = await  web3.eth.getAccounts();
        let amount =  1000000000000000000 +"000000000000000000"; 

        try{
            await elemrewardcontract.methods.approve(poolv3address,web3.utils.toBN(amount)).send({
                from:accounts[0],              
                // gas: 210000,
                //gasPrice: '20000000000'
                }).on('transactionHash',function(hash){      
                    console.log("hashget",hash)                                                
                    let id = "https://rinkeby.etherscan.io/tx/" + hash;
                    toast.success(toastDiv(id));
                })
                firstrender();
                handleHideAppOptELEM();
        }
        catch(err){
            handleHideAppOptELEM();
            toast.error(`err`,err)
        }
        setelemapproved(true)    
    
    }
    const approvefrax = async()=>{
        handleShowAppOpt();
        const accounts = await  web3.eth.getAccounts();
        let amount =  1000000000000000000 +"000000000000000000"; 

        try{
            await elemcontract.methods.approve(poolv3address,web3.utils.toBN(amount)).send({
                from:accounts[0],              
                // gas: 210000,
                //gasPrice: '20000000000'
                }).on('transactionHash',function(hash){      
                    console.log("hashget",hash)                                                
                    let id = "https://rinkeby.etherscan.io/tx/" + hash;
                    toast.success(toastDiv(id));
                })
                firstrender();
                handleHideAppOpt();
        }
        catch(err){
            handleHideAppOpt();
            toast.error(`err`,err)
        }
        setfraxapproved(true)    
    
    }
    
    const optinModal = () =>
    {
        if(localStorage.getItem("walletAddress") === null || localStorage.getItem("walletAddress") === '')
        {
            handlePrerequisiteClose();
        }
        else
        {
        if(daiapproved === true || fraxapproved === true || elemapproved === true)
        {
            console.log("daiapproved",daiapproved)

            console.log("fraxapproved1",fraxapproved)
            handlePrerequisiteShow();
        }
        else{
            handlePrerequisiteClose();
        }
        }
    }
    const mint = async(a,b)=>{
        handleShowMint();
        console.log("enteraed a value",a/(ratio/1000000))
        const accounts = await  web3.eth.getAccounts();
        try{
            // await poolcontract.methods.mintFrax(0,web3.utils.toBN(parseInt(a)),web3.utils.toBN(parseInt(b)),web3.utils.toBN(parseInt(a)),web3.utils.toBN(parseInt(b)),false).send({
              
                await poolcontract.methods.mintFrax(0,web3.utils.toBN(parseInt(a/(ratio/1000000))),web3.utils.toBN(parseInt(a)),web3.utils.toBN(parseInt(a/(ratio/1000000))),web3.utils.toBN(parseInt(a)),false).send({

                from:accounts[0],              
                // gas: 210000,
                //gasPrice: '20000000000'
                }).on('transactionHash',function(hash){      
                    console.log("hashget",hash)                                                
                    let id = "https://rinkeby.etherscan.io/tx/" + hash;
                    toast.success(toastDiv(id));
                })
                firstrender();
                handleHideMint();
                setenteredamount("")
                setelemreward("")
                setelemmint("")
        }
        catch(err){
            handleHideMint();
            toast.error(`err`,err)
        }
        
    
    }
    const maxcall = async()=>{
        amountSetTau(daibalance/1000000000000000000)
    }

    const toastDiv = (txId) =>
(
    <div>
        <p> Transaction is successful &nbsp;<a style={{color:'#133ac6'}} href={txId} target="_blank" rel="noreferrer"><br/><p style={{fontWeight: 'bold'}}>View in Bscscan <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path d="M11.7176 3.97604L1.69366 14L0.046875 12.3532L10.0697 2.32926H1.23596V0H14.0469V12.8109H11.7176V3.97604Z" fill="#133ac6"/>
 </svg></p></a></p>  
    </div>
); 
       

    return (
        <Layout>

            <Container>
            <><ToastContainer position='bottom-right' draggable = {false} transition={Zoom} autoClose={13000} closeOnClick = {false}/></>

                <Row className='justify-content-center'>
                    <Col md={10} lg={7} className="mb-4">
                        {/* {show ? 
                            <Alert variant="grad" className='mb-4' onClose={() => setShow(false)} dismissible>
                                <p><strong className='text-purple'>Mint (2 Steps):</strong>  < br />
                                1. Enter in the amount of USDC you would like to deposit and press MINT. < br />
                                2. Claim your TAU tokens.</p>
                                <p><strong className='text-purple'>Redeem (2 Steps):</strong>  < br />
                                1. Enter in the amount of TAU you would like to redeem and press Redeem. < br />
                                2. Claim your USDC tokens.</p>
                                <p><strong className='text-purple'>Note:</strong> The “Approve“ is only needed when minting for the first time.</p>
                            </Alert>

                            : null
                        } */}

                        <Card className='card-dash d-block border-0 mb-4'>
                            
                            <div className="d-flex align-items-center float-end mt-1 acc-h-links">
                                <h6 className='sub-heading ms-4 d-flex mb-0'>
                                    How it works 
                                    <OverlayTrigger
                                        key="left"
                                        placement="left"
                                        overlay={
                                            <Tooltip id={`tooltip-left`}>
                                                <strong className='text-purple'>1.</strong> Enter the Amount of USDC by which the requirement of ELEM and The amount of TAU or EINR minted can to automatically generated and displayed. <br /><br /><strong className='text-purple'>2.</strong> Once you acquire the desired amount of TAU to mint click on "Mint cDAI" or "Mint cDAI" button which will initiate the wallet to sign the Transactions.
                                            </Tooltip>
                                        }
                                        >
                                            <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                        </OverlayTrigger>
                                </h6>   
                            </div>
                            <Tabs defaultActiveKey="mint" className='dashboard-tabs' id="tab-example-1">
                                <Tab eventKey="mint" title="Mint cDAI">
                                    <div className="group-row mb-20">
                                        <Row>
                                            <Col sm={5} className="mb-sm-0 mb-3">
                                                <Button variant='link' className='btn-currency p-0'>
                                                    <img src={dai} alt="dai" />
                                                    <div className="ms-3 text-start">
                                                        
                                                        <h5 className='mb-0 font-semibold'>DAI</h5>
                                                        <h5 className='sub-heading text-xs mb-0'>Bal: {parseFloat(daibalance) ? (parseFloat(daibalance)/1000000000000000000).toFixed(2) : '0.00'}</h5>
                                                    </div>
                                                </Button>
                                            </Col>
                                            <Col sm={7}>
                                                <div className="input-group-max px-3 input-group-max-lg w-100">
                                                    {/* <input type="number" placeholder='0.00' className='form-control' value={usdcAmount} onChange={(e) => amountSet(e.target.value)}/>  */}
                                                    <InputGroup>
                                                        <FormControl
                                                            // disabled={true}
                                                            value={enteredamount}
                                                            type='number'
                                                            placeholder="0.00"
                                                            aria-label="Recipient's username"
                                                            aria-describedby="basic-addon2"
                                                            onChange={(e) => amountSetTau(e.target.value)}
                                                        />
                                                        <Button variant="outline-purple" className='btn-xs-d' onClick={()=>maxcall()} >Max</Button>
                                                    </InputGroup>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="group-row">
                                        <Row>
                                            <Col sm={5} className="mb-sm-0 mb-3">
                                                <Button variant='link' className='btn-currency p-0'>
                                                    <img src={elemLogo} alt="USDC" />
                                                    <div className="ms-3 text-start">
                                                        
                                                        <h5 className='mb-0 font-semibold'>GOLD</h5>
                                                        <h5 className='sub-heading text-xs mb-0'>Bal: {parseFloat(elemrewardbalance) ? (parseFloat(elemrewardbalance)/1000000000000000000).toFixed(2) : '0.00'}</h5>
                                                    </div>
                                                </Button>
                                            </Col>
                                            <Col sm={7}>
                                                <div className="input-group-max px-3 input-group-max-lg w-100">
                                                    <input readonly disabled type="number" placeholder='0.00' className='form-control' value={parseFloat(elemreward/1000000000000000000).toFixed(2)} />
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="py-2 px-sm-4 px-2">
                                        <Button variant='blue' style={{cursor:"default"}} className='rounded-circle py-3'><svg width="20" height="20" className='m-0' viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.6255 11.0884C16.9501 10.7638 16.9501 10.2375 16.6255 9.91289C16.301 9.58848 15.7752 9.58824 15.4505 9.91236L11.3799 13.9756V4.66732C11.3799 4.20708 11.0068 3.83398 10.5465 3.83398C10.0863 3.83398 9.71322 4.20708 9.71322 4.66732V13.9756L5.65462 9.90978C5.32808 9.58266 4.79811 9.58242 4.47128 9.90925C4.14466 10.2359 4.14466 10.7654 4.47128 11.0921L9.94049 16.5613C10.2752 16.896 10.8179 16.896 11.1526 16.5613L16.6255 11.0884Z" fill="white"></path></svg></Button>
                                    </div>
                                    <div className="group-row">
                                        <Row>
                                            <Col sm={5} className="mb-sm-0 mb-3">
                                                <Button variant='link' className='btn-currency p-0'>
                                                    <img src={tauLogo} alt="USDC" />
                                                    <div className="ms-3 text-start">
                                                        
                                                        <h5 className='mb-0 font-semibold'>cDAI</h5>
                                                        <h5 className='sub-heading text-xs mb-0'>Bal: {parseFloat(elembalance) ? (parseFloat(elembalance)/1000000000000000000).toFixed(2) : '0.00'}</h5>
                                                    </div>
                                                </Button>
                                            </Col>
                                            <Col sm={7}>
                                                <div className="input-group-max px-3 input-group-max-lg w-100">
                                                    <input readonly disabled type="number" placeholder='0.00' className='form-control' value={(parseFloat(elemmint).toFixed(2))}/>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>


                                    <hr className='my-4' />

                                    <div className="mb-20">
                                        {/* <div className="d-flex mb-1 align-items-center justify-content-between text-md">
                                            <span>Max mint per tx</span>
                                            <strong className='font-semibold'>0.00 USDC</strong>
                                        </div> */}
                                        <div className="d-flex mb-1 align-items-center justify-content-between text-md">
                                            <span> </span>
                                            <strong className='font-semibold'>Rate : 1 cDAI = $ {fraxprice/1000000}</strong>
                                        </div>
                                        <div className="d-flex mb-1 align-items-center justify-content-between text-md">
                                            <span> </span>
                                            <strong className='font-semibold'>Minting fee  : {collateralinfo.minting_fee/10000}%</strong>
                                        </div>
                                        {/* <div className="d-flex mb-1 align-items-center justify-content-between text-md">
                                            <span>You will receive</span>
                                            <strong className='font-semibold'>{parseFloat(tauAmount).toFixed(2) === 'NaN' ? '0.00' : parseFloat(tauAmount).toFixed(2)} TAU</strong>
                                        </div> */}
                                        {/* <div className="d-flex mb-1 align-items-center justify-content-between text-md">
                                            <span>Claimable amount</span>
                                            <strong className='font-semibold'>0.00 TAU</strong>
                                        </div> */}
                                    </div>

                                    <Row className='flex-nowrap align-items-center gx-3'>
                                        <Col>
                                        {daiapproved ?(<>
                                            <ButtonLoad loading={loadMint} className='btn w-100 btn-blue mb-20' onClick={()=>mint((enteredamount*1000000000000000000),(enteredamount*1000000000000000000*(ratio/1000000)))} >
                                                Mint cDAI
                                            </ButtonLoad>
                                            </>):(<><ButtonLoad loading={loadMint} className='btn w-100 btn-blue mb-20' onClick={()=>approvedai()} >
                                               Approve DAI
                                            </ButtonLoad></>)}
                                            
                                            { localStorage.getItem("walletAddress") === "0xEB50a80F7DE37AF8669b0C4973B2A33E8502c5a7" ? <Button className='btn w-100 btn-blue' onClick={handleCRatioUpdateShow}>
                                                Collateral Ratio
                                            </Button> : <></>}  
                                        </Col>
                                        {/* <Col>
                                            <Button disabled className='btn w-100 btn-blue'>
                                                Claim and Autostake
                                            </Button>
                                        </Col> */}
                                    </Row>
                                </Tab>
                                {/* <Tab eventKey="redeem" title="Mint EINR">
                                <div className="group-row mb-20">
                                        <Row>
                                            <Col sm={5} className="mb-sm-0 mb-3">
                                                <Button variant='link' className='btn-currency p-0'>
                                                    <img src={USDC} alt="USDC" />
                                                    <div className="ms-3 text-start">
                                                        
                                                        <h5 className='mb-0 font-semibold'>USDC</h5>
                                                        <h5 className='sub-heading text-xs mb-0'>Bal: {parseFloat(usdcBalances) ? (parseFloat(usdcBalances)/1000000).toFixed(2) : '0.00'}</h5>
                                                    </div>
                                                </Button>
                                            </Col>
                                            <Col sm={7}>
                                                <div className="input-group-max px-3 input-group-max-lg w-100">
                                                    <InputGroup>
                                                        <FormControl
                                                            // disabled={true}
                                                            value={usdcAmountEinr}
                                                            type='number'
                                                            placeholder="0.00"
                                                            aria-label="Recipient's username"
                                                            aria-describedby="basic-addon2"
                                                            // onChange={(e) => amountSetEinr(e.target.value)}
                                                        />
                                                        <Button variant="outline-purple" className='btn-xs-d' >Max</Button>
                                                    </InputGroup>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="group-row">
                                        <Row>
                                            <Col sm={5} className="mb-sm-0 mb-3">
                                                <Button variant='link' className='btn-currency p-0'>
                                                    <img src={elemLogo} alt="USDC" />
                                                    <div className="ms-3 text-start">
                                                        <h5 className='mb-0 font-semibold'>ELEM</h5>
                                                        <h5 className='sub-heading text-xs mb-0'>Bal: {parseFloat(elemBalances) ? (parseFloat(elemBalances)/1000000).toFixed(2) : '0.00'}</h5>

                                                    </div>
                                                </Button>
                                            </Col>
                                            <Col sm={7}>
                                                <div className="input-group-max px-3 input-group-max-lg w-100">
                                                    <input readonly disabled type="number" placeholder='0.00' className='form-control' value={parseFloat((((1 - C_PercentEinr)*(usdcAmountEinr * usdcPriceEinr))/(C_PercentEinr * elemPriceEinr))).toFixed(6)} /> 
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="py-2 px-sm-4 px-2">
                                        <Button variant='blue' style={{cursor:"default"}} className='rounded-circle py-3'><svg width="20" height="20" className='m-0' viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.6255 11.0884C16.9501 10.7638 16.9501 10.2375 16.6255 9.91289C16.301 9.58848 15.7752 9.58824 15.4505 9.91236L11.3799 13.9756V4.66732C11.3799 4.20708 11.0068 3.83398 10.5465 3.83398C10.0863 3.83398 9.71322 4.20708 9.71322 4.66732V13.9756L5.65462 9.90978C5.32808 9.58266 4.79811 9.58242 4.47128 9.90925C4.14466 10.2359 4.14466 10.7654 4.47128 11.0921L9.94049 16.5613C10.2752 16.896 10.8179 16.896 11.1526 16.5613L16.6255 11.0884Z" fill="white"></path></svg></Button>
                                    </div>
                                    <div className="group-row">
                                        <Row>
                                            <Col sm={5} className="mb-sm-0 mb-3">
                                                <Button variant='link' className='btn-currency p-0'>
                                                    <img src={einrLogo} alt="USDC" />
                                                    <div className="ms-3 text-start">
                                                        <h5 className='mb-0 font-semibold'>EINR</h5>
                                                        <h5 className='sub-heading text-xs mb-0'>Bal: {parseFloat(EinrBalances) ? (parseFloat(EinrBalances)/1000000).toFixed(2) : '0.00'}</h5>

                                                    </div>
                                                </Button>
                                            </Col>
                                            <Col sm={7}>
                                                <div className="input-group-max px-3 input-group-max-lg w-100">
                                                    <input readonly disabled type="number" placeholder='0.00' className='form-control' value={((parseFloat((usdcAmountEinr * usdcPrice) + parseFloat(elemAmountEinr * elemPrice))/einrPrice) * 0.99).toFixed(6)}/>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>


                                    <hr className='my-4' />

                                    <div className="mb-20">
                                      
                                        <div className="d-flex mb-1 align-items-center justify-content-between text-md">
                                            <span> </span>
                                            <strong className='font-semibold'>Rate : 1 USDC = 76 EINR = 0.33 ELEM</strong>
                                        </div>
                                        <div className="d-flex mb-1 align-items-center justify-content-between text-md">
                                            <span> </span>
                                            <strong className='font-semibold'>Minting fee (1%) : {((parseFloat((usdcAmountEinr * usdcPrice) + parseFloat(elemAmountEinr * elemPrice))/einrPrice) * 0.01) ? ((parseFloat((usdcAmountEinr * usdcPrice) + parseFloat(elemAmountEinr * elemPrice))/einrPrice) * 0.01).toFixed(6) : '0'} EINR</strong>
                                        </div>
                                        
                                    </div>

                                    <Row className='flex-nowrap align-items-center gx-3'>
                                        <Col>
                                            <ButtonLoad loading={loadMint} className='btn w-100 btn-blue mb-20' >
                                                Mint EINR
                                            </ButtonLoad>
                                            { localStorage.getItem("walletAddress") === "2H7CM6JNAOZLQSPYFE63JYERAKQAVQ5SVEN4Y2567JRL5E5CASVO3Y2VE4" ? <Button className='btn w-100 btn-blue' onClick={handleCRatioUpdateShowEinr}>
                                                Collateral Ratio
                                            </Button> : <></>}
                                        </Col>
                                      
                                    </Row>
                                </Tab> */}
                            </Tabs>
                        </Card>
                    </Col>
                </Row>
            <Modal show={prerequisiteShow} className="modal-dashboard" centered onHide={handlePrerequisiteClose}>
            <div className="pt-xl-0 pt-4">   
                <Link className='text-white mb-20' to="/dashboard"><span style={{color:"#8247e5"}}>Go to Dashboard &nbsp;</span>
                <svg width="22" height="15" viewBox="0 0 22 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.6389 8.36952L18.8028 8.2H18.567H0.967033C0.700676 8.2 0.486002 8.10872 0.33782 7.95548C0.189347 7.80195 0.1 7.57826 0.1 7.3C0.1 7.02174 0.189347 6.79805 0.33782 6.64452C0.486002 6.49128 0.700676 6.4 0.967033 6.4H18.567H18.8064L18.6382 6.22972L14.0939 1.63048C14.0937 1.63036 14.0936 1.63023 14.0935 1.63011C13.7445 1.26887 13.7447 0.730627 14.0939 0.369516C14.4414 0.0101614 14.9564 0.0101614 15.3039 0.369516L21.7831 7.06952C21.939 7.23075 21.939 7.46925 21.7831 7.63048L15.3039 14.3305C14.9564 14.6898 14.4414 14.6898 14.0939 14.3305C13.7445 13.9692 13.7445 13.4308 14.0939 13.0695L18.6389 8.36952Z" fill="#8247e5" stroke="currentColor" strokeWidth="0.2"/>
                                </svg>
                </Link>
                </div><br/>
                <Modal.Header>
                    <Modal.Title>Please perform the below actions</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    { daiapproved === false ? <ButtonLoad loading={loadMint} style={{'backgroundColor':"#8247e5"}} className='d-flex p-3 mb-20 justify-content-between w-100 align-items-center' onClick={()=>approvedai()} >
                        <span className='text-white'>1.Approve DAI</span>
                        {/* <img src={PeraWalletLogo} alt="MetaMask" /> */}
                    </ButtonLoad> : <></>}
                    { fraxapproved === false ? <ButtonLoad loading={loadAppOpt} style={{'backgroundColor':"#8247e5"}} className='d-flex p-3 mb-20 justify-content-between w-100 align-items-center' onClick={()=>approvefrax()}  >
                        <span className='text-white'>2. Approve cDAI </span>
                        {/* <img src={PeraWalletLogo} alt="MetaMask" /> */}
                    </ButtonLoad> : <></>}   
                    { elemapproved === false ? <ButtonLoad loading={loadelemopt} style={{'backgroundColor':"#8247e5"}}  className='d-flex p-3 mb-20 justify-content-between w-100 align-items-center' onClick={()=>approveelem()}  >
                        <span className='text-white'>3. Approve Gold </span>
                        {/* <img src={PeraWalletLogo} alt="MetaMask" /> */}
                    </ButtonLoad> : <></>}                    
                   
                </Modal.Body>
            </Modal>
            <Modal show={cRatioUpdateShow} className="modal-dashboard" centered onHide={handleCRatioUpdateClose}>
                <center>
                <Modal.Header>
                   <Modal.Title>Collateral Ratio Update cDAI</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <Link className='text-white mb-20' to="/dashboard"><Button variant='gray' className='d-flex p-3 mb-20 justify-content-between w-100 align-items-center'><span className='text-white'>Go to Dashboard</span></Button></Link> */}
                    <div className="group-row">
                    <Row className=''>
                    <Col sm={5} className="mb-sm-0 mb-3">
                        <Button variant='link' className='btn-currency p-0'>
                            {/* <img src={einrLogo} alt="TAU" /> */}
                            <div className="ms-3 text-start">
                                <h5 className='mb-0 font-semibold' style={{color:"white"}}>Collateral Percentage</h5>
                                {/* <h5 className='sub-heading text-xs mb-0'>Bal: {parseFloat(EinrBalances) ? (parseFloat(EinrBalances)/1000000).toFixed(2) : '0.00'}</h5> */}
                            </div>
                        </Button>
                        </Col>
                    <Col sm={7}>
                    <div className="input-group-max px-3 input-group-max-lg w-50">
                    <InputGroup>
                        <FormControl
                            // disabled={true}
                            value={cRatioValue}
                            type='number'
                            placeholder="0.00"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            onChange={(e) => setCRatioValue(e.target.value)}
                        />
                        {/* <Button variant="outline-purple" className='btn-xs-d'>Max</Button> */}
                    </InputGroup>                   
                    </div>
                    </Col>
                    </Row>
                    </div>
                    <br/>   

                    <ButtonLoad loading={cRatioLoad} variant='primary' className='d-flex p-3 mb-20 justify-content-between w-50 align-items-center' >
                        <span className='text-white'>Update Collateral Ratio</span>
                    </ButtonLoad>
                </Modal.Body>
                </center>
            </Modal>
            <Modal show={cRatioUpdateShowEinr} className="modal-dashboard" centered onHide={handleCRatioUpdateCloseEinr}>
                <center>
                <Modal.Header>
                   <Modal.Title>Collateral Ratio Update EINR</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <Link className='text-white mb-20' to="/dashboard"><Button variant='gray' className='d-flex p-3 mb-20 justify-content-between w-100 align-items-center'><span className='text-white'>Go to Dashboard</span></Button></Link> */}
                    <div className="group-row">
                    <Row className=''>
                    <Col sm={5} className="mb-sm-0 mb-3">
                        <Button variant='link' className='btn-currency p-0'>
                            {/* <img src={einrLogo} alt="TAU" /> */}
                            <div className="ms-3 text-start">
                                <h5 className='mb-0 font-semibold' style={{color:"white"}}>Collateral Percentage</h5>
                                {/* <h5 className='sub-heading text-xs mb-0'>Bal: {parseFloat(EinrBalances) ? (parseFloat(EinrBalances)/1000000).toFixed(2) : '0.00'}</h5> */}
                            </div>
                        </Button>
                        </Col>
                    <Col sm={7}>
                    <div className="input-group-max px-3 input-group-max-lg w-50">
                    <InputGroup>
                        <FormControl
                            // disabled={true}
                            value={cRatioValue}
                            type='number'
                            placeholder="0.00"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            onChange={(e) => setCRatioValue(e.target.value)}
                        />
                        {/* <Button variant="outline-purple" className='btn-xs-d'>Max</Button> */}
                    </InputGroup>                   
                    </div>
                    </Col>
                    </Row>
                    </div>
                    <br/>   

                    <ButtonLoad loading={cRatioLoad} variant='primary' className='d-flex p-3 mb-20 justify-content-between w-50 align-items-center' >
                        <span className='text-white'>Update Collateral Ratio</span>
                    </ButtonLoad>
                </Modal.Body>
                </center>
            </Modal>
            </Container>
            </Layout>
    );
};

export default Stablecoin;