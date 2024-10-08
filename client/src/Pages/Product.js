import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Card } from 'react-bootstrap';
import * as productAction from '../Actions/productAction';
import ErrorMessage from '../Components/Message/errorMessage';
import ProductReview from '../Components/productReview/ProductReview';
import Rating from '../Components/Rating/Rating';
import { Select, Button, FormControl, makeStyles, MenuItem } from '@material-ui/core/';
import * as productConstants from '../Constants/productConstants';
import SinglePageLoader from '../Components/Loader/SinglePageLoader';
import { addToCart } from '../Actions/cartAction';
import * as routes from '../Constants/routes';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 85,
    top: -17,
    left: 6,
    position: 'absolute',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const ProductDetails = ({ match, history }) => {
  const [qty, setQty] = useState(1);

  const productData = useSelector((state) => state.Product);
  const reviewResponses = useSelector((state) => state.createReview);

  const { error: createReviewError } = reviewResponses;

  const { loading, product, error } = productData;
  const classes = useStyles();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productAction.product(match.params.productId));
    // eslint-disable-next-line
  }, [dispatch, match]);

  const addToCartHandler = () => {
    dispatch(addToCart(match.params.productId, qty));
    history.push(routes.CART);
  };

  return (
    <>
      {createReviewError && (
        <ErrorMessage header="Opps!!!" message={createReviewError} reset={productConstants.CREATE_REVIEW_RESET} />
      )}
      <Link className="btn btn-light my-3" to={routes.HOME}>
        Retourner{' '}
      </Link>
      {loading ? (
        <SinglePageLoader />
      ) : error ? (
        <ErrorMessage header="Something went wrong" message={error} />
      ) : (
        <>
          <Row>
            <Col md={6}>
              <Image src={product.productImage} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.averageRating}
                    text={`${product.Reviews ? product.Reviews.length : 0} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Prix: {product.price} DT</ListGroup.Item>
                <ListGroup.Item>Description: {product.description}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Prix:</Col>
                      <Col>
                        <strong>{product.price + '  '} DT </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Statut:</Col>
                      <Col>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Quantité</Col>
                        <Col>
                          <FormControl className={classes.formControl}>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              onChange={(e) => setQty(e.target.value)}
                              label="Qty"
                              value={qty}
                            >
                              {[...Array(product.countInStock).keys()].map((x) => (
                                <MenuItem key={x + 1} value={x + 1}>
                                  {x + 1}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      variant="contained"
                      style={{
                        background: 'rgb(32,113,31)',
                        // eslint-disable-next-line no-dupe-keys
                        background:
                          'linear-gradient(90deg, rgba(32,113,31,1) 0%, rgba(214,255,0,1) 34%, rgba(255,35,235,1) 69%, rgba(12,15,145,1) 100%)',
                      }}
                      onClick={addToCartHandler}
                      fullWidth
                      disabled={!product.countInStock}
                    >
                      Ajouter au Panier{' '}
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <ProductReview productId={match.params.productId} />
        </>
      )}
    </>
  );
};
export default ProductDetails;
