const { model, Schema } = require('mongoose');

const postSchema = new Schema ({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  body: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: String,
    default: new Date().toLocaleDateString()
  },
  comments: [{
    body: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    createdAt: String,
  }],
  likes:[{
    username: String,
    createdAt: String,
  }],
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  }
});

const Post = model('Post', postSchema)

module.exports = Post;