const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/social-network',
//mongoose.connect('mongodb://localhost:27017/social-network',
//mongoose.connect('mongodb://localhost:27017/social-network',
{
    userNewUrlParser: true,
    useUnifiedTopology: true
}
)

module.exports = mongoose.connection;