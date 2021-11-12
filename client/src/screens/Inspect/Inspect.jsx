import "./Inspect.css";
import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
  List,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

export const Inspect = () => {
  const inspectUserUrl = "http://localhost:3000/api/user/";
  const [userName, setUserName] = useState("mheerspink75");
  const [profile, setProfile] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const inspectUser = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      let response = await fetch(inspectUserUrl + userName);
      if (response.ok) {
        let data = await response.json();
        setIsLoading(false);
        setProfile(data);
      } else {
        setIsLoading(false);
        throw new Error("NETWORK RESPONSE ERROR");
      }
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      console.log("FETCH ERROR:", error);
    }
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    inspectUser();
  };

  useEffect(() => {
    inspectUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="inspect">
      <div className="Form">
        <FormControl>
          <FormLabel>Inspect Dev:</FormLabel>
          <TextField
            id="outlined-search"
            size="small"
            type="search"
            placeholder="username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />

          <FormHelperText id="my-helper-text">
            Enter username and click submit...
          </FormHelperText>
          <Button
            type="submit"
            variant="outlined"
            size="small"
            value="Submit"
            onClick={HandleSubmit}
          >
            Submit
          </Button>
        </FormControl>
      </div>

      {isLoading ? (
        <div className="loadingContainer">
          <CircularProgress />
          <p>Loading...</p>
        </div>
      ) : (
        <div className="dataContainer">
          {isError ? (
            <Alert severity="error">
              This is an error alert — check it out!
            </Alert>
          ) : (
            profile && (
              <div className="Profile">
                <Card sx={{ maxWidth: 500 }}>
                  <CardActionArea>
                    <Typography variant="h5" color="text.secondary">
                      <GitHubIcon /> {profile["username"]}
                    </Typography>
                    <CardMedia
                      component="img"
                      height="200"
                      image={profile["avatar-url"]}
                      alt="profile pic"
                      onClick={(event) =>
                        (window.location.href ="https://github.com/" + profile["username"])
                      }
                    />
                  </CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {profile["name"]}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      {profile["location"] === null ? "" : profile["location"]}
                    </Typography>

                    <Typography variant="caption" color="text.secondary">
                      {profile["bio"] !== "" || null ? profile["bio"] : ""}
                    </Typography>
      
                    <Typography variant="h6">
                      <List className="userList">
                        <li>titles: {profile["titles"]}</li>
                        <li>fav language: {profile["favorite-language"]}</li>
                        <li>total stars:{profile["total-stars"]}</li>
                        <li>
                          highest star count: {profile["highest-starred"]}
                        </li>
                        <li>public repos: {profile["public-repos"]}</li>
                        <li>perfect repos:{profile["perfect-repos"]}</li>
                        <li>followers: {profile["followers"]}</li>
                        <li>following: {profile["following"]}</li>
                      </List>
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};
