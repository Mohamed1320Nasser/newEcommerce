const { Schema, model, Types } = require("mongoose");

const schema = Schema(
  {
    cartItems: [
      {
        product: {
          type: Types.ObjectId,
          ref: "product",
        },
        quantity: {
          type: Number,
          default: 1,
        },
        color: String,
        price: Number,
      },
    ],
    totalCartPrice: Number,
    totalPriceAfterDiscount: Number,
    discount: Number,
    user: {
      type: Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

module.exports = model("cart", schema);
