import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from '../Components/Message/errorMessage';
import SuccessMessage from '../Components/Message/successMessage';
import FormContainer from '../Components/FormContainer/FormContainer';
import { TextField, Button, CircularProgress, makeStyles } from '@material-ui/core/';
import * as userAction from '../Actions/userAction';
import * as userConstants from '../Constants/userConstants';

const useStyles = makeStyles((theme) => ({
  prgressColor: {
    color: '#fff',
  },
}));

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const classes = useStyles();

  const forgotPasswordDetails = useSelector((state) => state.forgotPasswordDetails);

  const { loading, error, message, success } = forgotPasswordDetails;

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userAction.forgotPassword({ email }));
  };

  return (
    <>
      {error && <ErrorMessage header="Auth Error" message={error} reset={userConstants.FORGOT_PASSWORD_SEND_RSET} />}
      {success && <SuccessMessage header="Done" message={message} reset={userConstants.FORGOT_PASSWORD_SEND_RSET} />}
      <FormContainer>
        <h1>Mot de passe oublié</h1>
        <Form>
          <TextField
            variant="outlined"
            type="email"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Your Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            {loading ? <CircularProgress color="inherit" className={classes.prgressColor} /> : <>Send Request</>}
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ForgotPassword;
