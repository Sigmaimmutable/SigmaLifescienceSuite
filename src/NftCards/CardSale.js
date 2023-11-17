import React,{useState} from 'react';
import {Card, Dropdown, Button, OverlayTrigger, Tooltip,Modal,Form, InputGroup } from 'react-bootstrap';
import {
    Link
  } from "react-router-dom";

//import User from '../../assets/images/dummy-icon.svg';
//import Preview from '../../assets/images/preview.jpg';
//import EthereumIcon from '../../assets/images/Algo.png'
//import configfile from '../../config.json'
import MyAlgoConnect from '@randlabs/myalgo-connect';
//import fireDb from '../../firebase';
//import dataescrow from "../../escrow.js";
//const myAlgoWallet = new MyAlgoConnect();
const CardSale = (props) => {   
    //console.log("likeprops",props)                     
    return (
        <Card>            
            <Card.Body className='p-0'>                
                <div className="position-relative">                    
                    <img src={props.img} className='img-fluid card-image' alt="Preview" />
                    
                    {props.timer ? (
                        <div className="timer">
                            <div>{props.timer} <span>left</span> <img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple@6.0.1/img/apple/64/1f525.png" alt="fire" /></div></div>
                    ) : null}
                </div>
                <div className="card-title justify-content-between d-flex align-items-start">
                    <Link >{props.title}</Link>
                    <OverlayTrigger
                        overlay={<Tooltip>{props.title}</Tooltip>}
                    >
                        <Button variant='default' className='btn-count float-end'>
                        <svg viewBox="0 0 17 16" fill="none" width="16" height="16" xlmns="http://www.w3.org/2000/svg" className="sc-bdvvtL sc-hKwDye bZjZGw"><path d="M8.2112 14L12.1056 9.69231L14.1853 7.39185C15.2497 6.21455 15.3683 4.46116 14.4723 3.15121V3.15121C13.3207 1.46757 10.9637 1.15351 9.41139 2.47685L8.2112 3.5L6.95566 2.42966C5.40738 1.10976 3.06841 1.3603 1.83482 2.97819V2.97819C0.777858 4.36443 0.885104 6.31329 2.08779 7.57518L8.2112 14Z" stroke="currentColor" strokeWidth="2"></path></svg>                        
                        </Button>                                                                 
                    </OverlayTrigger>
                </div>                                
            </Card.Body>            
        </Card>
    );
};

export default CardSale;