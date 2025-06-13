const mongoose = require("mongoose");
const Counter = require('./counterModels')

const studentSchema = new mongoose.Schema({
      id: {
    type: Number,
    unique: true,
  },
  rollNo: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: false,
  },
  address: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
    type: String,
    required: true,
  },
  bloodGroup: {
    type: String,
    required: true,
  },
});

// Pre-save hook to auto-increment rollNo
studentSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const counter = await Counter.findOneAndUpdate(
        { id: "studentId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.id = counter.seq;
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});

// const counter = await Counter.findOneAndUpdate(
//   { id: "studentId" },
//   { $inc: { seq: 1 } },           // ⬅️ this increases counter atomically
//   { new: true, upsert: true }    // ⬅️ create if not found
// );
// student.id = counter.seq;        // ⬅️ assign the incremented value

// Remove __v from response
studentSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model("Student", studentSchema);
