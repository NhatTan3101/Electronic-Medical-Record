import { Alert, MenuItem, Snackbar } from "@mui/material";
import { Formik } from "formik";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import ButtonInfor from "../../common/button/ButtonInfor";
import Input from "../../common/input/Input";
import InputSelect from "../../common/inputselect/InputSelect";
import IntroductionForm from "../../components/containers/IntroductionForm/IntroductionForm";
import axios from "../../services/axios/axios.service";
import classes from "./Register.module.scss";

const Register = () => {
  const [passwordType, setPasswordType] = useState("password");
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [open, setOpen] = useState(false);

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
    }
    setPasswordType("password");
  };
  const register = async (values) => {
    try {
      await axios.post("/user/register", values);
      setSeverity("success");
      setMessage("Register success!");
    } catch (error) {
      setSeverity("error");
      setMessage(error?.response?.data?.message || error?.message || "Internal server !");
    }
  };
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const RegisterSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    email: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });

  return (
    <div className={classes.registerScreen}>
      <IntroductionForm>
        <div className={classes.registerDetail}>
          <h2>Register</h2>
          {message && (
            <Snackbar
              autoHideDuration={3000}
              open={open}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              onClose={handleClose}
            >
              <Alert severity={severity}>
                {message}
              </Alert>
            </Snackbar>
          )}
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              role: "patient",
            }}
            validationSchema={RegisterSchema}
            validate={() => {
              const errors = {};
              return errors;
            }}
            onSubmit={register}
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
                <InputSelect
                  name="role"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.role}
                  inputLabel="Role"
                  error={!!errors.role}
                  helperText={errors.role}
                >
                  <MenuItem value="patient">Patient</MenuItem>
                  <MenuItem value="doctor">Doctor</MenuItem>
                </InputSelect>
                <Input
                  type="text"
                  name="name"
                  fullWidth="true"
                  label="Fullname"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  error={!!errors.name}
                  helperText={errors.name}
                />
                <Input
                  type="email"
                  name="email"
                  fullWidth="true"
                  label="Email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  error={!!errors.email}
                  helperText={errors.email}
                />
                <Input
                  type={passwordType}
                  name="password"
                  fullWidth="true"
                  label="Password"
                  onClick={() => togglePassword()}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  error={!!errors.password}
                  helperText={errors.password}
                />
                <div className={classes.buttonInfor}>
                  <ButtonInfor
                    fullWidth="true"
                    type="submit"
                    disabled={isSubmitting}
                    onClick={handleClick}
                  >
                    Create an account
                  </ButtonInfor>
                </div>
                <div className={classes.loginAccount}>
                  <p>Have already an account?</p>
                  <Link to="/login" className={classes.loginLink}>
                    Login here
                  </Link>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </IntroductionForm>
    </div>
  );
};

export default Register;
