import { Avatar, Divider, Grid } from "@mui/material";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import ButtonInfor from "../../common/button/ButtonInfor";
import Input from "../../common/input/Input";
import axios from "../../services/axios/axios.service";
import classes from "./Profile.module.scss";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };
  useEffect(() => {
    const authenticatedUser = localStorage.getItem("user");
    if (authenticatedUser) setUser(JSON.parse(authenticatedUser));
  }, []);
  const update = async (values) => {
    try {
      const { userId } = JSON.parse(localStorage.getItem("user"));
      await axios.put(`/user/${userId}`, values);
    } catch (error) {
      console.log(error);
    }
  };
  const UpdateSchema = Yup.object().shape({
    mabhyt: Yup.string()
      .max(16, "Health insurance code syntax has 16 characters")
      .min(16, "Health insurance code syntax has 16 characters")
      .required("Required"),
  });

  return (
    <div className={classes.container}>
      <div className={classes.formProfile}>
        <h1>My Profile</h1>
        <p>Manage profile information for account security</p>
        <Divider className={classes.divider} />
        <Grid container spacing={2}>
          <Grid item sm={12} md={9} xl={6}>
            <div className={classes.personalInfor}>
              <table>
                <tr>
                  <td>
                    <label>Fullname</label>
                  </td>
                  <td>
                    <label>{user?.name}</label>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Email</label>
                  </td>
                  <td>
                    <label>{user?.email}</label>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Role</label>
                  </td>
                  <td>
                    <label>{user?.role}</label>
                  </td>
                </tr>
              </table>
              <Formik
                initialValues={{ mabhyt: "" }}
                validationSchema={UpdateSchema}
                validate={(values) => {
                  const errors = {};
                  if (!values.mabhyt) {
                    errors.mabhyt = "Required";
                  } else if (!/^[[A-Z]+[0-9]{3,16}$/i.test(values.mabhyt)) {
                    errors.mabhyt = "Invalid health insurance code syntax";
                  }
                  return errors;
                }}
                onSubmit={update}
              >
                {({
                  values,
                  errors,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                }) => (
                  <form onSubmit={handleSubmit}>
                    {user?.role === "patient" ? (
                      <div className={classes.inline}>
                        <Input
                          type="text"
                          name="mabhyt"
                          label="Health insurance code"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.mabhyt}
                          defaultValue={user?.mabhyt ? user?.mabhyt : "Trống"}
                          error={!!errors.mabhyt}
                          helperText={errors.mabhyt}
                        />
                      </div>
                    ) : (
                      <>abc</>
                    )}
                    <div>
                      <ButtonInfor
                        type="submit"
                        variant="outlined"
                        disabled={isSubmitting}
                      >
                        Save
                      </ButtonInfor>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </Grid>
          {/* <Divider orientation="vertical" flexItem /> */}
          <Grid item sm={12} md={3} xl={6}>
            {user?.image ? (
              <Avatar className={classes.avatar} src={user?.image} />
            ) : (
              <Avatar className={classes.avatar} src="/broken-image.jpg" />
            )}
            <input type="file" onChange={onImageChange} />
            abc
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Profile;
