import { Add, Publish } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import Chart from "../../components/chart/Chart";
import "./product.css";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethod";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { updateProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function Product() {
  const [inputs, setInputs] = useState([]);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [pStats, setPStats] = useState([]);

  console.log(inputs);

  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );

  const [data, setData] = useState({
    title: product.title,
    desc: product.desc,
    price: product.price,
    inStock: product.inStock,
  });

  function handle(e) {
    const product = { ...data };
    product[e.target.id] = e.target.value;
    setData(product);
    console.log(product);
  }

  function update(e) {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/products/${productId}`, {
        title: data.title,
        desc: data.desc,
        price: data.price,
        inStock: data.inStock,
      })
      .then((res) => {
        console.log(res);
      });
    alert("Cập nhật thành công");
    history.push("/products");
  }

  console.log(product);

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("orders/income?pid=" + productId);
        const list = res.data.sort((a, b) => {
          return a._id - b._id;
        });
        list.map((item) =>
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [productId, MONTHS]);

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct" className="link">
          <button className="productAddButton">
            <Add className="productIcon" />
            Create
          </button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product.img} alt="" className="productInfoImg" />
            <span className="productName">{product.title}</span>
          </div>

          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">ID:</span>
              <span className="productInfoValue">{product._id}</span>
            </div>

            <div className="productInfoItem">
              <span className="productInfoKey">Sales:</span>
              <span className="productInfoValue">4123</span>
            </div>

            <div className="productInfoItem">
              <span className="productInfoKey">Price:</span>
              <span className="productInfoValue">{product.price}</span>
            </div>

            <div className="productInfoItem">
              <span className="productInfoKey">In stock:</span>
              <span className="productInfoValue">{product.inStock}</span>
            </div>
          </div>
        </div>
      </div>

      <h1 className="productTitleBottom">Update Product</h1>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Product Title</label>
            <input
              name="title"
              type="text"
              placeholder={product.title}
              onChange={(e) => handle(e)}
              value={data.title}
              id="title"
            />
            <label>Product Description</label>
            <input
              name="desc"
              type="text"
              placeholder={product.desc}
              onChange={(e) => handle(e)}
              value={data.desc}
              id="desc"
            />
            <label>Price</label>
            <input
              name="price"
              type="number"
              placeholder={product.price}
              onChange={(e) => handle(e)}
              value={data.price}
              id="price"
            />
            <label>In Stock</label>
            <select
              name="inStock"
              onChange={(e) => handle(e)}
              value={data.inStock}
              className="stock"
              id="inStock"
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="productFormRight">
            <button className="productButton" onClick={(e) => update(e)}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
