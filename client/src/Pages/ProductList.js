import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col, Modal, Form, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from '../Components/Message/errorMessage';
import SuccessMessage from '../Components/Message/successMessage';
import TableLoader from '../Components/Loader/TableLoader';
import {
  Button as MaterialButton,
  TextField,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  makeStyles,
} from '@material-ui/core/';
import { productListForAdmin, deleteProduct, createProduct } from '../Actions/productAction';
import * as routes from '../Constants/routes';
import { interpolate } from '../utils/string';
import * as productConstants from '../Constants/productConstants';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { catigoryListForAdmin } from '../Actions/catigoryAction';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 330,
    top: 6,
    left: -4,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  prgressColor: {
    color: '#fff',
  },
}));

const ProductList = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, products, count, error, success } = productList;

  const catigoryList = useSelector((state) => state.catigoryList);
  const { success: categorySuccess, catigorys } = catigoryList;
  console.log('catigory  ' + catigorys);

  const deleteProductData = useSelector((state) => state.deleteProduct);
  const { success: deleteSuccess, error: deleteFail } = deleteProductData;

  const createProductDetails = useSelector((state) => state.createProductDetails);
  const { success: createSuccess, error: createFail, loading: createLoading } = createProductDetails;
  console.log(products);
  const classes = useStyles();

  const [name, setName] = useState('');
  const [productImage, setProductImage] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [openForm, setOpenForm] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  useEffect(() => {
    if (createSuccess) {
      setOpenForm(false);
      setName('');
      setProductImage('');
      setBrand('');
      setPrice('');
      setCategory('');
      setCountInStock('');
      setDescription('');

      dispatch({ type: productConstants.CREATE_PRODUCT_RESET });
    }

    dispatch(productListForAdmin(initialLoading));

    // eslint-disable-next-line
  }, [dispatch, deleteSuccess, createSuccess]);

  useEffect(() => {
    if (categorySuccess && initialLoading) {
      setInitialLoading(false);
    }
    dispatch(catigoryListForAdmin(initialLoading));

    // eslint-disable-next-line
  }, [dispatch, categorySuccess]);

  useEffect(() => {
    if (success && initialLoading) {
      setInitialLoading(false);
    }
    // eslint-disable-next-line
  }, [dispatch, success]);

  const cancelCreateProduct = () => {
    setOpenForm(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      name === '' ||
      category === '' ||
      productImage === '' ||
      description === '' ||
      brand === '' ||
      price === '' ||
      countInStock === ''
    ) {
      return;
    }

    const form = new FormData();

    form.append('name', name);
    form.append('productImage', productImage);
    form.append('brand', brand);
    form.append('price', price);
    form.append('category', category);
    form.append('countInStock', countInStock);
    form.append('description', description);

    dispatch(createProduct(form));
  };

  const openNewProductForm = () => {
    if (openForm) {
      return (
        <>
          <Modal show={openForm} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header>
              <Modal.Title id="contained-modal-title-vcenter">Add Product</Modal.Title>
            </Modal.Header>
            {createFail && (
              <ErrorMessage
                header="Something went wrong"
                message={createFail}
                reset={productConstants.CREATE_PRODUCT_RESET}
              />
            )}
            <Form onSubmit={submitHandler}>
              <Modal.Body className="show-grid">
                <Container>
                  <Row>
                    <Col xs={12} md={6}>
                      <TextField
                        variant="outlined"
                        type="text"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Nom"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Col>
                    <Col xs={12} md={6}>
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
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={12} md={6}>
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
                    </Col>
                    <Col xs={12} md={6}>
                      <TextField
                        variant="outlined"
                        type="number"
                        margin="normal"
                        required
                        fullWidth
                        id="countInStock"
                        label="Quantite en Stock"
                        name="countInStock"
                        autoComplete="countInStock"
                        autoFocus
                        value={countInStock}
                        onChange={(e) => setCountInStock(Number(e.target.value))}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={12} md={6}>
                      <TextField
                        variant="outlined"
                        type="file"
                        margin="normal"
                        required
                        fullWidth
                        id="file"
                        name="file"
                        autoComplete="file"
                        autoFocus
                        onChange={(e) => setProductImage(e.target.files[0])}
                      />
                    </Col>
                    <Col xs={12} md={6}>
                      <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Catégorie</InputLabel>
                        <Select
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          onChange={(e) => setCategory(e.target.value)}
                          label="Category"
                          value={category}
                        >
                          {catigorys &&
                            catigorys.map((catigory) => (
                              <MenuItem key={catigory._id} value={catigory.categoryName}>
                                {catigory.categoryName}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} md={12}>
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
                    </Col>
                  </Row>
                </Container>
              </Modal.Body>
              <Modal.Footer>
                <MaterialButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  className="mr-2"
                  disabled={createLoading}
                >
                  {createLoading ? <CircularProgress color="inherit" className={classes.prgressColor} /> : <>Submit</>}
                </MaterialButton>{' '}
                <MaterialButton variant="contained" color="primary" onClick={cancelCreateProduct}>
                  Fermer
                </MaterialButton>
              </Modal.Footer>
            </Form>
          </Modal>
        </>
      );
    }
  };

  const deleteHandler = (id, e) => {
    e.preventDefault();
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1 className="font-weight-bold text-white">Are you sure?</h1>
            <p>Vous souhaitez supprimer cet Produit?</p>
            <MaterialButton
              variant="contained"
              color="primary"
              onClick={() => {
                dispatch(deleteProduct(id));
                onClose();
              }}
            >
              oui,SUPPRIMER !
            </MaterialButton>
            <MaterialButton variant="contained" color="primary" onClick={onClose}>
              Non
            </MaterialButton>
          </div>
        );
      },
    });
  };

  return (
    <>
      {deleteSuccess && (
        <SuccessMessage
          header="Done"
          message="Produit supprimé avec succès"
          reset={productConstants.DELETE_PRODUCT_RESET}
        />
      )}
      {deleteFail && (
        <ErrorMessage
          header="Quelque chose s'est mal passé"
          message={deleteFail}
          reset={productConstants.DELETE_PRODUCT_RESET}
        />
      )}
      <Row>
        <Col>
          <h1>Produit({count})</h1>
        </Col>
        <Col className="text-right">
          <MaterialButton
            variant="contained"
            style={{
              background: 'rgb(32,113,31)',
              // eslint-disable-next-line no-dupe-keys
              background:
                'linear-gradient(90deg, rgba(32,113,31,1) 0%, rgba(214,255,0,1) 34%, rgba(255,35,235,1) 69%, rgba(12,15,145,1) 100%)',
            }}
            onClick={() => setOpenForm(true)}
          >
            <i className="fas fa-plus mr-2"></i> Ajouter Produit
          </MaterialButton>
        </Col>
      </Row>
      {loading ? (
        <TableLoader />
      ) : error ? (
        <ErrorMessage header="Something went wrong" message={error} />
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NOME</th>
                <th>PRIX</th>
                <th>CATEGORIE</th>
                <th>MARQUE</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>DT :{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer
                      to={interpolate(routes.PRODUCT_EDIT, {
                        productId: product._id,
                      })}
                    >
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button variant="danger" className="btn-sm" onClick={(e) => deleteHandler(product._id, e)}>
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
      {openNewProductForm()}
    </>
  );
};

export default ProductList;
