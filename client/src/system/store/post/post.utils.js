import get from 'lodash/get';

export const updatePostList = (source, newItem) => {
  return [...source].map((item) => {
    if (get(item, '_id') === get(newItem, '_id')) {
      return { ...item, ...newItem };
    }

    return item;
  });
};
