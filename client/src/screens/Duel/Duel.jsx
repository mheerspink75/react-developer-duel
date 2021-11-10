import "./Duel.css";
import { useState, useEffect } from "react";

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
      let response = await fetch(
        duelUsersUrl + "username=" + userName1 + "&username=" + userName2
      );
      if (response.ok) {
        let data = await response.json();
        // console.log(data);
        setIsLoading(false);
        setProfiles(data);

        let user1 = [
          data[0]["following"],
          data[0]["followers"],
          data[0]["highest-starred"],
          data[0]["perfect-repos"],
          data[0]["total-stars"]
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
  }, []);

  return (
    <div className="Duel">
      <label>
        <b>Duel users:</b>
      </label>
      <form onSubmit={HandleSubmit}>
        <input
          placeholder="user1"
          type="text"
          value={userName1}
          onChange={(e) => {
            setUserName1(e.target.value);
          }}
        />
        <br />
        <input
          placeholder="user2"
          type="text"
          value={userName2}
          onChange={(e) => {
            setUserName2(e.target.value);
          }}
        />
        <br />
        <input type="submit" value="Submit"></input>
      </form>

      <div>
        {isLoading ? (
          <div className="listContainer">
            <p>Loading...</p>
          </div>
        ) : (
          <div className="listContainer">
            {isError ? (
              <p>ERROR</p>
            ) : (
              profiles && (
                <div className="usersContainer">
                  <div className="user1">
                    {winner ? <div>Winner!!!</div> : <div>Runner up!</div>}
                    <img
                      src={profiles[0]["avatar-url"]}
                      alt="profile pic"
                    ></img>
                    <ul>
                      <li>username: {profiles[0]["username"]}</li>
                      <li>name: {profiles[0]["name"]}</li>
                      <li>location: {profiles[0]["location"]}</li>
                      <li>titles: {profiles[0]["titles"]}</li>
                      <li>fav language: {profiles[0]["favorite-language"]}</li>
                      <li>total stars:{profiles[0]["total-stars"]}</li>
                      <li>
                        highest star count: {profiles[0]["highest-starred"]}
                      </li>
                      <li>public repos: {profiles[0]["public-repos"]}</li>
                      <li>perfect repos:{profiles[0]["perfect-repos"]}</li>
                      <li>followers: {profiles[0]["followers"]}</li>
                      <li>following: {profiles[0]["following"]}</li>
                    </ul>
                  </div>

                  <div className="user2">
                    {!winner ? <div>Winner!!!</div> : <div>Runner up!</div>}
                    <img
                      src={profiles[1]["avatar-url"]}
                      alt="profile pic"
                    ></img>
                    <ul>
                      <li>username: {profiles[1]["username"]}</li>
                      <li>name: {profiles[1]["name"]}</li>
                      <li>location: {profiles[1]["location"]}</li>
                      <li>titles: {profiles[1]["titles"]}</li>
                      <li>fav language: {profiles[1]["favorite-language"]}</li>
                      <li>total stars:{profiles[1]["total-stars"]}</li>
                      <li>
                        highest star count: {profiles[1]["highest-starred"]}
                      </li>
                      <li>public repos: {profiles[1]["public-repos"]}</li>
                      <li>perfect repos:{profiles[1]["perfect-repos"]}</li>
                      <li>followers: {profiles[1]["followers"]}</li>
                      <li>following: {profiles[1]["following"]}</li>
                    </ul>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};
