import { authService, dbService } from "fbase";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Profile = ({ userObj, refreshUser }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const onLogOutClick = () => {
    authService.signOut();
    history.push('/');
  }

  /*
  const getMyNweets = async() => {
    const nweets = await dbService
                        .collection("nweets")
                        .where("creatorId", "==", userObj.uid)
                        .orderBy("createdAt")
                        .get();
    console.log(nweets.docs.map(doc => doc.data()));
  }
  */

  const onChange = (event) => {
    const {
      target: { value }
    } = event;
    setNewDisplayName(value);
  }
  const onSubmit = async (event) => {
    event.preventDefault();
    if(userObj.displayName !== newDisplayName) {
      await userObj.updateProfile(
        { displayName : newDisplayName }
      );
      refreshUser();
    }
    
  }

  return ( 
    <div className="container">
      <form className="profileForm" onSubmit={onSubmit}>
        <input onChange={onChange} 
              type="text" 
              placeholder="Display name" 
              autoFocus
              value={newDisplayName} 
              className="formInput"
        />
        <input type="submit" value="Update Profile" 
              className="formBtn"
              style={{
                marginTop: 10,
              }}
        />
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </span>
    </div>
  )
};

export default Profile;