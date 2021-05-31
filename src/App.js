import { useState } from "react";
import { setCurrentUser } from "./Redux/User/User.actions";
import { connect } from "react-redux";

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

//layouts
import MainLayout from "./Layouts/MainLayout";
import HomepageLayout from "./Layouts/HomepageLayout";

//css
import "./App.css";
import WithAuth from "./hoc/withAuth";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

function App(props) {
  const { currentUser } = props;

  return (
    <div className="App">
      <Router>
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
            render={() => (
              <MainLayout>
                <Registration api={api} />
              </MainLayout>
            )}
          />
          <Route
            path="/login"
            render={() => (
              <MainLayout>
                <Login api={api} />
              </MainLayout>
            )}
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
      </Router>
    </div>
  );
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
