import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col, Modal, Form, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from '../Components/Message/errorMessage';
import SuccessMessage from '../Components/Message/successMessage';
import TableLoader from '../Components/Loader/TableLoader';
import { Button as MaterialButton, TextField, CircularProgress, makeStyles } from '@material-ui/core/';
import { catigoryListForAdmin, deleteCatigory, createCatigory } from '../Actions/catigoryAction';
import * as routes from '../Constants/routes';
import { interpolate } from '../utils/string';
import * as catigoryConstants from '../Constants/catigoryConstants';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

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

const CatigoryList = () => {
  const dispatch = useDispatch();

  const catigoryList = useSelector((state) => state.catigoryList);
  const { loading, catigorys, count, error, success } = catigoryList || {};
  console.log(catigorys);

  const deleteCatigoryData = useSelector((state) => state.deleteCatigory);
  const { success: deleteSuccess, error: deleteFail } = deleteCatigoryData || {};

  const createCatigoryDetails = useSelector((state) => state.createCatigoryDetails);
  const { success: createSuccess, error: createFail, loading: createLoading } = createCatigoryDetails || {};
  const classes = useStyles();

  const [name, setName] = useState('');

  const [openForm, setOpenForm] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    if (createSuccess) {
      setOpenForm(false);
      setName('');
      dispatch({ type: catigoryConstants.CREATE_CATIGORY_RESET });
    }

    dispatch(catigoryListForAdmin(initialLoading));

    // eslint-disable-next-line
  }, [dispatch, deleteSuccess, createSuccess]);

  useEffect(() => {
    if (success && initialLoading) {
      setInitialLoading(false);
    }
    // eslint-disable-next-line
  }, [dispatch, success]);

  const cancelCreateCatigory = () => {
    setOpenForm(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (name === '') {
      return;
    }

    const form = new FormData();

    form.append('categoryName', name);

    dispatch(createCatigory(form));
  };

  const openNewCatigoryForm = () => {
    if (openForm) {
      return (
        <>
          <Modal show={openForm} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header>
              <Modal.Title id="contained-modal-title-vcenter">Add Catigory</Modal.Title>
            </Modal.Header>
            {createFail && (
              <ErrorMessage
                header="Something went wrong"
                message={createFail}
                reset={catigoryConstants.CREATE_CATIGORY_RESET}
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
                        label="Name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                <MaterialButton variant="contained" color="primary" onClick={cancelCreateCatigory}>
                  Close
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
            <p>You want to delete this Pet?</p>
            <MaterialButton
              variant="contained"
              color="primary"
              onClick={() => {
                dispatch(deleteCatigory(id));
                onClose();
              }}
            >
              Yes, Delete it !
            </MaterialButton>
            <MaterialButton variant="contained" color="primary" onClick={onClose}>
              No
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
          message="Catigory Deleted Successfully"
          reset={catigoryConstants.DELETE_CATIGORY_RESET}
        />
      )}
      {deleteFail && (
        <ErrorMessage
          header="Something went wrong"
          message={deleteFail}
          reset={catigoryConstants.DELETE_CATIGORY_RESET}
        />
      )}
      <Row>
        <Col>
          <h1>Catigory({count})</h1>
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
            <i className="fas fa-plus mr-2"></i> Add Catigory
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
                <th>NOM</th>
              </tr>
            </thead>
            <tbody>
              {catigorys &&
                catigorys.map((catigory) => (
                  <tr key={catigory._id}>
                    <td>{catigory._id}</td>
                    <td>{catigory.categoryName}</td>

                    <td>
                      <LinkContainer
                        to={interpolate(routes.CATIGORY_EDIT, {
                          catigoryId: catigory._id,
                        })}
                      >
                        <Button variant="light" className="btn-sm">
                          <i className="fas fa-edit"></i>
                        </Button>
                      </LinkContainer>
                      <Button variant="danger" className="btn-sm" onClick={(e) => deleteHandler(catigory._id, e)}>
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </>
      )}
      {openNewCatigoryForm()}
    </>
  );
};

export default CatigoryList;
