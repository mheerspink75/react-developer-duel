import "./Inspect.css";
import { inspectUserUrl } from "../../services/userService";
import { useState } from "react";

export const Inspect = () => {
  const [userName, setUserName] = useState("mheerspink75");
  const [profile, setProfile] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const HandleSubmit = (e) => {
    e.preventDefault();
    const inspectUser = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        let response = await fetch(inspectUserUrl + userName);
        if (response.ok) {
          let data = await response.json();
          console.log(data);
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
    inspectUser();
  };

  return (
    <div className="inspect">
      <label>
        <b>Inspect username:</b>
      </label>
      <form onSubmit={HandleSubmit}>
        <input
          placeholder="username"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
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
              profile && (
                <div>
                  <img src={profile["avatar-url"]} alt="profile pic"></img>
                  <ul>
                    <li>username: {profile["username"]}</li>
                    <li>name: {profile["name"]}</li>
                    <li>location: {profile["location"]}</li>
                    <li>titles: {profile["titles"]}</li>
                    <li>fav language: {profile["favorite-language"]}</li>
                    <li>total stars:{profile["total-stars"]}</li>
                    <li>highest star count: {profile["highest-starred"]}</li>
                    <li>public repos: {profile["public-repos"]}</li>
                    <li>perfect repos:{profile["perfect-repos"]}</li>
                    <li>followers: {profile["followers"]}</li>
                    <li>following: {profile["following"]}</li>
                  </ul>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};
