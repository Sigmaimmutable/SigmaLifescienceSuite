import React from 'react';
//import Select from 'react-select';
//import makeAnimated from 'react-select/animated';
//import AllIcon from '../../../assets/images/cate-all-icon.svg';
//import {Dropdown, Row, Col, Button} from 'react-bootstrap';
import {
    Link
  } from "react-router-dom";
//import Card from '../Card';
//import CardOwn from '../CardOwn';
import CardSale from '../NftCards/CardSale';
//const animatedComponents = makeAnimated();

const OnSaleLike = (data) => {    
    //console.log("getdatasalelike",data.data)                
    return (
        <div className='mb-4'>            
            {data.data[0] === null || data.data[0] === "" || data.data[0] === undefined ? (
            <div className="no-found py-5p text-center">
                        <h2>Nothing to look at</h2>
                        {/* <p className="lead mb-4">Subscribe to authors and come back to see <br />NFTs from your favorite artists</p> */}
                        <Link to="/profile" className='btn btn-grad'>Browse marketplace</Link>
            </div>
           ):(
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 row-cols-lg-6">
            {data.data.map((x, index) => {
                // console.log("xvalue",x)
                return(  
                    <>                    
                    <div className='col mb-4' >
                    <CardSale img={x.Imageurl} 
                    title={x.NFTName}
                    dataall={x}
                    />
                    </div>                    
                    </>                                                                                          
              )})}                                                                      
            </div>
           )}
            <div className="no-found d-none py-5 text-center">
                <h2>No items found</h2>
                <p className="lead mb-4">Come back soon! Or try to browse <br />something for you on our marketplace</p>
                <Link to="/" className='btn btn-grad'>Browse marketplace</Link>
            </div>
        </div>
    );
};

export default OnSaleLike;