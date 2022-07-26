const {
  S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand, ListObjectsCommand,
} = require('@aws-sdk/client-s3')
const { v4 } = require('uuid')
const config = require('../config/config')
const { ErrorObject } = require('./error')

// Set the AWS Region.
const REGION = config.development.aws_region
// Set the AWS Access Key Id.
const ACCESSKEYID = config.development.aws_access_key_id
// Set the AWS Secret Access Key.
const SECRETACCESSKEY = config.development.aws_secret_access_key
// Set the AWS Bucket.
const BUCKET_NAME = config.development.aws_bucket_name

// Create an Amazon S3 service client object.
exports.s3Client = new S3Client({
  region: REGION,
  accessKeyId: ACCESSKEYID,
  secretAccessKey: SECRETACCESSKEY,
})

exports.uploadFile = async (file) => {
  // Set the parameters
  const bucketParams = {
    Bucket: BUCKET_NAME,
    Key: v4(),
    Body: file,
  }
  // Create an object and upload it to the Amazon S3 bucket.
  try {
    await this.s3Client.send(new PutObjectCommand(bucketParams))
    return bucketParams.Key // For unit tests.
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 503)
  }
}

exports.listFile = async () => {
  // Set the parameters
  const bucketParams = {
    Bucket: BUCKET_NAME,
  }
  // Download an objet it to the Amazon S3 bucket.
  try {
    const data = await this.s3Client.send(new ListObjectsCommand(bucketParams))
    return data // For unit tests.
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 503)
  }
}

exports.downloadFile = async (key) => {
  // Set the parameters
  const bucketParams = {
    Bucket: BUCKET_NAME,
    Key: key,
  }
  // Download an objet it to the Amazon S3 bucket.
  try {
    const streamToString = (stream) => new Promise((resolve, reject) => {
      const chunks = []
      stream.on('data', (chunk) => chunks.push(chunk))
      stream.on('error', reject)
      stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
    })
    const data = await this.s3Client.send(new GetObjectCommand(bucketParams))
    // return data // For unit tests.
    // Convert the ReadableStream to a string.
    const bodyContents = await streamToString(data.Body)
    return bodyContents
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 503)
  }
}

exports.destroyFile = async (key) => {
  // Set the parameters
  const bucketParams = {
    Bucket: BUCKET_NAME,
    Key: key,
  }
  // Delete an objet it to the Amazon S3 bucket.
  try {
    const data = await this.s3Client.send(new DeleteObjectCommand(bucketParams))
    return data // For unit tests.
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 503)
  }
}
