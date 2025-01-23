//Dashboard.jsx
import React, { useState, useEffect } from "react";
import { Search, Filter } from "lucide-react";
import { getAllTransactions, getTransactionsBySchool } from "../services/api";
import TransactionTable from "./TransactionTable";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [schoolId, setSchoolId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const data = await getAllTransactions();
      setTransactions(data);
      setFilteredTransactions(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setLoading(false);
    }
  };

  const fetchSchoolTransactions = async () => {
    if (!schoolId) return;
    try {
      setLoading(true);
      const data = await getTransactionsBySchool(schoolId);
      setTransactions(data);
      setFilteredTransactions(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching school transactions:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const filtered = transactions.filter((transaction) => {
      const matchesSearch =
        transaction.collect_id
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        transaction.school_id
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        transaction.custom_order_id
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        transaction.status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });

    setFilteredTransactions(filtered);
  }, [searchTerm, statusFilter, transactions]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search transactions..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="relative">
                  <select
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Status</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                  </select>
                  <Filter className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="School ID"
                    className="w-40 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={schoolId}
                    onChange={(e) => setSchoolId(e.target.value)}
                  />
                  <button
                    onClick={fetchSchoolTransactions}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Filter
                  </button>
                </div>
              </div>
            </div>
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              </div>
            ) : (
              <TransactionTable transactions={filteredTransactions} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
