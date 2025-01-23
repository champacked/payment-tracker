import React from "react";

export default function TransactionTable({ transactions }) {
  // Log transactions for debugging purposes
  //console.log("Transactions passed to table:", transactions);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Collect ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              School ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Gateway
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Order Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Transaction Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Custom Order ID
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {transactions && transactions.length > 0 ? (
            transactions.map((transaction, index) => (
              <tr key={transaction.custom_order_id || index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.collect_id || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.school_id || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.gateway || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  $
                  {transaction.order_amount !== undefined
                    ? transaction.order_amount.toFixed(2)
                    : "0.00"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  $
                  {transaction.transaction_amount !== undefined
                    ? transaction.transaction_amount.toFixed(2)
                    : "0.00"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      transaction.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : transaction.status === "Failed"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {transaction.status || "completed"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.custom_order_id || "N/A"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-4">
                No Transactions Available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
