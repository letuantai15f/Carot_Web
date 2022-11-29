//const MyError = require('../exception/MyError');
const { User } = require("../models/model");
const awsS3Service = require('./AwsS3Service');


class ProfileService {
     

    async changeAvatar(_id, file) {
        //this.checkImage(file);
        //const user = await User.findOne({ "_id": _id });
        const user = await User.getById(_id);
        //const user = await User.findOne({ avata: user.avata });
        const { avatar } = user;
        //if (avatar) await awsS3Service.deleteFile(avatar);

        const avatarUrl = await awsS3Service.uploadFile(file);
        await User.updateOne({ _id }, { avata: avatarUrl });
        
        return avatarUrl;
    }



    async changePassword(_id, oldPassword, newPassword) {
        userValidate.validateChangePassword(oldPassword, newPassword);
        await userValidate.validateEnterPassword(_id, oldPassword);

        const hashPassword = await commonUtils.hashPassword(newPassword);
        await User.updateOne({ _id }, { $set: { password: hashPassword } });
    }
}

module.exports = new ProfileService();