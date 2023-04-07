import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useLocation } from "react-router-dom";
import TitleContext from '../../contexts/TitleContext';

function MainNavbar(){
  let { pathname } = useLocation();
  const { title } = useContext(TitleContext)
  // use useLocation to get the path name, like /docs or /examples
  // then set the activeKey in Nav to the result of useLocation() so we can highlight 
  // the Nav.Link with href pathname which corresponds with current url path
    return (
        <>
          <Navbar expand="sm" bg="dark" variant="dark">
            <Container>
              <Navbar.Brand href="/" >
                <b>{title}</b>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto" activeKey={pathname}>
                <Nav.Link href="/docs">Docs</Nav.Link>
                <Nav.Link href="/examples">Examples</Nav.Link>
                <Nav.Link href="/playground">Playground</Nav.Link>
            </Nav>
            </Navbar.Collapse>
            </Container>
          </Navbar>
        </>
    )
}

export default MainNavbar;