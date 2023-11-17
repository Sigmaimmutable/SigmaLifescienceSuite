
import React,{ useEffect ,useState} from "react";
import { Col, Container, Row, Form, InputGroup, Button,Card} from 'react-bootstrap';
import Layout from './LayoutT';
import {
    Link
  } from "react-router-dom";

import PostCard from './snippets/PostCard';
import PostCardDeployBond from './snippets/PostCardDeployBond';
import PostCardDeployLaunchpad from './snippets/PostCardDeployLaunchpad';
import SidechainBNB from '../DashboardNew/sidechain/sidechain';
import launchpadDetails from './snippets/launchpad.json'
import PostCardElem from './snippets/PostCardElem';
import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';
import LaunchpadTransactionredirect from "./LaunchpadTransactionredirect";
import firebase from '../../NFTFolder/firebase';
import BinanceTable from './snippets/LaunchpadApiTable';
import '../toast-style-override.css'
function Launchpad() {
    
  

    return (
        <Layout>
            <Container>
                <Row className='mb-5'>
                <Col lg={12} className='mb-4'>
                        <SidechainBNB />
                    </Col>
                   
                </Row>
            </Container>
              
        </Layout>
    );
}

export default Launchpad;