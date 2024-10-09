import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import List from './List';
import { DragDropContext } from 'react-beautiful-dnd';
import { addCard as addCardUtil, updateListTitle as updateListTitleUtil } from '../utils/boardUtils';

const BoardContainer = styled.div`
  display: flex;
  padding: 20px;
  background: #f4f5f7;
  height: calc(100vh - 60px); /* Adjust height to account for header */
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

const AddListButton = styled.button`
  background: #0079bf;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 10px;
  cursor: pointer;
  margin-top: 10px;
  width: 100%;
`;

const AddListInput = styled.input`
  padding: 8px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 10px;
`;

const Board = () => {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem('boardData');
    return savedData ? JSON.parse(savedData) : { lists: {}, cards: {}, listOrder: [] };
  });

  const [newListTitle, setNewListTitle] = useState('');

  useEffect(() => {
    localStorage.setItem('boardData', JSON.stringify(data));
  }, [data]);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const startList = data.lists[source.droppableId];
    const finishList = data.lists[destination.droppableId];

    if (startList === finishList) {
      const newCardIds = Array.from(startList.cardIds);
      newCardIds.splice(source.index, 1);
      newCardIds.splice(destination.index, 0, draggableId);

      const newList = {
        ...startList,
        cardIds: newCardIds,
      };

      const newState = {
        ...data,
        lists: {
          ...data.lists,
          [newList.id]: newList,
        },
      };

      setData(newState);
      return;
    }

    const startCardIds = Array.from(startList.cardIds);
    startCardIds.splice(source.index, 1);
    const newStartList = {
      ...startList,
      cardIds: startCardIds,
    };

    const finishCardIds = Array.from(finishList.cardIds);
    finishCardIds.splice(destination.index, 0, draggableId);
    const newFinishList = {
      ...finishList,
      cardIds: finishCardIds,
    };

    const newState = {
      ...data,
      lists: {
        ...data.lists,
        [newStartList.id]: newStartList,
        [newFinishList.id]: newFinishList,
      },
    };

    setData(newState);
  };

  const addList = () => {
    if (newListTitle.trim() === '') return;

    const newListId = `list-${Date.now()}`;
    const newList = {
      id: newListId,
      title: newListTitle,
      cardIds: [],
    };

    const newState = {
      ...data,
      lists: {
        ...data.lists,
        [newListId]: newList,
      },
      listOrder: [...data.listOrder, newListId],
    };

    setData(newState);
    setNewListTitle('');
  };

  const addCard = (listId, content) => {
    const newState = addCardUtil(data, listId, content);
    setData(newState);
  };

  const updateListTitle = (listId, newTitle) => {
    const newState = updateListTitleUtil(data, listId, newTitle);
    setData(newState);
  };

  const deleteList = (listId) => {
    const newLists = { ...data.lists };
    delete newLists[listId];

    const newListOrder = data.listOrder.filter(id => id !== listId);

    const newState = {
      ...data,
      lists: newLists,
      listOrder: newListOrder,
    };

    setData(newState);
  };

  const deleteCard = (cardId) => {
    const newCards = { ...data.cards };
    delete newCards[cardId];

    const newLists = { ...data.lists };
    for (const listId in newLists) {
      newLists[listId].cardIds = newLists[listId].cardIds.filter(id => id !== cardId);
    }

    const newState = {
      ...data,
      cards: newCards,
      lists: newLists,
    };

    setData(newState);
  };

  const updateCardContent = (cardId, newContent) => {
    const newCards = {
      ...data.cards,
      [cardId]: {
        ...data.cards[cardId],
        content: newContent,
      },
    };

    const newState = {
      ...data,
      cards: newCards,
    };

    setData(newState);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <BoardContainer>
        {data.listOrder.map(listId => {
          const list = data.lists[listId];
          const cards = list.cardIds.map(cardId => data.cards[cardId]);
          return <List key={list.id} list={list} cards={cards} addCard={addCard} updateListTitle={updateListTitle} deleteList={deleteList} deleteCard={deleteCard} updateCardContent={updateCardContent} />;
        })}
        <AddListContainer>
          <AddListInput
            type="text"
            value={newListTitle}
            onChange={(e) => setNewListTitle(e.target.value)}
            placeholder="Enter list title"
          />
          <AddListButton onClick={addList}>Add List</AddListButton>
        </AddListContainer>
      </BoardContainer>
    </DragDropContext>
  );
};

export default Board;