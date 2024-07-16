import React, { useState } from 'react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <div className="flex mb-6 border-b border-gray-200">
        <button
          className={`py-2 px-4 ${activeTab === 'profile' ? 'border-b-4 rounded-b-md border-[#1814F3] text-[#1814F3] font-medium' : 'text-[#718EBF] font-medium'}`}
          onClick={() => handleTabClick('profile')}
        >
          Edit Profile
        </button>
        <button
          className={`py-2 px-4 ${activeTab === 'preferences' ? 'border-b-4 rounded-b-md border-[#1814F3] text-[#1814F3] font-medium' : 'text-[#718EBF] font-medium'}`}
          onClick={() => handleTabClick('preferences')}
        >
          Preferences
        </button>
        <button
          className={`py-2 px-4 ${activeTab === 'security' ? 'border-b-4 rounded-b-md border-[#1814F3] text-[#1814F3] font-medium' : 'text-[#718EBF] font-medium'}`}
          onClick={() => handleTabClick('security')}
        >
          Security
        </button>
      </div>

      {activeTab === 'profile' && <EditProfile />}
      {activeTab === 'preferences' && <Preferences />}
      {activeTab === 'security' && <Security />}
    </div>
  );
};

const EditProfile: React.FC = () => {
  return (
    <form className="flex flex-wrap -mx-4">
      <div className="w-full md:w-1/3 px-4 mb-6 md:mb-0">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profilePhoto">
          Profile Photo
        </label>
        <div className="flex items-center">
          <img className="w-16 h-16 rounded-full mr-4" src="path_to_profile_photo" alt="Profile" />
          <button className="px-3 py-2 bg-blue-500 text-white text-sm font-semibold rounded-lg">Edit</button>
        </div>
      </div>
      <div className="w-full md:w-2/3 px-4">
        <div className="flex flex-wrap -mx-4">
          {[
            { id: 'name', label: 'Your Name' },
            { id: 'username', label: 'User Name' },
            { id: 'email', label: 'Email' },
            { id: 'password', label: 'Password' },
            { id: 'dob', label: 'Date of Birth' },
            { id: 'presentAddress', label: 'Present Address' },
            { id: 'permanentAddress', label: 'Permanent Address' },
            { id: 'city', label: 'City' },
            { id: 'postalCode', label: 'Postal Code' },
            { id: 'country', label: 'Country' },
          ].map((field) => (
            <div key={field.id} className="w-full md:w-1/2 px-4 mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field.id}>
                {field.label}
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                id={field.id}
                type="text"
                placeholder={field.label}
              />
            </div>
          ))}
        </div>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">Save</button>
      </div>
    </form>
  );
};

const Preferences: React.FC = () => {
  return (
    <form>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="currency">
          Currency
        </label>
        <select className="w-full px-3 py-2 border border-gray-300 rounded-md" id="currency">
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="gbp">GBP</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="timezone">
          Time Zone
        </label>
        <select className="w-full px-3 py-2 border border-gray-300 rounded-md" id="timezone">
          <option value="pst">PST</option>
          <option value="mst">MST</option>
          <option value="cst">CST</option>
          <option value="est">EST</option>
        </select>
      </div>
      <div className="mb-4">
        <h3 className="text-gray-700 text-sm font-bold mb-2">Notifications</h3>
        <div className="flex items-center mb-2">
          <input type="checkbox" id="digitalCurrency" className="mr-2" />
          <label htmlFor="digitalCurrency" className="text-gray-700 text-sm">I send or receive digital currency</label>
        </div>
        <div className="flex items-center mb-2">
          <input type="checkbox" id="merchantOrder" className="mr-2" />
          <label htmlFor="merchantOrder" className="text-gray-700 text-sm">I receive merchant order</label>
        </div>
        <div className="flex items-center mb-2">
          <input type="checkbox" id="recommendations" className="mr-2" />
          <label htmlFor="recommendations" className="text-gray-700 text-sm">There are recommendations for my account</label>
        </div>
      </div>
      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">Save</button>
    </form>
  );
};

const Security: React.FC = () => {
  return (
    <form>
      <div className="mb-4 flex items-center">
        <input type="checkbox" id="twoFactorAuth" className="mr-2" />
        <label htmlFor="twoFactorAuth" className="text-gray-700 text-sm font-bold">Two Factor Authentication</label>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="currentPassword">
          Current Password
        </label>
        <input
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          id="currentPassword"
          type="password"
          placeholder="Current Password"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
          New Password
        </label>
        <input
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          id="newPassword"
          type="password"
          placeholder="New Password"
        />
      </div>
      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">Save</button>
    </form>
  );
};

export default Settings;
