import { Button, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from '../../../assets/images/cbdc/Logo.svg'

function Header() {
    return ( 
        <div className="cbdc-header d-flex align-items-center justify-content-center base-bg">
            <Container className="d-flex align-items-center">
                <Link className="cbdc-header-logo" to="/">
                    <img src={Logo} alt="Logo" className="img-fluid" />
                </Link>

                <div className="d-flex align-items-center ms-auto">
                    <div className="cbdc-switch me-3">
                        <Form.Check 
                            className="p-0"
                            type="switch"
                            id="custom-switch"
                        />
                    </div>

                    <Button>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="me-2 ms-0" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M6 3.5A1.5 1.5 0 0 1 7.5 2h1A1.5 1.5 0 0 1 10 3.5v1A1.5 1.5 0 0 1 8.5 6v1H14a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 2 7h5.5V6A1.5 1.5 0 0 1 6 4.5v-1zm-6 8A1.5 1.5 0 0 1 1.5 10h1A1.5 1.5 0 0 1 4 11.5v1A1.5 1.5 0 0 1 2.5 14h-1A1.5 1.5 0 0 1 0 12.5v-1zm6 0A1.5 1.5 0 0 1 7.5 10h1a1.5 1.5 0 0 1 1.5 1.5v1A1.5 1.5 0 0 1 8.5 14h-1A1.5 1.5 0 0 1 6 12.5v-1zm6 0a1.5 1.5 0 0 1 1.5-1.5h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5v-1z"/>
                        </svg>
                        Algorand Network
                    </Button>
                </div>
            </Container>
        </div>
     );
}

export default Header;