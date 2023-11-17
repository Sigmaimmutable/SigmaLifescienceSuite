import { Badge, Button, Col, Container, OverlayTrigger, Row, Table, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Layout from "../LayoutT";
import SearchBar from "./snippets/SearchBar";
import React,{ useState,useRef ,useEffect} from "react";
import {Ploygondeploydatatxget } from "../../../API/ApiFunctions";

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
//     var web3 = new Web3(
//         new Web3.providers.HttpProvider("https://bnbtest.stasisonline.in:8545")
//       );
//       const getLatestBlock = async() => {
//         const { data } = await axios.get(
//           `${BASE_URL}?module=block&action=eth_block_number`
//         );
//         return new BigNumber(data.result).toString();
//       }
      
//       const getBlockDetails = async(blockWithTx) => {
//         return web3.eth.getBlock(blockWithTx);
//       }
      
//       const getTxDetails = async(txHash) => {
//           let fetData = `${BASE_URL}?module=transaction&action=gettxinfo&txhash=${txHash}`
//           const res = await fetch(fetData);
//           const data = res.json();
//         return data;
//       }
      

//       useEffect(()=>{getDetails()},[])
//       const getDetails = async () =>{
//         const ltsBlock = await getLatestBlock();
//         console.log("Blockdata",ltsBlock);
//         const blockWithTx = 10;
//         //const blockDetails = await getBlockDetails(blockWithTx);
//         var  blockDetails;
//         var txHashList = [];
//         var blockArray = [];
//         var txList = [];
//         var miners = [];
        
//         const validatorMap = new Map();
//         for(var num=0; num<20;num++){
//           var blockNumerToPrint = ltsBlock - num;
//           blockDetails = await getBlockDetails(blockNumerToPrint);
//         //  blockDetails = await getBlockDetails(num);
//         setBlockdetails(blockDetails.hash);
//         // console.log("block hash = "+blockdetails); 
//         //   console.log("blockNumerToPrint = "+blockNumerToPrint);
//         //   console.log("block hash = "+blockDetails.hash); 
//           txHashList.push(blockDetails.hash);
          
//           var minerObject = {};
//           minerObject ["miner"] = blockDetails.miner;
//           minerObject ["hash"] = blockDetails.hash;
//           miners.push(minerObject);
//           validatorMap.set(blockDetails.miner, minerObject);
    
//           var item = {};
//             item ["miner"] =blockDetails.miner;
//             item ["hash"] =blockDetails.hash;
//             item ["size"] =blockDetails.size;
//             item ["timestamp"] =blockDetails.timestamp;
//             item ["gasUsed"] =blockDetails.gasUsed;
//             item ["nonce"] =blockDetails.nonce; 
           
//             var tempTransactions = [];
//             tempTransactions = blockDetails.transactions;
//             for(var arraySize = 0; arraySize<tempTransactions.length; arraySize ++){
//               txList.push(tempTransactions[arraySize]);
//             }    
//             item ["txs"] =tempTransactions.length; 
//             blockArray.push(item);    
//         }  
    
//         // console.log("Miners "+ miners);
//         // console.log("validatorMap Map" + validatorMap);
        
//         console.log("11111 ==== txHashList : ", txHashList);
//         console.log("txList : ", txList);
//         // console.log("blockArray : ", blockArray);
            
//         console.log("blackdata",tempTransactions);

//          console.log("Latest Block : ", ltsBlock);
//         console.log("Block Details =>", blockDetails);
      
//         for(var num=0; num<txList.length;num++){
//           var tempTxHash = txList[num];
    
//           console.log("Tx from Array List1",txList.length);
//           console.log("Tx from Array List"+tempTxHash);
        
//         const allTx = (
//           await Promise.allSettled(
//             blockDetails.transactions.map(
//               async (tempTxHash) => await getTxDetails(tempTxHash)
//             )
//           )
//         )
//           .filter((data) => data.status === "fulfilled")
//           .map((val) => val.value);
//         console.log("trans.txt "+num, JSON.stringify(allTx));
//         let datavar=  allTx;
//         console.log("datavarvalidators",datavar)
//         let countlist=0;
//         let r=[];
//         Object.keys(datavar).map((m)=>{
//             console.log("datascheck",datavar[m]);
           
//           countlist=countlist + 1;
          
//             r.push({
//                 hash:datavar[m].result.hash,
//                 blockNumber:datavar[m].result.blockNumber,
//                 from:datavar[m].result.from,
//                 value:datavar[m].result.value,
//                 gasPrice:datavar[m].result.gasPrice,
//                 timeStamp:datavar[m].result.timeStamp,
//                 success:datavar[m].result.success

//             })
          
                      
//           })   
//         //   r.reverse();
//           setBlockdata(r);
//       }
// }
useEffect(()=>{polygonBlockTableFetch()},[])

  const polygonBlockTableFetch=async()=>{            
    if(localStorage.getItem("UserID")  === null || localStorage.getItem("UserID")  === "" || localStorage.getItem("UserID")  === " " || localStorage.getItem("UserID") === undefined || localStorage.getItem("UserID") === ''){
    }
    else{
      let r=[];
      let countlist=0;
  try {          
      let data = await Ploygondeploydatatxget(localStorage.getItem("UserID"));
      console.log("Length", data['data2']['length']);     
      if (data['data2']) {  
          try{
          let datavar=data['data2'];
          console.log("datascheck1",datavar);
          Object.keys(datavar).map((m)=>{
            console.log("datascheck12",datavar[m]);
            countlist=countlist + 1;
            
            r.push({
                txHash:datavar[m].txHash,
                blockNumber:datavar[m].blockNumber,
                fromAddress:datavar[m].fromAddress,
                value:datavar[m].value,
                gasPrice:datavar[m].gasPrice,
                // timeStamp:datavar[m].result.timeStamp,
               

            })  
            console.log("Datar", r);
                        
          })       
      }   catch(e){                      
      } 
    //   r.reverse();
      setBlockdata(r);   
                   
      }
    //   else{
    //     setBlockdata([""]);  
    //   }
      console.log("Data", r);
      //setpagesCountlist(countlist);        
  } catch (error) {            
  }                
  
}
  }
  console.log("bdata",blockdata);

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

const hexadecimatodecimal =hex=>parseInt(hex,16);
function hex2a(hexx) {
    var hex = hexx.toString();//force conversion
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
        console.log("str",str)
    return str;
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
                        <h1 className="page-title m-0">Transactions</h1>
                    </Col>
                </Row>
            </div>

            <div className="cbdc-card cbdc-card-table base-bg px-0 py-2">
                <Table striped hover size="md" responsive>  
                    <thead>
                        <tr>
                            {/* <th>Hash</th> */}
                            <th>Transaction hash</th>
                             {/* <th>
                                Instructions
                                <OverlayTrigger
                                    key="right"
                                    placement="right"
                                    overlay={
                                        <Tooltip id={`tooltip-right`}>
                                            Based on the past one hour of network activity.
                                        </Tooltip>
                                    }
                                >
                                    <svg className="tooltip-icon ms-2" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                    </svg>
                                </OverlayTrigger>
                            </th> */}
                              <th>Block</th>
                              <th>From</th>
                              <th>Amount</th>
                              <th>fee</th>
                              {/* <th>timestamp</th>  */}
                            <th>Status</th> 
                            
                            
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

                                         {/* <td>{x.miner}</td>   */}
                                                                           <td>  {(x.txHash).substring(0, 12)}...{(x.txHash).substring((x.txHash).length -4, (x.txHash).length)}</td> 

                                         <td>{hexadecimatodecimal(x.blockNumber)}</td> 
                                         <td>{x.fromAddress}</td> 
                                         <td>{(x.value)/1e18}</td> 
                                         <td>{(x.gasPrice)/1e18}</td> 
                                         {/* <td> {parseInt(new Date()/1000) -x.timeStamp}s ago</td>   */}
                                         {/* <td>{(x.success===true?<>Success</>:<>Failed</>)}</td>  */}
                                      
                                                                              <td>Success</td> 

                                        </tr>
                                    )
                                    })
                                    }
                        {/* <tr>
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
                            <td><Badge bg="success">Success</Badge></td>
                            <td>0.000005 BNB</td>
                            <td>35s ago</td>
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
                            <td><Badge bg="success">Success</Badge></td>
                            <td>0.000005 BNB</td>
                            <td>35s ago</td>
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
                            <td><Badge bg="success">Success</Badge></td>
                            <td>0.000005 BNB</td>
                            <td>35s ago</td>
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
                            <td><Badge bg="success">Success</Badge></td>
                            <td>0.000005 BNB</td>
                            <td>35s ago</td>
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
                            <td>Unknown</td>
                            <td><Badge bg="success">Success</Badge></td>
                            <td>0.000005 BNB</td>
                            <td>35s ago</td>
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
                            <td>Unknown</td>
                            <td><Badge bg="success">Success</Badge></td>
                            <td>0.000005 BNB</td>
                            <td>35s ago</td>
                        </tr> */}
                    </tbody>
                </Table>
{/* 
                <div className="pt-2 text-center">
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