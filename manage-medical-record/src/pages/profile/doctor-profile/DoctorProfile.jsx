import { Alert, Box, Divider, MenuItem, Slide, Snackbar, Stack } from "@mui/material";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import ButtonInfor from "../../../common/button/ButtonInfor";
import Input from "../../../common/input/Input";
import InputSelect from "../../../common/inputselect/InputSelect";
import axios from "../../../services/axios/axios.service";
import classes from "../doctor-profile/DoctorProfile.module.scss";

const TransitionRight = (props) => {
  return <Slide {...props} direction="right" />;
};

const DoctorProfile = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [transition, setTransition] = useState(undefined);

  const handleClick = (Transition) => () => {
    setTransition(() => Transition);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const authenticatedUser = localStorage.getItem("user");
    if (authenticatedUser) setUser(JSON.parse(authenticatedUser));
  }, []);

  const update = async (values) => {
    try {
      const { userId } = JSON.parse(localStorage.getItem("user"));
      await axios.put(`/user/doctor/${userId}`, values);
      setMessage("Update success!");
    } catch (error) {
      setMessage(error);
    }
  };

  const checkChanges = (values) => {
    return (
      values?.gender ||
      values?.address ||
      values?.hospital ||
      values?.department ||
      values?.phonenumber
    );
  };

  const UpdateSchema = Yup.object().shape({
    phonenumber: Yup.number()
      .typeError("That doesn't look like a phone number")
      .positive("A phone number can't start with a minus")
      .integer("A phone number can't include a decimal point")
      .min(10),
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
          {message && <Alert sx={{ margin: "10px 0" }}>{message}</Alert>}
          {user && (
            <Formik
              initialValues={{
                gender: user?.gender,
                address: user?.address,
                hospital: user?.hospital,
                department: user?.department,
                phonenumber: user?.phonenumber,
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
                  <Stack direction="row" spacing={3}>
                    <div className={classes.labelInfor}>Gender</div>
                    <div className={classes.inputInfor}>
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
                  </Stack>
                  <Stack direction="row" spacing={3}>
                    <div className={classes.labelInfor}>Address</div>
                    <div className={classes.inputInfor}>
                      <Input
                        type="text"
                        name="address"
                        fullWidth="true"
                        label="Address"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.address}
                        error={!!errors.address}
                        helperText={errors.address}
                      />
                      </div>
                  </Stack>
                  <Stack direction="row" spacing={3}>
                    <div className={classes.labelInfor}>Hospital</div>
                    <div className={classes.inputInfor}>
                      <Input
                        type="text"
                        name="hospital"
                        fullWidth="true"
                        label="Hospital"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.hospital}
                        error={!!errors.hospital}
                        helperText={errors.hospital}
                      />
                      </div>
                  </Stack>
                  <Stack direction="row" spacing={3}>
                    <div className={classes.labelInfor}>Department</div>
                    <div className={classes.inputInfor}>
                      <Input
                        type="text"
                        name="department"
                        fullWidth="true"
                        label="Department"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.department}
                        error={!!errors.department}
                        helperText={errors.department}
                      />
                      </div>
                  </Stack>
                  <Stack direction="row" spacing={3}>
                    <div className={classes.labelInfor}>Phone Number</div>
                    <div className={classes.inputInfor}>
                    <Input
                      type="string"
                      name="phonenumber"
                      fullWidth="true"
                      label="Phone Number"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.phonenumber}
                      error={!!errors.phonenumber}
                      helperText={errors.phonenumber}
                    />
                    </div>
                  </Stack>
                  <div className={classes.btnUpdate}>
                    <ButtonInfor
                      type="submit"
                      variant="outlined"
                      disabled={!checkChanges(values) || isSubmitting}
                      onClick={handleClick(TransitionRight)}
                    >
                      Update
                    </ButtonInfor>
                  </div>
                  <Box sx={{ width: 300 }}>
                    <Snackbar
                      open={open}
                      onClose={handleClose}
                      TransitionComponent={transition}
                      key={transition ? transition.name : ""}
                      autoHideDuration={4000}
                    >
                      <Alert
                        onClose={handleClose}
                        sx={{ width: "100%" }}
                      >
                        {message}
                      </Alert>
                    </Snackbar>
                  </Box>
                </form>
              )}
            </Formik>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
