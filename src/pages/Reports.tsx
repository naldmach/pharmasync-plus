// src/pages/Reports.tsx
import React, { useState } from 'react';
import { 
  Search, 
  AlertTriangle, 
  Eye,
  Clock,
  MapPin,
  Calendar,
  User,
  X
} from 'lucide-react';

interface Report {
  id: number;
  productName: string;
  reportType: 'Counterfeit' | 'Quality Issue' | 'Packaging Issue';
  status: 'Pending' | 'Investigating' | 'Resolved';
  location: string;
  reportDate: string;
  reportedBy: string;
  details: string;
}

const Reports = () => {
  // State
  const [reports, setReports] = useState<Report[]>([
    {
      id: 1,
      productName: "Biogesic",
      reportType: "Counterfeit",
      status: "Investigating",
      location: "Manila",
      reportDate: "2024-03-20",
      reportedBy: "John Doe",
      details: "Suspicious packaging and QR code authentication failed"
    },
    {
      id: 2,
      productName: "Neozep",
      reportType: "Quality Issue",
      status: "Pending",
      location: "Cebu",
      reportDate: "2024-03-19",
      reportedBy: "Jane Smith",
      details: "Product discoloration noted"
    },
    {
      id: 3,
      productName: "Alaxan",
      reportType: "Packaging Issue",
      status: "Resolved",
      location: "Davao",
      reportDate: "2024-03-18",
      reportedBy: "Mike Johnson",
      details: "Tampered security seal"
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Filter reports based on search
  const filteredReports = reports.filter(report =>
    report.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.reportedBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Update report status
  const updateStatus = (reportId: number, newStatus: Report['status']) => {
    setReports(reports.map(report =>
      report.id === reportId ? { ...report, status: newStatus } : report
    ));
    setShowModal(false);
  };

  // Get status badge color
  const getStatusColor = (status: Report['status']) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Investigating':
        return 'bg-blue-100 text-blue-800';
      case 'Resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <p className="text-gray-500">Manage product verification reports</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-500">Total Reports</div>
          <div className="text-2xl font-bold">{reports.length}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-500">Pending Investigation</div>
          <div className="text-2xl font-bold text-yellow-600">
            {reports.filter(r => r.status === 'Pending').length}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-500">Active Investigations</div>
          <div className="text-2xl font-bold text-blue-600">
            {reports.filter(r => r.status === 'Investigating').length}
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search reports..."
            className="pl-10 pr-4 py-2 w-full md:w-96 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Report Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredReports.map((report) => (
              <tr key={report.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{report.productName}</div>
                  <div className="text-sm text-gray-500">{report.reportedBy}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{report.reportType}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-1" />
                    {report.location}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                    {report.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    {report.reportDate}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => {
                      setSelectedReport(report);
                      setShowModal(true);
                    }}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Report Details Modal */}
      {showModal && selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Report Details</h3>
              <button onClick={() => setShowModal(false)}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <div className="text-sm font-medium text-gray-500">Product</div>
                <div className="text-lg">{selectedReport.productName}</div>
              </div>

              <div>
                <div className="text-sm font-medium text-gray-500">Report Type</div>
                <div className="text-lg">{selectedReport.reportType}</div>
              </div>

              <div>
                <div className="text-sm font-medium text-gray-500">Details</div>
                <div className="mt-1 text-gray-900">{selectedReport.details}</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-gray-500">Location</div>
                  <div className="flex items-center mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    {selectedReport.location}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Reported By</div>
                  <div className="flex items-center mt-1">
                    <User className="w-4 h-4 mr-1" />
                    {selectedReport.reportedBy}
                  </div>
                </div>
              </div>

              <div>
                <div className="text-sm font-medium text-gray-500 mb-2">Update Status</div>
                <div className="flex gap-2">
                  {['Pending', 'Investigating', 'Resolved'].map((status) => (
                    <button
                      key={status}
                      onClick={() => updateStatus(selectedReport.id, status as Report['status'])}
                      className={`px-3 py-1 rounded-lg text-sm ${
                        selectedReport.status === status
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;