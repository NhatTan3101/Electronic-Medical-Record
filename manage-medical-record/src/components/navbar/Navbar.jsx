import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { alpha, styled } from "@mui/material/styles";
import * as React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Popover from "../../common/popover/Popover";
import axios from "../../services/axios/axios.service";
import AvatarItem from "../avatars/AvatarItem/AvatarItem.avatar";
import UserAvatar from "../avatars/UserAvatar/UserAvatar.avatar";
import classes from "./Navbar.module.scss";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const navigate = useNavigate();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  useEffect(() => {
    const authenticatedUser = localStorage.getItem("user");
    if (authenticatedUser) setUser(JSON.parse(authenticatedUser));
  }, []);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSearch = async (event) => {
    setKeyword(event.target.value);
    const response = await axios.get("user", {
      params: { mabhyt: event.target.value },
    });
    setSearchedUsers(response.data?.result?.users || []);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleProfile = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    if(user?.role === "doctor"){
      navigate("/doctor-profile");
    }
    if(user?.role === "patient"){
      navigate("/patient-profile");
    }
  };

  const handleTryNow = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    handleTryNow();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 50,
        horizontal: "center",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {user !== null ? (
        <>
          <MenuItem onClick={handleProfile}>Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </>
      ) : (
        <MenuItem onClick={handleTryNow}>Try now</MenuItem>
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>{user?.name}</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              display: { xs: "none", sm: "block" },
              fontWeight: "530",
              marginRight: 3,
            }}
          >
            EMRS
          </Typography>
          {user?.role === "doctor" && (
            <Popover
              open={!!keyword}
              renderContainer={() => (
                <div>
                  <Search>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder="Search…"
                      inputProps={{ "aria-label": "search" }}
                      onChange={handleSearch}
                    />
                  </Search>
                </div>
              )}
              content={
                <div className={classes.popover}>
                  {searchedUsers.map((searchedUser, index) => (
                    <Link
                      key={index}
                      to={`/history/${searchedUser?.userId}`}
                      className={classes.linkToPage}
                      onClick={() => setKeyword(!keyword)}
                    >
                      <AvatarItem
                        key={index}
                        name={searchedUser?.name}
                        code={searchedUser?.mabhyt}
                      />
                    </Link>
                  ))}
                </div>
              }
            />
          )}
          <Box
            sx={{
              flexGrow: 1,
              pr: 20,
              textAlign: "right",
            }}
          >
            <Link to="/" className={classes.linkToPage}>
              Home
            </Link>
            <Link to="/about" className={classes.linkToPage}>
              About
            </Link>
            {user === null ? (
              <>
                <Link to="/login" className={classes.linkToPage}>
                  Login
                </Link>
                <Link to="/register" className={classes.linkToPage}>
                  Register
                </Link>
              </>
            ) : user.role === "patient" ? (
              <>
                <Link to="/history" className={classes.linkToPage}>
                  My Medical History
                </Link>
                <Link to="/patient-profile" className={classes.linkToPage}>
                  Profile
                </Link>
              </>
            ) : (
              <>
                <Link to="/notification" className={classes.linkToPage}>
                  Notification
                </Link>
                <Link to="/doctor-profile" className={classes.linkToPage}>
                  Profile
                </Link>
              </>
            )}
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {/* <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {user ? (
                <UserAvatar>{user?.name}</UserAvatar>
              ) : (
                <Avatar src="/broken-image.jpg" />
              )}
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
