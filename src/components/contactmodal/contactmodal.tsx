import React from "react";
import "./contactmodal.css";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Contact Us</h2>
        <p>Email: HESSCoffee@gmail.com</p>
        <p>Phone: +989180000000</p>
        <p>Address: Sanandaj, Iran</p>
      </div>
    </div>
  );
};

export default ContactModal;
