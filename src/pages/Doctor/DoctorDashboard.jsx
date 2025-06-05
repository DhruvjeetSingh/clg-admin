import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'

const DoctorDashboard = () => {
  const { dToken, dashData, getDashData, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const { slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getDashData()
    }
  }, [dToken])

  return dashData && (
    <div className="p-6 space-y-8 bg-[#f9fdfb] min-h-screen">

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="flex items-center bg-white p-5 rounded-2xl shadow border-l-4 border-green-500 hover:scale-[1.02] transition-all">
          <img className="w-12 mr-4" src={assets.earning_icon} alt="Earnings" />
          <div>
            <p className="text-2xl font-bold text-green-700">{currency} {dashData.earnings}</p>
            <p className="text-gray-500">Earnings</p>
          </div>
        </div>
        <div className="flex items-center bg-white p-5 rounded-2xl shadow border-l-4 border-green-500 hover:scale-[1.02] transition-all">
          <img className="w-12 mr-4" src={assets.appointments_icon} alt="Appointments" />
          <div>
            <p className="text-2xl font-bold text-green-700">{dashData.appointments}</p>
            <p className="text-gray-500">Appointments</p>
          </div>
        </div>
        <div className="flex items-center bg-white p-5 rounded-2xl shadow border-l-4 border-green-500 hover:scale-[1.02] transition-all">
          <img className="w-12 mr-4" src={assets.patients_icon} alt="Patients" />
          <div>
            <p className="text-2xl font-bold text-green-700">{dashData.patients}</p>
            <p className="text-gray-500">Patients</p>
          </div>
        </div>
      </div>

      {/* Latest Bookings */}
      <div className="bg-white rounded-2xl shadow border">
        <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-200 bg-green-50 rounded-t-2xl">
          <img src={assets.list_icon} alt="List Icon" className="w-5" />
          <h2 className="text-lg font-semibold text-green-700">Latest Bookings</h2>
        </div>

        {dashData.latestAppointments.length === 0 ? (
          <div className="px-6 py-5 text-gray-500">No recent bookings.</div>
        ) : (
          dashData.latestAppointments.slice(0, 5).map((item, index) => (
            <div key={index} className="flex items-center gap-4 px-6 py-4 hover:bg-green-50 transition">
              <img className="rounded-full w-10 h-10 object-cover" src={item.userData.image} alt={item.userData.name} />
              <div className="flex-1">
                <p className="text-green-800 font-semibold">{item.userData.name}</p>
                <p className="text-sm text-gray-500">Booking on {slotDateFormat(item.slotDate)}</p>
              </div>
              <div className="flex gap-2 items-center">
                {item.cancelled ? (
                  <span className="text-red-500 text-sm font-semibold">Cancelled</span>
                ) : item.isCompleted ? (
                  <span className="text-green-600 text-sm font-semibold">Completed</span>
                ) : (
                  <>
                    <img
                      onClick={() => cancelAppointment(item._id)}
                      className="w-8 h-8 cursor-pointer hover:scale-105 transition"
                      src={assets.cancel_icon}
                      alt="Cancel"
                      title="Cancel"
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
          ))
        )}
      </div>
    </div>
  )
}

export default DoctorDashboard
