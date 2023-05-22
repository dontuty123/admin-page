// import { useEffect, useState } from "react";
// import { userRequest } from "../../requestMethod";
// import "./transaction.css";
// import { format } from "timeago.js";
// import { Link } from "react-router-dom";

// export default function Transaction() {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     const getOrders = async () => {
//       try {
//         const res = await userRequest.get("orders");
//         const list = res.data
//           .sort((a, b) => {
//             return (
//               new Date(a.scheduled_for).getTime() -
//               new Date(b.scheduled_for).getTime()
//             );
//           })
//           .reverse();
//         setOrders(list);
//       } catch {}
//     };
//     getOrders();
//   }, []);

//   const Button = ({ type }) => {
//     return <button className={"transactionButton " + type}>{type}</button>;
//   };
//   return (
//     <div className="transaction">
//       <h3 className="transactionTitle">Lasted transactions</h3>
//       <table className="transactionTable">
//         <tbody>
//           <tr className="transactionTr">
//             <th className="transactionth">Customer</th>
//             <th className="transactionth">Date</th>
//             <th className="transactionth">Amount</th>
//             <th className="transactionth">Status</th>
//           </tr>
//           {orders.map((orders) => (
//             <tr className="transactionTr" key={orders._id}>
//               <td className="transactionUser">
//                 <span className="transactionName">{orders.username}</span>
//               </td>
//               <td className="transactionDate">{format(orders.createdAt)}</td>
//               <td className="transactionAmount">${orders.amount}</td>
//               <td className="transactionStatus">
//                 <Button type={orders.status} />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

import "./transaction.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, getOrders, updateOrder } from "../../redux/apiCalls";
import { useState } from "react";
import { userRequest } from "../../requestMethod";

export default function Transaction() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);
  const [ord, setOrd] = useState([]);
  const [changeOrder, setChangeOrder] = useState([]);

  console.log("ord", ord);

  const handleChangeStatus = async (value, params) => {
    const ord = params?.row || {};
    const rs = await userRequest.put(`orders/${params?.id}`, {
      ...ord,
      status: value,
    });
    if (rs.status == 200) {
      alert("Cap nhat thanh cong");
      await getOrd();
    } else {
      alert("Loi he thong");
    }
  };

  const getOrd = async () => {
    try {
      const res = await userRequest.get("orders");
      const list = res.data
        .sort((a, b) => {
          return (
            new Date(a.scheduled_for).getTime() -
            new Date(b.scheduled_for).getTime()
          );
        })
        .reverse();
      setOrd(list);
    } catch {}
  };
  useEffect(() => {
    getOrd();
  }, []);

  const handleDelete = async (id) => {
    const rs = await deleteOrder(id, dispatch);
    if (rs === 200) {
      await getOrd();
    }
  };

  useEffect(() => {
    getOrders(dispatch);
  }, [dispatch]);

  const columns = [
    { field: "fullname", headerName: "User Name", width: 120 },
    {
      field: "phone",
      headerName: "Phone",
      width: 200,
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 150,
    },
    {
      field: "address",
      headerName: "Address",
      width: 150,
    },
    {
      field: "status",
      headerName: "Status",
      width: 110,

      renderCell: (params) => {
        const disabled = params.row.status === "approve";
        return (
          <>
            <select
              value={params.row.status}
              name="status"
              disabled={disabled}
              onChange={(e) => handleChangeStatus(e.target.value, params)}
              className="status"
            >
              <option value="pending">Pending</option>
              <option value="approve">Approved</option>
            </select>
          </>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 120,
      renderCell: (params) => {
        return (
          <>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={ord}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
    </div>
  );
}
