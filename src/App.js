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

//layouts
import MainLayout from "./Layouts/MainLayout";
import HomepageLayout from "./Layouts/HomepageLayout";

//css
import "./App.css";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

function App() {
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
            render={() =>
              localStorage.getItem("user") ? (
                <Redirect to="/" />
              ) : (
                <MainLayout>
                  <Registration api={api} />
                </MainLayout>
              )
            }
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
      </Router>
    </div>
  );
}

export default App;
