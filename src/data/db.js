var mongoose = require('mongoose');
var mongoDb = 'mongodb+srv://godofjs:$Kingheadthe8th@cluster0.yyvia.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(mongoDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    console.log("database connected successfully")
});
