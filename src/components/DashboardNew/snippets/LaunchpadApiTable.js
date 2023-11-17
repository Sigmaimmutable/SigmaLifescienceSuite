import { Card, Col, ProgressBar, Row, Table, Button } from "react-bootstrap";
import ButtonLoad from 'react-bootstrap-button-loader';
import axios from "axios";
import { Link,useHistory} from "react-router-dom";
import React,{ useState,useRef ,useEffect} from "react";
import { BinanceLaunchpadGet, BinanceNormalNFTGet, BinanceAuctionNFTGet,BinanceRoyaltyNFTGet,BinanceFractionalNFTGet,BinanceStakingGet,generateBillingInvoice, getInvoice, payBillingInvoice } from "../../../API/ApiFunctions";

const LaunchpadApiTable = () => {

//AlgorandLaunchpad start
const[pageBLSize,setPageBLSize]=useState(2);     

const decrementBLSize=()=>{
  if(pageBLSize >= 2){
  setPageBLSize(pageBLSize-2)
  }        
}
//BinanceLaunchpad end

//BinanceBond start
const[pageBBSize,setPageBBSize]=useState(2);     

const decrementBBSize=()=>{
  if(pageBBSize >= 4){
  setPageBBSize(pageBBSize-2)
  }        
}

//BinanceERC start
const[pageBESize,setPageBESize]=useState(2);     

const decrementBESize=()=>{
  if(pageBESize >= 4){
  setPageBBSize(pageBESize-2)
  }        
}

//BinanceNFT start
const[pageBNNFTSize,setPageBNNFTSize]=useState(2);     

const decrementBNNFTSize=()=>{
  if(pageBNNFTSize >= 4){
  setPageBNNFTSize(pageBNNFTSize-2)
  }        
}


//BinanceAuctionNFT start
const[pageBANFTSize,setPageBANFTSize]=useState(2);     

const decrementBANFTSize=()=>{
  if(pageBANFTSize >= 4){
  setPageBANFTSize(pageBANFTSize-2)
  }        
}


//BinanceAuctionNFT start
const[pageBRNFTSize,setPageBRNFTSize]=useState(2);     

const decrementBRNFTSize=()=>{
  if(pageBRNFTSize >= 4){
  setPageBANFTSize(pageBRNFTSize-2)
  }        
}


//BinanceFractionalNFT start
const[pageBFNFTSize,setPageBFNFTSize]=useState(2);     

const decrementBFNFTSize=()=>{
  if(pageBFNFTSize >= 4){
  setPageBFNFTSize(pageBFNFTSize-2)
  }        
}

//BinanceFractionalNFT start
const[pageBStakeSize,setPageBStakeSize]=useState(2);     

const decrementBSSize=()=>{
  if(pageBStakeSize >= 4){
    setPageBStakeSize(pageBStakeSize-2)
  }        
}


    const[datas,setdatas]=useState([""]);
    const[filtdata,setfiltdata]= useState([]);;
    const[filtdata3,setfiltdata3]= useState([]);
    const[filtdata2,setfiltdata2]= useState([]);
    // console.log("datasvalue",datas);
    const[values,setvalues]= useState([]);;
    const[Posts,setPosts]= useState();
    const[ad,setad]= useState();
    const[con,setcon]= useState();
    const[pagesCount,setpagesCount]= useState(0);
    const[pagesCountlist,setpagesCountlist]= useState("");
    const[binanceLaunchpadTable,setBinanceLaunchpadTable]= useState([]);
    const[binanceBondTable,setBinanceBondTable]= useState([]);
    const[binanceERCTable,setBinanceERCTable]= useState([]);
    const[binanceNormalNFTTable,setBinanceNormalNFTTable]= useState([]);
    const[binanceAuctionNFTTable,setBinancAuctionNFTTable]= useState([]);
    const[binanceRoyaltyNFTTable,setBinancRoyaltyNFTTable]= useState([]);
    const[binanceFractionalNFTTable,setBinancFractionalNFTTable]= useState([]);
    const[binanceStakingTable,setBinancStakingTable]= useState([]);
    // const[algorandLaunchpadTable,setAlgorandLaunchpadTable]= useState([]);
    // const[algorandBondTable,setAlgorandBondTable]= useState([]);
    console.log("binanceLaunchpadTable", binanceLaunchpadTable);
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
//Launchpad
  useEffect(()=>{binanceLaunchpadTableFetch()},[])

  const binanceLaunchpadTableFetch=async()=>{            
    if(localStorage.getItem("UserID")  === null || localStorage.getItem("UserID")  === "" || localStorage.getItem("UserID")  === " " || localStorage.getItem("UserID") === undefined || localStorage.getItem("UserID") === ''){
    }
    else{
      let r=[];
      let countlist=0;
  try {          
      let data = await BinanceLaunchpadGet(localStorage.getItem("UserID"));
      console.log("Length", data['data2']['length']);     
      if (data['data2']) {  
          try{
          let datavar=data['data2'];
          console.log("datascheck1",datavar);
          Object.keys(datavar).map((m)=>{
            console.log("datascheck",datavar[m]);
            countlist=countlist + 1;
            if(datavar[m].networkType === "BL")
            {
            r.push({
              smartContractAddress:datavar[m].smartContractAddress,
              bondTokenAddress:datavar[m].bondTokenAddress,
              startDate:datavar[m].startDate,
              endDate:datavar[m].endDate,
              tokenName:datavar[m].tokenName
            })  
            }              
          })       
      }   catch(e){                      
      } 
      r.reverse();
      setBinanceLaunchpadTable(r);                
      }
      else{
      setBinanceLaunchpadTable([""]);  
      }
      console.log("Data", data);
      //setpagesCountlist(countlist);        
  } catch (error) {            
  }                
  
}
  }
//Bond
  useEffect(()=>{binanceBondTableFetch()},[])

  const binanceBondTableFetch=async()=>{            
    if(localStorage.getItem("UserID")  === null || localStorage.getItem("UserID")  === "" || localStorage.getItem("UserID")  === " " || localStorage.getItem("UserID") === undefined || localStorage.getItem("UserID") === ''){
    }
    else{
      let r=[];
      let countlist=0;
  try {          
      let data = await BinanceLaunchpadGet(localStorage.getItem("UserID"));
      console.log("Length", data['data2']['length']);     
      if (data['data2']) {  
          try{
          let datavar=data['data2'];
          console.log("datascheck1",datavar);
          Object.keys(datavar).map((m)=>{
            console.log("datascheck",datavar[m]);
            countlist=countlist + 1;
            if(datavar[m].networkType === "BB")
            {
            r.push({
              smartContractAddress:datavar[m].smartContractAddress,
              bondTokenAddress:datavar[m].bondTokenAddress,
              depositTokenAddress:datavar[m].depositTokenAddress,
              tokenName:datavar[m].tokenName
            })  
            }              
          })       
      }   catch(e){                      
      } 
      r.reverse();
      setBinanceBondTable(r);                
      }
      else{
      setBinanceBondTable([""]);  
      }
      console.log("Data", data);
      //setpagesCountlist(countlist);        
  } catch (error) {            
  }                
  
}
  }

  //Bond
  useEffect(()=>{binanceStakeTableFetch()},[])

  const binanceStakeTableFetch=async()=>{            
    if(localStorage.getItem("UserID")  === null || localStorage.getItem("UserID")  === "" || localStorage.getItem("UserID")  === " " || localStorage.getItem("UserID") === undefined || localStorage.getItem("UserID") === ''){
    }
    else{
      let r=[];
      let countlist=0;
  try {          
      let data = await BinanceLaunchpadGet(localStorage.getItem("UserID"));
      console.log("Length", data['data2']['length']);     
      if (data['data2']) {  
          try{
          let datavar=data['data2'];
          console.log("datascheck1",datavar);
          Object.keys(datavar).map((m)=>{
            console.log("datascheck",datavar[m]);
            countlist=countlist + 1;
            if(datavar[m].networkType === "BS")
            {
            r.push({
              smartContractAddress:datavar[m].smartContractAddress,
              bondTokenAddress:datavar[m].bondTokenAddress,
              depositTokenAddress:datavar[m].depositTokenAddress,
              tokenName:datavar[m].tokenName
            })  
            }              
          })       
      }   catch(e){                      
      } 
      r.reverse();
      setBinancStakingTable(r);                
      }
      else{
        setBinancStakingTable([""]);  
      }
      console.log("Data", data);
      //setpagesCountlist(countlist);        
  } catch (error) {            
  }                
  
}
  }
//ERC20
useEffect(()=>{binanceERCTableFetch()},[])

const binanceERCTableFetch=async()=>{            
  if(localStorage.getItem("UserID")  === null || localStorage.getItem("UserID")  === "" || localStorage.getItem("UserID")  === " " || localStorage.getItem("UserID") === undefined || localStorage.getItem("UserID") === ''){
  }
  else{
    let r=[];
    let countlist=0;
try {          
    let data = await BinanceLaunchpadGet(localStorage.getItem("UserID"));
    console.log("Length", data['data2']['length']);     
    if (data['data2']) {  
        try{
        let datavar=data['data2'];
        console.log("datascheck1",datavar);
        Object.keys(datavar).map((m)=>{
          console.log("datascheck",datavar[m]);
          countlist=countlist + 1;
          if(datavar[m].networkType === "BE")
          {
          r.push({
            smartContractAddress:datavar[m].smartContractAddress,
            tokenName:datavar[m].tokenName,
            // depositTokenAddress:datavar[m].depositTokenAddress,
          })  
          }              
        })       
    }   catch(e){                      
    } 
    r.reverse();
    setBinanceERCTable(r);                
    }
    else{
    setBinanceERCTable([""]);  
    }
    console.log("Data", data);
    //setpagesCountlist(countlist);        
} catch (error) {            
}                

}
}


//NormalNFT
//ERC20
useEffect(()=>{binanceNormalNFTTableFetch()},[])

const binanceNormalNFTTableFetch=async()=>{            
  if(localStorage.getItem("UserID")  === null || localStorage.getItem("UserID")  === "" || localStorage.getItem("UserID")  === " " || localStorage.getItem("UserID") === undefined || localStorage.getItem("UserID") === ''){
  }
  else{
    let r=[];
    let countlist=0;
try {          
    let data = await BinanceNormalNFTGet(localStorage.getItem("UserID"));
    console.log("Length", data['data2']['length']);     
    if (data['data2']) {  
        try{
        let datavar=data['data2'];
        console.log("datascheck1",datavar);
        Object.keys(datavar).map((m)=>{
          console.log("datascheck",datavar[m]);
          countlist=countlist + 1;
          if(datavar[m].networkType === "BNNFT")
          {
          r.push({
            smartContractAddress:datavar[m].smartContractAddress,
            tokenName:datavar[m].tokenName
            // tokenName:datavar[m].tokenName,
            // depositTokenAddress:datavar[m].depositTokenAddress,
          })  
          }              
        })       
    }   catch(e){                      
    } 
    r.reverse();
    setBinanceNormalNFTTable(r);                
    }
    else{
        setBinanceNormalNFTTable([""]);  
    }
    console.log("Data", data);
    //setpagesCountlist(countlist);        
} catch (error) {            
}                

}
}



//AuctionNFT
useEffect(()=>{binanceAuctionNFTTableFetch()},[])

const binanceAuctionNFTTableFetch=async()=>{            
  if(localStorage.getItem("UserID")  === null || localStorage.getItem("UserID")  === "" || localStorage.getItem("UserID")  === " " || localStorage.getItem("UserID") === undefined || localStorage.getItem("UserID") === ''){
  }
  else{
    let r=[];
    let countlist=0;
try {          
    let data = await BinanceAuctionNFTGet(localStorage.getItem("UserID"));
    console.log("Length", data['data2']['length']);     
    if (data['data2']) {  
        try{
        let datavar=data['data2'];
        console.log("datascheck1",datavar);
        Object.keys(datavar).map((m)=>{
          console.log("datascheck",datavar[m]);
          countlist=countlist + 1;
          if(datavar[m].networkType === "BANFT")
          {
          r.push({
            smartContractAddress:datavar[m].smartContractAddress,
            tokenName:datavar[m].tokenName
            // tokenName:datavar[m].tokenName,
            // depositTokenAddress:datavar[m].depositTokenAddress,
          })  
          }              
        })       
    }   catch(e){                      
    } 
    r.reverse();
    setBinancAuctionNFTTable(r);                
    }
    else{
        setBinancAuctionNFTTable([""]);  
    }
    console.log("Data", data);
    //setpagesCountlist(countlist);        
} catch (error) {            
}                

}
}

//RoyaltyNFT
useEffect(()=>{binanceRoyaltyNFTTableFetch()},[])

const binanceRoyaltyNFTTableFetch=async()=>{            
  if(localStorage.getItem("UserID")  === null || localStorage.getItem("UserID")  === "" || localStorage.getItem("UserID")  === " " || localStorage.getItem("UserID") === undefined || localStorage.getItem("UserID") === ''){
  }
  else{
    let r=[];
    let countlist=0;
try {          
    let data = await BinanceRoyaltyNFTGet(localStorage.getItem("UserID"));
    console.log("Length", data['data2']['length']);     
    if (data['data2']) {  
        try{
        let datavar=data['data2'];
        console.log("datascheck1",datavar);
        Object.keys(datavar).map((m)=>{
          console.log("datascheck",datavar[m]);
          countlist=countlist + 1;
          if(datavar[m].networkType === "BRNFT")
          {
          r.push({
            smartContractAddress:datavar[m].smartContractAddress,
            tokenName:datavar[m].tokenName
            // tokenName:datavar[m].tokenName,
            // depositTokenAddress:datavar[m].depositTokenAddress,
          })  
          }              
        })       
    }   catch(e){                      
    } 
    r.reverse();
    setBinancRoyaltyNFTTable(r);                
    }
    else{
        setBinancRoyaltyNFTTable([""]);  
    }
    console.log("Data", data);
    //setpagesCountlist(countlist);        
} catch (error) {            
}                

}
}


//RoyaltyNFT
useEffect(()=>{binanceFractionalNFTTableFetch()},[])

const binanceFractionalNFTTableFetch=async()=>{            
  if(localStorage.getItem("UserID")  === null || localStorage.getItem("UserID")  === "" || localStorage.getItem("UserID")  === " " || localStorage.getItem("UserID") === undefined || localStorage.getItem("UserID") === ''){
  }
  else{
    let r=[];
    let countlist=0;
try {          
    let data = await BinanceFractionalNFTGet(localStorage.getItem("UserID"));
    console.log("Length", data['data2']['length']);     
    if (data['data2']) {  
        try{
        let datavar=data['data2'];
        console.log("datascheck1",datavar);
        Object.keys(datavar).map((m)=>{
          console.log("datascheck",datavar[m]);
          countlist=countlist + 1;
          if(datavar[m].networkType === "BFNFT")
          {
          r.push({
            smartContractAddress:datavar[m].smartContractAddress,
            
            // tokenName:datavar[m].tokenName,
            bondTokenAddress:datavar[m].bondTokenAddress,
            tokenName:datavar[m].tokenName
          })  
          }              
        })       
    }   catch(e){                      
    } 
    r.reverse();
    setBinancFractionalNFTTable(r);                
    }
    else{
        setBinancFractionalNFTTable([""]);  
    }
    console.log("Data", data);
    //setpagesCountlist(countlist);        
} catch (error) {            
}                

}
}


    return (
        <div class="py-5">
            <div class="container">
                        <Card className="card-dash border-0 d-block mb-3">
                            <Card.Header>
                                <h5 className="mb-0">Polygon CrowdFunding </h5>
                            </Card.Header>
                            <div className="overflow-auto" style={{maxHeight: '200px'}}>
                                <Table striped hover  className="mb-0">
                                    <thead>
                                        <tr>
                                            <th width="35" className="text-center">#</th>
                                            <th>Code Index</th>
                                            <th>Contract address</th>
                                            <th>Token address</th>
                                            <th>Start date</th>
                                            <th>End date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {binanceLaunchpadTable.map((x,y)=>{
                                    return(
                                        <tr>
                                        <td className="text-center">{y+1}</td>
                                        <td>{x.tokenName}</td> 
                                        <td>{x.smartContractAddress}</td>
                                        <td>{x.bondTokenAddress}</td>
                                        <td>{x.startDate}</td>
                                        <td>{x.endDate}</td>
                                        </tr>
                                    )
                                    })
                                    }
                                    </tbody>
                                </Table>
                            </div><br/>
                            {binanceLaunchpadTable <= 2 ? (
                                <></>
                            ):(
                                <div className='pagination justify-content-end d-flex align-items-center'>                                
                                <Button variant='page' onClick={()=>{decrementBLSize()}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi m-0 bi-chevron-left" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                                    </svg>
                                </Button>
                                <Button variant='page' onClick={()=>{setPageBLSize(pageBLSize+2)}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi m-0 bi-chevron-right" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                                </Button>
                            </div>
                      )}
                        </Card>

                        <Card className="card-dash border-0 d-block mb-3">
                            <Card.Header>
                                <h5 className="mb-0">Polygon Bond</h5>
                            </Card.Header>
                            <div className="overflow-auto" style={{maxHeight: '200px'}}>
                                <Table striped hover  className="mb-0">
                                    <thead>
                                        <tr>
                                            <th width="35" className="text-center">#</th>
                                            <th>Code Index</th>
                                            <th>Contract address</th>
                                            <th>Deposit token address</th>
                                            <th>Reward token address</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {binanceBondTable.map((x,y)=>{
                                    return(
                                        <tr>
                                        <td className="text-center">{y+1}</td>
                                        <td>{x.tokenName}</td> 
                                        <td>{x.smartContractAddress}</td>
                                        <td>{x.depositTokenAddress}</td>
                                        {/* <td>{x.depositTokenAddress}</td> */}
                                        <td>{x.bondTokenAddress}</td>
                                        </tr>
                                    )
                                    })
                                    }
                                    </tbody>
                                </Table>
                            </div><br/>
                            {binanceBondTable <= 2 ? (
                                <></>
                            ):(
                                <div className='pagination justify-content-end d-flex align-items-center'>                                
                                <Button variant='page' onClick={()=>{decrementBBSize()}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi m-0 bi-chevron-left" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                                    </svg>
                                </Button>
                                <Button variant='page' onClick={()=>{setPageBBSize(pageBBSize+2)}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi m-0 bi-chevron-right" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                                </Button>
                            </div>
                      )}
                        </Card>


                        <Card className="card-dash border-0 d-block mb-3">
                            <Card.Header>
                                <h5 className="mb-0">Polygon ERC20Token</h5>
                            </Card.Header>
                            <div className="overflow-auto" style={{maxHeight: '200px'}}>
                                <Table striped hover  className="mb-0">
                                    <thead>
                                        <tr>
                                            <th width="35" className="text-center">#</th>
                                            <th>Code Index</th>
                                            <th>ERCToken address</th>
                                            {/* <th>Token Name</th> */}
                                            {/* <th>Reward token address</th>  */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {binanceERCTable.map((x,y)=>{
                                    return(
                                        <tr>
                                        <td className="text-center">{y+1}</td>
                                        <td>{x.tokenName}</td> 
                                        <td>{x.smartContractAddress}</td>
                                      
                                        {/* <td>{x.depositTokenAddress}</td> */}
                                        {/* <td>{x.bondTokenAddress}</td> */}
                                        </tr>
                                    )
                                    })
                                    }
                                    </tbody>
                                </Table>
                            </div><br/>
                            {binanceERCTable <= 2 ? (
                                <></>
                            ):(
                                <div className='pagination justify-content-end d-flex align-items-center'>                                
                                <Button variant='page' onClick={()=>{decrementBESize()}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi m-0 bi-chevron-left" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                                    </svg>
                                </Button>
                                <Button variant='page' onClick={()=>{setPageBESize(pageBBSize+2)}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi m-0 bi-chevron-right" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                                </Button>
                            </div>
                      )}
                        </Card>

                        <Card className="card-dash border-0 d-block mb-3">
                            <Card.Header>
                                <h5 className="mb-0">Polygon Staking</h5>
                            </Card.Header>
                            <div className="overflow-auto" style={{maxHeight: '200px'}}>
                                <Table striped hover  className="mb-0">
                                    <thead>
                                        <tr>
                                            <th width="35" className="text-center">#</th>
                                            <th>Code Index</th>
                                            <th>Contract address</th>
                                            <th>Staking token address</th>
                                            <th>Reward token address</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {binanceStakingTable.map((x,y)=>{
                                    return(
                                        <tr>
                                        <td className="text-center">{y+1}</td>
                                        <td>{x.tokenName}</td> 
                                        <td>{x.smartContractAddress}</td>
                                        <td>{x.depositTokenAddress}</td>
                                        {/* <td>{x.depositTokenAddress}</td> */}
                                        <td>{x.bondTokenAddress}</td>
                                        </tr>
                                    )
                                    })
                                    }
                                    </tbody>
                                </Table>
                            </div><br/>
                            {binanceStakingTable <= 2 ? (
                                <></>
                            ):(
                                <div className='pagination justify-content-end d-flex align-items-center'>                                
                                <Button variant='page' onClick={()=>{decrementBSSize()}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi m-0 bi-chevron-left" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                                    </svg>
                                </Button>
                                <Button variant='page' onClick={()=>{setPageBStakeSize(pageBStakeSize+2)}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi m-0 bi-chevron-right" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                                </Button>
                            </div>
                      )}
                        </Card>

                        <Card className="card-dash border-0 d-block mb-3">
                            <Card.Header>
                                <h5 className="mb-0">Polygon NormalNFTToken</h5>
                            </Card.Header>
                            <div className="overflow-auto" style={{maxHeight: '200px'}}>
                                <Table striped hover  className="mb-0">
                                    <thead>
                                        <tr>
                                            <th width="35" className="text-center">#</th>
                                            <th>Code Index</th>
                                            <th>NFT ContractAddress</th>
                                            {/* <th>Token Name</th> */}
                                            {/* <th>Reward token address</th>  */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {binanceNormalNFTTable.map((x,y)=>{
                                    return(
                                        <tr>
                                        <td className="text-center">{y+1}</td>
                                        <td>{x.tokenName}</td> 
                                        <td>{x.smartContractAddress}</td>
                                         {/* <td>{x.tokenName}</td>  */}
                                        {/* <td>{x.depositTokenAddress}</td> */}
                                        {/* <td>{x.bondTokenAddress}</td> */}
                                        </tr>
                                    )
                                    })
                                    }
                                    </tbody>
                                </Table>
                            </div><br/>
                            {binanceNormalNFTTable <= 2 ? (
                                <></>
                            ):(
                                <div className='pagination justify-content-end d-flex align-items-center'>                                
                                <Button variant='page' onClick={()=>{decrementBNNFTSize()}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi m-0 bi-chevron-left" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                                    </svg>
                                </Button>
                                <Button variant='page' onClick={()=>{setPageBNNFTSize(pageBNNFTSize+2)}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi m-0 bi-chevron-right" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                                </Button>
                            </div>
                      )}
                        </Card>


                        <Card className="card-dash border-0 d-block mb-3">
                            <Card.Header>
                                <h5 className="mb-0">Polygon AuctionNFTToken</h5>
                            </Card.Header>
                            <div className="overflow-auto" style={{maxHeight: '200px'}}>
                                <Table striped hover  className="mb-0">
                                    <thead>
                                        <tr>
                                            <th width="35" className="text-center">#</th>
                                            <th>Code Index</th>
                                            <th>NFT ContractAddress</th>
                                            {/* <th>Token Name</th> */}
                                            {/* <th>Reward token address</th>  */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {binanceAuctionNFTTable.map((x,y)=>{
                                    return(
                                        <tr>
                                        <td className="text-center">{y+1}</td>
                                        <td>{x.tokenName}</td> 
                                        <td>{x.smartContractAddress}</td>
                                         {/* <td>{x.tokenName}</td>  */}
                                        {/* <td>{x.depositTokenAddress}</td> */}
                                        {/* <td>{x.bondTokenAddress}</td> */}
                                        </tr>
                                    )
                                    })
                                    }
                                    </tbody>
                                </Table>
                            </div><br/>
                            {binanceAuctionNFTTable <= 2 ? (
                                <></>
                            ):(
                                <div className='pagination justify-content-end d-flex align-items-center'>                                
                                <Button variant='page' onClick={()=>{decrementBANFTSize()}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi m-0 bi-chevron-left" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                                    </svg>
                                </Button>
                                <Button variant='page' onClick={()=>{setPageBANFTSize(pageBANFTSize+2)}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi m-0 bi-chevron-right" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                                </Button>
                            </div>
                      )}
                        </Card>

                        <Card className="card-dash border-0 d-block mb-3">
                            <Card.Header>
                                <h5 className="mb-0">Polygon RoyaltyNFTToken</h5>
                            </Card.Header>
                            <div className="overflow-auto" style={{maxHeight: '200px'}}>
                                <Table striped hover  className="mb-0">
                                    <thead>
                                        <tr>
                                            <th width="35" className="text-center">#</th>
                                            <th>Code Index</th>
                                            <th>NFT ContractAddress</th>
                                            {/* <th>Token Name</th> */}
                                            {/* <th>Reward token address</th>  */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {binanceRoyaltyNFTTable.map((x,y)=>{
                                    return(
                                        <tr>
                                        <td className="text-center">{y+1}</td>
                                        <td>{x.tokenName}</td> 
                                        <td>{x.smartContractAddress}</td>
                                         {/* <td>{x.tokenName}</td>  */}
                                        {/* <td>{x.depositTokenAddress}</td> */}
                                        {/* <td>{x.bondTokenAddress}</td> */}
                                        </tr>
                                    )
                                    })
                                    }
                                    </tbody>
                                </Table>
                            </div><br/>
                            {binanceRoyaltyNFTTable <= 2 ? (
                                <></>
                            ):(
                                <div className='pagination justify-content-end d-flex align-items-center'>                                
                                <Button variant='page' onClick={()=>{decrementBRNFTSize()}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi m-0 bi-chevron-left" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                                    </svg>
                                </Button>
                                <Button variant='page' onClick={()=>{setPageBRNFTSize(pageBRNFTSize+2)}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi m-0 bi-chevron-right" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                                </Button>
                            </div>
                      )}
                        </Card>


                        <Card className="card-dash border-0 d-block mb-3">
                            <Card.Header>
                                <h5 className="mb-0">Polygon FractionalNFTToken</h5>
                            </Card.Header>
                            <div className="overflow-auto" style={{maxHeight: '200px'}}>
                                <Table striped hover  className="mb-0">
                                    <thead>
                                        <tr>

                                            <th width="35" className="text-center">#</th>
                                            <th>Code Index</th>
                                            <th>NFT ContractAddress</th>
                                            {/* <th>Token Name</th> */}
                                            <th>Fractional NFT ContractAddress</th> 
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {binanceFractionalNFTTable.map((x,y)=>{
                                    return(
                                        <tr>
                                        <td className="text-center">{y+1}</td>
                                        <td>{x.tokenName}</td> 
                                        <td>{x.smartContractAddress}</td>
                                         {/* <td>{x.tokenName}</td>  */}
                                        {/* <td>{x.depositTokenAddress}</td> */}
                                        <td>{x.bondTokenAddress}</td>
                                        </tr>
                                    )
                                    })
                                    }
                                    </tbody>
                                </Table>
                            </div><br/>
                            {binanceFractionalNFTTable <= 2 ? (
                                <></>
                            ):(
                                <div className='pagination justify-content-end d-flex align-items-center'>                                
                                <Button variant='page' onClick={()=>{decrementBFNFTSize()}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi m-0 bi-chevron-left" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                                    </svg>
                                </Button>
                                <Button variant='page' onClick={()=>{setPageBFNFTSize(pageBFNFTSize+2)}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi m-0 bi-chevron-right" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                                </Button>
                            </div>
                      )}
                        </Card>


            </div>
        </div>
    );
  };
  
  export default LaunchpadApiTable;