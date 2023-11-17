import React,{ useEffect ,useState} from "react";
import { Link, useHistory } from "react-router-dom";
import {  Col, Container,Row,Button,Card} from "reactstrap";
import ButtonLoad from 'react-bootstrap-button-loader';
import Compress from "react-image-file-resizer";
// import config from "./config.json";
//import Layout from '../components/Layouts/Layout';
//import Layout from '../components/Dashboard/Layout';
//import Layout from '../components/DashboardNew/Layout';
import Layout from '../components/DashboardNew/LayoutT';
import { ToastContainer, Zoom, toast} from 'react-toastify';
import escrow from './escrow'
import node from '../components/DashboardNew/nodeapi.json';


import { updatealgobalance } from "../components/formula";
import { ListGroup } from "react-bootstrap";
import firebase from '../NFTFolder/firebase';
import {abi} from  "./ERCAbi";
import {ercdata} from  "./ERCdata";
import web3 from "../web3";
const Tokensredirect = ({x,y}) => {  
  useEffect(() => {
    document.title = "Sigma | Creator"
}, [])
         
    const[loader, setLoader] = useState(false);
    const handleShowLoad = () => setLoader(true);
    const handleHideLoad = () => setLoader(false); 

    const[address1,setAddress1]=useState("");
    const[amount,setamount]=useState("");
    const[address3,setAddress3]=useState("");
    const [Balance, setBalance] = useState("");
    const[createdmultisig, setCreatedmultisig] = useState("");
    const[owner1,setOwner1]=useState([]);
    const[getIProfile,setgetIProfile]=useState([""]);
    const[getIProfile2,setgetIProfile2]=useState([""]);
    const handleCopied = () =>{setCopyButton(true)};
    const [copyButton, setCopyButton] = useState(false);
    // console.log("valuemulti2",getIProfile2);
    
    // console.log("valuemulti3",getIProfile3);
    console.log("yvalue",y);
    console.log("x.confirm",x.executedstatus);
    const[transactioncount,settransactioncount]=useState("");
    console.log("transacount1",transactioncount);
    const[owner3,setOwner3]=useState([]);

    useEffect(() => {
      getmultisig();
    }, [])
     
  const getmultisig =async()=>{   
    let TokenAddress;
    if(localStorage.getItem('createdToken') === null || localStorage.getItem('createdToken') === undefined ){
      // toast.error(`Create Multisig first`);
    }
    else{
    let createdToken = localStorage.getItem("createdToken");
    console.log("createdToken",createdToken)
    TokenAddress = new web3.eth.Contract(abi, createdToken);
     console.log("TokenAddress",TokenAddress)
    // setCreatedmultisig(localStorage.getItem("multisigaddress"));
    let accounts = await  web3.eth.getAccounts();
    setBalance(await TokenAddress.methods.balanceOf(accounts[0]).call());
    // console.log("owner1",Multisigcontract.methods.getOwners().call());
    // setOwner1(await Multisigcontract.methods.getOwners().call());
    // settransactioncount(await Multisigcontract.methods.getTransactionCount().call())
    // console.log("transacount",await Multisigcontract.methods.getTransactionCount().call());
    // console.log("ethbalance",ethBalance);
    // let transactioncount =await Multisigcontract.methods.getTransactionCount().call();
    //    transactioncount.map((r,i)=>{
    //     console.log("trans",i);
    //    })

    }
  }
     
 
    
    const dbcallProfile=async()=>{            
      if(localStorage.getItem("walletAddress")  === null || localStorage.getItem("walletAddress")  === "" || localStorage.getItem("walletAddress")  === " " || localStorage.getItem("wallet") === undefined || localStorage.getItem("walletAddress") === ''){
      }
      else{
          // firebase.auth().signInAnonymously().then(async(response)=>{           
          const hasRestaurant = await firebase.database()
          .ref(`CreatedTokens/${localStorage.getItem('walletAddress')}`)
          .orderByKey().limitToFirst(1).once('value')
          .then(res => res.exists());              
          if(hasRestaurant)
          {
              let r=[];
              let countlist=0;
          try {    
          // firebase.auth().signInAnonymously().then((response)=>{           
          firebase.database().ref("CreatedTokens").child(localStorage.getItem('walletAddress')).on("value", (data) => {          
              if (data) {  
                  try{
                  let datavar=data.val()
                  console.log("datascheck1",datavar);
                  Object.keys(datavar).map((m)=>{
                    console.log("datascheck",datavar[m]);
                    countlist=countlist +1;
                    r.push({
                      keyId:datavar[m].keyId,
                      Owner:datavar[m].Owner,
                      TokenAddress:datavar[m].TokenAddress,
                      Tokenname:datavar[m].Tokenname,
                      TokenSymbol:datavar[m].TokenSymbol,
                      Totalsupply:datavar[m].Totalsupply,
                      Minted:datavar[m].Minted,
                      Burned:datavar[m].Burned
                    })                


                  })
                 
                
              }   catch(e){                      
              }                 
              }
              else{
              setgetIProfile([""]);  
              }
              r.reverse();
              setgetIProfile(r);
              //setpagesCountlist(countlist);

          });         
          // })         
          } catch (error) {            
          }                
          }else{
              setgetIProfile([""]);  
          }  
          // })          
      }        
  }    
  useEffect(()=>{dbcallProfile()},[])

   


 






const copyCheck = () =>
{
    navigator.clipboard.writeText(x.MultisigAddress);
    handleCopied() 
}


   

return(
   
                
      
                        
          
          <>
{/*              
                                <Row>
              <Col xs={6} className="mb-3">
                <label htmlFor="name">Transfer To</label>
                <input placeholder="Receiver Address" type="text" className="form-control form-control-reset" id="name" onChange={event => setAddress1( event.target.value)}/>                
              </Col>
             
              <Col xs={6} className="mb-3">
                <label htmlFor="address">Amount</label>
                <input required placeholder="Amount" type="text" className="form-control form-control-reset" id="address" onChange={event => setamount( event.target.value)}/>                
              </Col>
             
            </Row>  */}
            {/* <ButtonLoad loading={loader} className='w-100 mb-3' onClick={()=>Transfer(amount)}>Transfer</ButtonLoad>                     */}
                                <div className="table-group-head">
                                  
                                <div className="table-group-tr">
                                         {/* {console.log("a.from",a.from)}  */}
                                       
                                     <div className="table-group-th">
                                    
                     
                    
         
                                          <div className="d-flex">
                                           
                                              
                                              <div className="pl-2 pr-2">
                                                  
                                                  {
                                                     
                                                          
                                                      <h6 style={{ fontWeight: "600" }}>{parseInt(y)+1}</h6>
                                                      
                                                  }
                                                  {/* <h6 style={{ fontWeight: "600" }}></h6> */}
                                                  <div
                                                      className="mb-0 text-muted"
                                                      style={{ fontSize: "12px", fontWeight: "600" }}
                                                  >
                                                      {}
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                      <div className="table-group-th">
                                          <div className="d-flex justify-content-left">
                                              <div className="table-group-td">
                                              <a style={{cursor:"pointer"}} className='mb-3 text-white d-flex align-items-center btn-link' onClick={() => copyCheck()}>
                            {x.TokenAddress.substring(0, 7)}...{x.TokenAddress.substring(x.TokenAddress.length -4, (x.TokenAddress).length)} <svg class="white me-2" width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z"></path></svg>
                            <a className='mb-3  text-white d-flex align-items-center btn-link' href={"https://testnet.bscscan.com/address/" + x.TokenAddress} target="_blank" rel="noreferer">
                            <svg class="white me-2" width="16" height="16" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.8333 15.8333H4.16667V4.16667H10V2.5H4.16667C3.24167 2.5 2.5 3.25 2.5 4.16667V15.8333C2.5 16.75 3.24167 17.5 4.16667 17.5H15.8333C16.75 17.5 17.5 16.75 17.5 15.8333V10H15.8333V15.8333ZM11.6667 2.5V4.16667H14.6583L6.46667 12.3583L7.64167 13.5333L15.8333 5.34167V8.33333H17.5V2.5H11.6667Z"></path></svg>
                           
                        </a>
                        </a>
                                              <h6 style={{cursor:"pointer", fontWeight: "600" }} ></h6>
                                                
                                              </div>
                                          </div>
                                         
                                      </div>

                                      <div className="table-group-th">
                                          <div className="d-flex justify-content-left">
                                              <div className="table-group-td">
     {x.Owner ?(<>
     
       <h6 style={{cursor:"pointer", fontWeight: "600", color: '#00d395' }} >{x.Tokenname}</h6>
     
     </>):(<>
     
       <h6 style={{ fontWeight: "600", color: '#00d395' }}>Name</h6>
     
     
     </>)}
     
                                             
    
                                                 
                                              </div>
                                          </div>
                                      </div>
                                     
                                      <div className="table-group-td" style={{ verticalAlign: "middle" }}>
                                        
                                      {x.Owner ?(<>
     
     <h6 style={{cursor:"pointer", fontWeight: "600", color: '#00d395' }} >{x.TokenSymbol}</h6>
   
   </>):(<>
   
     <h6 style={{ fontWeight: "600", color: '#00d395' }}>symbol</h6>
   
   
   </>)}
                                      </div>
                                      <div className="table-group-th">
                                          <div className="d-flex justify-content-left">
                                              <div className=" align-items-baseline">
                                               
                                              <center><h5> <strong>{Balance ? parseFloat(Balance/1000000000000000000) : "0.00"}</strong></h5></center><br/>
                                                  
                                                  
                                                  
                                                      
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                      </div>
     
     
                                
                                </>
                
          
             
                    
)
}

export default Tokensredirect;