import mongoose from "mongoose";

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  likes: [
    {
      type: Schema.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  replies: [
    {
      content: {
        type: String,
        required: true,
      },
      replier: {
        type: Schema.ObjectId,
        ref: "User",
        required: true,
      },
    },
  ],
  owner: {
    type: Schema.ObjectId,
    ref: "User",
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Comment", commentSchema);
