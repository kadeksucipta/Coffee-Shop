import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import store from "./App/store"
import Home from './Home/Home';
import Login from './Login/Login';
import Register from './Register/Register';
import Profile from './Profile/Profile';
import Logout from './Logout/Logout';
import Alamat from './Alamat/Alamat';
import Tambahalamat from './Tambahalamat/Tambahalamat';
import Pemesanan from './Pemesanan/Pemesanan';
import Cart from './Cart/Cart';
import Checkout from './Checkout/Checkout';
import Confirm from './Confirm/Confirm';
import Invoice from './Invoice/Invoice';
import Gallery from './Gallery/Gallery';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "Home",
    element: <Home/>
  },
  {
    path: "Login",
    element: <Login/>
  },
  {
    path: "Register",
    element: <Register/>
  },
  {
    path: "Profile",
    element: <Profile/>
  },
  {
    path: "Logout",
    element: <Logout/>
  },
  {
    path: "Alamat",
    element: <Alamat/>
  },
  {
    path: "Tambahalamat",
    element: <Tambahalamat/>
  },
  {
    path: "Pemesanan",
    element: <Pemesanan/>
  },
  {
    path: "Cart",
    element: <Cart/>
  },
  {
    path: "Checkout",
    element: <Checkout/>
  },
  {
    path: "Confirm",
    element: <Confirm/>
  },
  {
    path: "Invoice",
    element: <Invoice/>
  },
  {
    path: "Gallery",
    element: <Gallery/>
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
