const cron = require('node-cron');
const Mining = require('../controllers/mining/Mining');
cronSchedule(Mining.increaseUsersBalanceByHashRate);
function cronSchedule(func) {
    cron.schedule('* * * * *', async function () {
        console.log('it entered')
        await func();
    })
}