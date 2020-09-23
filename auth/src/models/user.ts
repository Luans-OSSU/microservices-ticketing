import mongoose from "mongoose";

import { Password } from "../helpers";

interface UserAttrs {
  email: string;
  password: string;
}

interface UserMode extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {
  toJSON: {
    versionKey: false,
    transform(_, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.password;
    }
  }
});

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => new User(attrs);

const User = mongoose.model<UserDoc, UserMode>("User", userSchema);

export { User };
