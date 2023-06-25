import { Button, DialogTitle, Stack, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import React, { useState, useEffect } from "react";
import Input from "../../../common/input/Input";
import { Calendar } from "../../../components/calendars";
import classes from "./ScheduleCalendarPatient.module.scss";
import TextArea from "../../../common/text-area/TextArea";
import axios from "../../../services/axios/axios.service";

export const ScheduleCalendarPatient = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get("/schedule/patient").then((response) => {
      const customEvents = response.data?.result?.events?.map((event) => ({
        id: event?.scheduleId,
        title: `${event?.note} (${event?.doctorName})`,
        start: new Date(event?.time),
        end: new Date(event?.time),
      }));
      setEvents(customEvents);
    });
  }, []);

  return (
    <div className={classes.scheduleCalendar}>
      <div className={classes.header}>
        <Stack
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
        >
          <Typography variant="h5">Schedule Calendar</Typography>
        </Stack>
      </div>
      <div className={classes.body}>
        <Calendar events={events} />
      </div>
    </div>
  );
};
