import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import axios from "axios";

//pages
import Homepage from "./Pages/Homepage/Homepage";
import Registration from "./Pages/Registration/Registration";
import Login from "./Pages/Login/Login";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Search from "./Pages/Search/Search";
import Product from "./Pages/Product/Product";
import CartPage from "./Pages/CartPage/CartPage";

//layouts
import MainLayout from "./Layouts/MainLayout";
import HomepageLayout from "./Layouts/HomepageLayout";

//css
import "./App.css";
import WithAuth from "./hoc/withAuth";

import { useSelector, useDispatch } from "react-redux";
import Admin from "./Pages/Admin/Admin";
import WithAdminAuth from "./hoc/withAdminAuth";
import Adminbar from "./Components/Adminbar/Adminbar";
import AdminLayout from "./Layouts/AdminLayout";
import ProizvodiAdmin from "./Pages/ProizvodiAdmin/ProizvodiAdmin";
import { addProductsFromLSToCart } from "./Redux/Cart/Cart.actions";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  currentAdmin: user.currentAdmin,
});

function App(props) {
  const { currentUser, currentAdmin } = useSelector(mapState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      axios
        .get(`http://127.0.0.1:8000/api/cart/user/${currentUser.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          localStorage.setItem(
            "cart",
            JSON.stringify({
              addedToCart: true,
              removedFromCart: false,
              cartProducts: response.data,
              removeAllFromCart: false,
            })
          );
          dispatch(addProductsFromLSToCart());
        })
        .catch((error) => console.log(error));
    }
    if (currentAdmin) {
      axios
        .get(`http://127.0.0.1:8000/api/cart/admin/${currentAdmin.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          localStorage.setItem(
            "cart",
            JSON.stringify({
              addedToCart: true,
              removedFromCart: false,
              cartProducts: response.data,
              removeAllFromCart: false,
            })
          );
          dispatch(addProductsFromLSToCart());
        })
        .catch((error) => console.log(error));
    }
  }, [currentUser, currentAdmin]);

  return (
    <Router>
      <div className="App">
        <Adminbar />
        <Switch>
          <Route
            path="/"
            render={() => (
              <HomepageLayout>
                <Homepage />
              </HomepageLayout>
            )}
            exact={true}
          />
          <Route
            path="/search"
            render={() => (
              <MainLayout>
                <Search />
              </MainLayout>
            )}
            exact={true}
          />
          <Route
            path="/search/:filterCategory"
            render={() => (
              <MainLayout>
                <Search />
              </MainLayout>
            )}
          />
          <Route
            path="/product/:productId"
            render={() => (
              <MainLayout>
                <Product />
              </MainLayout>
            )}
            exact={true}
          />
          <Route
            path="/cart"
            render={() => (
              <WithAuth>
                <MainLayout>
                  <CartPage />
                </MainLayout>
              </WithAuth>
            )}
            exact={true}
          />
          <Route
            path="/registration"
            render={() =>
              currentUser || currentAdmin ? (
                <Redirect to="/" />
              ) : (
                <MainLayout>
                  <Registration />
                </MainLayout>
              )
            }
          />
          <Route
            path="/login"
            render={() =>
              currentUser || currentAdmin ? (
                <Redirect to="/" />
              ) : (
                <MainLayout>
                  <Login />
                </MainLayout>
              )
            }
          />
        </Switch>
        <Route
          path="/dashboard"
          render={() => (
            <WithAuth>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </WithAuth>
          )}
        />
        <Route
          exact={true}
          path="/admin"
          render={() => (
            <WithAdminAuth>
              <AdminLayout>
                <Admin />
              </AdminLayout>
            </WithAdminAuth>
          )}
        />
        <Route
          path="/admin/proizvodi"
          render={() => (
            <WithAdminAuth>
              <AdminLayout>
                <ProizvodiAdmin />
              </AdminLayout>
            </WithAdminAuth>
          )}
        />
      </div>
    </Router>
  );
}

export default App;
