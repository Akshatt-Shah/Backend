import mongoose, { Document, Schema } from "mongoose";


// Create a Schema corresponding to the document interface.
const userSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
      required: true,
    },
    address: { type: String, required: true },
    phoneNo: { type: String, required: true },
    dob: { type: Date, required: true },
  },
  {
    timestamps: true, // Automatically include `createdAt` and `updatedAt` fields
  }
);

// Create a Mongoose model using the Schema and the interface.
const User = mongoose.model("User", userSchema);

export default User;
