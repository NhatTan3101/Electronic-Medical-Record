import { Alert, Divider, Grid, MenuItem } from "@mui/material";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import ButtonInfor from "../../../common/button/ButtonInfor";
import Input from "../../../common/input/Input";
import InputSelect from "../../../common/inputselect/InputSelect";
import axios from "../../../services/axios/axios.service";
import classes from "../patient-profile/PatientProfile.module.scss";

const DoctorProfile = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [isDisplay, setIsDisplay] = useState(false);

  useEffect(() => {
    const authenticatedUser = localStorage.getItem("user");
    if (authenticatedUser) setUser(JSON.parse(authenticatedUser));
  }, []);

  const update = async (values) => {
    try {
      const { userId } = JSON.parse(localStorage.getItem("user"));
      await axios.put(`/user/${userId}/patient`, values);
      setMessage("Update success!");
    } catch (error) {
      setMessage(error);
    }
  };

  const UpdateSchema = Yup.object().shape({
    phonenumber: Yup.string()
      .max(9, "Phone number has 10 number")
      .min(9, "Phone number has 10 number"),
  });

  return (
    <div className={classes.container}>
      <div className={classes.inforProfile}>
        <h1>My Profile</h1>
        <p>Manage profile information for account security</p>
        <Divider className={classes.divider} />
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
        </div>
        <div className={classes.formProfile}>
          <h1>Update Profile</h1>
          <Divider className={classes.divider} />
          <Formik
            initialValues={{
              gender: null,
              address: "",
              hospital: "",
              department: "",
              phonenumber:""
            }}
            validationSchema={UpdateSchema}
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
                <Grid container spacing={2}>
                  <Grid item sm={12} md={4} xl={6}>
                    <div>
                      <div className={classes.label}>Gender</div>
                      <div className={classes.label}>Address</div>
                      <div className={classes.label}>Hospital</div>
                      <div className={classes.label}>Department</div>
                      <div className={classes.label}>Phone number</div>
                    </div>
                  </Grid>
                  <Grid item sm={12} md={4} xl={6}>
                    <div className={classes.inline}>
                      <InputSelect
                        name="gender"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.gender}
                        inputLabel="Gender"
                        error={!!errors.gender}
                        helperText={errors.gender}
                      >
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                      </InputSelect>
                    </div>
                    <div className={classes.inline}>
                      <Input
                        type="text"
                        name="address"
                        fullWidth="true"
                        label="Address"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={user?.address || values.address}
                        error={!!errors.address}
                        helperText={errors.address}
                      />
                    </div>
                    <div className={classes.inline}>
                      <Input
                        type="text"
                        name="hospital"
                        fullWidth="true"
                        label="Hospital"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={user?.hospital || values.hospital}
                        error={!!errors.hospital}
                        helperText={errors.hospital}
                      />
                    </div>
                    <div className={classes.inline}>
                      <Input
                        type="text"
                        name="department"
                        fullWidth="true"
                        label="Department"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={user?.department || values.department}
                        error={!!errors.department}
                        helperText={errors.department}
                      />
                    </div>
                    <div className={classes.inline}>
                      <Input
                        type="number"
                        name="phonenumber"
                        fullWidth="true"
                        label="Phone Number"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={user?.phonenumber || values.phonenumber}
                        error={!!errors.phonenumber}
                        helperText={errors.phonenumber}
                      />
                    </div>
                  </Grid>
                </Grid>
                <div>
                  <ButtonInfor
                    type="submit"
                    variant="outlined"
                    disabled={isDisplay || isSubmitting}
                  >
                    Update
                  </ButtonInfor>
                </div>
                {message && <Alert sx={{ margin: "10px 0" }}>{message}</Alert>}
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
