import React, { useEffect, useState } from "react";
import classes from "./Chatbox.module.scss";
import { Box, Grid, SnackbarContent, Stack } from "@mui/material";
import Divider from "@mui/material/Divider";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import Cloud from "@mui/icons-material/Cloud";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import StatusAvatar from "../../components/avatars/StatusAvatar/StatusAvatar.avatar";
import UserAvatar from "../../components/avatars/UserAvatar/UserAvatar.avatar";
import ClearIcon from "@mui/icons-material/Clear";
import SocketIO from "socket.io-client";
import axios from "../../services/axios/axios.service";

const Chatbox = () => {
  const [socket, setSocket] = useState(null);
  const [friends, setFriends] = useState([]);
  const [searchedFriends, setSearchedFriends] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.userId) {
      axios
        .get(`/message/${user?.userId}`)
        .then((response) => setFriends(response.data?.result?.users));
    }

    // const connection = SocketIO('http://localhost:8081');

    // connection.on("connect", () => {
    //   console.log("connected socket");
    //   setSocket(connection);
    // });
  }, []);

  const handleSearch = (event) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.userId && event.target.value) {
      axios
        .get(`/message/${user?.userId}?name=${event.target.value}`)
        .then((response) => setSearchedFriends(response.data?.result?.users));
    } else {
      setSearchedFriends([]);
    }
  };

  return (
    <div className={classes.chatbox}>
      <Grid height="100%" container>
        <Grid
          sx={{ borderRight: "1px solid rgba(0, 0, 0, 0.12)" }}
          height="100%"
          xl={4}
          sm={4}
          p={3}
        >
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <IconButton sx={{ p: "10px" }} aria-label="menu">
              <MenuIcon />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search Google Maps"
              inputProps={{
                "aria-label": "search google maps",
                onChange: handleSearch,
              }}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton
              color="primary"
              sx={{ p: "10px" }}
              aria-label="directions"
            >
              <DirectionsIcon />
            </IconButton>
          </Paper>
          <MenuList>
            {searchedFriends.map((friend, index) => (
              <MenuItem key={index}>
                <Box display="flex" alignItems="center">
                  <ListItemIcon>
                    <StatusAvatar>{friend?.name}</StatusAvatar>
                  </ListItemIcon>
                  <ListItemText sx={{ margin: "0 10px" }}>
                    <Typography m={0} variant="body1" gutterBottom>
                      {friend?.name}
                    </Typography>

                    <Typography
                      m={0}
                      variant="caption"
                      display="block"
                      gutterBottom
                    >
                      {friend?.content}
                    </Typography>
                  </ListItemText>
                </Box>
              </MenuItem>
            ))}
            {friends.map((friend, index) => (
              <MenuItem key={index}>
                <Box display="flex" alignItems="center">
                  <ListItemIcon>
                    <StatusAvatar>{friend?.name}</StatusAvatar>
                  </ListItemIcon>
                  <ListItemText sx={{ margin: "0 10px" }}>
                    <Typography m={0} variant="body1" gutterBottom>
                      {friend?.name}
                    </Typography>

                    <Typography
                      m={0}
                      variant="caption"
                      display="block"
                      gutterBottom
                    >
                      {friend?.content}
                    </Typography>
                  </ListItemText>
                </Box>
              </MenuItem>
            ))}
            <Divider />
            <MenuItem>
              <ListItemIcon>
                <Cloud fontSize="small" />
              </ListItemIcon>
              <ListItemText>Web Clipboard</ListItemText>
            </MenuItem>
          </MenuList>
        </Grid>
        <Grid xl={8} sm={8}>
          <Box
            p={1}
            height="70px"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box display="flex" alignItems="center">
              <UserAvatar>Ngoc Chau</UserAvatar>
              <Typography marginLeft={2} variant="h6" gutterBottom>
                Ngoc Chau
              </Typography>
            </Box>
            <IconButton>
              <ClearIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
              borderTop: "1px solid rgba(0, 0, 0, 0.12)",
            }}
            height="calc(100% - 140px)"
            p={3}
          >
            <Box display="flex" alignItems="start">
              <UserAvatar>Ngoc Chau</UserAvatar>
              <SnackbarContent
                sx={{
                  width: "max-content",
                  marginLeft: "10px",
                  padding: "0px 16px",
                }}
                message="I love snacks."
              />
            </Box>
          </Box>
          <Box display="flex" alignItems="center" height="70px">
            <Box
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: "100%",
              }}
            >
              <IconButton sx={{ p: "10px" }} aria-label="menu">
                <MenuIcon />
              </IconButton>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search Google Maps"
                inputProps={{ "aria-label": "search google maps" }}
              />
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <IconButton
                color="primary"
                sx={{ p: "10px" }}
                aria-label="directions"
              >
                <DirectionsIcon />
              </IconButton>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Chatbox;
