import React, {useState, useEffect} from 'react';
import { Card, Col, Container, OverlayTrigger, Row, Tooltip, ProgressBar ,Table,Button,Dropdown} from 'react-bootstrap';

import { Link,useHistory } from 'react-router-dom';
import ReactDomServer from 'react-dom/server';
import ReactPaginate from "react-paginate";

import Clock from '../../assets/images/Clock.svg';
import Layout from './LayoutT';
// import PieChartYesNo from './snippets/PieChartYesNo';
// import PieChart from './snippets/PieChart';
import blackicon from "../../assets/images/blacklogo.png";
import web3 from '../../web3';
import { contracts } from './contractAddress';
import {blackabi, blackstake,elementabi,elementstake} from './abi';
import { data } from 'flickity';
// import AreaChartBlack from './snippets/AreaChartBlack'
import ButtonLoad from 'react-bootstrap-button-loader'
// import { Link,useHistory,Redirect, useLocation } from "react-router-dom";

import { BinanceLaunchpadGet, generateBillingInvoice, getInvoice, payBillingInvoice ,Binance,Bscdeploydataget} from "../../API/ApiFunctions";

const DashBoarduerdetails = () => {

    useEffect(() => {
        document.title = "Sigma | UserDetails"
    }, [])
    
    const [firstName, setfirstName] = useState();
    const [emailAddress, setEmailAddress] = useState();
    const [userCredit,setCredits]=useState();
    const [generatedDate, setGeneratedDate] = useState();
    const [dueDate, setDueDate] = useState();
    const [currentOutstanding,setCurrentOutstanding] = useState();
    const [statusInvoice,setStatusInvoice] = useState();
    const [percent,setpercent]=useState();
    const [ genBill, setGenBill ] = useState(false);
    const [ chainid, setchainId ] = useState();
    const [ rpc, setrpc ] = useState();
   const history = useHistory()
//BinanceLaunchpad start
    const[pageBLSize,setPageBLSize]=useState(2);     

  const decrementBLSize=()=>{
    if(pageBLSize >= 4){
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
//BinanceBond end

//AlgorandLaunchpad start
const[pageALSize,setPageALSize]=useState(2);     

const decrementALSize=()=>{
  if(pageALSize >= 4){
  setPageALSize(pageALSize-2)
  }        
}
//AlgorandLaunchpad end

//AlgorandBond start
const[pageABSize,setPageABSize]=useState(2);     

const decrementABSize=()=>{
  if(pageABSize >= 4){
  setPageABSize(pageABSize-2)
  }        
}
//AlgorandBond end


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
    const[binanceDeployTable,setDeployTable]= useState([]);
    const[binanceBondTable,setBinanceBondTable]= useState([]);
    const[algorandLaunchpadTable,setAlgorandLaunchpadTable]= useState([]);
    const[algorandBondTable,setAlgorandBondTable]= useState([]);
    console.log("binanceDeployTable", binanceDeployTable);
    // const navigate = useNavigate();
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
  useEffect(()=>{
    billingGet();
    get();
    percentage();
},[userCredit,emailAddress,firstName,percent,dueDate,generatedDate,currentOutstanding, genBill])
  const get = async () =>
  {
    let response2 = await fetch(`/platform/v1/userinfo`, 
    {
        headers: {
            'x-api-key': `${key}`    
          },
      }
      )
    //console.log(response2);
      const data2 = await response2.json();
    // console.log("fetch txhistory", {data2})
    if(localStorage.getItem('UserID') === null || localStorage.getItem('UserID') === undefined || localStorage.getItem('UserID') === ""){

     console.log("waiting to get local storage");
} 

else {
    for(let i=0;i<data2.length;i++){
        if(data2[i]['userId']===localStorage.getItem('UserID')){
            setEmailAddress(data2[i]['userId']);
            setfirstName(data2[i]['userName']);
            setCredits(data2[i]['userCredits'])
            break;
        }

    }
}
  }


  const chaindetails = async () =>
  {
    let response2 = await fetch(`/platform/v1/network`, 
    {
        headers: {
            'x-api-key': `${key}`    
          },
      }
      )
    //console.log(response2);
      const data2 = await response2.json();
    // console.log("fetch txhistory", {data2})
    if(localStorage.getItem('UserID') === null || localStorage.getItem('UserID') === undefined || localStorage.getItem('UserID') === ""){

     console.log("waiting to get local storage");
} 

else {
    for(let i=0;i<data2.length;i++){
        if(data2[i]['userId']===localStorage.getItem('UserID')){
            setchainId(data2[i]['chainId']);
            setrpc(data2[i]['ipAddress']);
            // setCredits(data2[i]['userCredits'])
            break;
        }

    }
}
  }



  const billingGet = async () =>
  {
      const data = await getInvoice();
      const data2 = data['data2'];
    if(localStorage.getItem('UserID') === null || localStorage.getItem('UserID') === undefined || localStorage.getItem('UserID') === ""){

     console.log("waiting to get local storage");
} 

else {
            setGeneratedDate(data2['invoiceDate']);
            setDueDate(data2['dueDate']);
            setCurrentOutstanding(data2['billAmount']);
            setStatusInvoice(data2['status']);
}
  }

  const Logout = async () =>{
    localStorage.setItem("Login",false);
    localStorage.removeItem("Login");
    localStorage.removeItem("UserID");
    // navigate('/Login');
    history.push("/login-cbdc")
  }
  
  const percentage = async () =>{
    let percalcredit=(parseFloat(userCredit)/2000)*100;
    setpercent(parseInt(percalcredit));
    console.log("percal",percalcredit)
  }

  useEffect(()=>{binancechainTableFetch()},[])

  const binancechainTableFetch=async()=>{            
    if(localStorage.getItem("UserID")  === null || localStorage.getItem("UserID")  === "" || localStorage.getItem("UserID")  === " " || localStorage.getItem("UserID") === undefined || localStorage.getItem("UserID") === ''){
    }
    else{
      let r=[];
      let countlist=0;
  try {          
      let data = await Bscdeploydataget(localStorage.getItem("UserID"));
    
      console.log("Length", data['data2']['length']);     
      if (data) {  
          try{
          let datavar=data['data2'];
          console.log("datascheck13",datavar);
         
          Object.keys(datavar).map((m)=>{
            console.log("datascheck15",datavar[m]);
            countlist=countlist + 1;
           if(datavar[m].createdByUser ===localStorage.getItem("UserID"))
                r.push({
                    // createdByUser:datavar[m].createdByUser,
                    chainId:datavar[m].chainId,
                    ipAddress:datavar[m].ipAddress,
                    // networkName:datavar[m].networkName,
                })    
            
            
                         
          })  
      }   catch(e){                      
      } 
    //   r.reverse();
      setDeployTable(r);                
      }
      else{
        setDeployTable([""]);  
      }
      console.log("Data", data);
      //setpagesCountlist(countlist);        
  } catch (error) {            
  }                
  
}
  }

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

  useEffect(()=>{algorandLaunchpadTableFetch()},[])

  const algorandLaunchpadTableFetch=async()=>{            
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
            if(datavar[m].networkType === "AL")
            {
            r.push({
              appId:datavar[m].appId,
              smartContractAddress:datavar[m].smartContractAddress,
              tokenName:datavar[m].tokenName,
              startDate:datavar[m].startDate,
              endDate:datavar[m].endDate,
            })  
            }              
          })       
      }   catch(e){                      
      } 
      r.reverse();
      setAlgorandLaunchpadTable(r);                
      }
      else{
        setAlgorandLaunchpadTable([""]);  
      }
      console.log("Data", data);
      //setpagesCountlist(countlist);        
  } catch (error) {            
  }                
  
}
  }

  useEffect(()=>{algorandBondTableFetch()},[])

  const algorandBondTableFetch=async()=>{            
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
            if(datavar[m].networkType === "AB")
            {
            r.push({
              appId:datavar[m].appId,
              smartContractAddress:datavar[m].smartContractAddress,
              depositTokenAddress:datavar[m].depositTokenAddress,
              bondTokenAddress:datavar[m].bondTokenAddress,
            })  
            }              
          })       
      }   catch(e){                      
      } 
      r.reverse();
      setAlgorandBondTable(r);                
      }
      else{
        setAlgorandBondTable([""]);  
      }
      console.log("Data", data);
      //setpagesCountlist(countlist);        
  } catch (error) {            
  }                
  
}
  }

  const checkBill = async() =>
  {
    // let data = await generateBillingInvoice();
    // let data2 = data;
    // console.log("generateBill", data);
    setGenBill(true);
  }

  const payBill = async() =>
  {
    let data = await payBillingInvoice();
    // console.log("payBill", data);
  }

    return (
        <Layout>
        <div class="py-5">
            <div class="container">
                <Card className="card-dash border-0 mb-4">
                    {/* <Card.Header className="d-flex justify-content-between align-items-center"> */}
                        <h3 className="font-weight-bold">Credits balance</h3>
                        {/* <a href="/" className="btn-link">Learn More</a> */}
                    {/* </Card.Header> */}
                    <Card.Body className="px-3 text-center py-4">
                        <div className="d-flex align-items-center justify-content-between">
                            <p className="mb-2">Remaining balance: ${userCredit}</p>
                            <p className="mb-2">Total balance: $2000</p>
                        </div>
                        <ProgressBar now={percent} />
                    </Card.Body>
                </Card>

                <Row>
                    <Col md={6} className="mb-4">
                        <Card className="card-dash border-0 mb-4">
                           
                                <h3 className="font-weight-bold">Details</h3>
                          
                            <Card.Body className="p-3">
                                <p className="d-flex align-items-center justify-content-between">
                                    <strong>Account name</strong>
                                    <span>{firstName}</span>
                                </p>
                                <p className="d-flex align-items-center justify-content-between">
                                    <strong>User E-mail ID</strong>
                                    <span>{emailAddress}</span>
                                </p>
                                <p className="d-flex align-items-center justify-content-between">
                                    <strong>Current outstanding</strong>
                                    <span>0.00</span>
                                </p>
                                <ButtonLoad type="button"  size="lg" className="w-100 btn-cta" style={{'backgroundColor':"#8247e5"}} onClick={()=>Logout()}>Logout</ButtonLoad>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} className="mb-4">
                    <Card className="card-dash border-0 mb-4">
                            <Card.Header>
                                <h3 className="ont-weight-bold">Billing Details</h3>
                            </Card.Header>
                            <Card.Body className="p-3">
                                {statusInvoice === "PAID" ? <>
                                <p className="d-flex align-items-center justify-content-between">
                                    <strong>No pending invoices</strong>
                                </p>                    
                                   {/* <ButtonLoad disabled variant="success" type="button"  size="lg" className="w-100 btn-cta" >Paid</ButtonLoad> */}
                                </> : <>
                                <p className="d-flex align-items-center justify-content-between">
                                    <strong>Invoice date</strong>
                                    <span>{generatedDate}</span>
                                </p>
                                <p className="d-flex align-items-center justify-content-between">
                                    <strong>Due date</strong>
                                    <span>{dueDate}</span>
                                </p>
                                <p className="d-flex align-items-center justify-content-between">
                                    <strong>Current outstanding</strong>
                                    <span>{currentOutstanding}</span>
                                </p>
                                    <ButtonLoad type="button" style={{'backgroundColor':"#8247e5"}} size="lg" className="w-100 btn-cta" onClick={() => payBill()}>Pay</ButtonLoad>
                                </>} 
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={12} className="mb-4">
                    <Col md={12} className="mb-4">
                        <Card className="card-dash border-0 d-block mb-">
                            <Card.Header>
                                <h5 className="mb-0">Deployed PrivateNetworks</h5>
                            </Card.Header>
                            <div className="overflow-auto" style={{maxHeight: '200px'}}>
                                <Table striped hover  className="mb-0">
                                    <thead>
                                        <tr>
                                            <th width="35" className="text-center">#</th>
                                            <th>ChainId</th>
                                            <th>RPC URL</th>
                                            {/* <th>Name</th> */}
                                         
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {binanceDeployTable.map((x,y)=>{
                                    if(y < pageBLSize)
                                    return(
                                        <tr>
                                        <td className="text-center">{y+1}</td>
                                        {/* <td>{x.createdByUser}</td> */}
                                        <td>{x.chainId}</td>
                                        <td>{x.ipAddress}</td>
                                        {/* <td>{x.networkName}</td> */}
                                        </tr>
                                    )
                                    })
                                    }
                                    </tbody>
                                </Table>
                            </div>
                            {binanceDeployTable <= 2 ? (
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
                    </Col>
                    </Col>
                
                </Row>
            </div>
        </div>
        </Layout>
    );
};

export default DashBoarduerdetails;