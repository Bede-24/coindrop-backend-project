const axios = require("axios");
const BaseResponse = require("../../services/BaseResponse")
module.exports = class Application {
    static async getCryptoMarket(req, res) {
        const config = {
            baseURL: 'https://pro-api.coinmarketcap.com',
            headers: {
                'X-CMC_PRO_API_KEY': `22fb9574-41c9-45b1-8e1f-2c1c44586816`
            },
            json: true,
            gzip: true,
            qs: {
                'start': '1',
                'limit': '5000',
                'convert': 'USD'
            },
        }
        const api = axios.create(config)
        const request = await api.get('/v1/cryptocurrency/listings/latest').catch(e => {

            return BaseResponse(res).error(500, e.response.message, true);
        });
        const data = request.data.data.slice(0, 10);
        console.log(data);
        return BaseResponse(res).success(200, "CryptoMarket fetched successfully", data, true);
    }
}