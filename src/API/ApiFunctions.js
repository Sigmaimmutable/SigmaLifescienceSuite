import axios from "axios";

    export const LaunchpadGet = async () => {
        let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
      //Get method start
      let response2 = await fetch(`/platform/v1/templateusage`, 
      {
          headers: {
              'x-api-key': `${key}`    
            },
        }
        )
      //console.log(response2);
        const data2 = await response2.json();
      console.log("fetch txhistory", {data2})
      console.log("id", parseInt(data2.length) + 1);

      //Get method end
    }

    export const LaunchpadPost = async (assetID, appId, startDate, endDate, appAddress) =>
    {       
      let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
      let userID = localStorage.getItem('UserID');
      let connectAddress = localStorage.getItem("walletAddress");
      let network = "AL";
      
        axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        //console.log("done1",response.data);
          // console.log("date",date);
          const options2 = {
            method: 'POST',
            url: '/platform/v1/templateusage',
            headers: {
              'x-api-key': `${key}`    
            },
            data: {
                'userId': `${userID}`,
                'smartContractAddress': `${appAddress}`,
                'networkType': `${network}`,
                'tokenName': `${assetID}`,
                'ownerAddress': `${connectAddress}`,
                'startDate': parseInt(startDate),
                'endDate': parseInt(endDate),
                'appId': parseInt(appId)
            }
          };
          
          axios.request(options2).then(function (response2) {
           console.log("response",response2);
          //  window.location.reload();
          }).catch(function (error) {
              console.error("done2",error);
          });
    }

    export const BondGet = async () => {
        let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
      //Get method start
      let response2 = await fetch(`/platform/v1/templateusage`, 
      {
          headers: {
              'x-api-key': `${key}`    
            },
        }
        )
      //console.log(response2);
        const data2 = await response2.json();
      console.log("fetch txhistory", {data2})
      console.log("id", parseInt(data2.length) + 1);

      //Get method end
    }

    export const BondPost = async (appId, usdcAssetID, rewAssetID, appAddress) =>
    {       
      let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
      let userID = localStorage.getItem('UserID');
      let connectAddress = localStorage.getItem("walletAddress");
      let network = "AB";
      
        axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        //console.log("done1",response.data);
          // console.log("date",date);
          const options2 = {
            method: 'POST',
            url: '/platform/v1/templateusage',
            headers: {
              'x-api-key': `${key}`    
            },
            data: {
                'userId': `${userID}`,
                'smartContractAddress': `${appAddress}`,
                'networkType': `${network}`,
                "depositTokenAddress": `${usdcAssetID}`,
                "bondTokenAddress": `${rewAssetID}`,
                'ownerAddress': `${connectAddress}`,
                'appId': parseInt(appId)
            }
          };
          
          axios.request(options2).then(function (response2) {
           console.log("response",response2);
          //  window.location.reload();
          }).catch(function (error) {
              console.error("done2",error);
          });
    }

    //binance
    export const BinanceLaunchpadGet = async () => {
      let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
    //Get method start
      let response2 = await fetch(`/platform/v1/templateusage`, 
    {
        headers: {
            'x-api-key': `${key}`    
          },
      }
      )
    //console.log(response2);
      const data2 = await response2.json();
    console.log("Api inside", data2)
    return {data2};
    //Get method end
  }


  export const BinanceLaunchpadPost = async (contractaddress,purchasetokenAddress, enddate) =>
  {       
    let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
    let userID = localStorage.getItem('UserID');
    let connectAddress = localStorage.getItem("walletAddress");
    let network = "BL";
    let tokenname = "CF_001";
    let startDate = parseInt(enddate-86400);
    // let endDate = 1671634498;

      axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
      //console.log("done1",response.data);
        // console.log("date",date);
        const options2 = {
          method: 'POST',
          url: '/platform/v1/templateusage',
          headers: {
            'x-api-key': `${key}`    
          },
          data: {
              'userId': `${userID}`,
              'smartContractAddress': `${contractaddress}`,
              'networkType': `${network}`,
              'tokenName': `${tokenname}`,
              'ownerAddress': `${connectAddress}`,
              "bondTokenAddress":`${purchasetokenAddress}`,
              'startDate': parseInt(startDate),
              'endDate': parseInt(enddate)
             
          }
        };
        
        axios.request(options2).then(function (response2) {
         console.log("response",response2);
        //  window.location.reload();
        }).catch(function (error) {
            console.error("done2",error);
        });
  }

  //Bondbinance
  export const BinanceBondGet = async () => {
    let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
  //Get method start
  let response2 = await fetch(`/platform/v1/templateusage`, 
  {
      headers: {
          'x-api-key': `${key}`    
        },
    }
    )
  //console.log(response2);
    const data2 = await response2.json();
  console.log("fetch txhistory", {data2})
  console.log("id", parseInt(data2.length) + 1);

  //Get method end
}

export const BinanceBondPost = async (contractaddress,bondtoken,deposittoken) =>
{       
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
  let userID = localStorage.getItem('UserID');
  let connectAddress = localStorage.getItem("walletAddress");
  let network = "BB";
  let tokenname = "BC_002";
  // let startDate = 1671634432;
  // let endDate = 1671634498;

    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    //console.log("done1",response.data);
      // console.log("date",date);
      const options2 = {
        method: 'POST',
        url: '/platform/v1/templateusage',
        headers: {
          'x-api-key': `${key}`    
        },
        data: {
            'userId': `${userID}`,
            'smartContractAddress': `${contractaddress}`,
            'networkType': `${network}`,
            "depositTokenAddress":`${deposittoken}`,
            'ownerAddress': `${connectAddress}`,
            "bondTokenAddress":`${bondtoken}`,
            'tokenName': `${tokenname}`,
            // 'startDate': parseInt(startDate),
            // 'endDate': parseInt(endDate)
           
        }
      };
      
      axios.request(options2).then(function (response2) {
       console.log("response",response2);
      //  window.location.reload();
      }).catch(function (error) {
          console.error("done2",error);
      });
}



//staking
  
  export const BinanceStakingGet = async () => {
    let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
  //Get method start
  let response2 = await fetch(`/platform/v1/templateusage`, 
  {
      headers: {
          'x-api-key': `${key}`    
        },
    }
    )
  //console.log(response2);
    const data2 = await response2.json();
  console.log("fetch txhistory", {data2})
  console.log("id", parseInt(data2.length) + 1);

  //Get method end
}

export const BinanceStakingPost = async (contractaddress,deposittoken,rewardtoken) =>
{       
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
  let userID = localStorage.getItem('UserID');
  let connectAddress = localStorage.getItem("walletAddress");
  let network = "BS";
  let tokenname = "SC_003";
  // let startDate = 1671634432;
  // let endDate = 1671634498;

    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    //console.log("done1",response.data);
      // console.log("date",date);
      const options2 = {
        method: 'POST',
        url: '/platform/v1/templateusage',
        headers: {
          'x-api-key': `${key}`    
        },
        data: {
            'userId': `${userID}`,
            'smartContractAddress': `${contractaddress}`,
            'networkType': `${network}`,
            "depositTokenAddress":`${deposittoken}`,
            'ownerAddress': `${connectAddress}`,
            "bondTokenAddress":`${rewardtoken}`,
            'tokenName': `${tokenname}`,
            // 'startDate': parseInt(startDate),
            // 'endDate': parseInt(endDate)
           
        }
      };
      
      axios.request(options2).then(function (response2) {
       console.log("response",response2);
      //  window.location.reload();
      }).catch(function (error) {
          console.error("done2",error);
      });
}

export const BinanceERCPost = async (tokenaddress) =>
{       
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
  let userID = localStorage.getItem('UserID');
  let connectAddress = localStorage.getItem("walletAddress");
  let network = "BE";
  let tokenname = "ERC_004";
  // let tokensymbol = "ERC20";
  // let startDate = parseInt(enddate-86400);
  // let endDate = 1671634498;

    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    //console.log("done1",response.data);
      // console.log("date",date);
      const options2 = {
        method: 'POST',
        url: '/platform/v1/templateusage',
        headers: {
          'x-api-key': `${key}`    
        },
        data: {
            'userId': `${userID}`,
            'smartContractAddress': `${tokenaddress}`,
            'networkType': `${network}`,
            'tokenName': `${tokenname}`,
            'ownerAddress': `${connectAddress}`
           
        }
      };
      
      axios.request(options2).then(function (response2) {
       console.log("response",response2);
      //  window.location.reload();
      }).catch(function (error) {
          console.error("done2",error);
      });
}

 //NormalNFTbinance
 export const BinanceNormalNFTGet = async () => {
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
  //Get method start
    let response2 = await fetch(`/platform/v1/templateusage`, 
  {
      headers: {
          'x-api-key': `${key}`    
        },
    }
    )
  //console.log(response2);
    const data2 = await response2.json();
  console.log("Api inside", data2)
  return {data2};

//Get method end
}

export const BinanceNormalNFTPost = async (tokenaddress) =>
{       
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
  let userID = localStorage.getItem('UserID');
  let connectAddress = localStorage.getItem("walletAddress");
  let network = "BNNFT";
  let tokenname = "NFT_005";
  // let tokensymbol = "ERC20";
  // let startDate = parseInt(enddate-86400);
  // let endDate = 1671634498;

    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    //console.log("done1",response.data);
      // console.log("date",date);
      const options2 = {
        method: 'POST',
        url: '/platform/v1/templateusage',
        headers: {
          'x-api-key': `${key}`    
        },
        data: {
            'userId': `${userID}`,
            'smartContractAddress': `${tokenaddress}`,
            'networkType': `${network}`,
            'tokenName': `${tokenname}`,
            'ownerAddress': `${connectAddress}`
           
        }
      };
      
      axios.request(options2).then(function (response2) {
       console.log("response",response2);
      //  window.location.reload();
      }).catch(function (error) {
          console.error("done2",error);
      });
}

 //AuctionNFTbinance
 export const BinanceAuctionNFTGet = async () => {
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
  //Get method start
    let response2 = await fetch(`/platform/v1/templateusage`, 
  {
      headers: {
          'x-api-key': `${key}`    
        },
    }
    )
  //console.log(response2);
    const data2 = await response2.json();
  console.log("Api inside", data2)
  return {data2};

//Get method end
}

export const BinanceAuctionNFTPost = async (tokenaddress) =>
{       
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
  let userID = localStorage.getItem('UserID');
  let connectAddress = localStorage.getItem("walletAddress");
  let network = "BANFT";
  let tokenname = "ANFT_006";
  // let tokensymbol = "ERC20";
  // let startDate = parseInt(enddate-86400);
  // let endDate = 1671634498;

    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    //console.log("done1",response.data);
      // console.log("date",date);
      const options2 = {
        method: 'POST',
        url: '/platform/v1/templateusage',
        headers: {
          'x-api-key': `${key}`    
        },
        data: {
            'userId': `${userID}`,
            'smartContractAddress': `${tokenaddress}`,
            'networkType': `${network}`,
            'tokenName': `${tokenname}`,
            'ownerAddress': `${connectAddress}`
           
        }
      };
      
      axios.request(options2).then(function (response2) {
       console.log("response",response2);
      //  window.location.reload();
      }).catch(function (error) {
          console.error("done2",error);
      });
}



 //RoyaltyNFTbinance
 export const BinanceRoyaltyNFTGet = async () => {
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
  //Get method start
    let response2 = await fetch(`/platform/v1/templateusage`, 
  {
      headers: {
          'x-api-key': `${key}`    
        },
    }
    )
  //console.log(response2);
    const data2 = await response2.json();
  console.log("Api inside", data2)
  return {data2};

//Get method end
}

export const BinanceRoyaltyNFTPost = async (tokenaddress) =>
{       
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
  let userID = localStorage.getItem('UserID');
  let connectAddress = localStorage.getItem("walletAddress");
  let network = "BRNFT";
  let tokenname = "RNFT_007";
  // let tokensymbol = "ERC20";
  // let startDate = parseInt(enddate-86400);
  // let endDate = 1671634498;

    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    //console.log("done1",response.data);
      // console.log("date",date);
      const options2 = {
        method: 'POST',
        url: '/platform/v1/templateusage',
        headers: {
          'x-api-key': `${key}`    
        },
        data: {
            'userId': `${userID}`,
            'smartContractAddress': `${tokenaddress}`,
            'networkType': `${network}`,
            'tokenName': `${tokenname}`,
            'ownerAddress': `${connectAddress}`
           
        }
      };
      
      axios.request(options2).then(function (response2) {
       console.log("response",response2);
      //  window.location.reload();
      }).catch(function (error) {
          console.error("done2",error);
      });
}



 //FractionalNFTbinance
 export const BinanceFractionalNFTGet = async () => {
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
  //Get method start
    let response2 = await fetch(`/platform/v1/templateusage`, 
  {
      headers: {
          'x-api-key': `${key}`    
        },
    }
    )
  //console.log(response2);
    const data2 = await response2.json();
  console.log("Api inside", data2)
  return {data2};

//Get method end
}

export const BinanceFractionalNFTPost = async (tokenaddress,fractionaltoken) =>
{       
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
  let userID = localStorage.getItem('UserID');
  let connectAddress = localStorage.getItem("walletAddress");
  let network = "BFNFT";
  let tokenname = "FNFT_008";
  // let tokensymbol = "ERC20";
  // let startDate = parseInt(enddate-86400);
  // let endDate = 1671634498;

    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    //console.log("done1",response.data);
      // console.log("date",date);
      const options2 = {
        method: 'POST',
        url: '/platform/v1/templateusage',
        headers: {
          'x-api-key': `${key}`    
        },
        data: {
            'userId': `${userID}`,
            'smartContractAddress': `${tokenaddress}`,
            'networkType': `${network}`,
            'tokenName': `${tokenname}`,
            'ownerAddress': `${connectAddress}`,
            "bondTokenAddress":`${fractionaltoken}`,
           
        }
      };
      
      axios.request(options2).then(function (response2) {
       console.log("response",response2);
      //  window.location.reload();
      }).catch(function (error) {
          console.error("done2",error);
      });
}

export const postuserstatus = async (ipv) => {
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
  //  console.error("done2",userdata); 
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// console.log("done1",response.data);
let k ={
"ipAddress":ipv,
"algoAddress":localStorage.getItem("walletAddress"),
"networkType":localStorage.getItem("network"),
"walletType":localStorage.getItem("walletType"),
}
const options2 = {
method: 'POST',
url: '/platform/v1/uservisitrecord',
headers: {
  'x-api-key': `${key}`    
},
data: k
};
axios.request(options2).then(function (response2) {
// window.location.reload();
  console.log("done2", response2);
}).catch(function (error) {
//console.error("done2",error);
});
}

export const generateBillingInvoice = async () =>
{       
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";

    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    //console.log("done1",response.data);
      // console.log("date",date);
      const options2 = {
        method: 'POST',
        url: '/platform/v1/generateinvoice',
        headers: {
          'x-api-key': `${key}`    
        },
      };
      
      axios.request(options2).then(function (response2) {
       console.log("y-response",response2);
       return response2
      //  window.location.reload();
      }).catch(function (error) {
          console.error("y-response",error);
          return error
      });
}

export const getInvoice = async () => 
{
let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
//Get method start
  let response2 = await fetch(`/platform/v1/invoice/${localStorage.getItem("UserID")}`, 
{
    headers: {
        'x-api-key': `${key}`    
      },
  }
  )
//console.log(response2);
  const data2 = await response2.json();
console.log("invoice inside", data2);
return {data2};
}

export const payBillingInvoice = async() =>
{
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
  let amount = "10.00";
  let status = "OPEN";
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    //console.log("done1",response.data);
      // console.log("date",date);
      const options2 = {
        method: 'POST',
        url: `/platform/v1/payment`,
        headers: {
          'x-api-key': `${key}`    
        },
        data:{
          "userId":`${localStorage.getItem("UserID")}`,   
          "amount":`${amount}`,    
          "status":`${status}`
      }
      };
      
      axios.request(options2).then(function (response2) {
       console.log("pay-response",response2);
       return response2
      //  window.location.reload();
      }).catch(function (error) {
          console.error("pay-response",error);
          return error
      });

}


   //binance
   export const Bscdeployget = async (address) => {
    let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
  //Get method start
    let response2 = await fetch(`/platform/v1/templateusage/${address}`, 
  {
      headers: {
          'x-api-key': `${key}`    
        },
    }
    )
  //console.log(response2);
    const data2 = await response2.json();
  console.log("Api inside", data2)
  return {data2};
  //Get method end
}


export const BscdeployPost = async () =>
{       
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
  let userID = localStorage.getItem("UserID");
  let resourceid = 2;
  let Status = "OPEN";


    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    //console.log("done1",response.data);
      // console.log("date",date);
      const options2 = {
        method: 'POST',
        url: '/platform/v1/reusage',
        headers: {
          'x-api-key': `${key}`    
        },
        data: {
            'userId': `${userID}`,
            'resourceId': `${resourceid}`,
            'status': `${Status}`
           
        }
      };
      
      axios.request(options2).then(function (response2) {
       console.log("response",response2);
      //  window.location.reload();
      }).catch(function (error) {
          console.error("done2",error);
      });
}


export const Bscdeploydata = async (ChainId) =>
{       
  //  console.log("Chainidget",ChainId);
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
  let userID = localStorage.getItem("UserID");
  let networkname = "SIGMACHAIN";
  let chainid = parseInt(ChainId[6][1]);
  let ipaddress=ChainId[5][1];

  // RPC = chainid[5][1]
  // chainid = chainid[6][1]
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    //console.log("done1",response.data);
      // console.log("date",date);
      const options2 = {
        method: 'POST',
        url: '/platform/v1/network',
        headers: {
          'x-api-key': `${key}`    
        },
        data: {


            'createdByUser': `${userID}`,
            'chainId': `${chainid}`,
            'ipAddress': `${ipaddress}`,
            'networkName': `${networkname}`,

          
        }
      };
      
      axios.request(options2).then(function (response2) {
       console.log("response",response2);
      //  window.location.reload();
      }).catch(function (error) {
          console.error("done2",error);
      });
}


//binancesidechainget
export const Bscdeploydataget = async (UserID) => {
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
//Get method start

  let response2 = await fetch(`/platform/v1/network`, 
{
    headers: {
        'x-api-key': `${key}`    
      },
  }
  )
//console.log(response2);
  const data2 = await response2.json();
console.log("Api inside", data2)
return {data2};
//Get method end
}



//binancesidechainget
export const Ploygondeploydataget = async (UserID) => {
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
//Get method start

  let response2 = await fetch(`/platform/v1/blocks`, 
{
    headers: {
        'x-api-key': `${key}`    
      },
  }
  )
//console.log(response2);
  const data2 = await response2.json();
console.log("Api inside", data2)
return {data2};
//Get method end
}


//binancesidechainget
export const Ploygondeploydatatxget = async (UserID) => {
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
//Get method start

  let response2 = await fetch(`/platform/v1/tx`, 
{
    headers: {
        'x-api-key': `${key}`    
      },
  }
  )
//console.log(response2);
  const data2 = await response2.json();
console.log("Api inside", data2)
return {data2};
//Get method end
}