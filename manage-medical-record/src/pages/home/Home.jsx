import Grid from "@mui/material/Grid";
import React from "react";
import { Link } from "react-router-dom";
import { MedicalRecordIcon } from "../../components/images";
import classes from "./Home.module.scss";

const Home = () => {
  return (
    <div className={classes.container}>
      <Grid container spacing={2}>
        <Grid
          item
          sm={12}
          md={6}
          xl={6}
          style={{ display: "flex", alignItems: "center" }}
        >
          <div className={classes.leftContainer}>
            <h1>Electronic Medical Record System</h1>
            <p>
              {`Electronic medical record (EMR) systems have the
              potential to provide substantial benefits to physicians, clinic
              practices, and health care organizations. These systems can
              facilitate workflow and improve the quality of patient care and
              patient safety. Despite these benefits, widespread adoption of
              EMRs in the United States is low; a recent survey indicated that
              only 4 percent of ambulatory physicians reported having an
              extensive, fully functional electronic records system and 13
              percent reported having a basic system.`}
            </p>
            <div className={classes.moreInfor}>
              <Link to="/about" className={classes.buttonInfor}>
                More Information
              </Link>
            </div>
          </div>
        </Grid>
        <Grid
          item
          sm={12}
          md={6}
          xl={6}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className={classes.rightContainer}>
            <MedicalRecordIcon />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
