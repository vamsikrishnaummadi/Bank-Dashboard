import axios from "axios";
import React, { useState } from "react";

const Security: React.FC<{ userData: { [key: string]: any } | null }> = ({
  userData,
}) => {
  const [formData, setFormData] = useState({
    enabletwoFactorAuthentication: false,
    currentPassword: "",
    newPassword: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `/api/users/password/${userData?.user?.accountNumber}`,
        {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        }
      );
      if (response.status === 200) {
        alert(response.data.message);
      }
    } catch (error: any) {
      console.error("Error updating : ", error);
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <h3 className="text-[#333B69] text-md font-semibold mb-4">
          Two-factor Authentication
        </h3>
        <div className="flex items-center mb-4">
          <label
            className="inline-flex items-center cursor-pointer"
            htmlFor="enabletwoFactorAuthentication"
          >
            <input
              type="checkbox"
              id="enabletwoFactorAuthentication"
              name="enabletwoFactorAuthentication"
              checked={formData.enabletwoFactorAuthentication}
              disabled
              className="sr-only peer"
            />
            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 dark:peer-focus:ring-[#16DBCC] dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#16DBCC]"></div>
            <span className="ms-3 text-sm font-medium text-[#232323] dark:text-gray-300">
              Enable or disable two factor authentication
            </span>
          </label>
        </div>
      </div>
      <div className="mb-4 w-full md:w-3/6">
        <label
          className="block text-[#333B69] text-sm font-semibold mb-2"
          htmlFor="currentPassword"
        >
          Current Password
        </label>
        <input
          className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder:text-[#718EBF]"
          id="currentPassword"
          name="currentPassword"
          type="text"
          value={formData.currentPassword}
          onChange={handleChange}
          placeholder="********"
          required
        />
      </div>
      <div className="mb-4 w-full md:w-3/6">
        <label
          className="block text-[#333B69] text-sm font-semibold mb-2"
          htmlFor="newPassword"
        >
          New Password
        </label>
        <input
          className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder:text-[#718EBF]"
          id="newPassword"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          type="text"
          placeholder="********"
          required
        />
      </div>
      <div className="w-full flex md:justify-end">
        <button
          type="submit"
          className="w-full md:w-32 px-4 py-2 bg-[#1814F3] text-white rounded-lg"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default Security;
