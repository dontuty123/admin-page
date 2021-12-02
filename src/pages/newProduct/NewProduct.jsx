import "./newProduct.css"
import {Publish} from "@mui/icons-material"

export default function NewProduct() {
      return (
            <div className="newProduct">
                  <h1 className="newProductTitle">New Product</h1>
                  <form className="newProductForm">
                        <div className="newProductTop">
                              <div className="newProductTopLeft">
                                    <div className="newProductItem">
                                          <label>Name</label>
                                          <input type="text" placeholder="Gucci Bag" />
                                    </div>
                                    <div className="newProductItem">
                                          <label>Category</label>
                                          <input type="text" placeholder="Bag" />
                                    </div>
                                    
                              </div>
                              <div className="newProductTopRight">
                                    <div className="newProductItem">
                                          <label>Price</label>
                                          <input type="text" placeholder="$999" />
                                    </div>
                                    <div className="newProductItem">
                                          <label>Quantity</label>
                                          <input type="text" placeholder="516" />
                                    </div>
                              </div>
                        </div>
                        <div className="newProductBottom">
                              <div className="newProductBottomLeft">
                                    <div className="newProductItem">
                                          <label>Active</label>
                                          <select name="active" id="active" className="newProductSelect">
                                                <option value="yes">Yes</option>
                                                <option value="no">No</option>
                                          </select>                    
                                    </div>
                              </div>
                              <div className="newProductBottomRight">
                                    <div className="newProductBottomRight1">
                                          <img src="/images/avatar.jpg" alt="" className="newProductImg" />
                                          <label htmlFor="file"><Publish className="updateIcon"/> </label>
                                          <input type="file" id="file" style={{ display: "none" }}/>
                                    </div>
                                    <div className="newProductBottomRight2">
                                          <div className="newProductButtonCreate">
                                                <button className="newProductButton">Create</button>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </form>
            </div>
      )
}
