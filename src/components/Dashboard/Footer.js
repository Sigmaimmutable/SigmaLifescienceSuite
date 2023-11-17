import React from 'react';
import {Button, Col, Container, Form, Modal, Row} from 'react-bootstrap';
// import {
//     Link
//   } from "react-router-dom";
import Shape1 from '../../assets/images/footer-shape-1.png';
import Cartoon from '../../assets/images/cartoon_light.png';
import ModalImage from '../../assets/images/desktop_light.png';
import Logo from '../../assets/images/sidebar-logo.png';
function Footer() {
    const [Cartoonshow, setCartoonShow] = React.useState(false);
    const handle = () => {setCartoonShow(!Cartoonshow); localStorage.setItem('elemCartn', true);};

    const [show, setShow] = React.useState(false);

    const handleClose = () => {setShow(false); localStorage.setItem('elemCartn', true);}

    React.useEffect(() => {
        if(!localStorage.getItem('elemCartn')){
            setTimeout(() => {
                setCartoonShow(true);
            }, 5000);
            setTimeout(() => {
                setShow(true);
            }, 8000);
        }
    }, [])

    return (
        <>
            <Modal show={show} size="lg" onHide={handleClose}>
                <Modal.Body className='p-0'>
                    <Button className='modal-close' onClick={()=>handleClose()} variant='reset'>
                        <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g opacity="1">
                            <path d="M17.5004 32.0832C9.44597 32.0832 2.91699 25.5542 2.91699 17.4998C2.91699 9.44546 9.44597 2.9165 17.5004 2.9165C25.5548 2.9165 32.0837 9.44546 32.0837 17.4998C32.0837 25.5542 25.5548 32.0832 17.5004 32.0832ZM17.5004 29.1665C20.5946 29.1665 23.562 27.9373 25.75 25.7494C27.9379 23.5615 29.1671 20.594 29.1671 17.4998C29.1671 14.4056 27.9379 11.4382 25.75 9.25026C23.562 7.06233 20.5946 5.83317 17.5004 5.83317C14.4062 5.83317 11.4387 7.06233 9.25076 9.25026C7.06283 11.4382 5.83367 14.4056 5.83367 17.4998C5.83367 20.594 7.06283 23.5615 9.25076 25.7494C11.4387 27.9373 14.4062 29.1665 17.5004 29.1665ZM17.5004 15.4378L21.6245 11.3121L23.6881 13.3757L19.5625 17.4998L23.6881 21.624L21.6245 23.6875L17.5004 19.5619L13.3762 23.6875L11.3126 21.624L15.4383 17.4998L11.3126 13.3757L13.3762 11.3121L17.5004 15.4378Z" fill="white"/>
                            </g>
                        </svg>
                    </Button>

                    <h2>Welcome to Element DEFT</h2>

                    <Row className='mb-3'>
                        <Col md={8} className="mb-md-0 mb-3">
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam fugiat, expedita iste voluptatibus sit rerum saepe ut officiis, deserunt quibusdam quod praesentium quidem alias ipsam molestias, aliquid sunt. Est, a veniam cum illum dolor cumque.</p>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam fugiat, expedita iste voluptatibus sit rerum saepe ut officiis, deserunt quibusdam quod praesentium quidem alias ipsam molestias, aliquid sunt. Est, a veniam cum illum dolor cumque.</p>
                        </Col>
                        <Col md={4} className="text-center">
                            <img src={ModalImage} alt="image" className='img-fluid rounded' /> 
                        </Col>
                    </Row>
                    <Row className='text-center mb-sm-0 mb-3'>
                        <Col sm="4" className='py-sm-4 py-2'>
                            <Button variant='grad'>TestNet Guide</Button>
                        </Col>
                        <Col sm="4" className='py-sm-4 py-2'>
                            <Button variant='grad'>Discord</Button>
                        </Col>
                        <Col sm="4" className='py-sm-4 py-2'>
                            <Button variant='grad'>Telegram</Button>
                        </Col>
                    </Row>

                    <Row className='align-items-center text-sm-start text-center'>
                        <Col sm={6}>
                            <div className='d-inline-block'>
                                <Form.Check 
                                    type={'checkbox'}
                                    id={`dnot-show`}
                                    label={`Don't show again`}
                                />
                            </div>
                        </Col>
                        <Col sm={6} className="d-none d-md-block text-end">
                            <img src={Logo} alt="image" className='img-fluid' /> 
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>

            <img src={Cartoon} onClick={handle} alt="Cartoon" className={`footer-cartoon ${Cartoonshow ? '' : 'c-hide'}`} />
            <div className="footer footer-dashboard footer-inner">
                {/* <img src={Shape1} className='footer-shape-1' alt="shape 1" /> */}
                <Container fluid="lg" className='position-relative'>
                    <div className="copyright text-center">
                        Copyright © 2022 Element
                    </div>
                </Container>
            </div>
        </>
    );
}

export default Footer;