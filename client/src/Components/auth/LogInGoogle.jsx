import React from "react";
import { useEffect, useState } from "react";
import jwt_decode from 'jwt-decode';

const CLIENT_ID = "58357792722-mar8g19eknd6f1cp4tkpmq37gcn231d7.apps.googleusercontent.com";

function LogInGoogle() {

  const [user, setUser] = useState({});

  function handleCallbackResponse(response){
    console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  }
  function handleSignOut (event){
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }
  useEffect(()=>{
    /*global google*/
    google.accounts.id.initialize({
      client_id: CLIENT_ID,
      callback: handleCallbackResponse
    })

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {theme: "outline", size:"large"}
    );

    google.accounts.id.prompt();
  }, []);

  return (
    <div>
      <div id="signInDiv"></div>
      {/* {Object.keys(user).length != 0 &&
      <button onClick={(e)=> handleSignOut(e)}>Log out</button>}
      {user && <div>
        <h3>{user.name}</h3>
        <img src={user.picture}/>
      </div>} */}
    </div>
  );
}
  
export default LogInGoogle;