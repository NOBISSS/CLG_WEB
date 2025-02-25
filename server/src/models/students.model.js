import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose, { Schema } from "mongoose";
/* 
     1.EnrollmentId	
     2.FullName
     3.FirstName
     4.LastName
     5.DateOfBirth
     6.Semester - refers to Semester DB
     7.EmailId
     8.MobileNo
     9.Gender
     10.Password - After Registration
     11.Registered - TRUE/FALSE
*/
const studentSchema = new Schema(
  {
    enrollmentId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    fullName: {
      type: String,
      trim: true,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    mobileNo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
      trim: true,
    },
    password: {
      type: String,
    },
    isRegistered: {
      type: Boolean,
      default: false,
    },
    semester: {
      type: Number,
      ref: "Semester",
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);

  return next();
});

studentSchema.methods.isPasswordCorrect = async function (givenPassword) {
  return await bcrypt.compareSync(givenPassword, this.password);
};

studentSchema.methods.generateAccessToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
      enrollmentId: this.enrollmentId,
      emailId: this.emailId,
      fullName: this.fullName,
      role: "student",
    },
    process.env.JWT_ACCESS_TOKEN,
    { expiresIn: "1d" }
  );
};
studentSchema.methods.generateRefreshToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.JWT_REFRESH_TOKEN,
    { expiresIn: "10d" }
  );
};

export const Student = mongoose.model("Student", studentSchema);
