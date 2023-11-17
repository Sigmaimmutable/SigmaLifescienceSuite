import React from 'react';
import {
    Link
  } from "react-router-dom";

const VideoCard = (props) => {
    return (
        <Link className='card-media' to={{
            pathname: "/ProfileViewOtherCopy2New",            
            state:{ownerAddress:props.ownerAddress}
            // ,follow:props.follow
          }}> 
            <div className="card-media-info">
                <h3>{props.title}</h3>
                {props.subtitle ? <h4>{props.subtitle}</h4> : null}
            </div>
            {/* <video playsInline={true} autoPlay={true} loop={true} src={props.url}></video> */}
            <img src={props.url} alt="pic" />
        </Link>
    );
};

export default VideoCard;