import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//pages
import Homepage from "./Pages/Homepage/Homepage";
import Registration from "./Pages/Registration/Registration";

//layouts
import MainLayout from "./Layouts/MainLayout";

import "./App.css";
import HomepageLayout from "./Layouts/HomepageLayout";

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
            render={() => (
              <MainLayout>
                <Registration />
              </MainLayout>
            )}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
