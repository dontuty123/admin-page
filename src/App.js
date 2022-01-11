import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import Home from "./pages/home/Home";
import "./app.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Transaction from "./pages/transaction/Transaction";
import Login from "./pages/login/Login.jsx";
import TransactionInfo from "./pages/transactionInfo/TransactionInfo";

function App() {
  return (
    <Router>
      <Topbar />
      <Switch>
        {/* Login Page */}
        <Route path="/login">
          <Login />
        </Route>
        {
          <>
            <div className="container">
              <Sidebar />
              <Route exact path="/">
                <Home />
              </Route>

              {/* User page */}
              <Route path="/users">
                <UserList />
              </Route>
              <Route path="/user/:userId">
                <User />
              </Route>
              <Route path="/newUser">
                <NewUser />
              </Route>

              {/* Products page */}
              <Route path="/products">
                <ProductList />
              </Route>
              <Route path="/product/:productId">
                <Product />
              </Route>
              <Route path="/newproduct">
                <NewProduct />
              </Route>

              {/* Transactions page */}
              <Route path="/transactions">
                <Transaction />
              </Route>
              {/* Transactions Info page */}
              <Route path="/transaction/:orderId">
                <TransactionInfo />
              </Route>
            </div>
          </>
        }
      </Switch>
    </Router>
  );
}

export default App;
