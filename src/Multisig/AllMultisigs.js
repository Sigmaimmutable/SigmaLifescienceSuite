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
import Multisigredirect from "./Allmultisigredirect";

const Allmultisigs = () => {  
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
    const[getIProfile,setgetIProfile]=useState([""]);
    console.log("valuemulti",getIProfile);
    const[transactioncount,settransactioncount]=useState("");
    console.log("transacount1",transactioncount);
    const[owner3,setOwner3]=useState([]);
    const[pagesCountlist,setpagesCountlist]= useState("");

    const [pageNumber, setPageNumber] = useState(0);
    const [pagesVisited, setpagesVisited] = useState(0);
    const[pageSize,setPageSize]=useState(5);
    
    console.log("pagesize",pageSize);
    const usersPerPage = 5;

 const dbcallProfile=async()=>{            
      if(localStorage.getItem("walletAddress")  === null || localStorage.getItem("walletAddress")  === "" || localStorage.getItem("walletAddress")  === " " || localStorage.getItem("wallet") === undefined || localStorage.getItem("walletAddress") === ''){
      }
      else{
          // firebase.auth().signInAnonymously().then(async(response)=>{           
          const hasRestaurant = await firebase.database()
          .ref(`multisigtable/${localStorage.getItem('walletAddress')}`)
          .orderByKey().limitToFirst(1).once('value')
          .then(res => res.exists());              
          if(hasRestaurant)
          {
              let r=[];
          try {    
          // firebase.auth().signInAnonymously().then((response)=>{           
          firebase.database().ref("multisigtable").child(localStorage.getItem('walletAddress')).on("value", (data) => {          
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
              setgetIProfile([""]);  
              }
              r.reverse();
              setgetIProfile(r);

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



    useEffect(() => {
      getmultisig();
    }, [])
     
  const getmultisig =async()=>{   
    let Multisigcontract;
    if(localStorage.getItem('multisigaddress') === null || localStorage.getItem('multisigaddress') === undefined ){
      // toast.error(`Create Multisig first`);
    }
    else{
    let multisigaddress = localStorage.getItem("multisigaddress");
    console.log("multisigaddress",multisigaddress)
    Multisigcontract = new web3.eth.Contract(abi, multisigaddress);
     console.log("multisigcheck",Multisigcontract)
    setCreatedmultisig(localStorage.getItem("multisigaddress"));
   
    setETHBalance(await web3.eth.getBalance(localStorage.getItem("multisigaddress")));
    console.log("owner1",Multisigcontract.methods.getOwners().call());
    setOwner1(await Multisigcontract.methods.getOwners().call());
    settransactioncount(await Multisigcontract.methods.getTransactionCount().call())
    console.log("transacount",await Multisigcontract.methods.getTransactionCount().call());
    console.log("ethbalance",ethBalance);
    let transactioncount =await Multisigcontract.methods.getTransactionCount().call();
       transactioncount.map((r,i)=>{
        console.log("trans",i);
       })

    }
  }
 
    
    const Transfer = async(value) => {
      if(localStorage.getItem("walletAddress")>0){
        let Multisigcontract;
        if(localStorage.getItem('multisigaddress') === null || localStorage.getItem('multisigaddress') === undefined ){
          toast.error(`Create Multisig first`);
        }
        else{
           Multisigcontract = new web3.eth.Contract(abi, localStorage.getItem('multisigaddress'));
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
           toast.success(toastDiv(id));
          //  toast.success(`Transaction Success ${hash}`);
           // window.location.reload();
           getmultisig();
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
   

 
 
  
    const changePage = ( selected ) => {
      setPageNumber(selected);
      console.log("pgv23",pagesVisited,pagesCountlist);
      if((pagesVisited + 5)  >= pagesCountlist){

      }else{
       setpagesVisited((pagesVisited +  selected));
       console.log("pgv2",selected,usersPerPage);
      }
      
    };
    const pagedecrease = ( selected ) => {
       // setpagesCount(Math.ceil(countlist / usersPerPage));
       console.log("data",pagesVisited)
       if((pagesVisited) < usersPerPage){
           // setpagesVisited(selected * usersPerPage);   
       }else{
           setpagesVisited((pagesVisited - selected));

       }
      
     
   };
   const decrementSize=()=>{
     if(pageSize >= 10){
     setPageSize(pageSize-2)
     }        
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
    <Layout>
      <ToastContainer position='bottom-right' draggable = {false} transition={Zoom} autoClose={4000} closeOnClick = {false}/>
      {localStorage.getItem('walletAddress') === null || localStorage.getItem('walletAddress') === undefined || localStorage.getItem('walletAddress') === "" ? (
        <Container fluid>           
        <Row className="justify-content-center">
            <Col xl="8" lg="8" md="10" sm="12">
                      <center>
                    <h4 className="mb-3">Please connect your wallet</h4>                                                                                                        
                      </center>
            </Col>
        </Row>
        </Container>          
      ):( 
          <Container fluid="md">                  
          
          <Container fluid>
                <Card className="card-dash border-0 mb-4">
                <h2 className="h3 text-uppercase mb-40">Multisig Addresses</h2>
                   
                    <div className="table-group-outer table-group-lg">       
                       


                        {
                           
                         localStorage.getItem("walletAddress")===null|| localStorage.getItem("walletAddress")===""? (
                          
                           <>  
                   <div className="table-group-head">
                        <div className="table-group-tr">
                        <div className="table-group-th">s.no</div>
                               <div className="table-group-th">Multisig Address</div>
                               <div className="table-group-th">Owners</div>
                               <div className="table-group-th">Status</div>
                               <div className="table-group-th">Execute Transaction</div>
                               {/* <div className="table-group-th">Transaction hash/timestamp</div> */}
                               </div>
                           </div>
                           </>
                       ):(<>
                      
                
                     
                        <div className="table-group-head">
                        <div className="table-group-tr">
                               <div className="table-group-th">s.no</div>
                               <div className="table-group-th">Multisig Address</div>
                               <div className="table-group-th">Owners</div>
                               <div className="table-group-th">Balance</div>
                               <div className="table-group-th">send MATIC</div>
                               </div>
                           </div>
                          { getIProfile === null || getIProfile ==="" || getIProfile ===undefined ?(<>
                           
                           
                           
                           </>):(<>
                            { getIProfile[0] === null || getIProfile[0] ==="" || getIProfile[0] ===undefined ?(<>
                           
                           
                           
                           </>):(<>
                             {getIProfile.map((x,y)=>{
                               if(y<pageSize)
                               return(
                               <Multisigredirect x={x} y={y}/>
                               )

                             })
                             }
                           
                           
                           
                           
                           </>)}
                           
                           
                           
                           
                           </>)}
                          
                       
                         


                      
                      </>)
                  }
                          
                          

                      
                            
                    
                        
                          </div>
                    
                
                    
            
     
                          {getIProfile.length <= 5 ? (
                                <></>
                            ):(
                                <div className='pagination justify-content-end flex-wrap d-flex align-items-center'>                              
                                <Button variant='page' className="my-1" onClick={()=>{decrementSize()}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#fff" class="bi m-0 bi-chevron-left" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                                    </svg>
                                </Button>
                                <Button variant='page' className="my-1" onClick={()=>{setPageSize(pageSize+2)}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#fff" class="bi m-0 bi-chevron-right" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                                </Button>
                            </div>

                            
                            ) }



     
                </Card>
              
                
            </Container>
                
          </Container>
      )}        
    </Layout>                      
)
}

export default Allmultisigs;