import React, {useState} from 'react';
import { Form, Col, Container, Row } from 'react-bootstrap';
import Logo from '../../assets/images/logo-d.svg'
import firebase from "../../NFTFolder/firebase";
import node from './nodeapi.json';
import MyAlgoConnect from '@randlabs/myalgo-connect';
import {
    Redirect,
  } from "react-router-dom";
import { updatealgobalance } from "../formula";

import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';

const algosdk = require('algosdk');
const myAlgoWallet = new MyAlgoConnect();
const algodClient = new algosdk.Algodv2('', node['algodclient'], '');
const indexClient = new algosdk.Indexer('', node['indexerclient'], '');
function Layout() {

    const [usernameLogin, setUsernameLogin] = useState("");
    const [passwordLogin, setPasswordLogin] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [walletAddressForm, setWalletAddressForm] = useState("");
    const [walletName, setWalletName] = useState("");
    const [logged, setLogged] = useState(false);

    const signUp = () =>
    {
        console.log("username: %s \npassword: %s \nrePassword: %s \nWalletAddress: %s \nWalletName: %s", username, password, rePassword, walletAddressForm, walletName);
        if(password === rePassword)
        {
        firebase.auth().signInAnonymously().then((response)=>{     
        let ref2=firebase.database().ref(`SignUpElement/${username}`);  
        let dateset=new Date().toDateString();  
        const db = ref2.push().key;                      
        ref2.set({
            id:db,
            username:username,
            password:password,
            WalletAddress:walletAddressForm,
            walletName: walletName,
            TimeStamp:dateset
        })
        .then(()=>{ 
            toast.success("Sign up successful");
            setUsername("");
            setPassword("");
            setRePassword("");
            setWalletAddressForm("");
        }).catch((err) => {                                    
           console.log("error", err);
        }); 
        })
    }
    else
    {
        toast.error(`Password and Re-Entered Password does not match`);
    }
    }
    
    const logIn = async () =>
    {
        console.log("username: %s \npassword: %s", usernameLogin, passwordLogin);
        firebase.auth().signInAnonymously().then((response)=>{ 
        try{
        firebase.database().ref(`SignUpElement/${usernameLogin}`).on("value", async (data) => {
            console.log("Get", data.val());
            let usernameDB = data.val().username;
            let passwordDB = data.val().password;
            let walletAddressDB = data.val().WalletAddress;
            let walletNameDB = data.val().walletName;
            if(usernameDB === usernameLogin && passwordDB === passwordLogin)
            {
                localStorage.setItem("walletAddress", walletAddressDB);
                localStorage.setItem("walletName", walletNameDB);
                localStorage.setItem("userType", "login");
                await updatealgobalance();
                setLogged(true);
            }
            else
            {
                toast.error("error");
            }
         })               
        // ref2.set({
        //     id:db,
        //     username:username,
        //     password:password,
        // })
        // .then(()=>{ 
          
         }catch(err){
            console.error("error", err);
         }
        })
    }


    // const check = () =>
    // {
    //         firebase.auth().signInAnonymously().then((response)=>{ 
    //         try{
    //         firebase.database().ref(`SignUpElement`).on("value", async (data) => {
    //             console.log("Get", data.val());
    //          })}catch(err){
    //             console.error("error", err);
    //          }
    //         })
    // }

    return (
        <>
            <div id="dashboard" className="ps-dash p-0 d-flex h-100">
            <><ToastContainer position='bottom-right' draggable = {false} transition={Zoom} autoClose={4000} closeOnClick = {false}/></>
                <Container fluid style={{padding: '0 12px'}}>
                    {logged === true ? <Redirect to="/dashboard"/> : <>
                    <Row className="h-100">
                        <Col md={6} className="d-flex">
                            <div className="form-middle py-5 m-auto">
                                <div className="mb-2 text-center">
                                    <img src={Logo} className="mb-3" alt="logo" />
                                    <h2>Log In</h2>
                                </div>

                                <div className="mb-3">
                                    <label>Username</label>
                                    <input type="text" className='form-control form-control-field border-0' placeholder='Enter your username' value={usernameLogin} onChange={(e) => setUsernameLogin(e.target.value)}/>
                                </div>
                                <div className="mb-3">
                                    <label>Password</label>
                                    <input type="password" className='form-control form-control-field border-0' placeholder='Enter your password' value={passwordLogin} onChange={(e) => setPasswordLogin(e.target.value)}/>
                                </div>
                                <button type='submit' className='btn-blue border-0 btn w-100' onClick={logIn}>Log in</button>
                            </div>
                        </Col>

                        <Col md={6} className="d-flex" style={{backgroundColor: 'rgba(255,255,225,0.03)'}}>
                            <div className="form-middle py-5 m-auto">
                                <div className="mb-2 text-center">
                                    <img src={Logo} className="mb-3" alt="logo" />
                                    <h2>Sign Up</h2>
                                </div>

                                <div className="mb-3">
                                    <label>Username</label>
                                    <input type="text" className='form-control form-control-field border-0' placeholder='Enter your username' value={username} onChange={(e) => setUsername(e.target.value)}/>
                                </div>
                                <div className="mb-3">
                                    <label>Password</label>
                                    <input type="password" className='form-control form-control-field border-0' placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                                </div>
                                <div className="mb-3">
                                    <label>Re-Enter Password</label>
                                    <input type="password" className='form-control form-control-field border-0' placeholder='Re-Enter your password' value={rePassword} onChange={(e) => setRePassword(e.target.value)}/>
                                </div>
                                <div className="mb-3">
                                    <label>Algorand wallet address</label>
                                    <input type="text" className='form-control form-control-field border-0' placeholder='Enter your wallet address' value={walletAddressForm} onChange={(e) => setWalletAddressForm(e.target.value)}/>
                                </div>
                                <div className="mb-3">
                                    <label>Select wallet</label>
                                    <Form.Check
                                        type="radio"
                                        label="myAlgoWallet"
                                        id="algo-wallet"
                                        name="wallet"
                                        onChange={(e) => setWalletName("myAlgoWallet")}
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="Pera Algo Wallet"
                                        id="pera-wallet"
                                        name="wallet"
                                        onChange={(e) => setWalletName("PeraWallet")}
                                    />
                                </div>
                                <button type="submit" className='btn-blue border-0 btn w-100' onClick={signUp}>Sign Up</button>
                            </div>
                        </Col>
                    </Row>
                    </>}
                </Container>
            </div>
        </>
    );
}

export default Layout;