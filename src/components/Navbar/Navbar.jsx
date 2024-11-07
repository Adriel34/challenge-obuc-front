import PropTypes from "prop-types";
import "./Navbar.css";
import obucLogo from "../../assets/obuc-logo.png";
import { GoGear } from "react-icons/go";
import { PiLayout } from "react-icons/pi";
import { MdExitToApp } from "react-icons/md";
import { Button } from "@mui/material";

export default function Navbar({ currentTab, setCurrentTab }) {
  const navButtons = [
    { id: 1, label: "Board", icon: <PiLayout />, value: "board" },
    { id: 2, label: "Category", icon: <GoGear />, value: "tags" },
  ];

  const handleLogout = () => {
    localStorage.removeItem('ACCESS_TOKEN');
    window.location.href = '/login';
  };

  return (
    <div className="navbar-wrapper">
      <img className="navbar-logo" src={obucLogo} alt="Obuc logo" />
      <div className="buttons-wrapper">
        {navButtons.map((button) => (
          <button
            key={button.id}
            className={`nav-button ${currentTab === button.value ? "active" : ""}`}
            onClick={() => {
              setCurrentTab(button.value);
            }}
          >
            {button.icon}
            {button.label}
          </button>
        ))}
      </div>
      <Button
        variant="contained"
        color="primary"
        startIcon={<MdExitToApp />}
        onClick={() => handleLogout()}
      >
        Logout
      </Button>
    </div>
  );
}

Navbar.propTypes = {
  currentTab: PropTypes.string.isRequired,
  setCurrentTab: PropTypes.func.isRequired,
};
