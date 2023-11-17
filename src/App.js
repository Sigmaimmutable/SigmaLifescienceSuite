import React,{useEffect,useState} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import ElementProtocol from './components/HomePage';
import HomeV2 from './components/HomePageV2';
import SinglesideAmm from './components/HomePageswap';
import HomePageBanking from './components/HomePageBanking';
// import Swap from './components/Swap';
// import Swap from './components/Dashboard/Swap';
import Stake from './components/Stake';
import Stakebox from './components/Stakebox';
// import FarmStaking from './components/FarmStaking';
import FarmStaking from './components/Dashboard/FarmStaking';
// import Farm from './components/Farm';
import Farm from './components/Dashboard/Farm';
import Vaults from './components/Vaults';
// import Launchpad from './components/Launchpad';
import Launchpad from './components/Dashboard/Launchpad';
// import Pool from './components/Pool';
import Pool from './components/Dashboard/Pool';
import Bridge from './components/DashboardNew/Bridge';
// import Analytics from './components/Analytics';
import Dashboard from './components/Dashboard/Dashboard';
import Bond from './components/Dashboard/Bond';
import SingleStake from './components/Dashboard/Stake';
import SwapTau from './components/Dashboard/SwapTau';
import Analytics from './components/Dashboard/Analytics';

import Element from './components/Element';
import CDBC_Hub from './components/ElementProtocol';
import Home from './components/HomePage';
import Mint from './components/Dashboard/Mint';
import Redeem from './components/Dashboard/Redeem';
import Buyback from './components/Dashboard/Buyback';
import Recollateraloze from './components/Dashboard/Recollateraloze';
import Liquidity from './components/DashboardNew/liquidity';
// import MoneyMarket from './components/MoneyMarket';
import MoneyMarketV2 from './components/MoneyMarketV2';
import MoneyMarketOrder from './components/Dashboard/MoneyMarketOrder';
import MoneyMarketOrderV2 from './components/Dashboard/MoneyMarketOrderV2';
import DashboardAMM from "./components/DashboardNew/DashboardAMM";
import Faucet from './components/Faucet.js'
import Edit from "./NFTFolder/Edit";
import Single from "./NFTFolder/Single";
import SingleBid from "./NftBuyFolder/SingleBid";
import DashboardKyc from './KycDid/DashboardKyc'
import View from "./KycDid/View";
import CreateKyc from "./KycDid/CreateKyc";
import MintBurn from "./KycDid/MintBurnAsset";
import Approvepage from "./KycDid/Approvepage";
import ProfileNFT from "./NFTFolder/ProfileNFT";
import Explore from "./NFTFolder/Explore";
import HomePageNft from "./NFTFolder/HomepageNft";
import ProfileViewOtherCopy2New from "./NFTFolder/ProfileViewOtherCopy2New";
import configfile from './NFTFolder/config.json'
import {DataContext} from './NFTFolder/DataContext'
import firebase from './NFTFolder/firebase';
import CreateMul from "./Multisig/CreateMultiSig";
import MulTransaction from "./Multisig/Transaction";
import MultisigWallet from "./Multisig/AllMultisigs";

import UploadKyc from "./ipfs/UploadKyc";
// import MulTransaction from "./Multisig/Transaction";
import Viewkycdetails from "./ipfs/Allkyc";

// dashboard
import DashboardApp from './components/DashboardNew/Dashboard';
import BondApp from './components/DashboardNew/Bonds';
import FarmApp from './components/DashboardNew/Farm';
import StablecoinApp from './components/DashboardNew/Stablecoin';
import RedeemApp from './components/DashboardNew/StablecoinRedeem';
import SwapApp from './components/DashboardNew/Swap';
import StableswapApp from './components/DashboardNew/Stableswap';
import PoolApp from './components/DashboardNew/Pool';
import StakeApp from './components/DashboardNew/Stake';
import FindApp from './components/DashboardNew/Find';
import FaucetApp from './components/DashboardNew/Faucet';
import BuybackApp from './components/DashboardNew/Buyback'
import RecollateralizeApp from './components/DashboardNew/Recollateralize'
import RedeemList from './components/DashboardNew/RedeemList'
import HotCollectionsApp from './components/DashboardNew/HotCollections'
import GenesisMarketApp from './components/DashboardNew/GenesisMarket'
import MyNFTApp from './components/DashboardNew/MyNFT'
import NFTDetailsApp from './components/DashboardNew/NFTDetails'
import CreateArtistsApp from './components/DashboardNew/CreateArtists'
import MintNFTApp from './components/DashboardNew/MintNFT'
// import EditArtists from "./components/DashboardNew/EditArtists";
import MyNFTCopy from "./components/DashboardNew/MyNFTCopy";
import LauchpadApp from "./components/DashboardNew/Launchpad";
import LauchpadAppdeploy from "./components/DashboardNew/LaunchpadDeploy";
import TopCollections from "./components/DashboardNew/TopCollections";
import TopCategories from "./components/DashboardNew/TopCategories";
import Market from "./components/DashboardNew/Market";
import Deposit from "./components/DashboardNew/Deposit";
import Borrow from "./components/DashboardNew/Borrow";
import Vault from "./components/DashboardNew/Vault";
import MyNFTCopy2 from "./components/DashboardNew/MyNFTCopy2";
import RebaseApp from './components/DashboardNew/Rebase';
import Login from './components/DashboardNew/Login';


// CBDC
import HomeCBDC from './components/DashboardNew/CBDC/Home';
import LoginCBDC from './components/DashboardNew/CBDC/Login';
import SignupCBDC from './components/DashboardNew/CBDC/Signup';
import Nodestatus from './components/DashboardNew/CBDC/Nodestatus';
import Blocks from './components/DashboardNew/CBDC/Blocks';
import Transations from './components/DashboardNew/CBDC/Transations';

import Validators from './components/DashboardNew/CBDC/Validators';
import LoginOtp from "./components/DashboardNew/CBDC/LoginOtp";
import HomeDo from "./components/DashboardNew/CBDC/HomeDo";
import Dashboarduserdetails from './components/DashboardNew/Dashboarduserdetails';
import BNBsidechain from './components/DashboardNew/BNBchain';
import Allkyc from "./ipfs/Allkyc";
const axios = require('axios');


function App() {
  const [dbNFTCreatedata, setdbNFTCreatedata] = useState([""]);    
  const[dbNFTExploredata,setdbNFTExploredata]=useState([""]);   

  // const dbcallalgo=async()=>{    
  //   let req = [];        
  //   if(localStorage.getItem('wallet') === null || localStorage.getItem('wallet') === "" || localStorage.getItem('wallet') === undefined){      
  //   }else{      
  //     firebase.database().ref("imagerefAlgo").child(localStorage.getItem('wallet')).on("value", (data) => {
  //       if (data) {
  //         data.forEach((d) => {            
  //           let value=d.val();
  //           req.push(            
  //             {
  //             Assetid:value.Assetid,
  //             Imageurl:value.Imageurl,
  //             NFTPrice:value.NFTPrice,
  //             EscrowAddress:value.EscrowAddress,
  //             keyId:value.keyId,
  //             NFTName:value.NFTName,
  //             userSymbol:value.userSymbol,
  //             Ipfsurl:value.Ipfsurl,
  //             ownerAddress:value.ownerAddress,
  //             previousoaddress:value.previousoaddress,
  //             TimeStamp:value.TimeStamp,
  //             NFTDescription:value.NFTDescription,
  //             HistoryAddress:value.HistoryAddress,
  //             Appid:value.Appid,
  //             valid:value.valid,
  //             CreatorAddress:value.CreatorAddress
  //             }          
  //           )         
  //         });        
  //       }
  //       setdbNFTCreatedata(req)
  //     });      
  //   }    
  // }   
  // useEffect(()=>{dbcallalgo()},[])

  // const dbcallsalealexplore=async(index)=>{          
  //   axios({
  //     method: 'get',        
      
  //     url:`${configfile['firebaseurl']}/imagerefexploreoneAlgos.json`,
  //     //url:`${configfile['firebaseurl']}/imagerefexploreoneAlgos.json`,
  //     responseType: 'stream'
  //   })
  //     .then(function (response) {
  //     let req = [];        
  //     req.push(response.data)
  //     let req2 =[];
  //     req.forEach((l) => {              
  //       //console.log("D",l)              
  //       Object.keys(l).map(async(k)=>{                                        
  //         const a=l[k];
  //         Object.keys(a).map(async(b)=>{                    
  //         req2.push({                      
  //           Assetid:a[b].Assetid,
  //           Imageurl:a[b].Imageurl,
  //           NFTPrice:a[b].NFTPrice,
  //           EscrowAddress:a[b].EscrowAddress,
  //           keyId:a[b].keyId,
  //           NFTName:a[b].NFTName,
  //           userSymbol:a[b].userSymbol,
  //           Ipfsurl:a[b].Ipfsurl,
  //           ownerAddress:a[b].ownerAddress,
  //           previousoaddress:a[b].previousoaddress,
  //           TimeStamp:a[b].TimeStamp,
  //           NFTDescription:a[b].NFTDescription,
  //           HistoryAddress:a[b].HistoryAddress,
  //           Appid:a[b].Appid,
  //           valid:a[b].valid,
  //           CreatorAddress:a[b].CreatorAddress 
  //           })   
  //         })                                                                                                                
  //       })                                                                     
  //     });                        
  //     setdbNFTExploredata(req2)  
  //     });                    
  // } 
  // useEffect(()=>{dbcallsalealexplore()},[])

  return (
    <DataContext.Provider value={{dbNFTCreatedata,dbNFTExploredata}}>          
    <Router>
      <Switch>
        {/* cbdc */}
        <Route path="/home">
          <HomeCBDC />
        </Route>
        <Route path="/homeduplicate">
          <HomeDo />
        </Route>
        <Route path="/login-cbdc">
          <LoginCBDC />
        </Route>

        <Route path="/sidechain">
          <BNBsidechain />
        </Route>
        <Route path="/otplogin">
          <LoginOtp />
        </Route>
        <Route path="/signup-cbdc">
          <SignupCBDC />
        </Route>
        <Route path="/node-status">
          <Nodestatus />
        </Route>
        <Route path="/blocks">
          <Blocks />
        </Route>
        <Route path="/transations">
          <Transations />
        </Route>
        <Route path="/validators">
          <Validators />
        </Route>

        {/* Multisig */}

        <Route path="/create-multisig">
          <CreateMul />
        </Route>
        <Route path="/multisig-transaction">
          <MulTransaction />
        </Route>
        <Route path="/multisig-wallets">
          <MultisigWallet />
        </Route>

        <Route path="/uploadkyc">
          <UploadKyc />
        </Route>

        <Route path="/viewkycdetails">
          <Viewkycdetails/>
        </Route>
        {/* New Dashboard */}
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/dashboard">
          <DashboardApp />
        </Route>

        <Route path="/dashboarduserdetails">
          <Dashboarduserdetails />
        </Route>
        <Route path="/bond">
          <BondApp />
        </Route>
        <Route path="/rebase">
          <RebaseApp />
        </Route>
        <Route path="/mint">
          <StablecoinApp />
        </Route>
        <Route path="/redeem">
          <RedeemApp />
        </Route>
        <Route path="/farm">
          <FarmApp />
        </Route>
        <Route path="/swap">
          <SwapApp />
        </Route>
 	    	{/* <Route path="/stableswap">
          <StableswapApp />
        </Route> */}
        <Route path="/pool">
          <PoolApp />
        </Route>
        <Route path="/stake">
          <StakeApp />
        </Route>
        <Route path="/find">
          <FindApp />
        </Route>
        <Route path="/faucet">
          <FaucetApp />
        </Route>
        <Route path="/buyback">
          <BuybackApp />
        </Route>
        <Route path="/recollateralize">
          <RecollateralizeApp />
        </Route>                
        <Route path="/redeem-list">
          <RedeemList />
        </Route>                
        {/* <Route path="/hot-collections">
          <HotCollectionsApp />
        </Route>                
        <Route path="/top-collections">
          <TopCollections />
        </Route>                
        <Route path="/top-categories">
          <TopCategories />
        </Route>                
        <Route path="/genesis-market">
          <GenesisMarketApp />
        </Route>                              
        <Route path="/my-NFTcopy">
          <MyNFTCopy />
        </Route>                
        <Route path="/my-NFTcopyy">
          <MyNFTCopy2 />
        </Route>                
        <Route path="/NFT-details">
          <NFTDetailsApp />
        </Route>               */}   
        <Route path="/my-account">
          <MyNFTApp />
        </Route>                
        <Route path="/create-profile">
          <CreateArtistsApp />
        </Route>
        {/* <Route path="/editartists">
          <EditArtists />
        </Route>                    */}
        {/* <Route path="/Mint-NFT">
          <MintNFTApp />
        </Route>                */}
        <Route path="/launchpad">
          <LauchpadApp />
        </Route>         
        <Route path="/launchapaddeploy">
          <LauchpadAppdeploy />
        </Route>     
        {/* <Route path="/market">
          <Market />
        </Route>         
        <Route path="/deposit">
          <Deposit />
        </Route>         
        <Route path="/borrow">
          <Borrow />
        </Route>         
        <Route path="/vault">
          <Vault />
        </Route>          */}

        {/* other */}
        {/* <Route path="/borrow-card">
          <MoneyMarketOrderV2 />
        </Route>
        <Route path="/lending-card">
          <MoneyMarketOrder />
        </Route>
        <Route path="/borrow">
          <MoneyMarketV2 />
        </Route>
        <Route path="/lending">
          <MoneyMarket />
        </Route>
        <Route path="/features">
          <ElementProtocol />
        </Route> */}
        <Route path="/mint">
          <Mint />
        </Route>
        <Route path="/buyback">
          <Buyback />
        </Route>
        <Route path="/recollateraloze">
          <Recollateraloze />
        </Route>
        {/* <Route path="/redeem">
          <Redeem />
        </Route> */}
        <Route path="/faucet">
          <Faucet />
        </Route>
        {/* <Route path="/banking">
          <HomePageBanking />
        </Route> */}
        <Route path="/element">
          <Element />
        </Route>
        <Route path="/single-stake">
          <SingleStake />
        </Route>
        <Route path="/swap-tau">
          <SwapTau />
        </Route>        
        {/* <Route path="/bond">
          <Bond />
        </Route> */}
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/analytics">
          <Analytics />
        </Route>
        <Route path="/bridge">
          <Bridge />
        </Route>
        {/* <Route path="/pool">
          <Pool />
        </Route> */}
        {/* <Route path="/launchpad">
          <Launchpad />
        </Route> */}
        <Route path="/vaults">
          <Vaults />
        </Route>
        {/* <Route path="/farm">
          <Farm />
        </Route> */}
        {/* <Route path="/stake">
          <Stake />
        </Route> */}
        <Route path="/stakebox">
          <Stakebox />
        </Route>
        <Route path="/FarmStaking">
          <FarmStaking />
        </Route>
        {/* <Route path="/swap">
          <Swap />
        </Route> */}
        <Route path="/elemcurrency">
          <HomeV2 />
        </Route>
        <Route path="/singlesideAmm">
          <SinglesideAmm />
        </Route>
        <Route path="/profilec">
          <ProfileNFT />
        </Route>
        <Route path="/explore">
          <Explore/>
        </Route>
        <Route path="/edit">
          <Edit/>
        </Route>
        <Route path="/single">
          <Single/>
        </Route>
        <Route path="/singlebuy">
          <SingleBid/>
        </Route>
        <Route path="/profileViewOtherCopy2New">
          <ProfileViewOtherCopy2New/>
        </Route>        
        <Route path="/liquidity">
          <Liquidity />
        </Route>
        <Route path="/homePageNft">
          <HomePageNft/>
        </Route>        
        <Route path="/dashboardd">
          <DashboardKyc/>
        </Route>     
        <Route path="/viewkyc">
          <View/>
        </Route> 
        <Route path="/create-asset">
          <CreateKyc/>
        </Route> 
        <Route path="/mint-burn-asset">
          <MintBurn/>
        </Route> 
        <Route path="/freeze-asset">
          <Approvepage/>
        </Route>
        <Route path="/dashboardAMM">
          <DashboardAMM/>
        </Route>
        <Route path="/stableswap">
          <StableswapApp />
        </Route>
        <Route path="/CDBC_Hub">
        <CDBC_Hub />
        </Route>
        <Route path="/">
          <LoginCBDC />
        </Route>
      </Switch>
    </Router>
    </DataContext.Provider>
  );
}

export default App;