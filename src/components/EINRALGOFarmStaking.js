import MyAlgoConnect from '@randlabs/myalgo-connect';
const algosdk = require('algosdk');
const baseServer = 'https://testnet-algorand.api.purestake.io/ps2';
const port = '';

const token = {
   'X-API-Key': 'pOD5BAUCxq7InVPjo0sO01B0Vq4d7pD1ask5Ix43'
}

const algodClientGet = new algosdk.Algodv2(token, baseServer, port);

const algodClient = new algosdk.Algodv2('', 'https://node.testnet.algoexplorerapi.io', '');
const indexClient = new algosdk.Indexer('', 'https://algoindexer.testnet.algoexplorerapi.io', '');
const myAlgoConnect = new MyAlgoConnect();
export const farmtvleinralgopair =async(creatoraddress,applicationid)=>{     
     let setTotalStakeeinralgo = "";
    // const[totalstakeelemalgo,setTotalStakeelemalgo]=useState("");  
  //const client = new algosdk.Algodv2('', 'https://api.testnet.algoexplorer.io', '');
  let accountInfoResponse1 = await algodClientGet.accountInformation(creatoraddress).do();

for (let i = 0; i < accountInfoResponse1['created-apps'].length; i++) { 
   console.log("Application's global state:");
  if (accountInfoResponse1['created-apps'][i].id == parseInt(applicationid)) {
      console.log("Application's global state:");
      for (let n = 0; n < accountInfoResponse1['created-apps'][i]['params']['global-state'].length; n++) {
          console.log(accountInfoResponse1['created-apps'][i]['params']['global-state'][n]);
          let enc = accountInfoResponse1['created-apps'][i]['params']['global-state'][n];
          console.log("encode",enc);
          var decodedString = window.atob(enc.key);
          if(enc['key'] === "R0E="){
            setTotalStakeeinralgo = accountInfoResponse1['created-apps'][i]['params']['global-state'][n]['value']['uint'];
            console.log("checktvl", accountInfoResponse1['created-apps'][i]['params']['global-state'][n]['value']['uint'])
          }
        //   if(enc['key'] === "VFNVTEM="){
        //     setTotalreward( accountInfoResponse1['created-apps'][i]['params']['global-state'][n]['value']['uint']);
        //     console.log("checktvl", accountInfoResponse1['created-apps'][i]['params']['global-state'][n]['value']['uint'])
        //   }
        //   if(enc['key'] === "VFNM"){
        //     setTotalrewardallocated( accountInfoResponse1['created-apps'][i]['params']['global-state'][n]['value']['uint']);
        //     console.log("checktvl", accountInfoResponse1['created-apps'][i]['params']['global-state'][n]['value']['uint'])
        //   }
      }
      
  }
}       
    return setTotalStakeeinralgo;
            
    }