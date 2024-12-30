import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Contact {
  id: string
  name: string
  phoneNum: string
  gender?: string
  mail?: string
  relative?: string
}

interface ContactListProps {
  contacts: Contact[]
  onDeleteContact: (id: string) => void
  onEditContact: (contact: Contact, navigate: (path: string) => void) => void
}

const ContactList: React.FC<ContactListProps> = ({
  contacts,
  onDeleteContact,
  onEditContact,
}) => {
  const [searchTerm, setSearchTerm] = useState('') // State lưu giá trị tìm kiếm
  const navigate = useNavigate()

  // Hàm xử lý tìm kiếm
  const filteredContacts = contacts.filter((contact) => {
    return (
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) || // Tìm kiếm theo tên
      contact.phoneNum.includes(searchTerm) // Tìm kiếm theo số điện thoại
    )
  })

  // Sắp xếp danh bạ theo thứ tự chữ cái của tên
  const sortedContacts = [...filteredContacts].sort((a, b) =>
    a.name.localeCompare(b.name),
  )

  const handleDelete = (id: string) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this contact?',
    )
    if (confirmed) {
      onDeleteContact(id) // Nếu người dùng xác nhận, xóa liên hệ
    }
  }

  return (
    <div className="bg-sky-200 px-4 py-2 rounded">
      <div className="mt-4 w-full">
        <h2 className="text-4xl text-center font-bold mb-4 text-blue-700">
          CONTACT LIST
        </h2>

        {/* Thanh tìm kiếm */}
        <div className="mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name or phone number..."
            className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700"
          />
        </div>

        {sortedContacts.length === 0 ? (
          <p className="text-gray-500">No contacts match your search!</p>
        ) : (
          <ul className="space-y-2">
            {sortedContacts.map((contact) => (
              <li
                key={contact.id}
                className="flex-1 justify-between items-center bg-white p-2 shadow rounded"
              >
                <div className="w-80">
                  <p className="font-bold">{`Name: ${contact.name}`}</p>
                  <p className="text-gray-500">{`Phone: +${contact.phoneNum}`}</p>
                  <p className="text-gray-500">{`Gender: ${contact.gender}`}</p>
                  <p className="text-gray-500">{`Mail: ${contact.mail}`}</p>
                  <p className="text-gray-500">{`Relative: ${contact.relative}`}</p>
                </div>
                <div className="flex m-2 justify-center">
                  {/* Nút chỉnh sửa */}
                  <button
                    onClick={() => onEditContact(contact, navigate)}
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-1 rounded mx-2 w-20"
                  >
                    Edit
                  </button>
                  {/* Nút xóa */}
                  <button
                    onClick={() => handleDelete(contact.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-1 rounded mx-2 w-20"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default ContactList
