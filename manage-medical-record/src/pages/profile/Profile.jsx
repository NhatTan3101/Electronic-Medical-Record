import React from "react";
import classes from "./Profile.module.scss";
import { Grid } from "@mui/material";

const Profile = () => {
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    const authenticatedUser = localStorage.getItem("user");
    if (authenticatedUser) setUser(JSON.parse(authenticatedUser));
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.formProfile}>
        <h1>My Profile</h1>
        <p>Manage profile information for account security</p>
        <hr />
        <Grid container spacing={2}>
          <Grid item sm={12} md={9} xl={6}>
            <div className={classes.personalInfor}>
              <table>
                <tr>
                  <td>
                    <label>Fullname</label>
                  </td>
                  <td>
                    <input defaultValue={user?.name} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Email</label>
                  </td>
                  <td>
                    <input defaultValue={user?.email} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Role</label>
                  </td>
                  <td>
                    <input defaultValue={user?.role} />
                  </td>
                </tr>
                {user?.role === "doctor" ? (
                  <>
                    <tr>
                      <td>
                        <label>Health insurance code</label>
                      </td>
                      <td>
                        <input defaultValue={(user?.mabhyt) ? user?.mabhyt : "Trống"} />
                      </td>
                    </tr>
                  </>
                ) : (
                  <>doctor</>
                )}
              </table>
            </div>
          </Grid>
          <Grid item sm={12} md={3} xl={6}>
            <div className={classes.avatarChange}>abc</div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Profile;
