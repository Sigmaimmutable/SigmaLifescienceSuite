import React,{ useEffect ,useState} from "react";
import { Link, useHistory } from "react-router-dom";
//import {  Col, Container,Row,Button} from "reactstrap";
import ButtonLoad from 'react-bootstrap-button-loader';
import Compress from "react-image-file-resizer";
import ipfs from "./ipfs";
//import Layout from '../components/Layouts/Layout';
//import Layout from '../components/Dashboard/Layout';
//import Layout from '../components/DashboardNew/Layout';
import Layout from '../components/DashboardNew/LayoutT';
import { ToastContainer, Zoom, toast} from 'react-toastify';
import fire from '../NFTFolder/firebase'
import escrow from '../KycDid/escrow'
import node from '../components/DashboardNew/nodeapi.json';
import MyAlgoConnect from '@randlabs/myalgo-connect';
import { updatealgobalance } from "../components/formula";
import firebase from '../NFTFolder/firebase';
import {abi} from  "./ERCAbi";
import {ercdata} from  "./ERCdata";
import web3 from "../web3";
import PostCardNew from "../components/Snippets/PostCardNew";
import { Button, Card, Form, InputGroup, Col, Container, Dropdown, Modal, OverlayTrigger,Accordion, Row, Tab, Tabs, Tooltip, Alert, Badge } from 'react-bootstrap';

const MintBurnAsset = () => {  
  useEffect(() => {
    document.title = "Sigma | Minter"
}, [])
         
    const[loader, setLoader] = useState(false);
    const handleShowLoad = () => setLoader(true);
    const handleHideLoad = () => setLoader(false); 
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const[loaderBurn, setLoaderBurn] = useState(false);
    const handleShowLoadBurn = () => setLoaderBurn(true);
    const handleHideLoadBurn = () => setLoaderBurn(false); 
    const [show, setShow] = useState(false);
    const[assetID,setAssetID]=useState("");
    const[assetAmount,setAmount]=useState("");
    const[minAlgo, setMinAlgo] = useState("");
    const[mintBal, setMintBal] = useState("");
    const[getIProfile,setgetIProfile]=useState([""]);
    console.log("getIProfile",getIProfile);
    const [option, setOption] = useState("Switch Chain");
    const [chainName, setChainName] = useState(true);
    const handleChainNameB = () => setChainName(false);
    const handleChainNameA = () => setChainName(true); 
    const [selectValue311,setSelectValue311] = useState("");
    console.log("selected",selectValue311);
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
   
    // setETHBalance(await web3.eth.getBalance(localStorage.getItem("multisigaddress")));
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
   

   


    const mintAsset = async(value) => {
      if(localStorage.getItem("walletAddress")>0){
        let TokenAddress;
        if(selectValue311 === null || selectValue311 === undefined || selectValue311==="" ){
          toast.error(`Please Select Token`);
        }
        else{
          console.log("checking11");

           TokenAddress = new web3.eth.Contract(abi, selectValue311 );
           let unpausercheck = await TokenAddress.methods.paused().call();
           console.log("pauser1",unpausercheck)
         
           console.log("checking12");
          // handleShowLoadParticipate();
          // handleCloseDonate();
          //const Launchpadcontract = new web3.eth.Contract(abi, address);
         let accounts = await  web3.eth.getAccounts();
         var amount1=value;
         let amount2=amount1*1000000;
         let amount=amount2+"000000000000";
    
         if(value===0||value==="0"||value===null||value===""||value <= 0){
    
          toast.error("Please enter an amount greater than 0");
          // handleHideLoadParticipate();
      }
      
       else if(unpausercheck===true){
  
        toast.error("minting is Paused");
        // handleHideLoadParticipate();
    }
         else {
          console.log("checking1");
          await TokenAddress.methods.mint(accounts[0],amount).send({from:accounts[0]}).
          on('transactionHash',function(hash){      

          
           let id = "https://testnet.bscscan.com/tx/" + hash;
           toast.success(toastDiv(id));
          //  toast.success(`Transaction Success ${hash}`);
           // window.location.reload();
           getmultisig();
           })
        



console.log("transfer");
 getmultisig();

}




        }
 }}
 const burnAsset = async(value) => {
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
     var amount1=value;
     let amount2=amount1*1000000;
     let amount=amount2+"000000000000";

     if(value===0||value==="0"||value===null||value===""||value <= 0){

      toast.error("Please enter an amount greater than 0");
      // handleHideLoadParticipate();
  }
     else {
      console.log("checking1");
      await TokenAddress.methods.burn(amount).send({from:accounts[0]}).
      on('transactionHash',function(hash){      

      
       let id = "https://testnet.bscscan.com/tx/" + hash;
       toast.success(toastDiv(id));
       toast.success(`Transaction Success ${hash}`);
       // window.location.reload();
       getmultisig();
       })
    



console.log("transfer");
getmultisig();

}




    }
}}

   
  //   const burnAsset = async () =>
  //   {
  //     handleShowLoadBurn();
  //     if (localStorage.getItem("walletAddress") === "")
  //     {
  //         toast.error("Connect your wallet");
  //         handleHideLoadBurn();
  //     }
  //     else{
  //         if(parseFloat(minAlgo) < 2000)
  //         {
  //             toast.error("Your Algo balance is low. Please get more Algos from dispenser.")
  //             handleHideLoadBurn();
  //         }
  //         else
  //         {
  //     try{
  //       let asset = await indexClient.lookupAssetByID(parseInt(assetID)).do();
  //       let decimal = asset['asset']['params']['decimals'];

  //       const params = await algodClient.getTransactionParams().do();

  //       let dataReplace = escrow.replaceAll("Address",localStorage.getItem("walletAddress")).replaceAll("AssetID",parseInt(assetID));
  //       let results = await algodClient.compile(dataReplace).do();
          
  //       let program = new Uint8Array(Buffer.from(results.result, "base64"));
        
  //       let lsig = new algosdk.LogicSigAccount(program);

  //       let sender = localStorage.getItem("walletAddress");
  //       // create unsigned transaction
  //       let transaction1 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
  //         from:sender, 
  //         to: lsig.address(), 
  //         amount: 1000, 
  //         suggestedParams: params
  //       })
        
  //       let sender_es = localStorage.getItem("walletAddress");
  //       let receiver_es = lsig.address();

  //       let transaction2 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
  //         from: sender_es, 
  //         to: receiver_es,  
  //         amount: parseInt(assetAmount) * Math.pow(10, decimal), 
  //         assetIndex: parseInt(assetID), 
  //         suggestedParams: params
  //       }); 
  
  //       const groupID = algosdk.computeGroupID([ transaction1, transaction2]);
  //       const txs = [ transaction1, transaction2 ];
  //       txs[0].group = groupID;
  //       txs[1].group = groupID;
        
  //       const signedTx = await myAlgoWallet.signTransaction([txs[0].toByte(), txs[1].toByte()]);

  //       const response = await algodClient.sendRawTransaction([ signedTx[0].blob, signedTx[1].blob ]).do();

  //       await waitForConfirmation(algodClient, response.txId); 
  //     }  
  //     catch (err) {
  //       toast.error(err.toString());
  //       handleHideLoadBurn();
  //       console.error(err);
  //   }
  //   }
  //   }
  // }

  //   useEffect(async() => {
  //     await minBal();
  // }, [minAlgo]);

    //   const minBal = async () =>
    //   {
    //       let min = await algodClientGet.accountInformation(localStorage.getItem("walletAddress")).do();
    //       // // console.log("minBalanceApi", min['min-balance']);
    //       setMinAlgo(min['amount'] - min['min-balance']);
    //       // console.log("minBalance", minAlgo);
    //   }

    //   useEffect(async() => {
    //     await mintBalance();
    // }, [mintBal, assetID]);
  
        // const mintBalance = async () =>
        // {
        //     let addressDetails = await algodClientGet.accountInformation(localStorage.getItem("walletAddress")).do();
        //     // // console.log("minBalanceApi", min['min-balance']);
        //     setMintBal();
        //     // console.log("minBalance", minAlgo);
        // }

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
            {/* <Col xs={6} className="mb-3">
                <label>Address</label>
                <input placeholder="Unit Name" type="text" className="form-control form-control-reset" style={{color:'#808080'}} onChange={event => setAmount( event.target.value)}/>                
                <Dropdown className="ms-2 me-2">
                        <Dropdown.Toggle variant="grad" className='text-white' id="dropdown-basic">
                            {option}
                        </Dropdown.Toggle>

                        <Dropdown.Menu align="end">
                            <Dropdown.Item className='d-flex align-items-center' onClick={() => handleChainNameA()}>
                                Binance
                            </Dropdown.Item>
                            <Dropdown.Item className='d-flex align-items-center' onClick={() => handleChainNameB()}>
                                Algorand
                            </Dropdown.Item>
                        </Dropdown.Menu>
                </Dropdown>
              </Col> */}
            {/* <Col md={4} xs={6}>
                                        <div className='mb-3'>
                                            <label>Tokens</label>
                                            
                                            <select className="form-control form-control-field border-0"
                                            // defaultValue={selectValue2} 
                                            // onChange={handleChange2}
                                          
                                            >
                                               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="16" height="16" class="ml-2 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                                                <option value="Sports">Sports</option>
                                             
                                            </select>
                                           
                                        </div>
                                    </Col> */}
              
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
                <><option className="form-control form-control-reset" value={x.TokenAddress}> {x.TokenAddress.substring(0, 14)}...{x.TokenAddress.substring(x.TokenAddress.length -4, (x.TokenAddress).length)} &nbsp;&nbsp; {x.Tokenname}</option>
                </> )}
              </select>)}
              </>)}
              </Col>
           <Col xs={6} className="mb-3">
                <label>Amount to Mint:</label>
                <input placeholder="Unit Name" type="text" className="form-control form-control-reset" style={{color:'#808080'}} onChange={event => setAmount( event.target.value)}/>                
              </Col>
            </Row>            
               <ButtonLoad loading={loader} className='w-100 btn-blue mb-3' onClick={()=>{mintAsset(assetAmount)}}>Mint Asset</ButtonLoad>            
          </form>        
          <form>
            <Row>
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
                <><option className="form-control form-control-reset" value={x.TokenAddress}> {x.TokenAddress.substring(0, 14)}...{x.TokenAddress.substring(x.TokenAddress.length -4, (x.TokenAddress).length)} &nbsp;&nbsp; {x.Tokenname}</option>
                </> )}
              </select>)}
              </>)}
              </Col>
              <Col xs={6} className="mb-3">
                <label>Amount to Burn:</label>
                <input placeholder="Unit Name" type="text" className="form-control form-control-reset" style={{color:'#808080'}} onChange={event => setAmount( event.target.value)}/>                
              </Col>
            </Row>            
               <ButtonLoad loading={loaderBurn} className='w-100 btn-blue mb-3' onClick={()=>{burnAsset(assetAmount)}}>Burn Asset</ButtonLoad>            
          </form>    
          {/* <Button className='w-100 mb-3' onClick={()=>{check()}}>check</Button>             */}
          </Container>




      )}      

     
    </Layout>                      
)
}
  

export default MintBurnAsset;