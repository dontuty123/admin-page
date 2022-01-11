import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethod";
import "./widgetLg.css";
import { format } from "timeago.js";

export default function WidgetLg() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
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
        setOrders(list);
      } catch {}
    };
    getOrders();
  }, []);

  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Lasted transactions</h3>
      <table className="widgetLgTable">
        <tbody>
          <tr className="widgetLgTr">
            <th className="widgetLgth">Customer</th>
            <th className="widgetLgth">Date</th>
            <th className="widgetLgth">Amount</th>
            <th className="widgetLgth">Status</th>
          </tr>
          {orders.slice(0, 5).map((orders) => (
            <tr className="widgetLgTr" key={orders._id}>
              <td className="widgetLgUser">
                <span className="widgetLgName">{orders.userId}</span>
              </td>
              <td className="widgetLgDate">{format(orders.createdAt)}</td>
              <td className="widgetLgAmount">${orders.amount}</td>
              <td className="widgetLgStatus">
                <Button type={orders.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
