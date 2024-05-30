import { default as mongoose, Schema } from "mongoose";

const OfferSchema = new Schema(
  {
    inscriptionId: String,
    sellerAddress: String,
    buyerAddress: String,
    price: Number,
    tokenTicker: String,
    psbt: String,
    status: Number,               // Current Status of Offer - Request = 0 | Accepted = 1 | Rejected = 2
    buyerSignedPsbt: String,
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

export const Offer = mongoose.model("Offer", OfferSchema);
