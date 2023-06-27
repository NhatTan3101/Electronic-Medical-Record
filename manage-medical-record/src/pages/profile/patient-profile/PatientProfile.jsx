import {
  Alert,
  Box,
  Divider,
  MenuItem,
  Slide,
  Snackbar,
  Stack,
} from "@mui/material";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import ButtonInfor from "../../../common/button/ButtonInfor";
import Input from "../../../common/input/Input";
import InputSelect from "../../../common/inputselect/InputSelect";
import axios from "../../../services/axios/axios.service";
import classes from "./PatientProfile.module.scss";

const TransitionRight = (props) => {
  return <Slide {...props} direction="right" />;
};

const PatientProfile = () => {
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
      const user = JSON.parse(localStorage.getItem("user"));
      await axios.put(`/user/patient/${user?.userId}`, values);
      localStorage.setItem('user', {...user, ...values });
      setMessage("Update success!");
    } catch (error) {
      setMessage(error);
    }
  };

  const checkChanges = (values) => {
    return (
      values?.mabhyt ||
      values?.gender ||
      values?.idcardno ||
      values?.address ||
      values?.birthday ||
      values?.hometown ||
      values?.nation ||
      values?.phonenumber
    );
  };

  const UpdateSchema = Yup.object().shape({
    mabhyt: Yup.string()
      .max(16, "Health insurance code syntax has 16 characters")
      .min(16, "Health insurance code syntax has 16 characters"),
    phonenumber: Yup.number()
      .typeError("That doesn't look like a phone number")
      .positive("A phone number can't start with a minus")
      .integer("A phone number can't include a decimal point")
      .min(10),
    idcardno: Yup.number()
      .typeError("That doesn't look like a identity card number")
      .positive("A identity card number can't start with a minus")
      .integer("A identity card number can't include a decimal point")
      .min(12),
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
          {user && (
            <Formik
              initialValues={{
                mabhyt: user?.mabhyt,
                gender: user?.gender,
                idcardno: user?.idcardno,
                address: user?.address,
                birthday: user?.birthday,
                hometown: user?.hometown,
                nation: user?.nation,
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
                    <div className={classes.labelInfor}>
                      Health insurance code
                    </div>
                    <div className={classes.inputInfor}>
                      <Input
                        type="text"
                        name="mabhyt"
                        fullWidth="true"
                        label="Health insurance code"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.mabhyt}
                        error={!!errors.mabhyt}
                        helperText={errors.mabhyt}
                      />
                    </div>
                  </Stack>
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
                    <div className={classes.labelInfor}>
                      Identity card Number
                    </div>
                    <div className={classes.inputInfor}>
                      <Input
                        type="text"
                        name="idcardno"
                        fullWidth="true"
                        label="Identity card Number"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.idcardno}
                        error={!!errors.idcardno}
                        helperText={errors.idcardno}
                      />
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
                    <div className={classes.labelInfor}>Birthday</div>
                    <div className={classes.inputInfor}>
                      <Input
                        type="date"
                        name="birthday"
                        fullWidth="true"
                        label="Birthday"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.birthday}
                        error={!!errors.birthday}
                        helperText={errors.birthday}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </div>
                  </Stack>
                  <Stack direction="row" spacing={3}>
                    <div className={classes.labelInfor}>Hometown</div>
                    <div className={classes.inputInfor}>
                      <Input
                        type="text"
                        name="hometown"
                        fullWidth="true"
                        label="Hometown"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.hometown}
                        error={!!errors.hometown}
                        helperText={errors.hometown}
                      />
                    </div>
                  </Stack>
                  <Stack direction="row" spacing={3}>
                    <div className={classes.labelInfor}>Nation</div>
                    <div className={classes.inputInfor}>
                      <Input
                        type="text"
                        name="nation"
                        fullWidth="true"
                        label="Nation"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.nation}
                        error={!!errors.nation}
                        helperText={errors.nation}
                      />
                    </div>
                  </Stack>
                  <Stack direction="row" spacing={3}>
                    <div className={classes.labelInfor}>Phone number</div>
                    <div className={classes.inputInfor}>
                      <Input
                        type="text"
                        name="phonenumber"
                        fullWidth="true"
                        label="Phone number"
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

export default PatientProfile;
