import GlobalStyles from "./GlobalStyles";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import { Home, Inspect, Duel } from "./screens/screens";

function App() {
  return (
    <Router>
      <GlobalStyles />
      <Navbar />
      <Route exact path="/" render={() => <Home />} />
      <Route path="/inspect" render={() => <Inspect />} />
      <Route path="/duel" render={() => <Duel />} />
    </Router>
  );
}

export default App;
