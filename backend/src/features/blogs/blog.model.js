const mongoose = require("mongoose");

// required, ObjectRef: User , All Blogs api should populate author -> User{name, email and gender}.
const blogSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    content: { type: String, required: true },
    isCompleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Blog = mongoose.model("blog", blogSchema);

module.exports = Blog;
