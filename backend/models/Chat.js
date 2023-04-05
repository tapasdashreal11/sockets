import mongoose from "mongoose";
const { Schema } = mongoose;

const chatSchema = new Schema(
  {
    name: { type: String, trim: true },
    isGruoupChat: { type: Boolean, default: false },
    users: [{ type: Schema.Types.ObjectId, ref: "User" }],
    latestMessage: [{ type: Schema.Types.ObjectId, ref: "Message" }],
    groupAdmin: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
