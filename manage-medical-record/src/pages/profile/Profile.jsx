import { Avatar, Divider, Grid } from "@mui/material";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import ButtonInfor from "../../common/button/ButtonInfor";
import Input from "../../common/input/Input";
import axios from "../../services/axios/axios.service";
import classes from "./Profile.module.scss";
import UserAvatar from "../../components/avatars/UserAvatar/UserAvatar.avatar";
import { InvisibleDivider } from "../../components/dividers/InvisibleDivider/InvisibleDivider.divider";

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
          <Grid item sm={12} md={6} xl={6}>
            <div className={classes.personalInfor}>
              <div className={classes.infor}>
                <div className={classes.fieldName}>Fullname</div>
                <span>: {user?.name}</span>
              </div>
              <div className={classes.infor}>
                <div className={classes.fieldName}>Email</div>
                <span>: {user?.email}</span>
              </div>
              <div className={classes.infor}>
                <div className={classes.fieldName}>Role</div>
                <span>: {user?.role}</span>
              </div>
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
                  <form className={classes.form} onSubmit={handleSubmit}>
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
                    <InvisibleDivider />
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
          <Grid item sm={12} md={6} xl={6}>
            {user?.image ? (
              <Avatar className={classes.avatar} src={user?.image} />
            ) : (
              <UserAvatar>{user?.name}</UserAvatar>
            )}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Profile;
