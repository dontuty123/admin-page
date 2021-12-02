import "./user.css";
import {
  Add,
  PermIdentity,
  CalendarToday,
  Call,
  MailOutline,
  LocationSearching,
  Publish,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function User() {
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser" className="link">
          <button className="userAddButton">
            <Add className="userIcon" /> Create
          </button>
        </Link>
      </div>
      <div className="userContainer">
        {/* User show flex 1 */}
        <div className="userShow">
          {/* Top details */}
          <div className="userShowTop">
            <img src="/images/avatar.jpg" alt="" className="userShowImg" />
            <div className="userShowTopTitle">
              <span className="userShowUserName">Thuc Pham</span>
              <span className="userShowUserTitle">Frontend Dev</span>
            </div>
          </div>

          {/* Bottom details */}
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">thucpham22</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">22/02/2000</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <Call className="userShowIcon" />
              <span className="userShowInfoTitle">0123 456 737</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">thuc@gmail.com</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">New York - USA</span>
            </div>
          </div>
        </div>

        {/* User Update flex 2 */}
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            {/* Left site of this form */}
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  placeholder="thucpham22"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Full name</label>
                <input
                  type="text"
                  placeholder="Thuc Pham"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder="thuc@gmail.com"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Phone number</label>
                <input
                  type="text"
                  placeholder="0123 456 737"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Address</label>
                <input
                  type="text"
                  placeholder="New York - USA"
                  className="userUpdateInput"
                />
              </div>
            </div>

            {/* Right site */}
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  src="/images/avatar.jpg"
                  alt=""
                  className="userUpdateImg"
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button className="userUpdateBottom">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
