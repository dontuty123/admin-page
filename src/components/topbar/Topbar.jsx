import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/apiCalls";

export default function Topbar() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user?.currentUser);

  console.log(user);

  const handlelogout = () => {
    let obj = localStorage.getItem("persist:root");
    obj = JSON.parse(obj);
    obj = JSON.parse(obj?.user);
    obj.currentUser = null;
    localStorage.setItem("persist:root", JSON.stringify(obj));
    window.location.href = "login";
  };
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">DEHIGH ADMIN</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <img src="/images/avatar.jpg" alt="" className="topAvatar" />
          <button className="logout" onClick={() => handlelogout()}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
