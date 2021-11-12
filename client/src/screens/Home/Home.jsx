import "./Home.css";
import { Link } from "react-router-dom";
import { ButtonGroup, Button } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import DeveloperModeIcon from "@mui/icons-material/DeveloperMode";

export const Home = () => {
  return (
    <div className="Home">
      <h1>Welcome to Dev-Duel!</h1>
      <ButtonGroup
        className="ButtonGroup"
        variant="text"
        aria-label="text button group"
      >
        <Button
          component={Link}
          to="/inspect"
          size="large"
          startIcon={<GitHubIcon />}
        >
          Inspect
        </Button>

        <Button
          component={Link}
          to="/duel"
          size="large"
          startIcon={<DeveloperModeIcon />}
        >
          Duel
        </Button>
      </ButtonGroup>
      <div className="gifContainer">
        <img
          id="gitHubGif"
          src="https://media.giphy.com/media/du3J3cXyzhj75IOgvA/source.gif"
          alt="github gif"
        />
      </div>
    </div>
  );
};
