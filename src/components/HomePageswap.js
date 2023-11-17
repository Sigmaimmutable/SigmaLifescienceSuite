import React from 'react';
// import { Container } from 'react-bootstrap';
import { Col, Container, Row } from 'react-bootstrap';
import Layout from './Layouts/LayoutLandingswap';
import DeFiPotential from './Sections/DeFiPotentialswap';
import DualToken from './Sections/DualToken';
import HomeBannerswap from './Sections/HomeBannerswap';
import LearnMore from './Sections/LearnMore';
import PartnersInvestors from './Sections/PartnersInvestors';
import HomeBanner1 from './Sections/HomeBannerProtocol';
// import {Container} from 'react-bootstrap';
import TUAPotential from './Sections/TuaPotentialswap';
import Investement from './Sections/Investementswap';
function HomePage() {
    React.useEffect(() => {
        window.scrollTo(0, 0);
    });
    return (
        <Layout>
              
                {/* <HomeBanner1 /> */}
            <div className="page-home-v2">
                <HomeBannerswap />
                <DeFiPotential />
                <TUAPotential />
                <Investement />
                {/* <DualToken /> */}

                <Container fluid="lg">
                    {/* <hr /> */}
                </Container>

                <LearnMore />
                <PartnersInvestors />
            </div>
        </Layout>
    );
}

export default HomePage;