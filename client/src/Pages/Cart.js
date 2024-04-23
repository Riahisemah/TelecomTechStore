import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { addToCart, removeItemFromCart } from '../Actions/cartAction';
import { Select, Button, FormControl, makeStyles, MenuItem } from '@material-ui/core/';
import { interpolate } from '../utils/string';
import * as routes from '../Constants/routes';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Cart = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const classes = useStyles();
  const dispatch = useDispatch();

  const removeFromCartHandler = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const handleCheckout = () => {
    history.push({
      pathname: routes.LOGIN,
      search: `?redirect=${routes.SHIPPING}`,
    });
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Panier</h1>
        {!cartItems.length ? (
          <>
            Votre panier est vide <Link to={routes.HOME}>Go Back</Link>
          </>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.productId}>
                <Row>
                  <Col md={2}>
                    <Image src={item.productImage} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link
                      to={interpolate(routes.PRODUCT, {
                        productId: item.productId,
                      })}
                    >
                      {item.productName}
                    </Link>
                  </Col>
                  <Col md={2}>DT : {item.price}</Col>
                  <Col md={2}>
                    <FormControl className={classes.formControl}>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Qty"
                        value={item.qty}
                        onChange={(e) => dispatch(addToCart(item.productId, Number(e.target.value)))}
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <MenuItem key={x + 1} value={x + 1}>
                            {x + 1}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Col>
                  <Col md={2}>
                    <Button type="button" variant="light" onClick={() => removeFromCartHandler(item.productId)}>
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Total ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2> DT : <span> </span>
              {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                variant="contained"
                style={{
                  background: 'rgb(32,113,31)',
                  // eslint-disable-next-line no-dupe-keys
                  background:
                    'linear-gradient(90deg, rgba(32,113,31,1) 0%, rgba(214,255,0,1) 34%, rgba(255,35,235,1) 69%, rgba(12,15,145,1) 100%)',
                }}
                onClick={handleCheckout}
                fullWidth
                disabled={!cartItems.length}
              >
                Passer à la caisse{' '}
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default Cart;
