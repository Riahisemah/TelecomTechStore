import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core/';
import ErrorMessage from '../Components/Message/errorMessage';
import Message from '../Components/InfoMessage/Message';
import Loader from '../Components/Loader/Loader';
import { getOrder, payOrder, deliverOrder } from '../Actions/orderAction';
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../Constants/orderConstants';
import { interpolate } from '../utils/string';
import * as routes from '../Constants/routes';
import OrderLoader from '../Components/Loader/OrderLoader';

const Order = ({ match }) => {
  const orderId = match.params.orderId;

  const [sdkReady, setSdkReady] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error, success } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPayMessage } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const queryParams = new URLSearchParams(window.location.search);

  const refId = queryParams.get('refId') ? queryParams.get('refId').trim() : null;

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (order && !order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
    // eslint-disable-next-line
  }, [dispatch, orderId, successPayMessage, successDeliver, order]);

  useEffect(() => {
    dispatch({ type: ORDER_PAY_RESET });
    dispatch({ type: ORDER_DELIVER_RESET });
    dispatch(getOrder(orderId, initialLoading));

    // eslint-disable-next-line
  }, [dispatch, successPayMessage, successDeliver, refId]);

  useEffect(() => {
    if (success && initialLoading) {
      setInitialLoading(false);
    }
    // eslint-disable-next-line
  }, [dispatch, success]);

  useEffect(() => {
    if (refId) {
      dispatch(payOrder(orderId));
    }
    // eslint-disable-next-line
  }, [refId]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order._id));
  };
  return loading ? (
    <OrderLoader />
  ) : error ? (
    <ErrorMessage header="Something went wrong" message={error} />
  ) : (
    <>
      {order ? (
        <>
          <h1>Commande {order._id}</h1>
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>livraison</h2>
                  <p>
                    <strong>Nom: </strong> {order.userId.name}
                  </p>
                  <p>
                    <strong>Email: </strong> <a href={`mailto:${order.userId.email}`}>{order.userId.email}</a>
                  </p>
                  <p>
                    <strong>Adress:</strong> {order.shipping.address},{order.shipping.city} {order.shipping.postalCode},{' '}
                    {order.shipping.country}
                  </p>
                  {order.isDelivered ? (
                    <Message variant="success">Délivré le {order.deliveredAt}</Message>
                  ) : (
                    <Message variant="danger">Non Délivré</Message>
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Mode de paiement</h2>
                  <p>
                    <strong>Mode: </strong>
                    {order.payment ? order.payment.paymentMethod : ''}
                  </p>
                  {order.isPaid ? (
                    <Message variant="success">Payé le {order.paidAt}</Message>
                  ) : (
                    <Message variant="danger">Non Payé</Message>
                  )}
                </ListGroup.Item>

                {order.orderItems ? (
                  <ListGroup.Item>
                    <h2>Items commandés</h2>
                    {!order.orderItems.length ? (
                      <Message>La commande est vide</Message>
                    ) : (
                      <ListGroup variant="flush">
                        {order.orderItems.map((item, index) => (
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
                                {item.qty} x DT : <span> </span>
                                {item.price} = DT : <span> </span>
                                {item.qty * item.price}
                              </Col>
                            </Row>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    )}
                  </ListGroup.Item>
                ) : (
                  ''
                )}
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
                      <Col>
                        DT : <span> </span>
                        {order.itemsPrice}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>livraison</Col>
                      <Col>
                        DT : <span> </span>
                        {order.shippingPrice}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Tax</Col>
                      <Col>
                        DT : <span> </span>
                        {order.taxPrice}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Total</Col>
                      <Col>
                        DT : <span> </span>
                        {order.totalPrice}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {order.payment && order.payment.paymentMethod === 'PayPal' && !order.isPaid && (
                    <ListGroup.Item>
                      {loadingPay && <Loader />}
                      {!sdkReady ? (
                        <Loader />
                      ) : (
                        <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />
                      )}
                    </ListGroup.Item>
                  )}
                  ////////// Edit just for test order.isPaid ////////////////////
                  {loadingDeliver && <Loader />}
                  {userInfo && userInfo.role === 'admin' && !order.isPaid && !order.isDelivered && (
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
                        onClick={deliverHandler}
                      >
                        Marquer comme livré{' '}
                      </Button>
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      ) : (
        ''
      )}
    </>
  );
};

export default Order;
