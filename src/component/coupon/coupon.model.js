const { Schema, model,  } = require("mongoose");
const schema = Schema(
  {
    code: {
      type: String,
      required: [true, "coupon code requires"],
      trim: true,
      unique: [true, "coupon code unique"],
    },
    expieres: {
      type: Date,
    },
    discount: {
      type: Number,
    },
  },
  { timestamps: true }
);
module.exports = model("coupon", schema);
