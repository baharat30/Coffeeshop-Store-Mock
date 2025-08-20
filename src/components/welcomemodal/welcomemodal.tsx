import React from "react";
import "./welcomemodal.css";

interface WelcomeModalProps {
  name: string;
  onClose: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ name, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Dear {name} 👋</h2>
        <p>Welcome to our website!</p>
      </div>
    </div>
  );
};

export default WelcomeModal;
