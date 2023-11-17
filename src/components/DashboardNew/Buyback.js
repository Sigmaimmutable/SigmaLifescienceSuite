import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Container, OverlayTrigger, Row, Tab, Tabs, Tooltip, Modal, FormControl, InputGroup } from 'react-bootstrap';
import Layout from './LayoutT';
import { Link } from 'react-router-dom';
import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';
import ButtonLoad from 'react-bootstrap-button-loader';

import dai from '../../assets/images/dai.png';
import elemLogo from '../../assets/images/gold.jfif';
import tauLogo from '../../assets/images/tau-original.png';
// import Modald from "../ModalD";
// import FolowStepsdcopy from "../FolowStepserror";
// import MyAlgoConnect from '@randlabs/myalgo-connect';
// import buybackDetails from '../Dashboard/stablecoin.json';
// import node from './nodeapi.json';
// import WalletConnect from "@walletconnect/client";
// import QRCodeModal from "algorand-walletconnect-qrcode-modal";
// import { formatJsonRpcRequest } from "@json-rpc-tools/utils";
// import { updatealgobalance } from "../formula";

// const algosdk = require('algosdk');
// const myAlgoWallet = new MyAlgoConnect();
// const bridge = "https://bridge.walletconnect.org";


import { poolv3address,elemaddress,Daiaddress,elemrewardaddress } from './stablecoincontractAddress';
import {poolv3,ELEM,DAI,ELEMReward } from './stablecoinabi';
import web3 from "../../web3";


const Stablecoin = () => {

    useEffect(() => {
        document.title = "Sigma | Buyback"
    }, [])

    const [assetUsdcOpt, setAssetUsdcOpt] = useState(false);
    const [assetElemOpt, setAssetElemOpt] = useState(false);
    const [usdcAmount, setUsdcAmount ] = useState("");
    const [elemAmount, setElemAmount ] = useState("");
    const [appOpt, setAppOpt] = useState(false);
    const [minAlgo, setMinAlgo] = useState("");
    const [connector, setConnector] = useState("");
    const [C_Percent, setC_Percent] = useState();
    const [usdcPrice, setUsdcPrice] = useState();
    const [elemPrice, setElemPrice] = useState();

    const [prerequisiteShow, setLoadPrerequisite] = useState(false);

    const handlePrerequisiteShow = () => setLoadPrerequisite(true);
    const handlePrerequisiteClose = () => setLoadPrerequisite(false);

    const [prerequisiteShow1, setLoadPrerequisite1] = useState(false);

    const handlePrerequisiteShow1 = () => setLoadPrerequisite1(true);
    const handlePrerequisiteClose1 = () => setLoadPrerequisite1(false);



    const [loadAssetOptUsdc, setLoadAssetOptUsdc] = useState(false);

    const handleShowAssetOptUsdc = () => setLoadAssetOptUsdc(true);
    const handleHideAssetOptUsdc = () => setLoadAssetOptUsdc(false);

    const [loadAssetOptElem, setLoadAssetOptElem] = useState(false);

    const handleShowAssetOptElem = () => setLoadAssetOptElem(true);
    const handleHideAssetOptElem = () => setLoadAssetOptElem(false);

    const [loadAppOpt, setLoadAppOpt] = useState(false);

    const handleShowAppOpt = () => setLoadAppOpt(true);
    const handleHideAppOpt = () => setLoadAppOpt(false);

    const [usdcBalances, setUsdcBalances] = useState("");
    const [elemBalances, setElemBalances] = useState("");

    const[loader, setLoader] = useState(false);

    const handleShowLoad = () => setLoader(true);
    const handleHideLoad = () => setLoader(false);


    const [loadMint, setLoadMint] = useState(false);

    const handleShowMint = () => setLoadMint(true);
    const handleHideMint = () => setLoadMint(false);

   

    const [loadelemopt, setLoadELEMOPT] = useState(false);

    const handleShowAppOptELEM = () => setLoadELEMOPT(true);
    const handleHideAppOptELEM = () => setLoadELEMOPT(false);

    //new code

    // const poolcontract = new web3.eth.Contract(poolv3, poolv3address);
    // const elemcontract = new web3.eth.Contract(ELEM, elemaddress);
    const[collateralinfo,setcolloteralinfo] = useState([]);
    const[enteredamount,seteneteredamount] = useState("");
    const[fxsprice,setfxsprice] = useState("");
    const[colout,setcolout] = useState("");


    const[daibalance,setdaibalance] = useState("")
    const[elemrewardbalance,setelemrewardbalance] = useState("")
    const[elembalance,setelembalance] = useState("")
    const [isOpens, setIsOpens] = useState(false);
    var[dis,setDis] = useState("");

    
    const [daiapproved, setdaiapproved] = useState(false);
    const [fraxapproved, setfraxapproved] = useState(false);
    const [elemapproved, setelemapproved] = useState(false);
    const poolcontract = new web3.eth.Contract(poolv3, poolv3address);
    const elemcontract = new web3.eth.Contract(ELEM, elemaddress);
    const daicontract = new web3.eth.Contract(DAI, Daiaddress);
    const elemrewardcontract = new web3.eth.Contract(ELEMReward, elemrewardaddress);
    useEffect(async() => {
        buybackModal();
    },[prerequisiteShow1, isOpens]);
    useEffect(async() => {
        optinModal();
    },[prerequisiteShow, fraxapproved, daiapproved,elemapproved]);
    useEffect(()=>{firstrend()})
    const firstrend=async()=>{
        if(localStorage.getItem("walletAddress")>0){

        const accounts = await  web3.eth.getAccounts();
        setdaibalance(await daicontract.methods.balanceOf(accounts[0]).call());
        setelemrewardbalance(await elemrewardcontract.methods.balanceOf(accounts[0]).call());
 
        setelembalance(await elemcontract.methods.balanceOf(accounts[0]).call());
        }
    }

    useEffect(()=>{firstrender()})
    const firstrender = async()=>{
        const accounts = await  web3.eth.getAccounts();

        let buybackaval = await poolcontract.methods.buybackAvailableCollat().call();
        if(buybackaval<=0){
            setIsOpens(true);
           // toast.error("Buyback not available");
            // setDis("Buyback not available")
        }
        else{
            setIsOpens(false);
    
        }
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
        let fxspric = await poolcontract.methods.getFXSPrice().call();
        setfxsprice(fxspric)
        setcolloteralinfo(await poolcontract.methods.collateral_information(Daiaddress).call());
        // console.log("coll",collateralinfo)

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


    const buybackModal = () =>
    {
        if(localStorage.getItem("walletAddress") === null || localStorage.getItem("walletAddress") === '')
        {
            handlePrerequisiteClose1();
        }
        else
        {
        if(isOpens === true)
        {
            console.log("buyback",isOpens)

            handlePrerequisiteShow1();
        }
        else{
            handlePrerequisiteClose1();
        }
        }
    }
    const buyback = async(fxs_amount)=>{
        seteneteredamount(fxs_amount)
        let fxs_dollar_value_d18 = (fxs_amount*1000000000000000000)*(fxsprice)/(1000000);
        let  collateral_equivalent_d18 = fxs_dollar_value_d18*(1000000)/(collateralinfo.price);
        let col_out = collateral_equivalent_d18/(10 ** collateralinfo.missing_decs); // In its natural decimals()

        // Subtract the buyback fee
        let col_out1 = (col_out*(1000000-(collateralinfo.buyback_fee)))/(1000000);
        setcolout(col_out1);

    }
    const buybackfxs = async(f)=>{
        handleShowLoad();
        const accounts = await  web3.eth.getAccounts();
        try{
            await poolcontract.methods.buyBackFxs(0,web3.utils.toBN(parseInt(enteredamount*1000000000000000000)),web3.utils.toBN(parseInt(f-10000))).send({
                from:accounts[0],              
                // gas: 210000,
                //gasPrice: '20000000000'
                }).on('transactionHash',function(hash){      
                    console.log("hashget",hash)                                                
                    let id = "https://rinkeby.etherscan.io/tx/" + hash;
                    toast.success(toastDiv(id));
                })
                firstrend()
                    firstrender()
                handleHideLoad();
                seteneteredamount("")
                setcolout("");
        }catch(err){
            handleHideLoad();
            toast.error(`err`,err);

        }
       
    }
    const toastDiv = (txId) =>
(
    <div>
        <p> Transaction is successful &nbsp;<a style={{color:'#133ac6'}} href={txId} target="_blank" rel="noreferrer"><br/><p style={{fontWeight: 'bold'}}>View in Explorer <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path d="M11.7176 3.97604L1.69366 14L0.046875 12.3532L10.0697 2.32926H1.23596V0H14.0469V12.8109H11.7176V3.97604Z" fill="#133ac6"/>
 </svg></p></a></p>  
    </div>
); 

    const maxcall= async()=>{
        buyback(elemrewardbalance/1000000000000000000)
    }

    
    return (
    
<Layout>
            <Container>
                {/* <Modald visible={isOpens} onClose={() => setIsOpens(false)}> */}
        {/* <FolowStepsdcopy viewhistory={dis}  /> */}
      {/* </Modald> */}
            <><ToastContainer position='bottom-right' draggable = {false} transition={Zoom} autoClose={4000} closeOnClick = {false}/></>

                <Row className='justify-content-center'>
                    <Col md={10} lg={7} className="mb-4">
                        <Card className='card-dash d-block border-0 mb-4'>
                        <div className="d-flex align-items-center float-end mt-1 acc-h-links mb-4">
                                <h6 className='sub-heading ms-4 d-flex mb-0'>
                                    How it works 
                                    <OverlayTrigger
                                        key="left"
                                        placement="left"
                                        overlay={
                                            <Tooltip id={`tooltip-left`}>
                                                <strong className='text-purple'>1.</strong> Enter the ELEM amount and check whether the required USDC amount is displayed.<br /><br /><strong className='text-purple'>2.</strong> Once you confirmed the required USDC amount click on "Buyback" button which will initiate the wallet to sign the Transactions.
                                            </Tooltip>
                                        }
                                        >
                                            <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                        </OverlayTrigger>
                                </h6>   
                        </div><br/><br/>
                            <div className="group-row">
                                <Row>
                                    <Col sm={5} className="mb-sm-0 mb-3">
                                        <Button variant='link' className='btn-currency p-0'>
                                            <img src={elemLogo} alt="ELEM" />
                                            <div className="ms-3 text-start">
                                                <h5 className='sub-heading text-xs mb-0'>Bal: {parseFloat(elemrewardbalance)/1000000 ? (parseFloat(elemrewardbalance)/1000000000000000000).toFixed(2): '0.00'}</h5>
                                                <h5 className='mb-0 font-semibold'>GOLD</h5>
                                            </div>
                                        </Button>
                                    </Col>
                                    <Col sm={7}>
                                        <div className="input-group-max px-3 input-group-max-lg w-100">
                                        <InputGroup>
                                                        <FormControl
                                                            // disabled={true}
                                                            value={enteredamount}
                                                            type='text'
                                                            placeholder="0.00"
                                                            aria-label="Recipient's username"
                                                            aria-describedby="basic-addon2"
                                                            onChange={(e) => buyback(e.target.value)}
                                                        />
                                                        <Button variant="outline-purple" className='btn-xs-d' onClick={()=>maxcall()} >Max</Button>
                                        </InputGroup>
                                            {/* <input type="number" placeholder='0.00' className='form-control' value={elemAmount} onChange={(e) => amountSet(e.target.value)}/> */}
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            <div className="p-sm-4 p-2">
                                <Button variant='blue' style={{cursor:"default"}} className='rounded-circle py-3'><svg width="20" height="20" className='m-0' viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.6255 11.0884C16.9501 10.7638 16.9501 10.2375 16.6255 9.91289C16.301 9.58848 15.7752 9.58824 15.4505 9.91236L11.3799 13.9756V4.66732C11.3799 4.20708 11.0068 3.83398 10.5465 3.83398C10.0863 3.83398 9.71322 4.20708 9.71322 4.66732V13.9756L5.65462 9.90978C5.32808 9.58266 4.79811 9.58242 4.47128 9.90925C4.14466 10.2359 4.14466 10.7654 4.47128 11.0921L9.94049 16.5613C10.2752 16.896 10.8179 16.896 11.1526 16.5613L16.6255 11.0884Z" fill="white"></path></svg></Button>
                            </div>
                            <div className="group-row">
                                <Row>
                                    <Col sm={5} className="mb-sm-0 mb-3">
                                        <Button variant='link' className='btn-currency p-0'>
                                            <img src={dai} alt="dai" />
                                            <div className="ms-3 text-start">
                                                <h5 className='sub-heading text-xs mb-0'>Bal: {parseFloat(daibalance)/1000000 ? (parseFloat(daibalance)/1000000000000000000).toFixed(2): '0.00'}</h5>
                                                <h5 className='mb-0 font-semibold'>DAI</h5>
                                            </div>
                                        </Button>
                                    </Col>
                                    <Col sm={7}>
                                        <div className="input-group-max px-3 input-group-max-lg w-100">
                                            <input type="number" placeholder='0.00' value={parseFloat(colout/100000000000000000).toFixed(6)} readonly disabled className='form-control' />
                                        </div>
                                    </Col>
                                </Row>
                            </div>

                            <hr className='my-4' />

                            <div className="mb-20">
                                <div className="d-flex mb-1 align-items-center justify-content-between text-md">
                                    <span> </span>
                                    <strong className='font-semibold'>Rate : 1 DAI = $ {collateralinfo.price/1000000}</strong>
                                </div>
                                <div className="d-flex mb-1 align-items-center justify-content-between text-md">
                                            <span> </span>
                                            <strong className='font-semibold'>Buyback fee  : {collateralinfo.buyback_fee/10000}%</strong>
                                        </div>
                            </div>

                            <ButtonLoad loading={loader} className='btn w-100 btn-blue' onClick={()=>buybackfxs(colout)} >
                                Buyback
                            </ButtonLoad>
                        </Card>
                    </Col>
                </Row>
               

           
            {isOpens === true ?(<>
            
                <Modal show={prerequisiteShow1} className="modal-dashboard" centered onHide={handlePrerequisiteClose1}>
            <div className="pt-xl-0 pt-4">   
                <Link className='text-white mb-20' to="/dashboard"><span style={{color:"#8247e5"}}>Go to Dashboard &nbsp;</span>
                <svg width="22" height="15" viewBox="0 0 22 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.6389 8.36952L18.8028 8.2H18.567H0.967033C0.700676 8.2 0.486002 8.10872 0.33782 7.95548C0.189347 7.80195 0.1 7.57826 0.1 7.3C0.1 7.02174 0.189347 6.79805 0.33782 6.64452C0.486002 6.49128 0.700676 6.4 0.967033 6.4H18.567H18.8064L18.6382 6.22972L14.0939 1.63048C14.0937 1.63036 14.0936 1.63023 14.0935 1.63011C13.7445 1.26887 13.7447 0.730627 14.0939 0.369516C14.4414 0.0101614 14.9564 0.0101614 15.3039 0.369516L21.7831 7.06952C21.939 7.23075 21.939 7.46925 21.7831 7.63048L15.3039 14.3305C14.9564 14.6898 14.4414 14.6898 14.0939 14.3305C13.7445 13.9692 13.7445 13.4308 14.0939 13.0695L18.6389 8.36952Z" fill="blue" stroke="currentColor" strokeWidth="0.2"/>
                                </svg>
                </Link>
                </div><br/>
                <Modal.Header>
                    <Modal.Title>  </Modal.Title>
                </Modal.Header>
                <Modal.Header>
                    <Modal.Title> There is currently no excess value to conduct buybacks. </Modal.Title>
                </Modal.Header>
                <Modal.Header>
                    <Modal.Title>  </Modal.Title>
                </Modal.Header>
            </Modal>
            
            
            </>):(<>
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
            
            
            
            
            
            
            </>)}
           


                {/* <Modal show={prerequisiteShow} className="modal-dashboard" centered onHide={handlePrerequisiteClose}>
                <div className="pt-xl-0 pt-4">   
                <Link className='text-white mb-20' to="/dashboard"><span className='text-blue'>Go to Dashboard &nbsp;</span>
                <svg width="22" height="15" viewBox="0 0 22 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.6389 8.36952L18.8028 8.2H18.567H0.967033C0.700676 8.2 0.486002 8.10872 0.33782 7.95548C0.189347 7.80195 0.1 7.57826 0.1 7.3C0.1 7.02174 0.189347 6.79805 0.33782 6.64452C0.486002 6.49128 0.700676 6.4 0.967033 6.4H18.567H18.8064L18.6382 6.22972L14.0939 1.63048C14.0937 1.63036 14.0936 1.63023 14.0935 1.63011C13.7445 1.26887 13.7447 0.730627 14.0939 0.369516C14.4414 0.0101614 14.9564 0.0101614 15.3039 0.369516L21.7831 7.06952C21.939 7.23075 21.939 7.46925 21.7831 7.63048L15.3039 14.3305C14.9564 14.6898 14.4414 14.6898 14.0939 14.3305C13.7445 13.9692 13.7445 13.4308 14.0939 13.0695L18.6389 8.36952Z" fill="blue" stroke="currentColor" strokeWidth="0.2"/>
                                </svg>
                </Link>
                </div><br/>
                <Modal.Header>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <center><span>Collateral is not balanced</span></center>
            
                </Modal.Body>
            </Modal>                 */}
            </Container>
            </Layout>
    );
};

export default Stablecoin;