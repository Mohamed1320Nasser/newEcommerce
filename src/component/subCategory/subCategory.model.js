const { Schema, model, Types } = require("mongoose");
const schema = Schema(
  {
    name: {
      type: String,
      required: [true, "subCategory name requires"],
      trim: true,
      unique: [true, "subCategory name unique"],
      minlength: 2,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: Types.ObjectId,
      ref: "category",
    },
  },
  { timestamps: true }
);
module.exports = model("subCategory", schema);
