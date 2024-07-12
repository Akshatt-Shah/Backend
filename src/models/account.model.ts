import mongoose, { Schema } from "mongoose";
import User from "./user.model";
const AccountSchema = new Schema(
  {
    Account_No: { type: Number, required: true },
    type: {
      type: String,
      enum: ["Saving", "Current"],
      default: "Saving",
      required: true,
    },
    user: { type: mongoose.Schema.ObjectId, ref: User, required: true },
    totalamount: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

const Account = mongoose.model("Account", AccountSchema);
export { Account };
