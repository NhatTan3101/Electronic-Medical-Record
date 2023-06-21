import { Popover } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React from "react";

const MedicalRecord = ({
  diagnoseDisease,
  symptom,
  treatment,
  doctor,
  emailDoctor,
  medicalExamDay,
  pill,
  quantity,
  timeperday,
  dayofsurgery,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Diagnose Disease</TableCell>
            <TableCell align="left">Symptom</TableCell>
            <TableCell align="left">Treatment</TableCell>
            <TableCell align="left">Doctor</TableCell>
            <TableCell align="left">Email Doctor</TableCell>
            <TableCell align="left">Medical examination day</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell align="left">{diagnoseDisease}</TableCell>
            <TableCell align="left">{symptom}</TableCell>
            <TableCell
              align="left"
              onMouseEnter={handlePopoverOpen}
              onMouseLeave={handlePopoverClose}
            >
              {treatment}
            </TableCell>
            {treatment === "take medicine" && (
              <Popover
                id="mouse-over-popover"
                sx={{
                  pointerEvents: "none",
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
              >
                {treatment === "take medicine" ? (
                  <Table sx={{ minWidth: 250 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="left">Pill</TableCell>
                        <TableCell align="left">Quantity</TableCell>
                        <TableCell align="left">Time per day</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="center">{pill}</TableCell>
                        <TableCell align="center">{quantity}</TableCell>
                        <TableCell align="center">{timeperday}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                ) : (
                  treatment === "surgery" && (
                    <>
                      <Table sx={{ minWidth: 250 }} aria-label="simple table">
                        <TableRow>
                          <TableCell align="left">Day of surgery</TableCell>
                        </TableRow>
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell align="left">{dayofsurgery}</TableCell>
                        </TableRow>
                      </Table>
                    </>
                  )
                )}
              </Popover>
            )}
            <TableCell align="left">{doctor}</TableCell>
            <TableCell align="left">{emailDoctor}</TableCell>
            <TableCell align="left">{medicalExamDay}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MedicalRecord;
