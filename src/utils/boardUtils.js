import { generateId } from './helpers';

export const updateListTitle = (data, listId, newTitle) => {
  return {
    ...data,
    lists: {
      ...data.lists,
      [listId]: {
        ...data.lists[listId],
        title: newTitle,
      },
    },
  };
};

export const addCard = (data, listId, cardData) => {
  const newCardId = generateId('card');
  const newCard = {
    id: newCardId,
    ...cardData,
  };

  return {
    ...data,
    cards: {
      ...data.cards,
      [newCardId]: newCard,
    },
    lists: {
      ...data.lists,
      [listId]: {
        ...data.lists[listId],
        cardIds: [...data.lists[listId].cardIds, newCardId],
      },
    },
  };
};

export const addList = (data, newListTitle) => {
  const newListId = generateId('list');
  const newList = {
    id: newListId,
    title: newListTitle,
    cardIds: [],
  };

  return {
    ...data,
    lists: {
      ...data.lists,
      [newListId]: newList,
    },
    listOrder: [...data.listOrder, newListId],
  };
};

export const deleteList = (data, listId) => {
  const { [listId]: deletedList, ...remainingLists } = data.lists;
  return {
    ...data,
    lists: remainingLists,
    listOrder: data.listOrder.filter(id => id !== listId),
  };
};

export const deleteCard = (data, cardId) => {
  const { [cardId]: deletedCard, ...remainingCards } = data.cards;
  const newLists = Object.entries(data.lists).reduce((acc, [listId, list]) => {
    acc[listId] = {
      ...list,
      cardIds: list.cardIds.filter(id => id !== cardId),
    };
    return acc;
  }, {});

  return {
    ...data,
    cards: remainingCards,
    lists: newLists,
  };
};

export const updateCard = (data, cardId, updatedCardData) => {
  return {
    ...data,
    cards: {
      ...data.cards,
      [cardId]: {
        ...data.cards[cardId],
        ...updatedCardData,
      },
    },
  };
};

export const handleDragEnd = (result, data) => {
  const { destination, source, draggableId } = result;

  if (!destination) {
    return data;
  }

  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  ) {
    return data;
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

    return {
      ...data,
      lists: {
        ...data.lists,
        [newList.id]: newList,
      },
    };
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

  return {
    ...data,
    lists: {
      ...data.lists,
      [newStartList.id]: newStartList,
      [newFinishList.id]: newFinishList,
    },
  };
};