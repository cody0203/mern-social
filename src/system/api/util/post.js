export const mockPost = ({
  content,
  ownerId,
  ownerName,
  likes = [],
  isPublic = true,
  comments = [],
  created = new Date(),
  id = "mock",
}) => ({
  public: isPublic,
  likes,
  comments,
  _id: id,
  content: content,
  owner: {
    _id: ownerId,
    name: ownerName,
  },
  created,
});
