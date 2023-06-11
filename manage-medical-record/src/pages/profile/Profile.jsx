import React from "react";
import classes from "./Profile.module.scss";

const Profile = () => {
  return (
    <div className={classes.container}>
      <div className={classes.formProfile}>
        <h1>My Profile</h1>
        <p>Manage profile information for account security</p>
        
      </div>
    </div>
  );
};

export default Profile;
