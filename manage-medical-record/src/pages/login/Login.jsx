import { Alert } from "@mui/material";
import { Formik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import ButtonInfor from "../../common/button/ButtonInfor";
import IntroductionForm from "../../components/containers/IntroductionForm/IntroductionForm";
import axios from "../../services/axios/axios.service";
import classes from "./Login.module.scss";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
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

      if (res.data.result.isValid) {
        localStorage.setItem(
          "user",
          JSON.stringify(res.data?.result?.user || "")
        );
        navigate("/");
      } else {
        setError("Your health insurance code or password is incorrect!");
      }
    } catch (err) {
      setError(err?.message || "Unknown error!");
      console.log(err);
    }
  };

  return (
    <div className={classes.loginScreen}>
      <IntroductionForm>
        <div className={classes.loginDetail}>
          <h2>Login</h2>
          {error && <Alert severity="error">{error}</Alert>}
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
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                <input
                  className={classes.inputLogin}
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  />
                  <h6>{errors.email && touched.email && errors.email}</h6>
                <input
                  className={classes.inputLogin}
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  />
                  <h6>
                    {errors.password && touched.password && errors.password}
                  </h6>
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
                  <ButtonInfor type="submit" disabled={isSubmitting}>
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
