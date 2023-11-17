import React from 'react';
// import {
//     Link
//   } from "react-router-dom";
//import Icon from '../../assets/images/dummy-icon.svg';

const Activity1 = (props) => {
    return (
        <div className='activity-item d-flex align-items-center mb-3'>        
            <div className="activity-content">
                {/* <h4><Link to="/activity">{props.dataall.NFTName}</Link></h4> */}
                {/* <img src={props.image} alt="icon" /> </Link>*/}
                <p>  {props.dataall.EscrowAddress}</p>
                {props.dataall.Assetid === "" || props.dataall.Assetid === null || props.dataall.Assetid === undefined ?(<>
                </>):(<>
                    <p style={{cursor: 'pointer'}} onClick={() => window.open(`https://testnet.algoexplorer.io/asset/${props.dataall.Assetid}`)}>  {props.dataall.Assetid}</p>
                </>)}
                <p style={{cursor: 'pointer'}} onClick={() => window.open(`https://testnet.algoexplorer.io/address/${props.dataall.ownerAddress}`)}> {props.dataall.ownerAddress}</p>                
                {props.dataall.NFTDescription === "" || props.dataall.NFTDescription === null || props.dataall.NFTDescription === undefined ?(<>
                </>):(<>
                    <p style={{cursor: 'pointer'}} onClick={() => window.open(`https://testnet.algoexplorer.io/tx/${props.dataall.NFTDescription}`)}>  {props.dataall.NFTDescription}</p>
                </>)}
                <div className="time">{props.dataall.TimeStamp}</div>
                
            </div>
        </div>
    );
};

export default Activity1;