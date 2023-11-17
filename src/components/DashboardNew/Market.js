import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row, ProgressBar, Tabs, Tab, Button, InputGroup, Form, Table, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Layout from './LayoutT';
import MyAlgoConnect from '@randlabs/myalgo-connect';
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import { formatJsonRpcRequest } from "@json-rpc-tools/utils";
import { dualwalletconnect } from './walletconnection';
import algosdk, { Algod ,encodeUint64} from "algosdk";
import node from './nodeapi.json';
import axios from 'axios';


import { AppId,escrowProgram,escrowProgram2,elemToken } from '../swapConfig';
import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';

import { walletBalance,priceofalgoperusdc,checkotp,checkotpforanotheraddress } from '../formula';
import { ManagerAppid,ManagerAppAddress,AlgoAssetAppid,AlgoAppAddress,UsdcAssetAppid,USDCAppAddress,EALGOAssetid,
    EUSDCAssetid,algooracleid,usdcoracleid,thirdappid,fourthappid,fifthappid,thirdOracle,fourthOracle,fifthOracle,
    algoEscrow,usdcEscrow,globalstate,globalstateapp,globalstateoracle,availabletoWithdraw,availtoWithdraw } from '../lendingConfigFile';


    
const algodClient = new algosdk.Algodv2('',node['algodclient'], '');
const myAlgoWallet = new MyAlgoConnect({ disableLedgerNano: false });
const indexerClient = new algosdk.Indexer('', node['indexerclient'], '');

const Dashboard = () => {
    useEffect(() => {
        document.title = "ELEMENT | Market"
    }, [])
    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [show1, setShow1] = React.useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);

    const handleShowLoad = () => setLoader(true);
    const handleHideLoad = () => setLoader(false);
 // const [switchState, setSwitchState] = useState(false);
 const [showMode, setShowMode] = useState(false);
    const[loader, setLoader] = useState(false);
    const handleCloseMode = () => {
      setShowMode(false); 
      // setSwitchState(true);
  }
  const btnhandleCloseMode = () => {
      setShowMode(false); 
      // setSwitchState(true);
  }

    const[tablle,settable] = useState([]);
    const[selectedValue,setselectedValue] = useState([]);
    const[rangeValue,setRangeValue] = useState("");

    const[inputvalue,setinputvalue] = useState("");
    const[algoprice,setalgoprice] = useState("");
    const[assetopted,setassetopted] = useState(true)
    const[appopted,setappopted] = useState(true)
    const[glob1,setglobal1] = useState([])
    const[glob2,setglobal2] = useState([]);
    const[globapp1,setglobalapp1] = useState([]);
    const[globapp2,setglobalapp2] = useState([]);
    const[maxwithdraw1,setmaxwithdraw1] = useState("");
    const[maxwithdraw2,setmaxwithdraw2] = useState("");


    useEffect(()=>{table()},[])
    const table = async()=>{
    //   if(localStorage.getItem("walletAddress")){
        // let [s1,opt] = await walletBalance(0);
        // let [s2,opt2] = await walletBalance(78045387);
        // let managerappopted = await checkotp(ManagerAppid);
        let price1 = await globalstateoracle(algodClient,algooracleid);
        let price2 = await globalstateoracle(algodClient,usdcoracleid);
        let t = [
            {name:"ALGO",id:1,appid:AlgoAssetAppid,price:price1.latest_twap_price,underlying:EALGOAssetid,logo:"https://app.folks.finance/algo.svg",address:AlgoAppAddress},
            {name:"USDC",id:78045387,appid:UsdcAssetAppid,price:price2.price,underlying:EUSDCAssetid,logo:"https://app.folks.finance/usdc.svg",address:USDCAppAddress}
        ]
        settable(t);
        // let lsig = await logicsigcreting(6,localStorage.getItem("walletAddress"));
        // let global1 = await globalstate(AlgoAssetAppid,lsig.address())
        // let global2 = await globalstate(UsdcAssetAppid,lsig.address())
        let globalapp1 = await globalstateapp(algodClient,AlgoAssetAppid)
        let globalapp2 = await globalstateapp(algodClient,UsdcAssetAppid)
        // let withdrawvalue1 = await availabletoWithdraw(t[0].price,globalapp1,global1)
        // let withdrawvalue2 = await availabletoWithdraw(t[1].price,globalapp2,global2)
        // setglobal1(global1)
        // setglobal2(global2)
        setglobalapp1(globalapp1);
        setglobalapp2(globalapp2);
        // setmaxwithdraw1(withdrawvalue1);
        // setmaxwithdraw2(withdrawvalue2);

    //   }
    //   else{
    //     let t = [
    //       {name:"ALGO",id:1,appid:AlgoAssetAppid,underlying:EALGOAssetid,logo:"https://app.folks.finance/algo.svg",balance:0,address:AlgoAppAddress},
    //       {name:"USDC",id:78045387,appid:UsdcAssetAppid,underlying:EUSDCAssetid,logo:"https://app.folks.finance/usdc.svg",balance:0,address:USDCAppAddress}
    //   ]
    //   settable(t);
    //   }
        
        
    }
console.log("price",tablle)
    const logicsigcreting = async(s,sender) =>{
        let contract;
        // if(s === 1){
            contract = algoEscrow;
        // }
        // else{
            // contract = usdcEscrow;
        // }
        let replacedData = contract.replaceAll("from",sender);
        console.log("data",replacedData)
        let results = await algodClient.compile(replacedData).do(); 
      let program1 = new Uint8Array(Buffer.from(results.result, "base64"));
      console.log("Escrow =", program1); 
          let lsig = new algosdk.LogicSigAccount(program1);
      console.log("Escrow =", lsig.address()); 
      return lsig;
    }  
    return (
        <Layout>
            <Container>
                <Row>
                    <Col md={6} className="mb-4">
                        <Card className='card-dash border-0 mb-4'>
                            <div className="text-md mb-20 font-semibold leading-7 text-purple">Total Deposited</div>

                            <div className='mb-20'>
                                <h2 className='mb-0'>${tablle[0] ? parseFloat(((tablle[0].price/1000000)*(globapp1.acc/1000000))+((tablle[1].price/1000000)*(globapp2.acc/1000000))).toFixed(3): 0}</h2>
                            </div>
                            

                            <hr className='mb-20 mt-0' />

                            <div className='mb-0'>
                                <h6 className='sub-heading mb-0'>
                                    Top 2 Markets
                                </h6>
                                
                                <Row>
                                    <Col sm={12} className="d-flex align-items-start mt-3">
                                        <span className='me-3'><img style={{width: '20px'}} src={tablle[0]?tablle[0].logo:0} alt="usdc" /></span>
                                        <div className='flex-grow-1'>
                                            <div className="d-flex mb-2 justify-content-between align-items-center">
                                                <strong>ALGO</strong>
                                                <span style={{opacity: '0.5'}}>{parseFloat((((globapp1.acc/1000000)/((globapp1.acc+globapp2.acc)/1000000)) * 100)).toFixed(3)}%</span>
                                            </div>
                                            <ProgressBar now={(((globapp1.acc/1000000)/((globapp1.acc+globapp2.acc)/1000000)) * 100)} />
                                        </div>
                                    </Col>
                                    <Col sm={12} className="d-flex align-items-start mt-3">
                                        <span className='me-3'><img style={{width: '20px'}} src={tablle[0]?tablle[1].logo:0} alt="usdc" /></span>
                                        <div className='flex-grow-1'>
                                            <div className="d-flex mb-2 justify-content-between align-items-center">
                                                <strong>USDC</strong>
                                                <span style={{opacity: '0.5'}}>{parseFloat((((globapp2.acc/1000000)/((globapp1.acc+globapp2.acc)/1000000)) * 100)).toFixed(3)}%</span>
                                            </div>
                                            <ProgressBar now={(((globapp2.acc/1000000)/((globapp1.acc+globapp2.acc)/1000000)) * 100)} />
                                        </div>
                                    </Col>
                                    {/* <Col sm={6} className="d-flex align-items-start mt-3">
                                        <span className='me-3'><img style={{width: '20px'}} src="https://app.folks.finance/usdc.svg" alt="usdc" /></span>
                                        <div className='flex-grow-1'>
                                            <div className="d-flex mb-2 justify-content-between align-items-center">
                                                <strong>USDC</strong>
                                                <span style={{opacity: '0.5'}}>11.33%</span>
                                            </div>
                                            <ProgressBar now={11.33} />
                                        </div>
                                    </Col>
                                    <Col sm={6} className="d-flex align-items-start mt-3">
                                        <span className='me-3'><img style={{width: '20px'}} src="https://app.folks.finance/usdc.svg" alt="usdc" /></span>
                                        <div className='flex-grow-1'>
                                            <div className="d-flex mb-2 justify-content-between align-items-center">
                                                <strong>USDt</strong>
                                                <span style={{opacity: '0.5'}}>8.77%</span>
                                            </div>
                                            <ProgressBar now={8.77} />
                                        </div>
                                    </Col> */}
                                </Row>
                            </div>
                            
                        </Card>                                              
                    </Col>
                    <Col md={6} className="mb-4">
                        <Card className='card-dash border-0 mb-4'>
                            <div className="text-md mb-20 font-semibold leading-7 text-purple">Total Borrowed</div>

                            <div className='mb-20'>
                               <h2 className='mb-0'>${tablle[0]?parseFloat(((tablle[0].price/1000000)*(globapp1.ub/1000000))+((tablle[1].price/1000000)*(globapp2.ub/1000000))).toFixed(3):0}</h2>
                            </div>
                            

                            <hr className='mb-20 mt-0' />

                            <div className='mb-0'>
                                <h6 className='sub-heading mb-0'>
                                    Top 2 Markets
                                </h6>
                                
                                <Row>
                                    <Col sm={12} className="d-flex align-items-start mt-3">
                                        <span className='me-3'><img style={{width: '20px'}} src={tablle[0]?tablle[0].logo:0} alt="usdc" /></span>
                                        <div className='flex-grow-1'>
                                            <div className="d-flex mb-2 justify-content-between align-items-center">
                                                <strong>ALGO</strong>
                                                <span style={{opacity: '0.5'}}>{parseFloat((((globapp1.ub/1000000)/((globapp1.ub+globapp2.ub)/1000000)) * 100)).toFixed(3)}%</span>
                                            </div>
                                            <ProgressBar now={(((globapp1.ub/1000000)/((globapp1.ub+globapp2.ub)/1000000)) * 100)} />
                                        </div>
                                    </Col>
                                    <Col sm={12} className="d-flex align-items-start mt-3">
                                        <span className='me-3'><img style={{width: '20px'}} src={tablle[0]?tablle[1].logo:0} alt="usdc" /></span>
                                        <div className='flex-grow-1'>
                                            <div className="d-flex mb-2 justify-content-between align-items-center">
                                                <strong>USDC</strong>
                                                <span style={{opacity: '0.5'}}>{parseFloat((((globapp2.ub/1000000)/((globapp1.ub+globapp2.ub)/1000000)) * 100)).toFixed(3)}%</span>
                                            </div>
                                            <ProgressBar now={(((globapp2.ub/1000000)/((globapp1.ub+globapp2.ub)/1000000)) * 100)} />
                                        </div>
                                    </Col>
                                    {/* <Col sm={6} className="d-flex align-items-start mt-3">
                                        <span className='me-3'><img style={{width: '20px'}} src="https://app.folks.finance/usdc.svg" alt="usdc" /></span>
                                        <div className='flex-grow-1'>
                                            <div className="d-flex mb-2 justify-content-between align-items-center">
                                                <strong>USDC</strong>
                                                <span style={{opacity: '0.5'}}>11.33%</span>
                                            </div>
                                            <ProgressBar now={11.33} />
                                        </div>
                                    </Col>
                                    <Col sm={6} className="d-flex align-items-start mt-3">
                                        <span className='me-3'><img style={{width: '20px'}} src="https://app.folks.finance/usdc.svg" alt="usdc" /></span>
                                        <div className='flex-grow-1'>
                                            <div className="d-flex mb-2 justify-content-between align-items-center">
                                                <strong>USDt</strong>
                                                <span style={{opacity: '0.5'}}>8.77%</span>
                                            </div>
                                            <ProgressBar now={8.77} />
                                        </div>
                                    </Col> */}
                                </Row>
                            </div>
                            
                        </Card>                                              
                    </Col>
                </Row>

                <Card className='card-dash d-block border-0 mb-4'>
                    <div className="nft-tabs float-md-end">
                        <InputGroup className="input-group-search">
                            <Form.Control placeholder="Search" />
                            <Button variant="outline-secondary" id="button-addon2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                </svg>
                            </Button>
                        </InputGroup>   
                    </div>
                    <Tabs defaultActiveKey="all" className='dashboard-tabs' id="tab-example-1">
                        <Tab eventKey="all" title="All">
                            <div className="mb-4">
                                <Table responsive hover className='dashboard-table'>
                                    <thead>
                                        <tr>
                                            <th>Asset</th>
                                            <th className='text-center'>Total Deposited</th>
                                            <th className='text-center'>Total Borrowed</th>
                                            <th className='text-end'>
                                                Deposit APR
                                                <OverlayTrigger
                                                    key="left"
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip id={`tooltip-left`}>
                                                            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                                        </Tooltip>
                                                    }
                                                    >
                                                    <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                                </OverlayTrigger>
                                            </th>
                                            <th className='text-end'>
                                                Borrow APR
                                                <OverlayTrigger
                                                    key="left"
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip id={`tooltip-left`}>
                                                            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                                        </Tooltip>
                                                    }
                                                    >
                                                    <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                                </OverlayTrigger>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <span className='me-lg-3 me-2'><img style={{width: '30px'}} src={tablle[0]?tablle[0].logo:0}  alt="usdc" /></span>
                                                    <div className='text-nowrap' style={{lineHeight: '1.4'}}>
                                                        <span style={{fontWeight: '500'}}>ALGO</span> <br /><span style={{opacity: '0.5'}}>ALGO</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='text-center'>
                                                <strong>${tablle[0]?parseFloat((tablle[0].price/1000000)*(globapp1.acc/1000000)).toFixed(3):0}</strong>
                                            </td>
                                            <td className='text-center'>
                                                <strong>${tablle[0]?parseFloat((tablle[0].price/1000000)*(globapp1.ub/1000000)).toFixed(3):0}</strong>
                                            </td>
                                            <td className='text-end'>
                                                <strong style={{color : '#1eb76f'}}> { parseFloat((globapp1.uc/globapp1.acc)*100).toFixed(3)}%</strong>
                                            </td>
                                            <td className='text-end'>
                                                <strong style={{color : '#613eeb'}}> { parseFloat((globapp1.uc/globapp1.ub)*100).toFixed(3) }
                                                    %</strong><br />
                                                {/* <OverlayTrigger
                                                    key="left"
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip id={`tooltip-left`}>
                                                            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                                        </Tooltip>
                                                    }
                                                    >
                                                    <div className="info-badge mt-1 d-inline-flex align-items-center">
                                                        + up to 4.39% <img style={{width: '20px'}} src="https://app.folks.finance/usdc.svg" alt="usdc" />
                                                    </div>
                                                </OverlayTrigger> */}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <span className='me-lg-3 me-2'><img style={{width: '30px'}} src={tablle[0]?tablle[1].logo:0} alt="usdc" /></span>
                                                    <div className='text-nowrap' style={{lineHeight: '1.4'}}>
                                                        <span style={{fontWeight: '500'}}>USDC</span> <br /><span style={{opacity: '0.5'}}>ALGO</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='text-center'>
                                                <strong>${tablle[0]?parseFloat((tablle[1].price/1000000)*(globapp2.acc/1000000)).toFixed(3):0}</strong>
                                            </td>
                                            <td className='text-center'>
                                                <strong>${tablle[0]?parseFloat((tablle[1].price/1000000)*(globapp2.ub/1000000)).toFixed(3):0}</strong>
                                            </td>
                                            <td className='text-end'>
                                                <strong style={{color : '#1eb76f'}}> {parseFloat((globapp2.uc/globapp2.acc)*100).toFixed(3)}%</strong><br />
                                                {/* <OverlayTrigger
                                                    key="left"
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip id={`tooltip-left`}>
                                                            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                                        </Tooltip>
                                                    }
                                                    >
                                                    <div className="info-badge mt-1 d-inline-flex align-items-center">
                                                        + up to 4.39% <img style={{width: '20px'}} src="https://app.folks.finance/usdc.svg" alt="usdc" />
                                                    </div>
                                                </OverlayTrigger> */}
                                            </td>
                                            <td className='text-end'>
                                                <strong style={{color : '#613eeb'}}> {parseFloat((globapp2.uc/globapp2.ub)*100).toFixed(3)}%</strong><br />
                                                {/* <OverlayTrigger
                                                    key="left"
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip id={`tooltip-left`}>
                                                            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                                        </Tooltip>
                                                    }
                                                    >
                                                    <div className="info-badge mt-1 d-inline-flex align-items-center">
                                                        + up to 4.39% <img style={{width: '20px'}} src="https://app.folks.finance/usdc.svg" alt="usdc" />
                                                    </div>
                                                </OverlayTrigger> */}
                                            </td>
                                        </tr>
                                        {/* <tr>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <span className='me-lg-3 me-2'><img style={{width: '30px'}} src="https://app.folks.finance/usdc.svg" alt="usdc" /></span>
                                                    <div className='text-nowrap' style={{lineHeight: '1.4'}}>
                                                        <span style={{fontWeight: '500'}}>ALGO</span> <br /><span style={{opacity: '0.5'}}>ALGO</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='text-center'>
                                                <strong>$1,950,056.27</strong>
                                            </td>
                                            <td className='text-center'>
                                                <strong>$763,617.17</strong>
                                            </td>
                                            <td className='text-end'>
                                                <strong style={{color : '#1eb76f'}}>2.39%</strong><br />
                                                <OverlayTrigger
                                                    key="left"
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip id={`tooltip-left`}>
                                                            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                                        </Tooltip>
                                                    }
                                                    >
                                                    <div className="info-badge mt-1 d-inline-flex align-items-center">
                                                        + up to 4.39% <img style={{width: '20px'}} src="https://app.folks.finance/usdc.svg" alt="usdc" />
                                                    </div>
                                                </OverlayTrigger>
                                            </td>
                                            <td className='text-end'>
                                                <strong style={{color : '#613eeb'}}>6.66%</strong><br />
                                                <OverlayTrigger
                                                    key="left"
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip id={`tooltip-left`}>
                                                            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                                        </Tooltip>
                                                    }
                                                    >
                                                    <div className="info-badge mt-1 d-inline-flex align-items-center">
                                                        + up to 4.39% <img style={{width: '20px'}} src="https://app.folks.finance/usdc.svg" alt="usdc" />
                                                    </div>
                                                </OverlayTrigger>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <span className='me-lg-3 me-2'><img style={{width: '30px'}} src="https://app.folks.finance/usdc.svg" alt="usdc" /></span>
                                                    <div className='text-nowrap' style={{lineHeight: '1.4'}}>
                                                        <span style={{fontWeight: '500'}}>ALGO</span> <br /><span style={{opacity: '0.5'}}>ALGO</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='text-center'>
                                                <strong>$1,950,056.27</strong>
                                            </td>
                                            <td className='text-center'>
                                                <strong>$763,617.17</strong>
                                            </td>
                                            <td className='text-end'>
                                                <strong style={{color : '#1eb76f'}}>2.39%</strong><br />
                                                <OverlayTrigger
                                                    key="left"
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip id={`tooltip-left`}>
                                                            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                                        </Tooltip>
                                                    }
                                                    >
                                                    <div className="info-badge mt-1 d-inline-flex align-items-center">
                                                        + up to 4.39% <img style={{width: '20px'}} src="https://app.folks.finance/usdc.svg" alt="usdc" />
                                                    </div>
                                                </OverlayTrigger>
                                            </td>
                                            <td className='text-end'>
                                                <strong style={{color : '#613eeb'}}>6.66%</strong><br />
                                                <OverlayTrigger
                                                    key="left"
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip id={`tooltip-left`}>
                                                            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                                        </Tooltip>
                                                    }
                                                    >
                                                    <div className="info-badge mt-1 d-inline-flex align-items-center">
                                                        + up to 4.39% <img style={{width: '20px'}} src="https://app.folks.finance/usdc.svg" alt="usdc" />
                                                    </div>
                                                </OverlayTrigger>
                                            </td>
                                        </tr> */}
                                    </tbody>
                                </Table>
                            </div>
                        </Tab>
                        {/* <Tab eventKey="favorites" title="Favorites">
                            <div className="mb-4">
                                <Table responsive hover className='dashboard-table'>
                                    <thead>
                                        <tr>
                                            <th>Asset</th>
                                            <th className='text-center'>Total Deposited</th>
                                            <th className='text-center'>Total Borrowed</th>
                                            <th className='text-end'>
                                                Deposit APR
                                                <OverlayTrigger
                                                    key="left"
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip id={`tooltip-left`}>
                                                            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                                        </Tooltip>
                                                    }
                                                    >
                                                    <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                                </OverlayTrigger>
                                            </th>
                                            <th className='text-end'>
                                                Borrow APR
                                                <OverlayTrigger
                                                    key="left"
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip id={`tooltip-left`}>
                                                            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                                        </Tooltip>
                                                    }
                                                    >
                                                    <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                                </OverlayTrigger>
                                            </th>
                                        </tr>
                                    </thead>
                                </Table>

                                <div className="empty-content mt-5 text-center">
                                    <h4 className='text-muted'>You have not added any assets to your favorites. <br />You can add them by clicking on the star icon  next to their name</h4>
                                    <Button variant='blue' className='py-3 px-5'>See all assets</Button>
                                </div>
                            </div>
                        </Tab> */}
                    </Tabs>
                </Card>
            </Container>
        </Layout>
    );
};

export default Dashboard;