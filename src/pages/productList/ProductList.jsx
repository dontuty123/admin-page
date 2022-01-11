import "./productList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../../redux/apiCalls";
import { useState } from "react";
import { userRequest } from "../../requestMethod";

export default function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const [pro, setPro] = useState([]);

  const reload = () => {
    window.location.reload(false);
  };

  useEffect(() => {
    const getPro = async () => {
      try {
        const res = await userRequest.get("products");
        const list = res.data
          .sort((a, b) => {
            return (
              new Date(a.scheduled_for).getTime() -
              new Date(b.scheduled_for).getTime()
            );
          })
          .reverse();
        setPro(list);
      } catch {}
    };
    getPro();
  }, []);

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteProduct(id, dispatch);
    reload();
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img src={params.row.img} alt="" className="productListImg" />
            {params.row.title}
          </div>
        );
      },
    },
    {
      field: "inStock",
      headerName: "Stock",
      width: 150,
    },
    {
      field: "price",
      headerName: "Price",
      width: 90,
    },
    {
      field: "action",
      headerName: "Action",
      width: 170,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <Link to="/newproduct" className="link">
              <button className="productListAddButton">Create</button>
            </Link>

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
        rows={pro}
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
