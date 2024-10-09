import React, { useState } from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 500px;
  max-width: 90%;
`;

const CloseButton = styled.button`
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 5px;
  cursor: pointer;
  float: right;
`;

const SaveButton = styled.button`
  background: #5aac44;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 10px;
  cursor: pointer;
  margin-top: 10px;
`;

const DeleteButton = styled.button`
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 10px;
  cursor: pointer;
  margin-top: 10px;
`;

const CardDetailsModal = ({ card, onClose, onSave, deleteCard }) => {
  const [content, setContent] = useState(card.content);

  const handleSave = () => {
    onSave(card.id, content);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this card?')) {
      deleteCard(card.id);
      onClose();
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>Close</CloseButton>
        <h2>Edit Card</h2>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="5"
          style={{ width: '100%' }}
        />
        <SaveButton onClick={handleSave}>Save</SaveButton>
        <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default CardDetailsModal;