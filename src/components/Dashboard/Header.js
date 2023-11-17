import React from 'react';
import {Container, Navbar, Nav, Badge, Dropdown, Row, Col, Modal, Button} from 'react-bootstrap';
import {
    NavLink as Link
  } from "react-router-dom";
import { useState } from "react";
import axios from "axios"
import { useEffect } from "react";
import colorLogo from '../../assets/images/sidebar-logo.png'
import url from "../../configurl"
import MyAlgoConnect from '@randlabs/myalgo-connect';

import PeraWalletLogo from '../../assets/images/PeraWalletLogo.svg';
import MyAlgoLogo from '../../assets/images/MyAlgoLogo.svg';
import AlgoSigner from '../../assets/images/AlgoSigner.svg';

const myAlgoWallet = new MyAlgoConnect({ disableLedgerNano: false });
const algosdk = require("algosdk");

function Header() {
    const baseServer = 'https://testnet-algorand.api.purestake.io/ps2';
const port = '';

const token = {
   'X-API-Key': 'pOD5BAUCxq7InVPjo0sO01B0Vq4d7pD1ask5Ix43'
}

const algodClientGet = new algosdk.Algodv2(token, baseServer, port);

    const algodClient = new algosdk.Algodv2('', 'https://node.testnet.algoexplorerapi.io', '');
    const indexClient = new algosdk.Indexer('', 'https://algoindexer.testnet.algoexplorerapi.io', '');

    const [assetCount, setAssetCount] = useState("");
    const [algoBalance, setAlgoBalance] = useState("");
    const [copyButton, setCopyButton] = useState(false);

    const handleCopy = () =>{setCopyButton(false)};
    const handleCopied = () =>{setCopyButton(true)};

    
    const [show, setShow] = React.useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

   const connectWallet = async () => {
        try {
            handleCopy();

            let settings = {
                shouldSelectOneAccount: true,
                openManager: true
            }

          const accounts = await myAlgoWallet.connect(settings);
          const addresses = accounts.map((account) => account.address);

          console.log("addresses : ", addresses);
          localStorage.setItem("walletAddress", addresses[0]);
            await countAsset();
          window.location.reload();
          setShowButton(false);
        } catch (err) {
          console.error(err);
        }
      };
      const [showButton, setShowButton] = useState(true);
      let walletAddress = localStorage.getItem("walletAddress");
      const wallet = async() => {
        let v = localStorage.getItem("walletAddress");
        if(v){
          setShowButton(false)
        }
        else{
          setShowButton(true)
        }
      }
      useEffect(() =>{wallet()},[localStorage.getItem("walletAddress"),showButton])
    
     
    
      const Disconnect = async() => {
        localStorage.setItem("walletAddress", "");
        handleCopy();
        window.location.reload();
        setShowButton(true)
      }

      useEffect(async() => {
        await countAsset()
    }, [assetCount, algoBalance]);

      const countAsset = async () =>
      {
        let accountInfo = await indexClient.lookupAccountByID(localStorage.getItem("walletAddress")).do();            console.log(accountInfo);
            setAssetCount(accountInfo['account']['assets']['length']);
            setAlgoBalance(accountInfo['account']['amount']);
      }

const copyCheck = () =>
{
    navigator.clipboard.writeText(localStorage.getItem("walletAddress"));
    handleCopied() 
}

    return (
        <>
            <header className="header">
                <Navbar expand="xl" className='p-0'>
                    <Container fluid="lg">
                        <Navbar.Brand href="/" className='d-xl-none'><img src={colorLogo} alt="logo" /></Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav">
                            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.9214 18.6127V20.6127H5.92139V18.6127H16.9214ZM21.9214 11.6127V13.6127H3.92139V11.6127H21.9214ZM19.9214 4.61267V6.61267H8.92139V4.61267H19.9214Z" fill="white"/>
                            </svg>
                        </Navbar.Toggle>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <div className="d-flex mb-3 d-xl-none align-items-center justify-content-between">
                                <Navbar.Brand href="/"><img src={colorLogo} alt="logo" /></Navbar.Brand>

                                <Navbar.Toggle aria-controls="basic-navbar-nav">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#fff" className="bi bi-x-lg" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
                                        <path fillRule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
                                    </svg>
                                </Navbar.Toggle>
                            </div>
                            <div className="navbar-controls ms-lg-auto order-xl-2 d-flex align-items-center">
                            <>
                            {/* <Link to="/swap" className='btn me-0 btn-grad'>Access DeFi 2.0 Ecosystem</Link>&nbsp;&nbsp; */}
                            <Dropdown className='me-2'>
                                <Dropdown.Toggle variant="grad" id="dropdown-basic">
                                    MainNet
                                </Dropdown.Toggle>

                                <Dropdown.Menu >
                                    <Dropdown.Item href="#/action-1">MainNet</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">TestNet</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            { showButton ? 
                                <button className='btn me-0 btn-grad' onClick={handleShow}>Connect Wallet</button>
                                : <>
                               {/* <button className='btn me-2 btn-grad' > {parseFloat(wb).toFixed(2)}&nbsp;ALGO </button> */}

                                {/* <button className='btn me-3 btn-grad' onClick={()=>connectWallet()}>{(localStorage.getItem("walletAddress")).substring(0, 4)}...{(localStorage.getItem("walletAddress")).substring((localStorage.getItem("walletAddress")).length -4, (localStorage.getItem("walletAddress")).length)}</button><br /> */}
                                {/* <button className='btn me-3 btn-grad' onClick={() =>Disconnect()}>Disconnect</button> */}
                            
                                <Dropdown >
                                    <Dropdown.Toggle variant="grad" className='dropdown-noarrow' id="dropdown-basic">
                                    {/* {(localStorage.getItem("walletAddress")).substring(0, 4)}...{(localStorage.getItem("walletAddress")).substring((localStorage.getItem("walletAddress")).length -4, (localStorage.getItem("walletAddress")).length)} */}
                                    {(localStorage.getItem("walletAddress")).substring(0, 4)}...{(localStorage.getItem("walletAddress")).substring((localStorage.getItem("walletAddress")).length -4, (localStorage.getItem("walletAddress")).length)}

                                    </Dropdown.Toggle>

                                    <Dropdown.Menu className="dropdown-menu-end dropdown-menu-setting p-3">
                                        <div className="dropdown-menu-header mb-3">
                                            <Row>
                                            <Col>
                                            <h6 className='mb-0' >{(localStorage.getItem("walletAddress")).substring(0, 4)}...{(localStorage.getItem("walletAddress")).substring((localStorage.getItem("walletAddress")).length -4, (localStorage.getItem("walletAddress")).length)}</h6>
                                            {copyButton === true ?<><button className="btn btn-secondary mb-2 mt-2">Copied!</button></>:<><button className="btn btn-secondary mb-2 mt-2"  onClick={() => copyCheck()}>Copy address</button></>}
                                            <p className='text-gray'><small>{assetCount} Assets</small></p>
                                            </Col>
                                            <Col>
                                            <button className='btn btn-grad'> <center> {(parseFloat(algoBalance)/1000000).toFixed(2)} ALGO <br/>(TestNet) </center></button> 
                                            </Col>
                                            </Row>
                                        </div>
                                            <Dropdown.Item className='d-flex align-items-center p-2 rounded' onClick={()=>connectWallet()}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi me-2 bi-person" viewBox="0 0 16 16">
                                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                                            </svg>
                                            Account</Dropdown.Item>
                                        <Dropdown.Item className='d-flex align-items-center p-2 rounded' onClick={() =>Disconnect()}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi me-2 bi-box-arrow-right" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                                                <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                                            </svg>
                                            Disconnect
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                </>
                                }</>
                            </div>

                            <Nav className="mx-auto d-lg-none">
                                <Link className='nav-link' to="/dashboard" activeClassName="active">
                                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13 21.5V11.5H21V21.5H13ZM3 13.5V3.5H11V13.5H3ZM9 11.5V5.5H5V11.5H9ZM3 21.5V15.5H11V21.5H3ZM5 19.5H9V17.5H5V19.5ZM15 19.5H19V13.5H15V19.5ZM13 3.5H21V9.5H13V3.5ZM15 5.5V7.5H19V5.5H15Z" fill="#0d0c10"/>
                                    </svg>
                                    Dashboard
                                </Link>
                                <Link className='nav-link' to="/bond" activeClassName="active">
                                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2.5C17.523 2.5 22 6.977 22 12.5C22 18.023 17.523 22.5 12 22.5C6.477 22.5 2 18.023 2 12.5C2 6.977 6.477 2.5 12 2.5ZM12 4.5C9.87827 4.5 7.84344 5.34285 6.34315 6.84315C4.84285 8.34344 4 10.3783 4 12.5C4 14.6217 4.84285 16.6566 6.34315 18.1569C7.84344 19.6571 9.87827 20.5 12 20.5C14.1217 20.5 16.1566 19.6571 17.6569 18.1569C19.1571 16.6566 20 14.6217 20 12.5C20 10.3783 19.1571 8.34344 17.6569 6.84315C16.1566 5.34285 14.1217 4.5 12 4.5ZM16 13.5V15.5H8V13.5H16ZM16 9.5V11.5H8V9.5H16Z" fill="#0d0c10"/>
                                    </svg>
                                    Bond
                                </Link>
                                <Link className='nav-link' to="/single-stake" activeClassName="active">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20.0829 15.1998L21.2849 15.9208C21.359 15.9652 21.4204 16.0281 21.463 16.1033C21.5056 16.1784 21.528 16.2634 21.528 16.3498C21.528 16.4363 21.5056 16.5212 21.463 16.5964C21.4204 16.6716 21.359 16.7344 21.2849 16.7788L12.5149 22.0408C12.3593 22.1343 12.1813 22.1836 11.9999 22.1836C11.8184 22.1836 11.6404 22.1343 11.4849 22.0408L2.71485 16.7788C2.6407 16.7344 2.57932 16.6716 2.5367 16.5964C2.49408 16.5212 2.47168 16.4363 2.47168 16.3498C2.47168 16.2634 2.49408 16.1784 2.5367 16.1033C2.57932 16.0281 2.6407 15.9652 2.71485 15.9208L3.91685 15.1998L11.9999 20.0498L20.0829 15.1998ZM20.0829 10.4998L21.2849 11.2208C21.359 11.2652 21.4204 11.3281 21.463 11.4033C21.5056 11.4784 21.528 11.5634 21.528 11.6498C21.528 11.7363 21.5056 11.8212 21.463 11.8964C21.4204 11.9716 21.359 12.0344 21.2849 12.0788L11.9999 17.6498L2.71485 12.0788C2.6407 12.0344 2.57932 11.9716 2.5367 11.8964C2.49408 11.8212 2.47168 11.7363 2.47168 11.6498C2.47168 11.5634 2.49408 11.4784 2.5367 11.4033C2.57932 11.3281 2.6407 11.2652 2.71485 11.2208L3.91685 10.4998L11.9999 15.3498L20.0829 10.4998ZM12.5139 1.30883L21.2849 6.57083C21.359 6.61522 21.4204 6.67807 21.463 6.75326C21.5056 6.82845 21.528 6.9134 21.528 6.99983C21.528 7.08625 21.5056 7.1712 21.463 7.24639C21.4204 7.32158 21.359 7.38443 21.2849 7.42883L11.9999 12.9998L2.71485 7.42883C2.6407 7.38443 2.57932 7.32158 2.5367 7.24639C2.49408 7.1712 2.47168 7.08625 2.47168 6.99983C2.47168 6.9134 2.49408 6.82845 2.5367 6.75326C2.57932 6.67807 2.6407 6.61522 2.71485 6.57083L11.4849 1.30883C11.6404 1.21538 11.8184 1.16602 11.9999 1.16602C12.1813 1.16602 12.3593 1.21538 12.5149 1.30883H12.5139ZM11.9999 3.33183L5.88685 6.99983L11.9999 10.6678L18.1129 6.99983L11.9999 3.33183Z" fill="#0d0c10"/>
                                    </svg>
                                    Stake
                                </Link>
                                <Link className='nav-link' to="/mint" activeClassName="active">
                                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 405.3V448c0 35.3 86 64 192 64s192-28.7 192-64v-42.7C342.7 434.4 267.2 448 192 448S41.3 434.4 0 405.3zM320 128c106 0 192-28.7 192-64S426 0 320 0 128 28.7 128 64s86 64 192 64zM0 300.4V352c0 35.3 86 64 192 64s192-28.7 192-64v-51.6c-41.3 34-116.9 51.6-192 51.6S41.3 334.4 0 300.4zm416 11c57.3-11.1 96-31.7 96-55.4v-42.7c-23.2 16.4-57.3 27.6-96 34.5v63.6zM192 160C86 160 0 195.8 0 240s86 80 192 80 192-35.8 192-80-86-80-192-80zm219.3 56.3c60-10.8 100.7-32 100.7-56.3v-42.7c-35.5 25.1-96.5 38.6-160.7 41.8 29.5 14.3 51.2 33.5 60 57.2z"></path></svg>
                                    Mint
                                </Link>
                                <Link className='nav-link' to="/redeem" activeClassName="active">
                                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"></path><path fillRule="nonzero" d="M5 9a1 1 0 0 1 1 1 6.97 6.97 0 0 1 4.33 1.5h2.17c1.333 0 2.53.58 3.354 1.5H19a5 5 0 0 1 4.516 2.851C21.151 18.972 17.322 21 13 21c-2.79 0-5.15-.603-7.06-1.658A.998.998 0 0 1 5 20H2a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1h3zm1.001 3L6 17.022l.045.032C7.84 18.314 10.178 19 13 19c3.004 0 5.799-1.156 7.835-3.13l.133-.133-.12-.1a2.994 2.994 0 0 0-1.643-.63L19 15h-2.111c.072.322.111.656.111 1v1H8v-2l6.79-.001-.034-.078a2.501 2.501 0 0 0-2.092-1.416L12.5 13.5H9.57A4.985 4.985 0 0 0 6.002 12zM4 11H3v7h1v-7zm14-6a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-7-5a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path></g></svg>
                                    Redeem
                                </Link>
                                <Link className='nav-link' to="/buyback" activeClassName="active">
                                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M254.47 53.094s-4.808 37.12-49.5 49.5c-44.695 12.38-129.282 0-129.282 0L61.343 115.78l8.187 9.157-1.093 2.876-51.843 137.312L16 266.72v1.717c0 18.897 8.253 34.243 20.344 44 12.09 9.758 27.563 14.31 42.937 14.313 15.376.003 30.878-4.556 42.97-14.313 12.092-9.756 20.344-25.094 20.344-44v-1.843l-.688-1.688L86.97 130.28c23.946-3.003 80.866-8.54 115.5 1.532 23.064 6.71 36.151 20.345 43.436 31.97L210.78 354.468l21.407 30.31c-17.75 7.75-32.593 24.84-37.562 51.345-56.076 6.195-95.47 20.74-95.47 37.688h311.876c0-16.947-39.392-31.493-95.467-37.688-4.91-26.6-19.57-44.112-37.188-51.906l21-29.75L264 162.28c7.457-11.275 20.388-24.045 42.47-30.468 34.955-10.167 92.615-4.42 116.155-1.437l-50.875 134.75-.625 1.594v1.717c0 18.897 8.253 34.243 20.344 44 12.09 9.758 27.593 14.31 42.967 14.313 15.375.003 30.877-4.556 42.97-14.313 12.09-9.756 20.343-25.094 20.343-44v-1.843l-.688-1.688L441 127.562l-.938-2.28 8.782-8.438-15.594-14.25s-84.556 12.38-129.25 0-49.53-49.5-49.53-49.5zM77.53 156.656l44.22 108.375H36.594L77.53 156.657zm355.158 0l44.218 108.375H391.72l40.967-108.374z"></path></svg>
                                    Buyback
                                </Link>
                                <Link className='nav-link' to="/recollateraloze" activeClassName="active">
                                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M254.47 53.094s-4.808 37.12-49.5 49.5c-44.695 12.38-129.282 0-129.282 0L61.343 115.78l8.187 9.157-1.093 2.876-51.843 137.312L16 266.72v1.717c0 18.897 8.253 34.243 20.344 44 12.09 9.758 27.563 14.31 42.937 14.313 15.376.003 30.878-4.556 42.97-14.313 12.092-9.756 20.344-25.094 20.344-44v-1.843l-.688-1.688L86.97 130.28c23.946-3.003 80.866-8.54 115.5 1.532 23.064 6.71 36.151 20.345 43.436 31.97L210.78 354.468l21.407 30.31c-17.75 7.75-32.593 24.84-37.562 51.345-56.076 6.195-95.47 20.74-95.47 37.688h311.876c0-16.947-39.392-31.493-95.467-37.688-4.91-26.6-19.57-44.112-37.188-51.906l21-29.75L264 162.28c7.457-11.275 20.388-24.045 42.47-30.468 34.955-10.167 92.615-4.42 116.155-1.437l-50.875 134.75-.625 1.594v1.717c0 18.897 8.253 34.243 20.344 44 12.09 9.758 27.593 14.31 42.967 14.313 15.375.003 30.877-4.556 42.97-14.313 12.09-9.756 20.343-25.094 20.343-44v-1.843l-.688-1.688L441 127.562l-.938-2.28 8.782-8.438-15.594-14.25s-84.556 12.38-129.25 0-49.53-49.5-49.53-49.5zM77.53 156.656l44.22 108.375H36.594L77.53 156.657zm355.158 0l44.218 108.375H391.72l40.967-108.374z"></path></svg>
                                    Recollateralize
                                </Link>
                                <Link className='nav-link' to="/swap" activeClassName="active">
                                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M254.47 53.094s-4.808 37.12-49.5 49.5c-44.695 12.38-129.282 0-129.282 0L61.343 115.78l8.187 9.157-1.093 2.876-51.843 137.312L16 266.72v1.717c0 18.897 8.253 34.243 20.344 44 12.09 9.758 27.563 14.31 42.937 14.313 15.376.003 30.878-4.556 42.97-14.313 12.092-9.756 20.344-25.094 20.344-44v-1.843l-.688-1.688L86.97 130.28c23.946-3.003 80.866-8.54 115.5 1.532 23.064 6.71 36.151 20.345 43.436 31.97L210.78 354.468l21.407 30.31c-17.75 7.75-32.593 24.84-37.562 51.345-56.076 6.195-95.47 20.74-95.47 37.688h311.876c0-16.947-39.392-31.493-95.467-37.688-4.91-26.6-19.57-44.112-37.188-51.906l21-29.75L264 162.28c7.457-11.275 20.388-24.045 42.47-30.468 34.955-10.167 92.615-4.42 116.155-1.437l-50.875 134.75-.625 1.594v1.717c0 18.897 8.253 34.243 20.344 44 12.09 9.758 27.593 14.31 42.967 14.313 15.375.003 30.877-4.556 42.97-14.313 12.09-9.756 20.343-25.094 20.343-44v-1.843l-.688-1.688L441 127.562l-.938-2.28 8.782-8.438-15.594-14.25s-84.556 12.38-129.25 0-49.53-49.5-49.53-49.5zM77.53 156.656l44.22 108.375H36.594L77.53 156.657zm355.158 0l44.218 108.375H391.72l40.967-108.374z"></path></svg>
                                    Swap
                                </Link>
                                <Link className='nav-link' to="/pool" activeClassName="active">
                                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M254.47 53.094s-4.808 37.12-49.5 49.5c-44.695 12.38-129.282 0-129.282 0L61.343 115.78l8.187 9.157-1.093 2.876-51.843 137.312L16 266.72v1.717c0 18.897 8.253 34.243 20.344 44 12.09 9.758 27.563 14.31 42.937 14.313 15.376.003 30.878-4.556 42.97-14.313 12.092-9.756 20.344-25.094 20.344-44v-1.843l-.688-1.688L86.97 130.28c23.946-3.003 80.866-8.54 115.5 1.532 23.064 6.71 36.151 20.345 43.436 31.97L210.78 354.468l21.407 30.31c-17.75 7.75-32.593 24.84-37.562 51.345-56.076 6.195-95.47 20.74-95.47 37.688h311.876c0-16.947-39.392-31.493-95.467-37.688-4.91-26.6-19.57-44.112-37.188-51.906l21-29.75L264 162.28c7.457-11.275 20.388-24.045 42.47-30.468 34.955-10.167 92.615-4.42 116.155-1.437l-50.875 134.75-.625 1.594v1.717c0 18.897 8.253 34.243 20.344 44 12.09 9.758 27.593 14.31 42.967 14.313 15.375.003 30.877-4.556 42.97-14.313 12.09-9.756 20.343-25.094 20.343-44v-1.843l-.688-1.688L441 127.562l-.938-2.28 8.782-8.438-15.594-14.25s-84.556 12.38-129.25 0-49.53-49.5-49.53-49.5zM77.53 156.656l44.22 108.375H36.594L77.53 156.657zm355.158 0l44.218 108.375H391.72l40.967-108.374z"></path></svg>
                                    Pool
                                </Link>
                                <Link className='nav-link' to="/farm" activeClassName="active">
                                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M254.47 53.094s-4.808 37.12-49.5 49.5c-44.695 12.38-129.282 0-129.282 0L61.343 115.78l8.187 9.157-1.093 2.876-51.843 137.312L16 266.72v1.717c0 18.897 8.253 34.243 20.344 44 12.09 9.758 27.563 14.31 42.937 14.313 15.376.003 30.878-4.556 42.97-14.313 12.092-9.756 20.344-25.094 20.344-44v-1.843l-.688-1.688L86.97 130.28c23.946-3.003 80.866-8.54 115.5 1.532 23.064 6.71 36.151 20.345 43.436 31.97L210.78 354.468l21.407 30.31c-17.75 7.75-32.593 24.84-37.562 51.345-56.076 6.195-95.47 20.74-95.47 37.688h311.876c0-16.947-39.392-31.493-95.467-37.688-4.91-26.6-19.57-44.112-37.188-51.906l21-29.75L264 162.28c7.457-11.275 20.388-24.045 42.47-30.468 34.955-10.167 92.615-4.42 116.155-1.437l-50.875 134.75-.625 1.594v1.717c0 18.897 8.253 34.243 20.344 44 12.09 9.758 27.593 14.31 42.967 14.313 15.375.003 30.877-4.556 42.97-14.313 12.09-9.756 20.343-25.094 20.343-44v-1.843l-.688-1.688L441 127.562l-.938-2.28 8.782-8.438-15.594-14.25s-84.556 12.38-129.25 0-49.53-49.5-49.53-49.5zM77.53 156.656l44.22 108.375H36.594L77.53 156.657zm355.158 0l44.218 108.375H391.72l40.967-108.374z"></path></svg>
                                    Farm
                                </Link>
                                <Link className='nav-link' to="/launchpad" activeClassName="active">
                                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M254.47 53.094s-4.808 37.12-49.5 49.5c-44.695 12.38-129.282 0-129.282 0L61.343 115.78l8.187 9.157-1.093 2.876-51.843 137.312L16 266.72v1.717c0 18.897 8.253 34.243 20.344 44 12.09 9.758 27.563 14.31 42.937 14.313 15.376.003 30.878-4.556 42.97-14.313 12.092-9.756 20.344-25.094 20.344-44v-1.843l-.688-1.688L86.97 130.28c23.946-3.003 80.866-8.54 115.5 1.532 23.064 6.71 36.151 20.345 43.436 31.97L210.78 354.468l21.407 30.31c-17.75 7.75-32.593 24.84-37.562 51.345-56.076 6.195-95.47 20.74-95.47 37.688h311.876c0-16.947-39.392-31.493-95.467-37.688-4.91-26.6-19.57-44.112-37.188-51.906l21-29.75L264 162.28c7.457-11.275 20.388-24.045 42.47-30.468 34.955-10.167 92.615-4.42 116.155-1.437l-50.875 134.75-.625 1.594v1.717c0 18.897 8.253 34.243 20.344 44 12.09 9.758 27.593 14.31 42.967 14.313 15.375.003 30.877-4.556 42.97-14.313 12.09-9.756 20.343-25.094 20.343-44v-1.843l-.688-1.688L441 127.562l-.938-2.28 8.782-8.438-15.594-14.25s-84.556 12.38-129.25 0-49.53-49.5-49.53-49.5zM77.53 156.656l44.22 108.375H36.594L77.53 156.657zm355.158 0l44.218 108.375H391.72l40.967-108.374z"></path></svg>
                                    Launchpad
                                </Link>
                                <Link className='nav-link' to="/analytics" activeClassName="active">
                                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M254.47 53.094s-4.808 37.12-49.5 49.5c-44.695 12.38-129.282 0-129.282 0L61.343 115.78l8.187 9.157-1.093 2.876-51.843 137.312L16 266.72v1.717c0 18.897 8.253 34.243 20.344 44 12.09 9.758 27.563 14.31 42.937 14.313 15.376.003 30.878-4.556 42.97-14.313 12.092-9.756 20.344-25.094 20.344-44v-1.843l-.688-1.688L86.97 130.28c23.946-3.003 80.866-8.54 115.5 1.532 23.064 6.71 36.151 20.345 43.436 31.97L210.78 354.468l21.407 30.31c-17.75 7.75-32.593 24.84-37.562 51.345-56.076 6.195-95.47 20.74-95.47 37.688h311.876c0-16.947-39.392-31.493-95.467-37.688-4.91-26.6-19.57-44.112-37.188-51.906l21-29.75L264 162.28c7.457-11.275 20.388-24.045 42.47-30.468 34.955-10.167 92.615-4.42 116.155-1.437l-50.875 134.75-.625 1.594v1.717c0 18.897 8.253 34.243 20.344 44 12.09 9.758 27.593 14.31 42.967 14.313 15.375.003 30.877-4.556 42.97-14.313 12.09-9.756 20.343-25.094 20.343-44v-1.843l-.688-1.688L441 127.562l-.938-2.28 8.782-8.438-15.594-14.25s-84.556 12.38-129.25 0-49.53-49.5-49.53-49.5zM77.53 156.656l44.22 108.375H36.594L77.53 156.657zm355.158 0l44.218 108.375H391.72l40.967-108.374z"></path></svg>
                                    Analytics
                                </Link>
                                <Link className='nav-link' to="/lending" activeClassName="active">
                                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M254.47 53.094s-4.808 37.12-49.5 49.5c-44.695 12.38-129.282 0-129.282 0L61.343 115.78l8.187 9.157-1.093 2.876-51.843 137.312L16 266.72v1.717c0 18.897 8.253 34.243 20.344 44 12.09 9.758 27.563 14.31 42.937 14.313 15.376.003 30.878-4.556 42.97-14.313 12.092-9.756 20.344-25.094 20.344-44v-1.843l-.688-1.688L86.97 130.28c23.946-3.003 80.866-8.54 115.5 1.532 23.064 6.71 36.151 20.345 43.436 31.97L210.78 354.468l21.407 30.31c-17.75 7.75-32.593 24.84-37.562 51.345-56.076 6.195-95.47 20.74-95.47 37.688h311.876c0-16.947-39.392-31.493-95.467-37.688-4.91-26.6-19.57-44.112-37.188-51.906l21-29.75L264 162.28c7.457-11.275 20.388-24.045 42.47-30.468 34.955-10.167 92.615-4.42 116.155-1.437l-50.875 134.75-.625 1.594v1.717c0 18.897 8.253 34.243 20.344 44 12.09 9.758 27.593 14.31 42.967 14.313 15.375.003 30.877-4.556 42.97-14.313 12.09-9.756 20.343-25.094 20.343-44v-1.843l-.688-1.688L441 127.562l-.938-2.28 8.782-8.438-15.594-14.25s-84.556 12.38-129.25 0-49.53-49.5-49.53-49.5zM77.53 156.656l44.22 108.375H36.594L77.53 156.657zm355.158 0l44.218 108.375H391.72l40.967-108.374z"></path></svg>
                                    Money Market
                                </Link>
                                {/* <Link className='nav-link' to="/governance" activeClassName="active">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14 14.252V16.342C13.0949 16.022 12.1263 15.9239 11.1754 16.0558C10.2245 16.1877 9.3192 16.5459 8.53543 17.1002C7.75166 17.6545 7.11234 18.3888 6.67116 19.2414C6.22998 20.094 5.99982 21.04 6 22L4 21.999C3.99969 20.7779 4.27892 19.5729 4.8163 18.4764C5.35368 17.3799 6.13494 16.4209 7.10022 15.673C8.0655 14.9251 9.18918 14.4081 10.3852 14.1616C11.5811 13.9152 12.8177 13.9457 14 14.251V14.252ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11ZM18 17V14H20V17H23V19H20V22H18V19H15V17H18Z" fill="white"/>
                                    </svg>
                                    Governance</Link> */}
                                <Link className='nav-link' to="/docs" activeClassName="active">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.00002 2.003V2H19.998C20.55 2 21 2.455 21 2.992V21.008C20.9998 21.2712 20.895 21.5235 20.7088 21.7095C20.5226 21.8955 20.2702 22 20.007 22H3.99302C3.8617 21.9991 3.73185 21.9723 3.61087 21.9212C3.48989 21.8701 3.38017 21.7957 3.28796 21.7022C3.19575 21.6087 3.12286 21.4979 3.07346 21.3762C3.02406 21.2545 2.9991 21.1243 3.00002 20.993V8L9.00002 2.003ZM5.83002 8H9.00002V4.83L5.83002 8ZM11 4V9C11 9.26522 10.8947 9.51957 10.7071 9.70711C10.5196 9.89464 10.2652 10 10 10H5.00002V20H19V4H11Z" fill="#0d0c10"/>
                                    </svg>
                                    Docs
                                </Link>
                            </Nav>

                            <div className="social-icons mt-4 justify-content-center d-flex d-xl-none align-items-center">
                            <a href="https://discord.com/invite/urquv6EWYs" target="_blank" rel="noreferrer">
                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_2_5931)">
                                <path d="M13.914 15.1345C13.7537 15.1736 13.5923 15.2083 13.43 15.2386C12.5494 15.4045 11.6453 15.4011 10.766 15.2286C10.612 15.1985 10.394 15.1455 10.113 15.0704L9.192 16.2684C6.919 16.1954 6.055 14.6711 6.055 14.6711C6.055 11.2873 7.536 8.54397 7.536 8.54397C9.017 7.41002 10.426 7.44104 10.426 7.44104L10.829 7.96648C10.8661 7.96127 10.9035 7.95793 10.941 7.95647C11.7092 7.85456 12.4877 7.85793 13.255 7.96648L13.697 7.44104C13.697 7.44104 15.107 7.41002 16.587 8.54497C16.587 8.54497 18.069 11.2873 18.069 14.6711C18.069 14.6711 17.194 16.1944 14.921 16.2684L13.914 15.1335V15.1345ZM10.076 11.5515C9.475 11.5515 9 12.0019 9 12.5523C9 13.1028 9.485 13.5532 10.076 13.5532C10.676 13.5532 11.151 13.1028 11.151 12.5523C11.161 12.0019 10.677 11.5515 10.076 11.5515ZM13.924 11.5515C13.324 11.5515 12.849 12.0019 12.849 12.5523C12.849 13.1028 13.334 13.5532 13.924 13.5532C14.525 13.5532 15 13.1028 15 12.5523C15 12.0019 14.525 11.5515 13.924 11.5515ZM21 23.5615L16.01 18.5573H19V4.54562H5V18.5573H16.003L16.573 20.559H5C4.46957 20.559 3.96086 20.3481 3.58579 19.9727C3.21071 19.5974 3 19.0882 3 18.5573V4.54562C3 4.01474 3.21071 3.50561 3.58579 3.13022C3.96086 2.75484 4.46957 2.54395 5 2.54395H19C19.5304 2.54395 20.0391 2.75484 20.4142 3.13022C20.7893 3.50561 21 4.01474 21 4.54562V23.5615Z" fill="currentColor"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_2_5931">
                                <rect width="24" height="24.0201" fill="currentColor" transform="translate(0 0.54248)"/>
                                </clipPath>
                                </defs>
                                </svg>
                            </a>
                            <a href="https://t.me/ElementDeFi" target="_blank" rel="noreferrer">
                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_2_5936)">
                                <path d="M12 20.559C14.1217 20.559 16.1566 19.7155 17.6569 18.2139C19.1571 16.7124 20 14.6758 20 12.5523C20 10.4288 19.1571 8.39228 17.6569 6.89073C16.1566 5.38918 14.1217 4.54562 12 4.54562C9.87827 4.54562 7.84344 5.38918 6.34315 6.89073C4.84285 8.39228 4 10.4288 4 12.5523C4 14.6758 4.84285 16.7124 6.34315 18.2139C7.84344 19.7155 9.87827 20.559 12 20.559ZM12 22.5607C6.477 22.5607 2 18.0799 2 12.5523C2 7.0247 6.477 2.54395 12 2.54395C17.523 2.54395 22 7.0247 22 12.5523C22 18.0799 17.523 22.5607 12 22.5607ZM8.89 13.7233L6.392 12.9436C5.852 12.7785 5.849 12.4062 6.513 12.139L16.246 8.37583C16.811 8.14563 17.131 8.43688 16.948 9.16649L15.291 16.993C15.175 17.5505 14.84 17.6836 14.375 17.4264L11.824 15.5368L10.635 16.6858C10.513 16.8039 10.414 16.905 10.226 16.93C10.039 16.956 9.885 16.9 9.772 16.5897L8.902 13.7163L8.89 13.7243V13.7233Z" fill="currentColor"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_2_5936">
                                <rect width="24" height="24.0201" fill="currentColor" transform="translate(0 0.54248)"/>
                                </clipPath>
                                </defs>
                                </svg>
                            </a>
                            <a href="https://twitter.com/ElementDeFi" target="_blank" rel="noreferrer">
                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_2_5941)">
                                <path d="M15.3 6.0972C14.54 6.09707 13.8103 6.39557 13.2679 6.92846C12.7256 7.46135 12.4139 8.18604 12.4 8.94659L12.372 10.5229C12.3704 10.6075 12.3509 10.6909 12.3148 10.7674C12.2787 10.844 12.2269 10.9121 12.1627 10.9672C12.0985 11.0223 12.0233 11.0631 11.9422 11.0871C11.8611 11.1111 11.7758 11.1177 11.692 11.1064L10.131 10.8942C8.07702 10.614 6.10902 9.66719 4.22102 8.09287C3.62302 11.4056 4.79102 13.7006 7.60402 15.471L9.35102 16.57C9.43403 16.6222 9.50299 16.6939 9.55187 16.779C9.60075 16.864 9.62806 16.9598 9.63141 17.0579C9.63477 17.1559 9.61407 17.2533 9.57111 17.3415C9.52816 17.4297 9.46426 17.506 9.38502 17.5638L7.79302 18.7278C8.74002 18.7868 9.63902 18.7448 10.385 18.5967C15.103 17.6539 18.24 14.1009 18.24 8.23999C18.24 7.76159 17.228 6.0972 15.3 6.0972ZM10.4 8.90955C10.4175 7.9448 10.7189 7.00663 11.2666 6.21252C11.8142 5.41841 12.5838 4.80364 13.4789 4.44519C14.3741 4.08673 15.3549 4.00053 16.2988 4.19736C17.2426 4.39419 18.1074 4.86532 18.785 5.55174C19.496 5.54674 20.101 5.72689 21.454 4.9062C21.119 6.54758 20.954 7.26017 20.24 8.23999C20.24 15.8884 15.543 19.6075 10.777 20.5593C7.50902 21.2118 2.75702 20.14 1.39502 18.7168C2.08902 18.6627 4.90902 18.3595 6.53902 17.1655C5.16002 16.2557 -0.32898 13.023 3.27802 4.33172C4.97102 6.31038 6.68802 7.65751 8.42802 8.3721C9.58602 8.8475 9.87002 8.83749 10.401 8.91056L10.4 8.90955Z" fill="currentColor"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_2_5941">
                                <rect width="24" height="24.0201" fill="currentColor" transform="translate(0 0.54248)"/>
                                </clipPath>
                                </defs>
                                </svg>
                            </a>
                            <a href=" https://medium.com/@elementdefi" target="_blank" rel="noreferrer">
                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_2_5946)">
                                <path d="M4 3.54492H20C20.2652 3.54492 20.5196 3.65037 20.7071 3.83806C20.8946 4.02575 21 4.28032 21 4.54576V20.5592C21 20.8246 20.8946 21.0792 20.7071 21.2669C20.5196 21.4546 20.2652 21.56 20 21.56H4C3.73478 21.56 3.48043 21.4546 3.29289 21.2669C3.10536 21.0792 3 20.8246 3 20.5592V4.54576C3 4.28032 3.10536 4.02575 3.29289 3.83806C3.48043 3.65037 3.73478 3.54492 4 3.54492ZM5 5.5466V19.5583H19V5.5466H5ZM17.3 16.4958L18.255 17.4506V17.5006H13.334V17.4506L14.338 16.4958C14.438 16.3957 14.488 16.2956 14.488 16.1445V10.2145C14.488 9.96229 14.488 9.611 14.539 9.30975L11.225 17.6017H11.175L7.76 9.96229C7.71 9.76212 7.66 9.76213 7.61 9.66204V14.6862C7.559 15.0385 7.61 15.3398 7.76 15.642L9.116 17.4506V17.5006H5.5V17.4506L6.856 15.591C7.006 15.2908 7.056 14.9385 7.006 14.6362V9.10958C7.006 8.85837 6.956 8.55612 6.756 8.35595L5.851 7.0979V7.04785H9.366L12.278 13.5313L14.84 7.04785H18.255V7.0979L17.301 8.20382C17.201 8.3039 17.151 8.45503 17.151 8.55511V16.1945C17.151 16.2946 17.201 16.4457 17.301 16.4958H17.3Z" fill="currentColor"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_2_5946">
                                <rect width="24" height="24.0201" fill="currentColor" transform="translate(0 0.54248)"/>
                                </clipPath>
                                </defs>
                                </svg>
                            </a>
                            <a href="https://www.reddit.com/r/ElementFi/" target="_blank" rel="noreferrer">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.1028 7.81497L11.8538 4.27897C11.9084 4.02202 12.0132 3.77835 12.162 3.56189C12.3109 3.34542 12.5009 3.1604 12.7212 3.01739C12.9416 2.87438 13.188 2.77619 13.4463 2.72841C13.7046 2.68064 13.9698 2.68423 14.2268 2.73897L17.4228 3.41897C17.7174 3.09179 18.1117 2.87098 18.5447 2.79077C18.9776 2.71056 19.4248 2.77545 19.8171 2.97536C20.2094 3.17528 20.5247 3.49905 20.7143 3.89646C20.9038 4.29387 20.9568 4.7427 20.8652 5.17335C20.7737 5.604 20.5425 5.99239 20.2077 6.27829C19.8729 6.56418 19.453 6.7316 19.0134 6.75458C18.5737 6.77755 18.1387 6.6548 17.7759 6.40536C17.4131 6.15592 17.1427 5.79373 17.0068 5.37497L13.8108 4.69497L13.1448 7.82997C14.9288 7.96697 16.7018 8.55997 18.3078 9.52997C18.785 9.26462 19.3223 9.12614 19.8684 9.12776C20.4144 9.12938 20.9509 9.27105 21.4266 9.53923C21.9022 9.80741 22.3011 10.1931 22.5851 10.6595C22.8692 11.1259 23.0288 11.6573 23.0488 12.203V12.224C23.0564 12.7131 22.9516 13.1974 22.7423 13.6396C22.533 14.0817 22.2249 14.4698 21.8418 14.774C21.84 14.815 21.8373 14.856 21.8338 14.897C21.8338 18.895 17.3838 21.927 12.0348 21.927C6.70277 21.927 2.32677 18.903 2.32977 14.974C2.32541 14.9137 2.32207 14.8534 2.31977 14.793C1.67388 14.3082 1.23577 13.5966 1.09372 12.8016C0.951671 12.0066 1.11624 11.1873 1.55427 10.5088C1.9923 9.83032 2.67123 9.3431 3.45422 9.14532C4.23722 8.94754 5.06608 9.0539 5.77377 9.44297C7.38887 8.46961 9.21945 7.91038 11.1028 7.81497ZM20.3888 13.341C20.7968 13.138 21.0528 12.721 21.0498 12.266C21.0394 12.0372 20.9633 11.8162 20.8306 11.6295C20.6979 11.4428 20.5142 11.2983 20.3015 11.2133C20.0888 11.1283 19.8562 11.1063 19.6313 11.1501C19.4065 11.1938 19.199 11.3014 19.0338 11.46L18.4488 12.02L17.7788 11.565C16.1638 10.467 14.3268 9.83997 12.5488 9.80097H11.5428C9.66777 9.82997 7.89177 10.401 6.30577 11.476L5.64277 11.926L5.05877 11.376C4.93283 11.2578 4.7827 11.1683 4.61878 11.1139C4.45486 11.0594 4.28107 11.0412 4.10943 11.0606C3.93779 11.0799 3.7724 11.1364 3.62472 11.226C3.47705 11.3155 3.3506 11.4362 3.25415 11.5794C3.15769 11.7227 3.09353 11.8853 3.0661 12.0558C3.03868 12.2263 3.04864 12.4008 3.0953 12.5671C3.14197 12.7334 3.22422 12.8876 3.33636 13.019C3.4485 13.1503 3.58785 13.2558 3.74477 13.328L4.37777 13.618L4.32377 14.313C4.31077 14.483 4.31077 14.652 4.32677 14.897C4.32677 17.607 7.68277 19.927 12.0348 19.927C16.4058 19.927 19.8338 17.591 19.8368 14.821C19.8498 14.6519 19.8498 14.4821 19.8368 14.313L19.7848 13.641L20.3888 13.341ZM7.00077 13.5C7.00077 13.1021 7.1588 12.7206 7.44011 12.4393C7.72141 12.158 8.10294 12 8.50077 12C8.89859 12 9.28012 12.158 9.56143 12.4393C9.84273 12.7206 10.0008 13.1021 10.0008 13.5C10.0008 13.8978 9.84273 14.2793 9.56143 14.5606C9.28012 14.8419 8.89859 15 8.50077 15C8.10294 15 7.72141 14.8419 7.44011 14.5606C7.1588 14.2793 7.00077 13.8978 7.00077 13.5ZM14.0008 13.5C14.0008 13.1021 14.1588 12.7206 14.4401 12.4393C14.7214 12.158 15.1029 12 15.5008 12C15.8986 12 16.2801 12.158 16.5614 12.4393C16.8427 12.7206 17.0008 13.1021 17.0008 13.5C17.0008 13.8978 16.8427 14.2793 16.5614 14.5606C16.2801 14.8419 15.8986 15 15.5008 15C15.1029 15 14.7214 14.8419 14.4401 14.5606C14.1588 14.2793 14.0008 13.8978 14.0008 13.5ZM12.0168 18.603C10.6198 18.603 9.24977 18.233 8.13477 17.393C8.06741 17.3117 8.03282 17.2081 8.03776 17.1027C8.04271 16.9972 8.08682 16.8974 8.16149 16.8227C8.23615 16.748 8.33598 16.7039 8.44146 16.699C8.54693 16.694 8.65045 16.7286 8.73177 16.796C9.67677 17.489 10.8548 17.786 12.0008 17.786C13.1468 17.786 14.3308 17.511 15.2848 16.827C15.3399 16.7732 15.4083 16.7348 15.483 16.7158C15.5577 16.6968 15.6361 16.6977 15.7102 16.7186C15.7844 16.7395 15.8518 16.7795 15.9056 16.8347C15.9594 16.8899 15.9978 16.9583 16.0168 17.033C16.033 17.1078 16.0306 17.1855 16.0099 17.2593C15.9891 17.333 15.9506 17.4005 15.8978 17.456C15.2138 18.253 13.4138 18.603 12.0168 18.603Z" fill="currentColor"/>
                                </svg>
                            </a>
                            <a href="https://in.linkedin.com/company/boson-labs" target="_blank" rel="noreferrer">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.94141 5.00002C6.94114 5.53046 6.73017 6.03906 6.35491 6.41394C5.97965 6.78883 5.47084 6.99929 4.94041 6.99902C4.40997 6.99876 3.90137 6.78779 3.52649 6.41253C3.1516 6.03727 2.94114 5.52846 2.94141 4.99802C2.94167 4.46759 3.15264 3.95899 3.5279 3.5841C3.90316 3.20922 4.41197 2.99876 4.94241 2.99902C5.47284 2.99929 5.98144 3.21026 6.35633 3.58552C6.73121 3.96078 6.94167 4.46959 6.94141 5.00002ZM7.00141 8.48002H3.00141V21H7.00141V8.48002ZM13.3214 8.48002H9.34141V21H13.2814V14.43C13.2814 10.77 18.0514 10.43 18.0514 14.43V21H22.0014V13.07C22.0014 6.90002 14.9414 7.13002 13.2814 10.16L13.3214 8.48002Z" fill="currentColor"/>
                            </svg>
                            </a>
                            <a href="https://github.com/BosonLabs/" target="_blank" rel="noreferrer">
                            <svg fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" fill="currentColor"/></svg>
                            </a>
                            </div>
                        </Navbar.Collapse>
                    </Container>
                    </Navbar>
            </header>

            <Modal show={show} centered={true} onHide={handleClose}>
                <Modal.Body className='p-0'>
                    <Button className='modal-close' onClick={handleClose} variant='reset'>
                        <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g opacity="1">
                            <path d="M17.5004 32.0832C9.44597 32.0832 2.91699 25.5542 2.91699 17.4998C2.91699 9.44546 9.44597 2.9165 17.5004 2.9165C25.5548 2.9165 32.0837 9.44546 32.0837 17.4998C32.0837 25.5542 25.5548 32.0832 17.5004 32.0832ZM17.5004 29.1665C20.5946 29.1665 23.562 27.9373 25.75 25.7494C27.9379 23.5615 29.1671 20.594 29.1671 17.4998C29.1671 14.4056 27.9379 11.4382 25.75 9.25026C23.562 7.06233 20.5946 5.83317 17.5004 5.83317C14.4062 5.83317 11.4387 7.06233 9.25076 9.25026C7.06283 11.4382 5.83367 14.4056 5.83367 17.4998C5.83367 20.594 7.06283 23.5615 9.25076 25.7494C11.4387 27.9373 14.4062 29.1665 17.5004 29.1665ZM17.5004 15.4378L21.6245 11.3121L23.6881 13.3757L19.5625 17.4998L23.6881 21.624L21.6245 23.6875L17.5004 19.5619L13.3762 23.6875L11.3126 21.624L15.4383 17.4998L11.3126 13.3757L13.3762 11.3121L17.5004 15.4378Z" fill="white"/>
                            </g>
                        </svg>
                    </Button>
                    <h5>Connect a wallet</h5>

                    <div className="py-4 connect-links">
                        <Link className="d-flex align-items-center text-white h4" to="/"><img src={PeraWalletLogo} className="me-3" alt="icon 1" /> <span className="text-underline">Pera Wallet</span></Link>
                        <Link className="d-flex align-items-center text-white h4" to="/"><img src={MyAlgoLogo} className="me-3" alt="icon 1" /> <span className="text-underline">My Algo Wallet</span></Link>
                        <Link className="d-flex align-items-center text-white h4" to="/"><img src={AlgoSigner} className="me-3" alt="icon 1" /> <span className="text-underline">Install AlgoSigner</span></Link>
                    </div>


                    <p>New to Element? <br /><Link to="/"><strong className='text-underline'>Learn more about wallets</strong></Link></p>

                </Modal.Body>
            </Modal>
        </>
    );
}

export default Header;