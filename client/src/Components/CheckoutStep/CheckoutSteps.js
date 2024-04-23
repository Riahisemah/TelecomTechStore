import React from 'react';
import { Nav } from 'react-bootstrap';
import * as routes from '../../Constants/routes';
import { LinkContainer } from 'react-router-bootstrap';

const CheckoutSteps = ({ step1, step2, step3 }) => {
  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item>
        {step1 ? (
          <LinkContainer to={routes.SHIPPING}>
            <Nav.Link>Expédition</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Expédition</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <LinkContainer to={routes.PAYMENT}>
            <Nav.Link>Paiement</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Paiement</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <LinkContainer to={routes.PLACE_ORDER}>
            <Nav.Link> Passer la commande</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Passer la commande</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
