// src/pages/Settings.tsx
import React, { useState } from 'react';
import { 
  Bell, 
  Building,
  Mail,
  Phone,
  Globe,
  MapPin,
  Save,
  Clock,
  Package
} from 'lucide-react';

const Settings = () => {
  // Company Profile State
  const [companyProfile, setCompanyProfile] = useState({
    name: 'Unilab',
    email: 'contact@unilab.com',
    phone: '+63 123 456 7890',
    website: 'www.unilab.com',
    address: 'Manila, Philippines'
  });

  // System Settings State
  const [systemSettings, setSystemSettings] = useState({
    stockAlertThreshold: 100,
    expiryAlertDays: 90,
    autoBackup: true,
    emailNotifications: true
  });

  // Handle company profile changes
  const handleProfileChange = (field: string, value: string) => {
    setCompanyProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle system settings changes
  const handleSettingChange = (field: string, value: any) => {
    setSystemSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Save Changes
  const handleSave = () => {
    // Here you would typically save to a backend
    console.log('Saving settings...', { companyProfile, systemSettings });
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500">Manage your application settings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Company Profile */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Building className="mr-2 h-5 w-5" />
            Company Profile
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Company Name</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="text"
                  value={companyProfile.name}
                  onChange={(e) => handleProfileChange('name', e.target.value)}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <div className="mt-1 relative rounded-md shadow-sm flex">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="email"
                  value={companyProfile.email}
                  onChange={(e) => handleProfileChange('email', e.target.value)}
                  className="w-full border rounded-lg pl-10 pr-3 py-2"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <div className="mt-1 relative rounded-md shadow-sm flex">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="tel"
                  value={companyProfile.phone}
                  onChange={(e) => handleProfileChange('phone', e.target.value)}
                  className="w-full border rounded-lg pl-10 pr-3 py-2"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Website</label>
              <div className="mt-1 relative rounded-md shadow-sm flex">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="url"
                  value={companyProfile.website}
                  onChange={(e) => handleProfileChange('website', e.target.value)}
                  className="w-full border rounded-lg pl-10 pr-3 py-2"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <div className="mt-1 relative rounded-md shadow-sm flex">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  value={companyProfile.address}
                  onChange={(e) => handleProfileChange('address', e.target.value)}
                  className="w-full border rounded-lg pl-10 pr-3 py-2"
                />
              </div>
            </div>
          </div>
        </div>

        {/* System Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Package className="mr-2 h-5 w-5" />
            System Settings
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Low Stock Alert Threshold</label>
              <div className="mt-1">
                <input
                  type="number"
                  value={systemSettings.stockAlertThreshold}
                  onChange={(e) => handleSettingChange('stockAlertThreshold', parseInt(e.target.value))}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
              <p className="mt-1 text-sm text-gray-500">Get alerts when stock falls below this number</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Expiry Alert Days</label>
              <div className="mt-1">
                <input
                  type="number"
                  value={systemSettings.expiryAlertDays}
                  onChange={(e) => handleSettingChange('expiryAlertDays', parseInt(e.target.value))}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
              <p className="mt-1 text-sm text-gray-500">Days before expiry to receive alerts</p>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <label className="block text-sm font-medium text-gray-700">Auto Backup</label>
                <p className="text-sm text-gray-500">Automatically backup data daily</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={systemSettings.autoBackup}
                  onChange={(e) => handleSettingChange('autoBackup', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email Notifications</label>
                <p className="text-sm text-gray-500">Receive email alerts and notifications</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={systemSettings.emailNotifications}
                  onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="md:col-span-2">
          <button
            onClick={handleSave}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center"
          >
            <Save className="mr-2 h-5 w-5" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;