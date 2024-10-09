import React, { useState } from 'react';
import styled from 'styled-components';
import Card from './Card';
import { Droppable } from 'react-beautiful-dnd';

const ListContainer = styled.div`
  background: #ebecf0;
  border-radius: 3px;
  width: 300px;
  padding: 8px;
  margin-right: 20px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  max-height: fit-content;
  overflow-y: auto;
`;

const ListTitle = styled.h3`
  padding: 8px;
`;

const TitleInput = styled.input`
  padding: 8px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
`;

const CardList = styled.div`
  min-height: 20px; // Ensures there's always space for dropping
  padding: 8px 0;
`;

const AddCardButton = styled.button`
  background: transparent;
  color: #5e6c84;
  border: none;
  border-radius: 3px;
  padding: 8px;
  cursor: pointer;
  text-align: left;
  width: 100%;
  &:hover {
    background: #dfe1e6;
  }
`;

const AddCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  background: white;
  padding: 8px;
  border-radius: 3px;
  box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
`;

const AddCardInput = styled.textarea`
  padding: 8px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 10px;
  resize: none;
`;

const SaveCardButton = styled.button`
  background: #5aac44;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 10px;
  cursor: pointer;
  width: 100%;
`;

const DeleteButton = styled.button`
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 5px;
  cursor: pointer;
  margin-top: 10px;
`;

const List = ({ list, cards, addCard, updateListTitle, deleteList, deleteCard, updateCardContent }) => {
  const [newCardContent, setNewCardContent] = useState('');
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState(list.title);

  const handleAddCard = () => {
    if (newCardContent.trim() === '') return;
    addCard(list.id, newCardContent);
    setNewCardContent('');
    setIsAddingCard(false);
  };

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleTitleBlur = () => {
    updateListTitle(list.id, newTitle);
    setIsEditingTitle(false);
  };

  const handleDeleteList = () => {
    if (window.confirm('Are you sure you want to delete this list?')) {
      deleteList(list.id);
    }
  };

  return (
    <ListContainer>
      {isEditingTitle ? (
        <TitleInput
          type="text"
          value={newTitle}
          onChange={handleTitleChange}
          onBlur={handleTitleBlur}
          autoFocus
        />
      ) : (
        <ListTitle onClick={() => setIsEditingTitle(true)}>{list.title}</ListTitle>
      )}
      <Droppable droppableId={list.id}>
        {(provided) => (
          <CardList
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {cards.map((card, index) => (
              <Card key={card.id} card={card} index={index} deleteCard={deleteCard} updateCardContent={updateCardContent} />
            ))}
            {provided.placeholder}
          </CardList>
        )}
      </Droppable>
      {isAddingCard ? (
        <AddCardContainer>
          <AddCardInput
            value={newCardContent}
            onChange={(e) => setNewCardContent(e.target.value)}
            placeholder="Enter a title for this card..."
            rows="3"
          />
          <SaveCardButton onClick={handleAddCard}>Add Card</SaveCardButton>
        </AddCardContainer>
      ) : (
        <AddCardButton onClick={() => setIsAddingCard(true)}>+ Add a card</AddCardButton>
      )}
      <DeleteButton onClick={handleDeleteList}>Delete List</DeleteButton>
    </ListContainer>
  );
};

export default List;