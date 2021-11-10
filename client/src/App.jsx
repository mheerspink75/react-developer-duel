import GlobalStyles from "./GlobalStyles";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import { Home, Inspect, Duel } from "./screens/screens";
import { inspectUser, duelUsers } from "./services/userService";
import { useEffect } from "react";

function App() {
  // Hook that runs after React has updated the DOM
  useEffect(() => {
    inspectUser();
  }, []);

  return (
    <Router>
      <GlobalStyles />
      <Navbar />
      <Route exact path="/" render={() => <Home />} />
      <Route exact path="/inspect" render={() => <Inspect />} />
      <Route exact path="/duel" render={() => <Duel />} />
    </Router>
  );
}

export default App;
