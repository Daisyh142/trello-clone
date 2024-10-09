import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import List from './List';
import { DragDropContext } from 'react-beautiful-dnd';
import { 
  addList, 
  addCard, 
  updateListTitle, 
  deleteList, 
  deleteCard, 
  updateCard, 
  handleDragEnd 
} from '../utils/boardUtils';
import { Button, Input } from '../styles/CommonStyles';

const BoardContainer = styled.div`
  display: flex;
  padding: 20px;
  background: #f4f5f7;
  height: calc(100vh - 60px);
  overflow-x: auto;
`;

const AddListContainer = styled.div`
  background: #ebecf0;
  border-radius: 3px;
  width: 300px;
  padding: 8px;
  margin-right: 20px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AddListButton = styled(Button)`
  background: #0079bf;
  margin-top: 10px;
  width: 100%;
`;

const useBoardState = () => {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem('boardData');
    return savedData ? JSON.parse(savedData) : { lists: {}, cards: {}, listOrder: [] };
  });

  useEffect(() => {
    localStorage.setItem('boardData', JSON.stringify(data));
  }, [data]);

  return [data, setData];
};

const Board = () => {
  const [data, setData] = useBoardState();
  const [newListTitle, setNewListTitle] = useState('');

  const onDragEnd = (result) => {
    setData(handleDragEnd(result, data));
  };

  const handleAddList = () => {
    if (newListTitle.trim() === '') return;
    setData(addList(data, newListTitle));
    setNewListTitle('');
  };

  const handleAddCard = (listId, cardData) => {
    setData(addCard(data, listId, cardData));
  };

  const handleUpdateListTitle = (listId, newTitle) => {
    setData(updateListTitle(data, listId, newTitle));
  };

  const handleDeleteList = (listId) => {
    setData(deleteList(data, listId));
  };

  const handleDeleteCard = (cardId) => {
    setData(deleteCard(data, cardId));
  };

  const handleUpdateCard = (cardId, updatedCardData) => {
    setData(updateCard(data, cardId, updatedCardData));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <BoardContainer>
        {data.listOrder.map(listId => {
          const list = data.lists[listId];
          const cards = list.cardIds.map(cardId => data.cards[cardId]);
          return (
            <List
              key={list.id}
              list={list}
              cards={cards}
              addCard={handleAddCard}
              updateListTitle={handleUpdateListTitle}
              deleteList={handleDeleteList}
              deleteCard={handleDeleteCard}
              updateCard={handleUpdateCard}
            />
          );
        })}
        <AddListContainer>
          <Input
            type="text"
            value={newListTitle}
            onChange={(e) => setNewListTitle(e.target.value)}
            placeholder="Enter list title"
          />
          <AddListButton onClick={handleAddList}>Add List</AddListButton>
        </AddListContainer>
      </BoardContainer>
    </DragDropContext>
  );
};

export default Board;