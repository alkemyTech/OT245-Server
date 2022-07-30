const { PutObjectCommand } = require('@aws-sdk/client-s3')
const config = require('../config/config')
const { ErrorObject } = require('../helpers/error')
const { s3Client } = require('../helpers/s3Client')

const fileFilter = (file) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    return true
  }
  return false
}

const postImageS3 = async (file) => {
  const correctFormat = fileFilter(file)
  if (correctFormat === true) {
    const params = {
      Bucket: config.development.aws_bucket,
      Key: file.name,
      Body: file.data,
      ACL: 'public-read',
    }
    try {
      await s3Client.send(new PutObjectCommand(params))
      return (`https://${params.Bucket}.s3.amazonaws.com/${params.Key}`)
    } catch (error) {
      throw new ErrorObject(error.message, error.statusCode || 500)
    }
  } else {
    throw new ErrorObject('Invalid image format', 400)
  }
}

module.exports = postImageS3
