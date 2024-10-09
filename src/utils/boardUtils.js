export const addCard = (data, listId, content) => {
  const newCardId = `card-${Date.now()}`;
  const newCard = {
    id: newCardId,
    content,
  };

  const newList = {
    ...data.lists[listId],
    cardIds: [...data.lists[listId].cardIds, newCardId],
  };

  return {
    ...data,
    cards: {
      ...data.cards,
      [newCardId]: newCard,
    },
    lists: {
      ...data.lists,
      [listId]: newList,
    },
  };
};

export const updateListTitle = (data, listId, newTitle) => {
  const newList = {
    ...data.lists[listId],
    title: newTitle,
  };

  return {
    ...data,
    lists: {
      ...data.lists,
      [listId]: newList,
    },
  };
};