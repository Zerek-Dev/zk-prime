import aws from 'aws-sdk'

export default async function handler(req, res) {
  const { filename, contentType } = req.body
  if (!process.env.AWS_S3_BUCKET) return res.status(500).json({ error: 'Storage not configured' })

  const s3 = new aws.S3({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    signatureVersion: 'v4'
  })

  const Key = `uploads/${Date.now()}-${filename}`
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key,
    Expires: 60,
    ContentType: contentType
  }

  const uploadURL = await s3.getSignedUrlPromise('putObject', params)
  res.json({ uploadURL, key: Key, url: `https://${process.env.AWS_S3_BUCKET}.s3.amazonaws.com/${Key}` })
}
