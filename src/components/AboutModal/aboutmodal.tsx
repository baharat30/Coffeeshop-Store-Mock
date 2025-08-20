import React from 'react';
import './aboutmodal.css';

interface AboutModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="about-modal-overlay" onClick={onClose}>
            <div className="about-modal" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>×</button>
                <h2>About Us</h2>
                <p>
                    HESS Coffee is a place for relaxation and unique coffee experiences.
                    Founded in 2023, we lovingly prepare the best drinks and desserts for you to enjoy sweet and delightful moments.        </p>
            </div>
        </div>
    );
};

export default AboutModal;

