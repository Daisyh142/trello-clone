import React, { useState } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import CardDetailsModal from './CardDetailsModal';

const CardContainer = styled.div`
  background: white;
  border-radius: 3px;
  padding: 8px;
  margin-bottom: 8px;
  box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Card = ({ card, index, deleteCard, updateCardContent }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveContent = (cardId, newContent) => {
    updateCardContent(cardId, newContent);
    handleCloseModal();
  };

  return (
    <>
      <Draggable draggableId={card.id} index={index}>
        {(provided) => (
          <CardContainer
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            onClick={handleOpenModal}
          >
            {card.content}
          </CardContainer>
        )}
      </Draggable>
      {isModalOpen && (
        <CardDetailsModal
          card={card}
          onClose={handleCloseModal}
          onSave={handleSaveContent}
          deleteCard={deleteCard}
        />
      )}
    </>
  );
};

export default Card;