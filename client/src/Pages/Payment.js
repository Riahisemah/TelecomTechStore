import React, { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import FormContainer from '../Components/FormContainer/FormContainer';
import CheckoutSteps from '../Components/CheckoutStep/CheckoutSteps';
import { savePaymentMethod } from '../Actions/cartAction';
import * as routes from '../Constants/routes';
import { Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@material-ui/core/';

const PaymentMethod = ({ history }) => {
  if (!localStorage.getItem('shippingAddress')) {
    history.push({
      pathname: routes.SHIPPING,
    });
  }

  const [paymentMethod, setPaymentMethod] = useState('');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (paymentMethod === '') {
      return;
    }
    dispatch(savePaymentMethod(paymentMethod));
    history.push({
      pathname: routes.PLACE_ORDER,
    });
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Mode de Paiment </h1>
      <Form onSubmit={submitHandler}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Sélectionnez la méthode</FormLabel>
          <Row>
            <Col md="10">
              <RadioGroup
                aria-label="Mode de Paiment"
                name="paymemtMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel value="PayPal" control={<Radio color="primary" />} label="PayPal or Credit Card" />
              </RadioGroup>
            </Col>
          </Row>
        </FormControl>

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

export default PaymentMethod;
