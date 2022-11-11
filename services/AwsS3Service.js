require('dotenv').config()
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
})

// uploads a file to s3
function uploadFile(file) {
    const fileStream = fs.createReadStream(file.path)

    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename
    }

    return s3.upload(uploadParams).promise()
}
exports.uploadFile = uploadFile

exports.uploadFile2 =  async(file,data) =>{
    var buf = Buffer.from(file.replace(/^data:image\/\w+;base64,/, ""),'base64')
    const type = file.split(';')[0].split('/')[1];
    const userId = 1;
    var datetime = new Date();

  var data = {
    Bucket: bucketName,
    Key: `${data}+${datetime}.${type}`, 
    Body: buf,
    // ACL: 'public-read',
    ContentEncoding: 'base64',
    ContentType: `image/${type}`
  };

  let location = '';
  let key = '';
 
    const { Location, Key } = await s3.upload(data).promise();
    
    location = Location;
    key = Key;
  
console.log("key", key);
  

  return key;

}



// downloads a file from s3
function getFileStream(fileKey) {
    const downloadParams = {
        Key: fileKey,
        Bucket: bucketName
    }

    return s3.getObject(downloadParams).createReadStream()
}
exports.getUrl = async(data)=>{
   const url= s3.getSignedUrl('getObject',{
        Bucket: bucketName,
        Key: data,
        Expires: 60 * 1
    })
    return url
}
exports.getFileStream = getFileStream