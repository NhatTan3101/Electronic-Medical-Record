import { MenuItem } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { Formik } from "formik";
import PropTypes from "prop-types";
import React from "react";
import * as Yup from "yup";
import ButtonInfor from "../../common/button/ButtonInfor";
import Input from "../../common/input/Input";
import InputSelect from "../../common/inputselect/InputSelect";
import axios from "../../services/axios/axios.service";
import classes from "./NewMedicalRecord.module.scss";
export default function NewMedicalRecord(props) {
  const { onClose, selectedValue, open, userId, recordId, handleAddRecord } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const createMedicalRecord = async (values) => {
    try {
      handleAddRecord(values);
      await axios.post(`/medical-records/${userId}/${recordId}`, values);
    } catch (error) {
      console.log(error);
    }
  };

  const MedicalSchema = Yup.object().shape({
    diagnoseDisease: Yup.string().required("Required"),
    symptom: Yup.string().required("Required"),
    treatment: Yup.string().required("Required"),
    doctor: Yup.string().required("Required"),
    emailDoctor: Yup.string().required("Required"),
    medicalExamDay: Yup.string().required("Required"),
    pill: Yup.string().required("Required"),
    quantity: Yup.string().required("Required"),
    timeperday: Yup.date().required("Required"),
    dayofsurgery: Yup.date().required("Required"),
  });

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle sx={{ pl: "50px" }}>Create Medical Record</DialogTitle>
      <Formik
        initialValues={{
          diagnoseDisease: "",
          symptom: "",
          treatment: "take medicine",
          doctor: "",
          emailDoctor: "",
          medicalExamDay: "",
          pill: "",
          quantity: "",
          timeperday: "",
          dayofsurgery: "",
        }}
        // validationSchema={MedicalSchema}
        onSubmit={createMedicalRecord}
      >
        {({
          values,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form className={classes.container} onSubmit={handleSubmit}>
            <Input
              type="text"
              name="diagnoseDisease"
              label="Diagnose disease"
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth="true"
              value={values.diagnoseDisease}
              error={!!errors.diagnoseDisease}
              helperText={errors.diagnoseDisease}
            />
            <Input
              type="text"
              name="symptom"
              label="Symptom"
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth="true"
              value={values.symptom}
              error={!!errors.symptom}
              helperText={errors.symptom}
            />
            <InputSelect
              name="treatment"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.treatment}
              inputLabel="Treatment"
            >
              <MenuItem value="take medicine">Take medicine</MenuItem>
              <MenuItem value="surgery">Surgery</MenuItem>
              <MenuItem value="acupuncture">Acupuncture</MenuItem>
            </InputSelect>
            {values.treatment === "take medicine" && (
              <div style={{ display: "flex" }}>
                <Input
                  type="text"
                  name="pill"
                  label="Pill"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth="true"
                  value={values.pill}
                  error={!!errors.pill}
                  helperText={errors.pill}
                />
                <Input
                  type="text"
                  name="quantity"
                  label="Quantity"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth="true"
                  value={values.quantity}
                  error={!!errors.quantity}
                  helperText={errors.quantity}
                />
                <Input
                  type="text"
                  name="timeperday"
                  label="Times per day"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth="true"
                  value={values.timeperday}
                  error={!!errors.timeperday}
                  helperText={errors.timeperday}
                />
              </div>
            )}
            {values.treatment === "surgery" && (
              <Input
                type="date"
                name="dayofsurgery"
                label="Day of surgery"
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth="true"
                value={values.dayofsurgery}
                error={!!errors.dayofsurgery}
                helperText={errors.dayofsurgery}
              />
            )}
            <Input
              type="text"
              name="doctor"
              label="Doctor"
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth="true"
              value={values.doctor}
              error={!!errors.doctor}
              helperText={errors.doctor}
            />
            <Input
              type="email"
              name="emailDoctor"
              label="Email Doctor"
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth="true"
              value={values.emailDoctor}
              error={!!errors.emailDoctor}
              helperText={errors.emailDoctor}
            />
            <Input
              type="date"
              name="medicalExamDay"
              label="Medical examination day"
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth="true"
              value={values.medicalExamDay}
              error={!!errors.medicalExamDay}
              helperText={errors.medicalExamDay}
            />
            <div className={classes.buttonInfor}>
              <ButtonInfor
                type="submit"
                disabled={isSubmitting}
                onClick={handleClose}
              >
                Create an account
              </ButtonInfor>
            </div>
          </form>
        )}
      </Formik>
    </Dialog>
  );
}
NewMedicalRecord.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
