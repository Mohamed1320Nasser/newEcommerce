const { Schema, model } = require("mongoose");
const schema = Schema(
  {
    name: {
      type: String,
      required: [true, "category name requires"],
      trim: true,
      unique: [true, "category name unique"],
      minlength: 2,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);
schema.post("init", (doc) => {
  doc.image = process.env.DOMAIN + "/category" + doc.image;
});
module.exports = model("category", schema);
