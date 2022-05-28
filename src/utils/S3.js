const fs = require('fs');
const s3 = require('../config/s3');

const uploadFile = async (file) => {
  const fileStream = fs.createReadStream(file.path);
  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Body: fileStream,
    Key: file.filename,
  };
  return s3.upload(uploadParams).promise();
};

const getFile = (fileKey) => {
  const downloadParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileKey,
  };
  return s3.getObject(downloadParams).createReadStream();
};

module.exports = {
  uploadFile,
  getFile,
};
