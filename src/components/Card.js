import React, { useState } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import CardDetailsModal from './CardDetailsModal';
import { Calendar, Tag, Paperclip, MessageSquare } from 'lucide-react';

const CardContainer = styled.div`
  background: white;
  border-radius: 3px;
  padding: 8px;
  margin-bottom: 8px;
  box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
  cursor: pointer;
`;

const CardTitle = styled.div`
  font-weight: bold;
  margin-bottom: 8px;
`;

const CardMeta = styled.div`
  display: flex;
  font-size: 12px;
  color: #5e6c84;
  gap: 8px;
`;

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Card = ({ card, index, deleteCard, updateCard }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveCard = (cardId, updatedCardData) => {
    updateCard(cardId, updatedCardData);
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
            <CardTitle>{card.title}</CardTitle>
            <CardMeta>
              {card.dueDate && (
                <MetaItem>
                  <Calendar size={14} />
                  {new Date(card.dueDate).toLocaleDateString()}
                </MetaItem>
              )}
              {card.labels && card.labels.length > 0 && (
                <MetaItem>
                  <Tag size={14} />
                  {card.labels.length}
                </MetaItem>
              )}
              {card.attachments && card.attachments.length > 0 && (
                <MetaItem>
                  <Paperclip size={14} />
                  {card.attachments.length}
                </MetaItem>
              )}
              {card.comments && card.comments.length > 0 && (
                <MetaItem>
                  <MessageSquare size={14} />
                  {card.comments.length}
                </MetaItem>
              )}
            </CardMeta>
          </CardContainer>
        )}
      </Draggable>
      {isModalOpen && (
        <CardDetailsModal
          card={card}
          onClose={handleCloseModal}
          onSave={handleSaveCard}
          deleteCard={deleteCard}
        />
      )}
    </>
  );
};

export default Card;