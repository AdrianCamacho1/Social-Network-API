const { Schema, model } = require("mongoose");
const userSchema = new Schema ({
    username: {
        type: String,
        unique: true,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email address",]
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: "Thoughts",
    },
],
friends: [{
    type: Schema.Types.ObjectId,
    red: "User",
},
],
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false,
});

userSchema.virttual("friendCount").get(function () {
    return this.friends.length;
});

const User = model("User", userSchema);
module.export = User;