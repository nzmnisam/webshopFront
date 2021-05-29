import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Homepage from "./Pages/Homepage/Homepage";
import "./App.css";
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="main">
          <Homepage />
        </div>
      </Router>
    </div>
  );
}

export default App;
