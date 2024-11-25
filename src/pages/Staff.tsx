// src/pages/Staff.tsx
import React, { useState } from 'react';
import { 
  Bell, 
  User, 
  Mail, 
  Phone, 
  Edit,
  Trash,
  X
} from 'lucide-react';

type Role = 'Admin' | 'Manager' | 'Staff' | 'Pharmacist';
type Status = 'Active' | 'Inactive';

interface StaffMember {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: Role;
  department: string;
  status: Status;
  joinDate: string;
}

const Staff = () => {
  // Initialize staff with correct types
  const [staff, setStaff] = useState<StaffMember[]>([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@unilab.com",
      phone: "+63 912 345 6789",
      role: "Admin" as Role,
      department: "Management",
      status: "Active" as Status,
      joinDate: "2024-01-15"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@unilab.com",
      phone: "+63 923 456 7890",
      role: "Pharmacist" as Role,
      department: "Pharmacy",
      status: "Active" as Status,
      joinDate: "2024-02-01"
    }
  ]);

  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);
  const [formData, setFormData] = useState<Partial<StaffMember>>({});
  const [showModal, setShowModal] = useState(false);

  // Handle staff update with proper type checking
  const handleUpdate = (updatedStaff: StaffMember) => {
    setStaff(currentStaff => 
      currentStaff.map(member => 
        member.id === updatedStaff.id ? updatedStaff : member
      )
    );
  };

  // Handle edit staff
  const handleEdit = (member: StaffMember) => {
    setEditingStaff(member);
    setFormData(member);
    setShowModal(true);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingStaff) {
      const updatedStaff: StaffMember = {
        ...editingStaff,
        ...formData,
        role: formData.role as Role || editingStaff.role,
        status: formData.status as Status || editingStaff.status
      };
      handleUpdate(updatedStaff);
    } else {
      // Add new staff
      const newStaff: StaffMember = {
        id: staff.length + 1,
        name: formData.name || '',
        email: formData.email || '',
        phone: formData.phone || '',
        role: formData.role as Role || 'Staff',
        department: formData.department || '',
        status: formData.status as Status || 'Active',
        joinDate: formData.joinDate || new Date().toISOString().split('T')[0]
      };
      setStaff([...staff, newStaff]);
    }
    
    setShowModal(false);
    setEditingStaff(null);
    setFormData({});
  };

  // Handle form input changes
  const handleInputChange = (key: keyof StaffMember, value: string) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Handle delete
  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this staff member?')) {
      setStaff(staff.filter(member => member.id !== id));
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Staff Management</h1>
        <p className="text-gray-500">Manage staff members and their roles</p>
      </div>

      {/* Add Button */}
      <div className="mb-4">
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Add Staff Member
        </button>
      </div>

      {/* Staff Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {staff.map((member) => (
              <tr key={member.id}>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{member.name}</div>
                      <div className="text-sm text-gray-500">{member.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.role}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.department}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    member.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {member.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button onClick={() => handleEdit(member)} className="text-blue-600 hover:text-blue-900 mr-2">
                    <Edit className="h-5 w-5" />
                  </button>
                  <button onClick={() => handleDelete(member.id)} className="text-red-600 hover:text-red-900">
                    <Trash className="h-5 w-5" />
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
                {editingStaff ? 'Edit Staff Member' : 'Add Staff Member'}
              </h3>
              <button onClick={() => {
                setShowModal(false);
                setEditingStaff(null);
                setFormData({});
              }}>
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <select
                  value={formData.role || ''}
                  onChange={(e) => handleInputChange('role', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  required
                >
                  <option value="">Select Role</option>
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                  <option value="Staff">Staff</option>
                  <option value="Pharmacist">Pharmacist</option>
                </select>
              </div>

              {/* Add other form fields similarly */}

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingStaff(null);
                    setFormData({});
                  }}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  {editingStaff ? 'Save Changes' : 'Add Staff'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Staff;