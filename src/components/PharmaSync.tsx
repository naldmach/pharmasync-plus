import React, { useState } from 'react';
import { 
  Package, 
  AlertTriangle, 
  QrCode, 
  Signal, 
  Search,
  Plus,
  FileBarChart
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface InventoryItem {
  id: number;
  name: string;
  stock: number;
  threshold: number;
  status: 'Good' | 'Low' | 'Critical';
}

interface Report {
  id: number;
  product: string;
  location: string;
  status: string;
}

const PharmaSync: React.FC = () => {
  const [syncStatus] = useState('Online');
  const [inventory] = useState<InventoryItem[]>([
    { id: 1, name: 'Biogesic', stock: 2500, threshold: 1000, status: 'Good' },
    { id: 2, name: 'Neozep', stock: 800, threshold: 1000, status: 'Low' },
    { id: 3, name: 'Alaxan', stock: 1200, threshold: 1000, status: 'Good' },
    { id: 4, name: 'Decolgen', stock: 500, threshold: 1000, status: 'Critical' },
  ]);

  const [reports] = useState<Report[]>([
    { id: 1, product: 'Biogesic', location: 'Manila', status: 'Investigating' },
    { id: 2, product: 'Neozep', location: 'Cebu', status: 'Verified Fake' },
  ]);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">PharmaSync Plus</h1>
          <p className="text-gray-500">Unilab Pharmaceutical Management System</p>
        </div>
        <div className="flex items-center gap-2">
          <Signal className={syncStatus === 'Online' ? 'text-green-500' : 'text-gray-400'} />
          <span>{syncStatus}</span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Inventory</CardTitle>
            <Package className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5,000</div>
            <p className="text-xs text-gray-500">Products tracked</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Counterfeit Reports</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-gray-500">Active investigations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">QR Scans Today</CardTitle>
            <QrCode className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-gray-500">Verification checks</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Inventory Section */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Real-time Inventory</CardTitle>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <Search className="h-4 w-4" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {inventory.map(item => (
                <div key={item.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-gray-500">Stock: {item.stock}</div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs ${
                    item.status === 'Good' ? 'bg-green-100 text-green-800' :
                    item.status === 'Low' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {item.status}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Counterfeit Reports Section */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Counterfeit Reports</CardTitle>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <FileBarChart className="h-4 w-4" />
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reports.map(report => (
                <div key={report.id} className="p-3 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium">{report.product}</div>
                      <div className="text-sm text-gray-500">{report.location}</div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      report.status === 'Investigating' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {report.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PharmaSync;