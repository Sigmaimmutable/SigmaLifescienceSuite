import React from 'react';
import {
    Link
  } from "react-router-dom";

const ImageCard = (props) => {
    //console.log("Icard",props.dataall)
    return (
        // <Link className='card-media' to={{
        //     pathname: "/profileviewother",
        //     state:{alldata:props.dataall}
        //   }}>
              <Link className='card-media' to={{
            pathname: "/ProfileViewOtherCopy2New",            
            state:{ownerAddress:props.ownerAddress}
            // ,follow:props.follow
          }}>        
            <div className="card-media-info">
                <h3>{props.title}</h3>
                {props.description ? <h4>{props.description}</h4> : null}
            </div>
            <img src={props.image} alt="pic" />
        </Link>
    );
};

export default ImageCard;