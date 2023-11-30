const mongoose = require("mongoose");

mongoose.connect('mongo://localhost:27017/social-network',
{
    userNewUrlParser: true,
    useUnifiedTopology: true
}
)

module.exports = mongoose.connection;