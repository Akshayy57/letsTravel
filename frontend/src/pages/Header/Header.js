import React, { useContext, useState, useEffect } from "react";
import { Avatar, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import ContextApi from "../../context-api/context-api";
import LoginModal from "../../components/login-modal/login-modal";
import SnackBar from "../../components/snack-bar/snakc-bar";
import { IconButton } from "@material-ui/core/";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function Header() {
  const { dispatchUserEvent, state } = useContext(ContextApi);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();
  const [loginCreds, setLoginCreds] = useState([]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Opening Modal
  const openLoginModal = () => {
    dispatchUserEvent("LOGIN", { login: true });
  };

  const openRegisterModal = () => {
    dispatchUserEvent("REGISTER", { register: true });
  };

  const handleSnack = (data) => {
    getUserData();
    if (data.class === "success") {
      handleClose();
      toast.success(`${data.message}`);
    } else {
      toast.error(`${data.message}`);
    }
  };

  const getUserData = () => {
    const USER_DATA = JSON.parse(localStorage.getItem("user_data"));
    setLoginCreds(USER_DATA);
    dispatchUserEvent("LOGIN_TOKEN", { creds: [USER_DATA] });
  };

  // LogOut
  const handleLogout = () => {
    toast.success("Logout Successfully");
    localStorage.clear();
    setLoginCreds([]);
  };

  // Booking
  const handleBookingHistory = () => {
    console.log("Booking History");
    history.push("/history");
    dispatchUserEvent("BOOKING_HISTORY");
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="header">
      <Link to="/" className="header__link">
        <Typography variant="h1" className="header__icon">
          Lets Travel
        </Typography>
      </Link>

      {/* Trial */}
      <div>
        <ul className="link f_flex uppercase">
          <li>
            <a href="#clients">Clients</a>
          </li>
          {/* <li>
            <a href="#blog">Blog</a>
          </li> */}
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </div>
      {/* Trial */}

      <div className="header__right">
        {loginCreds && loginCreds.token ? (
          <div className="d-flex align-items-center">
            <p className="mb-0 fw-bolder">{loginCreds.full_name}</p>
            <IconButton
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleBookingHistory}>My Bookings</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        ) : (
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button
              className="btn btn-primary me-md-2 btn-login"
              type="button"
              onClick={openLoginModal}
            >
              Log In
            </button>
            <button
              className="btn btn-dark"
              type="button"
              onClick={openRegisterModal}
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
      {state.login ? (
        <LoginModal handleSnack={handleSnack} />
      ) : (
        state.register && <LoginModal handleSnack={handleSnack} />
      )}
      <ToastContainer />
    </div>
  );
}

export default Header;
