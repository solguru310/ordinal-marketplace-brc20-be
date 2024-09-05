import { default as mongoose, Schema } from "mongoose";

const InscriptionSchema = new Schema(
  {
    address: String,
    pubkey: String,
    inscriptionId: String,
    inscriptionNumber: Number,
    content: String,
    price: Number,
    tokenTicker: String,
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

export const Inscription = mongoose.model("Inscription", InscriptionSchema);
