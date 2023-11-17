import { Button, Col, Container, OverlayTrigger, Row, Table, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import LogoImage from "../../../assets/images/cbdc/login-image.png";
import Layout from "../LayoutT";
import SearchBar from "./snippets/SearchBar";
import React,{ useState,useRef ,useEffect} from "react";
// const axios = require("axios").default;
import axios from 'axios';
const BigNumber = require("bignumber.js");
const Web3 = require("web3");
// const fs = require("fs");
const BASE_URL = "https://bnbtest.stasisonline.in:4000/api";
function TransationsPage() {

    const[blockdetails,setBlockdetails]= useState([]);
    const[blockdata,setBlockdata]= useState([]);
    const[pageBESize,setPageBESize]=useState(2);   
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
    
        // console.log("Miners "+ miners);
        // console.log("validatorMap Map" + validatorMap);
        
        // console.log("11111 ==== txHashList : ", txHashList);
        console.log("txList : ", txList);
        // console.log("blockArray : ", blockArray);
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
                // timestamp:datavar[m].timestamp


               //   smartContractAddress:datavar[m].smartContractAddress,
              // tokenName:datavar[m].tokenName,
              // depositTokenAddress:datavar[m].depositTokenAddress,
            })
          
                      
          })   
        //   r.reverse();
          setBlockdata(r);    
        //   console.log("blackdata",blockdata);




        // console.log("Latest Block : ", ltsBlock);
        // console.log("Block Details =>", blockDetails);
      
    //     for(var num=0; num<txList.length;num++){
    //       var tempTxHash = txList[num];
    
    //       console.log("Tx from Array List"+tempTxHash);
        
    //     const allTx = (
    //       await Promise.allSettled(
    //         blockDetails.transactions.map(
    //           async (tempTxHash) => await getTxDetails(tempTxHash)
    //         )
    //       )
    //     )
    //       .filter((data) => data.status === "fulfilled")
    //       .map((val) => val.value);
      
    //     console.log("trans.txt", JSON.stringify(allTx));
    //   }
    }
    return ( 
        <Layout>
            <div className="cbdc-dashboard">
          <Container>
            <div className="py-4">
                <Row className="align-items-center">
                    <Col md={8} className="mb-md-0 mb-4 order-md-1">
                        <SearchBar />
                    </Col>
                    <Col md={4} className="text-md-start text-center">
                        <h1 className="page-title m-0">Validators</h1>
                    </Col>
                </Row>
            </div>

            <div className="cbdc-card base-bg mb-4">
                <Row>
                    <Col md={6} lg={2} className="mb-lg-0 mb-4 border-md-right">
                        <h6 className="sub-heading mb-1">
                            Validators
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
                        <h2 className="mb-0 base-green">2,096</h2>
                        <p className="sub-heading">
                            Superminority: <strong className="base-green">31</strong>
                            <OverlayTrigger
                                key="right"
                                placement="right"
                                overlay={
                                    <Tooltip id={`tooltip-right`}>
                                        This number represents the smallest number of validators that together control more than 33% of the total stake. These entities could theoretically censor/halt the network if they colluded.
                                    </Tooltip>
                                }
                            >
                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="currentColor" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="currentColor"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="currentColor"></path></svg>
                            </OverlayTrigger>
                        </p>
                    </Col>
                    <Col md={6} lg={3} className="mb-lg-0 mb-4 border-md-right ps-md-4">
                        <h6 className="sub-heading mb-1">
                            Weighted Skip Rate
                            <OverlayTrigger
                                key="right"
                                placement="right"
                                overlay={
                                    <Tooltip id={`tooltip-right`}>
                                        If a validator fails to produce an entry during their assigned time window, this is considered a skip. The skip rate refers to the share of assigned leader slots that have not been fulfilled by the respective validator. The weighted skip rate takes the validators's stake into account.
                                    </Tooltip>
                                }
                            >
                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="currentColor" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="currentColor"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="currentColor"></path></svg>
                            </OverlayTrigger>
                        </h6>
                        <h2 className="mb-0 base-green">3.8<span style={{opacity: '.4'}}>%</span></h2>
                        <p className="sub-heading">
                            Non-weighted: <strong className="base-green">5.6%</strong>
                        </p>
                    </Col>
                    <Col md={6} lg={3} className="border-md-right ps-md-4">
                        <h6 className="sub-heading mb-1">
                            Nominal Staking APY
                            <OverlayTrigger
                                key="right"
                                placement="right"
                                overlay={
                                    <Tooltip id={`tooltip-right`}>
                                        This is the Annual Percentage Yield earned by staking BNB. It is based on the network's performance i.t.o. actual slot times during the past 24 hours. lease note that this value does not take validator commission fees into account.
                                    </Tooltip>
                                }
                            >
                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="currentColor" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="currentColor"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="currentColor"></path></svg>
                            </OverlayTrigger>
                        </h6>
                        <h2 className="mb-0 base-green">7.19<span style={{opacity: '.4'}}>%</span></h2>
                    </Col>
                    <Col md={6} lg={4} className="ps-md-4">
                        <h6 className="sub-heading mb-1">
                            Node Versions
                            <OverlayTrigger
                                key="right"
                                placement="right"
                                overlay={
                                    <Tooltip id={`tooltip-right`}>
                                        Distribution of node software versions run by the validators on Mainnet Beta.
                                    </Tooltip>
                                }
                            >
                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="currentColor" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="currentColor"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="currentColor"></path></svg>
                            </OverlayTrigger>
                        </h6>
                        <h4 className="mb-0 base-green">1.13.3 <small>(89.4%)</small></h4>
                        <p><small>1.13.2(3.9%) <br />1.10.41(2.8%) <br />1.10.40(2.5%) <br />others(1.3%)</small></p>
                    </Col>
                </Row>
            </div>

            <div className="cbdc-card cbdc-card-table base-bg px-0 py-2">
                <Table striped hover size="md" className="validators" responsive>
                    <thead>
                        <tr>
                            {/* <th width="55">#</th> */}
                            <th>VALIDATOR</th>
                            <th>Hash</th>
                            {/* <th width="80">
                                STAKE
                                <OverlayTrigger
                                    key="right"
                                    placement="right"
                                    overlay={
                                        <Tooltip id={`tooltip-right`}>
                                            The first number displayed shows the amount of BNB that is staked with the respective validator. The percentage indicates how much this stake accounts for w.r.t. the total amount of Staked BNB across the network. The number in brackets shows the number of delegators.
                                        </Tooltip>
                                    }
                                >
                                    <svg className="tooltip-icon ms-2" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                    </svg>
                                </OverlayTrigger>
                            </th>
                            <th width="160">
                                CUMULATIVE STAKE
                                <OverlayTrigger
                                    key="right"
                                    placement="right"
                                    overlay={
                                        <Tooltip id={`tooltip-right`}>
                                            This number indicates the share of staked BNB that this and all preceding validators account for. Validators or groups of validators that together control more than 33,33% of stake could theoretically halt the network.
                                        </Tooltip>
                                    }
                                >
                                    <svg className="tooltip-icon ms-2" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                    </svg>
                                </OverlayTrigger>
                            </th>
                            <th width="100">COMMISSION</th>
                            <th width="150" className="text-center">LAST VOTE</th> */}
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
                                        {/* <td>{x.txs}</td> 
                                         <td> {parseInt(new Date()/1000) -x.timestamp}s ago</td>  */}
                                        </tr>
                                    )
                                    })
                                    }
                                    
                                   
                        {/* <tr>
                            <td>
                                22
                            </td>
                            <td>
                                <div className="d-flex">
                                    <div className="img">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-question-circle" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                            <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <Link to="/">GvZE...me1e</Link>
                                        <small className="d-block">1.13.3</small>
                                    </div>
                                </div>
                            </td>
                            <td>
                                2,981,926 (7177) <br />0.73%
                            </td>
                            <td className="py-0">
                                <div className="d-flex align-items-center">
                                    <div className="bar-lines d-flex">
                                        <div style={{background: 'rgb(105, 245, 225)', opacity: '0.2', width: '0', minWidth: '1px'}}></div>
                                        <div style={{background: 'rgb(105, 245, 225)', opacity: '0.9', width: '34.0119%',  minWidth: '1px'}}></div>
                                    </div>
                                    <div className="bar-value">34.0%</div>
                                </div>
                            </td>
                            <td className="text-end">0%</td>
                            <td className="text-center">156,2784<span className="base-text-success">79</span></td>
                        </tr>
                        <tr>
                            <td>
                                22
                            </td>
                            <td>
                                <div className="d-flex">
                                    <div className="img">
                                        <img src={LogoImage} alt="logo image" />
                                    </div>
                                    <div>
                                        <Link to="/">GvZE...me1e</Link>
                                        <small className="d-block">1.13.3</small>
                                    </div>
                                </div>
                            </td>
                            <td>
                                2,981,926 (7177) <br />0.73%
                            </td>
                            <td className="py-0">
                                <div className="d-flex align-items-center">
                                    <div className="bar-lines d-flex">
                                        <div style={{background: 'rgb(105, 245, 225)', opacity: '0.2', width: '34.0119%', minWidth: '1px'}}></div>
                                        <div style={{background: 'rgb(105, 245, 225)', opacity: '0.9', width: '0',  minWidth: '1px'}}></div>
                                    </div>
                                    <div className="bar-value">34.0%</div>
                                </div>
                            </td>
                            <td className="text-end">100%</td>
                            <td className="text-center">156,2784<span className="base-text-success">79</span></td>
                        </tr>
                        <tr>
                            <td>
                                22
                            </td>
                            <td>
                                <div className="d-flex">
                                    <div className="img">
                                        <img src={LogoImage} alt="logo image" />
                                    </div>
                                    <div>
                                        <Link to="/">GvZE...me1e</Link>
                                        <small className="d-block">1.13.3</small>
                                    </div>
                                </div>
                            </td>
                            <td>
                                2,981,926 (7177) <br />0.73%
                            </td>
                            <td className="py-0">
                                <div className="d-flex align-items-center">
                                    <div className="bar-lines d-flex">
                                        <div style={{background: 'rgba(208, 71, 60, 0.75)', opacity: '0.2', width: '34.0119%', minWidth: '1px'}}></div>
                                        <div style={{background: 'rgb(249, 81, 62)', opacity: '0.9', width: '0',  minWidth: '1px'}}></div>
                                    </div>
                                    <div className="bar-value">34.0%</div>
                                </div>
                            </td>
                            <td className="text-end">100%</td>
                            <td className="text-center">
                                <small className="base-text-red d-block">Offline For:</small>
                                <small className="d-flex base-text-red w-100 justify-content-between align-items-center">
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2h-7zm3 6.35c0 .701-.478 1.236-1.011 1.492A3.5 3.5 0 0 0 4.5 13s.866-1.299 3-1.48V8.35zm1 0v3.17c2.134.181 3 1.48 3 1.48a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351z"/>
                                        </svg> 26m</div>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5 8.186 1.113zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z"/>
                                        </svg> 2,941</div>
                                </small>
                            </td>
                        </tr> */}
                    </tbody>
                </Table>

                {/* <div className="pt-2 text-center">
                    <Button variant="load-more">Load More</Button>
                </div> */}
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

export default TransationsPage;