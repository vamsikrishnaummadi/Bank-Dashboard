import React, { useEffect, useState, useRef } from 'react';
import avatar from "../assets/avatar.png";
import { CameraIcon } from '@heroicons/react/24/outline';
import { useSelector, useDispatch} from 'react-redux';
import { RootState } from '../store/store';
import { setUser} from '../store/userSlice';
import axios from 'axios';
import { storage } from '../firebase'; // Make sure the path is correct
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';



const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const userData = useSelector((state: RootState) => state.user.userData);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <div className="flex mb-6 border-b border-gray-200">
        <button
          className={`py-2 px-4 ${activeTab === 'profile' ? 'border-b-4 rounded-b-sm border-[#1814F3] text-[#1814F3] font-medium' : 'text-[#718EBF] font-medium'}`}
          onClick={() => handleTabClick('profile')}
        >
          Edit Profile
        </button>
        <button
          className={`py-2 px-4 ${activeTab === 'preferences' ? 'border-b-4 rounded-b-sm border-[#1814F3] text-[#1814F3] font-medium' : 'text-[#718EBF] font-medium'}`}
          onClick={() => handleTabClick('preferences')}
        >
          Preferences
        </button>
        <button
          className={`py-2 px-4 ${activeTab === 'security' ? 'border-b-4 rounded-b-sm border-[#1814F3] text-[#1814F3] font-medium' : 'text-[#718EBF] font-medium'}`}
          onClick={() => handleTabClick('security')}
        >
          Security
        </button>
      </div>

      {activeTab === 'profile' && <EditProfile userData={userData} />}
      {activeTab === 'preferences' && <Preferences userData={userData}/>}
      {activeTab === 'security' && <Security userData={userData}/>}
    </div>
  );
};

const EditProfile: React.FC<{userData : object | null}> = ({userData}) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageFileUrl, setImageFileUrl] = useState<String | null>(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState<number>(0);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState<Boolean>(false);
  const filePickerRef = useRef();

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    fullName: '',
    userName: '',
    email: '',
    dateOfBirth: '',
    presentAddress: '',
    permanentAddress: '',
    city: '',
    postalCode: '',
    country: '',
    profileImage : ""
  });

  useEffect(() => {
      if (userData) {
         setFormData({
            fullName: userData?.user?.fullName || '',
            userName : userData?.user?.userName || '',
            email : userData?.user?.email || '',
            dateOfBirth: userData?.user?.dateOfBirth || '',
            presentAddress: userData?.user?.presentAddress || '',
            permanentAddress: userData?.user?.permanentAddress || '',
            city : userData?.user?.city || '',
            postalCode : userData?.user?.postalCode || '',
            country : userData?.user?.country || '',
            profileImage : userData?.user?.profileImage
         });
      }
  },[userData]);

  const handleImageChange = (e) => {
       const file = e.target.files[0];
       if (file) {
           setImageFile(file);
           setImageFileUrl(URL.createObjectURL(file));
       }
  };

  useEffect(() => {
    if (imageFile) {
       uploadImage();
    }
  },[imageFile]);

  const uploadImage = async() => {
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, `profile_images/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
         setImageFileUploadError('Could not upload image (File must be less than 2MB');
         setImageFileUploadProgress(null);
         setImageFile(null);
         setImageFileUrl(userData?.user?.profileImage);
         setImageFileUploading(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

        setImageFileUrl(downloadURL);
        
        try {
          const response = await axios.put(`/api/users/${userData?.user?.accountNumber}`, { profileImage: downloadURL });
          console.log(response);
          if (response.status === 200 && response.data.success === true) {
            const updatedUser = { user: response.data.data, accessToken: userData?.accessToken };
            dispatch(setUser(updatedUser));
          }else {
            setImageFileUploadError(response.data.message);
            setImageFileUploadProgress(null);
            setImageFile(null);
            setImageFileUrl(userData?.user?.profileImage);
            setImageFileUploading(false);
          }
        } catch (error) {
            setImageFileUploadError(error.message || "Updating Profile Image Failed");
            setImageFileUploadProgress(null);
            setImageFile(null);
            setImageFileUrl(userData?.user?.profileImage);
            setImageFileUploading(false);
        }
      }
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const checkChanges = () => {
    for (const key in formData) {
      if (formData[key as keyof typeof formData] !== userData?.user[key as keyof typeof userData]) {
        return true;
      }
    }
    return false;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (checkChanges()) {
      try {
        const response = await axios.put(`/api/users/${userData?.user?.accountNumber}`, formData);
        if (response.status === 200) {
          const updatedUser = { user: response.data.data, accessToken: userData?.accessToken };
          dispatch(setUser(updatedUser));
          alert("Profile updated successfully.");
        }
      } catch (error) {
        console.error("Error updating profile: ", error);
        alert("Failed to update profile.");
      }
    } else {
      alert('There are no changes to save.');
    }
  };

  return (
    <form className="flex flex-wrap -mx-4" onSubmit={handleSubmit}>
      <div className="flex flex-col justify-center items-center md:justify-start w-full md:w-1/6 px-4 mb-6 md:mb-0">
      <div
          className='relative w-32 h-32 cursor-pointer shadow-md overflow-hidden rounded-full border border-gray-400 flex items-center justify-center'
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadProgress > 0 && (
            <CircularProgressbar
              value={imageFileUploadProgress}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    imageFileUploadProgress / 100
                  })`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || formData.profileImage}
            alt='user'
            className={`rounded-full w-32 h-32 object-cover ${imageFileUploadProgress === 0 ? 
           
              'opacity-100' : 'opacity-60'
            }`}
          />
            <input
              id="file-input"
              type="file"
              className="hidden"
              accept="image/*"
              ref={filePickerRef}
              onChange={handleImageChange}
            />
        </div>
        {imageFileUploadError && <p className='text-red-500 font-semibold'>{imageFileUploadError}</p>}
      </div>
      <div className="w-full md:w-5/6 px-4">
        <div className="flex flex-wrap -mx-4">
          {[
            { id: 'fullName', label: 'Your Name' },
            { id: 'userName', label: 'User Name' },
            { id: 'email', label: 'Email' },
            { id: 'password', label: 'Password' },
            { id: 'dateOfBirth', label: 'Date of Birth' },
            { id: 'presentAddress', label: 'Present Address' },
            { id: 'permanentAddress', label: 'Permanent Address' },
            { id: 'city', label: 'City' },
            { id: 'postalCode', label: 'Postal Code' },
            { id: 'country', label: 'Country' },
          ].map((field) => (
            <div key={field.id} className="w-full md:w-1/2 px-4 mb-4">
              <label className="block text-[#232323] text-sm font-bold mb-2" htmlFor={field.id}>
                {field.label}
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-[#718EBF] placeholder:text-[#718EBF]"
                id={field.id}
                name={field.id}
                value={field.id === "password" ? "*********" : formData[field.id]}
                type="text"
                disabled={field.id === 'password' ? true : false}
                placeholder={field.label}
                onChange={handleChange}
              />
            </div>
          ))}
        </div>
        <div className="w-full flex md:justify-end">
            <button type="submit" className="w-full md:w-32 px-4 py-2 bg-[#1814F3] text-white rounded-lg">Save</button>
         </div>
      </div>
    </form>
  );
};


const Preferences: React.FC<{userData : object | null}> = ({userData}) => {
     const [formData, setFormData] = useState({
         currency : '',
         timeZone : '',
         enableDigitalCurrency : false,
         enableNotifications: false,
         enableRecomendations: false 
     });

     const dispatch = useDispatch();

     useEffect(() => {
       if (userData) {
         setFormData({
           currency: userData?.user?.currency || '',
           timeZone: userData?.user?.timeZone || '',
           enableDigitalCurrency: userData?.user?.enableDigitalCurrency || false,
           enableNotifications: userData?.user?.enableNotifications || false,
           enableRecomendations: userData?.user?.enableRecomendations || false
         });
       }
     }, [userData]);

     const checkChanges = () => {
      for (const key in formData) {
        if (formData[key as keyof typeof formData]  !== userData?.user[key as keyof typeof userData]) {
           return true;
        }
      }
      return false;
    };
   
     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
       const { name, value, type, checked } = e.target;
       setFormData((prevFormData) => ({
         ...prevFormData,
         [name]: type === 'checkbox' ? checked : value
       }));
     };
   
     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
       e.preventDefault();
       if (checkChanges()){
       try {
         const response = await axios.put(`/api/users/${userData?.user?.accountNumber}`, formData);
         if (response.status === 200) {
           const updatedUser = { user: response.data.data, accessToken: userData?.accessToken };
           dispatch(setUser(updatedUser));
           alert("Preferences updated successfully.");
         }
       } catch (error) {
         console.error("Error updating preferences: ", error);
         alert("Failed to update preferences.");
       }
      }else {
        alert("There is no changes to Save");
      }
     };
   
  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full md:w-6/6 px-4">
        <div className='flex flex-wrap -mx-4'>
          <div className="w-full md:w-1/2 px-4 mb-4">
            <label className="block text-[#333B69] text-md font-semibold mb-2" htmlFor="currency">
              Currency
            </label>
            <select 
               className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder:text-[#718EBF] text-[#718EBF]"
               id="currency" 
               name="currency"
               value={formData.currency}
               onChange={handleChange}
               >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="JPY">JPY</option>
              <option value="CAD">CAD</option>
              <option value="CHF">CHF</option>
              <option value="CNF">CNY</option>
              <option value="INR" selected>INR</option>
              <option value="GBP">GBP</option>
              <option value="BRL">BRL</option>
            </select>
          </div>
          <div className="w-full md:w-1/2 px-4 mb-4">
            <label className="block text-[#333B69] text-md font-semibold mb-2" htmlFor="timeZone">
              Time Zone
            </label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder:text-[#718EBF] text-[#718EBF]" 
              id="timeZone" 
              name="timeZone"
              value={formData.timeZone}
              onChange={handleChange}
            >
              <option value="pst">PST</option>
              <option value="mst">MST</option>
              <option value="cst">CST</option>
              <option value="est">EST</option>
            </select>
          </div>
        </div>
      </div>
      <div className="mb-4 px-4">
        <h3 className="text-[#333B69] text-md font-semibold mb-2">Notifications</h3>
        <div className="flex items-center mb-2">
          <label className="inline-flex items-center cursor-pointer" htmlFor='enableDigitalCurrency'>
              <input 
                type="checkbox" 
                id="enableDigitalCurrency" 
                name="enableDigitalCurrency" 
                checked={formData.enableDigitalCurrency}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 dark:peer-focus:ring-[#16DBCC] dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#16DBCC]"></div>
              <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">I send or receive digital currency</span>
          </label>
        </div>
        <div className="flex items-center mb-2">
            <label className="inline-flex items-center cursor-pointer" htmlFor='enableNotifications'>
              <input 
                type="checkbox" 
                id="enableNotifications" 
                name="enableNotifications" 
                checked={formData.enableNotifications}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 dark:peer-focus:ring-[#16DBCC] dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#16DBCC]"></div>
              <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">I receive merchant order</span>
            </label>
        </div>
        <div className="flex items-center mb-2">
            <label className="inline-flex items-center cursor-pointer" htmlFor='enableRecomendations'>
              <input 
                type="checkbox" 
                id="enableRecomendations" 
                name="enableRecomendations" 
                checked={formData.enableRecomendations}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 dark:peer-focus:ring-[#16DBCC] dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#16DBCC]"></div>
              <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">There are recommendations for my account</span>
            </label>
        </div>
      </div>
      <div className="w-full flex md:justify-end">
            <button type="submit" className="w-full md:w-32 px-4 py-2 bg-[#1814F3] text-white rounded-lg">Save</button>
      </div>
    </form>
  );
};


const Security: React.FC<{userData : object | null}> = ({userData}) => {
  const [formData, setFormData] = useState({
     enabletwoFactorAuthentication : false,
     currentPassword : '',
     newPassword : '' 
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]:  value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log(formData);
    e.preventDefault();

    try {
      const response = await axios.put(`/api/users/password/${userData?.user?.accountNumber}`, {currentPassword: formData.currentPassword, newPassword: formData.newPassword});
      console.log(response);
      if (response.status === 200) {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error updating : ", error);
      alert(response.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <h3 className="text-[#333B69] text-md font-semibold mb-4">Two-factor Authentication</h3>
        <div className="flex items-center mb-4">
          <label className="inline-flex items-center cursor-pointer" htmlFor='enabletwoFactorAuthentication'>
              <input 
                type="checkbox" 
                id="enabletwoFactorAuthentication" 
                name="enabletwoFactorAuthentication" 
                checked={formData.enabletwoFactorAuthentication} 
                disabled
                className="sr-only peer"/>
              <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 dark:peer-focus:ring-[#16DBCC] dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#16DBCC]"></div>
              <span className="ms-3 text-sm font-medium text-[#232323] dark:text-gray-300">Enable or disable two factor authentication</span>
          </label>
        </div>
      </div>
      <div className="mb-4 w-full md:w-3/6">
        <label className="block text-[#333B69] text-sm font-semibold mb-2" htmlFor="currentPassword">
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
        <label className="block text-[#333B69] text-sm font-semibold mb-2" htmlFor="newPassword">
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
            <button type="submit" className="w-full md:w-32 px-4 py-2 bg-[#1814F3] text-white rounded-lg">Save</button>
      </div>
    </form>
  );
};

export default Settings;