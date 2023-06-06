import React from "react";
import Grid from "@mui/material/Grid";
import ButtonInfor from "../../../common/button/ButtonInfor";
import { DoctorIcon } from "../../images/index";
import classes from "./IntroductionForm.module.scss";

const IntroductionForm = (props) => {
  const { children } = props;

  return (
    <div className={classes.introductionForm}>
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
            <div className={classes.right}>{children}</div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default IntroductionForm;
