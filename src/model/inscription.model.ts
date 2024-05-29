import { default as mongoose, Schema } from "mongoose";

const InscriptionSchema = new Schema(
  {
    inscriptionId: String,
    inscriptionNumber: Number,
    address: String,
    pubkey: String,
    price: Number,
    tokenTicker: String,
    content: String,
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

export const Inscription = mongoose.model("Inscription", InscriptionSchema);
