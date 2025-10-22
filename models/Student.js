// import mongoose from "mongoose";

// const studentSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   totalFees: { type: Number, required: true },
//   contactNumber: { type: String, required: true },
//   email: { type: String },
//   batch: { type: String, required: true },
//   joinDate: { type: Date, default: Date.now },
//   parentContact: { type: String },
//   remarks: { type: String },
//   standard: { type: String },
//   schoolName: { type: String },
//   medium: { 
//     type: String, 
//     enum: ["English", "Semi-English", "Marathi"], 
//     required: true 
//   }
// });

// const Student = mongoose.model("Student", studentSchema);
// export default Student;

import mongoose from "mongoose";
import Fee from "./Fee.js"; // import Fee model

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  totalFees: { type: Number, required: true }, // yearly or monthly fees
  contactNumber: { type: String, required: true },
  email: { type: String },
  batch: { type: String, required: true },
  joinDate: { type: Date, default: Date.now },
  parentContact: { type: String },
  remarks: { type: String },
  standard: { type: String },
  schoolName: { type: String },
  medium: { 
    type: String, 
    enum: ["English", "Semi-English", "Marathi"], 
    required: true 
  }
});

// 🔹 After saving a student, create a Fee record automatically
studentSchema.post("save", async function (doc, next) {
  try {
    await Fee.create({
      studentId: doc._id,
      totalFees: doc.totalFees,
      paidAmount: 0,
      remainingAmount: doc.totalFees,
      status: "Pending",
    });
    next();
  } catch (err) {
    next(err);
  }
});

const Student = mongoose.model("Student", studentSchema);
export default Student;

