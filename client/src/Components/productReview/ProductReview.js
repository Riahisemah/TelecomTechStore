import React, { useEffect, useState } from 'react';
import { Row, Col, ListGroup, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import * as productAction from '../../Actions/productAction';
import ErrorMessage from '../Message/errorMessage';
import { Link } from 'react-router-dom';
import Rating from '../Rating/Rating';
import {
  Select,
  Button,
  FormControl,
  makeStyles,
  MenuItem,
  InputLabel,
  TextField,
  CircularProgress,
} from '@material-ui/core/';

import * as productConstants from '../../Constants/productConstants';
import * as routes from '../../Constants/routes';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  prgressColor: {
    color: '#fff',
  },
}));

const ProductReview = ({ productId }) => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState('');

  const classes = useStyles();

  const productReviewsData = useSelector((state) => state.productReview);
  const reviewResponses = useSelector((state) => state.createReview);

  const { success: createReviewSuccess, loading: createReviewLoading } = reviewResponses;

  const userAuthData = useSelector((state) => state.userLogin);

  const { userInfo } = userAuthData;

  const { loading, productReviews, count, error, success } = productReviewsData;

  const dispatch = useDispatch();

  useEffect(() => {
    if (createReviewSuccess) {
      setTitle('');
      setText('');
      setRating('');
      dispatch({ type: productConstants.CREATE_REVIEW_RESET });
    }

    dispatch(productAction.productReviews(productId, initialLoading));

    // eslint-disable-next-line
  }, [dispatch, createReviewSuccess]);

  useEffect(() => {
    if (success && initialLoading) {
      setInitialLoading(false);
    }
    // eslint-disable-next-line
  }, [dispatch, success]);

  const handleCreateReview = (e) => {
    e.preventDefault();

    dispatch(productAction.createReview(productId, title, text, rating));
  };

  return loading ? (
    <p>Chargemment....</p>
  ) : error ? (
    <ErrorMessage header="Quelque chose s'est mal passé" message={error} />
  ) : (
    <>
      <Row>
        <Col md={6}>
          <h2>Commentaires({count})</h2>
          {!productReviews.length && <h4>Aucun Commentaires</h4>}
          <ListGroup variant="flush">
            {productReviews.map((review) => (
              <ListGroup.Item key={review._id}>
                <strong>{review.userId.name}</strong>

                <Rating value={review.rating} />
                <p>{review.createdAt.substring(0, 10)}</p>
                <p>{review.text}</p>
              </ListGroup.Item>
            ))}
            <ListGroup.Item>
              <h2>Écrire un avis client</h2>

              {userInfo ? (
                <Form onSubmit={handleCreateReview}>
                  <TextField
                    variant="outlined"
                    type="text"
                    margin="normal"
                    placeholder="Écrivez un titre"
                    required
                    fullWidth
                    id="title"
                    label="Écrivez un titre"
                    name="title"
                    autoComplete="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <TextField
                    variant="outlined"
                    type="text"
                    margin="normal"
                    placeholder="Ecrivez un Commentaires"
                    required
                    fullWidth
                    id="comment"
                    label="Écrivez un Commentaires"
                    name="comment"
                    autoComplete="comment"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />

                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Evaluation</InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      onChange={(e) => setRating(Number(e.target.value))}
                      label="Rating"
                      autoWidth
                      value={rating}
                    >
                      <MenuItem value="">
                        <em>Aucun</em>
                      </MenuItem>
                      <MenuItem value="1">1 - Pauvre</MenuItem>
                      <MenuItem value="2">2 - Équitable</MenuItem>
                      <MenuItem value="3">3 - Bien</MenuItem>
                      <MenuItem value="4">4 - Tres Bien</MenuItem>
                      <MenuItem value="5">5 - Excellent</MenuItem>
                    </Select>
                  </FormControl>
                  <div className="my-3">
                    <Button
                      variant="contained"
                      style={{
                        background: 'rgb(32,113,31)',
                        // eslint-disable-next-line no-dupe-keys
                        background:
                          'linear-gradient(90deg, rgba(32,113,31,1) 0%, rgba(214,255,0,1) 34%, rgba(255,35,235,1) 69%, rgba(12,15,145,1) 100%)',
                      }}
                      type="submit"
                      disabled={createReviewLoading}
                    >
                      {createReviewLoading ? (
                        <CircularProgress color="inherit" className={classes.prgressColor} />
                      ) : (
                        <>Submit</>
                      )}
                    </Button>
                  </div>
                </Form>
              ) : (
                <>
                  S'il te plaît <Link to={routes.LOGIN}>Se connecter</Link> Pour Ecrivez un Commentaire{' '}
                </>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default ProductReview;
