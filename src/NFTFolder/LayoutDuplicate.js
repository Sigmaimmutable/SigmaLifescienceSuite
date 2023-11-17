import React from 'react';
import Sidebar from '../components/Dashboard/Sidebar';
import BGTR from '../assets/images/bg-tr.png';
import BGBL from '../assets/images/bg-bl.png';


function LayoutInner(props) {
    return (
        <div id="wrapper">
            <Sidebar />
            <div className="dashboard-inner">
                <img src={BGTR} className='dashboard-bg dashboard-bg-tr' alt="shape blue" />
                <img src={BGBL} className='dashboard-bg dashboard-bg-bl' alt="shape blue" />                
                {props.children}
            </div>
        </div>
    );
}

export default LayoutInner;