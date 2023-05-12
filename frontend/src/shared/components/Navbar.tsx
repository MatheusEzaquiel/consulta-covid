import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

interface INavbarProps {
  title: string;
  optionsList: string[];
  linksList: string[];
}

export const NavbarIndex = ({title, optionsList, linksList}: INavbarProps) => {

  const options = optionsList.map((option, index) => {

      return <Nav.Link key={option} as={Link} to={linksList[index]}>{option}</Nav.Link>;
      
  })


  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">{title}</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>

          <Nav>
              {options}
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}