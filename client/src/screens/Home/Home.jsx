import { Link } from "react-router-dom";
import { ButtonGroup, Button } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import DeveloperModeIcon from "@mui/icons-material/DeveloperMode";
import { HomeContainer, Welcome } from "./Home.styles";

export const Home = () => {
  return (
    <HomeContainer>
      <Welcome>Welcome to Dev-Duel!</Welcome>
      <ButtonGroup
        sx={{ marginTop: 2 }}
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
    </HomeContainer>
  );
};
