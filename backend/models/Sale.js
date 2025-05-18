import mongoose from 'mongoose';

const saleSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quantity: Number,
  revenue: Number,
  date: Date
});

const saleModel = mongoose.model("Sale", saleSchema);

export default saleModel;