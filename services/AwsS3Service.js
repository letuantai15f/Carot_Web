const { S3 } = require("aws-sdk");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const uuid = require("uuid").v4;

class AwsS3Service {
    async s3Uploadv2(files) {
        const s3 = new S3();
        const params = files.map((file) => {
            return {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: `${uuid()}-${file.originalname}`,
                Body: file.buffer,
            };
        });

        return await Promise.all(params.map((param) => s3.upload(param).promise()));
    };

    async s3Uploadv3(files) {
        const s3client = new S3Client();

        const params = files.map((file) => {
            return {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: `${uuid()}-${file.originalname}`,
                Body: file.buffer,
            };
        });

        return await Promise.all(
            params.map((param) => s3client.send(new PutObjectCommand(param)))
        );
    };
}
module.exports = new AwsS3Service();