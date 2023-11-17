import React from 'react';
import {Card, Dropdown, OverlayTrigger, Tooltip,Modal } from 'react-bootstrap';
import {
    Link
  } from "react-router-dom";
import EthereumIcon from '../assets/images/Algo.png'
//import logogif from '../../assets/images/gif1.svg';
import logogif from '../assets/images/gif4.gif';
const CardCreateOtherView = (props) => {
    const [showTestLoading, setShowTestLoading] = React.useState(false);            
    const [showShare,setshowShare] = React.useState(false);                  
    const handleCloseTestLoading = () => setShowTestLoading(false);
    const handleCloseshowShare = () => setshowShare(false);    
                    
    const sharebutton=()=>{
        //console.log("SingleBid",location.state.alldata)
        setshowShare(true)
    }
    
    return (
        <Card>
            <Card.Header className='d-flex align-items-center'>
                <div className="card-users d-flex align-items-center me-auto">                    
                </div>

                <Dropdown className='dropdown-noarrow'>
                    <Dropdown.Toggle variant="reset">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
                        <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                    </svg>
                    </Dropdown.Toggle>

                    <Dropdown.Menu className='link-flex dropdown-menu-right'>
                        {/* <Dropdown.Item href="/">Buy now</Dropdown.Item> */}
                        <Dropdown.Divider />
                        <Dropdown.Item href="/profileviewother">Refresh Metadata</Dropdown.Item>
                        <Dropdown.Item onClick={()=>sharebutton()}>Share</Dropdown.Item>
                        <Dropdown.Item onClick={() => window.open(`https://testnet.algoexplorer.io/asset/${props.Assetid}`)}>Explore</Dropdown.Item>
                        {/* <Dropdown.Item href="/profileviewother">Report</Dropdown.Item> */}
                    </Dropdown.Menu>
                </Dropdown>
            </Card.Header>
            <Card.Body className='p-0'>
                <div className="position-relative">
                    <img src={props.img} className='img-fluid card-image' alt="Preview" />
                    
                    {props.timer ? (
                        <div className="timer">
                            <div>{props.timer} <span>left</span> <img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple@6.0.1/img/apple/64/1f525.png" alt="fire" /></div></div>
                    ) : null}
                </div>

                <div className="card-title justify-content-between d-flex align-items-start">
                    <Link to="/">{props.title}</Link>

                    <OverlayTrigger
                        overlay={<Tooltip>Algorand</Tooltip>}
                    >
                        <img src={EthereumIcon} alt="icon" />
                    </OverlayTrigger>
                </div>  

                <div className="card-info d-flex align-items-end justify-content-between">
                    <div>                    
                        <Link  className='btn-link-grad'>{props.linkText}</Link>
                    </div>                    
                                    
                
                    {/* onHide={handleCloseTestLoading} */}
            <Modal show={showTestLoading} centered size="sm" >
                <Modal.Header  />
                <Modal.Body>
                    <div className="text-center py-4">
                        {/* <h3>Loading...</h3>                                     */}
                        <img src={logogif} alt="loading..." />
                    </div>                    
                </Modal.Body>
            </Modal>                          
            
            
            {/* onHide={handleCloseshowShare} */}
            <Modal show={showShare} centered size="sm" onHide={handleCloseshowShare}>
                <Modal.Header closeButton />
                <Modal.Body>                        
                            <h3>&nbsp;&nbsp;Share link to this page</h3>                            
                            <br/>
                            {/* <div className="d-flex mt-3 justify-content-between"> */}
                            <div className="footer-social d-flex align-items-center">                                                       
                                <div>
                                    <a href={"https://twitter.com/ElementDeFi"} target="_blank" rel="noopener noreferrer">
                                        <svg viewBox="0 0 18 16" fill="none" width="40" height="16" xlmns="http://www.w3.org/2000/svg" className="sc-bdvvtL sc-hKwDye esgSbr"><path d="M17.9655 2.42676C17.3018 2.71851 16.593 2.91726 15.8468 3.00801C16.6073 2.54976 17.1922 1.82751 17.469 0.965759C16.7558 1.38201 15.9653 1.68501 15.1238 1.85376C14.4518 1.13451 13.494 0.684509 12.4305 0.684509C10.3927 0.684509 8.7405 2.33676 8.7405 4.37226C8.7405 4.66476 8.77425 4.94601 8.83575 5.21526C5.76825 5.07051 3.0495 3.59751 1.23 1.37076C0.90975 1.91226 0.7305 2.54151 0.7305 3.22701C0.7305 4.50951 1.383 5.63676 2.3715 6.29901C1.76625 6.27951 1.197 6.11301 0.7005 5.83701V5.88276C0.7005 7.67151 1.97025 9.16326 3.66 9.50301C3.35025 9.58626 3.02325 9.63126 2.688 9.63126C2.4525 9.63126 2.22675 9.60876 2.001 9.56676C2.47425 11.0315 3.83475 12.0995 5.454 12.1295C4.194 13.1188 2.59725 13.7083 0.8775 13.7083C0.585 13.7083 0.29325 13.691 0 13.658C1.64175 14.7035 3.576 15.3148 5.66775 15.3148C12.4583 15.3148 16.167 9.69276 16.167 4.82526C16.167 4.66851 16.167 4.51026 16.1558 4.35276C16.8765 3.83601 17.5057 3.18276 18.0007 2.44176L17.9655 2.42676Z" fill="currentColor"></path></svg>
                                   </a>
                                    <small className='d-block mt-2'>Twitter</small>
                                </div>
                                <div>                                
                                <a href={"https://github.com/BosonLabs/ELEMENTNFT_UI.git"} target="_blank" rel="noopener noreferrer">
                                        <svg viewBox="0 0 16 14" width="40" height="16" xlmns="http://www.w3.org/2000/svg" className="sc-bdvvtL sc-hKwDye esgSbr">
                                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                                        </svg>
                                </a>
                                    <small className='d-block mt-2'>Github</small>
                                </div>
                                {/* <div>                                
                                <a href={"https://www.facebook.com/"} target="_blank" rel="noopener noreferrer">
                                        <svg viewBox="0 0 24 24" width="40" height="16" xlmns="http://www.w3.org/2000/svg" className="sc-bdvvtL sc-hKwDye esgSbr"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z" fill="currentColor"></path></svg>                                   
                                </a>
                                    <small className='d-block mt-2'>Facebook</small>
                                </div> */}
                                <div>
                                <a href={"https://t.me/elementSwap"} target="_blank" rel="noopener noreferrer">                                
                                        <svg viewBox="0 0 16 14" fill="none" width="40" height="16" xlmns="http://www.w3.org/2000/svg" className="sc-bdvvtL sc-hKwDye esgSbr"><path d="M15.9513 1.29916L13.5438 13.1556C13.377 13.997 12.8902 14.1987 12.21 13.8093L8.542 10.979L6.76804 12.7662C6.56797 12.9748 6.40125 13.1556 6.03445 13.1556C5.55428 13.1556 5.63431 12.9679 5.47425 12.495L4.20714 8.19051L0.572523 7.00834C-0.214421 6.76495 -0.22109 6.20168 0.745918 5.7914L14.9243 0.0891779C15.5711 -0.209841 16.1914 0.256072 15.9446 1.29221L15.9513 1.29916Z" fill="currentColor"></path></svg>
                                </a>
                                    <small className='d-block mt-2'>Telegram</small>
                                </div>
                                <div>
                                <a href={"https://medium.com/@ramachandran.baskar/nft-steps-513fae0c36a1"} target="_blank" rel="noopener noreferrer">                                
                                <svg viewBox="0 0 16 14" fill="none" width="40" height="16" xlmns="http://www.w3.org/2000/svg" className="sc-bdvvtL sc-hKwDye gVaYHr"><path d="M5.07644 11.25C7.88022 11.25 10.1531 8.89939 10.1531 5.99991C10.1531 3.10043 7.88004 0.75 5.07644 0.75C2.27284 0.75 0 3.09972 0 5.99991C0 8.9001 2.27267 11.25 5.07644 11.25Z" fill="currentColor"></path><path d="M13.1839 10.9419C14.5857 10.9419 15.7222 8.72942 15.7222 5.99991C15.7222 3.27111 14.5857 1.0579 13.1839 1.0579C11.7821 1.0579 10.6455 3.27111 10.6455 5.99991C10.6455 8.72871 11.7821 10.9419 13.1839 10.9419Z" fill="currentColor"></path><path d="M17.1072 10.4277C17.6003 10.4277 18 8.44542 18 5.99991C18 3.55458 17.6006 1.57207 17.1074 1.57207C16.6142 1.57207 16.2145 3.55511 16.2145 5.99991C16.2145 8.44471 16.6142 10.4277 17.1072 10.4277Z" fill="currentColor"></path></svg>
                                </a>
                                <small className='d-block mt-2'>Medium</small>
                                </div>

                                {/* <div>
                                <a href={"https://mail.google.com/"} target="_blank" rel="noopener noreferrer">                                                                
                                        <svg viewBox="0 0 24 24" width="40" height="16" xlmns="http://www.w3.org/2000/svg" className="sc-bdvvtL sc-hKwDye esgSbr"><path d="M12 12.713l-11.985-9.713h23.971l-11.986 9.713zm-5.425-1.822l-6.575-5.329v12.501l6.575-7.172zm10.85 0l6.575 7.172v-12.501l-6.575 5.329zm-1.557 1.261l-3.868 3.135-3.868-3.135-8.11 8.848h23.956l-8.11-8.848z" fill="currentColor"></path></svg>
                                </a>
                                    <small className='d-block mt-2'>E-mail</small>
                                </div> */}
                            </div>                                                       
                </Modal.Body>
            </Modal>                      
            </div>                   
                
            </Card.Body>
            
        </Card>
    );
};

export default CardCreateOtherView;