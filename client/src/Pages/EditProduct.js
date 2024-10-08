import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../Components/FormContainer/FormContainer';
import * as productAction from '../Actions/productAction';
import * as productConstants from '../Constants/productConstants';
import ErrorMessage from '../Components/Message/errorMessage';
import {
  TextField,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  makeStyles,
} from '@material-ui/core/';
import { Link, Redirect } from 'react-router-dom';
import confirmationImg from '../Assests/confirmation.png';
import { confirmAlert } from 'react-confirm-alert';
import * as routes from '../Constants/routes';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { catigoryListForAdmin } from '../Actions/catigoryAction';

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
  prgressColor: {
    color: '#fff',
  },
}));

const EditProduct = ({ match }) => {
  const productId = match.params.productId;
  const productData = useSelector((state) => state.Product);
  const { loading, product, error, success } = productData;
  console.log(product);

  const catigoryList = useSelector((state) => state.catigoryList);
  const { success: categorySuccess, catigorys } = catigoryList;
  console.log('catigory  ' + catigorys);

  const updateProductDetails = useSelector((state) => state.updateProductDetails);
  const { loading: EditProductLoading, error: EditProductError, success: EditProductSuccess } = updateProductDetails;

  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [productImageFile, setProductImageFile] = useState(null);

  const [Success, setSuccess] = useState(false);

  const classes = useStyles();

  const dispatch = useDispatch();
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    dispatch(productAction.product(productId));

    // eslint-disable-next-line
  }, [dispatch, productId]);

  useEffect(() => {
    if (success) {
      setName(product.name);
      setPrice(product.price);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
      setProductImageFile(product.productImage);
    }

    // eslint-disable-next-line
  }, [dispatch, success]);

  useEffect(() => {
    if (categorySuccess && initialLoading) {
      setInitialLoading(false);
    }
    dispatch(catigoryListForAdmin(initialLoading));

    // eslint-disable-next-line
  }, [dispatch, categorySuccess]);

  const submitHandler = (e) => {
    e.preventDefault();

    const form = new FormData();

    form.append('name', name);
    form.append('productImage', productImageFile);
    form.append('brand', brand);
    form.append('price', price);
    form.append('category', category);
    form.append('countInStock', countInStock);
    form.append('description', description);

    dispatch(productAction.EditProduct(productId, form));
  };

  const ConfirmedAlert = () => {
    if (EditProductSuccess) {
      return confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className="custom-ui-alert">
              <div className="success-img">
                <img src={confirmationImg} alt="confirmationImg" />
              </div>
              <h3 className="font-weight-bold text">Produit mise à jour avec succès</h3>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={() => {
                  onClose();
                  dispatch({ type: productConstants.EDIT_PRODUCT_RESET });
                  setSuccess(true);
                }}
              >
                OK
              </Button>
            </div>
          );
        },
      });
    }
  };
  return (
    <>
      {Success && <Redirect to={routes.PRODUCTS} />}
      {EditProductError && (
        <ErrorMessage
          header="Something went wrong"
          message={EditProductError}
          reset={productConstants.EDIT_PRODUCT_RESET}
        />
      )}
      <Link to={routes.PRODUCTS} className="btn btn-light my-3">
        Retourner{' '}
      </Link>
      {loading ? (
        <h4>Chargemment...</h4>
      ) : error ? (
        <ErrorMessage header="Something went wrong" message={error} />
      ) : (
        <>
          <FormContainer>
            <h1>Mise a jour Produit </h1>
            <Form onSubmit={submitHandler}>
              <TextField
                variant="outlined"
                type="text"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Nome"
                name="name"
                autoComplete="name"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <TextField
                variant="outlined"
                type="text"
                margin="normal"
                required
                fullWidth
                id="brand"
                label="Marque"
                name="brand"
                autoComplete="brand"
                autoFocus
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />

              <TextField
                variant="outlined"
                type="number"
                margin="normal"
                required
                fullWidth
                id="price"
                label="Prix"
                name="price"
                autoComplete="price"
                autoFocus
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
              <TextField
                variant="outlined"
                type="number"
                margin="normal"
                required
                fullWidth
                id="countInStock"
                label="Quantite En Stock"
                name="countInStock"
                autoComplete="countInStock"
                autoFocus
                value={countInStock}
                onChange={(e) => setCountInStock(Number(e.target.value))}
              />
              <input type="file" onChange={(e) => setProductImageFile(e.target.files[0])} />

              <TextField
                variant="outlined"
                type="text"
                margin="normal"
                required
                fullWidth
                id="description"
                label="Description"
                name="description"
                autoComplete="description"
                autoFocus
                value={description}
                multiline
                rows={5}
                onChange={(e) => setDescription(e.target.value)}
              />
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Catégorie</InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  onChange={(e) => setCategory(e.target.value)}
                  label="Category"
                  value={category}
                >
                  <MenuItem value="">
                    <em>Aucune</em>
                  </MenuItem>
                  {catigorys &&
                    catigorys.map((catigory) => (
                      <MenuItem key={catigory._id} value={catigory.categoryName}>
                        {catigory.categoryName}
                      </MenuItem>
                    ))}
                </Select>
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
                disabled={EditProductLoading}
              >
                {EditProductLoading ? (
                  <CircularProgress color="inherit" className={classes.prgressColor} />
                ) : (
                  <>Mise a jour</>
                )}
              </Button>
            </Form>
          </FormContainer>
          {ConfirmedAlert()}
        </>
      )}
    </>
  );
};

export default EditProduct;
