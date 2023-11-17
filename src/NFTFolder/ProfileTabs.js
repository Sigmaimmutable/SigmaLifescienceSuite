import React from 'react';
//{useState,useEffect,useCallback}
import {Tabs, Tab} from 'react-bootstrap'
import OnSale from '../Nftsnip/OnSale';
import Owned from '../Nftsnip/Owned';
import Created from '../Nftsnip/Created';
import Activity from '../Nftsnip/Activity';
import OnSaleLike from '../Nftsnip/OnSaleLike';
const ProfileTabs = (create) => {
    // React.useEffect(() => {
    //     window.scrollTo(0, 0);     
    // });
    return (
        <Tabs defaultActiveKey="onSale" id="profile-tabs" className='mb-4'>
            <Tab eventKey="onSale" title="On Sale">
                <OnSale data={create.sale}/>
            </Tab>
            <Tab eventKey="owned" title="Owned">
                <Owned data={create.buyed}/>
            </Tab>                        
            <Tab eventKey="created" title="Created">                
                <Created data={create.create} onNameChange={create.onNameChange}/>
            </Tab>                
            {/* <Tab eventKey="collections" title={<span>Collections <span className="badge badge-new">new</span></span>}>
                <Collection />
            </Tab> */}
            <Tab eventKey="liked" title="Liked">
                <OnSaleLike data={create.likes}/>
            </Tab>
            {/* <Tab eventKey="liked" title="Liked">
                <Liked data={create.likes}/>
            </Tab> */}
            <Tab eventKey="activity" title="Activity">
                <Activity data={create.create} other={"local"} ownersend={create.owner}/>
            </Tab>
        </Tabs>
    );
};

export default ProfileTabs;