const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0:27017/social-network',
{
    useNewUrlParser: true,
    useUnifiedTopology: true
}
)

module.exports = mongoose.connection;