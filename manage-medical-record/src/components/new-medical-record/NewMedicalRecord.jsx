import { Button, MenuItem } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { Formik } from "formik";
import PropTypes from "prop-types";
import React from "react";
import * as Yup from "yup";
import Input from "../../common/input/Input";
import InputSelect from "../../common/inputselect/InputSelect";
import classes from "./NewMedicalRecord.module.scss";

export default function NewMedicalRecord(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const createMedical = async (values) => {};

  const MedicalSchema = Yup.object().shape({
    diagnoseDisease: Yup.string().required("Required"),
    symptom: Yup.string().required("Required"),
    treatment: Yup.string().required("Required"), //nếu có chọn uống thuốc
    doctor: Yup.string().required("Required"),
    emailDoctor: Yup.string().required("Required"),
    createAt: Yup.string().required("Required"),
  });

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Create Medical Record</DialogTitle>
      <Formik
        initialValues={{
          diagnoseDisease: "",
          symptom: "",
          treatment: "take medicine",
          doctor: "",
          emailDoctor: "",
          createAt: "",
        }}
        validationSchema={MedicalSchema}
        validate={() => {
          const errors = {};
          return errors;
        }}
        onSubmit={createMedical}
      >
        {({
          values,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              name="diagnoseDisease"
              label="Diagnose Disease"
              onChange={handleChange}
              onBlur={handleBlur}
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
            <Input
              type="text"
              name="doctor"
              label="Doctor"
              onChange={handleChange}
              onBlur={handleBlur}
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
              value={values.emailDoctor}
              error={!!errors.emailDoctor}
              helperText={errors.emailDoctor}
            />
            <Input
              type="datetime-local"
              name="createAt"
              label="Create At"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.createAt}
              error={!!errors.createAt}
              helperText={errors.createAt}
            />
            <div className={classes.buttonInfor}>
              <Button type="submit" disabled={isSubmitting}>
                Create an account
              </Button>
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
