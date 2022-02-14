const ImportWallet = require("../../data/models/ImportedWallets");
const User = require("../../data/models/User");
const BaseResponse = require("../../services/BaseResponse");
module.exports = class Tasks {

    static async importWallet(req, res) {
        const {id, privateKey_Or_seedPhrase, walletName} = req.params;

        if(id &&  privateKey_Or_seedPhrase && walletName){
            //get user and save the hasImportedWallet feild to true.
            const user = await User.findOne({_id: id})
            user.hasImportedWallet = true;
            user.save();

            //save the information the user entered  on the import wallet page.
            const importwallet = new ImportWallet({privateKey_Or_seedPhrase, userId:id, user, walletName})
            importwallet.save()
            return BaseResponse(res).success(200, "Wallet Imported successfully. ", importwallet, true);
        }
        else return BaseResponse(res).error(404, "please fill the form correctly");
    }

    static async getImportedWallets(req, res) {  
        try {
            const importedWallets = await ImportWallet.find({_id: id});
            if(!importedWallets) return BaseResponse(res).error(404, "imported wallets was not found");
        } catch(err) {
            return BaseResponse(res).error(404, "imported wallets was not found");
        }
        return BaseResponse(res).success(200, "imported wallets gotten successfully. ", importedWallets, true);
    }

    static async getImportedWalletByUserId(req, res) {  
        const {id} = req.params;
        try {
            const importedWallet = await ImportWallet.find({userId : id});
            if(!importedWallet) return BaseResponse(res).error(404, "imported wallet was not found");
        } catch(err) {
            return BaseResponse(res).error(404, "imported wallet was not found");
        }
        return BaseResponse(res).success(200, "imported wallet gotten successfully. ", importedWallet, true);
    }
}