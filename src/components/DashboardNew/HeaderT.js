import React, { useState, useEffect } from 'react';
import { Button, Dropdown, Modal, Badge } from 'react-bootstrap';
import {
    NavLink as Link
  } from "react-router-dom";
  import { useHistory,Redirect, useLocation } from "react-router-dom";
import web3 from '../../web3';
import Logo from '../../assets/images/element-logo-2-dot.png'
import PeraWalletLogo from '../../assets/images/PeraWalletLogo.svg';
import MyAlgoLogo from '../../assets/images/MetaMask_Fox.png';

import Sidebar from './Sidebar';
import node from './nodeapi.json';
import { uservisit } from '../../firedbstore';
import axios from 'axios';
import { AppId,escrowProgram } from "../swapConfig";


import MyAlgoConnect from '@randlabs/myalgo-connect';

import WalletConnect from "@walletconnect/client";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import { bnbbalance } from '../formula';
import { toast } from 'react-toastify';

const algosdk = require('algosdk');
const myAlgoWallet = new MyAlgoConnect();
const algodClient = new algosdk.Algodv2('', node['algodclient'], '');
const indexClient = new algosdk.Indexer('', node['indexerclient'], '');

const Header = (props) => {
    const history = useHistory()
    const location = useLocation();
    const [show, setShow] = useState(false);
    const [connectedShow, setConnectedShow] = useState(false);
    const [sidebar, setSidebar] = useState(false);
    const [connector, setConnector] = useState("");
    const [connected, setConnected] = useState(false);
    const[walletconnect,setwalletconnect]=useState();
    const [currentAccount, setCurrentAccount] = useState();
    const [walletbalance, setwalletbalance] = useState();
    const [chainName, setChainName] = useState(true);
    const [option, setOption] = useState("Switch Chain");
    const [option1, setOption1] = useState("Polygon");

    const handleChainNameB = () => setChainName(false);
    const handleChainNameA = () => setChainName(true); 

    const [networkName, setNetworkName] = useState(true);
    const [networkoption, setnetworkOption] = useState("Switch network");
    const handleNetworkNameBN = () => setNetworkName(false);
    const handleNetworkNameAN = () => setNetworkName(true); 

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleConnectedClose = () => setConnectedShow(false);
    const handleConnectedShow = () => setConnectedShow(true);

    const handleSidebar = () => {setSidebar(!sidebar)};
    props.func(sidebar);

    const [assetCount, setAssetCount] = useState("");
    const [algoBalance, setAlgoBalance] = useState("");
    const [copyButton, setCopyButton] = useState(false);
    const [showConnect, setShowConnect] = useState(false);
    const handleShowConnect = () => setShowConnect(true);
    const handleCloseConnect = () => setShowConnect(false);

    const [showConnectPera, setShowConnectPera] = useState(false);
    const handleShowConnectPera = () => setShowConnectPera(true);
    const handleCloseConnectPera = () => setShowConnectPera(false);

    const [themeState, setThemeState] = useState(false);

    const handleThemeDark = () => {
        setThemeState(false);  
        localStorage.removeItem('Theme', 'light');
        document.body.classList.remove('light-mode');      
    }
    const handleThemeLight = () => {
        setThemeState(true);  
        localStorage.setItem('Theme', 'light');
        document.body.classList.add('light-mode');      
    }

    const getTheme = localStorage.getItem('Theme');
    if(getTheme === 'light') {
        document.body.classList.add('light-mode');
    }
         
    useEffect(() => {        
        const getTheme = localStorage.getItem('Theme');
        if(getTheme === 'light') {
            setThemeState(true);
        }
    })    

    const handleCopy = () =>{setCopyButton(false)};
    const handleCopied = () =>{setCopyButton(true)};
    const isMetaMaskInstalled = () => {
        //Have to check the ethereum binding on the window object to see if it's installed
        const { ethereum } = window;
        return Boolean(ethereum && ethereum.isMetaMask);
      };
    const connectWallet=async()=>{     
        var metamaskcheck= await isMetaMaskInstalled();
        if(metamaskcheck){
        localStorage.setItem("walletName", "Metamask");             
        const networkid=await web3.eth.getChainId();
        console.log("network id",networkid);
        if(networkid!=80001){
            const chainId = 80001
            // toast.warning("Please switch to PolygonTestnet(mumbai)");
            // window.open('https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn', '_blank','noreferrer');
            await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    chainName: 'Polygon Testnet',
                    chainId: web3.utils.toHex(chainId),
                    nativeCurrency: { name: 'MATIC', decimals: 18, symbol: 'MATIC' },
                    rpcUrls: ['https://polygon-mumbai.infura.io/v3/4458cf4d1689497b9a38b1d6bbf05e78']
                  }
                ]
              });
              toast.success("Testnetwork(Mumbai) added to your Metamask!")
            //   window.location.reload()
        // setIsOpen(true);
        // setDis("Connected to Wrong Network,Please connect to Binance Testnet");
        }else{

        
        window.ethereum.enable();  
        
        const accounts =await web3.eth.getAccounts();
       // web3.eth.getChainId().then(console.log);
       // const networkid=await web3.eth.getChainId();
       // console.log("network id",networkid);
        await web3.eth.getAccounts().then(()=>{          
            console.log("acc Binance",accounts[0])
            setwalletconnect(accounts[0])
            window.wallet=accounts[0];
           
            localStorage.setItem("walletAddress", accounts[0]);
            setShowButton(false);
           //sessionStorage.setItem("wallet", accounts[0]);
          }).then(()=>{
              window.location.reload()
          })
        console.log(accounts);
        }  
    }else{  
        window.open('https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn', '_blank','noreferrer');
      
      }
    }

    const changeaccount=async()=>{
        await Disconnect();
        await connectWallet();
    }

//    const connectWallet = async () => {



    
//     localStorage.setItem("walletName", "Metamask");
//         try {
//             handleCopy();

//             let settings = {
//                 shouldSelectOneAccount: true,
//                 openManager: true
//             }

//           const accounts = await myAlgoWallet.connect(settings);
//           const addresses = accounts.map((account) => account.address);

//           console.log("addresses : ", addresses);
//           localStorage.setItem("walletAddress", addresses[0]);
//           localStorage.setItem("UserType", "wallet");
//             await countAsset();
//           window.location.reload();
//           setShowButton(false);
//         } catch (err) {
//           console.error(err);
//         }
//       };
      const [showButton, setShowButton] = useState(true);
      let walletAddress = localStorage.getItem("walletAddress");
      const wallet = async() => {
        let v = localStorage.getItem("walletAddress");
        if(v){
          setShowButton(false)
        //   await uservisit("myalgowallet");
        }
        else{
          setShowButton(true)
        }
      }
      useEffect(() =>{wallet()},[localStorage.getItem("walletAddress"),showButton])
    
     
    
      const Disconnect = async() => {
        localStorage.setItem("walletAddress","");
        localStorage.setItem("walletName", "");
        window.location.reload()
      }

    //   const connectPeraWallet = async () => {
    //     localStorage.setItem("walletName", "PeraWallet");
    //     try {
    //       const bridge = "https://bridge.walletconnect.org";
    //       const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
    //       setConnector(connector);
    //       localStorage.setItem("connector", connector);
    //       console.log(connector._accounts);
    //       localStorage.setItem("walletAddress", connector._accounts[0]);
    //       setShowButton(false);
    //       if (!connector.connected) {
    //         await connector.createSession();
    //         console.log("Creating new connector session");
    //       }  
    //      window.location.reload();
    //     } catch(error) {
    //       console.log("something didn't work in creating connector", error);
    //     }
    //   }  
      
    // const checkIfWalletIsConnected = async () => {
    //     try {
    //       if (!connected) {
    //         console.log("No connection");
    //         return;
    //       } else {
    //         console.log("We have connection", connector);
    //       }
  
    //       const { accounts }  = connector;
    
    //       if (accounts.length !== 0) {
    //         const account = accounts[0];
    //         console.log("Found an authorized account:", account);
    //         setCurrentAccount(account);
    //         // await getAllRecs(); IMPORTANT FOR FUNCTIONALITY LATER
    //       } else {
    //         setCurrentAccount();
    //         console.log("No authorized account found");
    //       }
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }
      
    //   const connectPeraWallet = async () => {
    //     localStorage.setItem("walletconnect", "");
    //     localStorage.setItem("walletName", "PeraWallet");
    //     try {
    //       const bridge = "https://bridge.walletconnect.org";
    //       const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
    //       setConnector(connector);
    //       console.log("connector",connector);
    //       // window.localStorage.setItem("connector", connector);
    //       // console.log("connector local", JSON.parse(window.localStorage.getItem("connector")));
    //       localStorage.setItem("walletAddress", connector._accounts[0]);
    //       if (!connector.connected) {
    //         await connector.createSession();
    //         console.log("Creating new connector session");
    //       }
  
    //       connector.on("connect", (error, payload) => {
    //         if (error) {
    //           throw error;
    //         }
    //         // Get provided accounts
    //         const { accounts } = payload.params[0];
    //         console.log("connector.on connect: Connected an account with address:", accounts[0]);
    //         setConnector(connector);
    //         setConnected(true);
    //         localStorage.setItem("walletAddress", connector._accounts[0]);
    //         setCurrentAccount(accounts[0]);
    //         handleClose();
    //         window.location.reload();
    //         // localStorage.setItem("walletAddress", connector._accounts[0]);
            
    //       });
  
    //       connector.on("session_update", (error, payload) => {
    //         if (error) {
    //           throw error;
    //         }
    //         // Get updated accounts 
    //         const { accounts } = payload.params[0];
    //         setCurrentAccount(accounts[0])
    //       });
  
    //       connector.on("disconnect", (error, payload) => {
    //         if (error) {
    //           throw error;
    //         }
    //         setCurrentAccount();
    //         setConnected(false);
    //         setConnector();
    //       });
          
    //       if (connector.connected) {
    //         const {accounts} = connector;
    //         const account = accounts[0];
    //         setCurrentAccount(account);
    //         setConnected(true);
    //       }
    //     } catch(error) {
    //       console.log("something didn't work in creating connector", error);
    //     }
    //   } 

    //   const disconnectPeraWallet = async () => {
    //     const bridge = "https://bridge.walletconnect.org";
    //     const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
    //     setConnector(connector);
    //     connector.killSession();
    //     console.log("Killing session for wallet with address: ", currentAccount);
    //     setCurrentAccount();
    //      setConnector();
    //     // localStorage.setItem("walletName", "");
    //      localStorage.setItem("walletAddress", "");
    //     localStorage.setItem("walletconnect", "");
    //     setConnected(false);
        
    //     window.location.reload();
    //   }

      const getBalance = async () => {
      let accinfo =await bnbbalance();
        //let accountinfo =await fetch("https://api-testnet.bscscan.com/api?module=account&action=balance&address=0xEB50a80F7DE37AF8669b0C4973B2A33E8502c5a7&apikey=YourApiKeyToken");
        //console.log("Account Balance in Bnb:",(await accountinfo.json()).result);
       // let result=await accountinfo.json();
       console.log("result",accinfo);
        setwalletbalance(accinfo/1000000000000000000);
        localStorage.setItem("walletbalance",accinfo/1000000000000000000)
        // if(localStorage.getItem("walletName") === "myAlgoWallet"){
        // await uservisit("myAlgoWallet");
        // }
        // else if(localStorage.getItem("walletName") === "PeraWallet"){
        // await uservisit("perawallet");
        // }
      }
      useEffect(() => {
        // checkIfWalletIsConnected();
        getBalance();
        console.log('currentAccount:', currentAccount);
      }, [])

      useEffect(async() => {
        await countAsset()
    }, [assetCount, algoBalance]);

      const countAsset = async () =>
      {

            let accountInfo = await indexClient.lookupAccountByID(localStorage.getItem("walletAddress")).do();            
        // console.log(accountInfo);
        // if(accountInfo['account']['assets'] === null)
        // {
        //     setAssetCount(0);
        // }
        // else
        // {
        //     setAssetCount(accountInfo['account']['assets']['length']);
        // }
        setAlgoBalance(accountInfo['account']['amount']);
      }

const copyCheck = () =>
{
    navigator.clipboard.writeText(localStorage.getItem("walletAddress"));
    handleCopied() 
}

const walletCheck = () =>
{
    if(localStorage.getItem("walletName") === "Metamask")
    {
        handleShowConnect();
    }
    else if(localStorage.getItem("walletName") === "Metamask")
    {
      handleShowConnectPera();
    }
}

// useEffect(() => {
//   setConnector(JSON.parse(window.localStorage.getItem('connector')));
// }, []);

// useEffect(() => {
//   window.localStorage.setItem('connector', connector);
// }, [connector]);
const[storereem,setstoreredeem] = useState([]);
useEffect(()=>{checkredeem()},[])
const checkredeem = async()=>{
    let ln = await axios.get(`${node['indexerclient']}/v2/accounts/${localStorage.getItem("walletAddress")}/apps-local-state?application-id=${AppId}`);
    console.log("lnvalue",ln.data['apps-local-states']['0']['key-value'].length)
   setstoreredeem(ln.data['apps-local-states']['0']['key-value'].length);
}

const AlgorandLaunch = () =>
{
    window.location.href = "https://sandboxv1.elementfi.io/";
}

useEffect(async() => {
    switchChain()
}, [option, chainName]);

const switchChain = () =>
{
    if(chainName === true)
    {
        setOption("TestNetwork");
    }
    else if(chainName === false)
    {
        setOption("DevNetwork");
    }
    else
    {
        setOption("MainNetwork");
    }
}


useEffect(async() => {
    switchnetwork()
}, [networkoption, networkName]);

const switchnetwork = () =>
{
    if(networkName === true)
    {
        setnetworkOption("PolygonNetwork");
    }
   
    else
    {
        setnetworkOption("AlgorandNetwork");
    }
}
const logout=async()=> {                
    try {
        localStorage.setItem("Login",false)
        //await auth.signOut()            
        history.push("/login-cbdc")
        window.location.reload(false)
      } catch(e){
        console.log("Error",e)
        //setError("Failed to log out")
      }
    
}

if(localStorage.getItem('Login') === false || localStorage.getItem('Login') === null || localStorage.getItem('Login') === undefined || localStorage.getItem('Login') === "" || localStorage.getItem('Login') === "false"){            
    return <Redirect to="/login-cbdc" state={{ from: location }}/>;
} else  {        
    return (
        <>
            <div className='header-navigation d-flex align-items-center'>
                <Button variant="transparent" className='btn text-white p-0 d-none d-xl-block me-2' onClick={handleSidebar}>
                    {sidebar ? 
                    <svg viewBox="0 0 24 24" width="32px" color="textSubtle" xmlns="http://www.w3.org/2000/svg" class="sc-bdfBwQ gBefXE"><path d="M4 18H20C20.55 18 21 17.55 21 17C21 16.45 20.55 16 20 16H4C3.45 16 3 16.45 3 17C3 17.55 3.45 18 4 18ZM4 13H20C20.55 13 21 12.55 21 12C21 11.45 20.55 11 20 11H4C3.45 11 3 11.45 3 12C3 12.55 3.45 13 4 13ZM3 7C3 7.55 3.45 8 4 8H20C20.55 8 21 7.55 21 7C21 6.45 20.55 6 20 6H4C3.45 6 3 6.45 3 7Z"></path></svg>
                    
                    : 
                    
                    <svg viewBox="0 0 24 24" className='m-0' width="32" fill='currentColor' height="32" xmlns="http://www.w3.org/2000/svg"><path d="M4 18H15C15.55 18 16 17.55 16 17C16 16.45 15.55 16 15 16H4C3.45 16 3 16.45 3 17C3 17.55 3.45 18 4 18ZM4 13H12C12.55 13 13 12.55 13 12C13 11.45 12.55 11 12 11H4C3.45 11 3 11.45 3 12C3 12.55 3.45 13 4 13ZM3 7C3 7.55 3.45 8 4 8H15C15.55 8 16 7.55 16 7C16 6.45 15.55 6 15 6H4C3.45 6 3 6.45 3 7ZM20.3 14.88L17.42 12L20.3 9.12C20.69 8.73 20.69 8.1 20.3 7.71C19.91 7.32 19.28 7.32 18.89 7.71L15.3 11.3C14.91 11.69 14.91 12.32 15.3 12.71L18.89 16.3C19.28 16.69 19.91 16.69 20.3 16.3C20.68 15.91 20.69 15.27 20.3 14.88Z"></path></svg>
                    }

                </Button>
                <Link to="/home" className=""><img src={Logo} alt="Logo" /></Link>

                <div className="header-navigation-control ms-auto d-flex align-items-center">
                <Dropdown className="ms-2 me-2">
                        <Dropdown.Toggle variant="grad" className='text-white' id="dropdown-basic">
                            {option}
                        </Dropdown.Toggle>

                        <Dropdown.Menu align="end">
                            <Dropdown.Item className='d-flex align-items-center' onClick={() => handleChainNameA()}>
                                TestNetwork(Mumbai)
                            </Dropdown.Item>
                            {/* <Dropdown.Item className='d-flex align-items-center' onClick={() => handleChainNameB()}>
                                DevNetwork
                            </Dropdown.Item> */}
                            <Dropdown.Item className='d-flex align-items-center' onClick={() => handleChainNameB()}>
                               MainNetwork
                            </Dropdown.Item>
                        </Dropdown.Menu>
                </Dropdown>
                {/* <Dropdown className="ms-2 me-2">
                        <Dropdown.Toggle variant="grad" className='text-white' id="dropdown-basic">
                            {option1}
                        </Dropdown.Toggle>
                        <Dropdown.Menu align="end">
                        <Dropdown.Item className='d-flex align-items-center' onClick={() => AlgorandLaunch()}>
                                Algorand
                            </Dropdown.Item>
                            <Dropdown.Item disabled  className='d-flex align-items-center' onClick={() => handleChainNameA()}>
                                Binance &nbsp;
                            </Dropdown.Item>
                        </Dropdown.Menu>
                </Dropdown> */}
                <Button className='btn btn-blue d-sm-block d-none' onClick={()=>{logout()}}>
                    <svg width="20" height="20" className='me-2 ms-0' viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg"><path d="M21 18V19C21 20.1 20.1 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.89 3 5 3H19C20.1 3 21 3.9 21 5V6H12C10.89 6 10 6.9 10 8V16C10 17.1 10.89 18 12 18H21ZM12 16H22V8H12V16ZM16 13.5C15.17 13.5 14.5 12.83 14.5 12C14.5 11.17 15.17 10.5 16 10.5C16.83 10.5 17.5 11.17 17.5 12C17.5 12.83 16.83 13.5 16 13.5Z"></path></svg>
                    Sign Out
                </Button>&nbsp;&nbsp;         

                { showButton ? 
                              <>
                               {/* <Link to="/login" className='btn btn-blue d-sm-block d-none me-2 ms-0' >
                               <svg className='me-2' width="20" height="20" viewBox="0 0 24 24"><path d="M14 9v2h-4v-2c0-1.104.897-2 2-2s2 .896 2 2zm10 3c0 6.627-5.373 12-12 12s-12-5.373-12-12 5.373-12 12-12 12 5.373 12 12zm-8-1h-1v-2c0-1.656-1.343-3-3-3s-3 1.344-3 3v2h-1v6h8v-6z" fill="currentColor"/></svg>
                               Log In or Sign Up
                               </Link> */}
                               <Button className='btn btn-blue d-sm-block d-none' onClick={handleShow}>
                                   <svg width="20" height="20" className='me-2 ms-0' viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg"><path d="M21 18V19C21 20.1 20.1 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.89 3 5 3H19C20.1 3 21 3.9 21 5V6H12C10.89 6 10 6.9 10 8V16C10 17.1 10.89 18 12 18H21ZM12 16H22V8H12V16ZM16 13.5C15.17 13.5 14.5 12.83 14.5 12C14.5 11.17 15.17 10.5 16 10.5C16.83 10.5 17.5 11.17 17.5 12C17.5 12.83 16.83 13.5 16 13.5Z"></path></svg>
                                   Connect wallet
                               </Button></> :
                           <> <Button className='btn btn-blue d-sm-block d-none'>{parseFloat(walletbalance).toFixed(3)} MATIC </Button>&nbsp;&nbsp; <Button className='btn btn-blue d-sm-block d-none' onClick={walletCheck}>
                           <svg width="20" height="20" className='me-2 ms-0' viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg"><path d="M21 18V19C21 20.1 20.1 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.89 3 5 3H19C20.1 3 21 3.9 21 5V6H12C10.89 6 10 6.9 10 8V16C10 17.1 10.89 18 12 18H21ZM12 16H22V8H12V16ZM16 13.5C15.17 13.5 14.5 12.83 14.5 12C14.5 11.17 15.17 10.5 16 10.5C16.83 10.5 17.5 11.17 17.5 12C17.5 12.83 16.83 13.5 16 13.5Z"></path></svg>
                           {(localStorage.getItem("walletAddress")).substring(0, 4)}...{(localStorage.getItem("walletAddress")).substring((localStorage.getItem("walletAddress")).length -4, (localStorage.getItem("walletAddress")).length)}
                       </Button></>
                           }
                    { showButton ? <Button className='btn btn-blue d-sm-none' onClick={handleShow}>
                        <svg width="20" height="20" className='m-0' viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg"><path d="M21 18V19C21 20.1 20.1 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.89 3 5 3H19C20.1 3 21 3.9 21 5V6H12C10.89 6 10 6.9 10 8V16C10 17.1 10.89 18 12 18H21ZM12 16H22V8H12V16ZM16 13.5C15.17 13.5 14.5 12.83 14.5 12C14.5 11.17 15.17 10.5 16 10.5C16.83 10.5 17.5 11.17 17.5 12C17.5 12.83 16.83 13.5 16 13.5Z"></path></svg>
                    </Button> : <><Button className='btn btn-blue d-sm-none'>{parseFloat(walletbalance).toFixed(3)}MATIC </Button>&nbsp;&nbsp;
                    <Button className='btn btn-blue d-sm-none' onClick={walletCheck}>
                    <svg width="20" height="20" className='m-0' viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg"><path d="M21 18V19C21 20.1 20.1 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.89 3 5 3H19C20.1 3 21 3.9 21 5V6H12C10.89 6 10 6.9 10 8V16C10 17.1 10.89 18 12 18H21ZM12 16H22V8H12V16ZM16 13.5C15.17 13.5 14.5 12.83 14.5 12C14.5 11.17 15.17 10.5 16 10.5C16.83 10.5 17.5 11.17 17.5 12C17.5 12.83 16.83 13.5 16 13.5Z"></path></svg>
                </Button></>}

                    <Dropdown className="ms-2">
                        <Dropdown.Toggle variant="grad" className='text-white noarrow' id="dropdown-basic">
                        <svg class="m-0" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6 10C4.9 10 4 10.9 4 12C4 13.1 4.9 14 6 14C7.1 14 8 13.1 8 12C8 10.9 7.1 10 6 10ZM18 10C16.9 10 16 10.9 16 12C16 13.1 16.9 14 18 14C19.1 14 20 13.1 20 12C20 10.9 19.1 10 18 10ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"></path></svg>
                        </Dropdown.Toggle>

                        <Dropdown.Menu align="end">
                            {/* <Dropdown.Item className='d-flex align-items-center' href="https://docs.elementfi.io/" target="_blank" rel="noreferer">
                                <svg class="dark-theme-white-10 me-2 ms-0" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M18 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V4C20 2.9 19.1 2 18 2ZM6 4H11V12L8.5 10.5L6 12V4Z"></path></svg>
                                Docs
                            </Dropdown.Item>
                            <Dropdown.Item className='d-flex align-items-center' href="https://twitter.com/ElementDeFi" target="_blank" rel="noreferer">
                                <svg class="dark-theme-white-10 me-2 ms-0" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 7.5C19.4 7.8 18.8 7.9 18.1 8C18.8 7.6 19.3 7 19.5 6.2C18.9 6.6 18.2 6.8 17.4 7C16.8 6.4 15.9 6 15 6C13.3 6 11.8 7.5 11.8 9.3C11.8 9.6 11.8 9.8 11.9 10C9.2 9.9 6.7 8.6 5.1 6.6C4.8 7.1 4.7 7.6 4.7 8.3C4.7 9.4 5.3 10.4 6.2 11C5.7 11 5.2 10.8 4.7 10.6C4.7 12.2 5.8 13.5 7.3 13.8C7 13.9 6.7 13.9 6.4 13.9C6.2 13.9 6 13.9 5.8 13.8C6.2 15.1 7.4 16.1 8.9 16.1C7.8 17 6.4 17.5 4.8 17.5C4.5 17.5 4.3 17.5 4 17.5C5.5 18.4 7.2 19 9 19C15 19 18.3 14 18.3 9.7C18.3 9.6 18.3 9.4 18.3 9.3C19 8.8 19.6 8.2 20 7.5Z"></path></svg>
                                Twitter
                            </Dropdown.Item>
                            <Dropdown.Item className='d-flex align-items-center' href="https://t.me/ElementDeFi" target="_blank" rel="noreferer">
                                <svg class="dark-theme-white-10 me-2 ms-0" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.1984 3.39554L3.14711 10.4923C3.14711 10.4923 2.34095 10.7854 2.40335 11.3259C2.46743 11.8673 3.12527 12.115 3.12527 12.115L7.41575 13.6467C7.41575 13.6467 8.71079 18.1519 8.96567 19.0092C9.22055 19.8641 9.42503 19.8843 9.42503 19.8843C9.66239 19.9937 9.87815 19.8195 9.87815 19.8195L12.6501 17.1389L16.9704 20.653C18.1389 21.1937 18.5642 20.0671 18.5642 20.0671L21.6 3.82442C21.6 2.7425 20.1984 3.39554 20.1984 3.39554ZM17.1797 18.7608L12.5577 15.0024L11.1235 16.3889L11.4389 13.4391L17.5997 7.6001L9.20183 12.5859L5.47679 11.2563L19.6889 5.34074L17.1797 18.7608Z"></path></svg>
                                Telegram
                            </Dropdown.Item>
                            <Dropdown.Item className='d-flex align-items-center' href="https://discord.com/invite/urquv6EWYs" target="_blank" rel="noreferer">
                                <svg class="dark-theme-white-10 me-2 ms-0" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M13.914 14.58C13.7537 14.6191 13.5923 14.6538 13.43 14.684C12.5494 14.8498 11.6453 14.8464 10.766 14.674C10.612 14.644 10.394 14.591 10.113 14.516L9.192 15.713C6.919 15.64 6.055 14.117 6.055 14.117C6.055 10.736 7.536 7.995 7.536 7.995C9.017 6.862 10.426 6.893 10.426 6.893L10.829 7.418C10.8661 7.41279 10.9035 7.40946 10.941 7.408C11.7092 7.30617 12.4877 7.30954 13.255 7.418L13.697 6.893C13.697 6.893 15.107 6.862 16.587 7.996C16.587 7.996 18.069 10.736 18.069 14.117C18.069 14.117 17.194 15.639 14.921 15.713L13.914 14.579V14.58ZM10.076 11C9.475 11 9 11.45 9 12C9 12.55 9.485 13 10.076 13C10.676 13 11.151 12.55 11.151 12C11.161 11.45 10.677 11 10.076 11ZM13.924 11C13.324 11 12.849 11.45 12.849 12C12.849 12.55 13.334 13 13.924 13C14.525 13 15 12.55 15 12C15 11.45 14.525 11 13.924 11ZM21 23L16.01 18H19V4H5V18H16.003L16.573 20H5C4.46957 20 3.96086 19.7893 3.58579 19.4142C3.21071 19.0391 3 18.5304 3 18V4C3 3.46957 3.21071 2.96086 3.58579 2.58579C3.96086 2.21071 4.46957 2 5 2H19C19.5304 2 20.0391 2.21071 20.4142 2.58579C20.7893 2.96086 21 3.46957 21 4V23Z"></path></svg>
                                Discord
                            </Dropdown.Item>
                            <Dropdown.Item className='d-flex align-items-center' href="https://medium.com/@elementdefi" target="_blank" rel="noreferer">
                                <svg class="dark-theme-white-10 me-2 ms-0" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 18C10.8137 18 13.5 15.3137 13.5 12C13.5 8.68629 10.8137 6 7.5 6C4.18629 6 1.5 8.68629 1.5 12C1.5 15.3137 4.18629 18 7.5 18Z"></path><path d="M16.875 17.625C18.3247 17.625 19.5 15.1066 19.5 12C19.5 8.8934 18.3247 6.375 16.875 6.375C15.4253 6.375 14.25 8.8934 14.25 12C14.25 15.1066 15.4253 17.625 16.875 17.625Z"></path><path d="M21.375 17.25C21.9963 17.25 22.5 14.8995 22.5 12C22.5 9.1005 21.9963 6.75 21.375 6.75C20.7537 6.75 20.25 9.1005 20.25 12C20.25 14.8995 20.7537 17.25 21.375 17.25Z"></path></svg>
                                Medium
                            </Dropdown.Item>
                            <Dropdown.Item className='d-flex align-items-center' href="https://github.com/BosonLabs/" target="_blank" rel="noreferer">
                                <svg class="dark-theme-white-10 me-2 ms-0" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 4C7.6 4 4 7.6 4 12C4 15.5 6.3 18.5 9.5 19.6C9.9 19.7 10 19.4 10 19.2C10 19 10 18.5 10 17.8C7.8 18.3 7.3 16.8 7.3 16.8C6.9 15.9 6.4 15.6 6.4 15.6C5.7 15.1 6.5 15.1 6.5 15.1C7.3 15.2 7.7 15.9 7.7 15.9C8.4 17.2 9.6 16.8 10 16.6C10.1 16.1 10.3 15.7 10.5 15.5C8.7 15.3 6.9 14.6 6.9 11.5C6.9 10.6 7.2 9.9 7.7 9.4C7.6 9.2 7.3 8.4 7.8 7.3C7.8 7.3 8.5 7.1 10 8.1C10.6 7.9 11.3 7.8 12 7.8C12.7 7.8 13.4 7.9 14 8.1C15.5 7.1 16.2 7.3 16.2 7.3C16.6 8.4 16.4 9.2 16.3 9.4C16.8 10 17.1 10.7 17.1 11.5C17.1 14.6 15.2 15.2 13.4 15.4C13.7 15.8 14 16.3 14 17C14 18.1 14 18.9 14 19.2C14 19.4 14.1 19.7 14.6 19.6C17.8 18.5 20.1 15.5 20.1 12C20 7.6 16.4 4 12 4Z"></path></svg>
                                Code
                            </Dropdown.Item> */}
                        <Dropdown.Item className='d-flex align-items-center' href="#" target="_blank" rel="noreferer">
                                <svg class="dark-theme-white-10 me-2 ms-0" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M18 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V4C20 2.9 19.1 2 18 2ZM6 4H11V12L8.5 10.5L6 12V4Z"></path></svg>
                                Docs
                            </Dropdown.Item>
                            <Dropdown.Item className='d-flex align-items-center' href="https://www.linkedin.com/company/elementcbdc/" target="_blank" rel="noreferer">
                            <svg xmlns="http://www.w3.org/2000/svg" class="dark-theme-white-10 me-2 ms-0" width="20" height="20" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                                LinkedIn
                            </Dropdown.Item>
                            <Dropdown.Item className='d-flex align-items-center' href="https://twitter.com/SigmaHQX" target="_blank" rel="noreferer">
                            <svg class="dark-theme-white-10 me-2 ms-0" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 18.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25c.691 0 1.25.56 1.25 1.25s-.559 1.25-1.25 1.25zm1.961-5.928c-.904.975-.947 1.514-.935 2.178h-2.005c-.007-1.475.02-2.125 1.431-3.468.573-.544 1.025-.975.962-1.821-.058-.805-.73-1.226-1.365-1.226-.709 0-1.538.527-1.538 2.013h-2.01c0-2.4 1.409-3.95 3.59-3.95 1.036 0 1.942.339 2.55.955.57.578.865 1.372.854 2.298-.016 1.383-.857 2.291-1.534 3.021z"/></svg>
                                Support
                            </Dropdown.Item>
                            <hr />
                            {themeState ? (
                                    <Dropdown.Item onClick={() => handleThemeDark()} className='d-flex align-items-center'>
                                        <svg class="dark-theme-white-10 me-2 ms-0" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M10 2C8.18 2 6.47 2.5 5 3.35C7.99 5.08 10 8.3 10 12C10 15.7 7.99 18.92 5 20.65C6.47 21.5 8.18 22 10 22C15.52 22 20 17.52 20 12C20 6.48 15.52 2 10 2Z"></path></svg>
                                        Dark Theme
                                    </Dropdown.Item>
                                ): (
                                    <Dropdown.Item onClick={() => handleThemeLight()} className='d-flex align-items-center'>
                                        <svg class="dark-theme-white-10 me-2 ms-0" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6.76 4.83999L4.96 3.04999L3.55 4.45999L5.34 6.24999L6.76 4.83999ZM4 10.5H1V12.5H4V10.5ZM13 0.549988H11V3.49999H13V0.549988ZM20.45 4.45999L19.04 3.04999L17.25 4.83999L18.66 6.24999L20.45 4.45999ZM17.24 18.16L19.03 19.96L20.44 18.55L18.64 16.76L17.24 18.16ZM20 10.5V12.5H23V10.5H20ZM12 5.49999C8.69 5.49999 6 8.18999 6 11.5C6 14.81 8.69 17.5 12 17.5C15.31 17.5 18 14.81 18 11.5C18 8.18999 15.31 5.49999 12 5.49999ZM11 22.45H13V19.5H11V22.45ZM3.55 18.54L4.96 19.95L6.75 18.15L5.34 16.74L3.55 18.54Z"></path></svg>
                                        Light Theme
                                    </Dropdown.Item>
                                )}
                            <hr />
                        </Dropdown.Menu>
                    </Dropdown>

                    <Button variant="grad" className='btn d-xl-none ms-2' onClick={handleSidebar}>
                        <svg width="22" height="22" className='m-0' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="#fff"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                    </Button>
                </div>
            </div>

            <Modal show={show} className="modal-dashboard" centered onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Connect to a wallet</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <Button variant='gray' className='d-flex p-3 mb-20 justify-content-between w-100 align-items-center' onClick={connectWallet}>
                        <span className='text-white'>metamaskpera</span>
                        <img src={PeraWalletLogo} alt="Pera Wallet" />
                    </Button> */}
                    <Button variant='gray' className='d-flex p-3 justify-content-between w-100 align-items-center' onClick={connectWallet}>
                        <span className='text-white'>Metamask</span>
                        <img src={MyAlgoLogo} style={{height: "50px",  width: "50px"}} alt="My Algo Wallet" />
                                               
                                                
                                           
                    </Button>
                </Modal.Body>
            </Modal>

            <Modal show={connectedShow} className="modal-dashboard" centered onHide={handleConnectedClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Manage Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Button variant='gray' className='d-flex p-3 mb-20 justify-content-between w-100 align-items-center' onClick={connectWallet}>
                        <span className='text-white'>Accounts</span>
                        {/* <img src={PeraWalletLogo} alt="MetaMask" /> */}
                    </Button>
                    <Button variant='gray' className='d-flex p-3 justify-content-between w-100 align-items-center' onClick={Disconnect}>
                        <span className='text-white'>Disconnect</span>
                        {/* <img src={MyAlgoLogo} alt="My Algo Wallet" /> */}
                    </Button>
                </Modal.Body>
            </Modal>

            <Modal show={showConnect} className="modal-dashboard" centered onHide={handleCloseConnect}>
                <Modal.Header closeButton>
                    <Modal.Title>Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <h6 className='mb-2 me-auto'>Connected with MetaMask</h6>
                    <div className="d-flex flex-wrap mb-3 align-items-center">
                        
                        {/* <br></br> */}
                        <Button variant="warning" className='btn-xs mb-2 ms-1' onClick={Disconnect}>Disconnect</Button>
                        {/* <Button variant="primary" className='btn-xs mb-2 ms-1' onClick={changeaccount}>Change Account</Button> */}
                        {/* <Button variant="blue" className='btn-xs mb-2 ms-1'>Redeem</Button> */}
                        {/* <br></br>
                        <div> {storereem >= 1 ? (<>
                        <Link to="/redeem-list" ><Button variant="primary" className='btn-xs mb-2 ms-1'>Redeem Excess Amount</Button></Link>
                       </>):(<></>)}</div> */}

                    </div>
<div> {storereem >= 1 ? (<>
                        <Link to="/redeem-list" ><Button variant="primary" className='btn-xs mb-2 ms-1'>Redeem Excess Amount</Button></Link>
                       </>):(<></>)}</div>
                    <div className="account-number mb-3 d-flex align-items-center">
                        <svg width="14" height="14" className='me-2' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#3CC13B"><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"></path></svg>
                            {localStorage.getItem("walletAddress") === null || localStorage.getItem("walletAddress") === undefined || localStorage.getItem("walletAddress") === "" ?(
                            <>NAN</>
                        ):(
                            <>
                            {(localStorage.getItem("walletAddress")).substring(0, 4)}...{(localStorage.getItem("walletAddress")).substring((localStorage.getItem("walletAddress")).length -4, (localStorage.getItem("walletAddress")).length)}
                            </>
                        )}
                        
                    </div>

                    <div className="d-flex mb-2">
                    {copyButton === true ?<a style={{cursor:"pointer"}} className='mb-3 text-white d-flex align-items-center btn-link' onClick={() => copyCheck()}>
                            {/* <svg class="dark-theme-pink me-2" width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z"></path></svg> */}
                            Address copied!
                        </a>:<a style={{cursor:"pointer"}} className='mb-3 text-white d-flex align-items-center btn-link' onClick={() => copyCheck()}>
                            <svg class="white me-2" width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z"></path></svg>
                            Copy Address
                        </a>}
                        <a className='mb-3 ms-3 text-white d-flex align-items-center btn-link' href={"https://mumbai.polygonscan.com/address/" + localStorage.getItem("walletAddress")} target="_blank" rel="noreferer">
                            <svg class="white me-2" width="16" height="16" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.8333 15.8333H4.16667V4.16667H10V2.5H4.16667C3.24167 2.5 2.5 3.25 2.5 4.16667V15.8333C2.5 16.75 3.24167 17.5 4.16667 17.5H15.8333C16.75 17.5 17.5 16.75 17.5 15.8333V10H15.8333V15.8333ZM11.6667 2.5V4.16667H14.6583L6.46667 12.3583L7.64167 13.5333L15.8333 5.34167V8.33333H17.5V2.5H11.6667Z"></path></svg>
                            View on explorer
                        </a>
                    </div>

                    {/* <div className="d-flex mb-2 align-items-center">
                        <h6 className='mb-2 me-auto'>Recent Transactions</h6>
                        <Button variant='danger' className='btn-xs mb-2 ms-1'>Clear</Button>
                    </div>  
                    <p style={{opacity: '0.5'}}><small>Your transactions will appear here.</small></p> */}
                </Modal.Body>
            </Modal>        

            <Modal show={showConnectPera} className="modal-dashboard" centered onHide={handleCloseConnectPera}>
                <Modal.Header closeButton>
                    <Modal.Title>Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <h6 className='mb-2 me-auto'>Connected with PeraWallet</h6>
                    <div className="d-flex flex-wrap mb-3 align-items-center">
                     
                        <Button variant='primary' className='btn-xs mb-2 ms-1' onClick={Disconnect}>Disconnect</Button>
                        <Button variant='primary' className='btn-xs mb-2 ms-1' onClick={connectWallet}>Change Account</Button>
                        {/* <Button variant='primary' className='btn-xs mb-2 ms-1'>Redeem</Button> */}
                    </div>
                    {/* <div> {storereem >= 1 ? (<>
                        <Link to="/redeem-list" ><Button variant="primary" className='btn-xs mb-2 ms-1'>Redeem Excess Amount</Button></Link>
                       </>):(<></>)}</div> */}
                    <div className="account-number mb-3 d-flex align-items-center">
                        <svg width="14" height="14" className='me-2' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#3CC13B"><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"></path></svg>

                        {localStorage.getItem("walletAddress") ? <>{(localStorage.getItem("walletAddress")).substring(0, 4)}...{(localStorage.getItem("walletAddress")).substring((localStorage.getItem("walletAddress")).length -4, (localStorage.getItem("walletAddress")).length)}</> : ""}
                    </div>

                    <div className="d-flex mb-2">
                    {copyButton === true ?<a style={{cursor:"pointer"}} className='mb-3 text-white d-flex align-items-center btn-link' onClick={() => copyCheck()}>
                            {/* <svg class="dark-theme-pink me-2" width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z"></path></svg> */}
                            Address copied!
                        </a>:<a style={{cursor:"pointer"}} className='mb-3 text-white d-flex align-items-center btn-link' onClick={() => copyCheck()}>
                            <svg class="white me-2" width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z"></path></svg>
                            Copy Address
                        </a>}
                        <a className='mb-3 ms-3 text-white d-flex align-items-center btn-link' href={"https://testnet.algoexplorer.io/address/" + localStorage.getItem("walletAddress")} target="_blank" rel="noreferer">
                            <svg class="white me-2" width="16" height="16" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.8333 15.8333H4.16667V4.16667H10V2.5H4.16667C3.24167 2.5 2.5 3.25 2.5 4.16667V15.8333C2.5 16.75 3.24167 17.5 4.16667 17.5H15.8333C16.75 17.5 17.5 16.75 17.5 15.8333V10H15.8333V15.8333ZM11.6667 2.5V4.16667H14.6583L6.46667 12.3583L7.64167 13.5333L15.8333 5.34167V8.33333H17.5V2.5H11.6667Z"></path></svg>
                            View on explorer
                        </a>
                    </div>

                    {/* <div className="d-flex mb-2 align-items-center">
                        <h6 className='mb-2 me-auto'>Recent Transactions</h6>
                        <Button variant='danger' className='btn-xs mb-2 ms-1'>Clear</Button>
                    </div>  
                    <p style={{opacity: '0.5'}}><small>Your transactions will appear here.</small></p> */}
                </Modal.Body>
            </Modal>             

            <Sidebar activeClass={sidebar ? 'active' : ''} handleLink={handleSidebar}/>
        </>
    );
}
};

export default Header;