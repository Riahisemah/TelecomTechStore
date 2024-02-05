import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './Components/Header/index';
import Footer from './Components/Footer/Footer';
import Home from './Pages/Home';
import Product from './Pages/Product';
import Login from './Pages/Login';
import Cart from './Pages/Cart';
import PrivateRoute from './routes/PrivateRoute';
import AdminRoute from './routes/AdminRoute';
import Shipping from './Pages/Shipping';
import Payment from './Pages/Payment';
import Profile from './Pages/Profile';
import PlaceOrder from './Pages/PlaceOrder';
import OrderList from './Pages/OrdersList';
import ProductList from './Pages/ProductList';
import UserList from './Pages/UserList';
import EditUser from './Pages/EditUser';
import EditProduct from './Pages/EditProduct';
import Order from './Pages/Order';
import Logout from './Pages/Logout';
import Register from './Pages/Register';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';
import EmailVerification from './Pages/EmailVerification';
import * as routes from './Constants/routes';
import CatigoryList from 'Pages/CatigoryList';
import EditCatigory from 'Pages/EditCatigory';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="py-3">
        <Container>
          <Switch>
            <Route exact={true} path={routes.HOME} component={Home} />
            <Route exact={true} path={routes.PRODUCT} component={Product} />
            <Route exact={true} path={routes.LOGIN} component={Login} />
            <Route exact={true} path={routes.CART} component={Cart} />
            <Route exact={true} path={routes.FORGOT_PASSWORD} component={ForgotPassword} />
            <Route exact={true} path={routes.RESET_PASSWORD} component={ResetPassword} />
            <PrivateRoute exact={true} path={routes.SHIPPING} component={Shipping} />
            <PrivateRoute exact={true} path={routes.PAYMENT} component={Payment} />
            <PrivateRoute exact={true} path={routes.PLACE_ORDER} component={PlaceOrder} />
            <PrivateRoute exact={true} path={routes.ORDER} component={Order} />
            <PrivateRoute exact={true} path={routes.PROFILE} component={Profile} />
            <AdminRoute exact={true} path={routes.ORDERS} component={OrderList} />
            <AdminRoute exact={true} path={routes.PRODUCTS} component={ProductList} />
            <AdminRoute exact={true} path={routes.PRODUCT_EDIT} component={EditProduct} />
            <AdminRoute exact={true} path={routes.CATIGORY_EDIT} component={EditCatigory} />
            <AdminRoute exact={true} path={routes.CATIGORYS} component={CatigoryList} />
            <AdminRoute exact={true} path={routes.USERS} component={UserList} />
            <AdminRoute exact={true} path={routes.USER_EDIT} component={EditUser} />
            <Route exact={true} path={routes.REGISTER} component={Register} />
            <Route exact={true} path={routes.EMAIL_VERIFICATION} component={EmailVerification} />
            <Route exact={true} path={routes.LOGOUT} component={Logout} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
