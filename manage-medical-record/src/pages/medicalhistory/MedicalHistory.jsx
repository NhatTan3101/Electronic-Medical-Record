import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import NewMedicalRecord from "../../components/new-medical-record/NewMedicalRecord";
import classes from "./MedicalHistory.module.scss";
import ButtonInfor from "../../common/button/ButtonInfor";
import MedicalRecord from "../../components/medical-record/MedicalRecord";
import { useParams } from "react-router-dom";
import axios from "../../services/axios/axios.service";

const MedicalHistory = () => {
  const { userId, recordId } = useParams();
  const [user, setUser] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [records, setRecords] = React.useState([]);

  useEffect(() => {
    const authenticatedUser = JSON.parse(localStorage.getItem("user"));
    if (authenticatedUser) setUser(authenticatedUser);
    axios.get(`/medical-records/${userId}`).then((response) => {
      setRecords(response?.data?.result?.records || []);
    });
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddRecord = (record) => {
    setRecords([...records, record]);
  };

  return (
    <div className={classes.container}>
      <div className={classes.record}>
        <h1>Medical History</h1>
        {records?.length === 0 ? (
          <Typography>There has been no medical record yet.</Typography>
        ) : (
          records.map((record, index) => (
            <Accordion key={index}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{record?.medicalExamDay}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <MedicalRecord
                  diagnoseDisease={record?.diagnoseDisease}
                  symptom={record?.symptom}
                  treatment={record?.treatment}
                  doctor={record?.doctor}
                  emailDoctor={record?.emailDoctor}
                  medicalExamDay={record?.medicalExamDay}
                  pill={record?.pill}
                  quantity={record?.quantity}
                  timeperday={record?.timeperday}
                  dayofsurgery={record?.dayofsurgery}
                />
              </AccordionDetails>
            </Accordion>
          ))
        )}
        {user?.role === "doctor" && (
          <div className={classes.createRecord}>
            <ButtonInfor variant="contained" onClick={handleClickOpen}>
              New Medical Record
            </ButtonInfor>
          </div>
        )}
        <NewMedicalRecord
          open={open}
          handleAddRecord={handleAddRecord}
          onClose={handleClose}
          userId={userId}
          recordId={recordId}
        />
      </div>
    </div>
  );
};

export default MedicalHistory;
