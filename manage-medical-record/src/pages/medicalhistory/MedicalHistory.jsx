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
  const [patient, setPatient] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [records, setRecords] = React.useState([]);

  useEffect(() => {
    const authenticatedUser = JSON.parse(localStorage.getItem("user"));
    if (authenticatedUser) setUser(authenticatedUser);
    axios.get(`/medical-records/${userId}`).then((response) => {
      setRecords(response?.data?.result?.records || []);
      setPatient(response?.data?.result?.user);
    });
  }, [userId, recordId]);

  console.log("test", { userId, recordId });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddRecord = (record) => {
    setRecords([...records, record]);
  };
  const getAge = (birthday) => {
    const today = new Date();
    const birthDate = new Date(birthday);
    const age = today.getFullYear() - birthDate.getFullYear();
    return age;
  };

  return (
    <div className={classes.container}>
      <div className={classes.record}>
        <h1>Patient Information</h1>
        <div className={classes.patientInfor}>
          <Typography>Patient name: {patient?.name}</Typography>
          <Typography>Health insurance code : {patient?.mabhyt}</Typography>
          <Typography>Gender : {patient?.gender}</Typography>
          <Typography>Age : {getAge(patient?.birthday)}</Typography>
        </div>
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
        {records?.length === 0 ? (
          <Typography>There has been no medical record yet.</Typography>
        ) : (
          <>
            <h1>Medical History</h1>
            {records.map((record, index) => (
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
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default MedicalHistory;
