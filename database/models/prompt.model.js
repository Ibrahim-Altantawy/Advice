const { Schema, Types, models, model } = require("mongoose");

const promptShema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      required: [true, "user id is required"],
      ref: "User",
    },
    prompt: {
      type: String,
      required: [true, "prompt text is required"],
    },
    tag: {
      type: String,
      required: [true, "tag is required"],
    },
  },
  { timestamps: true }
);
const promptModel = models.Prompt || model("Prompt", promptShema);
export default promptModel;
