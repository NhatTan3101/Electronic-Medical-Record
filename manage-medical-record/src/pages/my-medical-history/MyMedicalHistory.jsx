import classes from "../medicalhistory/MedicalHistory.module.scss";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import React, { useEffect } from "react";
import MedicalRecord from "../../components/medical-record/MedicalRecord";
import axios from "../../services/axios/axios.service";

const MyMedicalHistory = () => {
  const [records, setRecords] = React.useState([]);
  useEffect(() => {
    const { userId } = JSON.parse(localStorage.getItem("user"));
    axios.get(`/medical-records/${userId}`).then((response) => {
        setRecords(response?.data?.result?.records || []);
      });
  }, []);

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
      </div>
    </div>
  );
};

export default MyMedicalHistory;
