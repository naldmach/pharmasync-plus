// src/pages/Inventory.tsx
import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Trash,
  Edit,
  X,
  AlertTriangle,
  Check
} from 'lucide-react';

interface Product {
  id: number;
  name: string;
  category: string;
  quantity: number;
  price: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  expiryDate: string;
}

interface FormErrors {
  name?: string;
  category?: string;
  quantity?: string;
  price?: string;
  expiryDate?: string;
}

const Inventory = () => {
  // State Management
  const [products, setProducts] = useState<Product[]>([
    { 
      id: 1, 
      name: "Biogesic", 
      category: "Pain Relief", 
      quantity: 500, 
      price: 10.50, 
      status: "In Stock",
      expiryDate: "2025-12-31" 
    }
  ]);
  
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    quantity: '',
    price: '',
    expiryDate: ''
  });

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      quantity: '',
      price: '',
      expiryDate: ''
    });
    setFormErrors({});
    setEditingProduct(null);
  };

  // Validate form
  const validateForm = () => {
    const errors: FormErrors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Product name is required';
    }
    
    if (!formData.category.trim()) {
      errors.category = 'Category is required';
    }
    
    if (!formData.quantity || Number(formData.quantity) < 0) {
      errors.quantity = 'Valid quantity is required';
    }
    
    if (!formData.price || Number(formData.price) < 0) {
      errors.price = 'Valid price is required';
    }
    
    if (!formData.expiryDate) {
      errors.expiryDate = 'Expiry date is required';
    } else {
      const currentDate = new Date();
      const expiryDate = new Date(formData.expiryDate);
      if (expiryDate <= currentDate) {
        errors.expiryDate = 'Expiry date must be in the future';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Calculate status based on quantity
  const calculateStatus = (quantity: number): 'In Stock' | 'Low Stock' | 'Out of Stock' => {
    if (quantity <= 0) return 'Out of Stock';
    if (quantity <= 100) return 'Low Stock';
    return 'In Stock';
  };

  // Handle opening modal for adding
  const handleAdd = () => {
    resetForm();
    setShowModal(true);
  };

  // Handle opening modal for editing
  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      quantity: product.quantity.toString(),
      price: product.price.toString(),
      expiryDate: product.expiryDate
    });
    setShowModal(true);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const productData = {
      name: formData.name,
      category: formData.category,
      quantity: Number(formData.quantity),
      price: Number(formData.price),
      expiryDate: formData.expiryDate,
      status: calculateStatus(Number(formData.quantity))
    };

    if (editingProduct) {
      // Update existing product
      const updatedProducts = products.map(product => 
        product.id === editingProduct.id 
          ? { ...productData, id: editingProduct.id }
          : product
      );
      setProducts(updatedProducts);
      setSuccessMessage('Product updated successfully!');
    } else {
      // Add new product
      const newProduct = {
        ...productData,
        id: products.length + 1
      };
      setProducts([...products, newProduct]);
      setSuccessMessage('Product added successfully!');
    }

    // Reset and close modal
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
    
    resetForm();
    setShowModal(false);
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  return (
    <div className="p-6">
      {/* Success Message */}
      {successMessage && (
        <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded flex items-center space-x-2">
          <Check size={20} />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Add Button */}
      <div className="mb-4">
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <Plus size={20} />
          Add Product
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          {/* ... table headers ... */}
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{product.name}</td>
                <td className="px-6 py-4">{product.category}</td>
                <td className="px-6 py-4">{product.quantity}</td>
                <td className="px-6 py-4">${product.price.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    product.status === 'In Stock' ? 'bg-green-100 text-green-800' :
                    product.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {product.status}
                  </span>
                </td>
                <td className="px-6 py-4">{product.expiryDate}</td>
                <td className="px-6 py-4">
                  <button 
                    onClick={() => handleEdit(product)}
                    className="text-blue-600 hover:text-blue-900 mr-2"
                  >
                    <Edit size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button onClick={() => {
                resetForm();
                setShowModal(false);
              }}>
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full border rounded-lg px-3 py-2 ${
                    formErrors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {formErrors.name && (
                  <p className="text-red-500 text-xs mt-1 flex items-center">
                    <AlertTriangle size={14} className="mr-1" />
                    {formErrors.name}
                  </p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`w-full border rounded-lg px-3 py-2 ${
                    formErrors.category ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {formErrors.category && (
                  <p className="text-red-500 text-xs mt-1 flex items-center">
                    <AlertTriangle size={14} className="mr-1" />
                    {formErrors.category}
                  </p>
                )}
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  className={`w-full border rounded-lg px-3 py-2 ${
                    formErrors.quantity ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {formErrors.quantity && (
                  <p className="text-red-500 text-xs mt-1 flex items-center">
                    <AlertTriangle size={14} className="mr-1" />
                    {formErrors.quantity}
                  </p>
                )}
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className={`w-full border rounded-lg px-3 py-2 ${
                    formErrors.price ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {formErrors.price && (
                  <p className="text-red-500 text-xs mt-1 flex items-center">
                    <AlertTriangle size={14} className="mr-1" />
                    {formErrors.price}
                  </p>
                )}
              </div>

              {/* Expiry Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date
                </label>
                <input
                  type="date"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  className={`w-full border rounded-lg px-3 py-2 ${
                    formErrors.expiryDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {formErrors.expiryDate && (
                  <p className="text-red-500 text-xs mt-1 flex items-center">
                    <AlertTriangle size={14} className="mr-1" />
                    {formErrors.expiryDate}
                  </p>
                )}
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setShowModal(false);
                  }}
                  className="px-4 py-2 text-gray-700 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingProduct ? 'Save Changes' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;