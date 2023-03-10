const bcrypt = require("bcrypt");
const { Schema, model, Types } = require("mongoose");
const schema = Schema(
  {
    name: {
      type: String,
      required: [true, "user name requires"],
      minlength: 2,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "user email requires"],
      trim: true,
      unique: [true, "user email unique"],
    },
    phone: {
      type: String,
      required: [true, "user phone requires"],
    },
    password: {
      type: String,
      required: [true, "user password requires"],
      minlength: [6, "less than chracter length must be 6"],
    },
    passwordChangeAt: Date,
    profileImage: String,
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    wishlist: [
      {
        type: Types.ObjectId,
        ref: "product",
      },
    ],
    addresses: [
      {
        _id: { type: Types.ObjectId },
        name: String,
        street: String,
        details: String,
        phone: String,
        city: String,
      },
    ],
  },
  { timestamps: true }
);
schema.pre("save", function () {
  this.password = bcrypt.hashSync(
    this.password,
    Number(process.env.saltRounds)
  );
});
schema.pre("findOneAndUpdate", function () {
  if (!this._update.password) return;
  this._update.password = bcrypt.hashSync(
    this._update.password,
    Number(process.env.saltRounds)
  );
});
module.exports = model("user", schema);
