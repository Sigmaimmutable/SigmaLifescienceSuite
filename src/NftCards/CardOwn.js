import React,{useState} from 'react';
import {Card, Dropdown, Button, OverlayTrigger, Tooltip,Modal,Form, InputGroup } from 'react-bootstrap';
import {
    Link
  } from "react-router-dom";

//import User from '../../assets/images/dummy-icon.svg';
//import Preview from '../../assets/images/preview.jpg';
//assets/images/Algo.png
import EthereumIcon from '../assets/images/Algo.png'
//import configfile from '../../config.json'
import MyAlgoConnect from '@randlabs/myalgo-connect';
//import fireDb from '../../firebase';
//import dataescrow from "../../escrow.js";
//const myAlgoWallet = new MyAlgoConnect();
const CardOwn = (props) => {                        
    return (
        <Card>
            <Card.Header className='d-flex align-items-center'>                
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
                        {/* <h5 dangerouslySetInnerHTML={{__html: props.subTitle}} /> */}
                        <Link to="/" className='btn-link-grad'>{props.linkText}</Link>
                    </div>                                
                </div>                   
                
            </Card.Body>
            
        </Card>
    );
};

export default CardOwn;