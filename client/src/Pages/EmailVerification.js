import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from '../Components/Message/errorMessage';
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

const EmailVerification = ({ location, history }) => {
  const [verificationCode, setVerificationCode] = useState('');
  const classes = useStyles();

  const userAuthData = useSelector((state) => state.userLogin);

  const { userInfo, error, loading } = userAuthData;

  const redirect = location.search ? location.search.split('=')[1] : routes.HOME;

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [dispatch, userInfo, redirect, history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userAction.emailVerification(verificationCode));
  };

  return (
    <>
      {error && <ErrorMessage header="Auth Error" message={error} reset={userConstants.RESET} />}
      <FormContainer>
        <h1>Vérifiez votre e-mail</h1>
        <Form>
          <TextField
            variant="outlined"
            type="text"
            margin="normal"
            required
            fullWidth
            id="code"
            label="Verification Code"
            name="code"
            autoComplete="code"
            autoFocus
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
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
            {loading ? <CircularProgress color="inherit" className={classes.prgressColor} /> : <>Verify</>}
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default EmailVerification;
