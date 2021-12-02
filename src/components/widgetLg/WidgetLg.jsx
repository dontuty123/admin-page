import "./widgetLg.css"

export default function WidgetLg() {

      const Button = ({type}) =>{
            return <button className={"widgetLgButton " + type}>{type}</button>
      }
      return (
            <div className="widgetLg">
                  <h3 className="widgetLgTitle">Lasted transactions</h3>
                  <table className="widgetLgTable">
                        <tr className="widgetLgTr">
                              <th className="widgetLgth">Customer</th>
                              <th className="widgetLgth">Date</th>
                              <th className="widgetLgth">Amount</th>
                              <th className="widgetLgth">Status</th>
                        </tr>
                        <tr className="widgetLgTr">
                              <td className="widgetLgUser">
                                    <img src="/images/TranHiep.jpg" alt="" className="widgetLgImg" />
                                    <span className="widgetLgName">Carrol Susan</span>
                              </td>
                              <td className="widgetLgDate">2 Jun 2021</td>
                              <td className="widgetLgAmount">$114.5</td>
                              <td className="widgetLgStatus"><Button type="Approved"/></td>
                        </tr>
                        <tr className="widgetLgTr">
                              <td className="widgetLgUser">
                                    <img src="/images/TranHiep.jpg" alt="" className="widgetLgImg" />
                                    <span className="widgetLgName">Carrol Susan</span>
                              </td>
                              <td className="widgetLgDate">2 Jun 2021</td>
                              <td className="widgetLgAmount">$114.5</td>
                              <td className="widgetLgStatus"><Button type="Declined"/></td>
                        </tr>
                        <tr className="widgetLgTr">
                              <td className="widgetLgUser">
                                    <img src="/images/TranHiep.jpg" alt="" className="widgetLgImg" />
                                    <span className="widgetLgName">Carrol Susan</span>
                              </td>
                              <td className="widgetLgDate">2 Jun 2021</td>
                              <td className="widgetLgAmount">$114.5</td>
                              <td className="widgetLgStatus"><Button type="Pending"/></td>
                        </tr>
                        <tr className="widgetLgTr">
                              <td className="widgetLgUser">
                                    <img src="/images/TranHiep.jpg" alt="" className="widgetLgImg" />
                                    <span className="widgetLgName">Carrol Susan</span>
                              </td>
                              <td className="widgetLgDate">2 Jun 2021</td>
                              <td className="widgetLgAmount">$114.5</td>
                              <td className="widgetLgStatus"><Button type="Approved"/></td>
                        </tr>
                  </table>
            </div>
      )
}
