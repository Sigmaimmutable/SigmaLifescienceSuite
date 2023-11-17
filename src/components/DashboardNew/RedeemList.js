import React, { useEffect, useState } from 'react';
import Layout from './LayoutT';
import { Link,useLocation } from 'react-router-dom';
import MyAlgoConnect from "@randlabs/myalgo-connect";
import algosdk, { Algod } from "algosdk";
import { Card, Col, Container, Row, Table,Button } from 'react-bootstrap';
import { readingLocalstateWithAppid,readingLocalstate,assetName,asset1WithId,asset3id,asset2WithId,escrowdata,updatealgobalance } from '../formula';
import { AppId,escrowProgram } from "../swapConfig";
import ButtonLoad from 'react-bootstrap-button-loader';
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import { formatJsonRpcRequest } from "@json-rpc-tools/utils";
import { dualwalletconnect } from './walletconnection';

import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';

import node from '../DashboardNew/nodeapi.json';
import axios from 'axios';
const myAlgoWallet = new MyAlgoConnect();
const algodClient = new algosdk.Algodv2('', node['algodclient'], '');
const baseServer = node['algodclient'];
const bridge = "https://bridge.walletconnect.org";

const port = '';

const token = {
   'X-API-Key': 'pOD5BAUCxq7InVPjo0sO01B0Vq4d7pD1ask5Ix43'
}

const algodClientGet = new algosdk.Algodv2(token, baseServer, port);

const indexerClient = new algosdk.Indexer('',node['indexerclient'], '');
let appID_global = AppId;

const RedeemList = (props) => {
    useEffect(() => {
        document.title = "Sigma | Redeem"
    }, [])
    const location = useLocation();
    const[storeredeem,setstoreredeem] = useState("");
    const[dbdata,setdbdata] = useState([]);
    const[loader, setLoader] = useState(false);
    const[valu,setvalu] = useState(1);

    const handleShowLoad = () => setLoader(true);
    const handleHideLoad = () => setLoader(false);

// console.log("location state",location.state.detail[0])


let k = 0;  
useEffect(()=>{first()},[dbdata])

    const first = async() =>{
       
        if(valu === 1){
            console.log("kvalue",k)
            let es = await readingLocalstateWithAppid(appID_global);
            setdbdata(es)
            k = 1;
            let ln = await axios.get(`${node['indexerclient']}/v2/accounts/${localStorage.getItem("walletAddress")}/apps-local-state?application-id=${appID_global}`);
            // console.log("lnvalue",ln.data['apps-local-states']['0']['key-value'].length)
           setstoreredeem(ln.data['apps-local-states']['0']['key-value'].length);
           setvalu(0)
        }
       

 

  }
  const RedeemAmount =async (appid,t,assetid,amt,asname1) => {
    handleShowLoad();
    let index = parseInt(appid);
  //console.log("appId inside donate", index)
    let accinfo = await readingLocalstate(algodClientGet,t);
    let Id1 = await asset1WithId(accinfo);
    let Id2 = await asset2WithId(accinfo);
    let Id3 = await asset3id(accinfo);
    let lsig = await escrowdata(appID_global,Id1,Id2);
  //console.log("lsigaddress",lsig.address())
    try {
      const params = await algodClient.getTransactionParams().do();
      
      let sender =localStorage.getItem("walletAddress");;
      let recv_escrow = lsig.address();
      let amount = 3000;
      
      let note1=[];
      note1.push(new Uint8Array(Buffer.from("fee")));
      let transaction1 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        from: sender, 
        to: recv_escrow, 
        amount: amount, 
        //  note: note1,  
         suggestedParams: params
       });
     
       let appArg = [];
       appArg.push(new Uint8Array(Buffer.from("redeem")));
      //  appArg.push(new Uint8Array(Buffer.from("fi")));

       let foreignassets = [];
      //  let decAddr = algosdk.decodeAddress(addresses[0]);
      //  foreignassets.push(decAddr.publicKey);
       foreignassets.push(parseInt(Id1));
       foreignassets.push(parseInt(Id2));
       foreignassets.push(parseInt(Id3));
       const transaction2 = algosdk.makeApplicationNoOpTxnFromObject({
           from: recv_escrow, 
           appIndex: index,
           appArgs: appArg,
           appAccounts:sender,
           accounts: [sender],
           foreignAssets:foreignassets,
           suggestedParams: params
         });
let transaction3;
       
        if(parseInt(assetid) === 0){
            transaction3 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
                from:recv_escrow,
                to:  sender,
                note: undefined,
                accounts:sender,
                amount: parseInt(amt), 
                suggestedParams: params
              });
        }
        else{
             transaction3 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                from:recv_escrow,
                to:  sender,
                assetIndex: parseInt(assetid),
                note: undefined,
                accounts:sender,
                amount: parseInt(amt), 
                suggestedParams: params
              });
        }
        console.log("amount",amt)
        

      

        let ana1 = await assetName(assetid);
      const groupID = algosdk.computeGroupID([ transaction1, transaction2, transaction3]);
      const txs = [ transaction1, transaction2, transaction3];
      txs[0].group = groupID;
      txs[1].group = groupID;
      txs[2].group = groupID;
     
      if(localStorage.getItem("walletName") === "myAlgoWallet"){
      
      const signedTx1 = await myAlgoWallet.signTransaction(txs[0].toByte());
      const signedTx2 = algosdk.signLogicSigTransaction(txs[1], lsig);

      const signedTx3 = algosdk.signLogicSigTransaction(txs[2], lsig);
      toast.info("Transaction in Progress");
      // const signedTx5 = await myAlgoWallet.signTransaction(txs[4].toByte());
      // const signedTxnarray = await myAlgoWallet.signTransaction([txs[0].toByte(),txs[2].toByte()])
// console.log("signedtxn",signedTxnarray);
  const response = await algodClient.sendRawTransaction([signedTx1.blob, signedTx2.blob, signedTx3.blob]).do();
//console.log("TxID", JSON.stringify(response, null, 1));
setvalu(1);

  await waitForConfirmation(algodClient, response.txId,"Redeem completed successfully");
  await updatealgobalance()
  let es = await readingLocalstateWithAppid(appID_global);
  setdbdata(es)
  // window.location.reload();
  
 
//   let ln = await axios.get(`${node['indexerclient']}/v2/accounts/${localStorage.getItem("walletAddress")}/apps-local-state?application-id=${appID_global}`);
//   console.log("lnvalue",ln.data['apps-local-states']['0']['key-value'].length)
//  setstoreredeem(ln.data['apps-local-states']['0']['key-value'].length)
      }
      else if(localStorage.getItem("walletName") === "PeraWallet"){
        const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
        const txns = [txs[0],txs[1],txs[2]]
        const txnsToSign = txns.map(txn => {
          const encodedTxn = Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString("base64");
          // console.log(encodedTxn);
          return {
            txn: encodedTxn,
        };
      });
        const signedTx3 = algosdk.signLogicSigTransaction(txs[1], lsig);
        const signedTx4 = algosdk.signLogicSigTransaction(txs[2], lsig);
        // const signedTx5 = algosdk.signLogicSigTransaction(txs[4], lsig1);
        const requestParams = [ txnsToSign ];
        const request = formatJsonRpcRequest("algo_signTxn", requestParams);
        const result = await connector.sendCustomRequest(request);
        const decodedResult = result.map(element => {
          return element ? new Uint8Array(Buffer.from(element, "base64")) : null;
        });
        console.log(result);
        decodedResult[1] = signedTx3.blob;
        decodedResult[2] = signedTx4.blob;
        // decodedResult[4] = signedTx5.blob;
       let response = await algodClient.sendRawTransaction(decodedResult).do()
      
      await waitForConfirmation(algodClient, response.txId,"Redeem completed successfully");
      await updatealgobalance()
      let es = await readingLocalstateWithAppid(appID_global);
  setdbdata(es)
      // window.location.reload();
    //   let ln = await axios.get(`${node['indexerclient']}/v2/accounts/${localStorage.getItem("walletAddress")}/apps-local-state?application-id=${appID_global}`);
    //   console.log("lnvalue",ln.data['apps-local-states']['0']['key-value'].length)
    //  setstoreredeem(ln.data['apps-local-states']['0']['key-value'].length)
      
}
//   await postusertx(localStorage.getItem("walletAddress"),response.txId,recv_escrow,"Redeem",0,0,"","","3000");

// await createtxhash(recv_escrow,response.txId,"REDEEM",amt,ana1) 

// await postusertx(recv_escrow,response.txId,"REDEEM",amt,ana1) 
// handleClose();
   
} catch (err) {
     
      console.error(err);
      handleHideLoad();
    }


  
       
          
  
    }
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
   } 
      const waitForConfirmation = async function (algodclient, txId,type) {
          let status = await algodclient.status().do();
          let lastRound = status["last-round"];
          while (true) {
            const pendingInfo = await algodclient
              .pendingTransactionInformation(txId)
              .do();
            if (
              pendingInfo["confirmed-round"] !== null &&
              pendingInfo["confirmed-round"] > 0
            ) {
              let id = "https://testnet.algoexplorer.io/tx/" + txId;
              toast.success(toastDiv(id,type));
              handleHideLoad();
              await sleep(5000);
              break;
            }
            lastRound++;
            await algodclient.statusAfterBlock(lastRound).do();
          }
        };
        const toastDiv = (txId,type) =>
        (
            <div>
               <p> {type} &nbsp;<a style={{color:'blue'}} href={txId} target="_blank" rel="noreferrer">View in algoexplorer <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.7176 3.97604L1.69366 14L0.046875 12.3532L10.0697 2.32926H1.23596V0H14.0469V12.8109H11.7176V3.97604Z" fill="blue"/>
        </svg></a></p> 
            </div>
        );
   

    return (
        <Layout>
               <><ToastContainer position='bottom-right' draggable = {false} transition={Zoom} autoClose={4000} closeOnClick = {false}/></>

            <Container>
                <Row className='justify-content-center'>
                    <Col md={10} lg={7} className="mb-4">
                        <Card className='card-dash card-dash-scroll d-block border-0 mb-4'>
                            <Table striped hover responsive className='mb-0 text-nowrap'>
                              
                                {dbdata.length === null ||dbdata.length === ""|| dbdata.length === undefined || dbdata.length === 0  ? 
                               (<>
                                {/* <img src="https://c.tenor.com/FBeNVFjn-EkAAAAS/ben-redblock-loading.gif" width={500}/> */}
                                <span className="d-block text-center">
                                  <svg version="1.1" id="L9" width="80" height="80" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                      viewBox="0 0 100 100" enable-background="new 0 0 0 0">
                                        <path fill="#fff" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
                                          <animateTransform 
                                            attributeName="transform" 
                                            attributeType="XML" 
                                            type="rotate"
                                            dur="1s" 
                                            from="0 50 50"
                                            to="360 50 50" 
                                            repeatCount="indefinite" />
                                      </path>
                                    </svg>
                                </span>
                                </>):
                               (<>
                                
                                <thead>
                              

                                    <tr>
                                        <th>Token</th>
                                        <th><center>Stored In</center></th>
                                        <th>Amount</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                  {dbdata.map((r,i)=>{
                       
                                return (<>
                                
                                 <tbody>
                                 {/* <strong>{(r.assetname)}</strong> */}
                                
                                    <tr>
                                        <td>
                                        
                                            <strong>{(r.assetname)}</strong><br />
                                            {/* {(r.thirdasset)} - */}
                                             {r.assetid}
                                        </td>
                                        <td>{(r.thirdasset)}</td>
                                        <td><strong>{parseFloat(r.asbalance/1000000).toFixed(6)} </strong></td>
                                        <td> <Button className='btn ms-2 btn-primary'  onClick={()=>RedeemAmount(appID_global,r.escrowAddress,r.assetid,r.asbalance,r.assetname)}>Redeem</Button>
                                         </td>
                                    </tr>
                               
                                 </tbody> 
                                </>
                     )
                     })}</>)}
                              
                               
                             
                         
                        
                                </Table>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

export default RedeemList;