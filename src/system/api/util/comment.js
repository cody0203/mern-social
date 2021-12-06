export const mockComment = ({
  content,
  ownerId,
  ownerName,
  likes = [],
  replies = [],
  created = new Date(),
  id = "mock",
  postId = "mock",
}) => ({
  likes,
  replies,
  _id: id,
  content,
  owner: {
    _id: ownerId,
    name: ownerName,
  },
  postId,
  created,
});
