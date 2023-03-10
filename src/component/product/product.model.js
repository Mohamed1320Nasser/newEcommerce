const { Schema, model, Types } = require("mongoose");
const schema = Schema(
  {
    name: {
      type: String,
      required: [true, "product name requires"],
      trim: true,
      unique: [true, "product name unique"],
      minlength: 2,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    quantity: {
      type: Number,
      required: [true, "product quantity requires"],
      default: 0,
    },
    description: {
      type: String,
      required: [true, "product description requires"],
      trim: true,
      minlength: 10,
    },
    colors: [String],
    price: {
      type: Number,
      required: [true, "product price requires"],
    },
    priceAfterDiscount: {
      type: Number,
      required: [true, "product price After discount requires"],
    },
    sold: {
      type: Number,
      required: [true, "product sold requires"],
      default: 0,
    },
    imageCover: String,
    images: [String],
    category: {
      type: Types.ObjectId,
      ref: "category",
      required: [true, "product category requires"],
    },
    subcategory: {
      type: Types.ObjectId,
      ref: "subCategory",
      required: [true, "product subcategory requires"],
    },
    brand: {
      type: Types.ObjectId,
      ref: "brand",
      required: [true, "product brand requires"],
    },
    averageRating: {
      type: Number,
      min: [1, "ratingAvarege must be grater than or equal 1"],
      max: [5, "ratingAvarege must be less than or equal  5"],
    },
    ratingCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
schema.virtual("review", {
  ref: "review",
  localField: "_id",
  foreignField: "product",
});
schema.pre("findOne", function () {
  this.populate("review");
});
let imgs = [];
schema.post("init", (doc) => {
  if (doc.images && doc.imageCover) {
    doc.imageCover = process.env.DOMAIN + "product/" + doc.imageCover;
    doc.images.forEach((ele) => {
      imgs.push(process.env.DOMAIN + "product/" + ele);
    });
    doc.images = imgs;
  }
});
module.exports = model("product", schema);
