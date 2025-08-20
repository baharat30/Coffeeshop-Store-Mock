import React from 'react';
import './usercard.css';

interface Props {
  fullName: string;
  email: string;
  username?: string;
  mobile?: string;
  address?: string;
  children?: React.ReactNode;
}

const UserCard: React.FC<Props> = ({
  fullName,
  email,
  username,
  mobile,
  address,
  children,
}) => {
  return (
    <div className="user-card">
      <h2 className='inf'>👤 {fullName}'s information :</h2>
      <p><strong>Email:</strong> {email}</p>
      {username && <p><strong>Username:</strong> {username}</p>}
      {mobile && <p><strong>Mobile:</strong> {mobile}</p>}
      {address && <p><strong>Address:</strong> {address}</p>}
      {children && <div className="usercard-actions">{children}</div>}
    </div>
  );
};

export default UserCard;
