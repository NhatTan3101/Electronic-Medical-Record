import { Alert } from "@mui/material";
import { Formik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import ButtonInfor from "../../common/button/ButtonInfor";
import Input from "../../common/input/Input";
import IntroductionForm from "../../components/containers/IntroductionForm/IntroductionForm";
import axios from "../../services/axios/axios.service";
import classes from "./Login.module.scss";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });

  const login = async (values) => {
    try {
      const res = await axios.post("/user/login", {
        email: values.email,
        password: values.password,
      });

      localStorage.setItem(
        "user",
        JSON.stringify(res.data?.result || "")
      );

      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Unknown error !");
    }
  };

  return (
    <div className={classes.loginScreen}>
      <IntroductionForm>
        <div className={classes.loginDetail}>
          <h2>Login</h2>
          {error && <Alert sx={{ margin: "10px 0" }} severity="error">{error}</Alert>}
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            validate={() => {
              const errors = {};
              return errors;
            }}
            onSubmit={login}
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
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={(e) => {
                    handleChange(e);
                    setError('');
                  }}
                  onBlur={handleBlur}
                  value={values.email}
                  error={!!errors.email}
                  helperText={errors.email}
                />
                <Input
                  className={classes.inputLogin}
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={(e) => {
                    handleChange(e);
                    setError('');
                  }}
                  onBlur={handleBlur}
                  value={values.password}
                  error={!!errors.password}
                  helperText={errors.password}
                />
                <div className={classes.loginRemember}>
                  <div className={classes.loginRememberElement}>
                    <input
                      className={classes.checkboxRemember}
                      type="checkbox"
                      value=""
                      id="remembered"
                      defaultChecked={true}
                    />
                    <label htmlFor="remembered">Remember me</label>
                  </div>
                  <div>
                    <span className={classes.forgotPassword}>
                      Forgot password?
                    </span>
                  </div>
                </div>
                <div className={classes.buttonInfor}>
                  <ButtonInfor fullWidth="true" type="submit" disabled={isSubmitting}>
                    Login
                  </ButtonInfor>
                </div>
                <div className={classes.registerAccount}>
                  <p>{`Don't have an account?`}</p>
                  <Link to="/register" className={classes.registerLink}>
                    Register
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

export default Login;
