const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var articleblogSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
        index: true,
      },
      description: {
        type: String,
        required: true,
        unique: true,
      },
      category: {
        type: String,
        required: true,
        unique: true,
      },
      numViews: {
        type: Number,
        default: 0,
      },
      isLiked: {
        type: Boolean,
        default: false,
      },
      isDisliked: {
        type: Boolean,
        default: false,
      },
      likes: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      dislikes: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      image: {
        type: String,
        default: "imageblog",
      },
      author: {
        type: String,
        default: "Admin",
      },
    },
    {
      toJSON: {
        virtuals: true,
      },
      toObject: {
        virtuals: true,
      },
    }
  );

//Export the model
module.exports = mongoose.model('articleblog', articleblogSchema);