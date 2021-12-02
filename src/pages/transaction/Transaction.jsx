import "./transaction.css"

export default function Transaction() {
      const Button = ({type}) =>{
            return <button className={"transactionButton " + type}>{type}</button>
      }
      return (
            <div className="transaction">
                  <h3 className="transactionTitle">Lasted Transactions</h3>
                  <table className="transactionTable">
                        <tr className="transactionTr">
                              <th className="transactionth">Customer</th>
                              <th className="transactionth">Date</th>
                              <th className="transactionth">Amount</th>
                              <th className="transactionth">Status</th>
                        </tr>
                        <tr className="transactionTr">
                              <td className="transactionUser">
                                    <img src="/images/TranHiep.jpg" alt="" className="transactionImg" />
                                    <span className="transactionName">Hiep Tran</span>
                              </td>
                              <td className="transactionDate">2 Jun 2021</td>
                              <td className="transactionAmount">$114.5</td>
                              <td className="transactionStatus"><Button type="Approved"/></td>
                        </tr>
                        <tr className="transactionTr">
                              <td className="transactionUser">
                                    <img src="/images/TranHiep.jpg" alt="" className="transactionImg" />
                                    <span className="transactionName">Hiep Tran</span>
                              </td>
                              <td className="transactionDate">2 Jun 2021</td>
                              <td className="transactionAmount">$114.5</td>
                              <td className="transactionStatus"><Button type="Declined"/></td>
                        </tr>
                        <tr className="transactionTr">
                              <td className="transactionUser">
                                    <img src="/images/TranHiep.jpg" alt="" className="transactionImg" />
                                    <span className="transactionName">Hiep Tran</span>
                              </td>
                              <td className="transactionDate">2 Jun 2021</td>
                              <td className="transactionAmount">$114.5</td>
                              <td className="transactionStatus"><Button type="Pending"/></td>
                        </tr>
                        <tr className="transactionTr">
                              <td className="transactionUser">
                                    <img src="/images/TranHiep.jpg" alt="" className="transactionImg" />
                                    <span className="transactionName">Hiep Tran</span>
                              </td>
                              <td className="transactionDate">2 Jun 2021</td>
                              <td className="transactionAmount">$114.5</td>
                              <td className="transactionStatus"><Button type="Approved"/></td>
                        </tr>
                  </table>
            </div>
      )
}
