import { Link } from "react-router"
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

function NavBar() {
    


//     return (

//         <nav className="nab-bar">
//             <ul className="nav-list">
//                 <li className="list-item" > <Link to="/">Home</Link></li>
//                 <li className="list-item"><Link to="/articles">Articles</Link></li>
//                 <li className="list-item"> <Link to='/topics'>Topics</Link></li>
//                 <li className="list-item"><Link to="/users">Users</Link></li>
//                 <li className="list-item"><Link to="/articles/search">Search Articles</Link></li>
               
//             </ul>
//         </nav>
      
//     )
// }


// export default Navbar



  return (
    <>
  
      {['xl'].map((expand) => (
        <Navbar sticky={'top'} key={expand} expand={expand} className="bg-body-tertiary mb-3">
          <Container fluid>
            <Navbar.Brand href="#" >ThoughtBubble</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Menu
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="/">Home</Nav.Link>
                  <Nav.Link href="/articles">All Articles</Nav.Link>
                  <Nav.Link href="/articles/search">Sort Articles</Nav.Link>
                  <Nav.Link href="/topics">Topics</Nav.Link>
                  <Nav.Link href="/users">Users</Nav.Link>
                </Nav>
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button sixe={'sm'} variant="outline-success">Search</Button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
   
    </>
  );
}

export default NavBar