import React, { useState } from 'react';
import { Accordion, Badge, Button, Col, Container, Dropdown, Form, FormControl, InputGroup, OverlayTrigger, Row, Tab, Tabs, Tooltip } from 'react-bootstrap';
import Layout from './LayoutT';

import USDC from '../../assets/images/usdc.jpg';
import Icon1 from '../../assets/images/elem-original.png';
import Icon2 from '../../assets/images/algorand-logo.png';
import elementLogo from '../../assets/images/favicon.ico';
import elemLogo from '../../assets/images/modal-square-logo.png';
import Icon3 from '../../assets/images/tau-original.png';
import Icon4 from '../../assets/images/EINR-original.png';
// import { Link } from 'react-router-dom';
import Farmcard from './Farmcard';
import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';
import "../toast-style-override.css"
function Farm (props) {
    const [val, setVal] = useState('');
    const [swicth, setSwitch] = useState(true);
    const [receive, setReceive] = useState('Wone');
    const handleToggle = () => setSwitch(!swicth);
    const CategoryOptions = [
        { Farmname: 'ALGO/ELEM', image1name: Icon2, image2name:Icon1,nameasset1:'ELEM',nameasset2:'ALGO',assetid1:78044331,assetid2:0,lpassetid:78082460},
        {Farmname:'ALGO/EINR', image1name: Icon2, image2name:Icon4,nameasset1:'EINR',nameasset2:'ALGO',assetid1:78044898,assetid2:0,lpassetid:78088555 },
        
        // {Farmname: 'ELEM', image1name: Icon1, image2name: "" },
        // {Farmname: 'Tau', image1name: Icon3, image2name: ""}
        
      
    ]
    return (
        <Layout>
           
            <><ToastContainer position='bottom-right' draggable = {false} transition={Zoom} autoClose={4000} closeOnClick = {false}/></>
            <Container>
            {CategoryOptions.map((x, index) => (              
            <Farmcard x={x}/>
           ))}
            </Container>
        </Layout>
    );
};

export default Farm;