import { Col, Form, Row,Alert } from "react-bootstrap";
import Logo from '../../../assets/images/element-logo-2-dot.png'
import LoginImage from '../../../assets/images/cbdc/cbdc-home-left.png'
import { Link,useHistory} from "react-router-dom";
import React,{ useState,useRef } from "react";
import { auth } from "../../../NFTFolder/firebase"
import ButtonLoad from 'react-bootstrap-button-loader';
//import {firebasess} from '../../../NFTFolder/firebase';
//import { useAuth } from "./contexts/AuthContext"
import axios from 'axios';
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
function HomePage() {
    const [pass, setPass] = useState(true);
    // const [firstName, setfirstName] = useState(true);
    // const [lastName, setlastName] = useState(true);
    // const emailRef = useRef()
    // const passwordRef = useRef()
    // const passwordConfirmRef = useRef()
    // //const { signup } = useAuth()
    const [error, setError] = useState("")
    // const [loading, setLoading] = useState(false)
    const history = useHistory()
    //     const signup=(email, password)=> {
    //         console.log("SignupFunction")
    //         try{
    //             return auth.createUserWithEmailAndPassword(email, password)
    //         }catch(err){
    //             console.log("FireErr1")
    //         }            
    //     }

        // const ProfileStore=async(emails,passwords,firstNames,lastnames)=>{
        //     let ref2=firebasess.database().ref(`userprofileCBDC/${emails}`);                    
        //     let dateset=new Date().toDateString();
        //     ref2.set({            
        //     FirstName:firstNames,LastName:lastnames,TimeStamp:dateset,Email:emails,Password:passwords})
        //     .then(async()=>{             
        //         // handleHideLoad()                
        //         // toast.dismiss()
        //         // toast.success(`Updated Details of The Artist`,{autoClose:5000})
        //         // handleHideLoad()
        //         //await sleep(2000)
        //         //done()
        //     }).catch((err) => {                                    
        //         //handleHideLoad()
        //         //setshowTestLoading(false)                     
        //         // setissuesdisplay("your browser appearing issue")
        //         // setshowTestAlert(true)                      
        //         //console.log(err);
        //         // toast.error(`your browser appearing issue`,{autoClose:3000})
        //         // handleHideLoad()
        //         // done()
        //     });               

        // }

        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [firstName, setfirstName] = useState(true);

    // const SignupFirebase=async()=> {
    //     //e.preventDefault()    
    //     if (passwordRef.current.value !== passwordConfirmRef.current.value) {
    //       return setError("Passwords do not match")
    //     }
    
    //     try {
    //       setError("")
    //       setLoading(true)
    //       await signup(emailRef.current.value, passwordRef.current.value)
    //       //await ProfileStore(emailRef.current.value,passwordRef.current.value,firstName,lastName)
    //       history.push("/login-cbdc")
            
    //     } catch {
    //       setError("Failed to create an account")
    //     }
    
    //     setLoading(false)
    // }
   
    let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
    let usercreditamount=2000;
    // const navigate = useNavigate();
    const submit = async () =>
  {       
    let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
      axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
      //console.log("done1",response.data);
        // console.log("date",date);
        const options2 = {
          method: 'POST',
          url: '/platform/v1/userinfo',
          headers: {
            'x-api-key': `${key}`    
          },
          data: {
            'userId'  :`${email}`,
            'userName':`${firstName}`,
            'password':`${password}`,
            'validuser':"Y",
            'role':"Admin",
            'userCredits':`${usercreditamount}`
          }
        };
        
        axios.request(options2).then(function (response2) {
         console.log("response",response2);
        //  Redirect('/login-cbdc');
         history.push("/login-cbdc")
        //  window.location.reload();
        }).catch(function (error) {
            console.error("done2",error);
            setError("Failed to create an account")
        });
  }

    return ( 
        <div className="cbdc-columns text-dark">            
            <Row className="gx-0">
                <Col md={6} style={{backgroundColor: '#fff'}}>
                    <div className="cbdc-login px-sm-4 px-3 mx-auto d-flex flex-column">
                        <img src={Logo} className="cbdc-login-logo" alt="logo" />
                        <div className="form-middle pt-5 pt-md-0 m-auto">
                            <div className="mb-2 text-uppercase">
                                <h2>Get started</h2>
                            </div>
                            {error && <Alert variant="danger">{error}</Alert>}
                            {/* <Row>
                                <Col sm={6}>
                                    <div className="mb-3">
                                        <label>First name</label>
                                        <input type="text" className='form-control form-control-field border-0' placeholder='Enter your firstname' onChange={event => setfirstName( event.target.value)}/>
                                    </div>
                                </Col>
                                <Col sm={6}>
                                    <div className="mb-3">
                                        <label>Last name</label>
                                        <input type="text" className='form-control form-control-field border-0' placeholder='Enter your lastname' onChange={event => setlastName( event.target.value)}/>
                                    </div>
                                </Col>
                            </Row> */}

                            <div className="mb-3">
                                <label>Name</label>
                                <input type='text' className='form-control form-control-field border-0' onChange={event => setfirstName( event.target.value)} placeholder='Enter your name' /> 
                            </div> 
                            <div className="mb-3">
                                <label>Work email address</label>
                                <input type="email" className='form-control form-control-field border-0' onChange={event => setEmail( event.target.value)} placeholder='Enter your email address' />
                            </div>
                            <div className="mb-3">
                                <label>Choose a password</label>
                                <input type='password' className='form-control form-control-field border-0'   onChange={event => setPassword( event.target.value)} placeholder='Enter your password' /> 
                            </div>
                            {/* <div className="mb-3">
                                <label>Repeat a password</label>
                                <input type='password' className='form-control form-control-field border-0' ref={passwordConfirmRef} placeholder='Enter your repeat password' /> 
                            </div> */}
                            <ButtonLoad type='submit' className='mb-4 btn w-100' style={{'backgroundColor':"#8247e5"}} onClick={()=>{submit()}}>Start application</ButtonLoad>
                            <p className="text-center">Don’t have an account? <Link to="/login-cbdc" className="border-bottom"><strong>Log in</strong></Link></p>

                            <p><small>By clicking "Start Application" I agree to Sigma's <Link to="/" className="btn-link">Terms of Use</Link>, <Link to="/" className="btn-link">Privacy Policy</Link> and to receive electronic communication about my accounts and services per Sigma's Electronic Communications Agreement.</small></p>
                        </div>
                    </div>
                </Col>
                <Col md={6} className="d-flex cbdc-login-banner">
                    {/* <Link to="/" className="btn btn-white">SAND BOX</Link> */}
                    <img className="col-image img-fluid" src={LoginImage} alt="LeftImage" />
                </Col>
            </Row>
        </div>
     );
}

export default HomePage;