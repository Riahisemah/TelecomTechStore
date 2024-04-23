import React from 'react';
import { Navbar, Image, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';
import SearchBox from '../SearchBox/SearchBox';
import * as routes from '../../Constants/routes';
import '../style.css';
import logoImage from '../../Assests/favicon.png';

const Header = () => {
  const userAuthData = useSelector((state) => state.userLogin);
  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;

  const { userInfo } = userAuthData;

  return (
    <header>
      <Navbar
        style={{
          background: 'rgb(32,113,31)',
          // eslint-disable-next-line no-dupe-keys
          background:
            'linear-gradient(90deg, rgba(32,113,31,1) 0%, rgba(214,255,0,1) 34%, rgba(255,35,235,1) 69%, rgba(12,15,145,1) 100%)',
        }}
        variant="dark"
        expand="lg"
        collapseOnSelect
      >
        <Container>
          <LinkContainer
            to={routes.HOME}
            style={{ marginLeft: '-50px', marginRight: '50px ', width: '100px', height: '50px' }}
          >
            <Image src={logoImage} alt="Logo" fluid />
          </LinkContainer>

          <LinkContainer to={routes.HOME}>
            <Navbar.Brand>TelecomTechStore</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <SearchBox />
            <Nav className="ml-auto">
              <LinkContainer to={routes.CART}>
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i>{' '}
                  {cartItems.length > 0 && (
                    <span className="cart">{cartItems.reduce((acc, item) => acc + item.qty, 0)}</span>
                  )}
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to={routes.PROFILE}>
                    <NavDropdown.Item>Profil</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to={routes.LOGOUT}>
                    <NavDropdown.Item>Se déconnecter</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              ) : (
                <LinkContainer to={routes.LOGIN}>
                  <Nav.Link>
                    <i className="fas fa-user"></i>Se connecter
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.role === 'admin' && (
                <NavDropdown title="Administrateur" id="adminMenu">
                  <LinkContainer to={routes.USERS}>
                    <NavDropdown.Item>Utilisateurs</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to={routes.PRODUCTS}>
                    <NavDropdown.Item>Produits</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to={routes.CATIGORYS}>
                    <NavDropdown.Item>Catégories</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to={routes.ORDERS}>
                    <NavDropdown.Item>Commandes</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
