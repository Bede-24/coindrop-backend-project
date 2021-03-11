var mongoose = require('mongoose')
var mongoDb = 'mongodb://localhost/airdrop'
mongoose.connect(mongoDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});
mongoose.connection.on("error", console.error.bind(console, "connection error:"));
mongoose.connection.once("open", function () {
    console.log("database connection established successfully");
});