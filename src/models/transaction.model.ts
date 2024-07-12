import mongoose, { Schema } from "mongoose";

const TransactionSchema = new Schema(
  {
    sender_account_no: { type: Number, required: true },
    receiver_account_no: { type: Number, required: true },
    transactionType: {
      type: String,
      enum: ["Credit", "Debit", "Transfer"],
      required: true,
    },
    amount: { type: Number, required: true },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", TransactionSchema);
export { Transaction };
