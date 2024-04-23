import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Row, Col } from 'react-bootstrap';
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

const Login = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(userAction.auth(email, password));
  };

  const redirectUserToRegisterRoute = redirect ? routes.REGISTER + `?redirect=${redirect}` : routes.REGISTER;

  return (
    <>
      {error && <ErrorMessage header="Erreur d'authentification" message={error} reset={userConstants.RESET} />}
      <FormContainer>
        <h1>Se connecte</h1>

        <Form onSubmit={submitHandler}>
          <TextField
            variant="outlined"
            type="email"
            margin="normal"
            placeholder="ex:- Nom@gmail.com"
            required
            fullWidth
            id="email"
            label="Email adress"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            variant="outlined"
            margin="normal"
            type="password"
            placeholder="***********"
            required
            fullWidth
            name="password"
            label="Mote de passe"
            id="password"
            value={password}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
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
            disabled={loading}
          >
            {loading ? <CircularProgress color="inherit" className={classes.prgressColor} /> : <>Se connecter</>}
          </Button>
        </Form>

        <Row className="py-3">
          <Col>
            Nouveau client? <Link to={redirectUserToRegisterRoute}>Registre</Link>
          </Col>
          <Col className="text-right">
            <Link to={routes.FORGOT_PASSWORD}>Mot de passe oublié</Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};

export default Login;
