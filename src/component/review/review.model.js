const { Schema, model, Types } = require("mongoose");
const schema = Schema(
  {
    title: {
      type: String,
      required: [true, "review title requires"],
      minlength: 1,
    },
    user: {
      type: Types.ObjectId,
      ref: "user",
    },
    product: {
      type: Types.ObjectId,
      ref: "product",
    },
    ratingAvarege: {
      type: Number,
      min: [1, "ratingAvarege must be grater than or equal 1"],
      max: [5, "ratingAvarege must be less than or equal  5"],
    },
  },
  { timestamps: true }
);
schema.pre(/^find/, function () {
  this.populate("user", "name ");
});
module.exports = model("review", schema);
