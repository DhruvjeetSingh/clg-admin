import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {
  const { doctors, changeAvailability, aToken, getAllDoctors } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  }, [aToken])

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium text-green-900 mb-4">All Doctors</h1>
      <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
        {doctors.map((item, index) => (
          <div
            key={index}
            className="border border-green-300 rounded-xl max-w-56 overflow-hidden cursor-pointer group transition-shadow hover:shadow-lg"
          >
            <img
              className="bg-green-100 group-hover:bg-green-600 transition-all duration-500"
              src={item.image}
              alt={item.name}
            />
            <div className="p-4">
              <p className="text-green-900 text-lg font-medium">{item.name}</p>
              <p className="text-green-700 text-sm">{item.speciality}</p>
              <div className="mt-2 flex items-center gap-1 text-sm text-green-800">
                <input
                  onChange={() => changeAvailability(item._id)}
                  type="checkbox"
                  checked={item.available}
                  className="accent-green-600"
                />
                <p>Available</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorsList
