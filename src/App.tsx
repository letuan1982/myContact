import React, { useEffect, useState } from 'react'
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import ContactForm from './components/ContactForm'
import ContactList from './components/ContactList'

interface Contact {
  id: string
  name: string
  phoneNum: string
  gender?: string
  mail?: string
  relative?: string
}

const App: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [editableContact, setEditableContact] = useState<Contact | null>(null)

  // Lấy danh bạ từ localStorage khi ứng dụng được tải
  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts')
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts))
    }
  }, [])

  // Lưu danh bạ vào localStorage khi nó thay đổi
  useEffect(() => {
    if (contacts.length > 0) {
      localStorage.setItem('contacts', JSON.stringify(contacts))
    }
  }, [contacts])

  const handleAddContact = (
    name: string,
    phoneNum: string,
    gender?: string,
    mail?: string,
    relative?: string,
  ) => {
    if (editableContact) {
      // Cập nhật liên hệ
      setContacts((prevContacts) =>
        prevContacts.map((contact) =>
          contact.id === editableContact.id
            ? { ...contact, name, phoneNum, gender, mail, relative }
            : contact,
        ),
      )
      setEditableContact(null) // Xóa trạng thái chỉnh sửa
    } else {
      // Thêm liên hệ mới
      const newContact: Contact = {
        id: Date.now().toString(),
        name,
        phoneNum,
        gender,
        mail,
        relative,
      }
      setContacts((prevContacts) => [...prevContacts, newContact])
    }
  }

  const handleEdit = (contact: Contact, navigate: (path: string) => void) => {
    setEditableContact(contact) // Đặt liên hệ cần chỉnh sửa
    navigate('/edit') // Chuyển sang trang chỉnh sửa
  }

  const handleDelete = (id: string) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== id),
    )
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto p-4">
          <nav className="mb-4">
            <Link to="/" className="text-blue-500 mr-4 hover:underline">
              Contact List
            </Link>
            <Link to="/add" className="text-blue-500 hover:underline">
              Add Contact
            </Link>
          </nav>
          <Routes>
            <Route
              path="/"
              element={
                <ContactList
                  contacts={contacts}
                  onDeleteContact={handleDelete}
                  onEditContact={handleEdit}
                />
              }
            />
            <Route
              path="/add"
              element={<ContactForm onAddContact={handleAddContact} />}
            />
            <Route
              path="/edit"
              element={
                <ContactForm
                  onAddContact={handleAddContact}
                  editableContact={editableContact}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
