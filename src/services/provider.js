const PubNub = require("pubnub");
const { PUB_KEY, SUB_KEY } = require('../config/secrets');
module.exports.pubnub = new PubNub({
    publishKey: PUB_KEY,
    subscribeKey: SUB_KEY,
    ssl: true
});