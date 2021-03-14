const bcrypt = require("bcryptjs");
const Admin = require('../../data/models/Admin');
const BaseResponse = require('../../services/BaseResponse')
module.exports = class Authentication {
    static async createAdmin(req, res) {
        const { email, password } = req.body;
        if (!email || !password) return BaseResponse(res).error(400, 'Provide the complete login details.')
        const hashedPassword = bcrypt.hashSync(password);
        const admin = new Admin({ email, password: hashedPassword });
        admin.generateJWT();
        admin.save().catch(() => {
            return BaseResponse(res).error(400, 'Something went wrong. Please try again.')
        });
        const data = admin.toJSON();
        delete data.password;
        return BaseResponse(res).success(200, 'Admin created successfully', data);
    }
    static async adminLogin(req, res) {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });
        if (!admin) return BaseResponse(res).error(400, 'Admin does not exist.');
        const isPasswordCorrect = bcrypt.compareSync(password, admin.password);
        if (!isPasswordCorrect) return BaseResponse(res).error(400, 'Invalid password.')
        admin.generateJWT();
        admin.save().catch(() => {
            return BaseResponse(res).error(400, 'Something went wrong. Please try again.')
        });
        const data = await admin.toJSON();
        delete data.password;
        return BaseResponse(res).success(200, 'Admin logged in successfully', data)
    }
}