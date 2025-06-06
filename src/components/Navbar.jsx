import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const { dToken, setDToken } = useContext(DoctorContext)
  const { aToken, setAToken } = useContext(AdminContext)

  const navigate = useNavigate()

  const logout = () => {
    navigate('/')
    if (dToken) {
      setDToken('')
      localStorage.removeItem('dToken')
    }
    if (aToken) {
      setAToken('')
      localStorage.removeItem('aToken')
    }
  }

  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-green-50">
      <div className="flex items-center gap-2 text-xs">
        <img
          onClick={() => navigate('/')}
          className="w-36 sm:w-40 cursor-pointer"
          src={assets.admin_logo}
          alt="Logo"
        />
        <p className="border px-2.5 py-0.5 rounded-full border-green-500 text-green-700 font-semibold select-none">
          {aToken ? 'Admin' : 'Doctor'}
        </p>
      </div>
      <button
        onClick={logout}
        className="bg-green-700 hover:bg-green-800 text-white text-sm px-10 py-2 rounded-full transition duration-300 shadow-md hover:shadow-lg"
        aria-label="Logout"
      >
        Logout
      </button>
    </div>
  )
}

export default Navbar
