import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../Components/FormContainer/FormContainer';
import * as catigoryAction from '../Actions/catigoryAction';
import * as catigoryConstants from '../Constants/catigoryConstants';
import ErrorMessage from '../Components/Message/errorMessage';
import { TextField, Button, CircularProgress, makeStyles } from '@material-ui/core/';
import { Link, Redirect } from 'react-router-dom';
import confirmationImg from '../Assests/confirmation.png';
import { confirmAlert } from 'react-confirm-alert';
import * as routes from '../Constants/routes';
import 'react-confirm-alert/src/react-confirm-alert.css';

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

const EditCatigory = ({ match }) => {
  const catigoryId = match.params.catigoryId;
  const catigoryData = useSelector((state) => state.Catigory);
  const { loading, catigory, error, success } = catigoryData;
  const updateCatigoryDetails = useSelector((state) => state.updateCatigoryDetails);
  const {
    loading: EditCatigoryLoading,
    error: EditCatigoryError,
    success: EditCatigorySuccess,
  } = updateCatigoryDetails;

  const [categoryName, setName] = useState('');
  const [Success, setSuccess] = useState(false);

  const classes = useStyles();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(catigoryAction.catigory(catigoryId));
  }, [dispatch, catigoryId]);

  useEffect(() => {
    if (success) {
      setName(catigory.categoryName);
    }
  }, [catigory.categoryName, dispatch, success]);
  const submitHandler = (e) => {
    e.preventDefault();
    const UpdateData = {
      categoryName,
    };
    dispatch(catigoryAction.EditCatigory(catigoryId, UpdateData));
  };

  const ConfirmedAlert = () => {
    if (EditCatigorySuccess) {
      return confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className="custom-ui-alert">
              <div className="success-img">
                <img src={confirmationImg} alt="confirmationImg" />
              </div>
              <h3 className="font-weight-bold text">Catigory updated successfully</h3>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={() => {
                  onClose();
                  dispatch({ type: catigoryConstants.EDIT_CATIGORY_RESET });
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
      {Success && <Redirect to={routes.CATIGORYS} />}
      {EditCatigoryError && (
        <ErrorMessage
          header="Something went wrong"
          message={EditCatigoryError}
          reset={catigoryConstants.EDIT_CATIGORY_RESET}
        />
      )}
      <Link to={routes.CATIGORYS} className="btn btn-light my-3">
        Go Back
      </Link>
      {loading ? (
        <h4>Loading...</h4>
      ) : error ? (
        <ErrorMessage header="Something went wrong" message={error} />
      ) : (
        <>
          <FormContainer>
            <h1>Edit Catigory</h1>
            <Form onSubmit={submitHandler}>
              <TextField
                variant="outlined"
                type="text"
                margin="normal"
                required
                fullWidth
                id="catigoryName"
                label="catigoryName"
                name="catigoryName"
                autoComplete="catigoryName"
                autoFocus
                value={categoryName}
                onChange={(e) => setName(e.target.value)}
              />
              <Button type="submit" variant="contained" color="primary" fullWidth disabled={EditCatigoryLoading}>
                {EditCatigoryLoading ? (
                  <CircularProgress color="inherit" className={classes.prgressColor} />
                ) : (
                  <>Update</>
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

export default EditCatigory;
