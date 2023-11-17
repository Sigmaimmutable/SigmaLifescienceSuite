import { Col, Container, OverlayTrigger, ProgressBar, Row, Tab, Table, Tabs, Tooltip ,Button} from "react-bootstrap";
import { Link } from "react-router-dom";
import Layout from "../LayoutT";
import SearchBar from "./snippets/SearchBar";
import LogoImage from "../../../assets/images/cbdc/login-image.png";
import Doted from "../../../assets/images/cbdc/doted.png";
import BarChart from "./snippets/BarChart";
import PriceChart from "./snippets/PriceChart";
import VolumeChart from "./snippets/VolumeChart";
import React,{ useState,useRef ,useEffect} from "react";
import {Validators,CurrentSlotTime} from "./Nodestatus.json"
// const axios = require("axios").default;
import axios from 'axios';
const BigNumber = require("bignumber.js");
const Web3 = require("web3");
// const fs = require("fs");
const BASE_URL = "https://bnbtest.stasisonline.in:4000/api";
function NodePage() {
    const[blockdetails,setBlockdetails]= useState([]);
    const[blockdata,setBlockdata]= useState([]);
    const[pageBESize,setPageBESize]=useState(2); 
    const[txslength,setlengthofTXs]=useState(); 
    const decrementBlockSize=()=>{
        if(pageBESize >= 4){
        setPageBESize(pageBESize-2)
        }        
      }
    var web3 = new Web3(
        new Web3.providers.HttpProvider("https://bnbtest.stasisonline.in:8545")
      );
      const getLatestBlock = async() => {
        const { data } = await axios.get(
          `${BASE_URL}?module=block&action=eth_block_number`
        );
        return new BigNumber(data.result).toString();
      }
      
      const getBlockDetails = async(blockWithTx) => {
        return web3.eth.getBlock(blockWithTx);
      }
      
      const getTxDetails = async(txHash) => {
          let fetData = `${BASE_URL}?module=transaction&action=gettxinfo&txhash=${txHash}`
          const res = await fetch(fetData);
          const data = res.json();
        return data;
      }
      

      useEffect(()=>{getDetails()},[])
      const getDetails = async () =>{
        const ltsBlock = await getLatestBlock();
        console.log("Blockdata",ltsBlock);
        const blockWithTx = 10;
        //const blockDetails = await getBlockDetails(blockWithTx);
        var  blockDetails;
        var txHashList = [];
        var blockArray = [];
        var txList = [];
        var miners = [];
        
        const validatorMap = new Map();
        for(var num=0; num<10;num++){
          var blockNumerToPrint = ltsBlock - num;
          blockDetails = await getBlockDetails(blockNumerToPrint);
        //  blockDetails = await getBlockDetails(num);
        setBlockdetails(blockDetails.hash);
        // console.log("block hash = "+blockdetails); 
        //   console.log("blockNumerToPrint = "+blockNumerToPrint);
        //   console.log("block hash = "+blockDetails.hash); 
          txHashList.push(blockDetails.hash);
          
          var minerObject = {};
          minerObject ["miner"] = blockDetails.miner;
          minerObject ["hash"] = blockDetails.hash;
          minerObject ["timestamp"] = blockDetails.timestamp;
          miners.push(minerObject);
          validatorMap.set(blockDetails.miner, minerObject);
    
          var item = {};
            item ["miner"] =blockDetails.miner;
            item ["hash"] =blockDetails.hash;
            item ["size"] =blockDetails.size;
            item ["timestamp"] =blockDetails.timestamp;
            item ["gasUsed"] =blockDetails.gasUsed;
            item ["nonce"] =blockDetails.nonce; 
           
            var tempTransactions = [];
            tempTransactions = blockDetails.transactions;
            for(var arraySize = 0; arraySize<tempTransactions.length; arraySize ++){
              txList.push(tempTransactions[arraySize]);
            }    
            item ["txs"] =tempTransactions.length; 
            blockArray.push(item);    
        }  
    
        setlengthofTXs(txList.length);
        console.log("txListlen : ", txList.length);

   
        let datavar=miners;
        console.log("datavarvalidators",datavar)
        let countlist=0;
        let r=[];
        Object.keys(datavar).map((m)=>{
            console.log("datascheck",datavar[m]);
           
          countlist=countlist + 1;
          
            r.push({
                hash:datavar[m].hash,
                miner:datavar[m].miner,
                // txs:datavar[m].txs,
               timestamp:datavar[m].timestamp


               //   smartContractAddress:datavar[m].smartContractAddress,
              // tokenName:datavar[m].tokenName,
              // depositTokenAddress:datavar[m].depositTokenAddress,
            })
          
                      
          })   
        //   r.reverse();
          setBlockdata(r);    
        //   console.log("blackdata",blockdata);




    
    }
    return ( 
        <Layout>
        <div className="cbdc-dashboard">
          <Container>
            <div className="py-4">
                <SearchBar />
            </div>

            <div className="cbdc-card base-bg mb-4">
                <Row>
                    <Col md={3} className="border-md-right">
                        <h6 className="sub-heading mb-1">Slot Height</h6>
                        <h2 className="mb-0 base-green">156,038,228</h2>
                    </Col>
                    <Col md={3} className="mx-auto border-md-right">
                        <h6 className="sub-heading mb-1">
                            Current Slot Time
                                <OverlayTrigger
                                    key="right"
                                    placement="right"
                                    overlay={
                                        <Tooltip id={`tooltip-right`}>
                                            Based on the past one hour of network activity, this is the average amount of time that it took the leading validator to successfully ingest transactions and to produce a block.
                                        </Tooltip>
                                    }
                                >
                                    <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="currentColor" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="currentColor"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="currentColor"></path></svg>
                                </OverlayTrigger>
                        </h6>
                        <h2 className="mb-0 base-green">{CurrentSlotTime}</h2>
                    </Col>
                    <Col md={5}>
                        <h6 className="sub-heading mb-1">    
                            Epoch
                            <OverlayTrigger
                                key="right"
                                placement="right"
                                overlay={
                                    <Tooltip id={`tooltip-right`}>
                                        Epoch Info <br />Estimated epoch completion date: 20th of October, 2022 7:33pm <br />Epoch start date: 18 of Oct, 2022 11:11am
                                    </Tooltip>
                                }
                            >
                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="currentColor" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="currentColor"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="currentColor"></path></svg>
                            </OverlayTrigger>
                        </h6>
                        <div className="d-flex">
                            <h2 className="mb-0 base-green">361</h2>
                            <div className="px-2 flex-grow-1">
                                <div className="d-flex base-green align-items-center justify-content-between">
                                    <small>20%</small>
                                    <small><strong>ETA 1d 21h</strong></small>
                                </div>
                                <ProgressBar now={20} />
                            </div>
                            <h2 className="mb-0 base-text-dark">362</h2>
                        </div>
                    </Col>
                </Row>
            </div>

            <div className="cbdc-card base-bg p-4 mb-4">
                <h6><strong className="base-green">{Validators}</strong> Validators
                    <OverlayTrigger
                        key="right"
                        placement="right"
                        overlay={
                            <Tooltip id={`tooltip-right`}>
                                This is the number of active validators based on the networks activity in the past 24h
                            </Tooltip>
                        }
                    >
                        <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="currentColor" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="currentColor"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="currentColor"></path></svg>
                    </OverlayTrigger>
                </h6>
                <h6><strong className="base-green">1484</strong> RPC Nodes</h6>


                <img src={Doted} alt="doted" className="doted" />


                <div className="pt-5 mt-5 mb-5">
                    <h6 className="sub-heading">Current Leader</h6>
                    <div className="d-flex align-items-center">
                        <div className="find me-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-question-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
                            </svg>
                        </div>

                        <div>
                            <h4 className="mb-2 base-white">7cpD...ER46</h4>
                            <div className="progress progress-group d-flex">
                                <div className="progress-cell active"></div>
                                <div className="progress-cell active"></div>
                                <div className="progress-cell active"></div>
                                <div className="progress-cell"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-3">
                    <h6 className="sub-heading">Next Leaders</h6>
                    <div className="d-flex align-items-center">
                        <div className="find find-sm me-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-question-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
                            </svg>
                        </div>
                        <div className="find find-sm me-3">
                            <img src={LogoImage} alt="logo image" />
                        </div>
                        <div className="find find-sm me-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-question-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
                            </svg>
                        </div>
                        <div className="find find-sm me-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-question-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
                            </svg>
                        </div>
                        <div className="find find-sm me-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-question-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <div className="cbdc-card base-bg mb-4">
                <Row className="justify-content-between">
                    <Col md={4} className="border-md-right mb-md-0 mb-3">
                        {/* <div className="mt-md-3 mb-4">
                            <h6 className="sub-heading mb-1">Current TPS</h6>
                            <h2 className="mb-0 base-green">4,317</h2>
                        </div> */}

                        <h6 className="sub-heading mb-1">Total transactions of LatestBlock</h6>
                        <h2 className="mb-0 base-green">{txslength}</h2>
                    </Col>

                    <Col md={8} className="ps-lg-5">
                        <h6 className="sub-heading">Instruction Breakdown- 3.00 min AVG
                            <OverlayTrigger
                                key="right"
                                placement="right"
                                overlay={
                                    <Tooltip id={`tooltip-right`}>
                                        Each bar represents 3 minutes of activity on the Solana network. Certain instructions are mapped to certain programs. The chart shows what applications are used the most.
                                    </Tooltip>
                                }
                            >
                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="currentColor" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="currentColor"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="currentColor"></path></svg>
                            </OverlayTrigger>
                        </h6>
                            
                        <div className="base-bg-dark rounded-12">
                            <BarChart />
                        </div>
                    </Col>
                </Row>
            </div>

            <div className="cbdc-card base-bg mb-4">
                <Row className="justify-content-between">
                    <Col md={4} className="border-md-right mb-md-0 mb-3">
                        <div className="mt-md-3 mb-4">
                            <h6 className="sub-heading mb-1">Circulating Supply</h6>
                            <h2 className="mb-0 base-green"><span className="font-weight-normal" style={{opacity: '.4'}}>◎</span>358.1<span className="font-weight-normal" style={{opacity: '.4'}}>M</span></h2>
                            <p><small>of 531.4M:<strong className="base-green">67.4%</strong></small></p>
                        </div>

                        <h6 className="sub-heading mb-1">
                            Active Stake

                        </h6>
                        <h2 className="mb-0 base-green"><span className="font-weight-normal" style={{opacity: '.4'}}>◎</span>408.9<span className="font-weight-normal" style={{opacity: '.4'}}>M</span></h2>
                        <p><small>of 531.4M:<strong className="base-green">76.9%</strong></small></p>
                    </Col>

                    <Col md={8} className="ps-lg-5">
                        <h6 className="sub-heading">ELEM Price</h6>

                        <Row className="align-items-center mb-3">
                            <Col md={6}>
                                <h2 className="mb-0 d-flex align-items-center base-green"><span className="font-weight-normal" style={{opacity: '.4'}}>$</span>29.90<span className="font-weight-normal h6 ms-3 text-danger">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi me-2 bi-caret-down-fill" viewBox="0 0 16 16">
                                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                                    </svg>
                                    -2.6%
                                </span></h2>
                            </Col>
                            <Col md={6} className="text-md-end">
                                <h6 className="sub-heading mb-1">24H Volume ($) <span className="base-green h4">708.0m</span></h6>
                                <h6 className="sub-heading mb-1">Market Cap in USD (fully diluted) <span className="base-green h4">15.9B</span></h6>
                            </Col>
                        </Row>
                            
                        <Tabs
                        defaultActiveKey="price"
                        id="uncontrolled-tab-example"
                        className="dashboard-tabs"
                        >
                            <Tab eventKey="price" title="Price">
                                <div className="base-bg-dark rounded-12">
                                    <PriceChart />
                                </div>
                            </Tab>
                            <Tab eventKey="volume" title="Volume">
                                <div className="base-bg-dark rounded-12">
                                    <VolumeChart />
                                </div>
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            </div>

            <div className="cbdc-card base-bg mb-4">
                <h4>Recent Transactions</h4>

                <Table striped hover size="md" responsive>
                    <thead>
                        <tr>
                            <th>TX HASH</th>
                            {/* <th>
                                INSTRUCTIONS
                                <OverlayTrigger
                                    key="right"
                                    placement="right"
                                    overlay={
                                        <Tooltip id={`tooltip-right`}>
                                            Instructions are the smallest unit of a program that clients can include in a transaction. They are
                                            executed sequentially and atomically for each transaction, which can contain numerous instructions.
                                        </Tooltip>
                                    }
                                >
                                    <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="currentColor" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="currentColor"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="currentColor"></path></svg>
                                </OverlayTrigger>
                            </th> */}
                            <th>Validators</th>
                            <th>TIME</th>
                        </tr>
                    </thead>
                    <tbody>


                    {blockdata.map((x,y)=>{
                                    return(
                                        <tr>
                                        {/* <td className="text-center">{y+1}</td> */}
                                        {/* <td>  {(x.hash).substring(0, 12)}...{(x.hash).substring((x.hash).length -4, (x.hash).length)}</td> */}

                                        {/* <td>{x.hash}</td> */}
                                        {/* <td>  {(x.miner).substring(0, 12)}...{(x.miner).substring((x.miner).length -4, (x.miner).length)}</td> */}

                                         <td>{x.miner}</td>  
                                         <td>{x.hash}</td> 
                                         {/* <td>{x.timestamp}</td>  */}
                                   
                                         <td> {parseInt(new Date()/1000) -x.timestamp}s ago</td> 
                                        </tr>
                                    )
                                    })
                                    }



                        {/* <tr>
                            <td>
                                <div className="d-flex">
                                    <span className="me-2 curser-ponter" onClick={() => {navigator.clipboard.writeText('3cxv...qvTY')}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-files" viewBox="0 0 16 16">
                                            <path d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z"/>
                                        </svg>
                                    </span>
                                    <Link to="/">3cxv...qvTY</Link>
                                </div>
                            </td>
                            <td>Unknown</td>
                            <td><Link to="/">156064716</Link></td>
                            <td>24s ago</td>
                        </tr>
                        <tr>
                            <td>
                                <div className="d-flex">
                                    <span className="me-2 curser-ponter" onClick={() => {navigator.clipboard.writeText('3cxv...qvTY')}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-files" viewBox="0 0 16 16">
                                            <path d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z"/>
                                        </svg>
                                    </span>
                                    <Link to="/">3cxv...qvTY</Link>
                                </div>
                            </td>
                            <td>Unknown
                                <OverlayTrigger
                                    key="right"
                                    placement="right"
                                    overlay={
                                        <Tooltip id={`tooltip-right`}>
                                            Unknown, Unknown, Unknown, Unknown
                                        </Tooltip>
                                    }
                                >
                                    <span className="ms-2 badge border">+3</span>
                                </OverlayTrigger>
                            </td>
                            <td><Link to="/">156064716</Link></td>
                            <td>24s ago</td>
                        </tr>
                        <tr>
                            <td>
                                <div className="d-flex">
                                    <span className="me-2 curser-ponter" onClick={() => {navigator.clipboard.writeText('3cxv...qvTY')}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-files" viewBox="0 0 16 16">
                                            <path d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z"/>
                                        </svg>
                                    </span>
                                    <Link to="/">3cxv...qvTY</Link>
                                </div>
                            </td>
                            <td>Unknown</td>
                            <td><Link to="/">156064716</Link></td>
                            <td>24s ago</td>
                        </tr>
                        <tr>
                            <td>
                                <div className="d-flex">
                                    <span className="me-2 curser-ponter" onClick={() => {navigator.clipboard.writeText('3cxv...qvTY')}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-files" viewBox="0 0 16 16">
                                            <path d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z"/>
                                        </svg>
                                    </span>
                                    <Link to="/">3cxv...qvTY</Link>
                                </div>
                            </td>
                            <td>Unknown
                                <OverlayTrigger
                                    key="right"
                                    placement="right"
                                    overlay={
                                        <Tooltip id={`tooltip-right`}>
                                            Unknown, Unknown, Unknown, Unknown
                                        </Tooltip>
                                    }
                                >
                                    <span className="ms-2 badge border">+3</span>
                                </OverlayTrigger>
                            </td>
                            <td><Link to="/">156064716</Link></td>
                            <td>24s ago</td>
                        </tr>
                        <tr>
                            <td>
                                <div className="d-flex">
                                    <span className="me-2 curser-ponter" onClick={() => {navigator.clipboard.writeText('3cxv...qvTY')}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-files" viewBox="0 0 16 16">
                                            <path d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z"/>
                                        </svg>
                                    </span>
                                    <Link to="/">3cxv...qvTY</Link>
                                </div>
                            </td>
                            <td>Unknown</td>
                            <td><Link to="/">156064716</Link></td>
                            <td>24s ago</td>
                        </tr>
                        <tr>
                            <td>
                                <div className="d-flex">
                                    <span className="me-2 curser-ponter" onClick={() => {navigator.clipboard.writeText('3cxv...qvTY')}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-files" viewBox="0 0 16 16">
                                            <path d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z"/>
                                        </svg>
                                    </span>
                                    <Link to="/">3cxv...qvTY</Link>
                                </div>
                            </td>
                            <td>Unknown
                                <OverlayTrigger
                                    key="right"
                                    placement="right"
                                    overlay={
                                        <Tooltip id={`tooltip-right`}>
                                            Unknown, Unknown, Unknown, Unknown
                                        </Tooltip>
                                    }
                                >
                                    <span className="ms-2 badge border">+3</span>
                                </OverlayTrigger>
                            </td>
                            <td><Link to="/">156064716</Link></td>
                            <td>24s ago</td>
                        </tr> */}
                    </tbody>
                </Table>
            </div>

            {blockdata <= 2 ? (
                                <></>
                            ):(
                                <div className='pagination justify-content-end d-flex align-items-center'>                                
                                <Button variant='page' onClick={()=>{decrementBlockSize()}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#fff" class="bi m-0 bi-chevron-left" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                                    </svg>
                                </Button>
                                <Button variant='page' onClick={()=>{setPageBESize(pageBESize+2)}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#fff" class="bi m-0 bi-chevron-right" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                                </Button>
                            </div>
                      )}
          </Container>
        </div>
        </Layout>
     );
}

export default NodePage;