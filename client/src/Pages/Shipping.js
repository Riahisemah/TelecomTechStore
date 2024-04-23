import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../Components/FormContainer/FormContainer';
import CheckoutSteps from '../Components/CheckoutStep/CheckoutSteps';
import { saveShippingAddress } from '../Actions/cartAction';
import * as routes from '../Constants/routes';
import { TextField, Button } from '@material-ui/core/';

const Shipping = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, cartItems } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  if (!cartItems.length) {
    history.push({
      pathname: routes.HOME,
    });
  }

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push({
      pathname: routes.PAYMENT,
    });
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 />
      <h1>livraison</h1>
      <Form onSubmit={submitHandler}>
        <TextField
          variant="outlined"
          type="text"
          margin="normal"
          required
          fullWidth
          id="adress"
          label="Entez Adress"
          name="address"
          autoComplete="address"
          autoFocus
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <TextField
          variant="outlined"
          type="text"
          margin="normal"
          required
          fullWidth
          id="city"
          label="Entrez la ville"
          name="city"
          autoComplete="city"
          autoFocus
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <TextField
          variant="outlined"
          type="text"
          margin="normal"
          required
          fullWidth
          id="postal code"
          label="Entrez le code postal"
          name="postal code"
          autoComplete="postal code"
          autoFocus
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
        />

        <TextField
          variant="outlined"
          type="text"
          margin="normal"
          required
          fullWidth
          id="country"
          label="Entrez le pays"
          name="country"
          autoComplete="country"
          autoFocus
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />

        <Button
          type="submit"
          variant="contained"
          style={{
            background: 'rgb(32,113,31)',
            // eslint-disable-next-line no-dupe-keys
            background:
              'linear-gradient(90deg, rgba(32,113,31,1) 0%, rgba(214,255,0,1) 34%, rgba(255,35,235,1) 69%, rgba(12,15,145,1) 100%)',
          }}
          fullWidth
        >
          Continuer
        </Button>
      </Form>
    </FormContainer>
  );
};

export default Shipping;
