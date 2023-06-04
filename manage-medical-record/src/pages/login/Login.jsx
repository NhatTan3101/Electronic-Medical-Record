import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import ButtonInfor from "../../common/button/ButtonInfor";
import { DoctorIcon } from "../../components/images/index";
import classes from "./Login.module.scss";
import { Formik } from "formik";
import * as Yup from "yup";
import Register from "../register/Register";
import { redirect } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [openRegister, setOpenRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const LoginSchema = Yup.object().shape({
    mabhyt: Yup.string()
      // .max(16, "Health insurance code syntax has 16 characters")
      // .min(16, "Health insurance code syntax has 16 characters")
      .required("Required"),
    password: Yup.string().required("Required"),
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const res = await axios.post("/server/login", { username, password });
      // localStorage.setItem("currentUser", JSON.stringify(res.data));
      // redirect("/");
      console.log(res.data);
    } catch(err){
      setError(err);
      console.log(err);
    }
  };
  return (
    <div className={classes.loginScreen}>
      <div className={classes.container}>
        <Grid container spacing={2}>
          <Grid item sm={12} md={6} xl={6}>
            <div className={classes.left}>
              <div className={classes.leftContainer}>
                <DoctorIcon />
                <div className={classes.healthDetail}>
                  <h1>Electronic Medical Record Systems</h1>
                  <p>
                    An electronic record of health-related information on an
                    individual that can be created, gathered, managed, and
                    consulted by authorized clinicians and staff within one
                    health care organization
                  </p>
                </div>
                <div className={classes.buttonInfor}>
                  <ButtonInfor>More Information</ButtonInfor>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item sm={12} md={6} xl={6}>
            <div className={classes.right}>
              {!openRegister ? (
                <div className={classes.loginDetail}>
                  <h2>Login</h2>
                  <Formik
                    initialValues={{ mabhyt: "", password: "" }}
                    validationSchema={LoginSchema}
                    validate={(values) => {
                      const errors = {};
                      if (!values.mabhyt) {
                        errors.mabhyt = "Required";
                      } else if (!/^[[A-Z]+[0-9]{3,16}$/i.test(values.mabhyt)) {
                        errors.mabhyt = "Invalid health insurance code syntax";
                      }
                      return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                      setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                      }, 400);
                    }}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      // handleChange:(e)=>setUsername(e.target.value),
                      handleBlur,
                      // handleSubmit,
                      isSubmitting,
                    }) => (
                      <form onSubmit={handleSubmit}>
                        <h6>
                          {errors.mabhyt && touched.mabhyt && errors.mabhyt}
                        </h6>
                        <input
                          className={classes.inputLogin}
                          type="text"
                          name="mabhyt"
                          placeholder="Health insurance code"
                          onChange={(e) => setUsername(e.target.value)}
                          onBlur={handleBlur}
                          value={values.mabhyt}
                        />
                        <h6>
                          {errors.password &&
                            touched.password &&
                            errors.password}
                        </h6>
                        <input
                          className={classes.inputLogin}
                          type="password"
                          name="password"
                          placeholder="Password"
                          onChange={(e) => setUsername(e.target.value)}
                          onBlur={handleBlur}
                          value={values.password}
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
                            <span>Remember me</span>
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
                          <span onClick={() => setOpenRegister(true)}>
                            Register
                          </span>
                        </div>
                      </form>
                    )}
                  </Formik>
                </div>
              ) : (
                <Register setOpenRegister={setOpenRegister} />
              )}
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Login;
