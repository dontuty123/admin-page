import "./userList.css";
import { DataGrid } from "@mui/x-data-grid";
import { Add, DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUser } from "../../redux/apiCalls";
import { userRequest } from "../../requestMethod";

export default function UserList() {
  // const [data, setData] = useState(userRows);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const [userss, setUserss] = useState([]);

  const reload = () => {
    window.location.reload(false);
  };

  useEffect(() => {
    const getUserss = async () => {
      try {
        const res = await userRequest.get("users");
        const list = res.data
          .sort((a, b) => {
            return (
              new Date(a.scheduled_for).getTime() -
              new Date(b.scheduled_for).getTime()
            );
          })
          .reverse();
        setUserss(list);
      } catch {}
    };
    getUserss();
  }, []);

  useEffect(() => {
    getUser(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteUser(id, dispatch);
    reload();
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "user",
      headerName: "User",
      width: 170,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img src={params.row.image} alt="" className="userListImg" />
            {params.row.username}
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 185,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      width: 140,
    },
    {
      field: "action",
      headerName: "Action",
      width: 170,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>

            <Link to="/newUser" className="link">
              <button className="userlistAddButton"> Create </button>
            </Link>

            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={userss}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
    </div>
  );
}
