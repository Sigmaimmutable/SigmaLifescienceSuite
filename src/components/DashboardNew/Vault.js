import React from 'react';
import { Card, Col, Container, Row, Tabs, Tab, Button, InputGroup, Form, Table, OverlayTrigger, Tooltip, Modal, Badge, Alert, Accordion } from 'react-bootstrap';
import Layout from './LayoutT';
import Slider from 'rc-slider';

const Deposit = () => {
    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Layout>
            <Container>
                <Row className='justify-content-center'>
                    <Col md={8} lg={6} className="mb-4">
                        <Row className="gx-2 text-center mb-2">
                            <Col sm={4} className="mb-2">
                                <div className="cd-info">
                                    <small>VAULTED</small>
                                    <h4 className="d-flex mb-0 justify-content-center">
                                        83.31M <img style={{width: '20px'}} className="ms-2" src="https://app.folks.finance/usdc.svg" alt="usdc" />
                                    </h4>
                                </div>
                            </Col>
                            <Col sm={4} className="mb-2">
                                <div className="cd-info">
                                    <small>
                                        REWARDS APR
                                        <OverlayTrigger
                                            key="left"
                                            placement="left"
                                            overlay={
                                                <Tooltip id={`tooltip-left`}>
                                                    Governance APR represents a fixed ALGO allocation over all committed ALGOs. This number will go down as more ALGOs are committed to governance.
                                                </Tooltip>
                                            }
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi ms-2 bi-info-circle" viewBox="0 0 16 16">
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                                </svg>
                                        </OverlayTrigger>
                                    </small>
                                    <h4 className="d-flex mb-0 justify-content-center">
                                        7.1%
                                    </h4>
                                </div>
                            </Col>
                                <Col sm={4} className="mb-2">
                                    <div className="cd-info">
                                        <small>
                                            GOVERNORS
                                            <OverlayTrigger
                                                key="left"
                                                placement="left"
                                                overlay={
                                                    <Tooltip id={`tooltip-left`}>
                                                        The number of eligible Algofi vaults committed to governance.
                                                    </Tooltip>
                                                }
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi ms-2 bi-info-circle" viewBox="0 0 16 16">
                                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                                    </svg>
                                            </OverlayTrigger>
                                        </small>
                                        <h4 className="d-flex mb-0 justify-content-center">
                                            3.72K
                                        </h4>
                                    </div>
                                </Col>
                        </Row>
                        <Card className='card-dash d-block border-0 mb-4'>
                            <div className="d-flex align-items-center float-end mt-1 acc-h-links">
                                <Button variant='link' className='p-0 text-white'>
                                    <OverlayTrigger
                                        key="left"
                                        placement="left"
                                        overlay={
                                            <Tooltip id={`tooltip-left`}>
                                                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                            </Tooltip>
                                        }
                                        >
                                        <svg className="tooltip-icon ms-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"  viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                            <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
                                        </svg>
                                    </OverlayTrigger>
                                </Button>
                            </div>
                            <h3>Vault</h3>
                            <Tabs defaultActiveKey="add" className='dashboard-tabs' id="tab-example-1">
                                <Tab eventKey="add" title="Add">
                                    <div className="mb-0">
                                        <Alert variant="grad" className='mb-3'>
                                            <div className="d-flex">
                                                <span className='me-3'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                                    </svg>
                                                </span>
                                                <p><strong>Governance Registration Has Ended</strong><br /> To earn rewards and borrow against your ALGOs, supply your uncommitted ALGOs to the Algofi Lending Market.</p>
                                            </div>
                                        </Alert>
                                        <div className="input-group-max d-flex mb-3 align-items-center text-nowrap py-2 px-3 input-group-max-lg w-100">
                                            <input type="number" style={{fontSize: '22px !important;'}} placeholder='0.00' className='form-control' />
                                            <div className="d-flex align-items-center">
                                                <span className='me-2'><img style={{width: '25px'}} src="https://app.folks.finance/usdc.svg" alt="usdc" /></span>
                                                <div className='text-nowrap' style={{lineHeight: '1.4'}}>
                                                    <span style={{fontWeight: '500'}}>ALGO</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-5">
                                            <Slider min={0} disabled defaultValue={0} marks={{ 0: '0%', 25: '25%', 50: '50%', 75: "75%", 100: '100%' }} step={null} />
                                        </div>

                                        <div className="text-center">
                                            <Button variant='blue' disabled className='btn blue'>Please Connect Wallet</Button>
                                        </div>
                                    </div>
                                </Tab>
                                <Tab eventKey="govern" title="Govern">
                                    <div className="mb-0">
                                        <Table responsive className='dashboard-table text-center'>
                                            <thead>
                                                <tr>
                                                    <th>
                                                        <div className="d-flex justify-content-center align-items-center" style={{lineHeight: '1.1'}}>
                                                            <span className='me-2'>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="#fd4040" class="bi d-block bi-circle-fill" viewBox="0 0 16 16">
                                                                    <circle cx="8" cy="8" r="8"/>
                                                                </svg>
                                                            </span>
                                                            INELIGIBLE
                                                        </div>
                                                    </th>
                                                    <th>GOVERNANCE PERIOD #3</th>
                                                    <th>3/31 - 6/30</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className='border-0'>
                                                        YOUR VAULT <br />
                                                        <div className="d-flex my-2 justify-content-center align-items-center" style={{fontSize: '20px', lineHeight: '1'}}>
                                                            <span>0</span> <img className='ms-2' style={{width: '18px'}} src="https://app.folks.finance/usdc.svg" alt="usdc" />
                                                        </div>
                                                        <span className='text-muted'>$0</span>
                                                    </td>
                                                    <td className='border-0'>
                                                        EST. REWARDS <br />
                                                        <div className="d-flex my-2 justify-content-center align-items-center" style={{fontSize: '20px', lineHeight: '1'}}>
                                                            <span>0</span> <img className='ms-2' style={{width: '18px'}} src="https://app.folks.finance/usdc.svg" alt="usdc" />
                                                        </div>
                                                        <span className='text-muted'>$0</span>
                                                    </td>
                                                    <td className='border-0'>
                                                        COMMITTED STAKE <br />
                                                        <div className="d-flex my-2 justify-content-center align-items-center" style={{fontSize: '20px', lineHeight: '1'}}>
                                                            <span>0</span> <img className='ms-2' style={{width: '18px'}} src="https://app.folks.finance/usdc.svg" alt="usdc" />
                                                        </div>
                                                        <span className='text-muted'>$0</span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </Table>

                                        <Accordion>
                                            <Accordion.Item eventKey="0">
                                                <Accordion.Header>Commit to Governance &nbsp;<span className='text-red'>(Registration Ended)</span></Accordion.Header>
                                                <Accordion.Body>
                                                    <div className="input-group-max d-flex mb-3 align-items-center text-nowrap py-2 px-3 input-group-max-lg w-100">
                                                        <input type="number" style={{fontSize: '22px !important;'}} placeholder='0.00' className='form-control' />
                                                        <div className="d-flex align-items-center">
                                                            <span className='me-2'><img style={{width: '25px'}} src="https://app.folks.finance/usdc.svg" alt="usdc" /></span>
                                                            <div className='text-nowrap' style={{lineHeight: '1.4'}}>
                                                                <span style={{fontWeight: '500'}}>ALGO</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="mb-5">
                                                        <Slider min={0} disabled defaultValue={0} marks={{ 0: '0%', 25: '25%', 50: '50%', 75: "75%", 100: '100%' }} step={null} />
                                                    </div>

                                                    <div className="text-center">
                                                        <Button variant='blue' disabled className='btn blue'>Please Connect Wallet</Button>
                                                    </div>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey="1">
                                                <Accordion.Header>Vote &nbsp;<span className='text-blue'>(Not Started Yet)</span></Accordion.Header>
                                                <Accordion.Body>
                                                    <Button variant='blue' size="sm" onClick={handleShow} className='mt-2 float-end'>Expand Details</Button>
                                                    <h3 className='mb-2'>Measure #1</h3>
                                                    <p>Creating a tier of Expert Governors</p>
                                                    <hr />
                                                    <h4 className='mb-2'>Cast Your Vote</h4>
                                                    <Form.Check 
                                                        type="radio"
                                                        name='vote'
                                                        id={`default-radio-1`}
                                                        label={`A. Creating an xGov Tier`}
                                                    />
                                                    <Form.Check 
                                                        type="radio"
                                                        name='vote'
                                                        id={`default-radio-2`}
                                                        label={`B. The Foundation keeps the sole power to propose measures`}
                                                    />
                                                    <div className="text-center mt-3">
                                                        <Button variant='blue' disabled className='btn blue'>Please Connect Wallet</Button>
                                                    </div>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey="2">
                                                <Accordion.Header>Claim Rewards &nbsp;<span className='text-blue'>(Not Started Yet)</span></Accordion.Header>
                                                <Accordion.Body>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                                commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                                                velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                                                cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                                                est laborum.
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                    </div>
                                </Tab>
                                <Tab eventKey="remove" title="Remove">
                                    <div className="mb-0">
                                        <Alert variant="warning" className='mb-3'>
                                            <div className="d-flex">
                                                <span className='me-3'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-exclamation-triangle" viewBox="0 0 16 16">
                                                        <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z"/>
                                                        <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z"/>
                                                    </svg>
                                                </span>
                                                <p>Removing ALGOs from your vault may cause you to be ineligible for governance rewards. Read more <a href="https://docs.algofi.org/vault/tutorial/removing-algos" style={{color : '#133ac6'}} target="_blank" rel="noopener noreferrer">here</a>.</p>
                                            </div>
                                        </Alert>
                                        <div className="input-group-max d-flex mb-3 align-items-center text-nowrap py-2 px-3 input-group-max-lg w-100">
                                            <input type="number" style={{fontSize: '22px !important;'}} placeholder='0.00' className='form-control' />
                                            <div className="d-flex align-items-center">
                                                <span className='me-2'><img style={{width: '25px'}} src="https://app.folks.finance/usdc.svg" alt="usdc" /></span>
                                                <div className='text-nowrap' style={{lineHeight: '1.4'}}>
                                                    <span style={{fontWeight: '500'}}>ALGO</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-5">
                                            <Slider min={0} disabled defaultValue={0} marks={{ 0: '0%', 25: '25%', 50: '50%', 75: "75%", 100: '100%' }} step={null} />
                                        </div>

                                        <div className="text-center">
                                            <Button variant='blue' disabled className='btn blue'>Please Connect Wallet</Button>
                                        </div>
                                    </div>
                                </Tab>
                            </Tabs>
                        </Card>                                              
                    </Col>
                </Row>
            </Container>
            <Modal show={show} size="lg" centered className="modal-dashboard" onHide={handleClose}>
                <Modal.Header closeButton />
                <Modal.Body>
                    <p>We propose the creation of a new tier of Expert Governors (xGovs). These governors, via decentralized aggregation mechanisms such as a DAO, will have the power to put forward measures for our quarterly governance votes. These measures will still be voted on by our current governance platform, which will not change.</p>

                    <p>For more infromation about this proposal, see <a style={{color : '#133ac6'}} target="_blank" rel="noopener noreferrer" href="https://algorand.foundation/news/xgov-expert-governors-system">https://algorand.foundation/news/xgov-expert-governors-system</a></p>

                    <p>The new xGov mechanism will require expert governors to commit to governance for a longer period of time, of one year or more. The proposing power of xGovs will be determined by the stake that they commit to governance, as well their experience, i.e. the number of years of their xGov participation. For example, a few years of experience of a governor, automatically measured by participation in a DAO, could double the proposing power of each staked Algo. If approved, the exact xGov rules will be discussed with the community, with the goal of rewarding longer-term commitment to Governance and to the decentralized ecosystem. The experience timer will go into effect once the program takes effect.</p>

                    <p>Over the coming quarters, the Foundation will facilitate a discussion with the community regarding the precise mechanisms of the xGov platform. Details to be worked out include proposal mechanisms, Experience vs. Stake, measure testing/editing, xGov period durations and certification, revision mechanisms and economic/reward modeling. The Foundation will post a more detailed vision for an xGov DAO tier on the Algorand Foundation website during this voting session. To support a meaningful discussion on this proposal, the voting session has been extended to 28 days, so that it now runs from Feb 1 to Feb 28, 2022.</p>

                    <p><strong>Option A:</strong> The Governors support the creation of a new DAO-based tier of governance, xGov, with the power to formulate, evaluate and propose measures to be put to vote.</p>

                    <p><strong>Option B:</strong> The Governors prefer the Algorand Foundation continue in its current role of curating and exclusively proposing measures for community vote, in addition to facilitating the vote itself.</p>

                    <p>The Foundation supports option A.</p>
                </Modal.Body>
            </Modal>
        </Layout>
    );
};

export default Deposit;