import React, { useContext, useState, useEffect } from 'react'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('1 Year')
  const [fees, setFees] = useState('')
  const [about, setAbout] = useState('')
  const [speciality, setSpeciality] = useState('General physician')
  const [degree, setDegree] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')
  const [loading, setLoading] = useState(false)

  const { backendUrl } = useContext(AppContext)
  const { aToken } = useContext(AdminContext)

  // Cleanup object URL for image preview to avoid memory leaks
  useEffect(() => {
    if (!docImg) {
      setPreviewUrl('')
      return
    }
    const objectUrl = URL.createObjectURL(docImg)
    setPreviewUrl(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [docImg])

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    if (!docImg) {
      return toast.error('Image Not Selected')
    }

    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('image', docImg)
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('experience', experience)
      formData.append('fees', Number(fees))
      formData.append('about', about)
      formData.append('speciality', speciality)
      formData.append('degree', degree)
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))

      const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, {
        headers: { aToken },
      })

      if (data.success) {
        toast.success(data.message)

        // Reset form fields
        setDocImg(null)
        setName('')
        setPassword('')
        setEmail('')
        setAddress1('')
        setAddress2('')
        setDegree('')
        setAbout('')
        setFees('')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full max-w-5xl mx-auto">
      <h2 className="mb-6 text-xl font-semibold text-green-900">Add Doctor</h2>

      <section className="bg-green-50 px-8 py-8 border border-green-300 rounded max-h-[80vh] overflow-y-auto">
        <div className="flex items-center gap-4 mb-8 text-green-700">
          <label htmlFor="doc-img" className="cursor-pointer">
            <img
              className="w-16 h-16 bg-green-100 rounded-full object-cover border-2 border-green-300"
              src={previewUrl || assets.upload_area}
              alt="Upload doctor"
            />
          </label>
          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type="file"
            id="doc-img"
            accept="image/*"
            hidden
          />
          <p>Upload doctor <br /> picture</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 text-green-800">
          <div className="w-full lg:flex-1 flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="font-medium">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="font-medium">Doctor Email</label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="font-medium">Set Password</label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="experience" className="font-medium">Experience</label>
              <select
                id="experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="border border-green-300 rounded px-2 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Years</option>
                <option value="3 Year">3 Years</option>
                <option value="4 Year">4 Years</option>
                <option value="5 Year">5 Years</option>
                <option value="6 Year">6 Years</option>
                <option value="8 Year">8 Years</option>
                <option value="9 Year">9 Years</option>
                <option value="10 Year">10 Years</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="fees" className="font-medium">Fees</label>
              <input
                id="fees"
                type="number"
                placeholder="Doctor fees"
                value={fees}
                onChange={(e) => setFees(e.target.value)}
                className="border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>
          </div>

          <div className="w-full lg:flex-1 flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <label htmlFor="speciality" className="font-medium">Speciality</label>
              <select
                id="speciality"
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
                className="border border-green-300 rounded px-2 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="degree" className="font-medium">Degree</label>
              <input
                id="degree"
                type="text"
                placeholder="Degree"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                className="border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium">Address</label>
              <input
                type="text"
                placeholder="Address 1"
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                className="border border-green-300 rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
              <input
                type="text"
                placeholder="Address 2"
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                className="border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <label htmlFor="about" className="font-medium text-green-900">About Doctor</label>
          <textarea
            id="about"
            rows={5}
            placeholder="Write about doctor"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="w-full px-4 pt-2 border border-green-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 px-10 py-3 mt-6 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Adding...' : 'Add Doctor'}
        </button>
      </section>
    </form>
  )
}

export default AddDoctor
