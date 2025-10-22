import mongoose from "mongoose";

const feeSchema = new mongoose.Schema({
  studentId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Student", 
    required: true 
  },
  totalFees: { type: Number, required: true }, // snapshot of yearly fee
  paidAmount: { type: Number, default: 0 },    // auto-calculated
  remainingAmount: { type: Number, default: 0 },
  dueDate: { type: Date },

  // Track all payments
  payments: [
    {
      amount: { type: Number, required: true },
      date: { type: Date, default: Date.now }
    }
  ],

  status: { 
    type: String, 
    enum: ["Paid", "Partial", "Pending"], 
    default: "Pending" 
  }
}, { timestamps: true }); // adds createdAt & updatedAt
  

// Middleware to auto-update amounts & status
feeSchema.pre("save", function (next) {
  // Total paid
  this.paidAmount = this.payments.reduce((sum, p) => sum + p.amount, 0);
  // Remaining balance
  this.remainingAmount = this.totalFees - this.paidAmount;

  // Update status
  if (this.paidAmount === 0) {
    this.status = "Pending";
  } else if (this.remainingAmount > 0) {
    this.status = "Partial";
  } else {
    this.status = "Paid";
  }

  next();
});

const Fee = mongoose.model("Fee", feeSchema);
export default Fee;













// import mongoose from "mongoose";

// const feeSchema = new mongoose.Schema({
//   studentId: { 
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: "Student", 
//     required: true 
//   },
//   paidAmount: { type: Number, default: 0 },   // how much paid so far
//   dueDate: { type: Date },                    // last date for payment
//   status: { 
//     type: String, 
//     enum: ["Paid", "Pending"], 
//     default: "Pending" 
//   }
// });

// // Auto-update status before saving
// feeSchema.pre("save", async function (next) {
//   const Student = mongoose.model("Student");
//   const student = await Student.findById(this.studentId);

//   if (student && this.paidAmount >= student.totalFees) {
//     this.status = "Paid";
//   } else {
//     this.status = "Pending";
//   }

//   next();
// });

// const Fee = mongoose.model("Fee", feeSchema);
// export default Fee;



