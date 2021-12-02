import { Add, Publish } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Chart from "../../components/chart/Chart";
import "./product.css";
import { productData } from "../../dummyData";

export default function Product() {

	
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
					<Chart data={productData} dataKey="Sales" title ="Sales Performance"/>
				</div>
				<div className="productTopRight">
					<div className="productInfoTop">
						<img src="/images/avatar.jpg" alt="" className="productInfoImg" />
						<span className="productName">Gucci bag</span>
					</div>
					<div className="productInfoBottom">
						<div className="productInfoItemLeft">
							<div className="productInfoItem">
								<span className="productInfoKey">ID:</span>
								<span className="productInfoValue">123</span>
							</div>

							<div className="productInfoItem">
								<span className="productInfoKey">Sales:</span>
								<span className="productInfoValue">4123</span>
							</div>

							<div className="productInfoItem">
								<span className="productInfoKey">Price:</span>
								<span className="productInfoValue">4123</span>
							</div>
							<div className="productInfoItem">
								<span className="productInfoKey">Category:</span>
								<span className="productInfoValue">Bag</span>
							</div>
						</div>
						<div className="productInfoItemRight">
							<div className="productInfoItem">
								<span className="productInfoKey">Active:</span>
								<span className="productInfoValue">yes</span>
							</div>

							<div className="productInfoItem">
								<span className="productInfoKey">In stock:</span>
								<span className="productInfoValue">412</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			<h1 className="productTitleBottom">Update Product</h1>
			<div className="productBottom">
				<form className="productForm">
					<div className="productFormLeft">
						<label>Product Name</label>
						<input type="text" placeholder="Gucci Bag" />
						<label>In Stock</label>
						<input type="text" placeholder="412" />
						<label>Active</label>
						<select name="active" id="active">
							<option value="yes">Yes</option>
							<option value="no">No</option>
						</select>
					</div>
					<div className="productFormMiddle">
						<label>Price</label>
						<input type="text" placeholder="$510" />
						<label>Category</label>
						<input type="text" placeholder="Bag" />
					</div>
					<div className="productFormRight">
						<div className="productUpload">
							<img src="/images/avatar.jpg" alt="" className="productUploadImg" />
							<label htmlFor="file">
								<Publish/>
							</label>
							<input type="file" id="file" style={{display: "none"}} />
						</div>
						<button className="productButton">Update</button>
					</div>
				</form>
			</div>
		</div>
	);
}
