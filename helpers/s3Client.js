const { S3Client } = require('@aws-sdk/client-s3')
const config = require('../config/config')

// Create an Amazon S3 service client object.
exports.s3Client = new S3Client({
  region: config.development.aws_region,
  accessKeyId: config.development.aws_access_key_id,
  secretAccessKey: config.development.aws_secret_access_key,
})
