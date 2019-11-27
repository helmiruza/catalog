import S3 from 'aws-s3'

export default class S3File {
  static upload(file, dir) {
    let config = {
      bucketName: process.env.S3_BUCKET_NAME,
      region: 'ap-southeast-1',
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
    }

    if (dir) {
      config = {...config, dirName: dir }
    }

    const S3Client = new S3(config)
    const filename = file.name.split('.').slice(0, -1).join('.')

    return S3Client
      .uploadFile(file, filename)
      .then(data => data)
      .catch(err => console.error(err))
  }

}
