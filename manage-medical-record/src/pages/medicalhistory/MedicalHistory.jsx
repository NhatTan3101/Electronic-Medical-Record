import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import NewMedicalRecord from "../../components/new-medical-record/NewMedicalRecord";
import classes from "./MedicalHistory.module.scss";

const MedicalHistory = () => {
  const [user, setUser] = useState(null);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const authenticatedUser = localStorage.getItem("user");
    if (authenticatedUser) setUser(JSON.parse(authenticatedUser));
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.container}>
      <div className={classes.record}>
        <h1>Medical History</h1>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Accordion 1</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        {/* {user?.role === "doctor" && ( */}
        <div className={classes.createRecord}>
          <Button variant="contained" onClick={handleClickOpen}>
            New Medical Record
          </Button>
        </div>
        {/* )} */}
        <NewMedicalRecord open={open} onClose={handleClose} />
      </div>
    </div>
  );
};

export default MedicalHistory;
