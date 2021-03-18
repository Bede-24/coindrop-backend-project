const express = require('express');
const cors = require('cors');
const app = express();
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const bodyParser = require('body-parser');
const Mining = require("./controllers/mining/Mining");
const Users = require("./controllers/users/Users");
require('./services/cron');
// app using
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
require('./data/db');
//  secure app by using various http headers.
app.use(helmet());
// router initialization.
// Data sanitization against NoSQL query injection
app.use(mongoSanitize());
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: false }));
app.use("/api/v1", require("./routes"));
// Users.deleteAllUsers(); 30
app.listen(4000, () => {
    console.log("App is listening on port 4000");
});