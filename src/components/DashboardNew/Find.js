import React, { useState } from 'react';
import { Button, Card, Form, InputGroup, Col, Container, Dropdown, Modal, OverlayTrigger, Row, Tab, Tabs, Tooltip, Alert, Badge } from 'react-bootstrap';
import Layout from './Layout';

import USDC from '../../assets/images/usdc.jpg';
import { Link } from 'react-router-dom';

import usdclogo from '../../assets/images/usdc-logo.png';
import taulogo from '../../assets/images/tau-original.png';
import elemlogo from '../../assets/images/elem-original.png';
import algologo from '../../assets/images/Algo.png';
import MyAlgoConnect from '@randlabs/myalgo-connect';
import einrlogo from '../../assets/images/EINR-original.png';

import axios from 'axios';

import { walletBalance } from '../formula';

const Stablecoin = () => {
    const [show, setShow] = useState(false);
    const [showAlert, setShowAlert] = useState(true);
    const [val, setVal] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [key, setKey] = useState();

    const[tokId1,setTokId1] = useState(0)  //TokId1
    const[tokId2,setTokId2] = useState()  //TokId2
    const[tokName1,setTokName1] = useState("ALGO")  //Tok Name 1
    const[tokName2,setTokName2] = useState()  //Tok Name 2

    const[tokLogo1,setTokLogo1] = useState(algologo)  //Tok logo 1
    const[tokLogo2,setTokLogo2] = useState() //Tok logo 2

    const[tokBalance1,setTokBalance1] = useState()  //Tok Balance 1
    const[tokBalance2,setTokBalance2] = useState() //Tok Balance 2

    const[assetoptin1,setAssetOptin1] = useState(false);
    const[assetoptin2,setAssetOptin2] = useState(false);
    const[assetoptin3,setAssetOptin3] = useState(false);
    const [show1, setShow1] = useState(false);

    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);

    const choose1 = async(id,logo,name)=>{
        setTokId1(id);
        setTokName1(name)
        setTokLogo1(logo)
        let [value,optin] = await walletBalance(parseInt(id));
        setTokBalance1(value)
        setAssetOptin1(optin)
        handleClose()
    }

    const choose2 = async(id,logo,name)=>{
        setTokId2(id);
        setTokName2(name)
        setTokLogo2(logo)
        let [value,optin] = await walletBalance(parseInt(id));
        setTokBalance2(value)
        setAssetOptin2(optin)
        handleClose1()
    }
    return (
        <Layout>
            <Container>
                <Row className='justify-content-center'>
                    <Col md={10} lg={7} className="mb-4">
                        <Link className='mb-3 text-text-FF d-flex align-items-center btn-link' to="/swap">
                            <svg xmlns="http://www.w3.org/2000/svg" className='me-2' width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                            Go Back
                        </Link>

                        <h4>Import Pool</h4>

                        { 
                            showAlert? 
                            <Alert variant="grad" className='mb-4' onClose={() => setShowAlert(false)} dismissible>
                                <p><strong>Tip:</strong> Use this tool to find pairs that don't automatically appear in the interface.</p>
                            </Alert>
                            : null
                        }

                        <Card className='card-dash p-3 d-block border-0 mb-4'>
                            <div className="mb-4">
                                <div className=" py-3 px-2">
                                    <Row>
                                        <Col sm={5} className="mb-sm-0 mb-3">
                                            <Button variant='link' onClick={handleShow} className='btn-currency p-0'>
                                                <img src={tokLogo1} alt="USDC" />
                                                <div className="ms-3 text-start">
                                                    <h5 className='mb-0 font-semibold'>
                                                        {tokName1}
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="16" height="16" class="ml-2 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                                                    </h5>
                                                </div>
                                            </Button>
                                        </Col>
                                    </Row>
                                </div>
                                <div className=" py-3 px-2">
                                    <Button variant='blue' className='rounded-circle py-3'><svg width="20" className='ms-0' height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 12C19 12.5523 18.5523 13 18 13H13V18C13 18.5523 12.5523 19 12 19C11.4477 19 11 18.5523 11 18V13H6C5.44772 13 5 12.5523 5 12C5 11.4477 5.44772 11 6 11H11V6C11 5.44772 11.4477 5 12 5C12.5523 5 13 5.44772 13 6V11H18C18.5523 11 19 11.4477 19 12Z" fill="#ffffff"></path></svg></Button>
                                </div>
                                <div className=" py-3 px-2">
                                    <Row>
                                        <Col sm={5} className="mb-sm-0 mb-3">
                                            <Button variant='link' onClick={handleShow1} className='btn-currency p-0'>
                                                <img src={tokLogo2} />
                                                <div className="ms-3 text-start">
                                                <h5 className='mb-0 font-semibold'>
                                                {tokName2 ? 
                                                   (<>{tokName2}</>):
                                                   (<><Badge bg="purple">Select a token</Badge></>)} 
                                                 </h5>                                            
                                                </div>
                                            </Button>
                                        </Col>
                                        
                                    </Row>
                                </div>
                            </div>

                            <Button className='btn btn-blue w-100'>
                                {/* <svg width="20" height="20" className='me-2 ms-0' viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg"><path d="M21 18V19C21 20.1 20.1 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.89 3 5 3H19C20.1 3 21 3.9 21 5V6H12C10.89 6 10 6.9 10 8V16C10 17.1 10.89 18 12 18H21ZM12 16H22V8H12V16ZM16 13.5C15.17 13.5 14.5 12.83 14.5 12C14.5 11.17 15.17 10.5 16 10.5C16.83 10.5 17.5 11.17 17.5 12C17.5 12.83 16.83 13.5 16 13.5Z"></path></svg> */}
                               Import
                            </Button>
                            {/* <Link className='btn btn-blue w-100' to="/swap" params={{ testvalue: "hello" }}>Import it.</Link> */}

                        </Card>
                    </Col>
                </Row>
            </Container>

            <Modal show={show} className="modal-dashboard" centered onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Select a token</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-4">
                        <div className="text-md mb-2">Search</div>
                        <input type="text" placeholder='Search name or paste address' className='form-control form-control-field border-0' />
                    </div>
                    <div className="mb-4">
                        <h5 className='mb-3 font-semibold'>
                            Common bases
                            <OverlayTrigger
                                key="right"
                                placement="right"
                                overlay={
                                    <Tooltip id={`tooltip-right`}>
                                        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                    </Tooltip>
                                }
                                >
                                    <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                </OverlayTrigger>
                        </h5>

                        <div className="d-flex flex-wrap justify-content-center">
                            <Button className='p-0  btn-currency-sm text-white mb-3 me-4' variant='link'>
                         <img src={algologo} alt="USDC" />
                         <h6 className='mb-0 ms-2 font-semibold' onClick={()=>choose1(0,algologo,"ALGO")}>ALGO</h6>
                     </Button>
                     <Button className='p-0  btn-currency-sm text-white mb-3 me-4' variant='link'>
                         <img src={usdclogo} alt="USDC" />
                         <h6 className='mb-0 ms-2 font-semibold' onClick={()=>choose1(78045387,usdclogo,"USDC")}>USDC</h6>
                     </Button>
                     <Button className='p-0  btn-currency-sm text-white mb-3 me-4' variant='link'>
                         <img src={taulogo} alt="USDC" />
                         <h6 className='mb-0 ms-2 font-semibold'onClick={()=>choose1(78043454,taulogo,"TAU")}>TAU</h6>
                     </Button>
                     <Button className='p-0  btn-currency-sm text-white mb-3 me-4' variant='link'>
                         <img src={elemlogo} alt="USDC" />
                         <h6 className='mb-0 ms-2 font-semibold'onClick={()=>choose1(78044331,elemlogo,"ELEM")}>ELEM</h6>
                     </Button>
                     <Button className='p-0  btn-currency-sm text-white mb-3 me-4' variant='link'>
                         <img src={einrlogo} alt="USDC" />
                         <h6 className='mb-0 ms-2 font-semibold'onClick={()=>choose1(78044898,einrlogo,"EINR")} >EINR</h6>
                            </Button>
                     {/* <Button className='p-0  btn-currency-sm text-white mb-3 me-4' variant='link'>
                         <img src={USDC} alt="USDC" />
                         <h6 className='mb-0 ms-2 font-semibold'>DAI</h6>
                     </Button>
                            <Button className='p-0  btn-currency-sm text-white mb-3 me-4' variant='link'>
                                <img src={USDC} alt="USDC" />
                                <h6 className='mb-0 ms-2 font-semibold'>DAI</h6>
                            </Button>
                            <Button className='p-0  btn-currency-sm text-white mb-3 me-4' variant='link'>
                                <img src={USDC} alt="USDC" />
                                <h6 className='mb-0 ms-2 font-semibold'>USDC</h6>
                            </Button>
                            <Button className='p-0  btn-currency-sm text-white mb-3 me-4' variant='link'>
                                <img src={USDC} alt="USDC" />
                                <h6 className='mb-0 ms-2 font-semibold'>USDT</h6>
                     </Button> */}
                        </div>
                    </div>

                    <hr className='mb-4' />

                    <div className="currency-list py-1">
                        <Button variant='link' className='btn-currency mb-2 w-100 justify-content-start align-items-center btn-currency-md p-0'>
                            <img src={USDC} alt="USDC" />
                            <div className="ms-3 text-start">
                                <h5 className='mb-0 font-semibold text-white'>One</h5>
                                <h6 className='sub-heading text-sm mb-0' style={{color: 'rgb(128, 128, 128)'}}>Harmony</h6>
                            </div>
                        </Button>
                        <Button variant='link' className='btn-currency mb-2 w-100 justify-content-start align-items-center btn-currency-md p-0'>
                            <img src={USDC} alt="USDC" />
                            <div className="ms-3 text-start">
                                <h5 className='mb-0 font-semibold text-white'>One</h5>
                                <h6 className='sub-heading text-sm mb-0' style={{color: 'rgb(128, 128, 128)'}}>Harmony</h6>
                            </div>
                        </Button>
                        <Button variant='link' className='btn-currency mb-2 w-100 justify-content-start align-items-center btn-currency-md p-0'>
                            <img src={USDC} alt="USDC" />
                            <div className="ms-3 text-start">
                                <h5 className='mb-0 font-semibold text-white'>One</h5>
                                <h6 className='sub-heading text-sm mb-0' style={{color: 'rgb(128, 128, 128)'}}>Harmony</h6>
                            </div>
                        </Button>
                        <Button variant='link' className='btn-currency mb-2 w-100 justify-content-start align-items-center btn-currency-md p-0'>
                            <img src={USDC} alt="USDC" />
                            <div className="ms-3 text-start">
                                <h5 className='mb-0 font-semibold text-white'>One</h5>
                                <h6 className='sub-heading text-sm mb-0' style={{color: 'rgb(128, 128, 128)'}}>Harmony</h6>
                            </div>
                        </Button>
                        <Button variant='link' className='btn-currency mb-2 w-100 justify-content-start align-items-center btn-currency-md p-0'>
                            <img src={USDC} alt="USDC" />
                            <div className="ms-3 text-start">
                                <h5 className='mb-0 font-semibold text-white'>One</h5>
                                <h6 className='sub-heading text-sm mb-0' style={{color: 'rgb(128, 128, 128)'}}>Harmony</h6>
                            </div>
                        </Button>
                        <Button variant='link' className='btn-currency mb-2 w-100 justify-content-start align-items-center btn-currency-md p-0'>
                            <img src={USDC} alt="USDC" />
                            <div className="ms-3 text-start">
                                <h5 className='mb-0 font-semibold text-white'>One</h5>
                                <h6 className='sub-heading text-sm mb-0' style={{color: 'rgb(128, 128, 128)'}}>Harmony</h6>
                            </div>
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
            <Modal show={show1} className="modal-dashboard" centered onHide={handleClose1}>
                <Modal.Header closeButton>
                    <Modal.Title>Select a  token</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-4">
                        <div className="text-md mb-2">Search</div>
                        <input type="text" placeholder='Search name or paste address' className='form-control form-control-field border-0' />
                    </div>
                    <div className="mb-4">
                        <h5 className='mb-3 font-semibold'>
                            Common bases
                            <OverlayTrigger
                                key="right"
                                placement="right"
                                overlay={
                                    <Tooltip id={`tooltip-right`}>
                                        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                    </Tooltip>
                                }
                                >
                                    <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                </OverlayTrigger>
                        </h5>

                        <div className="d-flex flex-wrap justify-content-center">
                     
                     <Button className='p-0  btn-currency-sm text-white mb-3 me-4' variant='link'>
                         <img src={algologo} alt="USDC" />
                         <h6 className='mb-0 ms-2 font-semibold' onClick={()=>choose2(0,algologo,"ALGO")}>ALGO</h6>
                     </Button>
                     <Button className='p-0  btn-currency-sm text-white mb-3 me-4' variant='link'>
                         <img src={usdclogo} alt="USDC" />
                         <h6 className='mb-0 ms-2 font-semibold' onClick={()=>choose2(78045387,usdclogo,"USDC")}>USDC</h6>
                     </Button>
                     <Button className='p-0  btn-currency-sm text-white mb-3 me-4' variant='link'>
                         <img src={taulogo} alt="USDC" />
                         <h6 className='mb-0 ms-2 font-semibold'onClick={()=>choose2(78043454,taulogo,"TAU")}>TAU</h6>
                     </Button>
                     <Button className='p-0  btn-currency-sm text-white mb-3 me-4' variant='link'>
                         <img src={elemlogo} alt="USDC" />
                         <h6 className='mb-0 ms-2 font-semibold'onClick={()=>choose2(78044331,elemlogo,"ELEM")}>ELEM</h6>
                     </Button>
                     <Button className='p-0  btn-currency-sm text-white mb-3 me-4' variant='link'>
                         <img src={einrlogo} alt="USDC" />
                         <h6 className='mb-0 ms-2 font-semibold'onClick={()=>choose2(78044898,einrlogo,"EINR")} >EINR</h6>
                     </Button>
                     {/* <Button className='p-0  btn-currency-sm text-white mb-3 me-4' variant='link'>
                         <img src={USDC} alt="USDC" />
                         <h6 className='mb-0 ms-2 font-semibold'>DAI</h6>
                     </Button>
                     <Button className='p-0  btn-currency-sm text-white mb-3 me-4' variant='link'>
                         <img src={USDC} alt="USDC" />
                         <h6 className='mb-0 ms-2 font-semibold'>USDC</h6>
                     </Button>
                     <Button className='p-0  btn-currency-sm text-white mb-3 me-4' variant='link'>
                         <img src={USDC} alt="USDC" />
                         <h6 className='mb-0 ms-2 font-semibold'>USDT</h6>
                     </Button> */}
                 </div>
                    </div>

                    <hr className='mb-4' />

                    <div className="currency-list py-1">
                        <Button variant='link' className='btn-currency mb-2 w-100 justify-content-start align-items-center btn-currency-md p-0'>
                            <img src={USDC} alt="USDC" />
                            <div className="ms-3 text-start">
                                <h5 className='mb-0 font-semibold text-white'>One</h5>
                                <h6 className='sub-heading text-sm mb-0' style={{color: 'rgb(128, 128, 128)'}}>Harmony</h6>
                            </div>
                        </Button>
                        <Button variant='link' className='btn-currency mb-2 w-100 justify-content-start align-items-center btn-currency-md p-0'>
                            <img src={USDC} alt="USDC" />
                            <div className="ms-3 text-start">
                                <h5 className='mb-0 font-semibold text-white'>One</h5>
                                <h6 className='sub-heading text-sm mb-0' style={{color: 'rgb(128, 128, 128)'}}>Harmony</h6>
                            </div>
                        </Button>
                        <Button variant='link' className='btn-currency mb-2 w-100 justify-content-start align-items-center btn-currency-md p-0'>
                            <img src={USDC} alt="USDC" />
                            <div className="ms-3 text-start">
                                <h5 className='mb-0 font-semibold text-white'>One</h5>
                                <h6 className='sub-heading text-sm mb-0' style={{color: 'rgb(128, 128, 128)'}}>Harmony</h6>
                            </div>
                        </Button>
                        <Button variant='link' className='btn-currency mb-2 w-100 justify-content-start align-items-center btn-currency-md p-0'>
                            <img src={USDC} alt="USDC" />
                            <div className="ms-3 text-start">
                                <h5 className='mb-0 font-semibold text-white'>One</h5>
                                <h6 className='sub-heading text-sm mb-0' style={{color: 'rgb(128, 128, 128)'}}>Harmony</h6>
                            </div>
                        </Button>
                        <Button variant='link' className='btn-currency mb-2 w-100 justify-content-start align-items-center btn-currency-md p-0'>
                            <img src={USDC} alt="USDC" />
                            <div className="ms-3 text-start">
                                <h5 className='mb-0 font-semibold text-white'>One</h5>
                                <h6 className='sub-heading text-sm mb-0' style={{color: 'rgb(128, 128, 128)'}}>Harmony</h6>
                            </div>
                        </Button>
                        <Button variant='link' className='btn-currency mb-2 w-100 justify-content-start align-items-center btn-currency-md p-0'>
                            <img src={USDC} alt="USDC" />
                            <div className="ms-3 text-start">
                                <h5 className='mb-0 font-semibold text-white'>One</h5>
                                <h6 className='sub-heading text-sm mb-0' style={{color: 'rgb(128, 128, 128)'}}>Harmony</h6>
                            </div>
                        </Button>
                    </div>
                </Modal.Body>
                </Modal>
        </Layout>
    );
};

export default Stablecoin;