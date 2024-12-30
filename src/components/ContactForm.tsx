import React, { useEffect, useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useNavigate } from 'react-router-dom'

interface ContactFormProps {
  onAddContact: (
    name: string,
    phoneNum: string,
    gender?: string,
    mail?: string,
    relative?: string,
  ) => void
  editableContact?: {
    name: string
    phoneNum: string
    gender?: string
    mail?: string
    relative?: string
  } | null
}

const ContactForm: React.FC<ContactFormProps> = ({
  onAddContact,
  editableContact,
}) => {
  const [name, setName] = useState('')
  const [phoneNum, setPhoneNum] = useState('')
  const [gender, setGender] = useState('')
  const [mail, setMail] = useState('')
  const [relative, setRelative] = useState('Others')

  const navigate = useNavigate() // Hook chuyển hướng

  useEffect(() => {
    if (editableContact) {
      setName(editableContact.name)
      setPhoneNum(editableContact.phoneNum)
      setGender(editableContact.gender || '')
      setMail(editableContact.mail || '')
      setRelative(editableContact.relative || 'Others')
    }
  }, [editableContact])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !phoneNum) {
      alert('Name and phone number are required!')
      return
    }
    onAddContact(name, phoneNum, gender || '', mail || '', relative)
    navigate('/') // Chuyển về danh sách sau khi submit
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-sky-200 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full"
    >
      <h2 className="font-bold text-4xl text-center text-blue-700 mb-4">
        {editableContact ? 'EDIT CONTACT' : 'ADD CONTACT'}
      </h2>

      {/* Name */}
      <div className="mb-4">
        <label className="flex">
          <p className="text-gray-700 text-sm font-bold mb-0.5">Name</p>
          <p className="text-red-500 text-left text-xs font-bold">(*)</p>
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name!"
          className="w-80 shadow appearance-none border rounded py-2 px-3 text-gray-700"
        />
      </div>

      {/* Phone Number */}
      <div className="mb-4">
        <label className="flex">
          <p className="text-gray-700 text-sm font-bold mb-0.5">Phone number</p>
          <p className="text-red-500 text-left text-xs font-bold">(*)</p>
        </label>
        <PhoneInput
          country={'vn'} // Mã quốc gia mặc định (VN: Việt Nam)
          value={phoneNum}
          onChange={(phone) => setPhoneNum(phone)}
          inputClass="phone-input-custom"
          buttonClass="phone-button-custom"
        />
      </div>

      {/* Gender */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-0.5">
          Gender
        </label>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700"
        >
          <option value="" disabled>
            You can skip this information!
          </option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Others">Others</option>
        </select>
      </div>

      {/* Mail */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-0.5">
          Mail
        </label>
        <input
          type="email"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          placeholder="Example@abc.com"
          className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700"
        />
      </div>

      {/* Relative */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-0.5">
          Relative
        </label>
        <select
          value={relative}
          onChange={(e) => setRelative(e.target.value)}
          className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700"
        >
          <option value="Others">Others</option>
          <option value="Family">Family</option>
          <option value="Relatives">Relatives</option>
          <option value="Friends">Friends</option>
          <option value="Colleagues">Colleagues</option>
          <option value="Partners">Partners</option>
        </select>
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {editableContact ? 'Update Contact' : 'Add Contact'}
        </button>
      </div>
    </form>
  )
}

export default ContactForm
