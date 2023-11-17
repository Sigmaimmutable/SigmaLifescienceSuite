import React from "react";
//, { useState,useEffect} 
//import Select from 'react-select';
//import makeAnimated from 'react-select/animated';
//import AllIcon from '../../../assets/images/cate-all-icon.svg';
//import {Dropdown, Row, Col, Button,Modal,Form, InputGroup} from 'react-bootstrap';
//import Card from '../../Snippets/Card';
//import MyAlgoConnect from '@randlabs/myalgo-connect';
import {
    Link
  } from "react-router-dom";
import CardCreate from "../NftCards/CardCreate";
//const animatedComponents = makeAnimated();


const Created = (data) => {            
    return (
        <div className='mb-4'>            
            <div className='d-flex mb-4 filter-list flex-wrap align-items-center'>                
            </div>
            {data.data[0] === null || data.data[0] === "" || data.data[0] === undefined ? (
            <div className="no-found py-5p text-center">
                        <h2>Nothing to look at</h2>
                        {/* <p className="lead mb-4">Subscribe to authors and come back to see <br />NFTs from your favorite artists</p> */}
                        <Link to="/profile" className='btn btn-grad'>Browse marketplace</Link>
            </div>
           ):(
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 row-cols-lg-6">
            {data.data.map((x, index) => {                
                return(  
                    <>                    
                    <div className='col mb-4' >
                    <CardCreate img={x.Imageurl} onNameChange={data.onNameChange}
                    title={x.NFTName} count="401" subTitle={`<span>Highest bid</span> <span>1/1</span>`} 
                    linkText={parseFloat(x.NFTPrice/1000000)} dataall={x}
                    Assetid={x.Assetid}
                    />
                    </div>                    
                    </>                                                                                          
              )})}                                                                      
            </div>                                
           )}                                              
        </div>
    );
};

export default Created;