import { Schema, model } from "mongoose";

const Product = new Schema({
  name: String,
  quantity: Number,
  price: Number,
  expirationDate: Date
});

export default model("product", Product);
