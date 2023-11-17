import { Col, Form, Row ,Alert, Dropdown, Badge } from "react-bootstrap";
import Logo from '../../../assets/images/element-logo-2-dot.png'
import LoginImage from '../../../assets/images/cbdc/cbdc-home-left.png'
import { Link,useHistory,Redirect, useLocation } from "react-router-dom";
import React,{ useState,useRef, useEffect } from "react";
import MojoAuth from "mojoauth-web-sdk"
import { auth } from "../../../NFTFolder/firebase"
import axios from "axios";
import ButtonLoad from 'react-bootstrap-button-loader';
//import { signInWithGoogle } from "../../../NFTFolder/firebase";
//import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
//import firebase from 'firebase/compat/app';
//import firebase from "firebase/app";

function HomePage() {
    const [isSubscribed, setIsSubscribed] = useState(true);
    const [pass, setPass] = useState(true);
    const [Logged, setLogged] = useState(false);
    const [emailRef, setEmailRef] = useState();
    const [passwordRef, setPasswordRef] = useState();
    const [option1, setOption1] = useState("Polygon");
    console.log("LOOO",Logged)
    const location = useLocation();
    console.log("Loo",Logged)
    // const emailRef = useRef()
    // const passwordRef = useRef()    
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const handleChange = event => {
        if (event.target.checked) {
          console.log('Checkbox is checked');
          setIsSubscribed(true)
        } else {
          setIsSubscribed(false)
        }
        //setIsSubscribed(current => !current);
    };

    useEffect(()=>{
        const LoggedNot=async()=>{
            setLogged(localStorage.getItem("Login"))            
        }
        LoggedNot()
    },[])
    const login=(email, password) =>{
        console.log("LoginFunction")
        try{
            return auth.signInWithEmailAndPassword(email, password)
        }catch(err){
            console.log("FireErr1")
        }                    
    }

    const AlgorandLaunch = () =>
    {
        window.location.href = "https://sandboxv1.elementfi.io/";
    }

    const LogIn = async () =>
    {    
        let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";   
        axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        //console.log("done1",response.data);
          // console.log("date",date);
          const options2 = {
            method: 'POST',
            url: '/platform/v1/userexists',
            headers: {
              'x-api-key': `${key}`    
            },
            data: {
              'userId'  :`${emailRef}`,
              'password':`${passwordRef}`
    
            }
          };
          
          axios.request(options2).then(function (response2) {
           console.log("response",response2);
    
          console.log("responsecheck",response2.data.result);
           if(response2.data.result === "Y"){
            localStorage.setItem("Login",true)
            localStorage.setItem("UserID",emailRef);
            // home
            // history.push("/dashboarduserdetails")
          history.push("/home")
        }
          else{
          setError("Failed to log in,Invalid EmailID and Password!");
              localStorage.setItem("Login",true);
               history.push("/home")
          }
          //  window.location.reload();
          }).catch(function (error) {
              console.error("done2",error);
          });
    }

    // const mojoauth = new MojoAuth("test-dc20e01f-0024-4911-a224-995def28edbe", {
    //     source: [{ type: "email", feature: "otp" }],
    //     language: "language_code",
    //     redirect_url: "http://localhost:3000/home",
    // });    
    const LoginNew=async()=>{
        //e.preventDefault()    
        try {
          setError("")
          setLoading(true)
          await LogIn(emailRef.current.value, passwordRef.current.value)
          if(isSubscribed){
            //localStorage.setItem("Login",true)
            // mojoauth.signInWithEmailOTP().then(payload => {
            //     console.log("payload",payload)        
            // })
            history.push("/homeduplicate")            
          }else{
            history.push("/homeduplicate")
          }                    
        } catch(e) {
            console.log("Error",e)
            setError("Failed to log in")
        }
    
        setLoading(false)
      }  
    //   const signInWithGoogleFunction=async()=>{        
    //     const provider = new firebase.auth.GoogleAuthProvider()
    //     signInWithPopup(auth, provider)
    //       .then((result) => {
    //         const name = result.user.displayName;
    //         const email = result.user.email;
    //         const profilePic = result.user.photoURL;      
    //         localStorage.setItem("name", name);
    //         localStorage.setItem("email", email);
    //         localStorage.setItem("profilePic", profilePic);
    //         localStorage.setItem("Login",true)
    //         history.push("/home")
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //         setError("Failed to log in")
    //       });
    //   }    
      if(localStorage.getItem('Login') === false || localStorage.getItem('Login') === null || localStorage.getItem('Login') === undefined || localStorage.getItem('Login') === "" || localStorage.getItem('Login') === "false"){
        return ( 
            <div className="cbdc-columns text-dark">            
            
                <Row className="gx-0">
                    <Col md={6} style={{backgroundColor: '#fff'}}>
                        <div className="cbdc-login px-sm-4 px-3 mx-auto d-flex flex-column">
                            <img src={Logo} className="cbdc-login-logo" alt="logo" />
                            <div className="form-middle pt-5 pt-md-0 m-auto">
                                {/* <div className="mb-2 text-uppercase">
                                    <h2>Log in</h2>
                                </div> */}
                                <Dropdown variant="dark" className="ms-2 me-2">
                                    <Dropdown.Toggle style={{'backgroundColor':"#8247e5"}} className='text-white' id="dropdown-basic">
                                        {option1}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu style={{'backgroundColor':"#8247e5"}}>
                                    <Dropdown.Item className='d-flex align-items-center' onClick={() => AlgorandLaunch()}>
                                            Algorand
                                        </Dropdown.Item>
                                        <Dropdown.Item  style={{color:"GrayText"}} className='d-flex align-items-center'>
                                            Binance &nbsp;
                                       </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <br/>     
                                {error && <Alert variant="danger">{error}</Alert>}
                                <div className="mb-3">
                                    <label>Email Address</label>
                                    <input type="text" className='form-control form-control-field border-0' onChange={event => setEmailRef(event.target.value)} placeholder='Enter your username' />
                                </div>
                                <div className="mb-3">
                                    <label>Password</label>
                                    <div className="position-relative">
                                        <input type={pass ? 'password' : 'text'} className='form-control form-control-field border-0' onChange={event => setPasswordRef(event.target.value)} placeholder='Enter your password' />
                                        <span className="password-icon" onClick={() => setPass(!pass)}>
                                            {pass ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                                                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                                                </svg>
                                            ):(
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                                                    <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"/>
                                                    <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"/>
                                                </svg>
                                            )}
                                        </span>
                                    </div>
                                </div>
                                <div className="mb-3 d-flex flex-wrap align-items-center justify-content-between">
                                    {/* <Form.Check 
                                        value={isSubscribed}
                                        onChange={handleChange}
                                        type={'checkbox'}
                                        id={`default-checkbox`}
                                        label={`Remember me`}
                                    /> */}
    
                                    {/* <Link to="/" className="btn-link ms-auto">Forgot password?</Link> */}
                                </div>
                                <ButtonLoad type='submit' className='mb-4 w-100' style={{'backgroundColor':"#8247e5"}} onClick={()=>{LogIn()}}>Log In</ButtonLoad>
                                {/* <p className="text-center">Or</p>
                                <button className='btn-dark mb-4 btn w-100' onClick={()=>{signInWithGoogleFunction()}}>
                                    Sign in with Google
                                </button> */}
                                <p className="text-center">Or</p>
                                <ButtonLoad className='mb-4 btn w-100' style={{'backgroundColor':"#8247e5"}} onClick={()=>{history.push({
                                 pathname: '/otplogin'
                                })}}>
                                    Sign in with Mobile Number
                                </ButtonLoad>
                                <p className="text-center">Don’t have an account? <Link to="/signup-cbdc" className="border-bottom"><strong>Sign Up</strong></Link></p>
                              
                            </div>
                        </div>
                    </Col>
                    <Col md={6} className="d-flex cbdc-login-banner">
                        <Link to="/" className="btn btn-white">SAND BOX</Link>
                        <img className="col-image img-fluid" src={LoginImage} alt="LeftImage" />
                    </Col>
                </Row>
            </div>
         );
      }    
      else if(localStorage.getItem('Login') === true || localStorage.getItem('Login') || localStorage.getItem('Login') ==="true" ){    
            return <Redirect to="/home" />;
      }
      else{
        return ( 
            <div className="cbdc-columns text-dark">            
            
                <Row className="gx-0">
                    <Col md={6} style={{backgroundColor: '#fff'}}>
                        <div className="cbdc-login px-sm-4 px-3 mx-auto d-flex flex-column">
                            <img src={Logo} className="cbdc-login-logo" alt="logo" />
                            <div className="form-middle pt-5 pt-md-0 m-auto">
                                <div className="mb-2 text-uppercase">
                                    <h2>Log in</h2>
                                </div>
                                {error && <Alert variant="danger">{error}</Alert>}
                                <div className="mb-3">
                                    <label>Email Address</label>
                                    <input type="text" className='form-control form-control-field border-0' onChange={event => setEmailRef(event.target.value)} placeholder='Enter your username' />
                                </div>
                                <div className="mb-3">
                                    <label>Password</label>
                                    <div className="position-relative">
                                        <input type={pass ? 'password' : 'text'} className='form-control form-control-field border-0' ref={passwordRef} placeholder='Enter your password' />
                                        <span className="password-icon" onClick={() => setPass(!pass)}>
                                            {pass ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                                                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                                                </svg>
                                            ):(
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                                                    <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"/>
                                                    <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"/>
                                                </svg>
                                            )}
                                        </span>
                                    </div>
                                </div>
                                <div className="mb-3 d-flex flex-wrap align-items-center justify-content-between">
                                    {/* <Form.Check 
                                        value={isSubscribed}
                                        onChange={handleChange}
                                        type={'checkbox'}
                                        id={`default-checkbox`}
                                        label={`Remember me`}
                                    /> */}
    
                                    {/* <Link to="/" className="btn-link ms-auto">Forgot password?</Link> */}
                                </div>
                                {/* <button type='submit' className='btn-dark mb-4 btn w-100' onClick={()=>{LoginNew()}}>Log In</button>
                                <button class="login-with-google-btn" onClick={signInWithGoogle}>
                                    Sign in with Google
                                </button> */}
                                <p className="text-center">Or</p>
                                <ButtonLoad className=' mb-4 btn w-100' style={{'backgroundColor':"#8247e5"}} onClick={()=>{history.push({
                                 pathname: '/otplogin'
                                })}}>
                                    Sign in with Mobile Number
                                </ButtonLoad>
                                <p className="text-center">Don’t have an account? <Link to="/signup-cbdc" className="border-bottom"><strong>Sign Up</strong></Link></p>
                            </div>
                        </div>
                    </Col>
                    <Col md={6} className="d-flex cbdc-login-banner">
                        <Link to="/" className="btn btn-white">SAND BOX</Link>
                        <img className="col-image img-fluid" src={LoginImage} alt="LeftImage" />
                    </Col>
                </Row>
            </div>
         );
      }
}

export default HomePage;
