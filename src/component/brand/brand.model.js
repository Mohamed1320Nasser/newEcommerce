const { Schema, model, Types } = require("mongoose");
const schema = Schema(
  {
    name: {
      type: String,
      required: [true, "brand name requires"],
      trim: true,
      unique: [true, "brand name unique"],
      minlength: 2,
    },
    slug: {
      type: String,
      required: [true, "slug required"],
      trim: true,
      unique: [true, "slug unique"],
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);
schema.post("init", (doc) => {
  doc.image = process.env.DOMAIN + "brand/" + doc.image;
});
module.exports = model("brand", schema);
