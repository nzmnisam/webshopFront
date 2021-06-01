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

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  currentAdmin: user.currentAdmin,
});

function App(props) {
  const { currentUser, currentAdmin } = useSelector(mapState);
  return (
    <div className="App">
      <Router>
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
          path="/admin"
          render={() => (
            <WithAdminAuth>
              <MainLayout>
                <Admin />
              </MainLayout>
            </WithAdminAuth>
          )}
        />
      </Router>
    </div>
  );
}

export default App;
