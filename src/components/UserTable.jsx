import React, { useState } from 'react';
import '../style/UserTable.css';

const UserTable = () => {
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')) || []);
  const [editId, setEditId] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);  // New state for delete modal
  const [deleteId, setDeleteId] = useState(null);  // Track which user to delete

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // Handle email input change with validation
  const handleEmailChange = (e) => {
    const lowercaseEmail = e.target.value.toLowerCase(); // Convert email to lowercase
    setEmail(lowercaseEmail);

    // Validate email format
    if (!validateEmail(lowercaseEmail)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError(''); // Clear error if valid email entered
    }
  };

  // Handle edit function
  const handleEdit = (user) => {
    setEditId(user.id);
    setUsername(user.username);
    setEmail(user.email);
    setShowModal(true);
    setEmailError('');
  };

  // Handle update function
  const handleUpdate = (e) => {
    e.preventDefault();

    // Validate email format before update
    if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      return;
    }

    // shows error if email is already in use
    const emailExists = users.some(user => user.email === email && user.id !== editId);
    if (emailExists) {
      setEmailError('This email ID already exists');
      return;
    } else {
      setEmailError('');
    }

    const updatedUsers = users.map(user =>
      user.id === editId ? { ...user, username, email } : user
    );
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setShowModal(false);
  };

  // Handle delete function
  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);  // Show delete confirmation modal
  };

  // Confirm delete function
  const confirmDelete = () => {
    const filteredUsers = users.filter(user => user.id !== deleteId);
    setUsers(filteredUsers);
    localStorage.setItem('users', JSON.stringify(filteredUsers));
    setShowDeleteModal(false);  // Hide delete modal
    setDeleteId(null);  // Reset deleteId
  };

  return (
    <div className="user-table-container">
      <h3 className="table-title">User List</h3>

      <table className="user-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleEdit(user)} className="edit-btn">Edit</button>
                <button onClick={() => handleDelete(user.id)} className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for editing user */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal_content">
            <h3>Edit User</h3>
            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <input 
                  type="text" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  placeholder="Edit username" 
                  required 
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <input 
                  type="email" 
                  value={email} 
                  onChange={handleEmailChange}  // Updated to include email validation
                  placeholder="Edit email" 
                  required 
                  className="form-input"
                />
                {emailError && <p className="error_text_p">{emailError}</p>} {/*shows error if email is not in proper format*/}
              </div>
              <div className="modal-actions">
                <button type="submit" className="save-btn">Save Changes</button>
                <button type="button" onClick={() => setShowModal(false)} className="cancel-btn">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal for confirming deletion */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal_content">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this user?</p>
            <div className="modal-actions">
              <button onClick={confirmDelete} className="save-btn">Yes, Delete</button>
              <button onClick={() => setShowDeleteModal(false)} className="cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;
