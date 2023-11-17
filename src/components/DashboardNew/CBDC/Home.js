import { Col, Row,Button,Alert} from "react-bootstrap";
import LogoWhite from '../../../assets/images/cbdc/polygon-white.png'
import LogoDark from '../../../assets/images/cbdc/polygon-purple.png'
import LeftImage from '../../../assets/images/cbdc/cbdc-polygon.png'
import RightImage from '../../../assets/images/cbdc/lifescience5.jpg'
import { Link,useHistory,Redirect, useLocation } from "react-router-dom";
import React,{ useEffect,useState,useRef } from "react";
import { auth } from "../../../NFTFolder/firebase"

function HomePage() {    
    const location = useLocation();
    const [error, setError] = useState("")    
        localStorage.setItem("Theme","light");
    
    if(localStorage.getItem('Login') === false || localStorage.getItem('Login') === null || localStorage.getItem('Login') === undefined || localStorage.getItem('Login') === "" || localStorage.getItem('Login') === "false"){            
         return <Redirect to="/login-cbdc" state={{ from: location }}/>;
    } else  {        
        return ( 
            <>            
            {error && <Alert variant="danger">{error}</Alert>}
            <div className="cbdc-columns">            
                <Row className="gx-0">
                    <Col md={6} className="d-flex pb-4" style={{backgroundColor: '#8247e5'}}>
                        <img className="col-logo" src={LogoWhite} alt="LogoWhite" />
                        <img className="col-image col-image-left img-fluid" src={LeftImage} alt="LeftImage" />
                        <Link to="/dashboarduserdetails" className="btn btn-bottom btn-white">CBDC</Link>
                    </Col>
                    <Col md={6} className="d-flex pb-4" style={{backgroundColor: '#190e2b'}}>
                        <img className="col-logo" src={LogoDark} alt="LogoDark" />
                        <img className="img-fluid" src={RightImage} alt="LeftImage" />
                        <Link to="/dashboarduserdetails" className="btn btn-bottom btn-white">Lifescience</Link>

                        {/* <a href="https://element-bsc-private-de-fi.vercel.app/" target="_blank" rel="noreferer" > <Button className="btn btn-bottom " style={{'backgroundColor':"#8247e5"}}  size="lg" >Lifescience</Button></a> */}
                    </Col>
                </Row>
            </div>
            </>
         );                
    }    

    // return ( 
    //     <>
    //     <Button variant="link" onClick={()=>{logout()}}>
    //             Log Out
    //     </Button>
    //     {error && <Alert variant="danger">{error}</Alert>}
    //     <div className="cbdc-columns">            
    //         <Row className="gx-0">
    //             <Col md={6} className="d-flex pb-4" style={{backgroundColor: '#100D0D'}}>
    //                 <img className="col-logo" src={LogoWhite} alt="LogoWhite" />
    //                 <img className="col-image col-image-left img-fluid" src={LeftImage} alt="LeftImage" />
    //                 <Link to="/" className="btn btn-bottom btn-white">CBDC</Link>
    //             </Col>
    //             <Col md={6} className="d-flex pb-4" style={{backgroundColor: '#fff'}}>
    //                 <img className="col-logo" src={LogoDark} alt="LogoDark" />
    //                 <img className="col-image img-fluid" src={RightImage} alt="LeftImage" />
    //                 <Link to="/" className="btn btn-bottom btn-dark">Private Defi</Link>
    //             </Col>
    //         </Row>
    //     </div>
    //     </>
    //  );        
}

export default HomePage;