import { Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import ButtonInfor from "../../common/button/ButtonInfor";
import classes from "./Register.module.scss";
import IntroductionForm from "../../components/containers/IntroductionForm/IntroductionForm";
import { Link } from "react-router-dom";
import axios from "../../services/axios/axios.service";

const Register = () => {
  const [passwordType, setPasswordType] = useState("password");

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
    }
    setPasswordType("password");
  };
  const register = async (values) => {
    try {
      await axios.post("/user/register", values);
    } catch (error) {
      console.log(error);
    }
  };

  const RegisterSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    email: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });

  const handleSelected = (event) => {
    console.log(event.target.value);
    event.target.value;
  }

  return (
    <IntroductionForm>
      <div className={classes.registerDetail}>
        <h2>Register</h2>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            role: "",
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
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className={classes.formControl}>
                <select
                  name="role"
                  className={classes.inputRegister}
                  onChange={handleSelected}
                  onBlur={handleBlur}
                  value={values.role}
                  aria-label="Choose role"
                >
                  <option value="patient">Patient</option>
                  <option value="doctor">Doctor</option>
                </select>
                <h6 className={classes.errorRequired}>
                  {errors.role && touched.role && errors.role}
                </h6>
              </div>
              <div className={classes.formControl}>
                <input
                  className={classes.inputRegister}
                  type="text"
                  name="name"
                  placeholder="Fullname"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />
                <h6 className={classes.errorRequired}>
                  {errors.name && touched.name && errors.name}
                </h6>
              </div>
              <div className={classes.formControl}>
                <input
                  className={classes.inputRegister}
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <h6 className={classes.errorRequired}>
                  {errors.email && touched.email && errors.email}
                </h6>
              </div>
              <div className={classes.formControl}>
                <input
                  className={classes.inputRegister}
                  type={passwordType}
                  name="password"
                  placeholder="Password"
                  onClick={() => togglePassword()}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                >
                  {/* { passwordType==="password"? <VisibilityIcon /> :<VisibilityOffIcon /> } */}
                </input>
                <h6 className={classes.errorRequired}>
                  {errors.password && touched.password && errors.password}
                </h6>
              </div>
              <div className={classes.buttonInfor}>
                <ButtonInfor type="submit" disabled={isSubmitting}>
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
  );
};

export default Register;
