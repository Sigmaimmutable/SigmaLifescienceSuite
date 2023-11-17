import { Col, Container, OverlayTrigger, Row, Table, Tooltip,Button} from "react-bootstrap";
import { Link } from "react-router-dom";
import Layout from "../LayoutT";
import SearchBar from "./snippets/SearchBar";
import BarChart from "./snippets/BarChart";
import axios from 'axios';
import React,{ useState,useRef ,useEffect} from "react";
import {Ploygondeploydataget } from "../../../API/ApiFunctions";

// const axios = require("axios").default;
const BigNumber = require("bignumber.js");
const Web3 = require("web3");

// const fs = require("fs");
const BASE_URL = "https://bnbtest.stasisonline.in:4000/api";
// const BASE_URL = "http://18.118.195.235:4000/api";
function BlocksPage() {

    const[blockdetails,setBlockdetails]= useState([]);
    const[blockdata,setBlockdata]= useState([]);
    const[pageBESize,setPageBESize]=useState(2);  
    const[polygonblockfetch,setPolygonBlockfetch]= useState([]);
    const[timestampcheck,settimestamp]= useState([]);
 
    const decrementBlockSize=()=>{
        if(pageBESize >= 4){
        setPageBESize(pageBESize-2)
        }        
      }
    // var web3 = new Web3(
    //     new Web3.providers.HttpProvider("https://bnbtest.stasisonline.in:8545")
    //   );
    //   const getLatestBlock = async() => {
    //     const { data } = await axios.get(
    //       `${BASE_URL}?module=block&action=eth_block_number`
    //     );
    //     return new BigNumber(data.result).toString();
    //   }
      
    //   const getBlockDetails = async(blockWithTx) => {
    //     return web3.eth.getBlock(blockWithTx);
    //   }
      
    //   const getTxDetails = async(txHash) => {
    //       let fetData = `${BASE_URL}?module=transaction&action=gettxinfo&txhash=${txHash}`
    //       const res = await fetch(fetData);
    //       const data = res.json();
    //     return data;
    //   }
      

    //   useEffect(()=>{getDetails()},[])
    //   const getDetails = async () =>{
    //     const ltsBlock = await getLatestBlock();
    //     console.log("Blockdata",ltsBlock);
    //     const blockWithTx = 10;
    //     //const blockDetails = await getBlockDetails(blockWithTx);
    //     var  blockDetails;
    //     var txHashList = [];
    //     var blockArray = [];
    //     var txList = [];
    //     var miners = [];
        
    //     const validatorMap = new Map();
    //     for(var num=0; num<10;num++){
    //       var blockNumerToPrint = ltsBlock - num;
    //       blockDetails = await getBlockDetails(blockNumerToPrint);
    //     //  blockDetails = await getBlockDetails(num);
    //     setBlockdetails(blockDetails.hash);
    //     // console.log("block hash = "+blockdetails); 
    //     //   console.log("blockNumerToPrint = "+blockNumerToPrint);
    //     //   console.log("block hash = "+blockDetails.hash); 
    //       txHashList.push(blockDetails.hash);
          
    //       var minerObject = {};
    //       minerObject ["miner"] = blockDetails.miner;
    //       minerObject ["hash"] = blockDetails.hash;
    //       miners.push(minerObject);
    //       validatorMap.set(blockDetails.miner, minerObject);
    
    //       var item = {};
    //         item ["miner"] =blockDetails.miner;
    //         item ["hash"] =blockDetails.hash;
    //         item ["size"] =blockDetails.size;
    //         item ["timestamp"] =blockDetails.timestamp;
    //         item ["gasUsed"] =blockDetails.gasUsed;
    //         item ["nonce"] =blockDetails.nonce; 
           
    //         var tempTransactions = [];
    //         tempTransactions = blockDetails.transactions;
    //         for(var arraySize = 0; arraySize<tempTransactions.length; arraySize ++){
    //           txList.push(tempTransactions[arraySize]);
    //         }    
    //         item ["txs"] =tempTransactions.length; 
    //         blockArray.push(item);    
    //     }  
    
    //     // console.log("Miners "+ miners);
    //     // console.log("validatorMap Map" + validatorMap);
        
    //     // console.log("11111 ==== txHashList : ", txHashList);
    //     // console.log("txList : ", txList);
    //     // console.log("blockArray : ", blockArray);
    //     let datavar=blockArray;
    //     console.log("datavarcheckB",datavar)
    //     let countlist=0;
    //     let r=[];
    //     Object.keys(datavar).map((m)=>{
    //         console.log("datascheck",datavar[m]);
           
    //       countlist=countlist + 1;
          
    //         r.push({
    //             hash:datavar[m].hash,
    //             miner:datavar[m].miner,
    //             txs:datavar[m].txs,
    //             timestamp:datavar[m].timestamp


    //            //   smartContractAddress:datavar[m].smartContractAddress,
    //           // tokenName:datavar[m].tokenName,
    //           // depositTokenAddress:datavar[m].depositTokenAddress,
    //         })
          
                      
    //       })   
    //     //   r.reverse();
    //       setBlockdata(r);    
    //       console.log("blackdata",blockdata);




    //     // console.log("Latest Block : ", ltsBlock);
    //     // console.log("Block Details =>", blockDetails);
      
    // //     for(var num=0; num<txList.length;num++){
    // //       var tempTxHash = txList[num];
    
    // //       console.log("Tx from Array List"+tempTxHash);
        
    // //     const allTx = (
    // //       await Promise.allSettled(
    // //         blockDetails.transactions.map(
    // //           async (tempTxHash) => await getTxDetails(tempTxHash)
    // //         )
    // //       )
    // //     )
    // //       .filter((data) => data.status === "fulfilled")
    // //       .map((val) => val.value);
      
    // //     console.log("trans.txt", JSON.stringify(allTx));
    // //   }
    // }



    // useEffect(()=>{BlockdetailsFetch()},[])

// const BlockdetailsFetch=async()=>{            
//   if(blockdetails  === null || blockdetails  === "" || blockdetails  === " " || blockdetails === undefined || blockdetails === ''){
//   }
//   else{
//     let r=[];
//     let countlist=0;
// try {          
//     let data = await getLatestBlock();
//     let  blockDetails;
//     let  blockArray = [];
//     var item = {};
//     item ["miner"] =blockDetails.miner;
//     item ["hash"] =blockDetails.hash;
//     item ["size"] =blockDetails.size;
//     item ["timestamp"] =blockDetails.timestamp;
//     item ["gasUsed"] =blockDetails.gasUsed;
//     item ["nonce"] =blockDetails.nonce; 
//     blockArray.push(item);
//     // var txHashList = [];
//     // var  blockDetails;
//     // txHashList.push(blockDetails.hash);
//     console.log("blockArray1 : ", blockArray);
//     console.log("Lengthofblock", data);     
//     if (data) {  
//         try{
//         let datavar=data;
//         console.log("datascheck1",datavar);

//         Object.keys(datavar).map((m)=>{
//           console.log("datascheck",datavar[m]);
//           countlist=countlist + 1;
        
//           r.push({
//             smartContractAddress:datavar[m].smartContractAddress,
//             // tokenName:datavar[m].tokenName,
//             // depositTokenAddress:datavar[m].depositTokenAddress,
//           })  
                    
//         })       
//     }   catch(e){                      
//     } 
//     r.reverse();
//     setBlockdata(r);                
//     }
//     else{
//         setBlockdata([""]);  
//     }
//     console.log("Data", data);
//     //setpagesCountlist(countlist);        
// } catch (error) {            
// }                

// }
// }


useEffect(()=>{polygonBlockTableFetch()},[])

  const polygonBlockTableFetch=async()=>{            
    if(localStorage.getItem("UserID")  === null || localStorage.getItem("UserID")  === "" || localStorage.getItem("UserID")  === " " || localStorage.getItem("UserID") === undefined || localStorage.getItem("UserID") === ''){
    }
    else{
      let r=[];
      let countlist=0;
  try {          
      let data = await Ploygondeploydataget(localStorage.getItem("UserID"));
      console.log("Length", data['data2']['length']);     
      if (data['data2']) {  
          try{
          let datavar=data['data2'];
          console.log("datascheck1",datavar);
          Object.keys(datavar).map((m)=>{
            console.log("datascheck",datavar[m]);
            countlist=countlist + 1;
            
            r.push({
                blockHash:datavar[m].blockHash,
                miner:datavar[m].miner,
                blockNumber:datavar[m].blockNumber,
                timestamp:datavar[m].timeStamp

            })  
                        
          })       
      }   catch(e){                      
      } 
    //   r.reverse();
      setBlockdata(r);                
      }
    //   else{
    //     setBlockdata([""]);  
    //   }
      console.log("Data", data);
      //setpagesCountlist(countlist);        
  } catch (error) {            
  }                
  
}
  }

  function ConvertSectoDay(n) {
    var day =parseInt( n/ (24 * 3600));
   console.log("daycheck",day);
    n = n % (24 * 3600);
    var hour = parseInt(n / 3600);

    n %= 3600;
    var minutes = n / 60;

    n %= 60;
    var seconds = n;

    return(
            day + " " + "days " + hour + " " + "hours "
            + minutes.toFixed() + " " + "minutes " +
            seconds.toFixed() + " " + "seconds ago");
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
                        <h1 className="page-title m-0">Blocks</h1>
                    </Col>
                </Row>
            </div>

            <div className="cbdc-card cbdc-card-table base-bg mb-4 px-4 py-3">
                <h4>
                    Top programs
                    <OverlayTrigger
                        key="right"
                        placement="right"
                        overlay={
                            <Tooltip id={`tooltip-right`}>
                                Based on the past one hour of network activity.
                            </Tooltip>
                        }
                    >
                        <svg className="tooltip-icon ms-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                        </svg>
                    </OverlayTrigger>
                </h4>
                
                <BarChart />
            </div>

            <div className="cbdc-card cbdc-card-table base-bg px-0 py-2">
                <Table striped hover size="md" responsive>
                    <thead>
                        <tr>
                            {/* <th>#</th> */}
                            <th>Blocknumber</th>
                            <th>Block hash</th>
                            <th>validator</th>
                           
                            {/* <th>total fees</th> */}
                            <th>time stamp</th>
                        </tr>
                    </thead>
                    <tbody>

                    {blockdata.map((x,y)=>{
                                    return(
                                        <tr>
                                                <td>{x.blockNumber}</td>  
                                        {/* <td className="text-center">{y+1}</td> */}
                                        <td>  {(x.blockHash).substring(0, 12)}...{(x.blockHash).substring((x.blockHash).length -4, (x.blockHash).length)}</td>

                                        {/* <td>{x.hash}</td> */}
                                        <td>  {(x.miner).substring(0, 12)}...{(x.miner).substring((x.miner).length -4, (x.miner).length)}</td>

                                         {/* <td>{x.miner}</td>  */}
                                        <td>{ConvertSectoDay(parseInt(new Date()/1000) -x.timestamp)}</td> 
                                         {/* <td> {parseInt(new Date()/1000) -x.timestamp}s ago</td>  */}
                                        </tr>
                                    )
                                    })
                                    }

                        {/* <tr>
                            <td>
                                <Link to="/"></Link>
                            </td>
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
                            <td>
                                <div className="d-flex">
                                    <OverlayTrigger
                                        key="right"
                                        placement="right"
                                        overlay={
                                            <Tooltip id={`tooltip-right`}>
                                                Based on the past one hour of network activity, this is the average amount of time that it took the leading validator to successfully ingest transactions and to produce a block.
                                            </Tooltip>
                                        }
                                    >
                                        <svg className="tooltip-icon me-2 ms-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="currentColor" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="currentColor"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="currentColor"></path></svg>
                                    </OverlayTrigger>

                                    <Link to="/">3cxv...qvTY</Link>
                                </div>
                            </td>
                            <td>3285</td>
                            <td>0.01657015 <span className="base-text">BNB</span></td>
                            <td>ago</td>
                        </tr>
                        <tr>
                            <td>
                                <Link to="/">3cxv...qvTY</Link>
                            </td>
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
                            <td>
                                <div className="d-flex">
                                    <OverlayTrigger
                                        key="right"
                                        placement="right"
                                        overlay={
                                            <Tooltip id={`tooltip-right`}>
                                                Based on the past one hour of network activity, this is the average amount of time that it took the leading validator to successfully ingest transactions and to produce a block.
                                            </Tooltip>
                                        }
                                    >
                                        <svg className="tooltip-icon me-2 ms-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="currentColor" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="currentColor"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="currentColor"></path></svg>
                                    </OverlayTrigger>

                                    <Link to="/">3cxv...qvTY</Link>
                                </div>
                            </td>
                            <td>3285</td>
                            <td>0.01657015 <span className="base-text">BNB</span></td>
                            <td>ago</td>
                        </tr>
                        <tr>
                            <td>
                                <Link to="/">3cxv...qvTY</Link>
                            </td>
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
                            <td>
                                <div className="d-flex">
                                    <OverlayTrigger
                                        key="right"
                                        placement="right"
                                        overlay={
                                            <Tooltip id={`tooltip-right`}>
                                                Based on the past one hour of network activity, this is the average amount of time that it took the leading validator to successfully ingest transactions and to produce a block.
                                            </Tooltip>
                                        }
                                    >
                                        <svg className="tooltip-icon me-2 ms-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="currentColor" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="currentColor"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="currentColor"></path></svg>
                                    </OverlayTrigger>

                                    <Link to="/">3cxv...qvTY</Link>
                                </div>
                            </td>
                            <td>3285</td>
                            <td>0.01657015 <span className="base-text">BNB</span></td>
                            <td>ago</td>
                        </tr>
                        <tr>
                            <td>
                                <Link to="/">3cxv...qvTY</Link>
                            </td>
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
                            <td>
                                <div className="d-flex">
                                    <OverlayTrigger
                                        key="right"
                                        placement="right"
                                        overlay={
                                            <Tooltip id={`tooltip-right`}>
                                                Based on the past one hour of network activity, this is the average amount of time that it took the leading validator to successfully ingest transactions and to produce a block.
                                            </Tooltip>
                                        }
                                    >
                                        <svg className="tooltip-icon me-2 ms-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="currentColor" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="currentColor"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="currentColor"></path></svg>
                                    </OverlayTrigger>

                                    <Link to="/">3cxv...qvTY</Link>
                                </div>
                            </td>
                            <td>3285</td>
                            <td>0.01657015 <span className="base-text">BNB</span></td>
                            <td>ago</td>
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

export default BlocksPage;