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
import escrow from '../KycDid/escrow'
import node from '../components/DashboardNew/nodeapi.json';
import {abi} from  "./multisigabi";
import web3 from "../web3";
import { updatealgobalance } from "../components/formula";
import { ListGroup } from "react-bootstrap";
import firebase from '../NFTFolder/firebase';

const Allkycredirect = ({x,y}) => {  
  useEffect(() => {
    document.title = "ELEMENT | Creator"
}, [])
         console.log("xvalue",x)
    const[loader, setLoader] = useState(false);
    const handleShowLoad = () => setLoader(true);
    const handleHideLoad = () => setLoader(false); 

    const[address1,setAddress1]=useState("");
    const[amount,setamount]=useState("");
    const[address3,setAddress3]=useState("");
    const [ethBalance, setETHBalance] = useState("");
    const[createdmultisig, setCreatedmultisig] = useState("");
    const[owner1,setOwner1]=useState([]);
    const[getIProfile3,setgetIProfile3]=useState([""]);
    const[getIProfile2,setgetIProfile2]=useState([""]);
    const handleCopied = () =>{setCopyButton(true)};
    const [copyButton, setCopyButton] = useState(false);
    console.log("valuemulti2",getIProfile2);
    
    console.log("valuemulti3",getIProfile3);
    console.log("yvalue",y);
    console.log("x.confirm",x.executedstatus);
    const[transactioncount,settransactioncount]=useState("");
    console.log("transacount1",transactioncount);
    const[owner3,setOwner3]=useState([]);

    const dbcallProfile2=async()=>{            
      if(x.walletaddress === null || x.walletaddress  === "" || x.walletaddress  === " " || x.walletaddress === undefined || x.walletaddress === ''){
      }
      else{
          // firebase.auth().signInAnonymously().then(async(response)=>{           
          const hasRestaurant = await firebase.database()
          .ref(`kyctable/${x.walletaddress}`)
          .orderByKey().limitToFirst(1).once('value')
          .then(res => res.exists());              
          if(hasRestaurant)
          {
              let r=[];
          try {    
          // firebase.auth().signInAnonymously().then((response)=>{           
          firebase.database().ref("kyctable").child(x.walletaddress).on("value", (data) => {          
              if (data) {  
                  try{
                  let datavar=data.val()
                  Object.keys(datavar).map((m)=>{
                    console.log("datascheck",datavar[m]);
                    r.push({
                      keyId:datavar[m].keyId,
                      walletaddress:datavar[m].walletaddress,
                      ipfslink:datavar[m].ipfslink,
                      proofType:datavar[m].proofType,
                    })                


                  })
                 
                
              }   catch(e){                      
              }                 
              }
              else{
              setgetIProfile2([""]);  
              }
              setgetIProfile2(r);

          });         
          // })         
          } catch (error) {            
          }                
          }else{
              setgetIProfile2([""]);  
          }  
          // })          
      }        
  }    
  useEffect(()=>{dbcallProfile2()},[])






    // useEffect(() => {
    //   getmultisig();
    // }, [])
     
 
   


 






const copyCheck = () =>
{
    navigator.clipboard.writeText(x.MultisigAddress);
    handleCopied() 
}


    const toastDiv = (txId) =>
    (
    <div>
         <p> Transaction is successful &nbsp;<a style={{color:'#133ac6'}} href={txId} target="_blank" rel="noreferrer"><br/><p style={{fontWeight: 'bold'}}>View in Bscscan <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M11.7176 3.97604L1.69366 14L0.046875 12.3532L10.0697 2.32926H1.23596V0H14.0469V12.8109H11.7176V3.97604Z" fill="#133ac6"/>
          </svg></p></a></p>  
     </div>
    );


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
                                                  {/* <h6 style={{ fontWeight: "600" }}>hhh</h6> */}
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
     {x.walletaddress ?(<>
     
       <h6 style={{cursor:"pointer", fontWeight: "600", color: '#00d395' }} >{ x.walletaddress.substring(0, 7)}...{x.walletaddress.substring((x.walletaddress).length -4, x.walletaddress.length)}</h6>
     
     </>):(<>
     
       <h6 style={{ fontWeight: "600", color: '#00d395' }}>0x00</h6>
     
     
     </>)}
     
                                             
                                             
   
                                                 
                                              </div>
                                          </div>
                                      </div>



    <div className="table-group-th">
                                          <div className="d-flex justify-content-left">
                                              <div className="table-group-td">
     {x.ipfslink ?(<>
     
      <img src={x.ipfslink} alt="image" className='img-fluid' />     
     </>):(<>
     
       <h6 style={{ fontWeight: "600", color: '#00d395' }}>0x00</h6>
     
     
     </>)}
     
                                             
                                             
   
                                                 
                                              </div>
                                          </div>
                                      </div>
                                     
                                   
                                  
                                      </div>
     
     
                                
                                </div>
                                </>
                
          
             
                    
)
}

export default Allkycredirect;