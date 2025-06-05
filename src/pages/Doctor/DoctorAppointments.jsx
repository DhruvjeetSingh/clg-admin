import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const DoctorAppointments = () => {
  const { dToken, appointments, getAppointments, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getAppointments()
    }
  }, [dToken])

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-4">
      <h1 className="text-2xl font-semibold text-green-800 mb-4">All Appointments</h1>

      <div className="bg-white border rounded-xl shadow overflow-x-auto max-h-[80vh]">
        <div className="hidden md:grid grid-cols-[40px_2fr_1fr_1fr_2fr_1fr_1fr] gap-4 px-6 py-4 border-b bg-green-50 text-green-800 font-medium text-sm rounded-t-xl">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {appointments.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:grid grid-cols-[40px_2fr_1fr_1fr_2fr_1fr_1fr] gap-4 px-6 py-4 items-center border-b hover:bg-green-50 transition text-sm text-gray-700"
          >
            <p className="hidden md:block">{index + 1}</p>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <img src={item.userData.image} className="w-8 h-8 rounded-full object-cover" alt="Patient" />
              <p className="font-medium text-gray-800">{item.userData.name}</p>
            </div>

            <div className="text-xs">
              <span className={`px-2 py-0.5 rounded-full border ${item.payment ? 'border-green-500 text-green-600' : 'border-yellow-500 text-yellow-600'}`}>
                {item.payment ? 'Online' : 'CASH'}
              </span>
            </div>

            <p className="hidden md:block">{calculateAge(item.userData.dob)}</p>
            <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
            <p>{currency}{item.amount}</p>

            <div className="flex items-center gap-2">
              {item.cancelled ? (
                <span className="text-red-500 font-semibold text-xs">Cancelled</span>
              ) : item.isCompleted ? (
                <span className="text-green-600 font-semibold text-xs">Completed</span>
              ) : (
                <>
                  <img
                    onClick={() => cancelAppointment(item._id)}
                    className="w-8 h-8 cursor-pointer hover:scale-105 transition"
                    src={assets.cancel_icon}
                    alt="Cancel"
                    title="Cancel Appointment"
                  />
                  <img
                    onClick={() => completeAppointment(item._id)}
                    className="w-8 h-8 cursor-pointer hover:scale-105 transition"
                    src={assets.tick_icon}
                    alt="Complete"
                    title="Mark as Completed"
                  />
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorAppointments
