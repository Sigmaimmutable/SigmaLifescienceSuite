import React, {useState, useEffect} from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import {
    Link
  } from "react-router-dom";

import ProtocolImage from "../../assets/images/protocol-image.png";
import ProtocolImageMOb from "../../assets/images/element-protocol-mob-image-2.png";

const HomeBannerBanking = () => {

    return (
        <div className='page-banner text-center'>
            <Container fluid="lg">
                <Row className='justify-content-center py-0'>
                    <Col xl={12}><br/>
                        <h1>ELEMENT</h1>
                    </Col>
                </Row>

                <div className="text-center banner-protocol-image">

                    <img src={ProtocolImage} alt="ProtocolImage" className='img-fluid d-none d-md-block mx-auto' />
                    <img src={ProtocolImageMOb} alt="ProtocolImage" className='img-fluid d-md-none w-100' />
                    
                </div>

                <Row className='justify-content-center banner-protocol-text'>
                    <Col xl={12}>
                       <p>Next-Gen Multi-dimensional Institutional grade Stablecoin and DeFi Platform</p>
                        {/* <p>TAU is the first non-dilutive fractional stablecoin for DeFi 2.0, where the price balance is orthogonally regulated through ELEM elastic supply adjustments, burn and bonding mechanics within a closed ecosystem.</p> */}
                    </Col>
                </Row>

                {/* <div className="pt-4">
                <Link to="/dashboard" className='m-md-2 mb-3 btn btn-lg btn-sm-full d-md-none btn-grad'>Stablecoin Hub</Link>
                <Link to="/features" className='m-md-2 mb-3 btn btn-lg btn-sm-full d-md-none btn-grad'>All-In-One DeFi</Link>
                <Link to="/elemcurrency" className='m-md-2 mb-3 btn btn-lg btn-sm-full d-md-none btn-grad'>SaaS (Private L2)</Link> */}
                {/* <Link to="/swap" className='m-md-2 mb-3 btn btn-lg btn-sm-full d-md-none btn-grad'>AMM DEX</Link>
                <Link to="/lending" className='m-md-2 mb-3 btn btn-lg btn-sm-full d-md-none btn-grad'>Money Market</Link>
                <Link to="/launchpad" className='m-md-2 mb-3 btn btn-lg btn-sm-full d-md-none btn-grad'>Launchpad</Link>
                <Link to="/farm" className='m-md-2 mb-3 btn btn-lg btn-sm-full d-md-none btn-grad'>Yield Farming</Link> */}
                {/* <a target="_blank" rel="noreferrer" className='m-md-2 mb-3 btn btn-lg btn-sm-full d-md-none btn-grad'>NFT Market</a> */}
                    {/* <Link to="/dashboard" className='m-md-2 mb-3 btn btn-lg btn-mob-full d-none d-md-inline-block btn-grad'>Stablecoin Hub</Link>
                    <Link to="/features" className='m-md-2 mb-3 btn btn-lg btn-mob-full d-none d-md-inline-block btn-grad'>All-In-One DeFi</Link>
                    <Link to="/elemcurrency" className='m-md-2 mb-3 btn btn-lg btn-mob-full d-none d-md-inline-block btn-grad'>SaaS (Private L2)</Link> */}
                    {/* <Link to="/swap" className='m-md-2 mb-3 btn btn-lg btn-mob-full d-none d-md-inline-block btn-grad'>AMM DEX</Link>
                    <Link to="/lending" className='m-md-2 mb-3 btn btn-lg btn-mob-full d-none d-md-inline-block btn-grad'>Money Market</Link>
                    <Link to="/launchpad" className='m-md-2 mb-3 btn btn-lg btn-mob-full d-none d-md-inline-block btn-grad'>Launchpad</Link>
                    <Link to="/farm" className='m-md-2 mb-3 btn btn-lg btn-mob-full d-none d-md-inline-block btn-grad'>Yield Farming</Link>
                    <a target="_blank" rel="noreferrer" className='m-md-2 mb-3 btn btn-lg btn-mob-full d-none d-md-inline-block btn-grad'>NFT Market</a> */}
                {/* </div> */}
            </Container>
        </div>
    );
};

export default HomeBannerBanking;