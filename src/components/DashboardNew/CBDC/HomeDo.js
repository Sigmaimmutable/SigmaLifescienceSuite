import { Col, Row,Button,Alert} from "react-bootstrap";
import LogoWhite from '../../../assets/images/cbdc/algorand_logo_mark_white.png'
import LogoDark from '../../../assets/images/cbdc/algorand_logo_mark_dark.png'
import LeftImage from '../../../assets/images/cbdc/cbdc-home-left.png'
import RightImage from '../../../assets/images/cbdc/cbdc-home-right.png'
import { Link,useHistory,Redirect, useLocation } from "react-router-dom";
import React,{ useEffect,useState,useRef } from "react";
import { auth } from "../../../NFTFolder/firebase"
import MojoAuth from "mojoauth-web-sdk"

function HomeDo() {    
    const location = useLocation();
    const history = useHistory()
    const [error, setError] = useState("")                    
    const [payload, setPayload] = React.useState(null)
    React.useEffect(() => {
        const mojoauth = new MojoAuth("test-dc20e01f-0024-4911-a224-995def28edbe", {
        source: [{ type: "email", feature: "otp" }],
        language: "language_code",
        redirect_url: "/homeduplicate",
        });
        mojoauth.signInWithEmailOTP().then(payload => {
            console.log("Mojo",payload)
            setPayload(payload)
            localStorage.setItem("Login",true)
            history.push("/home")            
        })
    }, [])
    
    return ( 
        <>            
        {error && <Alert variant="danger">{error}</Alert>}        
        <div id="mojoauth-passwordless-form"></div>           
        </>
    );                        
}

export default HomeDo;