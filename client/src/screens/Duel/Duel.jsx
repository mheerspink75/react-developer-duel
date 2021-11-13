import { useState, useEffect } from "react";

import {
  Winner,
  RunnerUp,
  DuelContainer,
  UsersForm,
  UserResults,
  User1,
  User2,
  ResultsContainer,
  LoadingContainer,
} from "./Duel.styles";

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

export const Duel = () => {
  const duelUsersUrl = "http://localhost:3000/api/users?";
  const [userName1, setUserName1] = useState("gaearon");
  const [userName2, setUserName2] = useState("qbolt");
  const [profiles, setProfiles] = useState("");
  const [winner, setWinner] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const duelUsers = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      let url =
        duelUsersUrl + "username=" + userName1 + "&username=" + userName2;
      let response = await fetch(url);
      if (response.ok) {
        let data = await response.json();
        setIsLoading(false);
        setProfiles(data);

        let user1 = [
          data[0]["following"],
          data[0]["followers"],
          data[0]["highest-starred"],
          data[0]["perfect-repos"],
          data[0]["total-stars"],
        ];

        let user2 = [
          data[1]["following"],
          data[1]["followers"],
          data[1]["highest-starred"],
          data[1]["perfect-repos"],
          data[1]["total-stars"],
        ];

        let count1 = 0;
        let count2 = 0;
        for (let i = 0; i < 5; i++) {
          user1[i] > user2[i] ? count1++ : count2++;
        }

        count1 > count2 ? setWinner(true) : setWinner(false);
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
    duelUsers();
  };

  useEffect(() => {
    duelUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DuelContainer>
      <UsersForm>
        <FormControl>
          <FormLabel>Dev 1:</FormLabel>
          <TextField
            id="outlined-search"
            size="small"
            type="search"
            placeholder="username"
            value={userName1}
            onChange={(e) => setUserName1(e.target.value)}
          />

          <FormHelperText id="my-helper-text">
            Enter username 1...
          </FormHelperText>

          <FormLabel>Dev 2:</FormLabel>
          <TextField
            id="outlined-search"
            size="small"
            type="search"
            placeholder="username"
            value={userName2}
            onChange={(e) => setUserName2(e.target.value)}
          />

          <FormHelperText id="my-helper-text">
            Enter username 2...
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
      </UsersForm>

      {isLoading ? (
        <LoadingContainer>
          <CircularProgress />
          <p>Loading...</p>
        </LoadingContainer>
      ) : (
        <ResultsContainer>
          {isError ? (
            <Alert severity="error">
              This is an error alert — check it out!
            </Alert>
          ) : (
            profiles && (
              <UserResults>
                <User1>
                  {winner ? (
                    <Winner>Winner!!!</Winner>
                  ) : (
                    <RunnerUp>2nd Place...</RunnerUp>
                  )}
                  <Card sx={{ maxWidth: 200, height: 500 }}>
                    <CardActionArea>
                      <Typography variant="h5" color="text.secondary">
                        <GitHubIcon /> {profiles[0]["username"]}
                      </Typography>
                      <CardMedia
                        component="img"
                        height="200px"
                        image={profiles[0]["avatar-url"]}
                        alt="profile pic"
                        onClick={(event) =>
                          (window.location.href =
                            "https://github.com/" + profiles[0]["username"])
                        }
                      />
                    </CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {profiles[0]["name"]}
                      </Typography>

                      <Typography variant="body2" color="text.secondary">
                        {profiles[0]["location"] === null
                          ? ""
                          : profiles[0]["location"]}
                      </Typography>

                      <Typography variant="caption" color="text.secondary">
                        {profiles[0]["bio"] !== "" || null
                          ? profiles[0]["bio"]
                          : ""}
                      </Typography>

                      <Typography variant="h6">
                        <List className="userList">
                          <li>titles: {profiles[0]["titles"]}</li>
                          <li>
                            fav language: {profiles[0]["favorite-language"]}
                          </li>
                          <li>total stars:{profiles[0]["total-stars"]}</li>
                          <li>
                            highest star count: {profiles[0]["highest-starred"]}
                          </li>
                          <li>public repos: {profiles[0]["public-repos"]}</li>
                          <li>perfect repos:{profiles[0]["perfect-repos"]}</li>
                          <li>followers: {profiles[0]["followers"]}</li>
                          <li>following: {profiles[0]["following"]}</li>
                        </List>
                      </Typography>
                    </CardContent>
                  </Card>
                </User1>

                <User2>
                  {!winner ? (
                    <Winner>Winner!!!</Winner>
                  ) : (
                    <RunnerUp>2nd place...</RunnerUp>
                  )}

                  <Card sx={{ maxWidth: 200, height: 500 }}>
                    <CardActionArea>
                      <Typography variant="h5" color="text.secondary">
                        <GitHubIcon /> {profiles[1]["username"]}
                      </Typography>
                      <CardMedia
                        component="img"
                        height="200px"
                        image={profiles[1]["avatar-url"]}
                        alt="profile pic"
                        onClick={(event) =>
                          (window.location.href =
                            "https://github.com/" + profiles[1]["username"])
                        }
                      />
                    </CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {profiles[1]["name"]}
                      </Typography>

                      <Typography variant="body2" color="text.secondary">
                        {profiles[1]["location"] === null
                          ? ""
                          : profiles[1]["location"]}
                      </Typography>

                      <Typography variant="caption" color="text.secondary">
                        {profiles[1]["bio"] !== "" || null
                          ? profiles[1]["bio"]
                          : ""}
                      </Typography>

                      <Typography variant="h6">
                        <List className="userList">
                          <li>titles: {profiles[1]["titles"]}</li>
                          <li>
                            fav language: {profiles[1]["favorite-language"]}
                          </li>
                          <li>total stars:{profiles[1]["total-stars"]}</li>
                          <li>
                            highest star count: {profiles[1]["highest-starred"]}
                          </li>
                          <li>public repos: {profiles[1]["public-repos"]}</li>
                          <li>perfect repos:{profiles[1]["perfect-repos"]}</li>
                          <li>followers: {profiles[1]["followers"]}</li>
                          <li>following: {profiles[1]["following"]}</li>
                        </List>
                      </Typography>
                    </CardContent>
                  </Card>
                </User2>
              </UserResults>
            )
          )}
        </ResultsContainer>
      )}
    </DuelContainer>
  );
};
