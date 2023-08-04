import React from 'react';
import Heading5 from '../headings/Heading5';

const Modal = ({ isOpen, closeModal }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        backgroundColor: '#1a1f2c',
        padding: '20px',
        borderRadius: '10px',
      }}>
        <Heading5>Coming Soon</Heading5>
        <Heading5>We are working hard and will be ready to launch soon. Stay tuned!</Heading5>
        <button className="btn btn--primary" onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
