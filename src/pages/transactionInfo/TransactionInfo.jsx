import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { userRequest } from "../../requestMethod";
import "./transactionInfo.css";

export default function TransactionInfo() {
  const [output, setOutput] = useState([]);

  const location = useLocation();
  const orderId = location.pathname.split("/")[2];

  const order = useSelector((state) =>
    state.order.orders.find((order) => order._id === orderId)
  );

  console.log(order);

  return (
    <div className="transactionInfo">
      <div className="transactionInfoWrap">
        <div className="transactionInfoWrapTop">
          <span className="transactionInfoUserTitle">User Infomation</span>
          <h1 className="infomationInfoUserName">{order.username}</h1>
          <h1 className="infomationInfoUsera">{order.userId}</h1>
          <h1 className="infomationInfoUsera">{order.address}</h1>
        </div>
        <div className="transactionInfoWrapBottom">
          <span className="transactionInfoProductTitle">
            Transaction Infomation
          </span>
          {order.products.map((product) => (
            <tr className="widgetLgTr" key={product._id}>
              <td className="widgetLgUser">
                <span className="widgetLgName">{product.title}</span>
              </td>
              <td className="widgetLgAmount">{product.quantity}</td>
              <td className="widgetLgStatus">{product.price}</td>
            </tr>
          ))}
        </div>
      </div>
    </div>
  );
}
