import React from 'react';

const UserProfile: React.FC<{ userData: any }> = ({ userData }) => {
  return (
    <div className="flex flex-wrap -mx-4">
      <div className="w-full md:w-1/6 px-4 mb-6 md:mb-0">
        <div className='relative w-32 h-32 shadow-md overflow-hidden rounded-full border border-gray-400 flex items-center justify-center'>
          <img
            src={userData?.profileImage}
            alt='user'
            className='rounded-full w-32 h-32 object-cover'
          />
        </div>
      </div>
      <div className="w-full md:w-5/6 px-4">
        <div className="flex flex-wrap -mx-4">
          {[
            { id: 'fullName', label: 'Your Name', value: userData?.fullName },
            { id: 'userName', label: 'User Name', value: userData?.userName },
            { id: 'email', label: 'Email', value: userData?.email },
            { id: 'dateOfBirth', label: 'Date of Birth', value: userData?.dateOfBirth },
            { id: 'presentAddress', label: 'Present Address', value: userData?.presentAddress },
            { id: 'permanentAddress', label: 'Permanent Address', value: userData?.permanentAddress },
            { id: 'city', label: 'City', value: userData?.city },
            { id: 'postalCode', label: 'Postal Code', value: userData?.postalCode },
            { id: 'country', label: 'Country', value: userData?.country },
          ].map((field) => (
            <div key={field.id} className="w-full md:w-1/2 px-4 mb-4">
              <label className="block text-[#232323] text-sm font-bold mb-2" htmlFor={field.id}>
                {field.label}
              </label>
              <div className="w-full px-3 py-2 border border-gray-300 rounded-md text-[#718EBF]">
                {field.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
