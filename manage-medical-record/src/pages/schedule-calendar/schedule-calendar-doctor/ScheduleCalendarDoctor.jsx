import {
  Autocomplete,
  Button,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import React, { useEffect, useState } from "react";
import Input from "../../../common/input/Input";
import { Calendar } from "../../../components/calendars";
import classes from "./ScheduleCalendarDoctor.module.scss";
import TextArea from "../../../common/text-area/TextArea";
import axios from "../../../services/axios/axios.service";
import Popover from "../../../common/popover/Popover";
import AvatarItem from "../../../components/avatars/AvatarItem/AvatarItem.avatar";
import UserAvatar from "../../../components/avatars/UserAvatar/UserAvatar.avatar";

export const ScheduleCalendarDoctor = () => {
  const [events, setEvents] = useState([]);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [event, setEvent] = useState({
    time: "",
    note: "",
    patientId: "",
  });

  const handleOpen = () => setIsOpen(true);

  const handleClose = () => setIsOpen(false);

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const addSchedule = () => {
    axios.post("/schedule", event).then((response) => {
      // show message
      const name = searchedUsers?.find((user) => event?.patientId === user?.userId)?.name;

      const newEvent = {
        title: `${event?.note} (${name})`,
        start: event?.time,
        end: event?.time,
      };
      setEvents([...events, newEvent]);
    });
  };

  const handleSearch = async (event) => {
    setKeyword(event?.target?.value);
  };

  const handleChoose = (id) => {
    setEvent({
      ...event,
      patientId: id,
    });
  };

  useEffect(() => {
    axios.get("/schedule/doctor").then((response) => {
      const customEvents = response.data?.result?.events?.map((event) => ({
        id: event?.scheduleId,
        title: `${event?.note} (${event?.patientName})`,
        start: new Date(event?.time),
        end: new Date(event?.time),
      }));
      setEvents(customEvents);
    });

    axios
      .get("user")
      .then((response) =>
        setSearchedUsers(
          response.data?.result?.users?.filter(
            (event) => event?.role === "patient"
          ) || []
        )
      );
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
          <Button variant="contained" onClick={handleOpen}>
            Add a schedule
          </Button>
        </Stack>
      </div>
      <div className={classes.body}>
        <Calendar events={events} />
      </div>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>Schedule Form</DialogTitle>
        <Stack>
          <form className={classes.appointmentForm}>
            <Autocomplete
              multiple
              sx={{ marginBottom: "10px" }}
              inputValue={keyword}
              options={searchedUsers}
              getOptionLabel={(option) => option?.name}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Button
                    disabled={selected}
                    p={0}
                    className={classes.avatarItem}
                    onClick={() => handleChoose(option?.userId)}
                  >
                    <AvatarItem name={option?.name} code={option?.mabhyt} />
                  </Button>
                </li>
              )}
              renderTags={(selected) => {
                const item = selected?.find(
                  (item) => item?.userId === event?.patientId
                );
                return (
                  item && (
                    <Stack
                      display="flex"
                      direction="row"
                      alignItems="center"
                      spacing={1}
                    >
                      <UserAvatar
                        sx={{
                          width: "25px",
                          height: "25px",
                          fontSize: ".7rem",
                        }}
                      >
                        {item?.name}
                      </UserAvatar>
                      <Typography sx={{ fontSize: ".7rem" }} variant="caption">
                        {item?.name}
                      </Typography>
                    </Stack>
                  )
                );
              }}
              filterOptions={() =>
                keyword
                  ? searchedUsers?.filter((user) =>
                      user?.mabhyt
                        ?.toUpperCase()
                        .includes(keyword?.toUpperCase())
                    )
                  : searchedUsers
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Patient"
                  onChange={handleSearch}
                  size="small"
                />
              )}
            />
            <Input
              type="datetime-local"
              name="time"
              label="Choose Date"
              fullWidth="true"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleChange}
            />
            <TextArea
              onChange={handleChange}
              name="note"
              value={event?.note}
              placeholder="Note for reason"
            />
            <div className={classes.makeButton}>
              <Button onClick={addSchedule} variant="contained">
                Make an appointment
              </Button>
            </div>
          </form>
        </Stack>
      </Dialog>
    </div>
  );
};
