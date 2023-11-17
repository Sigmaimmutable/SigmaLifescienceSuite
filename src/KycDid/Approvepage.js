/* global AlgoSigner */
import React,{ useEffect ,useState} from "react";
import {  Col, Container, InputGroup, Row,Button } from "reactstrap";
import { useHistory,Link } from "react-router-dom";
//import Layout from '../components/Layouts/Layout';
//import Layout from '../components/Dashboard/Layout';
//import Layout from '../components/DashboardNew/Layout';
import fireDb from '../NFTFolder/firebase'
import Layout from '../components/DashboardNew/LayoutT';
import { ToastContainer, Zoom, toast} from 'react-toastify';
import ButtonLoad from 'react-bootstrap-button-loader';
import config from '../NFTFolder/config.json'
import node from '../components/DashboardNew/nodeapi.json';
import {abi} from  "./ERCAbi";
import {ercdata} from  "./ERCdata";
import web3 from "../web3";
import firebase from '../NFTFolder/firebase';
//const bs58 = require("bs58");

 
const Approvepage = () => {  
  useEffect(() => {
    document.title = "ELEMENT | Freeze"
}, [])
         
    const[loader, setLoader] = useState(false);
    const handleShowLoad = () => setLoader(true);
    const handleHideLoad = () => setLoader(false); 

    const[loader2, setLoader2] = useState(false);
    const handleShowLoad2 = () => setLoader2(true);
    const handleHideLoad2 = () => setLoader2(false); 

    const[getIProfile,setgetIProfile]=useState([""]);
    console.log("getIProfile",getIProfile);
    const[assetID,setDecimals]=useState("");

    const[managerAddress,setManagerAddress]=useState("");
    const [selectValue311,setSelectValue311] = useState("");
    
    console.log("selected",selectValue311);
             
    const[pauser, setpauser] = useState(false);
    console.log("pauser",pauser);
    useEffect(() => {
      getmultisig();
    }, [pauser])
    const handleChange311 = (e)=>{
      setSelectValue311(e.target.value)
  }
    const toastDiv = (txId) =>
    (
    <div>
         <p> Transaction is successful &nbsp;<a style={{color:'#133ac6'}} href={txId} target="_blank" rel="noreferrer"><br/><p style={{fontWeight: 'bold'}}>View in Bscscan <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M11.7176 3.97604L1.69366 14L0.046875 12.3532L10.0697 2.32926H1.23596V0H14.0469V12.8109H11.7176V3.97604Z" fill="#133ac6"/>
          </svg></p></a></p>  
     </div>
    );

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


 
  
    const getmultisig =async()=>{   
      let TokenAddress;
      if(selectValue311 === null || selectValue311 === undefined || selectValue311==="" ){
        // toast.error(`Please Select Token`);
        console.log("checkselect",selectValue311);
     
      }
      else{
        console.log("if")
      TokenAddress = new web3.eth.Contract(abi, selectValue311);
      console.log("createdToken",TokenAddress)
      let accounts = await  web3.eth.getAccounts();
      let pausercheck = await TokenAddress.methods.hasRole("0x65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a",accounts[0]).call();
      console.log("pauser1",pausercheck)
     setpauser(pausercheck);
    
      }
    }


   


     
 
  
   


    const freezeAsset = async(value) => {
      if(localStorage.getItem("walletAddress")>0){
        let TokenAddress;
        if(selectValue311 === null || selectValue311 === undefined || selectValue311==="" ){
          toast.error(`Please Select Token`);
        }
        else{
          console.log("checking11");

           TokenAddress = new web3.eth.Contract(abi, selectValue311 );
        
           console.log("checking12");
          // handleShowLoadParticipate();
          // handleCloseDonate();
          //const Launchpadcontract = new web3.eth.Contract(abi, address);
         let accounts = await  web3.eth.getAccounts();
        //  var amount1=value;
        //  let amount2=amount1*1000000;
        //  let amount=amount2+"000000000000";
     
        let pausercheck = await TokenAddress.methods.hasRole("0x65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a",accounts[0]).call();
        console.log("pauser1",pausercheck)
      
         if(pausercheck===false){
    
          toast.error("caller don't have pauser role");
          // handleHideLoadParticipate();
      }
         else {
          console.log("checking1");
          await TokenAddress.methods.pause().send({from:accounts[0]}).
          on('transactionHash',function(hash){      

          
           let id = "https://testnet.bscscan.com/tx/" + hash;
           toast.success(toastDiv(id));
          //  toast.success(`Transaction Success ${hash}`);
           // window.location.reload();
          //  getmultisig();
           })
        



console.log("transfer");
//  getmultisig();

}




        }
 }}
 const unfreezeAsset = async(value) => {
  if(localStorage.getItem("walletAddress")>0){
    let TokenAddress;
    if(selectValue311 === null || selectValue311 === undefined || selectValue311==="" ){
      toast.error(`Please Select Token`);
    }
    else{
      console.log("checking11");

       TokenAddress = new web3.eth.Contract(abi, selectValue311 );
    
       console.log("checking12");
      // handleShowLoadParticipate();
      // handleCloseDonate();
      //const Launchpadcontract = new web3.eth.Contract(abi, address);
     let accounts = await  web3.eth.getAccounts();
    //  var amount1=value;
    //  let amount2=amount1*1000000;
    //  let amount=amount2+"000000000000";
    let unpausercheck = await TokenAddress.methods.paused().call();
    console.log("pauser1",unpausercheck)
  
     if(unpausercheck===false){

      toast.error("Not Paused");
      // handleHideLoadParticipate();
  }
     else {
      console.log("checking1");
      await  TokenAddress.methods.unpause().send({from:accounts[0]}).
      on('transactionHash',function(hash){      

      
       let id = "https://testnet.bscscan.com/tx/" + hash;
       toast.success(toastDiv(id));
      //  toast.success(`Transaction Success ${hash}`);
       // window.location.reload();
      //  getmultisig();
       })
    



console.log("transfer");
// getmultisig();

}




    }
}}
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
          <form>

            <Row>
            <center>    
            <Col xs={6} className="mb-3">
              <label for="cars">Tokens:</label>
              <br/>
              {getIProfile === null || getIProfile === undefined || getIProfile === "" ? 
              (<>
              
              </>) : 
              (<>

{getIProfile[0] === null || getIProfile[0] === undefined || getIProfile[0] === "" ? 
              (<>
                 <select name="cars" id="cars" className="form-control form-control-reset" style={{color:'#808080'}}></select>
              </>) : (
              <select name="cars" id="cars" className="form-control form-control-reset" style={{color:'#808080'}}  defaultValue={selectValue311} 
              onChange={handleChange311}>
                                <option className="form-control form-control-reset" >Please Select a Token</option>

                {getIProfile.map((x) => 
                <>
                <option className="form-control form-control-reset" value={x.TokenAddress}> {x.TokenAddress.substring(0, 14)}...{x.TokenAddress.substring(x.TokenAddress.length -4, (x.TokenAddress).length)} &nbsp;&nbsp; {x.Tokenname}</option>
                </> )}
              </select>)}
              </>)}
              </Col>
              </center>
              {/* <Col xs={6} className="mb-3">
                <label htmlFor="citizenship">Freeze Target Address:</label>
                <input placeholder="Enter Freeze Target Address" type="text"  id="citizenship" className="form-control form-control-reset" onChange={event => setManagerAddress( event.target.value)}/>                
              </Col> */}
            </Row>  
            <center>          
               <ButtonLoad loading={loader} className='w-25 btn-blue mb-3' onClick={()=>{freezeAsset()}}>Freeze</ButtonLoad> &nbsp; (OR) &nbsp;
               <ButtonLoad loading={loader2} className='w-25 mb-3 btn-blue float-right' onClick={()=>{unfreezeAsset()}}>UnFreeze</ButtonLoad>            
            </center>
          </form>       
          </Container>
      )}        
    </Layout>                      
)
}
export default Approvepage;