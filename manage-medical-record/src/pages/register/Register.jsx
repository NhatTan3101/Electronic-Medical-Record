import Grid from "@mui/material/Grid";
import { Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import ButtonInfor from "../../common/button/ButtonInfor";
import classes from "./Register.module.scss";
import IntroductionForm from "../../components/containers/IntroductionForm/IntroductionForm";
import { Link } from "react-router-dom";
import axios from "../../services/axios/axios.service";

const Register = ({ setOpenRegister }) => {
  const [image, setImage] = useState(null);
  const [passwordType, setPasswordType] = useState("password");

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

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
    mabhyt: Yup.string()
      .max(16, "Health insurance code syntax has 16 characters")
      .min(16, "Health insurance code syntax has 16 characters")
      .required("Required"),
      phonenumber: Yup.string().required("Required"),
    name: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    birthday: Yup.string().required("Required"),
    hometown: Yup.string().required("Required"),
    nation: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
    confirmpassword: Yup.string().required("Required"),
  });

  return (
    <IntroductionForm>
      <div className={classes.registerDetail}>
        <h2>Register</h2>
        <Formik
          initialValues={{
            mabhyt: "",
            password: "",
            phonenumber: "",
            name: "",
            address: "",
            birthday: "",
            hometown: "",
            nation: "",
            confirmpassword: "",
          }}
          validationSchema={RegisterSchema}
          validate={(values) => {
            const errors = {};
            if (!values.mabhyt) {
              errors.mabhyt = "Required";
            } else if (!/^[[A-Z]+[0-9]{3,16}$/i.test(values.mabhyt)) {
              errors.mabhyt = "Invalid health insurance code syntax";
            }
            return errors;
          }}
          onSubmit={
            //   (values, { setSubmitting }) => {
            //   setTimeout(() => {
            //     alert(JSON.stringify(values, null, 2));
            //     setSubmitting(false);
            //   }, 400);
            // }
            register
          }
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
              <div className={classes.personalImage}>
                <img alt="" src={image} />
                <input type="file" onChange={onImageChange} />
              </div>
              <Grid container spacing={2}>
                <div className={classes.inline}>
                  <div className={classes.formControl}>
                    <input
                      className={classes.inputRegister}
                      type="text"
                      name="mabhyt"
                      placeholder="Health insurance code"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.mabhyt}
                    />
                    <h6 className={classes.errorRequired}>{errors.mabhyt && touched.mabhyt && errors.mabhyt}</h6>
                  </div>
                  <div className={classes.formControl}>
                    <select
                      name="gender"
                      className={classes.inputRegister}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.gender}
                    >
                      <option value="1" disabled>
                        Gender
                      </option>
                      <option value="2">Female</option>
                      <option value="3">Male</option>
                      <option value="4">Other</option>
                    </select>
                    <h6 className={classes.errorRequired}>{errors.gender && touched.gender && errors.gender}</h6>
                  </div>
                </div>
                <div className={classes.inline}>
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
                    <h6 className={classes.errorRequired}>{errors.name && touched.name && errors.name}</h6>
                  </div>
                  <div className={classes.formControl}>
                    <input
                      className={classes.inputRegister}
                      type="date"
                      name="birthday"
                      placeholder="Birthday"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.birthday}
                    />
                    <h6 className={classes.errorRequired}>
                      {errors.birthday && touched.birthday && errors.birthday}
                    </h6>
                  </div>
                </div>
                <div className={classes.inline}>
                  <div className={classes.formControl}>
                    <input
                      className={classes.inputRegister}
                      type="text"
                      name="phonenumber"
                      placeholder="Phone number"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.phonenumber}
                    />
                    <h6 className={classes.errorRequired}>
                      {errors.phonenumber && touched.phonenumber && errors.phonenumber}
                    </h6>
                  </div>
                  <div className={classes.formControl}>
                    <input
                      className={classes.inputRegister}
                      type="text"
                      name="address"
                      placeholder="Address"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.address}
                    />
                    <h6 className={classes.errorRequired}>
                      {errors.address && touched.address && errors.address}
                    </h6>
                  </div>
                </div>
                <div className={classes.inline}>
                  <div className={classes.formControl}>
                    <input
                      className={classes.inputRegister}
                      type="text"
                      name="hometown"
                      placeholder="Hometown"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.hometown}
                    />
                    <h6 className={classes.errorRequired}>
                      {errors.hometown && touched.hometown && errors.hometown}
                    </h6>
                  </div>
                  <div className={classes.formControl}>
                    <input
                      className={classes.inputRegister}
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                    <h6 className={classes.errorRequired}>
                      {errors.password && touched.password && errors.password}
                    </h6>
                  </div>
                </div>
                <div className={classes.inline}>
                  <div className={classes.formControl}>
                    <input
                      className={classes.inputRegister}
                      type="text"
                      name="nation"
                      placeholder="Nation"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.nation}
                    />
                    <h6 className={classes.errorRequired}>{errors.nation && touched.nation && errors.nation}</h6>
                  </div>
                  <div className={classes.formControl}>
                    <input
                      className={classes.inputRegister}
                      type={passwordType}
                      name="confirmpassword"
                      placeholder="Confirm password"
                      onClick={() => togglePassword()}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.confirmpassword}
                    >
                      {/* { passwordType==="password"? <VisibilityIcon /> :<VisibilityOffIcon /> } */}
                    </input>
                    <h6 className={classes.errorRequired}>
                      {errors.confirmpassword &&
                        touched.confirmpassword &&
                        errors.confirmpassword}
                    </h6>
                  </div>
                </div>
              </Grid>
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
