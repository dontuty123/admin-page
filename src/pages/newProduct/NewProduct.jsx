import "./newProduct.css";
import { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { addProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

export default function NewProduct() {
  const [inputs, setInputs] = useState([]);
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleCat = (e) => {
    setCat(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = {
            ...inputs,
            img: downloadURL,
            categories: cat,
          };
          addProduct(product, dispatch);
        });
      }
    );
    alert("Đã thêm sản phẩm thành công");
    history.push("/products");
  };

  return (
    <div className="newProduct">
      <h1 className="newProductTitle">New Product</h1>
      <form className="newProductForm">
        <div className="newProductTop">
          <div className="newProductItem">
            <label>Title</label>
            <input
              name="title"
              type="text"
              placeholder="Gucci Bag"
              onChange={handleChange}
            />
          </div>
          <div className="newProductItem">
            <label>Price</label>
            <input
              name="price"
              type="number"
              placeholder="$999"
              onChange={handleChange}
            />
          </div>
          <div className="newProductItem">
            <label>Categories</label>
            {/* <select name="categories" onChange={handleChange} className="stock">
              <option value="tee">Tee</option>
              <option value="pant">Pant</option>
              <option value="shoes">Shoes</option>
            </select> */}
            <input
              type="text"
              name="categories"
              onChange={handleCat}
              placeholder="tee"
            />
          </div>
          <div className="newProductItem">
            <label>Stock</label>
            <select name="inStock" onChange={handleChange} className="stock">
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
        </div>
        <div className="newProductBottom">
          <div className="newProductBottomLeft">
            <div className="newProductItem">
              <label>Description</label>
              <input
                name="desc"
                type="text"
                placeholder="Description"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="newProductBottomRight">
            <div className="newProductBottomRight1">
              <div className="newProductItem">
                <label>Image</label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
            </div>
            <div className="newProductBottomRight2">
              <div className="newProductButtonCreate">
                <button onClick={handleClick} className="newProductButton">
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
