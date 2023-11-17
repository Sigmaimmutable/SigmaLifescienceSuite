
import React,{ useEffect ,useState} from "react";
import { Col, Container, Row, Form, InputGroup, Button,Card} from 'react-bootstrap';
import Layout from './LayoutT';
import {
    Link
  } from "react-router-dom";

import PostCard from './snippets/PostCard';
import PostCardDeployBond from './snippets/PostCardDeployBond';
import PostCardDeployLaunchpad from './snippets/PostCardDeployLaunchpad';
import PostCardDeployERC20 from './snippets/PostCardDeployERC20';
import PostCardDeployNormalNFT from './snippets/PostCardDeployNormalNFT';
import PostCardDeployAuctionNFT from './snippets/PostCardDeployAuctionNFT';
import PostCardDeployRoyaltyNFT from './snippets/PostCardDeployRoyaltyNFT';
import PostCardDeployFractionalNFT from './snippets/PostCardDeployFractionalNFT';
import PostCardDeployStaking from './snippets/PostCardDeployStaking';
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
                <Col lg={4} className='mb-4'>
                        <PostCardDeployERC20 />
                    </Col>
                    <Col lg={4} className='mb-4'>
                        <PostCardDeployLaunchpad />
                    </Col>

                    <Col lg={4} className='mb-4'>
                        <PostCardDeployBond />
                    </Col>

                    <Col lg={4} className='mb-4'>
                        <PostCardDeployStaking />
                    </Col>
                    <Col lg={4} className='mb-4'>
                        <PostCardDeployNormalNFT />
                    </Col>
                    <Col lg={4} className='mb-4'>
                        <PostCardDeployAuctionNFT />
                    </Col>
                    <Col lg={4} className='mb-4'>
                        <PostCardDeployRoyaltyNFT />
                    </Col>

                    <Col lg={4} className='mb-4'>
                        <PostCardDeployFractionalNFT />
                    </Col>
                    {/* <Col lg={4} className='mb-4'>
                        <PostCard />
                    </Col>
                    <Col lg={4} className='mb-4'>
                        <PostCard />
                    </Col> */}
                </Row>
            </Container>
               <BinanceTable/>
        </Layout>
    );
}

export default Launchpad;