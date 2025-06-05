import React, { useEffect, useState, useContext } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const AllAppointments = () => {
  const { aToken, appointments, cancelAppointment, getAllAppointments } = useContext(AdminContext)
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (aToken) {
      setLoading(true)
      getAllAppointments().finally(() => setLoading(false))
    }
  }, [aToken])

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium text-green-800">All Appointments</p>

      <div className="bg-green-50 border border-green-300 rounded text-sm max-h-[80vh] overflow-y-auto">
        {/* Table header for large screens */}
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] py-3 px-6 border-b border-green-300 bg-green-100 text-green-700 font-semibold">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {loading ? (
          <p className="p-6 text-center text-green-600">Loading appointments...</p>
        ) : appointments.length === 0 ? (
          <p className="p-6 text-center text-green-600">No appointments found.</p>
        ) : (
          appointments.map((item, index) => (
            <div
              key={item._id}
              className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-green-800 py-3 px-6 border-b border-green-200 hover:bg-green-100 transition-colors"
            >
              <p className="max-sm:hidden">{index + 1}</p>

              <div className="flex items-center gap-2">
                <img
                  src={item.userData.image}
                  alt={`${item.userData.name}'s avatar`}
                  className="w-8 h-8 rounded-full object-cover border-2 border-green-400"
                />
                <p>{item.userData.name}</p>
              </div>

              <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>

              <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>

              <div className="flex items-center gap-2">
                <img
                  src={item.docData.image}
                  alt={`Dr. ${item.docData.name}'s avatar`}
                  className="w-8 h-8 rounded-full object-cover border-2 border-green-400 bg-green-50"
                />
                <p>{item.docData.name}</p>
              </div>

              <p>{currency}{item.amount}</p>

              {item.cancelled ? (
                <p className="text-red-600 text-xs font-medium">Cancelled</p>
              ) : item.isCompleted ? (
                <p className="text-green-700 text-xs font-medium">Completed</p>
              ) : (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  aria-label={`Cancel appointment for ${item.userData.name}`}
                  className="w-10 cursor-pointer rounded-full hover:bg-green-200 transition-colors p-1"
                  type="button"
                >
                  <img src={assets.cancel_icon} alt="Cancel icon" />
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default AllAppointments
