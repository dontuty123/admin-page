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
import { Link, useLocation } from "react-router-dom";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/apiCalls";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function User() {
  const [inputs, setInputs] = useState([]);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const [img, setImg] = useState();
  const history = useHistory();

  const location = useLocation();
  const userId = location.pathname.split("/")[2];

  // const handleChange = (e) => {
  //   setInputs((prev) => {
  //     return { ...prev, [e.target.name]: e.target.value };
  //   });
  // };

  const user = useSelector((state) =>
    state.user.currentUser.find((user) => user._id === userId)
  );

  // const handleClick = (e) => {
  //   e.preventDefault();
  //   const fileName = new Date().getTime() + file.name;
  //   const storage = getStorage(app);
  //   const storageRef = ref(storage, fileName);
  //   const uploadTask = uploadBytesResumable(storageRef, file);

  //   // Register three observers:
  //   // 1. 'state_changed' observer, called any time the state changes
  //   // 2. Error observer, called on failure
  //   // 3. Completion observer, called on successful completion
  //   uploadTask.on(
  //     "state_changed",
  //     (snapshot) => {
  //       // Observe state change events such as progress, pause, and resume
  //       // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  //       const progress =
  //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //       console.log("Upload is " + progress + "% done");
  //       switch (snapshot.state) {
  //         case "paused":
  //           console.log("Upload is paused");
  //           break;
  //         case "running":
  //           console.log("Upload is running");
  //           break;
  //         default:
  //       }
  //     },
  //     (error) => {
  //       // Handle unsuccessful uploads
  //     },
  //     () => {
  //       // Handle successful uploads on complete
  //       // For instance, get the download URL: https://firebasestorage.googleapis.com/...
  //       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //         // const userz = { ...inputs, img: downloadURL };
  //         // updateUser(userz, dispatch);
  //         setImg(downloadURL);
  //       });
  //     }
  //   );
  // };
  const [data, setData] = useState({
    username: user.username,
    fullname: user.fullname,
    email: user.email,
    phone: user.phone,
    address: user.address,
  });

  function handle(e) {
    const user = { ...data };
    user[e.target.id] = e.target.value;
    setData(user);
    console.log(user);
  }

  function update(e) {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/users/${userId}`, {
        username: data.username,
        fullname: data.fullname,
        email: data.email,
        phone: data.phone,
        address: data.address,
      })
      .then((res) => {
        console.log(res);
      });
    alert("Cập nhật thành công");
    history.push("/users");
  }

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
            <img src={user.image} alt="" className="userShowImg" />
            <div className="userShowTopTitle">
              <span className="userShowUserName">{user.fullname}</span>
            </div>
          </div>

          {/* Bottom details */}
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{user.username}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{user.birth}</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <Call className="userShowIcon" />
              <span className="userShowInfoTitle">{user.phone}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">{user.address}</span>
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
                  name="username"
                  type="text"
                  placeholder={user.username}
                  onChange={(e) => handle(e)}
                  value={data.username}
                  className="userUpdateInput"
                  id="username"
                />
              </div>
              <div className="userUpdateItem">
                <label>Full name</label>
                <input
                  name="fullname"
                  type="text"
                  placeholder={user.fullname}
                  onChange={(e) => handle(e)}
                  value={data.fullname}
                  className="userUpdateInput"
                  id="fullname"
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  name="email"
                  type="text"
                  placeholder={user.email}
                  onChange={(e) => handle(e)}
                  value={data.email}
                  id="email"
                  className="userUpdateInput"
                />
              </div>
            </div>

            {/* Right site */}
            <div className="userUpdateRight">
              <div className="userUpdateItem">
                <label>Phone number</label>
                <input
                  name="phone"
                  type="text"
                  placeholder={user.phone}
                  onChange={(e) => handle(e)}
                  value={data.phone}
                  className="userUpdateInput"
                  id="phone"
                />
              </div>
              <div className="userUpdateItem">
                <label>Address</label>
                <input
                  name="address"
                  type="text"
                  placeholder={user.address}
                  onChange={(e) => handle(e)}
                  value={data.address}
                  className="userUpdateInput"
                  id="address"
                />
              </div>
              <button className="userUpdateBottom" onClick={update}>
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
