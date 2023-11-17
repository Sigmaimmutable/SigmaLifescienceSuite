import { Base64Encoder } from "../encoder";
import axios from "axios";

export const PtpstakingAppId = 115486103;
export const PtpstakingAppAdress = "E4NSTRT5AT3E7THCYJRQGXKHTXA4UY7CAAJPY5MD66KR3FTZSPNFP4FLTE";
export const lpstakingAppId = 108818636;
export const lpstakingAppAdress = "E3VHDFIOCXPHWCWUBMUKVCXHEFGRRKQXXOW4LRPTJK6J3UDLANVO52JU4U";
export const swapAppId = 110212513;
export const swapAppAdress = "3XSSLQKGLIA6QLINJJO5XQIJ2UX5YULUFBAPTVKKOPUDHZPI5FO7FMR62I";
// export const USDC = 108466398 ;
// export const USDT = 108466539;
// export const USDCE = 108466691;
// export const USDTE = 108466806;
export const PTP = 78044331;
export const VEPTP = 115481242;

// Newupdated
export const UsdtAppId =115483529;
export const UsdtAppAdress = "2JAI4JYGJB2F4AQIHBJZEKS3T2Q3HGPBKEXXHFEZ3AGJZGJNXOPJI6DQSU"
export const UsdcAppId = 115482494;
export const UsdcAppAdress = "ACSICRWNIMSJ3PKPYCZAVCYLMEY6PFSTHQZNYKMFHS4N6GEPQ6FJMAKPL4"
export const UsdAppId = 115977179;
export const UsdAppAdress = "SM7OWMEAR4BSJLZ7H6HJA2FHHPDZLFDOQBOW6WDBEDW5KPOANEJFVM3V7A"
export const MianAppId = 115481857;
export const MainAppAdress = "OASS6MMYICGTOA5T5RYP5B2VROQ7PLC5USDY2ZYXJWY2PLBFLI2JNVRL64"
export const TauAppId =115977179;
export const TauAppAdress = "SM7OWMEAR4BSJLZ7H6HJA2FHHPDZLFDOQBOW6WDBEDW5KPOANEJFVM3V7A"
export const Usdc = 78045387;
export const Usd = 115976903;
export const Usdt = 115483398;
export const USDCE = 115481123;
export const USDE = 115976966;
export const USDTE = 115481179;
export const TAU = 115976903;
export const TAUE = 115976966;
export const usdcStakingappid =115485511
export const usdcStakingappaddress ="RK3PJMMMAYUHFTJZK4T4522FF4DUTXSOCVSZU66NOL36TQK4LS2EIL25RM"
export const usdtStakingappid =115485712
export const usdtStakingappaddress ="YUP5HIVUCX345UY2Q56BYJJ36KEFHIDIKZHW2UNRM2VLQYLRA6A52GYQSY"
export const TauStakingappid =115503808
export const TauStakingappaddress ="YFEWY5MBHJGLKYLXDZARTZ2MWRGKOTCNLIMS3IWWBWKUPIXIQ3WMT6GJNM"

// App details

export const globalstate = async(algodClient,applicationId)=>{
    let response = await algodClient.getApplicationByID(applicationId).do();
    let results = {};
    response.params["global-state"].forEach(x => {
        results[Base64Encoder.decode(x.key)] = x.value.uint;
    });
    
    return results;
}

export const localstate = async(algodClient,appid) =>{
    try{
        let ln = await axios.get(`${algodClient}/v2/accounts/${localStorage.getItem("walletAddress")}/apps-local-state?application-id=${appid}`);
        console.log("local",ln.data['apps-local-states']['0']['key-value']['0']['value']['uint'])
        return (ln.data['apps-local-states']['0']['key-value']['0']['value']['uint']);
    }
    catch(err){
    return 0;
    }
}


//staking contract configuration



