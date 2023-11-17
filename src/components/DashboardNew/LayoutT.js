import React from 'react';
import Footer from './Footer';
import Header from './HeaderT';
import Sidebar from '../Layouts/Sidebar';

function Layout(props) {
    const [show, setShow] = React.useState(false);
    const pull_data = (data) => {
        setShow(data)
      }
    return (
        <>           
            <div id="dashboard" className={show ? 'ps-dash' : ''}>
                <Header func={pull_data} />
                {props.children}
            </div>
            <Footer />
        </>
    );
}

export default Layout;