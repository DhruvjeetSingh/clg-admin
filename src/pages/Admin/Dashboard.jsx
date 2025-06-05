import React, { useContext, useEffect } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const Dashboard = () => {

  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken])

  return dashData && (
    <div className="m-5">

      <div className="flex flex-wrap gap-3">
        {[
          { icon: assets.doctor_icon, count: dashData.doctors, label: 'Doctors' },
          { icon: assets.appointments_icon, count: dashData.appointments, label: 'Appointments' },
          { icon: assets.patients_icon, count: dashData.patients, label: 'Patients' },
        ].map(({ icon, count, label }, i) => (
          <div
            key={i}
            className="flex items-center gap-2 bg-green-50 p-4 min-w-52 rounded border-2 border-green-300 cursor-pointer hover:scale-105 hover:bg-green-100 transition-all"
          >
            <img className="w-14" src={icon} alt={`${label} icon`} />
            <div>
              <p className="text-xl font-semibold text-green-800">{count}</p>
              <p className="text-green-500">{label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-green-50 rounded mt-10 border border-green-300">
        <div className="flex items-center gap-2.5 px-4 py-4 rounded-t border-b border-green-300">
          <img src={assets.list_icon} alt="List icon" />
          <p className="font-semibold text-green-700">Latest Bookings</p>
        </div>

        <div className="pt-4">
          {dashData.latestAppointments.slice(0, 5).map((item, index) => (
            <div
              key={index}
              className="flex items-center px-6 py-3 gap-3 hover:bg-green-100 transition-colors cursor-default"
            >
              <img
                className="rounded-full w-10 border-2 border-green-400 object-cover"
                src={item.docData.image}
                alt={`${item.docData.name}'s avatar`}
              />
              <div className="flex-1 text-sm">
                <p className="text-green-800 font-medium">{item.docData.name}</p>
                <p className="text-green-600">Booking on {slotDateFormat(item.slotDate)}</p>
              </div>
              {item.cancelled ? (
                <p className="text-red-600 text-xs font-medium">Cancelled</p>
              ) : item.isCompleted ? (
                <p className="text-green-700 text-xs font-medium">Completed</p>
              ) : (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  aria-label={`Cancel appointment with Dr. ${item.docData.name}`}
                  className="w-10 cursor-pointer rounded-full hover:bg-green-200 transition-colors p-1"
                  type="button"
                >
                  <img src={assets.cancel_icon} alt="Cancel icon" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Dashboard
