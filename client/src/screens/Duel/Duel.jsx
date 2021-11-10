import "./Duel.css";
import { duelUsersUrl } from "../../services/userService";
import { useState } from "react";

export const Duel = () => {
  const [userName1, setUserName1] = useState("gaearon");
  const [userName2, setUserName2] = useState("qbolt");
  const [profiles, setProfiles] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const HandleSubmit = (e) => {
    e.preventDefault();
    const duelUsers = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        let response = await fetch(
          duelUsersUrl + "username=" + userName1 + "&username=" + userName2
        );
        if (response.ok) {
          let data = await response.json();
          console.log(data);
          setIsLoading(false);
          setProfiles(data);
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
    duelUsers();
  };

  return (
    <div className="Duel">
      <label>
        <b>Duel users:</b>
      </label>
      <form onSubmit={HandleSubmit}>
        <input
          placeholder="userName1"
          type="text"
          value={userName1}
          onChange={(e) => {
            setUserName1(e.target.value);
          }}
        />
        <br />
        <input
          placeholder="userName2"
          type="text"
          value={userName2}
          onChange={(e) => {
            setUserName2(e.target.value);
          }}
        />
        <br />
        <input type="submit" value="Submit"></input>
      </form>
      {isLoading ? <p>Loading...</p> : <p></p>}
      {isError ? <p>Error!</p> : <p></p>}
      {profiles && (
        <div className="Profiles">
          <h1>{profiles[0].username}</h1>
          <h1>{profiles[1].username}</h1>
          {profiles.map((profiles, index) => (
            <div key={index}>
              <img src={profiles["avatar-url"]} alt="profile pic"></img>
              <ul>
                    <li>username: {profiles["username"]}</li>
                    <li>name: {profiles["name"]}</li>
                    <li>location: {profiles["location"]}</li>
                    <li>titles: {profiles["titles"]}</li>
                    <li>fav language: {profiles["favorite-language"]}</li>
                    <li>total stars:{profiles["total-stars"]}</li>
                    <li>highest star count: {profiles["highest-starred"]}</li>
                    <li>public repos: {profiles["public-repos"]}</li>
                    <li>perfect repos:{profiles["perfect-repos"]}</li>
                    <li>followers: {profiles["followers"]}</li>
                    <li>following: {profiles["following"]}</li>
                  </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
