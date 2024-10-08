import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from '../Components/Message/errorMessage';
import CheckoutSteps from '../Components/CheckoutStep/CheckoutSteps';
import { createOrder } from '../Actions/orderAction';
import * as routes from '../Constants/routes';
import { interpolate } from '../utils/string';
import * as orderConstants from '../Constants/orderConstants';
import { Button, CircularProgress, makeStyles } from '@material-ui/core/';

const useStyles = makeStyles((theme) => ({
  prgressColor: {
    color: '#fff',
  },
}));

const PlaceOrder = ({ history }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const cart = useSelector((state) => state.cart);

  const redirectUser = !localStorage.getItem('shippingAddress')
    ? routes.SHIPPING
    : !localStorage.getItem('paymentMethod')
    ? routes.PAYMENT
    : null;

  if (redirectUser) {
    history.push(redirectUser);
  }

  //   Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2);

  const orderCreate = useSelector((state) => state.createOrder);
  const { order, success, error, loading } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push({
        pathname: interpolate(routes.ORDER, { orderId: order._id }),
      });
    }
    // eslint-disable-next-line
  }, [history, success]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shipping: cart.shippingAddress,
        payment: {
          paymentMethod: cart.paymentMethod,
        },
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <>
      {error && <ErrorMessage header="Create Order Error" message={error} reset={orderConstants.CREATE_ORDER_RESET} />}
      <CheckoutSteps step1 step2 step3 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>livraison</h2>
              <p>
                <strong>Address:</strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city} {cart.shippingAddress.postalCode},{' '}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Mode de paiement</h2>
              <strong>Mode: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Items Commandes</h2>
              {!cart.cartItems.length ? (
                <>Votre panier est vide</>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.productImage} alt={item.productName} fluid rounded />
                        </Col>
                        <Col>
                          <Link
                            to={interpolate(routes.PRODUCT, {
                              productId: item.productId,
                            })}
                          >
                            {item.productName}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Récapitulatif de la commande</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>livraison</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
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
                  disabled={!cart.cartItems || loading}
                  onClick={placeOrderHandler}
                >
                  {loading ? <CircularProgress color="inherit" className={classes.prgressColor} /> : <>Place Order</>}
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrder;
