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

const Transactionredirect = ({x,y}) => {  
  useEffect(() => {
    document.title = "Sigma | Creator"
}, [])
         
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
      if(x.Owner2 === null || x.Owner2  === "" || x.Owner2  === " " || x.Owner2 === undefined || x.Owner2 === ''){
      }
      else{
          // firebase.auth().signInAnonymously().then(async(response)=>{           
          const hasRestaurant = await firebase.database()
          .ref(`multisigtable/${x.Owner2}`)
          .orderByKey().limitToFirst(1).once('value')
          .then(res => res.exists());              
          if(hasRestaurant)
          {
              let r=[];
          try {    
          // firebase.auth().signInAnonymously().then((response)=>{           
          firebase.database().ref("multisigtable").child(x.Owner2).on("value", (data) => {          
              if (data) {  
                  try{
                  let datavar=data.val()
                  Object.keys(datavar).map((m)=>{
                    console.log("datascheck",datavar[m]);
                    r.push({
                      keyId:datavar[m].keyId,
                      Owner1:datavar[m].Owner1,
                      Owner2:datavar[m].Owner2,
                      Owner3:datavar[m].Owner3,
                      MultisigAddress:datavar[m].MultisigAddress,
                      threshhold:datavar[m].threshhold,
                      transactioncount:datavar[m].transactioncount,
                      numConfirmations:datavar[m].numConfirmations,
                      executedstatus:datavar[m].executedstatus,
                      extra1:datavar[m].extra1,
                      extra2:datavar[m].extra2,
                      confirmed:datavar[m].confirmed
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


  const dbcallProfile3=async()=>{            
    if(x.Owner3 === null || x.Owner3 === "" || x.Owner3  === " " || x.Owner3 === undefined || x.Owner3 === ''){
    }
    else{
        // firebase.auth().signInAnonymously().then(async(response)=>{           
        const hasRestaurant = await firebase.database()
        .ref(`multisigtable/${x.Owner3}`)
        .orderByKey().limitToFirst(1).once('value')
        .then(res => res.exists());              
        if(hasRestaurant)
        {
            let r=[];
        try {    
        // firebase.auth().signInAnonymously().then((response)=>{           
        firebase.database().ref("multisigtable").child(x.Owner3).on("value", (data) => {          
            if (data) {  
                try{
                let datavar=data.val()
                Object.keys(datavar).map((m)=>{
                  console.log("datascheck",datavar[m]);
                  r.push({
                    keyId:datavar[m].keyId,
                    Owner1:datavar[m].Owner1,
                    Owner2:datavar[m].Owner2,
                    Owner3:datavar[m].Owner3,
                    MultisigAddress:datavar[m].MultisigAddress,
                    threshhold:datavar[m].threshhold,
                    transactioncount:datavar[m].transactioncount,
                    numConfirmations:datavar[m].numConfirmations,
                    executedstatus:datavar[m].executedstatus,
                    extra1:datavar[m].extra1,
                    extra2:datavar[m].extra2,
                    confirmed:datavar[m].confirmed
                  })                


                })
               
              
            }   catch(e){                      
            }                 
            }
            else{
            setgetIProfile3([""]);  
            }
            setgetIProfile3(r);

        });         
        // })         
        } catch (error) {            
        }                
        }else{
            setgetIProfile3([""]);  
        }  
        // })          
    }        
}    
useEffect(()=>{dbcallProfile3()},[])



    useEffect(() => {
      getmultisig();
    }, [])
     
  const getmultisig =async()=>{   
    let Multisigcontract;
    if(x.MultisigAddress === null || x.MultisigAddress === undefined ){
      // toast.error(`Create Multisig first`);
    }
    else{
    let multisigaddress = x.MultisigAddress;
    console.log("multisigaddress",multisigaddress)
    Multisigcontract = new web3.eth.Contract(abi, x.MultisigAddress);
     console.log("multisigcheck",Multisigcontract)
    setCreatedmultisig(x.MultisigAddress);
   
    setETHBalance(await web3.eth.getBalance(x.MultisigAddress));
    console.log("owner1",Multisigcontract.methods.getOwners().call());
    setOwner1(await Multisigcontract.methods.getOwners().call());
    settransactioncount(await Multisigcontract.methods.getTransactionCount().call())
    console.log("transacount",await Multisigcontract.methods.getTransactionCount().call());
    console.log("ethbalance",ethBalance);
    // let transactioncount =await Multisigcontract.methods.getTransactionCount().call();
    //    transactioncount.map((r,i)=>{
    //     console.log("trans",i);
    //    })

    }
  }
 
    
    const Transfer = async(value) => {
      if(x.MultisigAddress>0){
        let Multisigcontract;
        if(x.MultisigAddress === null || x.MultisigAddress === undefined ){
          toast.error(`Create Multisig first`);
        }
        else{
           Multisigcontract = new web3.eth.Contract(abi, x.MultisigAddress);
        }
       
          // handleShowLoadParticipate();
          // handleCloseDonate();
          //const Launchpadcontract = new web3.eth.Contract(abi, address);
         let accounts = await  web3.eth.getAccounts();
         var amount1=value;
         let amount2=amount1*1000000;
         let amount=amount2+"000000000000";
      // let amount2=amount1*1000;
      // let amount=amount2+"000000";
      //    console.log("Amount",amount);
         //await Launchpadcontract.methods.click(web3.utils.toBN(amount)).send({from:accounts[0]});
         if(value===0||value==="0"||value===null||value===""||value <= 0){
    
          toast.error("Please enter an amount greater than 0");
          // handleHideLoadParticipate();
      }
         else if(parseInt(value)<=parseInt(parseFloat(ethBalance)/1000000000000000000)){
          await Multisigcontract.methods.submitTransaction(address1,web3.utils.toWei(value, 'ether'),"0x00").send({from:accounts[0]}).
          on('transactionHash',function(hash){      
          //  console.log("hashget",hash)                                                
          //  handleHideLoadParticipate();
          
           let id = "https://testnet.bscscan.com/tx/" + hash;
          
          
           firebase.database().ref(`multisigtable/${x.Owner1}`).child(x.keyId).update({
                      keyId:x.keyId,
                      Owner1:x.Owner1,
                      Owner2:x.Owner2,
                      Owner3:x.Owner3,
                      MultisigAddress:x.MultisigAddress,
                      threshhold:x.threshhold,
                      transactioncount:(parseInt(x.transactioncount)+1),
                      numConfirmations:x.numConfirmations,
                      executedstatus:x.executedstatus,
                      extra1:value,
                      extra2:address1,
                      confirmed:false
        }).then(()=>{  
          firebase.database().ref(`multisigtable/${x.Owner2}`).child(x.keyId).update({
            keyId:x.keyId,
            Owner1:x.Owner1,
            Owner2:x.Owner2,
            Owner3:x.Owner3,
            MultisigAddress:x.MultisigAddress,
            threshhold:x.threshhold,
            transactioncount:(parseInt(x.transactioncount)+1),
            numConfirmations:x.numConfirmations,
            executedstatus:x.executedstatus,
            extra1:value,
            extra2:address1,
            confirmed:false
}).then(()=>{  
  firebase.database().ref(`multisigtable/${x.Owner3}`).child(x.keyId).update({
    keyId:x.keyId,
    Owner1:x.Owner1,
    Owner2:x.Owner2,
    Owner3:x.Owner3,
    MultisigAddress:x.MultisigAddress,
    threshhold:x.threshhold,
    transactioncount:(parseInt(x.transactioncount)+1),
    numConfirmations:x.numConfirmations,
    executedstatus:x.executedstatus,
    extra1:value,
    extra2:address1,
    confirmed:false
}).then(()=>{  
    console.log("Updated")
    toast.success(toastDiv(id));
    getmultisig();
})

})

        })

        
           


           })
          console.log("transfer");
           getmultisig();
 
         }else{
          toast.error(`You Are  Trying To Deposit More Than Your Wallet Balance`);
          // handleHideLoadParticipate();
         }
      

      }
      else{
          toast.warn(`Please Connect Your Wallet`);
          // handleHideLoadParticipate();
      }


    
    }
   

 const Confirm =async()=>{
  let accounts = await  web3.eth.getAccounts();
  if(x.MultisigAddress>0){
    let Multisigcontract;
    if(x.MultisigAddress === null || x.MultisigAddress === undefined ){
      toast.error(`Create Multisig first`);
    }
    else{
       Multisigcontract = new web3.eth.Contract(abi, x.MultisigAddress);
    }
    await Multisigcontract.methods.confirmTransaction((parseInt(x.transactioncount)-1)).send({from:accounts[0]}).
    on('transactionHash',function(hash){      
    //  console.log("hashget",hash)                                                
    //  handleHideLoadParticipate();
    


     let id = "https://testnet.bscscan.com/tx/" + hash;

     firebase.database().ref(`multisigtable/${accounts[0]}`).child(x.keyId).update({
      keyId:x.keyId,
      Owner1:x.Owner1,
      Owner2:x.Owner2,
      Owner3:x.Owner3,
      MultisigAddress:x.MultisigAddress,
      threshhold:x.threshhold,
      transactioncount:x.transactioncount,
      numConfirmations:(parseInt(x.numConfirmations)+1),
      executedstatus:x.executedstatus,
      extra1:x.extra1,
      extra2:x.extra2,
      confirmed:true
}).then(()=>{  

  toast.success(toastDiv(id));
})



   

  })
}}
 



const Execute =async()=>{
  let accounts = await  web3.eth.getAccounts();
  if(x.MultisigAddress>0){
    let Multisigcontract;
    if(x.MultisigAddress === null || x.MultisigAddress === undefined ){
      toast.error(`Create Multisig first`);
    }
    else{
       Multisigcontract = new web3.eth.Contract(abi, x.MultisigAddress);
    }
    await Multisigcontract.methods.executeTransaction((parseInt(x.transactioncount)-1)).send({from:accounts[0]}).
    on('transactionHash',function(hash){      
    //  console.log("hashget",hash)                                                
    //  handleHideLoadParticipate();
    


     let id = "https://testnet.bscscan.com/tx/" + hash;

     firebase.database().ref(`multisigtable/${accounts[0]}`).child(x.keyId).update({
      keyId:x.keyId,
      Owner1:x.Owner1,
      Owner2:x.Owner2,
      Owner3:x.Owner3,
      MultisigAddress:x.MultisigAddress,
      threshhold:x.threshhold,
      transactioncount:x.transactioncount,
      numConfirmations:x.numConfirmations,
      executedstatus:true,
      extra1:x.extra1,
      extra2:x.extra2,
      confirmed:x.confirmed
}).then(()=>{  

  toast.success(toastDiv(id));
})



   

  })
}}


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
             
                                <Row>
            <center><h5>Balance: <strong>{ethBalance ? parseFloat(ethBalance/1000000000000000000) : "0.00"}</strong></h5></center><br/>
              <Col xs={6} className="mb-3">
                <label htmlFor="name">Transfer To</label>
                <input placeholder="Receiver Address" type="text" className="form-control form-control-reset" id="name" onChange={event => setAddress1( event.target.value)}/>                
              </Col>
              {/* <Col xs={6} className="mb-3">
                <label htmlFor="dob">Address 2:</label>
                <input placeholder="Address 2" type="text" className="form-control form-control-reset" id="dob" style={{color:'#808080'}} onChange={event => setAddress2( event.target.value)}/>                
              </Col> */}
              <Col xs={6} className="mb-3">
                <label htmlFor="address">Amount</label>
                <input required placeholder="Amount" type="text" className="form-control form-control-reset" id="address" onChange={event => setamount( event.target.value)}/>                
              </Col>
             
            </Row> 
            <ButtonLoad loading={loader} className='w-100 btn-blue mb-3' onClick={()=>Transfer(amount)}>Transfer</ButtonLoad>                    
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
                            {x.MultisigAddress.substring(0, 7)}...{x.MultisigAddress.substring(x.MultisigAddress.length -4, (x.MultisigAddress).length)} <svg class="white me-2" width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z"></path></svg>
                            <a className='mb-3  text-white d-flex align-items-center btn-link' href={"https://testnet.bscscan.com/address/" + x.MultisigAddress} target="_blank" rel="noreferer">
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
     {x.Owner1 ?(<>
     
       <h6 style={{cursor:"pointer", fontWeight: "600", color: '#00d395' }} >{ x.Owner1.substring(0, 7)}...{x.Owner1.substring((x.Owner1).length -4, x.Owner1.length)}</h6>
     
     </>):(<>
     
       <h6 style={{ fontWeight: "600", color: '#00d395' }}>0x00</h6>
     
     
     </>)}
     
                                             
     {x.Owner2?(<>
     
     <h6 style={{cursor:"pointer", fontWeight: "600", color: '#00d395' }} >{ x.Owner2.substring(0, 7)}...{x.Owner2.substring((x.Owner2).length -4, x.Owner2.length)}</h6>
     
     </>):(<>
     
     <h6 style={{ fontWeight: "600", color: '#00d395' }}>0x00</h6>
     
     
     </>)}                                            
     {x.Owner3 ?(<>
     
     <h6 style={{cursor:"pointer", fontWeight: "600", color: '#00d395' }} >{ x.Owner3.substring(0, 7)}...{x.Owner3.substring((x.Owner3).length -4, x.Owner3.length)}</h6>
     
     </>):(<>
     
     <h6 style={{ fontWeight: "600", color: '#00d395' }}>0x00</h6>
     
     
     </>)}
                                                 
                                              </div>
                                          </div>
                                      </div>
                                     
                                      <div className="table-group-td" style={{ verticalAlign: "middle" }}>
                                        
                                        {(x.confirmed === false ||x.confirmed === undefined) && x.transactioncount===1 ? (<>
                                        <h6 style={{ fontWeight: "600", color: '#00d395' }}><Button onClick={()=>{Confirm()}}>Confirm</Button></h6>
                                       
                                       </>):(<>
                                        <h6 style={{ fontWeight: "600", color: '#00d395' }}><Button disabled>Confirm</Button></h6>
                                       
                                       
                                       </>)} 
                                        
                                       
                                       

                                       {/* {getIProfile2.confirmed === false ||getIProfile2.confirmed === undefined ? (<>
                                        <h6 style={{ fontWeight: "600", color: '#00d395' }}><Button disabled>Confirm</Button></h6>
                                       
                                       </>):(<>
                                       
                                        <h6 style={{ fontWeight: "600", color: '#00d395' }}><Button disabled>Confirmed</Button></h6>
                                       
                                       </>)}  */}
                                       {/* {getIProfile3.confirmed === false || getIProfile3.confirmed === undefined ? (<>
                                        <h6 style={{ fontWeight: "600", color: '#00d395' }}><Button>Confirm</Button></h6>
                                       
                                       </>):(<>
                                       
                                        <h6 style={{ fontWeight: "600", color: '#00d395' }}><Button disabled>Confirmed</Button></h6>
                                       
                                       </>)}  */}
                                     
                                   
                                      </div>
                                      <div className="table-group-th">
                                          <div className="d-flex justify-content-left">
                                              <div className=" align-items-baseline">
                                               
                                                  {/* <Link to={"https://bscscan.com/tx/"+a.hash}> */}
                                                      {/* <h6 style={{ fontWeight: "600" }}>{a.hash.slice(0,32)}</h6> */}
                                                      {/* <Link>
                                                      <h6 style={{cursor:"pointer", fontWeight: "600" }} onClick={e => window.open("https://testnet.bscscan.com/tx/"+a.hash)}>{a.hash.slice(0,32)}</h6>
                                                      </Link> */}
                                                  {/* </Link>                        */}
                                                   <div
                                                      className="mb-0 text-muted"
                                                      style={{ fontSize: "12px", fontWeight: "600" }}
                                                  > 
                                                  {(x.executedstatus === false || x.executedstatus === undefined)?(<>
                                                  
                                                  <h6 style={{ fontWeight: "600", color: '#00d395' }}><Button onClick={()=>{Execute()}}>Execute</Button></h6>
                                                  
                                                  </>):(<>
                                                  
                                                    <h6 style={{ fontWeight: "600", color: '#00d395' }}><Button disabled>Execute</Button></h6>
                                                  
                                                  
                                                  </>)}
                                                      
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                      </div>
     
     
                                
                                </div>


                             
                                </>
                
          
             
                    
)
}

export default Transactionredirect;