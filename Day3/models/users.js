const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: [true, "it's not unique"],
      minLength: [8, "must be 8 character"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    firstName: {
      type: String,
      required: [true, "First name is required"],
      minLength: [3, "min length is 3"],
      maxLength: [15, "max length is 15"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      minLength: [3, "min length is 3"],
      maxLength: [15, "max length is 15"],
    },
    DOB: Date,
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  let salt = await bcryptjs.genSalt(10);
  console.log(this);

  let hashedPass = await bcryptjs.hash(this.password, salt);
  this.password = hashedPass;
  next();
});

const usersModel = mongoose.model("users", userSchema);
module.exports = usersModel;
