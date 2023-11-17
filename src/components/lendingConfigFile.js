import { Base64Encoder } from "./encoder";
import axios from "axios";

export const ManagerAppid = 90528618;
export const ManagerAppAddress = "YARBLGR5X3EFU6UHAQLFVSLPVOB2S3AANXD7MG65XSYJQQXILPMLAVDO7U"
export const AlgoAssetAppid =90528455;
export const AlgoAppAddress = "LDWXWGDNZIGHKNZDID2NLOUE3LNV64U4SVHMPPIOBYRBKGPAOQUL5YRLG4"

export const UsdcAssetAppid =91417563;
export const USDCAppAddress = "77SA2LVU4MGMBHZUNCABTARSMD4N7BAKKMY6S263WWGTFH2FR5H2XWMDFE"

export const EALGOAssetid =90528909;
export const EUSDCAssetid = 91417883;
export const algooracleid = 48649676
export const usdcoracleid = 48649820;

export const thirdappid = 89690643;
export const fourthappid = 89510491;
export const fifthappid =  89510549;

export const thirdOracle = 48649713;
export const fourthOracle = 48649735;
export const fifthOracle = 48649820;

export const algoEscrow =`#pragma version 6
gtxn 0 Sender
addr from
==
return`;
export const usdcEscrow =`#pragma version 6
int 91417563
gtxn 0 Sender
addr from
==
return`;


export const globalstate = async(applicationId,addr)=>{
    let re = await axios.get(`https://testnet-api.algonode.cloud/v2/accounts/${addr}`);
    // console.log("re",re.data['apps-local-state'])
    let k =[];
    if(re.data['apps-local-state']){
        re.data['apps-local-state'].map((r,i)=>{
            if(r.id === applicationId){
                k.push(r);
            }
        })
    }
    console.log("k",k)
    let results = {};
    if(k[0]){
        if(k[0]['key-value']){
            k[0]['key-value'].forEach(x => {
                results[Base64Encoder.decode(x.key)] = x.value.uint;
            });
        }
    }
    
   
    
    return results;
}

export const globalstateapp = async(algodClient,applicationId)=>{
    let response = await algodClient.getApplicationByID(applicationId).do();
    let results = {};
    response.params["global-state"].forEach(x => {
        results[Base64Encoder.decode(x.key)] = x.value.uint;
    });
    
    return results;
}

export const globalstateoracle = async(algodClient,applicationId)=>{
    let response = await algodClient.getApplicationByID(applicationId).do();
    let results = {};
    response.params["global-state"].forEach(x => {
        results[Base64Encoder.decode(x.key)] = x.value.uint;
    });
    
    return results;
}

export const Borrowed = async(price1,globapp1,glob1)=>{
// let activeCollateralUnderlying1 = Math.floor(
//   (glob1.uac * globapp1.bt) / (1000000000)
// )
// let activeCollateralUsd1 = ((price1/1000000) * activeCollateralUnderlying1)/1000000;
// let activeCollateralMaxBorrowUsd1 = (activeCollateralUsd1 * globapp1.cf) / (1000)
let borrowUnderlying1 = Math.floor((globapp1.ub * glob1.ubs) / globapp1.ob)
let borrowUsd1 = (borrowUnderlying1 * (price1/1000000))/1000000
// let borrow_token1 = ((glob1.ubs *globapp1.ub ) / globapp1.ob) / 1000000; 

return borrowUnderlying1 ? borrowUnderlying1 : 0;
}

export const availabletoWithdraw = async(price1,globapp1,glob1)=>{
    let borrowed = await Borrowed(price1,globapp1,glob1);
    let depositedamount = Math.floor((glob1.uac * globapp1.bt) / (1000000000))//activeCollateralUnderlying1
    let checkavailablity = borrowed / 0.9 / (globapp1.cf/1000) ;
    console.log("checkavailablity",checkavailablity,borrowed)
    
    if(glob1.uac > checkavailablity){
        if(checkavailablity){
            console.log("withdrwa",depositedamount - checkavailablity)
            return (glob1.uac - checkavailablity);
        }
        else{
            return glob1.uac
        }
       
    }
    else{
        return 0;
    }
}

export const maxBorrow = async(price1,globapp1,glob1) => {
    let depositedamount = Math.floor((glob1.uac * globapp1.bt) / (1000000000));
    let borrowed = await Borrowed(price1,globapp1,glob1);
    let borrowedamount = borrowed ? borrowed : 0;
    let maxborrowcal = (depositedamount * 0.9*(globapp1.cf/1000)) ;
    if(maxborrowcal > borrowedamount){
        return [(maxborrowcal - borrowedamount),borrowedamount];
    }
    else{
        return [0,borrowedamount];
    }

}

export const MaxBorrow = async(price1,globapp1,glob1,price2,globapp2,glob2,originalprice) => {
    let depositedamount1 = Math.floor((glob1.uac * globapp1.bt) / (1000000000))? Math.floor((glob1.uac * globapp1.bt) / (1000000000)): 0;
    let depositedamount2 = Math.floor((glob2.uac * globapp2.bt) / (1000000000)) ? Math.floor((glob2.uac * globapp2.bt) / (1000000000)): 0;
    
    //deposited to usd price
    let depositedamount1Usd = depositedamount1 * (price1/1000000);
    let depositedamount2Usd = depositedamount2 * (price2/1000000);
    // console.log("maxb",depositedamount2,depositedamount2Usd,depositedamount1Usd)
    //Borrow calculation
    let borrowed1 = await Borrowed(price1,globapp1,glob1);
    let borrowedamount1 = borrowed1 ? borrowed1 : 0;
    let borrowed2 = await Borrowed(price2,globapp2,glob2);
    let borrowedamount2 = borrowed2 ? borrowed2 : 0;
  
    //borrow to usd price
    let borrowUsd1 = borrowedamount1 * (price1/1000000);
    let borrowUsd2 = borrowedamount2 * (price2/1000000);

    //totalborrow and total deposit
    let totaldepositeinUSD = depositedamount1Usd + depositedamount2Usd;
    let totalborrowinUSD = borrowUsd1+borrowUsd2;
    // console.log("totalborrowinUSD",totaldepositeinUSD,totalborrowinUSD)
    //maxBorrowinUSD
    let maxborrowinUSd;
    if((totaldepositeinUSD * 0.9 *0.7) > totalborrowinUSD){
        maxborrowinUSd = (totaldepositeinUSD * 0.9 * 0.7) - totalborrowinUSD;
    }else{
        maxborrowinUSd = 0;
    }

    //maxborrow for particular asset
    let maxb = maxborrowinUSd/(originalprice/1000000);
    console.log("maxb",maxb)
    return maxb;

}

export const availtoWithdraw = async(price1,globapp1,glob1,price2,globapp2,glob2,originalprice) =>{
    //deposited to usd price
    let depositedamount1Usd = glob1.uac * (price1/1000000)? glob1.uac * (price1/1000000): 0;
    let depositedamount2Usd = glob2.uac * (price2/1000000)?  glob2.uac * (price2/1000000): 0;

     //Borrow calculation
     let borrowed1 = await Borrowed(price1,globapp1,glob1);
     let borrowedamount1 = borrowed1 ? borrowed1 : 0;
     let borrowed2 = await Borrowed(price2,globapp2,glob2);
     let borrowedamount2 = borrowed2 ? borrowed2 : 0;

    //check availablity
    let checkavailablity1 = borrowed1 / 0.9 / (globapp1.cf/1000) ;
    let checkavailablity2 = borrowed2 / 0.9 / (globapp2.cf/1000) ;

     //borrow to usd price
     let borrowUsd1 = checkavailablity1 * (price1/1000000);
     let borrowUsd2 = checkavailablity2 * (price2/1000000);

     //totalborrow and total deposit
    let totaldepositeinUSD = depositedamount1Usd + depositedamount2Usd;
    let totalborrowinUSD = borrowUsd1+borrowUsd2;

     //available to withdraw
     let totalavailabletowith;
     if(totaldepositeinUSD > totalborrowinUSD){
        totalavailabletowith = totaldepositeinUSD - totalborrowinUSD;
     }
     else{
        totalavailabletowith = 0;
     }
     return (totalavailabletowith/(originalprice/1000000));
}

export const totalborrowed = async(price1,globapp1,glob1,price2,globapp2,glob2)=>{
    let borrowed1 = await Borrowed(price1,globapp1,glob1);
    let borrowedamount1 = borrowed1 ? borrowed1 : 0;
    let borrowed2 = await Borrowed(price2,globapp2,glob2);
    let borrowedamount2 = borrowed2 ? borrowed2 : 0;
  
    //borrow to usd price
    let borrowUsd1 = borrowedamount1 * (price1/1000000);
    let borrowUsd2 = borrowedamount2 * (price2/1000000);
    return borrowUsd1+borrowUsd2;
}