import "./Home.css";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="Home" id="home">
      <h1>Welcome to Dev-Duel</h1>
      <div id="linkGroup">
        <Link id="link" to="/inspect">
          Inspect
        </Link>
        {"  |  "}
        <Link id="link" to="/duel">
          Duel
        </Link>
      </div>
    </div>
  );
};
