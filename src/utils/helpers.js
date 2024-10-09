export const generateId = (prefix) => `${prefix}-${Date.now()}`;

export const formatDate = (date) => new Date(date).toLocaleDateString();