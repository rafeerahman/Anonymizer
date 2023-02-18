import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function MainNavbar(){
    return (
        <>
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand href="/" >UofT-Anonymize</Navbar.Brand>
              <Nav>
                <Nav.Link href="/docs">Docs</Nav.Link>
                <Nav.Link href="/examples">Examples</Nav.Link>
                <Nav.Link href="/playground">Playground</Nav.Link>
            </Nav>
            </Container>
          </Navbar>
        </>
    )
}

export default MainNavbar;