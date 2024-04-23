import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from '../Components/Message/errorMessage';
import SuccessMessage from '../Components/Message/successMessage';
import FormContainer from '../Components/FormContainer/FormContainer';
import { TextField, Button, CircularProgress, makeStyles } from '@material-ui/core/';
import * as routes from '../Constants/routes';
import * as userAction from '../Actions/userAction';
import * as userConstants from '../Constants/userConstants';

const useStyles = makeStyles((theme) => ({
  prgressColor: {
    color: '#fff',
  },
}));

const ForgotPassword = ({ history }) => {
  const [newPassword, setNewPassword] = useState('');
  const [token, setToken] = useState('');
  const classes = useStyles();

  const resetPasswordDetails = useSelector((state) => state.resetPasswordDetails);

  const { loading, error, message, success } = resetPasswordDetails;

  const dispatch = useDispatch();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);

    const token = queryParams.get('token') ? queryParams.get('token').trim() : null;

    if (token) {
      setToken(token);
    } else {
      history.push({
        pathname: routes.LOGIN,
      });
    }
  }, [dispatch, token, history]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        history.push({
          pathname: routes.LOGIN,
        });
      }, 3000);
    }
  }, [dispatch, success, history]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const resetPassworData = {
      newPassword,
      token,
    };
    dispatch(userAction.resetPassword(resetPassworData));
  };

  return (
    <>
      {error && <ErrorMessage header="Auth Error" message={error} reset={userConstants.FORGOT_PASSWORD_SEND_RSET} />}
      {success && <SuccessMessage header="Done" message={message} reset={userConstants.FORGOT_PASSWORD_SEND_RSET} />}
      <FormContainer>
        <h1>Reset Password</h1>
        <Form>
          <TextField
            variant="outlined"
            type="password"
            margin="normal"
            required
            fullWidth
            id="password"
            label="nouveau Mot de Passe"
            name="password"
            autoComplete="password"
            autoFocus
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
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
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <CircularProgress color="inherit" className={classes.prgressColor} /> : <>Réinitialiser</>}
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ForgotPassword;
