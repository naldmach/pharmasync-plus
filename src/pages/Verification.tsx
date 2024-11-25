// src/pages/Verification.tsx
import React, { useState } from 'react';
import { 
  Search, 
  QrCode,
  Check,
  X,
  AlertTriangle,
  Package,
  Calendar,
  ShieldCheck,
  Building,
  Loader2
} from 'lucide-react';

interface ProductVerification {
  productId: string;
  name: string;
  batchNumber: string;
  manufacturer: string;
  manufacturingDate: string;
  expiryDate: string;
  isAuthentic: boolean;
  verificationDate: string;
}

const Verification = () => {
  // States
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [verificationResult, setVerificationResult] = useState<ProductVerification | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Sample verification data
  const sampleProducts: ProductVerification[] = [
    {
      productId: "BIO123456",
      name: "Biogesic",
      batchNumber: "BTH2024001",
      manufacturer: "Unilab",
      manufacturingDate: "2024-01-15",
      expiryDate: "2026-01-15",
      isAuthentic: true,
      verificationDate: new Date().toISOString()
    },
    {
      productId: "NEO789012",
      name: "Neozep",
      batchNumber: "BTH2024002",
      manufacturer: "Unilab",
      manufacturingDate: "2024-02-01",
      expiryDate: "2026-02-01",
      isAuthentic: false,
      verificationDate: new Date().toISOString()
    }
  ];

  // Handle manual search
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setError('Please enter a product ID or batch number');
      return;
    }

    setIsLoading(true);
    setError(null);

    // Simulate API call
    setTimeout(() => {
      const result = sampleProducts.find(
        p => p.productId === searchQuery || p.batchNumber === searchQuery
      );

      if (result) {
        setVerificationResult(result);
      } else {
        setError('Product not found. Please check the ID or batch number.');
      }
      setIsLoading(false);
    }, 1500);
  };

  // Handle QR code scan
  const handleScan = () => {
    setShowScanner(true);
    // In a real implementation, this would handle camera access and QR scanning
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Product Verification</h1>
        <p className="text-gray-500">Verify the authenticity of Unilab products</p>
      </div>

      {/* Verification Methods */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Manual Search */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Enter Product Details</h2>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Enter Product ID or Batch Number"
                className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={20} />
                  Verifying...
                </>
              ) : (
                'Verify Product'
              )}
            </button>
          </div>
        </div>

        {/* QR Code Scanner */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Scan QR Code</h2>
          <div className="text-center">
            <button
              onClick={handleScan}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center justify-center w-full"
            >
              <QrCode className="mr-2" size={20} />
              Open Scanner
            </button>
            <p className="text-sm text-gray-500 mt-2">
              Use your camera to scan the product's QR code
            </p>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 flex items-center">
          <AlertTriangle className="mr-2" size={20} />
          {error}
        </div>
      )}

      {/* Verification Result */}
      {verificationResult && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Verification Result</h2>
            <span className={`flex items-center px-3 py-1 rounded-full text-sm ${
              verificationResult.isAuthentic 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {verificationResult.isAuthentic ? (
                <>
                  <ShieldCheck className="mr-1" size={16} />
                  Authentic Product
                </>
              ) : (
                <>
                  <AlertTriangle className="mr-1" size={16} />
                  Potential Counterfeit
                </>
              )}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Details */}
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500">Product Name</label>
                <div className="flex items-center mt-1">
                  <Package className="mr-2 text-gray-400" size={20} />
                  <span className="text-lg">{verificationResult.name}</span>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-500">Product ID</label>
                <div className="flex items-center mt-1">
                  <span className="font-mono">{verificationResult.productId}</span>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-500">Batch Number</label>
                <div className="flex items-center mt-1">
                  <span className="font-mono">{verificationResult.batchNumber}</span>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-500">Manufacturer</label>
                <div className="flex items-center mt-1">
                  <Building className="mr-2 text-gray-400" size={20} />
                  <span>{verificationResult.manufacturer}</span>
                </div>
              </div>
            </div>

            {/* Dates */}
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500">Manufacturing Date</label>
                <div className="flex items-center mt-1">
                  <Calendar className="mr-2 text-gray-400" size={20} />
                  <span>{formatDate(verificationResult.manufacturingDate)}</span>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-500">Expiry Date</label>
                <div className="flex items-center mt-1">
                  <Calendar className="mr-2 text-gray-400" size={20} />
                  <span>{formatDate(verificationResult.expiryDate)}</span>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-500">Verification Date</label>
                <div className="flex items-center mt-1">
                  <Calendar className="mr-2 text-gray-400" size={20} />
                  <span>{formatDate(verificationResult.verificationDate)}</span>
                </div>
              </div>
            </div>
          </div>

          {!verificationResult.isAuthentic && (
            <div className="mt-6 p-4 bg-red-50 rounded-lg">
              <h3 className="text-red-800 font-semibold mb-2 flex items-center">
                <AlertTriangle className="mr-2" size={20} />
                Warning: Potential Counterfeit Product
              </h3>
              <p className="text-red-700">
                This product could not be verified as authentic. Please report this to Unilab immediately.
              </p>
              <button className="mt-3 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
                Report Counterfeit
              </button>
            </div>
          )}
        </div>
      )}

      {/* QR Scanner Modal */}
      {showScanner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Scan QR Code</h3>
              <button onClick={() => setShowScanner(false)}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Camera feed would appear here</p>
            </div>
            <p className="text-sm text-gray-500 mt-4 text-center">
              Position the QR code within the camera frame
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Verification;