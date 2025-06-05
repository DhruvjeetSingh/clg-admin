import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData } = useContext(DoctorContext);
  const { currency, backendUrl } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        about: profileData.about,
        available: profileData.available,
      };

      const { data } = await axios.post(`${backendUrl}/api/doctor/update-profile`, updateData, {
        headers: { dToken },
      });

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  useEffect(() => {
    if (dToken) getProfileData();
  }, [dToken]);

  return (
    profileData && (
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row sm:items-start gap-8">
          {/* Image container with fixed size */}
          <div className="flex-shrink-0">
            <img
              src={profileData.image}
              alt="Doctor"
              className="w-48 h-48 rounded-xl object-cover shadow border bg-green-100"
            />
          </div>

          {/* Profile info section flex-grow */}
          <div className="flex-1 bg-white rounded-xl shadow border p-6 flex flex-col gap-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">{profileData.name}</h2>
              <p className="text-gray-600">{profileData.degree} - {profileData.speciality}</p>
              <span className="text-xs bg-green-100 border border-green-500 text-green-700 px-2 py-0.5 rounded-full inline-block mt-1">
                {profileData.experience}
              </span>
            </div>

            {/* About */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-1">About:</h3>
              {isEdit ? (
                <textarea
                  rows={5}
                  className="w-full p-2 border rounded outline-green-600 resize-none"
                  value={profileData.about}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, about: e.target.value }))}
                />
              ) : (
                <p className="text-gray-600 whitespace-pre-wrap">{profileData.about}</p>
              )}
            </div>

            {/* Fees */}
            <div className="text-sm">
              <span className="font-medium text-gray-700">Appointment Fee:</span>{' '}
              <span className="text-gray-800">
                {currency}{' '}
                {isEdit ? (
                  <input
                    type="number"
                    className="border px-2 py-1 rounded outline-green-600 w-24 ml-1"
                    value={profileData.fees}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, fees: e.target.value }))}
                  />
                ) : (
                  profileData.fees
                )}
              </span>
            </div>

            {/* Address */}
            <div className="text-sm space-y-1">
              <span className="font-medium text-gray-700">Address:</span>
              <div className="flex flex-col sm:flex-row sm:gap-4">
                {isEdit ? (
                  <>
                    <input
                      type="text"
                      placeholder="Line 1"
                      value={profileData.address.line1}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          address: { ...prev.address, line1: e.target.value },
                        }))
                      }
                      className="border px-2 py-1 rounded outline-green-600 w-full sm:w-auto mb-2 sm:mb-0"
                    />
                    <input
                      type="text"
                      placeholder="Line 2"
                      value={profileData.address.line2}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          address: { ...prev.address, line2: e.target.value },
                        }))
                      }
                      className="border px-2 py-1 rounded outline-green-600 w-full sm:w-auto"
                    />
                  </>
                ) : (
                  <>
                    <p>{profileData.address.line1}</p>
                    <p>{profileData.address.line2}</p>
                  </>
                )}
              </div>
            </div>

            {/* Availability */}
            <div className="flex items-center gap-2 pt-2 text-sm">
              <input
                type="checkbox"
                checked={profileData.available}
                onChange={() =>
                  isEdit && setProfileData((prev) => ({ ...prev, available: !prev.available }))
                }
                className="w-4 h-4 cursor-pointer"
              />
              <label className="cursor-pointer select-none">Available for appointments</label>
            </div>

            {/* Action Buttons */}
            <div className="pt-4">
              {isEdit ? (
                <button
                  onClick={updateProfile}
                  className="px-6 py-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition"
                >
                  Save Changes
                </button>
              ) : (
                <button
                  onClick={() => setIsEdit(true)}
                  className="px-6 py-2 rounded-full border border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
