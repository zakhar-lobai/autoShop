import React, { useState, useEffect } from 'react';
import {
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  deleteUser,
  updateProfile,
} from 'firebase/auth';

const Account: React.FC = () => {
  const auth = getAuth();
  const [user, setUser] = useState<any | null>(null);
  const [newDisplayName, setNewDisplayName] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [defaultImageUrl, setDefaultImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Set the default image URL when the component mounts
    // Replace 'URL_TO_YOUR_DEFAULT_IMAGE' with your actual default image URL
    setDefaultImageUrl('../assets/images/default-user.jpg');
  }, []);

  const handleUpdateProfile = async () => {
    try {
      await updateProfile(auth.currentUser!, {
        displayName: newDisplayName,
        photoURL: profileImage ? URL.createObjectURL(profileImage) : defaultImageUrl,
      });
      setNewDisplayName('');
      setProfileImage(null);
      setError(null);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setError(null);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteUser(auth.currentUser!);
      setUser(null);
    } catch (error: any) {
      setError(error.message);
    }
  };

  onAuthStateChanged(auth, (userData) => {
    setUser(userData);
  });

  return (
    <div className='mt-100'>
      <h1>Account Page</h1>
      {user ? (
        <div>
          <p>Email: {user.email}</p>
          <p>Display Name: {user.displayName}</p>

          
          <div className='flex'>
            {/* Update Profile */}
            <input
                type="text"
                placeholder="New Display Name"
                value={newDisplayName}
                onChange={(e) => setNewDisplayName(e.target.value)}
            />
            <input type="file" accept="image/*" onChange={(e) => setProfileImage(e.target.files?.[0] || null)} />
            <button onClick={handleUpdateProfile}>Update Display Name</button>
          </div>
          <input
            type="text"
            placeholder="New Display Name"
            value={newDisplayName}
            onChange={(e) => setNewDisplayName(e.target.value)}
          />
          <input type="file" accept="image/*" onChange={(e) => setProfileImage(e.target.files?.[0] || null)} />
          <button onClick={handleUpdateProfile}>Update Display Name</button>

          {/* Reset Password */}
          <input
            type="text"
            placeholder="Email for Password Reset"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
          />
          <button onClick={handleResetPassword}>Reset Password</button>

          {/* Delete Account */}
          <button onClick={handleDeleteAccount}>Delete Account</button>

          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      ) : (
        <p>User not logged in.</p>
      )}
    </div>
  );
};

export default Account;