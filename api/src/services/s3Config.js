const aws = require('aws-sdk')

aws.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY
})

const s3 = new aws.S3()

module.exports = {
  aws,
  s3,
  s3Bucket: process.env.AWS_BUCKET_NAME
}
