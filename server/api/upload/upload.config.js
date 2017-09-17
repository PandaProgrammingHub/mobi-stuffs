import AWS from 'aws-sdk';

import awsConfig from '../../config/environment';
//var awsConfig = require('../config/aws-config.json');
AWS.config = awsConfig.aws;

// assume you already have the S3 Bucket created, and it is called ierg4210-shopxx-photos
var documentBucket = new AWS.S3({params: {Bucket: awsConfig.aws.bucketName}});

var S3Utility = {

  uploadData: function (imageName, imageFile) {
    var data = {Key: imageName, Body: imageFile};
    documentBucket.putObject(data, function(err, imageData) {
      if(err)
      {
        console.log('Error uploading data: ', imageData);
        return imageData;
      } else
        {
        console.log('File uploaded succefully ', imageData);
        return imageData;
      }
    });

  },

  upload: function (file, destFileName, callback) {
    var params = {
      Body: file,
      Key: destFileName.toString(),
      ContentType: 'application/octet-stream' // force download if it's accessed as a top location
    };
    documentBucket.upload(params)
      .send(callback);
  },
  uploadBuffer: function (buffer, destFileName, callback) {
    var params = {
      Body: buffer,
      Key: destFileName.toString(),
      ContentType: 'application/octet-stream' // force download if it's accessed as a top location
    };
    documentBucket.upload(params)
      .send(callback);
  },
  download: function (destFileName, callback) {
    var params = {
      Key: destFileName
    };
    documentBucket.getObject(params, function(err, data) {
      if(err) {
        callback(err);
      }
      else {
        callback(null, data);
      }

    });
  }
};
module.exports = S3Utility;
