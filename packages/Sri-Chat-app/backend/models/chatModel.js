// chatName

const mongoose = require('mongoose');

const chatModel = mongoose.Schema(
    {
        chatName: { type: String, trim: true },       //chatName
        isGroupChat: { type: Boolean, default: flase },  //GroupChat
        users: [{                                       //Users ID
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },],
        latestMessage: {                            //latest message recieved
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
        },
        groupAdmin: {                                //Admin of the group.
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

const Chat = mongoose.model("Chat", chatModel);

module.exports = Chat;