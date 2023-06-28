import { Alert, Box, MenuItem, Snackbar, Stack } from "@mui/material";
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
import TextArea from "../../common/text-area/TextArea";
export default function NewMedicalRecord(props) {
  const { onClose, selectedValue, open, userId, recordId, handleAddRecord } =
    props;

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
    emailDoctor: Yup.string().email().required("Required"),
    medicalExamDay: Yup.string().required("Required"),
  });

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle sx={{ pl: "50px" }}>Create Medical Record</DialogTitle>
      <Formik
        initialValues={{
          diagnoseDisease: "",
          symptom: "",
          treatment: null,
          emailDoctor: "",
          pill: "",
          quantity: "",
          timeperday: "",
          dayofsurgery: "",
          note: "",
          medicalExamDay: "",
        }}
        validationSchema={MedicalSchema}
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
              <MenuItem value="other">Other</MenuItem>
            </InputSelect>
            {values.treatment === "take medicine" && (
              <Stack direction="row" spacing={1}>
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
              </Stack>
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
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
            {values.treatment === "other" && (
              <TextArea
                onChange={handleChange}
                name="note"
                value={values.note}
                placeholder="Note"
              />
            )}
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
              label="Medical Examination Day"
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth="true"
              value={values.medicalExamDay}
              error={!!errors.medicalExamDay}
              helperText={errors.medicalExamDay}
              InputLabelProps={{
                shrink: true,
              }}
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
