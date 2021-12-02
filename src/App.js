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

function App() {
  return (
    <Router>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Switch>
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
            <NewProduct/>
          </Route>

          {/* Transactions page */}
          <Route path="/transactions">
            <Transaction/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
