const cron = require('node-cron');
const Mining = require('../controllers/mining/Mining');
cronSchedule(Mining.increaseUsersBalanceByHashRate);
function cronSchedule(func) {
    cron.schedule('0 4 * * *', async function () {
        await func();
        console.log('Done');
    })
}