import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
// import axios from "axios";

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

import { useSelector } from "react-redux";
import Admin from "./Pages/Admin/Admin";
import WithAdminAuth from "./hoc/withAdminAuth";
import Adminbar from "./Components/Adminbar/Adminbar";
import AdminLayout from "./Layouts/AdminLayout";
import ProizvodiAdmin from "./Pages/ProizvodiAdmin/ProizvodiAdmin";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  currentAdmin: user.currentAdmin,
});

function App(props) {
  const { currentUser, currentAdmin } = useSelector(mapState);
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
              <MainLayout>
                <CartPage />
              </MainLayout>
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
