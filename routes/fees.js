import express from "express";
import Fee from "../models/Fee.js";
import Student from "../models/Student.js";
import auth from "../middleware/auth.js";

const router = express.Router();

/**
 * Create a fee record for a student
 * Automatically sets paidAmount = 0, remainingAmount = totalFees, status = Pending
 */
router.post("/", auth, async (req, res) => {
  try {
    const { studentId, totalFees, dueDate } = req.body;

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const existingFee = await Fee.findOne({ studentId });
    if (existingFee) {
      return res.status(400).json({ message: "Fee record already exists for this student" });
    }

    const fee = new Fee({
      studentId,
      totalFees,
      paidAmount: 0,
      remainingAmount: totalFees,
      dueDate,
      status: "Pending",
    });

    await fee.save();
    res.status(201).json(fee);
  } catch (err) {
    console.error("Error creating fee:", err);
    res.status(500).json({ message: "Error creating fee record", error: err.message });
  }
});

/**
 * Add a payment (partial or full)
 * Automatically recalculates remainingAmount and status
 */
// router.put("/:id/pay", auth, async (req, res) => {
//   try {
//     const { amount, note } = req.body;
//     const fee = await Fee.findById(req.params.id);

//     if (!fee) {
//       return res.status(404).json({ message: "Fee record not found" });
//     }

//     if (!amount || amount <= 0) {
//       return res.status(400).json({ message: "Invalid payment amount" });
//     }

//     // Add new payment
//     fee.payments.push({
//       amount,
//       note,
//       date: new Date(),
//     });

//     // Recalculate totals
//     fee.paidAmount = fee.payments.reduce((sum, p) => sum + p.amount, 0);
//     fee.remainingAmount = Math.max(fee.totalFees - fee.paidAmount, 0);

//     // Update status
//     if (fee.paidAmount === 0) {
//       fee.status = "Pending";
//     } else if (fee.remainingAmount > 0) {
//       fee.status = "Partial";
//     } else {
//       fee.status = "Paid";
//     }

//     await fee.save();
//     res.json({ message: "Payment recorded successfully", fee });
//   } catch (err) {
//     console.error("Error processing payment:", err);
//     res.status(500).json({ message: err.message });
//   }
// });

router.put("/:id/pay", auth, async (req, res) => {
  try {
    const { amount, note } = req.body;
    const fee = await Fee.findById(req.params.id);

    if (!fee) return res.status(404).json({ message: "Fee record not found" });
    if (!amount || amount <= 0)
      return res.status(400).json({ message: "Invalid payment amount" });

    //  Prevent paying more than remaining
    if (amount > fee.remainingAmount) {
      return res
        .status(400)
        .json({ message: "Payment cannot exceed remaining fees." });
    }

    // Add new payment
    fee.payments.push({ amount, note, date: new Date() });

    // Recalculate
    fee.paidAmount = fee.payments.reduce((sum, p) => sum + p.amount, 0);
    fee.remainingAmount = Math.max(fee.totalFees - fee.paidAmount, 0);

    // Update status
    if (fee.paidAmount === 0) fee.status = "Pending";
    else if (fee.remainingAmount > 0) fee.status = "Partial";
    else fee.status = "Paid";

    await fee.save();
    const updatedFee = await Fee.findById(req.params.id).populate("studentId");

    res.json(updatedFee);
  } catch (err) {
    console.error("Error processing payment:", err);
    res.status(500).json({ message: err.message });
  }
});

// DELETE fee record
router.delete("/:id", auth, async (req, res) => {
  try {
    const fee = await Fee.findByIdAndDelete(req.params.id);
    if (!fee) return res.status(404).json({ message: "Fee record not found" });
    res.json({ message: "Fee record deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});




/**
 * Get all fees with student details
 */
router.get("/", auth, async (req, res) => {
  try {
    const fees = await Fee.find()
      .populate("studentId", "name rollNumber batch")
      .sort({ createdAt: -1 });
    res.json(fees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * Get only pending or partial fees
 */
router.get("/pending", auth, async (req, res) => {
  try {
    const fees = await Fee.find({ status: { $in: ["Pending", "Partial"] } })
      .populate("studentId", "name rollNumber batch")
      .sort({ createdAt: -1 });
    res.json(fees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * Get single fee record by ID
 */
router.get("/:id", auth, async (req, res) => {
  try {
    const fee = await Fee.findById(req.params.id).populate("studentId");
    if (!fee) {
      return res.status(404).json({ message: "Fee record not found" });
    }
    res.json(fee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;




















// import express from "express";
// import Fee from "../models/Fee.js";
// import Student from "../models/Student.js";
// import auth from "../middleware/auth.js";

// const router = express.Router();

// // Create fee record for a student
// router.post("/", auth, async (req, res) => {
//   try {
//     const { studentId, totalFees, dueDate } = req.body;
//     const student = await Student.findById(studentId);
//     if (!student) return res.status(404).json({ message: "Student not found" });
//     const fee = new Fee({ studentId, totalFees, dueDate });
//     await fee.save();
//     res.json(fee);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Add a payment to a fee record
// router.put("/:id/pay", auth, async (req, res) => {
//   try {
//     const { amount, note } = req.body;
//     const fee = await Fee.findById(req.params.id);
//     if (!fee) return res.status(404).json({ message: "Fee record not found" });
//     fee.payments.push({ amount, note });
//     // update status
//     const amountPaid = fee.payments.reduce((s, p) => s + p.amount, 0);
//     if (amountPaid >= fee.totalFees) fee.status = "Paid";
//     await fee.save();
//     res.json(fee);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Get all fees (with student details)
// router.get("/", auth, async (req, res) => {
//   try {
//     const fees = await Fee.find().populate("studentId", "name rollNumber batch");
//     res.json(fees);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Get pending fees
// router.get("/pending", auth, async (req, res) => {
//   try {
//     const fees = await Fee.find({ status: "Pending" }).populate("studentId", "name rollNumber batch");
//     res.json(fees);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Get single fee
// router.get("/:id", auth, async (req, res) => {
//   try {
//     const fee = await Fee.findById(req.params.id).populate("studentId");
//     if (!fee) return res.status(404).json({ message: "Fee record not found" });
//     res.json(fee);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// export default router;