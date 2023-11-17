import React from 'react';
import { Col, Container, Row, Form, Tabs, Tab, Button} from 'react-bootstrap';
import Layout from './Layout';
import OrderIcon from '../../assets/images/order-icon.png';

import BG from '../../assets/images/bg-v2.png';
import BGGrad from '../../assets/images/bg-grad.png';

const MoneyMarket = () => {
    React.useEffect(() => {
        window.scrollTo(0, 0);
    });
    return (
        <Layout>
            <div className="page-content">
                <Container fluid="lg">
                    <Row>
                        <Col md={4} lg={4} xl={3} className='mb-xl-0 d-none mb-2'>
                            <div className="card-border-grad card-shadow card-market card-left">
                                <div className="card-border-grad-inner" style={{backgroundImage: `url(${BG})`}}>
                                    <h4 className="mb-20 font-bold card-left-title font-normal">Add collateral in order to borrow assets </h4>
                                    <div className='h8 mb-20'>Gain exposure to tokens without reducing your assets. Leverage will enable you to take short positions againts assets and earn from downside movements.</div>
                                </div>
                            </div>
                        </Col>
                        <Col md={8} lg={8} xl={8} className='mb-xl-0 mb-2'>
                            <div className="money-market-card h-100">
                                <div className="money-market-card-order-header d-flex align-items-center">
                                    <img src={OrderIcon} alt="OrderIcon" />
                                    <div className='ps-3'>
                                        <div className="h3 mb-0">Borrow TAU</div>
                                        <p className='d-flex flex-wrap'><span className='d-flex align-items-center me-5'>Collateral: <div className="h6 mb-0">ALGO</div></span> <span className='d-flex align-items-center'>Oracle: <div className="h6 mb-0">Chainink</div></span></p>
                                    </div>
                                </div>

                                <div className="money-market-card-order-body">
                                    <div className="row mb-20">
                                        <div className="col-4">
                                            <p className='mb-0' style={{color: '#969696'}}>Collateral</p>
                                            <h4 className='mb-0 text-normal font-semi-bold' style={{color: '#FF0099'}}>0 ALGO</h4>
                                            <h5 className='mb-0'>$0.00</h5>
                                        </div>
                                        <div className="col-4">
                                            <p className='mb-0' style={{color: '#969696'}}>Borrowed</p>
                                            <h5 className='mb-0'>0 TAU</h5>
                                        </div>
                                        <div className="col-4">
                                            <p className='mb-0' style={{color: '#969696'}}>APR</p>
                                            <h5 className='mb-0'>0.25%</h5>
                                        </div>
                                    </div>

                                    <Tabs
                                        defaultActiveKey="borrow"
                                        transition={false}
                                        id="noanim-tab-example"
                                        className='tabs-dark'
                                    >
                                        <Tab eventKey="borrow" title="Borrow">
                                            <div className="pt-4">
                                                <div className="h3 mb-2 pb-2">Borrow TAU</div>

                                                <div className="d-flex flex-wrap mb-10 align-items-center" style={{color: '#969696'}}>
                                                    <span className='arrow-45'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#fff" className="bi bi-arrow-down-short" viewBox="0 0 16 16">
                                                            <path fillRule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"/>
                                                        </svg>
                                                    </span>
                                                    <span className='mx-3'>Add ALGO collateral from </span>

                                                    <Button variant='outline-danger' className='btn-sm my-2'>Wallet</Button>

                                                    <span className='ms-auto'>Balance 0</span>
                                                </div>

                                                <input type="text" className='form-control mb-2 form-dark' placeholder='0.0' />

                                                <div className="d-flex flex-wrap mb-10 align-items-center" style={{color: '#969696'}}>
                                                    <span className='arrow-45-up'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#fff" className="bi bi-arrow-down-short" viewBox="0 0 16 16">
                                                            <path fillRule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"/>
                                                        </svg>
                                                    </span>
                                                    <span className='mx-3'>Borrow TAU to</span>

                                                    <Button variant='outline-danger' className='btn-sm my-2'>Bento box</Button>

                                                    <span className='ms-auto'>Max 0</span>
                                                </div>

                                                <input type="text" className='form-control mb-3 form-dark' placeholder='0.0' />
                                                <Button variant='grad' className='w-100'>Approve ALGO</Button>
                                                
                                            </div>
                                        </Tab>
                                        <Tab eventKey="repay" title="Repay">
                                        <div className="pt-4">
                                                <div className="h3 mb-2 pb-2">Repay TAU</div>

                                                <div className="d-flex mb-10 align-items-center" style={{color: '#969696'}}>
                                                    <span className='arrow-45'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#fff" className="bi bi-arrow-down-short" viewBox="0 0 16 16">
                                                            <path fillRule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"/>
                                                        </svg>
                                                    </span>
                                                    <span className='mx-3'>from</span>

                                                    <Button variant='outline-danger' className='btn-sm my-2'>Wallet</Button>

                                                    <span className='ms-auto'>Balance 0</span>
                                                </div>

                                                <Form>
                                                    <input type="text" className='form-control mb-3 form-dark' placeholder='0.0' />
                                                    <Button variant='grad' className='w-100'>Approve ALGO</Button>
                                                </Form>
                                            </div>
                                        </Tab>
                                    </Tabs>
                                </div>
                            </div>
                        </Col>

                        <Col md={12} lg={12} xl={4}>
                            <div className="card-border-grad card-shadow card-market card-left">
                                <div className="card-border-grad-inner" style={{backgroundImage: `url(${BGGrad})`}}>
                                    <h4 className="mb-20 font-bold card-left-title font-normal">Market</h4>
                                    <div className="f16 d-flex align-items-center justify-content-between mb-2">
                                        <span>APR</span>
                                        <strong>89.20%</strong>
                                    </div>
                                    <div className="f16 d-flex align-items-center justify-content-between mb-2">
                                        <span>Total</span>
                                        <strong>1,850 ALGO</strong>
                                    </div>
                                    <div className="f16 d-flex align-items-center justify-content-between mb-2">
                                        <span>Available</span>
                                        <strong>397.4 ALGO</strong>
                                    </div>
                                    <div className="f16 d-flex align-items-center justify-content-between mb-2">
                                        <span>Borrowed</span>
                                        <strong>78.52%</strong>
                                    </div>
                                    <div className="f16 d-flex align-items-center justify-content-between mb-2">
                                        <span>Collateral</span>
                                        <strong>44.13 ALGO</strong>
                                    </div>
                                    <div className="f16 d-flex align-items-center justify-content-between mb-2">
                                        <span>Health</span>
                                        <strong>276%</strong>
                                    </div>

                                    <div className="pt-4 pb-5">
                                        <Button variant='grad'>Update Price</Button>
                                    </div>

                                    <h4 className="mb-20 font-bold card-left-title font-normal">Oracle</h4>
                                    <div className="f16 d-flex align-items-center justify-content-between mb-2">
                                        <span>Name</span>
                                        <strong>Chainlink</strong>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Layout>
    );
};

export default MoneyMarket;